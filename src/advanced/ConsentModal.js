import React from 'react'
import {Modal, Text, View} from "react-native";
import {Button} from "react-native-elements";

export default class ConsentModal extends React.Component {
    state = {
        visible: false
    }

    show=()=>{
        this.setState({visible:true})
    }

    render() {
        return (
            <Modal animated visible={this.state.visible} transparent>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,.6)'
                }
                }>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        alignSelf: 'center',
                        margin: 20
                    }}>
                        <Text style={{
                            fontSize: 16,
                            marginVertical: 10,
                            color: 'black'
                        }}>MMP Tracker will use your background location to track your movement in order to generate
                            your
                            precise route and for geofencing conformity.</Text>
                        <Button onPress={() => {
                            this.setState({visible: false})
                            this.props.onAgree()
                        }} type={'solid'} title={'Agree'}/>
                    </View>
                </View>
            </Modal>
        )
    }
}
