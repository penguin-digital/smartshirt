import React, { Component } from 'react'
import Blockly from 'node-blockly/browser'

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer'

class BlocklyEditor extends Component {
  render() {
    return (
      <div style={{ marginTop: '60px' }}>
        <BlocklyDrawer
          workspaceXML={'<xml id="toolbox" style="height: 600px"></xml>'}
        >
          <Category name="Logic" colour="210">
            <Block type="controls_if" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
          </Category>
          <Category name="Loops" colour="120">
            <Block type="controls_repeat_ext" />
            <Block type="controls_whileUntil" />
          </Category>
          <Category name="Math" colour="230">
            <Block type="math_number" />
            <Block type="math_arithmetic" />
            <Block type="math_single" />
          </Category>
          <Category name="Text" colour="20">
            <Block type="text" />
            <Block type="text_length" />
            <Block type="text_print" />
          </Category>
          <Category name="Variables" colour="330" custom="VARIABLE" />
          <Category name="Functions" colour="290" custom="PROCEDURE" />
        </BlocklyDrawer>
      </div>
    )
  }
}

export default BlocklyEditor
