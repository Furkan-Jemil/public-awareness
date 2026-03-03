"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, LogIn, Landmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pt-8">
            <div className="mx-auto w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Landmark className="text-primary w-6 h-6" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold text-primary">CivicAlerts</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mt-4">Login to CivicAlerts</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Enter your institutional credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Institutional Email Address</label>
                <Input 
                  type="email" 
                  placeholder="e.g. name@organization.gov" 
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link href="#" className="text-xs text-primary font-medium hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold flex gap-2">
                Sign In <LogIn className="w-5 h-5" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                New to CivicAlerts?{" "}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
          <Lock className="w-3 h-3" /> GOVERNMENT GRADE SECURITY
        </div>
      </div>
    </div>
  );
}
