//////////////////////////////////
// inverse Mollweide projection
// read from a texture with x=azimuth, y=elevation and writes a mollweide projection
//
// 2014 Matthias Kronlachner
//////////////////////////////////

uniform sampler2D MyTex;

#define M_PI_2 1.57079632679490
#define M_PI 3.1415926535897932384626433832795
#define M_PI2 6.28318530717959
void main()
{
    vec2 car_position = (gl_TextureMatrix[0] * gl_TexCoord[0]).st;
    
    vec2 sph_pos;
    
    float theta;
    float az;
    float el;
    

    theta = asin(car_position.y*2.-1.);
    
    el = asin((2.*theta + sin(2.*theta))/M_PI);
    az = ((car_position.x*2.-1.)/cos(theta)+1.)*0.5;
    
    sph_pos.x = az;
    sph_pos.y = (el + M_PI_2) / M_PI;
    
    
    vec4 color = texture2D(MyTex, sph_pos);
    
    if (sph_pos.x < 0. || sph_pos.y < 0.)
    {
        color = vec4(0., 0., 0., 0.);
    }
    
    if (sph_pos.x > 1. || sph_pos.y > 1.)
    {
        color = vec4(0., 0., 0., 0.);
    }
    
    gl_FragColor = color;
    
    
}










