import { Alert, StyleSheet, SafeAreaView } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import signUserOut from "../firebase/signUserOut";
import { BiometricAuthentication } from "../authentication/BiometricAuthentication";
import BackgroundColor from "./BackgroundColor";

export default function IndexScreen({ navigation, setIsLoggedIn }) {
  const handleAuthentication = async () => {
    const authorized = await BiometricAuthentication();
    if (authorized) {
      navigation.navigate("Passwords");
    } else {
      Alert.alert("Access denied");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundColor />
      <Card style={styles.cardContainer} onPress={() => handleAuthentication()}>
        <Card.Content style={styles.contentContainer}>
          <Text variant="titleLarge">Your Passwords</Text>
          <IconButton
            icon="key-chain-variant"
            iconColor="white"
            backgroundColor="orange"
            size={40}
            style={styles.icon}
          />
        </Card.Content>
      </Card>
      <Card
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Create Password")}
      >
        <Card.Content style={styles.contentContainer}>
          <Text variant="titleLarge">Create Password</Text>
          <IconButton
            icon="key-variant"
            iconColor="white"
            backgroundColor="green"
            size={40}
            style={styles.icon}
          />
        </Card.Content>
      </Card>
      <Card
        style={styles.cardContainer}
        onPress={() => signUserOut(setIsLoggedIn)}
      >
        <Card.Content style={styles.contentContainer}>
          <Text variant="titleLarge">Sign out</Text>
          <IconButton
            icon="logout"
            iconColor="white"
            backgroundColor="red"
            size={40}
            style={styles.icon}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "90%",
    padding: 20,
    margin: 20,
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
