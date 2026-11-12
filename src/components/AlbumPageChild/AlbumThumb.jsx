
function AlbumThumb(props){

    return (
        <>
            <div className="col-sm-4 col-md-4 col-lg-4">
                <img
                    className="media-object img-thumbnail"
                    src={props.albumThumb}
                    alt="singer"
                />
            </div>
        </>
    )


}
export default AlbumThumb