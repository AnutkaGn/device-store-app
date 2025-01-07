import * as React from "react";
import {
	TouchableOpacity,
	Text,
	ViewStyle,
	TextStyle,
	StyleSheet,
} from "react-native";
import { styles } from "./button.styles";

type ButtonProps = {
	onPress: () => void;
	title: string;
	buttonStyle?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
};

export const Button = ({
	onPress,
	title,
	buttonStyle,
	textStyle,
	disabled = false,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={!disabled ? onPress : undefined}
			style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
			activeOpacity={disabled ? 1 : 0.7}
		>
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};
