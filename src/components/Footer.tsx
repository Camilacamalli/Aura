export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <p>&copy; {currentYear} Aura. All Rights Reserved.</p>
    </footer>
  )
}
