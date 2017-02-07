//////////////////////////////////
// Mollweide projection
// read from a texture with x=mollweide_x, y=mollweide_y
//
// 2014 Matthias Kronlachner
//////////////////////////////////

uniform sampler2D MyTex;

#define M_PI 3.1415926535897932384626433832795

void main()
{
    vec2 car_position = (gl_TextureMatrix[0] * gl_TexCoord[0]).st;
    
    float theta;
    theta = M_PI*0.5 - car_position.y * M_PI;
    
    //float phi;
    //phi = car_position.x * M_PI - M_PI;
    
    vec2 new_car;

    int nmax=20;
    float eps = 1e-10;
    
    int i;
    float dt;
    float t;
    t = theta;
    
    for(i = 0; i < nmax; i++) {
        dt = (t + sin(t) - M_PI * sin(theta)) / (1.+cos(t));
        t = t - dt;
        
        if( abs(dt) < eps)
            break;
    }
    
    t = t*0.5;
    
    // car_position.x = car_position.x * cos(t);
    // car_position.y = (sin(t) + 1.)*0.5;
    
    car_position.x = car_position.x * (cos(t) + 1.) * 0.5;
    car_position.y = (sin(t)+1.)*0.5;
    
    // x = 2 .* sqrt(2) ./ pi .* phis .* cos(t);
    // y = sqrt(2) .* sin(t);
    
    vec4 color = texture2D(MyTex, car_position);
    
    gl_FragColor = color;
    
	//vec2 C =  (gl_TextureMatrix[0] * gl_TexCoord[0]).st;

	//float xs1 = sin(gl_TexCoord[0].s*gl_TexCoord[0].t/(abs(seed)+1.));
	//float xs2 = sin(xs1*533.);
	//float xs3 = sin(xs2*1013.);

	//float ys1 = sin(gl_TexCoord[0].s*gl_TexCoord[0].t/(abs(seed)+1.));
	//float ys2 = sin(ys1*5313.);
	//float ys3 = sin(ys2*10113.);

	//gl_FragColor = texture2D(tex0, C + K1 * 0.01 *vec2(xs3,ys3)) ;
    
}










