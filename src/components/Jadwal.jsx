import React, { Component, Fragment } from 'react'
import isSameDay from 'date-fns/is_same_day'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days';
import diffInHours from 'date-fns/difference_in_hours'
import startOfDay from 'date-fns/start_of_day'

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

  renderLegends () {
    return (
      <div className="legends">
        <div className="row legends-title">
          <div className="col its-flex justify-center">
          { this.props.legendsTitle }
          </div>
        </div>
        { 
          this.props.items.map((item, idx) => (
            <div className="row item" key={`legend-item-${idx}`}>{ item.name }</div>
          ))
        }
      </div>
    )
  }

  renderHours () {

    const hoursRow = []

    for (let i = 0; i <= 23; i++) {
      hoursRow.push(i)
    }
    return (
      <div className="schedules-header">
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
      <div className="schedules-content">
        <div className="activities">
          {
            items.map((item, idx) => {
              const daySchedules = item.schedules.filter(schedule => 
                isSameDay(schedule.start_date, selectedDay)
              ).map(sch => {
                return ({
                  ...sch,
                  distFromStartOfDay: diffInHours(sch.start_date, startOfDay(sch.start_date)),
                  duration: diffInHours(sch.end_date, sch.start_date)
                })
              })

              return (
                <div className="row activities-group align-items-center" key={`activity-${item.name}-${idx}`}>
                  {
                    daySchedules.map((dsch, idx) => (
                      <div className="activity"
                        style={{
                          left: `${dsch.distFromStartOfDay * 100}px`,
                          width: `${dsch.duration * 100}px `
                        }}
                      >{ dsch.desc }</div>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
        {
          items.map((item, idx) => {
            const cells = []

            for (let i = 0; i < 24; i++) {
              cells.push(
              <Fragment>
                <div className="col cell time its-flex justify-center">
                </div>
                <div className="col cell time its-flex justify-center">
                </div>
              </Fragment>)
            }

            return (
              <div className="row" style={{
                borderTop: idx === 0 ? 'solid 1px #ccc': 'none'
              }} 
              key={`schedule-item-${item.name}`}>
                {
                  cells.map((c, idx) => (
                    <Fragment key={`cell-${item.name}-${idx}`}>
                      { c }
                    </Fragment>
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
          { this.renderLegends() }
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