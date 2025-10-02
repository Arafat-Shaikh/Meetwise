import React, { useEffect } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
