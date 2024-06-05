import React from 'react'
import './breadcrumb.css'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb({name}) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className='breadcrumb-main-container'>
      <h1>{name}</h1>
      <p>
        <Link to="/">Home</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <span key={to}>
              {' / '}
              <Link to={to}>{value.replace(/-/g, ' ')}</Link>
            </span>
          );
        })}
      </p>
    </div>
  )
}

export default BreadCrumb
