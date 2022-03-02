// varying vec3 pos;
varying vec2 vUV;
varying vec3 n;
varying vec3 pos;
// uniform float iTime;

void main()
{
	vUV = uv;

	vec3 modelNorm = normalMatrix*normal;
	n = modelNorm;

	
	// n = normal;

	vec4 modelPosition = (modelMatrix*vec4(position,1.));

    vec3 offset = vec3(0.);
	modelPosition.xyz += offset;
	pos = modelPosition.xyz; //World Position
	// pos = position;
	vec4 modelViewPosition = viewMatrix*modelPosition;
	gl_Position = projectionMatrix * modelViewPosition;

}