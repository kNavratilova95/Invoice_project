/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import PersonStatisticsIndex from "./statistics/PersonStatisticsIndex";

function App() {
  return (
    <Router>
      <div className="container"> 
        <nav className="navbar navbar-expand-md bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto d-flex">
              <li className="nav-item">
                <NavLink to="/persons" className="nav-link" end>
                <img src="/money_icon.png" alt="money_icon" style={{ height: "30px", marginRight: "10px" }} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/persons" className="nav-link" end>
                  Společnosti
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/invoices" className="nav-link" end>
                  Faktury
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/persons/statistics" className="nav-link" end>
                  Statistiky
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route index element={<Navigate to="/persons" />} />

          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
          </Route>

          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
          </Route>
          
          <Route path="/persons/statistics">
            <Route index element={<PersonStatisticsIndex />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;