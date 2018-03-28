/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nep9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nep9 */ "./src/nep9/index.ts");

/* harmony default export */ __webpack_exports__["default"] = (Object.assign({}, _nep9__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./src/nep9/index.ts":
/*!***************************!*\
  !*** ./src/nep9/index.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/nep9/types.ts");

function generateUri(nep9) {
    let parameters = [];
    if (nep9.assetId) {
        parameters.push(`${_types__WEBPACK_IMPORTED_MODULE_0__["NEP9Key"].assetId}=${nep9.assetId}`);
    }
    if (nep9.amount) {
        parameters.push(`${_types__WEBPACK_IMPORTED_MODULE_0__["NEP9Key"].amount}=${nep9.amount}`);
    }
    if (nep9.transactionAttributes) {
        parameters = Object.keys(nep9.transactionAttributes).reduce((accum, key) => {
            const transactionAttributeKey = _types__WEBPACK_IMPORTED_MODULE_0__["TransactionAttributeKey"][key];
            const value = nep9.transactionAttributes[key];
            transactionAttributeKey && accum.push(`${transactionAttributeKey}=${value}`);
            return accum;
        }, parameters);
    }
    let output = `neo:${nep9.address}`;
    if (parameters.length) {
        output += `?${parameters.join('&')}`;
    }
    return output;
}
function parseUri(uri) {
    if (!uri.startsWith('neo:')) {
        throw 'Not a valid NEP9 uri';
    }
    uri = uri.replace(/^(neo\:)/, '');
    const uriParts = uri.split('?');
    const nep9 = {
        address: uriParts[0],
    };
    if (uriParts.length === 1) {
        return nep9;
    }
    const attributes = uriParts[1];
    const attributesList = attributes.split('&');
    const transactionAttributes = {};
    attributesList.forEach(attribute => {
        const attributeParts = attribute.split('=');
        if (attributeParts.length < 2) {
            return;
        }
        const key = attributeParts[0];
        const value = attributeParts[1];
        if (key === 'assetId' || key === 'amount') {
            nep9[key] = value;
        }
        else if (_types__WEBPACK_IMPORTED_MODULE_0__["TransactionAttributeKey"][key]) {
            transactionAttributes[key] = value;
        }
    });
    if (Object.keys(transactionAttributes).length) {
        nep9.transactionAttributes = transactionAttributes;
    }
    return nep9;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    generateUri,
    parseUri,
});


/***/ }),

/***/ "./src/nep9/types.ts":
/*!***************************!*\
  !*** ./src/nep9/types.ts ***!
  \***************************/
/*! exports provided: NEP9Key, TransactionAttributeKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEP9Key", function() { return NEP9Key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionAttributeKey", function() { return TransactionAttributeKey; });
var NEP9Key;
(function (NEP9Key) {
    NEP9Key["assetId"] = "assetId";
    NEP9Key["amount"] = "amount";
    NEP9Key["transactionAttributes"] = "transactionAttributes";
})(NEP9Key || (NEP9Key = {}));
var TransactionAttributeKey;
(function (TransactionAttributeKey) {
    TransactionAttributeKey["ecdh02"] = "ecdh02";
    TransactionAttributeKey["ecdh03"] = "ecdh03";
    TransactionAttributeKey["contractHash"] = "contractHash";
    TransactionAttributeKey["script"] = "script";
    TransactionAttributeKey["vote"] = "vote";
    TransactionAttributeKey["certUrl"] = "certUrl";
    TransactionAttributeKey["descriptionUrl"] = "descriptionUrl";
    TransactionAttributeKey["description"] = "description";
    TransactionAttributeKey["hash1"] = "hash1";
    TransactionAttributeKey["hash2"] = "hash2";
    TransactionAttributeKey["hash3"] = "hash3";
    TransactionAttributeKey["hash4"] = "hash4";
    TransactionAttributeKey["hash5"] = "hash5";
    TransactionAttributeKey["hash6"] = "hash6";
    TransactionAttributeKey["hash7"] = "hash7";
    TransactionAttributeKey["hash8"] = "hash8";
    TransactionAttributeKey["hash9"] = "hash9";
    TransactionAttributeKey["hash10"] = "hash10";
    TransactionAttributeKey["hash11"] = "hash11";
    TransactionAttributeKey["hash12"] = "hash12";
    TransactionAttributeKey["hash13"] = "hash13";
    TransactionAttributeKey["hash14"] = "hash14";
    TransactionAttributeKey["hash15"] = "hash15";
    TransactionAttributeKey["remark1"] = "remark1";
    TransactionAttributeKey["remark2"] = "remark2";
    TransactionAttributeKey["remark3"] = "remark3";
    TransactionAttributeKey["remark4"] = "remark4";
    TransactionAttributeKey["remark5"] = "remark5";
    TransactionAttributeKey["remark6"] = "remark6";
    TransactionAttributeKey["remark7"] = "remark7";
    TransactionAttributeKey["remark8"] = "remark8";
    TransactionAttributeKey["remark9"] = "remark9";
    TransactionAttributeKey["remark10"] = "remark10";
    TransactionAttributeKey["remark11"] = "remark11";
    TransactionAttributeKey["remark12"] = "remark12";
    TransactionAttributeKey["remark13"] = "remark13";
    TransactionAttributeKey["remark14"] = "remark14";
    TransactionAttributeKey["remark15"] = "remark15";
})(TransactionAttributeKey || (TransactionAttributeKey = {}));



/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./src/index ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index */"./src/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXA5L2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9uZXA5L3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRTBCO0FBRTFCLGlGQUNLLDZDQUFJLEdBQ1A7Ozs7Ozs7Ozs7Ozs7OztBQ0pzRjtBQUV4RixxQkFBcUIsSUFBVTtJQUM3QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyw4Q0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUN2RDtJQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyw4Q0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNyRDtJQUVELElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFF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O0lBQ2pCLDRDQUFpQjtJQUNqQix3REFBNkI7SUFDN0IsNENBQWlCO0lBQ2pCLHdDQUFhO0lBQ2IsOENBQW1CO0lBQ25CLDREQUFpQztJQUNqQyxzREFBMkI7SUFDM0IsMENBQWU7SUFDZiwwQ0FBZTtJQUNmLDBDQUFlO0lBQ2YsMENBQWU7SUFDZiwwQ0FBZTtJQUNmLDBDQUFlO0lBQ2YsMENBQWU7SUFDZiwwQ0FBZTtJQUNmLDBDQUFlO0lBQ2YsNENBQWlCO0lBQ2pCLDRDQUFpQjtJQUNqQiw0Q0FBaUI7SUFDakIsNENBQWlCO0lBQ2pCLDRDQUFpQjtJQUNqQiw0Q0FBaUI7SUFDakIsOENBQW1CO0lBQ25CLDhDQUFtQjtJQUNuQiw4Q0FBbUI7SUFDbkIsOENBQW1CO0lBQ25CLDhDQUFtQjtJQUNuQiw4Q0FBbUI7SUFDbkIsOENBQW1CO0lBQ25CLDhDQUFtQjtJQUNuQiw4Q0FBbUI7SUFDbkIsZ0RBQXFCO0lBQ3JCLGdEQUFxQjtJQUNyQixnREFBcUI7SUFDckIsZ0RBQXFCO0lBQ3JCLGdEQUFxQjtJQUNyQixnREFBcUI7QUFDdkIsQ0FBQyxFQXZDSSx1QkFBdUIsS0FBdkIsdUJBQXVCLFFBdUMzQjtBQU9DIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgbmVwOSBmcm9tICcuL25lcDknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLm5lcDksXG59O1xuIiwiaW1wb3J0IHsgTkVQOSwgVHJhbnNhY3Rpb25BdHRyaWJ1dGVzLCBUcmFuc2FjdGlvbkF0dHJpYnV0ZUtleSwgTkVQOUtleSB9IGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVVyaShuZXA5OiBORVA5KTogc3RyaW5nIHtcbiAgbGV0IHBhcmFtZXRlcnMgPSBbXTtcblxuICBpZiAobmVwOS5hc3NldElkKSB7XG4gICAgcGFyYW1ldGVycy5wdXNoKGAke05FUDlLZXkuYXNzZXRJZH09JHtuZXA5LmFzc2V0SWR9YCk7XG4gIH1cblxuICBpZiAobmVwOS5hbW91bnQpIHtcbiAgICBwYXJhbWV0ZXJzLnB1c2goYCR7TkVQOUtleS5hbW91bnR9PSR7bmVwOS5hbW91bnR9YCk7XG4gIH1cblxuICBpZiAobmVwOS50cmFuc2FjdGlvbkF0dHJpYnV0ZXMpIHtcbiAgICBwYXJhbWV0ZXJzID0gT2JqZWN0LmtleXMobmVwOS50cmFuc2FjdGlvbkF0dHJpYnV0ZXMpLnJlZHVjZSgoYWNjdW0sIGtleSkgPT4ge1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25BdHRyaWJ1dGVLZXkgPSBUcmFuc2FjdGlvbkF0dHJpYnV0ZUtleVtrZXldO1xuICAgICAgY29uc3QgdmFsdWUgPSBuZXA5LnRyYW5zYWN0aW9uQXR0cmlidXRlc1trZXldO1xuXG4gICAgICB0cmFuc2FjdGlvbkF0dHJpYnV0ZUtleSAmJiBhY2N1bS5wdXNoKGAke3RyYW5zYWN0aW9uQXR0cmlidXRlS2V5fT0ke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBsZXQgb3V0cHV0ID0gYG5lbzoke25lcDkuYWRkcmVzc31gO1xuXG4gIGlmIChwYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgIG91dHB1dCArPSBgPyR7cGFyYW1ldGVycy5qb2luKCcmJyl9YDtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVXJpKHVyaTogc3RyaW5nKTogTkVQOSB7XG4gIGlmICghdXJpLnN0YXJ0c1dpdGgoJ25lbzonKSkge1xuICAgIHRocm93ICdOb3QgYSB2YWxpZCBORVA5IHVyaSc7XG4gIH1cblxuICB1cmkgPSB1cmkucmVwbGFjZSgvXihuZW9cXDopLywgJycpO1xuXG4gIGNvbnN0IHVyaVBhcnRzID0gdXJpLnNwbGl0KCc/Jyk7XG4gIGNvbnN0IG5lcDk6IE5FUDkgPSB7XG4gICAgYWRkcmVzczogdXJpUGFydHNbMF0sXG4gIH07XG5cbiAgaWYgKHVyaVBhcnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBuZXA5O1xuICB9XG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IHVyaVBhcnRzWzFdO1xuICBjb25zdCBhdHRyaWJ1dGVzTGlzdCA9IGF0dHJpYnV0ZXMuc3BsaXQoJyYnKTtcbiAgY29uc3QgdHJhbnNhY3Rpb25BdHRyaWJ1dGVzOiBUcmFuc2FjdGlvbkF0dHJpYnV0ZXMgPSB7fTtcblxuICBhdHRyaWJ1dGVzTGlzdC5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XG4gICAgY29uc3QgYXR0cmlidXRlUGFydHMgPSBhdHRyaWJ1dGUuc3BsaXQoJz0nKTtcblxuICAgIGlmIChhdHRyaWJ1dGVQYXJ0cy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gYXR0cmlidXRlUGFydHNbMF07XG4gICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVQYXJ0c1sxXTtcblxuICAgIGlmIChrZXkgPT09ICdhc3NldElkJyB8fCBrZXkgPT09ICdhbW91bnQnKSB7XG4gICAgICBuZXA5W2tleV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKFRyYW5zYWN0aW9uQXR0cmlidXRlS2V5W2tleV0pIHtcbiAgICAgIHRyYW5zYWN0aW9uQXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAoT2JqZWN0LmtleXModHJhbnNhY3Rpb25BdHRyaWJ1dGVzKS5sZW5ndGgpIHtcbiAgICBuZXA5LnRyYW5zYWN0aW9uQXR0cmlidXRlcyA9IHRyYW5zYWN0aW9uQXR0cmlidXRlcztcbiAgfVxuXG4gIHJldHVybiBuZXA5O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdlbmVyYXRlVXJpLFxuICBwYXJzZVVyaSxcbn07XG4iLCJpbnRlcmZhY2UgTkVQOSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgYXNzZXRJZD86IHN0cmluZztcbiAgYW1vdW50PzogbnVtYmVyO1xuICB0cmFuc2FjdGlvbkF0dHJpYnV0ZXM/OiBUcmFuc2FjdGlvbkF0dHJpYnV0ZXM7XG59XG5cbmVudW0gTkVQOUtleSB7XG4gIGFzc2V0SWQgPSAnYXNzZXRJZCcsXG4gIGFtb3VudCA9ICdhbW91bnQnLFxuICB0cmFuc2FjdGlvbkF0dHJpYnV0ZXMgPSAndHJhbnNhY3Rpb25BdHRyaWJ1dGVzJyxcbn1cblxuaW50ZXJmYWNlIFRyYW5zYWN0aW9uQXR0cmlidXRlcyB7XG4gIGVjZGgwMj86IHN0cmluZztcbiAgZWNkaDAzPzogc3RyaW5nO1xuICBjb250cmFjdEhhc2g/OiBzdHJpbmc7XG4gIHNjcmlwdD86IHN0cmluZztcbiAgdm90ZT86IHN0cmluZztcbiAgY2VydFVybD86IHN0cmluZztcbiAgZGVzY3JpcHRpb25Vcmw/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBoYXNoMT86IHN0cmluZztcbiAgaGFzaDI/OiBzdHJpbmc7XG4gIGhhc2gzPzogc3RyaW5nO1xuICBoYXNoND86IHN0cmluZztcbiAgaGFzaDU/OiBzdHJpbmc7XG4gIGhhc2g2Pzogc3RyaW5nO1xuICBoYXNoNz86IHN0cmluZztcbiAgaGFzaDg/OiBzdHJpbmc7XG4gIGhhc2g5Pzogc3RyaW5nO1xuICBoYXNoMTA/OiBzdHJpbmc7XG4gIGhhc2gxMT86IHN0cmluZztcbiAgaGFzaDEyPzogc3RyaW5nO1xuICBoYXNoMTM/OiBzdHJpbmc7XG4gIGhhc2gxND86IHN0cmluZztcbiAgaGFzaDE1Pzogc3RyaW5nO1xuICByZW1hcmsxPzogc3RyaW5nO1xuICByZW1hcmsyPzogc3RyaW5nO1xuICByZW1hcmszPzogc3RyaW5nO1xuICByZW1hcms0Pzogc3RyaW5nO1xuICByZW1hcms1Pzogc3RyaW5nO1xuICByZW1hcms2Pzogc3RyaW5nO1xuICByZW1hcms3Pzogc3RyaW5nO1xuICByZW1hcms4Pzogc3RyaW5nO1xuICByZW1hcms5Pzogc3RyaW5nO1xuICByZW1hcmsxMD86IHN0cmluZztcbiAgcmVtYXJrMTE/OiBzdHJpbmc7XG4gIHJlbWFyazEyPzogc3RyaW5nO1xuICByZW1hcmsxMz86IHN0cmluZztcbiAgcmVtYXJrMTQ/OiBzdHJpbmc7XG4gIHJlbWFyazE1Pzogc3RyaW5nO1xufVxuXG5lbnVtIFRyYW5zYWN0aW9uQXR0cmlidXRlS2V5IHtcbiAgZWNkaDAyID0gJ2VjZGgwMicsXG4gIGVjZGgwMyA9ICdlY2RoMDMnLFxuICBjb250cmFjdEhhc2ggPSAnY29udHJhY3RIYXNoJyxcbiAgc2NyaXB0ID0gJ3NjcmlwdCcsXG4gIHZvdGUgPSAndm90ZScsXG4gIGNlcnRVcmwgPSAnY2VydFVybCcsXG4gIGRlc2NyaXB0aW9uVXJsID0gJ2Rlc2NyaXB0aW9uVXJsJyxcbiAgZGVzY3JpcHRpb24gPSAnZGVzY3JpcHRpb24nLFxuICBoYXNoMSA9ICdoYXNoMScsXG4gIGhhc2gyID0gJ2hhc2gyJyxcbiAgaGFzaDMgPSAnaGFzaDMnLFxuICBoYXNoNCA9ICdoYXNoNCcsXG4gIGhhc2g1ID0gJ2hhc2g1JyxcbiAgaGFzaDYgPSAnaGFzaDYnLFxuICBoYXNoNyA9ICdoYXNoNycsXG4gIGhhc2g4ID0gJ2hhc2g4JyxcbiAgaGFzaDkgPSAnaGFzaDknLFxuICBoYXNoMTAgPSAnaGFzaDEwJyxcbiAgaGFzaDExID0gJ2hhc2gxMScsXG4gIGhhc2gxMiA9ICdoYXNoMTInLFxuICBoYXNoMTMgPSAnaGFzaDEzJyxcbiAgaGFzaDE0ID0gJ2hhc2gxNCcsXG4gIGhhc2gxNSA9ICdoYXNoMTUnLFxuICByZW1hcmsxID0gJ3JlbWFyazEnLFxuICByZW1hcmsyID0gJ3JlbWFyazInLFxuICByZW1hcmszID0gJ3JlbWFyazMnLFxuICByZW1hcms0ID0gJ3JlbWFyazQnLFxuICByZW1hcms1ID0gJ3JlbWFyazUnLFxuICByZW1hcms2ID0gJ3JlbWFyazYnLFxuICByZW1hcms3ID0gJ3JlbWFyazcnLFxuICByZW1hcms4ID0gJ3JlbWFyazgnLFxuICByZW1hcms5ID0gJ3JlbWFyazknLFxuICByZW1hcmsxMCA9ICdyZW1hcmsxMCcsXG4gIHJlbWFyazExID0gJ3JlbWFyazExJyxcbiAgcmVtYXJrMTIgPSAncmVtYXJrMTInLFxuICByZW1hcmsxMyA9ICdyZW1hcmsxMycsXG4gIHJlbWFyazE0ID0gJ3JlbWFyazE0JyxcbiAgcmVtYXJrMTUgPSAncmVtYXJrMTUnLFxufVxuXG5leHBvcnQge1xuICBORVA5LFxuICBORVA5S2V5LFxuICBUcmFuc2FjdGlvbkF0dHJpYnV0ZXMsXG4gIFRyYW5zYWN0aW9uQXR0cmlidXRlS2V5LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=