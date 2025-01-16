import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { COLORS, FONTS } from "src/shared/styles";
import { useAuthStore } from "src/store";

export const SettingsScreen = () => {
	const { logout } = useAuthStore();
	return (
		<Layout>
			<Header title="Settings" />
			<TouchableOpacity onPress={logout}>
				<Text style={styles.logout_text}>Logout</Text>
			</TouchableOpacity>
		</Layout>
	);
};

const styles = StyleSheet.create({
	logout_text: {
		color: COLORS.danger,
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		marginBlockStart: 20,
	},
});
