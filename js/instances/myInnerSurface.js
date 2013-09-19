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

define(
    [   "instances/mySuperQuadric",
        "cons/designs/Surface",
        "specs/designs/mySurfaceSpec"
    ],
    function (
        mySuperQuadric,
        Surface,
        mySurfaceSpec
        ) {

        console.log("20,5");

        var myInnerSurface, getXgetYgetZ_rad = {};

        getXgetYgetZ_rad.getX = mySuperQuadric.getX;
        getXgetYgetZ_rad.getY = mySuperQuadric.getY;
        getXgetYgetZ_rad.getZ = mySuperQuadric.getZ;
        console.log("mySuperQuadric.getX: ", mySuperQuadric.getX)

        console.log("phiR_estimator: ", mySuperQuadric.phiR_estimator)
        // create a cons/designs/Surface:
        myInnerSurface = new Surface(mySurfaceSpec, getXgetYgetZ_rad, mySuperQuadric.phiR_estimator);

        // test surfaceDistR:
//        myInnerSurface.surfaceDistR(0,0,0,           Math.PI/3,0.1,1000);
//        myInnerSurface.surfaceDistR(0,0,Math.PI/2,   Math.PI/3,0.1,1000);
//        myInnerSurface.surfaceDistR(0,0,Math.PI,     Math.PI/3,0.1,1000);
//        myInnerSurface.surfaceDistR(0,0,Math.PI*1.5, Math.PI/3,0.1,1000);


        return myInnerSurface;
    }
);