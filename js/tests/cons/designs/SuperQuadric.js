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
        'cons/designs/SuperQuadric'
    ],
    function(
        SuperQuadric
        ) {

        var run = function() {

            var superQuadricSpec, superQuadric;

            superQuadricSpec = {
                radius: 100,
                //curve_X( 2 * PI * frequency_scaler) = fun(0)
                curve_X: function ( phi ) {
                    var x;
                    x = Math.cos(phi);
                    //x = Math.cos(phi) + (Math.cos(phi*4) / 7);
                    //x = Math.cos(phi) + (Math.cos(phi*9) / 10);
                    return x;
                },
                curve_Y: function ( phi ) {
                    var y;
                    y = Math.sin( phi );
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

            superQuadric = new SuperQuadric(superQuadricSpec);

            test('superQuadric.getX(phi_rad, theta_rad) should convert from (phi_radian,theta_radian) to the X-value of a 3D cartesian coordinate set', function() {
                equal(superQuadric.getX(0,0), 100, 'X should be 100.');
                equal(superQuadric.getX(Math.PI,0), -100, 'X should be -100.');
                equal(superQuadric.getX(Math.PI/2,0), 6.123233995736766e-15, 'X should be ~0.');
                equal(superQuadric.getX(Math.PI/2-(5*Math.PI*2),0), -2.939771298590236e-13, 'X should be ~0.');
                equal(superQuadric.getX(0, Math.PI), -100, 'X should be -100.');
                equal(superQuadric.getX(0, Math.PI/2), 6.123233995736766e-15, 'X should be ~0.');
                equal(superQuadric.getX(0, Math.PI/2-(5*Math.PI*2)), -2.939771298590236e-13, 'X should be ~0.');
                equal(superQuadric.getX(Math.PI, Math.PI/4), -70.71067811865476, 'X should be -70.71067811865476.');
                equal(superQuadric.getX(Math.PI/2, Math.PI/4), 4.329780281177466e-15, 'X should be ~0.');
                equal(superQuadric.getX(Math.PI/2-(5*Math.PI*2), Math.PI*3/4-(5*Math.PI*2)), 2.078732220370739e-13, 'X should be ~0.');
            });

            test('superQuadric.getY(phi_rad, theta_rad) should convert from (phi_radian,theta_radian) to the Y-value of a 3D cartesian coordinate set', function() {
                equal(superQuadric.getY(0,0), 0, 'Y should be 0.');
                equal(superQuadric.getY(Math.PI,0), 1.2246467991473532e-14, 'Y should be ~0.');
                equal(superQuadric.getY(Math.PI/2,0), 100, 'Y should be 100.');
                equal(superQuadric.getY(Math.PI/2-(5*Math.PI*2),0), 100, 'Y should be 100.');
                equal(superQuadric.getY(0, Math.PI), 0, 'Y should be 0.');
                equal(superQuadric.getY(0, Math.PI/2), 0, 'Y should be 0.');
                equal(superQuadric.getY(0, Math.PI/2-(5*Math.PI*2)), 0, 'Y should be 0.');
                equal(superQuadric.getY(Math.PI, Math.PI/4), 8.659560562354933e-15, 'Y should be ~0.');
                equal(superQuadric.getY(Math.PI/2, Math.PI/4), 70.71067811865476, 'Y should be 70.71067811865476.');
                equal(superQuadric.getY(Math.PI/2-(5*Math.PI*2), Math.PI/1.9-(5*Math.PI*2)), -8.25793454723346, 'Y should be -8.25793454723346.');
            });

            test('superQuadric.getZ(theta_rad) should convert from (theta_radian) to the Z-value of a 3D cartesian coordinate set', function() {
                equal(superQuadric.getZ(0), 0, 'Z should be 0.');
                equal(superQuadric.getZ(Math.PI), 1.2246467991473532e-14, 'Z should be ~0.');
                equal(superQuadric.getZ(Math.PI/2), 100, 'Z should be 100.');
                equal(superQuadric.getZ(Math.PI/4), 70.71067811865474, 'Z should be 70.71067811865474.');
                equal(superQuadric.getZ(Math.PI/2-(5*Math.PI*2)), 100, 'Z should be 100.');
                equal(superQuadric.getZ(-Math.PI), -1.2246467991473532e-14, 'Z should be ~0.');
                equal(superQuadric.getZ(-Math.PI/2), -100, 'Z should be -100.');
                equal(superQuadric.getZ(-Math.PI/4), -70.71067811865474, 'Z should be -70.71067811865474.');
                equal(superQuadric.getZ(Math.PI/1.8-(5*Math.PI*2)), 98.48077530122076, 'Z should be 98.48077530122076.');
            });
        };
        return {run: run}
    }
);