import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,TextInput} from 'react-native';
import Loading from "../common/Loading";
//import Utill from '../../models/constants';
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
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                        <View style={{margin: 20}}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
                                onPress={()=>{
                                    this.props.navigation.push('Email', {user: this.state.user})
                                }}
                            >
                                <View style={{flex: 3}}>
                                    <Text style={{color: 'lightgrey', fontWeight: 'bold'}}>
                                        EMAIL
                                    </Text>
                                    <Text style={{fontWeight: 'bold'}}>
                                        {this.state.user.email}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon color={'grey'} size={24} name={'ios-arrow-forward'}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
                                onPress={()=>{
                                    this.props.navigation.push('Email', {user: this.state.user})
                                }}
                            >
                                <View style={{flex: 3}}>
                                    <Text style={{color: 'lightgrey', fontWeight: 'bold'}}>
                                        BIRTHDAY
                                    </Text>
                                    <Text style={{fontWeight: 'bold'}}>
                                        {this.state.user.settings.birthday}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon color={'grey'} size={24} name={'ios-arrow-forward'}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
                                onPress={()=>{
                                    this.props.navigation.push('Email', {user: this.state.user})
                                }}
                            >
                                <View style={{flex: 3}}>
                                    <Text style={{color: 'lightgrey', fontWeight: 'bold'}}>
                                        LOCATION
                                    </Text>
                                    <Text style={{fontWeight: 'bold'}}>
                                        {this.state.user.settings.location}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon color={'grey'} size={24} name={'ios-arrow-forward'}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
                                onPress={()=>{
                                    this.props.navigation.push('Gender', {user: this.state.user})
                                }}
                            >
                                <View style={{flex: 3}}>
                                    <Text style={{color: 'lightgrey', fontWeight: 'bold'}}>
                                        GENDER
                                    </Text>
                                    <Text style={{fontWeight: 'bold'}}>
                                        Shemale
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon color={'grey'} size={24} name={'ios-arrow-forward'}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
                                onPress={()=>{
                                    this.props.navigation.push('Password', {user: this.state.user})
                                }}
                            >
                                <View style={{flex: 3}}>
                                    <Text style={{color: 'lightgrey', fontWeight: 'bold'}}>
                                        PASSWORD
                                    </Text>
                                    <TextInput
                                        style={{fontWeight: 'bold'}}
                                        secureTextEntry={true}
                                        value={'12345678'}
                                        editable={false}
                                        selectTextOnFocus={false}
                                    />

                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon color={'grey'} size={24} name={'ios-arrow-forward'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
