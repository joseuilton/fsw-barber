"use client";
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Sheet, SheetTrigger } from "../ui/sheet"
import { MenuIcon, CalendarDaysIcon, CircleUserRoundIcon } from "lucide-react"
import { FaGoogle } from "react-icons/fa"
import { SideMenu } from "../SideMenu/side-menu"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { AlertDialogAction } from "@radix-ui/react-alert-dialog"
import { useSession } from "next-auth/react";
import { ProfileMenu } from "./_components/profile-menu";

const Header = () => {
  const session = useSession();


  return (
    <header>
      <Card>
        <CardContent className="container mx-auto px-5 py-6 flex justify-between items-center lg:py-8">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={130}
              height={22}
              alt="Logo FSW Barber"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Button variant={"ghost"} asChild>
              <Link className="font-bold text-sm flex items-center gap-2" href="/bookings">
                <CalendarDaysIcon size={16} />
                Agendamentos
              </Link>
            </Button>

            <ProfileMenu sessionData={session.data} />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="p-2.5" variant={"ghost"} size={"icon"}>
                  <MenuIcon size={20} />
                </Button>
              </SheetTrigger>
              <SideMenu />
            </Sheet>
          </div>

        </CardContent>
      </Card>
    </header>
  )
}

export { Header }
