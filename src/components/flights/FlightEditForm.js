import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const FlightEditForm = ({onChange, onSubmit, airports, carriers, flight}) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled id="form-fieldset">
                <div className="row">
                  <SelectInput
                      onChange={onChange}
                      name='departurePortId'
                      display='name'
                      identifier='id'
                      label='Departure Port'
                      extraClasses='col-md-6 form-group'
                      defaultOption='-----------------------'
                      options={airports}
                    />
                  <SelectInput
                    onChange={onChange}
                    name='destinationPortId'
                    display='name'
                    identifier='id'
                    label='Destination Port'
                    extraClasses='col-md-6 form-group'
                    defaultOption='-------------------------'
                    options={airports}
                  />
                </div>
                <div className="row mt-2">
                   <SelectInput
                    onChange={onChange}
                    name='status'
                    display='text'
                    identifier='text'
                    label='Status'
                    extraClasses='col-md-6 form-group'
                    defaultOption={flight.status}
                    options={[{'text': 'Active'}, {'text': 'Inactive'}]}
                    value={flight.status}

                  />
                   <TextInput
                    onChange={onChange}
                    name='flightNumber'
                    label='Flight number'
                    // placeholder='YYYY-MM-DD'
                    extraClasses='col-md-6 form-group'
                    value={flight.flightNumber}
                  />
                </div>
                 <div className="row mt-2">
                     <TextInput
                      onChange={onChange}
                      name='departureDate'
                      label='Departure Date'
                      placeholder='YYYY-MM-DD'
                      extraClasses='col-md-6 form-group'
                      value={flight.departureDate}
                    />
                   <TextInput
                      onChange={onChange}
                      name='departureTime'
                      label='Departure Time'
                      placeholder='HH:mm'
                      extraClasses='col-md-6 form-group'
                      value={flight.departureTime}
                    />
                 </div>
                <div className="row mt-2">
                   <TextInput
                    onChange={onChange}
                    name='duration'
                    label='Duration'
                    extraClasses='col-md-6 form-group'
                    value={flight.duration}
                  />
                  <SelectInput
                    onChange={onChange}
                    name='carrier'
                    display='name'
                    identifier='id'
                    label='Carrier'
                    extraClasses='col-md-6 form-group'
                    defaultOption='--------------------'
                    options={carriers}
                  />
                </div>
                <div className="row">
                   <TextInput
                    onChange={onChange}
                    name='economyFare'
                    label='Economy fare'
                    extraClasses='col-md-6 form-group'
                    value={flight.classes.find(cls=>cls.className==='Economy').fare}
                  />
                  <TextInput
                    onChange={onChange}
                    name='premiumFare'
                    label='Premium fare'
                    extraClasses='col-md-6 form-group'
                    value={flight.classes.find(cls=>cls.className==='Premium').fare}
                  />
                </div>
                <div className="row">
                  <TextInput
                    onChange={onChange}
                    name='businessFare'
                    label='Business fare'
                    extraClasses='col-md-6 form-group'
                    value={flight.classes.find(cls=>cls.className==='Business').fare}
                  />
                </div>
          <hr/>
                   <div className="row mt-2">
                       <div className="form-group col-md-6">
                           <button className="btn float-left" style={{"display": "none"}} type="submit" id="submit">Submit</button>
                       </div>
                       <div className="form-group col-md-6">
                           <button className="btn float-end" style={{"display": "none"}}  type="button" id="delete">Delete</button>
                       </div>
                   </div>
                  </fieldset>
    </form>
  );
};

FlightEditForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  airports: PropTypes.array.isRequired,
  carriers: PropTypes.array.isRequired,
  flight: PropTypes.object.isRequired
};

export default FlightEditForm;
