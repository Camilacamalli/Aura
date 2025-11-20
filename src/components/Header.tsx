"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const logo_url = '/auraLogo.png';
const logo_alt_text = 'Aura logo';

type ConfigButton = { label: string; href?: string };
type RouteInfo = { title: string, buttons?: ConfigButton[] };
type RoutesConfig = {
  [key: string]: RouteInfo
}

const routes_config: RoutesConfig = {
  '/': { title: 'MoodSelector', buttons: [{ label: "How to use Aura" }] },
  '/results': { title: 'MoodResults', buttons: [{ label: "Home" }] }
}

export default function Header() {
  const pathname = usePathname();
  const config = routes_config[pathname];

  return (
    <header className="relative z-50 flex items-center justify-between border-b border-solid border-gray-200 px-4 md:px-10 py-3 bg-white dark:bg-black transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10">
          <Image src={logo_url} alt={logo_alt_text} width={50} height={100} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide">{config.title}</h1>
        </div>
      </div>
      {config.buttons && (
        <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
          <Link href="#about-section" className='cursor-pointer rounded-full text-emerald-700 font-bold h-10 px-6 border flex items-center text-center'>About</Link>
          {config.buttons.map((button, i) => (
            <button key={i} className='flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-emerald-700/80 transition-colors bg-emerald-700'>
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      )}
      <div></div>
    </header>
  )
}


