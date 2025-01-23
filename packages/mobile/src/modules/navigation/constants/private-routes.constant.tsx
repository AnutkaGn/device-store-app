import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { SCREEN_OPTIONS } from "./screen-options";
import { BottomTab } from "../components/bottom-tab";
import { ProductInformationScreen } from "src/modules/products/screens/product-information";
import { CartScreen } from "src/modules/cart/screens/cart";
import { EditCartItemScreen } from "src/modules/cart/screens/edit-cart-item";
import { OrderDetailsScreen } from "src/modules/orders/screens/order-details";
import { EditOrderScreen } from "src/modules/orders/screens/edit-order";

const PrivateStack = createNativeStackNavigator<RootStackParamList>();

export const PRIVATE_SCREENS = (
	<>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.BOTTOM_TAB}
			component={BottomTab}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.PRODUCT_INFORMATION}
			component={ProductInformationScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.CART}
			component={CartScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.EDIT_CART_ITEM}
			component={EditCartItemScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.ORDERS_DETAILS}
			component={OrderDetailsScreen}
			options={SCREEN_OPTIONS}
		/>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.EDIT_ORDER}
			component={EditOrderScreen}
			options={SCREEN_OPTIONS}
		/>
	</>
);
