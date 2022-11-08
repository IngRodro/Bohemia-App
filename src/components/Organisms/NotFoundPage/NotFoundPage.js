import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = ({ message}) => {
    return (
       <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>404</h1>
            </div>
            <h2>{message}</h2>
          </div>
       </div>
    );
}


export default NotFoundPage;
