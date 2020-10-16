import { h } from 'preact';
import { useState } from 'preact/hooks';
import '@justinribeiro/lite-youtube';

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||     // [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||     // 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);



const App = () => {
	const [youtubeURL, setURL] = useState("");
	const { searchParams } = new URL(window.location.href)
	return(
	<div id="app" class="relative">
		{searchParams.get("v") ? (
			<lite-youtube
				class="absolute top-0 left-0 right-0 bottom-0"
				videoid={searchParams.get("v")}
			/>
		) : (
			<div>
				<b>Youtube URL:</b><input onInput={event => setURL(event.target.value)} />
				<div>
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							const vQueryString = new URL(youtubeURL).searchParams.get('v')
							if (isLocalhost) {
								console.log(`${window.location.host}?v=${vQueryString}`)
								window.location.replace(`${window.location.origin}?v=${vQueryString}`)
							} else {
								window.location.replace(new URL(window.location.origin).searchParams.append('v', vQueryString ))
							}
						}}
					>
						Submit
					</button>
				</div>
			</div>
		)}
	</div>
)}

export default App;
