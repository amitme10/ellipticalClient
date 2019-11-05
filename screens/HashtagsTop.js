import React, {Component} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db } from '../config';
import Hashtag from "./Hashtag";

let itemsRef =  db.database().ref('/hashtagsTop/');


class HashtagsTop extends Component{
    constructor(){
        super();
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
        // request the server to update the hasthags counter because of 3days past irrelevent

        fetch('http://192.168.1.27:8080/').then(response => response.json()
        ).then((responseJson) => {
            console.log(responseJson)
        }).catch(reason => console.log("nope " + reason));

        // get the most popular hashtags
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            let items = Object.values(data);
            items.map(post => this.state.posts.push(post));
            this.setState({posts : this.state.posts});
        });
    }

    render(){
        return (
            <ScrollView horizontal={true}>
                <View className="HashtagsTop" style = {{flex: 1, flexDirection: 'row'}}>
                    {this.state.posts.map(post => <Hashtag count={post.count} lastUpdate={post.lastUpdate} word={post.word} />)}
                </View>
            </ScrollView>

        );
    }
}

export default HashtagsTop;