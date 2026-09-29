import type { Metadata, Viewport } from "next";
import { Geist, Cinzel } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fbfaf6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NOIR EVENTS | High-End Event Planning & Creative Direction",
  description:
    "We plan, design, and orchestrate extraordinary corporate summits, luxury weddings, immersive live shows, VIP galas, and brand activations with cinematic precision and peerless artistry.",
  keywords: [
    "Luxury Event Management",
    "Bespoke Event Production",
    "Corporate Gala Planning",
    "High-End Wedding Planner",
    "Brand Activations",
    "Concert Production",
    "Event Design Agency",
    "Noir Events",
  ],
  authors: [{ name: "Noir Events Studio" }],
  openGraph: {
    title: "NOIR EVENTS | Architects of Unforgettable Gatherings",
    description:
      "From high-stakes summits to poetic private galas, we deliver events people remember.",
    url: "https://noirevents.studio",
    siteName: "NOIR EVENTS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "NOIR EVENTS - Luxury Gala Production",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIR EVENTS | Luxury Event Production",
    description: "We create events people remember.",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: [
      { url: "/star.svg", type: "image/svg+xml" },
    ],
    shortcut: "/star.svg",
    apple: "/star.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/star.svg" type="image/svg+xml" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('noir_theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${cinzel.variable} font-sans antialiased min-h-screen flex flex-col selection:bg-[var(--accent)] selection:text-black`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
