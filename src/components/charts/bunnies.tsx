import React from 'react';
import ReactECharts from 'echarts-for-react';

const Bunnies = ({ data }: { data: any }) => {
    console.log("data", data)
    const options = {
        title: {
            text: 'Population over Time',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data['FINAL TIME'], // Using 'FINAL TIME' as x-axis data
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Population',
                type: 'line',
                data: data, // Using 'Population' as y-axis data
            },
        ],
    };

    return <ReactECharts option={options} />;
};

export default Bunnies;
