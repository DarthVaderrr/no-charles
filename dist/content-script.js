/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content-script.ts ***!
  \*******************************/
const injectScript = chrome.runtime.getURL('dist/inject.js');
const head = document.head;
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.src = injectScript;
head.appendChild(script);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtBQUMxQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQztBQUM5QyxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVk7QUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uby1jaGFybGVzLy4vc3JjL2NvbnRlbnQtc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluamVjdFNjcmlwdCA9IGNocm9tZS5ydW50aW1lLmdldFVSTCgnZGlzdC9pbmplY3QuanMnKVxuY29uc3QgaGVhZCA9IGRvY3VtZW50LmhlYWRcbmNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG5zY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpXG5zY3JpcHQuc3JjID0gaW5qZWN0U2NyaXB0XG5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=