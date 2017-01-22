import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
  TextInput,
  AlertIOS,
  View
} from 'react-native';
import styles from './styles.js'
import firebase from 'firebase'
import MealDetail from '../Common/MealDetail.js'
import MyMeals from '../../index.ios.js'
import fireApp from '../../firebase.js'

export default class GroceryList extends Component {
  getRef() {
    return fireApp.ref();
  }
  constructor(props) {
      super(props);
      this.state = {
      add:'bigwo'}
      this.itemsRef = this.getRef().child('recipes');
    }




  _addItem() {
    this.refs.nav.push({
     component: GroceryList,
     title: 'Genius',
     passProps: { myProp: 'genius',
     rightButtonTitle: "pok",
     onRightButtonPress: this._addItem.bind(this), },
   });
  }
  render() {
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.nav}
      initialRoute={{
        title: this.state.add,
        component: GroceryFoodList,
        rightButtonTitle: this.state.add,
        onRightButtonPress: this._addItem.bind(this),
        leftButtonTitle: 'Logout'
      }}
      />

    );
  }
}

class GroceryFoodList extends Component {
  render() {
    return (
<IngredientsList/>
    );
  }
}

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View >
          <Text style={styles.description}>{this.props.item.title}</Text>
          <Text>{this.props.item.cuisine}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class ActionButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight

          onPress={this.props.onPress}>
          <Text>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
class IngredientsList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
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
        var items = [];
        snap.forEach((child) => {
          items.push({
            title: child.val().title,
            cuisine: child.val().cuisine,
            _key: child.key
          });
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });

      });
    }

    componentDidMount() {
      this.listenForItems(this.itemsRef);
    }


  render() {
    return (
      <View style={styles.container}>
      <TextInput
            style={{height: 40, borderColor: 'black', borderWidth: 1, margin:10, marginTop:90}}
            onSubmitEditing={(event) => this.itemsRef.push({ title: event.nativeEvent.text})}
            value={this.state.text}
          />
          <TextInput
                style={{height: 40, borderColor: 'black', borderWidth: 1, margin:10}}
                onSubmitEditing={(event) => this.itemsRef.push({ cuisine: event.nativeEvent.text})}
                value={this.state.text}
              />


        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        />

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
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

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}

var MEAL_DATA = [ {meal: {title:'Pasta Primiavera', description: 'scrumptious pasta sacue with tomato and basil', image:'https://www.veggiessavetheday.com/wp-content/uploads/2016/11/Creamy-Sundried-Tomato-Pasta-for-two.jpg', ingredients:[{name:'pasta'},{name:'tomato sauce'},{name: 'basil'}], day: 'Monday', type: 'Italian'}},{meal: {title:'Mushroom soup', description: 'wholesome mushroom soup', image:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_9223edit.jpg', ingredients:[{name:'mushroom'},{name:'paprika'},{name: 'rosemary'}],day:'Monday',type:'American'}},{meal: {title:'Loaded Sweet Potato', description: 'Loaded Sweet Potato with bbq sauce', image:'https://karalydon.com/wp-content/uploads/2014/10/Vegan-Loaded-Sweet-Potato-3.jpg', ingredients:[{name:'sweet potato'},{name:'bbq sauce'},{name: 'avacado'}], day:'Tuesday', type:'American'}},{meal: {title:'Dosa', description: 'Like an Indian spicy pancake', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG/1024px-Masala_Dosa_as_served_in_Tamil_Nadu%2CIndia.JPG', ingredients:[{name:'potato'},{name:'dosa'},{name:'chutney'}], day:'Wednesday', type: 'Indian'}}]
