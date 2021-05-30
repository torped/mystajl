import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    KeyboardAvoidingView, SafeAreaView, AsyncStorage, StatusBar, Platform, Alert, ScrollView, RefreshControl,AppRegistry
} from 'react-native';
//import {Constants} from 'expo';
import Icon from '@expo/vector-icons/Ionicons';
import PProfile from './components/screens/Profile';
import CCamera from './components/screens/Camera';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {
    createBottomTabNavigator} from 'react-navigation-tabs'
//import CCCamera from './components/photography/Camera';
import Search from './components/screens/Search';
import {
    createSwitchNavigator,
    createAppContainer,

    //createStackNavigator,
   // createMaterialTopTabNavigator
} from 'react-navigation';
import LoginNav from "./components/common/LoginNav";
import Post from './components/common/Post';
import Feed from './components/screens/Feed';
import GoalBig from './components/common/GoalBig';
import Settings from './components/screens/Settings';
import {fromBottom, fromLeft} from "react-navigation-transitions";
import Account from './components/screens/Account';
import PaySub from './components/screens/PaySub';
import PaymentMethods from './components/screens/PaymentMethods';
import Subscriptions from "./components/screens/Subscriptions";
import Security from "./components/screens/Security";
import Email from './components/screens/Email';
import Gender from './components/screens/Gender';
import Password from './components/screens/Password';
//import {PhotographyNavigator} from "./components/photography";
//import {AppLoading} from "expo";
//import * as Font from "expo-font";
//import {Images, loadIcons, ThemeProvider} from "./components/components";
//import PhotoEdit from './components/photography/Photo'
//import PhotoAlbum from './components/photography/Photos'
//import fetchTimeout from "fetch-timeout";
 //import { NavigationActions } from 'react-navigation'

// $FlowFixMe
const SFProTextBold = require("./fonts/SF-Pro-Text-Bold.otf");
// $FlowFixMe
const SFProTextSemibold = require("./fonts/SF-Pro-Text-Semibold.otf");
// $FlowFixMe
const SFProTextRegular = require("./fonts/SF-Pro-Text-Regular.otf");


const onNavigationStateChange = () => undefined;

//global.user = [];

const { width, height } = Dimensions.get("window");
/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */
export default class App extends Component {

    constructor(){
        super();

    }
   /* state = {
        isReady: false
    };
    ready() { this.setState({ isReady: true }); }

    async componentDidMount(): Promise<void> {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
        const fonts = Font.loadAsync({
            "SFProText-Bold": SFProTextBold,
            "SFProText-Semibold": SFProTextSemibold,
            "SFProText-Regular": SFProTextRegular
        });
        const images = Images.downloadAsync();
        const icons = loadIcons();
        try {
            await Promise.all([fonts, ...images, icons]);
        } catch (e) {
            // Do nothing
        }
        this.ready();
    }
    render() : React.Node{
        const {isReady} = this.state;
        return (
            <React.Fragment>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={isReady ? "light-content" : "dark-content"}
                />
                <ThemeProvider>

                        {
                            !isReady && (<AppLoading />)
                        }
                        {
                            isReady && (<AppContainer {...{onNavigationStateChange}} />)
                        }

                </ThemeProvider>
            </React.Fragment>
        );
    }*/

    render() {
        console.disableYellowBox = true;

        //const {isReady} = this.state;



        return <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
            <AppContainer/>
        </KeyboardAvoidingView>


    }
}


/*class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go To Detail Screen" onPress={() => this.props.navigation.navigate('Detail')} />
      </View>
    );
  }
}*/
/*
class Settings extends Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Settings</Text>
        </View>
    );
  }
}*/


const FeedStack = createStackNavigator(
    {
        Feeed: {
            screen:Feed,
            headerMode: 'none',
            navigationOptions: ({ navigation }) => {
                return {
                    //headerTitle:'feed',// (<View style={{width: width, justifyContent: 'center', alignItems: 'center'}}><Text>Feed</Text></View>),//'Feed',
                    //headerLayoutPreset : 'center',
                    headerMode: 'none',
                    headerVisible: false,
                    headerTransparent: true,
                    /*headerLeft: (
                        <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
                    )*/
                };
            }
        },
        FeedVisitProfile:{
            screen: (props) => global.user[2]?<PProfile {...props} user={props.navigation.state.params.user}/>:<View/>,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: JSON.parse(global.user[2]).username,
                    headerTransparent: true
                };
            }
        },
        Post:{
            screen: Post,
            //params: {type: this.props},
            tabBarVisible: false,
            navigationOptions: ({ navigation, screenProps }) => {

                return {
                    tabBarVisible: false,
                    headerTitle: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                POST
                            </Text>
                        </View>
                    ),

                };
            }
        },
        GoalBig:{
            screen: GoalBig,
            tabBarVisible: false,
            navigationOptions: ({ navigation }) => {
                return {
                    tabBarVisible: false,
                };
            }
        },
    },
    {
        defaultNavigationOptions: {
            gesturesEnabled: false,

        },
        //headerMode: 'none',
        navigationOptions: ({navigation})=>{

            return {
                // headerMode: 'none',
                //   headerVisible: false,
                // headerTransparent: true,
            }
        }
    }
);
//let Vvv =true;



const SettingsStack = createStackNavigator({
        Settings: {
            screen: Settings,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: true,
                    headerTitle:()=><View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Settings</Text></View>,
                    headerLeft: (
                        <Icon style={{ paddingLeft: 20}} color={'white'} onPress={() => navigation.goBack(null)} name="ios-close" size={40} />
                    ),
                    headerRight: (
                        <View style={{ paddingRight: 20}}/>
                    )

                };
            },
            containerStyle: {
                backgroundColor: 'transparent',
            }
        },
        Account: {
            screen: Account,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Account',


                };
            }
        },
        PaymentsAndSubscriptions: {
            screen: PaySub,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Payments & Subscriptions',
                };
            }
        },
        PaymentMethods: {
            screen: PaymentMethods,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Payment methods',
                };
            }
        },
        Subscriptions: {
            screen: Subscriptions,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Subscriptions',
                };
            }
        },
        Security: {
            screen: Security,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Security',
                };
            }
        },
        Email: {
            screen: Email,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Change email',
                };
            }
        },
        Gender: {
            screen: Gender,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Gender',
                };
            }
        },
        Password: {
            screen: Password,
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: true,
                    headerTransparent: false,
                    headerTitle: 'Password',
                };
            },
            containerStyle: {
                backgroundColor: 'transparent',
            }
        }
    },
    {
        backgroundColor:'red',
        cardStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
            //opacity: 1,
        },
        transitionConfig : () => fromBottom()/*({

            containerStyle: {
                backgroundColor: 'transparent',
            },


        })*/,
        /*navigationOptions: ({ navigation }) => {
           return {
               headerVisible: true,
               headerTransparent: false,
           };
       }*/
    });

const ProfileStack = createStackNavigator({
        Profile: {
            screen: (props) => global.user[0]?<PProfile {...props} user={global.user[0]}/>:<View/>,
            navigationOptions: ({ navigation, screenProps }) => {

                const routeName = navigation.state.routeName;
                return { //!Vvv?{
                    headerTransparent: true,
                    //headerTitle: routeName,
                    //title: routeName,
                }
                /*headerLeft:(
                    <Icon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                    />
                ),
              }*///:{

                //headerTitle:<TouchableOpacity style={{width: width, height:height}} onPress={()=>{ navigation.navigate('Profile', {search: Vvv});}}><Search navigation={ navigation }/></TouchableOpacity>,
                //headerStyle: {height: height, width: width},
                //headerTransparent: true,

                //};
            }
        },/*
        VisitProfile:{
            screen: (props) => global.user[2]?<PProfile {...props} user={props.navigation.state.params.user}/>:<View/>,
            navigationOptions: ({ navigation }) => {


                BackHandler.addEventListener('hardwareBackPress', ()=>{


                navigation.pop(2);
                return true;
            });

                return {
                    headerTitle: JSON.parse(global.user[2]).username,
                    headerTransparent: true
                };
            }
        },*/
        Post:{
            screen: Post,
            //params: {type: this.props},
            tabBarVisible: false,
            navigationOptions: ({ navigation, screenProps }) => {

                return {
                    tabBarVisible: false,
                    headerTitle: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                POST
                            </Text>
                        </View>
                    ),

                };
            }
        },
        GoalBig:{
            screen: GoalBig,
            tabBarVisible: false,
            navigationOptions: ({ navigation }) => {
                return {
                    tabBarVisible: false,
                };
            }
        },
        Settings: {
            screen: SettingsStack,
            headerMode: 'none',
            navigationOptions: ({ navigation }) => {

                return {
                    headerVisible: false,
                    //      headerTitle: 'Settings',
                    headerTransparent: true
                };
            }
        }
    },
    {
        //transitionConfig: () => fromBottom()

        cardStyle: {
            backgroundColor: 'transperent',
            opacity: 1,
        },
        transitionConfig : () => ({
            containerStyle: {
                backgroundColor: 'transparent',
            }
        }),
        headerMode:'none',

    });

const SettingsDrawerNavigator = createDrawerNavigator({
        Profile: {screen: ProfileStack},
        Settings
    },{
        drawerPosition: 'bottom',
    }
);


const CameraStack = createStackNavigator({
    Camera: {
        screen: CCamera,
        navigationOptions: ({ navigation }) => {

            return {
                headerTransparent: true,
                tabBarVisible:false,
                /*headerLeft: (
                    <Icon style={{ paddingLeft: 20}} color={'white'} onPress={() => navigation.goBack(null)} name="ios-close" size={40} />
                ),*/
            }
        },


    },/*
    PhotoAlbum:{
        screen: PhotoAlbum,//PhotographyNavigator,
        navigationOptions: {
            header: null,
            tabBarVisible:false,
        }
    },
    PhotoEdit:{
        screen: PhotoEdit,
        navigationOptions: {
            header: null,
            tabBarVisible:false,
        }
    }*/
});

const SearchStack = createStackNavigator({
    Search: {
        screen: Search,

        navigationOptions: ({navigation}) => {

            return {
                headerTransparent: true,
                headerMode: 'none',
                headerVisible: false
            };
        }
    },
    SearchVisitProfile:{
            screen: (props) => global.user[2]?<PProfile {...props} user={props.navigation.state.params.user}/>:<View/>,
            navigationOptions: ({ navigation }) => {

                return {
                    headerTitle: JSON.parse(global.user[2]).username,
                    headerTransparent: true
                };
            }
        },
        Post:{
            screen: Post,
            //params: {type: this.props},
            tabBarVisible: false,
            navigationOptions: ({ navigation, screenProps }) => {

                return {
                    tabBarVisible: false,
                    headerTitle: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                POST
                            </Text>
                        </View>
                    ),

                };
            }
        },
        GoalBig:{
            screen: GoalBig,
            tabBarVisible: false,
            navigationOptions: ({ navigation }) => {
                return {
                    tabBarVisible: false,
                };
            }
        },
});

const DashboardTabNavigator = createBottomTabNavigator(
    {
        Feed:{
            screen: FeedStack,
            navigationOptions:({navigation})=> {
                return {
                    tabBarIcon: ({focused, titntColor}) => (<TouchableOpacity onPress={() => {
                            //navigation.dispatch(navigation.pop(1))
                            navigation.navigate('Feeed');
                        }}><Image
                            source={focused ? require('./assets/navigation/HomeGray.png') : require('./assets/navigation/Home.png')}
                            style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                    ),
                    tabBarLabel: <View/>,
                }
            }
        },
        Profile:{
            screen:ProfileStack,
            params:{type: this?.props},
            backBehavior: 'history',
            navigationOptions: ({navigation})=>{
                return {
                    tabBarIcon: ({focused, titntColor}) => (<TouchableOpacity onPress={()=>{
                        //navigation.dispatch(navigation.pop( 1))
                        navigation.navigate('Profile');
                    }}><Image
                        source={!focused ? require('./assets/navigation/Profile.png') : require('./assets/navigation/ProfileGray.png')}
                        style={{width: 24, height: 24}}/></TouchableOpacity>),
                    tabBarLabel: <View/>,
                }

            }
        },
        Camera:{
            screen: CameraStack,
            navigationOptions:({navigation})=>{
                return {
                    header: null,
                    tabBarVisible:false,
                    tabBarIcon: ({focused, titntColor}) => (<Image source={focused ? require('./assets/navigation/Camera.png') : require('./assets/navigation/Camera.png')} style={{width: 24, height: 24}}/>),
                    tabBarLabel: <View/>//({ tintColor }) => <TouchableOpacity onPress={()=>navigation.navigate('Camera', {date: new Date()})} style={{flex: 1, alignItems:'center', justifyContent: 'center'}}><Text>Camera</Text></TouchableOpacity>
                }
            }
        },
        Search:{
            screen: SearchStack,
            navigationOptions: {
                tabBarIcon: ({focused, titntColor}) => (<Image source={focused ? require('./assets/navigation/Search.png') : require('./assets/navigation/Search.png')} style={{width: 24, height: 24}}/>),
                tabBarLabel: <View/>,
            }
        },
        /*Search:{
          screen:()=> null,
          navigationOptions:({navigation})=>{
            return {
              tabBarOnPress: ()=>{

                navigation.navigate('Profile', {search: Vvv});

              },
              tabBarIcon: ({focused, titntColor}) => (<Image source={focused ? require('./assets/navigation/Search.png') : require('./assets/navigation/Search.png')} style={{width: 24, height: 24}}/>),
              tabBarLabel: <View/>
            }
          }
        },*/
        Notification:{
            screen: ()=><View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{color: 'black', fontSize: 16}}>nothing yet</Text></View>,
            navigationOptions: {
                tabBarIcon: ({focused, titntColor}) => (<Image source={focused ? require('./assets/navigation/NotificationsGray.png') : require('./assets/navigation/Notifications.png')} style={{width: 24, height: 24}}/>),
                tabBarLabel: <View/>

            }
        }
    },
    {
        //headerMode: 'none',
        backBehavior: 'initialRoute',
        swipeEnabled: true,
        initialRouteName: 'Feed',
        tabBarPosition: 'bottom',
        navigationOptions: ({ navigation }) => {

            //const { routeName } = navigation.state.routes[navigation.state.index];
            /*BackHandler.addEventListener('hardwareBackPress', ()=>{
                var { routeName } = navigation.state.routes[navigation.state.index];
               // var backRoute = navigation.state.routes[navigation.state.index-1].routeName;
                console.log(routeName, navigation.state.routeName);
                if(routeName === 'Feed' && navigation.state.index === 0){
                    Alert.alert(
                        'Exit',
                        'Do you want to exit app?',
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {
                                    BackHandler.removeEventListener('hardwareBackPress');
                                    BackHandler.exitApp();
                                }},
                        ],
                        {cancelable: true},
                    );
                   // navigation.goBack(null);
                    //return true;
                }else{
                    //var routeName2 = navigation.state.routes[navigation.state.index].routeName;
                    navigation.goBack(null);
                }
                //navigation.goBack(null);
                return true;
            });*/
            return {
                //header:null ,
                //headerTitle: routeName,
                tabBarLabel: <View/>,
                //backBehavior: 'history',
                swipeEnabled: true,
                //headerVisible: false
            };
        }
    }
);


const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: {screen:DashboardTabNavigator, params:{type: this?.props}},
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
                ),
            };
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator({
        Feed: {screen: Settings},
        Profile:{screen: DashboardTabNavigator, params:{type:this?.props}},
        Goals:{screen: Settings},
        Explore:{screen: Settings},
        Messages:{screen: Settings},
        Notification:{screen: Settings},
        Settings,
        Logout:{screen: LoginNav}
    },{
        navigationOptions:({navigation})=>{
            return {
                drawerLockMode:'locked-closed'
            }
        }}
);



const AppSwitchNavigator = createSwitchNavigator({
    //Welcome: { screen: LoginNav },
    Dashboard: {
        screen:DashboardTabNavigator,
        params:{type: this?.props}
    }
},{
    //initialRouteName: first,
    //headerMode: 'none',
    navigationOptions:({navigation})=>{
        //console.log('hej',this.props);

        return {
            drawerLockMode:'locked-closed',

        }
    }
});


//export {lll};
//export default lll;
const AppContainer = createAppContainer(AppSwitchNavigator);

