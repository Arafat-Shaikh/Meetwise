import Link from "next/link";
import React from "react";

const InvalidUsername = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <h1 className="text-3xl font-semibold mb-4 text-neutral-100">
        User not found
      </h1>
      <p className="text-muted-foreground mb-6">
        The scheduling page you're looking for doesn’t exist.
      </p>
      <Link href="/" className="text-neutral-600 underline">
        Go back to homepage
      </Link>
    </div>
  );
};

export default InvalidUsername;
