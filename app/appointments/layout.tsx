"use client";

import React, { useEffect } from "react";
import SidebarLayout from "../_components/sidebar/sidebar-layout";
import Lenis from "@studio-freight/lenis";
import SmoothScroll from "../_components/smooth-scroll";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default DashboardLayout;
