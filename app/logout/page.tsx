"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Logout;
