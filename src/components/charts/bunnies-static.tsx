import React from 'react';
import ReactECharts from 'echarts-for-react';

const BunniesStatic = ({ data }: { data: any }) => {
    const options = {
        title: {
            text: 'Population over Time',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data.time,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Population',
                type: 'line',
                data: data.population,
            },
        ],
    };

    return <ReactECharts option={options} />;
};

export default BunniesStatic;


