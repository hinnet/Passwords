import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from 'react-native';

export default function BackgroundColor() {
    return(
        <LinearGradient
        colors={['#000000', '#000000']}
        style={styles.background}
        />
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
});