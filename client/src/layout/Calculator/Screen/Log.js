import React from 'react';

const Log = (props) => (
    <div>
        <h3 className="log">Calculator Log</h3>
        {props.data.map((expression, i) => (
            <h3 className="log" key={i}>{expression}</h3>
        ))}
    </div>
);

export default Log;