import React, { useState } from 'react';

export default function Cconverter() {
    const [inputValue, setInputValue] = useState('');

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    };

    console.log({
        inputValue,
    })

    return (
        <div className="container">
            <div className="crypro-converter">
                <div className="crypto-options">
                    <input type='number' 
                    onChange={onInputChange}
                    value={inputValue}
                    />
                </div>
            </div>
        </div>
    )
}