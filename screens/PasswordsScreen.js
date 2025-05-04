import { remove, onValue, ref } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { getCurrentUser } from '../firebase/currentUser';

export default function PasswordsScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPasswords = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.error('No user logged in');
        return;
      }

      setUser(currentUser);
  
      const userRef = ref(database, `users/${currentUser.uid}/loginCredentials`);
  
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setPasswords(Object.entries(data).map(([key, value]) => ({ ...value, id: key })));
        } else {
            setPasswords([]);
        }
      });
    };
  
    fetchPasswords();
  }, []);

  const handleDelete = (id) => {
    Alert.alert('Delete item', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'Cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          remove(ref(database, `users/${user.uid}/loginCredentials/${id}`));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={passwords}
        renderItem={({ item }) =>
          <View style={styles.passwordContainer}>
            <Card style={styles.cardContainer}>
              <Card.Content>
              <View style={styles.contentContainer}>
                  <Text variant="titleMedium">Website: </Text>
                  <Text variant="titleSmall">{item.website}</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text variant="titleMedium">Email: </Text>
                  <Text variant="titleSmall">{item.email}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text variant="titleMedium">Password: </Text>
                  <Text variant="titleSmall">{item.hashPassword}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <IconButton
                icon="square-edit-outline"
                size={40}
                mode='contained'
                onPress={() => navigation.navigate('Edit Password', { data: item })}
                />
                <IconButton
                icon="delete-forever"
                iconColor='red'
                size={40}
                mode='contained'
                onPress={() => handleDelete(item.id)}
                />
              </Card.Actions>
            </Card>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
    marginBottom: -5,
  },
  cardContainer: {
    width: '100%',
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});