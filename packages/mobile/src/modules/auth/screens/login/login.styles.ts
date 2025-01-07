import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontFamily: FONTS.KAUSHAN_SCRIPT,
		fontSize: 40,
		marginBottom: 20,
		textAlign: "center",
	},
	loginButton: {
		marginTop: 200,
	},
	registrationLink: {
		marginTop: 10,
		alignSelf: "center",
	},
	registrationText: {
		color: "#007BFF",
		textDecorationLine: "underline",
	},
	image: {
		marginBlockStart: 130,
		marginBottom: 30,
		alignSelf: "center",
		width: 50,
		height: 45,
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
	button: {
		marginTop: 190,
	},
});
