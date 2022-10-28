import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const FlightFilterModal = ({onChange, onFilter}) =>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="btn btn-solid float-end" type="button" style={{marginRight:'30px'}}>
          Filter flights
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter flights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onFilter}>
            <TextInput
              onChange={onChange}
              name='departure'
              label='Departure Port'
              placeholder=''
              extraClasses='col-md-6 form-group'
            />
            <TextInput
              onChange={onChange}
              name='destination'
              label='Destination Port'
              placeholder=''
              extraClasses='col-md-6 form-group'
            />
            <TextInput
              onChange={onChange}
              name='departureDate'
              label='Departure Date'
              placeholder='yyyy-mm-dd'
              extraClasses='col-md-6 form-group'
            />
            <SelectInput
              onChange={onChange}
              name='departureDate_lookup'
              display='name'
              identifier='id'
              label='Date lookup'
              extraClasses='col-md-6 form-group'
              defaultOption='--------------------'
              options={[{'name': 'On', 'id': 'exact'}, {'name': 'After', 'id': 'gte'}, {'name': 'Before', 'id': 'lte'}]}

            />

                    <hr/>
                    <div className="form-group">
                        <button className="btn btn-solid float-left"  onClick={handleClose}>Submit</button>
                    </div>
                </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

FlightFilterModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default FlightFilterModal;
