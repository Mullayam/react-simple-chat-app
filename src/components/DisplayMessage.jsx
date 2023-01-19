import React, { Children } from 'react'

const DisplayMessage = (props) => {
    const { username, message,bgColor="bg-light", align=""} = props;
  return (
    <div className="row justify-content-end pl-5">
      <div className={`d-flex flex-column ${align} m-2 shadow p-2 ${bgColor} border rounded w-auto`}>
        <div>
          <strong className="m-1">{username}</strong>
          <small className="text-muted">{Children}</small>
        </div>
        <h4 className="m-1">{message}</h4>
      </div>
    </div>
  );
}

export default DisplayMessage