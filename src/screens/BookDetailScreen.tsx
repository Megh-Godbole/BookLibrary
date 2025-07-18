import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { doc, getDoc, getDocs, updateDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import styles from '../styles/BookDetailScreenStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: Props) => {
  const { book } = route.params;
  const [isBorrowed, setIsBorrowed] = useState<boolean>(false);

  // Fetch latest book status
  const fetchBookStatus = async () => {
    const bookRef = doc(db, 'books', book.id);
    const bookSnap = await getDoc(bookRef);
    if (bookSnap.exists()) {
      setIsBorrowed(bookSnap.data().isBorrowed === true);
    }
  };

  const borrowBook = async () => {
    const snapshot = await getDocs(collection(db, 'books'));
    const borrowed = snapshot.docs.filter(doc => doc.data().isBorrowed === true);
    const count = borrowed.length;

    console.log('borrowedCount: ' + count);

    if (count >= 3) {
      Alert.alert('Limit Reached', 'You can only borrow up to 3 books.');
      return;
    }

    await updateDoc(doc(db, 'books', book.id), { isBorrowed: true });
    Alert.alert('Success', 'Book borrowed successfully!');
    setIsBorrowed(true); // Update UI
    navigation.goBack();
  };

  useEffect(() => {
    fetchBookStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Button
        title={isBorrowed ? 'Already Borrowed' : 'Borrow'}
        onPress={borrowBook}
        disabled={isBorrowed}
      />
    </View>
  );
};

export default BookDetailScreen;