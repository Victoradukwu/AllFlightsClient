import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Whisper } from "rsuite";
// import ReactTooltip from "react-tooltip";
// import { Link } from "react-router-dom";

const FlightsList = ({ flights }) => (
  <main>
    <div className="shadow main-outer-div container">
      <h2 style={{ display: "inline" }}>Available Flights</h2>
      <button className="btn btn-solid float-end" type="button">
        Filter flights
      </button>
      <div className="shadow">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Time</th>
              <th>Date</th>
              <th>Economy</th>
              <th>Premium</th>
              <th>Business</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => {
              return (
                <tr key={flight.id}>
                  <td>{flight.carrierName}</td>
                  <Whisper
                    trigger="hover"
                    placement="topStart"
                    followCursor
                    speaker={<Tooltip>{flight.departurePort.name}</Tooltip>}
                  >
                    <td>{flight.departurePort.code}</td>
                  </Whisper>
                  <Whisper
                    trigger="hover"
                    placement="topStart"
                    followCursor
                    speaker={<Tooltip>{flight.destinationPort.name}</Tooltip>}
                  >
                    <td>{flight.destinationPort.code}</td>
                  </Whisper>
                  <td>{flight.departureTime}</td>
                  <td>{flight.departureDate}</td>
                  <td>
                    {
                      flight.classes.find((cls) => cls.className === "Economy")
                        .availableSeats
                    }
                  </td>
                  <td>
                    {
                      flight.classes.find((cls) => cls.className === "Premium")
                        .availableSeats
                    }
                  </td>
                  <td>
                    {
                      flight.classes.find((cls) => cls.className === "Business")
                        .availableSeats
                    }
                  </td>
                  <td>
                    <a href="#">
                      <button className="btn">Buy Ticket</button>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container mt-3 pb-2">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
);

FlightsList.propTypes = {
  flights: PropTypes.array.isRequired,
};

export default FlightsList;
