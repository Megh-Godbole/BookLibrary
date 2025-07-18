import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Book } from '../types/Book';
import styles from '../styles/BorrowedBooksScreenStyle';

const BorrowedBooksScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  const fetchBorrowedBooks = async () => {
    const snapshot = await getDocs(collection(db, 'books'));
    const list = snapshot.docs
      .filter(doc => doc.data().isBorrowed === true)
      .map(doc => ({ id: doc.id, ...doc.data() } as Book));
    setBorrowedBooks(list);
  };

  const returnBook = async (bookId: string) => {
    await updateDoc(doc(db, 'books', bookId), { isBorrowed: false });
    fetchBorrowedBooks();
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Button title="Return" onPress={() => returnBook(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default BorrowedBooksScreen;
