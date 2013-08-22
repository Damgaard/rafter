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
        'cons/designs/SuperQuadric',
        'cons/designs/Surface',
        "specs/mySurfaceSpec"

    ],
    function(
        SuperQuadric,
        Surface,
        mySurfaceSpec
        ) {

        var runA, runB;

        runA = function() {

            var superQuadricSpec, superQuadric, surface, getXgetYgetZ_rad = {};

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

            getXgetYgetZ_rad.getX = superQuadric.getX;
            getXgetYgetZ_rad.getY = superQuadric.getY;
            getXgetYgetZ_rad.getZ = superQuadric.getZ;

            surface = new Surface(mySurfaceSpec, getXgetYgetZ_rad, superQuadric.phiR_estimator);


            test('linearDistR(phiR_start, phiR_end, thetaR_start, thetaR_end) should return the straight distance between two points on the surface. In this case a spherical surface with radius 100 in a polar coordinate system', function() {
                equal(surface.linearDistR(0,0,0,0), 0, 'X should be 0.');
                equal(surface.linearDistR(Math.PI/2 ,0, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, Math.PI/2, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, 0, Math.PI/2, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, 0, 0, Math.PI/2), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(-Math.PI/2 ,0, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, -Math.PI/2, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, 0, -Math.PI/2, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, 0, 0, -Math.PI/2), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(Math.PI/2, Math.PI/2, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, Math.PI/2, Math.PI/2, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(-Math.PI/2, -Math.PI/2, 0, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, -Math.PI/2, -Math.PI/2, 0), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2), 0, 'X should be 0.');
                equal(surface.linearDistR(-Math.PI/2, -Math.PI/2, -Math.PI/2, -Math.PI/2), 0, 'X should be 0.');
                equal(surface.linearDistR(Math.PI/2, Math.PI/4, -Math.PI/2, Math.PI/2), 76.53668647301795, 'X should be 76.53668647301795.');
                equal(surface.linearDistR(-Math.PI/2, -Math.PI/4, -Math.PI/2, -Math.PI/2), 76.53668647301795, 'X should be 76.53668647301795.');
                equal(surface.linearDistR(Math.PI/2, Math.PI/4, Math.PI/4, Math.PI/4), 54.1196100146197, 'X should be 54.1196100146197.');
                equal(surface.linearDistR(0, 0, Math.PI/2, Math.PI/4), 141.4213562373095, 'X should be 141.4213562373095.');
                equal(surface.linearDistR(0, 0, Math.PI, 0), 200, 'X should be 200.');
            });


            test('surfaceDistR_along_azimuth(phiR_start, thetaR_start, phiR_end, approximationPrecision, maxRecursionDepth) should return an approximation of the distance along azimuth between two points. Direction is determined by (point_end - point_start)', function() {
                equal(surface.surfaceDistR_along_azimuth(0,0,Math.PI,       1,1000), 312.1445152258052, 'X should be ~Pi*100 (314.159265359).');
                equal(surface.surfaceDistR_along_azimuth(0,0,Math.PI*2,     1,1000), 624.2890304516104, 'X should be ~Pi*2*100 (628.318530718).');
                // DOESN'T WORK AS EXPECTED: equal(surface.surfaceDistR_along_azimuth(0,0,24.545829796022296, 1,1000), 42, 'X should be ~?.');
                equal(surface.surfaceDistR_along_azimuth(0,0,0,             1,1000), 0, 'X should be 0.');
                equal(surface.surfaceDistR_along_azimuth(0,0,-Math.PI/2,    1,1000), 156.0722576129026, 'X should be ~Pi/2*100 (157.079632679).');
                equal(surface.surfaceDistR_along_azimuth(0,0,-Math.PI*1.5,  1,1000), 464.45548360713974, 'X should be ~Pi*1.5*100 (471.238898038).');
                equal(surface.surfaceDistR_along_azimuth(0,0,-Math.PI*1.5,  1,1000), 464.45548360713974, 'X should be ~Pi*1.5*100 (471.238898038).');
                // DOESN'T WORK AS EXPECTED: equal(surface.surfaceDistR_along_azimuth(0,0,-Math.PI*1.5), 464.45548360713974, 'X should be ~Pi*1.5*100 (471.238898038).');
            });

              test('surfaceDistR_along_polar(phiR_start, thetaR_start, thetaR_end, approximationPrecision, maxRecursionDepth) should return an approximation of the distance along polar, between two points. Direction is determined by (point_end - point_start)', function() {
                equal(surface.surfaceDistR_along_polar(0,0,Math.PI, 1,1000), 312.1445152258052,
                    'X should be ~Pi*100 (314.159265359).');
                equal(surface.surfaceDistR_along_polar(0,0,Math.PI*2,     1,1000), 624.2890304516104,
                    'X should be ~Pi*2*100 (628.318530718).');
                equal(surface.surfaceDistR_along_polar(0,0,0,             1,1000), 0, 'X should be 0.');
                equal(surface.surfaceDistR_along_polar(0,0,-Math.PI/2,    1,1000), 156.0722576129026,
                    'X should be ~Pi/2*100 (157.079632679).');
                equal(surface.surfaceDistR_along_polar(0,0,-Math.PI*1.5,  1,1000), 464.45548360713974, 'X should be ~Pi*1.5*100 (471.238898038).');
            });

            test('horizontalSurfaceProjection(phiR_start, thetaR_start, phiR_end, projectionDistance, approximationPrecision, maxRecursionDepth) should get the delta phiR between phiR_start and the phiR achieved by walking `distance` from (phiR_start, theta) along the surface at constant azimuth', function() {
                equal(surface.horizontalSurfaceProjection(0, 0, 0, 1, 1000), 0,
                      'X should be ~0.');
                equal(surface.horizontalSurfaceProjection(0,0,Math.PI*50, 1, 1000), 1.5758657128552445,
                      'X should be ~Pi/2 (1.57079632679).');
                equal(surface.horizontalSurfaceProjection(0,0,Math.PI*100, 1, 1000), 3.156866656323774,
                      'X should be ~Pi (3.14159265359).');
                equal(surface.horizontalSurfaceProjection(0,0,Math.PI*200, 1, 1000), 6.318935407868947,
                      'X should be ~Pi*2 (6.28318530718).');
                // DOESN'T WORK AS EXPECTED:
                // equal(surface.horizontalSurfaceProjection(0,0,Math.PI*500, 10, 3), 42, 'X should be ~?.');
                // equal(surface.horizontalSurfaceProjection(0,0,-Math.PI/2,    1, 4), 42, 'X should be ~?).');
                // equal(surface.horizontalSurfaceProjection(0,0,-Math.PI*1.5,  1, 4), 42, 'X should be ~?).');
            });

//            test('horizontalSurfaceProjection(phiR_start, thetaR_start, phiR_end, projectionDistance, approximationPrecision, maxRecursionDepth, phiR_correction) should get the position achieved by walking `distance` from (phi_start,theta_start) along the surface at constant azimuth', function() {
//                equal(surface.horizontalSurfaceProjection(0,0,Math.PI,       0.01,1000), 314.0331156954753, 'X should be ~Pi*100 (314.159265359).');
//            });

        };


        runB = function() {

            var superQuadricSpec, superQuadric, surface, getXgetYgetZ_rad = {};

            superQuadricSpec = {
                radius: 100,
                //curve_X( 2 * PI * frequency_scaler) = fun(0)
                curve_X: function ( phi ) {
                    var x;
                    x = Math.cos(phi) + (Math.cos(phi*4) / 5);
                    return x;
                },
                curve_Y: function ( phi ) {
                    var y;
                    y = Math.sin(phi) + (Math.sin(phi*4) / 5);
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

            getXgetYgetZ_rad.getX = superQuadric.getX;
            getXgetYgetZ_rad.getY = superQuadric.getY;
            getXgetYgetZ_rad.getZ = superQuadric.getZ;

            surface = new Surface(mySurfaceSpec, getXgetYgetZ_rad, superQuadric.phiR_estimator);

//            test('horizontalSurfaceProjection(phiR_start, thetaR_start, projectionDistance, approximationPrecision, maxRecursionDepth) should get the delta phiR between phiR_start and the phiR achieved by walking `distance` from (phiR_start, theta) along the surface at constant azimuth', function() {
//                equal(surface.horizontalSurfaceProjection(0,0,Math.PI*100,       1,1000), 340.7640568721204, 'X should be ~Pi*100 (314.159265359).');
//                equal(surface.horizontalSurfaceProjection(0,0,Math.PI*200,     1,1000), 681.5281137442408, 'X should be ~Pi*2*100 (628.318530718).');
//                equal(surface.horizontalSurfaceProjection(0,0,-Math.PI*50,    1,1000), 168.72968020305188, 'X should be ~Pi/2*100 (157.079632679).');
//                equal(surface.horizontalSurfaceProjection(0,0,-Math.PI*150,  1,1000), 502.5327608098721, 'X should be ~Pi*1.5*100 (471.238898038).');
//            });
        };

        return {runA: runA,
                runB: runB}
    }
);