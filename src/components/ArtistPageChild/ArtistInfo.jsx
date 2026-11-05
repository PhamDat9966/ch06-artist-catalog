import { useState } from 'react'

function ArtistInfo() {

    return (
        <>
            <div className="col-sm-4 col-md-4">
                <img
                    src="https://i.scdn.co/image/23b3caeb7f6d181787bd5bd04f5c0ddbc332dcab"
                    alt="Thu Minh"
                    className="img-rounded img-responsive"
                />
                <blockquote style={{ marginTop: 20 }}>
                <p>Thu Minh</p>
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

                    <br />
                    <br />
                    
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
