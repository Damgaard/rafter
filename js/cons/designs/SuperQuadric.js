/**
 * This file is part of Rafter.
 *
 * Rafter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Rafter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with Rafter. If not, see <https://www.gnu.org/licenses/agpl.html>.
 *
 * @copyright Jon Loldrup     loldrup@gmail.com
 * @copyright Hjalte Loldrup  hjalteloldrup@gmail.com
 *
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
            var spec, getX, getY, getZ, phiR_estimator;

            spec = {};
            
            for(var prop in aSuperQuadricSpec){
                spec[prop] = aSuperQuadricSpec[prop];
            };

            getX = function(phi_rad, theta_rad) {
                var x = spec.radius * spec.modulator_XY(theta_rad) * spec.curve_X(phi_rad);
                return x;
            };

            getY = function(phi_rad, theta_rad) {
                var y = spec.radius * spec.modulator_XY(theta_rad) * spec.curve_Y(phi_rad);
                return y;
            };

            getZ = function(theta_rad) {
                var z = spec.radius * spec.modulator_Z(theta_rad);
                return z;
            };

            phiR_estimator = function(surfaceDistance) {
                return (surfaceDistance / aSuperQuadricSpec.radius);
            }

            this.getX = getX;
            this.getY = getY;
            this.getZ = getZ;
            this.phiR_estimator = phiR_estimator;
            this.radius = aSuperQuadricSpec.radius;

            Object.freeze(this);
        };

        Object.freeze(SuperQuadric);

        return SuperQuadric;

    }
);