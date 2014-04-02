plucker-coordinates
===================
Routines for working with 3D lines encoded using [Plücker coordinates](http://en.wikipedia.org/wiki/Pl%C3%BCcker_coordinates).

**WORK IN PROGRESS, CHECK BACK LATER**

# Example

```javascript
var plücker = require("plucker-coordinates")

//TODO: Finish example

```

# Install

```
npm install plucker-coordinates
```

# API

```javascript
var plücker = require("plucker-coordinates")
```

#### `plücker.create()`
Creates an array for storing the Plücker coordinates of a line

### `plücker.fromVec4(out, q1, q2)`

### `plücker.fromVec3(out, q1, q2)`

### `plücker.testVec4(line, point)`

### `plücker.testVec3(line, point)`

### `plücker.transformMat4(out, line, m)`

### `plücker.random()`

### `plücker.str()`


# Credits
(c) 2014 Mikola Lysenko. MIT License

