import React from "react";
import { Button, Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { Text } from "react-native";
import { useOrderDetails } from "../../hooks/use-order-details.hook";
import { ProductCardList } from "src/shared/componetnts/product-card-list";
import { Loader } from "src/shared/componetnts";
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from "src/modules/navigation/types";
import { useOrderStore } from "src/store/order.store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PayIcon } from "assets/icons/pay";
import { styles } from "./order-details.styles";

export const OrderDetailsScreen: React.FC = ({}) => {
	const {
		params: { id },
	} = useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.ORDERS_DETAILS>>();
	const { loading, handleDelete } = useOrderDetails(id);
	const { orderDetails, getTotalAmount } = useOrderStore();

	if (loading || !orderDetails) {
		return <Loader />;
	}

	return (
		<Layout isScrollable={false}>
			<Header title="Order Details" showBackButton />
			<Text style={styles.text}>
				Total amount: ${getTotalAmount(id)?.toFixed(2)}
			</Text>

			<ProductCardList
				products={orderDetails.map((detail) => ({
					id: detail.id,
					title: detail.product.name,
					amount: detail.quantity,
					price: detail.priceAtPurchase,
				}))}
				onDeleteProduct={handleDelete}
				navigationKey={NAVIGATION_KEYS.EDIT_ORDER}
			/>
			<Button
				title={
					<>
						<PayIcon />
						<Text style={styles.botton_title}>Pay</Text>
					</>
				}
				onPress={() => {}}
			/>
		</Layout>
	);
};
