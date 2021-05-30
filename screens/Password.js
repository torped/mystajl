import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import Const from '../../models/constants';
import FloatingLabelInput from "../common/FloatingLabelInput";

const { width, height } = Dimensions.get("window");

export default class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoad: false,
            passwordCheck: false,
            errMsg: '',
            password: '',
            user: this.props.navigation.state.params.user,
            newEmail: 'keith_fast@hotmail.com',
            newPassword: '',
            repeatPassword: ''
        };
    }

    render() {
        if(this.state.onLoad) {
            return (
                <View style={{flex: 1}}>

                </View>
            );
        }else if(this.state.passwordCheck){
            return (
                <View style={{margin: 20, flex: 1,backgroundColor: 'white'}}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        Select a new password
                    </Text>
                    <FloatingLabelInput
                        returnKeyType='next'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=> {this.setState({newPassword: text})}}
                        label={'Password'}
                        value={this.state.newPassword}
                        errMsg={this.state.errMsg}
                        //text = {''}
                        blurOnSubmit={true}
                        onSubmitEditing={()=> {
                            //this.setState({passwordCheck: true});
                        }}
                    />
                    <FloatingLabelInput
                        returnKeyType='done'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=> {this.setState({repeatPassword: text})}}
                        label={'Repeat password'}
                        value={this.state.repeatPassword}
                        errMsg={this.state.errMsg}
                        //text = {''}
                        blurOnSubmit={true}
                        onSubmitEditing={()=> {
                            //this.setState({passwordCheck: true});
                        }}
                    />
                    <View style={{marginTop: 10}}>
                    <Text>
                        Password strenght:
                    </Text>
                    <Text>
                        Use at least 8 characters.
                    </Text>
                    </View>
                    <View style={{margin: 10, flex: 1,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <TouchableOpacity
                            style={{marginRight: 20}}
                            onPress={()=>{
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Text style={{color: Const.blue, fontSize: 16, fontWeight: 'bold'}}>
                                DONE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }else{
            return(
                <View style={{margin: 20,backgroundColor: 'white',flex:1}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>
                        Enter your password to continue
                    </Text>
                    <FloatingLabelInput
                        secureTextEntry={true}
                        returnKeyType='done'
                        autoCapitalize={'none'}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=> {this.setState({password: text})}}
                        label={'Password'}
                        value={this.state.password}
                        errMsg={this.state.errMsg}
                        text = {''}
                        blurOnSubmit={true}
                        onSubmitEditing={()=> {
                            this.setState({passwordCheck: true});
                        }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20}}>
                        <TouchableOpacity>
                            <Text numberOfLines={1} style={{flex: 3,color: Const.blue,}}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 2, padding: 10, backgroundColor: Const.blue, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}
                            onPress={()=>{
                                this.setState({passwordCheck: true});
                            }}
                        >
                            <Text numberOfLines={1} style={{color: 'white'}}>
                                NEXT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}