import { remove, onValue, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function PasswordsScreen() {
  const [password, setPassword] = useState({
    email: '',
    website: '',
  })
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    onValue(ref(database, '/passwords'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPasswords(Object.entries(data).map(([key, value]) => ({ ...value, id: key })));
      } else {
        setPasswords([]);
      }
    })
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
            remove(ref(db, '/passwords/' + id));
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList 
        data={passwords}
        renderItem={({ password }) =>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{password.email}</Text>
              <Text>{password.website}</Text>
              <Button title="DELETE" onPress={handleDelete} />
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
});