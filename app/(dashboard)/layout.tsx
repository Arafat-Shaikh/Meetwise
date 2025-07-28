import { getTimeSlots } from "@/action/user";
import SidebarLayout from "../_components/sidebar/sidebar-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default DashboardLayout;
