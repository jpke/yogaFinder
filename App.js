import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Linking } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends React.Component {
  //set arbitrary region for mapView initialization
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  //set mapView to show user's location
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      let mapRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      this.setState({mapRegion})
    });
  }

  //allow user input to change mapView region
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

 //get directions to selected point
  _handleOnPress = (latLon) => {
    const rla = this.state.mapRegion.latitude;
    const rlo = this.state.mapRegion.longitude;
    const la = latLon.latitude;
    const lo = latLon.longitude;
    console.log("event pressed here: ", rla, rlo);
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', flex: 1}}
          region={this.state.mapRegion}

          showUserLocation={true}
        >
          <MapView.Marker
            coordinate={{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}}
            pinColor='blue'
            title="Current location"
            description="Where you are"
          />
          <MapView.Marker
            coordinate={{latitude: 38.304422, longitude: -77.472459}}
            title="Yoga Studio"
            description="YoFo">
            <MapView.Callout>
              <TouchableHighlight
                onPress={() => this._handleOnPress({latitude: 38.304422, longitude: -77.472459})}>
                <Text>Yoga Studio</Text>
              </TouchableHighlight>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      <Text style={{position: 'absolute', top: 30, fontSize: 30, backgroundColor: 'rgba(0,0,0,0)'}}>Yoga Finder</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
