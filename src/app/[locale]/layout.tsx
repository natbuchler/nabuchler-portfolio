import type { Metadata } from "next";
import { Playfair_Display, Roboto_Flex, Roboto, Raleway, Comfortaa } from "next/font/google";
import { Locale, locales } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "../globals.css";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params as { locale: Locale };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "to4ss77n2s");
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div
          className={`${playfairDisplay.variable} ${robotoFlex.variable} ${roboto.variable} ${raleway.variable} ${comfortaa.variable}`}
          suppressHydrationWarning
        >
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
