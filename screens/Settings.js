import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,} from 'react-native';
import Loading from "../common/Loading";
import Utill from '../../models/constants';
import {NavigationActions, StackActions} from "react-navigation";


const { width, height } = Dimensions.get("window");

export default class Settings extends Component {

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
            <View style={{flex: 1, backgroundColor: 'white', marginTop:100, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                        <View style={{margin: 20, flex: 1}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'lightgrey', flex: 1}}>
                                <View style={{width: 70, height: 70, borderRadius: 100, overflow: 'hidden', backgroundColor: 'lightgrey'}}>
                                    <Image
                                        source={{uri: 'https://mystajl.com/mobile/images/user?user='+this.state.user.email}}
                                        style={{width: '110%', height: '110%'}}
                                    />

                                </View>
                                <View style={{margin: 20}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                        {this.state.user.username}
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{color: 'lightgrey'}}>
                                            Change profile picture
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginTop: 20 , flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'lightgrey', marginBottom: 10}}>
                                        Name
                                    </Text>
                                    <Text style={{color: 'lightgrey'}}>
                                        Bio
                                    </Text>
                                </View>
                                <View style={{flex: 2}}>
                                    <Text style={{marginBottom: 10}}>
                                        {this.state.user.name}
                                    </Text>
                                    <Text>
                                        {this.state.user.description}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <TouchableOpacity>
                                        <Text style={{color: Utill.blue}}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ paddingBottom: 20 , flex: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 20,}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('Account', {user: this.state.user})
                                    }}
                                >
                                    <View style={{flex: 2}}>
                                        <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: Utill.blue}}>
                                            <Image
                                                source={require('../../assets/navigation/ProfileGray.png')}
                                                style={{width: 18, height: 18}}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex: 6, justifyContent: 'center'}}>
                                        <Text>
                                            Account
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Image
                                            source={require('../../assets/icons/arrowForwardBlack.png')}
                                            style={{width: 20, height: 20}}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10,}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('PaymentsAndSubscriptions', {user: this.state.user})
                                    }}
                                >
                                    <View style={{flex: 2}}>
                                        <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: Utill.green}}>
                                            <Image
                                                source={require('../../assets/navigation/ProfileGray.png')}
                                                style={{width: 18, height: 18}}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex: 6, justifyContent: 'center'}}>
                                        <Text numberOfLines={1}>
                                            Payments & Subscriptions
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Image
                                            source={require('../../assets/icons/arrowForwardBlack.png')}
                                            style={{width: 20, height: 20}}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10,}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('Security', {user: this.state.user})
                                    }}
                                >
                                    <View style={{flex: 2}}>
                                        <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: Utill.red}}>
                                            <Image
                                                source={require('../../assets/navigation/ProfileGray.png')}
                                                style={{width: 18, height: 18}}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex: 6, justifyContent: 'center'}}>
                                        <Text>
                                            Security
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Image
                                            source={require('../../assets/icons/arrowForwardBlack.png')}
                                            style={{width: 20, height: 20}}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{flexDirection: 'row' , flex: 1, justifyContent: 'space-between',marginTop: 20,}}
                                onPress={()=>{
                                    //const resetAction = StackActions.reset({
                                      //  index: 0,
                                        //actions: [
                                          //  NavigationActions.navigate({ routeName: 'Welcome'})
                                        //] });
                                    //this.props.navigation.dispatch(resetAction);
                                    this.props.navigation.navigate('Login', {login: false})
                                }}
                            >
                                <View style={{flex: 2}}>
                                    <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: Utill.grey}}>
                                        <Image
                                            source={require('../../assets/navigation/ProfileGray.png')}
                                            style={{width: 18, height: 18}}
                                        />
                                    </View>
                                </View>
                                <View style={{flex: 6, justifyContent: 'center'}}>
                                    <Text>
                                        Log out
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Image
                                        source={require('../../assets/icons/arrowForwardBlack.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
