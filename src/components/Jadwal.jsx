import React, { Component } from 'react'
import isSameDay from 'date-fns/is_same_day'
import getHours from 'date-fns/get_hours'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days';

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
        {
          hoursRow.map(hour => (
            <div className="col time its-flex justify-center hour" key={`hour-head-${hour}`}>{ hour }</div>
          ))
        }
        </div>
      </div>
    )
    
  }

  renderSchedules () {
    const { selectedDay } = this.state
    const { items } = this.props
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
              {
                cells.map((c, idx) => (
                  <div className="col time its-flex justify-center" key={`cell-${item.name}-${idx}`}>
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
        <div className="its-flex">
          <div className="legends">
            <div className="row hours">
              <div className="legends-title col time its-flex justify-center hour">{ this.props.legendsTitle }</div>
            </div>
            { 
              this.props.items.map(item => (
                <div className="row">{ item.name }</div>
              ))
            }
          </div>
          <div className="schedule-container">
            { this.renderHours() }
            { this.renderSchedules() }
          </div>
        </div>
      </div>
    );
  }
}

export default Jadwal;