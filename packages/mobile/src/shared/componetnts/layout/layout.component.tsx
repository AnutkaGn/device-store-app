import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./layout.styles";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.content}>{children}</View>
			</ScrollView>
		</SafeAreaView>
	);
};
