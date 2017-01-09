import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';
import styles from './styles.js'

export default class GroceryList extends Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.nav}
      initialRoute={{
        title: 'Grocery List',
        component: GroceryFoodList,
        rightButtonTitle: 'Add',
        leftButtonTitle: 'Logout'
      }}
      />

    );
  }
}

class GroceryFoodList extends Component {
  render() {
    return (
      <View>

      <Text style={styles.description}>
      Test nceedsfdsaf sdfsdfdsf dsf sfd fsd fd fd dfs sdf dfsfds
      </Text>
      <Text style={styles.description}>
      Test nceedsfdsaf sdfsdfdsf dsf sfd fsd fd fd dfs sdf dfsfds
      </Text>
      <Text style={styles.description}>
      GroceryList
      </Text>
      </View>
    );
  }
}
