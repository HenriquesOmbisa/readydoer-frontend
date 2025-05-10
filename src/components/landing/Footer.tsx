"use client";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import Link from "next/link";
import { BsFacebook, BsGithub, BsLinkedin, BsReddit, BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const social = [
    {icon: <BsTwitterX className="w-6 h-6"/>, url:""}, 
    {icon: <BsLinkedin  className="w-6 h-6"/>, url:""},
    {icon: <BsFacebook  className="w-6 h-6"/>, url:""},
    {icon: <BsGithub  className="w-6 h-6"/>, url:""},
    {icon: <BsReddit  className="w-6 h-6"/>, url:""}
  ]
  return (
    <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link href={"/"}>
              <div className="flex items-center gap-3 select-none">
                      <div className="relative w-10 h-10">
                        <div className="hexagon bg-gradient-to-br from-blue-500 to-indigo-700">
                          <Handshake className="w-5 h-5 text-white" strokeWidth={2.2} />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"></span>Ready<span className="font-light">Doer</span>
                      </span>
                    </div>

                    <style jsx>{`
                      .hexagon {
                        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                    `}</style>
              </Link>
            </motion.div>
              <p className="mb-6">The professional network for the future of work</p>
              <div className="flex gap-4">
                {social.map((social, index) => (
                  <a key={index} href={social.url} className="text-gray-400 hover:text-white transition">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Roadmap'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Help Center', 'Community'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Contact', 'Legal'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <p className="text-sm text-center">&copy; {new Date().getFullYear()} ReadyDoer. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;