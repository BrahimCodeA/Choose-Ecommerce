import ModalAuth from "../ui/ModalAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { SignUpModalProps } from "@/types/authTypes";
import { schema, signUpFields } from "@/schemas/signUpSchema";
import { useSignUp } from "@/hooks/useSignUp";
import { Input } from "../ui/Input";

export default function SignUpModals({
  onClose,
  openSignIn,
}: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signUpFields>({
    resolver: zodResolver(schema),
  });

  const { onSubmit } = useSignUp(setError, onClose);

  return (
    <ModalAuth
      onClose={onClose}
      title="S'inscrire"
      footerText="Déjà un compte ?"
      footerActionText="Connectez-vous"
      onFooterAction={openSignIn}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="choose@gmail.com"
          {...register("email")}
          required
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <Input
          type="password"
          placeholder="Mot de passe"
          {...register("password")}
          required
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <Input
          type="password"
          placeholder="Confirmez votre mot de passe"
          {...register("confirmPassword")}
          required
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting} className="button-auth">
          {isSubmitting ? "Chargement..." : "S'inscrire"}
        </Button>
      </form>
    </ModalAuth>
  );
}
