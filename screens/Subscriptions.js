import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,TextInput} from 'react-native';
import Loading from "../common/Loading";
import Utill from '../../models/constants';
import {NavigationActions} from "react-navigation";
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class Subscriptions extends Component {

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
                        <View style={{margin: 10}}>
                            {
                                this.state.user.following.map((user,index)=>{
                                    //console.log(user);
                                    return (
                                        <View key={index} style={{borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', marginBottom: 10}}>
                                            <View style={{margin: 10, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <View style={{marginRight: 10, width: 50, height: 50, borderRadius: 100, overflow: 'hidden', backgroundColor: 'lightgrey'}}>
                                                    <Image
                                                        source={{uri: 'https://mystajl.com/mobile/images/user?user='+user.userEmail}}
                                                        style={{width: '110%', height: '110%'}}
                                                    />
                                                </View>
                                                <View style={{flex: 2}}>
                                                    <Text style={{fontWeight: 'bold'}}>
                                                        {user.userName}
                                                    </Text>
                                                    <View style={{flexDirection: 'row'}}>
                                                    <Text style={{fontWeight: 'bold'}}>
                                                        {user.userName}
                                                    </Text>
                                                        <Text style={{color: 'lightgrey', fontSize: 12}}>
                                                            5 months
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{flex: 2,backgroundColor: Utill.blue, borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                                    <Text numberOfLines={1} style={{color: 'white',}}>
                                                        SUBSCRIBED
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}