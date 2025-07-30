/**
 * @author: Masooma Rubab
 * @datetime : 12 June 2023
 * @description : Ticket-ID not found page
 */

import React from "react";

const NotFoundPage = ({ notFoundMessage }) => {
  return (
    <>
      <div className="card-view" style={{ backgroundColor: "#FFE7E7" }}>
        <div className="panel-body">
          <div className="">
            <div>
              <h6 className="font-16 text-center text-danger">
                {/* Invalid User ID/Ticket ID  */}
                {notFoundMessage}
                <br />
                {/* Due to Ticket ID not found, your ticket was not generated. */}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
