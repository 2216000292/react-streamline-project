import React, {useRef , useEffect}  from 'react';
import ThreeD from './ThreeD';
import './styles.css';
import data from './sep1.json';
import Content from './Content';
import { removeZeroValuesAndEmptyObjects,findMinimums,classifyData,transformArray } from './dataProcessing/dataProcess'; 


function Vis(){
  const contentRef = useRef(null);
  const [inputData, setInputData] = React.useState(transformArray(classifyData(findMinimums(removeZeroValuesAndEmptyObjects(data)))));
  const [showDerivative, setShowDerivative] = React.useState(true);

  const toggleDerivative = () => {
    setShowDerivative(prevState => !prevState);
  };

  return (

      <div className="container">
        <ThreeD/>
        <input
          type="checkbox"
          id="show-derivative-checkbox"
          checked={showDerivative}
          onChange={toggleDerivative}
        />
        <div className="resizer"></div>
        
        <div className="content" id="content" ref={contentRef}>
          {inputData && inputData.length > 0 ? <Content inputData={inputData} contentRef={contentRef} showDerivative={showDerivative}/> : null}
        </div>

      </div>

  )

  
}

export default Vis;

