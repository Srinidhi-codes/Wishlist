import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/Layout";
import Providers from "@/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waitlist",
  description: "This is a demo project to display waitlist of users with filters functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
