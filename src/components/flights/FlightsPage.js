import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightsList from "./FlightsList";
import { toast } from "react-toastify";
// import { Watch } from "react-loader-spinner";
import Loader from "rsuite/Loader";

const FlightsPage = ({ flights, listFlights }) => {
  useEffect(() => {
    if (flights.length === 0) {
      listFlights()
        .then(() => toast.success("Flights fetched"))
        .catch((error) => {
          alert("Loading flights failed" + error);
        });
    }
  }, []);

  return (
    <>
      {flights.length === 0 ? (
        <Loader
          content="Loading"
          size="lg"
          vertical
          center
          speed="slow"
          style={{ color: "#660033" }}
        />
      ) : (
        <FlightsList flights={flights} />
      )}
    </>
  );
};

FlightsPage.propTypes = {
  flights: PropTypes.array.isRequired,
  listFlights: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights.length === 0 ? [] : state.flights,
  };
}

const mapDispatchToProps = {
  listFlights: flightActions.listFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightsPage);
