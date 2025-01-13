export const getErrorMessage = (messages?: string[] | string): string => {
	if (typeof messages === "string") return messages;
	if (Array.isArray(messages)) return messages.join(", ");
	return "Something went wrong. Please try again.";
};
