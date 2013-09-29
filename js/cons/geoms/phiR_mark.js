/**
 * This file is part of Rafter.
 *
 * Rafter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Rafter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with Rafter. If not, see <https://www.gnu.org/licenses/agpl.html>.
 *
 * @copyright Jon Loldrup     loldrup@gmail.com
 * @copyright Hjalte Loldrup  hjalteloldrup@gmail.com
 *
 */

"use strict";


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
    [   "libs/three.js/build/three",
        "init/makeScene"
    ],
    function (
        three,
        makeScene
        ) {
        //console.log("9");

        // X = length, Y = height, Z = depth,
        THREE.phiR_mark_geometry = function (phiR, getXR, getYR, getZR) {
            var material,
                endPointX,
                endPointY,
                endPointZ,
                geometry,
                line;

            material = new THREE.LineBasicMaterial({ color: 0xffffff });
            endPointX = getXR(phiR, 0);
            endPointY = getYR(phiR, 0);
            endPointZ = getZR(0);
            // giving 0 as the theta value is quite a hack. It really should have been fetched from myDelimitation

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
            geometry.vertices.push(new THREE.Vector3(endPointX, endPointY, endPointZ));
            line = new THREE.Line(geometry, material);
            makeScene.scene.add(line);
        };

        THREE.phiR_mark_geometry.prototype = Object.create( THREE.Geometry.prototype );

        Object.freeze(THREE.phiR_mark_geometry);
    }
);
