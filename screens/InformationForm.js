import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput, Dimensions, ScrollView, NativeModules, Alert, KeyboardAvoidingView
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import constants from '../../models/constants';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal'
import FloatingLabelInput from "../common/FloatingLabelInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const NORTH_AMERICA = ['CA', 'MX', 'US']
const { width, height } = Dimensions.get("window");

export default class Information extends Component {

    constructor (props) {
        super(props);
        let userLocaleCountryCode;
        if(Platform.OS === 'android'){
            userLocaleCountryCode =NativeModules.I18nManager.localeIdentifier.slice(-2);
        }else{
            //userLocaleCountryCode =NativeModules.SettingsManager.settings.AppleLocale.slice(-2);
        }
        const userCountryData = getAllCountries().find(country =>  country.cca2 === userLocaleCountryCode)
        let cca2 = userLocaleCountryCode;
        if (!cca2 || !userCountryData) {
            cca2 = 'US'

        }
        console.log(userLocaleCountryCode);
        this.state = {
            name: this.props.screenProps.user.name,
            placeholderFirstName: 'First name',
            placeholderLastName: 'Last name',
            birthday: this.props.screenProps.user.birthday,
            placeholderBirthday: '1992-01-11',
            location: this.props.screenProps.user.location ? this.props.screenProps.user.location : getAllCountries().find(country =>
                country.cca2 === (userLocaleCountryCode ? userLocaleCountryCode : 'US')
            ).name.common,
            firstName: this.props.screenProps.user.firstName,
            lastName: this.props.screenProps.user.lastName,
            placeholderLocation: getAllCountries().find(country =>
                country.cca2 === (userLocaleCountryCode ? userLocaleCountryCode : 'US')
            ).name.common,
            cca2,_touchable:null
        };
    }

    _focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render () {
        return (
            <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    keyboardOpeningTime={200}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                    <View style={{width: '80%', alignItems: 'center', minHeight: height, justifyContent: 'flex-end'}}>

                        <View style={{flex: 1, marginTop: 50}}>
                            <Text style={{color: 'black', fontWeight: 'normal', textAlign: 'center', fontSize: 20}}>
                                Profile setup
                            </Text>

                        </View>
                        <View style={{width: '100%',justifyContent: 'flex-end', marginBottom: 30}}>

                            <FloatingLabelInput
                                returnKeyType='next'
                                onSubmitEditing={()=> {

                                    this.refLastname.getInnerRef().focus()
                                }}
                                autoCapitalize={'words'}
                                numberOfLines={1}
                                //keyboardType={'email-address'}
                                onChangeText={(text)=> this.setState({firstName: text, errMsg: ''})}
                                label={this.state.placeholderFirstName}
                                value={this.state.firstName}
                                errMsg={this.state.errMsg}
                                text = {this.state.firstName}
                                underlineColorAndroid={'transparent'}
                                blurOnSubmit={false}
                            />
                            <FloatingLabelInput
                                ref={(r) => {
                                    this.refLastname = r;
                                }}
                                returnKeyType='next'
                                autoCapitalize={'words'}
                                numberOfLines={1}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text)=> this.setState({lastName: text, errMsg: ''})}
                                label={this.state.placeholderLastName}
                                value={this.state.lastName}
                                errMsg={this.state.errMsg}
                                text = {this.state.lastName}
                                blurOnSubmit={true}
                                onSubmitEditing={()=> {
                                    this.datepicker.onPressDate()
                                }}
                            />

                            <TouchableOpacity
                                onPress={()=> this.datepicker.onPressDate()}
                            >
                                <View>
                                    <FloatingLabelInput
                                        ref={(r) => {
                                            this.refDate = r;
                                        }}
                                        editable={false}
                                        returnKeyType='next'
                                        autoCapitalize={'words'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({regEmail: text, errMsg: ''})}
                                        label={'Birthday'}
                                        value={this.state.birthday}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.birthday}
                                        blurOnSubmit={true}
                                        onSubmitEditing={()=> {
                                            //this.refPassword.getInnerRef().focus()
                                        }}
                                    />
                                    <DatePicker
                                        ref={(input)=>this.datepicker = input}
                                        style={{width: 0, height: 0,position: 'absolute', justifyContent: 'space-between'}}
                                        date={this.state.birthday}
                                        mode="date"
                                        androidMode={'spinner'}
                                        placeholder="Birthday"
                                        format="YYYY-MM-DD"
                                        minDate="1900-01-01"
                                        maxDate= {new Date().toISOString().slice(0, 10)}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        onCloseModal={()=> this.state._touchable.openModal()}
                                        customStyles={{
                                            dateInput: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                borderWidth: 0,
                                                color: 'white',
                                                width: 0,
                                                height: 0

                                            },
                                            dateIcon: {
                                                position: 'absolute',
                                                right: 0,
                                                top: 4,
                                                marginRight: 0,
                                                width: 0,
                                                height: 0
                                            },
                                            dateText:{
                                                fontWeight: 'bold', fontSize: 14,
                                                color: 'white',
                                                width: 0,
                                                height: 0
                                            },
                                            placeholderText: {
                                                fontWeight: 'bold', fontSize: 14,
                                                color: 'white',
                                                width: 0,
                                                height: 0
                                            }

                                        }}
                                        onDateChange={(date) => {
                                            this.setState({birthday: date});
                                            if(this.state.location === '') {
                                                this.state._touchable.openModal();
                                            }
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.state._touchable.openModal()}>
                                <View>
                                    <FloatingLabelInput
                                        ref={(r) => {
                                            this.refLocation = r;
                                        }}
                                        editable={false}
                                        returnKeyType='next'
                                        autoCapitalize={'words'}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(text)=> this.setState({location: text, errMsg: ''})}
                                        label={'Location'}
                                        value={this.state.location}
                                        errMsg={this.state.errMsg}
                                        text = {this.state.location}
                                        blurOnSubmit={true}
                                        onSubmitEditing={()=> {
                                            //this.refPassword.getInnerRef().focus()
                                        }}
                                        defaultValue={this.state.location ? this.state.location : ''}
                                    />
                                    <View style={{position: 'absolute', width: 0, height: 0, right: 13, top: 15}}>
                                    <CountryPicker
                                        ref={(touchable) => this.state._touchable = touchable}
                                        openModal={true}
                                        onChange={value => {
                                            console.log(value);
                                            this.setState({ cca2: value.cca2, location: value.name })
                                        }}
                                        cca2={this.state.cca2}
                                        translation="eng"

                                    />
                                    </View>
                                </View>
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
                                        this.props.screenProps.user.birthday = this.state.birthday;
                                        this.props.screenProps.user.location = this.state.location === '' ? this.state.placeholderLocation : this.state.location;
                                        this.props.screenProps.user.name = this.state.firstName + ' ' + this.state.lastName;
                                        this.props.screenProps.user.firstName = this.state.firstName;
                                        this.props.screenProps.user.lastName = this.state.lastName;
                                        if(this.state.birthday && this.props.screenProps.user.location && this.state.firstName && this.state.lastName) {

                                            this.props.navigation.navigate('PictureForm');
                                        }else{
                                            Alert.alert(
                                                'Attention of DOOM',
                                                'Please fill all fields with something',
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
                                <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                                <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                                <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}
