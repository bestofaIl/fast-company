import React, {useState} from "react";

const Test = () => {
    const [state, setState] = useState(0);

    const addOne = () => {
        setState(state + 1);
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={addOne}>Add</button>
        </>
    )
}

export default Test;