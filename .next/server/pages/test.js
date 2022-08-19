"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/test";
exports.ids = ["pages/test"];
exports.modules = {

/***/ "./pages/test/index.js":
/*!*****************************!*\
  !*** ./pages/test/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Index = ({ mezigs  })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: mezigs.data.map((mezigs)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: mezigs.firstName\n            }, mezigs.firstName, false, {\n                fileName: \"/home/vincent/depots/mezig/pages/test/index.js\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, undefined))\n    }, void 0, false);\n/* Retrieves pet(s) data from mongodb database */ async function getServerSideProps() {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"http://localhost:3020/api/mezigs/\");\n    return {\n        props: {\n            mezigs: res.data\n        }\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy90ZXN0L2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQTBCO0FBRTFCLE1BQU1DLEtBQUssR0FBRyxDQUFDLEVBQUVDLE1BQU0sR0FBRSxpQkFDdkI7a0JBRUdBLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHLENBQUMsQ0FBQ0YsTUFBTSxpQkFDdEIsOERBQUNHLEdBQUM7MEJBQXlCSCxNQUFNLENBQUNJLFNBQVM7ZUFBbkNKLE1BQU0sQ0FBQ0ksU0FBUzs7Ozt5QkFBd0IsQ0FDaEQ7cUJBQ0Q7QUFHTCwrQ0FBK0MsR0FDeEMsZUFBZUMsa0JBQWtCLEdBQUc7SUFDekMsTUFBTUMsR0FBRyxHQUFHLE1BQU1SLGdEQUFTLENBQUMsbUNBQW1DLENBQUM7SUFFaEUsT0FBTztRQUNMVSxLQUFLLEVBQUU7WUFDTFIsTUFBTSxFQUFFTSxHQUFHLENBQUNMLElBQUk7U0FDakI7S0FDRixDQUFDO0NBQ0g7QUFFRCxpRUFBZUYsS0FBSyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWV6aWcvLi9wYWdlcy90ZXN0L2luZGV4LmpzP2QxYjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgSW5kZXggPSAoeyBtZXppZ3MgfSkgPT4gKFxuICA8PlxuICAgIHsvKiBDcmVhdGUgYSBjYXJkIGZvciBlYWNoIHBldCAqL31cbiAgICB7bWV6aWdzLmRhdGEubWFwKChtZXppZ3MpID0+IChcbiAgICAgIDxwIGtleT17bWV6aWdzLmZpcnN0TmFtZX0+e21lemlncy5maXJzdE5hbWV9PC9wPlxuICAgICkpfVxuICA8Lz5cbik7XG5cbi8qIFJldHJpZXZlcyBwZXQocykgZGF0YSBmcm9tIG1vbmdvZGIgZGF0YWJhc2UgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDIwL2FwaS9tZXppZ3MvJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9wczoge1xuICAgICAgbWV6aWdzOiByZXMuZGF0YSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleDtcbiJdLCJuYW1lcyI6WyJheGlvcyIsIkluZGV4IiwibWV6aWdzIiwiZGF0YSIsIm1hcCIsInAiLCJmaXJzdE5hbWUiLCJnZXRTZXJ2ZXJTaWRlUHJvcHMiLCJyZXMiLCJnZXQiLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/test/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/test/index.js"));
module.exports = __webpack_exports__;

})();