import React from "react";
import {useSelector} from 'react-redux'

const TicketList = () => {
  const own_tickets = useSelector(state => state.flight.own_tickets);

  return (
    <main>
      <div className="shadow main-outer-div container">
        <h2 style={{ display: "inline" }}>My Tickets</h2>
        <div className="shadow">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Passenger</th>
                <th>Carrier</th>
                <th>Departure</th>
                <th>Destination</th>
                <th>Time</th>
                <th>Date</th>
                <th>Ticket Number</th>
                <th>Seat Number</th>
              </tr>
            </thead>
            <tbody>
              {own_tickets && own_tickets.map((ticket) => {
                return (
                  <tr key={ticket.id}>
                    <td>{ticket.firstName + ticket.lastName}</td>
                    <td>{ticket.carrier}</td>
                    <td>{ticket.flyingFrom}</td>
                    <td>{ticket.flyingTo}</td>
                    <td>{ticket.time}</td>
                    <td>{ticket.date}</td>
                    <td>{ticket.ticketNumber}</td>
                    <td>{ticket.seat}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default TicketList;
