import Provider from "@/components/Provider";
import ChatByRole from "@/components/ui/chat/ChatByRole";
import FloatingIcon from "@/components/ui/emergency/FloatingIcon";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Well Talk: Communicate",
	description: "This is a pogi app na gawa ng mga imba 😎",
};

export default async function RootLayout({ children }) {
	const userSession = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster position="top-center" />
				<FloatingIcon />

				<ChatByRole />
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
