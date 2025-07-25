// * next.js imports *
import Head from 'next/head';

// * third party library imports *
import PropTypes from 'prop-types';
import sanityClient from '@/sanity/client';

// * custom component imports *
import AppFooter from '@/components/app-footer/AppFooter';
import AppHeader from '@/components/app-header/AppHeader';
import LoginPrompt from '@/components/login-prompt/LoginPrompt';

const INDIVIDUAL_USERS_QUERY = `*[_type == 'individualUser']{ _id, firstName, lastName }`;

export default function Home({ individualUsers }) {
  return (
    <>
      <Head>
        <title>Employment App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main>
        <LoginPrompt />

        <ul>
          {individualUsers.map((user) => (
            <li key={user._id}>
              {user.firstName}
              {' '}
              {user.lastName}
            </li>
          ))}
        </ul>
      </main>
      <AppFooter />
    </>
  );
}

Home.propTypes = {
  individualUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export async function getStaticProps() {
  console.log('getStaticProps running...');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);

  try {
    const individualUsers = await sanityClient.fetch(INDIVIDUAL_USERS_QUERY);
    console.log('Fetched users:', individualUsers);

    return {
      props: {
        individualUsers,
      },
      revalidate: 30, // Revalidate every 30 seconds
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        individualUsers: [],
      },
      revalidate: 30,
    };
  }
}
