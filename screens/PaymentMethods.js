import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,TextInput} from 'react-native';
import Loading from "../common/Loading";
import Utill from '../../models/constants';
import {NavigationActions} from "react-navigation";
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class PaymentMethods extends Component {

    constructor (props) {
        super(props);
        this.state = {
           // user: this.props.navigation.state.params.user,
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
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <View style={{backgroundColor: Utill.green, width: width*0.8, height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../../assets/paypal.png')}
                            resizeMode={'contain'}
                            style={{width: width*0.8*0.4}}
                        />
                    </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
