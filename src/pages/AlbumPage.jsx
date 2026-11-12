
import AlbumThumb from '../components/AlbumPageChild/AlbumThumb'
import Track from '../components/AlbumPageChild/Track'

import { useEffect  } from 'react'
import { useParams } from "react-router-dom";
import Store from '../store/Store';

function AlbumPage() {

    const { albumId }           = useParams();           // "1" khi vào /artist/1
    const albumStore            = Store((s) => s.album);
    const albumLoading          = Store((s) => s.albumLoading);
    const albumError            = Store((s) => s.albumError);
    const loadingComplete       = Store((s) => s.loadingComplete);
    const fetchAlbum            = Store((s) => s.fetchAlbum);

    useEffect(() => {
        fetchAlbum(albumId);
    }, [albumId, fetchAlbum]);                // đổi id thì tải lại

    let album = [];
    if (albumStore === null || albumStore === undefined) {
        album = [];
    } else {
        album = albumStore;
    }

    console.log("album:",album);

    let albumThumb = '';
    albumThumb     = (album.thumb) ? album.thumb : '';

    let xhtmlTrack = null;
    let tracks          = [];
    tracks              = (album.tracks) ? album.tracks : [];   

    if(tracks.length > 0){
        xhtmlTrack = tracks.map((track, index) => (
            <Track order={index + 1} track={track} key={index} />
        ));
    }else{
        if(loadingComplete == false){
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
            )
        }else{
            xhtmlTrack =(<div className="text-center">
                                <h3>Album chưa cập nhật tracks!</h3>
                        </div>);
        }
    }

    // if(albumLoadComplete == false){
    //     return (  
    //         <>  
    //             <div className="text-center">
    //                 <div>Album không có tracks nhạc nào!</div>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="row">

                        <AlbumThumb albumThumb={albumThumb} />

                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="panel panel-warning">
                                <div className="panel-heading">
                                    <h3 className="panel-title">List Tracks</h3>
                                </div>
                                <div className="panel-body">
                                    {xhtmlTrack}
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
