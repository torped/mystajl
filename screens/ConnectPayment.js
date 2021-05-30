import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput, Dimensions, ScrollView, Alert, Picker, KeyboardAvoidingView, Platform, Animated
} from 'react-native';
const { width, height } = Dimensions.get("window");
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import constants from '../../models/constants';
import FloatingLabelInput from "../common/FloatingLabelInput";
import fetchTimeout from "fetch-timeout";
import {Request} from "../../models/utilities";

export default class ConnectPayment extends Component {

    constructor (props) {
        super(props);
        this.state = {

        }
    }

    firstSetup = async () => {
      this.props.screenProps.user.choice = this.state.choice;
                                    this.setState({onLoad: true});
                                    let body = new FormData();

                                    body.append('settings', JSON.stringify({
                                        birthday: this.props.screenProps.user.birthday,
                                        location: this.props.screenProps.user.location
                                    }));
                                    body.append('profile',JSON.stringify({
                                        intrest: this.props.screenProps.user.choice,
                                        name: this.props.screenProps.user.name,
                                        firstName: this.props.screenProps.user.firstName,
                                        lastName: this.props.screenProps.user.lastName
                                    }));
                                    body.append('goal',JSON.stringify({
                                        current: true,
                                        name: this.props.screenProps.user.goalName,
                                        category: this.props.screenProps.user.category,
                                        progression: this.props.screenProps.user.progression,
                                        description: this.props.screenProps.user.description,
                                    }));
                                    if(this.props.screenProps.user.image) {
                                        body.append('profileImg', {
                                            uri: this.props.screenProps.user.image,
                                            name: 'profileImg.jpg',
                                            type: 'image/jpg'
                                        });
                                    }
                                    if(this.props.screenProps.user.imageGoal) {
                                        body.append('goalImg', {
                                            uri: this.props.screenProps.user.imageGoal,
                                            name: 'goalImg.jpg',
                                            type: 'image/jpg'
                                        });
                                    }

        let response = await Request("firstsetup",
            'POST',{body}
            //{
                /*settings:{
                                        birthday: this.props.screenProps.user.birthday,
                                        location: this.props.screenProps.user.location
                                    },
                profile:{
                                        intrest: this.props.screenProps.user.choice,
                                        name: this.props.screenProps.user.name,
                                        firstName: this.props.screenProps.user.firstName,
                                        lastName: this.props.screenProps.user.lastName
                                    },
                goal:{
                                        current: true,
                                        name: this.props.screenProps.user.goalName,
                                        category: this.props.screenProps.user.category,
                                        progression: this.props.screenProps.user.progression,
                                        description: this.props.screenProps.user.description,
                                    },
                profileImg:{
                                            uri: this.props.screenProps.user.image,
                                            name: 'profileImg.jpg',
                                            type: 'image/jpg'
                                        },
                goalImg:{
                                            uri: this.props.screenProps.user.imageGoal,
                                            name: 'goalImg.jpg',
                                            type: 'image/jpg'
                                        }
            }*/);
        if(response) {

                                                global.user=[response];
                                                this.props.navigation.navigate('Profile', {'email': this.props.screenProps.user.email});
                }else{

                    this.setState({onLoad: false});
                }

    };


    render () {

        return (
             <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'padding'} enabled style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>

                <View style={{width: '80%', alignItems: 'center', minHeight: height, justifyContent: 'flex-end'}}>

                    <View style={{flex: 1, marginTop: 50, width: width, alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: 'normal', textAlign: 'center', fontSize: 20}}>
                            Connect payment
                        </Text>
                        <Text style={{width: width*0.8, color: 'darkgrey', textAlign: 'center', fontSize: 14, marginTop: 10}}>
                            Connecting a payment method allows you to receive and contribute to other users
                        </Text>

                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{backgroundColor: constants.green, width: width*0.8, height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../../assets/paypal.png')}
                            resizeMode={'contain'}
                            style={{width: width*0.8*0.4}}
                        />
                    </View>
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
                                    this.firstSetup();
                                    /*this.props.screenProps.user.choice = this.state.choice;
                                    this.setState({onLoad: true});
                                    //var toast = this.refs.toast;
                                    let body = new FormData();

                                    body.append('settings', JSON.stringify({
                                        birthday: this.props.screenProps.user.birthday,
                                        location: this.props.screenProps.user.location
                                    }));
                                    body.append('profile',JSON.stringify({
                                        intrest: this.props.screenProps.user.choice,
                                        name: this.props.screenProps.user.name,
                                        firstName: this.props.screenProps.user.firstName,
                                        lastName: this.props.screenProps.user.lastName
                                    }));
                                    body.append('goal',JSON.stringify({
                                        current: true,
                                        name: this.props.screenProps.user.goalName,
                                        category: this.props.screenProps.user.category,
                                        progression: this.props.screenProps.user.progression,
                                        description: this.props.screenProps.user.description,
                                    }));
                                    if(this.props.screenProps.user.image) {
                                        body.append('profileImg', {
                                            uri: this.props.screenProps.user.image,
                                            name: 'profileImg.jpg',
                                            type: 'image/jpg'
                                        });
                                    }
                                    if(this.props.screenProps.user.imageGoal) {
                                        body.append('goalImg', {
                                            uri: this.props.screenProps.user.imageGoal,
                                            name: 'goalImg.jpg',
                                            type: 'image/jpg'
                                        });
                                    }
                                    //console.log(JSON.stringify(body));

                                    fetchTimeout('https://mystajl.com/mobile/firstsetup',
                                        {
                                            method: 'POST',
                                            body : body,
                                            credentials: 'include',

                                            cache: 'no-cache',
                                        } ,
                                        10000,
                                        'Server Time Out,\nserver is probbably offline'
                                    )
                                        .then((res) => {
                                            this.setState({onLoad: false});
                                            console.log('res');
                                            if(res.ok){
                                                console.log(res);
                                                global.user=[res._bodyInit];
                                                this.props.navigation.navigate('Profile', {'email': this.props.screenProps.user.email});
                                            }else{
                                                console.log('errorindahouse: ',res._bodyInit);
                                                this.props.navigation.navigate('Profile', {'email': this.props.screenProps.user.email});
                                                //throw new Error(JSON.parse(res._bodyInit).errMsg);
                                            }

                                        })
                                        .catch((error) => {
                                            this.setState({onLoad: false});
                                            console.log('error');
                                            this.props.navigation.navigate('Profile', {'email': this.props.screenProps.user.email});
                                           /* Alert.alert(
                                                'Doom of Error',
                                                error.message,
                                                [
                                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                ],
                                                {cancelable: true},
                                            );*/
                                        //});
                                    //this.login();
                                }}
                            >
                                <View>
                                    <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                        COMPLETE
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{width: 12, height: 12, borderWidth: 2, borderColor: constants.blue, borderRadius: 100, backgroundColor: constants.blue}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
             </KeyboardAvoidingView>
        );
    }
}
