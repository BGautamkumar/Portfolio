import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);



const Contact = () => {
  const sectionRef = useRef(null);
  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    need: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);


  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setContactSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({
        name: "",
        email: "",
        need: "",
      });
    }, 3000);
  };



  return (
    <section id="contact" ref={sectionRef} className="relative" style={{ backgroundColor: '#000000' }}>
      {/* Top separator removed to create a cleaner transition */}

      <div className="section-spacing" style={{ paddingBottom: '2rem' }}>
        <div className="container-cinematic flex flex-col items-center text-center">

          {/* Giant heading with line-by-line reveal */}
          <div className="contact-heading max-w-4xl mb-16 overflow-visible flex flex-col items-center">
            <h2 className="text-hero text-white leading-[0.95] tracking-tight">
              <span className="contact-heading-line block">Let's build</span>
              <span className="contact-heading-line block whitespace-nowrap">
                something <span className="text-[#ff3b3b] italic pr-2">great</span>
              </span>
              <span className="contact-heading-line block">together<span className="text-[#ff3b3b]">.</span></span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-body max-w-md mb-28" style={{ marginTop: '2vh', marginBottom: '3vh' }}
          >
            I'm always open to new projects and opportunities. Whether
            you have an idea or just want to connect — let's talk.
          </motion.p>

          {/* ═══ Contact Grid (Form & Sidebar Card) ═══ */}
          <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-[1.5fr_0.75fr] gap-12 lg:gap-20 text-left max-w-6xl mx-auto mb-24">
            {/* Left Column: Detailed Contact Form */}
            <div className="flex flex-col">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-8">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white/80 uppercase tracking-wider">
                      Your name <span className="text-[#eab308] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white text-[16px] md:text-[18px] placeholder-white/30 focus:outline-none focus:border-[#5B3DF5] focus:ring-1 focus:ring-[#5B3DF5] transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white/80 uppercase tracking-wider">
                      Your email <span className="text-[#eab308] ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white text-[16px] md:text-[18px] placeholder-white/30 focus:outline-none focus:border-[#5B3DF5] focus:ring-1 focus:ring-[#5B3DF5] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Row 2: Your need */}
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-white/80 uppercase tracking-wider">Your message</label>
                  <textarea
                    placeholder="Tell me about your project, team, or opportunity..."
                    value={formData.need}
                    onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-white text-[16px] md:text-[18px] placeholder-white/30 focus:outline-none focus:border-[#5B3DF5] focus:ring-1 focus:ring-[#5B3DF5] transition-all duration-300 min-h-[160px] md:min-h-[200px] resize-none"
                  />
                </div>

                {/* Send Button */}
                <div className="mt-2 flex flex-col w-full gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={contactSubmitted}
                    className="h-[55px] w-full rounded-2xl bg-white hover:bg-white/90 text-bg-primary text-[14px] font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactSubmitted ? "Message Sent" : "Send Message"}
                  </motion.button>
                  <AnimatePresence>
                    {contactSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#10111A] border border-[#5B3DF5]/30 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 self-start"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B3DF5] animate-ping" />
                        Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

            {/* Right Column: Premium Contact Card */}
            <div className="bg-white/3 border border-white/8 text-center backdrop-blur-xl rounded-4xl p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl h-full group" style={{ marginLeft: '12vh', marginRight: '0.5vh' }}>
              {/* Soft glow effect */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#5B3DF5]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#5B3DF5]/30 transition-colors duration-700" />

              <div className="flex flex-col gap-10 w-full relative z-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-['Clash_Display'] font-semibold text-white">Available for Opportunities</h3>
                  <p className="text-sm text-white/60">Software Engineer • Full Stack Developer</p>
                </div>

                <div className="flex flex-col gap-10 items-center">
                  <span className="text-[12px] font-semibold uppercase tracking-widest text-white/40 mb-1 text-center">Open to:</span>
                  <ul className="text-sm text-white/80 space-y-2 w-full flex flex-col items-center">
                    <li className="flex items-center justify-center gap-3">
                      Internships
                    </li>
                    <li className="flex items-center justify-center gap-3">
                      Full-Time Roles
                    </li>
                    <li className="flex items-center justify-center gap-3">
                      Freelance Projects
                    </li>
                    <li className="flex items-center justify-center gap-3">
                      Collaborations
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>




          {/* ═══ Redesigned Footer ═══ */}
          <footer className="w-full mt-32 pb-8 pt-16 md:pt-24 relative overflow-hidden rounded-t-[5rem] rounded-b-[2rem] bg-[#050505] mx-auto" style={{ marginTop: '7vh' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full z-10 relative px-6 md:px-12 max-w-7xl mx-auto">

              {/* Column 1: Location & Contact */}
              <div className="flex flex-col gap-10 justify-self-start md:justify-self-center lg:justify-self-start">
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] md:text-[15px] font-medium text-white/40">Location</span>
                  <span className="text-[14px] md:text-[18px] font-medium text-white" style={{ marginLeft: '3vh' }}>Visakhapatnam, Andhra Pradesh, India</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] md:text-[15px] font-medium text-white/40">Contact</span>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:gautamnani67@gmail.com" className="text-[14px] md:text-[18px] font-medium text-white hover:text-[#5B3DF5] transition-colors">gautamnani67@gmail.com</a>
                    <a href="tel:+918712269725" className="text-[14px] md:text-[18px] font-medium text-white hover:text-[#5B3DF5] transition-colors">+91 87122 69725</a>
                  </div>
                </div>
              </div>

              {/* Column 2: Links */}
              <div className="flex justify-start md:justify-center">
                <div className="flex gap-8 md:gap-12">
                  <span className="text-[12px] md:text-[14px] font-medium text-white/40 mt-1">Links</span>
                  <div className="flex flex-col gap-6">
                    <a href="#home" className="text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight">Home</a>
                    <a href="#about" className="text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight">About Us</a>
                    <a href="#projects" className="text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight">Projects</a>
                    <a href="#experience" className="text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight">Experience</a>
                  </div>
                </div>
              </div>

              {/* Column 3: Socials */}
              <div className="flex justify-start md:justify-end">
                <div className="flex gap-8 md:gap-12" style={{ marginRight: '6vh' }}>
                  <span className="text-[12px] md:text-[14px] font-medium text-white/40 mt-1">Socials</span>
                  <div className="flex flex-col gap-6" >
                    <a href="https://www.instagram.com/nameisgautam_?igsh=MTVoNTI2NWliOWhtZA==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight group">
                      <FaInstagram className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                      Instagram
                    </a>
                    <a href="https://linkedin.com/in/gautamkumarb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight group">
                      <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/BGautamkumar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight group">
                      <FaGithub className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                      GitHub
                    </a>
                    <a href="https://x.com/iamgautam67" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[20px] md:text-[20px] font-medium text-white hover:text-[#5B3DF5] transition-colors tracking-tight group">
                      <FaXTwitter className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                      Twitter (X)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Giant Typography – Arkitek-style chrome fade */}
            <div
              className="w-full flex justify-center items-end select-none pointer-events-none relative z-0 overflow-hidden"
              style={{ height: 'clamp(6rem, 16vw, 18rem)', marginTop: '3rem' }}
            >
              <h1
                className="font-['Clash_Display'] font-bold text-center tracking-tight leading-[0.85]"
                style={{
                  fontSize: 'clamp(6rem, 18vw, 20rem)',
                  background: 'linear-gradient(180deg, rgba(190,190,200,0.95) 0%, rgba(130,130,145,0.65) 40%, rgba(55,55,60,0.3) 70%, rgba(10,10,12,0) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  maskImage: 'linear-gradient(to bottom, white 20%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 85%)',
                  transform: 'translateY(15%)',
                }}
              >
                G a u t a m
              </h1>
            </div>

            {/* Footer Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 md:px-16 relative z-10 max-w-7xl mx-auto">
              <p className="text-[11px] font-medium text-white/40 mb-4 sm:mb-0" style={{ marginLeft: '5vh' }}>© 2026 Gautam Kumar. All Rights Reserved</p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <span className="text-[11px] font-medium text-white group-hover:text-[#dbfcad] transition-colors">Back to Top</span>
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#dbfcad] transition-colors bg-white/5">
                  <svg className="w-3 h-3 text-white group-hover:text-[#dbfcad] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;
