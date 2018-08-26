import React, { Component } from 'react'
import isSameDay from 'date-fns/is_same_day'
import getHours from 'date-fns/get_hours'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days';

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

  goToNextDay = () => {
    this.setState(({ selectedDay }) => ({
      selectedDay: addDays(selectedDay, 1)
    }))
  }

  goToPrevDay = () => {
    this.setState(({ selectedDay }) => ({
      selectedDay: addDays(selectedDay, -1)
    }))
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

  renderSchedules () {
    const { selectedDay } = this.state
    return (
      <div className="schedules">
      {
        items.map(item => {
          const daySchedules = item.schedules.filter(schedule => isSameDay(schedule.start_date, selectedDay))
          const cells = []
    
          for (let i = 0; i <= 23; i++) {
            const idxOfScheduleAtThisHour = daySchedules.findIndex(s => 
              getHours(s.start_date) <= i && getHours(s.end_date) >= i
            )
            const isScheduleExistAtThisHour = idxOfScheduleAtThisHour > -1
    
            if (isScheduleExistAtThisHour) {
              cells.push(1)
            } else {
              cells.push(0)
            }
          }

          return (
            <div className="row" key={`schedule-item-${item.name}`}>
              <div className="col" style={{ flexGrow: 3 }}>{item.name}</div>
              {
                cells.map((c, idx) => (
                  <div className="col its-flex justify-center" key={`cell-${item.name}-${idx}`}>
                    { c === 1 ? 'X' : 'O'}
                  </div>
                ))
              }
            </div>
          )
        })
      }
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Jadwal: { format(this.state.selectedDay, 'dddd D MMMM YYYY') }</h1>
        <button onClick={ this.goToPrevDay }>Prev</button>
        <button onClick={ this.goToNextDay }>Next</button>
        { this.renderHours() }
        { this.renderSchedules() }
      </div>
    );
  }
}

export default Jadwal;