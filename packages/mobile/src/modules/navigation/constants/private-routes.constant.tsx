import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_KEYS, RootStackParamList } from "../types";
import { SCREEN_OPTIONS } from "./screen-options";
import { BottomTab } from "../components/bottom-tab";

const PrivateStack = createNativeStackNavigator<RootStackParamList>();

export const PRIVATE_SCREENS = (
	<>
		<PrivateStack.Screen
			name={NAVIGATION_KEYS.BOTTOM_TAB}
			component={BottomTab}
			options={SCREEN_OPTIONS}
		/>
	</>
);
