import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
      </div>
      <div>
        <a href="mailto:camilaagustinacamalli@gmail.com">camilaagustinacamalli@gmail.com</a>
      </div>
      <p>&copy; {currentYear} Aura. All Rights Reserved.</p>
      <p>This app uses the Spotify API but is not affiliated with or endorsed by Spotify</p>
    </footer>
  )
}
