
#define PI 3.1415926538;
varying vec2 vUV;
varying vec3 n;
varying vec3 pos;
uniform vec3 size;
uniform float glintOn;
uniform sampler2D butterfly;
uniform sampler2D bgPattern;


#pragma glslify: snoise2 = require('glsl-noise/simplex/2d')
#pragma glslify: glints = require('./test');


float rounded( vec2 p, vec2 b, float r )
{
    return length(max(abs(p)-b+r,0.0))-r;
}

float avg(vec3 v){
  return (v.x + v.y + v.z)/3.;
}

void main() {


  
  vec2 worldSize = size.xy;
  float thresh = 0.05;
  vec2 uvWorld = (vUV - 0.5)*worldSize;

  vec2 imageDims = vec2(517./768.,1.);
  vec2 buttUV = uvWorld/1.4*imageDims + vec2(0.5)*imageDims.yx + vec2(0.0,2.5);
  vec2 buttInBorder = (1.-smoothstep(0.99,1.,buttUV))*(smoothstep(0.,0.01,buttUV));
  float buttInBorders = buttInBorder.x*buttInBorder.y; 
  vec4 buttData =  texture2D(butterfly, buttUV).xyzw;
  vec3 buttCol = mix(vec3(1.),buttData.rgb,buttData.w);
  buttCol = mix(vec3(1.),buttCol,buttInBorders);
  buttCol = 1.-buttCol;

  vec2 bgImgDims = vec2(417./626.,1.);
  vec2 bgUV = uvWorld*bgImgDims/10. + vec2(0.5)*imageDims.yx + vec2(0.,0.1);
  vec4 bgData = texture2D(bgPattern,bgUV).xyzw;
  vec3 bgCol = bgData.rgb;

  // float buttBlue = smoothstep(0.,0.1,buttCol.b);
  // buttCol = mix(buttCol,vec3(1.),buttBlue);


  vec2 edgeThresh = worldSize/2.-vec2(thresh);
  vec2 edges = smoothstep(edgeThresh, edgeThresh +  0.025,abs(uvWorld));

  float edge = max(edges.x,edges.y);

  float no = snoise2(uvWorld*10.);
  // vec3 gr = green(uvWorld);
  vec3 gr = vec3(n.x*10.);

  vec3 light = vec3(0., 0.,-0.5);
  vec3 viewDir = normalize(pos - cameraPosition);
  vec3 h = normalize(light-viewDir);
  float shine = abs(dot(n,h));
  shine = pow( shine, 50. );
//  vec3 camDir,float scale, vec3 p,vec3 col)
  // vec3 c = vec3(0.5,0.1,0.9);
  vec3 colorPick = vec3(0.5,0.1,0.9);
  // colorPick = vec3(207., 171., 95.)/255.;
  // colorPick = mix(colorPick, vec3(1.,1.,0.)*5.,buttCol.x);
  vec3 c = sin(sin(uvWorld.x*0.5+ 1.57 + sin(n.z*0. + 0.76)) + vec3(5.,2.,3.)*-uvWorld.y*0.1  + 5.+ colorPick + bgCol*0. );
  c = (c+1.)/2.*0.4 + 0.2;
  float brightness = avg(c);
  c = c/brightness*0.35;

  // c = vec3(avg(c));


  // c = mix(c,vec3(0.5,0.5,0.9),buttCol.x);

  // vec3 glint = glints(n,light,viewDir,10.,pos,c);
  vec3 glint = glints(n*(1.1-bgCol/5.),light,viewDir,100.,mix(vec3(uvWorld*1.15,0.),pos,0.),c);

  float b = rounded(uvWorld,worldSize*0.5,0.2);
  float b2 = rounded(uvWorld,worldSize*0.5 - 0.1,0.1);
  b2 = clamp(b2*1000.,0.,1.);

  vec3 col = vec3(gr)*edge;

  // col = vec3(b2*100.);
  
  b = 1.-clamp(b*1000.,0.,1.);
  // col = vec3()

  // col = c;
  col = pow(glint,vec3(6.))*1505.+c*0.7;
  // col = buttCol;
  // col = glint*glintOn + c - (shine*2. - 1.)*(1.-glintOn);

  vec3 fCol = glint + c;
  col = mix(col,fCol/2.,b2);

  // col = bgCol;

  gl_FragColor = vec4(col,b);
}