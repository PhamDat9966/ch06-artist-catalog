import { useEffect  } from 'react'
import { useParams } from "react-router-dom";
import ArtistInfo from '../components/ArtistPageChild/ArtistInfo'
import ArtistAlbum from '../components/ArtistPageChild/ArtistAlbum'
import Store from '../store/Store'



function ArtistPage() {

    const { artistId } = useParams();           // "1" khi vào /artist/1

    const artistStore           = Store((s) => s.artist);
    const artistLoading         = Store((s) => s.artistLoading);
    const artistError           = Store((s) => s.artistError);
    const loadingComplete       = Store((s) => s.loadingComplete);
    const fetchArtist           = Store((s) => s.fetchArtist);

    let artist = [];
    if (artistStore === null || artistStore === undefined) {
        artist = [];
    } else {
        artist = artistStore;
    }

    useEffect(() => {
        fetchArtist(artistId);
    }, [artistId, fetchArtist]);                // đổi id thì tải lại


    let ArtistAlbumList = null;
    let Albums          = [];
    Albums              = (artist.albums) ? artist.albums : [];   

    if(Albums.length > 0){
        ArtistAlbumList = Albums.map((album, index) => (
            <ArtistAlbum order={index + 1} album={album} key={index} />
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
            ArtistAlbumList =(<div className="text-center">
                                <h3>Nghệ sĩ chưa cập nhật album nào!</h3>
                              </div>);
        }
    }

    return (
        <>
            <div className="panel panel-info">
                <div className="panel-body">
                    <ArtistInfo artist={artist} />
                    <div className="col-sm-8 col-md-8">
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">List Albums</h3>
                            </div>

                            <div className="panel-body list-albums">
                                {ArtistAlbumList}
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default ArtistPage
