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


define( [],
    function () {

        var EquiSurfaceDist_segmentPositioning;

        EquiSurfaceDist_segmentPositioning = function (
            aEquiSurfaceDist_segmentPositioningSpec, aDelimitation,
            thetaR_from_thetaS, segment_extent_azimuth, aSurface ) {
            var memo = {},
                getXSESu, getYSESu, getZSESu,
                getXSES_body, getYSES_body;


            /**
             * @see getXSES_body
             */

            getXSESu = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {

                //console.log("approximationPrecision: ", approximationPrecision);

                approximationPrecision = approximationPrecision ||
                    aEquiSurfaceDist_segmentPositioningSpec.conf.getXSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aEquiSurfaceDist_segmentPositioningSpec.conf.getXSES.maxRecursionDepth;
                debug                  = debug || aEquiSurfaceDist_segmentPositioningSpec.conf.getXSES.debug;

                return getXSES_body(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug);
            };


            /**
             * Get X by Segment number. For regularly sampled input numbers (segment numbers),
             * the X-values returned by this function are spread Equidistant along the Surface.
             *
             * WARNING: the memo-mechanism assumes that getXSES_body is always called with the
             * same approximationPrecision and maxRecursionDepth. See github issue #27.
             *
             * @param phiS
             * @param thetaS
             * @returns {The X-value of the 3D coordinate (in euclidian space) at the surface point
             * defined by phiS and thetaS}
             */

            getXSES_body = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {
                var phiR_at_projDist, projectionDistance, thetaR, x;

                if(memo[phiS]) {
                    phiR_at_projDist = memo[phiS];
                } else {
                    projectionDistance = phiS * segment_extent_azimuth;
                    if (debug) {
                        //console.log("aDelimitation.phiR_min: ", aDelimitation.phiR_min);
                        //console.log("aDelimitation.thetaR_at_max_surface_extent_along_azimuth: ", aDelimitation.thetaR_at_max_surface_extent_along_azimuth);
                        //console.log("projectionDistance: ", projectionDistance);
                        //console.log("phiS in getXSES_body: ", phiS);
                        //console.log("thetaS in getXSES_body: ", thetaS);
                    }
                    phiR_at_projDist = aSurface.horizontalSurfaceProjection(
                        aDelimitation.phiR_min,
                        aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                        projectionDistance,
                        approximationPrecision,
                        maxRecursionDepth,
                        debug,
                        phiS,
                        thetaS);
                    memo[phiS] = phiR_at_projDist;
                }
                if (debug) { console.log("phir_best: ", phiR_at_projDist); }
                thetaR = thetaR_from_thetaS(thetaS);
                x = aSurface.getXR(phiR_at_projDist, thetaR);
                return x;
            };


            /**
             * @see getYSES_body
             */

            getYSESu = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {
                approximationPrecision = approximationPrecision ||
                    aEquiSurfaceDist_segmentPositioningSpec.conf.getYSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                    aEquiSurfaceDist_segmentPositioningSpec.conf.getYSES.maxRecursionDepth;
                debug                  = debug || aEquiSurfaceDist_segmentPositioningSpec.conf.getYSES.debug;

                return getYSES_body(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug);
            };


            /**
             * Get Y by Segment number. For regularly sampled input numbers (segment numbers),
             * the Y-values returned by this function are spread Equidistant along the Surface.
             *
             * WARNING: the memo-mechanism assumes that getYSES_body is always called with the
             * same approximationPrecision and maxRecursionDepth. See github issue #27.
             *
             * @param phiS
             * @param thetaS
             * @returns {The Y-value of the 3D coordinate (in euclidian space) at the surface point
             * defined by phiS and thetaS}
             */

            getYSES_body = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {
                var phiR_at_projDist, projectionDistance, thetaR, y;

                if(memo[phiS]) {
                    phiR_at_projDist = memo[phiS];
                } else {
                    projectionDistance = phiS * segment_extent_azimuth;
                    phiR_at_projDist = aSurface.horizontalSurfaceProjection(
                        aDelimitation.phiR_min,
                        aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                        projectionDistance,
                        approximationPrecision,
                        maxRecursionDepth,
                        debug,
                        phiS,
                        thetaS);
                    memo[phiS] = phiR_at_projDist;
                }
                if(debug) { console.log("phir_best: ", phiR_at_projDist); }
                thetaR = thetaR_from_thetaS(thetaS);
                y = aSurface.getYR(phiR_at_projDist, thetaR);
                return y;
            };


            /**
             * Get Z by Segment number. For regularly sampled input numbers (i.e. segment numbers),,
             * the Z-values returned by this function are spread Equidistant along the Surface.
             *
             * @param phiS
             * @param thetaS
             * @returns {The Z-value of the 3D coordinate (in euclidian space) at the surface point
             * defined by phiS and thetaS}
             */

            getZSESu = function(thetaS) {
                var thetaR, z;
                thetaR = thetaR_from_thetaS(thetaS);
                z = aSurface.getZR(thetaR);
                return z;
            };


            this.getXSESu = getXSESu;
            this.getYSESu = getYSESu;
            this.getZSESu = getZSESu;

            Object.freeze(this);
        };

        Object.freeze(EquiSurfaceDist_segmentPositioning);
        return EquiSurfaceDist_segmentPositioning;
    }
);
