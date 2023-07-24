import React from 'react';
import * as vega from 'vega';
import LineChartSpec from './LineChart.json';
import { useEffect,} from 'react';
function LineChart(props) {
  
  const viewRef = React.useRef(null);

  let data = props.jsonData;
  const spec = LineChartSpec;

    useEffect(() => {
      console.log("dsdf");
      if (viewRef.current) {
        const view = new vega.View(vega.parse(spec), {
          renderer: "canvas",
          container: viewRef.current,
          hover: true,
        }).insert("table", data);
        view.signal('xAxis',props.xscale);
        view.signal('yAxis',props.yscale);
        view.signal("width",props.size.width-40);
        view.signal('height',props.size.height-40)
        view.runAsync();
      }
    }, [props.size.width, props.size.height,props.xscale, props.yscale, data, spec]);

  return (
    <div ref={viewRef}></div>
  );
}

export default LineChart;
