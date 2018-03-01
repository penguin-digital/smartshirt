import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

class Blockly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// Write your code here'
    }

    this.updateCode = this.updateCode.bind(this)
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    })
  }

  render() {
    var options = {
      lineNumbers: false,
      mode: 'javascript'
    }
    return (
      <div className="mt6">
        <p className="f4">
          Language: <b>JavaScript</b>
        </p>
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
      </div>
    )
  }
}

export default Blockly
