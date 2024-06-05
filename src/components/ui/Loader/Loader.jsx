import React from 'react'
import './loader.css'

function Loader() {
    return (
        <>
            <main className='loader'>
                <div className="venn-container">
                    <div className="spinner spinner-1"></div>
                    <div className="spinner spinner-2"></div>
                    <div className="spinner spinner-3"></div>
                </div>
            </main>
        </>
    )
}

export default Loader