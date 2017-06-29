import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'default msg',
	  observe: false,
	  count: 0
    };
    
  }
  
  async onPress(){ 
	this.setState({observe: true});
	let cnt = 0;
	while(true){
		await new Promise((resolve, reject) => {
			fetch('http://jubeatwww.com.tw:5001/')
				.then((res) => res.json())
				.then((res) => {
					this.setState({status: res.status});
				})
				.then(() => {
					setTimeout(() => {
						this.setState({count: this.state.count + 1});
						resolve();
					}, 3000);
				})
				.catch((err) => {
					this.setState({observe: false});
					alert('server unavaliable');
				});
		}); 
	}
	
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Status
        </Text>
        <Text style={styles.paragraph}>
          {this.state.status}
        </Text>
		{this.state.observe ? 
			<Text style={styles.paragraph}>
				observing(request times: {this.state.count})
			</Text> :
			<Button
				title="Start Observing"
				onPress={this.onPress.bind(this)}
			/>
		}
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
