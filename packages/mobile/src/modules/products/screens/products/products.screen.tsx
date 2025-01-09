import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { FONTS } from "src/shared/styles";
import { useAuthStore } from "src/store";

export const ProductsScreen = () => {
	const { setisAuth } = useAuthStore();
	setisAuth(false);
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Products</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		fontSize: 24,
	},
});
