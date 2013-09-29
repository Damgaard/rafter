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
        "init/makeScene",
        "cons/geoms/phiR_mark"
    ],
    function (
        three,
        makeScene,
        phiR_mark  // don't use any variables explicitly exported from this one, here.
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
                getXR, getYR, getZR;

            spec = {};

            for(var prop in aSurfaceSpec){
                spec[prop] = aSurfaceSpec[prop];
            };

            // Gets X from radians (azimuth, polar) equidistant along azimuth.
            getXR = getXgetYgetZ_rad.getX;
            // Gets Y from radians (azimuth, polar) equidistant along azimuth.
            getYR = getXgetYgetZ_rad.getY;
            // Gets Z from radians (azimuth, polar) equidistant along azimuth.
            getZR = getXgetYgetZ_rad.getZ;


            linearDistR = function(phiR_start, thetaR_start, phiR_end, thetaR_end) {
                var phi_x, phi_y, phi_z, phi__x, phi__y, phi__z, x_diff, y_diff, z_diff, seg_dist;

                phi_x  = getXR(phiR_start, thetaR_start);
                phi_y  = getYR(phiR_start, thetaR_start);
                phi_z  = getZR(thetaR_start);
                phi__x = getXR(phiR_end, thetaR_end);
                phi__y = getYR(phiR_end, thetaR_end);
                phi__z = getZR(thetaR_end);

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


            /**
             * @see surfaceDistR_body
             *
             * @private
             */

            surfaceDistR = function(phiR_start, thetaR_start, phiR_end, thetaR_end,
                                    approximationPrecision, maxRecursionDepth, debug) {

                approximationPrecision = approximationPrecision ||
                    aSurfaceSpec.conf.surfaceDistR.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aSurfaceSpec.conf.surfaceDistR.maxRecursionDepth;

                return surfaceDistR_body(phiR_start, thetaR_start, phiR_end, thetaR_end,
                    approximationPrecision, maxRecursionDepth, debug);
            };


            surfaceDistR_along_azimuth = function(phiR_start, thetaR_start, phiR_end,
                                                  approximationPrecision, maxRecursionDepth, debug) {

                approximationPrecision = approximationPrecision ||
                    aSurfaceSpec.conf.surfaceDistR_along_azimuth.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aSurfaceSpec.conf.surfaceDistR_along_azimuth.maxRecursionDepth;
                if (typeof debug == 'undefined') {
                    debug = aSurfaceSpec.conf.surfaceDistR_along_azimuth.debug; }

                if (debug) {
                    //console.log(" ");
                    //console.log("phiR_start: ", phiR_start);
                    //console.log("thetaR_start: ", thetaR_start);
                    //console.log("phiR_end: ", phiR_end);
                    //console.log(" ");

                    /*var material = new THREE.LineBasicMaterial({
                        color: 0xffffff
                    });
                    var endPointX = getXR(phiR_end, thetaR_start);
                    var endPointY = getYR(phiR_end, thetaR_start);
                    var endPointZ = getZR(thetaR_start);
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
                    geometry.vertices.push(new THREE.Vector3(endPointX, endPointY, endPointZ));
                    var line = new THREE.Line(geometry, material);
                    makeScene.scene.add(line);*/
                }

                return surfaceDistR(phiR_start, thetaR_start, phiR_end, thetaR_start,
                    approximationPrecision, maxRecursionDepth, debug);
            };


            surfaceDistR_along_polar = function(phiR_start, thetaR_start, thetaR_end,
                                                approximationPrecision, maxRecursionDepth) {

                approximationPrecision = approximationPrecision ||
                    aSurfaceSpec.conf.surfaceDistR_along_polar.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aSurfaceSpec.conf.surfaceDistR_along_polar.maxRecursionDepth;

                return surfaceDistR(phiR_start, thetaR_start, phiR_start, thetaR_end,
                    approximationPrecision, maxRecursionDepth);
            };


            /**
             * Should give the distance along azimuth or polar between two points. Direction
             * is determined by (point_end - point_start).
             * surfaceDistR doesn't work along azimuth and polar simultaneously. One of them must
             * be set to zero.
             * Doesn't always work well for phiR_end > Pi*2.
             *
             * @param phiR_end  The absolute end value (as in: not a delta value) at which to
             * measure the surface distance to.
             *
             * @private
             */

            surfaceDistR_body = function(phiR_start, thetaR_start, phiR_end, thetaR_end,
                                         approximationPrecision, maxRecursionDepth, debug) {
                var deltaPhi, deltaTheta, dist, halfDist, firstDist, secondDist;
//                    console.log("arguments: ", arguments);
//                    console.log("approximationPrecision: ", approximationPrecision);
                deltaPhi = phiR_end - phiR_start;
                deltaTheta = thetaR_end - thetaR_start;

                //console.log("phiR_start ", phiR_start );
                //console.log("phiR_end ", phiR_end );

                dist = linearDistR(phiR_start, thetaR_start, phiR_start + deltaPhi,
                    thetaR_start + deltaTheta);
                //console.log("dist: ", dist);
                halfDist = linearDistR(phiR_start, thetaR_start, phiR_start + deltaPhi / 2,
                    thetaR_start + deltaTheta / 2);
                //console.log("halfDist: ", halfDist);

                if (debug) {
                    var material = new THREE.LineBasicMaterial({
                     color: 0xffffff
                     });
                    var phiS_start_x = getXR(phiR_start, thetaR_start);
                    var phiS_start_y = getYR(phiR_start, thetaR_start);
                    var phiS_start_z = getZR(thetaR_start);
                    var phiS_end_x = getXR(phiR_end, thetaR_end);
                    var phiS_end_y = getYR(phiR_end, thetaR_end);
                    var phiS_end_z = getZR(thetaR_end);
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(phiS_start_x, phiS_start_y, phiS_start_z));
                    geometry.vertices.push(new THREE.Vector3(phiS_end_x, phiS_end_y, phiS_end_z));
                    var line = new THREE.Line(geometry, material);
                    makeScene.scene.add(line);
                }

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


            /**
             * Gets the delta phiR between phiR_start and the phiR achieved by walking `distance`
             * from (phiR_start, theta) along the surface at constant azimuth.
             *
             * @see horizontalSurfaceProjection_body
             */

            horizontalSurfaceProjection = function(phiR_start, thetaR, projectionDistance,
                                                   approximationPrecision, maxRecursionDepth, debug, phiS, thetaS) {
                var init_phiR_end, best_phiR_end, endPointX, endPointY, endPointZ;

                approximationPrecision = approximationPrecision ||
                    aSurfaceSpec.conf.horizontalSurfaceProjection.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aSurfaceSpec.conf.horizontalSurfaceProjection.maxRecursionDepth;
                if (typeof debug == 'undefined') {
                    debug = aSurfaceSpec.conf.horizontalSurfaceProjection.debug; }

                // phiR_start + a delta phiR gives an absolute phiR-value (in this case an initial
                // estimate of phiR_end).
                init_phiR_end = phiR_start + phiR_estimator(projectionDistance);

                if(debug) {
                    console.log("init_phiR_end: ", init_phiR_end);
                    console.log("phiS in horizontalSurfaceProjection: ", phiS);
                    console.log("thetaS in horizontalSurfaceProjection: ", thetaS);
                }

                best_phiR_end = horizontalSurfaceProjection_body(
                    phiR_start, thetaR, init_phiR_end,
                    projectionDistance, approximationPrecision,
                    maxRecursionDepth, debug, phiS, thetaS);

                if(debug) {console.log("best_phiR_end: ", best_phiR_end);}

                /*                    var material = new THREE.LineBasicMaterial({
                 color: 0xffffff
                 });
                 endPointX = getXR(best_phiR_end, thetaR);
                 endPointY = getYR(best_phiR_end, thetaR);
                 endPointZ = getZR(thetaR);
                 var geometry = new THREE.Geometry();
                 geometry.vertices.push(new THREE.Vector3(0, 0, 0));
                 geometry.vertices.push(new THREE.Vector3(endPointX, endPointY, endPointZ));
                 var line = new THREE.Line(geometry, material);
                 makeScene.scene.add(line);*/

                return best_phiR_end;
            };


            /**
             * Gets the delta phiR between phiR_start and the phiR achieved by walking `distance`
             * from (phiR_start, theta) along the surface at constant azimuth.
             * If projectionDistance is negative, the walking dirphiR_estimatorection is also negative
             * (i.e. clockwise around the unit circle).
             *
             * @param  phiR_end_estimate_A  the phiR_end estimate that the previous recursive
             * call to horizontalSurfaceProjection_body came up with.
             * The value of phiR_end_estimate_A is the absolute end value (as in: not a delta value)
             * at which to measure the surface distance to.
             * Initially phiR_end_estimate_A is given as phiR_start + an estimate of the delta
             * phiR value that will generate a walk of distance projectionDistance.
             *
             * @param  projectionDistance   The distance wanted to be walked from phiR_start along
             * the surface at constant azimuth. Thus, projectionDistance is an offset from phiR_start
             * and is thus a phiR_start ignorant, sort of.
             * Although distances are normally always positive, projectionDistance can be given
             * as a negative value. This indicates that the walking is to be done in the negative
             * direction (i.e. clockwise around the unit circle).
             *
             * @return  The best phiR_end achieved through the approximation process.
             *
             * @private
             */

            horizontalSurfaceProjection_body = function(phiR_start, thetaR_start,
                                                        phiR_end_estimate_A, projectionDistance,
                                                        approximationPrecision,maxRecursionDepth,
                                                        debug, phiS, thetaS) {
                var surfaceDist, deltaDist, phiR_end_estimate_B, mark_phiR_one, mark_phiR_two, phiR_end_estimate_C, best_phiR_end;
                //console.log("arguments: ", arguments);

                //console.log("debug in horizontalSurfaceProjection_body: ", debug);

                // surfaceDist is the achieved walk (while projectionDistance was the wanted walk)
                // surfaceDist is an offset from phiR_start and is thus a phiR_start ignorant, just
                // as projectionDistance.
                surfaceDist = surfaceDistR_along_azimuth(phiR_start, thetaR_start, phiR_end_estimate_A,
                    0.01, maxRecursionDepth, debug);

                // as for projectionDistance, we need surfaceDist to be direction aware. That is, it
                // needs to be negative if the starting point of the surfaceDist walk (phiR_start)
                // is greater than its end point (phiR_end_estimate_A).
                if (phiR_start > phiR_end_estimate_A) { surfaceDist = -surfaceDist; };

                // delta**distance**:
                deltaDist = projectionDistance - surfaceDist;

                // now we need to translate the delta **distance** into some deltas effect
                // on the phiR_end **angle**:
                phiR_end_estimate_B = phiR_end_estimate_A + phiR_estimator(deltaDist);

                //console.log("1, debug in horizontalSurfaceProjection_body: ", debug);

                if(debug) { // && projectionDistance === 716.9945307505925) {
//                    console.log(" ");
//                    console.log("phiR_end_estimate_A: ", phiR_end_estimate_A);
                    //console.log("projectionDistance: ", projectionDistance);
                    //mark_phiR_one = new THREE.phiR_mark_geometry(phiR_end_estimate_A, getXR, getYR, getZR);
                    console.log("phiR_end for surfaceDist: ", phiR_end_estimate_A);
                    console.log("surfaceDist: ", surfaceDist);
                    //console.log("phiR_end for surfaceDist - true phiR_end: ", phiR_end_estimate_A - 6.283617937340014);
                    //console.log("deltaDist: ", deltaDist);
                    //console.log("phiR_estimator(deltaDist): ", phiR_estimator(deltaDist));
                    //console.log("phiR_end_estimate_B - true phiR_end: ", phiR_end_estimate_B -  6.283617937340014);
                    console.log(" ");
                    //console.log("phiS in horizontalSurfaceProjection_body: ", phiS);
                    //console.log("thetaS in horizontalSurfaceProjection_body: ", thetaS);

                }

                //console.log("approximationPrecision: ", approximationPrecision);
                //console.log("maxRecursionDepth: ", maxRecursionDepth);

                if(Math.abs(deltaDist) > approximationPrecision && (maxRecursionDepth > 0)) {
//                        console.log("differencen er stoerre end approximationPrecision");
                    //console.log("2, debug in horizontalSurfaceProjection_body: ", debug);
                    phiR_end_estimate_C = horizontalSurfaceProjection_body(
                        phiR_start, thetaR_start, phiR_end_estimate_B,
                        projectionDistance, approximationPrecision,
                        maxRecursionDepth - 1, debug, phiS, thetaS);
                } else if(debug) {
                    //console.log("remaining no of alowed recursion levels: ", maxRecursionDepth);
                    if (maxRecursionDepth === 0) {
                        //console.log(" ");
                        console.log("  WOOPS! deltaDist didn't converge to 0!");
                        console.log("best deltaDist: ", deltaDist);
                        console.log("best surfaceDist: ", surfaceDist);
                        console.log("arguments: ", arguments);
                        console.log("best_phiR_end: ", phiR_end_estimate_B);
                        mark_phiR_one = new THREE.phiR_mark_geometry(7.337545372284094, getXR, getYR, getZR);
                        mark_phiR_two = new THREE.phiR_mark_geometry(7.030486254051471, getXR, getYR, getZR);


                    }
                    //console.log(" ");
                }

                return phiR_end_estimate_C || phiR_end_estimate_B;
            };


            /**
             * Gets the delta thetaR between thetaR_start and the thetaR achieved by walking
             * `projectionDistance` from (phiR, thetaR_start) along the surface at constant polar.
             */

            verticalSurfaceProjection = function(phiR, thetaR_start, projectionDistance,
                                                 approximationPrecision, maxRecursionDepth) {
                var thetaR_end;

                approximationPrecision = approximationPrecision ||
                    aSurfaceSpec.conf.verticalSurfaceProjection.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aSurfaceSpec.conf.verticalSurfaceProjection.maxRecursionDepth;

                console.log("radius: ", radius);

                thetaR_end = thetaR_start + projectionDistance / radius;

                return thetaR_end;
            };


            this.getXR = getXR;
            this.getYR = getYR;
            this.getZR = getZR;
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