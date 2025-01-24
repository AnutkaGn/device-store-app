import React from "react";
import { Button, Input } from "src/shared/componetnts";
import { useChangePassword } from "../../hooks/use-change-password.hook";
import { View } from "react-native";
import { styles } from "./change-password-form.styles";

export const ChangePasswordForm = () => {
	const { control, handleSubmit, isValid } = useChangePassword();

	return (
		<View style={styles.container}>
			<Input
				name="currentPassword"
				control={control}
				defaultValue=""
				label="Current Password"
			/>
			<Input
				name="newPassword"
				control={control}
				defaultValue=""
				label="New Password"
				secureTextEntry={true}
			/>
			<Input
				name="confirmPassword"
				control={control}
				defaultValue=""
				label="Confirm Password"
				secureTextEntry={true}
			/>
			<Button title="Save" onPress={() => handleSubmit()} disabled={!isValid} />
		</View>
	);
};
