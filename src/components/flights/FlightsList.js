import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Whisper, Pagination } from "rsuite";

const FlightsList = ({ flights, pageCount, count, onSelect, activePage }) => {

  return (
    <main>
      <div className="shadow main-outer-div container">
        <h2 style={{ display: "inline" }}>Available Flights</h2>
        <button className="btn btn-solid float-end" type="button" style={{marginRight:'30px'}}>
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
                        flight.classes.find(
                          (cls) => cls.className === "Economy"
                        ).availableSeats
                      }
                    </td>
                    <td>
                      {
                        flight.classes.find(
                          (cls) => cls.className === "Premium"
                        ).availableSeats
                      }
                    </td>
                    <td>
                      {
                        flight.classes.find(
                          (cls) => cls.className === "Business"
                        ).availableSeats
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
          <div>
            <Pagination
              className="mt-3 pb-3 justify-content-center"
              pages={pageCount}
              activePage={activePage}
              prev
              last
              next
              first
              ellipsis
              maxButtons={7}
              onSelect={onSelect}
              total={count}
              layout={["pager", "total"]}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

FlightsList.propTypes = {
  flights: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FlightsList;
