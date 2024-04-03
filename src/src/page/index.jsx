import React from 'react';
import './index.css';
import {Link} from "react-router-dom";

export default function Main() {
  return (
      <div className='main-container'>
          <a href="">
              <div className='capture-decran'/>
          </a>
          <a href="">
              <div className='user-icon'/>
          </a>
          <a href="">
              <div className='whales-cap'>
                  <span className='whales'>Whales</span>
                  <span className='cap'>Cap</span>
              </div>
          </a>
          <div className='default'/>

          <a href=" ">
              <div className='images-removebg-preview'/>
          </a>

          <a href=" ">
              <span className='trade'>Trade</span>
          </a>
          <a href="">
              <span className='market'>Market</span>

          </a>
          <a href="">
              <span className='buy-sell'>Buy & Sell</span>
          </a>
          <a href="">
              <span className='about-us'>About us</span>
          </a>

          <div className='line'/>

          <button className="button" data-text="Awesome">
              <span className="actual-text">&nbsp;EXCHANGE CRYPTO&nbsp;</span>
              <span aria-hidden="true" className="hover-text">&nbsp;EXCHANGE CRYPTO&nbsp;</span>
          </button>


          <div className="input-container">
              <input name="fild4" type="number" className="form-input" placeholder="0.00" min="1" required/>
              <select name="select4" className="form-select">
                  <optgroup label="Select The coin">
                      <option> BTC</option>
                      <option>THF</option>
                  </optgroup>
              </select>
          </div>
          <div className="input-container2">
              <input name="fild4" type="number" className="form-input" placeholder="0.00" min="1" required/>
              <select name="select4" className="form-select">
                  <optgroup label="Select The coin">
                      <option> BTC</option>
                      <option>THF</option>
                  </optgroup>
              </select>
          </div>
          <button className='button2'>
              <span className='exchange-span'>exchange</span>
          </button>
          <div className="line455"></div>
          <div className="arrow-container">
              <div className="arrow"></div>
          </div>

      </div>
  );
}
