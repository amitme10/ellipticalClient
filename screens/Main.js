import React from 'react'
import { db } from '../config';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Posts from "./Posts";
import HashtagsTop from "./HashtagsTop";
import NewPost from "./newPost";
import { Button } from 'galio-framework';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
        };
    }

    state = {
        currentUser: null,
    };

    componentDidMount() {
        const { currentUser } = db.auth();
        this.setState({currentUser: currentUser.email});
    }

    signOutUser = async () => {
        try {
            await db.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const currentUser = this.state.currentUser ? this.state.currentUser : 'def';

        return (
            <View>

                <Text> {currentUser} </Text>
                <Button title="logout" onPress = {() => this.signOutUser()}> Logout </Button>
                <Image
                        source={
                            __DEV__
            ? require('../sprite.png')
            : require('../sprite.png')
    }
        style={styles.logo}
        />
        <Button round size="small" color="success" onPress = {() => this.props.navigation.navigate('NewPost')}>add</Button>
        <HashtagsTop />
        <ScrollView>
        <View>
        <Posts />
        </View>
    </ScrollView>
    </View>
        )
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});