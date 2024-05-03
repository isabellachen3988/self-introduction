import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Start } from "./components/Start";
import { ChatInterface } from "./components/Chat";
import { ChatStateType, HistoryStateType } from "./types/chat";

const defaultState = {
	loading: false,
	isReady: false,
	mode: "start",
	text: "",
};

// hook: functions starting with use
// want to call these at the top of your components or other hooks
function App() {

	// USESTATE: required to remember information to display
	// use state returns the current state + the function that lets you update it
	// is a built in hook provided by react
	const [state, updateState] = useState<ChatStateType>(defaultState);
	const [history, updateHistory] = useState<HistoryStateType[]>(
		[] as HistoryStateType[]
	);

	// USEREF: react hook that lets you reference a value  not needed for rendering
	/// null is what the object's current property is initially
	// returns an object with a single "current" property
	const bottomRef = useRef<HTMLDivElement>(null);
	// ref: when you want a component to remember some information, but you don't want that information to trigger new renders


	// USEEFFECT: react hook that lets you synchronize a component with an external system, lets you run some code after rendering

	// control a non-react component based on react state
	// set up server connection
	// send analytics log

	// if the history array changes, it scrolls the bottomRef element into view with smooth behaviour
	// the bottomRef element
	// we have to wrap this in useEffect because rendering should be a pure calculation of JSX and should not contain
	// side effects like modifying the DOM
	useEffect(() => {
		if (history?.length) {
			bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [history]);

	return (
		<Box
			m="0"
			w="100%"
			display="flex"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			bgGradient="linear(to-l, #401446, #121937)"
		>
			<Flex
				borderRadius={"20px"}
				width="100%"
				maxW="1000px"
				height="600px"
				background="rgba(255, 255, 255, 0.06)"
				border="2px solid rgba(255, 255, 255, 0.4)"
				justifyContent={"center"}
			>
			{/* conditional rendering: when state mode is start, we create the Start component */}
			{state?.mode === "start" && (
				<Start state={state} updateState={updateState} />
			)}

			{state?.mode === "chat" && (
				<ChatInterface
					state={state}
					updateState={updateState} // displaying data with curly braces
					history={history} // passing information down is called props
					updateHistory={updateHistory}
					bottomRef={bottomRef}
				/>
			)}
			</Flex>
		</Box>
	);
}

export default App;
