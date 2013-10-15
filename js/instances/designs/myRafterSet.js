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
    [   "instances/designs/myOuterSurface",
        "instances/designs/myEquiSurfaceDist_Segmentation",
        "cons/designs/RafterSet",
        "specs/designs/myRafterSetSpec"
    ],
    function (
        myOuterSurface,
        myEquiSurfaceDist_Segmentation,
        RafterSet,
        myRafterSetSpec
        ) {

        //console.log("22");

        var myRafterSet;

        myRafterSet = new RafterSet(myRafterSetSpec, myEquiSurfaceDist_Segmentation, myOuterSurface);

        return myRafterSet;
    }
);

//             arafterSet = (function anon(aRafterSetSpec, aSegmentation, asurface) {
