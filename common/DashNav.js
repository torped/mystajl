import fetchTimeout from "fetch-timeout";
import {Alert, RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import React from "react";


class lll extends Component
{
    constructor (props){
        super(props);
        this.state = {
            user:{
                email:'',
                password: '',
                username: '',
                goalName: '',
                birthday: '',
                location: '',
                image: null,
                imageGoal: null,
                name: '',
                firstName: '',
                lastName: '',
                category: '',
                progression: '',
                description: '',
                choice:[]
            },
            userData: null,
            onLoad: true,
            refresh: false
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        fetchTimeout('https://mystajl.com/mobile/user?email='+this.state.user.email, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-cache',
        },5000, 'Server Timout,\nServer probbably offline.')
            .then(response => {
                if(response.ok) {
                    this.setState({
                        refreshing:false,
                        user: JSON.parse(response._bodyInit)
                    });
                    //global.user[2]= response._bodyInit;
                    //this.props.navigation.navigate('VisitProfile');
                }else{
                    this.setState({refreshing: false});
                    throw new Error(JSON.parse(response._bodyInit).errMsg);
                }
            })
            .catch(error => {
                this.setState({refreshing: false});
                Alert.alert(
                    'Doom of Error',
                    error.message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true},
                );
            });
    };

    render()
    {
            return (
                <View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
                    <SafeAreaView>
                        <ScrollView containerStyle={{flexGrow: 1}} style={{flex: 1}}>
                    <DashboardTabNavigator screenProps={{user: this.state.user, initRoute: this.state.firstLaunch, userData: this.state.userData}}
                                    navigation={this.props.navigation}
                                    refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    />
                        </ScrollView>
                    </SafeAreaView>
                </View>
            );
        }

}