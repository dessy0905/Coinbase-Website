import { NavLink } from "react-router-dom"
import { FaSearch, FaGlobe } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "motion/react"
import coinbaseLogo from "../../assets/coinbase-logo.png"
import LanguageDropdown from "./LanguageDropdown"
import MegaNavDropdown from "./MegaNavDropdown"

const desktopNavLinks = [
  { label: "Cryptocurrencies", to: "/explore" },
  { label: "Individuals", to: "/individuals", menuKey: "Individuals" },
  { label: "Businesses", to: "/businesses", menuKey: "Businesses" },
  { label: "Institutions", to: "/institutions", menuKey: "Institutions" },
  { label: "Developers", to: "/developers", menuKey: "Developers" },
  { label: "Company", to: "/company", menuKey: "Company" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const closeTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const openMegaMenu = (menuKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }
    setActiveMegaMenu(menuKey)
  }

  const scheduleCloseMegaMenu = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 120)
  }

  const toggleMegaMenu = (menuKey) => {
    if (activeMegaMenu === menuKey) {
      setActiveMegaMenu(null)
    } else {
      setActiveMegaMenu(menuKey)
    }
  }

  const isMobile = () => window.innerWidth < 1024 // lg breakpoint

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex items-center justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          
          {/* Logo */}
          <NavLink to="/" className="navbar-logo flex-shrink-0">
                <img src={coinbaseLogo} alt="Coinbase Logo" className="w-8 md:w-10 h-8 md:h-10" />
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center justify-center gap-2 text-black-700 text-xl font-semibold">
            {desktopNavLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={link.menuKey ? () => openMegaMenu(link.menuKey) : scheduleCloseMegaMenu}
                onMouseLeave={link.menuKey ? scheduleCloseMegaMenu : undefined}
              >
                <NavLink to={link.to} className="px-3 py-2 rounded-full text-sm transition-colors duration-200 hover:bg-gray-100">
                  {link.label}
                </NavLink>
              </div>
            ))}

          </div>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          
          <button className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
            <FaSearch />
          </button>
          {/* Search dropdown */}


          <div className="relative">
            <button
              className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
              aria-label="Select language and region"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
            >
              <FaGlobe />
            </button>

            <AnimatePresence>
              {isLanguageOpen && <LanguageDropdown onClose={() => setIsLanguageOpen(false)} position="bottom" isMobile={false} />}
            </AnimatePresence>
          </div>

          <NavLink
            to="/signin"
            className="px-3 md:px-4 py-2 rounded-full bg-gray-100 text-black-500 font-semibold text-sm hover:bg-gray-200"
          >
            Sign in
          </NavLink>

          <NavLink
            to="/signup"
            className="px-4 md:px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
          >
            Sign up
          </NavLink>
        </div>

        {/* Right Section - Mobile */}
        <div className="lg:hidden flex items-center gap-3 flex-shrink-0">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
            <FaSearch />
          </button>

          <NavLink
            to="/signup"
            className="px-3 py-2 rounded-full bg-blue-600 text-white font-semibold text-xs md:text-sm hover:bg-blue-700"
          >
            Sign up
          </NavLink>

          <button
            className="text-xl md:text-2xl flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <MdClose /> : <HiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMegaMenu && (
          <MegaNavDropdown
            menuKey={activeMegaMenu}
            onMouseEnter={() => openMegaMenu(activeMegaMenu)}
            onMouseLeave={scheduleCloseMegaMenu}
            onLinkClick={() => setActiveMegaMenu(null)}
            onBackdropClick={() => setActiveMegaMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white w-full px-4 md:px-6 py-4 space-y-3 text-gray-700 font-medium max-h-[calc(100vh-140px)] overflow-y-auto">
          <NavLink to="/explore" className="block py-2 text-sm md:text-base hover:text-blue-600">
            Cryptocurrencies
          </NavLink>
          <div>
            <button 
              onClick={() => toggleMegaMenu("Individuals")}
              className="block w-full text-left py-2 text-sm md:text-base hover:text-blue-600"
            >
              Individuals {activeMegaMenu === "Individuals" ? "▼" : ">"}
            </button>
            {activeMegaMenu === "Individuals" && (
              <div className="pl-4 py-2">
                <MegaNavDropdown
                  menuKey="Individuals"
                  onLinkClick={() => {
                    setActiveMegaMenu(null)
                    setIsOpen(false)
                  }}
                  onBackdropClick={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>
          <div>
            <button 
              onClick={() => toggleMegaMenu("Businesses")}
              className="block w-full text-left py-2 text-sm md:text-base hover:text-blue-600"
            >
              Businesses {activeMegaMenu === "Businesses" ? "▼" : ">"}
            </button>
            {activeMegaMenu === "Businesses" && (
              <div className="pl-4 py-2">
                <MegaNavDropdown
                  menuKey="Businesses"
                  onLinkClick={() => {
                    setActiveMegaMenu(null)
                    setIsOpen(false)
                  }}
                  onBackdropClick={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>
          <div>
            <button 
              onClick={() => toggleMegaMenu("Institutions")}
              className="block w-full text-left py-2 text-sm md:text-base hover:text-blue-600"
            >
              Institutions {activeMegaMenu === "Institutions" ? "▼" : ">"}
            </button>
            {activeMegaMenu === "Institutions" && (
              <div className="pl-4 py-2">
                <MegaNavDropdown
                  menuKey="Institutions"
                  onLinkClick={() => {
                    setActiveMegaMenu(null)
                    setIsOpen(false)
                  }}
                  onBackdropClick={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>
          <div>
            <button 
              onClick={() => toggleMegaMenu("Developers")}
              className="block w-full text-left py-2 text-sm md:text-base hover:text-blue-600"
            >
              Developers {activeMegaMenu === "Developers" ? "▼" : ">"}
            </button>
            {activeMegaMenu === "Developers" && (
              <div className="pl-4 py-2">
                <MegaNavDropdown
                  menuKey="Developers"
                  onLinkClick={() => {
                    setActiveMegaMenu(null)
                    setIsOpen(false)
                  }}
                  onBackdropClick={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>
          <div>
            <button 
              onClick={() => toggleMegaMenu("Company")}
              className="block w-full text-left py-2 text-sm md:text-base hover:text-blue-600"
            >
              Company {activeMegaMenu === "Company" ? "▼" : ">"}
            </button>
            {activeMegaMenu === "Company" && (
              <div className="pl-4 py-2">
                <MegaNavDropdown
                  menuKey="Company"
                  onLinkClick={() => {
                    setActiveMegaMenu(null)
                    setIsOpen(false)
                  }}
                  onBackdropClick={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>

          {/* Bottom Section - Language and Sign In */}
          <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between gap-4">
            <div className="relative z-50">
              <button
                className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                onClick={() => setIsLanguageOpen((prev) => !prev)}
              >
                <FaGlobe />
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && <LanguageDropdown onClose={() => setIsLanguageOpen(false)} position="top" isMobile={true} />}
              </AnimatePresence>
            </div>

            <NavLink
              to="/signin"
              className="px-4 py-2 rounded-full bg-gray-100 text-center text-sm md:text-base hover:bg-gray-200"
            >
              Sign in
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}