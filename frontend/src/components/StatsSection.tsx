const StatsSection = () => {
  return (
    <section className="bg-neutral-dark py-16 px-6 lg:px-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <div className="text-5xl font-black text-white mb-2">12,000+</div>
          <div className="text-primary font-bold uppercase tracking-widest text-sm">Active Citizens</div>
        </div>
        <div>
          <div className="text-5xl font-black text-white mb-2">850+</div>
          <div className="text-primary font-bold uppercase tracking-widest text-sm">Issues Fixed</div>
        </div>
        <div>
          <div className="text-5xl font-black text-white mb-2">3K+</div>
          <div className="text-primary font-bold uppercase tracking-widest text-sm">Verified Photos</div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;