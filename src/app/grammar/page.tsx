import React from 'react'


const Grammar = () => {

    const winkNLP = require('wink-nlp');
    const model = require('wink-eng-lite-web-model');
    const text = 'Hello   World🌎! How are you?';

    const nlp = winkNLP(model);

    const doc = nlp.readDoc(text);

    console.log(doc.tokens());

    return (
        <div>Hello</div>
    )
}

export default Grammar