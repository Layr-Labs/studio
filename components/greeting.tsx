import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      id="greeting"
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col "
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-semibold"
      >
        What would you like to verify?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-zinc-500 mt-5"
      >
        Realize your <a href="https://docs.eigenlayer.xyz/developers/Concepts/avs-developer-guide#what-is-an-autonomous-verifiable-service-avs" target="_blank" rel="noopener noreferrer" className="text-[#1A0C6D]">EigenLayer AVS</a> as an Idea, Design Tech Spec, or Prototype Code.
      </motion.div>
    </div>
  );
};
