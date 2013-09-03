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
    [
    ],
    function (
        ) {

//console.log("1");

        var Delimitation;

        Delimitation = function (aDelimitationSpec) {
            var spec, phiR_int, thetaR_int;

            spec = {};

            for (var prop in aDelimitationSpec) {
                if (aDelimitationSpec.hasOwnProperty(prop)) {
                    spec[prop] = aDelimitationSpec[prop];
                }
            }

            phiR_int   = spec.phiR_max   - spec.phiR_min;
            thetaR_int = spec.thetaR_max - spec.thetaR_min;

            this.thetaR_int = thetaR_int;
            this.phiR_int = phiR_int;
            this.thetaR_min = spec.thetaR_min;
            this.phiR_min = spec.phiR_min;
            this.thetaR_max = spec.thetaR_max;
            this.phiR_max = spec.phiR_max;
            this.thetaR_at_max_surface_extent_along_polar = spec.thetaR_at_max_surface_extent_along_polar;
            this.thetaR_at_max_surface_extent_along_azimuth = spec.thetaR_at_max_surface_extent_along_azimuth;

            Object.freeze(this);
        };

        Object.freeze(Delimitation);
        return Delimitation;

    }
);