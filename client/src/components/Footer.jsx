import { useNavigate } from 'react-router-dom';
import { ShieldIcon } from './homeComopnents/HomeIcons';

function HomeFooterIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

function AboutFooterIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c1.5-3 3.9-4.6 7-4.6s5.5 1.6 7 4.6" />
    </svg>
  );
}

function ContactFooterIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </svg>
  );
}

function DashboardFooterIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.7.5.8 5.5.8 11.7c0 5 3.2 9.3 7.7 10.8.6.1.8-.3.8-.6v-2.3c-3.1.7-3.7-1.4-3.7-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1.1 1.6 1.1 1 .1 1.8-.6 2.2-1 .1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.4-2.7 5.3-5.2 5.6.4.4.8 1 .8 2v3c0 .3.2.7.8.6 4.5-1.5 7.7-5.8 7.7-10.8C23.2 5.5 18.3.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5a2.49 2.49 0 1 0 0 4.98 2.49 2.49 0 0 0 0-4.98zM2.8 8.95h4.36V21H2.8V8.95zm7.15 0h4.19v1.64h.06c.58-1.1 2-2.25 4.12-2.25 4.4 0 5.21 2.9 5.21 6.66V21h-4.36v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.77V21H9.95V8.95z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.9 2H22l-6.7 7.7L23.2 22h-6.1l-4.8-6.3L7 22H3.9l7.1-8.2L1.5 2h6.3l4.4 5.8L18.9 2zm-1.1 18h1.7L6.8 3.9H5l12.8 16.1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const pageLinks = [
    { label: 'Home', path: '/', Icon: HomeFooterIcon },
    { label: 'About Us', path: '/about', Icon: AboutFooterIcon },
    { label: 'Contact Us', path: '/contact', Icon: ContactFooterIcon },
    { label: 'Dashboard', path: '/dashboard', Icon: DashboardFooterIcon },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
    { label: 'Twitter/X', href: 'https://x.com', Icon: TwitterIcon },
    { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#0A0F1A] px-6 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative gradient bleed behind the footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 relative z-10">
        <div className="md:col-span-2">
          <button 
            onClick={() => navigate('/')} 
            className="text-2xl font-extrabold tracking-tight text-white inline-flex items-center gap-2 mb-6 group transition-all"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <ShieldIcon className="w-6 h-6 text-blue-500" />
            </div>
            Secure<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Piece</span>
          </button>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8 font-light">
            Battle-tested authentication infrastructure for modern applications. OTP, JWT, and full account
            lifecycle management designed to ship fast.
          </p>
          
          {/* Social Links shown as Row of Icons on Desktop under description */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-sm"
              >
                <link.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold tracking-wider uppercase text-white mb-6">
            Product
          </p>
          <div className="flex flex-col gap-4">
            {pageLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-left text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-3 group"
              >
                <span className="text-slate-600 group-hover:text-blue-500 transition-colors">
                  <link.Icon className="w-4 h-4" />
                </span>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold tracking-wider uppercase text-white mb-6">
            Legal & Support
          </p>
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Security Overview</a>
            <a href="#" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Status
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-800/60 text-xs text-slate-500 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10">
        <span className="font-medium tracking-wide">© {currentYear} SecurePiece, Inc. All rights reserved.</span>
        <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
           Built with zero auth headaches.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
