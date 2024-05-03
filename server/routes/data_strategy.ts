import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { GoogleVertexAIEmbeddings } from "@langchain/community/embeddings/googlevertexai";


export interface DataObtainingStrategy {
    obtainVectorStore(data: string): Promise<MemoryVectorStore>;
}

export class WebDataObtainingStrategy implements DataObtainingStrategy {
    public async obtainVectorStore(webPage = ""): Promise<MemoryVectorStore> {
        const loader = new CheerioWebBaseLoader(
            webPage
        )

        const docs = await loader.load()

        // const vectorStore = await FaissStore.from
        const vectorStore = await MemoryVectorStore.fromDocuments(
            docs,
            new GoogleVertexAIEmbeddings()
        );

        return vectorStore
    }
}

export class FileDataObtainingStrategy implements DataObtainingStrategy {
    public async obtainVectorStore(filePath = ""): Promise<MemoryVectorStore> {
        const fileExtension = filePath.split(".").pop();
        let loader;
    
        if (fileExtension === "docx") {
            loader = new DocxLoader(filePath);
        } else if (fileExtension === "txt") {
            loader = new TextLoader(filePath);
        } else if (fileExtension === "pdf") {
            loader = new PDFLoader(filePath, {
            splitPages: false,
            });
        } else {
            throw new Error ("unsupported file type");
        }
    
        const docs = await loader.load();
    
        // const vectorStore = await FaissStore.from
        const vectorStore = await MemoryVectorStore.fromDocuments(
            docs,
            new GoogleVertexAIEmbeddings()
        );
        return vectorStore
    }
}