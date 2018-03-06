import React, { Component } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

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
  toggleCode = () => {
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

    return (
      <div style={{ marginTop: '60px' }}>
        <div
          className="toggle btn absolute fw6 mt4 mb4 white pointer f4 tc"
          onClick={this.toggleCode}
        >
          {viewingCode ? 'View Blocks' : 'View Code'}
        </div>

        <div
          ref="blocklyDiv"
          id="blocklyDiv"
          className={`${viewingCode ? 'dn' : ''}`}
          style={{ height: '90vh', width: '100%' }}
        />

        <CodeMirror
          value={source}
          className={`${!viewingCode ? 'hidden' : ''}`}
          options={{
            mode: 'python',
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {}}
        />
      </div>
    )
  }
}

export default BlocklyEditor
