import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,TextInput} from 'react-native';
import Loading from "../common/Loading";
import Utill from '../../models/constants';
import {NavigationActions} from "react-navigation";
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class Security extends Component {

    constructor (props) {
        super(props);
        this.state = {
            user: this.props.navigation.state.params.user,
            onLoad: false
        };
    }
    static navigationOptions = {

    };


    render () {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                        <View style={{margin: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10}}>
                            <View style={{margin: 10, flex: 1, borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingBottom: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{flex: 4}}>
                                        <Text style={{fontSize: 18}}>
                                            Two-step verification
                                        </Text>
                                        <Text style={{marginTop: 5}}>
                                            Whenever accessing your account on a new device.
                                        </Text>
                                    </View>
                                    <View style={{margin: 10, height: 60, width: 60, borderRadius: 50, backgroundColor: Utill.red, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image
                                            source={require('../../assets/navigation/ProfileGray.png')}
                                            style={{width: 30, height: 30}}

                                        />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{marginBottom: 10, marginLeft: 10, marginRight: 10}}
                                onPress={()=>{
                                    //this.props.navigation.navigate('PaymentMethods');
                                }}
                            >
                                <Text style={{color: Utill.blue}}>
                                    Manage two-step verification
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </View>
            </View>
        );
    }
}
