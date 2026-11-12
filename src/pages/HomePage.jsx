import { useState,useEffect } from 'react'
import FormSearch from '../components/FormSearch'
import ArtistList from '../components/ArtistList'
import Store from '../store/Store'

function HomePage() {

    const strSearchStore       =  Store((state) => state.strSearch); 
    console.log("Chuỗi tìm kiếm trong store:",strSearchStore);

    //Chạy fetch để loading dữ liệu:
    useEffect(() => {
        Store.getState().fetchStore();
        /* Khi gọi fetchTask() tại đây nó sẽ lấy data-error-loading từ Laravel backend và gán vào task-error-loading trong useTaskStore*/
    }, [strSearchStore]); 

    return (
        <>
            <div className="panel panel-info">
                <FormSearch />
                <div className="panel-body">
                    <ArtistList />
                </div>    
            </div>
        </>
    )
}

export default HomePage
