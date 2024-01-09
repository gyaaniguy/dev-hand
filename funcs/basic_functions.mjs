/* eslint-disable max-len */
import {createHash} from 'crypto';
import bcrypt from 'bcrypt';
import he from 'he';
import db from 'mime-db';
import * as chrono from 'chrono-node';
/**
 * Class representing basic utility functions.
 */
class BasicFunctions {
  /**
   * Constructor for BasicFunctions class.
   * Initializes a mapping of file extensions to MIME types.
   */
  constructor() {
    this.dbExt = new Map();
    Object.entries(db).forEach( ([mime, obj]) => {
      if (obj.extensions) {
        for (const ext of obj.extensions) {
          this.dbExt.set(ext, mime);
        }
      }
    });
  }
  /**
   * Converts a string to various date and time formats.
   * @param {string} [str=''] - The input string representing a date or timestamp.
   * @return {Object} - An object containing TimeStamp, TimeLocal, and UTCTime properties.
   */
  time = function(str = '') {
    console.log(str);
    const out = {
      'TimeStamp': '',
      'TimeLocal': '',
      'UTCTime': '',
    };
    let dateObj = new Date();
    if (!str || /\d{7,}/.test(str)) {
      if (str) {
        const timestamp = parseInt(str, 10);
        dateObj = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
      }
      console.log(dateObj);
      if (/invalid/i.test(dateObj)) {
        return 'Not a valid timestamp';
      }
      return returnOut(dateObj);
    }

    const gmtTime = chrono.parseDate(str);
    dateObj = new Date(gmtTime.toString());
    return returnOut(dateObj);
    /**
     * Formats a Date object and returns an object containing TimeStamp, TimeLocal, and UTCTime properties.
     * @param {Date} dateObj - The Date object to be formatted.
     * @return {Object} - An object containing TimeStamp, TimeLocal, and UTCTime properties.
     */
    function returnOut(dateObj) {
      out.TimeStamp = Math.floor(dateObj.getTime() / 1000);
      out.TimeLocal = dateObj.toLocaleString();
      out.UTCTime = dateObj.toLocaleString(
          'en-US', {timeZone: 'UTC', hour12: true},
      );
      return out;
    }
  };
  /**
   * Encodes and decodes a string using base64.
   * @param {string} [text=''] - The input text to be encoded and decoded
   * @return {Object} - An object containing base64 encoded and decoded
   */
  base64 = (text = '') => {
    return {
      'Encode': Buffer.from(text).toString('base64'),
      'Decode': Buffer.from(text, 'base64').toString('utf-8'),
    };
  };
  /**
   * Computes various hash algorithms for a given text.
   * @param {string} [text=''] - The input text to be hashed.
   * @return {Object} - An object containing md5, sha1, sha256, and sha512 hash values.
   */
  hash(text = '') {
    const hashStruct = {
      md5: '',
      sha1: '',
      sha256: '',
      sha512: '',
      // Add more hash algorithms as needed
    };

    if (text) {
      hashStruct.md5 = createHash('md5').update(text).digest('hex');
      hashStruct.sha1 = createHash('sha1').update(text).digest('hex');
      hashStruct.sha256 = createHash('sha256').update(text).digest('hex');
      hashStruct.sha512 = createHash('sha512').update(text).digest('hex');
    }
    return hashStruct;
  };
  /**
   * Performs bcrypt operations (hashing and comparison).
   * @async
   * @param {string} [p1=''] - The plaintext to be hashed or compared.
   * @param {string} [p2=''] - The hashed value for comparison.
   * @return {string|boolean} - Hashed value or comparison result.
   */
  async bcrypt(p1 = '', p2 = '') {
    if (!bcrypt) {
      console.log('bcrypt not installed. Try installing with: npm install bcrypt --save ');
    }
    const saltRounds = 10;

    if (!p2) {
      return bcrypt.hashSync(p1, saltRounds);
    }
    if (p1 && p2) {
      let isMatch = false;
      if (/^\$2[ayb]\$.{56}$/.test(p1)) {
        isMatch = await bcrypt.compare(p2, p1);
      } else {
        isMatch = await bcrypt.compare(p1, p2);
      }
      return isMatch;
    }
    return '';
  };
  /**
   * Analyzes and converts a string representing a color.
   * @param {string} [str=''] - The input string representing a color.
   * @return {string} - Information about the color in HEX, RGB, and HSL formats.
   */
  color(str = '') {
    if ( !str) {
      return '';
    }
    // Function to check if the input is a valid HEX color
    const isHexColor = (str) => /^#([0-9A-F]{3}){1,2}$/i.test(str);

    // Function to check if the input is a valid RGB color
    const isRgbColor = (str) => /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(str);

    // Function to check if the input is a valid HSL color
    const isHslColor = (str) => /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(str);
    // Function to convert HEX to RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    };

    // Function to convert RGB to HEX
    const rgbToHex = (rgb) => {
      const [r, g, b] = rgb.match(/\d+/g);
      return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };

    // Function to convert RGB to HSL
    const rgbToHsl = (rgb) => {
      let [r, g, b] = rgb.match(/\d+/g).map(Number);
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      let h = (max + min) / 2;
      let s = h;
      let l = h;

      if (max === min) {
        // Achromatic
        return {h: 0, s: 0, l};
      }

      const d = max - min;
      s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + 0) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }

      h = Math.round(h);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    /**
     * Function to convert HSL to RGB
     * @date 1/9/2024 - 3:38:20 PM
     *
     * @param {*} hsl
     * @return {string}
     */
    function hslToHex(hsl) {
      let [h, s, l] = hsl.match(/\d+/g).map(Number);

      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }
    // Determine the format of the input color
    if (isHexColor(str)) {
      return `HEX: ${str}, RGB: ${hexToRgb(str)}, HSL: ${rgbToHsl(hexToRgb(str))}`;
    } else if (isRgbColor(str)) {
      return `RGB: ${str}, HEX: ${rgbToHex(str)}, HSL: ${rgbToHsl(str)}`;
    } else if (isHslColor(str)) {
      return `HSL: ${str}, RGB: ${hexToRgb(hslToHex(str))}, HEX: ${hslToHex(str)}`;
    } else {
      return 'Invalid str format';
    }
    console.log(isHexColor, isHslColor, isRgbColor);
  }
  /**
   * Converts a string to various case formats.
   * @param {string} [str=''] - The input string to be converted.
   * @return {Object} - An object containing lower, under, camel, mock, upper, and dash case formats.
   */
  case(str = '') {
    const strFormatStruct = {
      'lower': '',
      'under': '',
      'camel': '',
      'mock': '',
      'upper': '',
      'dash': '',
    };
    if (!str) {
      return '';
    }
    let currentFormat = '';
    if (str.includes(' ')) {
      currentFormat = 'lower';
    } else if (str.includes('-')) {
      currentFormat = 'dash';
    } else if (str.includes('_')) {
      currentFormat = 'under';
    } else if (/[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/.test(str)) {
      currentFormat = 'camel';
    } else if ( /[A-Z]/.test(str)) {
      currentFormat = 'upper';
    } else {
      currentFormat = 'mock';
    }
    /**
     * Converts a string to dash case.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to dash case.
     */
    function toDash(str) {
      return str.replace(/[\s_]+/g, '-').toLowerCase();
    }

    /**
     * Converts a string to snake case.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to snake case.
     */
    function toUnder(str) {
      return str.replace(/[\s-]+/g, '_').toLowerCase();
    }

    /**
     * Converts a string to uppercase with spaces replaced by underscores.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to uppercase with spaces replaced by underscores.
     */
    function toUpper(str) {
      return str.replace(/[-_]+/g, ' ').toUpperCase();
    }

    /**
     * Converts a string to lowercase with spaces replaced by underscores.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to lowercase with spaces replaced by underscores.
     */
    function toLower(str) {
      return str.replace(/[-_]+/g, ' ').toLowerCase();
    }

    /**
     * Converts a string to camel case.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to camel case.
     */
    function toCamel(str) {
      return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
    }

    /**
     * Converts a string to mock case.
     * @param {string} str - The input string to be converted.
     * @return {string} - The string converted to mock case.
     */
    function toMock(str) {
      str = str.replace(/[-_]/g, ' ').toLowerCase();
      let s1 = '';
      for (let i = 0; i < str.length; i++) {
        s1 += Math.random() > 0.5 ? str[i] : str[i].toUpperCase();
      }
      return s1;
    }

    switch (currentFormat) {
      case 'camel':
        strFormatStruct.camel = str;
        str = str.replace(/([A-Z])/g, ' $1');
        break;
    }
    strFormatStruct.camel = toCamel(str);
    strFormatStruct.mock = toMock(str);
    strFormatStruct.dash = toDash(str);
    strFormatStruct.under = toUnder(str);
    strFormatStruct.lower = toLower(str);
    strFormatStruct.upper = toUpper(str);
    return strFormatStruct;
  }
  /**
   * URL encodes and decodes a string.
   * @param {string} [str=''] - The input string to be encoded and decoded.
   * @return {Object} - An object containing encoded and decoded string information.
   */
  urlencode(str ='') {
    if (!str) {
      return '';
    }

    return {
      'encoded': encodeURIComponent(str),
      'decoded': decodeURIComponent(str),
    };
  }
  /**
   * Encodes and decodes HTML entities in a string.
   * @param {string} str - The input string to be encoded and decoded.
   * @return {Object} - An object containing HTML entities encoded and decoded string information.
   */
  htmlEntities = function(str) {
    return {
      'htmlEntitiesEncoded': he.encode(str, {
        'decimal': true,
        'useNamedReferences': true,
      }),
      'htmlEntitiesDecoded': he.decode(str),
    };
    return he.encode(text);
  };
  /**
   * Retrieves file extension and MIME type information based on a given extension or MIME type.
   * @param {string} str - The input string representing either a file extension or MIME type.
   * @return {Object} - An object containing extension and MIME type information.
   */
  ext(str) {
    const mime = this.dbExt.get(str);
    const extensions = db[str]?.extensions;
    return {
      'extension': mime ? str : extensions,
      'mime': extensions ? str : mime,
    };
  }
  /**
   * Retrieves information about an HTTP status code.
   * @param {string} str - The HTTP status code.
   * @return {Object|undefined} - An object containing meaning and description of the HTTP status code.
   */
  httpCodes(str) {
    const httpStatusCodes = {
      100: {
        meaning: 'Continue',
        desc: 'Request received, please continue.',
      },
      101: {
        meaning: 'Switching Protocols',
        desc: 'Switching to a different protocol.',
      },
      200: {
        meaning: 'OK',
        desc: 'Request successful, returning requested data.',
      },
      201: {
        meaning: 'Created',
        desc: 'Request successful, new resource created.',
      },
      204: {
        meaning: 'No Content',
        desc: 'Request successful, no additional content.',
      },
      206: {
        meaning: 'Partial Content',
        desc: 'The server is delivering only part of the resource due to a range header sent by the client.',
      },
      300: {
        meaning: 'Multiple Choices',
        desc: 'Multiple options for the requested resource.',
      },
      301: {
        meaning: 'Moved Permanently',
        desc: 'The requested resource has been permanently moved to a new location.',
      },
      302: {
        meaning: 'Found',
        desc: 'The requested resource resides temporarily under a different URI.',
      },
      304: {
        meaning: 'Not Modified',
        desc: 'The client can use cached data as the resource has not been modified since the last request.',
      },
      400: {
        meaning: 'Bad Request',
        desc: 'Request could not be understood or missing required parameters.',
      },
      401: {
        meaning: 'Unauthorized',
        desc: 'Authentication failed or insufficient permissions.',
      },
      402: {
        meaning: 'Payment Required',
        desc: 'Reserved for future use; not currently supported.',
      },
      403: {
        meaning: 'Forbidden',
        desc: 'Access to the requested resource is forbidden.',
      },
      404: {
        meaning: 'Not Found',
        desc: 'Requested resource could not be found on the server.',
      },
      405: {
        meaning: 'Method Not Allowed',
        desc: 'The request method is known by the server, but it is not supported for the requested resource.',
      },
      406: {
        meaning: 'Not Acceptable',
        desc: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
      },
      407: {
        meaning: 'Proxy Authentication Required',
        desc: 'The client must first authenticate itself with the proxy.',
      },
      408: {
        meaning: 'Request Timeout',
        desc: 'The server timed out waiting for the request.',
      },
      409: {
        meaning: 'Conflict',
        desc: 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict.',
      },
      410: {
        meaning: 'Gone',
        desc: 'Indicates that the resource requested is no longer available and will not be available again.',
      },
      411: {
        meaning: 'Length Required',
        desc: 'The request did not specify the length of its content, which is required by the requested resource.',
      },
      412: {
        meaning: 'Precondition Failed',
        desc: 'The server does not meet one of the preconditions that the requester put on the request.',
      },
      413: {
        meaning: 'Payload Too Large',
        desc: 'The request is larger than the server is willing or able to process.',
      },
      414: {
        meaning: 'URI Too Long',
        desc: 'The URI provided was too long for the server to process.',
      },
      415: {
        meaning: 'Unsupported Media Type',
        desc: 'The request entity has a media type which the server or resource does not support.',
      },
      416: {
        meaning: 'Range Not Satisfiable',
        desc: 'The client has asked for a portion of the file, but the server cannot supply that portion.',
      },
      417: {
        meaning: 'Expectation Failed',
        desc: 'The server cannot meet the requirements of the Expect request-header field.',
      },
      418: {
        meaning: 'I\'m a teapot',
        desc: 'The server refuses the attempt to brew coffee with a teapot.',
      },
      421: {
        meaning: 'Misdirected Request',
        desc: 'The request was directed at a server that is not able to produce a response.',
      },
      422: {
        meaning: 'Unprocessable Entity',
        desc: 'The request was well-formed but was unable to be followed due to semantic errors.',
      },
      423: {
        meaning: 'Locked',
        desc: 'The resource that is being accessed is locked.',
      },
      424: {
        meaning: 'Failed Dependency',
        desc: 'The request failed due to failure of a previous request.',
      },
      425: {
        meaning: 'Too Early',
        desc: 'Indicates that the server is unwilling to risk processing a request that might be replayed.',
      },
      426: {
        meaning: 'Upgrade Required',
        desc: 'The client should switch to a different protocol such as TLS/1.0.',
      },
      428: {
        meaning: 'Precondition Required',
        desc: 'The origin server requires the request to be conditional.',
      },
      429: {
        meaning: 'Too Many Requests',
        desc: 'The user has sent too many requests in a given amount of time.',
      },
      431: {
        meaning: 'Request Header Fields Too Large',
        desc: 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.',
      },
      451: {
        meaning: 'Unavailable For Legal Reasons',
        desc: 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.',
      },
      500: {
        meaning: 'Internal Server Error',
        desc: 'Unexpected condition encountered on the server.',
      },
      501: {
        meaning: 'Not Implemented',
        desc: 'The server does not support the functionality required to fulfill the request.',
      },
      503: {
        meaning: 'Service Unavailable',
        desc: 'The server is not ready to handle the request.',
      },
      504: {
        meaning: 'Gateway Timeout',
        desc: 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or some other auxiliary server it needed to access in order to complete the request.',
      },
      505: {
        meaning: 'HTTP Version Not Supported',
        desc: 'The server does not support the HTTP protocol version used in the request.',
      },
      506: {
        meaning: 'Variant Also Negotiates',
        desc: 'Transparent content negotiation for the request results in a circular reference.',
      },
      507: {
        meaning: 'Insufficient Storage',
        desc: 'The server is unable to store the representation needed to complete the request.',
      },
      508: {
        meaning: 'Loop Detected',
        desc: 'The server detected an infinite loop while processing the request.',
      },
      510: {
        meaning: 'Not Extended',
        desc: 'Further extensions to the request are required for the server to fulfill it.',
      },
      511: {
        meaning: 'Network Authentication Required',
        desc: 'The client needs to authenticate to gain network access.',
      },
    };
    if (httpStatusCodes[str]) {
      return httpStatusCodes[str];
    }
  }
  /**
   * Generates Lorem Ipsum text with a specified number of words.
   * @param {number} [numWords=50] - The number of words in the Lorem Ipsum text.
   * @return {string} - The generated Lorem Ipsum text.
   */
  lorem(numWords = 50) {
    /**
     * get random number of words in a line.
     * @date 1/9/2024 - 3:39:53 PM
     *
     * @return {*}
     */
    function genRandomLineLength() {
      return Math.round(Math.random() * (15 - 5) + 5);
    }
    let out = 'Lorem ipsum ';
    let lineLength = genRandomLineLength();
    let loremWords = ['a', 'ac', 'accumsan', 'ad', 'adipiscing', 'aenean', 'aliquam', 'aliquet', 'amet', 'ante', 'aptent', 'arcu', 'at', 'auctor', 'bibendum', 'blandit', 'class', 'commodo', 'condimentum', 'congue', 'consectetur', 'consequat', 'conubia', 'convallis', 'cras', 'cubilia', 'cum', 'curabitur', 'curae', 'dapibus', 'diam', 'dictum', 'dictumst', 'dignissim', 'dolor', 'donec', 'dui', 'duis', 'egestas', 'eget', 'eleifend', 'elementum', 'elit', 'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'facilisi', 'faucibus', 'felis', 'fermentum', 'feugiat', 'fringilla', 'fusce', 'gravida', 'habitant', 'habitasse', 'hac', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in', 'inceptos', 'integer', 'interdum', 'ipsum', 'justo', 'lacinia', 'lacus', 'laoreet', 'lectus', 'leo', 'ligula', 'litora', 'lobortis', 'lorem', 'luctus', 'maecenas', 'magna', 'magnis', 'malesuada', 'massa', 'mattis', 'mauris', 'metus', 'mi', 'molestie', 'mollis', 'montes', 'morbi', 'mus', 'nam', 'nascetur', 'natoque', 'nec', 'neque', 'netus', 'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci', 'ornare', 'parturient', 'pellentesque', 'penatibus', 'per', 'pharetra', 'phasellus', 'placerat', 'platea', 'porta', 'porttitor', 'posuere', 'potenti', 'praesent', 'pretium', 'primis', 'proin', 'pulvinar', 'purus', 'quam', 'quis', 'quisque', 'rhoncus', 'ridiculus', 'risus', 'rutrum', 'sagittis', 'sapien', 'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sit', 'sociis', 'sociosqu', 'sodales', 'sollicitudin', 'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt', 'torquent', 'tortor', 'turpis', 'ullamcorper', 'ultrices', 'ultricies', 'urna', 'varius', 'vehicula', 'vel', 'velit', 'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate'];
    loremWords = loremWords.slice(0, numWords).sort(() => Math.random() - 0.5);
    loremWords.forEach(function(word, index) {
      out += word + ' ';
      if (index === lineLength) {
        out += '\n';
        lineLength += genRandomLineLength();
      }
    });
    return out;
  }
}
const basicFunctions = new BasicFunctions();
export {basicFunctions};
