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
    <footer className="border-t border-gray-200 bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-lg font-bold tracking-tight text-gray-900 inline-flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-blue-600" />
            SecurePiece
          </p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-sm">
            Secure auth infrastructure for modern apps. OTP, JWT, and account
            lifecycle flows designed to ship fast and stay reliable.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-gray-800">
            Featured Pages
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {pageLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-left text-sm text-gray-500 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <link.Icon />
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-gray-800">
            Social Links
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <link.Icon />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <span>© {currentYear} SecurePiece. All rights reserved.</span>
        <span>Built with zero auth headaches.</span>
      </div>
    </footer>
  );
}

export default Footer;
