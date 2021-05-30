import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput, Dimensions, ScrollView, Alert, Picker, KeyboardAvoidingView, Platform, Animated
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import constants from '../../models/constants';
import FloatingLabelInput from "../common/FloatingLabelInput";

export default class FirstGoal extends Component {
    state = {
    isFocused: true,
  };

    constructor (props) {
        super(props);
        this.state = {
            image: null,
            name: '',
            placeholderName: 'Goal name',
            category: '',
            placeholderCategory: 'Travel',
            progression: '',
            placeholderProgression: 'Posts',
            description: '',
            placeholderDescription: 'Describe your goal.',


        }
    }

    onPressAddPic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [7, 3],
            quality: 0.5
        });
        if (!result.cancelled) {
            this.setState({image: result.uri });
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    _maxWords = (string, max) =>{
        return string.length <= max;
    };

    componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {

    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.state.description !== '') ? 0 : 1,
      duration: 200,
    }).start();
  }



    render () {
      const labelStyle = {
      position: 'absolute',
      left: this.state.description !== '' || this.state.isFocused ? 0 : 5,
      fontWeight: this.state.description !== '' || this.state.isFocused ? 'normal' : 'bold',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 18],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 16],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [constants.blue, '#aaa'],
      }),
    };
        return (
             <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraScrollHeight={50}
                keyboardOpeningTime={200}
            >
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>

                <View style={{width: '80%', alignItems: 'center', minHeight: height, justifyContent: 'flex-end'}}>

                    <View style={{flex: 1, marginTop: 50, width: width}}>
                        <Text style={{color: 'black', fontWeight: 'normal', textAlign: 'center', fontSize: 20}}>
                            Create your first Goal!
                        </Text>

                    </View>
                    <View style={{width: '100%', marginTop: 30}}>
                        <FloatingLabelInput
                                returnKeyType='next'
                                onSubmitEditing={()=> {

                                    this.refDescribe.focus()
                                }}
                                autoCapitalize={'words'}
                                numberOfLines={1}
                                //keyboardType={'email-address'}
                                onChangeText={(text)=> this.setState({name: text, errMsg: ''})}
                                label={this.state.placeholderName}
                                value={this.state.name}
                                errMsg={this.state.errMsg}
                                text = {this.state.name}
                                underlineColorAndroid={'transparent'}
                                blurOnSubmit={false}
                                maxLength={30}
                            />



                        <View style={{ width: '100%', marginTop: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>


                                <Text style={{fontSize: 12, color: this.state.description !== '' || this.state.isFocused ? constants.blue : '#aaa', alignSelf: 'flex-end'}}>
                                    {250 - this.state.description.length} words left
                                </Text>
                            </View>
                            <Animated.Text style={labelStyle}>
                                    Goal description
                                </Animated.Text>
                            <TextInput
                                maxLength={250}
                                ref={(input)=> this.refDescribe = input}
                                returnKeyType='done'
                                blurOnSubmit={true}
                                style={{padding: 5,textAlignVertical: 'top', borderWidth: 2, borderColor: this.state.description !== '' || this.state.isFocused ? constants.blue : '#aaa', fontWeight: 'normal', fontSize: 14, color: 'black', alignItems: 'flex-end', width: '100%'}}
                                autoCapitalize={'words'}
                                numberOfLines={5}
                                multiline={true}
                                //placeholder={this.state.placeholderDescription}
                                //placeholderTextColor={'black'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text)=> this.setState({description: text})}
                                onFocus={()=> {this.setState({placeholderDescription: '', isFocused: true});}}
                                onBlur={()=> {this.state.description.length === 0 ? this.setState({placeholderDescription: 'Describe your goal.', isFocused: false}) : null;}}
                                value={this.state.description}
                            />
                        </View>
                    </View>
                    <View style={{width: '100%', marginTop: 10, marginBottom: 35}}>
                        <Text style={{color: 'darkgrey', fontSize: 18, marginBottom: 5}}>
                            Cover photo
                        </Text>
                        <TouchableOpacity onPress={()=>this.onPressAddPic()}>
                            <View style={{backgroundColor: 'lightgrey', height: width*0.8*(3/7), width: width*0.8, marginBottom: 10}}>
                                {this.state.image ?
                                    <Image
                                        style={{width: '100%', height: '100%'}}
                                        source={{uri: this.state.image}}
                                    />:null
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: height/11, height: height/11, borderRadius: 100, backgroundColor: constants.blue, position: 'absolute', bottom: -10, end: -1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=>this.onPressAddPic()}
                        >
                            <Text style={{paddingBottom: 2, fontSize: 40, fontWeight: 'bold', color: 'white'}}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View
                       style={{marginBottom: 15, justifyContent: 'center', alignItems: 'center', width: '100%'}}
                    >
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity
                                style={{marginBottom: 25, backgroundColor: constants.blue, borderRadius: 5, width: '45%', height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>this.props.navigation.goBack(null)}
                            >
                                <View>
                                    <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                        BACK
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginBottom: 25, backgroundColor: constants.blue, borderRadius: 5, width: '45%', height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>{
                                    let string = '';
                                    if(!this._maxWords(this.state.name, 30))
                                        string += 'Goal name is to long, max 30 chars.';
                                    if(!this._maxWords(this.state.description, 250))
                                        string += '\nDescription is to long, max 250 chars.';
                                    if(string === '') {
                                        if(this.state.image) {
                                            this.props.screenProps.user.imageGoal = this.state.image;
                                        }
                                        this.props.screenProps.user.goalName = this.state.name;
                                        this.props.screenProps.user.category = this.state.category;
                                        this.props.screenProps.user.progression = this.state.progression;
                                        this.props.screenProps.user.description = this.state.description;
                                        this.props.navigation.navigate('ConnectPayment')
                                    }else{
                                        Alert.alert(
                                            'Input error of Doom',
                                            string,
                                            [
                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            {cancelable: true},
                                        );
                                    }
                                }}
                            >
                                <View>
                                    <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                        NEXT
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{width: 12, height: 12, borderWidth: 2, borderColor: constants.blue, borderRadius: 100, backgroundColor: constants.blue}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
             </KeyboardAwareScrollView>
        );
    }
}
