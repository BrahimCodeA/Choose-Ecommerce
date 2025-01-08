import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from "@/redux/slices/userSlice";
import { signUpFields } from "@/schemas/signUpSchema";
import { useDispatch } from "react-redux";
import { handleAuthError } from "@/errors/AuthErrors";
import { ToastType, showToast } from "@/utils/toastUtils";

export const useSignUp = (
  setError: UseFormSetError<signUpFields>,
  onClose: () => void
) => {
  const dispatch = useDispatch();

  const onSubmit = async (data: signUpFields) => {
    dispatch(signUpRequest());
    try {
      const response = await axios.post("/api/user/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(signUpSuccess(response.data));
      console.log("Inscription réussie", response.data);
      showToast("Inscription réussie !", ToastType.SUCCESS);
      onClose();
    } catch (error) {
      handleAuthError(error, setError, dispatch, signUpFailure, "email");
    }
  };

  return { onSubmit };
};
