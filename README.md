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
Creates an array for storing the Plücker coordinates of a line.  The coordinates for the lines are stored in the format,

```javascript
[ p01, p02, p03, p12, p13, p23 ]
```

Which is the standard basis for the line.  The vector `[ p01, p02, p03 ]` is the direction vector for the line and the quantity `[ p12, p13, p23 ]` is the cross product of a point on the line with the direction vector.  Plücker coordinates are unique up to a scaling factor, and satisfy the equation:

```javascript
p01 * p12 + p02 * p13 + p03 * p23 === 0
```

**Returns** A length 6 `Float32Array`

#### `plücker.copy(out, p)`
Copies a line

* `out` recieves the result
* `p` is the line to copy

**Returns** `out`

#### `plücker.fromVec4(out, q1, q2)`
Constructs an (oriented) line passing through the pair of points `q1` and `q2` in homogeneous coordinates.

* `out` recieves the Plücker coordiantes for the line
* `q1` is a point in homogeneous coordinates
* `q2` is the second point

**Returns** `out`

### `plücker.fromVec3(out, q1, q2)`
Constructs an oriented line from `q1` to `q2` where `q1` and `q2` are points in Euclidean 3 space.

* `out` recieves the line
* `q1` is the first point
* `q2` is the second point

**Returns** `out`

### `plücker.fromPointDirection(out, q, d)`
Constructs an oriented line passing through the point `q` in the direction `d`

* `out` is the resulting line object
* `q` is the basepoint for the line
* `d` is the direction of the line

**Returns** `out`

### `plücker.normalize(out, line)`
Converts `line` into a normal form.

* `out` receives the result
* `line` is a line in Plücker coordinates

**Returns** `out`

### `plücker.equals(line1, line2)`
Test if two lines are (approximately) equal.

* `line1` is a line in Plücker coordinates
* `line2` is a line in Plücker coordiantes

**Returns** `true` if `line1` is approximately equal to `line2`, `false` otherwise.

### `plücker.str(line)`
Converts a line into a string.

* `line` is the Plücker coordinates of a line

**Returns** A string encoding the Plücker coordinates of the line.


# Credits
(c) 2014 Mikola Lysenko. MIT License