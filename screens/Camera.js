import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, Alert, CameraRoll} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Loading from '../common/Loading';

const { width, height } = Dimensions.get("window");

export default class CameraView extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        hasCameraPermission: null,
        type: this.props.cameraBoolean ? Camera.Constants.Type.back: Camera.Constants.Type.front,
        photo: null,
        goal: null,
        goals: null,
        onLoad: false
    };

componentDidMount() {
    console.log('Camera');
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    //if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      this.setState({ hasCameraPermission: status === 'granted' });
    //}
  };
    /*async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }*/

    snap = async () => {

        if (this.camera) {
            console.log('');
            this.camera.takePictureAsync({quality: 0.5})
                .then((photo)=>{
                    this.photoUpload(photo);
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

        }
    };

    photoUpload = (photo)=>{
       // console.log(photo);
        this.props.navigation.navigate('PhotoEdit', {photo: photo, from: '.'})

        /*if(this.state.onLoad === false) {
            this.setState({
                onLoad: true
            });
        }
        let body = new FormData();
        body.append('goalImg', {uri:photo.uri, name:'goalImg.jpg', type:'image/jpg'});

        fetch('https://mystajl.com/mobile/postimage',{
            method: 'POST',
            body: body,
            credentials: 'include'
        })
            .then((res)=>{
                //console.log(JSON.parse(res._bodyInit).goals[0].images.length);
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
                Alert.alert(
                    'Camera error',
                    error,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });*/
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

    onPressAddPic = async (bol) => {
/*
        CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       //this.setState({ photos: r.edges });
         //console.log(r);
         this.props.navigation.navigate('PhotoAlbum', {photos: r})
     })
     .catch((err) => {
        //Error Loading Images
     });*/


        /*this.setState({
            onLoad: true
        });
*/

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'All',
            allowsEditing: false,
            aspect: [7, 3],
            quality: 0.5
        });
        if (!result.cancelled) {
            console.log(result);
            if(result.type === 'photo' || 'image'){
                //this.photoUpload(result);
                var uri = result.uri.replace('file:/', 'file:///');
                this.props.navigation.navigate('PhotoEdit', {photo: {uri:uri}, from: '.'})
            }else {
                this.videoUpload(result);
            }
        }
    };

    render() {
        const maxWidth = Dimensions.get('window').width;
        const maxHeight = Dimensions.get('window').height;
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if(this.state.onLoad) {
            return (
                <Loading style={{width: width, height: height}}/>
            )
        }else {
            return (
                <View style={{height: maxHeight}}>
                    <View style={{ height: maxHeight*0.87 }}>

                        <Camera style={{ flex: 1 }} type={this.props.cameraBoolean ? Camera.Constants.Type.back: Camera.Constants.Type.front} ref={ref => { this.camera = ref; }}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>

                            </View>
                        </Camera>
                        <View style={{position: 'absolute', top: 0, left: 0, width: maxWidth, height: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'rgba(255,255,255,0.3)', width: 1, height: '100%'}}/>
                            <View style={{backgroundColor: 'rgba(255,255,255,0.3)', width: 1, height: '100%'}}/>
                        </View>
                        <View style={{position: 'absolute', top: 0, left: 0, width: maxWidth, height: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', height: 1}}/>
                            <View style={{backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', height: 1}}/>
                        </View>

                    </View>
                    <View style={{height: maxHeight*0.13, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={{borderRadius: 100, borderWidth: 1, borderColor: 'lightgrey'}}
                            onPress={()=>this.snap()}
                        >
                            <View style={{width: 50, height: 50, backgroundColor: 'lightgrey', borderRadius: 100, borderWidth: 1, borderColor: 'black'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{position: 'absolute', left: 40, width: 30, height: 30}}
                            onPress={()=> this.onPressAddPic()}
                        >
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={require('../../assets/icons/icons8-photo-gallery-filled-50.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}
