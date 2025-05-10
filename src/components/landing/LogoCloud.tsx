"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const LogoCloud = () => {
  return (
    <section className="py-12 bg-white">
        <div className="container px-6 mx-auto">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY INNOVATIVE TEAMS</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['google-logo', 'microsoft-logo', 'airbnb-logo', 'spotify-logo', 'slack-logo', 'uber-logo'].map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.1 }}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image 
                  src={`/company-logos/${logo}.svg`} 
                  alt={logo} 
                  width={120} 
                  height={40} 
                  className="w-24 h-auto object-contain grayscale transition-transform duration-300 transform hover:scale-105 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default LogoCloud;