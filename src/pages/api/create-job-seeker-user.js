import sanityClient from '@/sanity/client';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('API route called with data:', req.body);

  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Creating user with Sanity...');

    // Create user document in Sanity
    const newUser = await sanityClient.create({
      _type: 'jobSeekerUser',
      firstName,
      lastName,
      email,
      // Note: In production, hash the password before storing
      password, // Consider using a secure auth service instead
    });

    console.log('User created successfully:', newUser._id);

    // Return success (don't include password in response)
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Detailed error creating user:', error);
    return res.status(500).json({
      error: 'Failed to create user',
      message: error.message,
      details: error.details || 'No additional details',
    });
  }
}
