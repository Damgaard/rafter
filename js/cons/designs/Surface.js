/**
 * @copyright Jon Loldrup loldrup@gmail.com
 * @copyright Hjalte Loldrup hjalteloldrup@gmail.com

 This file is part of Rafter.

 Rafter is free software: you can redistribute it and/or modify
 it under the terms o * @copyright other-contributors-name-here
f the GNU Affero Public License as published by
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

        Surface = function (aSurfaceSpec, getXgetYgetZ_rad, phiR_estimator, radius) {
            var spec, linearDistR, surfaceDistR,
                surfaceDistR_body,
                surfaceDistR_along_azimuth,
                surfaceDistR_along_polar,
                horizontalSurfaceProjection_body,
                horizontalSurfaceProjection,
                verticalSurfaceProjection,
                getXREA, getYREA, getZREA;

            spec = {};

            for(var prop in aSurfaceSpec){
                spec[prop] = aSurfaceSpec[prop];
            };

            getXREA = getXgetYgetZ_rad.getX;  // Gets X from radians (azimuth, polar) equidistant along azimuth.
            getYREA = getXgetYgetZ_rad.getY;     // Gets Y from radians (azimuth, polar) equidistant along azimuth.
            getZREA = getXgetYgetZ_rad.getZ;     // Gets Z from radians (azimuth, polar) equidistant along azimuth.
            //approximationPrecision = aSurfaceSpec.approximationPrecision;
            //maxRecursionDepth = aSurfaceSpec.maxRecursionDepth;
            //console.log("outer approximationPrecision: ", approximationPrecision);

            linearDistR = function(phiR_start, thetaR_start, phiR_end, thetaR_end) {
                var phi_x, phi_y, phi_z, phi__x, phi__y, phi__z, x_diff, y_diff, z_diff, seg_dist;

                phi_x  = getXREA(phiR_start, thetaR_start);
                phi_y  = getYREA(phiR_start, thetaR_start);
                phi_z  = getZREA(thetaR_start);
                phi__x = getXREA(phiR_end, thetaR_end);
                phi__y = getYREA(phiR_end, thetaR_end);
                phi__z = getZREA(thetaR_end);

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
                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.surfaceDistR.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.surfaceDistR.maxRecursionDepth;

                return surfaceDistR_body(phiR_start, thetaR_start, phiR_end, thetaR_end, approximationPrecision, maxRecursionDepth)
            };

            surfaceDistR_along_azimuth = function(phiR_start, thetaR_start, phiR_end, approximationPrecision, maxRecursionDepth) {
                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.surfaceDistR_along_azimuth.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.surfaceDistR_along_azimuth.maxRecursionDepth;

                return (surfaceDistR(phiR_start, thetaR_start, phiR_end, thetaR_start, approximationPrecision, maxRecursionDepth))
            };

            surfaceDistR_along_polar = function(phiR_start, thetaR_start, thetaR_end, approximationPrecision, maxRecursionDepth) {
                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.surfaceDistR_along_polar.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.surfaceDistR_along_polar.maxRecursionDepth;

                return (surfaceDistR(phiR_start, thetaR_start, phiR_start, thetaR_end, approximationPrecision, maxRecursionDepth))
            };

            surfaceDistR_body = function(phiR_start, thetaR_start, phiR_end, thetaR_end, approximationPrecision, maxRecursionDepth) {
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
                 phiS_start_x = getXREA(phiR_start, thetaR_start);
                 phiS_start_y = getYREA(phiR_start, thetaR_start);
                 phiS_start_z = getZREA(thetaR_start);
                 phiS_end_x = getXREA(phiR_end, thetaR_end);
                 phiS_end_y = getYREA(phiR_end, thetaR_end);
                 phiS_end_z = getZREA(thetaR_end);
                 var geometry = new THREE.Geometry();
                 geometry.vertices.push(new THREE.Vector3(phiS_start_x, phiS_start_y, phiS_start_z));
                 geometry.vertices.push(new THREE.Vector3(phiS_end_x, phiS_end_y, phiS_end_z));
                 var line = new THREE.Line(geometry, material);
                 makeScene.scene.add(line);*/

                if(Math.abs(dist - halfDist * 2) > approximationPrecision && (maxRecursionDepth > 0)) {
                    //console.log("differencen er stoerre end approximationPrecision");
                    //console.log("difference: ", Math.abs(dist - halfDist * 2));
                    //console.log("VENSTRE REKURSION: ");
                    firstDist  = surfaceDistR_body(phiR_start,
                        thetaR_start,
                        phiR_start + deltaPhi / 2,
                        thetaR_start + deltaTheta / 2,
                        approximationPrecision, maxRecursionDepth - 1);
                    //console.log("VENSTRE REKURSION SLUT ");
                    //console.log("firstDist: ", firstDist);
                    //console.log("HOEJRE REKURSION: ");
                    secondDist = surfaceDistR_body(phiR_start + deltaPhi / 2,
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


            // gets the delta phiR between phiR_start and the phiR achieved by walking `distance` from (phiR_start, theta) along the surface at constant azimuth
            // *** Doesn't always work well for best_phiR_end > Pi*2 and never for best_phiR_end < 0  ***
            horizontalSurfaceProjection_body = function(phiR_start, thetaR_start, best_phiR_end, projectionDistance,
                                                         approximationPrecision, maxRecursionDepth) {
                var surfaceDist, distRatio, phiR_end_guesstimate, deltaDist;
                //console.log("arguments: ", arguments);

                surfaceDist = surfaceDistR_along_azimuth(phiR_start, thetaR_start, best_phiR_end, approximationPrecision, maxRecursionDepth);

                deltaDist = surfaceDist - projectionDistance;

                distRatio = surfaceDist / projectionDistance;

                if(best_phiR_end >= 0) {phiR_end_guesstimate = best_phiR_end / distRatio;
                } else { phiR_end_guesstimate = best_phiR_end * distRatio;};

                phiR_end_guesstimate = (phiR_end_guesstimate + best_phiR_end) / 2;

               /* console.log(" ");
                console.log("best_phiR_end: ", best_phiR_end);
                console.log("surfaceDist: ", surfaceDist);
                console.log("projectionDistance: ", projectionDistance);
                console.log("deltaDist: ", deltaDist);
                console.log("distRatio: ", distRatio);
                console.log("phiR_end_guesstimate: ", phiR_end_guesstimate);
                console.log("best_phiR_end minus first phiR_end_guesstimate: ", best_phiR_end - phiR_end_guesstimate);
                console.log("phiR_end_guesstimate: ", phiR_end_guesstimate);
*/
                if(Math.abs(deltaDist) > approximationPrecision && (maxRecursionDepth > 0)) {
//                        console.log("differencen er stoerre end approximationPrecision");
                    best_phiR_end = horizontalSurfaceProjection_body(
                        phiR_start, thetaR_start, phiR_end_guesstimate,
                        projectionDistance, approximationPrecision,
                        maxRecursionDepth - 1);
                } else { // console.log(" "); console.log("best surfaceDist: ", surfaceDist); console.log(" ");
                }
                return best_phiR_end;
            };


            // gets the delta phiR between phiR_start and the phiR achieved by walking `projectionDistance` from (phiR_start, thetaR) along the surface at constant azimuth
            horizontalSurfaceProjection = function(phiR_start, thetaR, projectionDistance,
                                                   approximationPrecision, maxRecursionDepth) {
                var init_phiR_end, best_phiR_end, endPointX, endPointY, endPointZ;

                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.horizontalSurfaceProjection.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.horizontalSurfaceProjection.maxRecursionDepth;

                init_phiR_end = phiR_estimator(projectionDistance);// - Math.PI;
                //console.log(" ");
                //console.log("init_phiR_end: ", init_phiR_end);

                best_phiR_end = horizontalSurfaceProjection_body(
                    phiR_start, thetaR, init_phiR_end,
                    projectionDistance, approximationPrecision,
                    maxRecursionDepth);

                /*                    var material = new THREE.LineBasicMaterial({
                 color: 0xffffff
                 });
                 endPointX = getXREA(best_phiR_end, thetaR);
                 endPointY = getYREA(best_phiR_end, thetaR);
                 endPointZ = getZREA(thetaR);
                 var geometry = new THREE.Geometry();
                 geometry.vertices.push(new THREE.Vector3(0, 0, 0));
                 geometry.vertices.push(new THREE.Vector3(endPointX, endPointY, endPointZ));
                 var line = new THREE.Line(geometry, material);
                 makeScene.scene.add(line);*/

                return best_phiR_end;
            };


            // gets the delta thetaR between thetaR_start and the thetaR achieved by walking `projectionDistance` from (phiR, thetaR_start) along the surface at constant polar
            verticalSurfaceProjection = function(phiR, thetaR_start, projectionDistance, approximationPrecision, maxRecursionDepth) {
                var thetaR_end;

                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.verticalSurfaceProjection.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.verticalSurfaceProjection.maxRecursionDepth;

                console.log("radius: ", radius);

                thetaR_end = thetaR_start + projectionDistance / radius;

                return thetaR_end;
            };


            this.getXREA = getXREA;
            this.getYREA = getYREA;
            this.getZREA = getZREA;
            this.linearDistR = linearDistR;
            this.surfaceDistR_along_azimuth  = surfaceDistR_along_azimuth;
            this.surfaceDistR_along_polar    = surfaceDistR_along_polar;
            this.horizontalSurfaceProjection = horizontalSurfaceProjection,
            this.verticalSurfaceProjection   = verticalSurfaceProjection;

            Object.freeze(this);
        };

        Object.freeze(Surface);
        return Surface;

    }
);
