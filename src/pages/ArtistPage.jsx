import { useEffect  } from 'react'
import { useParams } from "react-router-dom";
import ArtistInfo from '../components/ArtistPageChild/ArtistInfo'
import ArtistAlbum from '../components/ArtistPageChild/ArtistAlbum'
import Store from '../store/Store'
import NotfoundPage from './NotfoundPage';

import Pagination from '../components/elements/Pagination';

function ArtistPage() {

    const { artistId } = useParams();           // "1" khi vào /artist/1

    const artistStore           = Store((s) => s.artist);
    const artistLoading         = Store((s) => s.artistLoading);
    const artistError           = Store((s) => s.artistError);
    const loadingComplete       = Store((s) => s.loadingComplete);

    /* Các phương thức lấy dữ liệu */
    const AxiosArtist           = Store((s) => s.AxiosArtist);
    const AxiosArtistAlbums     = Store((s) => s.AxiosArtistAlbums);

    /* Lấy thông tin nghệ sĩ với axios */
    useEffect(() => {
        AxiosArtist(artistId);
    }, [artistId, AxiosArtist]);                // đổi id thì tải lại    

    useEffect(() => {
        AxiosArtistAlbums(artistId);
    }, [artistId, AxiosArtistAlbums]);                // đổi id thì tải lại   

    // console.log("artistError:",artistError);
    if(artistError !== null){

        if(artistError === "404"){
            let message = "Nghệ sĩ không tồn tại";
            return (
                        <>  
                            <NotfoundPage message={message}/>
                        </>
                    )
        }

    }

    let artist = {
        id: null,
        name: null,
        thumb: null,
        albums : []
    };
    
    // console.log("artistStore:",artistStore);

    if (artistStore === null || artistStore === undefined) {
        artist = {
                    id: null,
                    name: null,
                    thumb: null,
                    albums : []
                };
    } else {
        artist = artistStore;
    }

    /* Lấy albums theo ID nghệ sĩ với axios */

    let ArtistAlbumList = null;
    let Albums          = [];
    Albums              = (artist.albums) ? artist.albums : [];   

    if(Albums.length > 0){
        ArtistAlbumList = Albums.map((album, index) => (
            <ArtistAlbum order={index + 1} album={album} key={album.id} />
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
                            <div className="panel-body">
                                <Pagination />
                            </div>   
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default ArtistPage
