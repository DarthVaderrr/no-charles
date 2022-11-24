const injectScript = chrome.runtime.getURL('dist/inject.js')
const head = document.head
const script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.src = injectScript
head.appendChild(script)