'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ActiveQuestsSection from '@/components/ActiveQuestsSection';
import CommunityGallerySection from '@/components/CommunityGallerySection';
import CivicFooter from '@/components/CivicFooter';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ActiveQuestsSection />
      <CommunityGallerySection />
      <CivicFooter />
    </div>
  );
};

export default HomePage;