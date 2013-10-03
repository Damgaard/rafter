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
    [
    ],
    function (

        ) {
        //console.log("4");

        var TangentPlane;

        TangentPlane = function (phiR, thetaR, aSurface) {
            var phiR_minus_ephsilon_to_X,
                phiR_plus_ephsilon_to_X,
                phiR_minus_ephsilon_to_Y,
                phiR_plus_ephsilon_to_Y,
                phiR_minus_ephsilon_to_Z,
                phiR_plus_ephsilon_to_Z,
                thetaR_minus_ephsilon_to_X,
                thetaR_plus_ephsilon_to_X,
                thetaR_minus_ephsilon_to_Y,
                thetaR_plus_ephsilon_to_Y,
                thetaR_minus_ephsilon_to_Z,
                thetaR_plus_ephsilon_to_Z,
                delta_X_from_phiR,
                delta_Y_from_phiR,
                delta_Z_from_phiR,
                delta_X_from_thetaR,
                delta_Y_from_thetaR,
                delta_Z_from_thetaR,
                plane_vector_delta_azimuth,
                plane_vector_delta_polar,
                plane_normal,
                vector3D_projected_to_plane;


            phiR_minus_ephsilon_to_X = aSurface.getXR( phiR - 0.0001, thetaR );
            phiR_plus_ephsilon_to_X  = aSurface.getXR( phiR + 0.0001, thetaR );
            phiR_minus_ephsilon_to_Y = aSurface.getYR( phiR - 0.0001, thetaR );
            phiR_plus_ephsilon_to_Y  = aSurface.getYR( phiR + 0.0001, thetaR );
            phiR_minus_ephsilon_to_Z = aSurface.getZR( thetaR );
            phiR_plus_ephsilon_to_Z  = aSurface.getZR( thetaR );

            thetaR_minus_ephsilon_to_X = aSurface.getXR( phiR, thetaR - 0.0001 );
            thetaR_plus_ephsilon_to_X  = aSurface.getXR( phiR, thetaR + 0.0001 );
            thetaR_minus_ephsilon_to_Y = aSurface.getYR( phiR, thetaR - 0.0001 );
            thetaR_plus_ephsilon_to_Y  = aSurface.getYR( phiR, thetaR + 0.0001 );
            thetaR_minus_ephsilon_to_Z = aSurface.getZR( thetaR - 0.0001 );
            thetaR_plus_ephsilon_to_Z  = aSurface.getZR( thetaR + 0.0001 );

            delta_X_from_phiR = phiR_plus_ephsilon_to_X - phiR_minus_ephsilon_to_X;
            delta_Y_from_phiR = phiR_plus_ephsilon_to_Y - phiR_minus_ephsilon_to_Y;
            delta_Z_from_phiR = phiR_plus_ephsilon_to_Z - phiR_minus_ephsilon_to_Z;

            delta_X_from_thetaR = thetaR_plus_ephsilon_to_X - thetaR_minus_ephsilon_to_X;
            delta_Y_from_thetaR = thetaR_plus_ephsilon_to_Y - thetaR_minus_ephsilon_to_Y;
            delta_Z_from_thetaR = thetaR_plus_ephsilon_to_Z - thetaR_minus_ephsilon_to_Z;

            plane_vector_delta_azimuth = new THREE.Vector3(delta_X_from_phiR, delta_Y_from_phiR, delta_Z_from_phiR);
            plane_vector_delta_polar   = new THREE.Vector3(delta_X_from_thetaR, delta_Y_from_thetaR, delta_Z_from_thetaR);

            plane_normal = new THREE.Vector3(0,0,0).cross(plane_vector_delta_azimuth, plane_vector_delta_polar).normalize();


            vector3D_projected_to_plane = function( vector3D ) {
                var dot_product,
                    plane_normal_scaled_by_dot_product,
                    vector3D_projected;

                dot_product = plane_normal.dot(vector3D);
                plane_normal_scaled_by_dot_product = plane_normal * dot_product;
                vector3D_projected = vector3D.sub(plane_normal_scaled_by_dot_product);

                return vector3D_projected;
            };


            this.vector3D_projected_to_plane = vector3D_projected_to_plane;

            //THIS CONSTRUCTOR REALLY SHOULD RETURN SOMETHING

            Object.freeze(this);
        };

        Object.freeze(TangentPlane);
        return TangentPlane;

    }
);