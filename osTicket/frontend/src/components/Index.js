import React from 'react'
import getData from '../getData/GetData';


export default function Index () {
    
    const body = getData();

    return (
        <>
            <h1>Hola { body }</h1>
        </>
    );
}
