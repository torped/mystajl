import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Animated,
    ImageBackground,
    PanResponder,
    TouchableOpacity,
    Easing,
    WebView,
    Image, Alert,
    ScrollView,
    BackHandler, RefreshControl, AppState
} from 'react-native';
import TabContainer from '../common/ProfileTab';
//import ProgressCircle from 'react-native-progress-circle';
//import axios from 'axios';
import Loading from '../common/Loading'
import Constants from "../../models/constants";
import { DrawerActions } from 'react-navigation';
import fetchTimeout from "fetch-timeout";
import {NavigationEvents} from "react-navigation";

const { width, height } = Dimensions.get("window");

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImg: require('../../assets/surf_woman_mar_surfer.jpeg'),
            changeFollow: false,
            changeAbout: false,
            animatedAbout: new Animated.Value(height*0.9),
            animatedPercent: new Animated.Value(0),
            user: JSON.parse(this.props.user),//global.user ? JSON.parse(global.user[0]): null,
            currentGoal: null,
            userMail: global.user ? global.user[1] : null,
            profileMail: global.user ? JSON.parse(global.user[0]).email : null,
            pp: null,
            screenHeight: height,
            showPaypal: false,
            onLoad: false,
            addButton: false,
            refreshing: false,
            appState: AppState.currentState
        };
    }


    componentWillUnmount(){
        //this.list.remove();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.parse(nextProps.user) !== this.state.user) {
            this.setState({ user: JSON.parse(nextProps.user) });
        }
    }

    componentDidMount() {
        /*this.list = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('listner');
                this.setState({
                    user: JSON.parse(this.props.user)
                });
                //this.forceUpdate();
            }
        );*//*
        if(this.state.user !==null && !this.state.user.verified && this.state.user.email.toLowerCase() === this.state.profileMail.toLowerCase()){

            Alert.alert(
                'Doom of Error',
                'User is not vertified',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true},
            );
        }*/
        if(this.state.user){
            for(let i = 0; i < this.state.user.goals.length; i++){
                if(this.state.user.goals[i].current){
                    this.setState({
                        currentGoal: this.state.user.goals[i]
                    });


                }
            }
        }
    }


    _about = () => {
        let array = [];
        this.state.animatedPercent.setValue(0);
        for(let i = 0; i < 5; i++){
            array.push(
                <Image
                    source={this.state.profileImg}
                    style={{width: '20%', height: (width*0.9)/5}}
                    key={i}
                />
            );
        }
        Animated.timing(
            this.state.animatedAbout,
            {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.poly(8)),
                useNativeDriver: true
            }
        ).start();

        const animatedWidth = this.state.animatedPercent.interpolate({
            inputRange: [0,75],
            outputRange: ['0%','75%']
        });

        return (
            <Animated.View style={{transform: [{ translateY: this.state.animatedAbout }],flex:1, alignItems: 'center', zIndex: 100, alignSelf: 'center', position: 'absolute',bottom: 0, height: '90%', width: '90%', backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20}}>

                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <Text style={{marginTop: 20, marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>
                        Goalis
                    </Text>
                    <TouchableOpacity style={{alignItems: 'center'}}
                                      onPress={()=> console.log('hej')}
                    >
                        <Text style={{fontSize: 16, color: 'red'}}>
                            Read More
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: '25%', flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
                        {array}
                        <Animated.View style={{width: this.state.animatedBool ? '75%' : animatedWidth, backgroundColor: 'rgba(200,100,100,0.6)', height: '100%', position: 'absolute', top: 0, left: 0}}/>

                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', position: 'absolute', height: '100%', width: '100%', textAlign: 'center', textAlignVertical: 'center'}}>
                            75%
                        </Text>
                    </View>
                    {this.state.userMail !== this.state.profileMail ?
                        <TouchableOpacity
                            style={{backgroundColor: 'blue', width: 40*3.5, height: 40, borderRadius: 20, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}
                            onPress={()=> {

                                this.setState({
                                    showPaypal: !this.state.showPaypal
                                })

                                //this.props.newPage(this.props.screens.donate)
                            }}
                        >
                            <Text style={{fontSize: 14, color: 'white'}}>
                                CONTRIBUTE
                            </Text>
                        </TouchableOpacity>
                        : null
                    }

                </View>

            </Animated.View>
        );
    };

    setHeight = (contentHeight, addButton) => {
        this.setState({
            screenHeight: contentHeight + height,
            addButton: addButton
        });
    };

    follow = () =>{
        //console.log(JSON.stringify(this.state.user));
       //console.log(this.state.userMail);
      var check = this.state.user.followers.findIndex((user)=> user.userEmail.toLowerCase() === this.state.userMail.toLowerCase());

      return check !== -1 ? 'FOLLOWING' : 'FOLLOW';
    };

    pressSetting = () => {
        this.props.navigation.navigate('Settings', {user: this.state.user});
    };

    pressFollow = () => {
        let mail = JSON.parse(global.user[0]).email;
        let name = JSON.parse(global.user[0]).name;
        console.log(mail, name, this.state.user.email);
        let params = {
            userEmail: mail,
            userName: name,
            followEmail: this.state.user.email,
            followName: this.state.user.name
        };

         fetch('https://mystajl.com/mobile/followUser',
        {
            method: 'POST',
            body : JSON.stringify(params),
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
        }} )

        .then((res) => {
            var temp = JSON.parse(res._bodyInit);
            let u;
            if(temp[0].email.toLowerCase() === this.state.userMail.toLowerCase()){
                global.user[0] = JSON.stringify(temp[0]);
                global.user[2] = JSON.stringify(temp[1]);
                u= temp[1];
            }else{
                global.user[2] = JSON.stringify(temp[0]);
                global.user[0] = JSON.stringify(temp[1]);
                u=temp[0];
            }
            //console.log(u.followers);
            this.setState({
                user: u
            });
        })
        .catch((error) =>  console.log(error))
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        console.log(this.state.user.email);
        fetchTimeout('https://mystajl.com/mobile/user?email='+this.state.user.email, {
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
                    console.log(JSON.parse(response._bodyInit).email, 'hej')
                    this.setState({
                        refreshing:false,
                        user: JSON.parse(response._bodyInit)
                    });
                    //global.user[2]= response._bodyInit;
                    //this.props.navigation.navigate('VisitProfile');
                }else{
                    this.setState({refreshing: false});
                    throw new Error(JSON.parse(response._bodyInit).errMsg);
                }
            })
            .catch(error => {
                this.setState({refreshing: false});
                Alert.alert(
                    'Doom of Error',
                    error,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });
    };

    render() {
        // var profile = this.state.user.profileImg ? 'https://mystajl.com/mobile/images/profile/'+this.state.user.profileImg : ;
        // const path =  CacheManager.get(profile).getPath();
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <NavigationEvents
                    onDidFocus={(payload)=>{this._onRefresh()}}
                />
                <ScrollView contentContainerStyle={{flexGrow: 1, height: this.state.screenHeight}}
                            scrollEnabled={true}
                            refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                >
                    {this.state.onLoad ? <Loading style={{flex: 1}}/> : null}

                    {

                        this.state.showPaypal ?
                            <WebView
                                source={{uri: 'https://mystajl.com/mobile/paypal_payment'}}
                                style={{flex: 1, marginTop: 65}}
                                useWebKit={true}
                                javaScriptEnabled={true}
                                onLoadStart = {()=> this.setState({onLoad: true})}
                                onLoadEnd={()=> this.setState({onLoad: false})}
                                onMessage={(e) => {
                                    this.setState({
                                        showPaypal: false
                                    });
                                    if (e.nativeEvent.data === 'Success')
                                        alert('Success full Donation!');
                                    else
                                        alert('Failed Donation!');
                                }}
                                goBack={() => this.setState({showPaypal: false})}
                            /> :
                            <View style={{flex: 1}}>

                                {
                                    this.state.changeAbout ?
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                top: 0,
                                                left: 0,
                                                zIndex: 99
                                            }}
                                            onPress={() => {
                                                this.setState({
                                                    changeAbout: false,
                                                    animatedBool: false,
                                                })
                                            }}
                                        /> : null
                                }

                                <ImageBackground
                                    source={this.state.currentGoal && this.state.currentGoal.goalImg ? {
                                            uri: 'https://mystajl.com/mobile/images/profile/' + this.state.currentGoal.goalImg,

                                        }
                                        :
                                        this.state.profileImg}
                                    imageStyle={{resizeMode: 'cover'}}
                                    style={{width: '100%',height: (width/9) * 10}}

                                >

                                    <View style={{flex: 1, margin: 30, justifyContent: 'flex-end'}}>

                                        <View>
                                            <View>
                                                <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                                                    {this.state.user ? this.state.user.name : 'Batman'}
                                                </Text>
                                                <Text style={{fontSize: 14, color: 'white'}}>
                                                    {this.state.user ? this.state.user.username : 'Läderlappen'}
                                                </Text>

                                                <Text style={{fontSize: 14, color: 'white', flexShrink: 1, marginTop: 10}}>
                                                    {this.state.user && this.state.user.description ? this.state.user.description : 'You have no profile description'}
                                                </Text>

                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '70%',
                                                marginTop: 15,
                                                marginBottom: 10
                                            }}>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center'}}>
                                                        <TouchableOpacity
                                                            onPress={()=>{
                                                                this.state.user.email === this.state.profileMail ? this.pressSetting() : this.pressFollow()
                                                            }}
                                                            style={this.follow() === 'FOLLOWING' && this.state.user.email !== this.state.profileMail ? {
                                                                borderRadius: 25,
                                                                borderWidth: 2,
                                                                borderColor: Constants.blue,
                                                                backgroundColor: Constants.blue,
                                                                width: 30 * 3.5,
                                                                height: 35,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginRight: 20
                                                            }:{
                                                                borderRadius: 25,
                                                                borderWidth: 2,
                                                                borderColor: 'white',
                                                                width: 30 * 3.5,
                                                                height: 35,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginRight: 20
                                                            }}
                                                        >
                                                            <Text style={this.follow() === 'FOLLOWING' ? {
                                                                color: 'white',
                                                                fontSize: 14
                                                            }:{
                                                                color:'white',
                                                                fontSize: 14,
                                                            }}>
                                                                {this.state.user.email === this.state.profileMail ? 'SETTINGS' : this.follow()}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{
                                                                borderRadius: 25,
                                                                borderWidth: 2,
                                                                borderColor: 'white',
                                                                width: 30 * 3.5,
                                                                height: 35,
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Text style={{color: 'white', fontSize: 14}}>
                                                                MESSAGE
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>

                                            </View>
                                            <View style={{
                                                flexDirection: 'row'

                                            }}>
                                                <TouchableOpacity
                                                    style={{
                                                        paddingBottom: 3,
                                                        marginRight: 20
                                                    }}
                                                >
                                                    <View style={{alignItems: 'center'}}>
                                                        <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                                            {this.state.user && this.state.user.goals.length !== 0 ? this.state.user.goals.map((goal) => goal.images.length).reduce((x, y) => x + y) : 0}
                                                        </Text>
                                                        <Text style={{fontSize: 10, color: 'white'}}>
                                                            POSTS
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        marginRight: 20
                                                    }}
                                                >
                                                    <View style={{alignItems: 'center'}}>
                                                        <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                                            {this.state.user ? this.state.user.followers.length : 0}
                                                        </Text>
                                                        <Text style={{fontSize: 10, color: 'white'}}>
                                                            FOLLOWERS
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        marginRight: 20
                                                    }}
                                                >
                                                    <View style={{alignItems: 'center'}}>
                                                        <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                                            {this.state.user ? this.state.user.following.length : 0}
                                                        </Text>
                                                        <Text style={{fontSize: 10, color: 'white'}}>
                                                            FOLLOWING
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        marginRight: 20
                                                    }}
                                                >
                                                    <View style={{alignItems: 'center'}}>
                                                        <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                                            {this.state.user ? this.state.user.goals.length : 0}
                                                        </Text>
                                                        <Text style={{fontSize: 10, color: 'white'}}>
                                                            GOALS
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </ImageBackground>



                                <TabContainer

                                    key={this.state.user.goals[0] && this.state.user.goals[0].images ? this.state.user.goals[0].images.length : 0}
                                    style={{flex: 1}} screenProps={{
                                    goals: this.state.user.goals,
                                    height: this.setHeight,
                                    navigation: this.props,
                                    user: this.state.user
                                }}/>

                            </View>
                    }
                </ScrollView>
                {this.state.addButton ? <TouchableOpacity
                        style={{elevation: 1,alignItems: 'center', justifyContent: 'center', position: 'absolute',bottom: 20,right: 20, width: width*0.2, height: width*0.2,borderRadius: 50, backgroundColor: Constants.blue}}
                        onPress={()=>{
                            Alert.alert(
                'Doom of Error',
                'Nothing here yet',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true},
            );
                        }}
                    >

                    <Text
                        style={{color: 'white', fontSize: 34, fontWeight: 'bold', textAlign: 'center'}}

                    >
                        +
                    </Text>
                    </TouchableOpacity>
                :null}
            </View>
        );
    }
}

const maxWidth = Dimensions.get('window').width;

const homeScreen = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: 'transparent',

    },
    scroll:{

    },
    innerContainer:{
        marginTop: 10
    }
});

const profile = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 5
    },
    upperContainer:{
        flexDirection: 'row',
        flex: 0.5,
        alignItems: 'center',
        alignContent: 'center',

    },
    postContainer:{
        flexDirection: 'column'
    },
    image:{
        width: maxWidth/4,
        height: maxWidth/4,
        alignSelf: 'flex-start'
    },
    textContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 0.7,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    settings:{
        width: maxWidth/15,
        height: maxWidth/15,
        position: 'absolute',
        top: 5,
        right: 10
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

        alignItems: 'center',
        alignContent: 'center'

    },
    footer:{
        alignSelf: 'center'
    },
    name:{

        fontWeight: 'bold',

    },
    editProfile:{
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    editProfileText:{
        fontSize: 10,
        alignSelf: 'center',
        paddingLeft: 3,
        paddingRight: 3
    },
    followers:{
        alignSelf: 'center'
    },
    following:{
        alignSelf: 'center'
    },
    posts:{
        alignSelf: 'center'
    },
    presentation:{
        fontSize: 12
    }
});

const background = StyleSheet.create({
    container: {
        marginTop: 5
    },
    image:{
        width: maxWidth,
        height: maxWidth*(9/16)
    },

});

const options = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
    },
    goalContainer:{
        flexDirection: 'column',
        flex: 1,
    },
    goalArrow:{
        width: maxWidth/15,
        height: maxWidth/15,
    },
    goalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    goalFooter:{
        alignSelf: 'center',
        margin: 10
    },
    goalInfo:{
        fontSize: 12
    },
    header:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    goalText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    multiImage:{
        width: maxWidth/15,
        height: maxWidth/15
    },
    singelImage:{
        width: maxWidth/15,
        height: maxWidth/15
    },
    createGoal:{
        backgroundColor: '#e94811',
        borderRadius: 10,
        padding: 2,
        paddingLeft: 7,
        paddingRight: 7

    },
    createGoalText:{
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
    },
    opa:{
        opacity: 0.3
    },
    vis:{
        opacity: 1
    }
});

