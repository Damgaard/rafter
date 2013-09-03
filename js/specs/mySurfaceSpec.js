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

        //console.log("30");

        var mySurfaceSpec;

        mySurfaceSpec = {
            conf: {
                surfaceDistR: {
                    approximationPrecision: 0.1,
                    maxRecursionDepth: 1000
                },
                surfaceDistR_along_azimuth: {
                    approximationPrecision: 0.1,
                    maxRecursionDepth: 1000
                },
                surfaceDistR_along_polar: {
                    approximationPrecision: 0.1,
                    maxRecursionDepth: 1000
                },
                horizontalSurfaceProjection: {
                    approximationPrecision: 0.1,
                    maxRecursionDepth: 1000
                },
                verticalSurfaceProjection: {
                    approximationPrecision: 0.1,
                    maxRecursionDepth: 1000
                }
            }
        };

        Object.freeze(mySurfaceSpec);

        return mySurfaceSpec;
    }
);