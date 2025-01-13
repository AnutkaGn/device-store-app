import Toast from "react-native-toast-message";

export enum ToastType {
	SUCCESS = "success",
	ERROR = "error",
	INFO = "info",
}

export const showToast = (
	type: ToastType,
	title: string,
	message?: string,
): void => {
	Toast.show({
		type,
		text1: title,
		text2: message,
	});
};
