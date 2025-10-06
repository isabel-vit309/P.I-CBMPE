import { Sidebar } from "../Components/Sidebar";

export function Profile() {
    return(
        <>
            <div className="min-h-screen grid grid-cols-sidebar">
                <Sidebar/>
                <div className="h-56 bg-primary"></div>
             

            </div>
</>
    )
}