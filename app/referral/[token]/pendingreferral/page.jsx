"use client";

import { API_ENDPOINT } from "@/lib/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import NotFoundPage from "@/app/not-found";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";

const PendingReferral = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState("");

	const [confirm, setConfirm] = useState(false);

	console.log(confirm);

	useEffect(() => {
		if (pathname && searchParams) {
			const tokenFromPath = pathname.split("/")[2];
			console.log(tokenFromPath);
			handleTokenValidation(tokenFromPath);
		}
	}, [pathname, searchParams]);

	const handleTokenValidation = async (tokenFromPath) => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.VALIDATE_REFERRAL_TOKEN}${tokenFromPath}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsTokenValid(true);
			} else {
				setIsTokenValid(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

	if (isTokenValid) {
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<div className="w-[600px] h-[400px] rounded-xl py-2 px-10 flex flex-col justify-center items-center gap-y-3 shadow-xl">
					<div className="">
						<img src="/images/loggo.png" alt="" className="h-28" />
					</div>

					<div className="font-Merriweather text-center">
						Please confirm if you'd like to proceed with your referral to the guidance
						office. We appreciate your time and assistance.
					</div>

					<div className="w-10/12 flex gap-3 mt-5 mx-auto">
						<HollowButton>Decline</HollowButton>
						<FullButton
							onClick={() => {
								setConfirm(true);
							}}
						>
							Proceed
						</FullButton>
					</div>
				</div>
			</div>
		);
	} else {
		return <NotFoundPage />;
	}
};

export default PendingReferral;
