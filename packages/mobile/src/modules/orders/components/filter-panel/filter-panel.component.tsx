import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./filter-panel.styles";
import { SORT_ORDER } from "src/shared/enum/sort-order.enum";
import {
	BottomSheetContext,
	BottomSheetData,
	IBottomSheetContext,
} from "src/shared/context/bottom-sheet.context";
import { underDampedSpringCalculations } from "react-native-reanimated/lib/typescript/animation/springUtils";
import { convertToTitleCase } from "src/shared/helpers";

export const FilterPanel = ({
	onFilterChange,
}: {
	onFilterChange: (filters: any) => void;
}) => {
	const {
		showSheet,

		paymentStatusFilter,
		deliveryStatusFilter,
		sortOrderFilter,
	} = useContext<IBottomSheetContext>(BottomSheetContext);

	useEffect(() => {
		onFilterChange({
			paymentStatus: paymentStatusFilter ?? undefined,
			deliveryStatus: deliveryStatusFilter ?? undefined,
			sortDirection: sortOrderFilter,
		});
	}, [paymentStatusFilter, deliveryStatusFilter, sortOrderFilter]);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>Filter by</Text>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => showSheet?.(BottomSheetData.PAYMENT_STATUS)}
				>
					<Text style={styles.bold_text}>Payment:</Text>
					<Text style={styles.text}>
						{convertToTitleCase(paymentStatusFilter) ?? "All"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => showSheet?.(BottomSheetData.DELIVERY_STATUS)}
				>
					<Text style={styles.bold_text}>Delivery:</Text>
					<Text style={styles.text}>
						{convertToTitleCase(deliveryStatusFilter) ?? "All"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => showSheet?.(BottomSheetData.DATE)}>
					<Text style={styles.bold_text}>Date:</Text>
					<Text style={styles.text}>
						{sortOrderFilter === SORT_ORDER.ASC ? "Desc > Asc" : "Asc > Desc"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
