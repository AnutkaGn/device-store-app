export interface RegisterResponse {
    message: string;
    statusCode: number;
}
  
export interface LoginResponse {
    accessToken: string;
	message: string;
	statusCode: number;
}

export interface VerifyEmailResponse {
    message: string;
    statusCode: number; 
}