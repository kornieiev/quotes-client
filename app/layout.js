import localFont from "next/font/local";
import "./globals.css";
import Layout from "./components/Layout";

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
  title: "Quotes app",
  description: "Frontend app for working with quotes API",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-400 dark:bg-sky-900`}
      >
        <Layout />
        <main className='container mx-auto min-h-screen p-8 bg-slate-400 dark:bg-sky-900 '>
          {children}
        </main>
      </body>
    </html>
  );
}
