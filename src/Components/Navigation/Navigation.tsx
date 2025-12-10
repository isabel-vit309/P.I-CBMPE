import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import {
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { NavItem } from "./NavItem";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onItemClick?: () => void;
}

export function Navigation({ onItemClick }: NavigationProps) {
  const [role, setRole] = useState(
    localStorage.getItem("role")?.trim().toUpperCase() || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole?.trim().toUpperCase() || "");
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="space-y-0 w-full">
      <NavItem title="Início" icon={GoHome} to="/home" onClick={onItemClick} />
      <NavItem
        title="Lista de Ocorrências"
        icon={HiOutlineClipboardList}
        to="/list"
        onClick={onItemClick}
      />

      {role === "ADMIN" && (
        <NavItem
          title="Lista de Usuários"
          icon={HiOutlineUsers}
          to="/listusers"
          onClick={onItemClick}
        />
      )}
      {role === "ADMIN" && (
        <NavItem
          title="Registrar usuários"
          icon={HiOutlineUserAdd}
          to="/registeruser"
          onClick={onItemClick}
        />
      )}
      <NavItem
        title="Registrar Ocorrências"
        icon={RiFileList3Line}
        to="/new-occurrence"
        onClick={onItemClick}
      />
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full px-4 py-3 text-left text-red-600 font-medium hover:bg-gray-100 rounded-md mt-2"
      >
        Sair
      </button>
    </nav>
  );
}
