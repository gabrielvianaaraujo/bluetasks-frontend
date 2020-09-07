import React from 'react'

export const Alert = (props) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {props.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}