/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const smartText = 'hello';

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      message: 'Transcript'
    };
Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentDidMount() {
    this.initializeTTS();
    this._startRecognition();
  }

  initializeTTS() {
    Tts.setDucking(true);
    Tts.setDefaultLanguage('en-IE');
    Tts.setIgnoreSilentSwitch("ignore");
    Tts.addEventListener("tts-finish", () => { 
      Tts.stop();
      this._startRecognition();
    });
  }

componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    if (e.value[0].toLowerCase().indexOf(smartText) > -1) {
      console.log('output');
      Tts.getInitStatus().then(() => {
        Tts.speak('Hi, How may I help you');
        Voice.stop();
      });
    }
    this.setState({
      results: e.value,
      message: 'Hi, How May I Help You!'
    });
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
render () {
    return (
      <View>
        <Text style={styles.transcript}> {this.state.message} </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);
