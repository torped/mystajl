import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, ImageBackground} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Constants from "../../models/constants";

const { width, height } = Dimensions.get("window");

export default class Goal extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            goals: this.props.screenProps.goals,
            user : this.props.screenProps.user,
            onLoad: false
        };
        //console.log('hej', this.props.screenProps.goals);
    }

    onPressGoal = (number) =>{
        this.props.navigation.screenProps.navigation.navigation.navigate('GoalBig', {index: number, user: this.state.user});
    };

    render() {
        return (
            <View style={{width: width, backgroundColor: Constants.grey}}>

                {this.state.goals.map((goal, key) =>
                    (
                        <TouchableHighlight style={{marginTop: 5, elevation: 1, backgroundColor: 'white'}} key={key}  onPress={()=>this.onPressGoal(key)}>
                            <View style={{marginBottom: 5}}>
                                <ImageBackground
                                    source={{uri: 'https://mystajl.com/mobile/images/profile/'+goal.goalImg}}
                                    style={{width: width, height: width*0.60}}
                                    resizeMode={'cover'}
                                >
                                    <View style={{margin: 10, backgroundColor: Constants.blue, width: '20%', height: width*0.22*0.33, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>
                                            25%
                                        </Text>
                                    </View>
                                </ImageBackground>
                                <View style={{width: width, justifyContent: 'space-between', padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image
                                            source={require('../../assets/icons/wallClockGrey.png')}
                                            style={{width: 32, height: 32}}
                                        />
                                        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
                                            {goal.name}
                                        </Text>
                                    </View>
                                    <Image
                                        source={require('../../assets/icons/threeDotsBlack.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <View style={{marginLeft: 10}}>
                                    <Text style={{fontSize: 14}}>
                                        {goal.description}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', margin: 10}}>
                                    <Image
                                        source={require('../../assets/icons/wallClockGrey.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                    <Text style={{fontSize: 14, marginLeft: 10}}>
                                        Batcave, Arkham city
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>

                                    {goal.contributed.slice(0,4).map((user,index) => {
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
                                    <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 15}}>
                                        {goal.likes.length + ' followers'}
                                    </Text>
                                </View>
                            </View>

                        </TouchableHighlight>
                    ))}

            </View>
        );
    }
}

const styles = StyleSheet.create({

});