import Link from 'next/link';

const CivicFooter = () => {
  return (
    <footer className="bg-neutral-dark pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">token</span>
              <h2 className="text-white text-xl font-black tracking-tighter">CIVICTECH</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The world's leading platform for grassroots civic engagement and urban improvement.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-white text-lg">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-white text-lg">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-white text-lg">mail</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Active Map</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Mobile App</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Rules</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Community</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Top Contributors</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">City Partnerships</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Impact Reports</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 CIVICTECH. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors" href="#">Cookies</a>
            <a className="hover:text-white transition-colors" href="#">Legal</a>
            <a className="hover:text-white transition-colors" href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CivicFooter;