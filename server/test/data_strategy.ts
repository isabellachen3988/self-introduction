import sinon from 'sinon';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from 'langchain/document';
import { FileDataObtainingStrategy } from '../routes/data_strategy';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai)
const expect = chai.expect;

describe('FileDataObtainingStrategy', () => {
    describe("#obtainDocument", () => {
        afterEach(() => { // restore the original method after mocking
            sinon.restore();
        });
        
        it('should obtain document from txt file', async () => {
            const filePath = 'test.txt';
            const expectedDocs = [new Document({ pageContent: 'Test content' })]
            
            // mocks new Textloader.load
            // Stubbing the prototype is a common practice because it ensures that all instances of the class use the stubbed method.
            // If you were to stub the original function, you would only affect the specific instance of the class you were working with at the time of stubbing.
            const loaderStub = sinon.stub(TextLoader.prototype, 'load').resolves(expectedDocs)

            const strategy = new FileDataObtainingStrategy();
            const docs = await strategy.obtainDocument(filePath)
            
            expect(loaderStub).to.have.been.called;
            expect(docs).to.deep.equal(expectedDocs);
        });

        it('should obtain document from docx file', async () => {
            const filePath = 'test.docx';
            const expectedDocs = [new Document({ pageContent: 'Test content' })];
            
            // Stubbing DocxLoader.load method
            const docxLoaderStub = sinon.stub(DocxLoader.prototype, 'load').resolves(expectedDocs);

            const strategy = new FileDataObtainingStrategy();
            const docs = await strategy.obtainDocument(filePath);

            expect(docxLoaderStub).to.have.been.called;
            expect(docs).to.deep.equal(expectedDocs);
        });

        it('should obtain document from pdf file', async () => {
            const filePath = 'test.pdf';
            const expectedDocs = [new Document({ pageContent: 'Test content' })];
            
            // Stubbing PDFLoader.load method
            const pdfLoaderStub = sinon.stub(PDFLoader.prototype, 'load').resolves(expectedDocs);

            const strategy = new FileDataObtainingStrategy();
            const docs = await strategy.obtainDocument(filePath);
            
            expect(pdfLoaderStub).to.have.been.called;
            expect(docs).to.deep.equal(expectedDocs);
        });

        it('should throw an an error for unsupported file type', async () => {
            const filePath = 'test.invalid';
            const strategy = new FileDataObtainingStrategy();

            await expect(strategy.obtainDocument(filePath)).to.be.rejectedWith("unsupported file type");
        });
    });

    
})