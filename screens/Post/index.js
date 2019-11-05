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
import {Card} from 'galio-framework';
import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import {db} from "../../config";

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            currentUser: 'def',
            currentUserID: '',
        };
        this.lastPress = 0;
    }


    componentDidMount() {
        const { currentUser } = db.auth();
        this.setState({currentUser: currentUser.email});
        this.setState({currentUserID: currentUser.uid});
    }


    handleLargeAnimatedIconRef = (ref) => {
        this.largeAnimatedIcon = ref
    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    // Function that handles the animation of both small and bigger heart
    animateIcon = () => {
        const { liked } = this.state
        // Firstly, we stop any occuring animation
        this.largeAnimatedIcon.stopAnimation()

        if (liked) {
            // If the Photo is already liked, there's a different animation for a small heart icon, it's a little subtle animation
            this.largeAnimatedIcon.bounceIn()
                .then(() => this.largeAnimatedIcon.bounceOut())
            this.smallAnimatedIcon.pulse(200)
        } else {
            /* The Animation chain for the main animation when liking the photo occurs by double tapping
            Each animation is returning a promise, that's why we can chain them in a smooth sequence of animations */
            this.largeAnimatedIcon.bounceIn()
                .then(() => {
                    this.largeAnimatedIcon.bounceOut()
                    this.smallAnimatedIcon.bounceIn()
                })
                .then(() => {
                    if (!liked) {
                        this.setState(prevState => ({ liked: !prevState.liked }))
                    }
                })
        }
    }

    handleOnPress = () => {
        const time = new Date().getTime()
        // This delta determines time passed since last press on the photo
        const delta = time - this.lastPress
        const doublePressDelay = 400

        if (delta < doublePressDelay) {
            // If the delta is less than specified doublePressDelay value, it fires the function for animations
            this.animateIcon()
        }
        this.lastPress = time
        this.setState(prevState => ({ liked: !prevState.liked }))

        fetch('http://192.168.1.27:8080/addLikedBy/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.currentUserID,
                imageID: this.props.imageID,
                value: !this.state.liked,
            }),
        }).then(r => console.log("succesful sent"));

    }

    handleOnPressLike = () => {
        console.log("felt a touch");
        /* This is a separate function for liking the photo,
        it activates only smart heart animation and it's invoked by pressing small icon */
        this.smallAnimatedIcon.bounceIn()
        this.setState(prevState => ({ liked: !prevState.liked }))
        fetch('http://192.168.1.27:8080/addLikedBy/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.currentUserID,
                imageID: this.props.imageID,
                value: !this.state.liked,
            }),
        }).then(r => console.log("succesful sent"));
    }

    render() {
        const nickname = this.props.nickname;
        const avatar = this.props.avatar;
        const image = this.props.image;
        const caption = this.props.caption;
        let counts = this.props.counts;
        const timeAgo = <TimeAgo time={this.props.date} interval={20000}/>;
        const timestamp = this.props.timestamp;
        const imageID = this.props.imageID;

        const { liked } = this.state;

        return (
            <View className="Post" ref="Post">
                <Text> {imageID} </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.card}
                    onPress={this.handleOnPress}
                >
                    <AnimatedIcon
                        ref={this.handleLargeAnimatedIconRef}
                        name="heart"
                        color={colors.white}
                        size={80}
                        style={styles.animatedIcon}
                        duration={500}
                        delay={200}
                    />
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        resizeMode="cover"
                    />
                    <View style={styles.photoDescriptionContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.handleOnPressLike}
                        >
                            <AnimatedIcon
                                ref={this.handleSmallAnimatedIconRef}
                                name={liked ? 'heart' : 'hearto'}
                                color={liked ? colors.heartColor : colors.textPrimary}
                                size={18}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <View style={styles.polaroidTextContainer}>
                            <Text> {counts} </Text>
                            <Text style={styles.text}>Photo by: </Text>
                            <Text style={[styles.text, styles.textPhotographer]}>{avatar}</Text>
                            <Text> {caption} </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: 345,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2
    },
    image: {
        marginTop: 10,
        height: 280,
        width: '92%'
    },
    photoDescriptionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: 160,
        opacity: 0
    },
    text: {
        textAlign: 'left',
        fontSize: 13,
        backgroundColor: colors.transparent,
        color: colors.textPrimary
    },
    textPhotographer: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    polaroidTextContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 0
    },

    logo: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

export default Post;