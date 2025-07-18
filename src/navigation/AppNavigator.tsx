import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookListScreen from '../screens/BookListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BorrowedBooksScreen from '../screens/BorrowedBooksScreen';
import { Book } from '../types/Book';

export type RootStackParamList = {
  BookList: undefined;
  BookDetail: { book: Book };
  BorrowedBooks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="BookList">
      <Stack.Screen name="BookList" component={BookListScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
