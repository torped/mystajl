import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, ImageBackground, ScrollView} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Constants from "../../models/constants";
import SmalImages from './SmalImages';

const { width, height } = Dimensions.get("window");

export default class GoalBig extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            //goals: this.props.screenProps.goals,
            //user : this.props.screenProps.user,
            index: this.props.navigation.state.params.index,
            user: this.props.navigation.state.params.user,
            goal: this.props.navigation.state.params.user.goals[this.props.navigation.state.params.index],
            onLoad: false
        };
        //console.log('hejhej', this.state.goal);
    }


    render() {
        return (
            <ScrollView containerStyle={{flexGrow: 1}}>
                <ImageBackground
                    style={{width: width, height: width*1.2}}
                    source={{uri: 'https://mystajl.com/mobile/images/profile/' + this.state.user.goals[this.state.index].goalImg}}
                >
                    <View style={{margin: 10, backgroundColor: Constants.blue, width: '20%', height: width*0.22*0.33, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>
                            75%
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{flex: 1, margin: 10}}>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../../assets/icons/wallClockGrey.png')}
                                style={{width: 32, height: 32}}
                            />
                            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 16}}>
                                {this.state.goal.name}
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/icons/threeDotsBlack.png')}
                            style={{width: 24, height: 24}}
                        />
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text>
                            {this.state.goal.description}
                        </Text>
                    </View>
                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <Image
                            source={require('../../assets/icons/wallClockGrey.png')}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{marginLeft: 5}}>
                            Batcave, Arkhem City
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>

                        {this.state.goal.contributed.slice(0,4).map((user,index) => {
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
                            {this.state.goal.likes.length + ' followers'}
                        </Text>
                    </View>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, borderTopWidth: 2, borderTopColor: 'lightgrey'}}>
                        Posts
                    </Text>
                </View>
                <SmalImages
                    style={{flex: 1}}
                    images={this.state.goal.images}
                    user={this.state.user}
                    screenProps={this.props}
                />
            </ScrollView>
        );
    }
}
