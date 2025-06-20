"use client";

import { Input } from "@/components/ui/input";

const ProfileSetup = () => {
  return (
    <div className="bg-gradient-to-b from-violet-950 to-violet-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-transparent border border-violet-700 min-w-full lg:min-w-[400px] rounded-md p-10">
        <div className="text-white">first name</div>
        <Input placeholder="firstname" className="" />
      </div>
    </div>
  );
};

export default ProfileSetup;
