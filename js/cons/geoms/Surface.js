/**
 * @copyright Jon Loldrup loldrup@gmail.com
 * @copyright Hjalte Loldrup hjalteloldrup@gmail.com

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

        // X = length, Y = height, Z = depth,
        THREE.SurfaceGeometry = function (noOfSegments_phi, noOfSegments_theta, getX, getY, getZ, aSurfaceGeometrySpec) {

            var phi_seg,
                theta_seg,
                debug,
                normal = new THREE.Vector3( 0, 0, 1),
                approximationPrecisionX,
                maxRecursionDepthX,
                approximationPrecisionY,
                maxRecursionDepthY;

                approximationPrecisionX = aSurfaceGeometrySpec.conf.getX.approximationPrecision;
                maxRecursionDepthX      = aSurfaceGeometrySpec.conf.getX.maxRecursionDepth;
                approximationPrecisionY = aSurfaceGeometrySpec.conf.getY.approximationPrecision;
                maxRecursionDepthY      = aSurfaceGeometrySpec.conf.getY.maxRecursionDepth;
                //console.log("aSurfaceGeometrySpec.conf.getX.approximationPrecision: ", aSurfaceGeometrySpec.conf.getX.approximationPrecision);
                //console.log("aSurfaceGeometrySpec.conf.getX.maxRecursionDepth: ", aSurfaceGeometrySpec.conf.getX.maxRecursionDepth);

                this.vertices = [];
            THREE.Geometry.call( this );

            for ( theta_seg = 0; theta_seg <= noOfSegments_theta; theta_seg ++ ) {
                for ( phi_seg = 0; phi_seg <= noOfSegments_phi;   phi_seg ++ ) {
                    //debug = false; //((theta_seg === 0) && (phi_seg === 4)); //|| ((theta_seg === 0) && (phi_seg === 0));
                    var x = getX(phi_seg, theta_seg,
                        approximationPrecisionX,
                        maxRecursionDepthX, aSurfaceGeometrySpec.conf.getX.debug);
                    var y = getY(phi_seg, theta_seg,
                        approximationPrecisionY,
                        maxRecursionDepthY, aSurfaceGeometrySpec.conf.getY.debug);
                    var z = getZ(         theta_seg);
                    this.vertices.push( new THREE.Vector3( x, y, z ) );
                };
            };


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
                };
            };

            this.computeCentroids();
        };
        THREE.SurfaceGeometry.prototype = Object.create( THREE.Geometry.prototype );

        Object.freeze(THREE.SurfaceGeometry);
    }
);