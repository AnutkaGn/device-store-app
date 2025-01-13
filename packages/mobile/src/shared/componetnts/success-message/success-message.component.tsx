import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "../button";
import { styles } from "./success-message.styles";
import { CheckCircleIcon } from "assets/icons/checkmark-circle";

type SuccessMessageProps = {
	message: string;
	buttonText: string;
	onButtonPress: () => void;
};

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
	message,
	buttonText,
	onButtonPress,
}) => {
	return (
		<View style={styles.container}>
			<CheckCircleIcon />
			<Text style={styles.message}>{message}</Text>
			<Button
				title={buttonText}
				onPress={onButtonPress}
				buttonStyle={styles.button}
			/>
		</View>
	);
};
