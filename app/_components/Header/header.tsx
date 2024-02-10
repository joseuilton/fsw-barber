import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Sheet, SheetTrigger} from "../ui/sheet"
import { MenuIcon } from "lucide-react"
import { SideMenu } from "../SideMenu/side-menu"

const Header = () => {
  return (
    <Card>
      <CardContent className="px-5 py-6 flex justify-between items-center">
        <Image
          src={"/logo.png"}
          width={130}
          height={22}
          alt="Logo FSW Barber"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button className="p-2.5" variant={"outline"} size={"icon"}>
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
