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
  sendCode = () => {
    const msg = {
      name: 'code',
      value: this.state.source
    }

    this.props.ws.send(JSON.stringify(msg))
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
      <div className="mw7-m wrapper relative">
        <div style={{ marginTop: '60px' }}>
          <div className="blockly-container">
            <div
              ref="blocklyDiv"
              id="blocklyDiv"
              className={`${viewingCode ? 'dn' : ''} blockly`}
              style={{ height: 'calc(100vh - 200px)' }}
            />
            <CodeMirror
              value={source}
              className="display-large large-codemirror"
              options={{
                mode: 'python',
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {}}
            />
          </div>

          <CodeMirror
            value={source}
            className={`code${!viewingCode ? ' hidden' : ''} display-small`}
            options={{
              mode: 'python',
              lineNumbers: true
            }}
            onChange={(editor, data, value) => {}}
          />

          <div
            className="toggle fr btn fw6 mt4 mb4 white pointer f4 tc"
            onClick={this.sendCode}
          >
            Send
          </div>

          <div
            className="toggle fr mr3 btn fw6 mt4 mb4 white pointer f4 tc display-small"
            onClick={this.toggleCode}
          >
            {viewingCode ? 'View Blocks' : 'View Code'}
          </div>
        </div>
      </div>
    )
  }
}

export default BlocklyEditor
