import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="z-50 flex p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <div className="fixed z-50 mr-4 h-8 w-8 shadow-inner">
          <Image fill alt="Logo" src="/help-desk.png" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
