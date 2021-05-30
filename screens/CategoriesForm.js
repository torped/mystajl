import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert,} from 'react-native';
import Toast from "react-native-easy-toast";
import {NavigationActions} from "react-navigation";
import fetchTimeout from "fetch-timeout";
import Loading from "../common/Loading";


const { width, height } = Dimensions.get("window");

export default class Categories extends Component {

    constructor (props) {
        super(props);
        this.state = {
            image: {
                fitness: require('../../assets/food.jpg'),
                travel: require('../../assets/food.jpg'),
                food: require('../../assets/food.jpg'),
                music: require('../../assets/food.jpg'),
                photo: require('../../assets/food.jpg'),
                gaming: require('../../assets/food.jpg')
            },
            choice:[],
            onLoad: false
        }
    }

    login = () =>{
        //this.setState({onLoad: true});
        //console.log('user: ', this.props.screenProps.user);
        /*fetchTimeout('https://mystajl.com/mobile/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'keith_fast@hotmail.com',
                password: 'teamc2451'
            }),
           credentials: 'include',
            cache: 'no-cache',
        },4000, 'Server Timout,\nServer probbably offline.')
            .then(response => {
                if(response.ok) {
                    //console.log(response._bodyInit);
                    this.props.navigation.setParams({
                        email: 'value1',
                        user: 'value2',
                    });
                    global.user = [response._bodyInit];
                    var ff = JSON.parse(global.user[0]).firstSetup;

                    if(!ff){
                        this.props.navigation.navigate('InformationForm');
                    }else {

                        this.props.navigation.navigate('Profile', {
                            'email': this.state.username,
                            'user': response._bodyInit
                        });
                    }
                }else{
                    this.setState({onLoad: false});
                    console.log(JSON.parse(response._bodyInit).errMsg);
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
            });*/
    };

    categories = () => {
        var arr = [[],[]];
        Object.keys(this.state.image).map((item, key) =>
            (
                arr[key%2].push(
                    <TouchableOpacity
                        key={key}
                        style={{width: 100, height: 100, marginTop: 10}}
                        overflow={'hidden'}
                        onPress={()=>{

                            this.state.choice.some(({name})=> name === item)
                                ?
                                this.setState({
                                    choice: this.state.choice.filter(e => e.name !== item)
                                })
                                :
                                this.setState({
                                    choice: [...this.state.choice, {name: item}]
                                })}}
                    >
                        <View style={{width: '100%', height: '100%'}}>

                            <Image
                                source={this.state.image[item]}
                                style={{width: 100, height: 100, borderRadius: 100}}
                            />

                            {
                                this.state.choice.some(({name})=> name === item) ?
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0,200,200,0.7)',
                                        borderRadius: 100
                                    }}/> : null
                            }
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                                    {item.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            )
        );


        return arr;
    };

    render () {
        let categories = this.categories();
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                {this.state.onLoad ? <Loading style={{width: width, height: height}}/>: null}
                <View style={{width: '80%', alignItems: 'center', minHeight: height}}>
                    <View style={{height: 45}}/>
                    <Toast
                        ref='toast'
                        style={{backgroundColor:'grey', padding: 15, borderRadius: 10}}
                        position='top'
                        positionValue={-100}
                        fadeInDuration={400}
                        fadeOutDuration={1800}
                        opacity={0.8}
                        textStyle={{color:'white', fontSize: 16, textAlign: 'center'}}
                    />

                    <View>
                        <Text style={{color: 'rgb(230,230,230)', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>
                            Help us get to know you better!
                        </Text>
                        <Text style={{color: 'rgb(230,230,230)', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>
                            Check categories that interest you.
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View style={{justifyContent: 'space-around'}}>
                            {categories[0]}
                        </View>
                        <View style={{marginLeft: 10}}>
                            {categories[1]}
                        </View>
                    </View>
                    <View
                        style={{position: 'absolute', bottom: 15, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <View style={{width: width, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity
                                style={{marginLeft: 20, marginBottom: 25, backgroundColor: 'white', borderRadius: 20, width: width*0.7*0.5, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>this.props.navigation.goBack(null)}
                            >
                                <View>
                                    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                                        BACK
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginRight: 20, marginBottom: 25, backgroundColor: 'white', borderRadius: 20, width: width*0.7*0.5, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>{
                                    this.props.screenProps.user.choice = this.state.choice;
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

                                    fetchTimeout('https://mystajl.com/mobile/firstsetup',
                                        {
                                            method: 'POST',
                                            body : body,
                                            credentials: 'include',

                                            cache: 'no-cache',
                                        } ,
                                        5000,
                                        'Server Time Out,\nserver is probbably offline'
                                    )
                                        .then((res) => {
                                            this.setState({onLoad: false});
                                            //console.log('res');
                                            if(res.ok){
                                                global.user=[res._bodyInit];
                                                this.props.navigation.navigate('Profile', {'email': this.props.screenProps.user.email});
                                            }else{
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
                                        });
                                    //this.login();

                                }}
                            >
                                <View>
                                    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                                        NEXT
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{width: 10, height: 10, borderWidth: 1, borderColor: 'lightblue', borderRadius: 100, backgroundColor: 'lightblue'}}/>
                            <View style={{width: 10, height: 10, borderWidth: 1, marginLeft: 10, borderColor: 'lightblue', borderRadius: 100, backgroundColor: 'lightblue'}}/>
                            <View style={{width: 10, height: 10, borderWidth: 1, marginLeft: 10, borderColor: 'lightblue', borderRadius: 100, backgroundColor: 'lightblue'}}/>
                            <View style={{width: 10, height: 10, borderWidth: 1, marginLeft: 10, borderColor: 'lightblue', borderRadius: 100, backgroundColor: 'lightblue'}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
