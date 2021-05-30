import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import TabContainer from '../common/ProfileTab';
import Loading from '../common/Loading';
const { width, height } = Dimensions.get("window");

export default class ProfileParrent extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            loading: true,
            email: navigation.getParam('email', false)
        };
    }

    componentDidMount() {
        fetch('https://mystajl.com/mobile/user?email=' + this.state.email,{
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res)=>{
               // console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    render() {
        if(this.state.loading)
            return (
                <Loading/>
            );
    }
}


