const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 lg:px-20 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 text-center lg:text-left tracking-tight">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-dark p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform block">photo_camera</span>
            <h3 className="text-xl font-bold mb-4 text-white">Snap a Photo</h3>
            <p className="text-slate-400 leading-relaxed">Capture the issue instantly using our secure mobile interface with GPS tagging.</p>
          </div>
          <div className="bg-neutral-dark p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform block">verified_user</span>
            <h3 className="text-xl font-bold mb-4 text-white">Verify Details</h3>
            <p className="text-slate-400 leading-relaxed">Community members and AI systems validate the urgency and location of the report.</p>
          </div>
          <div className="bg-neutral-dark p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform block">build_circle</span>
            <h3 className="text-xl font-bold mb-4 text-white">See the Fix</h3>
            <p className="text-slate-400 leading-relaxed">Watch the improvement happen in real-time as local teams are deployed to the site.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;