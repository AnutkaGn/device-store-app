import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "src/shared/componetnts";
import { styles } from "./login-form.styles";
import { ValidationMessages } from "src/shared/enums/validation-messages.enum";
import { Regex } from "src/shared/constants/regex";

interface LoginFormProps {
	onSubmit: (data: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
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
			<Button
				title="Sign in"
				onPress={handleSubmit(onSubmit)}
				buttonStyle={styles.button}
			/>
		</>
	);
};
