import { useState } from 'react'

function NotfoundPage(props) {
    let message = '';
    message = props.message ? props.message : '';
    return (
        <>
            <section className="page-section">
                <div className="container">
                    <div className="product-item text-center">
                        <h3>{message}</h3>
                        <img
                            className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
                            src="/assets/img/404.png"
                            alt="..."
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotfoundPage