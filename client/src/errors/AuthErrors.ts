import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { AppDispatch } from "@/redux/store";
import { signInFields } from "@/schemas/signInSchema";
import { signUpFields } from "@/schemas/signUpSchema";

type FormFields = signInFields | signUpFields;

export const handleAuthError = (
  error: unknown,
  setError: UseFormSetError<FormFields>,
  dispatch: AppDispatch,
  failureAction: (payload: string) => { type: string; payload: string },
  field: keyof FormFields
) => {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message ||
      "Une erreur est survenue. Veuillez réessayer.";
    dispatch(failureAction(errorMessage));
    setError(field, { type: "manual", message: errorMessage });
  } else {
    dispatch(failureAction("Erreur inconnue"));
    console.error("Erreur inattendue :", error);
  }
};
