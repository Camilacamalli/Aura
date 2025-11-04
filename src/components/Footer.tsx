import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about-section" role="contentinfo" className="text-center bg-[#111121] text-white space-y-6 p-[2.5rem]">
      <div className='space-x-6'>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
      </div>
      <div className='space-y-2'>
        <h3 className='font-bold'>Contact</h3>
        <div className='flex justify-center space-x-6'>
          <a href="mailto:camilaagustinacamalli@gmail.com">camilaagustinacamalli@gmail.com</a>
          <a href="https://www.linkedin.com/in/camila-camalli/" target="_blank">LinkedIn</a>
        </div>
      </div>
      <p className="font-bold">&copy; {currentYear} Aura. All Rights Reserved.</p>
      <p className='text-xs'>This app uses the Spotify API but is not affiliated with or endorsed by Spotify</p>
    </footer>
  )
}
