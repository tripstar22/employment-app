import sanityClient from '@/sanity/client';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Auth API route called with data:', req.body);

  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Querying Sanity for user with email:', email);

    // Query Sanity for user with matching email
    const query = `*[_type == "jobSeekerUser" && email == $email][0]`;
    const user = await sanityClient.fetch(query, { email });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // In production, you should hash passwords and compare hashes
    // For now, we're doing a direct comparison (NOT SECURE)
    if (user.password !== password) {
      console.log('Password mismatch');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User authenticated successfully:', user._id);

    // Return success (don't include password in response)
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Detailed error authenticating user:', error);
    return res.status(500).json({
      error: 'Authentication failed',
      message: error.message,
      details: error.details || 'No additional details',
    });
  }
}
