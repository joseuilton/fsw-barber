import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"

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

                <Button className="p-2.5" variant={"outline"} size={"icon"}>
                    <MenuIcon size={20} />
                </Button>
            </CardContent>
        </Card>
    )
}

export { Header }