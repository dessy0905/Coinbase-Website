import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { MdArrowBack } from "react-icons/md"

const LANGUAGES = [
  { name: "English", region: "Global", active: true },
  { name: "Espanol", region: "United States" },
  { name: "English", region: "United States" },
  { name: "Deutsch", region: "Germany" },
  { name: "Francais", region: "France" },
  { name: "Italiano", region: "Italy" },
  { name: "Portugues", region: "Brazil" },
  { name: "Turkce", region: "Turkey" },
  { name: "Nihongo", region: "Japan" },
  { name: "Hangugeo", region: "Korea" },
  { name: "JianTi ZhongWen", region: "China" },
  { name: "Russkiy", region: "Russia" },
  { name: "Nederlands", region: "Netherlands" },
  { name: "Polski", region: "Poland" },
]

export default function LanguageDropdown({ onClose, isMobile = false }) {
  const [query, setQuery] = useState("")
  const ref = useRef(null)

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  const filtered = LANGUAGES.filter(
    (language) =>
      !query ||
      language.name.toLowerCase().includes(query.toLowerCase()) ||
      language.region.toLowerCase().includes(query.toLowerCase())
  )

  // Mobile Full-Screen Modal View
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 lg:hidden bg-white z-[9999] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back"
          >
            <MdArrowBack className="text-xl" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Language and region</h2>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="bg-transparent text-base text-gray-900 placeholder:text-gray-500 outline-none w-full"
            />
          </div>
        </div>

        {/* Language List */}
        <div className="px-4">
          {filtered.map((language, index) => (
            <button
              key={`${language.name}-${language.region}-${index}`}
              onClick={onClose}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p className="text-base font-semibold text-gray-900">{language.name}</p>
                <p className="text-sm text-gray-600">{language.region}</p>
              </div>
              {language.active && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </motion.div>
    )
  }

  // Desktop Dropdown View
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-[calc(100%+8px)] right-0 w-[320px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden border border-gray-100"
    >
      <div className="px-5 pt-5 pb-3">
        <p className="text-[0.8125rem] font-semibold text-gray-600 mb-3">Language and region</p>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="bg-transparent text-[0.875rem] text-gray-900 placeholder:text-gray-500 outline-none w-full"
          />
        </div>
      </div>

      <div className="max-h-[320px] overflow-y-auto pb-3">
        {filtered.map((language, index) => (
          <button
            key={`${language.name}-${language.region}-${index}`}
            onClick={onClose}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <div>
              <p className="text-[0.875rem] font-semibold text-gray-900">{language.name}</p>
              <p className="text-[0.8125rem] text-gray-600">{language.region}</p>
            </div>
            {language.active && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600 shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
