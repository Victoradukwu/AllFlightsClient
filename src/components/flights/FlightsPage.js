import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightsList from "./FlightsList";
import { toast } from "react-toastify";
import Loader from "rsuite/Loader";

const FlightsPage = ({ flight, listFlights }) => {

  const [activePage, setActivePage] = useState(1);
  const handlePageChange = (event) => setActivePage(Number(event))

  const fetchNewFlightsPage = () => {
    listFlights(activePage)
      .then(() => toast.success("Flights fetched"))
      .catch((error) => {
        toast.error("Loading flights failed" + error);
      });
  };

  useEffect(fetchNewFlightsPage, [activePage]);

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
        <FlightsList
          flights={flight.flights}
          count={flight.count}
          pageCount={flight.pageCount}
          activePage={activePage}
          onSelect={handlePageChange}
        />
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
