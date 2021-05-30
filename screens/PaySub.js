import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,TextInput} from 'react-native';
import Loading from "../common/Loading";
import Utill from '../../models/constants';
import {NavigationActions} from "react-navigation";
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class Account extends Component {

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
                                            Payments methods
                                        </Text>
                                        <Text style={{marginTop: 5}}>
                                            By adding a payment method you can contribute and sunscribe to user and it also allows you to receive them.
                                        </Text>
                                    </View>
                                    <View style={{margin: 10, height: 60, width: 60, borderRadius: 50, backgroundColor: Utill.green, justifyContent: 'center', alignItems: 'center'}}>
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
                                    this.props.navigation.navigate('PaymentMethods');
                                }}
                            >
                                <Text style={{color: Utill.blue}}>
                                    Manage payment methods
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginLeft: 10, marginRight: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10}}>
                            <View style={{margin: 10, flex: 1, borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingBottom: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{flex: 4}}>
                                        <Text style={{fontSize: 18}}>
                                            Subscriptions
                                        </Text>
                                        <Text style={{marginTop: 5}}>
                                            See and manage everyone you are subscribed to
                                        </Text>
                                    </View>
                                    <View style={{margin: 10, height: 60, width: 60, borderRadius: 50, backgroundColor: Utill.blue, justifyContent: 'center', alignItems: 'center'}}>
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
                                    this.props.navigation.navigate('Subscriptions', {user: this.state.user})
                                }}
                            >
                                <Text style={{color: Utill.blue}}>
                                    Manage subscriptions
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
