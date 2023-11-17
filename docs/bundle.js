(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.keywords = void 0;
var compilerRuntime = require("../src/compiler/compiler").runtime;
exports.keywords = [
    "print",
    "declare",
    "functionName",
    "function",
    "while",
    "assign",
    "if",
    "endif",
    "else",
    "proc",
    "parameters",
    "code",
    "console",
    "comment",
    "->"
];
var operators = ["+", "-", "*", "/", "==", "<", ">", "&&", ","];
var compileButton = document.getElementById("compile");
var codeArea = document.getElementById("code");
var outputArea = document.getElementById("output");
var canvas = document.getElementById("canvas");
var shareUrl = document.getElementById("shareUrl");
var copyUrl = document.getElementById("copyUrl");
if (window.location.hash) {
    var encoded = window.location.href.split("#")[1];
    codeArea.value = atob(decodeURIComponent(encoded));
}
// quick and dirty image data scaling
// see: https://stackoverflow.com/questions/3448347/how-to-scale-an-imagedata-in-html-canvas
var scaleImageData = function (imageData, scale, ctx) {
    var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
    var subLine = ctx.createImageData(scale, 1).data;
    for (var row = 0; row < imageData.height; row++) {
        for (var col = 0; col < imageData.width; col++) {
            var sourcePixel = imageData.data.subarray((row * imageData.width + col) * 4, (row * imageData.width + col) * 4 + 4);
            for (var x = 0; x < scale; x++)
                subLine.set(sourcePixel, x * 4);
            for (var y = 0; y < scale; y++) {
                var destRow = row * scale + y;
                var destCol = col * scale;
                scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4);
            }
        }
    }
    return scaled;
};
CodeMirror.defineSimpleMode("simplemode", {
    start: [
        {
            regex: new RegExp("(" + exports.keywords.join("|") + ")"),
            token: "keyword"
        },
        {
            regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
            token: "number"
        },
        { regex: /[-+\/*=<>!]+/, token: "operator" },
        { regex: /[a-z$][\w$]*/, token: "variable" }
    ]
});
var editor = CodeMirror.fromTextArea(codeArea, {
    mode: "simplemode",
    theme: "abcdef",
    lineNumbers: true
});
$("#shareModal").on("show.bs.modal", function () {
    var baseUrl = window.location.href.split("#")[0];
    var code = encodeURIComponent(btoa(editor.getValue()));
    shareUrl.value = baseUrl + "#" + code;
});
copyUrl.addEventListener("click", function () {
    return navigator.clipboard.writeText(shareUrl.value);
});
var sleep = function (ms) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var marker;
var logMessage = function (message) {
    return (outputArea.value = outputArea.value + message + "\n");
};
var markError = function (token) {
    marker = editor.markText({ line: token.line, ch: token.char }, { line: token.line, ch: token.char + token.value.length }, { className: "error" });
};
var updateCanvas = function (display) {
    var context = canvas.getContext("2d");
    var imgData = context.createImageData(100, 100);
    for (var i = 0; i < 100 * 100; i++) {
        imgData.data[i * 4] = display[i];
        imgData.data[i * 4 + 1] = display[i];
        imgData.data[i * 4 + 2] = display[i];
        imgData.data[i * 4 + 3] = 255;
    }
    var data = scaleImageData(imgData, 3, context);
    context.putImageData(data, 0, 0);
};
var run = function (runtime) { return __awaiter(void 0, void 0, void 0, function () {
    var tickFunction, display, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (marker) {
                    marker.clear();
                }
                return [4 /*yield*/, sleep(10)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                display = new Uint8Array(10000);
                return [4 /*yield*/, runtime(editor.getValue(), {
                        print: logMessage,
                        display: display
                    })];
            case 3:
                tickFunction = _a.sent();
                outputArea.value = "";
                logMessage("Executing ... ");
                tickFunction();
                logMessage("Execution Done");
                updateCanvas(display);
                compileButton.classList.remove("active");
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                logMessage(error_1.message);
                markError(error_1.token);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
compileButton.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                compileButton.classList.add("active");
                return [4 /*yield*/, run(compilerRuntime)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

},{"../src/compiler/compiler":5}],2:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],3:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":2,"buffer":3,"ieee754":4}],4:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],5:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.runtime = exports.compile = void 0;
var emitter_1 = require("./emitter");
var transformer_1 = require("./transformer");
var parser = __importStar(require("../grammar/FunctionsGrammar"));
exports.compile = function (src) {
    var ast = parser.parse(src);
    var transformedAst = transformer_1.transformer(ast);
    var wasm = emitter_1.emitter(transformedAst);
    return wasm;
};
exports.runtime = function (src, env) { return __awaiter(void 0, void 0, void 0, function () {
    var wasm, memory, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wasm = exports.compile(src);
                memory = new WebAssembly.Memory({ initial: 1 });
                return [4 /*yield*/, WebAssembly.instantiate(wasm, {
                        env: __assign(__assign({}, env), { memory: memory })
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, function () {
                        result.instance.exports.run();
                        env.display.set(new Uint8Array(memory.buffer, 0, 10000));
                    }];
        }
    });
}); };

},{"../grammar/FunctionsGrammar":10,"./emitter":6,"./transformer":7}],6:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.emitter = void 0;
var encoding_utils_1 = require("./utils/encoding.utils");
var traverse_utils_1 = __importDefault(require("./utils/traverse.utils"));
var flatten = function (arr) { return [].concat.apply([], arr); };
// https://webassembly.github.io/spec/core/binary/modules.html#sections
var Section;
(function (Section) {
    Section[Section["custom"] = 0] = "custom";
    Section[Section["type"] = 1] = "type";
    Section[Section["import"] = 2] = "import";
    Section[Section["func"] = 3] = "func";
    Section[Section["table"] = 4] = "table";
    Section[Section["memory"] = 5] = "memory";
    Section[Section["global"] = 6] = "global";
    Section[Section["export"] = 7] = "export";
    Section[Section["start"] = 8] = "start";
    Section[Section["element"] = 9] = "element";
    Section[Section["code"] = 10] = "code";
    Section[Section["data"] = 11] = "data";
})(Section || (Section = {}));
// https://webassembly.github.io/spec/core/binary/types.html
var Valtype;
(function (Valtype) {
    Valtype[Valtype["i32"] = 127] = "i32";
    Valtype[Valtype["f32"] = 125] = "f32";
})(Valtype || (Valtype = {}));
// https://webassembly.github.io/spec/core/binary/types.html#binary-blocktype
var Blocktype;
(function (Blocktype) {
    Blocktype[Blocktype["void"] = 64] = "void";
})(Blocktype || (Blocktype = {}));
// https://webassembly.github.io/spec/core/binary/instructions.html
var Opcodes;
(function (Opcodes) {
    Opcodes[Opcodes["block"] = 2] = "block";
    Opcodes[Opcodes["loop"] = 3] = "loop";
    Opcodes[Opcodes["br"] = 12] = "br";
    Opcodes[Opcodes["br_if"] = 13] = "br_if";
    Opcodes[Opcodes["end"] = 11] = "end";
    Opcodes[Opcodes["call"] = 16] = "call";
    Opcodes[Opcodes["get_local"] = 32] = "get_local";
    Opcodes[Opcodes["set_local"] = 33] = "set_local";
    Opcodes[Opcodes["i32_store_8"] = 58] = "i32_store_8";
    Opcodes[Opcodes["i32_const"] = 65] = "i32_const";
    Opcodes[Opcodes["f32_const"] = 67] = "f32_const";
    Opcodes[Opcodes["i32_eqz"] = 69] = "i32_eqz";
    Opcodes[Opcodes["i32_eq"] = 70] = "i32_eq";
    Opcodes[Opcodes["f32_eq"] = 91] = "f32_eq";
    Opcodes[Opcodes["f32_lt"] = 93] = "f32_lt";
    Opcodes[Opcodes["f32_gt"] = 94] = "f32_gt";
    Opcodes[Opcodes["i32_and"] = 113] = "i32_and";
    Opcodes[Opcodes["f32_add"] = 146] = "f32_add";
    Opcodes[Opcodes["f32_sub"] = 147] = "f32_sub";
    Opcodes[Opcodes["f32_mul"] = 148] = "f32_mul";
    Opcodes[Opcodes["f32_div"] = 149] = "f32_div";
    Opcodes[Opcodes["i32_trunc_f32_s"] = 168] = "i32_trunc_f32_s";
})(Opcodes || (Opcodes = {}));
var binaryOpcode = {
    "+": Opcodes.f32_add,
    "-": Opcodes.f32_sub,
    "*": Opcodes.f32_mul,
    "/": Opcodes.f32_div,
    "==": Opcodes.f32_eq,
    ">": Opcodes.f32_gt,
    "<": Opcodes.f32_lt,
    "&&": Opcodes.i32_and
};
// http://webassembly.github.io/spec/core/binary/modules.html#export-section
var ExportType;
(function (ExportType) {
    ExportType[ExportType["func"] = 0] = "func";
    ExportType[ExportType["table"] = 1] = "table";
    ExportType[ExportType["mem"] = 2] = "mem";
    ExportType[ExportType["global"] = 3] = "global";
})(ExportType || (ExportType = {}));
// http://webassembly.github.io/spec/core/binary/types.html#function-types
var functionType = 0x60;
var emptyArray = 0x0;
// https://webassembly.github.io/spec/core/binary/modules.html#binary-module
var magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
var moduleVersion = [0x01, 0x00, 0x00, 0x00];
// https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec
// Vectors are encoded with their length followed by their element sequence
var encodeVector = function (data) { return __spread(encoding_utils_1.unsignedLEB128(data.length), flatten(data)); };
// https://webassembly.github.io/spec/core/binary/modules.html#code-section
var encodeLocal = function (count, type) { return __spread(encoding_utils_1.unsignedLEB128(count), [
    type
]); };
// https://webassembly.github.io/spec/core/binary/modules.html#sections
// sections are encoded by their type followed by their vector contents
var createSection = function (sectionType, data) { return __spread([
    sectionType
], encodeVector(data)); };
var codeFromProc = function (node, program) {
    var code = [];
    var symbols = new Map(node.args.map(function (arg, index) { return [arg.value, index]; }));
    var localIndexForSymbol = function (name) {
        if (!symbols.has(name)) {
            symbols.set(name, symbols.size);
        }
        return symbols.get(name);
    };
    var emitExpression = function (node) {
        //@ts-ignore Here we have to take a look again
        return traverse_utils_1["default"](node, function (node) {
            switch (node.type) {
                case "numberLiteral":
                    code.push(Opcodes.f32_const);
                    code.push.apply(code, __spread(encoding_utils_1.ieee754(node.value)));
                    break;
                case "identifier":
                    code.push(Opcodes.get_local);
                    code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol(node.value))));
                    break;
                case "binaryExpression":
                    code.push(binaryOpcode[node.operator]);
                    break;
            }
        });
    };
    var emitStatements = function (statements) {
        return statements.forEach(function (statement) {
            switch (statement.type) {
                case "printStatement":
                    emitExpression(statement.expression);
                    code.push(Opcodes.call);
                    code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(0)));
                    break;
                case "variableDeclaration":
                    emitExpression(statement.initializer);
                    code.push(Opcodes.set_local);
                    code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol(statement.name))));
                    break;
                case "variableAssignment":
                    emitExpression(statement.value);
                    code.push(Opcodes.set_local);
                    code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol(statement.name))));
                    break;
                case "whileStatement":
                    // outer block
                    code.push(Opcodes.block);
                    code.push(Blocktype["void"]);
                    // inner loop
                    code.push(Opcodes.loop);
                    code.push(Blocktype["void"]);
                    // compute the while expression
                    emitExpression(statement.expression);
                    code.push(Opcodes.i32_eqz);
                    // br_if $label0
                    code.push(Opcodes.br_if);
                    code.push.apply(code, __spread(encoding_utils_1.signedLEB128(1)));
                    // the nested logic
                    emitStatements(statement.statements);
                    // br $label1
                    code.push(Opcodes.br);
                    code.push.apply(code, __spread(encoding_utils_1.signedLEB128(0)));
                    // end loop
                    code.push(Opcodes.end);
                    // end block
                    code.push(Opcodes.end);
                    break;
                case "ifStatement":
                    // if block
                    code.push(Opcodes.block);
                    code.push(Blocktype["void"]);
                    // compute the if expression
                    emitExpression(statement.expression);
                    code.push(Opcodes.i32_eqz);
                    // br_if $label0
                    code.push(Opcodes.br_if);
                    code.push.apply(code, __spread(encoding_utils_1.signedLEB128(0)));
                    // the nested logic
                    emitStatements(statement.consequent);
                    // end block
                    code.push(Opcodes.end);
                    // else block
                    code.push(Opcodes.block);
                    code.push(Blocktype["void"]);
                    // compute the if expression
                    emitExpression(statement.expression);
                    code.push(Opcodes.i32_const);
                    code.push.apply(code, __spread(encoding_utils_1.signedLEB128(1)));
                    code.push(Opcodes.i32_eq);
                    // br_if $label0
                    code.push(Opcodes.br_if);
                    code.push.apply(code, __spread(encoding_utils_1.signedLEB128(0)));
                    // the nested logic
                    emitStatements(statement.alternate);
                    // end block
                    code.push(Opcodes.end);
                    break;
                case "callStatement":
                    if (statement.name === "setpixel") {
                        // compute and cache the setpixel parameters
                        emitExpression(statement.args[0]);
                        code.push(Opcodes.set_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("x"))));
                        emitExpression(statement.args[1]);
                        code.push(Opcodes.set_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("y"))));
                        emitExpression(statement.args[2]);
                        code.push(Opcodes.set_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("color"))));
                        // compute the offset (x * 100) + y
                        code.push(Opcodes.get_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("y"))));
                        code.push(Opcodes.f32_const);
                        code.push.apply(code, __spread(encoding_utils_1.ieee754(100)));
                        code.push(Opcodes.f32_mul);
                        code.push(Opcodes.get_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("x"))));
                        code.push(Opcodes.f32_add);
                        // convert to an integer
                        code.push(Opcodes.i32_trunc_f32_s);
                        // fetch the color
                        code.push(Opcodes.get_local);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(localIndexForSymbol("color"))));
                        code.push(Opcodes.i32_trunc_f32_s);
                        // write
                        code.push(Opcodes.i32_store_8);
                        code.push.apply(code, __spread([0x00, 0x00])); // align and offset
                    }
                    else {
                        statement.args.forEach(function (arg) {
                            emitExpression(arg);
                        });
                        var index = program.findIndex(function (f) { return f.name === statement.name; });
                        code.push(Opcodes.call);
                        code.push.apply(code, __spread(encoding_utils_1.unsignedLEB128(index + 1)));
                    }
                    break;
            }
        });
    };
    emitStatements(node.statements);
    var localCount = symbols.size;
    var locals = localCount > 0 ? [encodeLocal(localCount, Valtype.f32)] : [];
    return encodeVector(__spread(encodeVector(locals), code, [Opcodes.end]));
};
//@ts-ignore Here we have to take a look again
exports.emitter = function (ast) {
    // Function types are vectors of parameters and return types. Currently
    // WebAssembly only supports single return values
    var printFunctionType = __spread([
        functionType
    ], encodeVector([Valtype.f32]), [
        emptyArray
    ]);
    // TODO: optimise - some of the procs might have the same type signature
    var funcTypes = ast.map(function (proc) { return __spread([
        functionType
    ], encodeVector(proc.args.map(function (_) { return Valtype.f32; })), [
        emptyArray
    ]); });
    // the type section is a vector of function types
    var typeSection = createSection(Section.type, encodeVector(__spread([printFunctionType], funcTypes)));
    // the function section is a vector of type indices that indicate the type of each function
    // in the code section
    var funcSection = createSection(Section.func, encodeVector(ast.map(function (_, index) { return index + 1; } /* type index */)));
    // the import section is a vector of imported functions
    var printFunctionImport = __spread(encoding_utils_1.encodeString("env"), encoding_utils_1.encodeString("print"), [
        ExportType.func,
        0x00 // type index
    ]);
    var memoryImport = __spread(encoding_utils_1.encodeString("env"), encoding_utils_1.encodeString("memory"), [
        ExportType.mem,
        /* limits https://webassembly.github.io/spec/core/binary/types.html#limits -
          indicates a min memory size of one page */
        0x00,
        0x01
    ]);
    var importSection = createSection(Section["import"], encodeVector([printFunctionImport, memoryImport]));
    // the export section is a vector of exported functions
    var exportSection = createSection(Section["export"], encodeVector([
        __spread(encoding_utils_1.encodeString("run"), [
            ExportType.func,
            ast.findIndex(function (a) { return a.name === "main"; }) + 1
        ])
    ]));
    // the code section contains vectors of functions
    var codeSection = createSection(Section.code, encodeVector(ast.map(function (a) { return codeFromProc(a, ast); })));
    return Uint8Array.from(__spread(magicModuleHeader, moduleVersion, typeSection, importSection, funcSection, exportSection, codeSection));
};

},{"./utils/encoding.utils":8,"./utils/traverse.utils":9}],7:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.transformer = void 0;
exports.transformer = function (ast) {
    // do we have a main proc?
    if (!ast.find(function (a) { return a.type === "procStatement" && a.name === "main"; })) {
        // if not - collect up any 'free' statements and add one.
        var freeStatements = ast.filter(function (a) { return a.type !== "procStatement"; });
        var mainProc = {
            type: "procStatement",
            name: "main",
            args: [],
            statements: freeStatements
        };
        ast = __spread([mainProc], ast.filter(function (a) { return a.type === "procStatement"; }));
    }
    return ast.map(function (a) { return a; });
};

},{}],8:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.unsignedLEB128 = exports.signedLEB128 = exports.encodeString = exports.ieee754 = void 0;
exports.ieee754 = function (n) {
    var buf = Buffer.allocUnsafe(4);
    buf.writeFloatLE(n, 0);
    return Uint8Array.from(buf);
};
exports.encodeString = function (str) { return __spread([
    str.length
], str.split("").map(function (s) { return s.charCodeAt(0); })); };
exports.signedLEB128 = function (n) {
    var buffer = [];
    var more = true;
    var isNegative = n < 0;
    var bitCount = Math.ceil(Math.log2(Math.abs(n))) + 1;
    while (more) {
        var byte = n & 0x7f;
        n >>= 7;
        if (isNegative) {
            n = n | -(1 << (bitCount - 8));
        }
        if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0x40)) {
            more = false;
        }
        else {
            byte |= 0x80;
        }
        buffer.push(byte);
    }
    return buffer;
};
exports.unsignedLEB128 = function (n) {
    var buffer = [];
    do {
        var byte = n & 0x7f;
        n >>>= 7;
        if (n !== 0) {
            byte |= 0x80;
        }
        buffer.push(byte);
    } while (n !== 0);
    return buffer;
};

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":3}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
// post order ast walker
var traverse = function (nodes, visitor) {
    nodes = Array.isArray(nodes) ? nodes : [nodes];
    nodes.forEach(function (node) {
        //@ts-ignore Here we have to take a look again
        Object.keys(node).forEach(function (prop) {
            var value = node[prop];
            var valueAsArray = Array.isArray(value) ? value : [value];
            valueAsArray.forEach(function (childNode) {
                if (typeof childNode.type === "string") {
                    traverse(childNode, visitor);
                }
            });
        });
        visitor(node);
    });
};
exports["default"] = traverse;

},{}],10:[function(require,module,exports){
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
"use strict";
function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
}
function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
    }
}
peg$subclass(peg$SyntaxError, Error);
peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
        literal: function (expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
        },
        "class": function (expectation) {
            var escapedParts = "", i;
            for (i = 0; i < expectation.parts.length; i++) {
                escapedParts += expectation.parts[i] instanceof Array
                    ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                    : classEscape(expectation.parts[i]);
            }
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function (expectation) {
            return "any character";
        },
        end: function (expectation) {
            return "end of input";
        },
        other: function (expectation) {
            return expectation.description;
        }
    };
    function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function classEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/\]/g, '\\]')
            .replace(/\^/g, '\\^')
            .replace(/-/g, '\\-')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected) {
        var descriptions = new Array(expected.length), i, j;
        for (i = 0; i < expected.length; i++) {
            descriptions[i] = describeExpectation(expected[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                }
            }
            descriptions.length = j;
        }
        switch (descriptions.length) {
            case 1:
                return descriptions[0];
            case 2:
                return descriptions[0] + " or " + descriptions[1];
            default:
                return descriptions.slice(0, -1).join(", ")
                    + ", or "
                    + descriptions[descriptions.length - 1];
        }
    }
    function describeFound(found) {
        return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {}, peg$startRuleFunctions = { start: peg$parsestart }, peg$startRuleFunction = peg$parsestart, peg$c0 = function (returnType, name, parameterObj, statements) { return { type: "procStatement", name: name.value, returnType: returnType, args: parameterObj, statements: statements }; }, peg$c1 = function (head, m) { return m; }, peg$c2 = function (head, tail) {
        return head;
    }, peg$c3 = function (members) { return members !== null ? members : {}; }, peg$c4 = function (head, tail) {
        var array = [];
        [head].concat(tail).forEach(function (element) {
            array.push(element);
        });
        return array;
    }, peg$c5 = function (name, value) { return { type: "identifier", value: name.value, internalType: value.value }; }, peg$c6 = function (name, value) { return { name: name, value: value }; }, peg$c7 = function (head, v) { return v; }, peg$c8 = function (head, tail) { return [head].concat(tail); }, peg$c9 = function (values) { return values !== null ? values : []; }, peg$c10 = "", peg$c11 = "comment", peg$c12 = peg$literalExpectation("comment", false), peg$c13 = function (value) { return { type: "commentStatement", value: value }; }, peg$c14 = "declare", peg$c15 = peg$literalExpectation("declare", false), peg$c16 = function (value) { return { type: "variableDeclaration", name: value["name"].value, initializer: { type: value["value"].type, value: value["value"].value }, additional: value }; }, peg$c17 = "console", peg$c18 = peg$literalExpectation("console", false), peg$c19 = function (value) { return { type: "printStatement", expression: value.value }; }, peg$c20 = "assign", peg$c21 = peg$literalExpectation("assign", false), peg$c22 = function (value) { return { type: "variableAssignment", name: value.to.value, value: value.from }; }, peg$c23 = "->", peg$c24 = peg$literalExpectation("->", false), peg$c25 = function (value) { return { type: "callStatement", name: value.functionName, args: value.parameters }; }, peg$c26 = "while", peg$c27 = peg$literalExpectation("while", false), peg$c28 = function (value) { return { type: "whileStatement", expression: value.condition, statements: value.loop }; }, peg$c29 = "math", peg$c30 = peg$literalExpectation("math", false), peg$c31 = function (value) { return { type: "binaryExpression", left: value.left, operator: value.op.value, right: value.right }; }, peg$c32 = /^[a-zA-Z_]/, peg$c33 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false), peg$c34 = /^[a-zA-Z0-9_]/, peg$c35 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false), peg$c36 = function (name, value) { return { name: appendElements(name), value: value }; }, peg$c37 = function (value) { return { value: value }; }, peg$c38 = "proc", peg$c39 = peg$literalExpectation("proc", false), peg$c40 = "parameters", peg$c41 = peg$literalExpectation("parameters", false), peg$c42 = function (functionName, parameters) { return { functionName: functionName.value, parameters: parameters }; }, peg$c43 = "condition", peg$c44 = peg$literalExpectation("condition", false), peg$c45 = "cond", peg$c46 = peg$literalExpectation("cond", false), peg$c47 = "loop", peg$c48 = peg$literalExpectation("loop", false), peg$c49 = function (condition, loop) { return { condition: condition, loop: loop }; }, peg$c50 = "left", peg$c51 = peg$literalExpectation("left", false), peg$c52 = "op", peg$c53 = peg$literalExpectation("op", false), peg$c54 = "right", peg$c55 = peg$literalExpectation("right", false), peg$c56 = function (left, op, right) { return { left: left, op: op, right: right }; }, peg$c57 = "to", peg$c58 = peg$literalExpectation("to", false), peg$c59 = "value", peg$c60 = peg$literalExpectation("value", false), peg$c61 = function (to, command) { return { to: to, from: command }; }, peg$c62 = function (content) {
        var result = {};
        return content;
    }, peg$c63 = ":", peg$c64 = peg$literalExpectation(":", false), peg$c65 = function (name, content) { return { name: name, value: content }; }, peg$c66 = "type", peg$c67 = peg$literalExpectation("type", false), peg$c68 = "scope", peg$c69 = peg$literalExpectation("scope", false), peg$c70 = "name", peg$c71 = peg$literalExpectation("name", false), peg$c72 = function (type, scope, name, value) { return { "type": type, "scope": scope, "name": name, "value": value }; }, peg$c73 = "private", peg$c74 = peg$literalExpectation("private", false), peg$c75 = "public", peg$c76 = peg$literalExpectation("public", false), peg$c77 = function (scope) { return scope; }, peg$c78 = "<int>", peg$c79 = peg$literalExpectation("<int>", false), peg$c80 = "<float>", peg$c81 = peg$literalExpectation("<float>", false), peg$c82 = "function", peg$c83 = peg$literalExpectation("function", false), peg$c84 = "\"", peg$c85 = peg$literalExpectation("\"", false), peg$c86 = "\\", peg$c87 = peg$literalExpectation("\\", false), peg$c88 = "/", peg$c89 = peg$literalExpectation("/", false), peg$c90 = "b", peg$c91 = peg$literalExpectation("b", false), peg$c92 = function () { return "\b"; }, peg$c93 = "f", peg$c94 = peg$literalExpectation("f", false), peg$c95 = function () { return "\f"; }, peg$c96 = "n", peg$c97 = peg$literalExpectation("n", false), peg$c98 = function () { return "\n"; }, peg$c99 = "r", peg$c100 = peg$literalExpectation("r", false), peg$c101 = function () { return "\r"; }, peg$c102 = "t", peg$c103 = peg$literalExpectation("t", false), peg$c104 = function () { return "\t"; }, peg$c105 = "u", peg$c106 = peg$literalExpectation("u", false), peg$c107 = function (digits) { return String.fromCharCode(parseInt(digits, 16)); }, peg$c108 = function (sequence) { return sequence; }, peg$c109 = peg$otherExpectation("integer"), peg$c110 = /^[0-9]/, peg$c111 = peg$classExpectation([["0", "9"]], false, false), peg$c112 = function () { return { type: "numberLiteral", value: parseInt(text(), 10) }; }, peg$c113 = peg$otherExpectation("number"), peg$c114 = function () { return { type: "numberLiteral", value: parseFloat(text()) }; }, peg$c115 = peg$otherExpectation("string"), peg$c116 = function (chars) { return { type: "stringLiteral", value: chars.join("") }; }, peg$c117 = /^[eE]/, peg$c118 = peg$classExpectation(["e", "E"], false, false), peg$c119 = function (number) { return { type: "numberLiteral", value: parseInt(appendElements(number)) }; }, peg$c120 = "{", peg$c121 = peg$literalExpectation("{", false), peg$c122 = "}", peg$c123 = peg$literalExpectation("}", false), peg$c124 = ",", peg$c125 = peg$literalExpectation(",", false), peg$c126 = "functionName", peg$c127 = peg$literalExpectation("functionName", false), peg$c128 = "codeBlock", peg$c129 = peg$literalExpectation("codeBlock", false), peg$c130 = "code", peg$c131 = peg$literalExpectation("code", false), peg$c132 = "-", peg$c133 = peg$literalExpectation("-", false), peg$c134 = "+", peg$c135 = peg$literalExpectation("+", false), peg$c136 = "[", peg$c137 = peg$literalExpectation("[", false), peg$c138 = "]", peg$c139 = peg$literalExpectation("]", false), peg$c140 = ".", peg$c141 = peg$literalExpectation(".", false), peg$c142 = "0", peg$c143 = peg$literalExpectation("0", false), peg$c144 = /^[0-9a-f]/i, peg$c145 = peg$classExpectation([["0", "9"], ["a", "f"]], false, true), peg$c146 = /^[ \t\n\r]/, peg$c147 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false), peg$c148 = function (value) { return appendElements(value); }, peg$c149 = function (value) { return { type: "identifier", value: appendElements(value) }; }, peg$c150 = /^[^\0-\x1F"\\]/, peg$c151 = peg$classExpectation([["\0", "\x1F"], "\"", "\\"], true, false), peg$c152 = /^[1-9]/, peg$c153 = peg$classExpectation([["1", "9"]], false, false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
    if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
    }
    function error(message, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location);
    }
    function peg$literalExpectation(text, ignoreCase) {
        return { type: "literal", text: text, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
    }
    function peg$buildSimpleError(message, location) {
        return new peg$SyntaxError(message, null, null, location);
    }
    function peg$buildStructuredError(expected, found, location) {
        return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parsestart() {
        var s0;
        s0 = peg$parseRootArray();
        return s0;
    }
    function peg$parsedefinitions() {
        var s0;
        s0 = peg$parsefunctionDefinition();
        if (s0 === peg$FAILED) {
            s0 = peg$parsestatements();
        }
        return s0;
    }
    function peg$parsefunctionDefinition() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27, s28, s29, s30, s31;
        s0 = peg$currPos;
        s1 = peg$parsefunctionKeyword();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsetypeRepresentations();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecolon();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseopenBrace();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsews();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsenameKeyword();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsews();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$parsecolon();
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsews();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsestring();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                s15 = peg$parsecomma();
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parseparameterKeyword();
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                s19 = peg$parsecolon();
                                                                                if (s19 !== peg$FAILED) {
                                                                                    s20 = peg$parsews();
                                                                                    if (s20 !== peg$FAILED) {
                                                                                        s21 = peg$parseparameterObj();
                                                                                        if (s21 !== peg$FAILED) {
                                                                                            s22 = peg$parsews();
                                                                                            if (s22 !== peg$FAILED) {
                                                                                                s23 = peg$parsecomma();
                                                                                                if (s23 !== peg$FAILED) {
                                                                                                    s24 = peg$parsews();
                                                                                                    if (s24 !== peg$FAILED) {
                                                                                                        s25 = peg$parsecodeNameKeyword();
                                                                                                        if (s25 !== peg$FAILED) {
                                                                                                            s26 = peg$parsecolon();
                                                                                                            if (s26 !== peg$FAILED) {
                                                                                                                s27 = peg$parsews();
                                                                                                                if (s27 !== peg$FAILED) {
                                                                                                                    s28 = peg$parsearray();
                                                                                                                    if (s28 !== peg$FAILED) {
                                                                                                                        s29 = peg$parsews();
                                                                                                                        if (s29 !== peg$FAILED) {
                                                                                                                            s30 = peg$parsecloseBrace();
                                                                                                                            if (s30 !== peg$FAILED) {
                                                                                                                                s31 = peg$parsews();
                                                                                                                                if (s31 !== peg$FAILED) {
                                                                                                                                    peg$savedPos = s0;
                                                                                                                                    s1 = peg$c0(s3, s13, s21, s28);
                                                                                                                                    s0 = s1;
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    peg$currPos = s0;
                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                }
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                peg$currPos = s0;
                                                                                                                                s0 = peg$FAILED;
                                                                                                                            }
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            peg$currPos = s0;
                                                                                                                            s0 = peg$FAILED;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        peg$currPos = s0;
                                                                                                                        s0 = peg$FAILED;
                                                                                                                    }
                                                                                                                }
                                                                                                                else {
                                                                                                                    peg$currPos = s0;
                                                                                                                    s0 = peg$FAILED;
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                peg$currPos = s0;
                                                                                                                s0 = peg$FAILED;
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            peg$currPos = s0;
                                                                                                            s0 = peg$FAILED;
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        peg$currPos = s0;
                                                                                                        s0 = peg$FAILED;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    peg$currPos = s0;
                                                                                                    s0 = peg$FAILED;
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                peg$currPos = s0;
                                                                                                s0 = peg$FAILED;
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            peg$currPos = s0;
                                                                                            s0 = peg$FAILED;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        peg$currPos = s0;
                                                                                        s0 = peg$FAILED;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    peg$currPos = s0;
                                                                                    s0 = peg$FAILED;
                                                                                }
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseobject() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsews();
            if (s3 !== peg$FAILED) {
                s4 = peg$parsemember();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsews();
                    if (s5 !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsecomma();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parsews();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parsemember();
                                if (s10 !== peg$FAILED) {
                                    peg$savedPos = s7;
                                    s8 = peg$c1(s4, s10);
                                    s7 = s8;
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        while (s7 !== peg$FAILED) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsecomma();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parsews();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parsemember();
                                    if (s10 !== peg$FAILED) {
                                        peg$savedPos = s7;
                                        s8 = peg$c1(s4, s10);
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s3 = peg$c2(s4, s6);
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecloseBrace();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c3(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseparameterObj() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsews();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseparameterMember();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsews();
                    if (s5 !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsecomma();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parsews();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parseparameterMember();
                                if (s10 !== peg$FAILED) {
                                    peg$savedPos = s7;
                                    s8 = peg$c1(s4, s10);
                                    s7 = s8;
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        while (s7 !== peg$FAILED) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsecomma();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parsews();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parseparameterMember();
                                    if (s10 !== peg$FAILED) {
                                        peg$savedPos = s7;
                                        s8 = peg$c1(s4, s10);
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s3 = peg$c4(s4, s6);
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecloseBrace();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c3(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseparameterMember() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsestring();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsecolon();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsews();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsetypeRepresentations();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsews();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c5(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsemember() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsestring();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsecolon();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsews();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsetypeRepresentations();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsews();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c6(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsearray() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parsebegin_array();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseCodeObject();
            if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$currPos;
                s6 = peg$parsecomma();
                if (s6 !== peg$FAILED) {
                    s7 = peg$parsews();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseCodeObject();
                        if (s8 !== peg$FAILED) {
                            peg$savedPos = s5;
                            s6 = peg$c7(s3, s8);
                            s5 = s6;
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$currPos;
                    s6 = peg$parsecomma();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsews();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseCodeObject();
                            if (s8 !== peg$FAILED) {
                                peg$savedPos = s5;
                                s6 = peg$c7(s3, s8);
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                if (s4 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c8(s3, s4);
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseend_array();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c9(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseCodeObject() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsews();
            if (s3 !== peg$FAILED) {
                s4 = peg$parsestatements();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsews();
                    if (s5 !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsecomma();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parsews();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parsestatements();
                                if (s10 !== peg$FAILED) {
                                    peg$savedPos = s7;
                                    s8 = peg$c1(s4, s10);
                                    s7 = s8;
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        while (s7 !== peg$FAILED) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsecomma();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parsews();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parsestatements();
                                    if (s10 !== peg$FAILED) {
                                        peg$savedPos = s7;
                                        s8 = peg$c1(s4, s10);
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s3 = peg$c2(s4, s6);
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecloseBrace();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c3(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRootObject() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsews();
            if (s3 !== peg$FAILED) {
                s4 = peg$parsedefinitions();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsews();
                    if (s5 !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parsecomma();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parsews();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parsedefinitions();
                                if (s10 !== peg$FAILED) {
                                    peg$savedPos = s7;
                                    s8 = peg$c1(s4, s10);
                                    s7 = s8;
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        while (s7 !== peg$FAILED) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parsecomma();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parsews();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parsedefinitions();
                                    if (s10 !== peg$FAILED) {
                                        peg$savedPos = s7;
                                        s8 = peg$c1(s4, s10);
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s3 = peg$c2(s4, s6);
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecloseBrace();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c3(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRootArray() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parsebegin_array();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseRootObject();
            if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$currPos;
                s6 = peg$parsecomma();
                if (s6 !== peg$FAILED) {
                    s7 = peg$parsews();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseRootObject();
                        if (s8 !== peg$FAILED) {
                            peg$savedPos = s5;
                            s6 = peg$c7(s3, s8);
                            s5 = s6;
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$currPos;
                    s6 = peg$parsecomma();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsews();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseRootObject();
                            if (s8 !== peg$FAILED) {
                                peg$savedPos = s5;
                                s6 = peg$c7(s3, s8);
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                if (s4 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c8(s3, s4);
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseend_array();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c9(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseparameterArray() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parsebegin_array();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsetypes();
            if (s3 === peg$FAILED) {
                s3 = peg$c10;
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$currPos;
                s6 = peg$parsecomma();
                if (s6 !== peg$FAILED) {
                    s7 = peg$parsews();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parsetypes();
                        if (s8 === peg$FAILED) {
                            s8 = peg$c10;
                        }
                        if (s8 !== peg$FAILED) {
                            peg$savedPos = s5;
                            s6 = peg$c7(s3, s8);
                            s5 = s6;
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$currPos;
                    s6 = peg$parsecomma();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsews();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parsetypes();
                            if (s8 === peg$FAILED) {
                                s8 = peg$c10;
                            }
                            if (s8 !== peg$FAILED) {
                                peg$savedPos = s5;
                                s6 = peg$c7(s3, s8);
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                if (s4 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c8(s3, s4);
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseend_array();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c9(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseCommentStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c11) {
            s1 = peg$c11;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c12);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseCommentType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c13(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseDeclareStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c15);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseDeclareType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c16(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsePrintStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c17) {
            s1 = peg$c17;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c18);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseprintType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c19(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseAssignmentStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c20) {
            s1 = peg$c20;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c21);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseAssignType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c22(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseCallStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c24);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseCallType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c25(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseLoopStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c26) {
            s1 = peg$c26;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c27);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseLoopType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c28(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMathStatement() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecolon();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseMathType();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c31(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseOtherStatement() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            if (peg$c32.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c33);
                }
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                if (peg$c34.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                    }
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    if (peg$c34.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c35);
                        }
                    }
                }
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsecolon();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsews();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseparameterArray();
                            if (s6 === peg$FAILED) {
                                s6 = peg$parsetypes();
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsews();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c36(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseCommentType() {
        var s0;
        s0 = peg$parsestring();
        if (s0 === peg$FAILED) {
            s0 = peg$parsenumber();
            if (s0 === peg$FAILED) {
                s0 = peg$parseCodeObject();
            }
        }
        return s0;
    }
    function peg$parseprintType() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseCodeObject();
        if (s1 === peg$FAILED) {
            s1 = peg$parseidentifier();
            if (s1 === peg$FAILED) {
                s1 = peg$parsetypes();
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseCallType() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c38) {
                    s3 = peg$c38;
                    peg$currPos += 4;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c39);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecolon();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseidentifier();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsews();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsecomma();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsews();
                                            if (s10 !== peg$FAILED) {
                                                if (input.substr(peg$currPos, 10) === peg$c40) {
                                                    s11 = peg$c40;
                                                    peg$currPos += 10;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c41);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsews();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsecolon();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                s15 = peg$parseparameterArray();
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parsecloseBrace();
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                peg$savedPos = s0;
                                                                                s1 = peg$c42(s7, s15);
                                                                                s0 = s1;
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseLoopType() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 9) === peg$c43) {
                    s3 = peg$c43;
                    peg$currPos += 9;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
                    }
                }
                if (s3 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c45) {
                        s3 = peg$c45;
                        peg$currPos += 4;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c46);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecolon();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseopenBrace();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsews();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseMathStatement();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsews();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$parsecloseBrace();
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsews();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsecomma();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.substr(peg$currPos, 4) === peg$c47) {
                                                                    s15 = peg$c47;
                                                                    peg$currPos += 4;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c48);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parsecolon();
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                s19 = peg$parsearray();
                                                                                if (s19 !== peg$FAILED) {
                                                                                    s20 = peg$parsews();
                                                                                    if (s20 !== peg$FAILED) {
                                                                                        s21 = peg$parsecloseBrace();
                                                                                        if (s21 !== peg$FAILED) {
                                                                                            s22 = peg$parsews();
                                                                                            if (s22 !== peg$FAILED) {
                                                                                                peg$savedPos = s0;
                                                                                                s1 = peg$c49(s9, s19);
                                                                                                s0 = s1;
                                                                                            }
                                                                                            else {
                                                                                                peg$currPos = s0;
                                                                                                s0 = peg$FAILED;
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            peg$currPos = s0;
                                                                                            s0 = peg$FAILED;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        peg$currPos = s0;
                                                                                        s0 = peg$FAILED;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    peg$currPos = s0;
                                                                                    s0 = peg$FAILED;
                                                                                }
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMathType() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c50) {
                    s3 = peg$c50;
                    peg$currPos += 4;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c51);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecolon();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseCodeObject();
                                if (s7 === peg$FAILED) {
                                    s7 = peg$parseidentifier();
                                    if (s7 === peg$FAILED) {
                                        s7 = peg$parsetypes();
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsews();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsecomma();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsews();
                                            if (s10 !== peg$FAILED) {
                                                if (input.substr(peg$currPos, 2) === peg$c52) {
                                                    s11 = peg$c52;
                                                    peg$currPos += 2;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c53);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsews();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsecolon();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                s15 = peg$parsestring();
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parsecomma();
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                if (input.substr(peg$currPos, 5) === peg$c54) {
                                                                                    s19 = peg$c54;
                                                                                    peg$currPos += 5;
                                                                                }
                                                                                else {
                                                                                    s19 = peg$FAILED;
                                                                                    if (peg$silentFails === 0) {
                                                                                        peg$fail(peg$c55);
                                                                                    }
                                                                                }
                                                                                if (s19 !== peg$FAILED) {
                                                                                    s20 = peg$parsews();
                                                                                    if (s20 !== peg$FAILED) {
                                                                                        s21 = peg$parsecolon();
                                                                                        if (s21 !== peg$FAILED) {
                                                                                            s22 = peg$parsews();
                                                                                            if (s22 !== peg$FAILED) {
                                                                                                s23 = peg$parseCodeObject();
                                                                                                if (s23 === peg$FAILED) {
                                                                                                    s23 = peg$parseidentifier();
                                                                                                    if (s23 === peg$FAILED) {
                                                                                                        s23 = peg$parsetypes();
                                                                                                    }
                                                                                                }
                                                                                                if (s23 !== peg$FAILED) {
                                                                                                    s24 = peg$parsews();
                                                                                                    if (s24 !== peg$FAILED) {
                                                                                                        s25 = peg$parsecloseBrace();
                                                                                                        if (s25 !== peg$FAILED) {
                                                                                                            s26 = peg$parsews();
                                                                                                            if (s26 !== peg$FAILED) {
                                                                                                                peg$savedPos = s0;
                                                                                                                s1 = peg$c56(s7, s15, s23);
                                                                                                                s0 = s1;
                                                                                                            }
                                                                                                            else {
                                                                                                                peg$currPos = s0;
                                                                                                                s0 = peg$FAILED;
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            peg$currPos = s0;
                                                                                                            s0 = peg$FAILED;
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        peg$currPos = s0;
                                                                                                        s0 = peg$FAILED;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    peg$currPos = s0;
                                                                                                    s0 = peg$FAILED;
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                peg$currPos = s0;
                                                                                                s0 = peg$FAILED;
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            peg$currPos = s0;
                                                                                            s0 = peg$FAILED;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        peg$currPos = s0;
                                                                                        s0 = peg$FAILED;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    peg$currPos = s0;
                                                                                    s0 = peg$FAILED;
                                                                                }
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseAssignType() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c57) {
                    s3 = peg$c57;
                    peg$currPos += 2;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c58);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecolon();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseidentifier();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsews();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsecomma();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsews();
                                            if (s10 !== peg$FAILED) {
                                                if (input.substr(peg$currPos, 5) === peg$c59) {
                                                    s11 = peg$c59;
                                                    peg$currPos += 5;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c60);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsews();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsecolon();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                s15 = peg$parseCodeObject();
                                                                if (s15 === peg$FAILED) {
                                                                    s15 = peg$parseidentifier();
                                                                    if (s15 === peg$FAILED) {
                                                                        s15 = peg$parsetypes();
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parsecloseBrace();
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                peg$savedPos = s0;
                                                                                s1 = peg$c61(s7, s15);
                                                                                s0 = s1;
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseDeclareType() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseopenBrace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsedeclarationPart();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsecloseBrace();
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c62(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedeclarationContent() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c15);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                    s3 = peg$c63;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c64);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseopenBrace();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsews();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsedeclarationPart();
                                if (s7 !== peg$FAILED) {
                                    s8 = [];
                                    s9 = peg$currPos;
                                    s10 = peg$parsecomma();
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parsews();
                                        if (s11 !== peg$FAILED) {
                                            s12 = peg$parsedeclarationPart();
                                            if (s12 !== peg$FAILED) {
                                                s10 = [s10, s11, s12];
                                                s9 = s10;
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                    while (s9 !== peg$FAILED) {
                                        s8.push(s9);
                                        s9 = peg$currPos;
                                        s10 = peg$parsecomma();
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parsews();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsedeclarationPart();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsews();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parsecloseBrace();
                                            if (s10 !== peg$FAILED) {
                                                peg$savedPos = s0;
                                                s1 = peg$c65(s1, s7);
                                                s0 = s1;
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedeclarationPart() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c66) {
            s1 = peg$c66;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c67);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsews();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                    s3 = peg$c63;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c64);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsews();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsetypeRepresentations();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsecomma();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsews();
                                if (s7 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 5) === peg$c68) {
                                        s8 = peg$c68;
                                        peg$currPos += 5;
                                    }
                                    else {
                                        s8 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c69);
                                        }
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parsews();
                                        if (s9 !== peg$FAILED) {
                                            if (input.charCodeAt(peg$currPos) === 58) {
                                                s10 = peg$c63;
                                                peg$currPos++;
                                            }
                                            else {
                                                s10 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c64);
                                                }
                                            }
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$parsews();
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsescopeValue();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parsecomma();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parsews();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.substr(peg$currPos, 4) === peg$c70) {
                                                                    s15 = peg$c70;
                                                                    peg$currPos += 4;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c71);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parsews();
                                                                    if (s16 !== peg$FAILED) {
                                                                        if (input.charCodeAt(peg$currPos) === 58) {
                                                                            s17 = peg$c63;
                                                                            peg$currPos++;
                                                                        }
                                                                        else {
                                                                            s17 = peg$FAILED;
                                                                            if (peg$silentFails === 0) {
                                                                                peg$fail(peg$c64);
                                                                            }
                                                                        }
                                                                        if (s17 !== peg$FAILED) {
                                                                            s18 = peg$parsews();
                                                                            if (s18 !== peg$FAILED) {
                                                                                s19 = peg$parsestring();
                                                                                if (s19 !== peg$FAILED) {
                                                                                    s20 = peg$parsecomma();
                                                                                    if (s20 !== peg$FAILED) {
                                                                                        s21 = peg$parsews();
                                                                                        if (s21 !== peg$FAILED) {
                                                                                            if (input.substr(peg$currPos, 5) === peg$c59) {
                                                                                                s22 = peg$c59;
                                                                                                peg$currPos += 5;
                                                                                            }
                                                                                            else {
                                                                                                s22 = peg$FAILED;
                                                                                                if (peg$silentFails === 0) {
                                                                                                    peg$fail(peg$c60);
                                                                                                }
                                                                                            }
                                                                                            if (s22 !== peg$FAILED) {
                                                                                                s23 = peg$parsews();
                                                                                                if (s23 !== peg$FAILED) {
                                                                                                    if (input.charCodeAt(peg$currPos) === 58) {
                                                                                                        s24 = peg$c63;
                                                                                                        peg$currPos++;
                                                                                                    }
                                                                                                    else {
                                                                                                        s24 = peg$FAILED;
                                                                                                        if (peg$silentFails === 0) {
                                                                                                            peg$fail(peg$c64);
                                                                                                        }
                                                                                                    }
                                                                                                    if (s24 !== peg$FAILED) {
                                                                                                        s25 = peg$parsews();
                                                                                                        if (s25 !== peg$FAILED) {
                                                                                                            s26 = peg$parseCodeObject();
                                                                                                            if (s26 === peg$FAILED) {
                                                                                                                s26 = peg$parseidentifier();
                                                                                                                if (s26 === peg$FAILED) {
                                                                                                                    s26 = peg$parsetypes();
                                                                                                                }
                                                                                                            }
                                                                                                            if (s26 !== peg$FAILED) {
                                                                                                                s27 = peg$parsews();
                                                                                                                if (s27 !== peg$FAILED) {
                                                                                                                    peg$savedPos = s0;
                                                                                                                    s1 = peg$c72(s5, s12, s19, s26);
                                                                                                                    s0 = s1;
                                                                                                                }
                                                                                                                else {
                                                                                                                    peg$currPos = s0;
                                                                                                                    s0 = peg$FAILED;
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                peg$currPos = s0;
                                                                                                                s0 = peg$FAILED;
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            peg$currPos = s0;
                                                                                                            s0 = peg$FAILED;
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        peg$currPos = s0;
                                                                                                        s0 = peg$FAILED;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    peg$currPos = s0;
                                                                                                    s0 = peg$FAILED;
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                peg$currPos = s0;
                                                                                                s0 = peg$FAILED;
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            peg$currPos = s0;
                                                                                            s0 = peg$FAILED;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        peg$currPos = s0;
                                                                                        s0 = peg$FAILED;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    peg$currPos = s0;
                                                                                    s0 = peg$FAILED;
                                                                                }
                                                                            }
                                                                            else {
                                                                                peg$currPos = s0;
                                                                                s0 = peg$FAILED;
                                                                            }
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsescopeValue() {
        var s0, s1;
        if (input.substr(peg$currPos, 7) === peg$c73) {
            s0 = peg$c73;
            peg$currPos += 7;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c74);
            }
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 6) === peg$c75) {
                s1 = peg$c75;
                peg$currPos += 6;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c76);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c77(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parsestatements() {
        var s0;
        s0 = peg$parseCommentStatement();
        if (s0 === peg$FAILED) {
            s0 = peg$parseDeclareStatement();
            if (s0 === peg$FAILED) {
                s0 = peg$parseAssignmentStatement();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseMathStatement();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseCallStatement();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parsePrintStatement();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseLoopStatement();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseOtherStatement();
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsetypeRepresentations() {
        var s0;
        s0 = peg$parseintRepresentation();
        if (s0 === peg$FAILED) {
            s0 = peg$parsefloatRepresentation();
        }
        return s0;
    }
    function peg$parseintRepresentation() {
        var s0;
        if (input.substr(peg$currPos, 5) === peg$c78) {
            s0 = peg$c78;
            peg$currPos += 5;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c79);
            }
        }
        return s0;
    }
    function peg$parsefloatRepresentation() {
        var s0;
        if (input.substr(peg$currPos, 7) === peg$c80) {
            s0 = peg$c80;
            peg$currPos += 7;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c81);
            }
        }
        return s0;
    }
    function peg$parsefunctionKeyword() {
        var s0;
        if (input.substr(peg$currPos, 8) === peg$c82) {
            s0 = peg$c82;
            peg$currPos += 8;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c83);
            }
        }
        return s0;
    }
    function peg$parsevalueTypes() {
        var s0;
        s0 = peg$parsetypes();
        if (s0 === peg$FAILED) {
            s0 = peg$parseCodeObject();
        }
        return s0;
    }
    function peg$parsetypes() {
        var s0;
        s0 = peg$parsenumber();
        if (s0 === peg$FAILED) {
            s0 = peg$parseint();
            if (s0 === peg$FAILED) {
                s0 = peg$parsechar();
                if (s0 === peg$FAILED) {
                    s0 = peg$parsestring();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseInteger();
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$parseunescaped();
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseescape();
            if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                    s2 = peg$c84;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c85);
                    }
                }
                if (s2 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 92) {
                        s2 = peg$c86;
                        peg$currPos++;
                    }
                    else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c87);
                        }
                    }
                    if (s2 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 47) {
                            s2 = peg$c88;
                            peg$currPos++;
                        }
                        else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c89);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            s2 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 98) {
                                s3 = peg$c90;
                                peg$currPos++;
                            }
                            else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c91);
                                }
                            }
                            if (s3 !== peg$FAILED) {
                                peg$savedPos = s2;
                                s3 = peg$c92();
                            }
                            s2 = s3;
                            if (s2 === peg$FAILED) {
                                s2 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 102) {
                                    s3 = peg$c93;
                                    peg$currPos++;
                                }
                                else {
                                    s3 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c94);
                                    }
                                }
                                if (s3 !== peg$FAILED) {
                                    peg$savedPos = s2;
                                    s3 = peg$c95();
                                }
                                s2 = s3;
                                if (s2 === peg$FAILED) {
                                    s2 = peg$currPos;
                                    if (input.charCodeAt(peg$currPos) === 110) {
                                        s3 = peg$c96;
                                        peg$currPos++;
                                    }
                                    else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c97);
                                        }
                                    }
                                    if (s3 !== peg$FAILED) {
                                        peg$savedPos = s2;
                                        s3 = peg$c98();
                                    }
                                    s2 = s3;
                                    if (s2 === peg$FAILED) {
                                        s2 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 114) {
                                            s3 = peg$c99;
                                            peg$currPos++;
                                        }
                                        else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c100);
                                            }
                                        }
                                        if (s3 !== peg$FAILED) {
                                            peg$savedPos = s2;
                                            s3 = peg$c101();
                                        }
                                        s2 = s3;
                                        if (s2 === peg$FAILED) {
                                            s2 = peg$currPos;
                                            if (input.charCodeAt(peg$currPos) === 116) {
                                                s3 = peg$c102;
                                                peg$currPos++;
                                            }
                                            else {
                                                s3 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c103);
                                                }
                                            }
                                            if (s3 !== peg$FAILED) {
                                                peg$savedPos = s2;
                                                s3 = peg$c104();
                                            }
                                            s2 = s3;
                                            if (s2 === peg$FAILED) {
                                                s2 = peg$currPos;
                                                if (input.charCodeAt(peg$currPos) === 117) {
                                                    s3 = peg$c105;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s3 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c106);
                                                    }
                                                }
                                                if (s3 !== peg$FAILED) {
                                                    s4 = peg$currPos;
                                                    s5 = peg$currPos;
                                                    s6 = peg$parseHEXDIG();
                                                    if (s6 !== peg$FAILED) {
                                                        s7 = peg$parseHEXDIG();
                                                        if (s7 !== peg$FAILED) {
                                                            s8 = peg$parseHEXDIG();
                                                            if (s8 !== peg$FAILED) {
                                                                s9 = peg$parseHEXDIG();
                                                                if (s9 !== peg$FAILED) {
                                                                    s6 = [s6, s7, s8, s9];
                                                                    s5 = s6;
                                                                }
                                                                else {
                                                                    peg$currPos = s5;
                                                                    s5 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s5;
                                                                s5 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s5;
                                                            s5 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s5;
                                                        s5 = peg$FAILED;
                                                    }
                                                    if (s5 !== peg$FAILED) {
                                                        s4 = input.substring(s4, peg$currPos);
                                                    }
                                                    else {
                                                        s4 = s5;
                                                    }
                                                    if (s4 !== peg$FAILED) {
                                                        peg$savedPos = s2;
                                                        s3 = peg$c107(s4);
                                                        s2 = s3;
                                                    }
                                                    else {
                                                        peg$currPos = s2;
                                                        s2 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s2;
                                                    s2 = peg$FAILED;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c108(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parseInteger() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c110.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c111);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c110.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c111);
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c112();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c109);
            }
        }
        return s0;
    }
    function peg$parsenumber() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseminus();
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseint();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsefrac();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseexp();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c114();
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c113);
            }
        }
        return s0;
    }
    function peg$parsestring() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parsequotation_mark();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsechar();
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsechar();
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsequotation_mark();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c116(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c115);
            }
        }
        return s0;
    }
    function peg$parsee() {
        var s0;
        if (peg$c117.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c118);
            }
        }
        return s0;
    }
    function peg$parseexp() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parsee();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseminus();
            if (s2 === peg$FAILED) {
                s2 = peg$parseplus();
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseDIGIT();
                if (s4 !== peg$FAILED) {
                    while (s4 !== peg$FAILED) {
                        s3.push(s4);
                        s4 = peg$parseDIGIT();
                    }
                }
                else {
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsefrac() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsedecimal_point();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDIGIT();
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parseDIGIT();
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseint() {
        var s0, s1, s2, s3, s4;
        s0 = peg$parsezero();
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = peg$parsedigit1_9();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseDIGIT();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parseDIGIT();
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                }
                else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c119(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parseopenBrace() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 123) {
            s0 = peg$c120;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c121);
            }
        }
        return s0;
    }
    function peg$parsecloseBrace() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 125) {
            s0 = peg$c122;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c123);
            }
        }
        return s0;
    }
    function peg$parsecolon() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 58) {
            s0 = peg$c63;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c64);
            }
        }
        return s0;
    }
    function peg$parsecomma() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 44) {
            s0 = peg$c124;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c125);
            }
        }
        return s0;
    }
    function peg$parseescape() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 92) {
            s0 = peg$c86;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c87);
            }
        }
        return s0;
    }
    function peg$parsequotation_mark() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 34) {
            s0 = peg$c84;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c85);
            }
        }
        return s0;
    }
    function peg$parseparameterKeyword() {
        var s0;
        if (input.substr(peg$currPos, 10) === peg$c40) {
            s0 = peg$c40;
            peg$currPos += 10;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c41);
            }
        }
        return s0;
    }
    function peg$parsenameKeyword() {
        var s0;
        if (input.substr(peg$currPos, 12) === peg$c126) {
            s0 = peg$c126;
            peg$currPos += 12;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c127);
            }
        }
        return s0;
    }
    function peg$parsecodeNameKeyword() {
        var s0;
        if (input.substr(peg$currPos, 9) === peg$c128) {
            s0 = peg$c128;
            peg$currPos += 9;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c129);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c130) {
                s0 = peg$c130;
                peg$currPos += 4;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c131);
                }
            }
        }
        return s0;
    }
    function peg$parseminus() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 45) {
            s0 = peg$c132;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c133);
            }
        }
        return s0;
    }
    function peg$parseplus() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 43) {
            s0 = peg$c134;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c135);
            }
        }
        return s0;
    }
    function peg$parsebegin_array() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 91) {
                s2 = peg$c136;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c137);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseend_array() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
                s2 = peg$c138;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c139);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedecimal_point() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 46) {
            s0 = peg$c140;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c141);
            }
        }
        return s0;
    }
    function peg$parsezero() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 48) {
            s0 = peg$c142;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c143);
            }
        }
        return s0;
    }
    function peg$parseDIGIT() {
        var s0;
        if (peg$c110.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c111);
            }
        }
        return s0;
    }
    function peg$parseHEXDIG() {
        var s0;
        if (peg$c144.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c145);
            }
        }
        return s0;
    }
    function peg$parsews() {
        var s0, s1;
        s0 = [];
        if (peg$c146.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c147);
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c146.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c147);
                }
            }
        }
        return s0;
    }
    function peg$parsecreateIdentifier() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (peg$c32.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c34.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c35);
                }
            }
            while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c34.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c148(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseidentifier() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (peg$c32.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c34.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c35);
                }
            }
            while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c34.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c149(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseunescaped() {
        var s0;
        if (peg$c150.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c151);
            }
        }
        return s0;
    }
    function peg$parsedigit1_9() {
        var s0;
        if (peg$c152.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c153);
            }
        }
        return s0;
    }
    function trimQuotes(str) {
        return str.substring(1, str.length - 1);
    }
    function appendElements(arr) {
        try {
            return arr.join("").replace(/,/g, '');
        }
        catch (_a) {
            return;
        }
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
module.exports = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
};

},{}]},{},[1]);
