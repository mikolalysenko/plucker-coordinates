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

tape("plucker-basic", function(t) {
  t.equals(plucker.create().length, 6)

  var line = plucker.fromVec3([0,0,0], [1,0,0])
  
  t.end()
})

tape("plucker-transform", function(t) {
  for(var i=0; i<100; ++i) {
    //Pick two points, construct line through them
    var p1 = vec4.random(vec4.create())
    var p2 = vec4.random(vec4.create())
    var l = plucker.fromVec4(plucker.create(), p1, p2)

    //Construct matrix
    var m = mat4.random(mat4.create())
    p1 = vec4.transformMat4(p1, p1, m)


  }

  t.end()
})