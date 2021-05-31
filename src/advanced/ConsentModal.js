import React from 'react'
import {Modal, Text, View} from "react-native";
import {Button} from "react-native-elements";

export default class ConsentModal extends React.Component {
    state = {
        visible: false,
        agree:()=>{}
    }

    show=(agree)=>{
        this.setState({visible:true,agree:agree})
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
                            this.state.agree()
                            this.setState({visible: false})
                        }} type={'solid'} title={'Agree'}/>
                    </View>
                </View>
            </Modal>
        )
    }
}
