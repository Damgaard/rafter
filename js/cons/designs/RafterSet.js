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


//This constructor is not in use anywhere yet


define(
    [
    ],
    function (

        ) {
        //console.log("4");

        var RafterSet;

        RafterSet = function ( aRafterSetSpec, aSegmentation ) {
            var spec, thetaS, phiS, vertices;

            vertices = [];
            spec = {};

            for(var prop in aRafterSetSpec){
                if(aRafterSetSpec.hasOwnProperty(prop)) {
                    spec[prop] = aRafterSetSpec[prop];
                }
            }

            for ( thetaS = 0; thetaS <= (aSegmentation.noOfSegments_along_polar * 2); thetaS ++ ) {
                for ( phiS = 0; phiS <  (aSegmentation.noOfSegments_along_azimuth * 2); phiS   ++ ) {  // '<' is to avoid double points at phi=0
                    var x = aSegmentation.getXSES(phiS, thetaS);
                    var y = aSegmentation.getYSES(phiS, thetaS);
                    var z = aSegmentation.getZSES(      thetaS);
                    vertices.push( new THREE.Vector3( x, y, z ) );
                };
            };

//console.log("vertices[] ", this.vertices);
//console.log("hvor lang er vertices[] ? ", this.vertices.length);

            for (thetaS = 0; thetaS  < (aSegmentation.noOfSegments_along_polar   * 2); thetaS ++ ) {
                for ( phiS = 0; phiS < (aSegmentation.noOfSegments_along_azimuth * 2); phiS ++ ) {
                    var a = phiS + (aSegmentation.noOfSegments_along_azimuth+1) * thetaS;
                    var b = phiS + (aSegmentation.noOfSegments_along_azimuth+1) * ( thetaS + 1 );
                    var c = ( phiS + 1 ) + (aSegmentation.noOfSegments_along_azimuth+1) * ( thetaS + 1 );
                    var d = ( phiS + 1 ) + (aSegmentation.noOfSegments_along_azimuth+1) * thetaS;
                };
            };

            //THIS CONSTRUCTOR REALLY SHOULD RETURN SOMETHING

            Object.freeze(this);
        };

        Object.freeze(RafterSet);
        return RafterSet;

    }
);