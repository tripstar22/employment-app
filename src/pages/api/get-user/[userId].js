import sanityClient from '@/sanity/client';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  console.log('Fetching user with ID:', userId);

  try {
    // Query Sanity for user with matching ID
    const query = `*[_type == "jobSeekerUser" && _id == $userId][0]`;
    const user = await sanityClient.fetch(query, { userId });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user._id);

    // Return user data (don't include password in response)
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Detailed error fetching user:', error);
    return res.status(500).json({
      error: 'Failed to fetch user',
      message: error.message,
      details: error.details || 'No additional details',
    });
  }
}
