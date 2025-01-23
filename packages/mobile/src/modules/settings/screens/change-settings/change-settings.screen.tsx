import React from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { ChangePasswordForm } from "../../components/change-password-form/change-password-form.component";

export const ChangePasswordScreen = () => {
	return (
		<Layout>
			<Header title="Change password" showBackButton />
			<ChangePasswordForm />
			<Button title="Save" onPress={() => {}} />
		</Layout>
	);
};
