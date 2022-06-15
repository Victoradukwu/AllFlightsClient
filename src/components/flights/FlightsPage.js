import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightsList from "./FlightsList";
import { toast } from "react-toastify";
import Loader from "rsuite/Loader";

const FlightsPage = ({ flight, listFlights }) => {
  useEffect(() => {
    if (!("flights" in flight)) {
      listFlights()
        .then(() => toast.success("Flights fetched"))
        .catch((error) => {
          alert("Loading flights failed" + error);
        });
    }
  }, []);

  return (
    <>
      {!("flights" in flight) ? (
        <Loader
          content="Loading"
          size="lg"
          vertical
          center
          speed="slow"
          style={{ color: "#660033" }}
        />
      ) : (
        <FlightsList flights={flight.flights} />
      )}
    </>
  );
};

FlightsPage.propTypes = {
  flight: PropTypes.object.isRequired,
  listFlights: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    flight: state.flight,
  };
}

const mapDispatchToProps = {
  listFlights: flightActions.listFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightsPage);
