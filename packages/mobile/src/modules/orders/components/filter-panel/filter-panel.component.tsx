import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./filter-panel.styles";
import { SORT_ORDER } from "src/shared/enum/sort-order.enum";

export const FilterPanel = ({
	onFilterChange,
}: {
	onFilterChange: (filters: any) => void;
}) => {
	const [paymentStatus, setPaymentStatus] = useState<string>();
	const [deliveryStatus, setDeliveryStatus] = useState<string>();
	const [sortOrder, setSortOrder] = useState<string>(SORT_ORDER.DESC);

	useEffect(() => {
		onFilterChange({
			paymentStatus,
			deliveryStatus,
			sortOrder,
		});
	}, [paymentStatus, deliveryStatus, sortOrder]);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>Filter by</Text>
			<View style={styles.container}>
				<View>
					<Text style={styles.bold_text}>Payment:</Text>
					<Text style={styles.text} onPress={() => setPaymentStatus("")}>
						All
					</Text>
				</View>
				<View>
					<Text style={styles.bold_text}>Delivery:</Text>
					<Text style={styles.text} onPress={() => setDeliveryStatus("")}>
						All
					</Text>
				</View>
				<View>
					<Text style={styles.bold_text}>Date:</Text>
					<Text
						style={styles.text}
						onPress={() => setSortOrder(SORT_ORDER.DESC)}
					>
						Asc {">"} Des
					</Text>
				</View>
			</View>
		</View>
	);
};
