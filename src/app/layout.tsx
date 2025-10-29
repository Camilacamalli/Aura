import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA",
  description: "Find music that matches your mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html >
  );
}
