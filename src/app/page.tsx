import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import LogoCloud from '@/components/landing/LogoCloud'
import HowItWork from '@/components/landing/HowItWork'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function Home() {

  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <LogoCloud />
      <HowItWork />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}