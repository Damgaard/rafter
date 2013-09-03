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

        var myWinDoorSpec;

        myWinDoorSpec = {
            no_of_winDoors: 3,
            winDoor_extent_along_azimuth_in_centimeters: [100, 150, 200],
            winDoor_extent_along_polar_in_centimeters: [125, 175, 225],
            winDoor_polar_posStart_in_centimeters: [75, 75, 0],
            winDoor_azimuth_posCenter_in_radians: [Math.PI*0.5, Math.PI, Math.PI*1.5]
        };

        Object.freeze(myWinDoorSpec);
        return myWinDoorSpec;
    }
);