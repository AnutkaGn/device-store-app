import { StyleSheet } from "react-native";
import { COLORS } from "src/shared/styles";

export const styles = StyleSheet.create({
	safeArea:{
		flex: 1,
	},
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: COLORS.background,
	},
	content: {
		flex: 1,
	},
});
