import { useState } from 'react'
import Artist from './Artist';
import Store from '../store/Store';

function ArtistList() {

    const dataStore         = Store((state) => state.dataStore);
    const loading           = Store((state) => state.loading);
    const loadingComplete   = Store((state) => state.loadingComplete);
    const error             = Store((state) => state.error);

    let artistList = [];
    if (dataStore === null || dataStore === undefined) {
        artistList = [];
    } else {
        artistList = dataStore.artists.data;
    }

    if (loading) {
        return (
            <>  
                <div className="text-center">
                    <img
                        src="/images/loading.gif"
                        alt="Loading..."
                    />
                    <div>Loading...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
                <div>Load dữ liệu từ server thất bại.</div>
            </div>
        );
    }

    // let listItem        = "";
    // let messageTbody    = "";

    let xhtml = null
    if(artistList.length > 0){
        xhtml = artistList.map((artist, index) => (
            <Artist order={index + 1} artist={artist} key={index} />
        ));
    }else{
        return (  
            <>  
                <div className="panel panel-success">
                    <div className="panel-heading">List Task</div>
                    <table className="table table-hover ">
                    <tbody>
                        <tr>
                            <td colSpan={4} className="text-center">
                                Không có Nghệ sĩ nào.
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </>
        )
    }


    // if(1>0){
    //     xhtml = <div><Artist /><Artist /><Artist /><Artist /></div>;
    // }

    return (
        <>
            {xhtml}
        </>
    )
}

export default ArtistList
