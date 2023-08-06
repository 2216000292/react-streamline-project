import React from 'react';
import * as vega from 'vega';
import ScatterPlotSpec from './vega_specification/ScatterPlot_overview.json';
import ScatterPlotSpec_Gradient from './vega_specification/Scatterplot_overview_gradient.json';
import { useEffect,} from 'react';



function ScatterPlot_overview(props) {
  
  const viewRef = React.useRef(null);

  let data = props.inputData;
  if(data.length === 0) {      //if data is empty, To avoid renders black page, I chooses to render empty chart.
    data = [{"x":0, "y":0, "c":0}]
  }

  const spec = props.showGradient ? ScatterPlotSpec_Gradient : ScatterPlotSpec;

  function ensureHex(color) {
    if (color.startsWith('#')) return color;
    const result = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(color);
    if (result) {
      const r = parseInt(result[1]);
      const g = parseInt(result[2]);
      const b = parseInt(result[3]);
      return '#' + 
      (((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase());

    }
    return color;
  }
  
    useEffect(() => {
      console.log("scatterplot overview component gets call",data);
      if (viewRef.current) {
        const view = new vega.View(vega.parse(spec), {
          renderer: "canvas",
          container: viewRef.current,
          hover: true,
        }).insert("Data", data);
        view.signal('xAxis',props.xscale);
        view.signal('yAxis',props.yscale);
        view.signal("width",props.size.width);
        view.signal('height',360);
        view.signal("minX",props.extremeValues[0]); /* "ExtremeValues" store scale of the chart */
        view.signal("maxX",props.extremeValues[1]);
        view.signal("minY",props.extremeValues[2]);
        view.signal("maxY",props.extremeValues[3]);
        view.signal("graphSize",[360,props.size.width-100]);
        view.signal("classification", props.showGradient ? "avg" : "c");
        view.run();
        view.addSignalListener('highlight', function(name, value) {
          console.log(name,value);
        });
        view.addSignalListener('colorID', function(name, value) {
          const hexColor = ensureHex(value.stroke);
          console.log(name, hexColor);
        });
      }
    }, [props.size.width, props.size.height,props.xscale, props.yscale, data, spec]);

  return (
    <div ref={viewRef}></div>
  );
}

export default ScatterPlot_overview;
