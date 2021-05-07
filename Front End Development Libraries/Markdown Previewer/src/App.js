import React from 'react'
import marked from 'marked'
import './App.css'

const renderer = new marked.Renderer();
marked.setOptions({
  breaks: true
})
const placeholder = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      preview: placeholder
    }
  this.onChangehandle = this.onChangehandle.bind(this)
  }

  onChangehandle(event){
    this.setState({
      preview: event.target.value
    })
  }
  
  render(){
  return (
    <div className="App">

      <div id='editor-wrap'>
      <h4 id='editor-head'>Editor</h4>
      <textarea id='editor' value={this.state.preview} onChange={this.onChangehandle}></textarea>
      </div>

      <div id='preview-wrap'> 
      <h4 id='preview-head'>Preview</h4>
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(this.state.preview,{renderer:renderer})}}/>
      </div>

    </div>
  );
}
}

export default App;
