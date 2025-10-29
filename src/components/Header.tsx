"use client";

import { usePathname } from "next/navigation";

const routes_config = {
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
