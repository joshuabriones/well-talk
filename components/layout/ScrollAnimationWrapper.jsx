import { motion } from 'framer-motion';
import getScrollAnimation, { getFadeInFromLeftAnimation, getFadeInFromRightAnimation } from '@/utils/getScrollAnimation';

export default function ScrollAnimationWrapper({
  children,
  className,
  animationType = 'default',
  ...props
}) {
  let animationVariants;

  switch (animationType) {
    case 'fadeInFromRight':
      animationVariants = getFadeInFromRightAnimation();
      break;
    case 'fadeInFromLeft':
      animationVariants = getFadeInFromLeftAnimation();
      break;
    default:
      animationVariants = getScrollAnimation();
  }

  return (
    <motion.div
      initial="offscreen"
      whileInView="onScreen"
      variants={animationVariants}
      viewport={{ amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
