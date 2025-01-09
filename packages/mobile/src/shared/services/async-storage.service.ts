import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
	public async getData(key: string): Promise<string | null> {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (e) {
			this.getErrorMessage(e);
			return null;
		}
	}

	public async setData(key: string, value: string): Promise<void> {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			this.getErrorMessage(e);
		}
	}

	public async removeData(key: string): Promise<void> {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
			this.getErrorMessage(e);
		}
	}

	public async setStringifiedData<T>(key: string, data: T): Promise<void> {
		try {
			const stringifiedData = JSON.stringify(data);
			await this.setData(key, stringifiedData);
		} catch (e) {
			this.getErrorMessage(e);
		}
	}

	public async getParsedData<T>(key: string): Promise<T | undefined> {
		try {
			const data = await this.getData(key);
			if (data) {
				const parsedData: T = JSON.parse(data);
				return parsedData;
			}
		} catch (e) {
			this.getErrorMessage(e);
		}
	}

	private getErrorMessage(error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		console.error(error);
	}
}

export const asyncStorage = new AsyncStorageService();
