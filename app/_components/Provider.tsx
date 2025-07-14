"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./react-query-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <ReactQueryProvider>
          {children}
          <Toaster position="bottom-right" />
        </ReactQueryProvider>
      </SessionProvider>
    </>
  );
};

export default Provider;
