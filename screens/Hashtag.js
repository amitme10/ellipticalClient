import React, { Component } from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
class Hashtag extends Component {
    render() {
        const count = this.props.count;
        const lastUpdate = this.props.lastUpdate;
        const word = this.props.word;
        return (
                <View className="Hashtag" ref="Hashtag" style={{ width: 130 }}>

                    <Image
                        style={{ width: 120, height: 170, borderRadius: 5 }}
                        source={{ uri:  "https://firebasestorage.googleapis.com/v0/b/helpital-1278a.appspot.com/o/images%2FMon%20Oct%2007%202019%2011%3A02%3A33%20GMT%2B0300%20(IDT)?alt=media&token=e337c767-63af-4f56-803e-40b6edbeee12"}}
                        resizeMode="stretch"
                    />
                    <View style={{ paddingHorizontal: 5, alignItems: 'center', marginTop: 8 }}>
                        <Text  small
                               bold
                               numberOfLines={1}>{count} </Text>
                        <Text> {lastUpdate} </Text>
                        <Text> {word} </Text>
                    </View>
                </View>
        );
    }
}

export default Hashtag;