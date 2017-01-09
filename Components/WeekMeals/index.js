import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';
import styles from './styles.js'
import MealList from './MealList.js'
import globals from '../../globals.js'

export default class WeekMeals extends Component {
  render() {
    return (

      <NavigatorIOS
      style={styles.nav}
      initialRoute={{
        title: 'Meals for the Week',
        component: MealList,
        rightButtonTitle: 'Add',
        leftButtonTitle: 'Logout'
      }}
      />

    );
  }
}
