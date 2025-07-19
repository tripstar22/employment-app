// * google font imports *
import { Source_Serif_4 } from 'next/font/google';

// * google fonts *
const fontSerifDefault = Source_Serif_4({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export default fontSerifDefault;
