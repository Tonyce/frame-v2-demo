// import { useEffect, useState } from "react";
// import sdk from "@farcaster/frame-sdk";

// export default function Demo() {
// 	const [isSDKLoaded, setIsSDKLoaded] = useState(false);

// 	useEffect(() => {
// 		const load = async () => {
// 			sdk.actions.ready();
// 		};
// 		if (sdk && !isSDKLoaded) {
// 			setIsSDKLoaded(true);
// 			load();
// 		}
// 	}, [isSDKLoaded]);

// 	return (
// 		<div className="w-[300px] mx-auto py-4 px-2">
// 			<h1 className="text-2xl font-bold text-center mb-4">Frames v2 Demo</h1>
// 		</div>
// 	);
// }
/** 
import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

export default function Demo() {
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [context, setContext] = useState<FrameContext>();
	const [isContextOpen, setIsContextOpen] = useState(false);

	useEffect(() => {
		const load = async () => {
			setContext(await sdk.context);
			sdk.actions.ready();
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	const toggleContext = useCallback(() => {
		setIsContextOpen((prev) => !prev);
	}, []);

	const openUrl = useCallback(() => {
    sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, []);


	if (!isSDKLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-[300px] mx-auto py-4 px-2">
			<h1 className="text-2xl font-bold text-center mb-4">Frames v2 Demo</h1>

			<div className="mb-4">
				<h2 className="font-2xl font-bold">Context</h2>
				<button
					onClick={toggleContext}
					className="flex items-center gap-2 transition-colors"
				>
					<span
						className={`transform transition-transform ${
							isContextOpen ? "rotate-90" : ""
						}`}
					>
						➤
					</span>
					Tap to expand
				</button>

				{isContextOpen && (
					<div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
						<pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
							{JSON.stringify(context, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}
*/

import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

export default function Demo() {
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [context, setContext] = useState<FrameContext>();
	const [isContextOpen, setIsContextOpen] = useState(false);
	const [isSDKEnv, setIsSDKEnv] = useState(false);

	const toggleContext = useCallback(() => {
		setIsContextOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		console.log("sdk", sdk);
		const load = async () => {
			setContext(await sdk.context);
			await sdk.actions.ready();
			setIsSDKEnv(true);
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	const openUrl = useCallback(() => {
		sdk.actions.openUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
	}, []);

	const close = useCallback(() => {
		sdk.actions.close();
	}, []);

	if (!isSDKLoaded) {
		return <div>Loading...</div>;
	}

	if (!isSDKEnv) {
		return <div>Normal</div>;
	}

	return (
		<div className="w-[300px] mx-auto py-4 px-2">
			<h1 className="text-2xl font-bold text-center mb-4">Frames v2 Demo</h1>

			<div className="mb-4">
				<h2 className="font-2xl font-bold">Context</h2>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={toggleContext}
					className="flex items-center gap-2 transition-colors"
				>
					<span
						className={`transform transition-transform ${
							isContextOpen ? "rotate-90" : ""
						}`}
					>
						➤
					</span>
					Tap to expand
				</button>

				{isContextOpen && (
					<div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
						<pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
							{JSON.stringify(context, null, 2)}
						</pre>
					</div>
				)}
			</div>

			<div>
				<h2 className="font-2xl font-bold">Actions</h2>

				<div className="mb-4">
					<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
						<pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
							sdk.actions.openUrl
						</pre>
					</div>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button onClick={openUrl}>Open Link</button>
				</div>
			</div>

			<div className="mb-4">
				<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
					<pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
						sdk.actions.close
					</pre>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button onClick={close}>Close Frame</button>
			</div>
		</div>
	);
}
