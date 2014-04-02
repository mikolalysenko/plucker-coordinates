"use strict"

//Order for coordinates:
//
//  [ p01, p02, p03, p23, p31, p12 ]
//

var EPSILIN = 1e-8

//Create a line
function pluckerCreate() {
  return new Float32Array(6)
}
exports.create = pluckerCreate

//Compute plucker coordinates for a line given two points in projective space
function pluckerFromVec4(out, q1, q2) {
  var x1 = q1[0]
  var y1 = q1[1]
  var z1 = q1[2]
  var w1 = q1[3]
  var x2 = q2[0]
  var y2 = q2[1]
  var z2 = q2[2]
  var w2 = q2[3]
  out[0] = w1 * x2 - w2 * x1
  out[1] = w1 * y2 - w2 * y1
  out[2] = w1 * z2 - w2 * z1
  out[3] = y1 * z2 - z1 * y2
  out[4] = z1 * x2 - x1 * z2
  out[5] = x1 * y2 - y1 * x2
  return out
}
exports.fromVec4 = pluckerFromVec4

//Compute plucker coordinate for a pair of points in 3D space
function pluckerFromVec3(out, q1, q2) {
  var x1 = q1[0]
  var y1 = q1[1]
  var z1 = q1[2]
  var x2 = q2[0]
  var y2 = q2[1]
  var z2 = q2[2]
  out[0] = x2 - x1
  out[1] = y2 - y1
  out[2] = z2 - z1
  out[3] = y1 * z2 - z1 * y2
  out[4] = z1 * x2 - x1 * z2
  out[5] = x1 * y2 - y1 * x2
  return out 
}
exports.fromVec3 = pluckerFromVec3

//Constructs a line from a point + direction vector
function pluckerFromPointDirection(out, q, d) {
  var dx = d[0]
  var dy = d[1]
  var dz = d[2]
  var x = q[0]
  var y = q[1]
  var z = q[2]
  out[0] = dx
  out[1] = dy
  out[2] = dz
  out[3] = dy * z - y * dz
  out[4] = dz * x - z * dx
  out[5] = dx * y - x * dy
  return out
}
exports.fromPointDirection = pluckerFromPointDirection

//Extracts the direction of the line
function pluckerDirection(out, p) {
  out[0] = p[0]
  out[1] = p[1]
  out[2] = p[2]
  return out
}
exports.direction = pluckerDirection

//Returns a rank 2 4x4 matrix that tests if a point in projective space is incident to the line
function pluckerToMat4(out, p) {
  var p01 = p[0]
  var p02 = p[1]
  var p03 = p[2]
  var p12 = p[3]
  var p13 = p[4]
  var p23 = p[5]

  out[0] = 0
  out[1] = p03
  out[2] = -p02
  out[3] = -p23

  out[4] = -p03
  out[5] = 0
  out[6] = p01
  out[7] = -p31

  out[8] = p02
  out[9] = -p01
  out[10] = 0
  out[11] = -p12

  out[12] = p23
  out[13] = p31
  out[14] = p12
  out[15] = 0

  return out
}
exports.toMat4 = pluckerToMat4


function pluckerDistanceToOrigin(p) {
  var p01 = p[0]
  var p02 = p[1]
  var p03 = p[2]
  var p12 = p[3]
  var p13 = p[4]
  var p23 = p[5]
  var numer = p01 * p01 + p02 * p02 + p03 * p03
  var denom = p12 * p12 + p13 * p13 + p23 * p23
  return Math.sqrt(numer / denom)
}
exports.distanceToOrigin = pluckerDistanceToOrigin


function pluckerClosestPointToOrigin(out, p) {
  var p01 = p[0]
  var p02 = p[1]
  var p03 = p[2]
  var p12 = p[3]
  var p13 = p[4]
  var p23 = p[5]

  var denom = 1.0 / (p12 * p12 + p13 * p13 + p23 * p23)

  out[0] = (p02 * p23 - p13 * p03) * denom
  out[1] = (p03 * p12 - p23 * p01) * denom
  out[2] = (p01 * p13 - p12 * p02) * denom

  return out
}
exports.closestPointToOrigin = pluckerClosestPointToOrigin

//Apply a transformation to the plucker coordiantes
function pluckerTransformMat4(out, line, M) {
}
exports.transformMat4 = pluckerTransformMat4

function pluckerMeetLine(out, p1, p2) {
}
exports.meetLine = pluckerMeetLine

function pluckerMeetPlane(out, line, plane) {
}
exports.meetPlane = pluckerMeetPlane

function pluckerJoinLine(out, p1, p2) {
}
exports.joinLine = pluckerJoinLine

function pluckerJoinVec4(out, line, point) {
}
exports.joinVec4 = pluckerJoinPoint

function pluckerJoinVec3(out, line, point) {
}
exports.joinVec3 = pluckerJoinPoint

function pluckerDual(out, line) {
}
exports.dual = pluckerDual

function pluckerRandomize(out, line) {
}
exports.random = pluckerRandomize

function pluckerToString(line) {
  return "line([" + line[0] + "," + line[1] + "," + line[2] + "],[" + line[3] + "," + line[4] + "," + line[5] + "])"
}
exports.str = pluckerToString

function pluckerTestSkew(line1, line2) {
}
exports.skew = pluckerTestSkew

function pluckerNorm(p) {
  var p01 = p[0]
  var p02 = p[1]
  var p03 = p[2]
  var p12 = p[3]
  var p13 = p[4]
  var p23 = p[5]
  return Math.sqrt(
    p01*p01 +
    p02*p02 +
    p03*p03 +
    p12*p12 +
    p13*p13 +
    p23*p23)
}

function pluckerNormalForm(out, p) {
  var s = pluckerNorm(p)
  if(s < EPSILON) {
    s = 1.0
  } else {
    s = 1.0 / s
  }
  out[0] = s * p[0]
  out[1] = s * p[1]
  out[2] = s * p[2]
  out[3] = s * p[3]
  out[4] = s * p[4]
  out[5] = s * p[5]
  return out
}
exports.normalize = pluckerNormalForm

function pluckerEqual(line1, line2) {
  var norm1 = pluckerNorm(line1)
  var norm2 = pluckerNorm(line2)
  var s1 = (norm1 > EPSILON) ? 1.0 / norm1 : 1.0
  var s2 = (norm2 > EPSILON) ? 1.0 / norm2 : 1.0
  for(var i=0; i<6; ++i) {
    if(Math.abs(s1*line1[i] - s2*line2[i]) > EPSILON) {
      return false
    }
  }
  return true
}
exports.equal = pluckerEqual