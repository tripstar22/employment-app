// * next.js imports *
import Head from 'next/head';
import { useRouter } from 'next/router';

// * react imports *
import { useEffect, useState } from 'react';

// * custom component imports *
import AppFooter from '@/components/app-footer/AppFooter';
import AppHeader from '@/components/app-header/AppHeader';
import JobSeekerProfile from '@/components/profiles/job-seeker-profile/JobSeekerProfile';

export default function ProfileJobSeekerPage() {
  // * router *
  const router = useRouter();
  const { ProfileJobSeekerPage: _id } = router.query;
  console.log('ProfileJobSeekerPage _id:', _id);

  // * state *
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);

        // Call our API route instead of Sanity directly
        const response = await fetch(`/api/get-user/${_id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch user');
        }

        setUser(result.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [_id]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Employment App – Loading Profile</title>
          <meta name="description" content="Loading Job Seeker Profile" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppHeader />
        <main>
          <div className="container text-center py-5">
            <p>Loading profile...</p>
          </div>
        </main>
        <AppFooter />
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <Head>
          <title>Employment App – Profile Not Found</title>
          <meta name="description" content="Job Seeker Profile Not Found" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppHeader />
        <main>
          <div className="container text-center py-5">
            <h1>Profile Not Found</h1>
            <p>{error || 'The requested profile could not be found.'}</p>
          </div>
        </main>
        <AppFooter />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Employment App – ${user.firstName} ${user.lastName}`}</title>
        <meta name="description" content={`${user.firstName} ${user.lastName} - ${user.professionalTitle}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main>
        <JobSeekerProfile
          firstName={user.firstName}
          lastName={user.lastName}
          professionalTitle={user.professionalTitle}
        />
      </main>
      <AppFooter />
    </>
  );
}
