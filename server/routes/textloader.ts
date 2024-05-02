import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { loadQAStuffChain } from "langchain/chains";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { DocumentInterface } from "@langchain/core/documents";
import { Ollama } from "@langchain/community/llms/ollama";
import { FaissStore } from "@langchain/community/vectorstores/faiss"
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { VertexAI } from "@langchain/google-vertexai"
import { GoogleVertexAIEmbeddings } from "@langchain/community/embeddings/googlevertexai";

export default async (question = "", filePath = "") => {
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
    return "unsupported file type";
  }

  const docs = await loader.load();

  // const vectorStore = await FaissStore.from
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new GoogleVertexAIEmbeddings()
  );

  const searchResponse = await vectorStore.similaritySearch(question, 1);
  const textRes = searchResponse
    .map((item: DocumentInterface<Record<string, any>>) => item?.pageContent)
    .join("\n");
  // const llm = new OpenAI({ modelName: "gpt-4" });
  const llm = new Ollama({
    model: "llama3:latest",
  })
  // const llm = new VertexAI({ temperature: 0.7 })
  
  const chain = loadQAStuffChain(llm);

  const result = await chain.invoke({
    input_documents: [new Document({ pageContent: `${textRes}` })],
    question,
  });

  console.log(`\n\n Question: ${question}`);
  console.log(`\n\n Answer: ${result.text}`);
  return result.text;
};
