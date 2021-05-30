import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity,Image} from 'react-native';
import {Video} from "expo-av";
const { width, height } = Dimensions.get("window");

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            col1: [],
            col2: [],
            col3: [],
            check: false,
        };
        if(this.props.screenProps.screenProps && this.props.screenProps.screenProps.goals[0] && this.props.screenProps.screenProps.goals[0].images) {
            this.state.check = false;
            this.divideImages(this.props.screenProps.screenProps.goals[0].images);
        }else if(this.props.images){
            this.state.check = true;
            this.divideImages(this.props.images);
        }
    }

    componentDidMount() {
    }

    onPressFocusImage = (key) => {
       // console.log(this.props.screenProps);
        if(this.state.check){
            this.props.screenProps.navigation.navigate('Post',{
                image: this.props.images[key],
                user: this.props.user
            })
        }else {
            this.props.screenProps.screenProps.navigation.navigation.navigate('Post', {
                image: this.props.screenProps.screenProps.goals[0].images[key],
                user: this.props.screenProps.screenProps.user
            });
        }
    };

    divideImages = (imageArr) => {
        for(let i = 0; i < imageArr.length; i++){
            if(imageArr[i].image) {
                let firstChar = imageArr[i].image.split("\\")[2].charAt(4);
                if (i % 3 === 0) {
                    this.state.col1 = [...this.state.col1,
                        (
                            <TouchableOpacity style={styles.imageSmal} key={i} onPress={() => this.onPressFocusImage(i)}>
                                {firstChar === 'I' ?
                                    <Image

                                           style={styles.imageSmal}
                                           resizeMode='cover'
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image }}

                                    />
                                    :
                                    <Video key={i}
                                           style={styles.imageSmal}
                                           rate={1.0}
                                           volume={0}
                                           isMuted={false}
                                           shouldPlay={true}
                                           isLooping={false}
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image }}

                                    />
                                }
                            </TouchableOpacity>
                        )];
                }
                if (i % 3 === 1) {
                    this.state.col2 = [...this.state.col2,
                        (
                            <TouchableOpacity style={styles.imageSmal} key={i} onPress={() => this.onPressFocusImage(i)}>
                                {firstChar === 'I' ?
                                    <Image
                                           style={styles.imageSmal}
                                           resizeMode='cover'
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image}}
                                    />
                                    :
                                    <Video key={i}
                                           style={styles.imageSmal}
                                           rate={1.0}
                                           volume={0}
                                           isMuted={false}
                                           resizeMode="cover"
                                           shouldPlay
                                           isLooping
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image}}

                                    />
                                }
                            </TouchableOpacity>
                        )];
                }
                if (i % 3 === 2) {
                    this.state.col3 = [...this.state.col3,
                        (
                            <TouchableOpacity style={styles.imageSmal} key={i} onPress={() => this.onPressFocusImage(i)}>
                                {firstChar === 'I' ?
                                    <Image
                                           style={styles.imageSmal}
                                           resizeMode='cover'
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image}}
                                    />
                                    :
                                    <Video key={i}
                                           style={styles.imageSmal}
                                           rate={1.0}
                                           volume={0}
                                           isMuted={false}
                                           resizeMode="cover"
                                           shouldPlay
                                           isLooping
                                           source={{uri: 'https://mystajl.com/mobile/images/profile/' + imageArr[i].image}}

                                    />
                                }
                            </TouchableOpacity>
                        )];
                }
            }
        }
    };

    render() {
        return (
            <View style={{width: width, flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            {this.state.col1}
                        </View>
                        <View style={styles.column}>
                            {this.state.col2}
                        </View>
                        <View style={styles.column}>
                            {this.state.col3}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    column:{
        flex: 0.329,
        flexDirection: 'column',

    },
    imageSmal:{
        width: '100%',
        height: (width/100)*33,
        marginBottom: 2,
        backgroundColor: 'grey'
    }
});
