import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Well Talk: Communicate",
  description: "This is a pogi app na gawa ng mga imba 😎",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
