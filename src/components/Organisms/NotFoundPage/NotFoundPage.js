import React from 'react';
import './NotFoundPage.css';

class NotFoundPage extends React.Component {
  render() {
    return (
     <>
       <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>404</h1>
            </div>
            <h2>Oops! Aun no se han registrado restaurantes para este lugar</h2>
          </div>
       </div>
     </>
    );
  }
}


export default NotFoundPage;
