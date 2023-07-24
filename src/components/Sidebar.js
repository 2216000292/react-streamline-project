import React from 'react'



function Sidebar(props) {

  // const [dataset,setDataset] = React.useState([])
  const onSubmit = props.onSubmit;
  const [text, setText] = React.useState('');
  const [chartType, setChartType] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();
    onSubmit(text,chartType);
    
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleChartTypeChange(e) {
    setChartType(e.target.value);
  }

  return (
    <div className='sidebar'>
      <form id="my-form" onSubmit={handleSubmit}>
          
          <div id="ember29" className="ace-editor-container ember-view ui-resizable">        
            <textarea id="ember30" name="myInput" className="ember-text-area ember-view accessible-editor resizable" spellCheck="false" value={text} onChange={handleChange}></textarea>
          </div>

          <div className="ui-resizable-handle ui-resizable-s" ></div>

          <div className="control-graph">
            <label htmlFor="chart-type">Chart type:</label>
            <select name="chart-type" id="chart-type" value={chartType} onChange={handleChartTypeChange}>
              <option value="none">None</option>
              <option value="bar-chart">Bar Chart</option>
              <option value="line-chart">Line Chart</option>
              <option value="multiple-line-chart">Multiple Line Chart</option>
            </select>
            <div className="button">
              <button type="submit">Submit</button>
            </div>
        </div>

      </form>
    </div>
  )
}

export default Sidebar;
