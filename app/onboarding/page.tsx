"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // redirect to step by default
    router.replace("/onboarding/step/1");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-t pt-6 bg-[#151a1d] relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-950/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-950/10 rounded-full blur-3xl"></div>
      <div className="text-white flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p>Setting up your profile...</p>
      </div>
    </div>
  );
}
