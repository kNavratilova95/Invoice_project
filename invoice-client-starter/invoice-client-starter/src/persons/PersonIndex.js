import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id); //load data about this person
            setPersons(persons.filter((item) => item._id !== id));
            setFlashMessage({ theme: "success", message: "Společnost byla úspěšně smazána." });
        } catch (error) {
            setFlashMessage({ theme: "danger", message: "Nastala chyba při mazání společnosti. " + error.message });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try { //load data abou persons
                const data = await apiGet("/api/persons");
                setPersons(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setFlashMessage(null);
            }, 1500); // 1.5-sec delay for flashmessage
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <div>
            <h1>Seznam společností</h1>
            <hr/>
            {flashMessage && (
                <FlashMessage theme={flashMessage.theme} message={flashMessage.message} />
            )}
            {loading ? (
                <LoadingSpinner /> // display loading spinner
            ) : (
                <PersonTable
                    deletePerson={deletePerson}
                    items={persons}
                    label="Počet společností:"
                />
            )}
        </div>
    );
};

export default PersonIndex;