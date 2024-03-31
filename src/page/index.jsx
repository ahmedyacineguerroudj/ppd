import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export function Main2() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(false);

    const handleLoginClick = () => {
        setIsFlipped(false);
    };

    const handleSignupClick = () => {
        setIsFlipped(true);
    };

    const handlePaymentChange = () => {
        setPaymentSelected(true);
    };

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
                    <span className="actual-text">&nbsp;SELL&BUY Crypto&nbsp;</span>
                    <span aria-hidden="true" className="hover-text">&nbsp;SELL&BUY Crypto&nbsp;</span>
                </button>
                <div className="Hot_crypto">
                    <h4 className="span">HOT CRYPTO</h4>
                </div>
            </div>

            <div className="wrapper">
                <div className="card-switch">
                    <div className="buttons">
                        <button
                            className={`button3 ${!isFlipped ? 'active' : ''}`}
                            onClick={handleLoginClick}
                        >
                            Buy
                        </button>
                        <button
                            className={`button3 ${isFlipped ? 'active' : ''}`}
                            onClick={handleSignupClick}
                        >
                            Sell
                        </button>
                    </div>

                    <div className={`flip-card__inner ${isFlipped ? 'flipped' : ''}`}>
                        <div className="flip-card__front">
                            <button className="button" data-text="Awesome">
                                <span className="actual-text">&nbsp;BUY Crypto&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;BUY Crypto&nbsp;</span>
                            </button>

                            <form className="flip-card__form" action="">
                                <div className="input-container">
                                    <input type="number" name='amount' placeholder="Enter the amount" min="1"/>
                                </div>
                                <div className="input-container2">
                                    <input type="number" className="form-input" placeholder="Enter the amount"  min="1" required/>
                                    <select className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="payment-container">
                                    <label htmlFor="PAY WITH" className="payment-label">PAY WITH </label>
                                    <select
                                        id="select-transaction-method"
                                        className="payment-select"
                                        onChange={handlePaymentChange}
                                    >
                                        {!paymentSelected &&
                                            <option value="" disabled selected hidden>Select Payment Method</option>}
                                        <option className="payment-option">Visa</option>
                                        <option className="payment-option">Master Card</option>
                                        <option className="payment-option">Pyypl</option>
                                    </select>
                                </div>
                                <button type="submit" className='button2'>
                                    <span className='buy-crypto'>Buy crypto</span>
                                </button>
                            </form>
                        </div>
                        <div className="flip-card__back">
                            <button className="button" data-text="Awesome">
                                <span className="actual-text">&nbsp;SELL Crypto&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;SELL Crypto&nbsp;</span>
                            </button>

                            <form className="flip-card__form" action="">
                                <div className="input-container4">
                                    <input type="number" className="form-input"
                                           placeholder="Enter the amount you want to Sell" min="1" required/>
                                    <select className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="input-container3">
                                    <input type="number" className="form-input" placeholder="0.00" min="1" required/>
                                    <select className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <button type="submit" className='button2'>
                                    <span className='buy-crypto'>Sell crypto</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="horizontal-line"/>
        </div>
    );
}

export default Main2;
