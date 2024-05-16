// components/Hero.js
import { useRouter } from "next/navigation";
import styles from "../../../css/landing.module.css"; // Import your CSS file
import FullButton from "../buttons/FullButton";
import HollowButton from "../buttons/HollowButton";

const Hero = () => {
	const router = useRouter();
	const handleSignInClick = () => {
		router.push("/login");
	};

	const handleCreateAccountClick = () => {
		router.push("/registration");
	};
	return (
		<section className={`${styles.hero} parallax`}>
			<div className={styles.heroContent}>
				<div className="py-40 px-16 xl:px-96 text-center">
					<h2 className="text-5xl sm:text-6xl lg:text-8xl font-Merriweather">
						Supporting Student
					</h2>
					<h2 className="text-5xl sm:text-6xl lg:text-8xl sm:mt-2 font-Merriweather">
						Well-being Together
					</h2>
					<p className="text-2xl sm:text-3xl lg:text-4xl xl:px-40 py-10 mb-8 text-stone-700 font-Jaldi">
						Your Campus Mental Wellness Hub: Connect with
						Counselors, Access Resources, and Build a Supportive
						Community for Mental Health
					</p>
					<div className="w-full flex flex-row gap-x-4 pb-12">
						<HollowButton
							className="w-1/2"
							onClick={handleSignInClick}>
							Sign In
						</HollowButton>
						<FullButton
							className="w-1/2"
							onClick={handleCreateAccountClick}>
							Create Account
						</FullButton>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
