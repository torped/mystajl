import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Animated,
    AsyncStorage,
    Switch
} from 'react-native';
import fetchTimeout from "fetch-timeout";
import Toast from 'react-native-easy-toast';
import Loading from "../common/Loading";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FloatingLabelInput from '../common/FloatingLabelInput';
import constans from '../../models/constants';
import {useFetch, Request} from "../../models/utilities";

const { width, height } = Dimensions.get("window");
var user;
export default class Front extends Component {


    constructor (props) {
        super(props);
        this.state = {
            placeholderUsername: 'Email or username',
            username: '',
            placeholderPassword: 'Password',
            password: '',
            onLoad: false,
            keyboardHeight: 0,
            errMsg: '',
            passwordRef: null,
            switch: false

        };
        this.refInput = null;
    }


    componentDidMount() {
       // console.log('lllllllllllllllll');
        //console.log(this.props.screenProps.userData.password);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        if(this.props.screenProps.userData){
            let {username, password, persist} = this.props.screenProps.userData;
            this.state.username = username;
            this.state.password = password;
            this.state.switch = persist;
            this.setState({
                username: username,
                password: password,
                switch: persist
            });
            //console.log(this.props.navigation.getParam('login'));
            if(this.props.navigation.getParam('login') !==false) {
                if (this.props.screenProps.userData.persist) {
                    this.login();
                }
            }
        }

    };

    _keyboardDidShow = (e) => {
        //console.log(e);
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

    login = async () =>{

        this.setState({onLoad: true});
       let response = await Request("login",
            'POST',
            {
                email: this.state.username,
                password: this.state.password
            });
        if(response) {
                    //console.log(response._bodyInit);
                    this.props.navigation.setParams({
                        user: response,
                    });

                    this.toggleSwitch(this.state.switch);
                    global.user = [response];
                    global.user[1] = global.user[0].email;
                    //global.cookie = global.user[0]._id;
                    //var ff = JSON.parse(global.user[0]).firstSetup;
                    this.state.onLoad=false;
                    //console.log(global.user[1],'login');
                    this.props.screenProps.navigation.navigate('Feed', {
                        user: response
                    });
                }else{
                    this.toggleSwitch(false);
                    this.setState({onLoad: false});
                }
    };

    _focusNextField = (nextField) => {
        //console.log(this.refs);
        this.refs.nextField.focus();
    };

    toggleSwitch = async (state) =>{
        //console.log(state);
        if(state){
            try {
                //await AsyncStorage.removeItem('userData');
                let user = {
                    username: this.state.username,
                    password: this.state.password,
                    persist: state
                };
                //console.log('inne');
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                let j = await AsyncStorage.getItem('userData');
                //console.log(j);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }else{
            try {
                await AsyncStorage.removeItem('userData');
                return true;
            }
            catch(exception) {
                return false;
            }
        }
    };

    dd = ()=>{
        const res = useFetch("https://mystajl.com/mobile/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })});
  if (!res.response) {

      return <View><Text>Loading</Text></View>
  }else{
      return <View><Text>Finnished</Text></View>
  }
    };

    render () {

        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraScrollHeight={50}
                keyboardOpeningTime={200}
            >
                <ScrollView
                    style={{ flex: 1}}
                    overScrollMode={'always'}
                    contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
                    scrollEnable={true}

                >
                    {this.state.onLoad ? <Loading style={{width: width, height: height}}/>: null}

                    <View style={{flex: 1, alignItems: 'center', minHeight: height, width: width}}>
                        <View style={{flex: 1.2, justifyContent: 'center'}}>
                            <View style={{backgroundColor: 'transparent',marginTop: height*0.05, width: width*0.5, height: width*0.5, alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    source={require('../../assets/logo/LogoTextYellow.png')}
                                    style={{backgroundColor:'transparent', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                                    resizeMode={'contain'}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
                            <View style={{width: width, alignItems: 'center'}}>
                                <View style={{width: '80%'}}>
                                    <FloatingLabelInput
                                        returnKeyType='next'
                                        onSubmitEditing={()=> {
                                            this.refInput.getInnerRef().focus()
                                        }}
                                        autoCapitalize={'words'}
                                        numberOfLines={1}
                                        keyboardType={'email-address'}
                                        onChangeText={(text)=> this.setState({username: text, errMsg: ''})}
                                        label={this.state.placeholderUsername}
                                        value={this.state.username}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.username}
                                        underlineColorAndroid={'transparent'}
                                        blurOnSubmit={false}

                                    />
                                    <FloatingLabelInput
                                        ref={(r) => this.refInput = r}
                                        returnKeyType='done'
                                        secureTextEntry={true}
                                        password={true}
                                        autoCapitalize={'none'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({password: text, errMsg: ''})}
                                        label={this.state.placeholderPassword}
                                        value={this.state.password}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.password}
                                        onSubmitEditing={()=> {
                                            this.login();
                                        }}
                                        {...this.props}
                                    />
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
                                        <View style={{alignItems: 'flex-start'}}>
                                            <Switch
                                                value={this.state.switch}
                                                onValueChange={(state)=>{
                                                    this.toggleSwitch(state);
                                                    this.setState({
                                                        switch: state
                                                    })
                                                }}
                                            />
                                            <Text style={{color: 'black'}}>
                                                Keep Logged in
                                            </Text>
                                        </View>
                                        <Text style={{textAlign: 'right', color: 'black', fontSize: 14, marginTop: 5}}>
                                            Forgot password?
                                        </Text>
                                    </View>

                                </View>


                                <View style={{width: '80%'}}>
                                    <TouchableOpacity
                                        style={{marginTop: 20, backgroundColor: constans.blue, borderRadius: 5, width: '100%', height: width*0.8*0.15, alignItems: 'center', justifyContent: 'center'}}
                                        onPress={()=>{
                                            this.login();
                                            this.toggleSwitch(this.state.switch);

                                        }}
                                    >
                                        <View>
                                            <Text style={{color: constans.white, fontSize: 16, fontWeight: 'bold'}}>
                                                LOGIN
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        View style={{alignSelf: 'center', marginTop: 15, marginBottom: 10}}
                                        onPress={()=>{
                                            console.log();
                                            this.props.navigation.navigate('Registrations')}}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{color: 'black', fontSize: 14}}>
                                                Create new account
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}


var styles = StyleSheet.create({

});
