import { remove, onValue, ref } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { getCurrentUser } from '../firebase/currentUser';

export default function PasswordsScreen() {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPasswords = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.error('No user logged in');
        return;
      }

      setUser(currentUser);
  
      const userRef = ref(database, `users/${currentUser.uid}/passwords`);
  
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
          remove(ref(database, `users/${user.uid}/passwords/${id}`));
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
                  <Text variant="titleSmall">{item.generatedPassword}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button title="DELETE" onPress={() => handleDelete(item.id)} />
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
  searchbar: {
    width: '90%',
    marginTop: 20,
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