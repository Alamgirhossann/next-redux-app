import Image from "next/image";
import { Inter } from "next/font/google";
import Navabar from "@/components/Navabar";
import Head from "next/head";
import Weather from "./Weather";
import Currency from "./Currency";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className="flex justify-center gap-10 h-screen items-center">
          <h1  onClick={() => router.push("/Weather")} className="flex justify-center items-center rounded-lg  cursor-pointer h-32 w-56 bg-gray-200"> Weather widget</h1>
          <h1  onClick={() => router.push("/Currency")} className="flex justify-center items-center rounded-lg  cursor-pointer h-32 w-56 bg-gray-200"> Currency widgets </h1>
       </main>
    </div>
  );
}
