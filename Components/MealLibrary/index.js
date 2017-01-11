import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';
import styles from './styles.js'
import LibraryList from './LibraryList.js'

export default class MealLibrary extends Component {
   render() {
  return (

    <NavigatorIOS
    style={styles.nav}
    initialRoute={{
      title: 'My Meal Library',
      component: LibraryList,
      rightButtonTitle: 'Add',
      leftButtonTitle: 'Logout'
    }}
    />

  );
}
}
