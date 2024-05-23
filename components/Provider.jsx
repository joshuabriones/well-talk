"use client";

import ContextWrapper from "@/context/ContextWrapper";
import GlobalContext from "@/context/GlobalContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Provider = ({ children, session }) => {
	const globalContextValue = {}; // Provide the actual context value here

	return (
		<SessionProvider session={session}>
			<GlobalContext.Provider value={globalContextValue}>
				<ContextWrapper>
					<Toaster position="top-center" />
					{children}
				</ContextWrapper>
			</GlobalContext.Provider>
		</SessionProvider>
	);
};

export default Provider;
