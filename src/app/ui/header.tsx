import Link from "next/link";
import { IoHome } from "react-icons/io5";

export default function Header() {

  //Bishoy

  return (
    <div className="flex flex-row w-screen h-20 text-white bg-black items-center 
        justify-evenly max-sm:justify-between px-2">
      <span className="text-3xl"><Link href="/"><IoHome /></Link></span>
      <span className="sm:ml-4 md:mr-18 text-2xl">Lecture Summarizer</span>
      <span className="text-lg"><Link href="/about">About</Link></span>
    </div>
  )
}
