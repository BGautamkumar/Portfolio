import { useState } from "react";
import { motion } from "framer-motion";

const Navigation = ({ mobile = false, onItemClick = () => {} }) => {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <ul className={mobile ? "space-y-4" : "flex items-center gap-8"}>
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={() => onItemClick()}
            className="nav-link-premium text-lg"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-premium">
      <div className="container-premium">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-display text-white font-bold tracking-tight ml-0.5" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            GK
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6 : 0,
              }}
              className="w-full h-0.5 bg-white"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className="w-full h-0.5 bg-white"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6 : 0,
              }}
              className="w-full h-0.5 bg-white"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="lg:hidden"
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="py-8">
            <Navigation 
              mobile 
              onItemClick={() => setIsOpen(false)} 
            />
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;