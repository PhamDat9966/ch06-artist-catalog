import { useState } from 'react'
import FormSearch from '../components/FormSearch'
import ArtistList from '../components/ArtistList'
import Store from '../store/Store'

function HomePage() {

    const strSearchStore       =  Store((state) => state.strSearch); 
    console.log("Chuỗi tìm kiếm trong store:",strSearchStore);

    return (
        <>
            <div className="panel panel-info">
                <FormSearch />
                <div className="panel-body">
                    <ArtistList />
                </div>    
            </div>
        </>
    )
}

export default HomePage
