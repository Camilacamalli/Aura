import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <p>&copy; {currentYear} Aura. All Rights Reserved.</p>
    </footer>
  )
}
