import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "src/shared/componetnts";
import { FONTS } from "src/shared/styles";
import { RootNavigator } from "../navigation/components/root-navigator";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export const App = () => {
	const [fontsLoaded] = useFonts({
		[FONTS.POPPINS_BOLD]: require("../../../assets/fonts/Poppins-Bold.ttf"),
		[FONTS.POPPINS_SEMIBOLD]: require("../../../assets/fonts/Poppins-SemiBold.ttf"),
		[FONTS.POPPINS_REGULAR]: require("../../../assets/fonts/Poppins-Regular.ttf"),
		[FONTS.POPPINS_MEDIUM]: require("../../../assets/fonts/Poppins-Medium.ttf"),
		[FONTS.KAUSHAN_SCRIPT]: require("../../../assets/fonts/KaushanScript-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return <Loader />;
	}

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<RootNavigator />
				<Toast />
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};
