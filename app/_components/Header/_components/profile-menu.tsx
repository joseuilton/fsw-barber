import { Session } from "next-auth"
import { Button, buttonVariants } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog";
import { CircleUserRoundIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";

interface ProfileMenuProps {
  sessionData: Session | null;
}

export function ProfileMenu({ sessionData }: ProfileMenuProps) {
  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <>
      {
        sessionData ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"ghost"} className="items-center gap-2 text-base font-bold">
                <Avatar>
                  <AvatarImage src={sessionData.user?.image!} width={36} height={36} />
                  <AvatarFallback>{sessionData.user?.name!}</AvatarFallback>
                </Avatar>

                {sessionData.user?.name!.split(" ").slice(0, 2).join(" ")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[320px] border-transparent rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">Sair</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Deseja sair da plataforma?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:justify-center sm:items-center">
                <AlertDialogCancel className="w-full">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className={`w-full ${buttonVariants({ variant: "destructive", size: "default" })} 
                               border-destructive`}
                  onClick={handleLogout}
                >
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="font-bold text-sm flex items-center gap-2">
                <CircleUserRoundIcon size={16} />
                Perfil
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[320px] border-transparent rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">Faça login na plataforma</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Conecte-se usando sua conta do Google
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:justify-center sm:items-center">
                <AlertDialogCancel>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className={`${buttonVariants({ variant: "outline", size: "default" })} gap-2`}
                  onClick={handleLogin}
                >
                  <FaGoogle size={16} />
                  Google
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    </>

  )
}