import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { Layout, VerificationCodeForm } from "src/shared/componetnts";
import { useEmailVerification } from "../../hooks";

export const EmailVerificationScreen = () => {
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.EMEIL_VERIFICATION>
		>();
	const { email } = route.params;

	const { verifyEmail, isPending } = useEmailVerification();

	const handleVerify = (verificationCode: number) => {
		verifyEmail({ email, verificationCode });
	};

	return (
		<Layout>
			<VerificationCodeForm
				title="Email Verification"
				subtitle="Please type the code from the email"
				onSubmit={handleVerify}
				isDisabledButtom={isPending}
			/>
		</Layout>
	);
};
