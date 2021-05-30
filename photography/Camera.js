// @flow
import * as React from "react";const newWidth = height*(3/4);
const widthOffset = -((newWidth-width)/2);
import {StyleSheet, View, ActivityIndicator, TouchableOpacity, Dimensions, Platform, Alert} from "react-native";
import {Camera, ImagePicker, Permissions} from "expo";

/*import {
    IconButton, Icon, StyleGuide, notImplementedYet, withTheme, SafeAreaView,
} from "../../components/components";//type ThemeProps, type NavigationProps
*/
import {EnableCameraPermission} from "../../components/components/photography";

const { width, height } = Dimensions.get("window");

type PermissionStatus = 'undetermined' | 'granted' | 'denied';
//type CameraProps = NavigationProps<> & ThemeProps;
type CameraState = {
    hasCameraPermission: null | boolean,
    type: number,
    flashMode: number,
    showGrid: boolean,
    ratio: string | void
};

class CameraScreen extends React.Component<CameraProps, CameraState> {

    constructor(props) {
        super(props);
    }
    // $FlowFixMe
    camera = React.createRef();

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        showGrid: false,
        ratio: undefined,
        loading: false,
        focusedScreen: true
    };

    setCameraPermission(status: PermissionStatus) {
        this.setState({ hasCameraPermission: status === "granted" });
    }

    toggleFlash = () => {
        const {flashMode} = this.state;
        const {on, off} = Camera.Constants.FlashMode;
        this.setState({ flashMode: flashMode === on ? off : on });
    }

    toggleGrid = () => {
        this.setState({ showGrid: !this.state.showGrid });
    }

    toggleCamera = () => {
        const {type} = this.state;
        const {front, back} = Camera.Constants.Type;
        this.setState({ type: type === back ? front : back });
    }

    goBack = () => {
        this.props.navigation.goBack(null);
    }

    onCameraReady = async () => {

        console.log('k',widthOffset);

        if (Platform.OS === "android") {
            const DESIRED_RATIO = "4:3";
            const ratios = await this.camera.current.getSupportedRatiosAsync();
            const ratio = ratios.find(r => r === DESIRED_RATIO) || ratios[ratios.length - 1];
            this.setState({ ratio: ratio });
            console.log(ratio, ratios,'hej');
        }
    }

    album = async (bol) =>{
        this.setState({
            loading: true
        });
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'All',
            allowsEditing: false,
            aspect: [7, 3],
            quality: 0.5
        });
        this.setState({
            loading: false
        });
        if (!result.cancelled) {
            if(result.type === ('photo' || 'image')){

                //this.photoUpload(result);
                var uri = result.uri.replace('file:/', 'file:///');
                this.props.navigation.navigate('PhotoEdit', {photo: {uri:uri}, from: '.'})
            }else {
                this.videoUpload(result);
            }
        }
    };

    snap = async () => {
        this.setState({
            loading: true
        });
        if (this.camera) {
            console.log('');
            const photo = await this.camera.takePictureAsync({quality:0.5});
            this.setState({
                loading: false
            });
            this.photoUpload(photo);
        }else{
            //console.log('no camera');
        }
    };

    photoUpload = (photo)=>{
        this.props.navigation.navigate('PhotoEdit', {photo: photo, from: '.'})
    };

    videoUpload = async (video)=>{
        if(this.state.onLoad === false) {
            this.setState({
                onLoad: true
            });
        }
        let body = new FormData();
        body.append('goalVideo', {uri:video.uri, name:'goalVideo.mp4', type:'video/mp4'});

        await fetch('https://mystajl.com/mobile/postvideo',{
            method: 'POST',
            body: body,
            credentials: 'include'
        })
            .then((res)=>{
                global.user[0] = res._bodyInit;
                this.setState({
                    onLoad: false
                });

                this.props.navigation.goBack(null);
            })
            .catch((error)=>{
                this.setState({
                    onLoad: false
                });
                console.log(error);
            });
    };

    async componentDidMount(): Promise<void> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setCameraPermission(status);
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    render(): React.Node {
        const {toggleFlash, toggleCamera, goBack, toggleGrid, onCameraReady} = this;
        const {hasCameraPermission, type, flashMode, showGrid, ratio, loading, focusedScreen} = this.state;
        const {theme} = this.props;
        if (hasCameraPermission === null) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            );
        } else if (hasCameraPermission === false) {
            return <EnableCameraPermission />;
        }else if (focusedScreen) {
            return (
                <View style={{flex: 1}}>
                    {loading
                        ?
                        <View pointerEvents="none" style={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            position: 'absolute',
                            zIndex: 999,
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator/>
                        </View>
                        :
                        null
                    }
                    <Camera
                        ref={(ref) => this.camera = ref}
                        style={{position: "absolute",
                            left: widthOffset,
                            right: widthOffset,
                            top: 0,
                            bottom: 0,
                            zIndex: 2}}
                        {...{type, flashMode, onCameraReady, ratio}}
                    >


                        <SafeAreaView style={styles.cameraSafeArea} top>
                            <View style={styles.header}>
                                <IconButton name='cross' onPress={goBack}/>
                                <View>
                                    <IconButton
                                        name="grid"
                                        onPress={toggleGrid}
                                        color={showGrid ? "white" : "rgba(255, 255, 255, 0.5)"}

                                    />
                                    <IconButton
                                        name="flash"
                                        onPress={toggleFlash}
                                        color={flashMode === Camera.Constants.FlashMode.on ? "white" : "rgba(255, 255, 255, 0.5)"}
                                        style={{marginTop: 10}}
                                    />
                                </View>
                            </View>
                            {
                                showGrid && (
                                    <View style={styles.grid}>
                                        <View style={styles.row}>
                                            <View style={styles.cell}/>
                                            <View style={styles.cell}/>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.cell}/>
                                            <View style={styles.cell}/>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.cell}/>
                                            <View style={styles.cell}/>
                                        </View>
                                    </View>
                                )
                            }
                            <View style={styles.footer}>
                                <IconButton name="albums" onPress={() => this.album()}/>
                                <TouchableOpacity onPress={() => this.snap()}>
                                    <View style={styles.snapButton}>
                                        <View
                                            style={[styles.innerSnapButton, {backgroundColor: theme.palette.primary}]}>
                                            <Icon color="white" name="camera"/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <IconButton name="reverse" onPress={toggleCamera}/>
                            </View>
                        </SafeAreaView>

                    </Camera>

                </View>
            );
        }else {
            return <View />;
        }
    }
}

//const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    camera: {
        flex: 1
    },
    cameraSafeArea: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: StyleGuide.palette.transparent,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: StyleGuide.spacing.small,
        marginLeft: -widthOffset,
        marginRight: -widthOffset
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: StyleGuide.spacing.small,
        marginLeft: -widthOffset,
        marginRight: -widthOffset
    },
    snapButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 4,
        borderColor: StyleGuide.palette.white,
        justifyContent: "center",
        alignItems: "center"
    },
    innerSnapButton: {
        width: 52,
        height: 52,
        borderRadius: 25.5,
        justifyContent: "center",
        alignItems: "center"
    },
    grid: {
        borderColor: StyleGuide.palette.darkGray,
        borderWidth: 1,
        marginLeft: StyleGuide.spacing.small-widthOffset,
        width: width - (StyleGuide.spacing.small * 2),
        height: width - (StyleGuide.spacing.small * 2)
    },
    row: {
        height: (width - (StyleGuide.spacing.small * 2)) / 3,
        borderColor: StyleGuide.palette.darkGray,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    cell: {
        width: (width - (StyleGuide.spacing.small * 2)) / 3,
        height: (width - (StyleGuide.spacing.small * 2)) / 3,
        borderColor: StyleGuide.palette.darkGray,
        borderRightWidth: 1
    }
});

export default withTheme(CameraScreen);
