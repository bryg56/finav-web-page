import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { crearUsuario } from "../actions/registrarUsuario.action";
import { UserContext } from "@/context/userContext";
import { toast } from "sonner";
import { LoadingCircle } from "@/components/custom/LoadingCircle";

type Inputs = {
  name: string;
  lastName: string;
  isAdult: boolean;
  residencePlace: string;
  isSuscribedNewsletters: boolean;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Registro = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const response = await crearUsuario(data);

    if (response.ok) {
      const result = await login(data.email, data.password);
      if (!result) {
        toast.warning("Usuario y/o contraseña incorrectos", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }
      toast.success("Usuario creado con exito", {
        position: "top-center",
      });
      setLoading(false);
      navigation("/convocatorias");
    } else {
      toast.warning("Ya existe un usuario con este correo", {
        position: "top-center",
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // watch input value by passing the name of it

  const passwordValidation = watch("password");

  return (
    <div className="flex justify-center items-center p-2">
      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-12">
        <h1 className="flex text-4xl font-extrabold text-[#5A136E]! mb-8">
          CREA TU CUENTA
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <div>
                <Label className="p-1">Nombre</Label>
                <Input
                  placeholder="Nombre"
                  className="p-1 h-8 rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]! "
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-400 p-1">
                    El nombre es obligatorio
                  </span>
                )}
              </div>

              <div>
                <Label className="p-1">Apellidos</Label>
                <Input
                  className="p-1 h-8 rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]!"
                  placeholder="Apellidos"
                  {...register("lastName", { required: true })}
                />

                {errors.lastName && (
                  <span className="text-red-400 p-1">
                    El apellido es obligatorio
                  </span>
                )}
              </div>
              <div>
                <Label className="p-1">Correo</Label>
                <Input
                  className="p-1 h-8 rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]!"
                  placeholder="Correo"
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-400 p-1">
                    El correo es obligatorio
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2">
                <div className="p-1">
                  <Label>Contraseña</Label>
                  <Input
                    className="h-8 rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]!"
                    id="password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message: "Debe tener al menos 8 caracteres",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          "Debe incluir mayúscula, minúscula y un número",
                      },
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <span className="text-red-400 p-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="p-1">
                  <Label>Confirmar contraseña</Label>
                  <Input
                    className="h-8 w-30% rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]!"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirma tu contraseña",
                      validate: (value) =>
                        value === passwordValidation ||
                        "Las contraseñas no coinciden",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-400 p-1">
                      {errors.confirmPassword?.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="button"
                className="rounded-full! text-sm! mt-2 border-purple-900! bg-purple-900 text-white! hover:bg-purple-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Esconder" : "Mostrar"} Contraseña
              </Button>
            </div>
            <div>
              <div>
                <Label>¿De que estado eres?</Label>
                <Input
                  placeholder="Estado"
                  className="h-8 rounded-md border border-[#B97ACF]! px-4 focus:outline-none focus:ring-2 focus:ring-[#5A136E]!"
                  {...register("residencePlace", { required: true })}
                />

                {errors.residencePlace && (
                  <span className="text-red-400 p-1">
                    Tu estado es obligatorio
                  </span>
                )}
              </div>
              <div className="flex m-3 items-center ">
                <input
                  {...register("isAdult")}
                  type="checkbox"
                  className="h-4 w-4 mr-5! rounded-3xl! "
                />
                <Label className="text-2xl"> ¿Eres mayor de 18 años?</Label>
              </div>
              <div className="flex m-3 items-center">
                <Input
                  {...register("isSuscribedNewsletters")}
                  type="checkbox"
                  className="h-4 w-4 mr-5! text-indigo-600! focus:ring-indigo-500! border-gray-300 rounded!"
                />
                <Label className="text-2xl">
                  {" "}
                  ¿Quieres recibir novedades a tu correo?
                </Label>
              </div>
              <div className="flex m-3 items-center">
                <label className="">
                  {" "}
                  Al crear tu usuario aceptas los{" "}
                  <Link to="/legal" className="text-blue-400!">
                    {" "}
                    Terminos y condiciones
                  </Link>
                </label>
              </div>
              <div className=" flex justify-center">
                {!loading ? (
                  <>
                    {" "}
                    <Button
                      variant="outline"
                      className="rounded-full! text-sm! border-purple-900! bg-purple-900 text-white! hover:bg-purple-300"
                      type="submit"
                    >
                      {" "}
                      Enviar
                    </Button>
                  </>
                ) : (
                  <>
                    <LoadingCircle blockPage={true}></LoadingCircle>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
