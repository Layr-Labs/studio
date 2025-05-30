import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      id="greeting"
      key="overview"
      className="max-w-3xl mx-auto md:my-10 px-8 size-full flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-4xl"
      >
        What would you like to <span className="font-semibold text-[#1A0C6D] dark:text-[#B7C0E9]">verify</span>?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-zinc-500 mt-5"
      >
        Realize your <a href="https://docs.eigenlayer.xyz/developers/Concepts/avs-developer-guide#what-is-an-autonomous-verifiable-service-avs" target="_blank" rel="noopener noreferrer" className="text-[#1A0C6D]  dark:text-[#B7C0E9]">EigenLayer AVS</a> as an Idea, Design Tech Spec, or Prototype Code.
      </motion.div>
    </div>
  );
};
