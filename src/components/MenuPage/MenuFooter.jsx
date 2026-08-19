import React from 'react';

export default function MenuFooter() {
  return (
    <footer className="menu-footer">
      <div className="menu-footer__cta">
        <a href="#reserve" className="menu-footer__reserve-link">
          RESERVE A TABLE <span className="menu-footer__arrow">→</span>
        </a>
      </div>
      
      <div className="menu-footer__grid">
        <div className="menu-footer__col">
          <h4 className="menu-footer__heading">ADDRESS</h4>
          <p className="menu-footer__text">
            123 Culinary Avenue<br />
            New York, NY 10001
          </p>
        </div>
        
        <div className="menu-footer__col">
          <h4 className="menu-footer__heading">OPEN HOURS</h4>
          <p className="menu-footer__text">
            Monday – Sunday<br />
            Lunch: 12PM – 3PM<br />
            Dinner: 6PM – 11PM
          </p>
        </div>
        
        <div className="menu-footer__col">
          <h4 className="menu-footer__heading">MORE INFO</h4>
          <ul className="menu-footer__links">
            <li><a href="#story">Our Story</a></li>
            <li><a href="#private-dining">Private Dining</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="menu-footer__social">
        <a href="#instagram">INSTAGRAM</a>
        <a href="#facebook">FACEBOOK</a>
        <a href="#twitter">X TWITTER</a>
      </div>
    </footer>
  );
}
