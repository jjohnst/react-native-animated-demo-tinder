'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, NavigatorIOS} from 'react-native';
import clamp from 'clamp';

const People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]
//need an array of objects
const Choices = [{choiceText:"Ever told on a brother?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Ever squeezed a trigger?", answer: "Yup!", imageURL: ""},
                 {choiceText:"Ever set a brother up?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Ever helped a brother out when he was down on his luck?", answer: "Yup!", imageURL: ""},
                 {choiceText:"You a sap?", answer: "Nope!", imageURL: ""},
                 {choiceText:"You a boss player, you a mack?", answer: "Yup!", imageURL: ""},
                 {choiceText:"Let me hold a couple dollars", answer: "Nope!", imageURL: ""},
                 {choiceText:"Y'all still be poppin' y'all collars?", answer: "Yup!", imageURL: ""},
                 {choiceText:"Stock rims on a scrape", answer: "Nope!", imageURL: ""},
                 {choiceText:"Paint wetter than a lake", answer: "Yup!", imageURL: ""},
                 {choiceText:"Poodle in my blood", answer: "Nope!", imageURL: ""},
                 {choiceText:"Bitch, I'm a thug", answer: "Yup!", imageURL: ""},
                 {choiceText:"You a loser?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Winner?", answer: "Yup!", imageURL: ""},
                 {choiceText:"Starvin'?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Dinner?", answer: "Yup!", imageURL: ""},
                 {choiceText:"You still sell dope?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Now you cleaner than a bar of Dove soap?", answer: "Yup!", imageURL: ""},
                 {choiceText:"Got a little gouda?", answer: "Nope!", imageURL: ""},
                 {choiceText:"Got a thumper, got a Ruger?", answer: "Yup!", imageURL: ""},
                 {choiceText:"You in love wit' the ho?", answer: "Nope!", imageURL: ""},
                 {choiceText:"She bringin' you the dough?", answer: "Yup!", imageURL: ""},
                 {choiceText:"You gon' cry if she leave?", answer: "Nope!", imageURL: ""},
                 {choiceText:"You gon' fly overseas?", answer: "Yup!", imageURL: ""}]

var SWIPE_THRESHOLD = 120;

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
      choice: Choices[0],
      //set prevChoice to right answer
      prevChoice: Choices[0],
      time: Date.now(),
      totalTime: 0,
      response: "Nope!",
      prevResponse: " ",
      beginning: true,
      correct: true,
      score: 0
    }
  }

  _goToNextChoice() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let currentChoiceIdx = Choices.indexOf(this.state.choice);
    let newIdx = currentPersonIdx + 1;
    let newChoiceIdx = currentChoiceIdx + 1;

    this.setState({
      beginning: false,
      person: People[newIdx > People.length - 1 ? 0 : newIdx],
      prevChoice: this.state.choice,
      choice: Choices[newChoiceIdx > Choices.length -1 ? 0 : newChoiceIdx],
      prevResponse: this.state.response,
      response: this.state.pan.x._value > 0 ? "Yup!" : "Nope!",
      totalTime: this.state.totalTime + Date.now() - this.state.time,
      time: Date.now()
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  //need to make sure the correct response is being compared to the previous answer
  //{this.state.response === this.state.prevChoice.answer ? "You were right" : "You were wrong"}
  _updateScore(){
    
    this.setState({
      score: this.state.response === this.state.prevChoice.answer ? this.state.score +10 : this.state.score
    });
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx > 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan.x, {
            velocity: velocity,
            deceleration: 0.98,
          }).start(this._resetState.bind(this))

          Animated.decay(this.state.pan.y, {
            velocity: vy,
            deceleration: 0.985,
          }).start();
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this._updateScore();
    this._goToNextChoice();
    
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._animateEntrance();
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity};

    return (
      <View style={styles.container}>
        <Text style= {styles.score} >Score: {this.state.score}</Text>
        <Text style= {styles.timer}>Total Time: {(this.state.totalTime)/1000}</Text>
        <Text>Resp: {this.state.response} Current: {this.state.prevChoice.answer}</Text>
        <Text>{this.state.beginning == false ? (this.state.response === this.state.prevChoice.answer ? "You were right" : "You were wrong") : ""}</Text>
        <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: this.state.person}]} {...this._panResponder.panHandlers}>
          <Text style = {styles.question}>{this.state.choice.choiceText}</Text>
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Nope!</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Yup!</Text>
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  score:{
    fontSize: 18,
    top: -57,
    left: -75
  },
  timer:{
    fontSize: 18,
    top: -80,
    right: -75
  },
  card: {
    height: 300,
    width: 300,
    top: -20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  question:{
    top: 310,
    backgroundColor: '#F5FCFF',
    fontSize: 20
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});

module.exports = GameScreen;