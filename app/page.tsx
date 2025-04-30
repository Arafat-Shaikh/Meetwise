"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const session = useSession();
  console.log(session.data?.user);
  return <div>{session.status}</div>;
};

export default Home;
