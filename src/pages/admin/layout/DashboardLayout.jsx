import { useState } from "react";
import SIDEBAR_ADMIN from "./DashboardConstant";
import { Navbar, NavbarMenuToggle } from "@heroui/navbar";
import { Outlet } from "react-router";
import DashboardLayoutSidebar from "./DashboardSidebar";
import { useAuthStore } from "../../../store/use-auth";


const DashboardLayout = (props) => {
  const { description, title } = props;
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={SIDEBAR_ADMIN}
          isOpen={open}
        />
        <div className="h-screen w-full px-4 overflow-y-auto">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            classNames={{ wrapper: "p-0" }}
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
              <NavbarMenuToggle
                className="lg:hidden"
                aria-label={open ? "Close Menu" : "Open Menu"}
                onClick={() => setOpen(!open)}
              />
          </Navbar>
          <p className="text-small">{description}</p>
          <div className="py-4 px-3">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
