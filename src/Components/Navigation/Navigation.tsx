import { GoHome} from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { UserPen } from "lucide-react";
import { HiOutlineCog } from "react-icons/hi";

export function Navigation(){
    return(
        <nav className='space-y-0 w-full'>
            <NavItem title="Início" icon={GoHome} to='/home'/>
             <NavItem title="Lista de Ocorrências" icon={LuClipboardList} to='/list'/>
             <NavItem title="Registrar Ocorrências" icon={RiFileList3Line} to='/new-occurrence'/>
             <NavItem title="Perfil" icon={UserPen} to='/profile'/>
             <NavItem title="Configurações" icon={HiOutlineCog} to='/settings'/>
        </nav>
    )
}