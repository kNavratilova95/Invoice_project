import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Načítám...</span>
        </div>
    </div>
);

export default LoadingSpinner;