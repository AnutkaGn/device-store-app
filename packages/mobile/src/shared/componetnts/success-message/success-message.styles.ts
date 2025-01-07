import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
		padding: 20,
	},
	image: {
		width: 100,
		height: 100,
		marginBottom: 20,
		backgroundColor: COLORS.success,
	},
	message: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
		textAlign: "center",
		marginBottom: 40,
	},
	button: {
		position: "absolute",
		bottom: 30,
		alignSelf: "center",
		width: "100%",
	},
});
