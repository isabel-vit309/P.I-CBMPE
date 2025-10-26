import { GoHome } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { NavItem } from "./NavItem";
import { UserPen } from "lucide-react";
import {
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUserAdd,
} from "react-icons/hi";

export function Navigation() {
  return (
    <nav className="space-y-0 w-full">
      <NavItem title="Início" icon={GoHome} to="/home" />
      <NavItem
        title="Lista de Ocorrências"
        icon={HiOutlineClipboardList}
        to="/list"
      />
      <NavItem title="Lista de Usuários" icon={HiOutlineUsers} to="#" />
      <NavItem
        title="Registrar usuários"
        icon={HiOutlineUserAdd}
        to="/registeruser"
      />
      <NavItem
        title="Registrar Ocorrências"
        icon={RiFileList3Line}
        to="/new-occurrence"
      />
      <NavItem title="Perfil" icon={UserPen} to="/profile" />
      <NavItem title="Configurações" icon={HiOutlineCog} to="/settings" />
    </nav>
  );
}
