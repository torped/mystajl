import { DrawerItems, SafeAreaView } from 'react-navigation';
import {View, ScrollView, Animated} from "react-native";
import React, { Component } from 'react';


export default class Drawer extends Component
{
    constructor (props){
        super(props);

    }

    render()
    {
        const translateX = this.props.drawerOpenProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
        return (
            <Animated.View style={{ transform: [{ translateX }, {translateX}] }}>
                <ScrollView>
    <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...this.props} />
    </SafeAreaView>
  </ScrollView>
            </Animated.View>
        );
    }
}