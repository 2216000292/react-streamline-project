import React, {useRef}  from 'react';
import ThreeD from './ThreeD';
import './styles.css';
import data from './sep1.json';
import Content from './Content';
import CheckBoxControlBar from './CheckBox_ControlBar';
import { removeZeroValuesAndEmptyObjects,findMinimums,classifyData,transformArray } from './dataProcessing/dataProcess'; 


function Vis(){
  const contentRef = useRef(null);
  const [inputData, setInputData] = React.useState(transformArray(classifyData(findMinimums(removeZeroValuesAndEmptyObjects(data)))));
  const [showDerivative, setShowDerivative] = React.useState(true);
  const [showGradient, setShowGradient] = React.useState(false);
  const [unselectAll, setunselectAll] = React.useState(false);
  const toggleDerivative = () => {
    setShowDerivative(prevState => !prevState);
  };

  const toggleGradient = () => {
    setShowGradient(prevState => !prevState);
  };

  const toggleUnselectAll = () => {
    const targetBoolean = !unselectAll;
    setunselectAll(targetBoolean);

    const updatedData = inputData.map(item => {
        if (item[3] !== undefined) {
            item[3] = targetBoolean;
        }
        return item;
    });

    setInputData(updatedData);
};


  return (

      <div className="container">
        <ThreeD/>
        <div className="resizer"></div>
        
        <div className="content" id="content" ref={contentRef}>
          <CheckBoxControlBar checked={showDerivative} onChange={toggleDerivative} label="Toggle to the representation of derivative" />
          <CheckBoxControlBar checked={showGradient} onChange={toggleGradient} label="Toggle to the representation of gradient" />
          <CheckBoxControlBar checked={unselectAll} onChange={toggleUnselectAll} label="Select / Unselect All" />
          {inputData && inputData.length > 0 ? <Content inputData={inputData} setInputData={setInputData} contentRef={contentRef} showDerivative={showDerivative} showGradient={showGradient}/> : null}
        </div>

      </div>

  )

  
}

export default Vis;

