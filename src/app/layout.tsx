import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Drishti Baadhit Karimik Sangh Rajasthan",
    template: "%s | DBKS Rajasthan",
  },
  description:
    "Non-profit organization for visually impaired employees working in departments under the Government of Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Providers>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
