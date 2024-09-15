import Provider from "@/components/Provider";
import FloatingChat from "@/components/ui/chat/FloatingChat";
import FloatingIcon from "@/components/ui/emergency/FloatingIcon";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Well Talk: Communicate",
	description: "This is a pogi app na gawa ng mga imba 😎",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster position="top-center" />
				<FloatingIcon />
				<FloatingChat />
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
