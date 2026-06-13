import { useState, useEffect, useRef, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis, useLenis } from "../hooks/useLenis";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About", hasDropdown: true },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Reference to track previous scroll position manually
  const lastScrollY = useRef(0);
  const idleTimerRef = useRef(null);

  // Auto-hide navbar when idle in the Hero section
  useEffect(() => {
    const handleActivity = () => {
      // If we are at the top, activity wakes up the navbar
      if (lastScrollY.current < 120) {
        setHidden(false);
      }

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      idleTimerRef.current = setTimeout(() => {
        // Only auto-hide if we are at the top and the mobile menu is not open
        if (lastScrollY.current < 120 && !isOpen) {
          setHidden(true);
        }
      }, 3000); // 3 seconds of zero interaction
    };

    handleActivity();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isOpen]);

  // Hide on scroll down, show on scroll up perfectly synced with Lenis
  useLenis((e) => {
    const currentY = e.scroll;
    setScrolled(currentY > 20);

    // Ignore tiny scroll jitters
    const delta = currentY - lastScrollY.current;
    if (Math.abs(delta) < 0.5) return;

    // Scrolling down -> positive delta -> Hide
    if (delta > 0 && currentY > 120) {
      setHidden(true);
    }
    // Scrolling up -> negative delta -> Show
    else if (delta < 0) {
      setHidden(false);
    }

    lastScrollY.current = currentY;
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Yield to the main thread so the browser can instantly paint the click interaction (Perfect INP)
    setTimeout(() => {
      startTransition(() => {
        setIsOpen(false);

        const scrollToTarget = () => {
          const lenis = getLenis();
          const target = document.querySelector(href);

          if (lenis && target) {
            lenis.scrollTo(target, { offset: 80, duration: 1.2 });
          } else if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        };

        if (location.pathname !== "/") {
          navigate("/");
          requestAnimationFrame(() => {
            setTimeout(scrollToTarget, 100);
          });
          return;
        }

        scrollToTarget();
      });
    }, 0);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-4 lg:top-6 left-0 right-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -120, opacity: 0 }}
          animate={{
            y: hidden && !isOpen ? -140 : 0,
            opacity: hidden && !isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className={`pointer-events-auto w-[92%] max-w-[1100px] transition-all duration-500 rounded-full will-change-transform ${scrolled
            ? "bg-[#0a0a0f]/70 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-white/2 backdrop-blur-lg border border-white/5"
            }`}
        >
          <div className="flex items-center justify-between h-16 lg:h-[60px] px-6 lg:px-10 w-full">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start items-center" style={{ marginLeft: '1vh' }}>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="font-['Inria_Serif'] italic font-bold text-[36px] lg:text-[30px] tracking-[-1.2px] lg:tracking-[1.5px] text-white leading-none transition-opacity duration-300 hover:opacity-80 flex items-start"
              >
                GK
                <span className="text-[11px] lg:text-[13px] ml-0.5 mt-1 lg:mt-[5px] opacity-70">
                  ®
                </span>
              </a>
            </div>

            {/* Center: Desktop links */}
            <div className="hidden lg:flex items-center justify-center gap-[34px] flex-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group flex items-center gap-1.5 text-[14px] lg:text-[15px] font-medium tracking-[-0.2px] text-white/80 hover:text-white transition-all duration-300"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-60 group-hover:opacity-100 transition-opacity mt-0.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Right: Contact Button */}
            <div className="hidden lg:flex items-center justify-end flex-1" style={{ marginRight: '2vh' }}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="h-[30px] px-5 rounded-full bg-[#5B3DF5] hover:bg-[#6C4DFF] flex items-center justify-center text-white text-[16px] font-medium tracking-[1px] whitespace-nowrap transition-all duration-300 shadow-[0_0_20px_rgba(91,61,245,0.4)] hover:shadow-[0_0_30px_rgba(91,61,245,0.6)]"
              >
                CONTACT
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center transition-colors duration-300 bg-white/5 hover:bg-white/10 rounded-full"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center gap-[5px] w-[18px]">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="h-[1.5px] w-full bg-white block origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-[1.5px] w-full bg-white block"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="h-[1.5px] w-full bg-white block origin-center"
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-[#030208] backdrop-blur-3xl"
            />

            <nav className="relative z-10 flex flex-col items-center gap-8 w-full px-6">
              {[...navItems, { href: "#contact", label: "Contact" }].map(
                (item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-['Clash_Display'] text-4xl md:text-5xl font-medium tracking-wide text-white hover:text-[#5B3DF5] transition-colors duration-300"
                  >
                    {item.label}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;