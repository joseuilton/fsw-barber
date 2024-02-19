"use client"

import { CalendarDaysIcon, CircleUserRoundIcon, HomeIcon, LogInIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { SheetContent, SheetHeader } from "../ui/sheet"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export function SideMenu() {
    const { data } = useSession();

    async function handleLogin() {
        await signIn("google");
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <SheetContent className="w-11/12 p-0">
            <SheetHeader className="py-6 px-5 border-b border-[#26272B]">
                <h2 className="text-lg text-left font-bold">Menu</h2>
            </SheetHeader>

            <div className="px-5 py-6">
                { data?.user ? (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-[40px] h-[40px]">
                                <AvatarImage
                                    src={data.user.image as string}
                                    alt={data.user.name as string}
                                />
                                <AvatarFallback>{data.user.name}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-base">
                                {data.user.name?.split(" ").slice(0, 2).join(" ")}
                            </h3>
                        </div>

                        <Button
                            variant="secondary"
                            size={"icon"}
                            onClick={handleLogout}
                        >
                            <LogInIcon size={20} />
                        </Button>
                    </div>


                ) : (
                    <div>
                        <div className="flex items-center gap-2">
                            <CircleUserRoundIcon className="stroke-[#4E525B]" size={40} />
                            <h3 className="font-bold text-base">Olá. Faça seu login!</h3>
                        </div>

                        <Button
                            variant="secondary"
                            className="w-full mt-3 flex justify-start items-center gap-2 px-4 py-2 text-sm"
                            onClick={handleLogin}
                        >
                            <LogInIcon size={16} />
                            Fazer login
                        </Button>
                    </div>
                )}

                <div className="flex flex-col gap-3 mt-6">
                    <Button
                        variant="outline"
                        asChild
                        className="flex justify-start items-center gap-2 px-4 py-2 text-sm"
                    >
                        <Link href="/" className="text-left">
                            <HomeIcon size={16} />
                            Início
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        asChild
                        className="flex justify-start items-center gap-2 px-4 py-2 text-sm"
                    >
                        <Link href="/bookings" className="text-left">
                            <CalendarDaysIcon size={16} />
                            Agendamentos
                        </Link>
                    </Button>
                </div>
            </div>
        </SheetContent>
    )
}