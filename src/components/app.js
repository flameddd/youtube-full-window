import { h } from 'preact';
import { useState } from 'preact/hooks';
import '@justinribeiro/lite-youtube';
import '../tailwind.css'

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||     // [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||     // 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const getNewURL = url => {
  console.log(url)
  const vQueryString = new URL(url).searchParams.get('v')
  return isLocalhost
    ? `${window.location.origin}?v=${vQueryString}`
    : new URL(window.location.origin).searchParams.append('v', vQueryString)
}


const App = () => {
	const [youtubeURL, setURL] = useState("");
	const { searchParams } = new URL(window.location.href);

  const onSubmit = event => {
    event.preventDefault();
    window.location.replace(getNewURL(youtubeURL));
  }

  const openMinWindow = () => window.open(
    getNewURL(youtubeURL),
    'youtube-fullscreen-m',
    'directories=no, location=no,status=no, toolbar=no, menubar=no, resizable=yes'
  );

	return(
	<div id="app" class="relative">
		{searchParams.get("v") ? (
			<lite-youtube
				class="absolute top-0 left-0 right-0 bottom-0 m-0 p-0"
        autoplay="1"
				videoid={searchParams.get("v")}
			/>
		) : (
      <div class="h-screen grid grid-cols-3 gap-4 grid-rows-3">
        <form onsubmit={onSubmit} class="col-span-2">
          <input
            class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 w-full h-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
            placeholder="Youtube URL:"
            onInput={event => setURL(event.target.value)}
          />
        </form>
        <button
          class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline text-white font-bold col-span-1"
          onClick={onSubmit}
        >
          Watch
        </button>
        <button
          class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline text-white font-bold col-span-3"
          onClick={openMinWindow}
        >
          Open Min Window
        </button>
        <button
          class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline text-white font-bold col-span-3"
          onClick={openMinWindow}
        >
          Install and Open PWA
        </button>
			</div>
		)}
	</div>
)}

export default App;
