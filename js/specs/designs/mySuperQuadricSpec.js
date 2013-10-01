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

        //console.log("29");

        var mySuperQuadricSpec;

        mySuperQuadricSpec = {
            radius: 100,
            //curve_X( 2 * PI * frequency_scaler) = fun(0)
            curve_X: function ( phi ) {
                var x;
                //x = Math.cos(phi);
                x = Math.cos(phi) + (Math.cos(phi*4) / 5);
                //x = Math.cos(phi) + (Math.cos(phi*4) / 7);
                //x = Math.cos(phi) + (Math.cos(phi*9) / 10);
                return x;
            },
            curve_Y: function ( phi ) {
                var y;
                //y = Math.sin( phi );
                y = Math.sin(phi) + (Math.sin(phi*4) / 5);
                //y = Math.sin(phi) + (Math.sin(phi*3) / 10);
                return y;
            },
            modulator_XY: function ( theta ) {
                var m_xy;
                m_xy = Math.cos( theta );
                return m_xy;
            },
            modulator_Z: function ( theta ) {
                var m_z;
                m_z = Math.sin( theta );
                return m_z;
            }
        };


        // my parametric polarWall:
        //      curve parameter/azimuth angle:   phi,   eta     (aka. inclination)
        //      modulator parameter/polar angle: theta, omega
        //      radius:                          rho

        //      X = radius * modulator_XY * curve_X
        //      Y = radius * modulator_XY * curve_Y
        //      Z = radius * modulator_Z

        //      X = radius * sin ( theta ) * cos ( phi )
        //      Y = radius * sin ( theta ) * sin ( phi )
        //      Z = radius * sin ( theta )

        //      SPHERE:
        //      modulator_XY = sin ( theta )
        //      modulator_Z = sin ( theta )
        //      curve_X = cos ( phi )
        //      curve_Y = sin ( phi )

        //      -pi / 2 <= theta <=   pi / 2
        //      0 <= phi   <= 2*pi
        //      0 <= rho

        //      '0' = theta
        //      'ø' = phi
        //      'p' = rho
        //      en.wikipedia.org/wiki/Spherical_coordinates#Cartesian_coordinates
        //      en.wikipedia.org/wiki/List_of_common_coordinate_transformations#From_spherical_coordinates

        Object.freeze(mySuperQuadricSpec);
        return mySuperQuadricSpec;
    }
);
