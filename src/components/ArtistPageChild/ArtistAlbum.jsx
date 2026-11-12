import { useState } from 'react'

function ArtistAlbumList(props) {

    let albumID     = props.album.id; 
    let albumURL    = "/album/" + albumID;
    let albumName   = props.album.name;
    let albumThumb  = props.album.thumb;

    return (
        <>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="thumbnail">
                    <img
                        src={albumThumb}
                        alt={albumName}
                        className="img-responsive"
                    />
                    <div className="caption">
                    <h5>
                        <a href={albumURL}>
                            {albumName}
                        </a>
                    </h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArtistAlbumList
