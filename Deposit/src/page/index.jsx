import React, { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export function Main2() {
    const [htmlContent, setHtmlContent] = useState('');
    const [modal, setModal] = useState(false);
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        city: '',
        postalCode: '',
        amount: ''
    });

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allFieldsFilled = Object.values(inputValues).every(val => val.trim() !== '');
        if (allFieldsFilled) {
            console.log("All fields filled. Submitting...", inputValues);

            window.location.reload();
        } else {
            console.log("Please fill all fields.", inputValues);
            alert("Please fill all fields.");
        }
    };


    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [modal]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/hotcrypto/`);
            const data = await response.json();
            setHtmlContent(data.table_html);
        };

        fetchData();
    }, []);

    return (
        <div className='main-container'>
            <div className='flex-row'>
                <Link to="/">
                    <div className='user-icon'/>
                </Link>
                <Link to="/">
                    <div className='capture-decran'/>
                    <div className='whales-cap'>
                        <span className='whales'>Whales</span>
                        <span className='cap'>Cap</span>
                    </div>
                </Link>
                <div className='images'/>
                <div className='vector-globe-icon'/>
                <div className='recherche'/>

                <Link to="/">
                    <span className='market'>Market</span>
                </Link>
                <Link to="/">
                    <span className='trade'>Trade</span>
                </Link>
                <Link to="index.jsx">
                    <span className='buy-sell'>Buy & Sell</span>
                </Link>
                <Link to="/">
                    <span className='about-us'>About us</span>
                </Link>

                <button className="button4" data-text="Awesome">
                    <span className="actual-text">&nbsp;Deposit&nbsp;</span>
                    <span aria-hidden="true" className="hover-text">&nbsp;Deposit&nbsp;</span>
                </button>

                <form className="flip-card__form" action="" onSubmit={handleSubmit}>
                    {modal && (
                        <div className="modal">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <div className="input-container10">
                                    <input name="firstName" type="text" placeholder="Enter the First Name" value={inputValues.firstName} onChange={handleChange} />
                                </div>
                                <div className="input-container11">
                                    <input name="lastName" type="text" placeholder="Enter the Last Name" value={inputValues.lastName} onChange={handleChange} />
                                </div>
                                <div className="input-container4">
                                    <input name="cardNumber" className="input-form" type="number" placeholder="Enter card number" value={inputValues.cardNumber} onChange={handleChange} />
                                </div>
                                <div className="input-container5">
                                    <input name="expiryDate" type="month" value={inputValues.expiryDate} onChange={handleChange} />
                                </div>
                                <div className="input-container6">
                                    <input name="cvv" type="number" placeholder="Enter CVV" max="3" value={inputValues.cvv} onChange={handleChange} required />
                                </div>
                                <div className="input-container7">
                                    <select name="currency" className="form-input" value={inputValues.currency} onChange={handleChange}>
                                        <optgroup label="Select the Currency">
                                            <option>algeria</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="input-container8">
                                    <input name="city" type="text" placeholder="Enter city" value={inputValues.city} onChange={handleChange} required />
                                </div>
                                <div className="input-container9">
                                    <input name="postalCode" type="text" placeholder="Enter postal code" value={inputValues.postalCode} onChange={handleChange} required />
                                </div>
                                <button className="close-modal" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="buttons">
                        <button type="submit" className="button3">
                            submit
                        </button>
                    </div>

                    <div>
                        <button onClick={toggleModal}>
                            confirm
                        </button>
                    </div>
                    <div className="input-container3">
                        <select name="currency" className="form-input" >
                            <optgroup label="Select the Currency">
                                <option>USDT</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="input-container">
                        <input name="amount" className="form-input" type="float" placeholder="Enter the amount" value={inputValues.amount} onChange={handleChange} required />
                    </div>
                </form>
            </div>
            <hr className="horizontal-line" />
        </div>
    );
}

export default Main2;
