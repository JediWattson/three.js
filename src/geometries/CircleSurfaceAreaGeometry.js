/**
 * @author hughes
 */

import { Geometry } from '../core/Geometry';

function CircleSurfaceAreaGeometry( radius, segments, thetaStart, thetaLength, exponent ) {

	Geometry.call( this );

	this.type = 'CircleSurfaceAreaGeometry';

	this.parameters = {
		radius: radius,
		segments: segments,
		thetaStart: thetaStart,
		thetaLength: thetaLength,
		exponent: exponent
	};

	this.fromBufferGeometry( new CircleSurfaceAreaBufferGeometry( radius, segments, thetaStart, thetaLength, exponent ) );

}

CircleSurfaceAreaGeometry.prototype = Object.create( Geometry.prototype );
CircleSurfaceAreaGeometry.prototype.constructor = CircleSurfaceAreaGeometry;

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Float32BufferAttribute } from '../core/BufferAttribute';
import { BufferGeometry } from '../core/BufferGeometry';
import { Vector3 } from '../math/Vector3';
import { Vector2 } from '../math/Vector2';

function CircleCircleSurfaceAreaBufferGeometry( radius, segments, thetaStart, thetaLength, exponent ) {

	BufferGeometry.call( this );

	this.type = 'CircleCircleSurfaceAreaBufferGeometry';

	this.parameters = {
		radius: radius,
		segments: segments,
		thetaStart: thetaStart,
		thetaLength: thetaLength,
		exponent: exponent
	};
	exponent = 2
	radius = radius || 50;
	segments = segments !== undefined ? Math.max( 3, segments ) : 8;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	// helper variables

	var i, s;
	var vertex = new Vector3();
	var uv = new Vector2();

	// center point

	vertices.push( 0, 0, 0 );
	normals.push( 0, 0, 1 );
	uvs.push( 0.5, 0.5 );
	for (z = -10; z < 10; z++){	
		vertex.z = z;
		radius = z**exponent + 20;
		for ( s = 0, i = 3; s <= segments; s ++, i += 3 ) {

			var segment = thetaStart + s / segments * thetaLength;

			// vertex

			vertex.x = radius * Math.cos( segment );
			vertex.y = radius * Math.sin( segment );

			vertices.push( vertex.x, vertex.y, vertex.z );

			// normal

			normals.push( 0, 0, 1 );

			// uvs

			uv.x = ( vertices[ i ] / radius + 1 ) / 2;
			uv.y = ( vertices[ i + 1 ] / radius + 1 ) / 2;

			uvs.push( uv.x, uv.y );

		}
	
	// indices

	for ( i = 1; i <= segments; i ++ ) {

		indices.push( i, i + 1, 0 );

	}
	}
	// build geometry

	this.setIndex( indices );
	this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

CircleBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
CircleBufferGeometry.prototype.constructor = CircleBufferGeometry;

export { CircleGeometry, CircleBufferGeometry };
