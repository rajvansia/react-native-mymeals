import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  NavigatorIOS,
  View,
  TouchableHighlight
} from 'react-native';
import styles from './styles.js'
import MealList from './MealList.js'
import globals from '../../globals.js'
import FormView from '../../Form.js'

export default class WeekMeals extends Component {
  state = {
    modalVisible: false,
  }
  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
_addItem() {
  this.refs.nav.push({
   component: FormView,
   title: 'Add',
   backButtonTitle: 'Custom Back',
   passProps: { myProp: 'genius',
   onRightButtonPress: this._addItem.bind(this), },
 });
}
  render() {


    return (



      <NavigatorIOS
      ref="nav"
      style={styles.nav}
      initialRoute={{
        title: 'Meals for the Week',
        component: MealList,
        rightButtonTitle: 'Add',
        backButtonTitle: 'back',
        onRightButtonPress: this._addItem.bind(this),
        leftButtonTitle: 'Logout',
      }}
      />

    );
  }
}
