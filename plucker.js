"use strict"

//Order for coordinates:
//
//  [ p01, p02, p03, p23, p31, p12 ]
//

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

//Check if a point is on the line
function pluckerTestVec4(p, q) {

}
exports.testVec4 = pluckerTestVec4

//Check if a 3d point is on the line
function pluckerTestVec3(p, q) {

}
exports.testVec3 = pluckerTestVec3

//Apply a transformation to the plucker coordiantes
function pluckerTransformMat4(out, M, p) {

}
exports.transformMat4 = pluckerTransformMat4