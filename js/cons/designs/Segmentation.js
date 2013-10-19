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
    [],
    function () {

        var Segmentation;

        Segmentation = function ( aSegmentationSpec, aDelimitation, aSurface ) {
            var spec, debug,
                max_surface_extent_along_azimuth,
                max_surface_extent_along_polar,
                noOfSegments_along_azimuth,
                noOfSegments_along_polar,
                segment_extent_azimuth, segment_extent_polar,
                phi_scaler, theta_scaler,
                phiR_offset_by_phiR_min,
                thetaR_offset_by_thetaR_min,
                phiR_from_phiS,
                thetaR_from_thetaS,
                getXSEA, getYSEA, getZSEA,
                memo = {},
                getXSES, getYSES, getZSES,
                getXSES_body, getYSES_body;

            spec = {};
            debug = aSegmentationSpec.conf.debug;

            //console.log("debug in Segmentation.js: ", debug);

            for (var prop in aSegmentationSpec) {
                if (aSegmentationSpec.hasOwnProperty(prop)) {
                    spec[prop] = aSegmentationSpec[prop];
                }
            }

            // find the extent of the part of the surface that is defined by the interval
            // [phiR_min,phiR_max]
            max_surface_extent_along_azimuth =
                aSurface.surfaceDistR_along_azimuth(aDelimitation.phiR_min,
                    aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                    aDelimitation.phiR_max,
                    aSegmentationSpec.conf.maxRecursionDepth, debug);
            max_surface_extent_along_polar =
                aSurface.surfaceDistR_along_polar(
                    aDelimitation.phiR_at_max_surface_extent_along_polar,
                    aDelimitation.thetaR_min,
                    aDelimitation.thetaR_max,
                    aSegmentationSpec.conf.maxRecursionDepth, debug);
            if (debug) {
                console.log("thetaR_at_max_surface_extent_along_azimuth: ", aDelimitation.thetaR_at_max_surface_extent_along_azimuth);
                console.log("phiR_at_max_surface_extent_along_polar: ", aDelimitation.phiR_at_max_surface_extent_along_polar);

                console.log("max_surface_extent_along_azimuth: ", max_surface_extent_along_azimuth);
                console.log("max_surface_extent_along_polar: ", max_surface_extent_along_polar);
                //console.log("spec.max_outer_segmentExtent_along_azimuth: ", spec.max_outer_segmentExtent_along_azimuth);
            }

            noOfSegments_along_azimuth =
                Math.ceil(max_surface_extent_along_azimuth /
                    spec.max_outer_segmentExtent_along_azimuth);
            noOfSegments_along_polar =
                Math.ceil(max_surface_extent_along_polar /
                    spec.max_outer_segmentExtent_along_polar);
            if (debug) {
                console.log("noOfSegments_along_polar: ", noOfSegments_along_polar);
                console.log("noOfSegments_along_azimuth: ", noOfSegments_along_azimuth);
            }

            segment_extent_azimuth =
                max_surface_extent_along_azimuth /
                    noOfSegments_along_azimuth;
            segment_extent_polar =
                max_surface_extent_along_polar /
                    noOfSegments_along_polar;
            phi_scaler =  aDelimitation.phiR_int /
                noOfSegments_along_azimuth;
            theta_scaler =aDelimitation.thetaR_int /
                noOfSegments_along_polar;

//            console.log("max_surface_extent_along_azimuth: ", max_surface_extent_along_azimuth);
//            console.log("circle circumference: ", Math.PI * 2 * 100 );
//            console.log("max_surface_extent_along_polar: ", max_surface_extent_along_polar);
//            console.log("circle 1/4 circumference: ", Math.PI * 0.5 * 100 );
//            console.log("noOfBricks_vertical: ", noOfBricks_vertical);
//            console.log("noOfSegments_along_azimuth: ", noOfSegments_along_azimuth)

            // This is just an offset. Not base shifting
            phiR_offset_by_phiR_min = function (phiR_not_offset) {
                return (phiR_not_offset + aDelimitation.phiR_min)
            }

            // This is just an offset. Not base shifting
            thetaR_offset_by_thetaR_min = function (thetaR_not_offset) {
                return (thetaR_not_offset + aDelimitation.thetaR_min)
            }

            phiR_from_phiS = function (phiS) {
                var phiR_offset_from_zero, phiR_offset_from_phiR_min;
                phiR_offset_from_zero = phiS * phi_scaler;
                phiR_offset_from_phiR_min = phiR_offset_by_phiR_min(phiR_offset_from_zero);
                return phiR_offset_from_phiR_min;
            }

            thetaR_from_thetaS = function (thetaS) {
                var thetaR_offset_from_zero, thetaR_offset_from_thetaR_min;
                thetaR_offset_from_zero = thetaS * theta_scaler;
                thetaR_offset_from_thetaR_min = thetaR_offset_by_thetaR_min(thetaR_offset_from_zero);
                return thetaR_offset_from_thetaR_min;
            }

            // get-functions Equidistant along Azimuth
            getXSEA = function (phiS, thetaS) {
                var thetaR, phiR, x;
                phiR = phiR_from_phiS(phiS);
                thetaR = thetaR_from_thetaS(thetaS);
                x = aSurface.getXR(phiR, thetaR);
                return x;
            };

            getYSEA = function (phiS, thetaS) {
                var thetaR, phiR, y;
                phiR = phiR_from_phiS(phiS);
                thetaR = thetaR_from_thetaS(thetaS);
                y = aSurface.getYR(phiR, thetaR);
                return y;
            };

            getZSEA = function (thetaS) {
                var thetaR, z;
                thetaR = thetaR_from_thetaS(thetaS);
                z = aSurface.getZR(thetaR);
                return z;
            };


            /**
             * @see getXSES_body
             */

            getXSES = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {

                //console.log("approximationPrecision: ", approximationPrecision);

                approximationPrecision = approximationPrecision ||
                                         aSegmentationSpec.conf.getXSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                                         aSegmentationSpec.conf.getXSES.maxRecursionDepth;
                debug                  = debug || aSegmentationSpec.conf.getXSES.debug;

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

                //console.log("debug in getXSES_body: ", debug);

                if(memo[phiS]) {
                    phiR_at_projDist = memo[phiS];
                    //console.log("memo hit: ", phiS);
                    //console.log("memo hit: ", memo[phiS]);
                } else {
                    projectionDistance = phiS * segment_extent_azimuth;
                    //console.log("projectionDistance: ", projectionDistance);
                    //console.log("phiS in getXSES_body: ", phiS);
                    //console.log("thetaS in getXSES_body: ", thetaS);
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
                //console.log("phir_best: ", phiR_at_projDist);
                thetaR = thetaR_from_thetaS(thetaS);
                x = aSurface.getXR(phiR_at_projDist, thetaR);
                return x;
            };


            /**
             * @see getYSES_body
             */

            getYSES = function(phiS, thetaS, approximationPrecision, maxRecursionDepth, debug) {
                approximationPrecision = approximationPrecision ||
                                         aSegmentationSpec.conf.getYSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      ||
                                         aSegmentationSpec.conf.getYSES.maxRecursionDepth;
                debug                  = debug || aSegmentationSpec.conf.getYSES.debug;

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

            getZSES = function(thetaS) {
                var thetaR, z;
                thetaR = thetaR_from_thetaS(thetaS);
                z = aSurface.getZR(thetaR);
                return z;
            };


            this.phiR_offset_by_phiR_min = phiR_offset_by_phiR_min;
            this.thetaR_offset_by_thetaR_min = thetaR_offset_by_thetaR_min;
            this.phiR_from_phiS = phiR_from_phiS;
            this.thetaR_from_thetaS = thetaR_from_thetaS;
            this.noOfSegments_along_azimuth = noOfSegments_along_azimuth;
            this.noOfSegments_along_polar = noOfSegments_along_polar;
            this.segment_extent_azimuth = segment_extent_azimuth;
            //this.segment_extent_polar = segment_extent_polar;
            this.getXSEA = getXSEA;
            this.getYSEA = getYSEA;
            this.getZSEA = getZSEA;
            this.getXSES = getXSES;
            this.getYSES = getYSES;
            this.getZSES = getZSES;

            Object.freeze(this);
        };

        Object.freeze(Segmentation);
        return Segmentation;
    }
);
