export default `<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
  <variables></variables>
  <block type="init_strip" x="20" y="20">
    <next>
      <block type="controls_whileUntil" x="20" y="80">
        <field name="MODE">WHILE</field>
        <value name="BOOL">
          <block type="logic_boolean" >
            <field name="BOOL">TRUE</field>
          </block>
        </value>
        <statement name="DO">
          <block type="color_wipe">
            <next>
              <block type="theater_chase">
                <next>
                  <block type="rainbow">
                    <next>
                      <block type="rainbowCycle">
                        <next>
                          <block type="theaterChaseRainbow"></block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </next>
  </block>

</xml>`
