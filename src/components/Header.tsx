"use client";

import { usePathname } from "next/navigation";

type ConfigButton = { label: string; href?: string };
type RouteInfo = { title: string, buttons?: ConfigButton[] };
type RoutesConfig = {
  [key: string]: RouteInfo
}

const routes_config: RoutesConfig = {
  '/': { title: 'MoodSelector', buttons: [{ label: "How to use Aura" }] },
  '/results': { title: 'MoodResults' }
}

export default function Header() {
  const pathname = usePathname();
  const config = routes_config[pathname];

  return (
    <header>
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
