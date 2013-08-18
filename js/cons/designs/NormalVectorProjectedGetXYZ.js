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


//This constructor is not in use anywhere yet


define(
    [
    ],
    function (
        ) {

        //console.log("2");

        var NormalVectorProjectedGetXYZ;

        NormalVectorProjectedGetXYZ = function (getXgetYgetZ) {

            var getX, getY, getZ, tangentVectorPhiR, tangentVectorThetaR, delta_phiR_X;

            getX = mySuperQuadric.getX;
            getY = mySuperQuadric.getY;
            getZ = mySuperQuadric.getZ;

            getX = function(phiR, thetaR) {
                if(memo[phiR][thetaR]) {
                    return memo[phiR][thetaR][X]
                } else {
                    delta_phiR_X = getXREA(phiR + epsilon)
                }
            }

            //deltaPhiR_X = getX()
            tangentVectorPhiR = 42;

            //THIS CONSTRUCTOR REALLY SHOULD RETURN SOMETHING

            Object.freeze(this);
        };

        Object.freeze(NormalVectorProjectedGetXYZ);
        return NormalVectorProjectedGetXYZ;

    }
);