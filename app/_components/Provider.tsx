"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        {children}
        <Toaster position="bottom-right" />
      </SessionProvider>
    </>
  );
};

export default Provider;
