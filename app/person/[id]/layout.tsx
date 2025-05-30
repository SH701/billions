import { ReactNode } from "react";

export default function PersonLayout({children }:{children:ReactNode}){
    return(
        <div className="px-20 py-10">
            {children}
        </div>
    )
}