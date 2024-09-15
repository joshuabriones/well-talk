import { getFadeInFromLeftAnimation } from "@/utils/getScrollAnimation";
import { motion } from "framer-motion";

export default function ScrollAnimationFromLeft({
	children,
	className,
	...props
}) {
	return (
		<motion.div
			initial="offscreen"
			whileInView="onscreen"
			variants={getFadeInFromLeftAnimation()}
			viewport={{once: true, amount: 0.2 }}
			className={className}
			{...props}>
			{children}
		</motion.div>
	);
}
