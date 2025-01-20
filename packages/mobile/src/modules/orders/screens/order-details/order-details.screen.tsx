import React from "react";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";

export const OrderDetailsScreen = () => {
	return (
		<Layout isScrollable={false}>
			<Header title="Order Details" showBackButton />
		</Layout>
	);
};
