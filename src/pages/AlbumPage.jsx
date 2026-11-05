import { useState } from 'react'
import AlbumThumb from '../components/AlbumPageChild/AlbumThumb'
import Track from '../components/AlbumPageChild/Track'

function AlbumPage() {

    return (
        <>
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="row">

                        <AlbumThumb />

                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="panel panel-warning">
                                <div className="panel-heading">
                                    <h3 className="panel-title">List Tracks</h3>
                                </div>
                                <div className="panel-body">
                                    <Track />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumPage
