import React from "react";
import { FlatList, Text } from "react-native";
import { ProductCard } from "../product-card";
import { styles } from "./product-card.styles";

interface ProductCardItem {
	id: string;
	title: string;
	amount: number;
	price: number;
}

interface ProductCardListProps {
	products: ProductCardItem[];
	onDeleteProduct: (id: string) => void;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({
	products,
	onDeleteProduct,
}) => {
	const renderItem = ({ item }: { item: ProductCardItem }) => (
		<ProductCard
			id={item.id}
			title={item.title}
			amount={item.amount}
			price={item.price}
			onDelete={() => onDeleteProduct(item.id)}
		/>
	);

	const renderEmptyList = () => (
		<Text style={styles.text}>Your list is empty.</Text>
	);

	return (
		<FlatList
			data={products}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			ListEmptyComponent={renderEmptyList}
		/>
	);
};
