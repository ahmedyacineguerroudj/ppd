import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export function Main2() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleLoginClick = () => {
        setIsFlipped(false);
    };

    const handleSignupClick = () => {
        setIsFlipped(true);
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
                            onClick={handleLoginClick}>
                            Buy
                        </button>
                        <button
                            className={`button3 ${isFlipped ? 'active' : ''}`}
                            onClick={handleSignupClick}>
                            Sell
                        </button>
                    </div>


                    <div className={`flip-card__inner ${isFlipped ? 'flipped' : ''}`}>
                        <div className="flip-card__front">
                            <button className="button" data-text="Awesome">
                                <span className="actual-text">&nbsp;BUY Crypto&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;BUY Crypto&nbsp;</span>
                            </button>

                            <form method="POST" className="flip-card__form" action="">



                                <div className="input-container">
                                    <input type="number" name="fild1" className="form-input" placeholder="Enter the amount" min="1"
                                           required/>
                                    <select  name="select1" className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
                                    </select>
                                </div>


                                <div className="input-container2">
                                    <input type="number" name="fild2" className="form-input" placeholder="Enter the amount" min="1" required/>
                                    <select name="select2" className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
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

                            <form method="POST" className="flip-card__form" action="">
                                <div  className="input-container4">
                                <input name="fild3" type="number" className="form-input"
                                           placeholder="Enter the amount you want to Sell" min="1" required/>
                                    <select name="select3" className="form-select">
                                        <optgroup label="Select The coin">
                                            <option> BTC</option>
                                            <option>THF</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="input-container3">
                                    <input name="fild4" type="number" className="form-input" placeholder="0.00" min="1" required/>
                                    <select name="select4" className="form-select">
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
