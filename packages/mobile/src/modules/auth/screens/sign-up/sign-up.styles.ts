import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingVertical: 24,
		backgroundColor: "#fff",
	},
	title: {
		fontFamily: FONTS.POPPINS_BOLD,
		fontSize: 16,
		textAlign: "center",
		marginBottom: 24,
		marginBlockStart: 50,
	},
	loginLink: {
		marginTop: 16,
		alignItems: "center",
	},
	loginText: {
		color: "#007bff",
		fontSize: 14,
	},
	container_link: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBlockStart: 50,
	},
	text: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
	},
	linkText: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
		color: COLORS.background_blue,
		textDecorationLine: "none",
	},
});
