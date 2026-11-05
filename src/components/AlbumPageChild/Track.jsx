import { useState } from 'react'

function Track() {

    return (
        <>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 track">
                <h4>Yêu Trên Đầu Môi</h4>
                <audio
                    src="https://p.scdn.co/mp3-preview/9a7c48323c4009138401b8f00bf95b2179eee5dd?cid=f53ff2c796004331a1da75e4b95a83a9"
                    controls
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 track">
                <h4>Giác Quan Thứ 6</h4>
                <audio
                    src="https://p.scdn.co/mp3-preview/6fee45cb2a2d03a13f74940b4dde925ef182ea5c?cid=f53ff2c796004331a1da75e4b95a83a9"
                    controls
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 track">
                <h4>Vắng Một Ngày</h4>
                <audio
                    src="https://p.scdn.co/mp3-preview/74bb9b4be6c122b41d48b5803865a7b8fa34a621?cid=f53ff2c796004331a1da75e4b95a83a9"
                    controls
                >
                Your browser does not support the audio element.
                </audio>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 track">
                <h4>Vì Anh</h4>
                <audio
                    src="https://p.scdn.co/mp3-preview/8cc80583dfc05a2a6c26d9500de61c47df27a836?cid=f53ff2c796004331a1da75e4b95a83a9"
                    controls
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>
    )
}

export default Track
