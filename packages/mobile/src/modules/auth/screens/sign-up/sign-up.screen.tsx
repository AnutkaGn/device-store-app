import React from "react";
import { Text } from "react-native";
import { Layout } from "src/shared/componetnts";
import { styles } from "./sign-up.styles";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";
import { SignUpForm } from "../../components/sign-up-form";
import { AuthNav } from "../../components/auth-nav";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";

export const SignUpScreen = ({ navigation }: { navigation: any }) => {
	//const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const onSubmit = (data: any) => {
		console.log("Submitted Data:", data);
		navigation.navigate(NAVIGATION_KEYS.EMEIL_VERIFICATION, {
			email: data.email,
		});
	};

	return (
		<Layout>
			<Text style={styles.title}>Sign Up</Text>
			<SignUpForm onSubmit={onSubmit} />
			<AuthNav
				redirectText="Have you already registered? "
				linkText="Sign In"
				navigationTarget={NAVIGATION_KEYS.LOGIN}
			/>
		</Layout>
	);
};
