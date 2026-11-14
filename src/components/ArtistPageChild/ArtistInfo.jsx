import { useState } from 'react'


function ArtistInfo(props) {

    let artistName      = props.artist.name;
    let artistThumb     = props.artist.thumb;

    let xhtmlArtistGenres = null;
    let ArtistGenres      = [];
    ArtistGenres          = (props.artist.genres) ? props.artist.genres : [];     

    if(ArtistGenres.length > 0){
        xhtmlArtistGenres = ArtistGenres.map((genre) => (
                    <span key={genre.id} className="label label-warning" style={{ marginRight: 5 }}>
                        {genre.name}
                    </span>
        ));
    }
    
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
                    <i className="glyphicon glyphicon-play-circle" /> Genres:
                    {xhtmlArtistGenres}
                </p>
            </div>
        </>
    )
}

export default ArtistInfo
