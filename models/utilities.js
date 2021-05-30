import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Animated,
    AsyncStorage,
    Switch
} from 'react-native';



export const msToTimeAgo=(duration)=>{

    //{msToTimeAgo((Date.now()-Date.parse(x.created_on)))}

    var seconds = parseInt(duration) / 1000;
    if(seconds<60){
        return  Math.floor(seconds) + ' sec ago';
    }
    var min = seconds / 60;
    if(min<60){
        return  Math.floor(min) + ' min ago';
    }
    var hour = min / 60;
    if(hour<24){
        return  Math.floor(hour) + (Math.floor(hour) > 1 ? ' hours ago': ' hour ago');
    }
    var days = hour / 24;
    if(days < 30){
        return  Math.floor(days) + (Math.floor(days) > 1 ? ' days ago' : ' day ago');
    }
    var month = days/30;
    if(month<12){
        return  Math.floor(month) + (Math.floor(month) > 1 ? ' months ago' : ' month ago');
    }
    var year = month/12;
    return  Math.floor(year) + (Math.floor(year) > 1 ? ' years ago' : ' year ago');
};


export const Request =async (url, method, params)=>{
    let body = new FormData();
    for(var key in params){
        if( params.hasOwnProperty(key) ) {
            body.append(key,params[key]);
        }
    }

    let result = await fetch('https://mystajl.com/mobile/'+url,
        {
            method: method,
            body : JSON.stringify(params),
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }} );
    if(result.ok){
        return await result.json();
    }
    Alert.alert(
        'Doom of Error',
        result.status +', ' + result.statusText + ', ' + result.errMsg,
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
    );
    return false;
};
import React from 'react';
export const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);
    return { response, error };
};
/*
module.exports.deleteServer = async function(params, url){
    let body = new FormData();
    for(var key in params){
        if( params.hasOwnProperty(key) ) {
            body.append(key,params[key]);
        }
    }

    fetch('https://mystajl.com/mobile/'+url,
        {
            method: 'DELETE',
            body : JSON.stringify(params),
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }} )

        .then((res) => {return res})
        .catch((error) =>  console.log(error))
        .done()
};

*//*
module.exports.getServer =(query, url)=>{
    return new Promise((res, err) =>{
        fetch('https://mystajl.com/mobile/'+url+query,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            //.then((res) => console.log(res))
            .then((ress) => {

                return res(ress.json());
            })
            .catch((error) =>  {return err(error)})
            .done()
    })
};
*/

