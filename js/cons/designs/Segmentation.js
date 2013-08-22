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
    [   //"libs/three.js/build/three"
        //"init/makeScene"
    ],
    function (
        //three
        //makeScene
        ) {
        //console.log("5");

        var Segmentation;

        Segmentation = function ( aSegmentationSpec, aDelimitation, aSurface ) {
            var spec,
                max_surface_extent_along_azimuth,
                max_surface_extent_along_polar,
                noOfSegments_along_azimuth,
                noOfSegments_along_polar,
                segment_extent_azimuth, segment_extent_polar,
                phi_scaler, theta_scaler,
                phiR_offset_by_phiR_min,
                thetaR_offset_by_thetaR_min,
                thetaR_from_thetaS,
                phiR_from_phiS,
                getXSEA, getYSEA, getZSEA,
                memo = {},
                getXSES, getYSES, getZSES,
                getXSES_body, getYSES_body,
                linearDistS;

            spec = {};

            for (var prop in aSegmentationSpec) {
                if (aSegmentationSpec.hasOwnProperty(prop)) {
                    spec[prop] = aSegmentationSpec[prop];
                }
            }

            max_surface_extent_along_azimuth =
                aSurface.surfaceDistR_along_azimuth(aDelimitation.phiR_min,
                    aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                    aDelimitation.phiR_max,
                    0.0002, 800);
            max_surface_extent_along_polar =
                aSurface.surfaceDistR_along_polar(aDelimitation.thetaR_at_max_surface_extent_along_polar,
                    aDelimitation.thetaR_min,
                    aDelimitation.thetaR_max,
                    0.0002, 800);
            //console.log("max_surface_extent_along_azimuth: ", max_surface_extent_along_azimuth);
            //console.log("spec.max_outer_segmentExtent_along_azimuth: ", spec.max_outer_segmentExtent_along_azimuth);

            noOfSegments_along_azimuth =
                Math.ceil(max_surface_extent_along_azimuth /
                    spec.max_outer_segmentExtent_along_azimuth);
            noOfSegments_along_polar =
                Math.ceil(max_surface_extent_along_polar /
                    spec.max_outer_segmentExtent_along_polar);

            console.log("noOfSegments_along_polar: ", noOfSegments_along_polar);
            console.log("noOfSegments_along_azimuth: ", noOfSegments_along_azimuth);

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

            // get-functions equidistant along azimuth
            getXSEA = function (phiS, thetaS) {
                var thetaR, phiR, x;
                phiR = phiR_from_phiS(phiS);
                thetaR = thetaR_from_thetaS(thetaS);
                x = aSurface.getX(phiR, thetaR);
                return x;
            };

            getYSEA = function (phiS, thetaS) {
                var thetaR, phiR, y;
                phiR = phiR_from_phiS(phiS);
                thetaR = thetaR_from_thetaS(thetaS);
                y = aSurface.getY(phiR, thetaR);
                return y;
            };

            getZSEA = function (thetaS) {
                var thetaR, z;
                thetaR = thetaR_from_thetaS(thetaS);
                z = aSurface.getZ(thetaR);
                return z;
            };

            // getZ from Segment Equidistant along Surface
            // horizontalSurfaceProjectionHelper (phiR_start, thetaR_start,
            // best_phiR_end, projectionDistance,
            // approximationPrecision, maxRecursionDepth)
            getXSES = function(phiS, thetaS, approximationPrecision, maxRecursionDepth) {
                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.getXSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.getXSES.maxRecursionDepth;

                return getXSES_body(phiS, thetaS, approximationPrecision, maxRecursionDepth);
            };

            getXSES_body = function(phiS, thetaS, approximationPrecision, maxRecursionDepth) {
                var phiR_best, projectionDistance, thetaR, x;
                if(memo[phiS]) {
                    phiR_best = memo[phiS];
                } else {
                    projectionDistance = phiS * segment_extent_azimuth;
                    phiR_best = aSurface.horizontalSurfaceProjection(
                        aDelimitation.phiR_min,
                        aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                        projectionDistance,
                        approximationPrecision,
                        maxRecursionDepth);
                    memo[phiS] = phiR_best;
                }
                //console.log("phir_best: ", phiR_best);
                thetaR = thetaR_from_thetaS(thetaS);
                x = aSurface.getX(phiR_best, thetaR);
                return x;
            };

            // getY from Segment, Equidistant along Surface
            getYSES = function(phiS, thetaS, approximationPrecision, maxRecursionDepth) {
                approximationPrecision = approximationPrecision || aSurfaceSpec.conf.getYSES.approximationPrecision;
                maxRecursionDepth      = maxRecursionDepth      || aSurfaceSpec.conf.getYSES.maxRecursionDepth;

                return getYSES_body(phiS, thetaS, approximationPrecision, maxRecursionDepth);
            };

            getYSES_body = function(phiS, thetaS, approximationPrecision, maxRecursionDepth) {
                var phiR_best, projectionDistance, thetaR, y;
                if(memo[phiS]) {
                    phiR_best = memo[phiS];
                } else {
                    projectionDistance = phiS * segment_extent_azimuth;
                    phiR_best = aSurface.horizontalSurfaceProjection(
                        aDelimitation.phiR_min,
                        aDelimitation.thetaR_at_max_surface_extent_along_azimuth,
                        projectionDistance,
                        approximationPrecision,
                        maxRecursionDepth);
                    memo[phiS] = phiR_best;
                }
                //console.log("phir_best: ", phiR_best);
                thetaR = thetaR_from_thetaS(thetaS);
                y = aSurface.getY(phiR_best, thetaR);
                return y;
            };

            // getZ from Segment, Equidistant along Surface
            getZSES = function(thetaS) {
                var thetaR, z;
                thetaR = thetaR_from_thetaS(thetaS);
                z = aSurface.getZ(thetaR);
                return z;
            };


            this.phiR_offset_by_phiR_min = phiR_offset_by_phiR_min;
            this.thetaR_offset_by_thetaR_min = thetaR_offset_by_thetaR_min;
            this.phiR_from_phiS = phiR_from_phiS;
            this.thetaR_from_thetaS = thetaR_from_thetaS;
            this.noOfSegments_along_azimuth = noOfSegments_along_azimuth;
            this.noOfSegments_along_polar = noOfSegments_along_polar;
            this.segment_extent_azimuth = segment_extent_azimuth;
            this.segment_extent_polar = segment_extent_polar;
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
