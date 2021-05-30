import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Alert,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import Loading from "../common/Loading";
import constans from "../../models/constants";


const { width, height } = Dimensions.get("window");

export default class Categories extends Component {

    constructor (props) {
        super(props);
        this.state = {
            onLoad: false,
            firstLaunch: false
        }
    }

    componentDidMount() {
         AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value === null){
                 AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors

                this.setState({firstLaunch: true});

            }
            else{
                 this.setState({firstLaunch: true});
                 this.props.navigation.navigate('Login');

            }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
    }

    render () {
        if(this.state.firstLaunch) {
            return (
                <View style={{flex: 1}}>
                    <ImageBackground
                        source={require('../../assets/firstPhoto.jpg')}
                        style={{flex: 1}}
                    >
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{
                                backgroundColor: 'transparent',
                                marginTop: height * 0.05,
                                width: width * 0.5,
                                height: width * 0.5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    source={require('../../assets/logo/LogoTextYellow.png')}
                                    style={{
                                        backgroundColor: 'transparent',
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    resizeMode={'contain'}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50}}>
                            <Text style={{color: 'white', fontSize: 20}}>
                                Inspire to greatness!
                            </Text>
                            <View style={{width: '80%'}}>
                                    <TouchableOpacity
                                        style={{marginTop: 20, backgroundColor: constans.yellow, borderRadius: 5, width: '100%', height: width*0.8*0.15, alignItems: 'center', justifyContent: 'center'}}
                                        onPress={()=>{
                                            this.props.navigation.navigate('Registrations')
                                        }}
                                    >
                                        <View>
                                            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                                                CREATE AN ACCOUNT
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{marginTop: 20, backgroundColor: constans.white, borderRadius: 5, width: '100%', height: width*0.8*0.15, alignItems: 'center', justifyContent: 'center'}}
                                        onPress={()=>{
                                            this.props.navigation.navigate('Login');
                                        }}
                                    >
                                        <View>
                                            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                                                I ALREADY HAVE AN ACCOUNT
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }else{
            return(
                <View style={{flex: 1}}>
                    <Loading/>
                </View>
            );
        }
    }
}
