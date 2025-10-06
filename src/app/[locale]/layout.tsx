import type { Metadata } from "next";
import { Playfair_Display, Roboto_Flex, Roboto, Raleway, Comfortaa } from "next/font/google";
import { Locale, locales } from "@/lib/i18n";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "nabuchler",
  description: "Portfolio of Natasha Buchler",
  icons: {
    icon: "/rosto.svg",
  },
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <div
          className={`${playfairDisplay.variable} ${robotoFlex.variable} ${roboto.variable} ${raleway.variable} ${comfortaa.variable}`}
          suppressHydrationWarning
        >
          {children}
        </div>
      </body>
    </html>
  );
}
