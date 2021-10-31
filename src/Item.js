import React from 'react'
import "./item.css"

function Item(props) {
    function setFileIcon(type, ext) {
        if (type === "folder") {
            return <i className="far fa-folder fa-4x"></i>
        } else {
            switch (ext) {
                case "text/plain":
                    return <i className="far fa-file-alt fa-4x"></i>;
                case "application/msword":
                    return <i class="far fa-file-alt fa-4x"></i>;
                case "image/jpeg":
                    return <i class="far fa-file-image fa-4x"></i>;
                case "audio/mpeg":
                    return <i class="far fa-file-audio fa-4x" ></i>;
                case "video/mp4":
                    return <i class="far fa-file-video fa-4x"></i>;
                case "application/pdf":
                    return <i class="far fa-file-pdf fa-4x"></i>;
                case "image/png":
                    return <i class="far fa-file-image fa-4x"></i>;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    return <i class="far fa-file-excel fa-4x"></i>;
                default:
                    return <i class="far fa-file fa-4x"></i>
            }
        }
    }
    const { fileName, type, ext,fileUrl } = props.item
    return (

        <div className="col-lg-3" >
            <div class="card border-primary mb-3" style={{ maxWidth: "10rem" }, { height: "200px" }}>
                <div class="card-header">File</div>
                <div class="card-body text-primary">
                    <div className="item">
                        <div className="item-icon">{setFileIcon(type, ext)}</div>
                        <div className="item-text">{fileName}</div>
                        <a class="buttonI running ld ld-ext-right" href={fileUrl} target="_blank">
                            <span class="ld ld-spinner ld-clock"></span>
                            Open
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Item



