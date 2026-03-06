'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
            JOIN THE <br />
            <span className="text-primary neon-glow">MOVEMENT</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed">
            Empowering citizens to build better cities through real-time action and verified community reporting.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="px-8 py-4 bg-primary text-black font-black rounded-xl hover:scale-105 transition-transform text-lg">
              START NOW
            </Button>
            <Button variant="outline" className="px-8 py-4 border-2 border-white/20 text-white font-black rounded-xl hover:bg-white/5 transition-all text-lg">
              VIEW MAP
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
          {/* Vibrant Gradient Container */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF00] via-[#86efac] to-[#fde047] rounded-[4rem] transform rotate-3 scale-95 opacity-20 blur-2xl"></div>
          <div className="relative w-full h-full bg-gradient-to-tr from-[#00FF00] via-[#86efac] to-[#fde047] rounded-[3rem] overflow-hidden shadow-2xl flex items-end justify-center">
            {/* Prominent Hero Image - Placeholder */}
            <div className="relative z-10 w-[90%] h-auto object-contain bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
              Citizen Engagement Platform
            </div>
            {/* Floating UI Elements */}
            <div className="absolute top-1/4 left-10 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-xl animate-bounce hidden md:block">
              <span className="material-symbols-outlined text-pink-500 text-3xl">favorite</span>
            </div>
            <div className="absolute bottom-1/4 right-10 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-xl animate-pulse hidden md:block">
              <span className="material-symbols-outlined text-green-500 text-3xl">thumb_up</span>
            </div>
            {/* Circular Badge */}
            <div className="absolute bottom-10 left-10 z-30">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                  <defs>
                    <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="circlePath"></path>
                  </defs>
                  <text className="text-[10px] font-bold uppercase fill-white tracking-widest">
                    <textPath href="#circlePath">Explore More • Let's Explore More •</textPath>
                  </text>
                </svg>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-black">sparkles</span>
                </div>
              </div>
            </div>
            {/* Abstract Sparkles */}
            <span className="material-symbols-outlined absolute top-10 right-20 text-white/40 text-4xl">blur_on</span>
            <span className="material-symbols-outlined absolute bottom-20 right-1/4 text-white/30 text-5xl">radio_button_unchecked</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;