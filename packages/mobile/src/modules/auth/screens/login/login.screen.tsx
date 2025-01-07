import React from "react";
import { Layout } from "src/shared/componetnts";
import { NAVIGATION_KEYS } from "src/modules/navigation/types";
import { Logo } from "../../components/logo";
import { LoginForm } from "../../components/login-form";
import { AuthNav } from "../../components/auth-nav";

export function LoginScreen() {
	const onSubmit = (data: any) => {
		console.log("Login data:", data);
	};

	return (
		<Layout>
			<Logo />
			<LoginForm onSubmit={onSubmit} />
			<AuthNav
				redirectText="Don't have an account? "
				linkText="Sign Up"
				navigationTarget={NAVIGATION_KEYS.SIGNUP}
			/>
		</Layout>
	);
}
