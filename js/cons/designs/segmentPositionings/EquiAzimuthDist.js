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

        var EquiAzimuthDist_segmentPositioning;

        EquiAzimuthDist_segmentPositioning = function ( phiR_from_phiS, thetaR_from_thetaS, aSurface ) {
            var getXSEA, getYSEA, getZSEA;


            /**
             * get-function Equidistant along Azimuth.
             * The meaning of 'Equidistant along Azimuth' is different from
             * 'EquiAngular'. However the former implies the latter when the
             * polar shape is a sphere. All other polar shapes
             * distorts the positions in the euclidian space.
             */
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

            this.getXSEA = getXSEA;
            this.getYSEA = getYSEA;
            this.getZSEA = getZSEA;

            Object.freeze(this);
        };

        Object.freeze(EquiAzimuthDist_segmentPositioning);
        return EquiAzimuthDist_segmentPositioning;
    }
);
