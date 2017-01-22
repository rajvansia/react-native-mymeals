import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import styles from './styles.js'
import MealDetail from '../Common/MealDetail.js'
import fireApp from '../../firebase.js'
export default class MealList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
      };
      this.itemsRef = this.getRef().child('recipes');
    }

    getRef() {
      return fireApp.ref();
    }
    listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var meals = [];
        snap.forEach((child) => {
          meals.push({
            title: child.val().title,
            day: child.val().day,
            image: child.val().image,
            cuisine: child.val().cuisine,
            _key: child.key
          });
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dayMeal(meals))
        });

      });
    }

    componentDidMount() {
      this.listenForItems(this.itemsRef);
    }

showMealDetail(rowData){
  this.props.navigator.push({

    component: MealDetail,
    passProps: {rowData}
  });
}

dayMeal(meals){
  var dayMap = {};
  meals.forEach(function(mealItem) {
    if (!dayMap[mealItem.day]) {

      dayMap[mealItem.day] = [];
    }

    dayMap[mealItem.day].push(mealItem);

  });

  return dayMap;

}

  renderSectionHeader(sectionData,day){
    return(
      <Text style={styles.daySection}>
      {day}
      </Text>
    )
  }
  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight onPress={() => this.showMealDetail(rowData)} underlayColor='#dddddd'>
      <View>
      <Text style={styles.day}>
             {rowData.title}
      </Text>
      <View style={styles.container}>

      <Image source={{uri: rowData.image}}
             style={styles.thumbnail}/>


      </View>
      <View style={styles.separator}>
      </View>

      </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
    <ListView
    dataSource={this.state.dataSource}
    renderRow={this.renderRow.bind(this)}
    renderSectionHeader={this.renderSectionHeader.bind(this)}
    />
    );
  }
}
var MEAL_DATA = [ {meal: {title:'Pasta Primiavera', description: 'scrumptious pasta sacue with tomato and basil', image:'https://www.veggiessavetheday.com/wp-content/uploads/2016/11/Creamy-Sundried-Tomato-Pasta-for-two.jpg', ingredients:[{name:'pasta'},{name:'tomato sauce'},{name: 'basil'}], day: 'Monday', type: 'Italian'}},{meal: {title:'Mushroom soup', description: 'wholesome mushroom soup', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:[{name:'mushroom'},{name:'paprika'},{name: 'rosemary'}],day:'Monday',type:'American'}},{meal: {title:'Loaded Sweet Potato', description: 'Loaded Sweet Potato with bbq sauce', image:'https://karalydon.com/wp-content/uploads/2014/10/Vegan-Loaded-Sweet-Potato-3.jpg', ingredients:[{name:'sweet potato'},{name:'bbq sauce'},{name: 'avacado'}], day:'Tuesday', type:'American'}},{meal: {title:'Dosa', description: 'Like an Indian spicy pancake', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG/1024px-Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG', ingredients:[{name:'potato'},{name:'dosa'},{name:'chutney'}], day:'Wednesday', type: 'Indian'}}]

// var MEAL_DATA = [ {meal: {title:'Pasta Primiavera', description: 'scrumptious pasta sacue with tomato and basil', image:'https://www.veggiessavetheday.com/wp-content/uploads/2016/11/Creamy-Sundried-Tomato-Pasta-for-two.jpg', ingredients:'pasta', day: 'Monday', type: 'Italian'}},{meal: {title:'Mushroom soup', description: 'wholesome mushroom soup', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:'mushroom',day:'Monday',type:'American'}},{meal: {title:'Loaded Sweet Potato', description: 'Loaded Sweet Potato with bbq sauce', image:'https://karalydon.com/wp-content/uploads/2014/10/Vegan-Loaded-Sweet-Potato-3.jpg', ingredients:'potato', day:'Tuesday', type:'American'}},{meal: {title:'Dosa', description: 'Like an Indian spicy pancake', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG/1024px-Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG', ingredients:'pasta', day:'Wednesday', type: 'Indian'}},{meal: {title:'Thai Cocunut Curry', description: 'Spciy Thai cocunut Curry', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:'mushroom', day: 'Thursday', type: 'Thai'}},{meal: {title:'Sweet Potato', description: 'Loaded Sweet Potato with bbq sauce', image:'https://karalydon.com/wp-content/uploads/2014/10/Vegan-Loaded-Sweet-Potato-3.jpg', ingredients:'potato'}},{meal: {title:'Pasta Primiavera', description: 'scrumptious pasta sacue with tomato and basil', image:'https://www.veggiessavetheday.com/wp-content/uploads/2016/11/Creamy-Sundried-Tomato-Pasta-for-two.jpg', ingredients:'pasta'}},{meal: {title:'Mushroom soup', description: 'wholesome mushroom soup', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:'mushroom'}} ]
