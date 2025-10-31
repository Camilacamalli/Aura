"use client";

import Image from 'next/image';
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
    <header>
      <Image src={logo_url} alt={logo_alt_text} width={100} height={100} />
      <h1>{config.title}</h1>
      {config.buttons && (
        <div>
          {config.buttons.map((button, i) => (
            <button key={i}>{button.label}</button>
          ))}
        </div>
      )}
    </header>
  )
}
