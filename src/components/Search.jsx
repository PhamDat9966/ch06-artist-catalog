import { useState } from 'react'

function Search() {

    return (
        <>
            <div className="panel-heading">
                <form className="form-inline" role="form">
                <div className="form-group">
                    <input
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter artist name ..."
                    />
                    <button type="button" className="btn btn-danger">
                        Search
                    </button>
                </div>
                </form>
            </div>
        </>
    )
}

export default Search
