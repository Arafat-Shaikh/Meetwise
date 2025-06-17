"use client";

import { useSession } from "next-auth/react";

const ProfileSetup = () => {
  const session = useSession();

  return (
    <div>
      <div>profile setup page</div>
      <div>{session.data?.user.email}</div>
    </div>
  );
};

export default ProfileSetup;
