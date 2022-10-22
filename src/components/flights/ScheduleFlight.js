import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightAddForm from "./FlightAddForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import Loader from "rsuite/Loader";

const ScheduleFlight = ({scheduleFlight}) => {
  const navigate = useNavigate();

  const [flight, setFlight] = useState({});
  const [carriers, setCarriers] = useState([]);
  const [airports, setAirports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAirports = () => {
  return fetch(`${process.env.API_URL}/airports`)
    .then(resp=>resp.json());
  };

  const getCarriers = () => {
  return fetch(`${process.env.API_URL}/carriers`)
    .then(resp=>resp.json());
};

  useEffect(()=>{
    getAirports().then(airports=>setAirports(airports)).catch(err=>toast.error(err));
    getCarriers().then(carriers=>setCarriers(carriers)).catch(err=>toast.error(err));
    setIsLoading(false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    scheduleFlight(flight)
      .then(() => {
        toast.success("Successfully schedulled a flight");
      })
      .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Error occurred. " + error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value
    }));
  };

  return isLoading?<Loader/>: (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Schedule a flight</h4>
        </div>
        <div className="card-body container">
          <FlightAddForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            airports={airports}
            carriers={carriers}
          />
        </div>
      </div>
    </main>
  );
};

ScheduleFlight.propTypes = {
  scheduleFlight: PropTypes.func.isRequired,
  flight: PropTypes.object
};

const mapDispatchToProps = {
  scheduleFlight: flightActions.scheduleFlight
};

const mapStateToProps = (state) => {
  return {
    carriers: state.flight.carriers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleFlight);
