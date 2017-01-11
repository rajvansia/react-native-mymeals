import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
  AlertIOS,
  Image,
  View
} from 'react-native';
import styles from './styles.js'
import MealDetail from '../Common/MealDetail.js'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDXFXVYCirwgTnUIW98wMF5s52bI6AahDo",
    authDomain: "foodtracker-4c72f.firebaseapp.com",
    databaseURL: "https://foodtracker-4c72f.firebaseio.com",
    storageBucket: "foodtracker-4c72f.appspot.com",
    messagingSenderId: "23826452842"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class IngredientsList extends Component {

constructor(props){
  super(props)
    const mealBlob = new ListView.DataSource({
      rowHasChanged: (r1,r2)=> r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2

    })
    var meals = MEAL_DATA;
    this.state = {
      dataSource: mealBlob.cloneWithRowsAndSections(this.dayMeal(meals))
    }
    this.itemsRef = this.getRef().child('items');
}

getRef() {
   return firebaseApp.database().ref();
 }

_addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

dayMeal(meals){
  var typeMap = {};
  meals.forEach(function(mealItem) {
    if (!typeMap[mealItem.meal.type]) {

      typeMap[mealItem.meal.type] = [];
    }

    typeMap[mealItem.meal.type].push(mealItem);

  });

  return typeMap;

}




  renderRow(rowData, sectionID, rowID){
    contents = rowData.meal.ingredients.map(function (item) {
        return (
          <View>
            <Text>{item.name}</Text>
          </View>
        );
     });
    return(
<TouchableHighlight >
      <View>
      {contents}
      <View style={styles.container}>
      </View>

      <View style={styles.separator}>
      </View>

      </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View>
    <ListView
    dataSource={this.state.dataSource}
    renderRow={this.renderRow.bind(this)}
    />
    <TouchableHighlight
    onPress={this._addItem.bind(this)}>
    <View>
    <Text>
    button
    </Text>
    </View>

      </TouchableHighlight>
    </View>
    );
  }
}

var MEAL_DATA = [ {meal: {title:'Pasta Primiavera', description: 'scrumptious pasta sacue with tomato and basil', image:'https://www.veggiessavetheday.com/wp-content/uploads/2016/11/Creamy-Sundried-Tomato-Pasta-for-two.jpg', ingredients:[{name:'pasta'},{name:'tomato sauce'},{name: 'basil'}], day: 'Monday', type: 'Italian'}},{meal: {title:'Mushroom soup', description: 'wholesome mushroom soup', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:[{name:'mushroom'},{name:'paprika'},{name: 'rosemary'}],day:'Monday',type:'American'}},{meal: {title:'Loaded Sweet Potato', description: 'Loaded Sweet Potato with bbq sauce', image:'https://karalydon.com/wp-content/uploads/2014/10/Vegan-Loaded-Sweet-Potato-3.jpg', ingredients:[{name:'sweet potato'},{name:'bbq sauce'},{name: 'avacado'}], day:'Tuesday', type:'American'}},{meal: {title:'Dosa', description: 'Like an Indian spicy pancake', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG/1024px-Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG', ingredients:[{name:'potato'},{name:'dosa'},{name:'chutney'}], day:'Wednesday', type: 'Indian'}}]
