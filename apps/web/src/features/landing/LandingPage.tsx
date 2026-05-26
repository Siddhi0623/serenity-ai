import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/motion-presets';
import { Hero } from './sections/Hero';
import { Pillars } from './sections/Pillars';
import { MoodDemo } from './sections/MoodDemo';
import { HowItWorks } from './sections/HowItWorks';
import { SocialProof } from './sections/SocialProof';
import { CTASection } from './sections/CTASection';

export function LandingPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col"
    >
      <Hero />
      <Pillars />
      <MoodDemo />
      <HowItWorks />
      <SocialProof />
      <CTASection />
    </motion.div>
  );
}
