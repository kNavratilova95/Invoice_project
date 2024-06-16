import React from 'react';
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';


const InvoiceFilter = (props) => {
    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };
    const handleReset = () => {
        props.handleReset(); 
    };

    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={props.buyerList}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerID}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={props.sellerList}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerID}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="text"
                        min="1"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="neuveden"
                        value={filter.product ? filter.product : ''}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuvedena"
                        value={filter.minPrice ? filter.minPrice : ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuvedena"
                        value={filter.maxPrice ? filter.maxPrice : ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit zobrazených faktur"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col mt-2 d-flex justify-content-start">
                    <div className="btn-group" role="group">
                        <input
                            type="submit"
                            className="btn btn-outline-info"
                            value={props.confirm}
                        />
                        <button
                        type='button'
                            onClick={handleReset}
                            className="btn btn-sm btn-outline-danger"
                        >
                        Resetovat filtr
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;