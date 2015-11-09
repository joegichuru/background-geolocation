'use strict';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  SwitchAndroid,
  TouchableHighlight
} = React;

var BackgroundGeolocation = require('react-native-background-geolocation-android');
var Icon                  = require('react-native-vector-icons/Ionicons');
var SettingsService       = require('./SettingsService');

SettingsService.init('Android');

SettingsService.getValues(function(values) {
  values.license = "b4e71cead1c2331f5e6d5064becae65394778e6497941e71cac13693a21b2541";
  values.orderId = "ch_15a08y2St3m92AMxRTxgHtuw";
  BackgroundGeolocation.configure(values);
});




/*
BackgroundGeolocation.start(function() {
  console.log('--------------- START');
  BackgroundGeolocation.getCurrentPosition({timeout: 30}, function(location) {
    console.log('------------- getCurrentPosition: ', JSON.stringify(location));

    BackgroundGeolocation.addGeofence({
      identifier: 'HOME',
      radius: 200,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      notifyOnEntry: true,
      notifyOnExit: true,
    });

    BackgroundGeolocation.getLocations(function(rs) {
      console.log('------------- getLocations: ', JSON.stringify(rs));
    }, function(error) {
      console.log('------------- getLocations ERROR: ', error);
    })

    BackgroundGeolocation.sync(function(rs) {
      console.log('------------- sync: ', JSON.stringify(rs));
    }, function(error) {
      console.log('------------- sync ERROR: ', error);
    });

    BackgroundGeolocation.getOdometer(function(distance) {
      console.log('------------- odometer: ', distance);
    }, function(error) {
      console.log('------------- odometer ERROR: ', error);
    });

    BackgroundGeolocation.resetOdometer(function() {
      console.log('------------- reset odometer');
    }, function(error) {
      console.log('------------- reset odometer ERROR: ', error);
    });

    BackgroundGeolocation.changePace(true, function(isMoving) {
      console.log("-------------- changePace: ", isMoving);

      setTimeout(function() {
        BackgroundGeolocation.getCurrentPosition({timeout:0}, function(location) {
          console.log('- location recevied: ', JSON.stringify(location));
        }, function(error) {
          console.log('-------------Location timeout: ' + JSON.stringify(error));
        });

        BackgroundGeolocation.changePace(false, function(isMoving) {
          console.log('-------------- changePace: ', isMoving);
        }, function(error) {
          console.log('=============== changePace FAILURE: ', error);
        });
      }, 5000);
    }, function(error) {
      console.log('-------------- changePace FAILURE: ', error);
    });
  }, function(error) {
    console.log('-------------- location error: ', error);
  });

  // getLocations
});
*/

var RNBackgroundGeolocationSample = React.createClass({
  getInitialState: function() {
    return {
      enabled: false,
      isMoving: false
    };
  },

  componentDidMount: function() {

    // location event
    BackgroundGeolocation.on("location", function(location) {
      console.log('*** location: ', JSON.stringify(location));
    });
    // http event
    BackgroundGeolocation.on("http", function(response) {
      console.log('*** HTTP ' + response.status);
      console.log(response.responseText);
    });
    // geofence event
    BackgroundGeolocation.on("geofence", function(geofence) {
      console.log('*** onGeofence: ', JSON.stringify(geofence));
    });
    // error event
    BackgroundGeolocation.on("error", function(error) {
      console.log('*** ERROR: ', JSON.stringify(error));
    });
    // motionchange event
    BackgroundGeolocation.on("motionchange", function(event) {
      console.log("*** MOTIONCHANGE", JSON.stringify(event));
    });

    // getGeofences
    BackgroundGeolocation.getGeofences(function(rs) {
      console.log('-------------- getGeofences: ', JSON.stringify(rs));
    }, function(error) {
      console.log("---------- getGeofences ERROR", error);
    });

    console.log('- mount: ', SettingsService.get)
    this.setState({
      enabled: false,
      isMoving: false
    });
  },

  onClickEnable: function() {
    console.log('- onClickEnable: ', arguments);

    console.log('- enable: ', this.state.enabled);

    if (!this.state.enabled) {
      BackgroundGeolocation.start(function() {
        console.log('- start success');
      });
    } else {
      BackgroundGeolocation.stop();
    }

    this.setState({
      enabled: !this.state.enabled
    });
  },
  onClickPace: function() {
    console.log('pace', this.state.isMoving);

    BackgroundGeolocation.changePace(!this.state.isMoving);
    
    this.setState({
      isMoving: !this.state.isMoving
    });      
  },
  onClickLocate: function() {
    console.log('locate');
    BackgroundGeolocation.getCurrentPosition(function(location) {
      console.log('- current position: ', JSON.stringify(location));
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topToolbar}>
          <TouchableHighlight onPress={this.onClickMenu}><Icon name="navicon" size={30} style={styles.btnMenu} /></TouchableHighlight>

          <Text style={{fontWeight: 'bold', fontSize: 18, flex: 1, textAlign: 'center'}}>Background Geolocation</Text>
          <SwitchAndroid onValueChange={this.onClickEnable} value={this.state.enabled} />
        </View>
        <View style={styles.workspace}>
          <Text style={{flex: 1, textAlign: 'center'}}>Map goes here</Text>
        </View>
        <View style={styles.bottomToolbar}>
          <TouchableHighlight onPress={this.onClickLocate}><Icon name="navigate" size={30} style={styles.btnNavigate} /></TouchableHighlight>
          <Text style={{fontWeight: 'bold', fontSize: 18, flex: 1, textAlign: 'center'}}></Text>
          <TouchableHighlight onPress={this.onClickPace}><Icon name="play" size={30} style={styles.btnPace} color="#0c0" /></TouchableHighlight>
        </View>

      </View>
    );
  }
});

var toolbarActions = [];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  topToolbar: {
    paddingLeft: 10,
    backgroundColor: '#e9eaed',    
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    justifyContent: 'center'
  },
  workspace: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'    
  },
  bottomToolbar: {
    paddingLeft: 10,
    backgroundColor: '#e9eaed',    
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    justifyContent: 'center'
  },
  btnMenu: {

  },
  btnNavigate: {

  },
  btnPace: {

  }
});

AppRegistry.registerComponent('RNBackgroundGeolocationSample', () => RNBackgroundGeolocationSample);