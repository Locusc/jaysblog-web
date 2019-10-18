import React, { useState } from 'react';
// @ts-ignore
import numeral from 'numeral';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

export interface TextAlignTypeState {
  type: 'center' | 'left' | 'right';
}

const StudyPlan: React.FunctionComponent<{}> = props => {
  const data = [
    {
      technology: 'Python',
      percent: 50,
    },
    {
      technology: 'Spring Cloud Alibaba',
      percent: 30,
    },
    {
      technology: 'Kubernetes',
      percent: 0,
    },
    {
      technology: 'Vue3.0',
      percent: 0,
    },
    {
      technology: 'Hadoop',
      percent: 20,
    },
    {
      technology: 'Spark',
      percent: 20,
    },
  ];

  const cols = {
    percent: {
      min: 0,
      max: 100,
      formatter(val: number) {
        return `${(val * 1).toFixed(2)}%`;
      },
    },
  };

  const styles = {
    mainTitle: {
      fontSize: 18,
      color: '#333',
      display: 'block',
      padding: 10,
      textAlign: 'center' as TextAlignTypeState['type'],
    },
  };

  return (
    <div>
      <Chart padding={['auto', 20, 120, 55]} height={600} data={data} scale={cols} forceFit>
        <Legend />
        <span className="main-title" style={styles.mainTitle}>
          Study Plan
        </span>
        <Axis name="technology" />
        <Axis name="percent" />
        <Tooltip />
        <Geom type="intervalStack" position="technology*percent" color="technology" />
      </Chart>
    </div>
  );
};

export default StudyPlan;
