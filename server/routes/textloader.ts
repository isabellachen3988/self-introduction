import "dotenv/config";
import { loadQAStuffChain } from "langchain/chains";
import { DataObtainingStrategy } from "./data_strategy";
import { Document } from "@langchain/core/documents";
import { DocumentInterface } from "@langchain/core/documents";
import { Ollama } from "@langchain/community/llms/ollama";

export default class TextLoader {
    private strategy: DataObtainingStrategy

    constructor(strategy: DataObtainingStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: DataObtainingStrategy) {
        this.strategy = strategy
    }

	public async LoadText(question = "", data = "") {
		const vectorStore = await this.strategy.obtainVectorStore(data)

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


// export async function WebTextLoader("")

// export async function FileTextLoader (question = "", filePath = "") {
// 	const fileExtension = filePath.split(".").pop();
// 	let loader;

// 	if (fileExtension === "docx") {
// 		loader = new DocxLoader(filePath);
// 	} else if (fileExtension === "txt") {
// 		loader = new TextLoader(filePath);
// 	} else if (fileExtension === "pdf") {
// 		loader = new PDFLoader(filePath, {
// 		splitPages: false,
// 		});
// 	} else {
// 		return "unsupported file type";
// 	}

// 	const docs = await loader.load();

// 	// const vectorStore = await FaissStore.from
// 	const vectorStore = await MemoryVectorStore.fromDocuments(
// 		docs,
// 		new GoogleVertexAIEmbeddings()
// 	);

// 	const searchResponse = await vectorStore.similaritySearch(question, 1);
// 	const textRes = searchResponse
// 		.map((item: DocumentInterface<Record<string, any>>) => item?.pageContent)
// 		.join("\n");
// 	// const llm = new OpenAI({ modelName: "gpt-4" });
// 	const llm = new Ollama({
// 		model: "llama3:latest",
// 	})
// 	// const llm = new VertexAI({ temperature: 0.7 })
	
// 	const chain = loadQAStuffChain(llm);

// 	const result = await chain.invoke({
// 		input_documents: [new Document({ pageContent: `${textRes}` })],
// 		question,
// 	});

// 	console.log(`\n\n Question: ${question}`);
// 	console.log(`\n\n Answer: ${result.text}`);
// 	return result.text;
// };
