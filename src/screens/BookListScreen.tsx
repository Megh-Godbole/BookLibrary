import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Book } from '../types/Book';
import styles from '../styles/BookListScreenStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookList'>;

const BookListScreen = ({ navigation }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const snapshot = await getDocs(collection(db, 'books'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
    setBooks(list);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="View Borrowed Books" onPress={() => navigation.navigate('BorrowedBooks')} />
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookListScreen;
