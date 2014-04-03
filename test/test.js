"use strict"

var tape = require("tape")
var glm = require("gl-matrix")
var vec4 = glm.vec4
var vec3 = glm.vec3
var mat4 = glm.mat4
var plucker = require("../plucker.js")

function verifyQuadratic(line) {
  return Math.abs(line[0] * line[3] + line[1] * line[4] + line[2] * line[5]) < 1e-8
}

function approxEqual(a, b) {
  for(var i=0; i<a.length; ++i) {
    if(Math.abs(a[i] - b[i]) > 1e-6) {
      return false
    }
  }
  return true
}

function verifyPoints(t, line, points) {
  //Verify points are on line
    var m = plucker.toMat4(mat4.create(), l)
    console.log(mat4.str(m))
    for(var s=-1.0; s<=1.0; s+=0.1) {
      var x = vec4.lerp(vec4.create(), p1, p2, s)
      var o = vec4.transformMat4(vec4.create(), x, m)
      t.ok(approxEqual(o, [0,0,0,0]), "check points on line (matrix)")
      t.ok(plucker.distanceToPoint(l, x) < 1e-6, "check distance")
      t.ok(approxEqual(plucker.closestPointTo(vec4.create(), l, x), x), "check closest point")
    }

}

tape("plucker-basic", function(t) {
  t.equals(plucker.create().length, 6)

  var line1 = plucker.fromVec3(plucker.create(), [0,0,0], [1,0,0])
  var line2 = plucker.fromPointDirection(plucker.create(), [0,0,0], [1,0,0])
  t.ok(plucker.equals(line1, line2))

  for(var i=0; i<1000; ++i) {
    var p1 = vec4.random(vec4.create(), 1.0)
    var p2 = vec4.random(vec4.create(), 1.0)
    var l = plucker.fromVec4(plucker.create(), p1, p2)
    t.ok(verifyQuadratic(l), "test fromVec4")
    var points = []
    for(var s=-1.0; s<=1.0; s+=0.1) {
      points.push(vec4.lerp(vec4.create(), p1, p2, s))
    }
    verifyPoints(t, l, points)
    
    p1 = vec3.random(vec3.create(), 1.0)
    p2 = vec3.random(vec3.create(), 1.0)
    l = plucker.fromVec3(l, p1, p2)
    t.ok(verifyQuadratic(l), "test fromVec3")

    l = plucker.fromPointDirection(l, p1, p2)
    t.ok(verifyQuadratic(l), "test fromPointDirection")
  }

  t.end()
})

/*
tape("plucker-transform", function(t) {
  for(var i=0; i<100; ++i) {
    //Pick two points, construct line through them
    var p1 = vec4.random(vec4.create(), 1.0)
    var p2 = vec4.random(vec4.create(), 1.0)
    var l = plucker.fromVec4(plucker.create(), p1, p2)

    //Construct matrix
    var m = mat4.random(mat4.create())
    p1 = vec4.transformMat4(p1, p1, m)
  }

  t.end()
})
*/