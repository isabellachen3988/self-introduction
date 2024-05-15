import { Request, Response } from "express";
import TextLoader from "./textloader";
import { FileDataObtainingStrategy, WebDataObtainingStrategy } from "./data_strategy";

export const inMemoryChat = async (req: Request, res: Response) => {
	const question = req.query.question as string;
	const filePath = "files/context.docx";
	const webPage = "https://keiishima3.webnode.page/";
	const textloader = new TextLoader(new WebDataObtainingStrategy());
	let result = "";
	try {
		result = await textloader.LoadText(question, webPage)
	} catch(error) {
		result = error as string;
		console.log(error)
	}
	
	// const result = await TextLoader(question, filePath);

	res.status(200).json({
		question,
		answer: result,
	});
};
