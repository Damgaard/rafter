/**
 * @copyright Jon Loldrup loldrup@gmail.com
 * @copyright other-contributors-name-here

 This file is part of Rafter.

 Rafter is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Rafter is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero Public License for more details.

 You should have received a copy of the GNU Affero Public License
 along with Rafter. If not, see <https://www.gnu.org/licenses/agpl.html>.
 */

"use strict";


define(
    [   "libs/three.js/build/three"
    ],
    function (
        three
        ) {
        //console.log("9");

        // X = length, Y = height, Z = depth,
        THREE.SurfaceGeometry = function (noOfSegments_phi, noOfSegments_theta, getX, getY, getZ) {
            var phi_seg,
                theta_seg,
                color,
                normal = new THREE.Vector3( 0, 0, 1);

            this.vertices = [];

            THREE.Geometry.call( this );
//console.log("noOfSegments_phi: ", noOfSegments_phi);
            for ( theta_seg = 0; theta_seg <= noOfSegments_theta; theta_seg ++ ) {
//console.log("********theta_seg********: ", theta_seg);
                for ( phi_seg = 0; phi_seg <= noOfSegments_phi;   phi_seg ++ ) {
                    //console.log("*************************");
                    //console.log("****phi_seg****: ", phi_seg);
                    var x = getX(phi_seg, theta_seg, 0.01, 100);
                    var y = getY(phi_seg, theta_seg, 0.01, 100);
                    var z = getZ(         theta_seg, 0.01, 100);
                   //console.log("x: ", x);
                    this.vertices.push( new THREE.Vector3( x, y, z ) );
                };
            };

            //color = new THREE.Color( 0xffffff );
            //color.setHSL( 1.0, 1.0, 0.5 );

            for (theta_seg = 0; theta_seg < noOfSegments_theta; theta_seg ++ ) {
                for ( phi_seg = 0; phi_seg < noOfSegments_phi; phi_seg ++ ) {
                    var a = phi_seg + (noOfSegments_phi+1) * theta_seg;
                    var b = phi_seg + (noOfSegments_phi+1) * ( theta_seg + 1 );
                    var c = ( phi_seg + 1 ) + (noOfSegments_phi+1) * ( theta_seg + 1 );
                    var d = ( phi_seg + 1 ) + (noOfSegments_phi+1) * theta_seg;

                    var face = new THREE.Face4( a, b, c, d );
                    face.normal.copy( normal );
                    face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );
                    this.faces.push( face );
                    //this.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                };
            };

            this.computeCentroids();
        };
        THREE.SurfaceGeometry.prototype = Object.create( THREE.Geometry.prototype );

        Object.freeze(THREE.SurfaceGeometry);
    }
);

/*
THREE.Line = function ( geometry, material, type ) {

    THREE.Object3D.call( this );

    this.geometry = geometry;
    this.material = ( material !== undefined ) ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );
    this.type = ( type !== undefined ) ? type : THREE.LineStrip;

    if ( this.geometry ) {
        if ( ! this.geometry.boundingSphere ) {
            this.geometry.computeBoundingSphere();*/


/*                    var material = new THREE.LineBasicMaterial({
 color: 0xffffff
 });
 endPointX = getX(best_phiR_end, thetaR_start);
 endPointY = getY(best_phiR_end, thetaR_start);
 endPointZ = getZ(thetaR_start);
 var geometry = new THREE.Geometry();
 geometry.vertices.push(new THREE.Vector3(0, 0, 0));
 geometry.vertices.push(new THREE.Vector3(endPointX, endPointY, endPointZ));
 var line = new THREE.Line(geometry, material);
 makeScene.scene.add(line);*/


/*if (!this.vertices[face.a]) {
 console.log("this face.a can't index vertices: ", face.a);
 }

 if (!this.vertices[face.b]) {
 console.log("this face.b can't index vertices: ", face.b);
 }

 if (!this.vertices[face.c]) {
 console.log("this face.c can't index vertices: ", face.c);
 }

 if (!this.vertices[face.d]) {
 console.log("this face.d can't index vertices: ", face.d);
 }*/