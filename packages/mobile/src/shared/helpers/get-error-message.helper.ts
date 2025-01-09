export const getErrorMessage = (error: any): string => {
	if (typeof error === "string") return error;
	if (Array.isArray(error)) return error.join(", ");
	if (error?.message) return error.message;
	return "Something went wrong. Please try again.";
};
