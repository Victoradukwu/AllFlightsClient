import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const FlightAddForm = ({onChange, onSubmit, airports, carriers}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <SelectInput
          onChange={onChange}
          name='departurePortId'
          display='name'
          identifier='id'
          label='Departure Port'
          extraClasses='col-md-6 form-group'
          defaultOption='-------------------'
          options={airports}

        />
        <SelectInput
          onChange={onChange}
          name='destinationPortId'
          display='name'
          identifier='id'
          label='Destination Port'
          extraClasses='col-md-6 form-group'
          defaultOption='--------------------'
          options={airports}

        />
      </div>
      <div className='row mt-2'>
        <TextInput
          onChange={onChange}
          name='departureDate'
          label='Departure Date'
          placeholder='YYYY-MM-DD'
          extraClasses='col-md-6 form-group'
        />
        <TextInput
          onChange={onChange}
          name='departureTime'
          label='Departure Time'
          placeholder='HH:mm'
          extraClasses='col-md-6 form-group'
        />
      </div>
      <div className='row mt-2'>
        <TextInput
          onChange={onChange}
          name='duration'
          label='Duration'
          extraClasses='col-md-6 form-group'
        />
        <SelectInput
          onChange={onChange}
          name='carrier'
          display='name'
          identifier='id'
          label='Carrier'
          extraClasses='col-md-6 form-group'
          defaultOption='---------------'
          options={carriers}
        />
      </div>
      <div className='row mt-2'>
        <TextInput
          onChange={onChange}
          name='economyFare'
          label='Economy fare'
          extraClasses='col-md-6 form-group'
        />
        <TextInput
          onChange={onChange}
          name='economyCapacity'
          label='Economy capacity'
          extraClasses='col-md-6 form-group'
        />
      </div>
      <div className='row mt-2'>
        <TextInput
          onChange={onChange}
          name='premiumFare'
          label='Premium fare'
          extraClasses='col-md-6 form-group'
        />
        <TextInput
          onChange={onChange}
          name='premiumCapacity'
          label='Premium capacity'
          extraClasses='col-md-6 form-group'
        />
      </div>
      <div className='row mt-2'>
        <TextInput
          onChange={onChange}
          name='businessFare'
          label='Business fare'
          extraClasses='col-md-6 form-group'
        />
        <TextInput
          onChange={onChange}
          name='businessCapacity'
          label='Business capacity'
          extraClasses='col-md-6 form-group'
        />
      </div>
      <div className='mt-2'>
        <button className='btn float-left'>Submit</button>
      </div>
    </form>
  );
};

FlightAddForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  airports: PropTypes.array.isRequired,
  carriers: PropTypes.array.isRequired
};

export default FlightAddForm;
