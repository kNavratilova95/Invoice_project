import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import FlashMessage from "../components/FlashMessage";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";
import LoadingSpinner from "../components/LoadingSpinner";

const InvoiceIndex = () => {
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterState, setFilter] = useState({
        buyerID: "",
        sellerID: "",
        product: "",
        minPrice: "",
        maxPrice: "",
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id); //load invoice by id
            setInvoices(invoices.filter((item) => item._id !== id)); 
            setFlashMessage({ theme: "success", message: "Faktura byla úspěšně smazána." });
        } catch (error) {
            setFlashMessage({ theme: "danger", message: "Nastala chyba při mazání faktury. " + error.message });
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await apiGet("/api/invoices");
                const buyers = [];
                const sellers = [];
                data.forEach(invoice => {
                    if (!buyers.some(buyer => buyer._id === invoice.buyer._id)) {
                        buyers.push(invoice.buyer);
                    }
                    if (!sellers.some(seller => seller._id === invoice.seller._id)) {
                        sellers.push(invoice.seller);
                    }
                });
                setInvoices(data);
                setBuyerList(buyers);
                setSellerList(sellers);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            finally {
            setLoading(false); 
            }
        };
        fetchData();
    }, [filterState]);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setFlashMessage(null);
            }, 1500); // 1.5-sec delay for flashmessage
            // clean timer 
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const handleChange = (e) => {
        // if we select an empty value (we have it defined as true/false/'' in components) we set to undefined
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value }
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = filterState;
    
        try {
            const data = await apiGet("/api/invoices", params);
            setInvoices(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false); 
        }
    };
    
    const handleReset = () => {
        setFilter({
            buyerID: "",
            sellerID: "",
            product: "",
            minPrice: "",
            maxPrice: "",
            limit: undefined,
        });
    }

    return (
        <div>
            <h1>Seznam faktur</h1>
            {flashMessage && (
                <FlashMessage theme={flashMessage.theme} message={flashMessage.message} />
            )}
            <hr />
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                buyerList={buyerListState}
                sellerList={sellerListState}
                filter={filterState}
                confirm="Filtrovat faktury"
                reset="Vymazat filtr"
            />
            <hr />
            {loading ? (
                <LoadingSpinner /> // display loading spinner 
            ) : (
                <InvoiceTable
                    deleteInvoice={deleteInvoice}
                    items={invoices}
                    label="Počet faktur:"
                />
            )}
        </div>
    );
};

export default InvoiceIndex;