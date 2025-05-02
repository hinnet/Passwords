import { Alert } from "react-native";

export async function getPassword() {
    const response = await fetch('https://password.ninja/api/password?minPassLength=20&capitals=true&lettersForNumbers=100');
    if (!response.ok) {
        Alert.alert("Error in generating password");
        throw new Error("Error in getting new password from API", response.statusText);
    }
    const data = await response.json();
    return data;
}