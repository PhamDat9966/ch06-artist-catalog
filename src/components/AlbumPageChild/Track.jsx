import { useState } from 'react'

function Track(props) {

    let trackName = props.track.name;
    let audioURL  = props.track.audio;

    return (
        <>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 track">
                <h4>{trackName}</h4>
                <audio
                    src={audioURL}
                    controls
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>
    )
}

export default Track
