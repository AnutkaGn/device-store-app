import React from "react";
import { Input } from "src/shared/componetnts";
import { useUpdatePersonalInfo } from "../../hooks/use-personal-info.hook";
import { View } from "react-native";
import { styles } from "./personal-info-from.styles";

export const PersonalInfoForm = () => {
	const { control, handleSubmit, isPending, isValid } = useUpdatePersonalInfo();

	return (
		<View style={styles.container}>
			<Input name="email" control={control} defaultValue="" label="Email" />
			<Input
				name="fullName"
				control={control}
				defaultValue=""
				label="Full Name"
			/>
			<Input
				name="phoneNumber"
				control={control}
				defaultValue=""
				label="Phone Number"
			/>
			<Input
				name="shippingAddress"
				control={control}
				defaultValue=""
				label="Shipping Address"
			/>
		</View>
	);
};
