"use client"

import { JSX, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Zap, Star, Rocket, Shield, TrendingUp, Users, FileText, Award, Briefcase, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans = {
  freelancer: [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for testing the platform and small projects",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      features: [
        "10 proposals/month",
        "Up to 1 active projects",
        "Basic public profile",
        "Client rating system",
        "Community support",
        "Access to basic projects"
      ],
      cta: "Get started",
      popular: false
    },
    {
      name: "Pro Freelancer",
      price: "$9",
      period: "/month",
      description: "For professionals who want maximum visibility",
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      features: [
        "Unlimited proposals",
        "Up to 3 active projects",
        "Search priority ranking",
        "Featured profile placement",
        "Pro badge verification",
        "Advanced analytics dashboard",
        "24h response guarantee",
      ],
      cta: "Start 7-day free trial",
      popular: true
    },
    {
      name: "Add-ons",
      price: "",
      period: "",
      description: "Enhance your freelancer experience",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      features: [
        "Verified Identity Badge: $5 (one-time)",
        "Additional Proposal Pack: $4 (10 proposals)",
        "Profile Highlight: $7/week",
        "Extra +1 Active Project Slot: $2/month"
      ],
      cta: "",
      popular: false
    }
  ] as Plan[],
  client: [
    {
      name: "Basic",
      price: "$0",
      description: "For occasional projects and small businesses",
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      features: [
        "2 active projects/month",
        "Basic proposal management",
        "Freelancer ratings & reviews",
        "Standard search filters",
        "Email support"
      ],
      cta: "Post your project",
      popular: false
    },
    {
      name: "Business",
      price: "$12",
      period: "/month",
      description: "For agencies and frequent hiring needs",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      features: [
        "10 active projects/month",
        "Project visibility boost",
        "Advanced analytics",
        "AI-powered matching",
        "Priority customer support",
        "Custom hiring workflows"
      ],
      cta: "Try business plan",
      popular: false
    },
    {
      name: "Add-ons",
      price: "",
      period: "",
      description: "Additional features for clients",
      icon: <Award className="w-6 h-6 text-orange-500" />,
      features: [
        "Extra project slot: $2 each",
        "Featured project: $5 (7 days)",
        "Urgent project badge: $3",
        "NDA protection: $5/project",
        "Talent matching AI: $8/month"
      ],
      cta: "",
      popular: false
    }
  ] as Plan[]
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl border bg-white ${plan.popular ? 'border-blue-500 shadow-2xl ring-1 ring-blue-500' : 'border-gray-200 shadow-lg'} hover:shadow-xl transition-all`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md">
          <Zap className="w-3 h-3 mr-1" /> MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-opacity-10 bg-transparent">
            {plan.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 ml-3">{plan.name}</h3>
        </div>
        {plan.name !== 'Add-ons' && (
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
            {plan.period && <span className="ml-2 text-lg text-gray-600">{plan.period}</span>}
          </div>
        )}
        <p className="text-gray-600 mb-6 text-lg">{plan.description}</p>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-base">{feature}</span>
            </li>
          ))}
        </ul>
        {plan.name !== 'Add-ons' && (
          <Link href="/auth/signup">
            <Button 
              size="lg"
              className={`w-full text-lg py-6 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
              {plan.cta}
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function FAQ() {
  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately."
    },
    {
      question: "Is there a contract or long-term commitment?",
      answer: "No, all plans are month-to-month with no long-term contracts. Cancel anytime."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and in some regions, bank transfers."
    },
    {
      question: "Do you offer discounts for annual payments?",
      answer: "Yes! Annual plans receive 15% off compared to monthly billing."
    }
  ]

  return (
    <div className="bg-gray-50 rounded-2xl p-8 mt-16">
      <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingPage() {
  const [tab, setTab] = useState<'freelancer' | 'client'>('freelancer')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 bg-white sm:py-24 lg:py-32">
          <div className="container px-6 mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Pricing built for every stage
              </h1>
              <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600">
                Start free, then grow with flexible plans that scale with your business.
                No hidden fees, cancel anytime.
              </p>
            </div>

            <div className="flex justify-center mt-12">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setTab('freelancer')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${tab === 'freelancer' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    For Freelancers
                  </div>
                </button>
                <button
                  onClick={() => setTab('client')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${tab === 'client' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    For Clients
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {plans[tab].map((plan, index) => (
                <PricingCard key={index} plan={plan} />
              ))}
            </div>

            <FAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}