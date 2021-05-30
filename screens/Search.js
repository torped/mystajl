import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    Text,
    Alert, Image, ScrollView
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import fetchTimeout from "fetch-timeout";
import Loading from '../common/Loading';
import VisitProfile from './VisitProfile';

const { width, height } = Dimensions.get("window");

export default class Search extends Component {

    constructor(props, params) {
        super(props, params);
        this.state = {
            searchResult: [],
            onLoad: false
        }
    }

    onPressPage = (page) => {

    };

    componentDidMount(){
        //this.searchInput.focus();
    }

    searchUser = (text) => {
        if(text.length > 0) {
            fetch('https://mystajl.com/mobile/findusers?finduser=' + text,
                {
                    credentials: 'include',
                    method: 'GET'
                })
                .then((res) => {
                    this.setState({
                        searchResult: JSON.parse(res._bodyInit)
                    });
                }).catch((err) => {
                console.log(err);
            });
        }else{
            this.setState({
                searchResult: []
            })
        }
    };

    visitUser = (user) => {
        this.setState({
            onLoad:true
        });
        fetchTimeout('https://mystajl.com/mobile/user?email='+user.email, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-cache',
        },5000, 'Server Timout,\nServer probbably offline.')
            .then(response => {
                if(response.ok) {
                    this.setState({
                        onLoad:false
                    });
                    global.user[2]= response._bodyInit;
                    this.props.navigation.navigate('SearchVisitProfile', {user: response._bodyInit});
                }else{
                    this.setState({onLoad: false});
                    throw new Error(JSON.parse(response._bodyInit).errMsg);
                }
            })
            .catch(error => {
                this.setState({onLoad: false});
                Alert.alert(
                    'Doom of Error',
                    error.message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });
    };

    render() {
        if(this.state.onLoad) {
            return (
                <Loading style={{width: width, height: height}}/>
            )
        }else {
            return (
                <View style={{marginTop: 30,width: width, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 45,width:width,flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=>this.props.navigation.goBack(null)}
                        >
                            <Ionicons name='ios-arrow-back' size={24} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            ref={(input)=> {this.searchInput = input}}
                            numberOfLines={1}
                            onChangeText={(text) => this.searchUser(text)}
                            style={{borderRadius: 8, width: '75%', height: '75%', paddingLeft: 5}}
                            elevation={1}
                            autoFocus={true}

                        />
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                          onPress={()=> {
                                              this.searchInput.clear();
                                              this.setState({
                                                    searchResult: []
                                                })
                                          }}>
                            <Ionicons name="ios-close-circle" size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                    <ScrollView containerStyle={{flexGrow: 1}} style={{width: width, marginBottom: 20}}>
                    {
                        this.state.searchResult ?
                            (
                                this.state.searchResult.map((user, key)=>{
                                    //console.log(user);
                                        return <TouchableOpacity
                                            onPress={() => {
                                                this.visitUser(user);
                                            }}
                                            key={key}
                                            style={{
                                                width: '100%',

                                                justifyContent: 'center',
                                                borderBottomColor: 'lightgrey',
                                                borderBottomWidth: 1,
                                            }}>
                                            <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
                                                <View style={{backgroundColor: 'grey', width: 50, height: 50, borderRadius: 50, marginRight: 10, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
                                                    <Image
                                                        source={{uri: 'https://mystajl.com/mobile/images/user?user='+user.email}}
                                                        style={{width:'110%', height: '110%'}}
                                                    />
                                                </View>
                                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                                    {user.name}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                )
                            ):null
                    }

                    </ScrollView>
                </View>
            );
        }
    }
}
