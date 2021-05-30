// @flow
import moment from "moment/moment";
import * as React from "react";
import {
    StyleSheet, View, Platform, StatusBar, Dimensions, ActivityIndicator, Animated, TouchableOpacity, Text,CameraRoll, Image
} from "react-native";

import {NavigationBar, BlurView, IconButton, Footer, type NavigationProps} from "../../components/components";

import {Filters, Filter, PhotoActionSheet, Rotation, Crop, type FilterName, Adjust} from "../../components/components/photography";
import type {Photo} from "../../components/components/photography/Model";

import ImageRotate from 'react-native-image-rotate';
import { takeSnapshotAsync } from 'expo';

import {Surface} from "gl-react-expo";
import {ContrastSaturationBrightness} from "../components/photography/gl-filters";

type PhotoScreenProps = NavigationProps<{ photo: Photo, from: string }>;
type PhotoScreenState = {
    filter: FilterName,
    areFiltersReady: boolean,
    filterAnimation: Animated.Value,
    rotation: Animated.Value,
    saturation: number,
    brightness: number,
    contrast: number,
    possi: mixed,
    zoom: number

};

export default class PhotoScreen extends React.Component<PhotoScreenProps, PhotoScreenState> {

    // TODO: createRef()
    filters: PhotoActionSheet;
    crop: PhotoActionSheet;

    state: $Shape<PhotoScreenState> = {
        areFiltersReady: false,
        filterAnimation: new Animated.Value(0),
        rotation: new Animated.Value(width / 2),
        saturation: 1,
        brightness:1,
        contrast: 1,
        possi: [0.5,0.5],
        zoom: 1

    };

    setFiltersAsReady = () => this.setState({ areFiltersReady: true });

    setFiltersRef = (filters: ?PhotoActionSheet) => {
        if (filters) {
            this.filters = filters;
        }
    };

    setAdjustRef = (adjust: ?PhotoActionSheet) => {
        if (adjust) {
            this.adjust = adjust;
        }
    };

    setCropRef = (crop: ?PhotoActionSheet) => {
        console.log('filter6');
        if (crop) {
            this.crop = crop;
        }
    };

    toggleFilters = () => {
        const {filterAnimation} = this.state;
        Animated.timing(
            filterAnimation,
            {
                toValue: 1,
                duration,
                useNativeDriver
            }
        ).start();
        this.filters.toggle();
    };

    toggleAdjust = () => {
        const {filterAnimation} = this.state;
        Animated.timing(
            filterAnimation,
            {
                toValue: 1,
                duration,
                useNativeDriver
            }
        ).start();
        this.adjust.toggle();
    };

    toggleCrop = () => {
        const {filterAnimation} = this.state;
        Animated.timing(
            filterAnimation,
            {
                toValue: 1,
                duration,
                useNativeDriver
            }
        ).start();
        this.crop.toggle();
    };

    onCloseActionSheet = () => {
        const {filterAnimation} = this.state;
        Animated.timing(
            filterAnimation,
            {
                toValue: 0,
                duration,
                useNativeDriver
            }
        ).start();
    };

    switchFilter = (filter: FilterName, sat: number, bright:number,cont:number) => {

if(cont) {
    this.setState({filter, saturation: sat, brightness: bright, contrast: cont})
}else{
    this.setState({filter})

}
    };

    position=(pos)=>{
      this.setState({
          possi: [
              0.1,// (pos.top + pos.bottom) / (width * 0.65 * 1.65),
              0.1//(pos.left + pos.right) / (width * 0.65)
          ],
          zoom: 5//(width*0.65*1.65)/(pos.top+pos.bottom+0.0001) >(width*0.65)/(pos.left+pos.right+0.0001) ? (width*0.65*1.65)/(pos.top+pos.bottom): (width*0.65)/(pos.left+pos.right)
      });
    };


    saveImage = async (rotate) =>{
        const result = await this.refs.hej.refs.surface.glView.capture();
        let body = new FormData();
        body.append('goalImg', {uri:result.uri, name:'goalImg.jpg', type:'image/jpg'});

        fetch('https://mystajl.com/mobile/postimage',{
            method: 'POST',
            body: body,
            credentials: 'include'
        })
            .then((res)=>{
                //console.log(JSON.parse(res._bodyInit).goals[0].images.length);
                global.user[0] = res._bodyInit;

                this.props.navigation.navigate('Profile', {user: res._bodyInit});
            })
            .catch((error)=>{

                Alert.alert(
                    'Camera error',
                    error,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });

    };


    render(): React.Node {
        const {
            toggleFilters, toggleCrop, toggleAdjust, switchFilter, setFiltersAsReady, onCloseActionSheet,position
        } = this;
        const {navigation} = this.props;
        const {areFiltersReady, rotation,contrast,brightness, saturation, filterAnimation, filter: name,possi,zoom} = this.state;
        const {photo, from} = navigation.state.params;
        const date = moment(photo.created_at).format("DD MMMM YYYY · HH:mm");
        const title = photo.location ? photo.location.name : "";
        const subtitle = date;
        const opacity = filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const intensity = filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });
        const rotate = rotation.interpolate({
            inputRange: [0, viewport],
            outputRange: ["-25deg", "25deg"]
        });
        return (
            <View style={styles.container}>
                <StatusBar hidden />


                <Animated.View style={[{transform: [{ rotate }] }, styles.image]}>

                    <Filter
                        style={StyleSheet.absoluteFill}
                        uri={photo.uri}
                        onDraw={setFiltersAsReady}
                        ref={'hej'}
                        {...{name, rotate,saturation, brightness, contrast,possi,zoom}}
                    />

                </Animated.View>



                <BlurView style={StyleSheet.absoluteFill} {...{intensity}} />
                {
                    <Animated.View style={{ opacity, ...StyleSheet.absoluteFillObject, transform: [{ rotate }] }}>
                        <Crop style={styles.filter}{...{position}}>
                            <Filter
                                style={StyleSheet.absoluteFill}
                                uri={photo.uri}
                                onDraw={setFiltersAsReady}

                                {...{name, rotate, saturation,brightness,contrast}}
                            />
                        </Crop>

                    </Animated.View>
                }
                {
                    !areFiltersReady && <View />
                }
                {
                    areFiltersReady && (
                        <NavigationBar
                            type="transparent"
                            back={from}
                            withGradient
                            largeTitle
                            {...{navigation, title, subtitle}}
                        />
                    )
                }
                {
                    <Footer>
                        {
                            areFiltersReady && <IconButton name="filters" onPress={toggleFilters} />
                        }
                        {
                            areFiltersReady && <IconButton name="cross" onPress={toggleAdjust}/>
                        }
                        {
                            areFiltersReady && <IconButton name="crop" onPress={toggleCrop} />
                        }
                        {
                            !areFiltersReady && <ActivityIndicator color="white" />
                        }
                    </Footer>
                }
                <PhotoActionSheet ref={this.setFiltersRef} title="Filters" onClose={onCloseActionSheet}>
                    <Filters {...{uri: photo.uri, switchFilter}} />
                </PhotoActionSheet>
                <PhotoActionSheet ref={this.setAdjustRef} title="Adjust" onClose={onCloseActionSheet}>
                    <Adjust {...{rotation,saturation,brightness, contrast, switchFilter}}/>
                </PhotoActionSheet>
                <PhotoActionSheet ref={this.setCropRef} title="Edit" onClose={onCloseActionSheet}>
                    <Rotation {...{rotation}} />
                </PhotoActionSheet>
                <TouchableOpacity
                    style={{position: 'absolute', width: 100, height: 40, top: 35, right: 10}}
                    onPress={()=>this.saveImage(rotate)}
                >
                    <Text style={{color: 'white', textAlign: 'right', fontWeight: 'bold'}}>Save</Text>

                </TouchableOpacity>
            </View>

        );
    }
}

const duration = 300;
const useNativeDriver = Platform.OS === "android";
const {width: viewport} = Dimensions.get("window");
const width = viewport + 88;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    image: {
        ...StyleSheet.absoluteFillObject
    },
    filter: {
        position: "absolute",
        top: 50,
        left: (viewport - (width * 0.63)) / 2,
        width: width * 0.63,
        height: width * 0.63 * 1.65
    }
});
//<Image preview={photo.urls.preview} uri={photo.urls.regular} style={styles.image} />