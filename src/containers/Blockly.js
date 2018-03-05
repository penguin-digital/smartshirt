import React, { Component } from 'react'
import Blockly from 'node-blockly/browser'
import xmlCode from './toolbox'
import workspaceCode from './workspace'

class BlocklyEditor extends Component {
  componentDidMount() {
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: xmlCode
    })

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(workspaceCode), workspace)

    workspace.addChangeListener(() => {
      console.log(Blockly.Python.workspaceToCode(workspace))
    })
  }
  render() {
    return (
      <div style={{ marginTop: '60px' }}>
        <div
          ref="blocklyDiv"
          id="blocklyDiv"
          style={{ height: '600px', width: '100%' }}
        />
      </div>
    )
  }
}

export default BlocklyEditor
