'use strict';

import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, PanResponder, } from 'react-native';
import clamp from 'clamp';

var Choices = [{
  text: "Ever told on a brotha?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Ever squeezed a trigger?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Ever set a brotha up?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Ever helped a brother out when he was down on his luck?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You a sap?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You a boss player, you a mack?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Let me hold a couple dollars?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Y'all still be poppin' y'all collars?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Stock rims on a scraper?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Paint wetter than a lake?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Poodle in my blood?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Bitch, I'm a thug?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You a loser?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Winner?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Starvin'?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Dinner?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You still sell dope?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Now you cleaner than a bar of Dove soap?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Got a little gouda?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "Got a thumper, got a Ruger?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You in love wit' the ho?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "She bringin' you the dough?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You gon' cry if she leave?",
  answer: "Nope!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
},
{
  text: "You gon' fly overseas?",
  answer: "Yup!",
  imageLink: "http://images.guff.com/gallery/image/b2ravthccaeh0jh" 
}
];

const People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]

var SWIPE_THRESHOLD = 120;

class Flix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
      choice: Choices[0],
    }
  }

  _goToNextPerson() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let currentChoice = Choices.indexOf(this.state.choice);
    let newIdx = currentPersonIdx + 1;
    let newChoiceIdx = currentChoice + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx],
      choice: Choices[newChoiceIdx > Choices.length - 1 ? 0 : newChoiceIdx]
    });
  }

  componentDidMount() {
    this._animateEntrance();
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
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextPerson();
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
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: this.state.person}]} {...this._panResponder.panHandlers}>
        <Image source={{uri: "http://images.guff.com/gallery/image/b2ravthccaeh0jh"}}/>
        <Text>{this.state.choice.text}</Text>
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
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  card: {
    top: 100,
    height: 285,
    backgroundColor: 'red',
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

AppRegistry.registerComponent('Flix', () => Flix);
