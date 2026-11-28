import { useState,useEffect } from 'react'
import FormSearch from '../components/FormSearch'
import ArtistList from '../components/HomePageChild/ArtistList'
import Store from '../store/Store'

import Pagination from '../components/elements/Pagination'

function HomePage() {

    const strSearchStore        =  Store((state) => state.strSearch); 
    const page                  = Store((state) => state.page);

    const artistsPage     = Store((s) => s.artistsPage);
    const artistsLimit    = Store((s) => s.artistsLimit);
    const setArtistsPage  = Store((s) => s.setArtistsPage);

    // console.log("Chuỗi tìm kiếm trong store:",strSearchStore);

    useEffect(() => {
        Store.getState().AxiosStore();
        /* Khi gọi fetchTask() tại đây nó sẽ lấy data-error-loading từ Laravel backend và gán vào task-error-loading trong useTaskStore*/
    }, [strSearchStore,page]); 

    // useEffect(() => {
    //     Store.getState().AxiosStore();
    // }, [artistsPage, strSearchStore]);

    return (
        <>
            <div className="panel panel-info">
                <FormSearch />
                <div className="panel-body">
                    <ArtistList />
                </div>    
                <div className="panel-body">
                    <Pagination />
                    {/* <Pagination page={artistsPage} limit={artistsLimit} total={artistsTotal} onChange={setArtistsPage} /> */}
                </div>   
            </div>
        </>
    )
}

export default HomePage
