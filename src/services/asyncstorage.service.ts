import AsyncStorage from '@react-native-async-storage/async-storage'

export const store = async (key: string, data: object) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const get = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
}

export const clear = async () => {
    await AsyncStorage.clear()
}