import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated , Text} from 'react-native';
import constants from '../../models/constants';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }
  getInnerRef = () => this.ref;

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      fontWeight: this.props.text !== '' || this.state.isFocused ? 'normal' : 'bold',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', constants.blue],
      }),
    };
    const inputStyle = {
      height: 26,
      fontSize: 16,
      paddingBottom: 5,
      borderBottomWidth: this.props.text !== '' || this.state.isFocused ? 2 : 2,
      borderBottomColor:this.props.text !== '' || this.state.isFocused ? constants.blue : '#aaa',
    };
    return (
      <View style={{ paddingTop: 20}}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          //{...this.props}
          style={inputStyle}
          onFocus={()=>{
            this.handleFocus();
            if(props.onFocus) {
              props.onFocus();
            }
          }}
          onBlur={()=>{
            this.handleBlur();
            if(props.onBlur) {
              props.onBlur();
            }
          }}
          ref={(r) => this.ref = r}
          underlineColorAndroid={'transparent'}
          autoCorrect={false}
          //blurOnSubmit
        />
        <Text style={{fontSize: 12, color: constants.red}}>{this.props.errMsg}</Text>
      </View>
    );
  }
}
/*
export default class App extends Component {


    constructor (props) {
        super(props);

    }
  state = {
    value: '',
  };

  handleTextChange = (newText) => this.setState({ value: newText });

  render() {
    return (
      <View style={{flex: 1}}>
        <FloatingLabelInput
            {...this.props}
        />
        <Text style={{fontSize: 12, color: constants.red}}>{this.props.errMsg}</Text>
      </View>
    );
  }
}
*/