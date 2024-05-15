import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";


export interface DataObtainingStrategy {
    obtainDocument(data: string): Promise<Document<Record<string, any>>[]>;
}

export class WebDataObtainingStrategy implements DataObtainingStrategy {
    public async obtainDocument(webPage = ""): Promise<Document<Record<string, any>>[]> {
        const loader = new CheerioWebBaseLoader(webPage, 
            {
                selector: "div",
            }
        );
        // const loader = new PuppeteerWebBaseLoader(webPage);

        return await loader.load()
    }
}

export class FileDataObtainingStrategy implements DataObtainingStrategy {
    public async obtainDocument(filePath = ""): Promise<Document<Record<string, any>>[]> {
        const fileExtension = filePath.split(".").pop();
        let loader;
    
        if (fileExtension === "docx") {
            loader = new DocxLoader(filePath);
        } else if (fileExtension === "txt") {
            loader = new TextLoader(filePath);
        } else if (fileExtension === "pdf") {
            loader = new PDFLoader(
                filePath,
                {
                    splitPages: false,
                }
            );
        } else {
            throw new Error ("unsupported file type");
        }
    
        return await loader.load();
    }
}