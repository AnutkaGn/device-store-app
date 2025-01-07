import React from "react";
import { Input, Button } from "src/shared/componetnts";
import { useForm } from "react-hook-form";
import { ValidationMessages } from "src/shared/enums/validation-messages.enum";
import { Regex } from "src/shared/constants/regex";

export const SignUpForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm({
		defaultValues: {
			email: "",
			fullName: "",
			phoneNumber: "",
			shippingAddress: "",
			password: "",
			confirmPassword: "",
		},
	});

	return (
		<>
			<Input
				name="email"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
					pattern: {
						value: Regex.EMAIL,
						message: ValidationMessages.INVALID_EMAIL,
					},
				}}
				label="Email"
			/>
			<Input
				name="fullName"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
				}}
				label="Full name"
			/>
			<Input
				name="phoneNumber"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
					pattern: {
						value: Regex.PHONE_NUMBER,
						message: ValidationMessages.INVALID_PHONE,
					},
				}}
				label="Phone number"
			/>
			<Input
				name="shippingAddress"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
				}}
				label="Shipping address"
			/>
			<Input
				name="password"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
					pattern: {
						value: Regex.PASSWORD,
						message: ValidationMessages.INVALID_PASSWORD,
					},
				}}
				label="Password"
				secureTextEntry={true}
			/>
			<Input
				name="confirmPassword"
				control={control}
				defaultValue=""
				rules={{
					required: ValidationMessages.REQUIRED,
					validate: (value) =>
						value === getValues("password") ||
						ValidationMessages.PASSWORDS_DO_NOT_MATCH,
				}}
				label="Confirm password"
				secureTextEntry={true}
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				title="Sign Up"
				disabled={!isValid}
			/>
		</>
	);
};
