import ModalAuth from "../ui/ModalAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { SignInModalsProps } from "@/types/authTypes";
import { schema, signInFields } from "@/schemas/signInSchema";
import { useSignIn } from "@/hooks/useSignIn";
import { Input } from "../ui/Input";

export default function SignInModals({
  onClose,
  openSignUp,
}: SignInModalsProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signInFields>({
    resolver: zodResolver(schema),
  });

  const { onSubmit } = useSignIn(setError, onClose);

  return (
    <ModalAuth
      onClose={onClose}
      title="Connexion"
      footerText="Pas de compte ?"
      footerActionText="Inscrivez-vous"
      onFooterAction={openSignUp}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="jordan@gmail.com"
          {...register("email")}
          required
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <Input
          type="password"
          placeholder="***********"
          {...register("password")}
          required
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <Button type="submit" disabled={isSubmitting} className="button-auth">
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </ModalAuth>
  );
}
