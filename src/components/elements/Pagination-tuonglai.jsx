import Store from "../../store/Store";

function Pagination({ page, limit, total, onChange }) {
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;

    const go = (e, p) => {
        e.preventDefault();
        if (p >= 1 && p <= totalPages && p !== page) onChange(p);
    };

    const items = [];
    for (let p = 1; p <= totalPages; p++) {
        items.push(
            <li key={p} className={p === page ? 'active' : ''}>
                <a href="#" onClick={(e) => go(e, p)}>{p}</a>
            </li>
        );
    }

    return (
        <div className="text-center">
            <ul className="pagination">
                <li className={page === 1 ? 'disabled' : ''}>
                    <a href="#" onClick={(e) => go(e, page - 1)}>&laquo;</a>
                </li>
                {items}
                <li className={page === totalPages ? 'disabled' : ''}>
                    <a href="#" onClick={(e) => go(e, page + 1)}>&raquo;</a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination