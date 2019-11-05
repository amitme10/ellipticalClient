import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { db } from '../../config';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';


let addItem = item => {
    fetch('http://192.168.1.27:8080/addNewPost/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname: item.state.currentUser,
            id: 'delete this value',
            counts: '0',
            avatar: item.state.currentUser,
            caption: item.state.caption,
            image: item.state.url,
            date: Date().toString(),
            timestamp: Math.floor(Date.now() / 1000),
            location: item.state.location,
            likedBy: '',
        }),
    }).then(r => console.log("succesful sent"));
};

export default class NewPost extends Component {
  state = {
      location: '',
      name: '',
      url: '',
      currentUser: 'def',
      id: ''
  };

  componentDidMount() {
      const { currentUser } = db.auth();
      this.setState({currentUser: currentUser.email});
  }

    onChooseImagePress = async ()=> {
    let result = await ImagePicker.launchCameraAsync();
    if(!result.cancelled) {
      this.state.name = Date().toString();
      this.uploadImage(result.uri, this.state.name)
          .then(() => {
            console.log("Success");
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = db.storage().ref().child("images/" + imageName);
    ref.put(blob).then(a => a.ref.getDownloadURL().then(value => this.setState({url: value}, () => {
      console.log("great"+this.state.url);
    } ))
    );
  };

  handleChange3 = e => {
    this.setState({
      caption: e.nativeEvent.text
    });
  };


  handleSubmit = () => {
    addItem(this);
  };


  render() {

    return (
        <View style={styles.main}>
          <Text style={styles.title}>Add Item</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChange3} />

            <RNPickerSelect
                onValueChange={(value) => this.setState({location: value})}
                items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                ]}
            />

          <Text style={styles.welcome}>
            Image Gallery
          </Text>
          <TouchableHighlight
              style={styles.button}
              underlayColor="white"
              onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <Button onPress={this.onChooseImagePress} title="choose image..." />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
