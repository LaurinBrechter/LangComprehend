import Link from "next/link";
import React from "react";
import { drizzle } from "drizzle-orm/node-postgres";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar = async () => {
  const db = drizzle(process.env.DATABASE_URL!);

  const all_ws = [];

  return (
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Worksheets</SheetTitle>
            <SheetDescription>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex">
                <h1>Your Worksheets</h1>
                {all_ws.map((ws) => (
                  <li key={ws.id}>
                    <Link href={`/library/${ws.id}`}>{ws.name}</Link>
                  </li>
                ))}
                <Link href="/comprehension" className="btn mt-10">
                  New Worksheet
                </Link>
                <Link href="/chat" className="btn">
                  Surprise Me
                </Link>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  );
};

export default Sidebar;
