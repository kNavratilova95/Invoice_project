import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: { _id: 0 },
        seller: { _id: 0 }
    });
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (id) { //if we have the id available, we will set the data from this id
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
        apiGet('/api/persons').then((data) => setBuyerList(data)); // download the person data and set the buyer data
        apiGet('/api/persons').then((data) => setSellerList(data)); // download the person data and set the seller data
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        (id
            ? apiPut('/api/invoices/' + id, invoice)
            : apiPost('/api/invoices', invoice)
        )
            .then(() => {
                setSent(true);
                setSuccess(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    navigate("/invoices");
                }, 1500); // 1.5-sec delay for flashmessage
            })
            .catch((error) => {
                setError(error.message);
                setSent(true);
                setSuccess(false);
                setIsSubmitting(false);
            });
    };
    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <button className="return_button" >
                <Link to={`/invoices`}>Zpět</Link>
            </button>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    message={success ? "Uložení faktury proběhlo úspěšně." : "Nastala chyba při ukládání faktury."}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte celé číslo"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení faktury"
                    prompt="Zadejte datum vystavení faktury"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti faktury"
                    prompt="Zadejte datum splatnosti faktury"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte název produktu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="1"
                    label="Cena"
                    prompt="Zadejte cenu produktu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="1"
                    label="Daň"
                    prompt="Zadejte daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />
                <InputSelect
                    name="buyer"
                    items={buyerListState}
                    label="Kupující"
                    prompt="Vyberte kupujícího"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                    }}
                />
                <InputSelect
                    name="seller"
                    items={sellerListState}
                    label="Prodávající"
                    prompt="Vyberte prodávajícího"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } });
                    }}
                />
                <input type="submit" className="btn btn-primary" value="Uložit" disabled={isSubmitting} />
            </form>
        </div>
    );
};

export default InvoiceForm;