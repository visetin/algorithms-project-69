import _ from 'lodash';

/**
 * @typedef {Object} SEDocument
 * @property {string} id
 * @property {string} text
 */

/**
 * @param {string} rawWord
 * @return {string}
 */
const normalizeWord = (rawWord) => {
    const [word] = rawWord.match(/\w+/g);

    if (!word) {
        return '';
    }

    return word.toLowerCase();
};

/**
 * @param {string} text
 * @return {string[]}
 */
const parseTextToWords = (text) => {
    return text.split(' ')
        .map(normalizeWord)
        .filter((word) => { return word; });
};

/**
 * @param {string[]} haystack
 * @param {string[]} needle
 * @return {string[] | []}
 */
const findWordsIntersection = (haystack, needle) => {
    return _.intersection(haystack, needle);
};

/**
 * @param {SEDocument[]} docs
 * @param {string} text
 * @return {string[] | []}
 */
const search = (docs, text) => {
    if (!docs.length || !text) {
        return [];
    }

    const targetWords = parseTextToWords(text);

    return docs.reduce((acc, { id, text: docText }) => {
        const docWords = parseTextToWords(docText);
        const intersectionWordsMap = findWordsIntersection(docWords, targetWords);

        return intersectionWordsMap.length ? [...acc, id] : acc;
    }, []);
};

export default search;
