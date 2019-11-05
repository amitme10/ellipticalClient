import React, {Component} from "react";
import Post from "../Post";
import { View, Text, StyleSheet } from 'react-native';

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
    // fetch the initial posts
        fetch('http://192.168.1.27:8080/orderPostsByDate').then(response => response.json()
        ).then((responseJson) => {
            this.setState({posts : Object.values(responseJson)});
        }).catch(reason => console.log("nope " + reason));

    }

    render(){
        return (
            <View className="Posts">
                {this.state.posts.map(post => <Post nickname={post["data"].nickname} avatar={post["data"].avatar} image={post["data"].image} caption={post["data"].caption} key={post["data"].id} counts={post["data"].counts} timestamp={post["data"].timestamp} date={post["data"].date} imageID={post["ids"]}/>)}
                {/*{this.state.posts.map(post => <Post nickname={post.nickname} avatar={post.avatar} image={post.image} caption={post.caption} key={post.id} counts={post.counts} timestamp={post.timestamp} date={post.date} />)}*/}
            </View>
        );
    }
}

export default Posts;