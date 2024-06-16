import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {apiGet} from "../utils/api";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [buyer, setBuyer] = useState({});
    const [seller, setSeller] = useState({});

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice(data);
                // load information about buyer
                apiGet(`/api/persons/${data.buyer._id}`).then((buyerData) => setBuyer(buyerData));
                // load information about seller
                apiGet(`/api/persons/${data.seller._id}`).then((sellerData) => setSeller(sellerData));
            });
        }
    }, [id]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                    <h1>Detail faktury {invoice.invoiceNumber}</h1>
                    <button className="return_button" >
                        <Link to={`/invoices`}>Zpět</Link>
                    </button>
                    <br />
                    <p>
                        <strong>Pořadí faktury:</strong>
                        <br />
                        {invoice._id}
                    </p>    
                    <p>
                        <strong>Datum vystavení:</strong>
                        <br />
                        {invoice.issued}
                    </p>
                    <p>
                        <strong>Datum splatnosti:</strong>
                        <br />
                        {invoice.dueDate}
                    </p>
                    <p>
                        <strong>Produkt:</strong>
                        <br />
                        {invoice.product}
                    </p>
                    <p>
                        <strong>Cena:</strong>
                        <br />
                        {invoice.price}
                    </p>
                    <p>
                        <strong>DPH:</strong>
                        <br />
                        {invoice.vat}%
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br />
                        {invoice.note}
                    </p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <table className="table table-bordered table-striped table-sm table-responsive-lg">
                        <thead>
                            <tr>
                                <th>Kupující</th>
                                <th>IČO</th>
                                <th>DIČ</th>
                                <th>Bankovní účet</th>
                                <th>Telefon</th>
                                <th>Mail</th>
                                <th>Město</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to={`/persons/show/${buyer._id}`}>{buyer.name}</Link></td>
                                <td>{buyer.identificationNumber}</td>
                                <td>{buyer.taxNumber}</td>
                                <td>{buyer.accountNumber}/{buyer.bankCode}</td>
                                <td>{buyer.telephone}</td>
                                <td>{buyer.mail}</td>
                                <td>{buyer.city}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Prodávající</th>
                                <th>IČO</th>
                                <th>DIČ</th>
                                <th>Bankovní účet</th>
                                <th>Telefon</th>
                                <th>Mail</th>
                                <th>Město</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to={`/persons/show/${seller._id}`}>{seller.name}</Link></td>
                                <td>{seller.identificationNumber}</td>
                                <td>{seller.taxNumber}</td>
                                <td>{seller.accountNumber}/{seller.bankCode}</td>
                                <td>{seller.telephone}</td>
                                <td>{seller.mail}</td>
                                <td>{seller.city}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default InvoiceDetail;