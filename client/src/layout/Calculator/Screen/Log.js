import React from 'react';

const Log = (props) => (
    <div>
        <h2 className="log"> Calculator Log</h2>
        {props.data.map((expression, i) => (
            <p className="log" key={i}>{expression}</p>
        ))}
    </div>
);

export default Log;