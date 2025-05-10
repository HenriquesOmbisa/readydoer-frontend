"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 sm:py-24 lg:py-32">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Success stories</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">What our community is saying</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src="https://randomuser.me/api/portraits/women/2.jpg" alt="Sarah" width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">UX Designer, Freelancer</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 italic">
                &quot;ReadyDoer gave me the space to show my work clearly and professionally.
                I’ve connected with clients who actually value what I do, without the usual friction.&quot;
              </p>
              <div className="flex items-center mt-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed Projects</p>
                  <p className="font-bold text-gray-900">18</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Portfolio Views</p>
                  <p className="font-bold text-gray-900">1,200+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-bold text-gray-900">4.8/5</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src="https://randomuser.me/api/portraits/men/1.jpg" alt="Mike" width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Mike Rodriguez</h4>
                  <p className="text-sm text-gray-600">CTO, Mojo Lda.</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 italic">
                &quot;Being able to browse real portfolios and reach out directly from the project page is a game-changer.
                We’ve hired talented people fast, without back-and-forth emails.&quot;
              </p>
              <div className="flex items-center mt-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Freelancers Hired</p>
                  <p className="font-bold text-gray-900">7</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Projects Posted</p>
                  <p className="font-bold text-gray-900">15</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Satisfaction</p>
                  <p className="font-bold text-gray-900">96%</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src="https://randomuser.me/api/portraits/women/30.jpg" alt="Ana" width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ana Kunda</h4>
                  <p className="text-sm text-gray-600">Frontend Developer</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 italic">
                &quot;I uploaded a few projects to ReadyDoer without expecting much, but soon I started getting messages.
                It’s great to have a clean, public place where clients can discover me and my work.&quot;
              </p>
              <div className="flex items-center mt-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Projects Received</p>
                  <p className="font-bold text-gray-900">9</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Profile Views</p>
                  <p className="font-bold text-gray-900">750</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Countries</p>
                  <p className="font-bold text-gray-900">🇧🇷 🇨🇦 🇫🇷</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;