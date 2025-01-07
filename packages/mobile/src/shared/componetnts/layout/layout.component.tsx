import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./layout.styles";

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.content}>{children}</View>
		</ScrollView>
	);
};
