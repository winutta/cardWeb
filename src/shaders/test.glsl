
float n21 (vec2 p)
{
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}


vec4 n22 (vec2 p)
{
    float n = n21(p);
    float n2 = n21(p+n);
    float n3 = n21(p + n2);
    float n4 = n21(p + n3);
    // return vec2(n, n21(p+n));
    return vec4(n,n2,n3,n4);
}

vec2 noise(vec3 x){
    vec3 ip = floor(x);
    vec3 fp = fract(x);
    fp = fp*fp*(3.0-2.0*fp);
    vec2 tap = (ip.xy+vec2(37.0,17.0)*ip.z) + fp.xy;
    // vec4 rz = textureLod( iChannel1, (tap+0.5)/256.0, 0.0 );
    vec4 rz = n22((tap+0.5)/256.0);
    return mix( rz.yw, rz.xz, fp.z );
}

#define PRIMARY_INTENSITY 0.1 //1.3
#define PRIMARY_CONCENTRATION 0.6 //10.1
#define SECONDARY_INTENSITY 4. //5.
#define SECONDARY_CONCENTRATION 4.9 //0.9

vec3 glints (vec3 nor, vec3 light, vec3 camDir,float scale, vec3 p,vec3 col)
{

    vec3 ps = floor(p*scale)/scale;
    // ps = p;
    vec3 ps2 = floor(p*scale/2.)/scale/2.;

    vec3 h = normalize(light-camDir);
    float nl = dot(nor,light);
    
    vec3 coord = ps*.5;
    vec3 coord2 = ps2*0.5;
    coord.xy = coord.xy*.7071+coord.yx*.7071*vec2(1,-1);
    coord.xz = coord.xz*.7071+coord.zx*.7071*vec2(1,-1);
    coord2.xy = coord2.xy*.7071+coord2.yx*.7071*vec2(1,-1);
    coord2.xz = coord2.xz*.7071+coord2.zx*.7071*vec2(1,-1);
    coord2 = coord;
    
    //first layer (inner glints)
    float pw = .2*(1920.);
    vec3 aniso = vec3( noise((coord*pw)), noise((coord.yzx*pw)) )*2.0-1.0;
    aniso -= nor*dot(aniso,nor);
    float anisotropy = min(1.,length(aniso));
    aniso /= anisotropy;
    anisotropy = .55;
    float ah = abs(dot(h,aniso));
    float nh = abs(dot(nor,h));
    float qa = exp2((1.1-anisotropy)*3.5);
    nh = pow( nh, qa*PRIMARY_CONCENTRATION );
    nh *= pow( 1.-ah*anisotropy, 10.0 );
    vec3 glints = col*nh*exp2((1.2-anisotropy)*PRIMARY_INTENSITY);
    // vec3 glints = vec3(1./qa);

    //second layer (outer glints)
    pw = .145*((1920.));
    vec3 aniso2 = vec3( noise(coord2*pw), noise(coord2.yzx*pw).x )*2.0-1.0;
    anisotropy = .6;
    float ah2 = abs(dot(h,aniso2));
    float nh2 = abs(dot(nor,h));
    float q2 = exp2((.1-anisotropy)*3.5);
    nh2 = pow( nh, q2*SECONDARY_CONCENTRATION );
    nh2 *= pow( 1.-ah2*anisotropy, 150.0 );
    vec3 glints2 = col*nh2*((1.-anisotropy)*SECONDARY_INTENSITY);

    return glints*1. + glints2*1.;
}

// 

#pragma glslify: export(glints)


