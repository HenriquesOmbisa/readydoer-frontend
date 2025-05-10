"use client";
import { motion } from "framer-motion";
import { BarChart2, Check, Globe, LayoutTemplate, MessageSquare, Palette } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white sm:py-24 lg:py-32">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Built for professionals</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">Everything you need to work efficiently</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Globe className="w-6 h-6 text-blue-600" />,
              title: "Work from anywhere",
              description: "All you need is a browser. Find or offer work from any country."
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
              title: "Simple messaging",
              description: "No email needed. Talk directly from your project page."
            },
            {
              icon: <Palette className="w-6 h-6 text-pink-600" />,
              title: "Show your work",
              description: "Build a public profile with past projects and reviews."
            },
            {
              icon: <Check className="w-6 h-6 text-green-600" />,
              title: "Easy project flow",
              description: "Clear steps from proposal to delivery. No confusion."
            },
            {
              icon: <LayoutTemplate className="w-6 h-6 text-purple-600" />,
              title: "Clear project overview",
              description: "A simple page to track progress, communicate, and deliver work."
            },
            {
              icon: <BarChart2 className="w-6 h-6 text-orange-600" />,
              title: "Project history",
              description: "Your finished projects stay on your profile — like a growing portfolio."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;