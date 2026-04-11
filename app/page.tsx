'use client'
import Image from "next/image";
import { jeu } from "@/lib/imp";
import {NavHead,Main, SideBar} from "@/component/main";

export default function Home() {
  return (
    <>
      <NavHead />
      <div className="flex">
      <Main titre={"Acceuil "} >
        <div className="flex flex-row ">
        {
          jeu.map((e, i) => {
            return (<div key={i} className=" relative w-80 h-50 m-4 overflow-hidden" onClick={b=>window.location.assign("/" + e.slug)}>
              <Image src={e.pict || "/404.jpeg"} alt={e.name} width={1000} height={800}     className="object-contain  max-w-full"/>
              <div className="absolute inset-x-0 bottom-0 w-80 z-2 text-center">
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-amber-50 text-3xl"><b>{e.name}</b></span>
                </div>
            </div>)
          })
        }
        </div>
      </Main>
      <SideBar />
      </div>
    </>
  );
}
