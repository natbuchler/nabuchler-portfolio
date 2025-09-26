import type { Metadata } from "next";
import { Playfair_Display, Roboto_Flex, Roboto, Raleway, Comfortaa } from "next/font/google";
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
  title: "Natasha Buchler - Strategic Designer & Executive Leader",
  description: "Strategic Designer & Executive Leader with 7+ years leading design teams across B2B platforms, fintech, and global marketplaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
