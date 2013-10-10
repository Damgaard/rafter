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


// technically, this file really ought to be named myEquiSurfaceDistSURFACEGeometrySpec...


define(
    [
    ],
    function (
        ) {

        //console.log("30");

        var myEquiSurfaceDist_SurfaceGeometrySpec;

        myEquiSurfaceDist_SurfaceGeometrySpec = {
            conf: {
                getX: {
                    approximationPrecision: 0.05,
                    maxRecursionDepth: 6
                },
                getY: {
                    approximationPrecision: 0.05,
                    maxRecursionDepth: 6
                }
            }
        };

        Object.freeze(myEquiSurfaceDist_SurfaceGeometrySpec);

        return myEquiSurfaceDist_SurfaceGeometrySpec;
    }
);