import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import {
  signInRequest,
  signInSuccess,
  signInFailure,
} from "@/redux/slices/userSlice";
import { signInFields } from "@/schemas/signInSchema";
import { useDispatch } from "react-redux";
import { handleAuthError } from "@/errors/AuthErrors";
import { ToastType, showToast } from "@/utils/toastUtils";

export const useSignIn = (
  setError: UseFormSetError<signInFields>,
  onClose: () => void
) => {
  const dispatch = useDispatch();

  const onSubmit = async (data: signInFields) => {
    dispatch(signInRequest());
    try {
      const response = await axios.post("/api/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(signInSuccess(response.data));
      console.log("Connexion réussie", response.data);
      showToast("Connexion réussie !", ToastType.SUCCESS);
      onClose();
    } catch (error) {
      handleAuthError(error, setError, dispatch, signInFailure, "email");
    }
  };

  return { onSubmit };
};
