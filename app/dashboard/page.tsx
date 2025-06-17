"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <div>
        <div>
          <Button onClick={() => signOut()}>log out</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
