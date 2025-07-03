"use client";

import SidebarLayout from "../_components/sidebar/sidebar-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default DashboardLayout;
