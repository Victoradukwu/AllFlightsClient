import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightEditForm from "./FlightEditForm";
import { toast } from "react-toastify";
import {useNavigate, useParams} from 'react-router-dom';
import Loader from "rsuite/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {confirmAlert} from "react-confirm-alert";

const FlightEditPage = ({updateFlight, flights, auth, deleteFlight}) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [flight, setFlight] = useState({});
  const [carriers, setCarriers] = useState([]);
  const [airports, setAirports] = useState([]);

  const getAirports = () => {
  return fetch(`${process.env.API_URL}/airports`)
    .then(resp=>resp.json());
  };

  const getCarriers = () => {
  return fetch(`${process.env.API_URL}/carriers`)
    .then(resp=>resp.json());
};

  const deleteFlight_ = ()=>{
    deleteFlight(id)
      .then(() => {
        toast.success(" Flight successfully cancelled");
      })
      .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Delete failed. " + error);
      });
  }

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure to delete?.',
      buttons: [
        {
          label: 'Yes, delete.',
          onClick: () => deleteFlight_()
        },
        {
          label: 'No, go back'
        }
      ]
    });
  };

  const adminOnlyVisibility = ()=>{
    if (auth.user && auth.user.user.roles.includes('admin')){
      return {display: 'block'}
    }else {return {display: 'none'}}
  }

  useEffect(() => {
    const flight = flights.find(flight=>flight.id=parseInt(id))
    setFlight(flight)
  }, []);

  useEffect(()=>{
    getAirports().then(airports=>setAirports(airports)).catch(err=>toast.error(err));
    getCarriers().then(carriers=>setCarriers(carriers)).catch(err=>toast.error(err));
    setIsLoading(false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    updateFlight(flight)
      .then(() => {
        toast.success("Successfully updated a flight");
      })
      .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Error occurred. " + error);
      });
  };

  const handleChange = (event) => {
    console.log(flight)
    const { name, value } = event.target;
    setFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value
    }));
  };

  const activateEdit = () => {
    const elt = document.getElementById("form-fieldset")
    if (elt.hasAttribute("disabled")) {
        elt.removeAttribute("disabled")
        document.getElementById("submit").style.display="block"
        document.getElementById("delete").style.display="block"
    }
    else{
        elt.setAttribute("disabled", null)
        document.getElementById("submit").style.display="none"
        document.getElementById("delete").style.display="none"
    }
  }

  return isLoading?<Loader/>: (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4 style={{'display': 'inline'}}>Flight Details</h4>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={activateEdit}
            style={adminOnlyVisibility()}
            className="float-end" data-bs-toggle="tooltip" title="Click to edit flight details"
          />
        </div>
        <div className="card-body container">
          <FlightEditForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            airports={airports}
            carriers={carriers}
            flight={flight}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
};

FlightEditPage.propTypes = {
  updateFlight: PropTypes.func.isRequired,
  deleteFlight: PropTypes.func.isRequired,
  flight: PropTypes.object,
  flights: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  updateFlight: flightActions.updateFlight,
  deleteFlight: flightActions.deleteFlight
};

const mapStateToProps = (state) => {
  return {
    flights: state.flight.flights,
    auth: state.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightEditPage);
