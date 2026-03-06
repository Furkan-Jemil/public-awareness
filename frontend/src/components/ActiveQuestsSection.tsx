import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ActiveQuestsSection = () => {
  return (
    <section className="py-24 px-6 lg:px-20 bg-neutral-dark/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-4xl font-black tracking-tight">ACTIVE QUESTS</h2>
          <Link href="#" className="text-primary font-bold flex items-center gap-2 hover:underline">
            View all active reports <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quest Card 1 */}
          <div className="bg-neutral-dark rounded-2xl overflow-hidden border border-white/5 flex flex-col">
            <div className="h-48 w-full bg-slate-800 relative">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                Pavement Repair Image
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent"></div>
              <span className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black px-2 py-1 rounded">URGENT</span>
            </div>
            <div className="p-6">
              <h4 className="text-white font-bold text-lg mb-2">Pavement Repair</h4>
              <p className="text-slate-400 text-sm mb-6">Main St & 5th Ave - Multiple hazards reported by 42 citizens.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>PROGRESS</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[75%] shadow-[0_0_8px_#00FF00]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quest Card 2 */}
          <div className="bg-neutral-dark rounded-2xl overflow-hidden border border-white/5 flex flex-col">
            <div className="h-48 w-full bg-slate-800 relative">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                Wall Mural Cleanup Image
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded">COMMUNITY</span>
            </div>
            <div className="p-6">
              <h4 className="text-white font-bold text-lg mb-2">Wall Mural Cleanup</h4>
              <p className="text-slate-400 text-sm mb-6">Arts District - Restoring the 'Unity' mural after vandalism.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>PROGRESS</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[30%] shadow-[0_0_8px_#00FF00]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quest Card 3 */}
          <div className="bg-neutral-dark rounded-2xl overflow-hidden border border-white/5 flex flex-col">
            <div className="h-48 w-full bg-slate-800 relative">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                Park Refurbishment Image
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent"></div>
              <span className="absolute top-4 left-4 bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded">PLANNED</span>
            </div>
            <div className="p-6">
              <h4 className="text-white font-bold text-lg mb-2">Park Refurbishment</h4>
              <p className="text-slate-400 text-sm mb-6">Oak Grove Park - New seating and light fixtures installation.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>PROGRESS</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[10%] shadow-[0_0_8px_#00FF00]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveQuestsSection;