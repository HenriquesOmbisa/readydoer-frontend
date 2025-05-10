'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  X,
  Menu,
  LogIn,
  Zap,
  Settings,
  Users,
  BadgeDollarSign,
  Home
} from 'lucide-react'
import { Link as ScrollLink } from "react-scroll"
import { usePathname } from 'next/navigation'
import Logo from '../Logo'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "hero" },
    { icon: <Zap className="w-5 h-5" />, label: "How It Works", href: "how-it-works" },
    { icon: <Settings className="w-5 h-5" />, label: "Features", href: "features" },
    { icon: <Users className="w-5 h-5" />, label: "Success Stories", href: "testimonials" },
    { icon: <BadgeDollarSign className="w-5 h-5" />, label: "Pricing", href: "pricing" }
  ]

  const authLinks = [
    { label: "Login", href: "/auth/login", icon: <LogIn className="w-5 h-5" /> },
    { label: "Get Started", href: "/auth/signup", icon: <ArrowRight className="w-5 h-5" /> }
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b transition-all duration-300 ${scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'}`}>
      <div className="container flex items-center justify-between px-4 py-3 mx-auto sm:px-6 sm:py-4">
        {/* Logo */}
        {pathname === '/' ? (
          <ScrollLink to="hero" smooth={true} className="cursor-pointer">
            <Logo />
          </ScrollLink>
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              pathname === '/' ? (
                link.label !== 'Pricing' ? (
                  <ScrollLink
                    key={index}
                    to={link.href}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {link.icon}
                    {link.label}
                  </ScrollLink>
                ) : (
                  <Link
                    key={index}
                    href={`/${link.href}`}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition flex items-center gap-1.5"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  key={index}
                  href={`/#${link.href}`}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition flex items-center gap-1.5"
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              <LogIn className="w-4 h-4 mr-1" /> 
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[85%] max-w-sm sm:w-[70%] p-6 [&>button]:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                  <Logo />
                </Link>
                <SheetClose className="p-1 rounded-md text-gray-500 hover:bg-gray-100 transition">
                  <X className="w-6 h-6" />
                </SheetClose>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-2">
                {navLinks.map((link, index) => (
                  <SheetClose asChild key={index}>
                    {pathname === '/' ? (
                      link.label !== 'Pricing' ? (
                        <ScrollLink
                          to={link.href}
                          smooth={true}
                          offset={-80}
                          duration={500}
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          <span className="text-gray-500">
                            {link.icon}
                          </span>
                          {link.label}
                        </ScrollLink>
                      ) : (
                        <Link
                          href={`/${link.href}`}
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          <span className="text-gray-500">
                            {link.icon}
                          </span>
                          {link.label}
                        </Link>
                      )
                    ) : (
                      <Link
                        href={`/#${link.href}`}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        <span className="text-gray-500">
                          {link.icon}
                        </span>
                        {link.label}
                      </Link>
                    )}
                  </SheetClose>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-auto pt-6 space-y-3 border-t border-gray-100">
                {authLinks.map((link, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium rounded-lg transition ${
                        link.label === "Get Started"
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar