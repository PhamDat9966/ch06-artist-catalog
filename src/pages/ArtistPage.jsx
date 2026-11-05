import { useState } from 'react'
import ArtistInfo from '../components/ArtistPageChild/ArtistInfo'
import ArtistAlbum from '../components/ArtistPageChild/ArtistAlbum'

function ArtistPage() {

    return (
        <>
            <div className="panel panel-info">
                <div className="panel-body">
                    <ArtistInfo/>
                    <div className="col-sm-8 col-md-8">
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">List Albums</h3>
                            </div>

                            <div className="panel-body list-albums">
                                <ArtistAlbum />
                                <ArtistAlbum />
                                <ArtistAlbum />
                                <ArtistAlbum />
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default ArtistPage
