// * third party library imports *
import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default sanityClient;
