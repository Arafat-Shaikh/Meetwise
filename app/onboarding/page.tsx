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
    <div className="min-h-screen bg-gradient-to-t from-black/90 to-violet-950/90 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4">Setting up your profile...</p>
      </div>
    </div>
  );
}
