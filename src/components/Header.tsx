"use client";

import { usePathname } from "next/navigation";

type RouteInfo = { title: string };
type RoutesConfig = {
  [key: string]: RouteInfo
}

const routes_config: RoutesConfig = {
  '/': { title: 'MoodSelector' },
}

export default function Header() {
  const pathname = usePathname();
  const config = routes_config[pathname];

  return (
    <header>
      <h1>{config.title}</h1>
    </header>
  )
}
