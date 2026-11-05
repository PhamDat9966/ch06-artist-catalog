import { useState } from 'react'
import Artist from './Artist';

function ArtistList() {

    let xhtml = null;

    if(1>0){
        xhtml = <div><Artist /><Artist /><Artist /><Artist /></div>;
    }

    return (
        <>
            {xhtml}
        </>
    )
}

export default ArtistList
