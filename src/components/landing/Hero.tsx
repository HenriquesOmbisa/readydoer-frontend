"use client"
import { motion } from "framer-motion";
import { Rocket, Search, Star, Calendar, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex px-4 py-1.5 mb-6 text-xs font-medium tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full"
            >
              POST • CHOOSE • WORK
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">smart way</span> to work with top talent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 md:text-xl lg:mx-0"
            >
              Post your project. Get offers from ready-to-start freelancers. Fast and hassle-free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4 mt-10 sm:flex-row lg:justify-start"
            >
              <Link
                href="/auth/signup"
                className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Join as Freelancer <Rocket className="w-4 h-4" />
              </Link>
              <Link
                href="/hire" 
                className="px-6 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 shadow-sm"
              >
                Hire Talent <Search className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-6"
            >
              <div className="flex -space-x-2">
                {["https://randomuser.me/api/portraits/men/1.jpg", "https://randomuser.me/api/portraits/women/2.jpg", "https://randomuser.me/api/portraits/women/1.jpg", "https://randomuser.me/api/portraits/men/4.jpg"].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image 
                      src={item} 
                      alt="User" 
                      width={40} 
                      height={40} 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">Trusted by 5,000+ professionals</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="lg:w-1/2 relative"
          >
            {/* Stacked screenshots with overlapping effect */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-blue-100 z-0"></div>
              <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl bg-blue-200 z-10"></div>
              <div className="relative z-20 rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white transform rotate-1">
                <div className="bg-gray-800 h-8 rounded-t-lg flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Freelancer Dashboard</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Online</span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">2 New Projects</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Availability</h4>
                            <p className="text-sm text-gray-600">3 slots this week</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Active Projects</h4>
                            <p className="text-sm text-gray-600">2 in progress</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Recent Earnings</h4>
                        <p className="text-2xl font-bold mt-2">$248</p>
                        <p className="text-sm text-gray-600">this month</p>
                      </div>
                      <div className="mt-4">
                        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">65% of monthly goal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center z-30">
              <Image src="/tech-logos/react.png" alt="React" width={40} height={40} />
            </div>
            <div className="absolute top-10 -right-5 w-20 h-20 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center z-30">
              <Image src="/tech-logos/figma.png" alt="Figma" width={30} height={30} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;