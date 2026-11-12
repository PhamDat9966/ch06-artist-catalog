import { useState } from 'react'

function Artist(props) {
    console.log("propsArtist:",props);
    let thumbArtist = 'http://artist-catalog.test/images/artist/' + props.artist.thumb;
    let thumbAlt    = props.artist.name;    
    let ArtistName  = props.artist.name;
    let ArtistID    = props.artist.id;  
    
    let ArtistUrl   = "artist/" + ArtistID;

    return (
        <>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="thumbnail">
                    <img
                        // src="https://i.scdn.co/image/23b3caeb7f6d181787bd5bd04f5c0ddbc332dcab"
                        src={thumbArtist}
                        alt={thumbAlt}
                    />
                    <div className="caption">
                    <h3>
                        <a href={ArtistUrl}>{ArtistName}</a>
                    </h3>
                    <p>
                        <span
                            className="label label-warning"
                            style={{ marginRight: 5 }}
                        >
                        vietnamese pop
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Artist
