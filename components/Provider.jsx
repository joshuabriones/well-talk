"use client";

import ContextWrapper from "@/context/ContextWrapper";
import GlobalContext from "@/context/GlobalContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Provider = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<GlobalContext.Provider>
				<ContextWrapper>
					<Toaster position="top-center" />
					{children}
				</ContextWrapper>
			</GlobalContext.Provider>
		</SessionProvider>
	);
};

export default Provider;
