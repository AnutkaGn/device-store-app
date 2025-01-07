import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./auth-nav.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/modules/navigation/types";

type RedirectProps = {
	redirectText: string;
	linkText: string;
	navigationTarget: any;
};

export const AuthNav: React.FC<RedirectProps> = ({
	redirectText,
	linkText,
	navigationTarget,
}) => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, typeof navigationTarget>
		>();

	return (
		<View style={styles.container_link}>
			<Text style={styles.text}>{redirectText}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(navigationTarget)}>
				<Text style={styles.linkText}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	);
};
