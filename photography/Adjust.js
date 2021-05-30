// @flow
import * as React from "react";
import {StyleSheet, View, ScrollView, Animated, Dimensions, InteractionManager,Slider} from "react-native";

import {LinearGradient} from "expo";
import Filter, {type FilterName} from "./Filter";
import {StyleGuide, withTheme, type ThemeProps} from "../index";
//import Slider from '@react-native-community/slider';

import Degrees from "./Degrees";

type AdjustProps = ThemeProps & {
    brightness: Animated.Value,
    contrast: Animated.Value,
    saturation: Animated.Value,
    rotation: Animated.Value,
    switchFilter: FilterName => mixed
};

class Adjust extends React.Component<AdjustProps> {

    // $FlowFixMe

state = {
       sat:1,
        bright: 1,
        cont: 1
    };

    render(): React.Node {
        const {theme, saturation, contrast, brightness, rotation} = this.props;
        return (
            <View style={styles.root}>

                <View style={styles.scroll}>
<Slider
    style={{width: width/2, height: 40}}
    minimumValue={0}
    maximumValue={2}
    minimumTrackTintColor="blue"
    maximumTrackTintColor="red"
    value={saturation}
    onValueChange={(w)=>this.props.switchFilter('manualAdjust', w, brightness, contrast)}
  />
  <Slider
    style={{width: width/2, height: 40}}
    minimumValue={0}
    maximumValue={2}
    minimumTrackTintColor="blue"
    maximumTrackTintColor="red"
    value={contrast}
    onValueChange={(w)=>{
        this.props.switchFilter('manualAdjust',saturation, brightness,w);

    }}
  />
  <Slider
    style={{width: width/2, height: 40}}
    minimumValue={0}
    maximumValue={2}
    minimumTrackTintColor="blue"
    maximumTrackTintColor="red"
    value={brightness}
    onValueChange={(w)=>this.props.switchFilter('manualAdjust',saturation,w, contrast)}
  />

                </View>
            </View>
        );
    }
}

const repeat = (length: number): number[] => {
    const numbers: number[] = [];
    for (let i = 0; i < length; i += 1) {
        numbers.push(i);
    }
    return numbers;
};

const viewport = Dimensions.get("window").width;
const width = viewport * 2;
const ticks = 50;
const tickThickness = 2;
const padding = (width - (ticks * tickThickness)) / (ticks + 1);
const styles = StyleSheet.create({
    root: {
        marginVertical: StyleGuide.spacing.small
    },
    scroll: {
        marginTop: StyleGuide.spacing.tiny
    },
    content: {
        width,
        marginBottom: 15,
    },
    tick: {
        width: padding,
        backgroundColor: StyleGuide.palette.white,
        marginHorizontal: 1,
        height: 15
    }
});

export default withTheme(Adjust);
