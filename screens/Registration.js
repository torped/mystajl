import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput, Dimensions, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard,findNodeHandle, UIManager
} from 'react-native';
//import axios from "axios";
//import Toast from "react-native-easy-toast";
import Loading from '../common/Loading';
import fetchTimeout from 'fetch-timeout';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FloatingLabelInput from "../common/FloatingLabelInput";
import constants from '../../models/constants';
import {Request} from "../../models/utilities";

const { width, height } = Dimensions.get("window");

export default class Register extends Component {

    constructor (props) {
        super(props);
        this.state = {
            regUsername: '',
            regUsernamePlaceholder: 'Username',
            regUsernameCheck: null,
            regPassword: '',
            regPasswordPlaceholder: 'Password',
            regPasswordCheck: null,
            regRepeatPassword: '',
            regRepeatPasswordPlaceholder: 'Repeat password',
            regReapeatPasswordCheck: null,
            regEmail: '',
            regEmailPlaceholder: 'Email',
            regEmailCheck: null,
            onLoad: false,
            keyboardHeight:0,
            ke:200
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    };

    _keyboardDidShow = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    };
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide=(e)=> {
        this.state.keyboardHeight= 0;
    };

    _focusNextField = (nextField) => {
        this.refs[nextField].focus();
        this.setState({
            ke: this.state.ke +50
        })
    };

    checkUsername = (username) => {
        let re = /^[a-zA-Z]+$/;
        return re.test(username) && username.length > 4;
    };

    checkPassword = (password) => {
        return password.length >= 8;
    };


    checkPasswordRepeat = (password) =>{
        return password === this.state.regPassword;
    };

    checkEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    check = () => {
        let string = '';
        if(!this.checkUsername(this.state.regUsername))
            string = ' Username shouled be atleast 5 char long and \n can only contain letters.';
        if(!this.checkPassword(this.state.regPassword))
            string += '\n Password shouled be atleast 8 characters long.';
        if(!this.checkPasswordRepeat(this.state.regRepeatPassword))
            string += '\n Password does not match.';
        if(!this.checkEmail(this.state.regEmail))
            string += '\n Email address is not valid.';
        if(string === ''){
            this.setState({onLoad: true});
            this.register();
        }else{
            Alert.alert(
                'Input Error',
                string,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true},
            );
        }
    };

    register = async() => {
        //this.setState({onLoad: true});
       let response = await Request("signup",
            'POST',
            {
                email: this.state.regEmail,
                password: this.state.regPassword,
                confirmPassword: this.state.regRepeatPassword,
                username: this.state.regUsername
            });
        if(response) {
                    console.log('user created, trying to get in');
                    this.props.screenProps.user.email = this.state.regEmail;
                    this.props.screenProps.user.password = this.state.regPassword;
                    this.props.navigation.navigate('InformationForm');
                }else{

                    this.setState({onLoad: false});
                }
        //this.setState({onLoad: false});

/*
        fetchTimeout('https://mystajl.com/mobile/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.regEmail,
                password: this.state.regPassword,
                confirmPassword: this.state.regRepeatPassword,
                username: this.state.regUsername
            }),credentials: 'include',
            cache: 'no-cache',
        }, 10000, 'Server Time Out,\nserver is probbably offline')
            .then(res =>{
                this.setState({onLoad: false});
                if(res.ok){
                    console.log('user created, trying to get in');
                    this.props.screenProps.user.email = this.state.regEmail;
                    this.props.screenProps.user.password = this.state.regPassword;
                    this.props.navigation.navigate('InformationForm');

                }else {
                    throw new Error(JSON.parse(res._bodyInit).errMsg);
                }
            })
            .catch((error)=> {
                this.setState({onLoad: false});
                console.log(error);
                Alert.alert(
                    'Doom of Error',
                    error.message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });*/
    };

    render () {
        return (
            <KeyboardAwareScrollView
                ref={'scroll'}
                //getTextInputRefs={() => { return [this._textInputRef];}}
                enableOnAndroid={true}
                extraScrollHeight={50}
                keyboardOpeningTime={200}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', minHeight: height}}
                            overScrollMode={'always'}
                            keyboardDismissMode='interactive'
                >
                    {this.state.onLoad ? <Loading style={{width: width, height: height}}/>: null}
                    <View style={{flex: 1, alignItems: 'center', minHeight: height}}>
                        <View style={{flex: 1.2, justifyContent: 'center'}}>
                            <View style={{backgroundColor: 'transparent',marginTop: height*0.05, width: width*0.5, height: width*0.5, alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    source={require('../../assets/logo/LogoTextYellow.png')}
                                    style={{backgroundColor:'transparent', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                                    resizeMode={'contain'}
                                />
                            </View>
                        </View>
                        <View style={{flex:1,width: width, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10}}>
                            <View style={{width: '80%'}}>

                                <View>

                                    <FloatingLabelInput
                                        returnKeyType='next'
                                        onSubmitEditing={()=> {

                                            this.refInput.getInnerRef().focus()
                                        }}
                                        autoCapitalize={'words'}
                                        numberOfLines={1}
                                        //keyboardType={'email-address'}
                                        onChangeText={(text)=> this.setState({regUsername: text, errMsg: ''})}
                                        label={this.state.regUsernamePlaceholder}
                                        value={this.state.regUsername}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.regUsername}
                                        underlineColorAndroid={'transparent'}
                                        blurOnSubmit={false}
                                    />
                                    <FloatingLabelInput
                                        ref={(r) => {
                                            this._textInputRef = r;
                                            this.refInput = r;
                                        }}
                                        returnKeyType='next'
                                        autoCapitalize={'words'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({regEmail: text, errMsg: ''})}
                                        label={this.state.regEmailPlaceholder}
                                        value={this.state.regEmail}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.regEmail}
                                        blurOnSubmit={true}
                                        onSubmitEditing={()=> {
                                            this.setState({
                                                ke: this.state.ke +30
                                            });
                                            this.refPassword.getInnerRef().focus()
                                        }}
                                    />

                                    <FloatingLabelInput
                                        ref={(r) => {
                                            this._textInputRef = r;
                                            this.refPassword = r;
                                        }}
                                        returnKeyType='next'
                                        secureTextEntry={true}
                                        password={true}
                                        autoCapitalize={'none'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({regPassword: text, errMsg: ''})}
                                        label={this.state.regPasswordPlaceholder}
                                        value={this.state.regPassword}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.regPassword}
                                        blurOnSubmit={true}
                                        onSubmitEditing={()=> {
                                            this.setState({
                                                ke: this.state.ke +30
                                            });
                                            this.refReapet.getInnerRef().focus()
                                        }}
                                    />

                                    <FloatingLabelInput
                                        ref={(r) => {
                                            this._textInputRef = r;
                                            this.refReapet = r;
                                        }}
                                        returnKeyType='done'
                                        secureTextEntry={true}
                                        password={true}
                                        autoCapitalize={'none'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({regRepeatPassword: text, errMsg: ''})}
                                        label={this.state.regRepeatPasswordPlaceholder}
                                        value={this.state.regRepeatPassword}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.regRepeatPassword}
                                        blurOnSubmit={true}
                                        onSubmitEditing={()=> {
                                            //this.refInput.getInnerRef().focus()
                                            //this.props.navigation.navigate('InformationForm');
                                            this.check();
                                        }}
                                    />
                                </View>
                                <View style={{marginTop: 25, width: width*0.8}}>
                                    <View style={{width: '100%'}}>

                                        <TouchableOpacity
                                            style={{backgroundColor: constants.blue, borderRadius: 5, width: '100%', height: width*0.8*0.15, alignItems: 'center', justifyContent: 'center'}}
                                            onPress={()=>{
                                                this.check();
                                            }}
                                        >
                                            <View>
                                                <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                                    REGISTER
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{alignSelf: 'center', marginTop: 15, marginBottom: 10}}
                                            onPress={()=>{this.props.navigation.goBack(null);}}
                                        >
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{color: 'black', fontSize: 14}}>
                                                    I already have an account
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flex: 1,alignSelf: 'center', justifyContent: 'flex-end'}}>

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

