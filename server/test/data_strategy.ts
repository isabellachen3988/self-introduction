import sinon from 'sinon';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { Document } from 'langchain/document';
import { FileDataObtainingStrategy } from '../routes/data_strategy';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('FileDataObtainingStrategy', () => {
    describe("#obtainDocument", () => {
        it('should obtain document from txt file', async () => {
            const filePath = 'test.txt';
            const expectedDocs = [new Document({ pageContent: 'Test content' })]
            
            // mocks new Textloader.load
            const loaderStub = sinon.stub(TextLoader.prototype, 'load').resolves(expectedDocs)

            const strategy = new FileDataObtainingStrategy();
            const docs = await strategy.obtainDocument(filePath)

            expect(loaderStub.calledOnceWithExactly()).to.be.true;
            expect(docs).to.deep.equal(expectedDocs);

            // restore the original method of textloader's load
            loaderStub.restore();
        });

        it('should throw an an error for unsupported file type', async () => {
            const filePath = 'test.invalid';
            const strategy = new FileDataObtainingStrategy();

            await expect(strategy.obtainDocument(filePath)).to.be.rejectedWith("unsupported file type");
        });
    })
})