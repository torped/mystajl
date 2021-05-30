// @flow
import * as React from "react";
import {Surface} from "gl-react-expo";
import {
  CameraRoll,TouchableOpacity, View, Text
} from 'react-native';

import {type StyleProps} from "../index";

import {Temperature, ContrastSaturationBrightness, Sepia, Walden, Brannan, Valencia} from "./gl-filters";
import GLImage from "./GLImage";

export type FilterName = "saturate" | "sepia" | "warm" | "walden" | "manualAdjust" | "brannan" | "valencia" ;
type FilterProps = StyleProps & {
    uri: string,
    name: FilterName,
    onDraw?: () => mixed,
    rotation: number,
    saturation: number,
    brightness: number,
    contrast: number,
    possi: [number, number],
    zoom: number
};

export default class Filter extends React.PureComponent<FilterProps> {

state = {
        contrast: this.props.contrast,
        saturation: this.props.saturation,
        brightness: this.props.brightness
    };


    render(): React.Node {
        const {style, uri, name, onDraw, rotation, brightness, contrast, saturation,possi, zoom} = this.props;
        const source = { uri };


        return (
            // $FlowFixMe

            <Surface ref={'surface'} {...{style}}>
<ContrastSaturationBrightness on={name === "manualAdjust"} contrast={contrast} saturation={saturation} brightness={brightness}>
                <ContrastSaturationBrightness on={name === "saturate"} contrast={1} saturation={0} brightness={1}>
                    <Temperature on={name === "warm"}>
                        <Sepia on={name === "sepia"} sepia={1.2}>
                            <Walden on={name === "walden"}>
                                <Brannan on={name === "brannan"}>
                                    <Valencia on={name === "valencia"}>
                                        <GLImage ref={'glImage'} {...{source, onDraw,center:possi,zoom}} />
                                    </Valencia>
                                </Brannan>
                            </Walden>
                        </Sepia>
                    </Temperature>
                </ContrastSaturationBrightness>
</ContrastSaturationBrightness>
            </Surface>

        );
    }
}
