import { useMutation } from "@tanstack/react-query";
import {
	UserResponse,
	userService,
	UpdatePersonalInfoPayload,
} from "src/services/user";
import { IServerError } from "src/shared/services/types";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInfoFormValues, personalInfoFormSchema } from "../validation";
import { getErrorMessage, showToast, ToastType } from "src/shared/helpers";
import { Messages } from "src/shared/constants";

export const useUpdatePersonalInfo = () => {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<PersonalInfoFormValues>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: yupResolver(personalInfoFormSchema),
	});

	const updatePersonalInfo = async (
		values: UpdatePersonalInfoPayload,
	): Promise<UserResponse> => {
		return await userService.updatePersonalInfo(values);
	};

	const { mutateAsync, isPending } = useMutation<
		UserResponse,
		AxiosError<IServerError>,
		UpdatePersonalInfoPayload
	>({
		mutationFn: updatePersonalInfo,
		onSuccess: () => {
			showToast(ToastType.SUCCESS, Messages.USER_UPDATED);
		},
		onError: (error: AxiosError<IServerError>) => {
			const errorMessage = getErrorMessage(error.response?.data?.message);
			showToast(ToastType.ERROR, errorMessage);
		},
	});

	const onSubmit = async (data: PersonalInfoFormValues) => {
		await mutateAsync(data);
	};

	return {
		control,
		handleSubmit: handleSubmit(onSubmit),
		isPending,
		isValid,
	};
};
