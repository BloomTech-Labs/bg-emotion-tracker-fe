import React from 'react';
import { Card } from 'antd';
import Plot from 'react-plotly.js';

export default function GraphCard() {
  return (
    <div>
      <Card style={{ width: 650, height: 300 }}>
        <Plot
          data={[
            {
              x: [-2, -1, 0, 1, 2],
              y: [1, 2, 4, 3, 2],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            },
            { type: 'bar', x: [-2, -1, 0, 1, 2], y: [1, 2, 4, 3, 2] },
          ]}
          layout={{
            width: 600,
            height: 250,
            title: 'NUMBER OF EACH SENTIMENT AT CHECK-IN',
          }}
        />
      </Card>
    </div>
  );
}
