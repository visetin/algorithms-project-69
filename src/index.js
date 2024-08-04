import _ from 'lodash';

/**
 * @typedef {Object} SEDocument
 * @property {string} id
 * @property {string} text
 */

/**
 * @param {string} token
 * @return {string[]}
 */
const makeTerms = (token) => {
    const terms = token.match(/\w+/g);


    return terms
        .filter((term) => { return term; })
        .map((term) => { return term.toLowerCase()})
};

/**
 * @param {SEDocument[]} docs
 * @param {string} token
 * @return {string[] | []}
 */
const search = (docs, token) => {
    if (!docs.length || !token) {
        return [];
    }

    const targetTerms = makeTerms(token);

    return docs.reduce((acc, { id, text: docToken }) => {
        const docTerms = makeTerms(docToken);
        const intersectionTerms = _.intersection(docTerms, targetTerms);

        return intersectionTerms.length ? [...acc, id] : acc;
    }, []);
};

export default search;
