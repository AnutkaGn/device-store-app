import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { authService } from "src/services/auth";
import { LoginPayload, AuthResponse } from "src/services/auth";
import { loginFormSchema, LoginFormValues } from "../validation";
import { HttpStatusCode, IServerError } from "src/shared/services/types";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { useAuthStore } from "src/store";
import { Messages } from "src/shared/constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";

export const useLogin = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { setAccessToken } = useAuthStore();
	const { control, handleSubmit, setError } = useForm<LoginFormValues>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: yupResolver(loginFormSchema),
	});

	const login = async (values: LoginPayload): Promise<AuthResponse> => {
		return await authService.login(values);
	};

	const { mutateAsync, isPending } = useMutation<
		AuthResponse,
		AxiosError<IServerError>,
		LoginPayload
	>({
		mutationFn: login,
		onSuccess: (response) => {
			setAccessToken(response.accessToken);

			showToast(ToastType.SUCCESS, Messages.LOGIN_SUCCESS);
		},
		onError: (error: AxiosError<IServerError>, values: LoginPayload) => {
			if (error.response?.data?.statusCode === HttpStatusCode.FORBIDDEN) {
				navigation.navigate(NAVIGATION_KEYS.EMEIL_VERIFICATION, {
					email: values.email,
				});
				showToast(ToastType.ERROR, Messages.NOT_VERIFIED);
				return;
			}

			const errorMessage = getErrorMessage(error.response?.data?.message);

			showToast(ToastType.ERROR, Messages.LOGIN_FAILED, errorMessage);

			if (error.response?.data?.message) {
				setError("password", {
					type: "manual",
					message: errorMessage,
				});
			}
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		await mutateAsync(data);
	};

	return {
		control,
		handleSubmit: handleSubmit(onSubmit),
		isPending,
	};
};
