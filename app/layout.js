import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./component/Sidebar";
import { CartProvider } from "./component/Cartcontext.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gaav by - Yashodha Dairy Farms",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <Sidebar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}