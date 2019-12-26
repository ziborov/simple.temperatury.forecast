import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import {Button, Alert, FlatList} from 'react-native'
import Form from 'react-native-advanced-forms'
import DayLineChart from './components/DayLineChart/DayLineChart';

const BASE_PATH = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const API_KEY = 'APPID=27803d67975c5ac07262e97d94d4a9f9';
const DEF_DATE = '25.12.2019';
const DEF_GRAPH = {
    labels: ["+0h", "+3h", "+6h", "+9h", "+12h", "+15h", "+18h", "+21h"],
    datasets: [
        {
            data: [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
            ]
        }
    ]
};
let isConnected = false;
const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    isConnected = state.isConnected;
});


class App extends React.Component {
    constructor(props, ctx) {
        super(props, ctx)

        this.state = {
            town: 'Kharkiv',
            country: 'ua',
            Date1: DEF_DATE,
            Date2: DEF_DATE,
            Date3: DEF_DATE,
            Date4: DEF_DATE,
            Date5: DEF_DATE,
            stateList: [],
            dates: DEF_GRAPH,
            dates2: DEF_GRAPH,
            dates3: DEF_GRAPH,
            dates4: DEF_GRAPH,
            dates5: DEF_GRAPH,
            buttonName: "Request",
            buttonColor: "#841584",
            buttonDisabled: false

        }

    }

    _onFormRef = e => {
        this.form = e
    }

    onChange = (values) => {
        this.setState(values)
    }

    setResult = answer => {
        //console.log(answer);

        let List = answer.list;
        if (List === undefined) {
            Alert.alert("City or country not found!");
            this.setState({
                buttonName: "Request",
                buttonColor: "#841584",
                buttonDisabled: false
            });
        } else {

            let iLen = List.length;
            console.log('List.length : ' + iLen);

            let ATemp = [];
            let ATimeLabel = [];
            let ATemp2 = [];
            let ATimeLabel2 = [];
            let ATemp3 = [];
            let ATimeLabel3 = [];
            let ATemp4 = [];
            let ATimeLabel4 = [];
            let ATemp5 = [];
            let ATimeLabel5 = [];

            let i = 0;
            let Dtj;
            let now = new Date();
            console.log('The current date : ' + now);
            // Current day
            Dtj = new Date(List[i].dt * 1000);
            let dd = Dtj.getUTCDate();
            let stDate1 = Dtj.getUTCDate() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCFullYear();
            console.log('Fist Date in answer = ' + Dtj.getUTCFullYear() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCDate() + ' ' + Dtj.getUTCHours() + ':' + Dtj.getUTCMinutes());
            for (let j = 0; j < 8; j++) {
                Dtj = new Date(List[i].dt * 1000);
                let dd1 = Dtj.getUTCDate();
                if (dd == dd1) {
                    ATemp[j] = Math.round((List[i].main.temp - 273.15) * 10) / 10;
                    let dh = Dtj.getUTCHours();
                    let st = dh.toString() + 'h';
                    if (st.length < 3) {
                        st = '0' + st;
                    }
                    ATimeLabel[j] = st;

                    console.log('Dtj = ' + Dtj.getUTCFullYear() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCDate() + ' ' + Dtj.getUTCHours() + ':' + Dtj.getUTCMinutes());
                    console.log('ATimeLabel[' + j + '] = ' + ATimeLabel[j]);
                    console.log('ATemp[' + j + '] = ' + ATemp[j]);
                    i++;
                }
            }

            // Next day
            Dtj = new Date(List[i].dt * 1000);
            let stDate2 = Dtj.getUTCDate() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCFullYear();
            for (let j = 0; j < 8; j++, i++) {
                Dtj = new Date(List[i].dt * 1000);
                ATemp2[j] = Math.round((List[i].main.temp - 273.15) * 10) / 10;
                let dh = Dtj.getUTCHours();
                let st = dh.toString() + 'h';
                if (st.length < 3) {
                    st = '0' + st
                }
                ATimeLabel2[j] = st;


            }

            // Day 3
            Dtj = new Date(List[i].dt * 1000);
            let stDate3 = Dtj.getUTCDate() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCFullYear();
            for (let j = 0; j < 8; j++, i++) {
                Dtj = new Date(List[i].dt * 1000);
                ATemp3[j] = Math.round((List[i].main.temp - 273.15) * 10) / 10;
                let dh = Dtj.getUTCHours();
                let st = dh.toString() + 'h';
                if (st.length < 3) {
                    st = '0' + st
                }
                ATimeLabel3[j] = st;
            }  //for (let j = 0; j < 8; j++,i++)

            // Day 4
            Dtj = new Date(List[i].dt * 1000);
            let stDate4 = Dtj.getUTCDate() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCFullYear();
            for (let j = 0; j < 8; j++, i++) {
                Dtj = new Date(List[i].dt * 1000);
                ATemp4[j] = Math.round((List[i].main.temp - 273.15) * 10) / 10;
                let dh = Dtj.getUTCHours();
                let st = dh.toString() + 'h';
                if (st.length < 3) {
                    st = '0' + st
                }
                ATimeLabel4[j] = st;
            }  //for (let j = 0; j < 8; j++,i++)

            // Day 5
            Dtj = new Date(List[i].dt * 1000);
            let stDate5 = Dtj.getUTCDate() + '.' + Dtj.getUTCMonth() + '.' + Dtj.getUTCFullYear();
            for (let j = 0; j < 8; j++, i++) {
                Dtj = new Date(List[i].dt * 1000);
                ATemp5[j] = Math.round((List[i].main.temp - 273.15) * 10) / 10;
                let dh = Dtj.getUTCHours();
                let st = dh.toString() + 'h';
                if (st.length < 3) {
                    st = '0' + st
                }
                ATimeLabel5[j] = st;
            }  //for (let j = 0; j < 8; j++,i++)

            this.setState({Date1: stDate1});
            this.setState({
                dates: {
                    labels: ATimeLabel,
                    datasets: [
                        {
                            data: ATemp
                        }
                    ]
                }
            });

            this.setState({Date2: stDate2});
            this.setState({
                dates2: {
                    labels: ATimeLabel2,
                    datasets: [
                        {
                            data: ATemp2
                        }
                    ]
                }
            });

            this.setState({Date3: stDate3});
            this.setState({
                dates3: {
                    labels: ATimeLabel3,
                    datasets: [
                        {
                            data: ATemp3
                        }
                    ]
                }
            });

            this.setState({Date4: stDate4});
            this.setState({
                dates4: {
                    labels: ATimeLabel4,
                    datasets: [
                        {
                            data: ATemp4
                        }
                    ]
                }
            });

            this.setState({Date5: stDate5});
            this.setState({
                dates5: {
                    labels: ATimeLabel5,
                    datasets: [
                        {
                            data: ATemp5
                        }
                    ]
                }
            });

            this.setState({
                buttonName: "Request",
                buttonColor: "#841584",
                buttonDisabled: false
            });

        }

    }


    onSubmit = (values) => {

        console.log('Submitted: ' + JSON.stringify(values));

        console.log(`${BASE_PATH}${this.state.town},${this.state.country}&${API_KEY}`);

        if (isConnected) {

            this.setState({
                buttonName: "Loading...",
                buttonColor: "#333333",
                buttonDisabled: true
            });

            fetch(`${BASE_PATH}${this.state.town},${this.state.country}&${API_KEY}`, {
                method: 'GET'
                //Request Type
            })
                .then((response) => response.json())
                //If response is in json then in success
                .then((responseJson) => {
                    //Success
                    this.setResult(responseJson);
                })
                //If response is not in json then in error
                .catch((error) => {
                    Alert.alert('Error: ' + error);
                    console.error(error);
                });
        } else {
            Alert.alert("No Internet connection!");
        }


    }

    validate = (values) => {
        return true;
    }


    render() {

        const {
            town, country
        } = this.state;

        return (
            <>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Form ref={this._onFormRef} onChange={this.onChange} onSubmit={this.onSubmit}
                          validate={this.validate}>
                        <Form.Layout style={styles.row}>
                            <Form.Layout style={styles.row}>
                                <Form.Field name="town" label="Town:" style={styles.field}>
                                    <Form.TextField value={town} style={styles.inputField}/>
                                </Form.Field>
                            </Form.Layout>
                            <Form.Layout style={styles.row}>
                                <Form.Field name="country" label="Country:" style={styles.field}>
                                    <Form.TextField value={country} style={styles.inputField}/>
                                </Form.Field>
                            </Form.Layout>

                        </Form.Layout>
                    </Form>
                    <View style={styles.button}>
                        <Button
                            onPress={() => this.form.validateAndSubmit()}
                            title={this.state.buttonName}
                            color={this.state.buttonColor}
                            disabled={this.state.buttonDisabled}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize: 18}}>{this.state.town + ' temperatures list:'}</Text>
                        <Text style={{fontSize: 14}}>{this.state.Date1}</Text>
                        <DayLineChart dayDate={this.state.dates} graphWidth={Dimensions.get("window").width}/>

                        <Text style={{fontSize: 14}}>{this.state.Date2}</Text>
                        <DayLineChart dayDate={this.state.dates2} graphWidth={Dimensions.get("window").width}/>

                        <Text style={{fontSize: 14}}>{this.state.Date3}</Text>
                        <DayLineChart dayDate={this.state.dates3} graphWidth={Dimensions.get("window").width}/>

                        <Text style={{fontSize: 14}}>{this.state.Date4}</Text>
                        <DayLineChart dayDate={this.state.dates4} graphWidth={Dimensions.get("window").width}/>

                        <Text style={{fontSize: 14}}>{this.state.Date5}</Text>
                        <DayLineChart dayDate={this.state.dates5} graphWidth={Dimensions.get("window").width}/>

                    </View>

                </ScrollView>

            </>
        );
    }


};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    row: {
        marginBottom: 15,
        fontSize: 22,
    },
    columns: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    field: {
        marginRight: 10,
        backgroundColor: '#FFF'
    },
    ageField: {
        width: 50,
    },
    townField: {
        width: 70,
        height: 50,
        fontSize: 22
    },
    countryField: {
        width: 30,
        height: 50,
        fontSize: 22
    },
    inputField: {
        backgroundColor: '#CCC',
        height: 50,
        fontSize: 22,
    },
    button: {
        width: 150,
        marginTop: 15,
    },
    error: {
        marginTop: 10,
    },
    errorMsg: {
        color: 'red'
    },
    displayOff: {
        display: 'none'
    }
});

export default App;
