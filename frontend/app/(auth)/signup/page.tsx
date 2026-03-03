"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Shield, ChevronRight, Landmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-primary/5 p-8 flex justify-between items-center relative overflow-hidden">
             <div className="z-10">
                <CardTitle className="text-2xl font-bold text-gray-900">Create your Account</CardTitle>
                <CardDescription className="text-gray-500 mt-1">
                  Join the authoritative network for civic safety.
                </CardDescription>
             </div>
             <Shield className="w-16 h-16 text-primary/10 absolute -right-4 -bottom-4 rotate-12" />
          </div>
          
          <CardContent className="p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <Input 
                  type="text" 
                  placeholder="John Doe" 
                  icon={<User className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="name@institution.gov" 
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>
              
              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Input 
                  type="password" 
                  placeholder="Create a secure password" 
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">
                  Must be at least 12 characters with a mix of letters and symbols.
                </p>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" required />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-normal">
                   I agree to the <Link href="#" className="underline font-bold text-primary">Terms of Service</Link> and <Link href="#" className="underline font-bold text-primary">Privacy Policy</Link>.
                </label>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold flex gap-2 shadow-md">
                Create Account <ChevronRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-gray-50">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Log in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex gap-8">
             <div className="flex flex-col items-center text-gray-400 gap-1">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Secure</span>
             </div>
             <div className="flex flex-col items-center text-gray-400 gap-1">
                <Lock className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Encrypted</span>
             </div>
             <div className="flex flex-col items-center text-gray-400 gap-1">
                <ChevronRight className="w-5 h-5 rotate-90" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Compliance</span>
             </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-medium">
            © 2024 CivicAlerts Institutional Monitoring System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
