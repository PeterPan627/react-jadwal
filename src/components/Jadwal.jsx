import React, { Component, Fragment } from 'react'

import isSameDay from 'date-fns/is_same_day'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import diffInMinutes from 'date-fns/difference_in_minutes'
import startOfDay from 'date-fns/start_of_day'
import { setHours, setMinutes } from 'date-fns'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import './Jadwal.css'

library.add(faChevronLeft)
library.add(faChevronRight)


class Jadwal extends Component {
  state = {
    selectedDay: new Date(),
    currentDay: new Date()
  }

  goToNextDay = () => {
    this.setState(({ selectedDay }) => ({
      selectedDay: addDays(selectedDay, 1)
    }), () => this.props.onDateChange(this.state.selectedDay)) 
  }

  goToPrevDay = () => {
    this.setState(({ selectedDay }) => ({
      selectedDay: addDays(selectedDay, -1)
    }), () => this.props.onDateChange(this.state.selectedDay))
  }

  handleClickActivity = (activity) => {
    this.props.onActivityClick(activity)
  }

  handleClickCell = (start, end) => {
    let cellStartHour = setHours(this.state.selectedDay, start.hour)
    cellStartHour = setMinutes(cellStartHour, start.minute)
    let cellEndHour = setHours(this.state.selectedDay, end.hour)
    cellEndHour = setMinutes(cellEndHour, end.minute)

    this.props.onCellClick({
      start: cellStartHour,
      end: cellEndHour
    })
  }

  renderLegends () {
    return (
      <div className="legends">
        <div className="j-row legends-title">
          <div className="j-col its-flex justify-center">
          { this.props.legendsTitle }
          </div>
        </div>
        { 
          this.props.items.map((item, idx) => (
            <div className="j-row item" key={`legend-item-${idx}`}>
              { item.name }
            </div>
          ))
        }
      </div>
    )
  }

  renderHours () {

    const hoursRow = []
    const hourCell = (num) => {
      if (num > 12) {
        return `${num-12}pm`
      }
      return `${num}am`
    }
    for (let i = 0; i <= 23; i++) {
      hoursRow.push(hourCell(i))
    }
    return (
      <div className="schedules-header">
        <div className="hours j-row" >
        {
          hoursRow.map(hour => (
            <div className="j-col time its-flex justify-center hour" key={`hour-head-${hour}`}>{ hour }</div>
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
                const minutesDistFromStartOfDay = diffInMinutes(sch.start_date, startOfDay(sch.start_date))
                const numOfCellsDist = minutesDistFromStartOfDay / 30
                const durationInMinutes = diffInMinutes(sch.end_date, sch.start_date)
                const numOfCellsDuration = durationInMinutes / 30
                return ({
                  ...sch,
                  distFromStartOfDay: numOfCellsDist,
                  duration: numOfCellsDuration
                })
              })
              return (
                <div className="j-row activities-group align-items-center" key={`activity-${item.name}-${idx}`}>
                  {
                    daySchedules.map((dsch, idx) => (
                      <div className="activity"
                        style={{
                          left: `${dsch.distFromStartOfDay * 50}px`,
                          width: `${dsch.duration * 50}px `
                        }}
                        onClick={ () => this.handleClickActivity(dsch) }
                        key={`activity-item${idx}`}
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
                <div className="j-col cell time its-flex justify-center" 
                onClick={() => this.handleClickCell({
                  hour: i, 
                  minute: 0
                }, {
                  hour: i, 
                  minute: 30
                })}>
                </div>
                <div className="j-col cell time its-flex justify-center"
                onClick={() => this.handleClickCell({
                  hour: i, 
                  minute: 30
                }, {
                  hour: i+1, 
                  minute: 0
                })}>
                </div>
              </Fragment>)
            }

            return (
              <div className="j-row" style={{
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
      <div id="jadwal">
        <div className="j-row align-center justify-center">
          <button onClick={ this.goToPrevDay } className="j-btn">
            <FontAwesomeIcon icon="chevron-left" />
          </button>
          <p className="selected-day">{ format(this.state.selectedDay, 'dddd, D MMMM YYYY') }</p>
          <button onClick={ this.goToNextDay } className="j-btn">
            <FontAwesomeIcon icon="chevron-right" />
          </button>
        </div>
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