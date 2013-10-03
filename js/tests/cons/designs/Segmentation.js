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
        'cons/designs/SuperQuadric',
        'cons/designs/Surface',
        'cons/designs/Delimitation',
        'cons/designs/Segmentation',
        "specs/designs/mySurfaceSpec"
    ],
    function(
        SuperQuadric,
        Surface,
        Delimitation,
        Segmentation,
        mySurfaceSpec
        ) {

        var runA, runB;

        runA = function() {

            var superQuadricSpec, superQuadric, surface, delimitationSpec, delimitation, geometrywiseSegmentationSpec, segmentation, getXgetYgetZ_rad = {};

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

            delimitationSpec = {
                thetaR_min: -Math.PI/2,
                thetaR_max: 0,
                phiR_min:   -Math.PI,
                phiR_max:   Math.PI,
                thetaR_at_max_surface_extent_along_polar: 0,
                thetaR_at_max_surface_extent_along_azimuth: 0
            };

            delimitation = new Delimitation(delimitationSpec);

            geometrywiseSegmentationSpec = {
                max_outer_segmentExtent_along_polar: 20,
                max_outer_segmentExtent_along_azimuth: 20
            };

            segmentation = new Segmentation(geometrywiseSegmentationSpec, delimitation, surface);



            test('phiR_offset_by_phiR_min(phiR_not_offset) should ...', function() {
                equal(segmentation.phiR_offset_by_phiR_min(-Math.PI), -6.283185307179586, 'phiR offset by phiR_min should be -Pi*2 (-6.28318530718).');
                equal(segmentation.phiR_offset_by_phiR_min(0       ), -3.141592653589793, 'phiR offset by phiR_min should be -Pi   (-3.14159265359).');
                equal(segmentation.phiR_offset_by_phiR_min(Math.PI ), 0, 'phiR offset by phiR_min should be 0.');
            });

            test('thetaR_offset_by_thetaR_min(thetaR_not_offset) should ...', function() {
                equal(segmentation.thetaR_offset_by_thetaR_min(-Math.PI), -4.71238898038469,   'thetaR offset by thetaR_min should be -Pi/4*3 (-4.71238898038469).');
                equal(segmentation.thetaR_offset_by_thetaR_min(0       ), -1.5707963267948966, 'thetaR offset by thetaR_min should be -Pi/2 (-1.5707963267948966).');
                equal(segmentation.thetaR_offset_by_thetaR_min(Math.PI ),  1.5707963267948966, 'thetaR offset by thetaR_min should be  Pi/2 (1.5707963267948966).' );
            });
        };


        runB = function() {

            var superQuadricSpec, superQuadric, surface, delimitationSpec, delimitation, geometrywiseSegmentationSpec, segmentation, getXgetYgetZ_rad = {};

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

            delimitationSpec = {
                thetaR_min: 0,
                thetaR_max: Math.PI/2,
                phiR_min:   -Math.PI,
                phiR_max:   Math.PI,
                thetaR_at_max_surface_extent_along_polar: 0,
                thetaR_at_max_surface_extent_along_azimuth: 0
            };

            delimitation = new Delimitation(delimitationSpec);

            geometrywiseSegmentationSpec = {
                max_outer_segmentExtent_along_polar: 20,
                max_outer_segmentExtent_along_azimuth: 20
            };

            segmentation = new Segmentation(geometrywiseSegmentationSpec, delimitation, surface);


            test('phiR_from_phiS(phiS) should ...', function() {
                equal(segmentation.phiR_from_phiS(0 ), -3.141592653589793, 'X should be -Pi.');
                equal(segmentation.phiR_from_phiS(16),  0,                 'X should be   0.');
                equal(segmentation.phiR_from_phiS(32),  3.141592653589793, 'X should be  Pi.');
            });

            test('thetaR_from_thetaS(thetaS) should ...', function() {
                equal(segmentation.thetaR_from_thetaS(0 ), 0, 'X should be    0.');
                equal(segmentation.thetaR_from_thetaS(4 ), 0.7853981633974483, 'X should be Pi/4.');
                equal(segmentation.thetaR_from_thetaS(8), 1.5707963267948966, 'X should be Pi/2.');
            });

            test('getXSEA(phiS, thetaS) should ...', function() {
                equal(segmentation.getXSEA(0,0), -100, 'X should be -100.');
                equal(segmentation.getXSEA(16,0), 100, 'X should be 100.');
                equal(segmentation.getXSEA(16/2,0), 6.123233995736766e-15, 'X should be ~0.');
                equal(segmentation.getXSEA(16/2-(5*32),0), -4.9047770029552964e-14, 'X should be ~0.');
                equal(segmentation.getXSEA(0, 16), 100, 'X should be 100.');
                equal(segmentation.getXSEA(0, 16/2), -6.123233995736766e-15, 'X should be ~0.');
                equal(segmentation.getXSEA(0, 16/2-(5*32)), 2.939771298590236e-13, 'X should be ~0.');
                equal(segmentation.getXSEA(16, 16/4), 70.71067811865476, 'X should be 70.71067811865476.');
                equal(segmentation.getXSEA(16/2, 16/4), 4.329780281177466e-15, 'X should be ~0.');
                equal(segmentation.getXSEA(16/2-(5*32), 16*3/4-(5*32)), 3.468201078997522e-14, 'X should be ~0.');
            });

            test('getYSEA(phiS, thetaS) should ...', function() {
                equal(segmentation.getYSEA(0,0), -1.2246467991473532e-14, 'Y should be ~0.');
                equal(segmentation.getYSEA(16,0), 0, 'Y should be 0.');
                equal(segmentation.getYSEA(16/2,0), -100, 'Y should be -100.');
                equal(segmentation.getYSEA(16/2-(5*32),0), -100, 'Y should be -100.');
                equal(segmentation.getYSEA(16/2, 16), 100, 'Y should be 100.');
                equal(segmentation.getYSEA(16/2, 16/2), -6.123233995736766e-15, 'Y should be ~0.');
                equal(segmentation.getYSEA(16/2, 16/2-(5*32)), 2.939771298590236e-13, 'Y should be ~0.');
                equal(segmentation.getYSEA(16/2, 16/4), -70.71067811865476, 'Y should be -70.71067811865476.');
                equal(segmentation.getYSEA(0,    16/4), -8.659560562354933e-15, 'Y should be ~0.');
                equal(segmentation.getYSEA(16/2-(5*32), 16*3/4-(5*32)), 70.71067811865477, 'Y should be 70.71067811865477.');
            });

            test('getZSEA(thetaS) should ...', function() {
                equal(segmentation.getZSEA(0), 0, 'Z should be 0.');
                equal(segmentation.getZSEA(16), 1.2246467991473532e-14, 'Z should be 0.');
                equal(segmentation.getZSEA(16/2), 100, 'Z should be 100.');
                equal(segmentation.getZSEA(16/2-(5*16*2)), 100, 'Z should be 100.');
                equal(segmentation.getZSEA(16/4), 70.71067811865474, 'Z should be 70.71067811865474.');
                equal(segmentation.getZSEA(16*3/4-(5*16*2)), 70.71067811865474, 'Z should be 70.71067811865474.');
            });

            test('getXSES(phiS, thetaS) should ...', function() {
                equal(segmentation.getXSES(0, 0, 0.1, 5), 0, 'X should be 0.');
            });

            test('getYSES(phiS, thetaS) should ...', function() {
                equal(segmentation.getYSES(0,0,16,       1,1000), 0, 'X should be 0.');
            });

            test('getZSES(thetaS) should ...', function() {
                equal(segmentation.getZSES(0,0,16,       1,1000), 0, 'X should be 0.');
            });

        };
        return {runA: runA,
                runB: runB}
    }
);