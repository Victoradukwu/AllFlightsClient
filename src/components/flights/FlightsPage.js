import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as flightActions from "../../redux/actions/flightActions";
import PropTypes from "prop-types";
import FlightsList from "./FlightsList";
import { toast } from "react-toastify";
import Loader from "rsuite/Loader";
import {useNavigate} from "react-router-dom";

const FlightsPage = ({ flight, listFlights}) => {

  const navigate = useNavigate();
  const [query, setQuery] = useState({'page': 1});

  const handlePageChange = (event) => setQuery(prevQuery => ({...prevQuery, 'page': Number(event)}))

  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value
    }));
  };

  const fetchNewFlightsPage = () => {
    let query1 = ''
    for (const [key, value] of Object.entries(query)) {
      query1 += `&${key}=${value}`;
}
    let query2 = query1.replace('&', '?')
    listFlights(query2)
      // .then(() => toast.success("Flights fetched"))
      .catch((error) => {
        toast.error("Loading flights failed" + error);
      });
  };

  const editFlight = (event)=>{
    const id = event.target.parentElement.key
    navigate(`/flights/${id}`)
  }

  useEffect(fetchNewFlightsPage, [query.page]);

  const handleFilter = (event) =>{
    event.preventDefault();
    fetchNewFlightsPage();
  }
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
          activePage={query.page}
          onSelect={handlePageChange}
          editFlight={editFlight}
          onChange={handleChange}
          onFilter={handleFilter}
        />
      )}
    </>
  );
};

FlightsPage.propTypes = {
  flight: PropTypes.object.isRequired,
  listFlights: PropTypes.func.isRequired
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
