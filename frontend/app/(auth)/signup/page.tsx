"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Landmark, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left: Form Column */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <Landmark className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight transition-all">CivicAlerts.</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Join CivicAlerts</h1>
            <p className="text-gray-500 font-medium text-sm">Become part of the authoritative network for civic safety.</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-3 pt-4">
            <button className="flex items-center justify-center gap-3 w-full h-12 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Sign up with Google
            </button>
          </div>

          <div className="relative pt-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative px-4 bg-white text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or</span>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-900 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-12 px-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-900 ml-1">Email</label>
              <input
                type="email"
                placeholder="john@organization.gov"
                className="w-full h-12 px-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-900 ml-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="**************"
                  className="w-full h-12 px-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight ml-1">Min. 12 characters with letters & symbols.</p>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 w-4 h-4 mt-0.5" required />
              <label htmlFor="terms" className="text-[11px] font-bold text-gray-500 leading-tight">
                I agree to the <Link href="#" className="text-gray-900 underline underline-offset-2">Terms of Service</Link> and <Link href="#" className="text-gray-900 underline underline-offset-2">Privacy Policy</Link>.
              </label>
            </div>

            <button type="submit" className="w-full h-12 bg-[#4c354d] text-white font-bold rounded-xl shadow-lg shadow-purple-900/10 hover:bg-[#3d2a3e] transition-all transform active:scale-[0.98]">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm font-bold text-gray-500 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 hover:underline underline-offset-2">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image Column */}
      <div className="hidden lg:flex lg:w-[55%] items-center justify-center p-8">
        <div className="relative w-full h-full max-h-[85vh] rounded-[80px] rounded-br-[20px] rounded-tl-[20px] overflow-hidden shadow-2xl bg-gray-100 animate-pulse-slow">
          <img 
            src="/images/Heavy-City Traffic.jpg" 
            alt="City Infrastructure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
          
          <div className="absolute top-12 right-12 text-right max-w-sm">
            <h2 className="text-3xl font-bold text-white leading-[1.2] drop-shadow-xl">
              Browse real-time road conditions, water outages, and public safety alerts.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
