import Image from "next/image";
import { Inter } from "next/font/google";
import CoinsWidget from "@/components/CoinsWidget";
import { COIN_LIST, SECOND_COIN_LIST } from '@/constants'


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-10 ">
     <CoinsWidget coinList={COIN_LIST} /> 
     <CoinsWidget coinList={SECOND_COIN_LIST} />
      </div>
    </main>
  );
}
