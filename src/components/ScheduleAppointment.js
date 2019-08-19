import React from 'react';
import ReactDOM from 'react-dom';
// import Select from "react-select";
import Calendar from './Calendar';

// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Label from '@material-ui/core/FormLabel';
import '../styles/scheduleStyle.css';

let options =[];
let radioOptions =[];

class ScheduleAppointment extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { serviceList:[],selectedService:"",selectedSede:"",filteredDates: []}
        this.serviceChanged = this.serviceChanged.bind(this);
        this.sedeChanged = this.sedeChanged.bind(this);
        this.searchClick = this.searchClick.bind(this);
      }

      serviceChanged(e) {
          this.setState({ selectedService: e.target.value });
      }

      sedeChanged(e) {
        this.setState({ selectedSede: e.target.value });
      }

      setValue = value => {
        this.setState(prevState => ({
            filteredDates:[]
        }));
      };

      searchClick(e){
        this.setValue(null);
        let schedules = require('../data/schedule.json');
        let sedeFilter = this.state.selectedSede;
        let serviceFilter = this.state.selectedService;

        let filteredBySede = schedules[sedeFilter];
        if(typeof filteredBySede!="undefined"){
            let filteredByService = filteredBySede[serviceFilter];
            this.setState({filteredDates:filteredByService});
        }
      }

      loadServices(){
        let services = require('../data/services.json');
        this.state.serviceList = services.map(service => {
            return <MenuItem key={service["_id"]} value={service["_id"]}>{service["name"]}</MenuItem>
        });

        return this.state.serviceList;
      }

    componentDidMount(){
        this.loadServices();
    }

    createRadio(){
        let sedes = require('../data/sedes.json');
        radioOptions = sedes.map(sede => {
             return  <FormControlLabel key={sede["_id"]} value={sede["_id"]} control={<Radio />} label={sede["name"]} />
        });
        return radioOptions;
    }

      render(){
        let { selected } = this.state.selectedSede;
        return(
            <div className="main-container">
                <div className="section-container">
                    <div className="section-header">
                        <span>Agendar Cita</span>
                    </div>
                    <div className="section-body">
                        <div className="section-item">
                            <Label className="labelStyle">Prestación</Label>
                            <FormControl >
                                <Select
                                    value={this.state.selectedService}
                                    onChange={this.serviceChanged.bind(this)}
                                    input={<Input name="cbService" id="cbService" />}
                                >
                                    {this.loadServices()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="section-item">
                            <Label className="labelStyle">Sede</Label>
                            <RadioGroup row
                                aria-label="Sede"
                                name="sede"
                                onChange={ this.sedeChanged.bind(this) }
                                value={selected}
                                >
                                {this.createRadio()}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="section-footer">
                        <Button color="primary" className="btn-search" onClick={() => this.searchClick()}>Buscar disponibilidad</Button>
                    </div>

                </div>

                <div className="section-container">
                    <div className="section-header">
                        <span>Tilt Test</span>
                    </div>
                    <div className="section-body">
                        <Calendar allDates={this.state.filteredDates} />
                    </div>
                    <div className="section-footer">
                    </div>
                </div>
                
            </div>
        )
      }
}

export default ScheduleAppointment;
