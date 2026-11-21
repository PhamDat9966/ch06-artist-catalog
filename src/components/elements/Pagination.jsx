import Store from "../../store/Store";

function Pagination() {
    const dataStore = Store((s) => s.dataStore);
    const page      = Store((s) => s.page);
    const limit     = Store((s) => s.limit);
    const setPage   = Store((s) => s.setPage);

    console.log('dataStore:',dataStore);
    let   total      = 0;
    if(dataStore !== null){
        total       = dataStore?.status_count?.[0]?.count ?? 0;
    }   
    // const total      = dataStore.artists.total ?? 0;

    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;       // chỉ 1 trang thì không cần hiện

    const items = [];
    for (let p = 1; p <= totalPages; p++) {
        items.push(
            <li key={p} className={p === page ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage(p); }}>
                    {p}
                </a>
            </li>
        );
    }

    return (
        <div className="text-center">
            <ul className="pagination">
                <li className={page === 1 ? 'disabled' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}>
                        &laquo;
                    </a>
                </li>

                {items}

                <li className={page === totalPages ? 'disabled' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}>
                        &raquo;
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination