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


//This constructor is not in use anywhere yet


define(
    [ "libs/three.js/build/three"],
    function (
        three
        ) {
        //console.log("999");

        var WinDoorSet;

        WinDoorSet = function ( aWinDoorSetSpec, aSurface, aDelimitation ) {
            var winDoorNo,
                thetaR_X_minus_ephsilon,
                thetaR_X_plus_ephsilon,
                thetaR_Y_minus_ephsilon,
                thetaR_Y_plus_ephsilon,
                thetaR_Z_minus_ephsilon,
                thetaR_Z_plus_ephsilon,
                deltaThetaR_X,
                deltaThetaR_Y,
                deltaThetaR_Z,
                thetaR_tangentV,
                winDoor_polar_posStart_in_radians,
                halfWidthCM,
                halfWidthR;

            for ( winDoorNo = 0; winDoorNo < aWinDoorSetSpec.no_of_winDoors; winDoorNo ++ ) {
                console.log("winDoorNo: ", winDoorNo);

                // Find 8 corners:
                // Find azimuth values in radians
                // Outer corners:

                // Upper left corner:

                thetaR_X_minus_ephsilon = aSurface.getXREA(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] - 0.0001
                );
                thetaR_X_plus_ephsilon = aSurface.getXREA(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] + 0.0001
                );
                thetaR_Y_minus_ephsilon = aSurface.getYREA(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] - 0.0001
                );
                thetaR_Y_plus_ephsilon = aSurface.getYREA(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] + 0.0001
                );
                thetaR_Z_minus_ephsilon = aSurface.getZREA(
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] - 0.0001
                );
                thetaR_Z_plus_ephsilon = aSurface.getZREA(
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo] + 0.0001
                );

                deltaThetaR_X = thetaR_X_plus_ephsilon - thetaR_X_minus_ephsilon;
                deltaThetaR_Y = thetaR_Y_plus_ephsilon - thetaR_Y_minus_ephsilon;
                deltaThetaR_Z = thetaR_Z_plus_ephsilon - thetaR_Z_minus_ephsilon;

                thetaR_tangentV = new THREE.Vector3(deltaThetaR_X, deltaThetaR_Y, deltaThetaR_Z).normalize();
                console.log("thetaR_tangentV: ", thetaR_tangentV);


                // horizontalSurfaceProjection (phiR_start, thetaR_start, projectionDistance, approximationPrecision, maxRecursionDepth)
                winDoor_polar_posStart_in_radians = aSurface.verticalSurfaceProjection(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aDelimitation.thetaR_min,
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo]);
                console.log("winDoor_polar_posStart_in_radians: ", winDoor_polar_posStart_in_radians);

                halfWidthCM = aWinDoorSetSpec.winDoor_extent_along_azimuth_in_centimeters[winDoorNo] / 2;
                console.log("halfWidthCM: ", halfWidthCM);


                halfWidthR  = aSurface.horizontalSurfaceProjection(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    winDoor_polar_posStart_in_radians,
                    halfWidthCM);
                console.log("halfWidthR: ", halfWidthR);

                // Inner corners:

                // Find polar values in radians
                // Outer corners:

                // Inner corners:

                // Put values in two arrays:

                // Instantiate WinDoor object:
            }

            //THIS CONSTRUCTOR REALLY SHOULD RETURN SOMETHING

            Object.freeze(this);
        };

        Object.freeze(WinDoorSet);
        return WinDoorSet;

    }
);