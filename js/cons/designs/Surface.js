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
    [   "libs/three.js/build/three",
        "init/makeScene"
    ],
    function (
        three,
        makeScene
        ) {
        //console.log("7");

        var Surface;

        Surface = function (aSurfaceSpec, getXgetYgetZ_rad, phiR_estimator) {
            var spec, aSurface, linearDistR, surfaceDistR,
                surfaceDistR_along_azimuth,
                surfaceDistR_along_polar,
                horizontalSurfaceProjection_body,
                horizontalSurfaceProjection,
                getX, getY, getZ,
                approximationPrecision,
                maxRecursionDepth;

            spec = {};

            for(var prop in aSurfaceSpec){
                spec[prop] = aSurfaceSpec[prop];
            };

            getX = getXgetYgetZ_rad.getX;
            getY = getXgetYgetZ_rad.getY;
            getZ = getXgetYgetZ_rad.getZ;
            approximationPrecision = aSurfaceSpec.approximationPrecision;
            maxRecursionDepth = aSurfaceSpec.maxRecursionDepth;
            //console.log("outer approximationPrecision: ", approximationPrecision);

            linearDistR = function(phiR_start, thetaR_start, phiR_end, thetaR_end) {
                var phi_x, phi_y, phi_z, phi__x, phi__y, phi__z, x_diff, y_diff, z_diff, seg_dist;

                phi_x  = getX(phiR_start, thetaR_start);
                phi_y  = getY(phiR_start, thetaR_start);
                phi_z  = getZ(thetaR_start);
                phi__x = getX(phiR_end, thetaR_end);
                phi__y = getY(phiR_end, thetaR_end);
                phi__z = getZ(thetaR_end);

//            console.log("thetaR_start: ", thetaR_start);
//            console.log("thetaR_end: ", thetaR_end);
//            console.log("phi_x: ", phi_x);
//            console.log("phi_y: ", phi_y);
//            console.log("phi_z: ", phi_z);
//            console.log("phi__x: ", phi__x);
//            console.log("phi__y: ", phi__y);
//            console.log("phi__z: ", phi__z);
//            var material = new THREE.LineBasicMaterial({
//                color: 0xffffff
//            });
//            var geometry = new THREE.Geometry();
//            geometry.vertices.push(new THREE.Vector3(phi_x, phi_y, phi_z));
//            geometry.vertices.push(new THREE.Vector3(phi__x, phi__y, phi__z));
//            var line = new THREE.Line(geometry, material);
//            makeScene.scene.add(line);

                x_diff = phi__x - phi_x;
                y_diff = phi__y - phi_y;
                z_diff = phi__z - phi_z;

                seg_dist = Math.sqrt( x_diff * x_diff + y_diff * y_diff + z_diff * z_diff );
                return seg_dist;
            };

            // distance along azimuth or polar, between two points. Direction is determined by (point_end - point_start)
            // *** Doesn't always work well for phiR_end > Pi*2  ***
            // Private function
            surfaceDistR = function(phiR_start, thetaR_start, phiR_end, thetaR_end, approximationPrecision, maxRecursionDepth) {
                var deltaPhi, deltaTheta, dist, halfDist, firstDist, secondDist;
//                    console.log("arguments: ", arguments);
//                    console.log("approximationPrecision: ", approximationPrecision);
                deltaPhi = phiR_end - phiR_start;
                deltaTheta = thetaR_end - thetaR_start;

                //console.log("phiR_start ", phiR_start );
                //console.log("phiR_end ", phiR_end );

                dist = linearDistR(phiR_start, thetaR_start, phiR_start + deltaPhi, thetaR_start + deltaTheta);
                //console.log("dist: ", dist);
                halfDist = linearDistR(phiR_start, thetaR_start, phiR_start + deltaPhi / 2, thetaR_start + deltaTheta / 2);
                //console.log("halfDist: ", halfDist);

                /*                     var material = new THREE.LineBasicMaterial({
                 color: 0xffffff
                 });
                 phiS_start_x = getX(phiR_start, thetaR_start);
                 phiS_start_y = getY(phiR_start, thetaR_start);
                 phiS_start_z = getZ(thetaR_start);
                 phiS_end_x = getX(phiR_end, thetaR_end);
                 phiS_end_y = getY(phiR_end, thetaR_end);
                 phiS_end_z = getZ(thetaR_end);
                 var geometry = new THREE.Geometry();
                 geometry.vertices.push(new THREE.Vector3(phiS_start_x, phiS_start_y, phiS_start_z));
                 geometry.vertices.push(new THREE.Vector3(phiS_end_x, phiS_end_y, phiS_end_z));
                 var line = new THREE.Line(geometry, material);
                 makeScene.scene.add(line);*/

                if(Math.abs(dist - halfDist * 2) > approximationPrecision && (maxRecursionDepth > 0)) {
                    //console.log("differencen er stoerre end approximationPrecision");
                    //console.log("difference: ", Math.abs(dist - halfDist * 2));
                    //console.log("VENSTRE REKURSION: ");
                    firstDist  = surfaceDistR(phiR_start,
                        thetaR_start,
                        phiR_start + deltaPhi / 2,
                        thetaR_start + deltaTheta / 2,
                        approximationPrecision, maxRecursionDepth - 1);
                    //console.log("VENSTRE REKURSION SLUT ");
                    //console.log("firstDist: ", firstDist);
                    //console.log("HOEJRE REKURSION: ");
                    secondDist = surfaceDistR(phiR_start + deltaPhi / 2,
                        thetaR_start + deltaTheta / 2,
                        phiR_start   + deltaPhi,
                        thetaR_start + deltaTheta,
                        approximationPrecision, maxRecursionDepth - 1);
                    //console.log("HOEJRE REKURSION SLUT ");
                    //console.log("secondDist: ", secondDist);
                    return firstDist + secondDist;
                } else {
                    return dist;
                }
            };

            surfaceDistR_along_azimuth = function(phiR_start, thetaR_start, phiR_end, approximationPrecision, maxRecursionDepth) {
//                    console.log("surfaceDistR_along_azimuth arguments: ", arguments);
                return (surfaceDistR(phiR_start, thetaR_start, phiR_end, thetaR_start, approximationPrecision, maxRecursionDepth))
            };

            surfaceDistR_along_polar = function(phiR_start, thetaR_start, thetaR_end, approximationPrecision, maxRecursionDepth) {
                return (surfaceDistR(phiR_start, thetaR_start, phiR_start, thetaR_end, approximationPrecision, maxRecursionDepth))
            };



            // gets the delta phiR between phiR_start and the phiR achieved by walking `distance` from
            // (phiR_start, theta) along the surface at constant azimuth
            horizontalSurfaceProjection = function(phiR_start, thetaR_start, projectionDistance,
                                                   approximationPrecision, maxRecursionDepth) {
                var init_phiR_end, init_surfaceDist_guesstimate, best_phiR_end, endPointX, endPointY, endPointZ;

                init_phiR_end = phiR_estimator(projectionDistance);// - Math.PI;
                init_surfaceDist_guesstimate = surfaceDistR_along_azimuth(phiR_start, thetaR_start, init_phiR_end,
                                                                          approximationPrecision, maxRecursionDepth);
                console.log(" ");
                console.log("projectionDistance: ", projectionDistance);
                console.log("init_phiR_end: ", init_phiR_end);
                console.log("init_surfaceDist_guesstimate: ", init_surfaceDist_guesstimate);

                best_phiR_end = horizontalSurfaceProjection_body(
                    phiR_start, thetaR_start, init_phiR_end, init_surfaceDist_guesstimate,
                    projectionDistance, approximationPrecision,
                    maxRecursionDepth);


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

                return best_phiR_end;
            };


            // gets the delta phiR between phiR_start and the phiR achieved by walking `distance` from
            // (phiR_start, theta) along the surface at constant azimuth
            // *** Doesn't always work well for best_phiR_end > Pi*2 and never for best_phiR_end < 0  ***
            horizontalSurfaceProjection_body = function(phiR_start, thetaR_start, current_phiR_end_guesstimate,
                                                        best_surfaceDist, projectionDistance,
                                                        approximationPrecision, maxRecursionDepth) {
                var deltaDist, distRatio, surfaceDist, new_phiR_end_guesstimate, surfaceDist_guesstimate, best_phiR_end;
                //console.log("arguments: ", arguments);

                deltaDist = best_surfaceDist - projectionDistance;

                distRatio = best_surfaceDist / projectionDistance;

                if(current_phiR_end_guesstimate >= 0) {new_phiR_end_guesstimate = current_phiR_end_guesstimate / distRatio;
                } else { new_phiR_end_guesstimate = current_phiR_end_guesstimate * distRatio;};

                new_phiR_end_guesstimate = (new_phiR_end_guesstimate + current_phiR_end_guesstimate) / 2;

                surfaceDist_guesstimate = surfaceDistR_along_azimuth(phiR_start, thetaR_start, new_phiR_end_guesstimate, approximationPrecision, maxRecursionDepth);

                console.log(" ");
                console.log("projectionDistance: ", projectionDistance);
                console.log("deltaDist: ", deltaDist);
                console.log("distRatio: ", distRatio);
                console.log("new_phiR_end_guesstimate: ", new_phiR_end_guesstimate);
                console.log("current_phiR_end_guesstimate minus new_phiR_end_guesstimate: ", current_phiR_end_guesstimate - new_phiR_end_guesstimate);
                console.log("new_phiR_end_guesstimate: ", new_phiR_end_guesstimate);
                console.log("surfaceDist_guesstimate: ", surfaceDist_guesstimate);

                if(Math.abs(deltaDist) > approximationPrecision && (maxRecursionDepth > 0)) {
//                        console.log("differencen er stoerre end approximationPrecision");
                    best_phiR_end = horizontalSurfaceProjection_body(
                        phiR_start, thetaR_start, new_phiR_end_guesstimate, surfaceDist_guesstimate,
                        projectionDistance, approximationPrecision,
                        maxRecursionDepth - 1);
                } else {console.log(" "); console.log("surfaceDist_guesstimate: ", surfaceDist_guesstimate); console.log(" ");}
                return best_phiR_end;
            };




            this.getX = getX;
            this.getY = getY;
            this.getZ = getZ;
            this.linearDistR = linearDistR;
            this.surfaceDistR_along_azimuth = surfaceDistR_along_azimuth;
            this.surfaceDistR_along_polar = surfaceDistR_along_polar;
            this.horizontalSurfaceProjection = horizontalSurfaceProjection;

            Object.freeze(this);
        };

        Object.freeze(Surface);
        return Surface;

    }
);
