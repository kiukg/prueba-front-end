import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import '../styles/calendarStyle.css';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allDatesState:[],
            dayTimeOptions:[],
            selectedDay:"",
            calendarHours:[],
            selectedHour:""
        }
    }

    hourChanged(e){
        this.setState({ selectedHour: e.target.value });
    }

    setValue = value => {
        this.setState(prevState => ({
            dayTimeOptions:[],
            selectedDay:"",
            calendarHours:[],
            selectedHour:""
        }));
      };

    clickEvent(e){
        this.setValue(null);
        let final= this.props.allDates[e].map(function(dateItem){
            let html=[];
            let hours = new Date(parseFloat(dateItem['initialDay'])).getHours();
            if (hours< 12)
            {
                let divv = <div className="calendar-hours-items-header">Mañana</div>;
                let morningDates = dateItem['interval'].map(function (intervalDate){
                    let hourLabel = new Date((intervalDate));
                    var hours = hourLabel.getHours();
                    hours = ("0" + hours).slice(-2);
                    var minutes = hourLabel.getMinutes();
                    minutes = ("0" + minutes).slice(-2);
                    return <div className="calendar-hours-items"><FormControlLabel  key={`${hours}:${minutes}`} value={`${hours}:${minutes}`} control={<Radio />} label={`${hours}:${minutes}`} /></div>
                });
                morningDates.unshift(divv);
                html.push(morningDates);
            }
            else if (hours >= 12 && hours <= 17)
            {
                let divv = <div className="calendar-hours-items-header">Tarde</div>;
                let afternoonDates= dateItem['interval'].map(function (intervalDate){
                    let hourLabel = new Date((intervalDate));
                    var hours = hourLabel.getHours();
                    hours = ("0" + hours).slice(-2);
                    var minutes = hourLabel.getMinutes();
                    minutes = ("0" + minutes).slice(-2);
                    return <div className="calendar-hours-items"><FormControlLabel  key={`${hours}:${minutes}`} value={`${hours}:${minutes}`} control={<Radio />} label={`${hours}:${minutes}`} /></div>
                });
                afternoonDates.unshift(divv);
                html.push(afternoonDates);
            }
            return html;
        });
        
        this.setState({dayTimeOptions:final});
    }

    serviceChanged(e) {
        let fisrFilter = this.props.allDates[this.state.selectedDay].filter(function(obj){
            return obj['initialDay']== e.value;
        });
        this.setState({calendarHours:fisrFilter[0]['interval']});
    }

    componentWillReceiveProps({allDates}){
        if(typeof allDates == "undefined"){
            this.setValue(null);
        }
    }

      render(){
          if(typeof this.props.allDates=='undefined'){
            return(
                <div>No hay horario disponible</div>
            )
          }
          else{
            let availableDays = Object.keys(this.props.allDates);
           
            return(
                
                <div className="calendar-container">
                    <div className="calendar-col">
                      <div className="availableDays">
                          {
                              availableDays.map(function(date){
                                  var event = new Date(parseFloat(date));
                                  var options = { weekday: 'long',day: 'numeric' };
                                  return <div className='availableDays-item' key={date} onClick={this.clickEvent.bind(this,date)}><div className="badge-item"></div><label className="availableDays-label">{event.toLocaleDateString('es-ES', options)}</label></div>;
                              },this)
                          }
                      </div>
                    </div>
                    <div className="calendar-col">
                      <div className="calendar-dates-container">
                          <div className="calendar-hours" >
                            <RadioGroup 
                                    name="sede"
                                    value={this.state.selectedHour}
                                    onChange={ this.hourChanged.bind(this) }
                                    className="radioButtonCs"
                                    >
                                    {this.state.dayTimeOptions}
                                </RadioGroup>
                          </div>
                      </div>
                    </div>
                </div>
            )
          }
         
      }
}

export default Calendar;
