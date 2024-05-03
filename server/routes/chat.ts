import { Request, Response } from "express";
import TextLoader from "./textloader";
import { FileDataObtainingStrategy } from "./data_strategy";

export const inMemoryChat = async (req: Request, res: Response) => {
	const question = req.query.question as string;
	const filePath = "files/romeo&juliet.docx";

	const textloader = new TextLoader(new FileDataObtainingStrategy());
	let result = "";
	try {
		result = await textloader.LoadText(question, filePath)
	} catch(error) {
		result = error as string;
	}
	
	// const result = await TextLoader(question, filePath);

	res.status(200).json({
		question,
		answer: result,
	});
};
