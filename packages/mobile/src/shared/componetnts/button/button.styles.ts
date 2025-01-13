import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.background_blue,
		height: 48,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: COLORS.white,
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
	},
	disabledButton: {
		backgroundColor: COLORS.background_inactive,
	},
});
