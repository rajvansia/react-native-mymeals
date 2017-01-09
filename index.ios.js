/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  NavigatorIOS,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import GroceryList from './Components/GroceryList/index'
import WeekMeals from './Components/WeekMeals/index'
import MealLibrary from './Components/MealLibrary/index'
import Landing from './Components//Landing/index'
import styles from './styles.js'
import globals from './globals.js'

export default class MyMeals extends Component{

  constructor(){
    super();
    this.state = {pass:'bigwo'}
  }
  _loginScreen(){
    this.setState({pass: 'bigtwo'})
  }
render(){
    switch(this.state.pass){
    case 'bigtwo':
        return (
        <Landing/>
      );
      default:
        return (
          <TouchableOpacity
          onPress={() => { this._loginScreen() }}>
          <Text style={styles.description}>
          Login
          {this.state.pass}
          </Text>
          </TouchableOpacity>
        );}

}}

//
// const styles = StyleSheet.create({
//
//       description: {
//           fontSize: 80,
//           backgroundColor: 'white',
//           color: 'red',
//           margin: 80
//       },
//       container: {
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center'
//       }
//
// })



AppRegistry.registerComponent('MyMeals', () => MyMeals);
