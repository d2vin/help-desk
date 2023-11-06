import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "~/components/sidebar";
import Navbar from "~/components/navbar";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Help Desk",
  description: "A simple ticket management system",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <div className="relative h-full">
            <div className="z-[80] hidden h-full bg-gray-900 text-white md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
              <Sidebar />
            </div>
            <main className="md:pl-72">
              <div className="fixed top-0 z-40 h-16 w-full bg-black backdrop-blur" />
              <Navbar />
              {children}
              <Toaster />
            </main>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
