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
    [   "instances/designs/mySuperQuadric",
        "cons/designs/Surface",
        "specs/designs/mySurfaceSpec"
    ],
    function (
        mySuperQuadric,
        Surface,
        mySurfaceSpec
        ) {

        console.log("21");

        var myOuterSurface, getXgetYgetZ_rad = {};

        getXgetYgetZ_rad.getX = mySuperQuadric.getX;
        getXgetYgetZ_rad.getY = mySuperQuadric.getY;
        getXgetYgetZ_rad.getZ = mySuperQuadric.getZ;

        // create a cons/designs/Surface:
        myOuterSurface = new Surface(mySurfaceSpec, getXgetYgetZ_rad, mySuperQuadric.phiR_estimator, mySuperQuadric.radius);

        // test surfaceDistR:
//        myOuterSurface.surfaceDistR(0,0,0,           Math.PI/3,0.1,1000);
//        myOuterSurface.surfaceDistR(0,0,Math.PI/2,   Math.PI/3,0.1,1000);
//        myOuterSurface.surfaceDistR(0,0,Math.PI,     Math.PI/3,0.1,1000);
//        myOuterSurface.surfaceDistR(0,0,Math.PI*1.5, Math.PI/3,0.1,1000);


        return myOuterSurface;
    }
);