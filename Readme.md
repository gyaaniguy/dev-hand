## Command

### time
> Displays timestamp information based on various input formats.

#### Parameters
- 'today' '1704747449' '6 Mar 2017 21:22:23 GMT' | Represents different input formats for timestamp display.

#### Examples:
- `node ./start.mjs time`

```bash
2024-01-09T12:47:28.742Z
{
  TimeStamp: 1704804448,
  TimeLocal: '1/9/2024, 6:17:28 PM',
  UTCTime: '1/9/2024, 12:47:28 PM'
}
```

- `node ./start.mjs time 'today'`

```bash
today
{
  TimeStamp: 1704804448,
  TimeLocal: '1/9/2024, 6:17:28 PM',
  UTCTime: '1/9/2024, 12:47:28 PM'
}
```

- `node ./start.mjs time '1704747449'`

```bash
1704747449
2024-01-08T20:57:29.000Z
{
  TimeStamp: 1704747449,
  TimeLocal: '1/9/2024, 2:27:29 AM',
  UTCTime: '1/8/2024, 8:57:29 PM'
}
```

- `node ./start.mjs time '6 Mar 2017 21:22:23 GMT'`

```bash
6 Mar 2017 21:22:23 GMT
{
  TimeStamp: 1488835343,
  TimeLocal: '3/7/2017, 2:52:23 AM',
  UTCTime: '3/6/2017, 9:22:23 PM'
}
```

### lorem
> Generates Lorem Ipsum text with a specified word count.

#### Parameters
32 : Represents the number of words for Lorem Ipsum text.

#### Examples:
- `node ./start.mjs lorem 32`

```bash
Lorem ipsum cum dapibus amet curae consectetur aliquet at condimentum dictum
conubia aliquam diam aenean adipiscing class consequat ad
cras auctor blandit convallis congue accumsan cubilia bibendum
ante curabitur arcu commodo aptent ac a
```

- `node ./start.mjs lorem`

```bash
Lorem ipsum accumsan auctor ac aenean ante donec dui curae dictum class est diam curabitur convallis
consequat dapibus dictumst commodo cras enim eros aliquam arcu eleifend cubilia
dolor adipiscing conubia congue erat a aliquet blandit ad cum aptent
amet eget et duis eu egestas elementum consectetur dignissim condimentum etiam elit at bibendum
```

### httpCodes
> Provides information about HTTP status codes.

#### Parameters
200: Represents the HTTP status code.

#### Examples:
- `node ./start.mjs httpCodes 417`

```bash
{
  meaning: 'Expectation Failed',
  desc: 'The server cannot meet the requirements of the Expect request-header field.'
}
```

- `node ./start.mjs httpCodes 200`

```bash
{
  meaning: 'OK',
  desc: 'Request successful, returning requested data.'
}
```

### ext
> Provides information about file extensions based on MIME type.

#### Parameters
- 'ext', 'image/jpeg': 'mime type' OR 'extension'

#### Examples:
- `node ./start.mjs ext 'image/jpeg'`

```bash
{ extension: [ 'jpeg', 'jpg', 'jpe' ], mime: 'image/jpeg' }
```

- `node ./start.mjs ext 'pdf'`

```bash
{ extension: 'pdf', mime: 'application/pdf' }
```

### htmlEntities
> Encodes and decodes HTML entities.

#### Parameters
'<title>IT Tojol</title>' : Represents the HTML entities to be encoded or decoded.

#### Examples:
- `node ./start.mjs htmlEntities '&#x3C'`

```bash
{ htmlEntitiesEncoded: '&amp;#x3C', htmlEntitiesDecoded: '<' }
```

- `node ./start.mjs htmlEntities '<title>IT Tojol</title>'`

```bash
{
  htmlEntitiesEncoded: '&lt;title&gt;IT Tojol&lt;/title&gt;',
  htmlEntitiesDecoded: '<title>IT Tojol</title>'
}
```

### color
> Converts color representations between HEX, RGB, and HSL.

#### Parameters
'#1ea44b', 'hsl(140, -1%, 98%)', 'rgb(30, 164, 75)': Represents the color in HEX, RGB, or HSL format.

#### Examples:
- `node ./start.mjs color '#1ea44b'`

```bash
HEX: #1ea44b, RGB: rgb(30, 164, 75), HSL: hsl(140, 69%, 38%)
```

- `node ./start.mjs color 'hsl(140, -1%, 98%)'`

```bash
Invalid str format
```

- `node ./start.mjs color 'rgb(30, 164, 75)'`

```bash
RGB: rgb(30, 164, 75), HEX: #1ea44b, HSL: hsl(140, 69%, 38%)
```

### case
> Converts text between different case formats.

#### Parameters
'text': Represents the input text in various case formats.

#### Examples:
- `node ./start.mjs case 'nikhilJainIsTheCute'`

```bash
{
  lower: 'nikhil jain is the cute',
  under: 'nikhil_jain_is_the_cute',
  camel: 'nikhilJainIsTheCute',
  mock: 'nIkhiL jAIn is THE cUtE',
  upper: 'NIKHIL JAIN IS THE CUTE',
  dash: 'nikhil-jain-is-the-cute'
}
```

- `node ./start.mjs case 'nikhil jain is the cute'`

```bash
{
  lower: 'nikhil jain is the cute',
  under: 'nikhil_jain_is_the_cute',
  camel: 'nikhilJainIsTheCute',
  mock: 'NikHil JaIN iS The cUtE',
  upper: 'NIKHIL JAIN IS THE CUTE',
  dash: 'nikhil-jain-is-the-cute'
}
```

### bcrypt
> Compares a plain text with a bcrypt hash.

#### Parameters
- Represents the bcrypt hash.
- Represents the plain text to compare.

#### Examples:
- `node ./start.mjs bcrypt 'b.6f90mkN9ZLYtzzwN2GBkqegoC4Xi4Q2' 'nikhil'`

```bash
false
```

### base64
> Encodes and decodes text using Base64.

#### Parameters
'nikhil', c29tZSB0ZXh0: Represents the text to encode or decode.

#### Examples:
- `node ./start.mjs base64 'nikhil'`

```bash
{ Encode: 'bmlraGls', Decode: '�)!�' }
```

- `node ./start.mjs base64 'c29tZSB0ZXh0'`

```bash
{ Encode: 'YzI5dFpTQjBaWGgw', Decode: 'some text' }
```

### urlencode
> Encodes and decodes text using URL encoding.

#### Parameters
'Hello world': Represents the text to encode or decode.

#### Examples:
- `node ./start.mjs urlencode 'Hello world'`

```bash
{ encoded: 'Hello%20world', decoded: 'Hello world' }
```

- `node ./start.mjs urlencode 'Hello%20world'`

```bash
{ encoded: 'Hello%2520world', decoded: 'Hello world' }
```

### hash
> Generates hash values using various algorithms.

#### Parameters
'string to hash': Represents the text to hash.

#### Examples:
- `node ./start.mjs hash 'string to hash'`

```bash
{
  md5: '6af8c2df5270dbc0c4557a255ba6fffd',
  sha1: 'e40871214d28a178b352c9392597f855d7dd6091',
  sha256: '4904d96e05c2ba8ab5e28bfba3c31c2ca0ea6da94aa4245e79ee47107dbb683e',
  sha512: 'a9cb347d873abceb5d6cc3812a0aea07751c6c6e454bb6c238b8a9db5c857b61511024c8c9d8a1ccc11190cff75302a5b6eb42d49e17ba0b5b9a75432e2da253'
}
```