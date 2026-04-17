import {
  OtpIcon,
  JwtIcon,
  EncryptIcon,
  AuditIcon,
} from './HomeIcons';

export const features = [
  {
    Icon: OtpIcon,
    title: 'OTP Verification',
    desc: 'Time-based one-time passwords with 30-second rotation and brute-force lockout.',
  },
  {
    Icon: JwtIcon,
    title: 'JWT Sessions',
    desc: 'Stateless, signed tokens with configurable expiry and silent refresh flows.',
  },
  {
    Icon: EncryptIcon,
    title: 'End-to-End Encrypted',
    desc: 'AES-256 at rest, TLS 1.3 in transit. Your secrets stay yours.',
  },
  {
    Icon: AuditIcon,
    title: 'Audit Logs',
    desc: 'Every login, logout and permission change timestamped and tamper-evident.',
  },
];

export const testimonials = [
  {
    name: 'Aisha Menon',
    role: 'CTO, Lumos Finance',
    avatar: 'AM',
    quote:
      "We replaced three auth vendors with SecurePiece in a weekend. Best migration decision we've made.",
  },
  {
    name: 'Derek Strauss',
    role: 'Lead Engineer, Orbit Health',
    avatar: 'DS',
    quote:
      'HIPAA-ready out of the box. Audit logs alone saved us six weeks of compliance work.',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, Stacklane',
    avatar: 'PN',
    quote:
      "Sub-100ms auth on every request. Our users don't even notice the security layer — that's the point.",
  },
];
