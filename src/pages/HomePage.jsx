import { useState } from 'react'
import Search from '../components/Search'
import ArtistList from '../components/ArtistList'

function HomePage() {

    return (
        <>
            <div className="panel panel-info">
                <Search />
                <div className="panel-body">
                    <ArtistList />
                </div>    
            </div>
        </>
    )
}

export default HomePage
