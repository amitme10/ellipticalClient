import React from 'react'
import { db } from '../config';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
export default class LoadingScreen extends React.Component {
    componentDidMount() {
        db.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})