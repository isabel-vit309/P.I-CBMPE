import { GoHome } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { NavItem } from "./NavItem";
import { UserPen } from "lucide-react";
import {
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUserAdd,
} from "react-icons/hi";

interface NavigationProps {
  onItemClick?: () => void;
}

export function Navigation({ onItemClick }: NavigationProps) {
  return (
    <nav className="space-y-0 w-full">
      <NavItem title="Início" icon={GoHome} to="/home" onClick={onItemClick} />
      <NavItem
        title="Lista de Ocorrências"
        icon={HiOutlineClipboardList}
        to="/list"
        onClick={onItemClick}
      />
      <NavItem
        title="Lista de Usuários"
        icon={HiOutlineUsers}
        to="/listusers"
        onClick={onItemClick}
      />
      <NavItem
        title="Registrar usuários"
        icon={HiOutlineUserAdd}
        to="/registeruser"
        onClick={onItemClick}
      />
      <NavItem
        title="Registrar Ocorrências"
        icon={RiFileList3Line}
        to="/new-occurrence"
        onClick={onItemClick}
      />
      <NavItem
        title="Perfil"
        icon={UserPen}
        to="/profile"
        onClick={onItemClick}
      />
    </nav>
  );
}
