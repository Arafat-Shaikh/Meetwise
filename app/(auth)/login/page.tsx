"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/icon";
import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <Button
        onClick={() => signIn("google", { redirect: false })}
        className="bg-white text-black hover:bg-gray-200 transition"
      >
        Sign in with Google
        <GoogleIcon />
      </Button>
    </div>
  );
};

export default Login;
