'use strict';
import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, ListView, NavigatorIOS, TouchableHighlight} from 'react-native';

var FAKE_LEADER_DATA = [
    {name: "Joshua Johnston", highScore: 250},
    {name: "Tri Vo", highScore: 248},
    {name: "Anna Rollings", highScore: 245},
    {name: "Matthew Johnston", highScore: 240},
    {name: "Joey Wilson", highScore: 239},
    {name: "Danny Lamm", highScore: 237},
    {name: "Aidan Brougham-Cook", highScore: 230},
    {name: "Kirk Johnston", highScore: 225},
    {name: "Denise Johnston", highScore: 0},
];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2
     })
    };
  }

  componentDidMount() {
    var leaders = FAKE_LEADER_DATA;
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(leaders)
    });
   }

   render() {
      var leader = FAKE_LEADER_DATA[0];
        return (
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderLeader.bind(this)}
            style={styles.listView}
            />
        );
    }

   renderLeader(leader) {
       return (
            <TouchableHighlight>
                <View>
                    <View style={styles.container}>
                        
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{leader.name}</Text>
                            <Text style={styles.author}>{leader.highScore}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
  }
}

var styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#00B2FF'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
 
module.exports = Leaderboard;