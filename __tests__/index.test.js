import { describe, it, expect } from '@jest/globals';
import docs from '../__fixtures__/docs.json';
import search from '../src/index.js';

describe('search by text', () => {
    it('empty collection', () => {
        const result = search([], 'None');

        expect(result).toEqual([]);
    });

    it('empty text', () => {
        const result = search(docs, '');

        expect(result).toEqual([]);
    });

    it('non-exist words', () => {
        const result = search(docs, 'None');

        expect(result).toEqual([]);
    });

    it('exist word', () => {
        const testCases = [
            { text: 'shoot', result: ['doc1', 'doc2'] },
            { text: 'straight', result: ['doc1'] },
            { text: 'thing', result: ['doc2'] },
            { text: 'shooter', result: ['doc3'] },
        ];

        testCases.forEach(({ text, result }) => {
            const searchResult = search(docs, text);
            expect(searchResult).toEqual(result);
        });
    });

    it('exist word from sentence', () => {
        const testCases = [
            { text: 'had a pint', result: ['doc1'] },
            { text: 'that thing', result: ['doc2'] },
            { text: 'your shooter', result: ['doc3'] },
            { text: 'Don\'t shoot', result: ['doc1', 'doc2'] },
            { text: 'I can\'t', result: ['doc1', 'doc3'] }
        ];

        testCases.forEach(({ text, result }) => {
            const searchResult = search(docs, text);
            expect(searchResult).toEqual(result);
        });
    });

    it('exist word case insensitive', () => {
        const testCases = [
            { text: 'ShooT', result: ['doc1', 'doc2'] },
            { text: 'ShooteR', result: ['doc3'] },
            { text: 'StraighT', result: ['doc1'] },
        ];

        testCases.forEach(({ text, result }) => {
            const searchResult = search(docs, text);
            expect(searchResult).toEqual(result);
        });
    });
});