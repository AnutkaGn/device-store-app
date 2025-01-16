import React from "react";
import { Header } from "src/shared/componetnts/header";
import { Layout } from "src/shared/componetnts";
import { FilterPanel } from "../../components/filter-panel";
import { ProductList } from "../../components/product-list";
import { useProducts } from "../../hooks/use-products.hook";
import { Text } from "react-native";
import { styles } from "./products.styles";

export const ProductsScreen = () => {
	const {
		products,
		loading,
		updateFilters,
		loadMoreProducts,
		refreshing,
		onRefresh,
	} = useProducts();

	return (
		<Layout isScrollable={false}>
			<Header title="Products" showCartIcon />
			<FilterPanel onFilterChange={updateFilters} />
			{!products.length ? (
				<Text style={styles.text}>No products match your search.</Text>
			) : (
				<ProductList
					products={products}
					loading={loading}
					onLoadMore={loadMoreProducts}
					onRefresh={onRefresh}
					refreshing={refreshing}
				/>
			)}
		</Layout>
	);
};
