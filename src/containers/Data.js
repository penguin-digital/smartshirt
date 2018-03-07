import React from 'react'
import battery from '../assets/icons/battery.svg'
import color from '../assets/icons/color.svg'
import heart from '../assets/icons/heart.svg'
import temp from '../assets/icons/temp.svg'

const Data = props => {
  const { data } = props

  return (
    <div className="ph4 mw8 wrapper relative">
      <div className="relative container w-90 center">
        <div className="f2 fw6 pv4">Sensor Daten</div>
        <div className="flex flex-wrap">
          <div className="f3 pv4 w-50">
            <div className="pv2">Temperatur</div>
            <div className="flex items-center">
              <img src={temp} alt="" className="h2" />
              <div className="f2 fw6 ph3">{data.temp.toFixed(3)}°C</div>
            </div>
          </div>
          <div className="f3 pv4 w-50">
            <div className="pv2"> Heartrate</div>
            <div className="flex items-center">
              <img src={heart} alt="" className="h2" />
              <div className="f2 fw6 ph3">100 bpm</div>
            </div>
          </div>
          <div className="f3 pv4 w-50">
            <div className="pv2">Farbsensor</div>
            <div className="flex items-center">
              <img src={color} alt="" className="h2" />
              <div
                style={{
                  background: `rgb(${data.red},${data.green},${data.blue})`
                }}
                className="mh3 w-20 h2"
              />
            </div>
          </div>
          <div className="f3 pv4 w-50">
            <div className="pv2">Battery level</div>
            <div className="flex items-center">
              <img src={battery} alt="" className="h2" />
              <div className="f2 fw6 ph3">12.4 V</div>
            </div>
          </div>
          <div className="f3 pv4 w-50">
            <div className="pv2">Lux</div>
            <div className="flex items-center">
              <div className="f2 fw6">{data.lux.toFixed(3)}</div>
            </div>
          </div>
          <div className="f3 pv4 w-50">
            <div className="pv2">Color Temperature</div>
            <div className="flex items-center">
              <div className="f2 fw6">{data.color_temp.toFixed(3)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Data
