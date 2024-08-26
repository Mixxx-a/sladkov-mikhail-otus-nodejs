import { expect } from 'expect'
import sinon from 'sinon'
import mock from 'mock-fs'
import { printFilesTree } from '../src/tree.js'

describe('Tree utility:', () => {
    beforeEach(() => {
        sinon.spy(console, 'log');
    });
    
    afterEach(() => {
        mock.restore();
        sinon.restore();
    });

    it('should print dir content correctly', () => {
        mock({
            'test/path': {
                'file1.txt': 'some text',
                'folder1': {
                    'file2.txt': 'some text',
                },
                'file3.txt': 'some text',
                'folder2': {
                    'file4.txt': 'some text',
                },
                'file5.txt': 'some text',
            },
        });
 
        printFilesTree('test/path', 2);

        expect(console.log.getCall(0).args[0]).toBe('test/path');
        expect(console.log.getCall(1).args[0]).toBe('├──file1.txt');
        expect(console.log.getCall(2).args[0]).toBe('├──file3.txt');
        expect(console.log.getCall(3).args[0]).toBe('├──file5.txt');
        expect(console.log.getCall(4).args[0]).toBe('├──folder1');
        expect(console.log.getCall(5).args[0]).toBe('│ └──file2.txt');
        expect(console.log.getCall(6).args[0]).toBe('├──folder2');
        expect(console.log.getCall(7).args[0]).toBe('│ └──file4.txt');
    });

    it('should not fail if base path is not dir', () => {
        mock({
            'test/path': 'some text'
        });
 
        printFilesTree('test/path', 1);

        expect(console.log.getCall(0).args[0]).toBe('test/path');
    });

    it('should not fail if base dir is not containing anything', () => {
        mock({
            'test/path': {/** empty directory */}
        });
 
        printFilesTree('test/path', 1);

        expect(console.log.getCall(0).args[0]).toBe('test/path');
    });

    it('should not exceed depth set', () => {
        mock({
            'test/path': {
                'file1.txt': 'some text',
                'folder1' : {
                    'file2.txt': 'some text',
                },
            },
        });
 
        printFilesTree('test/path', 1);

        expect(console.log.getCall(0).args[0]).toBe('test/path');
        expect(console.log.getCall(1).args[0]).toBe('├──file1.txt');
        expect(console.log.getCall(2).args[0]).toBe('└──folder1');
    });

    it('should throw error when dir is not exists', () => {
        expect(() => printFilesTree('test/path', 1)).toThrow();
    });
})