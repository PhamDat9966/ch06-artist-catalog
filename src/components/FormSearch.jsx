import { useState } from 'react'
import Store from '../store/Store';


function FormSearch() {

    const [searchQuery, setSearchQuery] = useState("");

    //zustand:
    const setSearchStore       =  Store((state) => state.setStrSearch); //Lấy Phương thức lưu 
    
    function handleSearch(){
        let strSearch = searchQuery;
        setSearchStore(strSearch);
    }

    function handleClear(){
        setSearchStore("");
    }

    return (
        <>
            <div className="panel-heading">
                <form className="form-inline" role="form">
                    <div className="input-group">
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Enter artist name ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi gõ
                        />
                        <div className="input-group-btn">
                            <button onClick={()=>handleSearch()}  type="button" className="btn btn-danger">Search</button>
                            <button onClick={()=>handleClear()}   type="button" className="btn btn-warning">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormSearch
