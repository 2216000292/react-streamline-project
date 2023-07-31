
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
  //The expected inputData should be an array composed of [index, regular data array , derivative data array, _ ].


  const showDerivative = props.showDerivative
  const showGradient = props.showGradient
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
    if (!showDerivative) {   //If the user didn't checked the checkbox (render regualr data)
      extremeValues = findMinMax(inputData,false)  //Calculate the scale (the second parameter determines whether to use derivative data as input or not).
      setRenderedChart(
        <>
          <ScatterPlot_overview inputData={calculateAverage(inputData,false)} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues} showGradient={showGradient}></ScatterPlot_overview>
          <div className='scrollable-div'>
          {inputData.map((dataItem, index) => (
          <div className="chart-container" key={dataItem[0]}>
            <ScatterPlot inputData={dataItem[1]} xscale={xscale} yscale={yscale} size={{...size, width: size.width - 30}} extremeValues={extremeValues}/>
            <CheckBox id={dataItem[0]} onCheck={handleCheckBoxChange} />
          </div>
          ))}
          </div>
          
        </>
      );
    }else{ //If the user checked the checkbox (render derivative data)
      extremeValues = findMinMax(inputData,true)  //Calculate the scale (the second parameter determines whether to use derivative data as input or not).
      setRenderedChart(
        <>
          <ScatterPlot_overview inputData={calculateAverage(inputData,true)} xscale={xscale} yscale={yscale} size={size} extremeValues={extremeValues} showGradient={showGradient}></ScatterPlot_overview>
          <div className='scrollable-div'>
          {inputData.map((dataItem, index) => (
          <div className="chart-container" key={dataItem[0]}>
            <ScatterPlot inputData={dataItem[2]} xscale={xscale} yscale={yscale} size={{...size, width: size.width - 30}} extremeValues={extremeValues}/>
            <CheckBox id={dataItem[0]}  onCheck={handleCheckBoxChange} />
          </div>
          ))}
          </div>
        </>
      );
    }
  
    return () => resizeObserver.disconnect();
  }, [size.width, size.height, inputData, xscale, yscale, showDerivative,showGradient]);
  


  return (
    <>
      {size.width !== 0 && size.height !== 0 ? renderedChart : null}
      {/* <ScatterPlot inputData={inputData} xscale={xscale} yscale={yscale} /> */}
    </>
  );
}

export default Content;



