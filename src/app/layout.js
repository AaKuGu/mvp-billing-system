import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import GlobalLoadingOverlay from "@/re_usables/components/Loading/Loading";
import Route_Loading_Handler from "@/re_usables/components/Loading/Route_Loading_Handler";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Korobill",
  description: "Billing App for Small Businesses",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white h-screen text-black antialiased font-bold overflow-y-auto`}
      >
        <Route_Loading_Handler />
        <GlobalLoadingOverlay />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
