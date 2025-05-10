"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { Search, MessageSquare, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HowItWork = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true })


    useEffect(() => {
      if (isInView) {
        controls.start('visible')
      }
    }, [isInView, controls])
  return (
    <section id="how-it-works" className="py-16 bg-gray-50 sm:py-24 lg:py-32">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl"
            >
              How it works
            </motion.h2>
            <motion.p
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
              }}
              className="max-w-2xl mx-auto mt-4 text-lg text-gray-600"
            >
              A faster way to hire or get hired — in just three steps.
            </motion.p>
          </div>

          <div className="grid gap-12 mt-16 lg:grid-cols-3">
            {[
              {
                icon: <Search className="w-8 h-8 text-blue-600" />,
                title: "Get visible fast",
                description: "Clients post jobs. Freelancers build great profiles. Everyone gets seen.",
                image: "/illustrations/search.jpg"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
                title: "Talk it out",
                description: "Built-in messaging to align on everything before you start.",
                image: "/illustrations/chat.jpg"
              },
              {
                icon: <Check className="w-8 h-8 text-green-600" />,
                title: "Start working",
                description: "Once ready, just agree and begin.",
                image: "/illustrations/work.jpg"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 * index + 0.4 }
                  }
                }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative bg-white rounded-lg p-8 h-full border border-gray-200">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-0">{step.description}</p>
                  <div className="relative h-48">
                    <Image
                      src={step.image} 
                      alt={step.title}
                      fill
                      className="object-contain opacity-90"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default HowItWork;