import React from 'react';
import * as vega from 'vega';
import barChartSpec from './BarChart.json';
import {useEffect,} from 'react';
function BarChart(props) {


  const viewRef = React.useRef(null);


  let data = props.jsonData;
  const spec = barChartSpec;
  
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
        view.run();
      }
    }, [props.size.width, props.size.height,props.xscale, props.yscale, data, spec]);

  return (
    <>
      <div ref={viewRef}></div>
    </>
  );
}

export default BarChart;

// import React from 'react';
// import * as vega from 'vega';
// import barChartSpec from './BarChart.json';

// function BarChart(props) {
//   const viewRef = React.useRef(null);
//   const [containerSize, setContainerSize] = React.useState(null);
//   const data = props.jsonData;

//   React.useEffect(() => {
//     const container = viewRef.current.parentNode;
//     setContainerSize(container.getBoundingClientRect());

//     function render(spec) {
//       const view = new vega.View(vega.parse(spec), {
//         renderer: 'canvas',
//         container: viewRef.current,
//         hover: true
//       }).insert('table', data);
//       view.signal('xAxis', props.xscale);
//       view.signal('yAxis', props.yscale);
//       view.runAsync();
//     }

//     render(barChartSpec);

//     function handleResize() {
//       setContainerSize(container.getBoundingClientRect());
//     }

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [data, props.xscale, props.yscale]);

//   React.useEffect(() => {
//     if (containerSize) {
//       const view = vega
//         .View(vega.parse(barChartSpec), {
//           renderer: 'canvas',
//           container: viewRef.current,
//           hover: true,
//         })
//         .insert('table', data)
//         .width(containerSize.width)
//         .height(containerSize.height)
//         .runAsync();

//       return () => {
//         view.finalize();
//       };
//     }
//   }, [containerSize, data]);

//   return <div ref={viewRef} />;
// }

// export default BarChart;
