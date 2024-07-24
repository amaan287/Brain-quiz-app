"use client";
import { ToggleTheme } from "@/components/ToggleTheme";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="w-screen lg:h-[50px] flex justify-between border-b-2 rounded-xl px-3 items-center shadow-xl">
      <div>
        <Link href={"/"}>
          <h1 className="font-bold text-2xl">Brain Quiz</h1>
        </Link>
      </div>
      <div>
        <ToggleTheme />
      </div>
    </div>
  );
}

export default Header;
