import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, Image, TouchableOpacity, Text, Alert} from 'react-native';
import ImageComments from './ImagesComments';
import ProgressCircle from 'react-native-progress-circle';
import {msToTimeAgo} from '../../models/utilities';
import {Video} from 'expo-av';
import fetchTimeout from "fetch-timeout";

const { width, height } = Dimensions.get("window");

export default class BigImages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentField:[],
            user: this.props.screenProps.screenProps.user,
            goal: this.props.screenProps.screenProps.goals[0]
        };
    }

    componentDidMount() {
        //console.log(this.props.screenProps.screenProps.goals[0].images);
    }

    onPressFocusImage = (item) => {
        //this.props.newPage(this.props.screens.post)
        //console.log(JSON.stringify(this.props.screenProps.screenProps));

        this.props.screenProps.screenProps.navigation.navigation.navigate('Post', {
            image: item,
            user: this.props.screenProps.screenProps.user
        });
    };

    onPressLikes = (post, head) => {
        let params = {
            likeEmail: JSON.parse(global.user[0]).email,
            likeUser: JSON.parse(global.user[0]).name,
            imageId: post._id,

        };

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

                fetch('https://mystajl.com/mobile/user?email='+this.state.user.email, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    cache: 'no-cache',
                })
                    .then(response => {
                        if(response.ok) {

                            global.user[2]= response._bodyInit;
                            let user = JSON.parse(response._bodyInit);
                            this.setState({
                                goal: user.goals[0],
                                user: user
                            });
                           // console.log(user.goals[0].images[0].likes);
                            //this.props.navigation.navigate('SearchVisitProfile', {user: response._bodyInit});
                        }else{
                            //this.setState({onLoad: false});
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
            })
            .catch((error) =>  console.log(error))

    };

    onPressComments = (key) => {
        //this.state.commentField[key] = !this.state.commentField[key];
        //this.forceUpdate();
    };

    onPressDonate = () => {
        //this.props.newPage(Donate);
    };



    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.state.goal && this.state.goal.images ? this.state.goal.images.map((item, key) =>
                        (
                            <View key={key} style={{backgroundColor: 'white', width: '100%', borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: 'lightgrey', borderBottomColor: 'lightgrey'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View >
                                            <ProgressCircle
                                                radius={22}
                                                percent={25}
                                                borderWidth={1}
                                                color={'#e94811'}
                                                shadowColor={'grey'}
                                                bgColor={'white'}
                                            >
                                                <Image
                                                    source={{uri:'https://mystajl.com/mobile/images/profile/'+this.state.user.profileImg}}
                                                    style={{width:'110%', height: '110%'}}
                                                />
                                            </ProgressCircle>
                                        </View>
                                        <View style={{marginLeft: 5}}>
                                            <Text>
                                                {this.props.screenProps.screenProps.user.name}
                                            </Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Image
                                                    source={require('../../assets/icons/wallClockGrey.png')}
                                                    style={{width: 10, height: 10, marginRight: 2, marginBottom: 3}}
                                                />
                                                <Text style={{color: 'lightgrey', fontSize: 10, marginBottom: 3}}>
                                                    {msToTimeAgo((Date.now()-Date.parse(item.created_on)))}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Image
                                        source={require('../../assets/icons/threeDotsGreyLine.png')}
                                        style={{width: 15, height: 15, alignSelf: 'center', marginRight: 5}}
                                    />
                                </View>
                                <TouchableOpacity onPress={()=>this.onPressFocusImage(item)}>
                                    {item.image && item.image.split("\\")[2].charAt(4)==='I'?
                                        <Image style={styles.image}
                                               source={{uri: 'https://mystajl.com/mobile/images/profile/' + item.image}}/>
                                        :
                                        <Video style={styles.image}
                                               source={{uri: 'https://mystajl.com/mobile/images/profile/' + item.image}}
                                                rate={1.0}
                                    volume={0.5}
                                    isMuted={false}

                                    shouldPlay={true}
                                    isLooping={false}
                                        />
                                    }
                                </TouchableOpacity>
                                <View style = {{flexDirection: 'row', alignSelf: 'flex-end',margin: 5, marginRight: 10}}>
                                    <TouchableOpacity
                                        style={{flexDirection: 'row', margin:5, alignItems: 'center'}}
                                        onPress={()=>this.onPressLikes(item, item.likes.some((element)=> {return element.userEmail === JSON.parse(global.user[0]).email})? 'DELETE':'POST')}
                                    >
                                        <Image
                                            style={{height: 15, width: 15, marginRight: 3}}
                                            source={item.likes.some((element)=> {return element.userEmail === JSON.parse(global.user[0]).email})
                                                ?
                                                require('../../assets/icons/like.png')
                                                :
                                                require('../../assets/icons/notLike.png')}
                                            resizeMode='contain'
                                        />
                                        <Text>{item.likes.length}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection: 'row', margin: 5, alignItems: 'center'}} onPress={()=>this.onPressComments(key)}>
                                        <Image style={{height: 15, width: 15, marginRight: 3}} source={require('../../assets/icons/commentIconGray.png')} resizeMode='contain'/>
                                        <Text>{item.comments.length}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginBottom: 10, marginLeft: 15, marginRight: 15, borderTopWidth: 1, borderTopColor: 'lightgrey'}}>
                                    <Text numberOfLines={3} style={{color: 'lightgrey', fontSize: 12}}>
                                        {item.description}
                                    </Text>
                                </View>
                                {
                                    this.state.commentField[key] ?
                                        <ImageComments objectToRender={this.state.object} comments={this.props.images[key].comments} imageNumber={key}/>
                                        :
                                        null
                                }
                            </View>
                        )
                    ):null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        width: width
    },
    image:{
        width: '100%',
        height: (width/16) * 12,
        backgroundColor: 'grey'
    },
    big:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 5
    },
    commentsContainer:{
        height: width/10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    likes:{
        width: width/15,
        height: width/15,

    },
    donate:{
        width: width/15,
        height: width/15,

    },
    comments:{
        width: width/15,
        height: width/15
    }
});
