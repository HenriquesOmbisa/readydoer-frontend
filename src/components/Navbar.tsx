'use client'

import DeskNav from "./DeskNav"
import MobileNav from "./MobileNav"
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className=" sticky -top-1 z-30 md:top-0">
      <div className="hidden lg:block">
        <DeskNav path= {pathname} />
      </div>
      <div className="lg:hidden">
        <MobileNav path={pathname} />
      </div>
    </div>
  )
}