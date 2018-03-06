import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import xmlCode from './toolbox'
import workspaceCode from './workspace'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'

class BlocklyEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewingCode: false,
      source: ''
    }

    this.codeMirrorOtions = {
      lineNumbers: true,
      mode: 'python',
      readOnly: true
    }

    this.Blockly = window.Blockly
  }
  updateCode = newCode => {
    this.setState({
      source: newCode
    })
  }
  toggleCode = () => {
    this.refs.code.getCodeMirror().refresh()
    this.setState({
      viewingCode: !this.state.viewingCode
    })
  }
  componentDidMount() {
    const workspace = this.Blockly.inject('blocklyDiv', {
      toolbox: xmlCode
    })

    this.Blockly.Xml.domToWorkspace(
      this.Blockly.Xml.textToDom(workspaceCode),
      workspace
    )

    workspace.addChangeListener(() => {
      this.setState({
        source: this.Blockly.Python.workspaceToCode(workspace)
      })
    })
  }
  render() {
    const { viewingCode, source } = this.state
    console.log(source)
    return (
      <div style={{ marginTop: '60px' }}>
        <div
          className="toggle btn absolute fw6 mt4 mb4 white pointer f4 tc"
          onClick={this.toggleCode}
        >
          {viewingCode ? 'View Blocks' : 'View Code'}
        </div>

        <CodeMirror
          autoFocus
          ref="code"
          className={`${!viewingCode ? 'dn' : ''}`}
          value={source[0]}
          onChange={this.updateCode}
          options={this.codeMirrorOtions}
        />
        <div
          ref="blocklyDiv"
          id="blocklyDiv"
          className={`${viewingCode ? 'dn' : ''}`}
          style={{ height: '90vh', width: '100%' }}
        />
      </div>
    )
  }
}

export default BlocklyEditor
