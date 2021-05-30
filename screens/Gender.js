import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import Const from '../../models/constants';
import FloatingLabelInput from "../common/FloatingLabelInput";

const { width, height } = Dimensions.get("window");

export default class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoad: false,
            passwordCheck: false,
            errMsg: '',
            password: '',
            user: this.props.navigation.state.params.user,
            newEmail: 'keith_fast@hotmail.com',
            selected: [
                false,
                false,
                false
            ]
        };
    }

   RadioButton = (props) => {
        return (
            <TouchableOpacity style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: Const.blue,
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onPress={()=>{
                    this.state.selected[props] = true;
                    this.state.selected[(props+1)%3] = false;
                    this.state.selected[(props+2)%3] = false;
                    this.forceUpdate()
                }}
            >
                {
                    this.state.selected[props] ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: Const.blue,
                        }}/>
                        : null
                }
            </TouchableOpacity>
        );
    };

    render() {
        if(this.state.onLoad) {
            return (
                <View style={{flex: 1}}>

                </View>
            );
        }else{
            return (
                <View style={{margin: 20, flex: 1,backgroundColor: 'white'}}>
                    <View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                        {
                            this.RadioButton(0)
                        }
                        <Text style={{fontWeight: 'bold',marginLeft: 20}}>
                            Female
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                        {
                            this.RadioButton(1)
                        }
                        <Text style={{fontWeight: 'bold',marginLeft: 20}}>
                            Male
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                        {
                            this.RadioButton(2)
                        }
                        <Text style={{fontWeight: 'bold',marginLeft: 20}}>
                            Why not both?
                        </Text>
                        </View>
                    </View>
                    <View style={{margin: 10, flex: 1,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <TouchableOpacity
                            style={{marginRight: 20}}
                            onPress={()=>{
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Text style={{color: Const.blue, fontSize: 16, fontWeight: 'bold'}}>
                                DONE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );

        }
    }
}