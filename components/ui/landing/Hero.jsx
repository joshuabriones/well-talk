// components/Hero.js
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "../../../css/landing.module.css";

const Hero = () => {
	const router = useRouter();

	const handleSignInClick = () => {
		router.push("/login");
	};

	const handleCreateAccountClick = () => {
		router.push("/login");
	};

	return (
		<section className={`${styles.hero} parallax`}>
			
			<div className="flex justify-center items-center w-full h-screen">
				<div className="w-full flex justify-center items-center mt-6 md:mt-0 lg:mt-0">
					<motion.div
						initial={{ opacity: 0, y: -100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="py-40 px-16 xl:px-32 text-left md:text-center lg:text-center">
						<img
							className={`object-contain mb-0 md:mb-6 lg:mb-6 rounded max-h-28 mb-4 sm:max-h-32 md:max-h-40 lg:max-h-48 xl:max-h-56 w-auto mx-auto`}
							src="/images/landing/cit.png"
							alt="WellTalk Logo"
						/>

						<motion.h2
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-Merriweather pb-0 md:pb-2 lg:md:pb-2">
							{" "}
							Supporting{" "}
							<span className="bg-gradient-to-t from-maroon to-foreground text-transparent bg-clip-text border-1">
								Teknoys,
							</span>{" "}
						</motion.h2>
						<motion.h2
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-Merriweather">
							One Conversation at a Time.
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: -80 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							className="text-lg sm:text-xl md:text-2xl lg:text-2xl py-10 mb-8 text-stone-700 font-Jaldi">
							{" "}
							Your Campus Mental Wellness Hub:
							<br />
							Connect with Counselors, Access Resources,
							<br />
							and Build a Supportive Community for Mental Health
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							className="w-9/12 md:w-4/12 flex justify-center items-center gap-y-4 pb-12 mx-auto">
							<button
								className="w-full sm:w-11/12 md:w-11/12 bg-maroon border-2 font-Merriweather border-gray text-sm md:text-md lg:text-md text-white font-bold rounded-3xl px-4 py-3 whitespace-nowrap hover:scale-95 transition-transform duration-300"
								onClick={handleCreateAccountClick}>
								Get Started Today!
							</button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
