import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://halukertekin.com"),
  title: {
    default: "Haluk Ertekin",
    template: "%s | halukertekin.com",
  },
  description:
    "Portfolio of Haluk Ertekin — Computer Engineering student. Projects in AWS, C programming, networking, cybersecurity, and machine learning.",
  openGraph: {
    title: "Haluk Ertekin | halukertekin.com",
    description:
      "Haluk Ertekin — Developer building modern web applications, cloud infrastructure (AWS), and security-focused systems.",
    url: "https://halukertekin.com",
    siteName: "halukertekin.com",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
        alt: "Haluk Ertekin portfolio preview",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haluk Ertekin | halukertekin.com",
    description:
      "Haluk Ertekin — Developer building modern web applications, cloud infrastructure (AWS), and security-focused systems.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://halukertekin.com",
  },
    verification: {
    google: "nJ_CjIO8M59UtNVB-uEGWsrwRiHEax5fRJXQmmt2VK4",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
