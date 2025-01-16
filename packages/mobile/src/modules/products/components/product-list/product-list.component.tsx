import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductItem } from "../product-item";
import { ProductListItem } from "src/services/product";
import { Loader } from "src/shared/componetnts";

interface ProductListProps {
	products: ProductListItem[];
	loading: boolean;
	onLoadMore: () => void;
	onRefresh: () => void;
	refreshing: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
	products,
	loading,
	onLoadMore,
	onRefresh,
	refreshing,
}) => {
	const renderItem = ({ item }: { item: any }) => (
		<ProductItem
			id={item.id}
			title={item.name}
			category={item.category}
			price={item.price}
		/>
	);

	return (
		<FlatList
			data={products}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			onEndReached={onLoadMore}
			ListFooterComponent={loading ? <Loader /> : null}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		/>
	);
};
