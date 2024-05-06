"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex items-center justify-center p-5 flex-col">
      <h1 className="font-extrabold text-7xl">Oops!</h1>
      <p className="font-medium text-2xl mt-2 mb-20">Page not found</p>
      <Image src={"/images/bgs/404.png"} width={800} height={800} />
      <div className="relative m-10 hover:font-bold">
        <button onClick={() => router.push("/login")}>⬅️ Go Home</button>
        <span className="absolute h-[1px] w-full bg-black left-0 -bottom-1"></span>
      </div>
    </div>
  );
};

export default NotFoundPage;
