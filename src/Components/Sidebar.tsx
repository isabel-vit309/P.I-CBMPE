import { useState } from "react";
import { Settings, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { GoPerson } from "react-icons/go";
import { Navigation } from "../Components/Navigation/Navigation";
import { IoSearch } from "react-icons/io5";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="block [@media(min-width:1024px)]:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-zinc-200 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 [@media(min-width:1130px)]:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={
          isOpen
            ? "fixed left-0 z-50 bg-white w-80 border-r border-zinc-200 shadow-lg p-4 h-screen top-0 flex flex-col"
            : "hidden [@media(min-width:1024px)]:block border-r border-zinc-200 shadow-lg p-4 h-screen sticky top-0 flex flex-col"
        }
      >
        {isOpen && (
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 p-2 [@media(min-width:1024px)]:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div>
          <Logo />
          <div className="flex items-center mt-4 ml-16 space-x-4">
            <div className="flex w-12 h-12 bg-input rounded-full items-center justify-center text-zinc-500">
              <GoPerson className="w-6 h-6" />
            </div>
            <Settings className="w-6 h-6" />
          </div>

          <div className="relative w-[14rem] ml-0 mt-4 border-b border-zinc-300 bg-input rounded">
            <IoSearch className="absolute left-2 top-2.5 w-5 h-5 text-zinc-600" />
            <input
              type="text"
              placeholder="Pesquisar por..."
              className="w-full pl-9 pr-3 py-2 border-0 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Navigation onItemClick={closeSidebar} />
        </div>
      </aside>
    </>
  );
}
