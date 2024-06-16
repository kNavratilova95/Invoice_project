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

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";
const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [buyer, setBuyer] = useState([]);
    const [seller, setSeller] = useState([]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => { //load data about person with this id
            setPerson(data);
            apiGet(`/api/identification/${data.identificationNumber}/sales`).then((salesData) => setSeller(salesData)); //load data about sales invoices
            apiGet(`/api/identification/${data.identificationNumber}/purchases`).then((purchasesData) => setBuyer(purchasesData)); //load data about purchases invoices
        });
    }, [id]);

    return (
        <>
            <div>
                <h1>Detail společnosti</h1>
                <button className="return_button" >
                    <Link to={`/persons`}>Zpět</Link>
                </button>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br />
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br />
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br />
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {person.note}
                </p>
                <br />
                <h3>Vystavené faktury:</h3>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID faktury</th>
                            <th>Číslo faktury</th>
                            <th>Odběratel</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th>DPH</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seller.map((inv) => (
                            <tr key={inv._id}>
                                <td>{inv._id}</td>
                                <td>{inv.invoiceNumber}</td>
                                <td><Link to={`/persons/show/${inv.buyer._id}`}>{inv.buyer.name}</Link></td>
                                <td>{inv.product}</td>
                                <td>{inv.price}</td>
                                <td>{inv.vat}%</td>
                                <td>{inv.issued}</td>
                                <td>{inv.dueDate}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <br />
                <h3>Přijaté faktury:</h3>
                <table className="table table-striped  table-hover table-sm table-responsive-lg">
                    <thead>
                        <tr>
                            <th>ID faktury</th>
                            <th>Číslo faktury</th>
                            <th>Dodavatel</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th>DPH</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyer.map((inv) => (
                            <tr key={inv._id}>
                                <td>{inv._id}</td>
                                <td>{inv.invoiceNumber}</td>
                                <td><Link to={`/persons/show/${inv.seller._id}`}>{inv.seller.name}</Link></td>
                                <td>{inv.product}</td>
                                <td>{inv.price}</td>
                                <td>{inv.vat}%</td>
                                <td>{inv.issued}</td>
                                <td>{inv.dueDate}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PersonDetail;