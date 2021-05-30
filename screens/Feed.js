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
    BackHandler,
    SafeAreaView,
    RefreshControl
} from 'react-native';
import Loading from '../common/Loading'
import ConstantsModel from '../../models/constants';
import {Video} from "expo-av";
import Constants from 'expo-constants'
import ImageComments from "../common/ImagesComments";
import fetchTimeout from "fetch-timeout";
import {withNavigationFocus} from 'react-navigation';
import {Request} from "../../models/utilities";

const { width, height } = Dimensions.get("window");

class Feed extends Component {

    constructor(props) {
        super(props);
        var image = require('../../assets/food.jpg');
        this.state = {
            users: [],
            imageArr: [
                {image: image, name: 'Fitness'},
                {image: image, name: 'Food'},
                {image: image, name: 'Games'},
                {image: image, name: 'Batman'},
                {image: image, name: 'Läder'},
                {image: image, name: 'Lappen'}
            ],
            onLoad:false,
            postArr: [],
            refreshing: true,
            isFocused:false
        };
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        console.log('refresh feed');
        if(!prevState.isFocused){
            console.log('refresh feed2');
            this._onRefresh();
        }
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton = () => {
        if(this.props.isFocused){
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
        }else{
            this.props.navigation.goBack(null);
        }
        return true;
    };

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener("didFocus", () => this.setState({ isFocused: true })),
            this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false })),

        ];
        BackHandler.addEventListener('harwareBackPress', this.handleBackButton)
        this._onRefresh();
    }

    _onRefresh = async() => {
        if(!this.state.refreshing) {
            this.setState({refreshing: true});
            let result = await Request('randomUsers', 'Get');
            if(result){
                this.state.users = result;
                this.state.postArr = [];
                result.map((user, index) => {
                    if (user.goals && user.goals.length > 0 && user.goals[0].images && user.goals[0].images.length > 0) {
                        user.goals[0].images.map((post, index) => {
                            this.state.postArr.push({user: user, image: post, created: new Date(post.created_on)});
                        });
                    }
                });
                this.state.postArr.sort((a, b) => {
                    return b.created - a.created;
                });

                this.setState({
                    //onLoad: false,
                    refreshing: false
                });
            }else {
                this.setState({
                    //onLoad: false,
                    refreshing: false
                });
            }
        }else{
            this.setState({
                refreshing: false
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
        },10000, 'Server Timout,\nServer probbably offline.')
            .then(response => {
                if(response.ok) {
                    //console.log(response._bodyInit);
                    this.setState({
                        onLoad:false
                    });
                    global.user[2]= response._bodyInit;
                    this.props.navigation.navigate('VisitProfile', {user: response._bodyInit});
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

    goToPost = (post) =>{
        this.props.navigation.navigate('Post', {
            image: post.image,
            user: post.user
        });
    };

    goToGoal = (user) =>{
        this.props.navigation.navigate('GoalBig',{index: 0, user: user})
    };

    _goToProfile = (user) =>{

        fetchTimeout('https://mystajl.com/mobile/user?email='+user.user.email, {
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
                    this.props.navigation.navigate('FeedVisitProfile', {user: response._bodyInit});
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

    _goToThreeDots = (user) => {
        Alert.alert(
            'nothing',
            'My butt is big',
            [
                {text: 'Ask me later', onPress: () => this._goToThreeDots()},
                {
                    text: 'Cancel',
                    onPress: () => this._goToThreeDots(),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this._goToThreeDots()},
            ],
            {cancelable: true}
        )
    };

    likeDislikePost = async(post, head) => {
        let params = {
            likeEmail: global.user[0].email,
            likeUser: global.user[0].name,
            imageId: post.image._id,
        };
        let result = await Request('likeImage', head, params);
        if(result){
            this._onRefresh();
        }
        /*
        fetch('https://mystajl.com/mobile/likeImage',
        {
            method: head,
            body : JSON.stringify(params),
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
        }} )
        .then((res) => {
            this._onRefresh();
        })
        .catch((error) =>  console.log(error))*/
    };

    likeLenght = (post)=> {
        let arr = new Set();
        post.image.likes.forEach((user) => {
            arr.add(user.userEmail);
        });
        return arr.size;
    };

    stories = () =>{

        return <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 70, height: 70, borderRadius: 100, overflow: 'hidden', backgroundColor: ConstantsModel.blue, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('../../assets/navigation/Camera.png')}
                        style={{width: '33%', height: '33%'}}
                    />
                </View>
                <Text style={{fontSize: 14}}>
                    +Add
                </Text>
            </View>
            {this.state.users.map((user, index)=>{
                return <TouchableOpacity key={index} onPress={()=>this.visitUser(user)}><View style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 70, height: 70, borderRadius: 100, overflow: 'hidden', backgroundColor: 'lightgrey'}}>
                        <Image
                            source={{uri: 'https://mystajl.com/mobile/images/user?user='+user.email}}
                            style={{width: '110%', height: '110%'}}
                        />
                    </View>
                    <Text style={{fontSize: 14}}>
                        {user.username}
                    </Text>
                </View>
                </TouchableOpacity>
            })}
        </View>;
    };

    discoverGoals = () =>{
        return<View style={{flexDirection: 'row', margin: 10}}>
            {this.state.users.map((user, index)=>{
                // console.log(user.goals[0].goalImg);

                return user.goals[0].goalImg ? <TouchableOpacity key={index} onPress={()=>this.goToGoal(user)}><View  style={{backgroundColor: 'white', marginRight: 10, elevation: 1}}>
                        <ImageBackground
                            source={{uri: 'https://mystajl.com/mobile/images/profile/' + user.goals[0].goalImg}}
                            style={{width: width*0.75, height: width*0.75*0.5}}
                        >
                            <View style={{margin: 10, backgroundColor: ConstantsModel.blue, borderRadius: 25, width: '30%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'white'}}>
                                    75%
                                </Text>
                            </View>
                            <View style={{flex: 1, margin: 10, marginBottom: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end'}}>
                                <View >
                                    <Text style={{color: 'white', fontSize: 14}}>
                                        {user.goals[0].name}
                                    </Text>
                                    <Text style={{color: 'white', fontSize: 10}}>
                                        {user.username}
                                    </Text>
                                </View>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {(()=>{
                                        var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                            date = new Date(user.goals[0].created_on);
                                        return date.getDay() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
                                    })()}
                                </Text>
                            </View>
                        </ImageBackground>
                        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
                            <Image
                                source={require('../../assets/icons/heartIconGray.png')}
                                style={{width: 20, height: 20}}
                                resizeMode={'contain'}
                            />
                            <Text style={{marginLeft: 5, fontSize: 14, fontWeight: 'bold'}}>
                                {user.goals[0].likes.length}
                            </Text>
                            <View style={{marginLeft: 10, width: 20, height: 20, backgroundColor: ConstantsModel.blue, borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    -
                                </Text>
                            </View>
                            <Text style={{marginLeft: 5, fontSize: 14, fontWeight: 'bold'}}>
                                {user.goals[0].comments.length}
                            </Text>
                        </View>
                    </View></TouchableOpacity>
                    : null;
            })}
        </View>;

    };

    popularLifestyles = () =>{

        return <View style={{flexDirection: 'row', margin: 10}}>
            {this.state.imageArr.map((image, index)=>{
                return <ImageBackground
                    key={index}
                    source={image.image}
                    style={{elevation: 1, backgroundColor: 'white', width: width*0.35,height: width*0.35*1.51, alignItems: 'center', marginRight: 10, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}>
                        {image.name}
                    </Text>
                </ImageBackground>
            })}
        </View>;
    };

    feed = () =>{
        if(this.state.postArr.length === 0){
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Nothing here yet plz post something</Text></View>
        }

        return <View style={{backgroundColor: 'lightgrey'}}>
            {this.state.postArr.slice(0,10).map((post, index)=>{
                return <View key={index} style={{marginBottom: 10, backgroundColor:'white', elevation: 1}}>
                    <View style={!this.props.noComment ? { backgroundColor: 'white', width: width, alignItems: 'center'} : null}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', alignItems: 'center'}}
                                onPress={()=>this._goToProfile(post)}
                            >
                                <View style={{width: 40, height: 40, borderRadius: 20, marginRight: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>

                                    <Image
                                        source={{uri: 'https://mystajl.com/mobile/images/user?user='+post.user.email}}
                                        style={{width:'110%', height: '110%'}}
                                    />
                                </View>
                                <View style={{marginLeft: 5}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                        {post.user.name}
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image
                                            source={require('../../assets/icons/wallClockGrey.png')}
                                            style={{width: 12, height: 12, marginRight: 2, marginBottom: 3}}
                                        />
                                        <Text style={{color: 'black', fontSize: 10, marginBottom: 3}}>
                                            {post.user.goals[0].description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{padding: 2}}
                                onPress={()=>this._goToThreeDots(post)}
                            >
                                <Image
                                    source={require('../../assets/icons/threeDotsBlack.png')}
                                    style={{width: 15, height: 15, alignSelf: 'center'}}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{width: width, paddingLeft: 10, marginBottom: 5, marginTop: 5}}>
                            <Text style={{color: 'black', fontSize: 14, flexShrink: 1}}>
                                {post.image.description}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=> this.goToPost(post)}
                            style={{flex: 1}}
                        >
                            {post.image.image.split("\\")[2].charAt(4)==='I'?
                                <Image style={{width: width, height: width*0.75, backgroundColor: 'grey'}}
                                       source={{uri: 'https://mystajl.com/mobile/images/profile/' + post.image.image}}/>
                                :
                                <Video style={{width: width, height: width*0.75, backgroundColor: 'grey'}}
                                       source={{uri: 'https://mystajl.com/mobile/images/profile/' + post.image.image}}
                                       rate={1.0}
                                       volume={0}
                                       isMuted={false}
                                       shouldPlay={true}
                                />
                            }
                            <View style={{flex: 1, width: width, paddingLeft: 5, paddingRight: 5}}>


                                <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            style={{flexDirection: 'row', margin:5, alignItems: 'center'}}
                                            onPress={()=>{
                                                this.likeDislikePost(post, post.image.likes.some((element)=> {return element.userEmail === global.user[0].email})? 'DELETE':'POST')
                                            }}
                                        >
                                            <Image
                                                style={{height: 32, width: 32, marginRight: 5}}
                                                source={post.image.likes.some((element)=> {return element.userEmail === global.user[0].email})
                                                    ?
                                                    require('../../assets/icons/like.png')
                                                    :
                                                    require('../../assets/icons/notLike.png')}
                                                resizeMode={'contain'}/>
                                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                                {
                                                    this.likeLenght(post)
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flexDirection: 'row', margin: 5,marginLeft: 10, alignItems: 'center'}} onPress={()=>{}}>
                                            <View style={{width: 32, height: 32, marginRight: 5, borderColor: 'black', borderWidth: 3, borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                                {post.image.comments.length}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                        {post.user.goals[0].contributed.slice(0,4).map((user,index) => {
                                            //console.log(user.user.userEmail);
                                            return <View key={index} style={{width: 25, overflow: 'visible'}}>
                                                <View style={{width: 40, height: 40, borderRadius: 20, marginRight: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'white'}}>
                                                    <Image
                                                        source={{uri: 'https://mystajl.com/mobile/images/user?user='+user.user.userEmail}}
                                                        style={{width: '100%', height: '100%'}}
                                                    />
                                                </View>
                                            </View>
                                        })}
                                        <View style={{width: 25, overflow: 'visible', marginRight: 8.5}}>
                                            <View style={{backgroundColor: 'red', width: 40, height: 40, borderRadius: 20, marginRight: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'white'}}>

                                                <Image
                                                    source={require('../../assets/icons/contributeIconWhite.png')}
                                                    style={{width: '50%', height: '50%'}}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
                                            {post.user.goals[0].contributed.length > 4 ? '+' + post.user.goals[0].contributed.length-4 : null}
                                        </Text>
                                    </View>
                                </View>


                            </View>


                            <View style={{marginTop: 8, width: width}}>
                                {
                                    post.image.comments.slice(0,2).map((comment, key) =>{
                                        return <View key={key} style={{flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 10}}>
                                                {comment.user.userName}
                                            </Text>
                                            <Text style={{fontSize: 14, fontWeight: 'normal',flexWrap: 'wrap', alignItems: 'flex-start', flexShrink: 1}}>
                                                {comment.comment}
                                            </Text>
                                        </View>
                                    })
                                }
                                <View style={{marginLeft: 10, marginBottom: 10}}>
                                    <Text style={{color: 'lightgrey', fontSize: 14}}>
                                        View all comments
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex : 1 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            })}
        </View>;
    };

    render(){
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        scrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >
                <Text style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginTop: Constants.statusBarHeight}}>Feed</Text>
                {this.state.onLoad ? <Loading style={{flex: 1}}/> : null}

                <View>

                    <View>
                        <this.feed/>
                    </View>
                </View>

            </ScrollView>

        );
    }
}
export default withNavigationFocus(Feed);
/* Future updates

<Text style={{fontSize: 16, marginLeft: 10, fontWeight: 'bold'}}>
                        Feed
                    </Text>

<View>
                    <Text style={{fontSize: 16, marginLeft: 10, marginBottom: 5, fontWeight: 'bold'}}>
                        Stories
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <this.stories/>
                    </ScrollView>
                </View>
                <View>
                    <Text style={{fontSize: 16, marginLeft: 10, marginBottom: 5, fontWeight: 'bold'}}>
                        Discover Goals
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <this.discoverGoals/>
                    </ScrollView>
                </View>
                <View>
                    <Text style={{fontSize: 16, marginLeft: 10, marginBottom: 5, fontWeight: 'bold'}}>
                        Popular lifestyles
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <this.popularLifestyles/>
                    </ScrollView>
                </View>
 */
