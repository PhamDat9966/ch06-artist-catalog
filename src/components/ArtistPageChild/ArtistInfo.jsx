import { useState } from 'react'


function ArtistInfo(props) {
    // console.log("props:",props);

    let artistName      = props.artist.name;
    let artistThumb     = props.artist.thumb;
    
    return (
        <>
            <div className="col-sm-4 col-md-4">
                <img
                    src={artistThumb}
                    alt={artistName}
                    className="img-rounded img-responsive"
                />
                <blockquote style={{ marginTop: 20 }}>
                <p>{artistName}</p>
                </blockquote>
                <p>
                    <i className="glyphicon glyphicon-play-circle" />

                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://open.spotify.com/artist/4mzMFxVZNS2uCVNdsVFoj5"
                    >
                        {" "}
                        View Spotify
                    </a>
                    
                    <i className="glyphicon glyphicon-play-circle" /> Genres:
                    <span className="label label-warning" style={{ marginRight: 5 }}>
                        vietnamese pop
                    </span>
                </p>
            </div>
        </>
    )
}

export default ArtistInfo
