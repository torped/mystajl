// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, type NavigationProps} from "../../components/components";

import PhotograhyAPI from "./api";
import {PhotoThumbnail} from "../../components/components/photography";
import type {Photo} from "../../components/components/photography/Model";

export default class Photos extends React.Component<NavigationProps<>> {

    componentDidMount(){
        console.log('photos');
    }

    renderItem = (photo: Photo): React.Node => {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    onPress = async (): Promise<void> => {
        const {navigation} = this.props;
        //console.log('tup');
        navigation.navigate("PhotoEdit");
    }

    imageArray = async (data) =>{
        //console.log(PhotograhyAPI.photos);
        var arr = [];
        await data.map((image, index)=>{
            arr.push(
                {
                    uri:photo.node.image.uri,
                    id: index,
                    album: "Zürich 2017",
                    location: {
                        title: "Paralia Gerakas, Greece",
                        name: "Paralia Gerakas",
                        city: null,
                        country: "Greece",
                        position: {
                            latitude: 37.7066757,
                            longitude: 20.9873996
                        }
                    },
                    created_at: "2015-09-29T07:49:08-04:00",
                    urls: {
                        full: photo.node.image.uri,
                        regular: photo.node.image.uri,
                        small: photo.node.image.uri,
                        preview: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAgEAACAQQBBQAAAAAAAAAAAAABAgQAAwURBgchMkHS/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAAv/aAAwDAQACEQMRAD8AgB1iyL8dOOtxsfbZm2XWOSydvRJIqSbl04sSZ8jZO/C380pTG0jQb//Z"
                    }
                }
            )
        });
        //console.log(arr);

        return arr;
    };

render(): React.Node {
    const {renderItem, onPress} = this;
    const {navigation} = this.props;
    var arr = [];
    var images = this.props.navigation.state.params.photos.edges;
    //console.log(images);
    for(var i = 0; i< images.length; i++){
        arr.push(
            {
                    uri:images[i].node.image.uri,
                    id: i,
                    album: "Zürich 2017",
                    location: {
                        title: "Paralia Gerakas, Greece",
                        name: "Paralia Gerakas",
                        city: null,
                        country: "Greece",
                        position: {
                            latitude: 37.7066757,
                            longitude: 20.9873996
                        }
                    },
                    created_at: "2015-09-29T07:49:08-04:00",
                    urls: {
                        full: images[i].node.image.uri,
                        regular: images[i].node.image.uri,
                        small: images[i].node.image.uri,
                        preview: images[i].node.image.uri//"data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAgEAACAQQBBQAAAAAAAAAAAAABAgQAAwURBgchMkHS/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAAv/aAAwDAQACEQMRAD8AgB1iyL8dOOtxsfbZm2XWOSydvRJIqSbl04sSZ8jZO/C380pTG0jQb//Z"
                    }
                }
        );
    }
    //console.log(arr[0]);
    const data =  arr;//this.imageArray(this.props.navigation.state.params.photos);//PhotograhyAPI.photos;
    const title = "Library";
    const rightAction = {
        icon: "sign-out",
        onPress
    };
    return (
        <Feed
            style={styles.content}
            numColumns={3}
            {...{data, renderItem, title, navigation, rightAction}}
        />
    );
}
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
