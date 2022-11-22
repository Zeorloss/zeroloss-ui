import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class InfoChart extends Component {
  render() {
    const options = {
      theme: "light",
      animationEnabled: true,
      textColor: "blue",
      title: {
        text: "Total Supply: 533,000,000",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{desc}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            {
              y: 50,
              label: "ZEROLOSS Ecosystem",
              desc: "50% LP locked up",
              fill: "gold",
            },
            {
              y: 11.72,
              label: "Early Access",
              desc: "11.72% vested and linearly distributed",
            },
            {
              y: 9,
              label: "Development",
              desc: " 9% linearly unlocked over a period of 24months",
            },
            { y: 10.28, label: "Marketing", desc: "10.28% linearly unlocked" },
            {
              y: 8,
              label: "Team",
              desc: "8% vested and linearly unlocked to pay the working team",
            },
            { y: 11, label: "Treasury", desc: "11% vested and locked up" },
          ],
        },
      ],
      
    };

    return (
      <div >
        <h1
          style={{ textAlign: "center"}}
        //   className="mb-3 h3-font font-b--700"
        >
          ZEROLOSS TOKENOMICS
        </h1>
        <CanvasJSChart
          options={options}
          //   onRef={(ref) => (this.chart = ref)}
        />
        {
          options.info /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/
        }
      </div>
    );
  }
}

export default InfoChart;
