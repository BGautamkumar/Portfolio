import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="section-premium">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Heading */}
          <div className="inline-block">
            <h2 className="text-headline text-white mb-4 mt-24">
              Let's Build Something Great Together
            </h2>
            <div className="w-70 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mx-auto mb-8" />
          </div>

          {/* Description */}
          <p className="text-body text-xl mb-14">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          {/* Rectangle Shape Box with Multiple Glow Effects and Form */}
          <div className="relative w-full max-w-2xl mx-auto mb-4">
            {/* Animated Glow Card - Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 102, 255, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.2)",
                  "0 0 20px rgba(0, 102, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Soft Gradient Glow Panel - Background glow */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/15 to-transparent blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Pulsing Glow Panel - Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-blue-500/30"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Gradient Animation Card - Rotating gradient */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(0, 102, 255, 0.1), rgba(147, 51, 234, 0.1))",
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(0, 102, 255, 0.1))",
                  "linear-gradient(225deg, rgba(0, 102, 255, 0.1), rgba(147, 51, 234, 0.1))",
                  "linear-gradient(315deg, rgba(147, 51, 234, 0.1), rgba(0, 102, 255, 0.1))",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Shimmering Container - Moving shimmer */}
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "200%" }}
              />
            </motion.div>
            
            {/* Main Rectangle Box with Premium Form Layout */}
            <div className="relative w-full h-full bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 border border-neutral-700/50 rounded-xl backdrop-blur-sm p-6">
              <div className="space-y-4">
                {/* Name and Mail id side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.15)] text-white px-4 py-3 placeholder-white/50 transition-all duration-300 focus:border-accent focus:shadow-[0_0_40px_rgba(99,102,241,0.25)] focus:outline-none hover:bg-white/10 text-sm"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Mail id"
                      className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.15)] text-white px-4 py-3 placeholder-white/50 transition-all duration-300 focus:border-accent focus:shadow-[0_0_40px_rgba(99,102,241,0.25)] focus:outline-none hover:bg-white/10 text-sm"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Message field below */}
                <div className="relative">
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.15)] text-white px-4 py-3 placeholder-white/50 transition-all duration-300 focus:border-accent focus:shadow-[0_0_40px_rgba(99,102,241,0.25)] focus:outline-none hover:bg-white/10 text-sm resize-none"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
                </div>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send message
                </motion.button>
              </div>
            </div>
          </div>

          {/* Or reach out directly text */}
          <p className="text-neutral-400 mb-8">Or reach out directly</p>

          {/* Icon-based buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="mailto:gautamkumarbudid18@gmail.com"
              className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-neutral-700 hover:border-neutral-600"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 6l-6 4 6-4z"/>
                </svg>
              </div>
              gautamkumarbudid18@gmail.com
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/gautamkumarb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-neutral-700 hover:border-neutral-600"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 0 0-2 2H5a2 2 0 0 0 0-2 2v14a2 2 0 0 0 0 2 2h14a2 2 0 0 0 0 2-2V5a2 2 0 0 0 0-2-2zM5 7h14v10H5V7z"/>
                  <path d="M5 7h14v10H5V7z" opacity="0.3"/>
                </svg>
              </div>
              LinkedIn Profile
            </motion.a>
          </div>

          {/* Availability text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-caption">
              Available for freelance work and full-time opportunities
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
