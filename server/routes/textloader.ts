import "dotenv/config";
import { loadQAStuffChain } from "langchain/chains";
import { DataObtainingStrategy } from "./data_strategy";
import { Document } from "@langchain/core/documents";
import { DocumentInterface } from "@langchain/core/documents";
import { Ollama } from "@langchain/community/llms/ollama";
import { GoogleVertexAIEmbeddings } from "@langchain/community/embeddings/googlevertexai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export default class TextLoader {
    private strategy: DataObtainingStrategy

    constructor(strategy: DataObtainingStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: DataObtainingStrategy) {
        this.strategy = strategy
    }

	public async LoadText(question = "", data = "") {
		const docs = await this.strategy.obtainDocument(data)

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
	}
}
