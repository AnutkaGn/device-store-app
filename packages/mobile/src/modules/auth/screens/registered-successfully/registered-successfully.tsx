import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { SuccessMessage } from "src/shared/componetnts";

export const RegisteredSuccessfully = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, NAVIGATION_KEYS.LOGIN>
		>();
	const handleButtonPress = () => {
		console.log("Navigate to dashboard");
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<SuccessMessage
			message="Account successfully registered!"
			buttonText="Sign In"
			onButtonPress={handleButtonPress}
		/>
	);
};
