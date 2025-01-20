import React from "react";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";

export const EditOrderScreen = () => {
	return (
		<Layout isScrollable={false}>
			<Header title="Edit Order Item" showBackButton />
		</Layout>
	);
};
