
import React, { useEffect, useState } from 'react';
import ScatterPlot from './ScatterPlot';
import ScatterPlot_overview from './ScatterPlot_overview';
import { calculateAverage,findMinMax } from './dataProcessing/dataProcess';
import CheckBox from './CheckBox';
import { debounce } from 'lodash';


function Content(props) {
  const [size, setSize] = useState(0);
  const [renderedChart, setRenderedChart] = useState(null);
  const { contentRef } = props;
  // const inputData = props.inputData;
  const [inputData, setInputData] = useState(JSON.parse(JSON.stringify(props.inputData)))
  const chartType = props.chartType;
  const showDerivative = props.showDerivative
  const xscale = "x";
  const yscale = "y";

  const handleCheckBoxChange = (id, checked) => {
    console.log(`Checkbox ${id} was clicked. Checked: ${checked}`)
    let inputDataCopy = JSON.parse(JSON.stringify(inputData)); // deep copy
    let item = inputDataCopy.find((dataItem) => dataItem[0] === id);
    if (item) {
      item[3] = checked;
    }
    setInputData(inputDataCopy);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      debounce(entries => {
        const contentRect = entries[0].contentRect;
        setSize({ width: contentRect.width, height: contentRect.height });
      }, 100)
    );
   
    console.log("useeffect is called");
    resizeObserver.observe(contentRef.current);

    let extremeValues;
    if (!showDerivative) {
      extremeValues = findMinMax(inputData,false)
      console.log("**********",extremeValues);
      setRenderedChart(
        <>
          {inputData.map((dataItem, index) => (
          <div className="chart-container" key={dataItem[0]}>
            <ScatterPlot inputData={dataItem[1]} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues}/>
            <CheckBox id={dataItem[0]} onCheck={handleCheckBoxChange} />
          </div>
          ))}
          <ScatterPlot_overview inputData={calculateAverage(inputData,false)} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues}></ScatterPlot_overview>
        </>
      );
    }else{
      extremeValues = findMinMax(inputData,true)
      setRenderedChart(
        <>
          {inputData.map((dataItem, index) => (
          <div className="chart-container" key={dataItem[0]}>
            <ScatterPlot inputData={dataItem[2]} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues}/>
            <CheckBox id={dataItem[0]}  onCheck={handleCheckBoxChange} />
          </div>
          ))}
          <ScatterPlot_overview inputData={calculateAverage(inputData,true)} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues}></ScatterPlot_overview>
        </>
      );
    }
  
    return () => resizeObserver.disconnect();
  }, [size.width, size.height, inputData, xscale, yscale, showDerivative]);
  


  return (
    <>
      {size.width !== 0 && size.height !== 0 ? renderedChart : null}
      {/* <ScatterPlot inputData={inputData} xscale={xscale} yscale={yscale} /> */}
    </>
  );
}

export default Content;



