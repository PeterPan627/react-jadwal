import React, { Component } from 'react';

import Jadwal from './components/Jadwal'

import './App.css';

const items = [{
  "id":656,
  "name":"APL25-01",
  "schedules":[
    {"status_id":205,"start_date":"2018-08-23T07:30:00.000Z","end_date":"2018-08-23T09:00:00.000Z","id":920,"booking_id":813, "desc": 'Booking ID - 813'},
    {"status_id":202,"start_date":"2018-08-24T10:00:00.000Z","end_date":"2018-08-24T12:00:00.000Z","id":1048,"booking_id":910, "desc": 'Booking ID - 910'},
    {"status_id":202,"start_date":"2018-08-24T22:00:00.000Z","end_date":"2018-08-24T23:00:00.000Z","id":1048,"booking_id":910, "desc": 'Booking ID - 910'}]
  },
  {
    "id":657,
    "name":"APL25-03",
    "schedules":[]
  },
  {
    "id":657,
    "name":"APL25-04",
    "schedules":[]
  },
  {
    "id":657,
    "name":"APL25-05",
    "schedules":[]
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
       <Jadwal legendsTitle={'Rooms'} items={items} 
       onActivityClick={ (activity) => console.log(activity)}
       onCellClick={ (cellHour) => console.log('cell hour', cellHour)}/>
      </div>
    );
  }
}

export default App;
