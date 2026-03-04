'use client';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[1304px] mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top: Let's talk + Drop me a line */}
        <div className="mb-20">
          <h2
            className="text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-normal leading-[1] tracking-tight text-white"
            style={{ fontFamily: '"Gupter", serif' }}
          >
            Let&apos;s talk
          </h2>
        </div>

        {/* Middle: Nav + Contact columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {/* Navigation */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-light mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-light mb-6">
              Socials
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/darshanr3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Darshan-aiml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-light mb-6">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:darshanr.aiml@gmail.com"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  darshanr.aiml@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918072305981"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  +91 8072305981
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Darshan R
          </p>
          <p className="text-xs text-white/30">
            Crafted with intention and purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
