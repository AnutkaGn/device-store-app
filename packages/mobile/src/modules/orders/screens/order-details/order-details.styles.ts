import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "src/shared/styles";

export const styles = StyleSheet.create({

	text: {
		color: COLORS.text_primary,
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 16,
        textAlign: "center",
        marginVertical: 30,
	},
});
