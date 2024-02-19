import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Sheet, SheetTrigger } from "../ui/sheet"
import { MenuIcon } from "lucide-react"
import { SideMenu } from "../SideMenu/side-menu"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="px-5 py-6 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={130}
            height={22}
            alt="Logo FSW Barber"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="p-2.5" variant={"ghost"} size={"icon"}>
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <SideMenu />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export { Header }
