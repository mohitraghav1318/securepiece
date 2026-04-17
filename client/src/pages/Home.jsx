import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/homeComopnents/HeroSection';
import StatsSection from '../components/homeComopnents/StatsSection';
import FeaturesSection from '../components/homeComopnents/FeaturesSection';
import TestimonialsSection from '../components/homeComopnents/TestimonialsSection';
import CtaSection from '../components/homeComopnents/CtaSection';
import { features, testimonials } from '../components/homeComopnents/homeData';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-[#0A0F1A] overflow-x-hidden selection:bg-blue-500/30">
      <HeroSection
        isLoggedIn={isLoggedIn}
        onSignup={() => navigate('/signup')}
        onLogin={() => navigate('/login')}
        onDashboard={() => navigate('/dashboard')}
      />

      <StatsSection />

      <FeaturesSection features={features} />

      <TestimonialsSection testimonials={testimonials} />

      <CtaSection
        isLoggedIn={isLoggedIn}
        onSignup={() => navigate('/signup')}
        onLogin={() => navigate('/login')}
        onDashboard={() => navigate('/dashboard')}
      />
    </div>
  );
}

export default Home;
