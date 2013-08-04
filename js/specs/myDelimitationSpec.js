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

        //console.log("25");

        var myDelimitationSpec;

        myDelimitationSpec = {
            thetaR_min: 0, //-Math.PI,
            thetaR_max: Math.PI/2,
            phiR_min:   0,//-Math.PI,
            phiR_max:   2*Math.PI,
            thetaR_at_max_surface_extent_along_polar: 0,
            thetaR_at_max_surface_extent_along_azimuth: 0
        };

        Object.freeze(myDelimitationSpec);
        return myDelimitationSpec;
    }
);