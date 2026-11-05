import HomePage from "../pages/HomePage";
import ArtistPage from "../pages/ArtistPage";
import AlbumPage from "../pages/AlbumPage";
import NotfoundPage from "../pages/NotfoundPage";

const routes = [
    {
        path:       '/',
        element:    <HomePage />
    },
    {
        path:       '/artist/:artistId',
        element:    <ArtistPage />
    },
    {
        path:       '/album/:albumId',
        element:    <AlbumPage />
    },
    {
        path:       '*',
        element:    <NotfoundPage />
    },
];

export default routes;