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
    [
    ],
    function (
        ) {

        //console.log("6");

        var SuperQuadric;

        SuperQuadric = function ( aSuperQuadricSpec ) {
            var aSuperQuadric;

            aSuperQuadric = (function anon( aSuperQuadricSpec ) {
                var getX, getY, getZ, phiR_estimator;

                for(var prop in aSuperQuadricSpec){
                    anon[prop] = aSuperQuadricSpec[prop];
                };

                getX = function(phi_rad, theta_rad) {
                    var x = anon.radius * anon.modulator_XY(theta_rad) * anon.curve_X(phi_rad);
                    return x;
                };

                getY = function(phi_rad, theta_rad) {
                    var y = anon.radius * anon.modulator_XY(theta_rad) * anon.curve_Y(phi_rad);
                    return y;
                };

                getZ = function(theta_rad) {
                    var z = anon.radius * anon.modulator_Z(theta_rad);
                    return z;
                };

                phiR_estimator = function(projectionDistance) {
                    return (projectionDistance / 100);
                }

                return {
                    getX: getX,
                    getY: getY,
                    getZ: getZ,
                    phiR_estimator: phiR_estimator
                };
            }(aSuperQuadricSpec));

            Object.freeze(aSuperQuadric);
            return aSuperQuadric;
        };

        Object.freeze(SuperQuadric);

        return SuperQuadric;

    }
);