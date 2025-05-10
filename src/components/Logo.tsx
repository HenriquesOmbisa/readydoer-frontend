import { Handshake } from "lucide-react";
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-3 select-none">
        <div className="relative w-10 h-10">
          <div className="hexagon bg-gradient-to-br from-blue-500 to-indigo-700">
            <Handshake className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"></span>Ready<span className="font-light">Doer</span>
        </span>
      </div>
    </motion.div>
  );
}

export default Logo;