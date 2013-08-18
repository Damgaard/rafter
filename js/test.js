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


requirejs.config({
    paths: {
        'QUnit': 'libs/qunitjs.com/resources/qunit',
        'Three': 'libs/three.js/build/three'
    },
    shim: {
        'Three': {
            deps: [],
            exports: 'three'
        },
        'QUnit': {
            deps: [],
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require(
    [
        'QUnit',
        'tests/cons/designs/SuperQuadric',
        'tests/cons/designs/Surface',
        'tests/cons/designs/Segmentation'
    ],
    function test (
          QUnit,
          SuperQuadricTest,
          SurfaceTest,
          SegmentationTest
        ) {

        // run the tests.
        SuperQuadricTest.run();
        SurfaceTest.runA();
        SurfaceTest.runB();
        SegmentationTest.runA();
        SegmentationTest.runB();

        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);