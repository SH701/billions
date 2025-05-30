"use client"

import { useRouter } from "next/navigation"

export default function Btn(){
    const router = useRouter();
    return(
        <button onClick={()=>router.back()} 
        className="text-2xl font-bold cursor-pointer">
            🠔
        </button>
    )
}