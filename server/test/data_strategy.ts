import sinon from 'sinon';
import { expect } from 'chai';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { Document } from 'langchain/document';
import { FileDataObtainingStrategy } from '../routes/data_strategy';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

describe('FileDataObtainingStrategy', () => {
    describe("#obtainVectorStore", () => {
        it('should obtain vector store from txt file', async () => {
            const filePath = 'test.txt';
            const expectedDocs = [new Document({ pageContent: 'Test content' })]
            
            // mocks new Textloader.load
            const loaderStub = sinon.stub(TextLoader.prototype, 'load').resolves(expectedDocs)

            const strategy = new FileDataObtainingStrategy();
            const vectorStore = await strategy.obtainVectorStore(filePath)

            expect(vectorStore).to.be.instanceOf(MemoryVectorStore);
            expect(loaderStub.calledOnceWithExactly()).to.be.true;
        })
    })
})