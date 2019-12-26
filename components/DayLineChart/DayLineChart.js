import React from 'react';
import PropTypes from 'prop-types';
import {LineChart,} from "react-native-chart-kit";


const DayLineChart = ({dayDate, graphWidth}) => (
    <LineChart
        data={dayDate}
        width={graphWidth} // from react-native
        height={220}
        yAxisLabel={""}
        yAxisSuffix={" С°"}
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
    />
);

DayLineChart.propTypes = {
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    value: PropTypes.string,
}

DayLineChart.defaultProps = {
    onChange: () => {
    },
    onKeyPress: () => {
    },
    value: '',
}

export default DayLineChart;
