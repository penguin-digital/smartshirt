import Blockly from 'node-blockly/browser'

Blockly.Blocks['init_strip'] = {
  init: function() {
    this.jsonInit({
      message0: 'Initialise strip',
      "nextStatement": null,
      colour: 160,
      tooltip: 'Import all from smartshirt, fire Adafruit_NeoPixel and strip.begin().',
      helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp'
    })
  }
}


Blockly.Python['init_strip'] = function(block) {
  return ['from smartshirt import *\nstrip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)\nstrip.begin()\n'];
};

Blockly.Blocks['color_wipe'] = {
  init: function() {
    this.jsonInit({
      "type": "color_wipe",
      "message0": "Color Red %1 Green %2 Blue %3 %4",
      "args0": [
        {
          "type": "field_number",
          "name": "Red",
          "value": 0,
          "min": 0,
          "max": 255
        },
        {
          "type": "field_number",
          "name": "Green",
          "value": 0,
          "min": 0,
          "max": 255
        },
        {
          "type": "field_number",
          "name": "Blue",
          "value": 0,
          "min": 0,
          "max": 255
        },
        {
          "type": "input_value",
          "name": "Color Wipe"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Select colorWipe color",
      "helpUrl": ""
    })
  }
}

Blockly.Python['color_wipe'] = function(block) {
  var number_red = block.getFieldValue('Red');
  var number_green = block.getFieldValue('Green');
  var number_blue = block.getFieldValue('Blue');
  var value_color_wipe = Blockly.JavaScript.valueToCode(block, 'Color Wipe', Blockly.JavaScript.ORDER_ATOMIC);

  return `colorWipe(strip, Color(${number_red}, ${number_green}, ${number_blue}))\n`;
};

export default `<xml id="toolbox" style="display: none">
    <category name="Smartshirt">
      <block type="init_strip"></block>
      <block type="color_wipe"></block>
    </category>
    <category name="Logic">
      <category name="If">
        <block type="controls_if"></block>
        <block type="controls_if">
          <mutation else="1"></mutation>
        </block>
        <block type="controls_if">
          <mutation elseif="1" else="1"></mutation>
        </block>
      </category>
      <category name="Boolean">
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>
    </category>
    <category name="Loops">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <field name="VAR">i</field>
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
        <value name="BY">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="Math">
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_constant"></block>
      <block type="math_number_property"></block>
      <block type="math_round"></block>
      <block type="math_on_list"></block>
      <block type="math_modulo"></block>
      <block type="math_constrain">
        <value name="LOW">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="HIGH">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_float"></block>
    </category>
    <category name="Lists">
      <block type="lists_create_empty"></block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat">
        <value name="NUM">
          <block type="math_number">
            <field name="NUM">5</field>
          </block>
        </value>
      </block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf"></block>
      <block type="lists_getIndex"></block>
      <block type="lists_setIndex"></block>
    </category>
    <category name="Variables" custom="VARIABLE"></category>
    <category name="Functions" custom="PROCEDURE"></category>
  </xml>`
