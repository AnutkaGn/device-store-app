import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
		paddingHorizontal: 20,
	},
	message: {
		fontFamily: FONTS.POPPINS_REGULAR,
		fontSize: 16,
		color: COLORS.text_primary,
		textAlign: "center",
		marginBlockStart: 20,
	},
	button: {
		position: "absolute",
		bottom: 30,
		alignSelf: "center",
		width: "100%",
	},
});
