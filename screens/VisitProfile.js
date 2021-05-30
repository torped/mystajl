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
    ScrollView
} from 'react-native';
import TabContainer from '../common/ProfileTab';
import ProgressCircle from 'react-native-progress-circle';
//import axios from 'axios';


const { width, height } = Dimensions.get("window");

export default class Profile extends Component {

    constructor(props) {
        super(props);

        const AnimValue = new Animated.Value(0);
        let user;
        if(this.props.navigation.state.params.type === 'visit'){
            user = JSON.parse(global.user[2]);
        } else{
            user = JSON.parse(global.user[0]);
        }
        this.state = {
            profileImg: require('../../assets/surf_woman_mar_surfer.jpeg'),
            changeFollow: false,
            changeAbout: false,
            animatedAbout: new Animated.Value(height*0.9),
            animatedPercent: new Animated.Value(0),
            user: user,//global.user ? JSON.parse(global.user[0]): null,
            currentGoal: null,
            userMail: global.user ? global.user[1] : null,
            pp: null,
            screenHeight: height
        };

    }
    componentWillReceiveProps() {
        //console.log('rerender here')
        //this.yourFunction()
        //this.setState({})
    }
    componentWillUnmount(){
         this.list.remove();
    }

    componentDidMount() {
        /*axios.get('https://mystajl.com/mobile/images/profile/'+this.state.user.profileImg,
            {
                withCredentials: true,

            })
            .then((res)=>{
                //this.setState({
                  //  pp: res
                //});
                console.log(res._bodyInit);
        }).catch((err)=>{
          // console.log(err);
        });*/
        //console.log(this.state.user);
          this.list = this.props.navigation.addListener(
        'didFocus',
        payload => {
          console.log('listner');
          this.setState({
              user: JSON.parse(global.user[0])
          });
            //this.forceUpdate();
        }
        );




        if(this.state.user !==null && !this.state.user.verified){

            Alert.alert(
                'Doom of Error',
                'User is not vertified',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true},
            );
        }
        if(this.state.user){
            for(let i = 0; i < this.state.user.goals.length; i++){
                if(this.state.user.goals[i].current){
                    this.setState({
                        currentGoal: this.state.user.goals[i]
                    });


                }
            }
            //console.log(this.state.currentGoal);
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


                </View>

            </Animated.View>
        );
    };

     setHeight = (contentHeight) => {
        this.setState({ screenHeight: contentHeight + height});
    };

    render() {
        // var profile = this.state.user.profileImg ? 'https://mystajl.com/mobile/images/profile/'+this.state.user.profileImg : ;
        // const path =  CacheManager.get(profile).getPath();
        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1, height: this.state.screenHeight}}
                    scrollEnabled={true}

                >
                    <View style={{flex: 1}}

                    >

                            {
                                this.state.changeAbout ?
                                    <TouchableOpacity
                                        style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 99}}
                                        onPress={()=> {
                                            this.setState({
                                                changeAbout:false,
                                                animatedBool: false,
                                            })
                                        }}
                                    />: null
                            }

                            <ImageBackground
                                key={Date.now()}
                                source={this.state.currentGoal ? {
                                        uri: 'https://mystajl.com/mobile/images/profile/'+this.state.currentGoal.goalImg,

                                    }
                                    :
                                    this.state.profileImg}
                                imageStyle={{resizeMode: 'cover'}}
                                style={{width: '100%',}}
                            >
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: 'white',
                                    opacity: 0.8
                                }}/>
                                <View style={{ paddingTop: 45}}>
                                    <View style={{alignSelf: 'center', position: 'absolute',bottom: 0, height: '74%', width: '90%',}}/>
                                    {this.state.changeAbout ? this._about() : null}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10}}>

                                        <TouchableHighlight>
                                            <View style={{borderWidth: 1, borderColor: 'rgba(100,100,100,0.3)', borderRadius: 100}}>
                                                <ProgressCircle
                                                    radius={50}
                                                    percent={25}
                                                    borderWidth={3}
                                                    color={'white'}
                                                    shadowColor={'white'}
                                                    bgColor={'white'}

                                                >
                                                    <Image

                                                        source={this.state.user.profileImg ? {uri:'https://mystajl.com/mobile/images/profile/'+this.state.user.profileImg,

                                                        } :this.state.profileImg}
                                                        //source={this.state.profileImg}
                                                        imageStyle={{resizeMode: 'cover'}}
                                                        style={{width:'110%', height: '110%',}}

                                                    />
                                                </ProgressCircle>
                                            </View>
                                        </TouchableHighlight>

                                    </View>
                                    <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 1}}>
                                        <Text style={{fontSize: 20, color: 'black'}}>
                                            {this.state.user ? this.state.user.name: 'Batman'}
                                        </Text>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={{fontSize: 14, color: 'black'}}>
                                                {this.state.user && this.state.user.description ? this.state.description : 'You have no profile description'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center',width: '70%', alignSelf: 'center', marginTop: 15, marginBottom: 20}}>

                                        <TouchableOpacity
                                            style={{borderRadius: 25, borderWidth: 1, borderColor: 'blue', width: 30*3.5, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}
                                            onPress={()=> this.setState({changeAbout: !this.state.changeAbout})}
                                        >
                                            <Text style={{color: 'blue', fontSize: 14}}>
                                                ABOUT
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </ImageBackground>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.4)'}}>
                                <TouchableOpacity
                                    style={{paddingTop: 3, paddingBottom: 3,backgroundColor: 'white', width:'24.8%'}}
                                >
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                                            {this.state.user && this.state.user.goals.length !== 0 ? this.state.user.goals.map((goal)=>goal.images.length).reduce((x, y) => x + y) : 0}
                                        </Text>
                                        <Text style={{fontSize: 9, color: 'black'}}>
                                            POSTS
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{paddingTop: 3, paddingBottom: 3,backgroundColor: 'white', width:'24.8%'}}
                                >
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                                            {this.state.user ? this.state.user.followers.length : 0}
                                        </Text>
                                        <Text style={{fontSize: 9, color: 'black'}}>
                                            FOLLOWERS
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{paddingTop: 3, paddingBottom: 3,backgroundColor: 'white', width:'24.8%'}}
                                >
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                                            {this.state.user ? this.state.user.following.length : 0}
                                        </Text>
                                        <Text style={{fontSize: 9, color: 'black'}}>
                                            FOLLOWING
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{paddingTop: 3, paddingBottom: 3,backgroundColor: 'white', width:'24.8%'}}
                                >
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                                            {this.state.user ? this.state.user.goals.length : 0}
                                        </Text>
                                        <Text style={{fontSize: 9, color: 'black'}}>
                                            GOALS
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TabContainer key={this.state.user.goals[0] && this.state.user.goals[0].images ? this.state.user.goals[0].images.length : 0} style={{flex: 1}}  screenProps={{goals:this.state.user.goals, height: this.setHeight, navigation: this.props}}/>

                    </View>
                </ScrollView>
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

