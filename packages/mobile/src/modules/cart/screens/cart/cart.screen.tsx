import React from "react";
import { Header } from "src/shared/componetnts/header";
import { Button, Layout } from "src/shared/componetnts";
import { Text, View } from "react-native";
import { styles } from "./cart.styles";
import { ProductCardList } from "src/shared/componetnts/product-card-list";
import { useCartStore } from "src/store";

export const CartScreen = () => {
	const { cart, removeItemFromCart, totalPrice } = useCartStore();
	const handleSubmit = () => {};
	return (
		<Layout isScrollable={false}>
			<Header title="Cart" showBackButton />
			<Text style={styles.text}>Total amount: ${totalPrice.toFixed(2)}</Text>
			<ProductCardList products={cart} onDeleteProduct={removeItemFromCart} />
			<View style={styles.container_button}>
				<Button title="Create Order" onPress={handleSubmit} />
			</View>
		</Layout>
	);
};
