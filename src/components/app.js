import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import cc from 'classcat';
import Youtube from './Youtube.js';
import Github from './Github.js';
import '../tailwind.css'
import { isLocalhost } from '../utils'
import bg from '../bg.jpg';

let basename = '';

if (process && process.env && process.env.GITHUB_PAGES) {
  basename = `/${process.env.GITHUB_PAGES}`;
}

const getNewURL = url => {
  const vQueryString = new URL(url).searchParams.get('v');
  const newURL = new URL(`${window.location.origin}${basename}`)
  newURL.searchParams.append('v', vQueryString);
  return isLocalhost
    ? `${window.location.origin}?v=${vQueryString}`
    : newURL.href
}


const App = () => {
	const [youtubeURL, setURL] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [displayMode, setDisplayMode] = useState(
    window.matchMedia('(display-mode: standalone)').matches
    ? 'standalone'
    : 'browser tab'
  )
	const { searchParams } = new URL(window.location.href);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
    });

    window.addEventListener('appinstalled', (evt) => {
      setDisplayMode('standalone');
    });
    return () => {}
  }, []);

  function installPWA (event) {
    if (!deferredPrompt) {
      return;
    }
    
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }

  const onSubmit = event => {
    event.preventDefault();
    window.location.assign(getNewURL(youtubeURL));
  }

  const openMinWindow = () => window.open(
    getNewURL(youtubeURL),
    'youtube-fullscreen-m',
    'directories=no, location=no,status=no, toolbar=no, menubar=no, resizable=yes'
  );

  // show PWA install button only when "browser support PWA install" && "PWA not open"
  const showPWAButton = displayMode !== 'standalone' && !!deferredPrompt;

  return(
	<div id="app" class="relative flex justify-center items-center">
		{searchParams.get("v") ? (
      <>
        <div
          class="absolute top-0 left-0 w-16 bg-purple-700 z-10 grid place-content-center text-white text-4xl bold rounded opacity-0 transition-opacity duration-500 ease-in-out animate-fadeOut hover:opacity-100 select-none cursor-pointer"
          style={{ height: "70%", top: "calc(50% - 35%)" }}
          onClick={() => window.location.assign(`${window.location.origin}${window.location.pathname}`)}
        >
          {"<"}
        </div>
        <Youtube class="absolute top-0 left-0 right-0 bottom-0 m-0 p-0" videoid={searchParams.get("v")} />
      </>
    ) : (
      <>
        <div
          class="absolute top-0 left-0 right-0 bottom-0 m-0 p-0 bg-cover"
          style={{ backgroundImage: `url(${bg})`, filter: "blur(5px)" }}
        />
        <a href="https://github.com/flameddd/youtube-full-window" target="_blank">
          <Github class="absolute top-0 right-0 m-4 p-1 bg-white rounded-full hover:bg-gray-300 " width="50px" height="50px" />
        </a>
        <div class={cc(["h-56 grid grid-cols-3 gap-5 w-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg  bg-white rounded-lg shadow-xl p-6 z-10", { "grid-rows-4": showPWAButton, "grid-rows-3": !showPWAButton }])}>
          <div class="col-span-3 flex items-center justify-center text-6xl bold">
            <svg height="60px" width="66px">
              <g>
                <path fill="#FF0000" d="M63,14.87c-0.72-2.7-2.85-4.83-5.56-5.56C52.54,8,32.88,8,32.88,8S13.23,8,8.32,9.31 c-2.7,0.72-4.83,2.85-5.56,5.56C1.45,19.77,1.45,30,1.45,30s0,10.23,1.31,15.13c0.72,2.7,2.85,4.83,5.56,5.56 C13.23,52,32.88,52,32.88,52s19.66,0,24.56-1.31c2.7-0.72,4.83-2.85,5.56-5.56C64.31,40.23,64.31,30,64.31,30 S64.31,19.77,63,14.87z"  />
                <polygon fill="#FFFFFF" points="26.6,39.43 42.93,30 26.6,20.57"  />
              </g>
            </svg>
            <span class="overflow-hidden whitespace-no-wrap">Youtube full screen</span>
          </div>
          <form onsubmit={onSubmit} class="col-span-2">
            <input
              class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 w-full h-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4"
              placeholder="Youtube URL:"
              value={youtubeURL}
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
          {showPWAButton && (
            <button
              class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline text-white font-bold col-span-3"
              onClick={installPWA}
            >
              Install and Open PWA
            </button>
          )}
        </div>
      </>
		)}
	</div>
)}

export default App;
