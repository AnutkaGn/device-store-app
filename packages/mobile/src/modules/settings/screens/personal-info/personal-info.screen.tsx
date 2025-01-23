import React, { useState } from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./personal-info.styles";
import { PersonalInfoForm } from "../../components/personal-info-from/personal-info-from.component";

export const PersonalInfoScreen = () => {
	const [isModalVisible, setModalVisible] = useState<boolean>(false);

	const handleDeleteAccount = () => {
		console.log("Deleted");
		setModalVisible(false);
	};
	return (
		<Layout>
			<Header title="Personal info" showBackButton />
			<PersonalInfoForm />
			<TouchableOpacity
				style={styles.text_container}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.text}>Delete Account</Text>
			</TouchableOpacity>
			<Button title="Save" onPress={() => {}} />
			<ConfirmationModal
				visible={isModalVisible}
				onConfirm={handleDeleteAccount}
				onCancel={() => setModalVisible(false)}
			/>
		</Layout>
	);
};
