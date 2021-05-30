import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    PanResponder,
    Animated,ScrollView
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import constants from "../../models/constants";

const { width, height } = Dimensions.get("window");

export default class Picture extends Component {

    constructor (props) {
        super(props);
        this.state = {
            image: null,
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        };

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state

                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
                Animated.spring(
                    this.state.scale,
                    {toValue: 1.1, friction: 3}
                ).start();
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove:(e, gestureState)=> {

                Animated.event([
                    null, {dx: this.state.pan.x, dy: this.state.pan.y},
                ])(e, gestureState)

            },

            onPanResponderRelease: (e, {vx, vy}) => {
                // Flatten the offset to avoid erratic behavior
                this.state.pan.flattenOffset();
                Animated.spring(
                    this.state.scale,
                    { toValue: 1, friction: 3 }
                ).start();
            }
        });
    }

    onPressAddPic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        });
        if (!result.cancelled) {
            this.setState({default: true, image: result.uri });
        }
    };

    render () {

        // Destructure the value of pan from the state
        let { pan, scale } = this.state;

        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = '0deg';

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                <View style={{width: '80%', alignItems: 'center', minHeight: height, justifyContent: 'flex-end'}}>
                    <View style={{flex: 1, marginTop: 50}}>
                        <Text style={{color: 'black', fontWeight: 'normal', textAlign: 'center', fontSize: 20}}>
                            Choose profile picture
                        </Text>

                    </View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View>
                        <TouchableOpacity onPress={()=>this.onPressAddPic()} style={{overflow: 'hidden',backgroundColor: 'lightgrey', borderRadius: 300, width: width*0.6, height: width*0.6}}
                                          {...this._panResponder.panHandlers}
                                          overflow={'hidden'}
                        >
                            {this.state.image ?
                                <Animated.Image
                                    source={{uri:this.state.image}}
                                    style={[{width:'100%', height:'100%'}]}
                                />:null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: height/11, height: height/11, borderRadius: 100, backgroundColor: constants.blue, position: 'absolute', bottom: -4, end: 0, alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=>this.onPressAddPic()}
                        >
                            <Text style={{paddingBottom: 2, fontSize: 40, fontWeight: 'bold', color: 'white'}}>
                                +
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>


                    <View
                        style={{marginBottom: 15, justifyContent: 'center', alignItems: 'center', width: '100%'}}
                    >
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity
                                style={{marginBottom: 25, backgroundColor: constants.blue, borderRadius: 5, width: '45%', height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>this.props.navigation.goBack(null)}
                            >
                                <View>
                                    <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                        BACK
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginBottom: 25, backgroundColor: constants.blue, borderRadius: 5, width: '45%', height: width*0.8*0.2, alignItems: 'center', justifyContent: 'center'}}
                                onPress={()=>{
                                    if(this.state.image) {
                                        this.props.screenProps.user.image = this.state.image;
                                    }
                                    this.props.navigation.navigate('FirstGoalForm')
                                }}
                            >
                                <View>
                                    <Text style={{color: constants.white, fontSize: 16, fontWeight: 'bold'}}>
                                        NEXT
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{width: 12, height: 12, borderWidth: 2, borderColor: constants.blue, borderRadius: 100, backgroundColor: constants.blue}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: constants.blue, backgroundColor: constants.blue, borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                            <View style={{width: 12, height: 12, borderWidth: 2, marginLeft: 10, borderColor: 'black', borderRadius: 100}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

