export const Messages = {
	// Product messages
	PRODUCT_CREATED: "Product created successfully.",
	PRODUCTS_RETRIEVED: "Products retrieved successfully.",
	PRODUCT_UPDATED: "Product updated successfully.",
	PRODUCT_DELETED: "Product deleted successfully.",
	NO_PRODUCTS_FOUND: "No products found.",

	// User messages
	USER_ALREADY_EXISTS: "User with this email already exists.",
	PHONE_NUMBER_ALREADY_EXISTS: "User with this phone number already exists.",
	USER_NOT_FOUND: "User not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	EMAIL_NOT_VERIFIED: "Email not verified.",
	USER_REGISTERED_SUCCESSFULLY: "User registered successfully.",
	USER_LOGIN_SUCCESSFULLY: "User login successfully.",
	AUTHORIZATION_TOKEN_MISSING: "Authorization token is missing.",
	INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token.",
	USER_GET_SUCCESSFULLY: "User get successfully.",
	USER_UPDATED_SUCCESSFULLY: "User updated successfully.",

	// roles messages
	USER_ROLES_NOT_FOUND: "User roles not found.",
	USER_NOT_HAVE_PERMISSION: "You do not have the required roles.",

	ID_PARAMETER_REQUIRED: "Parameter 'id' is required but was not provided.",
	INVALID_MODEL: (model: unknown) => `odel "${model}" is not valid.`,
	RESOURCE_NOT_FOUND: (model: unknown, id: string) =>
		`Resource with id '${id}' in model '${model}' not found.`,
	ERROR_FETCHING_RESOURCE: (id: string) =>
		`Error fetching resource with id '${id}'.`,

	// orders messages
	ORDER_NOT_FOUND: "Order not found.",
	ORDER_RETRIEVED: "Order retrieved successfully.",
	ORDER_CREATED: "Order and order details created successfully.",
	ORDER_UPDATED: "Order updated successfully.",
	ORDER_DELETED: "Order deleted successfully.",
	ORDER_DETAILS_NOT_FOUND: "Order details not found.",
	ORDER_CREATION_FAILED: "Failed to create order detail.",

	// Payment messages
	PAYMENT_RETRIEVED: "Payment retrieved successfully.",
	PAYMENT_CREATED: "Payment has been successfully created.",
	PAYMENT_UPDATED: "Payment has been successfully updated.",
};
