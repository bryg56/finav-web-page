import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { LoadingCircle } from "@/components/custom/LoadingCircle";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handlelogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await login(email, password);
    if (!result) {
      toast.warning("Usuario y/o contraseña incorrectos", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    navigation("/convocatorias");
  };
  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0  ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handlelogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <CustomLogo />
                <p className="text-balance text-muted-foreground">
                  Inicia sesión
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@google.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="Contraseña"
                />
              </div>
              {!loading ? (
                <>
                  {" "}
                  <Button
                    type="submit"
                    className="rounded-full! text-sm! border-purple-900! bg-purple-900 text-white! hover:bg-purple-300"
                  >
                    Ingresar
                  </Button>{" "}
                </>
              ) : (
                <>
                  <LoadingCircle blockPage={true} />
                </>
              )}
              <div className="text-center text-sm">
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="underline underline-offset-4">
                  Crea una
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FICONO-LOGO.png?alt=media&token=b31dcceb-6c5a-453c-b5a6-03f11184782e"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Haciendo click, estás de acuerdo con{" "}
        <a href="#">términos y condiciones</a> y{" "}
        <a href="#">políticas de uso</a>.
      </div>
    </div>
  );
};
