import React, { Component, Fragment } from 'react'
import isSameDay from 'date-fns/is_same_day'
import getHours from 'date-fns/get_hours'
import format from 'date-fns/format'

const items = [{
  "id":656,
  "name":"APL25-01",
  "schedules":[
    {"status_id":205,"start_date":"2018-08-23T07:00:00.000Z","end_date":"2018-08-23T09:00:00.000Z","id":920,"booking_id":813},
    {"status_id":202,"start_date":"2018-08-24T10:00:00.000Z","end_date":"2018-08-24T12:00:00.000Z","id":1048,"booking_id":910}]
  },
  {
    "id":657,
    "name":"APL25-02",
    "schedules":[]
  }
]

class Jadwal extends Component {
  state = {
    selectedDay: new Date(),
    currentDay: new Date()
  }

  renderHours () {

    const hoursRow = []

    for (let i = 0; i <= 23; i++) {
      hoursRow.push(i)
    }
    return (
      <div className="jadwal-header">
        <div className="hours row" >
        <div className="col its-flex justify-center" style={{ flexGrow: 3 }}>Rooms</div>
        {
          hoursRow.map(hour => (
            <div className="col its-flex justify-center hour" key={`hour-head-${hour}`}>{ hour }</div>
          ))
        }
        </div>
      </div>
    )
    
  }


  render() {
    return (
      <div>
        <h1>Jadwal: { format(this.state.selectedDay, 'dddd d MMMM YYYY') }</h1>
        { this.renderHours() }
        { this.renderSchedules() }
      </div>
    );
  }
}

export default Jadwal;