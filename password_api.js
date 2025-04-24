import { Alert } from "react-native";

export function getPassword() {
    return fetch('https://password.ninja/api/password?minPassLength=20&capitals=true&lettersForNumbers=100')
    .then(response => {
        if (!response.ok) {
            Alert.alert("Error in generating password");
            throw new Error("Error in getting new password from API", response.statusText);
        }
        return response.json();
    })
}