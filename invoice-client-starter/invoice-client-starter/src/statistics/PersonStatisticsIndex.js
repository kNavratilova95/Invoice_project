import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

const PersonStatisticsIndex = () => {
    const [invoicesStatistic, setInvoicesStatistic] = useState({});
    const [personStatistic, setPersonStatistic] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try { //load statistics data about invoices
                const invoicesData = await apiGet("/api/invoices/statistics");
                setInvoicesStatistic(invoicesData);
                if (Array.isArray(invoicesData) && invoicesData.length > 0) {
                    setInvoicesStatistic(invoicesData[0]);
                }
                const personData = await apiGet("/api/persons/statistics"); //load statistics data about persons
                setPersonStatistic(personData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <h1>Statistiky</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <hr/>
                        <h3>Sumarizační statistiky:</h3>
                        <br/>
                        <p>
                            <strong>Celková částka za aktuální rok:</strong>
                            <br/>
                            {invoicesStatistic.currentYearSum}
                        </p>
                        <p>
                            <strong>Celková částka za všechna období:</strong>
                            <br/>
                            {invoicesStatistic.allTimeSum}
                        </p>
                        <p>
                            <strong>Celkový počet faktur:</strong>
                            <br/>
                            {invoicesStatistic.invoicesCount}
                        </p>
                    </div>
                    <div>
                        <br/>
                        <h3>Statistiky jednotlivých společností:</h3>
                        <br />
                        <table className="table table-sm table-responsive-lg table-hover table-striped" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Název společnosti</th>
                                    <th>Fakturované příjmy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personStatistic.map((item) => (
                                    <tr key={item.personId}>
                                        <td>{item.personId}</td>
                                        <td><Link to={`/persons/show/${item.personId}`}>{item.personName}</Link></td>
                                        <td>{item.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default PersonStatisticsIndex;