import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { Layout, VerificationCodeForm } from "src/shared/componetnts";

export const EmailVerificationScreen = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<
				RootStackParamList,
				NAVIGATION_KEYS.EMEIL_VERIFICATION
			>
		>();
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.EMEIL_VERIFICATION>
		>();

	const { email } = route.params;

	const handleVerify = (code: string) => {
		console.log("Verification Code:", code);
		navigation.navigate(NAVIGATION_KEYS.REGISTERED_SUCCESSFULLY);
	};

	return (
		<Layout>
			<VerificationCodeForm
				title="Email Verification"
				subtitle="Please type the code from the email"
				onSubmit={handleVerify}
			/>
		</Layout>
	);
};
