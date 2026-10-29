(()=>{var ns={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Xd=0,bu=1,$d=2;var ba=1,qd=2,br=3,Ni=0,Sn=1,$n=2,mi=0,ws=1,Su=2,Mu=3,Eu=4,Yd=5;var Zi=100,Zd=101,jd=102,Jd=103,Kd=104,Qd=200,ef=201,tf=202,nf=203,bo=204,So=205,sf=206,rf=207,af=208,of=209,lf=210,cf=211,uf=212,hf=213,df=214,Mo=0,Eo=1,wo=2,As=3,Ao=4,To=5,Co=6,Ro=7,wu=0,ff=1,pf=2,ri=0,Au=1,Tu=2,Cu=3,Ru=4,Iu=5,Pu=6,Lu=7;var Du=300,ss=301,Ds=302,sl=303,rl=304,Sa=306,Io=1e3,fi=1001,Po=1002,Jt=1003,mf=1004;var Ma=1005;var tn=1006,al=1007;var rs=1008;var zn=1009,Nu=1010,Fu=1011,Sr=1012,ol=1013,ai=1014,oi=1015,gi=1016,ll=1017,cl=1018,Mr=1020,Uu=35902,Ou=35899,Bu=1021,zu=1022,qn=1023,pi=1026,as=1027,ku=1028,ul=1029,os=1030,hl=1031;var dl=1033,Ea=33776,wa=33777,Aa=33778,Ta=33779,fl=35840,pl=35841,ml=35842,gl=35843,_l=36196,xl=37492,yl=37496,vl=37488,bl=37489,Ca=37490,Sl=37491,Ml=37808,El=37809,wl=37810,Al=37811,Tl=37812,Cl=37813,Rl=37814,Il=37815,Pl=37816,Ll=37817,Dl=37818,Nl=37819,Fl=37820,Ul=37821,Ol=36492,Bl=36494,zl=36495,kl=36283,Vl=36284,Ra=36285,Hl=36286;var ea=2300,Lo=2301,vo=2302,fu=2303,pu=2400,mu=2401,gu=2402;var gf=3200;var Vu=0,_f=1,Oi="",$t="srgb",ta="srgb-linear",na="linear",Et="srgb";var Ms=7680;var _u=519,xf=512,yf=513,vf=514,Gl=515,bf=516,Sf=517,Wl=518,Mf=519,Do=35044;var Hu="300 es",ii=2e3,ia=2001;function Om(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Bm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ef(){let i=sa("canvas");return i.style.display="block",i}var gd={},dr=null;function ra(...i){let e="THREE."+i.shift();dr?dr("log",e,...i):console.log(e,...i)}function wf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function tt(...i){i=wf(i);let e="THREE."+i.shift();if(dr)dr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=wf(i);let e="THREE."+i.shift();if(dr)dr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Es(...i){let e=i.join(" ");e in gd||(gd[e]=!0,tt(...i))}function Af(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Tf={[Mo]:Eo,[wo]:Co,[Ao]:Ro,[As]:To,[Eo]:Mo,[Co]:wo,[Ro]:Ao,[To]:As},si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_d=1234567,Kr=Math.PI/180,fr=180/Math.PI;function Li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]+"-"+un[e&255]+un[e>>8&255]+"-"+un[e>>16&15|64]+un[e>>24&255]+"-"+un[t&63|128]+un[t>>8&255]+"-"+un[t>>16&255]+un[t>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function Gu(i,e){return(i%e+e)%e}function zm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function km(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function Vm(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function Hm(i,e=1){return e-Math.abs(Gu(i,e*2)-e)}function Gm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Wm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Xm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function $m(i,e){return i+Math.random()*(e-i)}function qm(i){return i*(.5-Math.random())}function Ym(i){i!==void 0&&(_d=i);let e=_d+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zm(i){return i*Kr}function jm(i){return i*fr}function Jm(i){return(i&i-1)===0&&i!==0}function Km(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Qm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),u=r((e+n)/2),d=a((e+n)/2),f=r((e-n)/2),h=a((e-n)/2),g=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*d,c*f,c*h,o*u);break;case"YZY":i.set(c*h,o*d,c*f,o*u);break;case"ZXZ":i.set(c*f,c*h,o*d,o*u);break;case"XZX":i.set(o*d,c*v,c*g,o*u);break;case"YXY":i.set(c*g,o*d,c*v,o*u);break;case"ZYZ":i.set(c*v,c*g,o*d,o*u);break;default:tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var _i={DEG2RAD:Kr,RAD2DEG:fr,generateUUID:Li,clamp:dt,euclideanModulo:Gu,mapLinear:zm,inverseLerp:km,lerp:Qr,damp:Vm,pingpong:Hm,smoothstep:Gm,smootherstep:Wm,randInt:Xm,randFloat:$m,randFloatSpread:qm,seededRandom:Ym,degToRad:Zm,radToDeg:jm,isPowerOfTwo:Jm,ceilPowerOfTwo:Km,floorPowerOfTwo:Qm,setQuaternionFromProperEuler:eg,normalize:Rt,denormalize:ni},Yu=class Yu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yu.prototype.isVector2=!0;var Je=Yu,Fn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],u=n[s+1],d=n[s+2],f=n[s+3],h=r[a+0],g=r[a+1],v=r[a+2],A=r[a+3];if(f!==A||c!==h||u!==g||d!==v){let p=c*h+u*g+d*v+f*A;p<0&&(h=-h,g=-g,v=-v,A=-A,p=-p);let m=1-o;if(p<.9995){let I=Math.acos(p),L=Math.sin(I);m=Math.sin(m*I)/L,o=Math.sin(o*I)/L,c=c*m+h*o,u=u*m+g*o,d=d*m+v*o,f=f*m+A*o}else{c=c*m+h*o,u=u*m+g*o,d=d*m+v*o,f=f*m+A*o;let I=1/Math.sqrt(c*c+u*u+d*d+f*f);c*=I,u*=I,d*=I,f*=I}}e[t]=c,e[t+1]=u,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],u=n[s+2],d=n[s+3],f=r[a],h=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+d*f+c*g-u*h,e[t+1]=c*v+d*h+u*f-o*g,e[t+2]=u*v+d*g+o*h-c*f,e[t+3]=d*v-o*f-c*h-u*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(n/2),d=o(s/2),f=o(r/2),h=c(n/2),g=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=h*d*f+u*g*v,this._y=u*g*f-h*d*v,this._z=u*d*v+h*g*f,this._w=u*d*f-h*g*v;break;case"YXZ":this._x=h*d*f+u*g*v,this._y=u*g*f-h*d*v,this._z=u*d*v-h*g*f,this._w=u*d*f+h*g*v;break;case"ZXY":this._x=h*d*f-u*g*v,this._y=u*g*f+h*d*v,this._z=u*d*v+h*g*f,this._w=u*d*f-h*g*v;break;case"ZYX":this._x=h*d*f-u*g*v,this._y=u*g*f+h*d*v,this._z=u*d*v-h*g*f,this._w=u*d*f+h*g*v;break;case"YZX":this._x=h*d*f+u*g*v,this._y=u*g*f+h*d*v,this._z=u*d*v-h*g*f,this._w=u*d*f-h*g*v;break;case"XZY":this._x=h*d*f-u*g*v,this._y=u*g*f-h*d*v,this._z=u*d*v+h*g*f,this._w=u*d*f+h*g*v;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],u=t[2],d=t[6],f=t[10],h=n+o+f;if(h>0){let g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(d-c)*g,this._y=(r-u)*g,this._z=(a-s)*g}else if(n>o&&n>f){let g=2*Math.sqrt(1+n-o-f);this._w=(d-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+u)/g}else if(o>f){let g=2*Math.sqrt(1+o-n-f);this._w=(r-u)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+d)/g}else{let g=2*Math.sqrt(1+f-n-o);this._w=(a-s)/g,this._x=(r+u)/g,this._y=(c+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,u=t._z,d=t._w;return this._x=n*d+a*o+s*u-r*c,this._y=s*d+a*c+r*o-n*u,this._z=r*d+a*u+n*c-s*o,this._w=a*d-n*o-s*c-r*u,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let u=Math.acos(o),d=Math.sin(u);c=Math.sin(c*u)/d,t=Math.sin(t*u)/d,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Zu=class Zu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*s-o*n),d=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*u+a*f-o*d,this.y=n+c*d+o*u-r*f,this.z=s+c*f+r*d-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gc.copy(this).projectOnVector(e),this.sub(Gc)}reflect(e){return this.sub(Gc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Zu.prototype.isVector3=!0;var B=Zu,Gc=new B,xd=new Fn,ju=class ju{constructor(e,t,n,s,r,a,o,c,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u)}set(e,t,n,s,r,a,o,c,u){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],u=n[1],d=n[4],f=n[7],h=n[2],g=n[5],v=n[8],A=s[0],p=s[3],m=s[6],I=s[1],L=s[4],M=s[7],w=s[2],T=s[5],P=s[8];return r[0]=a*A+o*I+c*w,r[3]=a*p+o*L+c*T,r[6]=a*m+o*M+c*P,r[1]=u*A+d*I+f*w,r[4]=u*p+d*L+f*T,r[7]=u*m+d*M+f*P,r[2]=h*A+g*I+v*w,r[5]=h*p+g*L+v*T,r[8]=h*m+g*M+v*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],d=e[8];return t*a*d-t*o*u-n*r*d+n*o*c+s*r*u-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],d=e[8],f=d*a-o*u,h=o*c-d*r,g=u*r-a*c,v=t*f+n*h+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/v;return e[0]=f*A,e[1]=(s*u-d*n)*A,e[2]=(o*n-s*a)*A,e[3]=h*A,e[4]=(d*t-s*c)*A,e[5]=(s*r-o*t)*A,e[6]=g*A,e[7]=(n*c-u*t)*A,e[8]=(a*t-n*r)*A,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),u=Math.sin(r);return this.set(n*c,n*u,-n*(c*a+u*o)+a+e,-s*u,s*c,-s*(-u*a+c*o)+o+t,0,0,1),this}scale(e,t){return Es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wc.makeScale(e,t)),this}rotate(e){return Es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wc.makeRotation(-e)),this}translate(e,t){return Es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ju.prototype.isMatrix3=!0;var ht=ju,Wc=new ht,yd=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vd=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tg(){let i={enabled:!0,workingColorSpace:ta,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Et&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(s.r=hr(s.r),s.g=hr(s.g),s.b=hr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Oi?na:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ta]:{primaries:e,whitePoint:n,transfer:na,toXYZ:yd,fromXYZ:vd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:yd,fromXYZ:vd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}var _t=tg();function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qs,No=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qs===void 0&&(qs=sa("canvas")),qs.width=e.width,qs.height=e.height;let s=qs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=qs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Di(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Di(t[n]/255)*255):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ng=0,pr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Xc(s[a].image)):r.push(Xc(s[a]))}else r=Xc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Xc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?No.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}var ig=0,$c=new B,yn=class i extends si{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=fi,s=fi,r=tn,a=rs,o=qn,c=zn,u=i.DEFAULT_ANISOTROPY,d=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=Li(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($c).x}get height(){return this.source.getSize($c).y}get depth(){return this.source.getSize($c).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){tt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){tt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Io:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case Po:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Io:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case Po:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Du;yn.DEFAULT_ANISOTROPY=1;var Ju=class Ju{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,u=c[0],d=c[4],f=c[8],h=c[1],g=c[5],v=c[9],A=c[2],p=c[6],m=c[10];if(Math.abs(d-h)<.01&&Math.abs(f-A)<.01&&Math.abs(v-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+A)<.1&&Math.abs(v+p)<.1&&Math.abs(u+g+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let L=(u+1)/2,M=(g+1)/2,w=(m+1)/2,T=(d+h)/4,P=(f+A)/4,y=(v+p)/4;return L>M&&L>w?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=T/n,r=P/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=y/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=P/r,s=y/r),this.set(n,s,r,t),this}let I=Math.sqrt((p-v)*(p-v)+(f-A)*(f-A)+(h-d)*(h-d));return Math.abs(I)<.001&&(I=1),this.x=(p-v)/I,this.y=(f-A)/I,this.z=(h-d)/I,this.w=Math.acos((u+g+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ju.prototype.isVector4=!0;var It=Ju,Fo=class extends si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new yn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Un=class extends Fo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},aa=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Uo=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var il=class il{constructor(e,t,n,s,r,a,o,c,u,d,f,h,g,v,A,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u,d,f,h,g,v,A,p)}set(e,t,n,s,r,a,o,c,u,d,f,h,g,v,A,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=u,m[6]=d,m[10]=f,m[14]=h,m[3]=g,m[7]=v,m[11]=A,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new il().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),a=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),u=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let h=a*d,g=a*f,v=o*d,A=o*f;t[0]=c*d,t[4]=-c*f,t[8]=u,t[1]=g+v*u,t[5]=h-A*u,t[9]=-o*c,t[2]=A-h*u,t[6]=v+g*u,t[10]=a*c}else if(e.order==="YXZ"){let h=c*d,g=c*f,v=u*d,A=u*f;t[0]=h+A*o,t[4]=v*o-g,t[8]=a*u,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=g*o-v,t[6]=A+h*o,t[10]=a*c}else if(e.order==="ZXY"){let h=c*d,g=c*f,v=u*d,A=u*f;t[0]=h-A*o,t[4]=-a*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*d,t[9]=A-h*o,t[2]=-a*u,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let h=a*d,g=a*f,v=o*d,A=o*f;t[0]=c*d,t[4]=v*u-g,t[8]=h*u+A,t[1]=c*f,t[5]=A*u+h,t[9]=g*u-v,t[2]=-u,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let h=a*c,g=a*u,v=o*c,A=o*u;t[0]=c*d,t[4]=A-h*f,t[8]=v*f+g,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-u*d,t[6]=g*f+v,t[10]=h-A*f}else if(e.order==="XZY"){let h=a*c,g=a*u,v=o*c,A=o*u;t[0]=c*d,t[4]=-f,t[8]=u*d,t[1]=h*f+A,t[5]=a*d,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*d,t[10]=A*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sg,e,rg)}lookAt(e,t,n){let s=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Gi.crossVectors(n,Dn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Gi.crossVectors(n,Dn)),Gi.normalize(),qa.crossVectors(Dn,Gi),s[0]=Gi.x,s[4]=qa.x,s[8]=Dn.x,s[1]=Gi.y,s[5]=qa.y,s[9]=Dn.y,s[2]=Gi.z,s[6]=qa.z,s[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],u=n[12],d=n[1],f=n[5],h=n[9],g=n[13],v=n[2],A=n[6],p=n[10],m=n[14],I=n[3],L=n[7],M=n[11],w=n[15],T=s[0],P=s[4],y=s[8],R=s[12],k=s[1],N=s[5],F=s[9],te=s[13],K=s[2],q=s[6],ee=s[10],j=s[14],ie=s[3],ue=s[7],ge=s[11],fe=s[15];return r[0]=a*T+o*k+c*K+u*ie,r[4]=a*P+o*N+c*q+u*ue,r[8]=a*y+o*F+c*ee+u*ge,r[12]=a*R+o*te+c*j+u*fe,r[1]=d*T+f*k+h*K+g*ie,r[5]=d*P+f*N+h*q+g*ue,r[9]=d*y+f*F+h*ee+g*ge,r[13]=d*R+f*te+h*j+g*fe,r[2]=v*T+A*k+p*K+m*ie,r[6]=v*P+A*N+p*q+m*ue,r[10]=v*y+A*F+p*ee+m*ge,r[14]=v*R+A*te+p*j+m*fe,r[3]=I*T+L*k+M*K+w*ie,r[7]=I*P+L*N+M*q+w*ue,r[11]=I*y+L*F+M*ee+w*ge,r[15]=I*R+L*te+M*j+w*fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],u=e[13],d=e[2],f=e[6],h=e[10],g=e[14],v=e[3],A=e[7],p=e[11],m=e[15],I=c*g-u*h,L=o*g-u*f,M=o*h-c*f,w=a*g-u*d,T=a*h-c*d,P=a*f-o*d;return t*(A*I-p*L+m*M)-n*(v*I-p*w+m*T)+s*(v*L-A*w+m*P)-r*(v*M-A*T+p*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],u=e[6],d=e[10];return t*(a*d-o*u)-n*(r*d-o*c)+s*(r*u-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],d=e[8],f=e[9],h=e[10],g=e[11],v=e[12],A=e[13],p=e[14],m=e[15],I=t*o-n*a,L=t*c-s*a,M=t*u-r*a,w=n*c-s*o,T=n*u-r*o,P=s*u-r*c,y=d*A-f*v,R=d*p-h*v,k=d*m-g*v,N=f*p-h*A,F=f*m-g*A,te=h*m-g*p,K=I*te-L*F+M*N+w*k-T*R+P*y;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/K;return e[0]=(o*te-c*F+u*N)*q,e[1]=(s*F-n*te-r*N)*q,e[2]=(A*P-p*T+m*w)*q,e[3]=(h*T-f*P-g*w)*q,e[4]=(c*k-a*te-u*R)*q,e[5]=(t*te-s*k+r*R)*q,e[6]=(p*M-v*P-m*L)*q,e[7]=(d*P-h*M+g*L)*q,e[8]=(a*F-o*k+u*y)*q,e[9]=(n*k-t*F-r*y)*q,e[10]=(v*T-A*M+m*I)*q,e[11]=(f*M-d*T-g*I)*q,e[12]=(o*R-a*N-c*y)*q,e[13]=(t*N-n*R+s*y)*q,e[14]=(A*L-v*w-p*I)*q,e[15]=(d*w-f*L+h*I)*q,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,u=r*a,d=r*o;return this.set(u*a+n,u*o-s*c,u*c+s*o,0,u*o+s*c,d*o+n,d*c-s*a,0,u*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,u=r+r,d=a+a,f=o+o,h=r*u,g=r*d,v=r*f,A=a*d,p=a*f,m=o*f,I=c*u,L=c*d,M=c*f,w=n.x,T=n.y,P=n.z;return s[0]=(1-(A+m))*w,s[1]=(g+M)*w,s[2]=(v-L)*w,s[3]=0,s[4]=(g-M)*T,s[5]=(1-(h+m))*T,s[6]=(p+I)*T,s[7]=0,s[8]=(v+L)*P,s[9]=(p-I)*P,s[10]=(1-(h+A))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ys.set(s[0],s[1],s[2]).length(),o=Ys.set(s[4],s[5],s[6]).length(),c=Ys.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Qn.copy(this);let u=1/a,d=1/o,f=1/c;return Qn.elements[0]*=u,Qn.elements[1]*=u,Qn.elements[2]*=u,Qn.elements[4]*=d,Qn.elements[5]*=d,Qn.elements[6]*=d,Qn.elements[8]*=f,Qn.elements[9]*=f,Qn.elements[10]*=f,t.setFromRotationMatrix(Qn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=ii,c=!1){let u=this.elements,d=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),g=(n+s)/(n-s),v,A;if(c)v=r/(a-r),A=a*r/(a-r);else if(o===ii)v=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===ia)v=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=d,u[4]=0,u[8]=h,u[12]=0,u[1]=0,u[5]=f,u[9]=g,u[13]=0,u[2]=0,u[6]=0,u[10]=v,u[14]=A,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ii,c=!1){let u=this.elements,d=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),g=-(n+s)/(n-s),v,A;if(c)v=1/(a-r),A=a/(a-r);else if(o===ii)v=-2/(a-r),A=-(a+r)/(a-r);else if(o===ia)v=-1/(a-r),A=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=d,u[4]=0,u[8]=0,u[12]=h,u[1]=0,u[5]=f,u[9]=0,u[13]=g,u[2]=0,u[6]=0,u[10]=v,u[14]=A,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};il.prototype.isMatrix4=!0;var Ft=il,Ys=new B,Qn=new Ft,sg=new B(0,0,0),rg=new B(1,1,1),Gi=new B,qa=new B,Dn=new B,bd=new Ft,Sd=new Fn,ji=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sd.setFromEuler(this),this.setFromQuaternion(Sd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ji.DEFAULT_ORDER="XYZ";var mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ag=0,Md=new B,Zs=new Fn,Ai=new Ft,Ya=new B,Wr=new B,og=new B,lg=new Fn,Ed=new B(1,0,0),wd=new B(0,1,0),Ad=new B(0,0,1),Td={type:"added"},cg={type:"removed"},js={type:"childadded",child:null},qc={type:"childremoved",child:null},Tn=class i extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new ji,n=new Fn,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new ht}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(Ed,e)}rotateY(e){return this.rotateOnAxis(wd,e)}rotateZ(e){return this.rotateOnAxis(Ad,e)}translateOnAxis(e,t){return Md.copy(e).applyQuaternion(this.quaternion),this.position.add(Md.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ed,e)}translateY(e){return this.translateOnAxis(wd,e)}translateZ(e){return this.translateOnAxis(Ad,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ya.copy(e):Ya.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Wr,Ya,this.up):Ai.lookAt(Ya,Wr,this.up),this.quaternion.setFromRotationMatrix(Ai),s&&(Ai.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(Ai),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Td),js.child=e,this.dispatchEvent(js),js.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cg),qc.child=e,this.dispatchEvent(qc),qc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Td),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,og),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,lg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let u=0,d=c.length;u<d;u++){let f=c[u];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),u=a(e.textures),d=a(e.images),f=a(e.shapes),h=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),u.length>0&&(n.textures=u),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let c=[];for(let u in o){let d=o[u];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Tn.DEFAULT_UP=new B(0,1,0);Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=class extends Tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},ug={type:"move"},gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(let A of e.hand.values()){let p=t.getJointPose(A,n),m=this._getHandJoint(u,A);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let d=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],h=d.position.distanceTo(f.position),g=.02,v=.005;u.inputState.pinching&&h>g+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=g-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ug)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Za={h:0,s:0,l:0};function Yc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var mt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=_t.workingColorSpace){if(e=Gu(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Yc(a,r,e+1/3),this.g=Yc(a,r,e),this.b=Yc(a,r,e-1/3)}return _t.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:tt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){let n=Cf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return _t.workingToColorSpace(hn.copy(this),e),Math.round(dt(hn.r*255,0,255))*65536+Math.round(dt(hn.g*255,0,255))*256+Math.round(dt(hn.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(hn.copy(this),t);let n=hn.r,s=hn.g,r=hn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,u,d=(o+a)/2;if(o===a)c=0,u=0;else{let f=a-o;switch(u=d<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=u,e.l=d,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(hn.copy(this),t),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=$t){_t.workingToColorSpace(hn.copy(this),e);let t=hn.r,n=hn.g,s=hn.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(Za);let n=Qr(Wi.h,Za.h,t),s=Qr(Wi.s,Za.s,t),r=Qr(Wi.l,Za.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new mt;mt.NAMES=Cf;var _r=class extends Tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ei=new B,Ti=new B,Zc=new B,Ci=new B,Js=new B,Ks=new B,Cd=new B,jc=new B,Jc=new B,Kc=new B,Qc=new It,eu=new It,tu=new It,Pi=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ei.subVectors(e,t),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ei.subVectors(s,t),Ti.subVectors(n,t),Zc.subVectors(e,t);let a=ei.dot(ei),o=ei.dot(Ti),c=ei.dot(Zc),u=Ti.dot(Ti),d=Ti.dot(Zc),f=a*u-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,g=(u*c-o*d)*h,v=(a*d-o*c)*h;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ci.x),c.addScaledVector(a,Ci.y),c.addScaledVector(o,Ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Qc.setScalar(0),eu.setScalar(0),tu.setScalar(0),Qc.fromBufferAttribute(e,t),eu.fromBufferAttribute(e,n),tu.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Qc,r.x),a.addScaledVector(eu,r.y),a.addScaledVector(tu,r.z),a}static isFrontFacing(e,t,n,s){return ei.subVectors(n,t),Ti.subVectors(e,t),ei.cross(Ti).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),ei.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Js.subVectors(s,n),Ks.subVectors(r,n),jc.subVectors(e,n);let c=Js.dot(jc),u=Ks.dot(jc);if(c<=0&&u<=0)return t.copy(n);Jc.subVectors(e,s);let d=Js.dot(Jc),f=Ks.dot(Jc);if(d>=0&&f<=d)return t.copy(s);let h=c*f-d*u;if(h<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(Js,a);Kc.subVectors(e,r);let g=Js.dot(Kc),v=Ks.dot(Kc);if(v>=0&&g<=v)return t.copy(r);let A=g*u-c*v;if(A<=0&&u>=0&&v<=0)return o=u/(u-v),t.copy(n).addScaledVector(Ks,o);let p=d*v-g*f;if(p<=0&&f-d>=0&&g-v>=0)return Cd.subVectors(r,s),o=(f-d)/(f-d+(g-v)),t.copy(s).addScaledVector(Cd,o);let m=1/(p+A+h);return a=A*m,o=h*m,t.copy(n).addScaledVector(Js,a).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},vn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ti):ti.fromBufferAttribute(r,a),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ja.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ja.copy(n.boundingBox)),ja.applyMatrix4(e.matrixWorld),this.union(ja)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xr),Ja.subVectors(this.max,Xr),Qs.subVectors(e.a,Xr),er.subVectors(e.b,Xr),tr.subVectors(e.c,Xr),Xi.subVectors(er,Qs),$i.subVectors(tr,er),ys.subVectors(Qs,tr);let t=[0,-Xi.z,Xi.y,0,-$i.z,$i.y,0,-ys.z,ys.y,Xi.z,0,-Xi.x,$i.z,0,-$i.x,ys.z,0,-ys.x,-Xi.y,Xi.x,0,-$i.y,$i.x,0,-ys.y,ys.x,0];return!nu(t,Qs,er,tr,Ja)||(t=[1,0,0,0,1,0,0,0,1],!nu(t,Qs,er,tr,Ja))?!1:(Ka.crossVectors(Xi,$i),t=[Ka.x,Ka.y,Ka.z],nu(t,Qs,er,tr,Ja))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ri=[new B,new B,new B,new B,new B,new B,new B,new B],ti=new B,ja=new vn,Qs=new B,er=new B,tr=new B,Xi=new B,$i=new B,ys=new B,Xr=new B,Ja=new B,Ka=new B,vs=new B;function nu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){vs.fromArray(i,r);let o=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),c=e.dot(vs),u=t.dot(vs),d=n.dot(vs);if(Math.max(-Math.max(c,u,d),Math.min(c,u,d))>o)return!1}return!0}var Gt=new B,Qa=new Je,hg=0,An=class extends si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Do,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qa.fromBufferAttribute(this,t),Qa.applyMatrix3(e),this.setXY(t,Qa.x,Qa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Do&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var oa=class extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var la=class extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var kt=class extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}},dg=new vn,$r=new B,iu=new B,Cn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):dg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);let t=$r.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector($r,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(iu)),this.expandByPoint($r.copy(e.center).sub(iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},fg=0,Gn=new Ft,su=new Tn,nr=new B,Nn=new vn,qr=new vn,jt=new B,nn=class i extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Om(e)?la:oa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ht().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return su.lookAt(e),su.updateMatrix(),this.applyMatrix4(su.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];qr.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(Nn.min,qr.min),Nn.expandByPoint(jt),jt.addVectors(Nn.max,qr.max),Nn.expandByPoint(jt)):(Nn.expandByPoint(qr.min),Nn.expandByPoint(qr.max))}Nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(jt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let u=0,d=o.count;u<d;u++)jt.fromBufferAttribute(o,u),c&&(nr.fromBufferAttribute(e,u),jt.add(nr)),s=Math.max(s,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new An(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new B,c[y]=new B;let u=new B,d=new B,f=new B,h=new Je,g=new Je,v=new Je,A=new B,p=new B;function m(y,R,k){u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,R),f.fromBufferAttribute(n,k),h.fromBufferAttribute(r,y),g.fromBufferAttribute(r,R),v.fromBufferAttribute(r,k),d.sub(u),f.sub(u),g.sub(h),v.sub(h);let N=1/(g.x*v.y-v.x*g.y);isFinite(N)&&(A.copy(d).multiplyScalar(v.y).addScaledVector(f,-g.y).multiplyScalar(N),p.copy(f).multiplyScalar(g.x).addScaledVector(d,-v.x).multiplyScalar(N),o[y].add(A),o[R].add(A),o[k].add(A),c[y].add(p),c[R].add(p),c[k].add(p))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let y=0,R=I.length;y<R;++y){let k=I[y],N=k.start,F=k.count;for(let te=N,K=N+F;te<K;te+=3)m(e.getX(te+0),e.getX(te+1),e.getX(te+2))}let L=new B,M=new B,w=new B,T=new B;function P(y){w.fromBufferAttribute(s,y),T.copy(w);let R=o[y];L.copy(R),L.sub(w.multiplyScalar(w.dot(R))).normalize(),M.crossVectors(T,R);let N=M.dot(c[y])<0?-1:1;a.setXYZW(y,L.x,L.y,L.z,N)}for(let y=0,R=I.length;y<R;++y){let k=I[y],N=k.start,F=k.count;for(let te=N,K=N+F;te<K;te+=3)P(e.getX(te+0)),P(e.getX(te+1)),P(e.getX(te+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,g=n.count;h<g;h++)n.setXYZ(h,0,0,0);let s=new B,r=new B,a=new B,o=new B,c=new B,u=new B,d=new B,f=new B;if(e)for(let h=0,g=e.count;h<g;h+=3){let v=e.getX(h+0),A=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,A),a.fromBufferAttribute(t,p),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,p),o.add(d),c.add(d),u.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(A,c.x,c.y,c.z),n.setXYZ(p,u.x,u.y,u.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,c){let u=o.array,d=o.itemSize,f=o.normalized,h=new u.constructor(c.length*d),g=0,v=0;for(let A=0,p=c.length;A<p;A++){o.isInterleavedBufferAttribute?g=c[A]*o.data.stride+o.offset:g=c[A]*d;for(let m=0;m<d;m++)h[v++]=u[g++]}return new An(h,d,f)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],u=e(c,n);t.setAttribute(o,u)}let r=this.morphAttributes;for(let o in r){let c=[],u=r[o];for(let d=0,f=u.length;d<f;d++){let h=u[d],g=e(h,n);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let u=n[c];e.data.attributes[c]=u.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let u=this.morphAttributes[c],d=[];for(let f=0,h=u.length;f<h;f++){let g=u[f];d.push(g.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let u in s){let d=s[u];this.setAttribute(u,d.clone(t))}let r=e.morphAttributes;for(let u in r){let d=[],f=r[u];for(let h=0,g=f.length;h<g;h++)d.push(f[h].clone(t));this.morphAttributes[u]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let u=0,d=a.length;u<d;u++){let f=a[u];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ca=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Do,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},xn=new B,On=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ra("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new An(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ra("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pg=0,Fi=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=ws,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=So,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){tt(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){tt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(n.blending=this.blending),this.side!==Ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==Zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_u&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new mt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Je().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Je().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ts=class extends Fi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ir,Yr=new B,sr=new B,rr=new B,ar=new Je,Zr=new Je,Rf=new Ft,eo=new B,jr=new B,to=new B,Rd=new Je,ru=new Je,Id=new Je,Cs=class extends Tn{constructor(e=new Ts){if(super(),this.isSprite=!0,this.type="Sprite",ir===void 0){ir=new nn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ca(t,5);ir.setIndex([0,1,2,0,2,3]),ir.setAttribute("position",new On(n,3,0,!1)),ir.setAttribute("uv",new On(n,2,3,!1))}this.geometry=ir,this.material=e,this.center=new Je(.5,.5),this.count=1}raycast(e,t){e.camera===null&&rt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sr.setFromMatrixScale(this.matrixWorld),Rf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sr.multiplyScalar(-rr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;no(eo.set(-.5,-.5,0),rr,a,sr,s,r),no(jr.set(.5,-.5,0),rr,a,sr,s,r),no(to.set(.5,.5,0),rr,a,sr,s,r),Rd.set(0,0),ru.set(1,0),Id.set(1,1);let o=e.ray.intersectTriangle(eo,jr,to,!1,Yr);if(o===null&&(no(jr.set(-.5,.5,0),rr,a,sr,s,r),ru.set(0,1),o=e.ray.intersectTriangle(eo,to,jr,!1,Yr),o===null))return;let c=e.ray.origin.distanceTo(Yr);c<e.near||c>e.far||t.push({distance:c,point:Yr.clone(),uv:Pi.getInterpolation(Yr,eo,jr,to,Rd,ru,Id,new Je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function no(i,e,t,n,s,r){ar.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Zr.x=r*ar.x-s*ar.y,Zr.y=s*ar.x+r*ar.y):Zr.copy(ar),i.copy(e),i.x+=Zr.x,i.y+=Zr.y,i.applyMatrix4(Rf)}var Ii=new B,au=new B,io=new B,qi=new B,ou=new B,so=new B,lu=new B,Ji=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){au.copy(e).add(t).multiplyScalar(.5),io.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(au);let r=e.distanceTo(t)*.5,a=-this.direction.dot(io),o=qi.dot(this.direction),c=-qi.dot(io),u=qi.lengthSq(),d=Math.abs(1-a*a),f,h,g,v;if(d>0)if(f=a*c-o,h=a*o-c,v=r*d,f>=0)if(h>=-v)if(h<=v){let A=1/d;f*=A,h*=A,g=f*(f+a*h+2*o)+h*(a*f+h+2*c)+u}else h=r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+u;else h=-r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+u;else h<=-v?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+u):h<=v?(f=0,h=Math.min(Math.max(-r,-c),r),g=h*(h+2*c)+u):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+u);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(au).addScaledVector(io,h),g}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);let n=Ii.dot(this.direction),s=Ii.dot(Ii)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,u=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return u>=0?(n=(e.min.x-h.x)*u,s=(e.max.x-h.x)*u):(n=(e.max.x-h.x)*u,s=(e.min.x-h.x)*u),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,s,r){ou.subVectors(t,e),so.subVectors(n,e),lu.crossVectors(ou,so);let a=this.direction.dot(lu),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qi.subVectors(this.origin,e);let c=o*this.direction.dot(so.crossVectors(qi,so));if(c<0)return null;let u=o*this.direction.dot(ou.cross(qi));if(u<0||c+u>a)return null;let d=-o*qi.dot(lu);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rs=class extends Fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pd=new Ft,bs=new Ji,ro=new Cn,Ld=new B,ao=new B,oo=new B,lo=new B,cu=new B,co=new B,Dd=new B,uo=new B,sn=class extends Tn{constructor(e=new nn,t=new Rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){co.set(0,0,0);for(let c=0,u=r.length;c<u;c++){let d=o[c],f=r[c];d!==0&&(cu.fromBufferAttribute(f,e),a?co.addScaledVector(cu,d):co.addScaledVector(cu.sub(t),d))}t.add(co)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(ro.containsPoint(bs.origin)===!1&&(bs.intersectSphere(ro,Ld)===null||bs.origin.distanceToSquared(Ld)>(e.far-e.near)**2))&&(Pd.copy(r).invert(),bs.copy(e.ray).applyMatrix4(Pd),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,u=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,h=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,A=h.length;v<A;v++){let p=h[v],m=a[p.materialIndex],I=Math.max(p.start,g.start),L=Math.min(o.count,Math.min(p.start+p.count,g.start+g.count));for(let M=I,w=L;M<w;M+=3){let T=o.getX(M),P=o.getX(M+1),y=o.getX(M+2);s=ho(this,m,e,n,u,d,f,T,P,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),A=Math.min(o.count,g.start+g.count);for(let p=v,m=A;p<m;p+=3){let I=o.getX(p),L=o.getX(p+1),M=o.getX(p+2);s=ho(this,a,e,n,u,d,f,I,L,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,A=h.length;v<A;v++){let p=h[v],m=a[p.materialIndex],I=Math.max(p.start,g.start),L=Math.min(c.count,Math.min(p.start+p.count,g.start+g.count));for(let M=I,w=L;M<w;M+=3){let T=M,P=M+1,y=M+2;s=ho(this,m,e,n,u,d,f,T,P,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),A=Math.min(c.count,g.start+g.count);for(let p=v,m=A;p<m;p+=3){let I=p,L=p+1,M=p+2;s=ho(this,a,e,n,u,d,f,I,L,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function mg(i,e,t,n,s,r,a,o){let c;if(e.side===Sn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Ni,o),c===null)return null;uo.copy(o),uo.applyMatrix4(i.matrixWorld);let u=t.ray.origin.distanceTo(uo);return u<t.near||u>t.far?null:{distance:u,point:uo.clone(),object:i}}function ho(i,e,t,n,s,r,a,o,c,u){i.getVertexPosition(o,ao),i.getVertexPosition(c,oo),i.getVertexPosition(u,lo);let d=mg(i,e,t,n,ao,oo,lo,Dd);if(d){let f=new B;Pi.getBarycoord(Dd,ao,oo,lo,f),s&&(d.uv=Pi.getInterpolatedAttribute(s,o,c,u,f,new Je)),r&&(d.uv1=Pi.getInterpolatedAttribute(r,o,c,u,f,new Je)),a&&(d.normal=Pi.getInterpolatedAttribute(a,o,c,u,f,new B),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let h={a:o,b:c,c:u,normal:new B,materialIndex:0};Pi.getNormal(ao,oo,lo,h.normal),d.face=h,d.barycoord=f}return d}var Oo=class extends yn{constructor(e=null,t=1,n=1,s,r,a,o,c,u=Jt,d=Jt,f,h){super(null,a,o,c,u,d,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var uu=new B,gg=new B,_g=new ht,Wn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=uu.subVectors(n,t).cross(gg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(uu),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||_g.getNormalMatrix(e),s=this.coplanarPoint(uu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ss=new Cn,xg=new Je(.5,.5),fo=new B,ua=class{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ii,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],u=r[3],d=r[4],f=r[5],h=r[6],g=r[7],v=r[8],A=r[9],p=r[10],m=r[11],I=r[12],L=r[13],M=r[14],w=r[15];if(s[0].setComponents(u-a,g-d,m-v,w-I).normalize(),s[1].setComponents(u+a,g+d,m+v,w+I).normalize(),s[2].setComponents(u+o,g+f,m+A,w+L).normalize(),s[3].setComponents(u-o,g-f,m-A,w-L).normalize(),n)s[4].setComponents(c,h,p,M).normalize(),s[5].setComponents(u-c,g-h,m-p,w-M).normalize();else if(s[4].setComponents(u-c,g-h,m-p,w-M).normalize(),t===ii)s[5].setComponents(u+c,g+h,m+p,w+M).normalize();else if(t===ia)s[5].setComponents(c,h,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(e){Ss.center.set(0,0,0);let t=xg.distanceTo(e.center);return Ss.radius=.7071067811865476+t,Ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(fo.x=s.normal.x>0?e.max.x:e.min.x,fo.y=s.normal.y>0?e.max.y:e.min.y,fo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xr=class extends Fi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Bo=new B,zo=new B,Nd=new Ft,Jr=new Ji,po=new Cn,hu=new B,Fd=new B,ko=class extends Tn{constructor(e=new nn,t=new xr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Bo.fromBufferAttribute(t,s-1),zo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Bo.distanceTo(zo);e.setAttribute("lineDistance",new kt(n,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),po.radius+=r,e.ray.intersectsSphere(po)===!1)return;Nd.copy(s).invert(),Jr.copy(e.ray).applyMatrix4(Nd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){let g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let A=g,p=v-1;A<p;A+=u){let m=d.getX(A),I=d.getX(A+1),L=mo(this,e,Jr,c,m,I,A);L&&t.push(L)}if(this.isLineLoop){let A=d.getX(v-1),p=d.getX(g),m=mo(this,e,Jr,c,A,p,v-1);m&&t.push(m)}}else{let g=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let A=g,p=v-1;A<p;A+=u){let m=mo(this,e,Jr,c,A,A+1,A);m&&t.push(m)}if(this.isLineLoop){let A=mo(this,e,Jr,c,v-1,g,v-1);A&&t.push(A)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function mo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Bo.fromBufferAttribute(o,s),zo.fromBufferAttribute(o,r),t.distanceSqToSegment(Bo,zo,hu,Fd)>n)return;hu.applyMatrix4(i.matrixWorld);let u=e.ray.origin.distanceTo(hu);if(!(u<e.near||u>e.far))return{distance:u,point:Fd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Ud=new B,Od=new B,ha=class extends ko{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ud.fromBufferAttribute(t,s),Od.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ud.distanceTo(Od);e.setAttribute("lineDistance",new kt(n,1))}else tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var da=class extends yn{constructor(e=[],t=ss,n,s,r,a,o,c,u,d){super(e,t,n,s,r,a,o,c,u,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Is=class extends yn{constructor(e,t,n,s,r,a,o,c,u){super(e,t,n,s,r,a,o,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ui=class extends yn{constructor(e,t,n=ai,s,r,a,o=Jt,c=Jt,u,d=pi,f=1){if(d!==pi&&d!==as)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,s,r,a,o,c,d,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Vo=class extends Ui{constructor(e,t=ai,n=ss,s,r,a=Jt,o=Jt,c,u=pi){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,c,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fa=class extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},yr=class i extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],u=[],d=[],f=[],h=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(f,2));function v(A,p,m,I,L,M,w,T,P,y,R){let k=M/P,N=w/y,F=M/2,te=w/2,K=T/2,q=P+1,ee=y+1,j=0,ie=0,ue=new B;for(let ge=0;ge<ee;ge++){let fe=ge*N-te;for(let xe=0;xe<q;xe++){let Ce=xe*k-F;ue[A]=Ce*I,ue[p]=fe*L,ue[m]=K,u.push(ue.x,ue.y,ue.z),ue[A]=0,ue[p]=0,ue[m]=T>0?1:-1,d.push(ue.x,ue.y,ue.z),f.push(xe/P),f.push(1-ge/y),j+=1}}for(let ge=0;ge<y;ge++)for(let fe=0;fe<P;fe++){let xe=h+fe+q*ge,Ce=h+fe+q*(ge+1),ve=h+(fe+1)+q*(ge+1),Xe=h+(fe+1)+q*ge;c.push(xe,Ce,Xe),c.push(Ce,ve,Xe),ie+=6}o.addGroup(g,ie,R),g+=ie,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ps=class i extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),u=o+1,d=c+1,f=e/o,h=t/c,g=[],v=[],A=[],p=[];for(let m=0;m<d;m++){let I=m*h-a;for(let L=0;L<u;L++){let M=L*f-r;v.push(M,-I,0),A.push(0,0,1),p.push(L/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let I=0;I<o;I++){let L=I+u*m,M=I+u*(m+1),w=I+1+u*(m+1),T=I+1+u*m;g.push(L,M,T),g.push(M,w,T)}this.setIndex(g),this.setAttribute("position",new kt(v,3)),this.setAttribute("normal",new kt(A,3)),this.setAttribute("uv",new kt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var pa=class extends nn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new B,r=new B;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let u=0,d=c.length;u<d;++u){let f=c[u],h=f.start,g=f.count;for(let v=h,A=h+g;v<A;v+=3)for(let p=0;p<3;p++){let m=o.getX(v+p),I=o.getX(v+(p+1)%3);s.fromBufferAttribute(a,m),r.fromBufferAttribute(a,I),Bd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let u=0;u<3;u++){let d=3*o+u,f=3*o+(u+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,f),Bd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new kt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Bd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(zd(s))s.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(zd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function dn(i){let e={};for(let t=0;t<i.length;t++){let n=Ns(i[t]);for(let s in n)e[s]=n[s]}return e}function zd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function yg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Ia={clone:Ns,merge:dn},vg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vg,this.fragmentShader=bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=yg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new mt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Je().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ht().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ft().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ho=class extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Go=class extends Fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Wo=class extends Fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function go(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Ki=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Xo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pu,endingEnd:pu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case mu:r=e,o=2*t-n;break;case gu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case mu:a=e,c=2*n-t;break;case gu:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let u=(n-t)*.5,d=this.valueSize;this._weightPrev=u/(t-o),this._weightNext=u/(c-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,d=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,g=this._weightNext,v=(n-t)/(s-t),A=v*v,p=A*v,m=-h*p+2*h*A-h*v,I=(1+h)*p+(-1.5-2*h)*A+(-.5+h)*v+1,L=(-1-g)*p+(1.5+g)*A+.5*v,M=g*p-g*A;for(let w=0;w!==o;++w)r[w]=m*a[d+w]+I*a[u+w]+L*a[c+w]+M*a[f+w];return r}},$o=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,d=(n-t)/(s-t),f=1-d;for(let h=0;h!==o;++h)r[h]=a[u+h]*f+a[c+h]*d;return r}},qo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Yo=class extends Ki{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,d=this.inTangents,f=this.outTangents;if(!d||!f){let v=(n-t)/(s-t),A=1-v;for(let p=0;p!==o;++p)r[p]=a[u+p]*A+a[c+p]*v;return r}let h=o*2,g=e-1;for(let v=0;v!==o;++v){let A=a[u+v],p=a[c+v],m=g*h+v*2,I=f[m],L=f[m+1],M=e*h+v*2,w=d[M],T=d[M+1],P=(n-t)/(s-t),y,R,k,N,F;for(let te=0;te<8;te++){y=P*P,R=y*P,k=1-P,N=k*k,F=N*k;let q=F*t+3*N*P*I+3*k*y*w+R*s-n;if(Math.abs(q)<1e-10)break;let ee=3*N*(I-t)+6*k*P*(w-I)+3*y*(s-w);if(Math.abs(ee)<1e-10)break;P=P-q/ee,P=Math.max(0,Math.min(1,P))}r[v]=F*A+3*N*P*L+3*k*y*T+R*p}return r}},Bn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=go(t,this.TimeBufferType),this.values=go(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:go(e.times,Array),values:go(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ea:t=this.InterpolantFactoryMethodDiscrete;break;case Lo:t=this.InterpolantFactoryMethodLinear;break;case vo:t=this.InterpolantFactoryMethodSmooth;break;case fu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return tt("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return Lo;case this.InterpolantFactoryMethodSmooth:return vo;case this.InterpolantFactoryMethodBezier:return fu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(rt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){rt("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){rt("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Bm(s))for(let o=0,c=s.length;o!==c;++o){let u=s[o];if(isNaN(u)){rt("KeyframeTrack: Value is not a valid number.",this,o,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===vo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,u=e[o],d=e[o+1];if(u!==d&&(o!==1||u!==e[0]))if(s)c=!0;else{let f=o*n,h=f-n,g=f+n;for(let v=0;v!==n;++v){let A=t[f+v];if(A!==t[h+v]||A!==t[g+v]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,h=a*n;for(let g=0;g!==n;++g)t[h+g]=t[f+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,u=0;u!==n;++u)t[c+u]=t[o+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=Lo;var Qi=class extends Bn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=ea;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};Zo.prototype.ValueTypeName="color";var jo=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};jo.prototype.ValueTypeName="number";var Jo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),u=e*o;for(let d=u+o;u!==d;u+=4)Fn.slerpFlat(r,0,a,u-o,a,u,c);return r}},ma=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Jo(this.times,this.values,this.getValueSize(),e)}};ma.prototype.ValueTypeName="quaternion";ma.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends Bn{constructor(e,t,n){super(e,t,n)}};es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=ea;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;var Ko=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};Ko.prototype.ValueTypeName="vector";var Qo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,f){return u.push(d,f),this},this.removeHandler=function(d){let f=u.indexOf(d);return f!==-1&&u.splice(f,2),this},this.getHandler=function(d){for(let f=0,h=u.length;f<h;f+=2){let g=u[f],v=u[f+1];if(g.global&&(g.lastIndex=0),g.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},If=new Qo,el=class{constructor(e){this.manager=e!==void 0?e:If,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};el.DEFAULT_MATERIAL_NAME="__DEFAULT";var _o=new B,xo=new Fn,di=new B,ga=class extends Tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_o,xo,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,xo,di.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_o,xo,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,xo,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Yi=new B,kd=new Je,Vd=new Je,en=class extends ga{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,kd,Vd),t.subVectors(Vd,kd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Kr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/u,s*=a.width/c,n*=a.height/u}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ls=class extends ga{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var _a=class extends nn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var or=-90,lr=1,tl=class extends Tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new en(or,lr,e,t);s.layers=this.layers,this.add(s);let r=new en(or,lr,e,t);r.layers=this.layers,this.add(r);let a=new en(or,lr,e,t);a.layers=this.layers,this.add(a);let o=new en(or,lr,e,t);o.layers=this.layers,this.add(o);let c=new en(or,lr,e,t);c.layers=this.layers,this.add(c);let u=new en(or,lr,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let u of t)this.remove(u);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,u,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,h,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},nl=class extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Xu="\\[\\]\\.:\\/",Sg=new RegExp("["+Xu+"]","g"),$u="[^"+Xu+"]",Mg="[^"+Xu.replace("\\.","")+"]",Eg=/((?:WC+[\/:])*)/.source.replace("WC",$u),wg=/(WCOD+)?/.source.replace("WCOD",Mg),Ag=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$u),Tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$u),Cg=new RegExp("^"+Eg+wg+Ag+Tg+"$"),Rg=["material","materials","bones","map"],xu=class{constructor(e,t,n){let s=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Sg,"")}static parseTrackName(e){let t=Cg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Rg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){tt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===u){u=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}let a=e[s];if(a===void 0){let u=t.nodeName;rt("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=xu;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qv=new Float32Array(1);var ts=class extends ca{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Hd=new Ft,xa=class{constructor(e,t,n=0,s=1/0){this.ray=new Ji(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):rt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hd),this}intersectObject(e,t=!0,n=[]){return yu(e,this,n,t),n.sort(Gd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)yu(e[s],this,n,t);return n.sort(Gd),n}};function Gd(i,e){return i.distance-e.distance}function yu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)yu(r[a],e,t,!0)}}var vr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=dt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(dt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ku=class Ku{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Ku.prototype.isMatrix2=!0;var vu=Ku;var Wd=new B,yo=new B,cr=new B,ur=new B,du=new B,Ig=new B,Pg=new B,ya=class{constructor(e=new B,t=new B){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Wd.subVectors(e,this.start),yo.subVectors(this.end,this.start);let n=yo.dot(yo);if(n===0)return 0;let r=yo.dot(Wd)/n;return t&&(r=dt(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Ig,n=Pg){let s=10000000000000001e-32,r,a,o=this.start,c=e.start,u=this.end,d=e.end;cr.subVectors(u,o),ur.subVectors(d,c),du.subVectors(o,c);let f=cr.dot(cr),h=ur.dot(ur),g=ur.dot(du);if(f<=s&&h<=s)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(f<=s)r=0,a=g/h,a=dt(a,0,1);else{let v=cr.dot(du);if(h<=s)a=0,r=dt(-v/f,0,1);else{let A=cr.dot(ur),p=f*h-A*A;p!==0?r=dt((A*g-v*h)/p,0,1):r=0,a=(A*r+g)/h,a<0?(a=0,r=dt(-v/f,0,1)):a>1&&(a=1,r=dt((A-v)/f,0,1))}}return t.copy(o).addScaledVector(cr,r),n.copy(c).addScaledVector(ur,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var va=class extends si{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){tt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function qu(i,e,t,n){let s=Lg(n);switch(t){case Bu:return i*e;case ku:return i*e/s.components*s.byteLength;case ul:return i*e/s.components*s.byteLength;case os:return i*e*2/s.components*s.byteLength;case hl:return i*e*2/s.components*s.byteLength;case zu:return i*e*3/s.components*s.byteLength;case qn:return i*e*4/s.components*s.byteLength;case dl:return i*e*4/s.components*s.byteLength;case Ea:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:case gl:return Math.max(i,16)*Math.max(e,8)/4;case fl:case ml:return Math.max(i,8)*Math.max(e,8)/2;case _l:case xl:case vl:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yl:case Ca:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ol:case Bl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kl:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ra:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lg(i){switch(i){case zn:case Nu:return{byteLength:1,components:1};case Sr:case Fu:case gi:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case ai:case ol:case oi:return{byteLength:4,components:1};case Uu:case Ou:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Qf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ng(i){let e=new WeakMap;function t(o,c){let u=o.array,d=o.usage,f=u.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,u,d),o.onUploadCallback();let g;if(u instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)g=i.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=i.SHORT;else if(u instanceof Uint32Array)g=i.UNSIGNED_INT;else if(u instanceof Int32Array)g=i.INT;else if(u instanceof Int8Array)g=i.BYTE;else if(u instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,u){let d=c.array,f=c.updateRanges;if(i.bindBuffer(u,o),f.length===0)i.bufferSubData(u,0,d);else{f.sort((g,v)=>g.start-v.start);let h=0;for(let g=1;g<f.length;g++){let v=f[h],A=f[g];A.start<=v.start+v.count+1?v.count=Math.max(v.count,A.start+A.count-v.start):(++h,f[h]=A)}f.length=h+1;for(let g=0,v=f.length;g<v;g++){let A=f[g];i.bufferSubData(u,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let u=e.get(o);if(u===void 0)e.set(o,t(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,c),u.version=o.version}}return{get:s,remove:r,update:a}}var Fg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ug=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Og=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Wg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,e_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,t_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,n_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,i_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,s_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,r_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,a_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,l_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,c_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,h_="gl_FragColor = linearToOutputTexel( gl_FragColor );",d_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,f_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,p_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,g_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,__=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,x_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,y_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,b_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,M_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,w_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,A_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,T_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,C_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,P_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,D_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,F_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,U_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,B_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,z_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,X_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,K_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,e0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,s0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,r0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,c0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,u0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,h0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,m0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,g0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,x0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,v0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,b0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,S0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,M0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,w0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,R0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,I0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,N0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,F0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,H0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,G0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,W0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Z0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,j0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ex=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ix=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ax=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN

		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;

	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ux=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,px=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:Fg,alphahash_pars_fragment:Ug,alphamap_fragment:Og,alphamap_pars_fragment:Bg,alphatest_fragment:zg,alphatest_pars_fragment:kg,aomap_fragment:Vg,aomap_pars_fragment:Hg,batching_pars_vertex:Gg,batching_vertex:Wg,begin_vertex:Xg,beginnormal_vertex:$g,bsdfs:qg,iridescence_fragment:Yg,bumpmap_pars_fragment:Zg,clipping_planes_fragment:jg,clipping_planes_pars_fragment:Jg,clipping_planes_pars_vertex:Kg,clipping_planes_vertex:Qg,color_fragment:e_,color_pars_fragment:t_,color_pars_vertex:n_,color_vertex:i_,common:s_,cube_uv_reflection_fragment:r_,defaultnormal_vertex:a_,displacementmap_pars_vertex:o_,displacementmap_vertex:l_,emissivemap_fragment:c_,emissivemap_pars_fragment:u_,colorspace_fragment:h_,colorspace_pars_fragment:d_,envmap_fragment:f_,envmap_common_pars_fragment:p_,envmap_pars_fragment:m_,envmap_pars_vertex:g_,envmap_physical_pars_fragment:T_,envmap_vertex:__,fog_vertex:x_,fog_pars_vertex:y_,fog_fragment:v_,fog_pars_fragment:b_,gradientmap_pars_fragment:S_,lightmap_pars_fragment:M_,lights_lambert_fragment:E_,lights_lambert_pars_fragment:w_,lights_pars_begin:A_,lights_toon_fragment:C_,lights_toon_pars_fragment:R_,lights_phong_fragment:I_,lights_phong_pars_fragment:P_,lights_physical_fragment:L_,lights_physical_pars_fragment:D_,lights_fragment_begin:N_,lights_fragment_maps:F_,lights_fragment_end:U_,lightprobes_pars_fragment:O_,logdepthbuf_fragment:B_,logdepthbuf_pars_fragment:z_,logdepthbuf_pars_vertex:k_,logdepthbuf_vertex:V_,map_fragment:H_,map_pars_fragment:G_,map_particle_fragment:W_,map_particle_pars_fragment:X_,metalnessmap_fragment:$_,metalnessmap_pars_fragment:q_,morphinstance_vertex:Y_,morphcolor_vertex:Z_,morphnormal_vertex:j_,morphtarget_pars_vertex:J_,morphtarget_vertex:K_,normal_fragment_begin:Q_,normal_fragment_maps:e0,normal_pars_fragment:t0,normal_pars_vertex:n0,normal_vertex:i0,normalmap_pars_fragment:s0,clearcoat_normal_fragment_begin:r0,clearcoat_normal_fragment_maps:a0,clearcoat_pars_fragment:o0,iridescence_pars_fragment:l0,opaque_fragment:c0,packing:u0,premultiplied_alpha_fragment:h0,project_vertex:d0,dithering_fragment:f0,dithering_pars_fragment:p0,roughnessmap_fragment:m0,roughnessmap_pars_fragment:g0,shadowmap_pars_fragment:_0,shadowmap_pars_vertex:x0,shadowmap_vertex:y0,shadowmask_pars_fragment:v0,skinbase_vertex:b0,skinning_pars_vertex:S0,skinning_vertex:M0,skinnormal_vertex:E0,specularmap_fragment:w0,specularmap_pars_fragment:A0,tonemapping_fragment:T0,tonemapping_pars_fragment:C0,transmission_fragment:R0,transmission_pars_fragment:I0,uv_pars_fragment:P0,uv_pars_vertex:L0,uv_vertex:D0,worldpos_vertex:N0,background_vert:F0,background_frag:U0,backgroundCube_vert:O0,backgroundCube_frag:B0,cube_vert:z0,cube_frag:k0,depth_vert:V0,depth_frag:H0,distance_vert:G0,distance_frag:W0,equirect_vert:X0,equirect_frag:$0,linedashed_vert:q0,linedashed_frag:Y0,meshbasic_vert:Z0,meshbasic_frag:j0,meshlambert_vert:J0,meshlambert_frag:K0,meshmatcap_vert:Q0,meshmatcap_frag:ex,meshnormal_vert:tx,meshnormal_frag:nx,meshphong_vert:ix,meshphong_frag:sx,meshphysical_vert:rx,meshphysical_frag:ax,meshtoon_vert:ox,meshtoon_frag:lx,points_vert:cx,points_frag:ux,shadow_vert:hx,shadow_frag:dx,sprite_vert:fx,sprite_frag:px},Ne={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},Mn={basic:{uniforms:dn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:dn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:dn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:dn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:dn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new mt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:dn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:dn([Ne.points,Ne.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:dn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:dn([Ne.common,Ne.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:dn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:dn([Ne.sprite,Ne.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:dn([Ne.common,Ne.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:dn([Ne.lights,Ne.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Mn.physical={uniforms:dn([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var Xl={r:0,b:0,g:0},mx=new Ft,ep=new ht;ep.set(-1,0,0,0,1,0,0,0,1);function gx(i,e,t,n,s,r){let a=new mt(0),o=s===!0?0:1,c,u,d=null,f=0,h=null;function g(I){let L=I.isScene===!0?I.background:null;if(L&&L.isTexture){let M=I.backgroundBlurriness>0;L=e.get(L,M)}return L}function v(I){let L=!1,M=g(I);M===null?p(a,o):M&&M.isColor&&(p(M,1),L=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(I,L){let M=g(L);M&&(M.isCubeTexture||M.mapping===Sa)?(u===void 0&&(u=new sn(new yr(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Ns(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),u.material.uniforms.envMap.value=M,u.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(mx.makeRotationFromEuler(L.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(ep),u.material.toneMapped=_t.getTransfer(M.colorSpace)!==Et,(d!==M||f!==M.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,h=i.toneMapping),u.layers.enableAll(),I.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new sn(new Ps(2,2),new bn({name:"BackgroundMaterial",uniforms:Ns(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.toneMapped=_t.getTransfer(M.colorSpace)!==Et,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,h=i.toneMapping),c.layers.enableAll(),I.unshift(c,c.geometry,c.material,0,0,null))}function p(I,L){I.getRGB(Xl,Wu(i)),t.buffers.color.setClear(Xl.r,Xl.g,Xl.b,L,r)}function m(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(I,L=1){a.set(I),o=L,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(I){o=I,p(a,o)},render:v,addToRenderList:A,dispose:m}}function _x(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(N,F,te,K,q){let ee=!1,j=f(N,K,te,F);r!==j&&(r=j,u(r.object)),ee=g(N,K,te,q),ee&&v(N,K,te,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,M(N,F,te,K),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function u(N){return i.bindVertexArray(N)}function d(N){return i.deleteVertexArray(N)}function f(N,F,te,K){let q=K.wireframe===!0,ee=n[F.id];ee===void 0&&(ee={},n[F.id]=ee);let j=N.isInstancedMesh===!0?N.id:0,ie=ee[j];ie===void 0&&(ie={},ee[j]=ie);let ue=ie[te.id];ue===void 0&&(ue={},ie[te.id]=ue);let ge=ue[q];return ge===void 0&&(ge=h(c()),ue[q]=ge),ge}function h(N){let F=[],te=[],K=[];for(let q=0;q<t;q++)F[q]=0,te[q]=0,K[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:te,attributeDivisors:K,object:N,attributes:{},index:null}}function g(N,F,te,K){let q=r.attributes,ee=F.attributes,j=0,ie=te.getAttributes();for(let ue in ie)if(ie[ue].location>=0){let fe=q[ue],xe=ee[ue];if(xe===void 0&&(ue==="instanceMatrix"&&N.instanceMatrix&&(xe=N.instanceMatrix),ue==="instanceColor"&&N.instanceColor&&(xe=N.instanceColor)),fe===void 0||fe.attribute!==xe||xe&&fe.data!==xe.data)return!0;j++}return r.attributesNum!==j||r.index!==K}function v(N,F,te,K){let q={},ee=F.attributes,j=0,ie=te.getAttributes();for(let ue in ie)if(ie[ue].location>=0){let fe=ee[ue];fe===void 0&&(ue==="instanceMatrix"&&N.instanceMatrix&&(fe=N.instanceMatrix),ue==="instanceColor"&&N.instanceColor&&(fe=N.instanceColor));let xe={};xe.attribute=fe,fe&&fe.data&&(xe.data=fe.data),q[ue]=xe,j++}r.attributes=q,r.attributesNum=j,r.index=K}function A(){let N=r.newAttributes;for(let F=0,te=N.length;F<te;F++)N[F]=0}function p(N){m(N,0)}function m(N,F){let te=r.newAttributes,K=r.enabledAttributes,q=r.attributeDivisors;te[N]=1,K[N]===0&&(i.enableVertexAttribArray(N),K[N]=1),q[N]!==F&&(i.vertexAttribDivisor(N,F),q[N]=F)}function I(){let N=r.newAttributes,F=r.enabledAttributes;for(let te=0,K=F.length;te<K;te++)F[te]!==N[te]&&(i.disableVertexAttribArray(te),F[te]=0)}function L(N,F,te,K,q,ee,j){j===!0?i.vertexAttribIPointer(N,F,te,q,ee):i.vertexAttribPointer(N,F,te,K,q,ee)}function M(N,F,te,K){A();let q=K.attributes,ee=te.getAttributes(),j=F.defaultAttributeValues;for(let ie in ee){let ue=ee[ie];if(ue.location>=0){let ge=q[ie];if(ge===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(ge=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(ge=N.instanceColor)),ge!==void 0){let fe=ge.normalized,xe=ge.itemSize,Ce=e.get(ge);if(Ce===void 0)continue;let ve=Ce.buffer,Xe=Ce.type,se=Ce.bytesPerElement,Se=Xe===i.INT||Xe===i.UNSIGNED_INT||ge.gpuType===ol;if(ge.isInterleavedBufferAttribute){let me=ge.data,ze=me.stride,it=ge.offset;if(me.isInstancedInterleavedBuffer){for(let He=0;He<ue.locationSize;He++)m(ue.location+He,me.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let He=0;He<ue.locationSize;He++)p(ue.location+He);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let He=0;He<ue.locationSize;He++)L(ue.location+He,xe/ue.locationSize,Xe,fe,ze*se,(it+xe/ue.locationSize*He)*se,Se)}else{if(ge.isInstancedBufferAttribute){for(let me=0;me<ue.locationSize;me++)m(ue.location+me,ge.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let me=0;me<ue.locationSize;me++)p(ue.location+me);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let me=0;me<ue.locationSize;me++)L(ue.location+me,xe/ue.locationSize,Xe,fe,xe*se,xe/ue.locationSize*me*se,Se)}}else if(j!==void 0){let fe=j[ie];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(ue.location,fe);break;case 3:i.vertexAttrib3fv(ue.location,fe);break;case 4:i.vertexAttrib4fv(ue.location,fe);break;default:i.vertexAttrib1fv(ue.location,fe)}}}}I()}function w(){R();for(let N in n){let F=n[N];for(let te in F){let K=F[te];for(let q in K){let ee=K[q];for(let j in ee)d(ee[j].object),delete ee[j];delete K[q]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;let F=n[N.id];for(let te in F){let K=F[te];for(let q in K){let ee=K[q];for(let j in ee)d(ee[j].object),delete ee[j];delete K[q]}}delete n[N.id]}function P(N){for(let F in n){let te=n[F];for(let K in te){let q=te[K];if(q[N.id]===void 0)continue;let ee=q[N.id];for(let j in ee)d(ee[j].object),delete ee[j];delete q[N.id]}}}function y(N){for(let F in n){let te=n[F],K=N.isInstancedMesh===!0?N.id:0,q=te[K];if(q!==void 0){for(let ee in q){let j=q[ee];for(let ie in j)d(j[ie].object),delete j[ie];delete q[ee]}delete te[K],Object.keys(te).length===0&&delete n[F]}}}function R(){k(),a=!0,r!==s&&(r=s,u(r.object))}function k(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:A,enableAttribute:p,disableUnusedAttributes:I}}function xx(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function yx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==qn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==zn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==oi&&!y)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp",d=c(u);d!==u&&(tt("WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),I=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:v,maxTextureSize:A,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:I,maxVaryings:L,maxFragmentUniforms:M,maxSamples:w,samples:T}}function vx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Wn,o=new ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let g=f.length!==0||h||n!==0||s;return s=h,n=f.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=d(f,h,0)},this.setState=function(f,h,g){let v=f.clippingPlanes,A=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!s||v===null||v.length===0||r&&!p)r?d(null):u();else{let I=r?0:n,L=I*4,M=m.clippingState||null;c.value=M,M=d(v,h,L,g);for(let w=0;w!==L;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=I}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(f,h,g,v){let A=f!==null?f.length:0,p=null;if(A!==0){if(p=c.value,v!==!0||p===null){let m=g+A*4,I=h.matrixWorldInverse;o.getNormalMatrix(I),(p===null||p.length<m)&&(p=new Float32Array(m));for(let L=0,M=g;L!==A;++L,M+=4)a.copy(f[L]).applyMatrix4(I,o),a.normal.toArray(p,M),p[M+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,p}}var ls=4,Pf=[.125,.215,.35,.446,.526,.582],Fs=20,bx=256,Pa=new Ls,Lf=new mt,Qu=null,eh=0,th=0,nh=!1,Sx=new B,ql=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Sx}=r;Qu=this._renderer.getRenderTarget(),eh=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qu,eh,th),this._renderer.xr.enabled=nh,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qu=this._renderer.getRenderTarget(),eh=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:gi,format:qn,colorSpace:ta,depthBuffer:!1},s=Df(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Df(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Mx(r)),this._blurMaterial=wx(r,e,t),this._ggxMaterial=Ex(r,e,t)}return s}_compileMaterial(e){let t=new sn(new nn,e);this._renderer.compile(t,Pa)}_sceneToCubeUV(e,t,n,s,r){let c=new en(90,1,t,n),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,g=f.toneMapping;f.getClearColor(Lf),f.toneMapping=ri,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new sn(new yr,new Rs({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,p=A.material,m=!1,I=e.background;I?I.isColor&&(p.color.copy(I),e.background=null,m=!0):(p.color.copy(Lf),m=!0);for(let L=0;L<6;L++){let M=L%3;M===0?(c.up.set(0,u[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[L],r.y,r.z)):M===1?(c.up.set(0,0,u[L]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[L],r.z)):(c.up.set(0,u[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[L]));let w=this._cubeSize;Er(s,M*w,L>2?w:0,w,w),f.setRenderTarget(s),m&&f.render(A,c),f.render(e,c)}f.toneMapping=g,f.autoClear=h,e.background=I}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ss||e.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Pa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,u=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(u*u-d*d),h=0+u*1.25,g=f*h,{_lodMax:v}=this,A=this._sizeLods[n],p=3*A*(n>v-ls?n-v+ls:0),m=4*(this._cubeSize-A);c.envMap.value=e.texture,c.roughness.value=g,c.mipInt.value=v-t,Er(r,p,m,3*A,2*A),s.setRenderTarget(r),s.render(o,Pa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-n,Er(e,p,m,3*A,2*A),s.setRenderTarget(e),s.render(o,Pa)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&rt("blur direction must be either latitudinal or longitudinal!");let d=3,f=this._lodMeshes[s];f.material=u;let h=u.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Fs-1),A=r/v,p=isFinite(r)?1+Math.floor(d*A):Fs;p>Fs&&tt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Fs}`);let m=[],I=0;for(let P=0;P<Fs;++P){let y=P/A,R=Math.exp(-y*y/2);m.push(R),P===0?I+=R:P<p&&(I+=2*R)}for(let P=0;P<m.length;P++)m[P]=m[P]/I;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:L}=this;h.dTheta.value=v,h.mipInt.value=L-n;let M=this._sizeLods[s],w=3*M*(s>L-ls?s-L+ls:0),T=4*(this._cubeSize-M);Er(t,w,T,3*M,2*M),c.setRenderTarget(t),c.render(f,Pa)}};function Mx(i){let e=[],t=[],n=[],s=i,r=i-ls+1+Pf.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ls?c=Pf[a-i+ls-1]:a===0&&(c=0),t.push(c);let u=1/(o-2),d=-u,f=1+u,h=[d,d,f,d,f,f,d,d,f,f,d,f],g=6,v=6,A=3,p=2,m=1,I=new Float32Array(A*v*g),L=new Float32Array(p*v*g),M=new Float32Array(m*v*g);for(let T=0;T<g;T++){let P=T%3*2/3-1,y=T>2?0:-1,R=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];I.set(R,A*v*T),L.set(h,p*v*T);let k=[T,T,T,T,T,T];M.set(k,m*v*T)}let w=new nn;w.setAttribute("position",new An(I,A)),w.setAttribute("uv",new An(L,p)),w.setAttribute("faceIndex",new An(M,m)),n.push(new sn(w,null)),s>ls&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Df(i,e,t){let n=new Un(i,e,t);return n.texture.mapping=Sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ex(i,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function wx(i,e,t){let n=new Float32Array(Fs),s=new B(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Nf(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ff(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Zl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Yl=class extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new da(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yr(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:mi});r.uniforms.tEquirect.value=t;let a=new sn(s,r),o=t.minFilter;return t.minFilter===rs&&(t.minFilter=tn),new tl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Ax(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){let g=h.mapping;if(g===sl||g===rl)if(e.has(h)){let v=e.get(h).texture;return o(v,h.mapping)}else{let v=h.image;if(v&&v.height>0){let A=new Yl(v.height);return A.fromEquirectangularTexture(i,h),e.set(h,A),h.addEventListener("dispose",u),o(A.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let g=h.mapping,v=g===sl||g===rl,A=g===ss||g===Ds;if(v||A){let p=t.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new ql(i)),p=v?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let I=h.image;return v&&I&&I.height>0||A&&I&&c(I)?(n===null&&(n=new ql(i)),p=v?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",d),p.texture):null}}}return h}function o(h,g){return g===sl?h.mapping=ss:g===rl&&(h.mapping=Ds),h}function c(h){let g=0,v=6;for(let A=0;A<v;A++)h[A]!==void 0&&g++;return g===v}function u(h){let g=h.target;g.removeEventListener("dispose",u);let v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function d(h){let g=h.target;g.removeEventListener("dispose",d);let v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Tx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Es("WebGLRenderer: "+n+" extension not supported."),s}}}function Cx(i,e,t,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let g=r.get(h);g&&(e.remove(g),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(f){let h=f.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER)}function u(f){let h=[],g=f.index,v=f.attributes.position,A=0;if(v===void 0)return;if(g!==null){let I=g.array;A=g.version;for(let L=0,M=I.length;L<M;L+=3){let w=I[L+0],T=I[L+1],P=I[L+2];h.push(w,T,T,P,P,w)}}else{let I=v.array;A=v.version;for(let L=0,M=I.length/3-1;L<M;L+=3){let w=L+0,T=L+1,P=L+2;h.push(w,T,T,P,P,w)}}let p=new(v.count>=65535?la:oa)(h,1);p.version=A;let m=r.get(f);m&&e.remove(m),r.set(f,p)}function d(f){let h=r.get(f);if(h){let g=f.index;g!==null&&h.version<g.version&&u(f)}else u(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:d}}function Rx(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*a),t.update(h,n,1)}function u(f,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,f*a,g),t.update(h,n,g))}function d(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,g);let A=0;for(let p=0;p<g;p++)A+=h[p];t.update(A,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=d}function Ix(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Px(i,e,t){let n=new WeakMap,s=new It;function r(a,o,c){let u=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,h=n.get(o);if(h===void 0||h.count!==f){let R=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",R)};h!==void 0&&h.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,A=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],I=o.morphAttributes.color||[],L=0;g===!0&&(L=1),v===!0&&(L=2),A===!0&&(L=3);let M=o.attributes.position.count*L,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let T=new Float32Array(M*w*4*f),P=new aa(T,M,w,f);P.type=oi,P.needsUpdate=!0;let y=L*4;for(let k=0;k<f;k++){let N=p[k],F=m[k],te=I[k],K=M*w*4*k;for(let q=0;q<N.count;q++){let ee=q*y;g===!0&&(s.fromBufferAttribute(N,q),T[K+ee+0]=s.x,T[K+ee+1]=s.y,T[K+ee+2]=s.z,T[K+ee+3]=0),v===!0&&(s.fromBufferAttribute(F,q),T[K+ee+4]=s.x,T[K+ee+5]=s.y,T[K+ee+6]=s.z,T[K+ee+7]=0),A===!0&&(s.fromBufferAttribute(te,q),T[K+ee+8]=s.x,T[K+ee+9]=s.y,T[K+ee+10]=s.z,T[K+ee+11]=te.itemSize===4?s.w:1)}}h={count:f,texture:P,size:new Je(M,w)},n.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let A=0;A<u.length;A++)g+=u[A];let v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",u)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lx(i,e,t,n,s){let r=new WeakMap;function a(u){let d=s.render.frame,f=u.geometry,h=e.get(u,f);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),r.get(u)!==d&&(t.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,i.ARRAY_BUFFER),r.set(u,d))),u.isSkinnedMesh){let g=u.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return h}function o(){r=new WeakMap}function c(u){let d=u.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var Dx={[Au]:"LINEAR_TONE_MAPPING",[Tu]:"REINHARD_TONE_MAPPING",[Cu]:"CINEON_TONE_MAPPING",[Ru]:"ACES_FILMIC_TONE_MAPPING",[Pu]:"AGX_TONE_MAPPING",[Lu]:"NEUTRAL_TONE_MAPPING",[Iu]:"CUSTOM_TONE_MAPPING"};function Nx(i,e,t,n,s,r){let a=new Un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ui(e,t):void 0}),o=new Un(e,t,{type:gi,depthBuffer:!1,stencilBuffer:!1}),c=new nn;c.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new kt([0,2,0,0,2,0],2));let u=new Ho({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new sn(c,u),f=new Ls(-1,1,1,-1,0,1),h=null,g=null,v=!1,A,p=null,m=[],I=!1;this.setSize=function(L,M){a.setSize(L,M),o.setSize(L,M);for(let w=0;w<m.length;w++){let T=m[w];T.setSize&&T.setSize(L,M)}},this.setEffects=function(L){m=L,I=m.length>0&&m[0].isRenderPass===!0;let M=a.width,w=a.height;for(let T=0;T<m.length;T++){let P=m[T];P.setSize&&P.setSize(M,w)}},this.begin=function(L,M){if(v||L.toneMapping===ri&&m.length===0)return!1;if(p=M,M!==null){let w=M.width,T=M.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return I===!1&&L.setRenderTarget(a),A=L.toneMapping,L.toneMapping=ri,!0},this.hasRenderPass=function(){return I},this.end=function(L,M){L.toneMapping=A,v=!0;let w=a,T=o;for(let P=0;P<m.length;P++){let y=m[P];if(y.enabled!==!1&&(y.render(L,T,w,M),y.needsSwap!==!1)){let R=w;w=T,T=R}}if(h!==L.outputColorSpace||g!==L.toneMapping){h=L.outputColorSpace,g=L.toneMapping,u.defines={},_t.getTransfer(h)===Et&&(u.defines.SRGB_TRANSFER="");let P=Dx[g];P&&(u.defines[P]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,L.setRenderTarget(p),L.render(d,f),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),u.dispose()}}var tp=new yn,rh=new Ui(1,1),np=new aa,ip=new Uo,sp=new da,Uf=[],Of=[],Bf=new Float32Array(16),zf=new Float32Array(9),kf=new Float32Array(4);function Tr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Uf[s];if(r===void 0&&(r=new Float32Array(s),Uf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function qt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jl(i,e){let t=Of[e];t===void 0&&(t=new Int32Array(e),Of[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ux(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2fv(this.addr,e),Yt(t,e)}}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;i.uniform3fv(this.addr,e),Yt(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4fv(this.addr,e),Yt(t,e)}}function zx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;kf.set(n),i.uniformMatrix2fv(this.addr,!1,kf),Yt(t,n)}}function kx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;zf.set(n),i.uniformMatrix3fv(this.addr,!1,zf),Yt(t,n)}}function Vx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Bf.set(n),i.uniformMatrix4fv(this.addr,!1,Bf),Yt(t,n)}}function Hx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2iv(this.addr,e),Yt(t,e)}}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3iv(this.addr,e),Yt(t,e)}}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4iv(this.addr,e),Yt(t,e)}}function $x(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2uiv(this.addr,e),Yt(t,e)}}function Yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3uiv(this.addr,e),Yt(t,e)}}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4uiv(this.addr,e),Yt(t,e)}}function jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rh.compareFunction=t.isReversedDepthBuffer()?Wl:Gl,r=rh):r=tp,t.setTexture2D(e||r,s)}function Jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ip,s)}function Kx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sp,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||np,s)}function ey(i){switch(i){case 5126:return Fx;case 35664:return Ux;case 35665:return Ox;case 35666:return Bx;case 35674:return zx;case 35675:return kx;case 35676:return Vx;case 5124:case 35670:return Hx;case 35667:case 35671:return Gx;case 35668:case 35672:return Wx;case 35669:case 35673:return Xx;case 5125:return $x;case 36294:return qx;case 36295:return Yx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return jx;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Qx}}function ty(i,e){i.uniform1fv(this.addr,e)}function ny(i,e){let t=Tr(e,this.size,2);i.uniform2fv(this.addr,t)}function iy(i,e){let t=Tr(e,this.size,3);i.uniform3fv(this.addr,t)}function sy(i,e){let t=Tr(e,this.size,4);i.uniform4fv(this.addr,t)}function ry(i,e){let t=Tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ay(i,e){let t=Tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function oy(i,e){let t=Tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ly(i,e){i.uniform1iv(this.addr,e)}function cy(i,e){i.uniform2iv(this.addr,e)}function uy(i,e){i.uniform3iv(this.addr,e)}function hy(i,e){i.uniform4iv(this.addr,e)}function dy(i,e){i.uniform1uiv(this.addr,e)}function fy(i,e){i.uniform2uiv(this.addr,e)}function py(i,e){i.uniform3uiv(this.addr,e)}function my(i,e){i.uniform4uiv(this.addr,e)}function gy(i,e,t){let n=this.cache,s=e.length,r=jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=rh:a=tp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function _y(i,e,t){let n=this.cache,s=e.length,r=jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ip,r[a])}function xy(i,e,t){let n=this.cache,s=e.length,r=jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||sp,r[a])}function yy(i,e,t){let n=this.cache,s=e.length,r=jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||np,r[a])}function vy(i){switch(i){case 5126:return ty;case 35664:return ny;case 35665:return iy;case 35666:return sy;case 35674:return ry;case 35675:return ay;case 35676:return oy;case 5124:case 35670:return ly;case 35667:case 35671:return cy;case 35668:case 35672:return uy;case 35669:case 35673:return hy;case 5125:return dy;case 36294:return fy;case 36295:return py;case 36296:return my;case 35678:case 36198:case 36298:case 36306:case 35682:return gy;case 35679:case 36299:case 36307:return _y;case 35680:case 36300:case 36308:case 36293:return xy;case 36289:case 36303:case 36311:case 36292:return yy}}var ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ey(t.type)}},oh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}},lh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ih=/(\w+)(\])?(\[|\.)?/g;function Vf(i,e){i.seq.push(e),i.map[e.id]=e}function by(i,e,t){let n=i.name,s=n.length;for(ih.lastIndex=0;;){let r=ih.exec(n),a=ih.lastIndex,o=r[1],c=r[2]==="]",u=r[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===s){Vf(t,u===void 0?new ah(o,i,e):new oh(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new lh(o),Vf(t,f)),t=f}}}var wr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);by(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Hf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Sy=37297,My=0;function Ey(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Gf=new ht;function wy(i){_t._getMatrix(Gf,_t.workingColorSpace,i);let e=`mat3( ${Gf.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(i)){case na:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ey(i.getShaderSource(e),o)}else return r}function Ay(i,e){let t=wy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Ty={[Au]:"Linear",[Tu]:"Reinhard",[Cu]:"Cineon",[Ru]:"ACESFilmic",[Pu]:"AgX",[Lu]:"Neutral",[Iu]:"Custom"};function Cy(i,e){let t=Ty[e];return t===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $l=new B;function Ry(){_t.getLuminanceCoefficients($l);let i=$l.x.toFixed(4),e=$l.y.toFixed(4),t=$l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Iy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Da).join(`
`)}function Py(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ly(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Da(i){return i!==""}function Xf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $f(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Dy=/^[ \t]*#include +<([\w\d./]+)>/gm;function ch(i){return i.replace(Dy,Fy)}var Ny=new Map;function Fy(i,e){let t=pt[e];if(t===void 0){let n=Ny.get(e);if(n!==void 0)t=pt[n],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ch(t)}var Uy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qf(i){return i.replace(Uy,Oy)}function Oy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var By={[ba]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function zy(i){return By[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ky={[ss]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE",[Sa]:"ENVMAP_TYPE_CUBE_UV"};function Vy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ky[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Hy={[Ds]:"ENVMAP_MODE_REFRACTION"};function Gy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Hy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wy={[wu]:"ENVMAP_BLENDING_MULTIPLY",[ff]:"ENVMAP_BLENDING_MIX",[pf]:"ENVMAP_BLENDING_ADD"};function Xy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wy[i.combine]||"ENVMAP_BLENDING_NONE"}function $y(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function qy(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=zy(t),u=Vy(t),d=Gy(t),f=Xy(t),h=$y(t),g=Iy(t),v=Py(r),A=s.createProgram(),p,m,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Da).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Da).join(`
`),m.length>0&&(m+=`
`)):(p=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Da).join(`
`),m=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?pt.tonemapping_pars_fragment:"",t.toneMapping!==ri?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,Ay("linearToOutputTexel",t.outputColorSpace),Ry(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Da).join(`
`)),a=ch(a),a=Xf(a,t),a=$f(a,t),o=ch(o),o=Xf(o,t),o=$f(o,t),a=qf(a),o=qf(o),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let L=I+p+a,M=I+m+o,w=Hf(s,s.VERTEX_SHADER,L),T=Hf(s,s.FRAGMENT_SHADER,M);s.attachShader(A,w),s.attachShader(A,T),t.index0AttributeName!==void 0?s.bindAttribLocation(A,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function P(N){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(A)||"",te=s.getShaderInfoLog(w)||"",K=s.getShaderInfoLog(T)||"",q=F.trim(),ee=te.trim(),j=K.trim(),ie=!0,ue=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,A,w,T);else{let ge=Wf(s,w,"vertex"),fe=Wf(s,T,"fragment");rt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+q+`
`+ge+`
`+fe)}else q!==""?tt("WebGLProgram: Program Info Log:",q):(ee===""||j==="")&&(ue=!1);ue&&(N.diagnostics={runnable:ie,programLog:q,vertexShader:{log:ee,prefix:p},fragmentShader:{log:j,prefix:m}})}s.deleteShader(w),s.deleteShader(T),y=new wr(s,A),R=Ly(s,A)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let R;this.getAttributes=function(){return R===void 0&&P(this),R};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(A,Sy)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=My++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=w,this.fragmentShader=T,this}var Yy=0,uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hh(e),t.set(e,n)),n}},hh=class{constructor(e){this.id=Yy++,this.code=e,this.usedTimes=0}};function Zy(i){return i===os||i===Ca||i===Ra}function jy(i,e,t,n,s,r){let a=new mr,o=new uh,c=new Set,u=[],d=new Map,f=n.logarithmicDepthBuffer,h=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function A(y,R,k,N,F,te){let K=N.fog,q=F.geometry,ee=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,j=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ie=e.get(y.envMap||ee,j),ue=ie&&ie.mapping===Sa?ie.image.height:null,ge=g[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&tt("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let fe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,xe=fe!==void 0?fe.length:0,Ce=0;q.morphAttributes.position!==void 0&&(Ce=1),q.morphAttributes.normal!==void 0&&(Ce=2),q.morphAttributes.color!==void 0&&(Ce=3);let ve,Xe,se,Se;if(ge){let Ge=Mn[ge];ve=Ge.vertexShader,Xe=Ge.fragmentShader}else{ve=y.vertexShader,Xe=y.fragmentShader;let Ge=o.getVertexShaderStage(y),wt=o.getFragmentShaderStage(y);o.update(y,Ge,wt),se=Ge.id,Se=wt.id}let me=i.getRenderTarget(),ze=i.state.buffers.depth.getReversed(),it=F.isInstancedMesh===!0,He=F.isBatchedMesh===!0,gt=!!y.map,Ke=!!y.matcap,ct=!!ie,ot=!!y.aoMap,re=!!y.lightMap,Fe=!!y.bumpMap&&y.wireframe===!1,$e=!!y.normalMap,qe=!!y.displacementMap,ut=!!y.emissiveMap,je=!!y.metalnessMap,at=!!y.roughnessMap,z=y.anisotropy>0,Mt=y.clearcoat>0,st=y.dispersion>0,C=y.iridescence>0,_=y.sheen>0,G=y.transmission>0,Y=z&&!!y.anisotropyMap,W=Mt&&!!y.clearcoatMap,_e=Mt&&!!y.clearcoatNormalMap,he=Mt&&!!y.clearcoatRoughnessMap,D=C&&!!y.iridescenceMap,X=C&&!!y.iridescenceThicknessMap,pe=_&&!!y.sheenColorMap,Re=_&&!!y.sheenRoughnessMap,we=!!y.specularMap,ye=!!y.specularColorMap,Pe=!!y.specularIntensityMap,de=G&&!!y.transmissionMap,De=G&&!!y.thicknessMap,O=!!y.gradientMap,Me=!!y.alphaMap,ae=y.alphaTest>0,Ae=!!y.alphaHash,Le=!!y.extensions,oe=ri;y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(oe=i.toneMapping);let Ue={shaderID:ge,shaderType:y.type,shaderName:y.name,vertexShader:ve,fragmentShader:Xe,defines:y.defines,customVertexShaderID:se,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:He,batchingColor:He&&F._colorsTexture!==null,instancing:it,instancingColor:it&&F.instanceColor!==null,instancingMorph:it&&F.morphTexture!==null,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:gt,matcap:Ke,envMap:ct,envMapMode:ct&&ie.mapping,envMapCubeUVHeight:ue,aoMap:ot,lightMap:re,bumpMap:Fe,normalMap:$e,displacementMap:qe,emissiveMap:ut,normalMapObjectSpace:$e&&y.normalMapType===_f,normalMapTangentSpace:$e&&y.normalMapType===Vu,packedNormalMap:$e&&y.normalMapType===Vu&&Zy(y.normalMap.format),metalnessMap:je,roughnessMap:at,anisotropy:z,anisotropyMap:Y,clearcoat:Mt,clearcoatMap:W,clearcoatNormalMap:_e,clearcoatRoughnessMap:he,dispersion:st,iridescence:C,iridescenceMap:D,iridescenceThicknessMap:X,sheen:_,sheenColorMap:pe,sheenRoughnessMap:Re,specularMap:we,specularColorMap:ye,specularIntensityMap:Pe,transmission:G,transmissionMap:de,thicknessMap:De,gradientMap:O,opaque:y.transparent===!1&&y.blending===ws&&y.alphaToCoverage===!1,alphaMap:Me,alphaTest:ae,alphaHash:Ae,combine:y.combine,mapUv:gt&&v(y.map.channel),aoMapUv:ot&&v(y.aoMap.channel),lightMapUv:re&&v(y.lightMap.channel),bumpMapUv:Fe&&v(y.bumpMap.channel),normalMapUv:$e&&v(y.normalMap.channel),displacementMapUv:qe&&v(y.displacementMap.channel),emissiveMapUv:ut&&v(y.emissiveMap.channel),metalnessMapUv:je&&v(y.metalnessMap.channel),roughnessMapUv:at&&v(y.roughnessMap.channel),anisotropyMapUv:Y&&v(y.anisotropyMap.channel),clearcoatMapUv:W&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:_e&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:D&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:X&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&v(y.sheenRoughnessMap.channel),specularMapUv:we&&v(y.specularMap.channel),specularColorMapUv:ye&&v(y.specularColorMap.channel),specularIntensityMapUv:Pe&&v(y.specularIntensityMap.channel),transmissionMapUv:de&&v(y.transmissionMap.channel),thicknessMapUv:De&&v(y.thicknessMap.channel),alphaMapUv:Me&&v(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&($e||z),vertexNormals:!!q.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(gt||Me),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||q.attributes.normal===void 0&&$e===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ze,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:q.attributes.position!==void 0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ce,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:te.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:oe,decodeVideoTexture:gt&&y.map.isVideoTexture===!0&&_t.getTransfer(y.map.colorSpace)===Et,decodeVideoTextureEmissive:ut&&y.emissiveMap.isVideoTexture===!0&&_t.getTransfer(y.emissiveMap.colorSpace)===Et,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===$n,flipSided:y.side===Sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&y.extensions.multiDraw===!0||He)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(y){let R=[];if(y.shaderID?R.push(y.shaderID):(R.push(y.customVertexShaderID),R.push(y.customFragmentShaderID)),y.defines!==void 0)for(let k in y.defines)R.push(k),R.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(m(R,y),I(R,y),R.push(i.outputColorSpace)),R.push(y.customProgramCacheKey),R.join()}function m(y,R){y.push(R.precision),y.push(R.outputColorSpace),y.push(R.envMapMode),y.push(R.envMapCubeUVHeight),y.push(R.mapUv),y.push(R.alphaMapUv),y.push(R.lightMapUv),y.push(R.aoMapUv),y.push(R.bumpMapUv),y.push(R.normalMapUv),y.push(R.displacementMapUv),y.push(R.emissiveMapUv),y.push(R.metalnessMapUv),y.push(R.roughnessMapUv),y.push(R.anisotropyMapUv),y.push(R.clearcoatMapUv),y.push(R.clearcoatNormalMapUv),y.push(R.clearcoatRoughnessMapUv),y.push(R.iridescenceMapUv),y.push(R.iridescenceThicknessMapUv),y.push(R.sheenColorMapUv),y.push(R.sheenRoughnessMapUv),y.push(R.specularMapUv),y.push(R.specularColorMapUv),y.push(R.specularIntensityMapUv),y.push(R.transmissionMapUv),y.push(R.thicknessMapUv),y.push(R.combine),y.push(R.fogExp2),y.push(R.sizeAttenuation),y.push(R.morphTargetsCount),y.push(R.morphAttributeCount),y.push(R.numDirLights),y.push(R.numPointLights),y.push(R.numSpotLights),y.push(R.numSpotLightMaps),y.push(R.numHemiLights),y.push(R.numRectAreaLights),y.push(R.numDirLightShadows),y.push(R.numPointLightShadows),y.push(R.numSpotLightShadows),y.push(R.numSpotLightShadowsWithMaps),y.push(R.numLightProbes),y.push(R.shadowMapType),y.push(R.toneMapping),y.push(R.numClippingPlanes),y.push(R.numClipIntersection),y.push(R.depthPacking)}function I(y,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function L(y){let R=g[y.type],k;if(R){let N=Mn[R];k=Ia.clone(N.uniforms)}else k=y.uniforms;return k}function M(y,R){let k=d.get(R);return k!==void 0?++k.usedTimes:(k=new qy(i,R,y,s),u.push(k),d.set(R,k)),k}function w(y){if(--y.usedTimes===0){let R=u.indexOf(y);u[R]=u[u.length-1],u.pop(),d.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function P(){o.dispose()}return{getParameters:A,getProgramCacheKey:p,getUniforms:L,acquireProgram:M,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:P}}function Jy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ky(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Zf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function o(h,g,v,A,p,m){let I=i[e];return I===void 0?(I={id:h.id,object:h,geometry:g,material:v,materialVariant:a(h),groupOrder:A,renderOrder:h.renderOrder,z:p,group:m},i[e]=I):(I.id=h.id,I.object=h,I.geometry=g,I.material=v,I.materialVariant=a(h),I.groupOrder=A,I.renderOrder=h.renderOrder,I.z=p,I.group=m),e++,I}function c(h,g,v,A,p,m){let I=o(h,g,v,A,p,m);v.transmission>0?n.push(I):v.transparent===!0?s.push(I):t.push(I)}function u(h,g,v,A,p,m){let I=o(h,g,v,A,p,m);v.transmission>0?n.unshift(I):v.transparent===!0?s.unshift(I):t.unshift(I)}function d(h,g,v){t.length>1&&t.sort(h||Ky),n.length>1&&n.sort(g||Zf),s.length>1&&s.sort(g||Zf),v&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let h=e,g=i.length;h<g;h++){let v=i[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:u,finish:f,sort:d}}function Qy(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new jf,i.set(n,[a])):s>=r.length?(a=new jf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function ev(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new mt};break;case"SpotLight":t={position:new B,direction:new B,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":t={color:new mt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function tv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var nv=0;function iv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function sv(i){let e=new ev,t=tv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new B);let s=new B,r=new Ft,a=new Ft;function o(u){let d=0,f=0,h=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let g=0,v=0,A=0,p=0,m=0,I=0,L=0,M=0,w=0,T=0,P=0;u.sort(iv);for(let R=0,k=u.length;R<k;R++){let N=u[R],F=N.color,te=N.intensity,K=N.distance,q=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===os?q=N.shadow.map.texture:q=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)d+=F.r*te,f+=F.g*te,h+=F.b*te;else if(N.isLightProbe){for(let ee=0;ee<9;ee++)n.probe[ee].addScaledVector(N.sh.coefficients[ee],te);P++}else if(N.isDirectionalLight){let ee=e.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let j=N.shadow,ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[g]=ie,n.directionalShadowMap[g]=q,n.directionalShadowMatrix[g]=N.shadow.matrix,I++}n.directional[g]=ee,g++}else if(N.isSpotLight){let ee=e.get(N);ee.position.setFromMatrixPosition(N.matrixWorld),ee.color.copy(F).multiplyScalar(te),ee.distance=K,ee.coneCos=Math.cos(N.angle),ee.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ee.decay=N.decay,n.spot[A]=ee;let j=N.shadow;if(N.map&&(n.spotLightMap[w]=N.map,w++,j.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[A]=j.matrix,N.castShadow){let ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[A]=ie,n.spotShadowMap[A]=q,M++}A++}else if(N.isRectAreaLight){let ee=e.get(N);ee.color.copy(F).multiplyScalar(te),ee.halfWidth.set(N.width*.5,0,0),ee.halfHeight.set(0,N.height*.5,0),n.rectArea[p]=ee,p++}else if(N.isPointLight){let ee=e.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity),ee.distance=N.distance,ee.decay=N.decay,N.castShadow){let j=N.shadow,ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[v]=ie,n.pointShadowMap[v]=q,n.pointShadowMatrix[v]=N.shadow.matrix,L++}n.point[v]=ee,v++}else if(N.isHemisphereLight){let ee=e.get(N);ee.skyColor.copy(N.color).multiplyScalar(te),ee.groundColor.copy(N.groundColor).multiplyScalar(te),n.hemi[m]=ee,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=h;let y=n.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==A||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==I||y.numPointShadows!==L||y.numSpotShadows!==M||y.numSpotMaps!==w||y.numLightProbes!==P)&&(n.directional.length=g,n.spot.length=A,n.rectArea.length=p,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=I,n.directionalShadowMap.length=I,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=I,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=M+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,y.directionalLength=g,y.pointLength=v,y.spotLength=A,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=I,y.numPointShadows=L,y.numSpotShadows=M,y.numSpotMaps=w,y.numLightProbes=P,n.version=nv++)}function c(u,d){let f=0,h=0,g=0,v=0,A=0,p=d.matrixWorldInverse;for(let m=0,I=u.length;m<I;m++){let L=u[m];if(L.isDirectionalLight){let M=n.directional[f];M.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),f++}else if(L.isSpotLight){let M=n.spot[g];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),g++}else if(L.isRectAreaLight){let M=n.rectArea[v];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(L.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(L.width*.5,0,0),M.halfHeight.set(0,L.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(L.isPointLight){let M=n.point[h];M.position.setFromMatrixPosition(L.matrixWorld),M.position.applyMatrix4(p),h++}else if(L.isHemisphereLight){let M=n.hemi[A];M.direction.setFromMatrixPosition(L.matrixWorld),M.direction.transformDirection(p),A++}}}return{setup:o,setupView:c,state:n}}function Jf(i){let e=new sv(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function u(){e.setup(t)}function d(h){e.setupView(t,h)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:u,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function rv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Jf(i),e.set(s,[o])):r>=a.length?(o=new Jf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,lv=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],cv=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Kf=new Ft,La=new B,sh=new B;function uv(i,e,t){let n=new ua,s=new Je,r=new Je,a=new It,o=new Go,c=new Wo,u={},d=t.maxTextureSize,f={[Ni]:Sn,[Sn]:Ni,[$n]:$n},h=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:av,fragmentShader:ov}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let v=new nn;v.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new sn(v,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ba;let m=this.type;this.render=function(T,P,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===qd&&(tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ba);let R=i.getRenderTarget(),k=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),F=i.state;F.setBlending(mi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let te=m!==this.type;te&&P.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(q=>q.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,q=T.length;K<q;K++){let ee=T[K],j=ee.shadow;if(j===void 0){tt("WebGLShadowMap:",ee,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let ie=j.getFrameExtents();s.multiply(ie),r.copy(j.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ie.x),s.x=r.x*ie.x,j.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ie.y),s.y=r.y*ie.y,j.mapSize.y=r.y));let ue=i.state.buffers.depth.getReversed();if(j.camera._reversedDepth=ue,j.map===null||te===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===br){if(ee.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new Un(s.x,s.y,{format:os,type:gi,minFilter:tn,magFilter:tn,generateMipmaps:!1}),j.map.texture.name=ee.name+".shadowMap",j.map.depthTexture=new Ui(s.x,s.y,oi),j.map.depthTexture.name=ee.name+".shadowMapDepth",j.map.depthTexture.format=pi,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Jt,j.map.depthTexture.magFilter=Jt}else ee.isPointLight?(j.map=new Yl(s.x),j.map.depthTexture=new Vo(s.x,ai)):(j.map=new Un(s.x,s.y),j.map.depthTexture=new Ui(s.x,s.y,ai)),j.map.depthTexture.name=ee.name+".shadowMap",j.map.depthTexture.format=pi,this.type===ba?(j.map.depthTexture.compareFunction=ue?Wl:Gl,j.map.depthTexture.minFilter=tn,j.map.depthTexture.magFilter=tn):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Jt,j.map.depthTexture.magFilter=Jt);j.camera.updateProjectionMatrix()}let ge=j.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<ge;fe++){if(j.map.isWebGLCubeRenderTarget)i.setRenderTarget(j.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(j.map),i.clear());let xe=j.getViewport(fe);a.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),F.viewport(a)}if(ee.isPointLight){let xe=j.camera,Ce=j.matrix,ve=ee.distance||xe.far;ve!==xe.far&&(xe.far=ve,xe.updateProjectionMatrix()),La.setFromMatrixPosition(ee.matrixWorld),xe.position.copy(La),sh.copy(xe.position),sh.add(lv[fe]),xe.up.copy(cv[fe]),xe.lookAt(sh),xe.updateMatrixWorld(),Ce.makeTranslation(-La.x,-La.y,-La.z),Kf.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),j._frustum.setFromProjectionMatrix(Kf,xe.coordinateSystem,xe.reversedDepth)}else j.updateMatrices(ee);n=j.getFrustum(),M(P,y,j.camera,ee,this.type)}j.isPointLightShadow!==!0&&this.type===br&&I(j,y),j.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(R,k,N)};function I(T,P){let y=e.update(A);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,g.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Un(s.x,s.y,{format:os,type:gi})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,y,h,A,null),g.uniforms.shadow_pass.value=T.mapPass.texture,g.uniforms.resolution.value=T.mapSize,g.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,y,g,A,null)}function L(T,P,y,R){let k=null,N=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)k=N;else if(k=y.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let F=k.uuid,te=P.uuid,K=u[F];K===void 0&&(K={},u[F]=K);let q=K[te];q===void 0&&(q=k.clone(),K[te]=q,P.addEventListener("dispose",w)),k=q}if(k.visible=P.visible,k.wireframe=P.wireframe,R===br?k.side=P.shadowSide!==null?P.shadowSide:P.side:k.side=P.shadowSide!==null?P.shadowSide:f[P.side],k.alphaMap=P.alphaMap,k.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,k.map=P.map,k.clipShadows=P.clipShadows,k.clippingPlanes=P.clippingPlanes,k.clipIntersection=P.clipIntersection,k.displacementMap=P.displacementMap,k.displacementScale=P.displacementScale,k.displacementBias=P.displacementBias,k.wireframeLinewidth=P.wireframeLinewidth,k.linewidth=P.linewidth,y.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let F=i.properties.get(k);F.light=y}return k}function M(T,P,y,R,k){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&k===br)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let te=e.update(T),K=T.material;if(Array.isArray(K)){let q=te.groups;for(let ee=0,j=q.length;ee<j;ee++){let ie=q[ee],ue=K[ie.materialIndex];if(ue&&ue.visible){let ge=L(T,ue,R,k);T.onBeforeShadow(i,T,P,y,te,ge,ie),i.renderBufferDirect(y,null,te,ge,T,ie),T.onAfterShadow(i,T,P,y,te,ge,ie)}}}else if(K.visible){let q=L(T,K,R,k);T.onBeforeShadow(i,T,P,y,te,q,null),i.renderBufferDirect(y,null,te,q,T,null),T.onAfterShadow(i,T,P,y,te,q,null)}}let F=T.children;for(let te=0,K=F.length;te<K;te++)M(F[te],P,y,R,k)}function w(T){T.target.removeEventListener("dispose",w);for(let y in u){let R=u[y],k=T.target.uuid;k in R&&(R[k].dispose(),delete R[k])}}}function hv(i,e){function t(){let O=!1,Me=new It,ae=null,Ae=new It(0,0,0,0);return{setMask:function(Le){ae!==Le&&!O&&(i.colorMask(Le,Le,Le,Le),ae=Le)},setLocked:function(Le){O=Le},setClear:function(Le,oe,Ue,Ge,wt){wt===!0&&(Le*=Ge,oe*=Ge,Ue*=Ge),Me.set(Le,oe,Ue,Ge),Ae.equals(Me)===!1&&(i.clearColor(Le,oe,Ue,Ge),Ae.copy(Me))},reset:function(){O=!1,ae=null,Ae.set(-1,0,0,0)}}}function n(){let O=!1,Me=!1,ae=null,Ae=null,Le=null;return{setReversed:function(oe){if(Me!==oe){let Ue=e.get("EXT_clip_control");oe?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),Me=oe;let Ge=Le;Le=null,this.setClear(Ge)}},getReversed:function(){return Me},setTest:function(oe){oe?me(i.DEPTH_TEST):ze(i.DEPTH_TEST)},setMask:function(oe){ae!==oe&&!O&&(i.depthMask(oe),ae=oe)},setFunc:function(oe){if(Me&&(oe=Tf[oe]),Ae!==oe){switch(oe){case Mo:i.depthFunc(i.NEVER);break;case Eo:i.depthFunc(i.ALWAYS);break;case wo:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case Ao:i.depthFunc(i.EQUAL);break;case To:i.depthFunc(i.GEQUAL);break;case Co:i.depthFunc(i.GREATER);break;case Ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=oe}},setLocked:function(oe){O=oe},setClear:function(oe){Le!==oe&&(Le=oe,Me&&(oe=1-oe),i.clearDepth(oe))},reset:function(){O=!1,ae=null,Ae=null,Le=null,Me=!1}}}function s(){let O=!1,Me=null,ae=null,Ae=null,Le=null,oe=null,Ue=null,Ge=null,wt=null;return{setTest:function(St){O||(St?me(i.STENCIL_TEST):ze(i.STENCIL_TEST))},setMask:function(St){Me!==St&&!O&&(i.stencilMask(St),Me=St)},setFunc:function(St,ln,In){(ae!==St||Ae!==ln||Le!==In)&&(i.stencilFunc(St,ln,In),ae=St,Ae=ln,Le=In)},setOp:function(St,ln,In){(oe!==St||Ue!==ln||Ge!==In)&&(i.stencilOp(St,ln,In),oe=St,Ue=ln,Ge=In)},setLocked:function(St){O=St},setClear:function(St){wt!==St&&(i.clearStencil(St),wt=St)},reset:function(){O=!1,Me=null,ae=null,Ae=null,Le=null,oe=null,Ue=null,Ge=null,wt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,u=new WeakMap,d={},f={},h={},g=new WeakMap,v=[],A=null,p=!1,m=null,I=null,L=null,M=null,w=null,T=null,P=null,y=new mt(0,0,0),R=0,k=!1,N=null,F=null,te=null,K=null,q=null,ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ie=0,ue=i.getParameter(i.VERSION);ue.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(ue)[1]),j=ie>=1):ue.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),j=ie>=2);let ge=null,fe={},xe=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),ve=new It().fromArray(xe),Xe=new It().fromArray(Ce);function se(O,Me,ae,Ae){let Le=new Uint8Array(4),oe=i.createTexture();i.bindTexture(O,oe),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<ae;Ue++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(Me,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Me+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return oe}let Se={};Se[i.TEXTURE_2D]=se(i.TEXTURE_2D,i.TEXTURE_2D,1),Se[i.TEXTURE_CUBE_MAP]=se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[i.TEXTURE_2D_ARRAY]=se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Se[i.TEXTURE_3D]=se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(i.DEPTH_TEST),a.setFunc(As),Fe(!1),$e(bu),me(i.CULL_FACE),ot(mi);function me(O){d[O]!==!0&&(i.enable(O),d[O]=!0)}function ze(O){d[O]!==!1&&(i.disable(O),d[O]=!1)}function it(O,Me){return h[O]!==Me?(i.bindFramebuffer(O,Me),h[O]=Me,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Me),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Me),!0):!1}function He(O,Me){let ae=v,Ae=!1;if(O){ae=g.get(Me),ae===void 0&&(ae=[],g.set(Me,ae));let Le=O.textures;if(ae.length!==Le.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ue=Le.length;oe<Ue;oe++)ae[oe]=i.COLOR_ATTACHMENT0+oe;ae.length=Le.length,Ae=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(ae)}function gt(O){return A!==O?(i.useProgram(O),A=O,!0):!1}let Ke={[Zi]:i.FUNC_ADD,[Zd]:i.FUNC_SUBTRACT,[jd]:i.FUNC_REVERSE_SUBTRACT};Ke[Jd]=i.MIN,Ke[Kd]=i.MAX;let ct={[Qd]:i.ZERO,[ef]:i.ONE,[tf]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[lf]:i.SRC_ALPHA_SATURATE,[af]:i.DST_COLOR,[sf]:i.DST_ALPHA,[nf]:i.ONE_MINUS_SRC_COLOR,[So]:i.ONE_MINUS_SRC_ALPHA,[of]:i.ONE_MINUS_DST_COLOR,[rf]:i.ONE_MINUS_DST_ALPHA,[cf]:i.CONSTANT_COLOR,[uf]:i.ONE_MINUS_CONSTANT_COLOR,[hf]:i.CONSTANT_ALPHA,[df]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(O,Me,ae,Ae,Le,oe,Ue,Ge,wt,St){if(O===mi){p===!0&&(ze(i.BLEND),p=!1);return}if(p===!1&&(me(i.BLEND),p=!0),O!==Yd){if(O!==m||St!==k){if((I!==Zi||w!==Zi)&&(i.blendEquation(i.FUNC_ADD),I=Zi,w=Zi),St)switch(O){case ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFunc(i.ONE,i.ONE);break;case Mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",O);break}else switch(O){case ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mu:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Eu:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",O);break}L=null,M=null,T=null,P=null,y.set(0,0,0),R=0,m=O,k=St}return}Le=Le||Me,oe=oe||ae,Ue=Ue||Ae,(Me!==I||Le!==w)&&(i.blendEquationSeparate(Ke[Me],Ke[Le]),I=Me,w=Le),(ae!==L||Ae!==M||oe!==T||Ue!==P)&&(i.blendFuncSeparate(ct[ae],ct[Ae],ct[oe],ct[Ue]),L=ae,M=Ae,T=oe,P=Ue),(Ge.equals(y)===!1||wt!==R)&&(i.blendColor(Ge.r,Ge.g,Ge.b,wt),y.copy(Ge),R=wt),m=O,k=!1}function re(O,Me){O.side===$n?ze(i.CULL_FACE):me(i.CULL_FACE);let ae=O.side===Sn;Me&&(ae=!ae),Fe(ae),O.blending===ws&&O.transparent===!1?ot(mi):ot(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let Ae=O.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ut(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):ze(i.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(O){N!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),N=O)}function $e(O){O!==Xd?(me(i.CULL_FACE),O!==F&&(O===bu?i.cullFace(i.BACK):O===$d?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ze(i.CULL_FACE),F=O}function qe(O){O!==te&&(j&&i.lineWidth(O),te=O)}function ut(O,Me,ae){O?(me(i.POLYGON_OFFSET_FILL),(K!==Me||q!==ae)&&(K=Me,q=ae,a.getReversed()&&(Me=-Me),i.polygonOffset(Me,ae))):ze(i.POLYGON_OFFSET_FILL)}function je(O){O?me(i.SCISSOR_TEST):ze(i.SCISSOR_TEST)}function at(O){O===void 0&&(O=i.TEXTURE0+ee-1),ge!==O&&(i.activeTexture(O),ge=O)}function z(O,Me,ae){ae===void 0&&(ge===null?ae=i.TEXTURE0+ee-1:ae=ge);let Ae=fe[ae];Ae===void 0&&(Ae={type:void 0,texture:void 0},fe[ae]=Ae),(Ae.type!==O||Ae.texture!==Me)&&(ge!==ae&&(i.activeTexture(ae),ge=ae),i.bindTexture(O,Me||Se[O]),Ae.type=O,Ae.texture=Me)}function Mt(){let O=fe[ge];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function st(){try{i.compressedTexImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function _(){try{i.texSubImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function G(){try{i.texSubImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function _e(){try{i.texStorage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function he(){try{i.texStorage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function D(){try{i.texImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function X(){try{i.texImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function pe(O){return f[O]!==void 0?f[O]:i.getParameter(O)}function Re(O,Me){f[O]!==Me&&(i.pixelStorei(O,Me),f[O]=Me)}function we(O){ve.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ve.copy(O))}function ye(O){Xe.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Xe.copy(O))}function Pe(O,Me){let ae=u.get(Me);ae===void 0&&(ae=new WeakMap,u.set(Me,ae));let Ae=ae.get(O);Ae===void 0&&(Ae=i.getUniformBlockIndex(Me,O.name),ae.set(O,Ae))}function de(O,Me){let Ae=u.get(Me).get(O);c.get(Me)!==Ae&&(i.uniformBlockBinding(Me,Ae,O.__bindingPointIndex),c.set(Me,Ae))}function De(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},f={},ge=null,fe={},h={},g=new WeakMap,v=[],A=null,p=!1,m=null,I=null,L=null,M=null,w=null,T=null,P=null,y=new mt(0,0,0),R=0,k=!1,N=null,F=null,te=null,K=null,q=null,ve.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:me,disable:ze,bindFramebuffer:it,drawBuffers:He,useProgram:gt,setBlending:ot,setMaterial:re,setFlipSided:Fe,setCullFace:$e,setLineWidth:qe,setPolygonOffset:ut,setScissorTest:je,activeTexture:at,bindTexture:z,unbindTexture:Mt,compressedTexImage2D:st,compressedTexImage3D:C,texImage2D:D,texImage3D:X,pixelStorei:Re,getParameter:pe,updateUBOMapping:Pe,uniformBlockBinding:de,texStorage2D:_e,texStorage3D:he,texSubImage2D:_,texSubImage3D:G,compressedTexSubImage2D:Y,compressedTexSubImage3D:W,scissor:we,viewport:ye,reset:De}}function dv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Je,d=new WeakMap,f=new Set,h,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(C,_){return v?new OffscreenCanvas(C,_):sa("canvas")}function p(C,_,G){let Y=1,W=st(C);if((W.width>G||W.height>G)&&(Y=G/Math.max(W.width,W.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let _e=Math.floor(Y*W.width),he=Math.floor(Y*W.height);h===void 0&&(h=A(_e,he));let D=_?A(_e,he):h;return D.width=_e,D.height=he,D.getContext("2d").drawImage(C,0,0,_e,he),tt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+_e+"x"+he+")."),D}else return"data"in C&&tt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),C;return C}function m(C){return C.generateMipmaps}function I(C){i.generateMipmap(C)}function L(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,_,G,Y,W,_e=!1){if(C!==null){if(i[C]!==void 0)return i[C];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let he;Y&&(he=e.get("EXT_texture_norm16"),he||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=_;if(_===i.RED&&(G===i.FLOAT&&(D=i.R32F),G===i.HALF_FLOAT&&(D=i.R16F),G===i.UNSIGNED_BYTE&&(D=i.R8),G===i.UNSIGNED_SHORT&&he&&(D=he.R16_EXT),G===i.SHORT&&he&&(D=he.R16_SNORM_EXT)),_===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(D=i.R8UI),G===i.UNSIGNED_SHORT&&(D=i.R16UI),G===i.UNSIGNED_INT&&(D=i.R32UI),G===i.BYTE&&(D=i.R8I),G===i.SHORT&&(D=i.R16I),G===i.INT&&(D=i.R32I)),_===i.RG&&(G===i.FLOAT&&(D=i.RG32F),G===i.HALF_FLOAT&&(D=i.RG16F),G===i.UNSIGNED_BYTE&&(D=i.RG8),G===i.UNSIGNED_SHORT&&he&&(D=he.RG16_EXT),G===i.SHORT&&he&&(D=he.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(D=i.RG8UI),G===i.UNSIGNED_SHORT&&(D=i.RG16UI),G===i.UNSIGNED_INT&&(D=i.RG32UI),G===i.BYTE&&(D=i.RG8I),G===i.SHORT&&(D=i.RG16I),G===i.INT&&(D=i.RG32I)),_===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(D=i.RGB8UI),G===i.UNSIGNED_SHORT&&(D=i.RGB16UI),G===i.UNSIGNED_INT&&(D=i.RGB32UI),G===i.BYTE&&(D=i.RGB8I),G===i.SHORT&&(D=i.RGB16I),G===i.INT&&(D=i.RGB32I)),_===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(D=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(D=i.RGBA16UI),G===i.UNSIGNED_INT&&(D=i.RGBA32UI),G===i.BYTE&&(D=i.RGBA8I),G===i.SHORT&&(D=i.RGBA16I),G===i.INT&&(D=i.RGBA32I)),_===i.RGB&&(G===i.UNSIGNED_SHORT&&he&&(D=he.RGB16_EXT),G===i.SHORT&&he&&(D=he.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(D=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(D=i.R11F_G11F_B10F)),_===i.RGBA){let X=_e?na:_t.getTransfer(W);G===i.FLOAT&&(D=i.RGBA32F),G===i.HALF_FLOAT&&(D=i.RGBA16F),G===i.UNSIGNED_BYTE&&(D=X===Et?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&he&&(D=he.RGBA16_EXT),G===i.SHORT&&he&&(D=he.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(D=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(D=i.RGB5_A1)}return(D===i.R16F||D===i.R32F||D===i.RG16F||D===i.RG32F||D===i.RGBA16F||D===i.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function w(C,_){let G;return C?_===null||_===ai||_===Mr?G=i.DEPTH24_STENCIL8:_===oi?G=i.DEPTH32F_STENCIL8:_===Sr&&(G=i.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===Mr?G=i.DEPTH_COMPONENT24:_===oi?G=i.DEPTH_COMPONENT32F:_===Sr&&(G=i.DEPTH_COMPONENT16),G}function T(C,_){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Jt&&C.minFilter!==tn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function P(C){let _=C.target;_.removeEventListener("dispose",P),R(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function y(C){let _=C.target;_.removeEventListener("dispose",y),N(_)}function R(C){let _=n.get(C);if(_.__webglInit===void 0)return;let G=C.source,Y=g.get(G);if(Y){let W=Y[_.__cacheKey];W.usedTimes--,W.usedTimes===0&&k(C),Object.keys(Y).length===0&&g.delete(G)}n.remove(C)}function k(C){let _=n.get(C);i.deleteTexture(_.__webglTexture);let G=C.source,Y=g.get(G);delete Y[_.__cacheKey],a.memory.textures--}function N(C){let _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let W=0;W<_.__webglFramebuffer[Y].length;W++)i.deleteFramebuffer(_.__webglFramebuffer[Y][W]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let G=C.textures;for(let Y=0,W=G.length;Y<W;Y++){let _e=n.get(G[Y]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(G[Y])}n.remove(C)}let F=0;function te(){F=0}function K(){return F}function q(C){F=C}function ee(){let C=F;return C>=s.maxTextures&&tt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),F+=1,C}function j(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function ie(C,_){let G=n.get(C);if(C.isVideoTexture&&z(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&G.__version!==C.version){let Y=C.image;if(Y===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{ze(G,C,_);return}}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+_)}function ue(C,_){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){ze(G,C,_);return}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+_)}function ge(C,_){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){ze(G,C,_);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+_)}function fe(C,_){let G=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&G.__version!==C.version){it(G,C,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+_)}let xe={[Io]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Po]:i.MIRRORED_REPEAT},Ce={[Jt]:i.NEAREST,[mf]:i.NEAREST_MIPMAP_NEAREST,[Ma]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[al]:i.LINEAR_MIPMAP_NEAREST,[rs]:i.LINEAR_MIPMAP_LINEAR},ve={[xf]:i.NEVER,[Mf]:i.ALWAYS,[yf]:i.LESS,[Gl]:i.LEQUAL,[vf]:i.EQUAL,[Wl]:i.GEQUAL,[bf]:i.GREATER,[Sf]:i.NOTEQUAL};function Xe(C,_){if(_.type===oi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===tn||_.magFilter===al||_.magFilter===Ma||_.magFilter===rs||_.minFilter===tn||_.minFilter===al||_.minFilter===Ma||_.minFilter===rs)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,xe[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,xe[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,xe[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Ce[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Ce[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ve[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Jt||_.minFilter!==Ma&&_.minFilter!==rs||_.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function se(C,_){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",P));let Y=_.source,W=g.get(Y);W===void 0&&(W={},g.set(Y,W));let _e=j(_);if(_e!==C.__cacheKey){W[_e]===void 0&&(W[_e]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),W[_e].usedTimes++;let he=W[C.__cacheKey];he!==void 0&&(W[C.__cacheKey].usedTimes--,he.usedTimes===0&&k(_)),C.__cacheKey=_e,C.__webglTexture=W[_e].texture}return G}function Se(C,_,G){return Math.floor(Math.floor(C/G)/_)}function me(C,_,G,Y){let _e=C.updateRanges;if(_e.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,G,Y,_.data);else{_e.sort((Re,we)=>Re.start-we.start);let he=0;for(let Re=1;Re<_e.length;Re++){let we=_e[he],ye=_e[Re],Pe=we.start+we.count,de=Se(ye.start,_.width,4),De=Se(we.start,_.width,4);ye.start<=Pe+1&&de===De&&Se(ye.start+ye.count-1,_.width,4)===de?we.count=Math.max(we.count,ye.start+ye.count-we.start):(++he,_e[he]=ye)}_e.length=he+1;let D=t.getParameter(i.UNPACK_ROW_LENGTH),X=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Re=0,we=_e.length;Re<we;Re++){let ye=_e[Re],Pe=Math.floor(ye.start/4),de=Math.ceil(ye.count/4),De=Pe%_.width,O=Math.floor(Pe/_.width),Me=de,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,De),t.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,De,O,Me,ae,G,Y,_.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,D),t.pixelStorei(i.UNPACK_SKIP_PIXELS,X),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function ze(C,_,G){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);let W=se(C,_),_e=_.source;t.bindTexture(Y,C.__webglTexture,i.TEXTURE0+G);let he=n.get(_e);if(_e.version!==he.__version||W===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ae=_t.getPrimaries(_t.workingColorSpace),Ae=_.colorSpace===Oi?null:_t.getPrimaries(_.colorSpace),Le=_.colorSpace===Oi||ae===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let X=p(_.image,!1,s.maxTextureSize);X=Mt(_,X);let pe=r.convert(_.format,_.colorSpace),Re=r.convert(_.type),we=M(_.internalFormat,pe,Re,_.normalized,_.colorSpace,_.isVideoTexture);Xe(Y,_);let ye,Pe=_.mipmaps,de=_.isVideoTexture!==!0,De=he.__version===void 0||W===!0,O=_e.dataReady,Me=T(_,X);if(_.isDepthTexture)we=w(_.format===as,_.type),De&&(de?t.texStorage2D(i.TEXTURE_2D,1,we,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,we,X.width,X.height,0,pe,Re,null));else if(_.isDataTexture)if(Pe.length>0){de&&De&&t.texStorage2D(i.TEXTURE_2D,Me,we,Pe[0].width,Pe[0].height);for(let ae=0,Ae=Pe.length;ae<Ae;ae++)ye=Pe[ae],de?O&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,ye.width,ye.height,pe,Re,ye.data):t.texImage2D(i.TEXTURE_2D,ae,we,ye.width,ye.height,0,pe,Re,ye.data);_.generateMipmaps=!1}else de?(De&&t.texStorage2D(i.TEXTURE_2D,Me,we,X.width,X.height),O&&me(_,X,pe,Re)):t.texImage2D(i.TEXTURE_2D,0,we,X.width,X.height,0,pe,Re,X.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){de&&De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,we,Pe[0].width,Pe[0].height,X.depth);for(let ae=0,Ae=Pe.length;ae<Ae;ae++)if(ye=Pe[ae],_.format!==qn)if(pe!==null)if(de){if(O)if(_.layerUpdates.size>0){let Le=qu(ye.width,ye.height,_.format,_.type);for(let oe of _.layerUpdates){let Ue=ye.data.subarray(oe*Le/ye.data.BYTES_PER_ELEMENT,(oe+1)*Le/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,oe,ye.width,ye.height,1,pe,Ue)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,X.depth,pe,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,we,ye.width,ye.height,X.depth,0,ye.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,X.depth,pe,Re,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,we,ye.width,ye.height,X.depth,0,pe,Re,ye.data)}else{de&&De&&t.texStorage2D(i.TEXTURE_2D,Me,we,Pe[0].width,Pe[0].height);for(let ae=0,Ae=Pe.length;ae<Ae;ae++)ye=Pe[ae],_.format!==qn?pe!==null?de?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,ye.width,ye.height,pe,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,we,ye.width,ye.height,0,ye.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?O&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,ye.width,ye.height,pe,Re,ye.data):t.texImage2D(i.TEXTURE_2D,ae,we,ye.width,ye.height,0,pe,Re,ye.data)}else if(_.isDataArrayTexture)if(de){if(De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,we,X.width,X.height,X.depth),O)if(_.layerUpdates.size>0){let ae=qu(X.width,X.height,_.format,_.type);for(let Ae of _.layerUpdates){let Le=X.data.subarray(Ae*ae/X.data.BYTES_PER_ELEMENT,(Ae+1)*ae/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ae,X.width,X.height,1,pe,Re,Le)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,pe,Re,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,X.width,X.height,X.depth,0,pe,Re,X.data);else if(_.isData3DTexture)de?(De&&t.texStorage3D(i.TEXTURE_3D,Me,we,X.width,X.height,X.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,pe,Re,X.data)):t.texImage3D(i.TEXTURE_3D,0,we,X.width,X.height,X.depth,0,pe,Re,X.data);else if(_.isFramebufferTexture){if(De)if(de)t.texStorage2D(i.TEXTURE_2D,Me,we,X.width,X.height);else{let ae=X.width,Ae=X.height;for(let Le=0;Le<Me;Le++)t.texImage2D(i.TEXTURE_2D,Le,we,ae,Ae,0,pe,Re,null),ae>>=1,Ae>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),X.parentNode!==ae){ae.appendChild(X),f.add(_),ae.onpaint=Ae=>{let Le=Ae.changedElements;for(let oe of f)Le.includes(oe.image)&&(oe.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,X);else{let Le=i.RGBA,oe=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Le,oe,Ue,X)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(de&&De){let ae=st(Pe[0]);t.texStorage2D(i.TEXTURE_2D,Me,we,ae.width,ae.height)}for(let ae=0,Ae=Pe.length;ae<Ae;ae++)ye=Pe[ae],de?O&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,pe,Re,ye):t.texImage2D(i.TEXTURE_2D,ae,we,pe,Re,ye);_.generateMipmaps=!1}else if(de){if(De){let ae=st(X);t.texStorage2D(i.TEXTURE_2D,Me,we,ae.width,ae.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Re,X)}else t.texImage2D(i.TEXTURE_2D,0,we,pe,Re,X);m(_)&&I(Y),he.__version=_e.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function it(C,_,G){if(_.image.length!==6)return;let Y=se(C,_),W=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+G);let _e=n.get(W);if(W.version!==_e.__version||Y===!0){t.activeTexture(i.TEXTURE0+G);let he=_t.getPrimaries(_t.workingColorSpace),D=_.colorSpace===Oi?null:_t.getPrimaries(_.colorSpace),X=_.colorSpace===Oi||he===D?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);let pe=_.isCompressedTexture||_.image[0].isCompressedTexture,Re=_.image[0]&&_.image[0].isDataTexture,we=[];for(let oe=0;oe<6;oe++)!pe&&!Re?we[oe]=p(_.image[oe],!0,s.maxCubemapSize):we[oe]=Re?_.image[oe].image:_.image[oe],we[oe]=Mt(_,we[oe]);let ye=we[0],Pe=r.convert(_.format,_.colorSpace),de=r.convert(_.type),De=M(_.internalFormat,Pe,de,_.normalized,_.colorSpace),O=_.isVideoTexture!==!0,Me=_e.__version===void 0||Y===!0,ae=W.dataReady,Ae=T(_,ye);Xe(i.TEXTURE_CUBE_MAP,_);let Le;if(pe){O&&Me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,De,ye.width,ye.height);for(let oe=0;oe<6;oe++){Le=we[oe].mipmaps;for(let Ue=0;Ue<Le.length;Ue++){let Ge=Le[Ue];_.format!==qn?Pe!==null?O?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Ge.width,Ge.height,Pe,Ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,De,Ge.width,Ge.height,0,Ge.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Ge.width,Ge.height,Pe,de,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,De,Ge.width,Ge.height,0,Pe,de,Ge.data)}}}else{if(Le=_.mipmaps,O&&Me){Le.length>0&&Ae++;let oe=st(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,De,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Re){O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,we[oe].width,we[oe].height,Pe,de,we[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,De,we[oe].width,we[oe].height,0,Pe,de,we[oe].data);for(let Ue=0;Ue<Le.length;Ue++){let wt=Le[Ue].image[oe].image;O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,wt.width,wt.height,Pe,de,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,De,wt.width,wt.height,0,Pe,de,wt.data)}}else{O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Pe,de,we[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,De,Pe,de,we[oe]);for(let Ue=0;Ue<Le.length;Ue++){let Ge=Le[Ue];O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,Pe,de,Ge.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,De,Pe,de,Ge.image[oe])}}}m(_)&&I(i.TEXTURE_CUBE_MAP),_e.__version=W.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function He(C,_,G,Y,W,_e){let he=r.convert(G.format,G.colorSpace),D=r.convert(G.type),X=M(G.internalFormat,he,D,G.normalized,G.colorSpace),pe=n.get(_),Re=n.get(G);if(Re.__renderTarget=_,!pe.__hasExternalTextures){let we=Math.max(1,_.width>>_e),ye=Math.max(1,_.height>>_e);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?t.texImage3D(W,_e,X,we,ye,_.depth,0,he,D,null):t.texImage2D(W,_e,X,we,ye,0,he,D,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,W,Re.__webglTexture,0,je(_)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,W,Re.__webglTexture,_e),t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(C,_,G){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){let Y=_.depthTexture,W=Y&&Y.isDepthTexture?Y.type:null,_e=w(_.stencilBuffer,W),he=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;at(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je(_),_e,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,je(_),_e,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,_e,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,C)}else{let Y=_.textures;for(let W=0;W<Y.length;W++){let _e=Y[W],he=r.convert(_e.format,_e.colorSpace),D=r.convert(_e.type),X=M(_e.internalFormat,he,D,_e.normalized,_e.colorSpace);at(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je(_),X,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,je(_),X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ke(C,_,G){let Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=n.get(_.depthTexture);if(W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(W.__webglInit===void 0&&(W.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_.depthTexture);let pe=r.convert(_.depthTexture.format),Re=r.convert(_.depthTexture.type),we;_.depthTexture.format===pi?we=i.DEPTH_COMPONENT24:_.depthTexture.format===as&&(we=i.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,we,_.width,_.height,0,pe,Re,null)}}else ie(_.depthTexture,0);let _e=W.__webglTexture,he=je(_),D=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,X=_.depthTexture.format===as?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===pi)at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,D,_e,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,X,D,_e,0);else if(_.depthTexture.format===as)at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,D,_e,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,X,D,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ct(C){let _=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let Y=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){let W=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",W)};Y.addEventListener("dispose",W),_.__depthDisposeCallback=W}_.__boundDepthTexture=Y}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(G)for(let Y=0;Y<6;Y++)Ke(_.__webglFramebuffer[Y],C,Y);else{let Y=C.texture.mipmaps;Y&&Y.length>0?Ke(_.__webglFramebuffer[0],C,0):Ke(_.__webglFramebuffer,C,0)}else if(G){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),gt(_.__webglDepthbuffer[Y],C,!1);else{let W=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,_e)}}else{let Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),gt(_.__webglDepthbuffer,C,!1);else{let W=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,_e)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(C,_,G){let Y=n.get(C);_!==void 0&&He(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ct(C)}function re(C){let _=C.texture,G=n.get(C),Y=n.get(_);C.addEventListener("dispose",y);let W=C.textures,_e=C.isWebGLCubeRenderTarget===!0,he=W.length>1;if(he||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),_e){G.__webglFramebuffer=[];for(let D=0;D<6;D++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[D]=[];for(let X=0;X<_.mipmaps.length;X++)G.__webglFramebuffer[D][X]=i.createFramebuffer()}else G.__webglFramebuffer[D]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let D=0;D<_.mipmaps.length;D++)G.__webglFramebuffer[D]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(he)for(let D=0,X=W.length;D<X;D++){let pe=n.get(W[D]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&at(C)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let D=0;D<W.length;D++){let X=W[D];G.__webglColorRenderbuffer[D]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[D]);let pe=r.convert(X.format,X.colorSpace),Re=r.convert(X.type),we=M(X.internalFormat,pe,Re,X.normalized,X.colorSpace,C.isXRRenderTarget===!0),ye=je(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,we,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+D,i.RENDERBUFFER,G.__webglColorRenderbuffer[D])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_e){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_);for(let D=0;D<6;D++)if(_.mipmaps&&_.mipmaps.length>0)for(let X=0;X<_.mipmaps.length;X++)He(G.__webglFramebuffer[D][X],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,X);else He(G.__webglFramebuffer[D],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);m(_)&&I(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let D=0,X=W.length;D<X;D++){let pe=W[D],Re=n.get(pe),we=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(we=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(we,Re.__webglTexture),Xe(we,pe),He(G.__webglFramebuffer,C,pe,i.COLOR_ATTACHMENT0+D,we,0),m(pe)&&I(we)}t.unbindTexture()}else{let D=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(D=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(D,Y.__webglTexture),Xe(D,_),_.mipmaps&&_.mipmaps.length>0)for(let X=0;X<_.mipmaps.length;X++)He(G.__webglFramebuffer[X],C,_,i.COLOR_ATTACHMENT0,D,X);else He(G.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,D,0);m(_)&&I(D),t.unbindTexture()}C.depthBuffer&&ct(C)}function Fe(C){let _=C.textures;for(let G=0,Y=_.length;G<Y;G++){let W=_[G];if(m(W)){let _e=L(C),he=n.get(W).__webglTexture;t.bindTexture(_e,he),I(_e),t.unbindTexture()}}}let $e=[],qe=[];function ut(C){if(C.samples>0){if(at(C)===!1){let _=C.textures,G=C.width,Y=C.height,W=i.COLOR_BUFFER_BIT,_e=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(C),D=_.length>1;if(D)for(let pe=0;pe<_.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);let X=C.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let pe=0;pe<_.length;pe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),D){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[pe]);let Re=n.get(_[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Re,0)}i.blitFramebuffer(0,0,G,Y,0,0,G,Y,W,i.NEAREST),c===!0&&($e.length=0,qe.length=0,$e.push(i.COLOR_ATTACHMENT0+pe),C.depthBuffer&&C.resolveDepthBuffer===!1&&($e.push(_e),qe.push(_e),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$e))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),D)for(let pe=0;pe<_.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,he.__webglColorRenderbuffer[pe]);let Re=n.get(_[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function je(C){return Math.min(s.maxSamples,C.samples)}function at(C){let _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(C){let _=a.render.frame;d.get(C)!==_&&(d.set(C,_),C.update())}function Mt(C,_){let G=C.colorSpace,Y=C.format,W=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==ta&&G!==Oi&&(_t.getTransfer(G)===Et?(Y!==qn||W!==zn)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",G)),_}function st(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(u.width=C.naturalWidth||C.width,u.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(u.width=C.displayWidth,u.height=C.displayHeight):(u.width=C.width,u.height=C.height),u}this.allocateTextureUnit=ee,this.resetTextureUnits=te,this.getTextureUnits=K,this.setTextureUnits=q,this.setTexture2D=ie,this.setTexture2DArray=ue,this.setTexture3D=ge,this.setTextureCube=fe,this.rebindTextures=ot,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=ut,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=He,this.useMultisampledRTT=at,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fv(i,e){function t(n,s=Oi){let r,a=_t.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ou)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nu)return i.BYTE;if(n===Fu)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===gi)return i.HALF_FLOAT;if(n===Bu)return i.ALPHA;if(n===zu)return i.RGB;if(n===qn)return i.RGBA;if(n===pi)return i.DEPTH_COMPONENT;if(n===as)return i.DEPTH_STENCIL;if(n===ku)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===os)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===dl)return i.RGBA_INTEGER;if(n===Ea||n===wa||n===Aa||n===Ta)if(a===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fl||n===pl||n===ml||n===gl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_l||n===xl||n===yl||n===vl||n===bl||n===Ca||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_l||n===xl)return a===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vl)return r.COMPRESSED_R11_EAC;if(n===bl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ca)return r.COMPRESSED_RG11_EAC;if(n===Sl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ml||n===El||n===wl||n===Al||n===Tl||n===Cl||n===Rl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl||n===Fl||n===Ul)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ml)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Al)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Il)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ul)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ol)return a===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Vl||n===Ra||n===Hl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new sn(new Ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fh=class extends si{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,u=null,d=null,f=null,h=null,g=null,v=null,A=typeof XRWebGLBinding<"u",p=new dh,m={},I=t.getContextAttributes(),L=null,M=null,w=[],T=[],P=new Je,y=null,R=new en;R.viewport=new It;let k=new en;k.viewport=new It;let N=[R,k],F=new nl,te=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let Se=w[se];return Se===void 0&&(Se=new gr,w[se]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(se){let Se=w[se];return Se===void 0&&(Se=new gr,w[se]=Se),Se.getGripSpace()},this.getHand=function(se){let Se=w[se];return Se===void 0&&(Se=new gr,w[se]=Se),Se.getHandSpace()};function q(se){let Se=T.indexOf(se.inputSource);if(Se===-1)return;let me=w[Se];me!==void 0&&(me.update(se.inputSource,se.frame,u||a),me.dispatchEvent({type:se.type,data:se.inputSource}))}function ee(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",j);for(let se=0;se<w.length;se++){let Se=T[se];Se!==null&&(T[se]=null,w[se].disconnect(Se))}te=null,K=null,p.reset();for(let se in m)delete m[se];e.setRenderTarget(L),g=null,h=null,f=null,s=null,M=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(se){u=se},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return f===null&&A&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(L=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",j),I.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,ze=null,it=null;I.depth&&(it=I.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=I.stencil?as:pi,ze=I.stencil?Mr:ai);let He={colorFormat:t.RGBA8,depthFormat:it,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(He),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Un(h.textureWidth,h.textureHeight,{format:qn,type:zn,depthTexture:new Ui(h.textureWidth,h.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let me={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),M=new Un(g.framebufferWidth,g.framebufferHeight,{format:qn,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await s.requestReferenceSpace(o),Xe.setContext(s),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(se){for(let Se=0;Se<se.removed.length;Se++){let me=se.removed[Se],ze=T.indexOf(me);ze>=0&&(T[ze]=null,w[ze].disconnect(me))}for(let Se=0;Se<se.added.length;Se++){let me=se.added[Se],ze=T.indexOf(me);if(ze===-1){for(let He=0;He<w.length;He++)if(He>=T.length){T.push(me),ze=He;break}else if(T[He]===null){T[He]=me,ze=He;break}if(ze===-1)break}let it=w[ze];it&&it.connect(me)}}let ie=new B,ue=new B;function ge(se,Se,me){ie.setFromMatrixPosition(Se.matrixWorld),ue.setFromMatrixPosition(me.matrixWorld);let ze=ie.distanceTo(ue),it=Se.projectionMatrix.elements,He=me.projectionMatrix.elements,gt=it[14]/(it[10]-1),Ke=it[14]/(it[10]+1),ct=(it[9]+1)/it[5],ot=(it[9]-1)/it[5],re=(it[8]-1)/it[0],Fe=(He[8]+1)/He[0],$e=gt*re,qe=gt*Fe,ut=ze/(-re+Fe),je=ut*-re;if(Se.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(je),se.translateZ(ut),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),it[10]===-1)se.projectionMatrix.copy(Se.projectionMatrix),se.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{let at=gt+ut,z=Ke+ut,Mt=$e-je,st=qe+(ze-je),C=ct*Ke/z*at,_=ot*Ke/z*at;se.projectionMatrix.makePerspective(Mt,st,C,_,at,z),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function fe(se,Se){Se===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(Se.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let Se=se.near,me=se.far;p.texture!==null&&(p.depthNear>0&&(Se=p.depthNear),p.depthFar>0&&(me=p.depthFar)),F.near=k.near=R.near=Se,F.far=k.far=R.far=me,(te!==F.near||K!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),te=F.near,K=F.far),F.layers.mask=se.layers.mask|6,R.layers.mask=F.layers.mask&-5,k.layers.mask=F.layers.mask&-3;let ze=se.parent,it=F.cameras;fe(F,ze);for(let He=0;He<it.length;He++)fe(it[He],ze);it.length===2?ge(F,R,k):F.projectionMatrix.copy(R.projectionMatrix),xe(se,F,ze)};function xe(se,Se,me){me===null?se.matrix.copy(Se.matrixWorld):(se.matrix.copy(me.matrixWorld),se.matrix.invert(),se.matrix.multiply(Se.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(Se.projectionMatrix),se.projectionMatrixInverse.copy(Se.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=fr*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(se){c=se,h!==null&&(h.fixedFoveation=se),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=se)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(se){return m[se]};let Ce=null;function ve(se,Se){if(d=Se.getViewerPose(u||a),v=Se,d!==null){let me=d.views;g!==null&&(e.setRenderTargetFramebuffer(M,g.framebuffer),e.setRenderTarget(M));let ze=!1;me.length!==F.cameras.length&&(F.cameras.length=0,ze=!0);for(let Ke=0;Ke<me.length;Ke++){let ct=me[Ke],ot=null;if(g!==null)ot=g.getViewport(ct);else{let Fe=f.getViewSubImage(h,ct);ot=Fe.viewport,Ke===0&&(e.setRenderTargetTextures(M,Fe.colorTexture,Fe.depthStencilTexture),e.setRenderTarget(M))}let re=N[Ke];re===void 0&&(re=new en,re.layers.enable(Ke),re.viewport=new It,N[Ke]=re),re.matrix.fromArray(ct.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(ct.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ot.x,ot.y,ot.width,ot.height),Ke===0&&(F.matrix.copy(re.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ze===!0&&F.cameras.push(re)}let it=s.enabledFeatures;if(it&&it.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){f=n.getBinding();let Ke=f.getDepthInformation(me[0]);Ke&&Ke.isValid&&Ke.texture&&p.init(Ke,s.renderState)}if(it&&it.includes("camera-access")&&A){e.state.unbindTexture(),f=n.getBinding();for(let Ke=0;Ke<me.length;Ke++){let ct=me[Ke].camera;if(ct){let ot=m[ct];ot||(ot=new fa,m[ct]=ot);let re=f.getCameraImage(ct);ot.sourceTexture=re}}}}for(let me=0;me<w.length;me++){let ze=T[me],it=w[me];ze!==null&&it!==void 0&&it.update(ze,Se,u||a)}Ce&&Ce(se,Se),Se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Se}),v=null}let Xe=new Qf;Xe.setAnimationLoop(ve),this.setAnimationLoop=function(se){Ce=se},this.dispose=function(){}}},gv=new Ft,rp=new ht;rp.set(-1,0,0,0,1,0,0,0,1);function _v(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Wu(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,I,L,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),d(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&g(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),v(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),A(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,I,L):m.isSpriteMaterial?u(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Sn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Sn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let I=e.get(m),L=I.envMap,M=I.envMapRotation;L&&(p.envMap.value=L,p.envMapRotation.value.setFromMatrix4(gv.makeRotationFromEuler(M)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(rp),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,I,L){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*I,p.scale.value=L*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function g(p,m,I){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Sn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=I.texture,p.transmissionSamplerSize.value.set(I.width,I.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,m){m.matcap&&(p.matcap.value=m.matcap)}function A(p,m){let I=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(I.matrixWorld),p.nearDistance.value=I.shadow.camera.near,p.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,w){let T=w.program;n.uniformBlockBinding(M,T)}function u(M,w){let T=s[M.id];T===void 0&&(p(M),T=d(M),s[M.id]=T,M.addEventListener("dispose",I));let P=w.program;n.updateUBOMapping(M,P);let y=e.render.frame;r[M.id]!==y&&(h(M),r[M.id]=y)}function d(M){let w=f();M.__bindingPointIndex=w;let T=i.createBuffer(),P=M.__size,y=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let w=s[M.id],T=M.uniforms,P=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,R=T.length;y<R;y++){let k=T[y];if(Array.isArray(k))for(let N=0,F=k.length;N<F;N++)g(k[N],y,N,P);else g(k,y,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(M,w,T,P){if(A(M,w,T,P)===!0){let y=M.__offset,R=M.value;if(Array.isArray(R)){let k=0;for(let N=0;N<R.length;N++){let F=R[N],te=m(F);v(F,M.__data,k),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(k+=te.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,M.__data)}}function v(M,w,T){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,T)}function A(M,w,T,P){let y=M.value,R=w+"_"+T;if(P[R]===void 0)return typeof y=="number"||typeof y=="boolean"?P[R]=y:ArrayBuffer.isView(y)?P[R]=y.slice():P[R]=y.clone(),!0;{let k=P[R];if(typeof y=="number"||typeof y=="boolean"){if(k!==y)return P[R]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(k.equals(y)===!1)return k.copy(y),!0}}return!1}function p(M){let w=M.uniforms,T=0,P=16;for(let R=0,k=w.length;R<k;R++){let N=Array.isArray(w[R])?w[R]:[w[R]];for(let F=0,te=N.length;F<te;F++){let K=N[F],q=Array.isArray(K.value)?K.value:[K.value];for(let ee=0,j=q.length;ee<j;ee++){let ie=q[ee],ue=m(ie),ge=T%P,fe=ge%ue.boundary,xe=ge+fe;T+=fe,xe!==0&&P-xe<ue.storage&&(T+=P-xe),K.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=T,T+=ue.storage}}}let y=T%P;return y>0&&(T+=P-y),M.__size=T,M.__cache={},this}function m(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",M),w}function I(M){let w=M.target;w.removeEventListener("dispose",I);let T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function L(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:u,dispose:L}}var yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xi=null;function vv(){return xi===null&&(xi=new Oo(yv,16,16,os,gi),xi.name="DFG_LUT",xi.minFilter=tn,xi.magFilter=tn,xi.wrapS=fi,xi.wrapT=fi,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}var Ar=class{constructor(e={}){let{canvas:t=Ef(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:g=zn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let A=g,p=new Set([dl,hl,ul]),m=new Set([zn,ai,Sr,Mr,ll,cl]),I=new Uint32Array(4),L=new Int32Array(4),M=new B,w=null,T=null,P=[],y=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,N=!1,F=null,te=null,K=null,q=null;this._outputColorSpace=$t;let ee=0,j=0,ie=null,ue=-1,ge=null,fe=new It,xe=new It,Ce=null,ve=new mt(0),Xe=0,se=t.width,Se=t.height,me=1,ze=null,it=null,He=new It(0,0,se,Se),gt=new It(0,0,se,Se),Ke=!1,ct=new ua,ot=!1,re=!1,Fe=new Ft,$e=new B,qe=new It,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},je=!1;function at(){return ie===null?me:1}let z=n;function Mt(S,H){return t.getContext(S,H)}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",wt,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",ln,!1),z===null){let H="webgl2";if(z=Mt(H,S),z===null)throw Mt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw rt("WebGLRenderer: "+S.message),S}let st,C,_,G,Y,W,_e,he,D,X,pe,Re,we,ye,Pe,de,De,O,Me,ae,Ae,Le,oe;function Ue(){st=new Tx(z),st.init(),Ae=new fv(z,st),C=new yx(z,st,e,Ae),_=new hv(z,st),C.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),te=z.createFramebuffer(),K=z.createFramebuffer(),q=z.createFramebuffer(),G=new Ix(z),Y=new Jy,W=new dv(z,st,_,Y,C,Ae,G),_e=new Ax(k),he=new Ng(z),Le=new _x(z,he),D=new Cx(z,he,G,Le),X=new Lx(z,D,he,Le,G),O=new Px(z,C,W),Pe=new vx(Y),pe=new jy(k,_e,st,C,Le,Pe),Re=new _v(k,Y),we=new Qy,ye=new rv(st),De=new gx(k,_e,_,X,v,c),de=new uv(k,X,C),oe=new xv(z,G,C,_),Me=new xx(z,st,G),ae=new Rx(z,st,G),G.programs=pe.programs,k.capabilities=C,k.extensions=st,k.properties=Y,k.renderLists=we,k.shadowMap=de,k.state=_,k.info=G}Ue(),A!==zn&&(R=new Nx(A,t.width,t.height,o,s,r));let Ge=new fh(k,z);this.xr=Ge,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let S=st.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=st.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(S){S!==void 0&&(me=S,this.setSize(se,Se,!1))},this.getSize=function(S){return S.set(se,Se)},this.setSize=function(S,H,Q=!0){if(Ge.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}se=S,Se=H,t.width=Math.floor(S*me),t.height=Math.floor(H*me),Q===!0&&(t.style.width=S+"px",t.style.height=H+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,S,H)},this.getDrawingBufferSize=function(S){return S.set(se*me,Se*me).floor()},this.setDrawingBufferSize=function(S,H,Q){se=S,Se=H,me=Q,t.width=Math.floor(S*Q),t.height=Math.floor(H*Q),this.setViewport(0,0,S,H)},this.setEffects=function(S){if(A===zn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let H=0;H<S.length;H++)if(S[H].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(fe)},this.getViewport=function(S){return S.copy(He)},this.setViewport=function(S,H,Q,J){S.isVector4?He.set(S.x,S.y,S.z,S.w):He.set(S,H,Q,J),_.viewport(fe.copy(He).multiplyScalar(me).round())},this.getScissor=function(S){return S.copy(gt)},this.setScissor=function(S,H,Q,J){S.isVector4?gt.set(S.x,S.y,S.z,S.w):gt.set(S,H,Q,J),_.scissor(xe.copy(gt).multiplyScalar(me).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(S){_.setScissorTest(Ke=S)},this.setOpaqueSort=function(S){ze=S},this.setTransparentSort=function(S){it=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(S=!0,H=!0,Q=!0){let J=0;if(S){let Z=!1;if(ie!==null){let be=ie.texture.format;Z=p.has(be)}if(Z){let be=ie.texture.type,Oe=m.has(be),Te=De.getClearColor(),ke=De.getClearAlpha(),Ye=Te.r,lt=Te.g,Qe=Te.b;Oe?(I[0]=Ye,I[1]=lt,I[2]=Qe,I[3]=ke,z.clearBufferuiv(z.COLOR,0,I)):(L[0]=Ye,L[1]=lt,L[2]=Qe,L[3]=ke,z.clearBufferiv(z.COLOR,0,L))}else J|=z.COLOR_BUFFER_BIT}H&&(J|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(J|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&z.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),De.dispose(),we.dispose(),ye.dispose(),Y.dispose(),_e.dispose(),X.dispose(),Le.dispose(),oe.dispose(),pe.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Pn),Ge.removeEventListener("sessionend",Lr),li.stop()};function wt(S){S.preventDefault(),ra("WebGLRenderer: Context Lost."),N=!0}function St(){ra("WebGLRenderer: Context Restored."),N=!1;let S=G.autoReset,H=de.enabled,Q=de.autoUpdate,J=de.needsUpdate,Z=de.type;Ue(),G.autoReset=S,de.enabled=H,de.autoUpdate=Q,de.needsUpdate=J,de.type=Z}function ln(S){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function In(S){let H=S.target;H.removeEventListener("dispose",In),Zn(H)}function Zn(S){Ir(S),Y.remove(S)}function Ir(S){let H=Y.get(S).programs;H!==void 0&&(H.forEach(function(Q){pe.releaseProgram(Q)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,H,Q,J,Z,be){H===null&&(H=ut);let Oe=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Te=Bs(S,H,Q,J,Z);_.setMaterial(J,Oe);let ke=Q.index,Ye=1;if(J.wireframe===!0){if(ke=D.getWireframeAttribute(Q),ke===void 0)return;Ye=2}let lt=Q.drawRange,Qe=Q.attributes.position,We=lt.start*Ye,et=(lt.start+lt.count)*Ye;be!==null&&(We=Math.max(We,be.start*Ye),et=Math.min(et,(be.start+be.count)*Ye)),ke!==null?(We=Math.max(We,0),et=Math.min(et,ke.count)):Qe!=null&&(We=Math.max(We,0),et=Math.min(et,Qe.count));let xt=et-We;if(xt<0||xt===1/0)return;Le.setup(Z,J,Te,Q,ke);let vt,yt=Me;if(ke!==null&&(vt=he.get(ke),yt=ae,yt.setIndex(vt)),Z.isMesh)J.wireframe===!0?(_.setLineWidth(J.wireframeLinewidth*at()),yt.setMode(z.LINES)):yt.setMode(z.TRIANGLES);else if(Z.isLine){let zt=J.linewidth;zt===void 0&&(zt=1),_.setLineWidth(zt*at()),Z.isLineSegments?yt.setMode(z.LINES):Z.isLineLoop?yt.setMode(z.LINE_LOOP):yt.setMode(z.LINE_STRIP)}else Z.isPoints?yt.setMode(z.POINTS):Z.isSprite&&yt.setMode(z.TRIANGLES);if(Z.isBatchedMesh)if(st.get("WEBGL_multi_draw"))yt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let zt=Z._multiDrawStarts,Be=Z._multiDrawCounts,Ot=Z._multiDrawCount,Ze=ke?he.get(ke).bytesPerElement:1,pn=Y.get(J).currentProgram.getUniforms();for(let cn=0;cn<Ot;cn++)pn.setValue(z,"_gl_DrawID",cn),yt.render(zt[cn]/Ze,Be[cn])}else if(Z.isInstancedMesh)yt.renderInstances(We,xt,Z.count);else if(Q.isInstancedBufferGeometry){let zt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Be=Math.min(Q.instanceCount,zt);yt.renderInstances(We,xt,Be)}else yt.render(We,xt)};function Pr(S,H,Q){S.transparent===!0&&S.side===$n&&S.forceSinglePass===!1?(S.side=Sn,S.needsUpdate=!0,wn(S,H,Q),S.side=Ni,S.needsUpdate=!0,wn(S,H,Q),S.side=$n):wn(S,H,Q)}this.compile=function(S,H,Q=null){Q===null&&(Q=S),T=ye.get(Q),T.init(H),y.push(T),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),S!==Q&&S.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights();let J=new Set;return S.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let be=Z.material;if(be)if(Array.isArray(be))for(let Oe=0;Oe<be.length;Oe++){let Te=be[Oe];Pr(Te,Q,Z),J.add(Te)}else Pr(be,Q,Z),J.add(be)}),T=y.pop(),J},this.compileAsync=function(S,H,Q=null){let J=this.compile(S,H,Q);return new Promise(Z=>{function be(){if(J.forEach(function(Oe){Y.get(Oe).currentProgram.isReady()&&J.delete(Oe)}),J.size===0){Z(S);return}setTimeout(be,10)}st.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let ds=null;function Ua(S){ds&&ds(S)}function Pn(){li.stop()}function Lr(){li.start()}let li=new Qf;li.setAnimationLoop(Ua),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(S){ds=S,Ge.setAnimationLoop(S),S===null?li.stop():li.start()},Ge.addEventListener("sessionstart",Pn),Ge.addEventListener("sessionend",Lr),this.render=function(S,H){if(H!==void 0&&H.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(S,H);let Q=Ge.enabled===!0&&Ge.isPresenting===!0,J=R!==null&&(ie===null||Q)&&R.begin(k,ie);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(H),H=Ge.getCamera()),S.isScene===!0&&S.onBeforeRender(k,S,H,ie),T=ye.get(S,y.length),T.init(H),T.state.textureUnits=W.getTextureUnits(),y.push(T),Fe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ct.setFromProjectionMatrix(Fe,ii,H.reversedDepth),re=this.localClippingEnabled,ot=Pe.init(this.clippingPlanes,re),w=we.get(S,P.length),w.init(),P.push(w),Ge.enabled===!0&&Ge.isPresenting===!0){let Oe=k.xr.getDepthSensingMesh();Oe!==null&&En(Oe,H,-1/0,k.sortObjects)}En(S,H,0,k.sortObjects),w.finish(),k.sortObjects===!0&&w.sort(ze,it,H.reversedDepth),je=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,je&&De.addToRenderList(w,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ot===!0&&Pe.beginShadows();let Z=T.state.shadowsArray;if(de.render(Z,S,H),ot===!0&&Pe.endShadows(),(J&&R.hasRenderPass())===!1){let Oe=w.opaque,Te=w.transmissive;if(T.setupLights(),H.isArrayCamera){let ke=H.cameras;if(Te.length>0)for(let Ye=0,lt=ke.length;Ye<lt;Ye++){let Qe=ke[Ye];Bi(Oe,Te,S,Qe)}je&&De.render(S);for(let Ye=0,lt=ke.length;Ye<lt;Ye++){let Qe=ke[Ye];Kt(w,S,Qe,Qe.viewport)}}else Te.length>0&&Bi(Oe,Te,S,H),je&&De.render(S),Kt(w,S,H)}ie!==null&&j===0&&(W.updateMultisampleRenderTarget(ie),W.updateRenderTargetMipmap(ie)),J&&R.end(k),S.isScene===!0&&S.onAfterRender(k,S,H),Le.resetDefaultState(),ue=-1,ge=null,y.pop(),y.length>0?(T=y[y.length-1],W.setTextureUnits(T.state.textureUnits),ot===!0&&Pe.setGlobalState(k.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,F!==null&&F.renderEnd()};function En(S,H,Q,J){if(S.visible===!1)return;if(S.layers.test(H.layers)){if(S.isGroup)Q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(H);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ct.intersectsSprite(S)){J&&qe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Fe);let Oe=X.update(S),Te=S.material;Te.visible&&w.push(S,Oe,Te,Q,qe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ct.intersectsObject(S))){let Oe=X.update(S),Te=S.material;if(J&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),qe.copy(S.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),qe.copy(Oe.boundingSphere.center)),qe.applyMatrix4(S.matrixWorld).applyMatrix4(Fe)),Array.isArray(Te)){let ke=Oe.groups;for(let Ye=0,lt=ke.length;Ye<lt;Ye++){let Qe=ke[Ye],We=Te[Qe.materialIndex];We&&We.visible&&w.push(S,Oe,We,Q,qe.z,Qe)}}else Te.visible&&w.push(S,Oe,Te,Q,qe.z,null)}}let be=S.children;for(let Oe=0,Te=be.length;Oe<Te;Oe++)En(be[Oe],H,Q,J)}function Kt(S,H,Q,J){let{opaque:Z,transmissive:be,transparent:Oe}=S;T.setupLightsView(Q),ot===!0&&Pe.setGlobalState(k.clippingPlanes,Q),J&&_.viewport(fe.copy(J)),Z.length>0&&Vt(Z,H,Q),be.length>0&&Vt(be,H,Q),Oe.length>0&&Vt(Oe,H,Q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Bi(S,H,Q,J){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[J.id]===void 0){let We=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[J.id]=new Un(1,1,{generateMipmaps:!0,type:We?gi:zn,minFilter:rs,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let be=T.state.transmissionRenderTarget[J.id],Oe=J.viewport||fe;be.setSize(Oe.z*k.transmissionResolutionScale,Oe.w*k.transmissionResolutionScale);let Te=k.getRenderTarget(),ke=k.getActiveCubeFace(),Ye=k.getActiveMipmapLevel();k.setRenderTarget(be),k.getClearColor(ve),Xe=k.getClearAlpha(),Xe<1&&k.setClearColor(16777215,.5),k.clear(),je&&De.render(Q);let lt=k.toneMapping;k.toneMapping=ri;let Qe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),T.setupLightsView(J),ot===!0&&Pe.setGlobalState(k.clippingPlanes,J),Vt(S,Q,J),W.updateMultisampleRenderTarget(be),W.updateRenderTargetMipmap(be),st.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let et=0,xt=H.length;et<xt;et++){let vt=H[et],{object:yt,geometry:zt,material:Be,group:Ot}=vt;if(Be.side===$n&&yt.layers.test(J.layers)){let Ze=Be.side;Be.side=Sn,Be.needsUpdate=!0,kn(yt,Q,J,zt,Be,Ot),Be.side=Ze,Be.needsUpdate=!0,We=!0}}We===!0&&(W.updateMultisampleRenderTarget(be),W.updateRenderTargetMipmap(be))}k.setRenderTarget(Te,ke,Ye),k.setClearColor(ve,Xe),Qe!==void 0&&(J.viewport=Qe),k.toneMapping=lt}function Vt(S,H,Q){let J=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,be=S.length;Z<be;Z++){let Oe=S[Z],{object:Te,geometry:ke,group:Ye}=Oe,lt=Oe.material;lt.allowOverride===!0&&J!==null&&(lt=J),Te.layers.test(Q.layers)&&kn(Te,H,Q,ke,lt,Ye)}}function kn(S,H,Q,J,Z,be){S.onBeforeRender(k,H,Q,J,Z,be),S.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Z.onBeforeRender(k,H,Q,J,S,be),Z.transparent===!0&&Z.side===$n&&Z.forceSinglePass===!1?(Z.side=Sn,Z.needsUpdate=!0,k.renderBufferDirect(Q,H,J,Z,S,be),Z.side=Ni,Z.needsUpdate=!0,k.renderBufferDirect(Q,H,J,Z,S,be),Z.side=$n):k.renderBufferDirect(Q,H,J,Z,S,be),S.onAfterRender(k,H,Q,J,Z,be)}function wn(S,H,Q){H.isScene!==!0&&(H=ut);let J=Y.get(S),Z=T.state.lights,be=T.state.shadowsArray,Oe=Z.state.version,Te=pe.getParameters(S,Z.state,be,H,Q,T.state.lightProbeGridArray),ke=pe.getProgramCacheKey(Te),Ye=J.programs;J.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?H.environment:null,J.fog=H.fog;let lt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;J.envMap=_e.get(S.envMap||J.environment,lt),J.envMapRotation=J.environment!==null&&S.envMap===null?H.environmentRotation:S.envMapRotation,Ye===void 0&&(S.addEventListener("dispose",In),Ye=new Map,J.programs=Ye);let Qe=Ye.get(ke);if(Qe!==void 0){if(J.currentProgram===Qe&&J.lightsStateVersion===Oe)return Dr(S,Te),Qe}else Te.uniforms=pe.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,Q,Te),S.onBeforeCompile(Te,k),Qe=pe.acquireProgram(Te,ke),Ye.set(ke,Qe),J.uniforms=Te.uniforms;let We=J.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(We.clippingPlanes=Pe.uniform),Dr(S,Te),J.needsLights=jn(S),J.lightsStateVersion=Oe,J.needsLights&&(We.ambientLightColor.value=Z.state.ambient,We.lightProbe.value=Z.state.probe,We.directionalLights.value=Z.state.directional,We.directionalLightShadows.value=Z.state.directionalShadow,We.spotLights.value=Z.state.spot,We.spotLightShadows.value=Z.state.spotShadow,We.rectAreaLights.value=Z.state.rectArea,We.ltc_1.value=Z.state.rectAreaLTC1,We.ltc_2.value=Z.state.rectAreaLTC2,We.pointLights.value=Z.state.point,We.pointLightShadows.value=Z.state.pointShadow,We.hemisphereLights.value=Z.state.hemi,We.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,We.spotLightMatrix.value=Z.state.spotLightMatrix,We.spotLightMap.value=Z.state.spotLightMap,We.pointShadowMatrix.value=Z.state.pointShadowMatrix),J.lightProbeGrid=T.state.lightProbeGridArray.length>0,J.currentProgram=Qe,J.uniformsList=null,Qe}function fn(S){if(S.uniformsList===null){let H=S.currentProgram.getUniforms();S.uniformsList=wr.seqWithValue(H.seq,S.uniforms)}return S.uniformsList}function Dr(S,H){let Q=Y.get(S);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function fs(S,H){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(H.matrixWorld);for(let Q=0,J=S.length;Q<J;Q++){let Z=S[Q];if(Z.texture!==null&&Z.boundingBox.containsPoint(M))return Z}return null}function Bs(S,H,Q,J,Z){H.isScene!==!0&&(H=ut),W.resetTextureUnits();let be=H.fog,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?H.environment:null,Te=ie===null?k.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:_t.workingColorSpace,ke=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Ye=_e.get(J.envMap||Oe,ke),lt=J.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Qe=!!Q.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),We=!!Q.morphAttributes.position,et=!!Q.morphAttributes.normal,xt=!!Q.morphAttributes.color,vt=ri;J.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(vt=k.toneMapping);let yt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,zt=yt!==void 0?yt.length:0,Be=Y.get(J),Ot=T.state.lights;if(ot===!0&&(re===!0||S!==ge)){let At=S===ge&&J.id===ue;Pe.setState(J,S,At)}let Ze=!1;J.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Ot.state.version||Be.outputColorSpace!==Te||Z.isBatchedMesh&&Be.batching===!1||!Z.isBatchedMesh&&Be.batching===!0||Z.isBatchedMesh&&Be.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Be.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Be.instancing===!1||!Z.isInstancedMesh&&Be.instancing===!0||Z.isSkinnedMesh&&Be.skinning===!1||!Z.isSkinnedMesh&&Be.skinning===!0||Z.isInstancedMesh&&Be.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Be.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Be.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Be.instancingMorph===!1&&Z.morphTexture!==null||Be.envMap!==Ye||J.fog===!0&&Be.fog!==be||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Pe.numPlanes||Be.numIntersection!==Pe.numIntersection)||Be.vertexAlphas!==lt||Be.vertexTangents!==Qe||Be.morphTargets!==We||Be.morphNormals!==et||Be.morphColors!==xt||Be.toneMapping!==vt||Be.morphTargetsCount!==zt||!!Be.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,Be.__version=J.version);let pn=Be.currentProgram;Ze===!0&&(pn=wn(J,H,Z),F&&J.isNodeMaterial&&F.onUpdateProgram(J,pn,Be));let cn=!1,mn=!1,ci=!1,bt=pn.getUniforms(),Dt=Be.uniforms;if(_.useProgram(pn.program)&&(cn=!0,mn=!0,ci=!0),J.id!==ue&&(ue=J.id,mn=!0),Be.needsLights){let At=fs(T.state.lightProbeGridArray,Z);Be.lightProbeGrid!==At&&(Be.lightProbeGrid=At,mn=!0)}if(cn||ge!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),bt.setValue(z,"projectionMatrix",S.projectionMatrix),bt.setValue(z,"viewMatrix",S.matrixWorldInverse);let Kn=bt.map.cameraPosition;Kn!==void 0&&Kn.setValue(z,$e.setFromMatrixPosition(S.matrixWorld)),C.logarithmicDepthBuffer&&bt.setValue(z,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&bt.setValue(z,"isOrthographic",S.isOrthographicCamera===!0),ge!==S&&(ge=S,mn=!0,ci=!0)}if(Be.needsLights&&(Ot.state.directionalShadowMap.length>0&&bt.setValue(z,"directionalShadowMap",Ot.state.directionalShadowMap,W),Ot.state.spotShadowMap.length>0&&bt.setValue(z,"spotShadowMap",Ot.state.spotShadowMap,W),Ot.state.pointShadowMap.length>0&&bt.setValue(z,"pointShadowMap",Ot.state.pointShadowMap,W)),Z.isSkinnedMesh){bt.setOptional(z,Z,"bindMatrix"),bt.setOptional(z,Z,"bindMatrixInverse");let At=Z.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),bt.setValue(z,"boneTexture",At.boneTexture,W))}Z.isBatchedMesh&&(bt.setOptional(z,Z,"batchingTexture"),bt.setValue(z,"batchingTexture",Z._matricesTexture,W),bt.setOptional(z,Z,"batchingIdTexture"),bt.setValue(z,"batchingIdTexture",Z._indirectTexture,W),bt.setOptional(z,Z,"batchingColorTexture"),Z._colorsTexture!==null&&bt.setValue(z,"batchingColorTexture",Z._colorsTexture,W));let Jn=Q.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&O.update(Z,Q,pn),(mn||Be.receiveShadow!==Z.receiveShadow)&&(Be.receiveShadow=Z.receiveShadow,bt.setValue(z,"receiveShadow",Z.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&H.environment!==null&&(Dt.envMapIntensity.value=H.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=vv()),mn){if(bt.setValue(z,"toneMappingExposure",k.toneMappingExposure),Be.needsLights&&zs(Dt,ci),be&&J.fog===!0&&Re.refreshFogUniforms(Dt,be),Re.refreshMaterialUniforms(Dt,J,me,Se,T.state.transmissionRenderTarget[S.id]),Be.needsLights&&Be.lightProbeGrid){let At=Be.lightProbeGrid;Dt.probesSH.value=At.texture,Dt.probesMin.value.copy(At.boundingBox.min),Dt.probesMax.value.copy(At.boundingBox.max),Dt.probesResolution.value.copy(At.resolution)}wr.upload(z,fn(Be),Dt,W)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(wr.upload(z,fn(Be),Dt,W),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&bt.setValue(z,"center",Z.center),bt.setValue(z,"modelViewMatrix",Z.modelViewMatrix),bt.setValue(z,"normalMatrix",Z.normalMatrix),bt.setValue(z,"modelMatrix",Z.matrixWorld),J.uniformsGroups!==void 0){let At=J.uniformsGroups;for(let Kn=0,zi=At.length;Kn<zi;Kn++){let Ht=At[Kn];oe.update(Ht,pn),oe.bind(Ht,pn)}}return pn}function zs(S,H){S.ambientLightColor.needsUpdate=H,S.lightProbe.needsUpdate=H,S.directionalLights.needsUpdate=H,S.directionalLightShadows.needsUpdate=H,S.pointLights.needsUpdate=H,S.pointLightShadows.needsUpdate=H,S.spotLights.needsUpdate=H,S.spotLightShadows.needsUpdate=H,S.rectAreaLights.needsUpdate=H,S.hemisphereLights.needsUpdate=H}function jn(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(S,H,Q){let J=Y.get(S);J.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Y.get(S.texture).__webglTexture=H,Y.get(S.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:Q,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,H){let Q=Y.get(S);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(S,H=0,Q=0){ie=S,ee=H,j=Q;let J=null,Z=!1,be=!1;if(S){let Te=Y.get(S);if(Te.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,Te.__webglFramebuffer),fe.copy(S.viewport),xe.copy(S.scissor),Ce=S.scissorTest,_.viewport(fe),_.scissor(xe),_.setScissorTest(Ce),ue=-1;return}else if(Te.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(Te.__hasExternalTextures)W.rebindTextures(S,Y.get(S.texture).__webglTexture,Y.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let lt=S.depthTexture;if(Te.__boundDepthTexture!==lt){if(lt!==null&&Y.has(lt)&&(S.width!==lt.image.width||S.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}let ke=S.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(be=!0);let Ye=Y.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ye[H])?J=Ye[H][Q]:J=Ye[H],Z=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?J=Y.get(S).__webglMultisampledFramebuffer:Array.isArray(Ye)?J=Ye[Q]:J=Ye,fe.copy(S.viewport),xe.copy(S.scissor),Ce=S.scissorTest}else fe.copy(He).multiplyScalar(me).floor(),xe.copy(gt).multiplyScalar(me).floor(),Ce=Ke;if(Q!==0&&(J=te),_.bindFramebuffer(z.FRAMEBUFFER,J)&&_.drawBuffers(S,J),_.viewport(fe),_.scissor(xe),_.setScissorTest(Ce),Z){let Te=Y.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+H,Te.__webglTexture,Q)}else if(be){let Te=H;for(let ke=0;ke<S.textures.length;ke++){let Ye=Y.get(S.textures[ke]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+ke,Ye.__webglTexture,Q,Te)}}else if(S!==null&&Q!==0){let Te=Y.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Te.__webglTexture,Q)}ue=-1},this.readRenderTargetPixels=function(S,H,Q,J,Z,be,Oe,Te=0){if(!(S&&S.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Oe!==void 0&&(ke=ke[Oe]),ke){_.bindFramebuffer(z.FRAMEBUFFER,ke);try{let Ye=S.textures[Te],lt=Ye.format,Qe=Ye.type;if(S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te),!C.textureFormatReadable(lt)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Qe)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=S.width-J&&Q>=0&&Q<=S.height-Z&&z.readPixels(H,Q,J,Z,Ae.convert(lt),Ae.convert(Qe),be)}finally{let Ye=ie!==null?Y.get(ie).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(S,H,Q,J,Z,be,Oe,Te=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Oe!==void 0&&(ke=ke[Oe]),ke)if(H>=0&&H<=S.width-J&&Q>=0&&Q<=S.height-Z){_.bindFramebuffer(z.FRAMEBUFFER,ke);let Ye=S.textures[Te],lt=Ye.format,Qe=Ye.type;if(S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te),!C.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,We),z.bufferData(z.PIXEL_PACK_BUFFER,be.byteLength,z.STREAM_READ),z.readPixels(H,Q,J,Z,Ae.convert(lt),Ae.convert(Qe),0);let et=ie!==null?Y.get(ie).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,et);let xt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Af(z,xt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,We),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,be),z.deleteBuffer(We),z.deleteSync(xt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,H=null,Q=0){let J=Math.pow(2,-Q),Z=Math.floor(S.image.width*J),be=Math.floor(S.image.height*J),Oe=H!==null?H.x:0,Te=H!==null?H.y:0;W.setTexture2D(S,0),z.copyTexSubImage2D(z.TEXTURE_2D,Q,0,0,Oe,Te,Z,be),_.unbindTexture()},this.copyTextureToTexture=function(S,H,Q=null,J=null,Z=0,be=0){let Oe,Te,ke,Ye,lt,Qe,We,et,xt,vt=S.isCompressedTexture?S.mipmaps[be]:S.image;if(Q!==null)Oe=Q.max.x-Q.min.x,Te=Q.max.y-Q.min.y,ke=Q.isBox3?Q.max.z-Q.min.z:1,Ye=Q.min.x,lt=Q.min.y,Qe=Q.isBox3?Q.min.z:0;else{let Dt=Math.pow(2,-Z);Oe=Math.floor(vt.width*Dt),Te=Math.floor(vt.height*Dt),S.isDataArrayTexture?ke=vt.depth:S.isData3DTexture?ke=Math.floor(vt.depth*Dt):ke=1,Ye=0,lt=0,Qe=0}J!==null?(We=J.x,et=J.y,xt=J.z):(We=0,et=0,xt=0);let yt=Ae.convert(H.format),zt=Ae.convert(H.type),Be;H.isData3DTexture?(W.setTexture3D(H,0),Be=z.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(W.setTexture2DArray(H,0),Be=z.TEXTURE_2D_ARRAY):(W.setTexture2D(H,0),Be=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,H.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,H.unpackAlignment);let Ot=_.getParameter(z.UNPACK_ROW_LENGTH),Ze=_.getParameter(z.UNPACK_IMAGE_HEIGHT),pn=_.getParameter(z.UNPACK_SKIP_PIXELS),cn=_.getParameter(z.UNPACK_SKIP_ROWS),mn=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,vt.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,vt.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Ye),_.pixelStorei(z.UNPACK_SKIP_ROWS,lt),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Qe);let ci=S.isDataArrayTexture||S.isData3DTexture,bt=H.isDataArrayTexture||H.isData3DTexture;if(S.isDepthTexture){let Dt=Y.get(S),Jn=Y.get(H),At=Y.get(Dt.__renderTarget),Kn=Y.get(Jn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,At.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let zi=0;zi<ke;zi++)ci&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(S).__webglTexture,Z,Qe+zi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(H).__webglTexture,be,xt+zi)),z.blitFramebuffer(Ye,lt,Oe,Te,We,et,Oe,Te,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Z!==0||S.isRenderTargetTexture||Y.has(S)){let Dt=Y.get(S),Jn=Y.get(H);_.bindFramebuffer(z.READ_FRAMEBUFFER,K),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,q);for(let At=0;At<ke;At++)ci?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Dt.__webglTexture,Z,Qe+At):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Dt.__webglTexture,Z),bt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Jn.__webglTexture,be,xt+At):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Jn.__webglTexture,be),Z!==0?z.blitFramebuffer(Ye,lt,Oe,Te,We,et,Oe,Te,z.COLOR_BUFFER_BIT,z.NEAREST):bt?z.copyTexSubImage3D(Be,be,We,et,xt+At,Ye,lt,Oe,Te):z.copyTexSubImage2D(Be,be,We,et,Ye,lt,Oe,Te);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else bt?S.isDataTexture||S.isData3DTexture?z.texSubImage3D(Be,be,We,et,xt,Oe,Te,ke,yt,zt,vt.data):H.isCompressedArrayTexture?z.compressedTexSubImage3D(Be,be,We,et,xt,Oe,Te,ke,yt,vt.data):z.texSubImage3D(Be,be,We,et,xt,Oe,Te,ke,yt,zt,vt):S.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,be,We,et,Oe,Te,yt,zt,vt.data):S.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,be,We,et,vt.width,vt.height,yt,vt.data):z.texSubImage2D(z.TEXTURE_2D,be,We,et,Oe,Te,yt,zt,vt);_.pixelStorei(z.UNPACK_ROW_LENGTH,Ot),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ze),_.pixelStorei(z.UNPACK_SKIP_PIXELS,pn),_.pixelStorei(z.UNPACK_SKIP_ROWS,cn),_.pixelStorei(z.UNPACK_SKIP_IMAGES,mn),be===0&&H.generateMipmaps&&z.generateMipmap(Be),_.unbindTexture()},this.initRenderTarget=function(S){Y.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){ee=0,j=0,ie=null,_.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};var ap=new vn,Jl=new B,Cr=class extends _a{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new kt(e,3)),this.setAttribute("uv",new kt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ts(t,6,1);return this.setAttribute("instanceStart",new On(n,3,0)),this.setAttribute("instanceEnd",new On(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ts(t,6,1);return this.setAttribute("instanceColorStart",new On(n,3,0)),this.setAttribute("instanceColorEnd",new On(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new pa(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ap.setFromBufferAttribute(t),this.boundingBox.union(ap))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jl)),Jl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Jl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ne.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Je},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Mn.line={uniforms:Ia.merge([Ne.common,Ne.fog,Ne.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Rr=class extends bn{constructor(e){super({type:"LineMaterial",uniforms:Ia.clone(Mn.line.uniforms),vertexShader:Mn.line.vertexShader,fragmentShader:Mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var mh=new It,op=new B,lp=new B,rn=new It,an=new It,yi=new It,gh=new B,_h=new Ft,on=new ya,cp=new B,Kl=new vn,Ql=new Cn,vi=new It,bi,Us;function up(i,e,t){return vi.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),vi.multiplyScalar(1/vi.w),vi.x=Us/t.width,vi.y=Us/t.height,vi.applyMatrix4(i.projectionMatrixInverse),vi.multiplyScalar(1/vi.w),Math.abs(Math.max(vi.x,vi.y))}function bv(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,c=a;o<c;o++){on.start.fromBufferAttribute(s,o),on.end.fromBufferAttribute(r,o),on.applyMatrix4(t);let u=new B,d=new B;bi.distanceSqToSegment(on.start,on.end,d,u),d.distanceTo(u)<Us*.5&&e.push({point:d,pointOnLine:u,distance:bi.origin.distanceTo(d),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Sv(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,c=o.attributes.instanceStart,u=o.attributes.instanceEnd,d=Math.min(o.instanceCount,c.count),f=-e.near;bi.at(1,yi),yi.w=1,yi.applyMatrix4(e.matrixWorldInverse),yi.applyMatrix4(n),yi.multiplyScalar(1/yi.w),yi.x*=r.x/2,yi.y*=r.y/2,yi.z=0,gh.copy(yi),_h.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,g=d;h<g;h++){if(rn.fromBufferAttribute(c,h),an.fromBufferAttribute(u,h),rn.w=1,an.w=1,rn.applyMatrix4(_h),an.applyMatrix4(_h),rn.z>f&&an.z>f)continue;if(rn.z>f){let L=rn.z-an.z,M=(rn.z-f)/L;rn.lerp(an,M)}else if(an.z>f){let L=an.z-rn.z,M=(an.z-f)/L;an.lerp(rn,M)}rn.applyMatrix4(n),an.applyMatrix4(n),rn.multiplyScalar(1/rn.w),an.multiplyScalar(1/an.w),rn.x*=r.x/2,rn.y*=r.y/2,an.x*=r.x/2,an.y*=r.y/2,on.start.copy(rn),on.start.z=0,on.end.copy(an),on.end.z=0;let A=on.closestPointToPointParameter(gh,!0);on.at(A,cp);let p=_i.lerp(rn.z,an.z,A),m=p>=-1&&p<=1,I=gh.distanceTo(cp)<Us*.5;if(m&&I){on.start.fromBufferAttribute(c,h),on.end.fromBufferAttribute(u,h),on.start.applyMatrix4(a),on.end.applyMatrix4(a);let L=new B,M=new B;bi.distanceSqToSegment(on.start,on.end,M,L),t.push({point:M,pointOnLine:L,distance:bi.origin.distanceTo(M),object:i,face:null,faceIndex:h,uv:null,uv1:null})}}}var ec=class extends sn{constructor(e=new Cr,t=new Rr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,c=t.count;a<c;a++,o+=2)op.fromBufferAttribute(t,a),lp.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+op.distanceTo(lp);let r=new ts(s,2,1);return e.setAttribute("instanceDistanceStart",new On(r,1,0)),e.setAttribute("instanceDistanceEnd",new On(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;bi=e.ray;let a=this.matrixWorld,o=this.geometry,c=this.material;Us=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Ql.copy(o.boundingSphere).applyMatrix4(a);let u;if(n)u=Us*.5;else{let f=Math.max(s.near,Ql.distanceToPoint(bi.origin));u=up(s,f,c.resolution)}if(Ql.radius+=u,bi.intersectsSphere(Ql)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Kl.copy(o.boundingBox).applyMatrix4(a);let d;if(n)d=Us*.5;else{let f=Math.max(s.near,Kl.distanceToPoint(bi.origin));d=up(s,f,c.resolution)}Kl.expandByScalar(d),bi.intersectsBox(Kl)!==!1&&(n?bv(this,t):Sv(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(mh),this.material.uniforms.resolution.value.set(mh.z,mh.w))}};var cs=Object.freeze({TREND_RESIDUAL:"trend_residual",INTELLIGENCE_UPLIFT:"intelligence_uplift",WEIGHTED_EXCLUSIVE_HYPERVOLUME:"weighted_exclusive_hypervolume",FRONTIER_DISTANCE:"frontier_distance"}),Yn=Object.freeze({[cs.TREND_RESIDUAL]:{label:"\u8D8B\u52BF\u6B8B\u5DEE",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"trend_residual"},[cs.INTELLIGENCE_UPLIFT]:{label:"\u667A\u80FD\u62AC\u5347",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"intelligence_uplift"},[cs.WEIGHTED_EXCLUSIVE_HYPERVOLUME]:{label:"\u52A0\u6743\u8D85\u4F53\u79EF",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!0,modelMetricFieldName:"weighted_exclusive_hypervolume"},[cs.FRONTIER_DISTANCE]:{label:"\u5230\u524D\u6CBF\u5782\u8DDD",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!1,modelMetricFieldName:"frontier_distance"}});function hp(i){let e=i.slice().sort((s,r)=>r[0]-s[0]||r[1]-s[1]),t=0,n=0;return e.forEach(([s,r])=>{r>n&&(t+=s*(r-n),n=r)}),t}function dp(i){if(!i.length)return 0;let e=i.slice().sort((r,a)=>a[2]-r[2]),t=0,n=null,s=[];return e.forEach(([r,a,o])=>{n!==null&&(t+=hp(s)*(n-o)),s.push([r,a]),n=o}),t+hp(s)*n}function Na(i,e){let t=i.map(r=>{let a=r.normalized_improvement_coordinates;return[Math.pow(a.cost_efficiency,e.cost),Math.pow(a.speed,e.speed),Math.pow(a.intelligence,e.intelligence)]}),n=dp(t);return{contributions:t.map((r,a)=>n-dp(t.filter((o,c)=>a!==c))),completeFrontierHypervolume:n}}function fp(i,e,t){let n=Yn[e];if(!n)throw new Error(`Unknown frontier standout metric: ${e}`);return n.usesAdjustableAxisWeights?Na(i,t).contributions:i.map(s=>{let r=s.standout_metrics[n.modelMetricFieldName];return r==null||!isFinite(r)?NaN:r})}var pp=new WeakMap;async function gp(i){if(typeof DecompressionStream!="function")throw new Error("\u6D4F\u89C8\u5668\u7F3A\u5C11 gzip \u89E3\u7801\u80FD\u529B\uFF0C\u8BF7\u4F7F\u7528\u652F\u6301 DecompressionStream \u7684\u6D4F\u89C8\u5668");return JSON.parse(await new Response(i.stream().pipeThrough(new DecompressionStream("gzip"))).text())}async function Mv(i){let e=Uint8Array.from(atob(i),t=>t.charCodeAt(0));return gp(new Blob([e]))}async function _p(i,e=globalThis.fetch){if(i.schema_version!=="frontier_3d_historical_progress_browser_transport/v1"||!Array.isArray(i.payload_segment_urls)||!i.payload_segment_urls.length||i.payload_segment_urls.some(a=>typeof a!="string"||!/^[a-z0-9-]+\.gzpart$/.test(a)))throw new Error("\u5386\u53F2\u62A5\u544A\u5206\u6BB5\u8D44\u6E90\u6E05\u5355\u65E0\u6548");let t=await Promise.all(i.payload_segment_urls.map(async a=>{let o=await e(a);if(!o.ok)throw new Error(`\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u8BFB\u53D6\u5931\u8D25\uFF1A${a}\uFF08${o.status}\uFF09`);return o.arrayBuffer()})),n=new Blob(t);if(n.size!==i.compressed_payload_byte_count)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u603B\u957F\u5EA6\u4E0D\u5339\u914D");let s=await globalThis.crypto.subtle.digest("SHA-256",await n.arrayBuffer());if([...new Uint8Array(s)].map(a=>a.toString(16).padStart(2,"0")).join("")!==i.compressed_payload_sha256)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90 SHA256 \u4E0D\u5339\u914D");return gp(n)}function mp(i,e,t,n){if(i.has(e))return i.get(e);let s=Mv(t).catch(r=>{throw i.get(e)===s&&i.delete(e),r});for(i.set(e,s);i.size>n;)i.delete(i.keys().next().value);return s}async function xp(i,e){if(e.scientific_dataset)return{scientific_dataset:e.scientific_dataset,scene_geometry_definitions:i.scene_geometry_definitions};let t=pp.get(i);t||(t={frames:new Map,geometries:new Map},pp.set(i,t));let n=await mp(t.frames,e.historical_frame_id,e.scientific_dataset_compressed_base64_gzip,4);if(!n||!n.metric_variants)throw new Error("\u5386\u53F2\u65F6\u95F4\u6B65\u573A\u666F\u7ED3\u6784\u65E0\u6548");let s=i.scene_geometry_definitions_compressed_base64_gzip,r=new Array(s.length);return await Promise.all(Object.values(n.metric_variants).map(async a=>{let o=a.three_dimensional_scene.historical_scene_geometry_definition_index;if(!Number.isInteger(o)||o<0||o>=s.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");let c=await mp(t.geometries,o,s[o],8);if(!c||typeof c!="object"||Array.isArray(c))throw new Error("\u5386\u53F2\u51E0\u4F55\u7ED3\u6784\u65E0\u6548");r[o]=c})),{scientific_dataset:n,scene_geometry_definitions:r}}function yp(i,e){return i.frames.filter(t=>t.historical_view_mode===e.historical_view_mode&&t.analysis_sample_policy===e.analysis_sample_policy&&(e.intelligence_index_version==="all_versions"||t.intelligence_index_version===e.intelligence_index_version)&&(e.historical_view_mode==="observation_replay"||t.source_snapshot_id===e.source_snapshot_id)).sort((t,n)=>(t.release_cutoff_date||t.observed_at_utc).localeCompare(n.release_cutoff_date||n.observed_at_utc))}function vp(i,e){let t=e.model_observation_indices.map(s=>{if(!Number.isInteger(s)||s<0||s>=i.model_observations.length)throw new Error("\u5386\u53F2\u6A21\u578B\u89C2\u6D4B\u5F15\u7528\u8D8A\u754C");return i.model_observations[s]}),n=Object.fromEntries(Object.entries(e.scientific_dataset.metric_variants).map(([s,r])=>{let{historical_scene_geometry_definition_index:a,...o}=r.three_dimensional_scene;if(!Number.isInteger(a)||a<0||a>=i.scene_geometry_definitions.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");return[s,{...r,three_dimensional_scene:{...o,...i.scene_geometry_definitions[a]}}]}));return{...i.scientific_dataset_shared_metadata,...e.scientific_dataset,metric_variants:n,models:t}}function Ev(i,e,t){let n=!!(i&&i.intelligence_index_version!==e.intelligence_index_version),s=new Set(i?.metric_variant_summaries[t]?.pareto_model_uuids||[]),r=new Set(e.metric_variant_summaries[t]?.pareto_model_uuids||[]);return{methodology_boundary:n,entered_model_uuids:n||!i?[]:[...r].filter(a=>!s.has(a)),left_model_uuids:n||!i?[]:[...s].filter(a=>!r.has(a))}}function xh(i,e,t){let s=i.frames.find(r=>r.source_snapshot_id===e.source_snapshot_id&&r.historical_view_mode==="observation_replay"&&r.analysis_sample_policy==="include_estimated")?.model_observation_indices.map(r=>i.model_observations[r]).find(r=>r.model_uuid===t);if(!s)return"\u672C\u6B21\u6837\u672C\u7F3A\u5E2D\u6216\u6CA1\u6709\u53EF\u7528\u667A\u80FD\u5206\uFF0C\u672A\u501F\u7528\u5176\u4ED6\u65E5\u671F\u6570\u503C";if(e.analysis_sample_policy==="measured_only"&&s.artificial_analysis_intelligence_index_is_estimated!==!1)return"\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B\uFF1A\u8BE5\u6A21\u578B\u4E3A\u4F30\u7B97\u6216\u4F30\u7B97\u72B6\u6001\u672A\u77E5\uFF0C\u672A\u7EB3\u5165\u5F53\u524D\u5206\u6790\u6837\u672C";if(e.historical_view_mode==="release_retrospective"){let r=i.frames.filter(a=>a.source_snapshot_id===e.source_snapshot_id&&a.historical_view_mode==="release_retrospective"&&a.analysis_sample_policy==="include_estimated").find(a=>a.model_observation_indices.some(o=>i.model_observations[o].model_uuid===t));if(!r)return"\u7F3A\u5C11\u5DF2\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\uFF0C\u672A\u52A0\u5165\u53D1\u5E03\u56DE\u6EAF";if(r.release_cutoff_date>e.release_cutoff_date)return`\u5C1A\u672A\u8FBE\u5230\u8BE5\u6A21\u578B\u7EDF\u4E00\u53D1\u5E03\u6B65\uFF08${r.release_cutoff_date}\uFF09`}return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6"}function wv(i,e,t,n,s){let r=t.metric_variants[n],a=u=>(u.model_uuid||t.models[u.model_index]?.model_uuid)===s,o=r.three_dimensional_scene.displayed_model_markers.find(a);if(o){if(![o.x,o.y,o.z].every(Number.isFinite))return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6";let u=o.analysis_eligibility;return u?.is_analysis_eligible_for_current_metric_variant===!1?u.ineligibility_reason_text||"\u6240\u9009\u53E3\u5F84\u4E0B\u4E0D\u5177\u5907\u5206\u6790\u8D44\u683C":"\u8BE5\u96C6\u5408\u4E2D\u5DF2\u975E\u524D\u6CBF"}return r.excluded_models_with_drop_reason?.find(a)?.drop_reason||xh(i,e,s)}function Av(i){let e=null;return i.map(t=>{if(!t||!Number.isFinite(t.y))return e=null,"";let n=!e||e.version!==t.version?`M${t.x},${t.y}`:`H${t.x}V${t.y}`;return e=t,n}).join("")}function Tv(i,e,t,n,s){let r=e.metric_variant_summaries[t]?.rankings_by_metric[n]||[];if(n!=="weighted_exclusive_hypervolume"||Object.values(s).every(c=>c===1))return r;let a=e.metric_variant_summaries[t].normalized_frontier_models;if(!a){let c=vp(i,e),u=c.metric_variants[t].three_dimensional_scene.displayed_model_markers,d=new Set(e.metric_variant_summaries[t].pareto_model_uuids);a=u.map(f=>({...c.models[f.model_index],...f})).filter(f=>d.has(f.model_uuid))}let o=Na(a,s);return a.map((c,u)=>({model_uuid:c.model_uuid,value:o.contributions[u]})).sort((c,u)=>u.value-c.value||c.model_uuid.localeCompare(u.model_uuid)).map((c,u)=>({...c,rank:u+1}))}async function yh(i){let e=document.getElementById("frontier-3d-historical-progress-dataset-json");if(!e)return;let t=JSON.parse(e.textContent);if(t.schema_version==="frontier_3d_historical_progress_browser_transport/v1"){let re=document.createElement("p");re.id="aa-historical-resource-loading-status",re.setAttribute("role","status"),re.textContent="\u6B63\u5728\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74\uFF0C\u5F53\u524D\u573A\u666F\u53EF\u7EE7\u7EED\u6D4F\u89C8\u3002",document.getElementById("frontier-3d-toolbar").before(re);try{if(t=await _p(t),t.schema_version!=="frontier_3d_historical_progress_browser_projection/v1")throw new Error("\u5386\u53F2\u8D44\u6E90\u4E2D\u7684\u6295\u5F71\u7248\u672C\u4E0D\u5339\u914D");re.remove()}catch(Fe){re.textContent=`\u5386\u53F2\u65F6\u95F4\u8F74\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u521D\u59CB\u573A\u666F\uFF1A${String(Fe.message||Fe)}\u3002`;let $e=document.createElement("button");$e.type="button",$e.textContent="\u91CD\u65B0\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74",$e.addEventListener("click",()=>{re.remove(),yh(i)}),re.append($e);return}}if(!["frontier_3d_historical_progress_dataset/v1","frontier_3d_historical_progress_browser_projection/v1"].includes(t.schema_version))throw new Error("\u5386\u53F2\u6570\u636E\u5951\u7EA6\u7248\u672C\u4E0D\u5339\u914D");let n=new Map(t.frames.map(re=>[re.historical_frame_id,re])),s=n.get(t.initial_historical_frame_id),r=s.intelligence_index_version,a=null,o=[],c=s,u=r,d={...window.FRONTIER_3D_VISUALIZATION_DATASET,schema_version:"frontier_3d_visualization_dataset/v2"},f=0,h=!1,g="",v=new Map,A=new Map(t.source_snapshots.map(re=>[re.source_snapshot_id,re])),p=(re,Fe,$e)=>{let qe=document.createElement(re);return Fe!==void 0&&(qe.textContent=Fe),$e&&(qe.id=$e),qe},m=(re,Fe,$e)=>{let qe=p("label",Fe),ut=p("select",void 0,$e);return qe.append(ut),re.append(qe),ut},I=(re,Fe)=>{let $e=p("option",Fe);return $e.value=re,$e},L=(re,Fe,$e)=>{let qe=p("button",re,Fe);return qe.type="button",qe.addEventListener("click",$e),qe},M=p("details",void 0,"aa-historical-progress-controls");M.open=!matchMedia("(max-width: 640px)").matches;let w=p("summary","\u5386\u53F2\u89C6\u56FE"),T=p("div",void 0,"aa-historical-progress-fields"),P=m(T,"\u5386\u53F2\u89C6\u89D2","aa-historical-view-mode");P.append(I("release_retrospective","\u56FA\u5B9A\u7248\u672C \xB7 \u53D1\u5E03\u56DE\u6EAF"),I("observation_replay","\u771F\u5B9E\u6863\u6848 \xB7 \u89C2\u6D4B\u56DE\u653E"));let y=m(T,"\u6307\u6570\u7248\u672C","aa-historical-index-version"),R=m(T,"\u6570\u503C\u89C2\u6D4B\u5FEB\u7167","aa-historical-source-snapshot"),k=m(T,"\u5206\u6790\u6837\u672C","aa-historical-analysis-sample");k.append(I("include_estimated","\u5305\u542B\u4F30\u7B97\uFF0C\u672A\u77E5\u53E6\u6807"),I("measured_only","\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B"));let N=p("div",void 0,"aa-historical-timeline"),F=L("\u4E0A\u4E00\u6B65","aa-historical-previous-step",()=>gt(Number(K.value)-1)),te=L("\u4E0B\u4E00\u6B65","aa-historical-next-step",()=>gt(Number(K.value)+1)),K=p("input",void 0,"aa-historical-step-range");K.type="range",K.min="0",K.step="1",K.setAttribute("aria-label","\u9009\u62E9\u5386\u53F2\u65F6\u95F4\u6B65");let q=p("output",void 0,"aa-historical-current-date");q.htmlFor=K.id,N.append(F,K,te,q);let ee=p("p",void 0,"aa-historical-view-explanation");ee.setAttribute("role","status"),M.append(w,T,N,ee);let j=(t.source_validation_outcomes||[]).filter(re=>re.status==="rejected");j.length&&M.append(p("p",`\u91C7\u7528 ${t.source_snapshots.length} \u4EFD\u9A8C\u8BC1\u6837\u672C\uFF1B\u9694\u79BB ${j.length} \u4EFD\u6765\u6E90\uFF1A${j.map(re=>`${re.source_snapshot_id}\uFF08${re.rejection_reason}\uFF09`).join("\uFF1B")}`)),document.getElementById("frontier-3d-toolbar").before(M);let ie=p("details",void 0,"aa-historical-progress-panel");ie.className="aa-control-section",ie.open=!0,ie.append(p("summary","\u5386\u53F2\u8FDB\u6B65\u4E0E\u8D21\u732E\u8005"));let ue=p("p",void 0,"aa-historical-coverage-summary"),ge=p("h3","\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206"),fe=document.createElementNS("http://www.w3.org/2000/svg","svg");fe.id="aa-historical-intelligence-chart";let xe=m(ie,"\u540D\u6B21\u8F68\u8FF9\u6A21\u578B","aa-historical-trajectory-model"),Ce=document.createElementNS("http://www.w3.org/2000/svg","svg");Ce.id="aa-historical-rank-chart";let ve=p("p",void 0,"aa-historical-method-note"),Xe=p("div",void 0,"aa-historical-membership-changes");ie.append(ue,ge,fe,xe.parentElement,Ce,ve,Xe),document.getElementById("aa-search-panel").after(ie);let se=()=>window.frontierThreeDimensionalVisualizationState().activeMetricVariantKey,Se=()=>window.frontierStandoutRanking(),me=re=>`${re.observed_at_utc.replace("T"," ").replace("Z"," UTC")} \xB7 ${re.source_model_count} \u6A21\u578B${re.observed_at_utc_source==="inferred_from_cache_file_modification_time"?" \xB7 \u65F6\u95F4\u63A8\u65AD":""}${re.intelligence_index_version_resolution==="api_family_refined_by_paired_catalog"?" \xB7 \u8865\u4E01\u7248\u672C\u636E\u914D\u5957\u76EE\u5F55\u7EC6\u5316":""}`,ze=[...new Set(t.source_snapshots.map(re=>re.intelligence_index_version))].sort((re,Fe)=>Fe.localeCompare(re,void 0,{numeric:!0}));function it(){P.value=s.historical_view_mode,k.value=s.analysis_sample_policy,y.replaceChildren(...ze.map(qe=>I(qe,`V${qe}`))),s.historical_view_mode==="observation_replay"&&y.prepend(I("all_versions","\u5168\u90E8\u7248\u672C\uFF0C\u5206\u6BB5\u663E\u793A")),y.value=r;let re=t.source_snapshots.filter(qe=>r==="all_versions"||qe.intelligence_index_version===r);R.replaceChildren(...re.map(qe=>I(qe.source_snapshot_id,me(qe)))),R.value=s.source_snapshot_id,R.disabled=s.historical_view_mode==="observation_replay",o=yp(t,{...s,intelligence_index_version:r}),K.max=String(Math.max(0,o.length-1)),K.value=String(o.indexOf(s)),K.setAttribute("aria-valuetext",s.release_cutoff_date||s.observed_at_utc),F.disabled=Number(K.value)<=0,te.disabled=Number(K.value)>=o.length-1;let Fe=A.get(s.source_snapshot_id),$e=s.historical_view_mode==="release_retrospective"?`\u53D1\u5E03\u622A\u6B62 ${s.release_cutoff_date}`:`\u6863\u6848\u89C2\u6D4B ${s.observed_at_utc.slice(0,10)}`;q.value=`${$e} \xB7 ${Number(K.value)+1}/${o.length}`,w.textContent=`\u5386\u53F2\u89C6\u56FE \xB7 ${$e} \xB7 V${s.intelligence_index_version}`,ee.textContent=s.historical_view_mode==="release_retrospective"?`\u6570\u503C\u56FA\u5B9A\u5728 ${me(Fe)}\u3002\u5DF2\u786E\u8BA4\u540C release \u7684\u5404 effort \u6309\u6700\u65E9\u53D1\u5E03\u65E5\u671F\u540C\u6B65\u6B65\u8FDB\uFF1B\u5F52\u7EC4\u672A\u77E5\u8005\u4FDD\u7559 AA \u65E5\u671F\u5E76\u53E6\u6807\u3002\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u6210\u7EE9\u4E0D\u4EE3\u8868\u53D1\u5E03\u5F53\u5E74\u5DF2\u77E5\u72B6\u6001\u3002`:`\u4EC5\u56DE\u653E\u4FDD\u7559\u7684\u89C2\u6D4B\uFF0C\u4E0D\u63D2\u503C\u3001\u4E0D\u56DE\u586B\u672A\u6765\u6570\u503C\u3002${me(Fe)}\uFF1B\u6837\u672C\u7F3A\u5E2D\u4E0D\u4EE3\u8868\u6A21\u578B\u5F53\u65F6\u4E0D\u53EF\u7528\u3002`}async function He(re,Fe=!0){if(!re)return!1;let $e=++f;if(s=re,it(),h=Fe,M.setAttribute("aria-busy",String(h)),ie.setAttribute("aria-busy",String(h)),!Fe)return ot(),!0;let qe=ee.textContent;ee.textContent=`\u6B63\u5728\u8F7D\u5165\u65F6\u95F4\u6B65\u3002${qe}`;try{let ut=await xp(t,re);if($e!==f)return!1;let je=vp({...t,scene_geometry_definitions:ut.scene_geometry_definitions},{...re,scientific_dataset:ut.scientific_dataset});return h=!1,i(je,at=>xh(t,re,at)),c=re,u=r,d=je,ee.textContent=qe,!0}catch(ut){return $e!==f||(s=c,r=u,h=!1,it(),d&&i(d,je=>xh(t,c,je)),ee.textContent=`\u65F6\u95F4\u6B65\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u4E0A\u4E00\u6709\u6548\u573A\u666F\uFF1A${String(ut.message||ut)}\u3002\u53EF\u4EE5\u7EE7\u7EED\u9009\u62E9\u5176\u4ED6\u65F6\u95F4\u6B65\u3002`),!1}finally{$e===f&&(M.setAttribute("aria-busy","false"),ie.setAttribute("aria-busy","false"))}}function gt(re){return He(o[Math.min(o.length-1,Math.max(0,re))])}function Ke(re){let Fe={...s,intelligence_index_version:r,...re},$e=yp(t,Fe);if(!$e.length)return!1;let qe=Fe.release_cutoff_date&&Fe.historical_view_mode==="release_retrospective"?[...$e].reverse().find(ut=>ut.release_cutoff_date<=Fe.release_cutoff_date)||$e[0]:$e.at(-1);return r=Fe.intelligence_index_version,He(qe)}P.addEventListener("change",()=>{let re=r==="all_versions"?s.intelligence_index_version:r;Ke({historical_view_mode:P.value,intelligence_index_version:re})}),y.addEventListener("change",()=>{let re=t.source_snapshots.filter(Fe=>y.value==="all_versions"||Fe.intelligence_index_version===y.value).at(-1);Ke({intelligence_index_version:y.value,source_snapshot_id:re.source_snapshot_id,release_cutoff_date:null})}),R.addEventListener("change",()=>Ke({source_snapshot_id:R.value,release_cutoff_date:null})),k.addEventListener("change",()=>Ke({analysis_sample_policy:k.value})),K.addEventListener("input",()=>gt(Number(K.value))),xe.addEventListener("change",()=>{a=xe.value,ot()});function ct(re,Fe,$e,qe=!1,ut=Fe){re.replaceChildren(),re.setAttribute("viewBox","0 0 360 150"),re.setAttribute("role","img"),re.setAttribute("aria-label",$e);let je=(W,_e,he)=>{let D=document.createElementNS(re.namespaceURI,W);return Object.entries(_e).forEach(([X,pe])=>D.setAttribute(X,String(pe))),he!==void 0&&(D.textContent=he),re.append(D),D};if(!Fe.filter(W=>Number.isFinite(W.value)).length){je("text",{x:12,y:65},"\u8BE5\u533A\u95F4\u6682\u65E0\u53EF\u6BD4\u6570\u636E\u6216\u524D\u6CBF\u540D\u6B21");return}let z=o.map(W=>Date.parse(W.release_cutoff_date||W.observed_at_utc)),Mt=z[0],st=z.at(-1)-Mt||1,C=ut.filter(W=>Number.isFinite(W.value)),_=qe?1:Math.min(...C.map(W=>W.value)),G=Math.max(_+1,...C.map(W=>W.value)),Y=Fe.map(W=>Number.isFinite(W.value)?{x:35+305*(Date.parse(W.frame.release_cutoff_date||W.frame.observed_at_utc)-Mt)/st,y:qe?18+100*(W.value-_)/(G-_):118-100*(W.value-_)/(G-_),version:W.frame.intelligence_index_version,item:W}:null);je("path",{d:"M35,15V120H345",class:"aa-history-chart-axis"}),je("path",{d:Av(Y),class:"aa-history-chart-line"}),je("text",{x:2,y:22},qe?"1":G.toFixed(1)),je("text",{x:2,y:118},qe?G.toFixed(0):_.toFixed(1)),je("text",{x:35,y:143},(o[0].release_cutoff_date||o[0].observed_at_utc).slice(0,10)),je("text",{x:345,y:143,"text-anchor":"end"},(o.at(-1).release_cutoff_date||o.at(-1).observed_at_utc).slice(0,10)),Y.filter(Boolean).forEach(W=>{let _e=je("circle",{cx:W.x,cy:W.y,r:W.item.frame===s?4.5:2.5,class:"aa-history-chart-point"}),he=document.createElementNS(re.namespaceURI,"title");he.textContent=`${W.item.frame.release_cutoff_date||W.item.frame.observed_at_utc} \xB7 V${W.version} \xB7 ${W.item.value}`,_e.append(he),_e.addEventListener("click",()=>He(W.item.frame))})}function ot(){if(h)return;let re=se(),Fe=s.metric_variant_summaries[re],$e=Se(),qe=$e.selectedFrontierStandoutMetricName,ut=JSON.stringify([re,qe,$e.frontierStandoutAxisWeights,o.map(D=>D.historical_frame_id)]);g!==ut&&(g=ut,v.clear());let je=o.map(D=>(v.has(D.historical_frame_id)||v.set(D.historical_frame_id,Tv(t,D,re,qe,$e.frontierStandoutAxisWeights)),v.get(D.historical_frame_id))),at=o.indexOf(s),z=je[at]||[],Mt=o.slice(0,at+1),st=new Set(je.slice(0,at+1).flat().map(D=>D.model_uuid)),C=[...st].sort((D,X)=>(t.models_by_uuid[D]?.name||D).localeCompare(t.models_by_uuid[X]?.name||X));st.has(a)||(a=z[0]?.model_uuid||C[0]||null),xe.replaceChildren(...C.map(D=>I(D,t.models_by_uuid[D]?.name||D))),xe.value=a||"";let _=s.model_observation_indices.filter(D=>t.release_identity_resolution_by_model_uuid?.[t.model_observations[D].model_uuid]==="unresolved_release_group").length;ue.textContent=`${Fe.analysis_eligible_model_count} \u4E2A\u53EF\u6BD4\u6A21\u578B \xB7 ${Fe.pareto_model_uuids.length} \u4E2A\u524D\u6CBF\u6210\u5458 \xB7 \u5176\u4E2D\u4F30\u7B97 ${Fe.estimated_intelligence_count}\uFF0C\u4F30\u7B97\u72B6\u6001\u672A\u77E5 ${Fe.unknown_estimation_status_count}\uFF1Brelease \u5F52\u7EC4\u672A\u77E5 ${_}\u3002${Fe.unavailable_reason||""}`;let G=o.map(D=>({frame:D,value:D.metric_variant_summaries[re].highest_comparable_intelligence}));ct(fe,G.slice(0,at+1),"\u540C\u7248\u672C\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206\uFF0C\u7248\u672C\u65AD\u70B9\u4E0D\u8FDE\u63A5",!1,G);let Y=o.map((D,X)=>({frame:D,value:je[X].find(pe=>pe.model_uuid===a)?.rank??null}));ct(Ce,Y.slice(0,at+1),`${t.models_by_uuid[a]?.name||"\u6240\u9009\u6A21\u578B"}\u7684${Yn[qe].label}\u524D\u6CBF\u540D\u6B21\u8F68\u8FF9`,!0,Y),ve.textContent=`\u73B0\u884C\u65B9\u6CD5 \xB7 ${Yn[qe].label}\uFF1B\u5206\u6790\u5168\u96C6\u4E0D\u6309\u5E74\u9F84\u5220\u9664\u6A21\u578B\u3002\u540D\u6B21\u53EA\u89E3\u91CA\u8BE5\u65F6\u70B9\u7684\u6BD4\u8F83\uFF0C\u5206\u503C\u4E0D\u4F5C\u8DE8\u65E5\u671F\u589E\u957F\u91CF\u3002${Fe.small_sample_warning||""} F1 \u5019\u9009\u672A\u542F\u7528\u3002`;let W=Ev(o[at-1],s,re);if(Xe.replaceChildren(p("h3","\u524D\u6CBF\u6210\u5458\u8FDB\u51FA")),W.methodology_boundary)Xe.append(p("p","\u6307\u6570\u7248\u672C\u53D8\u5316\uFF0C\u91CD\u7F6E\u6BD4\u8F83\u8D77\u70B9\uFF1B\u4E0D\u628A\u4E24\u7248\u6210\u5458\u5DEE\u5F02\u89E3\u91CA\u4E3A\u8FDB\u6B65\u3002"));else if(!at)Xe.append(p("p","\u5F53\u524D\u5E8F\u5217\u8D77\u70B9\uFF0C\u4E0D\u63A8\u65AD\u66F4\u65E9\u65E5\u671F\u7684\u6210\u5458\u3002"));else{let D=p("ul");for(let X of W.entered_model_uuids)D.append(p("li",`\u8FDB\u5165\uFF1A${t.models_by_uuid[X]?.name||X}`));for(let X of W.left_model_uuids)D.append(p("li",`\u9000\u51FA\uFF1A${t.models_by_uuid[X]?.name||X} \xB7 ${wv(t,s,window.FRONTIER_3D_VISUALIZATION_DATASET,re,X)}`));Xe.append(D.childNodes.length?D:p("p","\u524D\u6CBF\u6210\u5458\u672A\u53D8\u5316\u3002")),s.historical_view_mode==="observation_replay"&&Xe.append(p("p","\u6863\u6848\u95F4\u4E5F\u53EF\u80FD\u53D1\u751F\u4EF7\u683C\u3001\u901F\u5EA6\u3001\u8BC4\u6D4B\u6216\u8986\u76D6\u53D8\u5316\uFF0C\u6B64\u5904\u4E0D\u4F5C\u56E0\u679C\u5F52\u56E0\u3002"))}let _e=document.getElementById("aa-speed-metric-select"),he=re.split("__")[0];for(let D of _e.options){let X=s.metric_variant_summaries[`${he}__${D.value}`]?.unavailable_reason;D.disabled=!!(X&&X.includes("\u5F52\u4E00\u5E38\u6570")),D.title=X||""}}window.addEventListener("frontier-3d-view-updated",ot),window.setHistoricalFrontierTimelineSelection=re=>{if(re.historical_frame_id){let Fe=n.get(re.historical_frame_id);return Fe?(r=Fe.intelligence_index_version,He(Fe)):!1}return Ke(re)},window.historicalFrontierVisualizationState=()=>({...s,scientific_dataset:void 0,scientific_dataset_compressed_base64_gzip:void 0,rendered_historical_frame_id:c.historical_frame_id,is_frame_loading:h,current_series_frame_ids:o.map(re=>re.historical_frame_id),selected_trajectory_model_uuid:a,source_observed_at_utc_source:A.get(s.source_snapshot_id).observed_at_utc_source,methodology_implementation_sha256:t.standout_methodology.methodology_implementation_sha256}),He(s,!1)}function bp(i){let[e,t]=i.fixed_range.map(Number),n=t-e;if(!Number.isFinite(n)||n<=0)return[];if(i.scale_type==="log"&&n>=1){let d=Math.max(1,Math.ceil(n/6)),f=[];for(let h=Math.ceil(e);h<=t;h+=d)f.push(10**h);if(f.length>=3)return f;f.length=0;for(let h=Math.floor(e);h<=t;h+=1)for(let g of[1,2,5]){let v=h+Math.log10(g);v>=e&&v<=t&&f.push(Number((g*10**h).toPrecision(12)))}return f}let s=i.scale_type==="log"?10**e:e,r=i.scale_type==="log"?10**t:t,a=(r-s)/5,o=10**Math.floor(Math.log10(a)),c=[1,2,5,10].find(d=>d*o>=a)*o;Math.floor(r/c)-Math.ceil(s/c)<2&&(c/=2);let u=[];for(let d=Math.ceil(s/c);d<=Math.floor(r/c);d+=1)u.push(Number((d*c).toPrecision(12)));return u}var Sp=i=>String(i??"").trim().replace(/\s+/g," ").toLowerCase();function Mp(i,e,t=40){let n=Sp(e);if(!n)return{groups:[],totalGroupCount:0};let s=new Map,r=new Set;for(let a of i){let o=a.base_model_name||a.name;s.has(o)||s.set(o,[]),s.get(o).push(a),[a.name,o,a.creator,a.reasoning_level_label,a.tier].some(c=>Sp(c).includes(n))&&r.add(o)}return{totalGroupCount:r.size,groups:[...r].slice(0,t).map(a=>({baseModelName:a,models:s.get(a)}))}}function vh(i,e){return(i.reasoning_level_sort_order??0)-(e.reasoning_level_sort_order??0)||String(i.name).localeCompare(String(e.name))}function Ep(i,e){return!Number.isFinite(i)||!Number.isFinite(e)||e===0?null:(i-e)/Math.abs(e)*100}function Fa(i,e){return String(i).trim()===""||!Number.isFinite(Number(i))?e:Math.min(4,Math.max(.25,Number(i)))}function Wt(i,e=3){return Number.isFinite(i)?Number(i.toPrecision(e)).toString():"\u672A\u8BB0\u5F55"}function wp(i,e,t){let n=[];return t.map(s=>{if(!s.visible||s.width>i||s.height>e)return{id:s.id,hidden:!0};let r=Math.max(0,Math.min(i-s.width,s.x));for(let a=0;a<=Math.ceil(e/(s.height+2))*2;a+=1){let o=Math.ceil(a/2)*(a%2?1:-1)*(s.height+2),c=Math.max(0,Math.min(e-s.height,s.y+o));if(!n.some(u=>r<u.right+2&&r+s.width+2>u.x&&c<u.bottom+2&&c+s.height+2>u.y))return n.push({x:r,y:c,right:r+s.width,bottom:c+s.height}),{id:s.id,hidden:!1,x:r,y:c}}return{id:s.id,hidden:!0}})}function Ap(i){let e=i.axes,t=c=>{let u=c.labels.find(d=>d.isTitle);return u?Math.max(u.width,u.height)/Math.max(1,Math.hypot(c.projectedEnd.x-c.projectedStart.x,c.projectedEnd.y-c.projectedStart.y)):0},n=e.slice().sort((c,u)=>t(u)-t(c)),s=new Set(e.flatMap(c=>c.labels.filter(u=>u.isTitle).map(u=>u.id))),r=[n,e,e.slice().reverse(),[e[1],e[2],e[0]],[e[2],e[0],e[1]],[e[0],e[2],e[1]],[e[1],e[0],e[2]]],a=[],o=-1;for(let c of r){let u=Cv(i,c.filter(Boolean)),d=u.filter(f=>s.has(f.id)&&!f.hidden).length;if(d>o&&(a=u,o=d),d===s.size)return u}return a}function Cv({canvasWidth:i,canvasHeight:e,projectedCenter:t,axes:n},s){let r=[],a=[],o=(h,g)=>h.x*g.x+h.y*g.y,c=(h,g)=>({x:h.x-g.x,y:h.y-g.y}),u=(h,g)=>({x:h.x*g,y:h.y*g}),d=h=>({x:-h.y,y:h.x}),f=(h,g)=>h.directions.reduce((v,A,p)=>v+Math.abs(o(A,g))*h.halfSizes[p],0);for(let h of[!0,!1])for(let{projectedStart:g,projectedEnd:v,labels:A}of h?s:n){let p=c(v,g),m=Math.hypot(p.x,p.y),I=m?u(p,1/m):{x:1,y:0},L=d(I),M={x:(g.x+v.x)/2,y:(g.y+v.y)/2};o(L,c(M,t))<0&&(L=u(L,-1));let w=Math.atan2(p.y,p.x)*180/Math.PI;w>90&&(w-=180),w<-90&&(w+=180);for(let T of A.filter(P=>P.isTitle===h)){let P=T.isTitle?w:0,y={id:T.id,hidden:!0,rotationDegrees:P};if(a.push(y),T.projectedDepth<-1||T.projectedDepth>1||m<1)continue;let R=P*Math.PI/180,k=(Math.abs(Math.cos(R))*T.width+Math.abs(Math.sin(R))*T.height)/2,N=(Math.abs(Math.sin(R))*T.width+Math.abs(Math.cos(R))*T.height)/2,F=T.isTitle?I:{x:1,y:0},te={directions:[F,d(F)],halfSizes:[T.width/2,T.height/2]},K=o(c(T.anchor,g),p)/(m*m);for(let q of T.isTitle?[48,24,-48,-24,0,40,-40,32,-32,16,-16,8,-8,36,-36,12,-12]:[16,-16,8,-8,0]){let ee=T.isTitle?0:K,j=T.isTitle?1:K;for(let[ge,fe,xe]of[["x",i,k],["y",e,N]]){let Ce=Math.max(0,xe+2-L[ge]*q),ve=Math.min(fe,fe-xe-2-L[ge]*q),Xe=p[ge];if(Math.abs(Xe)<1e-8)(g[ge]<Ce||g[ge]>ve)&&(j=-1);else{let se=(Ce-g[ge])/Xe,Se=(ve-g[ge])/Xe;ee=Math.max(ee,Math.min(se,Se)),j=Math.min(j,Math.max(se,Se))}Ce>ve&&(j=-1)}if(ee>j)continue;let ue=[Math.max(ee,Math.min(K,j)),ee,j,...Array.from({length:7},(ge,fe)=>ee+(j-ee)*(fe+1)/8)];for(let ge of T.isTitle?ue:[K]){let fe={x:g.x+p.x*ge+L.x*q,y:g.y+p.y*ge+L.y*q};if(!r.some(xe=>![...te.directions,...xe.directions].some(Ce=>Math.abs(o(c(fe,xe.center),Ce))>=f(te,Ce)+f(xe,Ce)+2))){Object.assign(y,{hidden:!1,...fe}),r.push({...te,center:fe});break}}if(!y.hidden)break}}}return a}function bh(i){if(i.schema_version==="frontier_3d_visualization_dataset/v2")return i;if(!["frontier_3d_browser_projection/v1","frontier_3d_visualization_dataset/v3","frontier_3d_browser_projection/v2","frontier_3d_visualization_dataset/v4"].includes(i.schema_version))throw new Error("\u4E0D\u652F\u6301\u7684 Frontier 3D \u6570\u636E\u5951\u7EA6\u7248\u672C");let e=["name","model_uuid","creator","base_model_name","lineage_family_key","reasoning_level_label","reasoning_level_sort_order"],t=r=>{let a=r.model_index;if(!Number.isInteger(a)||a<0||a>=i.models.length)throw new Error(`model_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let{identity_resolution:o,...c}=i.models[a];return c},n=({model_index:r,analysis_eligibility_index:a,excluded_model_explanation_index:o,...c})=>{if(a!==void 0){if(!Number.isInteger(a)||a<0||a>=(i.analysis_eligibility_definitions?.length||0))throw new Error(`analysis_eligibility_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let u=i.analysis_eligibility_definitions[a];c.analysis_eligibility={...u},Array.isArray(u.ineligibility_reason_codes)&&(c.analysis_eligibility.ineligibility_reason_codes=[...u.ineligibility_reason_codes])}if(o!==void 0){if(!Number.isInteger(o)||o<0||o>=(i.excluded_model_explanation_definitions?.length||0))throw new Error(`excluded_model_explanation_index \u5F15\u7528\u8D8A\u754C\uFF1A${o}`);let u=i.excluded_model_explanation_definitions[o];Object.assign(c,u,{missing_dimension_names:[...u.missing_dimension_names]})}return c},s=Object.fromEntries(Object.entries(i.metric_variants).map(([r,a])=>[r,{...a,model_analysis_records:a.model_analysis_records?.map(o=>({...t(o),...n(o),model_index:o.model_index})),three_dimensional_scene:{...a.three_dimensional_scene,displayed_model_markers:a.three_dimensional_scene.displayed_model_markers.map(o=>{let c=t(o),u=i.organization_identity_metadata_by_creator_name?.[c.creator]||{};return{...Object.fromEntries(["creator_uuid","organization_identity_key","country_region_category"].filter(d=>d in u).map(d=>[d,u[d]])),...c,x:c.panel?.[a.interaction_relationships?.cost_axis_field],y:c.panel?.[a.interaction_relationships?.speed_axis_field],z:c.panel?.intelligence,...n(o),panel:{...c.panel,...o.panel}}})},excluded_models_with_drop_reason:(a.excluded_models_with_drop_reason||[]).map(o=>{let c=t(o);return{name:c.name,creator:c.creator,model_uuid:c.model_uuid,...Object.fromEntries(["base_model_name","tier","reasoning_level_label","reasoning_level_sort_order"].filter(u=>u in c).map(u=>[u,c[u]])),intelligence:c.panel?.intelligence,release_date:c.panel?.release_date==="?"?null:c.panel?.release_date,...n(o)}}),interaction_relationships:{...a.interaction_relationships,lineages:Object.fromEntries(Object.entries(a.interaction_relationships?.lineages||{}).map(([o,c])=>[o,c.map(u=>{let d=t(u);return{...Object.fromEntries(e.filter(f=>f in d).map(f=>[f,d[f]])),...n(u)}})]))}}]));return{...i,metric_variants:s}}var Mh="#frontier-view-state-v1=",Rv=/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i,Iv=/^(effective|blended)__(effective|raw|tasks_per_hour)$/,Sh=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t,Os=i=>typeof i=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(i)&&Number.isFinite(Date.parse(i))&&new Date(i).toISOString().slice(0,10)===i;function Tp(i){if(!i||i.version!==1||typeof i!="object"||Array.isArray(i))return null;let e={version:1};typeof i.metric_variant_key=="string"&&Iv.test(i.metric_variant_key)&&(e.metric_variant_key=i.metric_variant_key);for(let[a,o]of[["pinned_model_uuids",c=>Rv.test(c)],["hidden_organization_identity_keys",c=>c.length>0&&c.length<=200]])Array.isArray(i[a])&&(e[a]=[...new Set(i[a].filter(c=>typeof c=="string"&&o(c)).slice(0,1024))]);["trend_residual","intelligence_uplift","frontier_distance","weighted_exclusive_hypervolume"].includes(i.standout_metric)&&(e.standout_metric=i.standout_metric);let t=i.standout_axis_weights;t&&["intelligence","cost","speed"].every(a=>Sh(t[a],.25,4))&&(e.standout_axis_weights=Object.fromEntries(["intelligence","cost","speed"].map(a=>[a,t[a]])));let n=i.display;if(n&&typeof n=="object"){e.display={};for(let a of["measured_only","comparable_only","recent_release_grace_period","country_region_markers","achievable_frontier_surface","pinned_comparison_expanded"])typeof n[a]=="boolean"&&(e.display[a]=n[a]);Array.isArray(n.pinned_comparison_optional_fields)&&(e.display.pinned_comparison_optional_fields=[...new Set(n.pinned_comparison_optional_fields.filter(a=>["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"].includes(a)))]),["wireframe","solid","hidden"].includes(n.frontier_style)&&(e.display.frontier_style=n.frontier_style),Sh(n.marker_size_multiplier,.5,1.5)&&(e.display.marker_size_multiplier=n.marker_size_multiplier),["off","0.5","1"].includes(n.sensitivity_intelligence_half_width)&&(e.display.sensitivity_intelligence_half_width=n.sensitivity_intelligence_half_width)}let s=i.camera,r=a=>Array.isArray(a)&&a.length===3&&a.every(o=>Sh(o,-1e6,1e6));return s&&[s.position,s.target,s.up].every(r)&&Math.hypot(...s.up)>1e-6&&Math.hypot(...s.position.map((a,o)=>a-s.target[o]))>1e-6&&(e.camera={position:[...s.position],target:[...s.target],up:[...s.up]}),i.date_filter&&(i.date_filter.cutoff_date===null||Os(i.date_filter.cutoff_date))&&["fade","hide"].includes(i.date_filter.mode)&&(e.date_filter={cutoff_date:i.date_filter.cutoff_date,mode:i.date_filter.mode}),i.table&&typeof i.table=="object"&&(e.table={},["chart","table"].includes(i.table.active_tab)&&(e.table.active_tab=i.table.active_tab),us.some(a=>a.key===i.table.sort_field)&&(e.table.sort_field=i.table.sort_field),["asc","desc"].includes(i.table.sort_direction)&&(e.table.sort_direction=i.table.sort_direction),typeof i.table.search_text=="string"&&(e.table.search_text=i.table.search_text.slice(0,256)),["all","eligible","ineligible","displayed","excluded"].includes(i.table.analysis_filter)&&(e.table.analysis_filter=i.table.analysis_filter)),e}function wh(i){let e=Tp(i);if(!e)throw new Error("\u89C6\u56FE\u72B6\u6001\u7248\u672C\u65E0\u6548");return Mh+encodeURIComponent(JSON.stringify(e))}function tc(i){if(!i)return{state:null,reason:null};if(!i.startsWith(Mh))return{state:null,reason:i.startsWith("#frontier-view-state-")?"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002":null};try{if(i.length>131072)throw new Error;let e=Tp(JSON.parse(decodeURIComponent(i.slice(Mh.length))));return{state:e,reason:e?null:"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}catch{return{state:null,reason:"\u5206\u4EAB\u72B6\u6001\u65E0\u6CD5\u89E3\u6790\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}}function hs(i,e={}){if(e.measured_only&&i.intelligence_measurement_status!=="measured")return{visible:!1,faded:!1,reason:"\u667A\u80FD\u5206\u672A\u7ECF\u6838\u9A8C\u4E3A\u5B9E\u6D4B"};let t=i.panel?.release_date,n=Os(e.cutoff_date)&&Os(t)&&t>e.cutoff_date;return{visible:!(n&&e.date_mode==="hide"),faded:!!(n&&e.date_mode==="fade"),reason:n?"\u665A\u4E8E\u6240\u9009\u53D1\u5E03\u65E5\u671F":null}}var Ah=i=>({measured:"\u5B9E\u6D4B",estimated:"\u4F30\u7B97",unknown:"\u672A\u77E5"})[i]||"\u672A\u77E5";function nc(i,e){return i?.is_pareto_robust==null?"\u4E0D\u53EF\u5206\u6790":i.is_pareto_robust?"\u7A33\u5065\u524D\u6CBF":i.is_near_frontier?"\u8FD1\u524D\u6CBF":e?"\u654F\u611F\u524D\u6CBF":"\u975E\u524D\u6CBF"}function Eh(i){if(i.missing_dimension_names?.length)return!1;let e=i.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant;return typeof e=="boolean"?e:i.is_displayed&&Number.isFinite(i.layer)?!0:null}var us=[{key:"name",label:"\u6A21\u578B",value:i=>i.name},{key:"creator",label:"\u5382\u5546",value:i=>i.creator},{key:"model_uuid",label:"\u6A21\u578B UUID",value:i=>i.model_uuid},{key:"intelligence",label:"\u667A\u80FD\u5206\uFF08\u5206\uFF09",value:i=>i.panel?.intelligence},{key:"measurement_status",label:"\u667A\u80FD\u5206\u72B6\u6001",value:i=>Ah(i.intelligence_measurement_status)},{key:"catalog_estimated_flag",label:"\u76EE\u5F55\u539F\u59CB isEstimated",value:i=>i.artificial_analysis_intelligence_index_is_estimated},{key:"cost_to_run",label:"\u6709\u6548\u8FD0\u884C\u6210\u672C\uFF08USD\uFF09",value:i=>i.panel?.cost_to_run},{key:"blended_price_cache_input_output_7_to_2_to_1",label:"7:2:1 \u6DF7\u5408\u5355\u4EF7\uFF08USD/M tokens\uFF09",value:i=>i.panel?.blended_price_cache_input_output_7_to_2_to_1},{key:"eff_speed",label:"\u6709\u6548\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.eff_speed},{key:"output_speed",label:"\u539F\u59CB\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.output_speed},{key:"intelligence_index_tasks_per_hour",label:"\u4EFB\u52A1\u901F\u5EA6\uFF08\u4EFB\u52A1/\u5C0F\u65F6\uFF09",value:i=>i.panel?.intelligence_index_tasks_per_hour},{key:"artificial_analysis_intelligence_index_time_per_task_seconds",label:"\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09",value:i=>i.panel?.artificial_analysis_intelligence_index_time_per_task_seconds},{key:"task_time_unavailability_reason",label:"\u4EFB\u52A1\u901F\u5EA6\u7F3A\u5931\u539F\u56E0",value:i=>i.intelligence_index_task_time_evidence?.unavailability_reason},{key:"median_end_to_end_response_time_seconds",label:"API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u79D2\uFF0C\u72EC\u7ACB\u5B57\u6BB5\uFF09",value:i=>i.panel?.median_end_to_end_response_time_seconds},{key:"release_date",label:"\u53D1\u5E03\u65E5\u671F",value:i=>i.panel?.release_date==="?"?null:i.panel?.release_date},{key:"eligibility",label:"\u5206\u6790\u8D44\u683C",value:i=>Eh(i)===!0?"\u5408\u683C":Eh(i)===!1?"\u4E0D\u5408\u683C":"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u672A\u8BB0\u5F55\uFF09"},{key:"layer",label:"\u6B63\u5F0F\u524D\u6CBF\u5C42\u53F7",value:i=>i.layer},{key:"drop_reason",label:"\u4E0A\u56FE\u72B6\u6001\u4E0E\u539F\u56E0",value:i=>i.drop_reason},{key:"sensitivity",label:"\u654F\u611F\u6027\uFF08\u5047\u8BBE\u533A\u95F4\uFF09",value:i=>i.sensitivity_text||"\u5173\u95ED"},{key:"sources",label:"\u6570\u503C\u4E0E\u72B6\u6001\u6765\u6E90",value:i=>JSON.stringify({...i.value_provenance,intelligence:i.intelligence_measurement_evidence,intelligence_index_task_time:i.intelligence_index_task_time_evidence,api_end_to_end_latency:"Artificial Analysis API performance.median_end_to_end_response_time_seconds"})}];function Cp(i,e={}){let t=(e.search_text||"").trim().toLocaleLowerCase(),n=us.find(r=>r.key===e.sort_field)||us.find(r=>r.key==="intelligence"),s=e.sort_direction==="asc"?1:-1;return i.filter(r=>{if(t&&!`${r.name} ${r.creator} ${r.model_uuid||""}`.toLocaleLowerCase().includes(t))return!1;let a=Eh(r);return!(e.analysis_filter==="eligible"&&a!==!0||e.analysis_filter==="ineligible"&&a!==!1||e.analysis_filter==="displayed"&&!r.is_displayed||e.analysis_filter==="excluded"&&r.is_displayed)}).sort((r,a)=>{let o=n.value(r),c=n.value(a),u=o==null||typeof o=="number"&&!Number.isFinite(o),d=c==null||typeof c=="number"&&!Number.isFinite(c);return u||d?Number(u)-Number(d)||r.model_index-a.model_index:(typeof o=="number"&&typeof c=="number"?o-c:String(o).localeCompare(String(c),"zh-CN"))*s||r.model_index-a.model_index})}function Rp(i){let e=t=>{let n=t==null?"":String(t);return typeof t=="string"&&/^[\s\u0000-\u001f]*[=+\-@]/u.test(n)&&(n="'"+n),'"'+n.replaceAll('"','""')+'"'};return"\uFEFF"+[us.map(t=>e(t.label)).join(","),...i.map(t=>us.map(n=>e(n.value(t))).join(","))].join(`\r
`)+`\r
`}var Bt=(i,e,t)=>{let n=document.createElement(i);return n.textContent=e,t&&(n.className=t),n},Si=(i,e,t)=>{let n=Bt("button",i,"aa-secondary-button");return n.type="button",e&&(n.id=e),n.addEventListener("click",t),n};function Th(i,e){let t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=e,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),1e3)}function Ch({dataset:i,reportShell:e,toolbar:t,plotRegion:n,graphContainer:s,sidePanel:r,webglAvailable:a=!0,getVariantKey:o=()=>i.initial_variant_key,getSharedViewState:c=()=>({}),applySharedViewState:u=()=>{},onExplorationFiltersChanged:d=()=>{},modelPassesSharedFilters:f=()=>!0,resetCamera:h=()=>{},setAxisAlignedCameraView:g=()=>{},exportPng:v=()=>{},pinModel:A=()=>{}}){let p=!1,m=null,I=null,L=i.initial_variant_key,M={},w=[],T=()=>a?o():L,P={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"},y={active_tab:a?"chart":"table",sort_field:"intelligence",sort_direction:"desc",search_text:"",analysis_filter:"all"},R=[],k=Bt("nav","","aa-exploration-bar");k.id="aa-model-exploration-bar",k.setAttribute("aria-label","\u89C6\u56FE\u3001\u5206\u4EAB\u4E0E\u5BFC\u51FA");let N=Bt("div","","aa-exploration-tabs");N.setAttribute("role","tablist");let F=Si("\u56FE\u8868","aa-chart-view-tab",()=>st("chart")),te=Si("\u5168\u6A21\u578B\u8868","aa-table-view-tab",()=>st("table"));for(let D of[F,te])D.setAttribute("role","tab");F.setAttribute("aria-controls",s.id),te.setAttribute("aria-controls","aa-all-model-table-panel"),N.append(F,te),a||(F.disabled=!0);let K=Si("\u91CD\u7F6E\u89C6\u89D2","aa-reset-camera-view",h),q=document.createElement("select");q.id="aa-axis-aligned-camera-view",q.setAttribute("aria-label","\u8F74\u5BF9\u9F50\u89C6\u89D2");for(let[D,X]of[["","\u8F74\u5BF9\u9F50\u89C6\u89D2"],["intelligence_cost","\u667A\u80FD \xD7 \u6210\u672C"],["intelligence_speed","\u667A\u80FD \xD7 \u901F\u5EA6"],["cost_speed","\u6210\u672C \xD7 \u901F\u5EA6"]])q.add(new Option(X,D));q.addEventListener("change",()=>{q.value&&g(q.value),q.value="",W()});let ee=Si("\u590D\u5236\u89C6\u56FE\u94FE\u63A5","aa-copy-frontier-view-link",Mt),j=Si("\u5BFC\u51FA 2\xD7 PNG","aa-export-frontier-png",async()=>{j.disabled=!0;try{await v(),je("PNG \u5DF2\u751F\u6210\uFF0C\u5305\u542B\u5F53\u524D\u89C6\u89D2\u3001\u56FE\u4F8B\u3001\u6570\u636E\u65E5\u671F\u4E0E AA \u7F72\u540D\u3002")}catch(D){je(`PNG \u5BFC\u51FA\u5931\u8D25\uFF1A${D?.message||"\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3"}\uFF1B\u53EF\u91CD\u8BD5\u3002`)}finally{j.disabled=!a}});K.disabled=q.disabled=j.disabled=!a;let ie=Bt("span","","aa-exploration-status");ie.id="aa-exploration-status",ie.setAttribute("role","status");let ue=document.createElement("textarea");if(ue.id="aa-frontier-view-link-fallback",ue.setAttribute("aria-label","\u53EF\u590D\u5236\u7684\u89C6\u56FE\u94FE\u63A5"),ue.readOnly=!0,ue.hidden=!0,k.append(N,K,q,ee,j,ie,ue),t.before(k),!a){e.classList.add("is-view-settings-expanded");let D=Bt("p",`\u6570\u636E\u65E5\u671F\uFF1A${i.data_date||"\u672A\u77E5"} \xB7 `,"aa-exploration-note"),X=Bt("a","Artificial Analysis");X.href="https://artificialanalysis.ai/",D.append(X),document.getElementById("frontier-3d-report-header").append(D);for(let[pe,Re,we]of[[0,"\u6210\u672C\u53E3\u5F84",i.cost_metric_definitions],[1,"\u901F\u5EA6\u53E3\u5F84",i.speed_metric_definitions]]){let ye=Bt("label",Re,"aa-toolbar-field"),Pe=document.createElement("select");Pe.setAttribute("aria-label",Re);for(let[de,De]of Object.entries(we))Pe.add(new Option(De.label,de));Pe.value=L.split("__")[pe],w.push(Pe),Pe.addEventListener("change",()=>{let de=w.map(De=>De.value).join("__");i.metric_variants[de]&&(L=de,W())}),ye.append(Pe),t.append(ye)}}let ge=Bt("details","","aa-model-exploration-controls");ge.id="aa-model-exploration-controls",ge.append(Bt("summary","\u7B5B\u9009\u4E0E\u654F\u611F\u6027 / \u65E5\u671F\u63A2\u7D22"));let fe=document.createElement("input");fe.type="checkbox",fe.id="aa-measured-intelligence-only";let xe=Bt("label","\u4EC5\u5B9E\u6D4B\u667A\u80FD\u5206 ");xe.prepend(fe),fe.addEventListener("change",()=>C({measured_only:fe.checked}));let Ce=document.createElement("select");Ce.id="aa-sensitivity-intelligence-half-width",Ce.setAttribute("aria-label","\u654F\u611F\u6027\u5047\u8BBE\u533A\u95F4");for(let[D,X]of[["off","\u654F\u611F\u6027\u6807\u6CE8\uFF1A\u5173\u95ED"],["0.5","\u667A\u80FD \xB10.5\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"],["1","\u667A\u80FD \xB11\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"]])Ce.add(new Option(X,D));Ce.addEventListener("change",()=>C({sensitivity_intelligence_half_width:Ce.value}));let ve=document.createElement("input");ve.type="date",ve.id="aa-release-date-cutoff",ve.setAttribute("aria-label","\u53D1\u5E03\u65E5\u671F\u622A\u6B62\u65E5\u671F\uFF0C\u7559\u7A7A\u663E\u793A\u5168\u90E8"),ve.addEventListener("change",()=>{G(),C({cutoff_date:Os(ve.value)?ve.value:null})});let Xe=document.createElement("select");Xe.id="aa-release-date-visibility-mode",Xe.setAttribute("aria-label","\u665A\u4E8E\u622A\u6B62\u65E5\u671F\u7684\u6A21\u578B"),Xe.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u6DE1\u51FA","fade")),Xe.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u9690\u85CF","hide")),Xe.addEventListener("change",()=>C({date_mode:Xe.value}));let se=Si("\u64AD\u653E\u53D1\u5E03\u65E5\u671F","aa-play-release-date-filter",Y);se.setAttribute("aria-pressed","false");let Se=Si("\u663E\u793A\u5168\u90E8\u65E5\u671F","aa-show-all-release-dates",()=>{G(),C({cutoff_date:null})}),me=Bt("p","\u4EC5\u63A2\u7D22\u5F53\u524D\u5FEB\u7167\u7684\u53D1\u5E03\u65E5\u671F\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97\u3002\u672A\u77E5\u53D1\u5E03\u65E5\u671F\u5355\u72EC\u4FDD\u7559\uFF0C\u4E0D\u63A8\u65AD\u65E5\u671F\u3002","aa-exploration-note"),ze=Bt("p","\u5B9E\u7EBF\u5149\u73AF\uFF1A\u7A33\u5065\u524D\u6CBF\uFF1B\u865A\u7EBF\u5149\u73AF\uFF1A\u654F\u611F\u524D\u6CBF / \u8FD1\u524D\u6CBF\u3002\u533A\u95F4\u4E3A\u72EC\u7ACB\u5047\u8BBE\uFF0C\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E5F\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE\uFF1B\u6B63\u5F0F\u524D\u6CBF\u548C\u6392\u540D\u4FDD\u6301\u5168\u5C40\u5206\u6790\u3002","aa-exploration-note");ze.id="aa-sensitivity-legend",ze.hidden=!0;let it=Bt("p","\u4EFB\u52A1\u901F\u5EA6 = 3600 \xF7 \u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09\u3002API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\u662F\u53E6\u4E00\u72EC\u7ACB\u6D4B\u91CF\uFF0C\u4E0D\u7528\u4E8E\u8865\u4F4D\u3002","aa-exploration-note");ge.append(xe,Ce,ve,Xe,se,Se,me,ze,it),(r.querySelector(".aa-side-panel-body")||r).append(ge);let He=Bt("section","","aa-all-model-table-panel");He.id="aa-all-model-table-panel",He.setAttribute("role","tabpanel"),He.setAttribute("aria-labelledby",te.id);let gt=Bt("div","","aa-all-model-table-tools"),Ke=document.createElement("input");Ke.type="search",Ke.id="aa-all-model-table-search",Ke.placeholder="\u7B5B\u9009\u6A21\u578B\u3001\u5382\u5546\u6216 UUID",Ke.setAttribute("aria-label",Ke.placeholder),Ke.addEventListener("input",()=>{y.search_text=Ke.value,_(),z()});let ct=document.createElement("select");ct.id="aa-all-model-analysis-filter",ct.setAttribute("aria-label","\u7B5B\u9009\u5206\u6790\u4E0E\u4E0A\u56FE\u8D44\u683C");for(let[D,X]of[["all","\u5168\u90E8\u8F93\u5165\u8BB0\u5F55"],["eligible","\u5206\u6790\u5408\u683C"],["ineligible","\u5206\u6790\u4E0D\u5408\u683C"],["displayed","\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE"],["excluded","\u672C\u53E3\u5F84\u672A\u4E0A\u56FE"]])ct.add(new Option(X,D));ct.addEventListener("change",()=>{y.analysis_filter=ct.value,_(),z()});let ot=Si("\u5BFC\u51FA\u5F53\u524D\u8868\u683C CSV","aa-export-all-model-table-csv",()=>Th(new Blob([Rp(R)],{type:"text/csv;charset=utf-8"}),`frontier-models-${i.data_date||"unknown"}.csv`)),re=Bt("p","","aa-exploration-note");re.id="aa-all-model-table-counts";let Fe=document.createElement("table");Fe.id="aa-all-model-table",Fe.append(Bt("caption","\u5168\u90E8\u6A21\u578B\uFF1A\u542B\u7F3A\u503C\u3001\u88AB\u526A\u679D\u53CA\u5206\u6790\u4E0D\u5408\u683C\u8BB0\u5F55\uFF1B\u6570\u503C\u4FDD\u7559\u5168\u5C40\u5206\u6790\u53E3\u5F84\u3002"));let $e=Fe.createTHead().insertRow();for(let D of us){let X=document.createElement("th");X.scope="col",X.dataset.sortField=D.key,X.append(Si(D.label,`aa-sort-model-table-${D.key}`,()=>{y.sort_direction=y.sort_field===D.key&&y.sort_direction==="desc"?"asc":"desc",y.sort_field=D.key,_(),z()})),$e.append(X)}let qe=Fe.createTBody(),ut=Bt("div","","aa-all-model-table-scroll");ut.tabIndex=0,ut.setAttribute("aria-label","\u53EF\u6A2A\u5411\u4E0E\u7EB5\u5411\u6EDA\u52A8\u7684\u5168\u90E8\u6A21\u578B\u8868"),ut.append(Fe),gt.append(Ke,ct,ot),He.append(gt,re,ut),n.append(He),F.addEventListener("keydown",D=>{["ArrowRight","ArrowLeft"].includes(D.key)&&(D.preventDefault(),st("table"),te.focus())}),te.addEventListener("keydown",D=>{a&&["ArrowRight","ArrowLeft"].includes(D.key)&&(D.preventDefault(),st("chart"),F.focus())});function je(D){ie.textContent=D}function at(){let D=a?c():M;return{...D,version:1,metric_variant_key:T(),display:{...D.display,measured_only:P.measured_only,sensitivity_intelligence_half_width:P.sensitivity_intelligence_half_width},date_filter:{cutoff_date:P.cutoff_date,mode:P.date_mode},table:{...y}}}function z(){p||m!==null||(m=window.setTimeout(()=>{m=null;let D=wh(at());if(D!==window.location.hash)try{window.history.replaceState(window.history.state,"",D)}catch{je("\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u66F4\u65B0\u5730\u5740\u680F\uFF1B\u590D\u5236\u94FE\u63A5\u4ECD\u53EF\u4FDD\u5B58\u89C6\u56FE\u3002 ")}},0))}async function Mt(){let D=window.location.href.split("#")[0]+wh(at()),X=window.location.protocol==="file:"?" \u672C\u5730\u6587\u4EF6\u5206\u4EAB\u9700\u540C\u65F6\u63D0\u4F9B\u5BF9\u5E94 HTML\u3002":"";try{await navigator.clipboard.writeText(D),ue.hidden=!0,je("\u5DF2\u590D\u5236\u5F53\u524D\u89C6\u56FE\u94FE\u63A5\u3002"+X)}catch{ue.hidden=!1,ue.value=D,ue.focus(),ue.select(),je("\u65E0\u6CD5\u8BBF\u95EE\u526A\u8D34\u677F\uFF0C\u94FE\u63A5\u5DF2\u9009\u4E2D\uFF0C\u53EF\u624B\u52A8\u590D\u5236\u3002"+X)}}function st(D){y.active_tab=a?D:"table";let X=y.active_tab==="table";He.hidden=!X,s.style.visibility=X?"hidden":"",F.setAttribute("aria-selected",String(!X)),te.setAttribute("aria-selected",String(X)),F.tabIndex=X?-1:0,te.tabIndex=X?0:-1,_(),z()}function C(D){Object.assign(P,D),fe.checked=P.measured_only,ve.value=P.cutoff_date||"",Xe.value=P.date_mode,Ce.value=P.sensitivity_intelligence_half_width,ze.hidden=Ce.value==="off",d({...P}),_(),z()}function _(){let D=i.metric_variants[T()],X=D?.three_dimensional_scene?.displayed_model_markers||[],pe=D?.model_analysis_records;if(!pe){let de=new Map((i.models||[]).map(De=>[De.model_uuid||JSON.stringify([De.creator,De.name]),{...De,is_displayed:!1,drop_reason:"\u65E7\u6587\u4EF6\u672A\u7559\u5B58\u672C\u53E3\u5F84\u8D44\u683C\u6216\u672A\u4E0A\u56FE\u539F\u56E0"}]));for(let De of[...X,...D?.excluded_models_with_drop_reason||[]]){let O=De.model_uuid||JSON.stringify([De.creator,De.name]),Me=de.get(O);de.set(O,{...Me,...De,panel:{...Me?.panel,...De.panel,intelligence:De.panel?.intelligence??De.intelligence??Me?.panel?.intelligence,release_date:De.panel?.release_date??De.release_date??Me?.panel?.release_date},is_displayed:X.includes(De),layer:De.panel?.layer})}pe=[...de.values()].map((De,O)=>({...De,model_index:O}))}let Re=de=>{if(!f(de))return!1;if(a)return!0;let De=i.organization_identity_metadata_by_creator_name?.[de.creator]?.organization_identity_key;if(M.hidden_organization_identity_keys?.includes(De)||M.display?.comparable_only&&de.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant===!1)return!1;let O=X.find(Me=>Me.model_uuid===de.model_uuid);return M.display?.recent_release_grace_period!==!1||!O?.displayed_only_because_of_recent_release_grace_period},we=pe.filter(de=>Re(de)&&hs(de,P).visible);R=Cp(we.map(de=>({...de,sensitivity_text:P.sensitivity_intelligence_half_width==="off"?"\u5173\u95ED":nc(de.sensitivity_by_intelligence_half_width?.[P.sensitivity_intelligence_half_width],de.layer===1)})),y);let ye=X.filter(de=>Re(de)&&hs(de,P).visible).length;if(re.textContent=`\u5168\u5C40\u8F93\u5165 ${pe.length}\uFF1B\u5F53\u524D\u7B5B\u9009\u8868\u683C ${R.length}\uFF1B\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE ${X.length}\uFF0C\u53EF\u89C1 ${ye}\u3002${i.model_table_coverage==="all_input_records"?"":"\u65E7\u6587\u4EF6\u53EA\u8986\u76D6\u5B9E\u9645\u7559\u5B58\u8BB0\u5F55\uFF0C\u65E0\u6CD5\u6062\u590D\u539F\u59CB\u8F93\u5165\u7684\u5168\u90E8\u6A21\u578B\u3002"} \u672A\u77E5\u53D1\u5E03\u65E5\u671F ${pe.filter(de=>!Os(de.panel?.release_date)).length}\u3002`,He.hidden||p)return;for(let de of $e.cells)de.setAttribute("aria-sort",de.dataset.sortField===y.sort_field?y.sort_direction==="asc"?"ascending":"descending":"none");let Pe=document.createDocumentFragment();for(let de of R){let De=document.createElement("tr");De.dataset.modelUuid=de.model_uuid||"",De.dataset.dateFaded=String(hs(de,P).faded);for(let O of us){let Me=De.insertCell(),ae=O.value(de);if(Me.textContent=ae==null?"\u672A\u77E5":typeof ae=="number"?Number(ae.toPrecision(6)).toString():String(ae),O.key==="name"&&a&&de.model_uuid){let Ae=Si(de.name,"",()=>{A(de),W()});Ae.setAttribute("aria-label",`\u56FA\u5B9A ${de.name}`),Me.replaceChildren(Ae)}}Pe.append(De)}qe.replaceChildren(Pe)}function G(){I!==null&&window.clearInterval(I),I=null,se.textContent="\u64AD\u653E\u53D1\u5E03\u65E5\u671F",se.setAttribute("aria-pressed","false")}function Y(){if(I!==null){G();return}let D=[...new Set((i.models||Object.values(i.metric_variants).flatMap(Re=>Re.three_dimensional_scene.displayed_model_markers)).map(Re=>Re.panel?.release_date).filter(Os))].sort();if(!D.length){je("\u6CA1\u6709\u53EF\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\u53EF\u64AD\u653E\u3002");return}let X=P.cutoff_date?D.findIndex(Re=>Re>P.cutoff_date):0;X<0&&(X=0);let pe=()=>{C({cutoff_date:D[X++]}),X>=D.length&&G()};se.textContent="\u6682\u505C\u53D1\u5E03\u65E5\u671F",se.setAttribute("aria-pressed","true"),I=window.setInterval(pe,900),pe()}function W(){_(),z()}function _e(){let{state:D,reason:X}=tc(window.location.hash);if(X&&je(X),!!D){G(),m!==null&&window.clearTimeout(m),m=null,p=!0;try{D.table&&Object.assign(y,D.table),a||(M=D,D.metric_variant_key&&i.metric_variants[D.metric_variant_key]?L=D.metric_variant_key:D.metric_variant_key&&je("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002"),w.forEach((pe,Re)=>{pe.value=L.split("__")[Re]})),D.date_filter&&Object.assign(P,{cutoff_date:D.date_filter.cutoff_date,date_mode:D.date_filter.mode});for(let pe of["measured_only","sensitivity_intelligence_half_width"])D.display?.[pe]!==void 0&&(P[pe]=D.display[pe]);u(D,je),C(P),Ke.value=y.search_text,ct.value=y.analysis_filter,st(y.active_tab)}finally{p=!1}_()}}window.addEventListener("hashchange",_e),window.addEventListener("popstate",_e),window.addEventListener("pagehide",G),document.addEventListener("visibilitychange",()=>{document.hidden&&G()});let he=i.refresh_difference_report;if(he){let D=Bt("details","","aa-model-exploration-controls");D.id="aa-refresh-difference-summary",D.append(Bt("summary",`\u5237\u65B0\u5DEE\u5F02${i.previous_data_date?` \xB7 \u76F8\u6BD4 ${i.previous_data_date}`:""}`));let X=he.status==="comparable"?[`\u65B0\u589E ${he.added_model_uuids?.length||0}\uFF1B\u672C\u6B21\u672A\u51FA\u73B0 ${he.absent_model_uuids?.length||0}\uFF08\u4E0D\u4EE3\u8868\u9000\u5E02\uFF09\u3002`,`\u5B57\u6BB5\u7F3A\u5931\u53D8\u5316 ${he.field_missingness_changes?.length||0}\uFF1B\u53EF\u6BD4\u6B63\u503C\u53D8\u5316\u8D85\u8FC7 10%\uFF1A${he.metric_changes_exceeding_ten_percent?.length||0}\u3002`,he.frontier_comparison?.status==="comparable"?"\u524D\u6CBF\u8FDB\u51FA\u6765\u81EA\u5339\u914D\u7684\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u3002":he.frontier_comparison?.reason]:[he.reason];for(let Re of X.filter(Boolean))D.append(Bt("p",Re,"aa-exploration-note"));let pe=Bt("pre",JSON.stringify(he,null,2),"aa-refresh-difference-records");if(D.append(pe),(r.querySelector(".aa-side-panel-body")||r).append(D),he.index_version_warning){let Re=Bt("p",he.index_version_warning,"aa-report-header-data-quality-warning");Re.id="aa-index-version-change-warning",document.getElementById("frontier-3d-report-header").append(Re)}}return p=!0,st(y.active_tab),p=!1,_e(),_(),{getState:at,getFilters:()=>({...P}),setExplorationFilters:C,sharedViewChanged:W,refresh:_,announce:je,pausePlayback:G}}function Pv({radius:i,verticalFieldOfViewDegrees:e,canvasWidth:t,canvasHeight:n,paddingCssPixels:s=56}){if(![i,e,t,n].every(u=>Number.isFinite(u)&&u>0)||e>=180)throw new Error("\u81EA\u52A8\u53D6\u666F\u9700\u8981\u6709\u6548\u5305\u56F4\u7403\u3001\u89C6\u573A\u4E0E\u753B\u5E03\u5C3A\u5BF8");let r=Math.max(.4,1-2*s/t),a=Math.max(.4,1-2*s/n),o=Math.tan(_i.degToRad(e/2)),c=Math.atan(o*Math.min(a,r*t/n));return i/Math.sin(c)*1.04}function Ip({camera:i,controls:e,canvas:t,graphContainer:n,getBoundingSphere:s,getInitialCameraDirection:r,hitTest:a,onCameraStateCommitted:o,onDismissOverlay:c,onClearSelection:u,onFocusSearch:d,requestRender:f}){let h=!0,g=null,v=`${window.innerWidth}:${window.innerHeight}`,A={intelligence_cost:[0,-1,0],intelligence_speed:[1,0,0],cost_speed:[0,0,1]};function p(w){i.up.fromArray(w).normalize(),e._quat.setFromUnitVectors(i.up,new B(0,1,0)),e._quatInverse.copy(e._quat).invert()}function m(w=!0){let T=s(),P=Math.max(1,n.clientWidth),y=Math.max(1,n.clientHeight);i.aspect=P/y;let R=Pv({radius:Math.max(T.radius,.01),verticalFieldOfViewDegrees:i.fov,canvasWidth:P,canvasHeight:y}),k=new B(...g?A[g]:r()).normalize();p(g==="cost_speed"?[0,1,0]:[0,0,1]),e.target.copy(T.center),i.position.copy(T.center).addScaledVector(k,R),i.near=.01,i.far=Math.max(100,R*4),e.maxDistance=Math.max(14,R*3),i.updateProjectionMatrix(),e.update(),f(),w&&o()}function I({commit:w=!0}={}){h=!0,g=null,m(w)}function L(w){return A[w]?(h=!0,g=w,m(),!0):!1}function M(w){h=!1,p(w.up),e.target.fromArray(w.target),i.position.fromArray(w.position);let T=i.position.distanceTo(e.target);e.maxDistance=Math.max(e.maxDistance,T*1.01),e.minDistance=Math.min(e.minDistance,T*.99),i.far=Math.max(100,T*4),i.updateProjectionMatrix(),e.update(),f()}return t.tabIndex=0,t.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF\uFF1B\u65B9\u5411\u952E\u65CB\u8F6C\uFF0C\u659C\u6760\u641C\u7D22\uFF0CEscape \u5173\u95ED\u6D6E\u5C42\u6216\u6E05\u9664\u56FA\u5B9A\uFF0C\u53CC\u51FB\u7A7A\u767D\u91CD\u7F6E\u89C6\u89D2"),t.addEventListener("dblclick",w=>{a(w.clientX,w.clientY)||I()}),e.addEventListener("start",()=>{h=!1}),e.addEventListener("end",o),document.addEventListener("keydown",w=>{let T=w.target.closest?.("input,textarea,select,[contenteditable='true']");if(w.key==="Escape"){if(c()){w.preventDefault(),w.stopImmediatePropagation();return}if(T)return;u(),w.preventDefault(),w.stopImmediatePropagation();return}if(T||w.ctrlKey||w.metaKey||w.altKey)return;if(w.key==="/"){w.preventDefault(),d();return}if(w.target!==t||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key))return;w.preventDefault(),h=!1;let P=i.position.clone().sub(e.target),R=w.key==="ArrowLeft"||w.key==="ArrowRight"?i.up.clone():new B().crossVectors(i.up,P).normalize();P.applyAxisAngle(R,(w.key==="ArrowLeft"||w.key==="ArrowUp"?1:-1)*Math.PI/36),Math.abs(P.clone().normalize().dot(i.up))<.995&&i.position.copy(e.target).add(P),e.update(),f(),o()},!0),{resetCamera:I,setAxisAlignedCameraView:L,restoreCameraState:M,serializeCameraState:()=>Object.fromEntries([["position",i.position],["target",e.target],["up",i.up]].map(([w,T])=>[w,T.toArray().map(P=>Math.abs(P)<1e-10?0:Number(P.toPrecision(12)))])),onResize:()=>{let w=`${window.innerWidth}:${window.innerHeight}`;h&&w!==v&&m(!1),v=w}}}async function Pp({scene:i,camera:e,graphContainer:t,title:n,metadataLines:s,legendLines:r,pinnedModelNames:a}){let o=Math.max(1,t.clientWidth),c=Math.max(1,t.clientHeight),u=getComputedStyle(document.body).fontFamily,d=window.matchMedia("(prefers-color-scheme: dark)").matches,f=d?"#111827":"#ffffff",h=d?"#f3f4f6":"#17202a",g=document.createElement("canvas"),v=g.getContext("2d");if(!v)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u753B\u5E03");v.font=`13px ${u}`;function A(P){let y=[],R="";for(let k of String(P))v.measureText(R+k).width>Math.max(50,o-32)&&(y.push(R),R=""),R+=k;return R&&y.push(R),y}let p=[n,...s].flatMap(A),m=[...r,`\u56FA\u5B9A\u6A21\u578B\uFF1A${a.length?a.join("\u3001"):"\u65E0"}`,"\u6570\u636E\u6765\u6E90\uFF1AArtificial Analysis \xB7 https://artificialanalysis.ai/"].flatMap(A),I=20+p.length*20,L=20+m.length*20,M=document.createElement("canvas");M.width=o*2,M.height=(c+I+L)*2;let w=M.getContext("2d");if(!w)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u4E0A\u4E0B\u6587");let T;window.frontier3dLastPngExportStatus={inProgress:!0,resourcesReleased:!1,width:M.width,height:M.height};try{T=new Ar({antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),T.outputColorSpace=$t,T.setPixelRatio(2),T.setSize(o,c,!1);let P=e.clone();P.aspect=o/c,P.updateProjectionMatrix(),T.render(i,P),w.scale(2,2),w.fillStyle=f,w.fillRect(0,0,o,M.height/2),w.fillStyle=h,w.textBaseline="top",p.forEach((N,F)=>{w.font=`${F===0?"600 15":"13"}px ${u}`,w.fillText(N,16,10+F*20)}),w.drawImage(T.domElement,0,I,o,c);let y=t.getBoundingClientRect();w.save(),w.beginPath(),w.rect(0,I,o,c),w.clip();let R=[...t.querySelectorAll(".aa-threejs-axis-label,.aa-threejs-axis-tick-label,.aa-pinned-model-name-label")].sort((N,F)=>(parseInt(getComputedStyle(N).zIndex,10)||0)-(parseInt(getComputedStyle(F).zIndex,10)||0));for(let N of R){if(N.hidden||N.style.display==="none")continue;let F=N.getBoundingClientRect();if(!F.width||!F.height)continue;let te=F.x-y.x+F.width/2,K=I+F.y-y.y+F.height/2,q=/rotate\(([-\d.]+)deg\)/.exec(N.style.transform)?.[1]||0;w.save(),w.translate(te,K),w.rotate(Number(q)*Math.PI/180);let ee=getComputedStyle(N),j=parseFloat(ee.fontSize)||12,ie=parseFloat(ee.lineHeight)||j*1.3;w.font=`${ee.fontWeight} ${j}px ${u}`;let ue=(N.textContent+(N.dataset.directionHint||"")).replace(/\s+/g," ").trim(),ge=Math.max(20,N.offsetWidth-8),fe=[],xe="";for(let Xe of ue)xe&&w.measureText(xe+Xe).width>ge&&(fe.push(xe),xe=""),xe+=Xe;xe&&fe.push(xe);let Ce=Math.max(...fe.map(Xe=>w.measureText(Xe).width),0),ve=fe.length*ie;w.fillStyle=f,w.fillRect(-Ce/2-3,-ve/2-2,Ce+6,ve+4),w.fillStyle=h,w.textAlign="center",w.textBaseline="middle",fe.forEach((Xe,se)=>w.fillText(Xe,0,(se-(fe.length-1)/2)*ie)),w.restore()}return w.restore(),w.font=`13px ${u}`,w.fillStyle=h,m.forEach((N,F)=>w.fillText(N,16,I+c+10+F*20)),await new Promise((N,F)=>M.toBlob(te=>te?N(te):F(new Error("\u6D4F\u89C8\u5668\u672A\u80FD\u7F16\u7801 PNG")),"image/png"))}finally{T?.dispose(),T?.forceContextLoss(),T?.domElement.remove(),window.frontier3dLastPngExportStatus={...window.frontier3dLastPngExportStatus,inProgress:!1,resourcesReleased:!0},g.width=g.height=0,M.width=M.height=0}}var Lp={type:"change"},Ih={type:"start"},Np={type:"end"},ic=new Ji,Dp=new Wn,Lv=Math.cos(70*_i.DEG2RAD),Zt=new B,Rn=2*Math.PI,Lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Rh=1e-6,sc=class extends va{constructor(e,t=null){super(e,t),this.state=Lt.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ns.ROTATE,MIDDLE:ns.DOLLY,RIGHT:ns.PAN},this.touches={ONE:is.ROTATE,TWO:is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Fn,this._lastTargetPosition=new B,this._quat=new Fn().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vr,this._sphericalDelta=new vr,this._scale=1,this._panOffset=new B,this._rotateStart=new Je,this._rotateEnd=new Je,this._rotateDelta=new Je,this._panStart=new Je,this._panEnd=new Je,this._panDelta=new Je,this._dollyStart=new Je,this._dollyEnd=new Je,this._dollyDelta=new Je,this._dollyDirection=new B,this._mouse=new Je,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Nv.bind(this),this._onPointerDown=Dv.bind(this),this._onPointerUp=Fv.bind(this),this._onContextMenu=Hv.bind(this),this._onMouseWheel=Bv.bind(this),this._onKeyDown=zv.bind(this),this._onTouchStart=kv.bind(this),this._onTouchMove=Vv.bind(this),this._onMouseDown=Uv.bind(this),this._onMouseMove=Ov.bind(this),this._interceptControlDown=Gv.bind(this),this._interceptControlUp=Wv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lp),this.update(),this.state=Lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Zt.copy(t).sub(this.target),Zt.applyQuaternion(this._quat),this._spherical.setFromVector3(Zt),this.autoRotate&&this.state===Lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Rn:n>Math.PI&&(n-=Rn),s<-Math.PI?s+=Rn:s>Math.PI&&(s-=Rn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Zt.setFromSpherical(this._spherical),Zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Zt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let u=new B(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(o),this.object.updateMatrixWorld(),a=Zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ic.origin.copy(this.object.position),ic.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ic.direction))<Lv?this.object.lookAt(this.target):(Dp.setFromNormalAndCoplanarPoint(this.object.up,this.target),ic.intersectPlane(Dp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Rh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Rh||this._lastTargetPosition.distanceToSquared(this.target)>Rh?(this.dispatchEvent(Lp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Rn/60*this.autoRotateSpeed*e:Rn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Zt.setFromMatrixColumn(t,0),Zt.multiplyScalar(-e),this._panOffset.add(Zt)}_panUp(e,t){this.screenSpacePanning===!0?Zt.setFromMatrixColumn(t,1):(Zt.setFromMatrixColumn(t,0),Zt.crossVectors(this.object.up,Zt)),Zt.multiplyScalar(e),this._panOffset.add(Zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Zt.copy(s).sub(this.target);let r=Zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Je,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Dv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Nv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Fv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Np),this.state=Lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Uv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Lt.DOLLY;break;case ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}break;case ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Ih)}function Ov(i){switch(this.state){case Lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Bv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Lt.NONE||(i.preventDefault(),this.dispatchEvent(Ih),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Np))}function zv(i){this.enabled!==!1&&this._handleKeyDown(i)}function kv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Lt.TOUCH_ROTATE;break;case is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Lt.TOUCH_PAN;break;default:this.state=Lt.NONE}break;case 2:switch(this.touches.TWO){case is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Lt.TOUCH_DOLLY_PAN;break;case is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Lt.TOUCH_DOLLY_ROTATE;break;default:this.state=Lt.NONE}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Ih)}function Vv(i){switch(this._trackPointer(i),this.state){case Lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Lt.NONE}}function Hv(i){this.enabled!==!1&&i.preventDefault()}function Gv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Wv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}(function(){"use strict";let e=new Map,t=document.createElement("div");t.id="frontier-3d-runtime-diagnostic-banner",t.setAttribute("role","alert"),t.hidden=!0,document.body.append(t);function n(l,x){x?e.set(l,x):e.delete(l),t.textContent=[...e.values()].join("\uFF1B"),t.hidden=e.size===0}window.frontier3dRuntimeDiagnosticStatus=()=>Object.fromEntries(e),window.addEventListener("error",l=>n("window_error",`\u9875\u9762\u9519\u8BEF\uFF1A${String(l.message||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`)),window.addEventListener("unhandledrejection",l=>n("unhandled_rejection",`\u9875\u9762\u64CD\u4F5C\u5931\u8D25\uFF1A${String(l.reason?.message||l.reason||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`));let r=document.getElementById("frontier-3d-visualization-dataset-json");if(!r)throw new Error("Missing Frontier 3D visualization dataset");let a=bh(JSON.parse(r.textContent)),o=a.metric_variants||{},c=a.organization_identity_metadata_by_creator_name||{},u=a.initial_variant_key;if(!o[u])throw new Error(`Missing initial metric variant: ${u}`);let d=document.getElementById(a.graph_div_id||"frontier3d"),f=document.getElementById("frontier-3d-plot-region"),h=document.getElementById("frontier-3d-report-shell"),g=document.getElementById("frontier-3d-toolbar"),v=document.getElementById("frontier-3d-side-panel");if(!d||!f||!h||!g||!v)throw new Error("Frontier 3D report document is incomplete");let A=document.getElementById("frontier-3d-report-header"),p=null,m=null,I={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"};function L(){p?.sharedViewChanged()}let M=a.artificial_analysis_data_provenance||{},w=Number.isInteger(M.recent_release_frontier_distance_grace_period_months)?M.recent_release_frontier_distance_grace_period_months:null,T="https://artificialanalysis.ai/",P="\u5386\u53F2\u53E3\u5F84\uFF08\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u7684\u6210\u672C/\u5197\u957F\u5EA6\uFF09\uFF0C\u4E0D\u53C2\u4E0E\u672C\u53E3\u5F84\u524D\u6CBF\u8BA1\u7B97";function y(l){let x=document.querySelector(`meta[name="${l}"]`);return x&&x.getAttribute("content")||""}let R={rendererBundleSha256:y("frontier-3d-renderer-bundle-sha256")||"unknown",generatorGitCommit:y("frontier-3d-generator-git-commit")||"unknown",renderedAtUtc:y("frontier-3d-rendered-at-utc")||"unknown"};window.FRONTIER_3D_VISUALIZATION_DATASET=a;let k=new _r;k.background=new mt(16777215);let N=new en(42,1,.01,100);N.up.set(0,0,1);let F;try{F=new Ar({antialias:!0,alpha:!1,preserveDrawingBuffer:!1})}catch{n("webgl_unavailable","\u65E0\u6CD5\u542F\u52A8\u4E09\u7EF4\u56FE\uFF1A\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WebGL\uFF0C\u6216\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3\u3002\u8BF7\u542F\u7528\u6D4F\u89C8\u5668\u56FE\u5F62\u52A0\u901F\u540E\u91CD\u65B0\u52A0\u8F7D\u3002"),p=Ch({dataset:a,reportShell:h,toolbar:g,plotRegion:f,graphContainer:d,sidePanel:v,webglAvailable:!1}),window.serializeFrontierViewState=p.getState,window.setFrontierExplorationFilters=p.setExplorationFilters;return}let te=!1;F.domElement.addEventListener("webglcontextlost",l=>{l.preventDefault(),te=!0,ln=!1,_n(),n("webgl_context","\u4E09\u7EF4\u56FE\u7684\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u6B63\u5728\u7B49\u5F85\u6D4F\u89C8\u5668\u6062\u590D\u3002")}),F.domElement.addEventListener("webglcontextrestored",()=>{te=!1,ln=!1,xs(),n("webgl_context",null),Ht()}),F.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),F.outputColorSpace=$t,F.domElement.setAttribute("data-frontier-threejs-canvas","true"),F.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF"),d.replaceChildren(F.domElement);let K=new sc(N,F.domElement);K.enableDamping=!1,K.screenSpacePanning=!0,K.zoomToCursor=!0,K.minDistance=2.4,K.maxDistance=14;let q=new xa,ee=new Je,j=new Xn,ie=new Xn,ue=new Xn,ge=new Xn;k.add(j,ie,ue,ge);let fe,xe,Ce,ve=[],Xe={},se={},Se={},me={},ze=[],it=[],He=[],gt=[],Ke={},ct={},ot=null,re=null,Fe=null,$e=null,qe=null,ut=null,je=null,at=!1,z=!1,Mt=w>0,st,C=0,_=0,G=[],Y="wireframe",W=!1,_e=!window.matchMedia("(max-width: 640px)").matches,he=null,D=null,X=null,pe=null,Re=null,we=new Set,ye=new Set,Pe=new Map;function de(l){return l.model_uuid?.toLowerCase()||`legacy:${JSON.stringify([l.creator,l.name])}`}(a.models||[]).forEach(l=>Pe.set(de(l),l)),Object.values(o).forEach(l=>{(l.three_dimensional_scene?.displayed_model_markers||[]).forEach(x=>{Pe.set(de(x),x)})});function De(l){return ye.has(de(l))}function O(){we=new Set([...ye].map(l=>Pe.get(l)?.base_model_name).filter(Boolean))}function Me(l){let x=[];for(let[b,E]of Pe)E.base_model_name===l&&x.push(b);return x}function ae(l){let x=Me(l);return x.length>0&&x.every(b=>ye.has(b))}function Ae(l,x){for(let[b,E]of Pe)E.base_model_name===l&&(x?ye.add(b):ye.delete(b));return O(),Xs(),wi(),Promise.resolve(!0)}let Le=new Set,oe=cs.TREND_RESIDUAL,Ue={intelligence:1,cost:1,speed:1},Ge={},wt=null,St={},ln=!1,In="frontier3d.marker-size-multiplier",Zn=Object.freeze({logo:22,backplate:29,countryRegion:38,paretoRing:38,pinnedRing:49,standoutHalo:52,standoutHaloMinimum:44,standoutHaloMaximum:64,missingStandoutHalo:48,prunedLineageAncestor:18}),Ir="frontier3d.pinned-comparison-fields";function Pr(l,x){try{return JSON.parse(window.localStorage.getItem(l))??x}catch{return x}}function ds(l,x){try{window.localStorage.setItem(l,JSON.stringify(x))}catch{}}let Ua=Pr(In,.5),Pn=Number.isFinite(Ua)?Math.min(1.5,Math.max(.5,Ua)):.5,Lr=["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"],li=Pr(Ir,[]),En=new Set(Array.isArray(li)?li.filter(l=>Lr.includes(l)):[]),Kt,Bi,Vt,kn,wn=-1,fn=null,Dr=null,fs=null,Bs=document.createElement("div");Bs.id="aa-pinned-model-name-labels",d.append(Bs);let zs=document.createElement("div");zs.id="aa-lineage-overflow-direction-labels",d.append(zs);let jn,S,H,Q,J,Z,be,Oe,Te,ke,Ye,lt=[],Qe,We,et,xt,vt,yt,zt,Be,Ot,Ze=document.createElement("div");Ze.id="aa-threejs-model-tooltip",Ze.className="aa-threejs-model-tooltip",Ze.hidden=!0;let pn=document.createElement("div");Ze.append(pn);let cn=Ve("div","aa-touch-details-actions"),mn=Ve("button","aa-secondary-button");mn.type="button",mn.addEventListener("click",()=>{fn&&he!==null&&Va(fn.base_model_name)});let ci=Ve("button","aa-secondary-button","\u5173\u95ED\u8BE6\u60C5");ci.type="button",ci.addEventListener("click",_n),cn.append(ci),f.appendChild(Ze);let bt=[],Dt=new WeakMap,Jn=0,At="";document.fonts?.ready.then(()=>{Dt=new WeakMap,Ht()});function Kn(l,x,b){let E=document.createElement("div");if(E.className=b?"aa-threejs-axis-label":"aa-threejs-axis-tick-label",E.dataset.axisName=l,E.textContent=x,b){let U=l==="x"?"\u8D8A\u4F4E\u8D8A\u597D":"\u8D8A\u9AD8\u8D8A\u597D";E.dataset.directionHint=` ${l==="x"?"\u2193":"\u2191"} ${U}`,E.setAttribute("aria-label",`${x}\uFF0C${U}`)}return d.appendChild(E),E}function zi(){let{width:l,height:x}=d.getBoundingClientRect(),b=`${l}:${x}:${window.innerWidth}:${window.innerHeight}`;b!==At&&(Dt=new WeakMap,At=b);let E=bt.flatMap($=>$.labels).filter(({element:$})=>!Dt.has($));for(let{element:$}of E)$.hidden=!1;for(let{element:$}of E)Dt.set($,{width:$.offsetWidth,height:$.offsetHeight}),Jn+=1;let U=$=>{let le=$.clone().project(N);return{x:(le.x+1)*l/2,y:(1-le.y)*x/2,depth:le.z}},V=new Map,ne=bt.map(({start:$,end:le,labels:ce},Ee)=>({projectedStart:U($),projectedEnd:U(le),labels:ce.map(({element:Ie,position:nt,isTitle:ft},Pt)=>{let Tt=`${Ee}:${Pt}`;V.set(Tt,Ie);let Xt=U(nt);return{id:Tt,isTitle:ft,anchor:Xt,projectedDepth:Xt.depth,...Dt.get(Ie)}})}));for(let $ of Ap({canvasWidth:l,canvasHeight:x,projectedCenter:U(new B),axes:ne})){let le=V.get($.id);le.hidden=$.hidden,!$.hidden&&(le.style.transform=`translate(-50%, -50%) rotate(${$.rotationDegrees}deg)`,le.style.left=`${$.x}px`,le.style.top=`${$.y}px`)}}function Ht(){ln||te||(ln=!0,window.requestAnimationFrame(()=>{ln=!1,!te&&(F.render(k,N),zi(),id(),Vh())}))}K.addEventListener("change",Ht);function Oa(l){for(;l.children.length;){let x=l.children.pop();x.userData.foregroundMaterial?.dispose(),x.userData.dateFadedMaterial?.dispose(),!x.isSprite&&x.geometry&&x.geometry.dispose&&x.geometry.dispose(),x.material&&x.material.dispose&&!x.userData.sharedMaterial&&x.material.dispose()}}function Fp(l,x){return x.scale_type==="log"?Math.log10(Math.max(Number(l),Number.MIN_VALUE)):Number(l)}function Ba(l,x){let b=x.fixed_range,E=Number(b[0]),U=Number(b[1]),V=Fp(l,x);return!Number.isFinite(V)||U===E?0:-1+2*(V-E)/(U-E)}function ps(l,x,b){let E=xe.three_dimensional_axis_configuration;return new B(Ba(l,E.x_axis),Ba(x,E.y_axis),Ba(b,E.z_axis))}function za(l){return ps(l.x,l.y,l.z).clampScalar(-1,1)}function Ph(l){let x=ps(l.x,l.y,l.z);return["\u6210\u672C","\u901F\u5EA6","\u667A\u80FD"].flatMap((b,E)=>{let U=x.getComponent(E);return U<-1?[`${b}\u4F4E\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2193`]:U>1?[`${b}\u9AD8\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2191`]:[]}).join("\uFF1B")}function Nr(l,x,b=1){let E=new nn;E.setAttribute("position",new kt(l.flatMap(V=>V.toArray()),3));let U=new xr({color:x,linewidth:b});return new ha(E,U)}function ka(l,x,b,E=!1){let U=new Cr;U.setPositions(l.flatMap($=>$.toArray()));let V=new Rr({color:x,linewidth:b,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,dashed:E});V.resolution.set(d.clientWidth,d.clientHeight);let ne=new ec(U,V);return ne.renderOrder=100,E&&ne.computeLineDistances(),ne}function Up(){Oa(j);let l=(ne,$,le)=>new B(ne,$,le),x=[[l(-1,-1,-1),l(1,-1,-1)],[l(-1,1,-1),l(1,1,-1)],[l(-1,-1,1),l(1,-1,1)],[l(-1,1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,1,-1)],[l(1,-1,-1),l(1,1,-1)],[l(-1,-1,1),l(-1,1,1)],[l(1,-1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,-1,1)],[l(1,-1,-1),l(1,-1,1)],[l(-1,1,-1),l(-1,1,1)],[l(1,1,-1),l(1,1,1)]];j.add(Nr(x.flat(),6583435)),bt.forEach(({labels:ne})=>ne.forEach(({element:$})=>$.remove())),bt.length=0;let b=xe.three_dimensional_axis_configuration,E=[],U=[];[["x",l(-1,1,-1),l(1,1,-1),l(0,.04,0)],["y",l(-1,-1,-1),l(-1,1,-1),l(-.04,0,0)],["z",l(-1,-1,-1),l(-1,-1,1),l(-.04,0,0)]].forEach(([ne,$,le,ce])=>{let Ee=b[`${ne}_axis`],Ie=[{element:Kn(ne,Ee.title_text,!0),position:$.clone().lerp(le,.5),isTitle:!0}];U.push($,le),bp(Ee).forEach(nt=>{let ft=Ba(nt,Ee),Pt=$.clone().lerp(le,(ft+1)/2);U.push(Pt,Pt.clone().add(ce));let Tt=Kn(ne,Math.abs(nt)>=1e6||nt!==0&&Math.abs(nt)<.001?nt.toExponential():String(nt),!1);Tt.dataset.axisValue=String(nt),Ie.push({element:Tt,position:Pt,isTitle:!1}),ne==="x"?E.push(l(ft,-1,-1),l(ft,1,-1)):ne==="y"?E.push(l(-1,ft,-1),l(1,ft,-1)):E.push(l(-1,-1,ft),l(-1,1,ft),l(-1,1,ft),l(1,1,ft))}),bt.push({start:$,end:le,labels:Ie})}),j.add(Nr(U,3359061));let V=Nr(E,14212838);V.material.transparent=!0,V.material.opacity=.72,j.add(V)}function ks(l){return typeof l=="number"&&Number.isFinite(l)}function rc(l,x,b){let E=l?l[x]:void 0;return Array.isArray(E)?E:(E!=null&&(b.nonFiniteValueCount+=1),[])}function Lh(l,x){C+=x.nonFiniteValueCount,_+=x.outOfRangeIndexCount,G.push(l),console.warn(`Frontier 3D \u5951\u7EA6\u51E0\u4F55 ${l} \u542B\u975E\u6709\u9650\u5750\u6807/\u7D22\u5F15\u6216\u7ED3\u6784\u4E0D\u4E00\u81F4\uFF0C\u5DF2\u8DF3\u8FC7\u7ED8\u5236`,x)}function Dh(l,x){let b={nonFiniteValueCount:0,outOfRangeIndexCount:0},E=["x_coordinates","y_coordinates","z_coordinates"].map(Ee=>rc(l,Ee,b)),[U,V,ne]=E,$=U.length===V.length&&U.length===ne.length;if(E.forEach(Ee=>Ee.forEach(Ie=>{Ie!=null&&!ks(Ie)&&(b.nonFiniteValueCount+=1)})),!$||b.nonFiniteValueCount)return Lh(x,b),[];let le=[],ce=null;for(let Ee=0;Ee<U.length;Ee+=1){let Ie=[U[Ee],V[Ee],ne[Ee]];if(Ie.some(ft=>ft==null)){ce=null;continue}let nt=ps(...Ie);ce&&le.push(ce,nt),ce=nt}return le}function Nh(l,x,b){let E={nonFiniteValueCount:0,outOfRangeIndexCount:0},[U,V,ne]=["x_coordinates","y_coordinates","z_coordinates"].map(Ct=>rc(l,Ct,E)),$=["triangle_vertex_index_a","triangle_vertex_index_b","triangle_vertex_index_c"].map(Ct=>rc(l,Ct,E)),le=U.length,ce=$[0].length,Ee=["x_coordinates","y_coordinates","z_coordinates"].every(Ct=>Array.isArray(l?.[Ct]));if([U,V,ne].forEach(Ct=>Ct.forEach(Ln=>{ks(Ln)||(E.nonFiniteValueCount+=1)})),$.forEach(Ct=>Ct.forEach(Ln=>{!ks(Ln)||!Number.isInteger(Ln)?E.nonFiniteValueCount+=1:Ee&&(Ln<0||Ln>=le)&&(E.outOfRangeIndexCount+=1)})),!(V.length===le&&ne.length===le&&$.every(Ct=>Ct.length===ce))||E.nonFiniteValueCount||E.outOfRangeIndexCount)return Lh(b,E),null;if(!le||!ce)return null;let nt=U.flatMap((Ct,Ln)=>ps(Ct,V[Ln],ne[Ln]).toArray()),ft=[];for(let Ct=0;Ct<ce;Ct+=1)ft.push($[0][Ct],$[1][Ct],$[2][Ct]);let Pt=new nn;Pt.setAttribute("position",new kt(nt,3)),Pt.setIndex(ft),Pt.computeVertexNormals();let Tt=new Rs({side:$n,transparent:!0,depthTest:!0,depthWrite:!1,...x}),Xt=new sn(Pt,Tt);return Xt.renderOrder=60,Xt}function Op(){Oa(ie);let l=Dh(xe.pareto_frontier_wireframe_line_segments,"pareto_frontier_wireframe_line_segments");ot=l.length?Nr(l,2383002,2):null,ot&&ie.add(ot),re=Nh(xe.pareto_frontier_surface_triangle_mesh,{color:3244733,opacity:.25},"pareto_frontier_surface_triangle_mesh"),re&&ie.add(re),Fe=Nh(xe.achievable_frontier_surface_triangle_mesh,{color:3253076,opacity:.2},"achievable_frontier_surface_triangle_mesh"),Fe&&ie.add(Fe);let x=xe.exact_achievable_frontier_boundary_line_segments,b=x?Dh(x,"exact_achievable_frontier_boundary_line_segments"):[];$e=b.length?Nr(b,2193980,1):null,$e&&ie.add($e),bc()}function Vn(l){let x=document.createElement("canvas");x.width=128,x.height=128;let b=x.getContext("2d");l(b,x.width,x.height);let E=new Is(x);return E.colorSpace=$t,E.needsUpdate=!0,E}function ac(l,x,b,E,U,V){let ne=Math.min(V,E/2,U/2);l.beginPath(),l.roundRect(x,b,E,U,ne)}let Bp=Vn(l=>{ac(l,8,8,112,112,24),l.fillStyle="rgba(255,255,255,0.96)",l.fill(),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.45)",l.stroke()}),zp=Vn(l=>{ac(l,10,10,108,108,24),l.fillStyle="rgba(241,245,249,0.62)",l.fill(),l.setLineDash([14,9]),l.lineWidth=6,l.strokeStyle="rgba(71,85,105,0.9)",l.stroke()}),kp=.42,oc=Vn(l=>{l.beginPath(),l.arc(64,64,53,0,Math.PI*2),l.lineWidth=10,l.strokeStyle="rgba(15,23,42,0.66)",l.stroke()}),Vp=Vn(l=>{let x=l.createRadialGradient(64,64,32,64,64,63);x.addColorStop(0,"rgba(49,130,189,0)"),x.addColorStop(.65,"rgba(49,130,189,0.32)"),x.addColorStop(1,"rgba(49,130,189,0)"),l.fillStyle=x,l.fillRect(0,0,128,128)}),Hp=Vn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.setLineDash([8,8]),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.8)",l.stroke()}),lc=Object.fromEntries([["robust","#16a34a",!1],["sensitive","#b45309",!0],["near","#a855f7",!0],["new_entry","#0891b2",!1]].map(([l,x,b])=>[l,ui(Vn(E=>{E.beginPath(),E.arc(64,64,54,0,Math.PI*2),E.lineWidth=6,E.strokeStyle=x,b&&E.setLineDash([9,7]),E.stroke()}))])),Gp=Vn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.lineWidth=12,l.strokeStyle="rgba(234,179,8,0.98)",l.stroke()}),Wp=Vn(l=>{l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.fillStyle="rgba(100,116,139,0.96)",l.fill(),l.lineWidth=8,l.strokeStyle="rgba(255,255,255,0.98)",l.stroke()}),Fh={china:Vn(l=>{l.beginPath(),l.arc(64,64,52,0,Math.PI*2),l.lineWidth=8,l.strokeStyle="#dc2626",l.stroke(),l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.lineWidth=4,l.strokeStyle="#dc2626",l.stroke()}),united_states:Vn(l=>{ac(l,12,12,104,104,25),l.lineWidth=10,l.strokeStyle="#2563eb",l.stroke()}),other:Vn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#4b5563",l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()}),unclassified:Vn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#9ca3af",l.setLineDash([10,8]),l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()})};function ui(l,{depthWrite:x=!1}={}){return new Ts({map:l,transparent:!0,depthTest:!0,depthWrite:x,alphaTest:.02,sizeAttenuation:!1})}let cc=ui(Bp,{depthWrite:!0}),uc=ui(zp,{depthWrite:!0}),Uh=ui(oc),Oh=ui(Gp),hc=ui(Vp),Bh=ui(Hp),dc=ui(Wp);dc.depthTest=!1;let fc=Object.fromEntries(Object.entries(Fh).map(([l,x])=>[l,ui(x)]));[cc,uc,Uh,hc,Bh,Oh,dc,...Object.values(fc)].forEach(l=>{l.userData={sharedMaterial:!0}});function ki(l,x,b,E){let U=new Cs(l);return U.position.copy(x),Fr(U,b),U.renderOrder=E,U.userData.sharedMaterial=!0,ue.add(U),U}function Fr(l,x){l.userData.cssPixelSize=x;let b=x*Pn*2*Math.tan(_i.degToRad(N.fov/2))/Math.max(1,d.clientHeight);l.scale.set(b,b,1)}function pc(l){if(!Number.isFinite(Number(l)))return!1;Pn=Math.min(1.5,Math.max(.5,Number(l))),Kt&&(Kt.value=String(Pn)),Bi&&(Bi.textContent=`${Wt(Pn)}\xD7`);for(let x of[ue,ge])x.children.filter(b=>b.isSprite).forEach(b=>Fr(b,b.userData.cssPixelSize));return ds(In,Pn),Ht(),L(),!0}function mc(l){return!Le.has(l)}function gn(l){return l?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant!==!1}function gc(l){return l?.analysis_eligibility?.ineligibility_reason_text||P}function Nt(l){let x=ve[l],b=ze[l];return!x||!b||b.hasNonFiniteContractCoordinate?!1:_c(l).length===0}function _c(l){let x=ve[l];if(!x)return[];let b=[],E=hs(x,I);return E.visible||b.push(E.reason),mc(x.creator)||b.push("\u5382\u5546\u7B5B\u9009"),z&&!gn(x)&&b.push("\u4EC5\u5F53\u671F\u53EF\u6BD4"),!Mt&&x.displayed_only_because_of_recent_release_grace_period===!0&&b.push("\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u5DF2\u5173\u95ED"),ze[l]?.hasNonFiniteContractCoordinate&&b.push("\u5750\u6807\u65E0\u6548"),b}let zh={};function Xp(l,x){let b=zh[l];return b||(b=x.clone(),b.opacity=kp,b.userData={sharedMaterial:!0},zh[l]=b),b}function $p(l,x){let b=document.createElement("canvas");b.width=256,b.height=256;let E=b.getContext("2d"),U=new Is(b);U.colorSpace=$t;let V=ui(U);V.userData={sharedMaterial:!0},ct[l]="loading";let ne=new Image;return ne.onload=()=>{let $=Math.max(1,ne.naturalWidth),le=Math.max(1,ne.naturalHeight),ce=Math.min(224/$,224/le),Ee=$*ce,Ie=le*ce;E.clearRect(0,0,b.width,b.height),E.drawImage(ne,(b.width-Ee)/2,(b.height-Ie)/2,Ee,Ie),U.needsUpdate=!0,ct[l]="loaded",Ht()},ne.onerror=()=>{ct[l]="failed",console.error(`Unable to decode organization brand asset: ${l}`)},ne.src=x.logo_visualization_data_url,V}function qp(){Oa(ue),ze=[],it=[],He=[],ve.forEach((l,x)=>{let b=[l.x,l.y,l.z].filter(Xt=>!ks(Xt)).length;C+=b;let E=b?new B:ps(l.x,l.y,l.z),U=c[l.creator],V=gn(l),ne=ki(V?cc:uc,E,Zn.backplate,30),$=U.country_region_category,le=ki(fc[$]||fc.unclassified,E,Zn.countryRegion,20);le.visible=at;let ce=Ke[l.creator];ce||(ce=$p(l.creator,U),Ke[l.creator]=ce);let Ee=ki(V?ce:Xp(l.creator,ce),E,Zn.logo,40);[ne,Ee].forEach(Xt=>{Xt.userData.modelIndex=x,Xt.userData.interactionTargetKind="displayed_model"}),it.push(Ee),He.push(ne,Ee);let Ie=ki(Uh,E,Zn.paretoRing,45);Ie.visible=l.panel.layer===1;let nt=ki(hc,E,Zn.standoutHalo,15);nt.visible=l.panel.layer===1;let ft=ki(Oh,E,Zn.pinnedRing,50);ft.visible=!1;let Pt=ki(lc.robust,E,60,48);Pt.visible=!1;let Tt=ki(lc.new_entry,E,70,47);Tt.visible=!1,ze.push({sensitivityRingSprite:Pt,newFrontierEntrySprite:Tt,creatorName:l.creator,isAnalysisEligible:V,hasNonFiniteContractCoordinate:b>0,logoSprite:Ee,backplateSprite:ne,countryRegionSprite:le,paretoRingSprite:Ie,standoutHaloSprite:nt,pinnedRingSprite:ft})}),ms(),Xs(),_s()}function ms(){wc(),(he!==null&&!Nt(he)||X&&!Ur(X))&&_n(),ze.forEach((l,x)=>{let b=ve[x],E=Nt(x);l.logoSprite.visible=E,l.backplateSprite.visible=E,l.countryRegionSprite.visible=E&&at,l.paretoRingSprite.visible=E&&b.panel?.layer===1,l.standoutHaloSprite.visible=E&&b.panel?.layer===1,l.pinnedRingSprite.visible=E&&De(b)}),Dm(),od(),Qh(),Wa(),Or(),wi(),Nc(),rd(),yt&&_s(),Ht(),L()}function xc(l){return z=!!l,Q&&(Q.checked=z),ms(),Promise.resolve(z)}function yc(l){return Mt=w>0&&!!l,st&&(st.checked=Mt),ms(),Promise.resolve(Mt)}function vc(l){at=!!l,H&&(H.checked=at);let x=document.getElementById("aa-country-region-legend");return x&&(x.hidden=!at),at&&Qe&&(Qe.open=!0),ms(),Promise.resolve(at)}function bc(){ot&&(ot.visible=!W&&Y==="wireframe"),re&&(re.visible=!W&&Y==="solid"),Fe&&(Fe.visible=W),$e&&($e.visible=W),lt.forEach(l=>{l.disabled=W}),Wa(),Te&&(Te.textContent=W?"\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u672C\u53E3\u5F84\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684 Pareto \u70B9\uFF0C\u8868\u793A\u6700\u9AD8\u53EF\u8FBE\u667A\u80FD\uFF1B\u4E0D\u53EF\u8FBE\u533A\u7559\u767D\u3002":"\u76F8\u90BB Pareto \u70B9\u7684 Delaunay \u63D2\u503C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\uFF1B\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002",jh()),Ht(),L()}function Sc(l){return["wireframe","solid","hidden"].includes(l)?(Y=l,lt.forEach(x=>{x.setAttribute("aria-pressed",x.dataset.frontierStyle===Y?"true":"false")}),bc(),Promise.resolve(!0)):Promise.resolve(!1)}function Mc(l){return l&&xe.achievable_frontier_geometry_kind!=="exact_budget_steps"?Promise.resolve(!1):(W=!!l,Oe&&(Oe.checked=W),bc(),Promise.resolve(W))}function Yp(){m.resetCamera({commit:!1})}function Ur(l){let x=l.creator||l.lineage_family_key?.split("||")[0];if(x&&!mc(x)||z&&!gn(l))return!1;let E=Pe.get(de(l))||{...l,panel:{release_date:l.release_date}};if(!hs(E,I).visible)return!1;if(!l.kept)return!0;let U=ve.findIndex(V=>l.model_uuid?V.model_uuid===l.model_uuid:V.name===l.name);return U>=0&&Nt(U)}function kh(){ze.forEach((l,x)=>{let b=Nt(x)&&(De(ve[x])||he===x);for(let E of[l.logoSprite,l.backplateSprite,l.countryRegionSprite,l.paretoRingSprite,l.pinnedRingSprite,l.standoutHaloSprite,l.sensitivityRingSprite,l.newFrontierEntrySprite])E&&(E.userData.normalMaterial||(E.userData.normalMaterial=E.material,E.userData.normalRenderOrder=E.renderOrder),b&&!E.userData.foregroundMaterial&&(E.userData.foregroundMaterial=E.userData.normalMaterial.clone(),E.userData.foregroundMaterial.depthTest=!1,E.userData.foregroundMaterial.depthWrite=!1),E.material=b?E.userData.foregroundMaterial:E.userData.normalMaterial,hs(ve[x],I).faded&&(E.userData.dateFadedMaterial||(E.userData.dateFadedMaterial=E.material.clone()),E.userData.dateFadedMaterial.copy(E.material),E.userData.dateFadedMaterial.opacity=E.material.opacity*.24,E.userData.dateFadedMaterial.depthWrite=!1,E.material=E.userData.dateFadedMaterial),E.renderOrder=b?91+E.userData.normalRenderOrder/10:E.userData.normalRenderOrder)}),ot&&(ot.material.opacity=he!==null||D!==null?.25:.9)}function Or(){Oa(ge),gt=[],qe=null,ut=null,je=null;let l=new Set(ve.filter(($,le)=>De($)&&Nt(le)).map($=>$.lineage_key).filter(Boolean));pe&&l.add(pe);let x=[],b=new Set;function E($,le,ce="previous_generation"){let Ee=de($);if($.kept||b.has(Ee)||!Ur($))return;b.add(Ee);let Ie=new Cs(dc);Ie.position.copy(za($)),Fr(Ie,Zn.prunedLineageAncestor),Ie.renderOrder=90,Ie.userData={sharedMaterial:!0,interactionTargetKind:"pruned_lineage_ancestor",lineageKey:le,cssPixelSize:Zn.prunedLineageAncestor,prunedLineageAncestorNode:{...$,relationship_kind:ce}},ge.add(Ie),gt.push(Ie)}l.forEach($=>{let le=Se[$]||[];le.forEach(ce=>E(ce,$));for(let ce=1;ce<le.length;ce+=1){let Ee=le[ce-1],Ie=le[ce];!Ur(Ee)||!Ur(Ie)||x.push(za(Ee),za(Ie))}}),x.length&&(qe=ka(x,4674921,3),ge.add(qe));let U=he===null?null:ve[he];if(U?.lineage_family_key&&!Se[U.lineage_key]){let le=Object.entries(Se).flatMap(([ce,Ee])=>Ee.map(Ie=>({key:ce,node:Ie}))).filter(({node:ce})=>ce.lineage_family_key===U.lineage_family_key&&ce.base_model_name===U.base_model_name&&Ur(ce)).sort((ce,Ee)=>Ee.node.reasoning_level_sort_order-ce.node.reasoning_level_sort_order)[0];le&&(je=ka([ps(U.x,U.y,U.z),za(le.node)],4674921,3,!0),ge.add(je),E(le.node,le.key,"same_generation_reasoning_variant"))}let V=new Set(ve.filter(($,le)=>De($)&&Nt(le)).map($=>$.base_model_name));Re&&V.add(Re);let ne=[];V.forEach($=>{let le=se[$]||Xe[$]||[];for(let ce=1;ce<le.length;ce+=1)if(!(!Nt(le[ce-1])||!Nt(le[ce])))for(let Ee of[le[ce-1],le[ce]]){let Ie=ve[Ee];ne.push(ps(Ie.x,Ie.y,Ie.z))}}),ne.length&&(ut=ka(ne,11024042,3.5),ge.add(ut)),kh(),Gr(),Zp(),Ht()}function Zp(){zs.replaceChildren(...gt.flatMap((l,x)=>{let b=Ph(l.userData.prunedLineageAncestorNode);if(!b)return[];let E=Ve("span","aa-lineage-overflow-direction-label",b);return E.dataset.ancestorIndex=String(x),[E]})),Vh()}function Vh(){for(let l of zs.children){let x=gt[Number(l.dataset.ancestorIndex)];if(!x){l.hidden=!0;continue}let b=x.position.clone().project(N);l.hidden=Math.abs(b.z)>1||Math.abs(b.x)>1||Math.abs(b.y)>1,l.style.left=`${Math.max(0,Math.min(d.clientWidth-l.offsetWidth,(b.x+1)*d.clientWidth/2+10))}px`,l.style.top=`${Math.max(0,Math.min(d.clientHeight-l.offsetHeight,(1-b.y)*d.clientHeight/2+10))}px`}}function Hh(){return Ce.speed_axis_field==="intelligence_index_tasks_per_hour"?"\u4EFB\u52A1/\u5C0F\u65F6":"tok/s"}function Ec(){return Ce.cost_axis_unit||a.cost_metric_definitions?.[u.split("__")[0]]?.unit||"USD"}function jp(l){let x=l.panel||{},b=gn(l),E=(V,ne)=>`<section class="aa-tooltip-section"><b>${V}</b><br>${ne.join("<br>")}</section>`,U=[["cost_to_run","\u6709\u6548\u8FD0\u884C\u6210\u672C","USD"],["blended_price_cache_input_output_7_to_2_to_1","7:2:1 \u6DF7\u5408\u5355\u4EF7","USD/M tokens"],["eff_speed","\u6709\u6548\u901F\u5EA6","tok/s"],["output_speed","\u539F\u59CB\u901F\u5EA6","tok/s"]].filter(([V])=>![Ce.cost_axis_field,Ce.speed_axis_field].includes(V));return E("\u6A21\u578B\u8EAB\u4EFD",[`<strong>${Qt(l.name)}</strong>`,`${Qt(l.creator)} \xB7 ${Qt(l.reasoning_level_label||l.tier||"\u6863\u4F4D\u672A\u8BB0\u5F55")}`,`\u53D1\u5E03\uFF1A${Qt(x.release_date&&x.release_date!=="?"?x.release_date:"\u672A\u77E5\u53D1\u5E03\u65E5\u671F")}`])+E("\u5750\u6807\u4E0E\u5907\u7528\u53E3\u5F84",[`\u667A\u80FD\u6307\u6570\uFF1A${Wt(x.intelligence)}\uFF08${Ah(l.intelligence_measurement_status)}\uFF09`,`\u667A\u80FD\u5206\u6765\u6E90\uFF1A${Qt(l.intelligence_measurement_evidence?.source?`\u5DF2\u63A5\u53D7\u7684 AA \u76EE\u5F55\uFF08v${l.intelligence_measurement_evidence.catalog_intelligence_index_version||"\u672A\u77E5"}\uFF1B${l.intelligence_measurement_evidence.catalog_captured_at_utc||"\u6293\u53D6\u65F6\u95F4\u672A\u77E5"}\uFF09`:"\u672A\u77E5\uFF1B\u539F\u59CB\u76EE\u5F55\u6807\u8BB0\u4E0D\u4F5C\u4E3A\u5B9E\u6D4B\u8BC1\u660E")}`,`\u4EFB\u52A1\u901F\u5EA6\uFF1A${Wt(x.intelligence_index_tasks_per_hour)} \u4EFB\u52A1/\u5C0F\u65F6\uFF1B\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6 ${Wt(x.artificial_analysis_intelligence_index_time_per_task_seconds)} \u79D2`,...l.intelligence_index_task_time_evidence?.unavailability_reason?[Qt(l.intelligence_index_task_time_evidence.unavailability_reason)]:[],`API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u72EC\u7ACB\u5B57\u6BB5\uFF09\uFF1A${Wt(x.median_end_to_end_response_time_seconds)} \u79D2`,`${Qt(Ce.speed_axis_label)}\uFF1A${Wt(x[Ce.speed_axis_field])} ${Hh()}`,`${Qt(Ce.cost_axis_label)}\uFF1A${Wt(x[Ce.cost_axis_field])} ${Qt(Ec())}`,...U.map(([V,ne,$])=>`${ne}\uFF1A${Wt(x[V])} ${$}`),`\u5197\u957F\u5EA6\uFF1A${Wt(x.output_mtokens)} M tokens`])+E("\u654F\u611F\u6027\u5047\u8BBE\u4E0E\u5237\u65B0",[I.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`${nc(fd(l),x.layer===1)}\uFF1A\u667A\u80FD \xB1${I.sensitivity_intelligence_half_width}\uFF1B\u6210\u672C\u3001\u901F\u5EA6\u5404 \xB110%\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE`,pd().has(de(l))?"\u672C\u671F\u65B0\u5165\u524D\u6CBF\uFF08\u5339\u914D\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\uFF09":"\u524D\u6CBF\u8FDB\u51FA\u4EC5\u5728\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u53EF\u6BD4\u8F83\u65F6\u6807\u8BB0"])+E("\u524D\u6CBF\u4E0E\u7A81\u51FA\u5EA6",[b?`\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A${Wt(x.layer)}`:"\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A\u4E0D\u53C2\u4E0E\uFF08\u5386\u53F2\u53E3\u5F84\uFF09",`${Qt(Yn[oe].label)}\uFF1A${Tc(Yh(l))}`,`\u7A81\u51FA\u5EA6\u540D\u6B21\uFF1A${St[l.name]?`${St[l.name]} / ${Ei().length}`:"\u672A\u53C2\u4E0E\u524D\u6CBF\u6392\u884C"}`,...b?[]:[Qt(gc(l))]])}function Jp(l){let x=Ph(l);return[`<strong>${Qt(l.name)}</strong>`,l.relationship_kind==="same_generation_reasoning_variant"?"\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A":"\u8C31\u7CFB\u524D\u8EAB \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A",`\u53D1\u5E03\uFF1A${Qt(l.release_date)}`,`\u667A\u80FD\u6307\u6570\uFF1A${Wt(l.intelligence)}`,`${Qt(Ce.speed_axis_label)}\uFF1A${Wt(l.y)} ${Hh()}`,`${Qt(Ce.cost_axis_label)}\uFF1A${Wt(l.x)} ${Qt(Ec())}`,...x?[`\u7BB1\u58C1\u5939\u7D27\uFF1A${Qt(x)}\uFF1B\u4EE5\u4E0A\u6570\u503C\u4FDD\u7559\u539F\u503C\u3002`]:[]].join("<br>")}function Qt(l){let x=document.createElement("span");return x.textContent=String(l),x.innerHTML}function Xv(l,x=1){return l==null||!Number.isFinite(Number(l))?"?":Number(l).toFixed(x)}function Gh(){fn&&(he===null?mn.remove():(mn.textContent=ae(fn.base_model_name)?"\u53D6\u6D88\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D":"\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D",mn.parentElement||cn.prepend(mn)),cn.parentElement||Ze.append(cn))}function Br(l=!0){if(Ze.hidden)return;let x=he===null?null:ve[he],b=x?null:X;if(!x&&!b)return;let E=l?Ze.scrollTop:0;pn.innerHTML=x?jp(x):Jp(b),fn&&(fn=x||b,Gh()),Ze.scrollTop=E,fs&&gs(fs)}function zr(l,x){if(l===he&&D===null){x&&!Ze.hidden&&gs(x);return}if(he=l,D=null,X=null,l===null){pe=null,Re=null,Ze.hidden=!0,Or();return}let b=ve[l];pe=b.lineage_key,Re=b.base_model_name,Ze.hidden=!1,Br(!1),gs(x||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),Or()}function Kp(l,x,b){if(D===x.name&&pe===l){b&&!Ze.hidden&&gs(b);return}he=null,D=x.name,X=x,pe=l,Re=null,Ze.hidden=!1,Br(!1),gs(b||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),Or()}function gs(l){fs={clientX:l.clientX,clientY:l.clientY};let x=f.getBoundingClientRect();Ze.style.maxHeight=`${Math.max(0,x.height-16)}px`;let b=Ze.getBoundingClientRect(),E=Math.min(l.clientX-x.left+14,x.width-b.width-8),U=Math.min(l.clientY-x.top+14,x.height-b.height-8);Ze.style.left=`${Math.max(8,E)}px`,Ze.style.top=`${Math.max(8,U)}px`}function Qp(l,x){if(!l){_n();return}fn=l.interactionTargetKind==="displayed_model"?ve[l.modelIndex]:l.prunedLineageAncestorNode,Ze.classList.add("is-touch-details"),Ze.setAttribute("role","dialog"),Ze.setAttribute("aria-label","\u6A21\u578B\u8BE6\u60C5"),$h(l,x,!1),Br(),gs(x)}function Wh(){return[...He,...gt].filter(l=>l.visible)}function Vs(l,x){let b=F.domElement.getBoundingClientRect();ee.x=(l-b.left)/b.width*2-1,ee.y=-((x-b.top)/b.height)*2+1,q.setFromCamera(ee,N);let E=q.intersectObjects(Wh(),!1),U=E.filter(V=>!V.object.material.depthTest);return U.sort((V,ne)=>ne.object.renderOrder-V.object.renderOrder||V.distance-ne.distance),(U[0]||E[0])?.object.userData||null}function Xh(l){return Vs(l.clientX,l.clientY)}let em=400,tm=25,hi=null,Hs=null,kr=!1,Mi=null,Hn=null,Gs=null,Ws=!1;function wc(){Gs!==null&&window.clearTimeout(Gs),Gs=null}function _n(){fn=null,cn.remove(),Ze.classList.remove("is-touch-details"),Ze.removeAttribute("role"),Ze.removeAttribute("aria-label"),wc(),Hn!==null&&window.cancelAnimationFrame(Hn),Hn=null,zr(null)}function $h(l,x,b=!0){if(!l){if(b&&(he!==null||D!==null)){Gs===null&&(Gs=window.setTimeout(()=>{Gs=null,zr(null)},em));return}_n();return}wc(),l.interactionTargetKind==="displayed_model"?zr(l.modelIndex,x):Kp(l.lineageKey,l.prunedLineageAncestorNode,x)}function Ac(l=!1){if(fn||Ws||!Mi||F.getContext().isContextLost())return;let{clientX:x,clientY:b}=Mi,E=F.domElement.getBoundingClientRect();x<E.left||x>E.right||b<E.top||b>E.bottom||$h(Vs(x,b),Mi,l)}K.addEventListener("start",()=>{Ws=!0,hi||_n()}),K.addEventListener("end",()=>{Ws=!1,Hn!==null&&window.cancelAnimationFrame(Hn),Hn=window.requestAnimationFrame(()=>{Hn=null,Ac()})}),K.addEventListener("change",()=>{_n(),Ws||(Hn=window.requestAnimationFrame(()=>{Hn=null,Ac()}))}),F.domElement.addEventListener("pointerdown",l=>{if(l.button!==0)return;Dr=l.pointerType;let x=Xh(l);hi={pointerId:l.pointerId,pointerType:l.pointerType,clientX:l.clientX,clientY:l.clientY,interactionTargetForDetails:x,displayedModelForClickPinToggle:x?.interactionTargetKind==="displayed_model"?ve[x.modelIndex]:null},Hs=null,Mi={clientX:l.clientX,clientY:l.clientY},kr=!1},{capture:!0}),F.domElement.addEventListener("pointermove",l=>{hi?.pointerId===l.pointerId&&(l.clientX-hi.clientX)**2+(l.clientY-hi.clientY)**2>=tm&&(kr=!0,_n()),l.pointerType!=="touch"&&(Mi={clientX:l.clientX,clientY:l.clientY},!(Ws||Hn!==null)&&(Hn=window.requestAnimationFrame(()=>{Hn=null,Ac(!0)})))});function nm(l){hi?.pointerId===l.pointerId&&(Hs=hi,hi=null,l.pointerType==="touch"&&!kr&&(Mi=null,Qp(Hs.interactionTargetForDetails,l)))}F.domElement.addEventListener("pointerup",nm),F.domElement.addEventListener("pointercancel",l=>{hi?.pointerId===l.pointerId&&(hi=null),Hs=null,Mi=null,_n()}),F.domElement.addEventListener("pointerleave",l=>{fn||(Mi=null,_n())}),F.domElement.addEventListener("click",l=>{let x=Hs;if(Hs=null,Dr==="touch"||x?.pointerType==="touch"||l.pointerType==="touch")return;if(kr){kr=!1;return}let b=x?null:Xh(l),E=x?x.displayedModelForClickPinToggle:b?.interactionTargetKind==="displayed_model"?ve[b.modelIndex]:null;E&&Va(E.base_model_name)});function Xs(){ze.forEach((l,x)=>{let b=ve[x];l.pinnedRingSprite.visible=Nt(x)&&De(b)}),Or(),Nc(),nd(),Gh(),Ht(),L()}function Va(l){return Ae(l,!ae(l))}function qh(l,x=!0){x?ye.add(de(l)):ye.delete(de(l)),O(),Xs(),wi()}function im(l){let x=Yn[oe]?.modelMetricFieldName,b=l?.standout_metrics?.[x];return typeof b=="number"&&Number.isFinite(b)?b:NaN}function Yh(l){return!l||!gn(l)?NaN:Object.prototype.hasOwnProperty.call(Ge,l.name)?Ge[l.name]:im(l)}function Tc(l){return oe===cs.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Number.isFinite(l)&&wt>0?`${Wt(l/wt*100)}%`:"\u672A\u8BB0\u5F55":Wt(l)}function Ei(){return ve.filter(l=>l.panel?.layer===1&&[l.x,l.y,l.z].every(ks))}function _s(){let l=Ei(),x=oe===cs.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Na(l,Ue):null;wt=x?.completeFrontierHypervolume??null;let b=x?.contributions||fp(l,oe,Ue),E=b.filter(Number.isFinite);Ge={},l.forEach((U,V)=>{let ne=b[V];Ge[U.name]=ne;let $=ze[me[U.name]];if(!$)return;let le=Number.isFinite(ne),ce=le&&E.length>1?(E.filter(ft=>ft<ne).length+(E.filter(ft=>ft===ne).length-1)/2)/(E.length-1):.5,Ee=$.standoutHaloSprite,Ie=le?hc:Bh;Ee.userData.foregroundMaterial?.dispose(),Ee.userData.foregroundMaterial=null,Ee.userData.normalMaterial=Ie,Ee.userData.normalRenderOrder=15,Ee.material=Ie;let nt=Zn;Fr(Ee,le?nt.standoutHaloMinimum+ce*(nt.standoutHaloMaximum-nt.standoutHaloMinimum):nt.missingStandoutHalo)}),St={},l.map((U,V)=>({model:U,value:b[V]})).filter(U=>Number.isFinite(U.value)).sort((U,V)=>V.value-U.value).forEach((U,V)=>{St[U.model.name]=V+1}),Br(),kh(),sm(l,b),Ga(),Ht(),L()}function sm(l,x){if(!yt)return;let b=l.map((E,U)=>({model:E,value:x[U]})).sort((E,U)=>{let V=Number.isFinite(E.value)?E.value:-1/0;return(Number.isFinite(U.value)?U.value:-1/0)-V}).slice(0,12);yt.replaceChildren(...b.map((E,U)=>{let V=document.createElement("button");V.type="button",V.className="aa-ranking-row",V.addEventListener("click",()=>qh(E.model)),V.setAttribute("aria-label",`\u56FA\u5B9A ${E.model.name}`);let ne=me[E.model.name];Nt(ne)||(V.classList.add("is-hidden-by-current-filter"),V.title="\u5DF2\u88AB\u5F53\u524D\u7B5B\u9009\u9690\u85CF\uFF0C\u540D\u6B21\u4ECD\u6309\u5168\u96C6\u8BA1\u7B97");let $=document.createElement("span");$.className="aa-truncate",$.textContent=`${U+1}. ${E.model.name}`;let le=document.createElement("b");return le.className="aa-ranking-value",le.textContent=Tc(E.value),le.title=wt===null?`\u539F\u59CB\u503C\uFF1A${E.value}`:`\u6392\u4ED6\u8D21\u732E ${E.value} \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF ${wt}`,V.append($,le),V}))}function Cc(l){return Yn[l]?(oe=l,vt&&(vt.value=l),Fc(),_s(),window.dispatchEvent(new Event("frontier-3d-view-updated")),Promise.resolve(!0)):Promise.resolve(!1)}function Rc(l,x,b){Ue={intelligence:Fa(l,Ue.intelligence),cost:Fa(x,Ue.cost),speed:Fa(b,Ue.speed)},zt&&Object.entries(Ue).forEach(([E,U])=>{let V=zt[E];V.slider.value=String(Math.log2(U)),V.number.value=U.toFixed(2)}),_s(),window.dispatchEvent(new Event("frontier-3d-view-updated"))}function Ic(l,x){let b=o[l];if(!b)return!1;Mi=null,_n();let E=N.position.clone(),U=N.quaternion.clone(),V=K.target.clone();return u=l,fe=b,xe=fe.three_dimensional_scene,Ce=fe.interaction_relationships,C=0,_=0,G=[],ve=xe.displayed_model_markers||[],Xe=Ce.base_groups||{},se=Ce.reasoning_variant_group_model_indices_by_base_model_name||{},Se=rm(Ce.lineages||{}),me={},ve.forEach((ne,$)=>{me[ne.name]=$}),window.FRONTIER_3D_INTERACTION_RELATIONSHIPS={models:ve,base_groups:Xe,reasoning_variant_group_model_indices_by_base_model_name:se,lineages:Se,cost_axis_field:Ce.cost_axis_field,speed_axis_field:Ce.speed_axis_field},ve.forEach(ne=>Pe.set(de(ne),ne)),O(),Up(),Op(),qp(),Gr(),zr(null),x?(N.position.copy(E),N.quaternion.copy(U),K.target.copy(V),K.update()):Yp(),rd(),od(),Wa(),Kh(),Nc(),wi(),_s(),Ht(),window.dispatchEvent(new Event("frontier-3d-view-updated")),!0}function rm(l){let x={};return Object.entries(l).forEach(([b,E])=>{let U=(Array.isArray(E)?E:[]).filter(V=>{if(!V?.lineage_family_key||!V?.reasoning_level_label)return!1;let ne=[V?.x,V?.y,V?.z].filter($=>!ks($)).length;return C+=ne,ne===0});U.length>=2&&(x[b]=U)}),x}function Vr(l,x){let b=`${l}__${x}`;if(b===u)return Promise.resolve(!1);let E=Ic(b,!0);return E&&(jn.value=l,S.value=x,L()),Promise.resolve(E)}function Ha(l){let x=document.createElement("div");x.className="aa-toolbar-group";let b=document.createElement("span");return b.className="aa-toolbar-group-label",b.textContent=l,x.appendChild(b),x}function Zh(l,x){let b=document.createElement("label");b.className="aa-toolbar-field";let E=document.createElement("span");return E.className="aa-toolbar-field-label",E.textContent=l,b.append(E,x),b}function am(){let l=Ha("\u5750\u6807\u8F74\u53E3\u5F84");l.id="aa-metric-controls",jn=document.createElement("select"),jn.id="aa-cost-metric-select",Object.entries(a.cost_metric_definitions).forEach(([V,ne])=>{let $=document.createElement("option");$.value=V,$.textContent=ne.label,jn.appendChild($)}),S=document.createElement("select"),S.id="aa-speed-metric-select",Object.entries(a.speed_metric_definitions).forEach(([V,ne])=>{let $=document.createElement("option");$.value=V,$.textContent=ne.label,S.appendChild($)});let[x,b]=u.split("__");jn.value=x,S.value=b,jn.addEventListener("change",()=>Vr(jn.value,S.value)),S.addEventListener("change",()=>Vr(jn.value,S.value)),l.append(Zh("\u6210\u672C",jn),Zh("\u901F\u5EA6",S));let E=Ve("button","aa-secondary-button","\u53E3\u5F84\u8BF4\u660E");E.id="aa-metric-explanation-button",E.type="button",E.addEventListener("click",()=>$s(!0));let U=Ve("button","aa-secondary-button","\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2");return U.id="aa-orthogonal-decomposition-preset",U.type="button",U.title="\u5207\u6362\u81F3 7:2:1 \u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u4FDD\u6301\u76F8\u673A",U.addEventListener("click",()=>Vr("blended","raw")),l.append(E,U),l}function om(){let l=Ha("\u6A21\u578B\u6807\u8BC6");l.id="aa-model-identity-controls";let x=document.createElement("span");x.className="aa-model-identity-logo-status",x.textContent="\u5382\u5546 Logo";let b=document.createElement("label");b.className="aa-toggle-row",H=document.createElement("input"),H.id="aa-country-region-marker-toggle",H.type="checkbox",H.checked=at,H.addEventListener("change",()=>vc(H.checked)),b.append(H,document.createTextNode("\u663E\u793A\u56FD\u522B\u5916\u6846"));let E=document.createElement("label");E.className="aa-toggle-row",E.title="\u9690\u85CF\u672C\u53E3\u5F84\u4E0B\u7528\u5230\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u6210\u672C\u6216\u5197\u957F\u5EA6\u7684\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF08\u865A\u7EBF\u5E95\u677F\uFF09\uFF1B\u9690\u85CF\u540E\u5B83\u4EEC\u4E5F\u4E0D\u53EF\u60AC\u505C\u6216\u70B9\u9009",Q=document.createElement("input"),Q.id="aa-show-only-current-intelligence-index-version-comparable-models-toggle",Q.type="checkbox",Q.checked=z,Q.addEventListener("change",()=>xc(Q.checked)),E.append(Q,document.createTextNode("\u4EC5\u5F53\u671F\u53EF\u6BD4"));let U=document.createElement("label");U.className="aa-toggle-row",U.title="\u4EC5\u63A7\u5236\u53EA\u56E0\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u624D\u4FDD\u7559\u7684\u70B9\uFF1B\u4E0D\u91CD\u7B97\u5206\u6790\u3001\u5750\u6807\u8303\u56F4\u6216\u76F8\u673A",st=document.createElement("input"),st.id="aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle",st.type="checkbox",st.checked=Mt,st.disabled=!(w>0),st.addEventListener("change",()=>yc(st.checked));let V=w===null?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":w===0?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u751F\u6210\u65F6\u5DF2\u5173\u95ED":`\u663E\u793A\u8FD1 ${w} \u4E2A\u6708\u53D1\u5E03\u7684\u8FDC\u79BB\u524D\u6CBF\u6A21\u578B`;U.append(st,document.createTextNode(V)),l.append(x,b,E,U);let ne=Ve("label","aa-marker-size-control","\u6807\u8BB0\u5C3A\u5BF8 ");return Kt=document.createElement("input"),Kt.id="aa-marker-size-slider",Kt.type="range",Kt.min="0.5",Kt.max="1.5",Kt.step="0.05",Kt.value=String(Pn),Kt.setAttribute("aria-label","\u6807\u8BB0\u5C3A\u5BF8\u500D\u6570\uFF0C1 \u500D\u5BF9\u5E94 Logo 22 \u50CF\u7D20"),Bi=Ve("output","",`${Wt(Pn)}\xD7`),Bi.htmlFor=Kt.id,Kt.addEventListener("input",()=>pc(Number(Kt.value))),ne.append(Kt,Bi),l.append(ne),l}function jh(){let l=W?"\u7CBE\u786E\u53EF\u8FBE\u9762":"\u975E\u5E15\u7D2F\u6258\u9762",x=Te.hidden?"\u5C55\u5F00":"\u6536\u8D77";ke.textContent=l,ke.setAttribute("aria-label",`${x}\u51E0\u4F55\u8BF4\u660E\uFF1A${l}`),ke.title=`${x}\u51E0\u4F55\u8BF4\u660E\uFF1B\u5C55\u5F00\u540E\u4E00\u5206\u949F\u81EA\u52A8\u6536\u8D77`}function Pc(l){window.clearTimeout(Ye),Te.hidden=!l,ke.setAttribute("aria-expanded",String(l)),jh(),l&&(Ye=window.setTimeout(()=>Pc(!1),6e4))}function lm(){let l=Ha("\u524D\u6CBF\u63CF\u7ED8");l.classList.add("aa-frontier-geometry-controls");let x=document.createElement("div");x.className="aa-segmented-control",lt=[["wireframe","\u53C2\u7167\u7EBF\u6846"],["solid","\u53C2\u7167\u5B9E\u5FC3"],["hidden","\u9690\u85CF\u53C2\u7167"]].map(([U,V])=>{let ne=document.createElement("button");return ne.type="button",ne.textContent=V,ne.dataset.frontierStyle=U,ne.setAttribute("aria-pressed",U===Y?"true":"false"),ne.addEventListener("click",()=>Sc(U)),x.appendChild(ne),ne});let b=document.createElement("label");b.className="aa-toggle-row",Oe=document.createElement("input"),Oe.id="aa-achievable-surface-toggle",Oe.type="checkbox",Oe.setAttribute("aria-describedby","aa-frontier-geometry-explanation"),Oe.addEventListener("change",()=>Mc(Oe.checked)),b.append(Oe,document.createTextNode("\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09")),Te=Ve("p","aa-frontier-geometry-explanation"),Te.id="aa-frontier-geometry-explanation",Te.setAttribute("role","status"),ke=document.createElement("button"),ke.id="aa-frontier-geometry-explanation-toggle",ke.className="aa-frontier-geometry-explanation-toggle",ke.type="button",ke.setAttribute("aria-controls",Te.id),ke.addEventListener("click",()=>Pc(Te.hidden));let E=document.createElement("div");return E.className="aa-frontier-geometry-toggle-and-explanation",E.append(b,ke,Te),l.append(x,E),Pc(!0),l}function cm(){let l=Ha("\u7A81\u51FA\u5EA6\u53E3\u5F84");return vt=document.createElement("select"),vt.id="aa-standout-metric-select",vt.setAttribute("aria-label","\u7A81\u51FA\u5EA6\u6307\u6807"),Object.entries(Yn).forEach(([x,b])=>{let E=document.createElement("option");E.value=x,E.textContent=b.label,vt.appendChild(E)}),vt.value=oe,vt.addEventListener("change",()=>Cc(vt.value)),l.appendChild(vt),l}function Lc(l,x){let b=document.createElement("section");if(b.className="aa-control-section",b.id=l,x){let E=document.createElement("h2");E.className="aa-section-title",E.textContent=x,b.appendChild(E)}return b}function um(){let l=Lc("aa-search-panel","\u641C\u7D22\u4E0E\u56FA\u5B9A");return et=document.createElement("input"),et.id="aa-search-input",et.className="aa-search-input",et.type="search",et.placeholder="\u641C\u7D22\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D",et.setAttribute("aria-label","\u641C\u7D22\u6A21\u578B\u3001\u57FA\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D"),et.setAttribute("role","combobox"),et.setAttribute("aria-expanded","false"),et.setAttribute("aria-controls","aa-search-results"),et.setAttribute("aria-autocomplete","list"),xt=Ve("div","aa-search-results"),xt.id="aa-search-results",xt.setAttribute("role","region"),xt.setAttribute("aria-label","\u6A21\u578B\u641C\u7D22\u7ED3\u679C"),et.addEventListener("input",()=>{wn=-1,wi()}),et.addEventListener("focus",wi),l.addEventListener("keydown",x=>{let b=[...xt.querySelectorAll("button")];x.key==="Escape"?(x.preventDefault(),et.value="",wi(),et.focus()):["ArrowDown","ArrowUp"].includes(x.key)&&b.length?(x.preventDefault(),wn=wn<0?x.key==="ArrowDown"?0:b.length-1:(wn+(x.key==="ArrowDown"?1:b.length-1))%b.length,b.forEach((E,U)=>E.classList.toggle("is-keyboard-active",U===wn)),et.setAttribute("aria-activedescendant",b[wn].id),b[wn].scrollIntoView({block:"nearest"})):x.key==="Enter"&&x.target===et&&b.length&&(x.preventDefault(),b[Math.max(0,wn)]?.click())}),l.append(et,xt),l}function Jh(l){let x=[...ve.map((E,U)=>({...E,displayedModelIndex:U})),...(fe?.excluded_models_with_drop_reason||[]).map(E=>{let U=E.model_uuid?Pe.get(E.model_uuid):[...Pe.values()].find(V=>V.name===E.name);return{...U,...E,base_model_name:E.base_model_name||U?.base_model_name||E.name}})],b=new Set(x.map(de));for(let E of fe?.model_analysis_records||[])b.has(de(E))||x.push({...E,base_model_name:E.base_model_name||E.name});return Mp(x,l)}function hm(l){return Jh(l).groups.map(x=>x.baseModelName)}function wi(){if(!xt||!et)return;let{groups:l,totalGroupCount:x}=Jh(et.value),b=!!et.value.trim(),E=Ve("div","aa-search-result-summary",`\u627E\u5230 ${x} \u7EC4${x>40?"\uFF0C\u4EC5\u663E\u793A\u524D 40 \u7EC4":""}`);E.setAttribute("role","status"),xt.replaceChildren(E,...l.map(({baseModelName:U,models:V},ne)=>{let $=V.filter(Ie=>Ie.displayedModelIndex!==void 0&&!ze[Ie.displayedModelIndex]?.hasNonFiniteContractCoordinate),le=document.createElement($.length?"button":"div");le.className="aa-result-row",le.dataset.baseModelName=U,$.length&&(le.type="button",le.classList.add("aa-search-result-pin-button"),le.id=`aa-search-result-action-${ne}`,le.addEventListener("click",()=>Va(U))),we.has(U)&&le.classList.add("is-pinned");let ce=Ve("span","aa-search-result-name",U),Ee=V.slice().sort(vh).map(Ie=>{let nt=Ie.reasoning_level_label||Ie.name;if(Ie.displayedModelIndex===void 0)return`${nt}\uFF1A\u672A\u4E0A\u56FE\uFF0C${Ie.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807"}${Ie.missing_dimension_names?.length?`\uFF08\u7F3A\u5C11 ${Ie.missing_dimension_names.join("\u3001")}\uFF09`:""}`;let ft=_c(Ie.displayedModelIndex);return ft.length&&le.classList.add("is-hidden-by-model-visibility-filter"),ft.includes("\u4EC5\u5F53\u671F\u53EF\u6BD4")&&le.classList.add("is-hidden-by-comparable-only-toggle"),`${nt}\uFF1A${ft.length?`\u7B5B\u9009\u9690\u85CF\uFF08${ft.join("\u3001")}\uFF09`:"\u5DF2\u4E0A\u56FE"}${gn(Ie)?"":`\uFF1B${gc(Ie)}`}`});return V.filter(Ie=>Ie.displayedModelIndex!==void 0).every(Ie=>!Nt(Ie.displayedModelIndex))&&le.classList.add("is-hidden-by-current-filter"),le.title=Ee.join("\uFF1B"),ce.append(Ve("span","aa-search-result-hidden-note",Ee.join("\uFF1B"))),le.append(ce),$.length&&le.append(Ve("span","aa-search-result-action-label",ae(U)?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A")),le})),xt.hidden=!b,xt.style.display=b?"block":"none",et.setAttribute("aria-expanded",String(b)),et.removeAttribute("aria-activedescendant")}function dm(){let l=document.createElement("div");return l.id="aa-country-region-legend",l.className="aa-country-region-legend",l.hidden=!at,[["china","\u4E2D\u56FD","\u53CC\u5706\u73AF"],["united-states","\u7F8E\u56FD","\u5706\u89D2\u65B9\u73AF"],["other","\u5176\u4ED6 / \u672A\u5206\u7C7B","\u83F1\u5F62\u73AF"]].forEach(([x,b,E])=>{let U=document.createElement("span");U.className="aa-country-region-legend-item",U.dataset.countryRegionCategory=x==="united-states"?"united_states":x,U.dataset.visibleCountryRegionModelCount="0";let V=document.createElement("span");V.className=`aa-country-region-swatch is-${x}`,V.setAttribute("aria-hidden","true"),U.append(V,document.createTextNode(`${b}\uFF08${E}\uFF09`)),U.append(Ve("span","aa-country-region-visible-model-count"," \xB7 0")),l.appendChild(U)}),l}function fm(){return Qe=document.createElement("details"),Qe.id="aa-organization-filter-panel",Qe.className="aa-control-section aa-collapsible-section",Qe.open=!1,Qe}function Kh(){if(!Qe)return;let l=Qe.open,x={};ve.forEach(V=>{x[V.creator]=(x[V.creator]||0)+1});let b=document.createElement("summary");b.className="aa-section-title aa-collapsible-summary",b.id="aa-organization-filter-count-summary",b.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}\uFF09`;let E=Object.keys(x).sort((V,ne)=>V.localeCompare(ne)).map(V=>{let ne=c[V],$=document.createElement("label");$.className="aa-organization-filter-row",$.dataset.creatorName=V;let le=document.createElement("input");le.type="checkbox",le.checked=!Le.has(V),le.addEventListener("change",()=>{le.checked?Le.delete(V):Le.add(V),ms()});let ce=document.createElement("img");ce.className="aa-organization-logo-preview",ce.src=ne.logo_visualization_data_url,ce.alt="";let Ee=document.createElement("span");Ee.className="aa-truncate",Ee.textContent=V;let Ie=document.createElement("span");return Ie.className="aa-muted",Ie.dataset.visibleOrganizationModelCount="0",Ie.textContent=String(x[V]),$.append(le,ce,Ee,Ie),$}),U=document.createElement("div");U.className="aa-organization-filter-rows",U.append(...E),Qe.replaceChildren(b,dm(),U),Qe.open=l,Qh()}function Qh(){if(!Qe)return;let l={},x={},b={};ve.forEach((U,V)=>{if(l[U.creator]=(l[U.creator]||0)+1,!Nt(V))return;x[U.creator]=(x[U.creator]||0)+1;let ne=["china","united_states"].includes(U.country_region_category)?U.country_region_category:"other";b[ne]=(b[ne]||0)+1}),Qe.querySelectorAll(".aa-organization-filter-row").forEach(U=>{let V=x[U.dataset.creatorName]||0,ne=l[U.dataset.creatorName]||0,$=U.querySelector("[data-visible-organization-model-count]");$.dataset.visibleOrganizationModelCount=String(V),$.textContent=V===ne?String(ne):`${V}/${ne}`}),Qe.querySelectorAll("[data-country-region-category]").forEach(U=>{let V=b[U.dataset.countryRegionCategory]||0;U.dataset.visibleCountryRegionModelCount=String(V),U.querySelector(".aa-country-region-visible-model-count").textContent=` \xB7 ${V}`});let E=Qe.querySelector("#aa-organization-filter-count-summary");E&&(E.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}/${Object.keys(l).length}\uFF09`)}function pm(){return We=Lc("aa-pinned-panel","\u5DF2\u56FA\u5B9A"),We}function Dc(){return[...we].flatMap(l=>[...ye].map(x=>Pe.get(x)).filter(x=>x?.base_model_name===l).sort(vh))}function ed(l){return ve.find(x=>de(x)===de(l))}function td(l){let x=ve.findIndex(b=>de(b)===de(l));return x<0?`\u5F53\u524D\u53E3\u5F84\u672A\u4E0A\u56FE\uFF1A${(fe.excluded_models_with_drop_reason||[]).find(E=>E.model_uuid?E.model_uuid===l.model_uuid:E.name===l.name)?.drop_reason||l.historical_frame_absence_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807\u6216\u5DF2\u88AB\u526A\u679D"}`:[..._c(x),...gn(ve[x])?[]:[gc(ve[x])]].join("\uFF1B")||"\u5F53\u671F\u53EF\u6BD4"}function Nc(){if(!We)return;let l=[...we];We.style.display=l.length?"block":"none";let x=Ve("div","aa-pinned-header"),b=Ve("h2","aa-section-title",`\u5DF2\u56FA\u5B9A\uFF08${ye.size} \u6863\u4F4D\uFF09`),E=Ve("button","aa-link-button","\u6E05\u7A7A\u5168\u90E8");E.id="aa-clear-all-pinned-models",E.type="button",E.addEventListener("click",()=>{ye.clear(),O(),Xs(),wi()}),x.append(b,E);let U=Ve("div","aa-pinned-list");l.forEach(V=>{let ne=Ve("article","aa-pinned-card"),$=Ve("div","aa-pinned-card-header"),le=Ve("button","aa-link-button","\u79FB\u9664");le.type="button",le.setAttribute("aria-label",`\u79FB\u9664 ${V} \u7684\u5168\u90E8\u56FA\u5B9A\u6863\u4F4D`),le.addEventListener("click",()=>Ae(V,!1)),$.append(Ve("b","aa-truncate",V),le),ne.append($);for(let ce of Dc().filter(Ee=>Ee.base_model_name===V)){let Ee=ed(ce),Ie=Ve("div","aa-pinned-variant-card",`${ce.name} \xB7 \u667A\u80FD ${Wt(Ee?.panel.intelligence??ce.panel.intelligence)} \xB7 ${ce.reasoning_level_label||"\u6863\u4F4D\u672A\u8BB0\u5F55"}`);Ie.dataset.modelIdentity=de(ce);let nt=td(ce);Ie.append(Ve("div","aa-pinned-model-status",nt)),Ee||Ie.classList.add("is-hidden-by-current-filter"),Ee&&!gn(Ee)&&Ie.classList.add("is-historical-intelligence-index-version"),ce.model_uuid||Ie.append(Ve("div","aa-muted","\u65E7\u5951\u7EA6\u7F3A\u5C11 UUID\uFF0C\u91CD\u65B0\u751F\u6210\u540E\u53EF\u6309\u7A33\u5B9A\u8EAB\u4EFD\u56FA\u5B9A")),ne.append(Ie)}U.append(ne)}),We.replaceChildren(x,U),Ga(),nd()}function mm(){Vt=document.createElement("details"),Vt.id="aa-pinned-comparison-panel";let l=Ve("summary","aa-section-title","\u5C55\u5F00\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4"),x=Ve("fieldset","aa-comparison-field-controls");x.append(Ve("legend","","\u53EF\u9009\u5B57\u6BB5\uFF08\u81EA\u52A8\u4FDD\u5B58\uFF09"));let b={output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"};for(let E of Lr){let U=Ve("label","aa-checkbox-chip"),V=document.createElement("input");V.type="checkbox",V.checked=En.has(E),V.dataset.comparisonField=E,V.addEventListener("change",()=>{V.checked?En.add(E):En.delete(E),ds(Ir,[...En]),Ga(),L()}),U.append(V,document.createTextNode(b[E])),x.append(U)}kn=Ve("div","aa-comparison-table-scroll-region"),kn.tabIndex=0,kn.setAttribute("aria-label","\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\u8868\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8"),Vt.append(l,x,kn),cd(kn),Vt.addEventListener("toggle",()=>{Vt.open&&window.matchMedia("(max-width: 1024px)").matches&&Hr(!0),ld(),L()}),h.append(Vt)}function Ga(){if(!Vt||!fe)return;let l=Dc();Vt.hidden=l.length===0,Vt.querySelector("summary").textContent=`\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\uFF08${l.length} \u6863\u4F4D\uFF09`;let x=l.map(ed),b=x.findIndex(ce=>ce&&gn(ce)&&[ce.x,ce.y,ce.z].every(Number.isFinite)),E=document.createElement("table");E.id="aa-pinned-comparison-table";let U=Ve("caption","",b>=0?`\u0394% \u57FA\u51C6\uFF1A${l[b].name}\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u57FA\u51C6\u6216\u6700\u4F18\u503C\u9AD8\u4EAE\uFF1B\u96F6\u57FA\u51C6\u4E0D\u8BA1\u7B97\u767E\u5206\u6BD4\u3002`:"\u5F53\u524D\u53E3\u5F84\u6CA1\u6709\u53EF\u6BD4\u57FA\u51C6\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u6700\u4F18\u503C\u9AD8\u4EAE\u3002"),V=document.createElement("thead"),ne=document.createElement("tr");ne.append(Ve("th","","\u6307\u6807")),l.forEach(ce=>{let Ee=Ve("th","",ce.name);Ee.scope="col",Ee.dataset.modelIdentity=de(ce),ne.append(Ee)}),V.append(ne);let $=[{field:"creator",label:"\u5382\u5546",identity:!0},{field:"reasoning_level_label",label:"\u63A8\u7406\u6863\u4F4D",identity:!0},{field:"release_date",label:"\u53D1\u5E03\u65E5\u671F",identity:!0},{field:"status",label:"\u5F53\u524D\u72B6\u6001",identity:!0},{field:"intelligence",label:"\u667A\u80FD\u6307\u6570",higherIsBetter:!0},{field:Ce.cost_axis_field,label:Ce.cost_axis_label,unit:Ec(),higherIsBetter:!1},{field:Ce.speed_axis_field,label:Ce.speed_axis_label,unit:"tok/s",higherIsBetter:!0},{field:"layer",label:"\u5E15\u7D2F\u6258\u5C42\u7EA7",higherIsBetter:!1},{field:"standout",label:Yn[oe].label,higherIsBetter:!0},...[...En].filter(ce=>![Ce.cost_axis_field,Ce.speed_axis_field].includes(ce)).map(ce=>({field:ce,label:{output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"}[ce],unit:ce==="output_mtokens"?"M tokens":["output_speed","eff_speed"].includes(ce)?"tok/s":ce==="cost_to_run"?"USD":"USD/M tokens",higherIsBetter:["output_speed","eff_speed"].includes(ce)}))],le=document.createElement("tbody");for(let ce of $){let Ee=document.createElement("tr");Ee.dataset.comparisonField=ce.field;let Ie=Ve("th","",`${ce.label}${ce.unit?` (${ce.unit})`:""}`);Ie.scope="row",Ee.append(Ie);let nt=l.map((Tt,Xt)=>{if(ce.field==="status")return td(Tt);if(ce.identity)return Tt[ce.field]??Tt.panel?.[ce.field]??"\u672A\u8BB0\u5F55";let Ct=x[Xt];return Ct?ce.field==="standout"?Yh(Ct):Ct.panel?.[ce.field]:null}),ft=nt.filter((Tt,Xt)=>x[Xt]&&gn(x[Xt])&&Number.isFinite(Tt)),Pt=ft.length?ce.higherIsBetter?Math.max(...ft):Math.min(...ft):null;nt.forEach((Tt,Xt)=>{let Ct=document.createElement("td"),Ln=x[Xt]&&gn(x[Xt]);if(Ct.textContent=ce.identity?String(Tt):x[Xt]?ce.field==="standout"?Tc(Tt):Wt(Tt):"\u5F53\u524D\u53E3\u5F84\u7F3A\u5E2D",!ce.identity&&Ln&&Number.isFinite(Tt)&&Tt===Pt&&Ct.classList.add("is-best-comparable-value"),!ce.identity&&Ln&&b>=0){let Hc=Ep(Tt,nt[b]);Hc!==null&&Ct.append(Ve("span","aa-comparison-delta",` \u0394 ${Hc>0?"+":""}${Wt(Hc)}%`))}Ln||Ct.classList.add("is-unavailable-for-comparison"),Ee.append(Ct)}),le.append(Ee)}E.append(U,V,le),kn.replaceChildren(E),Vi(kn)}function nd(){Bs.replaceChildren(...ve.flatMap((l,x)=>{if(!De(l)||!Nt(x))return[];let b=Ve("span","aa-pinned-model-name-label",l.name);return b.dataset.modelIndex=String(x),[b]})),id()}function id(){let l=[...Bs.children],x=l.map((b,E)=>{let V=ze[Number(b.dataset.modelIndex)]?.logoSprite.position?.clone().project(N);return b.hidden=!1,{id:E,visible:V&&Math.abs(V.z)<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1,x:V?(V.x+1)*d.clientWidth/2+12*Pn:0,y:V?(1-V.y)*d.clientHeight/2:0,width:b.offsetWidth,height:b.offsetHeight}});for(let b of wp(d.clientWidth,d.clientHeight,x)){let E=l[b.id];E.hidden=b.hidden,b.hidden||(E.style.left=`${b.x}px`,E.style.top=`${b.y}px`)}}function gm(){let l=Lc("aa-standout-panel","\u7A81\u51FA\u5EA6");l.append(cm());let x=Ve("p","aa-weight-note");x.id="aa-standout-metric-description",l.append(x);let b=document.createElement("div");b.id="aa-standout-weight-controls",b.className="aa-weight-block",zt={},[["intelligence","\u667A\u80FD"],["cost","\u6210\u672C"],["speed","\u901F\u5EA6"]].forEach(([V,ne])=>{let $=document.createElement("div");$.className="aa-weight-row";let le=document.createElement("span");le.textContent=ne;let ce=document.createElement("input");ce.type="range",ce.min="-2",ce.max="2",ce.step="0.05",ce.value="0",ce.id=`aa-weight-slider-${V}`;let Ee=document.createElement("input");Ee.type="number",Ee.min="0.25",Ee.max="4",Ee.step="0.05",Ee.value="1.00",Ee.className="aa-weight-number",Ee.id=`aa-weight-number-${V}`,Ee.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD`),ce.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD\u6ED1\u6746`),ce.addEventListener("input",()=>{Ue[V]=Math.pow(2,Number(ce.value)),Ee.value=Ue[V].toFixed(2),_s()});let Ie=()=>{let nt=Fa(Ee.value,Ue[V]);Ue[V]=nt,Ee.value=nt.toFixed(2),ce.value=String(Math.log2(nt)),_s()};Ee.addEventListener("blur",Ie),Ee.addEventListener("keydown",nt=>{nt.key==="Enter"&&(nt.preventDefault(),Ie())}),$.append(le,ce,Ee),b.appendChild($),zt[V]={slider:ce,number:Ee}});let E=Ve("button","aa-secondary-button","\u91CD\u7F6E\u4E09\u4E2A\u6743\u91CD\u4E3A 1");E.type="button",E.id="aa-reset-standout-axis-weights",E.addEventListener("click",()=>Rc(1,1,1)),b.append(Ve("p","aa-weight-note","\u6743\u91CD\u4EE5\u6307\u6570\u6539\u53D8\u5F52\u4E00\u5750\u6807\uFF0C\u4EC5\u5F71\u54CD\u52A0\u6743\u8D85\u4F53\u79EF\uFF1B\u5141\u8BB8 0.25\u20134\u3002\u7F16\u8F91\u6570\u5B57\u540E\u6309 Enter \u6216\u79FB\u51FA\u7126\u70B9\u63D0\u4EA4\u3002"),E);let U=document.createElement("h3");return U.className="aa-section-title",U.textContent="\u524D\u6CBF\u6392\u884C\uFF08\u524D 12 \u540D\uFF09",yt=document.createElement("div"),yt.id="aa-standout-ranking",yt.className="aa-ranking-list",l.append(b,U,yt),Fc(),l}function Fc(){let l=document.getElementById("aa-standout-metric-description");l&&(l.textContent={trend_residual:"\u8D8B\u52BF\u6B8B\u5DEE\uFF1A\u6A21\u578B\u667A\u80FD\u76F8\u5BF9\u524D\u6CBF\u6210\u672C\u4E0E\u901F\u5EA6\u8D8B\u52BF\u62DF\u5408\u7684\u504F\u79BB\uFF0C\u8D8A\u9AD8\u8D8A\u7A81\u51FA\u3002",intelligence_uplift:"\u667A\u80FD\u62AC\u5347\uFF1A\u4E0E\u5176\u4ED6\u524D\u6CBF\u53C2\u7167\u76F8\u6BD4\u7684\u667A\u80FD\u589E\u91CF\uFF1B\u7F3A\u5C11\u53C2\u7167\u65F6\u4E0D\u8BA1\u7B97\u3002",weighted_exclusive_hypervolume:"\u52A0\u6743\u8D85\u4F53\u79EF\u5360\u6BD4 = \u8BE5\u6A21\u578B\u7684\u6392\u4ED6\u8D21\u732E \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF\u3002\u6309\u539F\u59CB\u8D21\u732E\u6392\u5E8F\uFF0C\u7B5B\u9009\u4E0D\u6539\u53D8\u5206\u6BCD\u3002",frontier_distance:"\u5230\u524D\u6CBF\u5782\u8DDD\uFF1A\u6CBF\u7528\u5F53\u524D\u5206\u6790\u65B9\u6CD5\u7684\u51E0\u4F55\u8DDD\u79BB\uFF1B\u4E0D\u8868\u793A\u5B9E\u9645\u53EF\u8FBE\u7684\u65B0\u6A21\u578B\u3002"}[oe]);let x=document.getElementById("aa-standout-weight-controls");x&&(x.hidden=!Yn[oe].usesAdjustableAxisWeights)}function _m(){return Be=document.createElement("details"),Be.id="aa-current-view-panel",Be.className="aa-control-section aa-current-view-details",Be.open=!0,Be}function sd(){return xe?.current_view||{}}function Uc(){return ve.filter(l=>!gn(l)).length}function Oc(){let l=M.current_intelligence_index_version;return l?`v${String(l).replace(/^v/i,"")}`:"\u7248\u672C\u672A\u77E5"}function Bc(){let l=M.current_intelligence_index_version_source==="inferred_from_accepted_embedded_model_catalog_partition";return`${Oc()}${l?"\uFF08\u6309\u76EE\u5F55\u5206\u533A\u63A8\u5B9A\uFF09":""}`}function zc(){let l=M.artificial_analysis_api_response_fetched_at_utc;if(!l)return{headerText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5",detailText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5\uFF08\u5951\u7EA6\u672A\u8BB0\u5F55 API \u6293\u53D6\u65F6\u95F4\uFF09"};let x=M.artificial_analysis_api_response_fetched_at_utc_source==="inferred_from_cache_file_modification_time";return{headerText:`API \u6293\u53D6\u4E8E ${String(l).slice(0,10)}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":""}`,detailText:`${l}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":"\uFF08\u6293\u53D6\u65F6\u8BB0\u5F55\uFF09"}`}}function xm(){let{rendererBundleSha256:l,generatorGitCommit:x,renderedAtUtc:b}=R,E=x.endsWith("-dirty"),U=x.replace(/-dirty$/,""),V=/^[0-9a-f]{40}$/.test(U)?U.slice(0,12):U;return[`bundle ${l.slice(0,12)}`,`commit ${V}${E?"-dirty":""}`,`\u6E32\u67D3 ${b}`].join(" \xB7 ")}function rd(){if(!Be||!xe)return;let l=sd(),x=document.createElement("summary");x.className="aa-section-title aa-collapsible-summary",x.textContent="\u5F53\u524D\u89C6\u56FE";let b=document.createElement("dl");b.className="aa-current-view-grid";let E=Uc();[["\u6E32\u67D3\u5668","three.js"],["\u6570\u636E\u65E5\u671F",l.data_date||a.data_date||"?"],["\u667A\u80FD\u6307\u6570",Oc()],["\u6210\u672C\u53E3\u5F84",l.cost_metric_label||Ce.cost_axis_label],["\u901F\u5EA6\u53E3\u5F84",l.speed_metric_label||Ce.speed_axis_label],["\u53EF\u89C1 / \u5951\u7EA6\u6A21\u578B\u6570",`${ve.filter((U,V)=>Nt(V)).length} / ${ve.length}`],["\u53C2\u4E0E\u5206\u6790\uFF08\u5951\u7EA6\u5168\u96C6\uFF09",String(ve.length-E)],["\u5386\u53F2\u53E3\u5F84\u70B9",String(E)],["\u5168\u5C40 Pareto \u6570",String(Ei().length)],["\u53EF\u89C1 Pareto \u6570",String(Ei().filter(U=>Nt(me[U.name])).length)],["\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650",w===null?"\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":`${w} \u4E2A\u6708 \xB7 ${Mt?"\u663E\u793A":"\u9690\u85CF"}\u5BBD\u9650\u4E13\u5C5E\u70B9`],["\u5BBD\u9650\u4E13\u5C5E\u70B9",String(ve.filter(U=>U.displayed_only_because_of_recent_release_grace_period===!0).length)],["\u526A\u679D\u53C2\u8003\u65E5",l.pruning_reference_date||M.pruning_reference_date||"\u672A\u8BB0\u5F55"],["\u4EA7\u7269\u6307\u7EB9",xm(),"aa-current-view-report-artifact-fingerprint"]].forEach(([U,V,ne])=>{let $=document.createElement("dt");$.textContent=U;let le=document.createElement("dd");le.textContent=V,ne&&(le.id=ne,le.title=[`renderer bundle sha256\uFF1A${R.rendererBundleSha256}`,`generator git commit\uFF1A${R.generatorGitCommit}`,`rendered at (UTC)\uFF1A${R.renderedAtUtc}`].join(`
`)),b.append($,le)}),Be.replaceChildren(x,b)}function Ve(l,x,b){let E=document.createElement(l);return x&&(E.className=x),b!==void 0&&(E.textContent=b),E}function ad(l,x){let b=Ve("a","aa-artificial-analysis-attribution-link",l);return x&&(b.id=x),b.href=T,b.target="_blank",b.rel="noopener noreferrer",b}function ym(){if(!A)return;let l=A.querySelector("h1")||Ve("h1","frontier-3d-report-title",document.title),x=Ve("div","aa-report-header-metadata-row");x.id="aa-report-header-metadata-row",x.tabIndex=0,x.setAttribute("aria-label","\u6A21\u578B\u8BA1\u6570\u4E0E\u6570\u636E\u6765\u6E90\uFF0C\u7A84\u5C4F\u53EF\u6A2A\u5411\u6EDA\u52A8"),cd(x);let b=ad("\u6570\u636E\uFF1AArtificial Analysis","aa-report-header-artificial-analysis-attribution-link");b.append(Ve("span","aa-external-link-glyph"," \u2197"));let E=zc(),U=Ve("span","aa-report-header-metadata-item",E.headerText);U.id="aa-report-header-artificial-analysis-api-fetch-date",U.title=E.detailText;let V=Ve("span","aa-report-header-metadata-item",`\u667A\u80FD\u6307\u6570 ${Bc()}`);V.id="aa-report-header-intelligence-index-version",J=Ve("span","aa-report-header-metadata-item"),J.id="aa-report-header-model-count-summary",x.append(b,U,V,J),Z=Ve("button","aa-how-to-read-drawer-toggle-button","\u5982\u4F55\u9605\u8BFB \u24D8"),Z.type="button",Z.id="aa-how-to-read-drawer-toggle",Z.setAttribute("aria-expanded","false"),Z.setAttribute("aria-controls","aa-how-to-read-drawer"),Z.addEventListener("click",()=>$s(be.hidden));let ne=Ve("div","aa-report-header-title-row"),$=Ve("div","aa-report-header-actions"),le=Ve("button","aa-secondary-button","\u89C6\u56FE\u8BBE\u7F6E");le.type="button",le.id="aa-view-settings-toggle",le.setAttribute("aria-expanded","false"),le.setAttribute("aria-controls",g.id),le.addEventListener("click",()=>{let Ie=h.classList.toggle("is-view-settings-expanded");le.setAttribute("aria-expanded",String(Ie))}),$.append(Z,le),ne.append(l,$);let ce=[ne,x],Ee=M.embedded_model_catalog_partition_rejection_warning_text;if(typeof Ee=="string"&&Ee.trim()){let Ie=Ve("div","aa-report-header-data-quality-warning",`\u26A0 ${Ee}`);Ie.id="aa-report-header-embedded-model-catalog-partition-rejection-warning",Ie.setAttribute("role","alert"),ce.push(Ie)}A.replaceChildren(...ce)}function od(){if(!J)return;let l=ve.length,x=ve.filter((V,ne)=>Nt(ne)).length,b=Uc(),E=[`\u5168\u90E8\u8F93\u5165 ${a.model_table_coverage==="all_input_records"?a.models.length:"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u8986\u76D6\u6709\u9650\uFF09"}`,x===l?`\u663E\u793A ${l} \u4E2A\u6A21\u578B`:`\u663E\u793A ${x}/${l} \u4E2A\u6A21\u578B`,`\u5168\u5C40 Pareto ${Ei().length}`,`\u53EF\u89C1 Pareto ${Ei().filter(V=>Nt(me[V.name])).length}`],U=ve.filter((V,ne)=>!gn(V)&&Nt(ne)).length;b&&E.push(`\u5386\u53F2\u53E3\u5F84 ${U===b?b:`${U}/${b}`}`),J.textContent=E.join(" \xB7 "),Vi(document.getElementById("aa-report-header-metadata-row"))}function vm(l){return l.scrollWidth-l.clientWidth>1&&l.scrollLeft+l.clientWidth<l.scrollWidth-1}function Vi(l){l&&l.classList.toggle("has-inline-overflow-fade",vm(l))}function ld(){Vi(document.getElementById("aa-report-header-metadata-row")),Vi(kn),window.requestAnimationFrame(()=>{Vi(document.getElementById("aa-report-header-metadata-row")),Vi(kn)})}function cd(l){!l||l.dataset.horizontalOverflowFadeBound==="true"||(l.dataset.horizontalOverflowFadeBound="true",l.addEventListener("scroll",()=>Vi(l),{passive:!0}),Vi(l))}function bm(){be=document.createElement("section"),be.id="aa-how-to-read-drawer",be.className="aa-how-to-read-drawer",be.setAttribute("aria-label","\u5982\u4F55\u9605\u8BFB\u672C\u56FE"),be.tabIndex=-1,be.hidden=!0,f.appendChild(be),document.addEventListener("keydown",l=>{l.key==="Escape"&&!be.hidden&&$s(!1),l.key==="Escape"&&fn&&_n()})}function $s(l){if(!be)return Promise.resolve(!1);let x=!!l,b=!be.hidden,E=be.contains(document.activeElement);return x&&Wa(),be.hidden=!x,Z?.setAttribute("aria-expanded",String(x)),x&&!b?be.focus({preventScroll:!0}):!x&&b&&E&&Z?.focus({preventScroll:!0}),Promise.resolve(x)}function Hi(l,...x){let b=Ve("section","aa-how-to-read-drawer-section");return b.append(Ve("h3","aa-how-to-read-drawer-section-title",l),...x),b}function Wa(){if(!be||!xe)return;let l=sd(),x=xe.three_dimensional_axis_configuration||{},b=Ve("div","aa-how-to-read-drawer-header"),E=Ve("button","aa-link-button","\u5173\u95ED");E.type="button",E.id="aa-how-to-read-drawer-close-button",E.addEventListener("click",()=>$s(!1)),b.append(Ve("h2","aa-section-title","\u5982\u4F55\u9605\u8BFB"),E);let U=Ve("ul","aa-how-to-read-drawer-list");[[`\u6210\u672C\u8F74 x\uFF1A${x.x_axis?.title_text||l.cost_metric_label||"\u6210\u672C"}\u3002\u8D8A\u4F4E\u8D8A\u597D\uFF08\u8D8A\u4FBF\u5B9C\uFF09\u3002`,l.cost_metric_note?`\u53E3\u5F84\uFF1A${l.cost_metric_note}`:""],[`\u901F\u5EA6\u8F74 y\uFF1A${l.speed_axis_title_text||x.y_axis?.title_text||l.speed_metric_label||"\u901F\u5EA6"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,l.speed_metric_note?`\u53E3\u5F84\uFF1A${l.speed_metric_note}`:""],[`\u667A\u80FD\u8F74 z\uFF1A${x.z_axis?.title_text||"\u667A\u80FD\u6307\u6570"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,""]].forEach(([nt,ft])=>{let Pt=Ve("li","",nt);ft&&Pt.append(Ve("div","aa-how-to-read-drawer-metric-note",ft)),U.appendChild(Pt)});let V=Uc(),ne=Ve("p","aa-how-to-read-drawer-paragraph");ne.append(Ve("span","aa-historical-intelligence-index-version-swatch"),document.createTextNode(`\u865A\u7EBF\u5E95\u677F\u3001\u534A\u900F\u660E Logo \u7684\u70B9\u662F\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF1A\u672C\u53E3\u5F84\u7528\u5230\u7684\u6210\u672C\u6216\u5197\u957F\u5EA6\u6765\u81EA\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\uFF08\u5F53\u671F\u4E3A ${Oc()}\uFF09\u3002\u5B83\u4EEC\u7167\u5E38\u663E\u793A\uFF0C\u4F46\u4E0D\u53C2\u4E0E Pareto\u3001\u7A81\u51FA\u5EA6\u3001\u5F52\u4E00\u5316\u4E0E\u524D\u6CBF\u51E0\u4F55\u7684\u8BA1\u7B97\u3002\u5F53\u524D\u53E3\u5F84\u5171 ${V} \u4E2A\uFF1B\u52FE\u9009\u5DE5\u5177\u680F\u300C\u4EC5\u5F53\u671F\u53EF\u6BD4\u300D\u53EF\u9690\u85CF\u5B83\u4EEC\u3002`));let $=Ve("dl","aa-current-view-grid"),le=M.embedded_model_catalog_intelligence_index_version,ce=M.embedded_model_catalog_captured_at_utc,Ee=M.artificial_analysis_website_page_fetch_paused,Ie=M.artificial_analysis_api_tier;[["\u6570\u636E\u63D0\u4F9B\u65B9",ad("Artificial Analysis")],["API \u6293\u53D6",zc().detailText],["\u667A\u80FD\u6307\u6570",`${Bc()}${Ie?`\uFF08API ${Ie} tier\uFF09`:""}`],["\u5185\u5D4C\u6A21\u578B\u76EE\u5F55",le?`v${le}${ce?`\uFF0C\u7F13\u5B58\u4E8E ${ce}`:""}`:"\u672A\u8BB0\u5F55"],["\u7F51\u9875\u6293\u53D6",Ee===!0?"\u5DF2\u6682\u505C\uFF08\u53EA\u8BFB\u5DF2\u6709\u7F13\u5B58\uFF09":Ee===!1?"\u5DF2\u5F00\u542F":"\u672A\u8BB0\u5F55"],["\u526A\u679D\u53C2\u8003\u65E5",M.pruning_reference_date||"\u672A\u8BB0\u5F55"]].forEach(([nt,ft])=>{let Pt=document.createElement("dd");Pt.append(ft),$.append(Ve("dt","",nt),Pt)}),be.replaceChildren(b,Hi("\u4E09\u4E2A\u5750\u6807\u8F74",U,Ve("p","aa-how-to-read-drawer-paragraph","\u521D\u59CB\u89C6\u89D2\u4ECE\u300C\u4F4E\u6210\u672C\u3001\u9AD8\u901F\u5EA6\u3001\u9AD8\u667A\u80FD\u300D\u4E00\u89D2\u770B\u5411\u5BF9\u89D2\uFF1B\u62D6\u62FD\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u53F3\u952E\u62D6\u52A8\u5E73\u79FB\u3002")),Hi("Pareto \u524D\u6CBF",Ve("p","aa-how-to-read-drawer-paragraph","\u5E26\u6DF1\u8272\u5706\u73AF\u7684\u70B9\u662F\u672C\u53E3\u5F84\u7684 Pareto \u70B9\uFF1A\u6CA1\u6709\u5176\u4ED6\u6A21\u578B\u5728\u6210\u672C\u3001\u901F\u5EA6\u3001\u667A\u80FD\u4E0A\u540C\u65F6\u4E0D\u5DEE\u4E14\u81F3\u5C11\u4E00\u7EF4\u66F4\u597D\u3002\u9ED8\u8BA4\u7684 Delaunay \u90BB\u63A5\u63D2\u503C\u8FDE\u63A5\u8FD9\u4E9B\u70B9\uFF0C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\u3002\u52FE\u9009\u300C\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09\u300D\u53EF\u5207\u6362\u4E3A\u5DF2\u5C55\u793A\u5206\u6790\u70B9\u7684\u7CBE\u786E\u9884\u7B97\u53EF\u8FBE\u9762\u3002")),Hi("\u5386\u53F2\u53E3\u5F84\u70B9",ne),Hi("\u53E3\u5F84\u4E0E\u6B63\u4EA4\u5206\u89E3",Ve("p","aa-how-to-read-drawer-paragraph",[...Object.values(a.cost_metric_definitions||{}).map(nt=>nt.description||`${nt.label}\uFF1A${nt.unit||"USD"}`),...Object.values(a.speed_metric_definitions||{}).map(nt=>nt.description||`${nt.label}\uFF1A\u751F\u6210\u901F\u5EA6 tok/s`),"\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2\u91C7\u7528\u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u5206\u522B\u89C2\u5BDF\u5355\u4EF7\u3001\u541E\u5410\u4E0E\u667A\u80FD\u3002\u6709\u6548\u6210\u672C\u4E0E\u6709\u6548\u901F\u5EA6\u90FD\u53D7\u5230\u8F93\u51FA\u957F\u5EA6\u5F71\u54CD\u3002\u5207\u6362\u53E3\u5F84\u4FDD\u7559\u76F8\u673A\uFF0C\u56FA\u5B9A\u8F74\u57DF\u6765\u81EA\u8BE5\u53E3\u5F84\u5B8C\u6574\u663E\u793A\u96C6\u5408\uFF1B\u7B5B\u9009\u548C\u5BBD\u9650\u5F00\u5173\u4E0D\u6539\u53D8\u8F74\u57DF\u3002"].join(" "))),Hi("\u56FE\u4F8B",Ve("p","aa-how-to-read-drawer-paragraph",["\u6DF1\u8272\u73AF\uFF1A\u5E15\u7D2F\u6258\u8EAB\u4EFD\uFF1B\u91D1\u8272\u73AF\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\u5149\u6655\uFF1A\u5F53\u524D\u7A81\u51FA\u5EA6\u7684\u76F8\u5BF9\u5927\u5C0F\uFF0C\u865A\u7EBF\u5149\u6655\u8868\u793A\u7F3A\u5C11\u6570\u503C\u3002","\u7D2B\u8272\u5B9E\u7EBF\uFF1A\u540C\u4EE3\u63A8\u7406\u6863\u4F4D\uFF1B\u7070\u8272\u5B9E\u7EBF\uFF1A\u540C\u6863\u4F4D\u8DE8\u4EE3\u8C31\u7CFB\uFF1B\u7070\u8272\u865A\u7EBF\uFF1A\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D\u53C2\u7167\u3002\u7070\u70B9\uFF1A\u88AB\u526A\u679D\u7684\u8C31\u7CFB\u524D\u8EAB\uFF1B\u8D85\u8303\u56F4\u524D\u8EAB\u5939\u7D27\u5728\u7BB1\u58C1\uFF0C\u8BE6\u60C5\u7528 \u2191\u2193 \u63D0\u793A\u65B9\u5411\u5E76\u4FDD\u7559\u539F\u503C\u3002",W?"\u5F53\u524D\u663E\u793A\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684\u5E15\u7D2F\u6258\u70B9\u3002":`\u5F53\u524D${Y==="hidden"?"\u9690\u85CF":Y==="solid"?"\u663E\u793A\u5B9E\u5FC3":"\u663E\u793A\u7EBF\u6846"} Delaunay \u90BB\u63A5\u53C2\u7167\uFF0C\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002`,at?"\u56FD\u522B\u5916\u6846\u5DF2\u5F00\u542F\uFF1A\u4E2D\u56FD\u53CC\u5706\u73AF\u3001\u7F8E\u56FD\u5706\u89D2\u65B9\u73AF\u3001\u5176\u4ED6\u83F1\u5F62\u73AF\uFF1B\u56FD\u522B\u53EA\u6807\u8BC6\u5382\u5546\u5F52\u5C5E\u3002":"\u56FD\u522B\u5916\u6846\u5173\u95ED\uFF1B\u5F00\u542F\u65F6\u540C\u6B65\u663E\u793A\u56FD\u522B\u56FE\u4F8B\u3002"].join(" "))),Hi("\u672A\u4E0A\u56FE\u6A21\u578B\u4E0E\u5382\u5546",Ve("p","aa-how-to-read-drawer-paragraph",(()=>{let nt=fe.excluded_models_with_drop_reason||[],ft=[...new Set(nt.map(Pt=>Pt.creator))].filter(Pt=>!ve.some(Tt=>Tt.creator===Pt));return`${nt.length} \u4E2A\u6709\u667A\u80FD\u5206\u7684\u6A21\u578B\u672A\u4E0A\u56FE\u3002\u53EF\u5728\u641C\u7D22\u4E2D\u6309\u6A21\u578B\u6216\u5382\u5546\u67E5\u770B\u5B9E\u9645\u539F\u56E0\u3002${ft.map(Pt=>`${Pt}\uFF1A${[...new Set(nt.filter(Tt=>Tt.creator===Pt).map(Tt=>Tt.drop_reason))].join("\u3001")}`).join("\uFF1B")}`})())),Hi("\u6570\u636E\u6765\u6E90",$),Hi("\u54C1\u724C\u4E0E\u8BB8\u53EF",Ve("p","aa-how-to-read-drawer-paragraph","\u672C\u62A5\u544A\u4F7F\u7528 Lobe Icons \u7684 MIT \u8BB8\u53EF\u56FE\u6807\u4E0E\u672C\u5730\u54C1\u724C\u8D44\u4EA7\u3002\u54C1\u724C\u540D\u79F0\u548C\u5546\u6807\u5C5E\u4E8E\u5404\u81EA\u6743\u5229\u4EBA\uFF0C\u4EC5\u7528\u4E8E\u6807\u8BC6\u5382\u5546\uFF0C\u4E0D\u8868\u793A\u8BA4\u53EF\u6216\u5408\u4F5C\u3002\u5B8C\u6574\u8BB8\u53EF\u89C1\u672C\u9875\u6E90\u4EE3\u7801\u7684 Lobe Icons MIT \u8BB8\u53EF\u58F0\u660E\u3002")))}function Hr(l){_e=!!l,h.classList.toggle("is-side-panel-collapsed",!_e);let x=window.matchMedia("(max-width: 1024px)").matches;Ot.textContent=_e?x?"\u2304":"\u203A":x?"\u2303":"\u2039",Ot.setAttribute("aria-label",`${_e?"\u6536\u8D77":"\u5C55\u5F00"}\u56FE\u8868\u63A7\u5236\u680F`),Ot.setAttribute("aria-controls","aa-side-panel-body"),Ot.setAttribute("aria-expanded",String(_e)),window.setTimeout(xs,210)}function Sm(){ym(),bm(),g.replaceChildren(am(),om(),lm());let l=document.createElement("div");l.className="aa-side-panel-header";let x=document.createElement("div");x.className="aa-side-panel-label",x.textContent="\u56FE\u8868\u63A7\u5236",Ot=document.createElement("button"),Ot.type="button",Ot.id="aa-side-panel-toggle",Ot.className="aa-icon-button",Ot.addEventListener("click",()=>Hr(!_e)),l.append(x,Ot);let b=document.createElement("div");b.className="aa-side-panel-body",b.id="aa-side-panel-body",b.append(um(),fm(),pm(),gm(),_m()),v.replaceChildren(l,b),mm(),Fc(),ud()}function ud(){let l=window.matchMedia("(max-width: 640px)").matches,x=document.getElementById("aa-report-header-metadata-row"),b=document.getElementById("aa-report-header-model-count-summary");x&&b&&(l?x.prepend(b):x.append(b)),ld(),Vt&&(window.matchMedia("(max-width: 1024px)").matches?We.after(Vt):h.append(Vt)),Hr(_e)}window.addEventListener("resize",ud);function xs(){let l=Math.max(1,d.clientWidth),x=Math.max(1,d.clientHeight),b=Math.min(window.devicePixelRatio||1,2);F.getPixelRatio()!==b&&F.setPixelRatio(b),F.setSize(l,x,!1),F.setViewport(0,0,F.domElement.width/b,F.domElement.height/b);for(let E of[qe,ut,je])E?.material.resolution.set(l,x);N.aspect=l/x,N.updateProjectionMatrix(),m?.onResize();for(let E of[ue,ge])E.children.filter(U=>U.isSprite).forEach(U=>Fr(U,U.userData.cssPixelSize));!Ze.hidden&&fs&&gs(fs),Ht()}new ResizeObserver(xs).observe(d),window.addEventListener("resize",xs);let kc;function Vc(){kc?.removeEventListener("change",Vc),kc=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`),kc.addEventListener("change",Vc),xs()}Vc();function Xa(l){let x=l.clone().project(N),b=F.domElement.getBoundingClientRect();return{clientX:b.left+(x.x+1)/2*b.width,clientY:b.top+(1-x.y)/2*b.height,normalizedDeviceDepth:x.z}}function hd(l){let x=me[l];return x===void 0?null:Xa(ze[x].logoSprite.position)}function Mm(l){let x=me[l];if(x===void 0)return null;let b=ze[x],E=new B().setFromMatrixColumn(N.matrixWorld,0),U=Xa(b.logoSprite.position);function V(ne){if(!ne.material.sizeAttenuation)return ne.scale.x*d.clientHeight/(4*Math.tan(_i.degToRad(N.fov/2)));let $=Xa(ne.position.clone().addScaledVector(E,ne.scale.x/2));return Math.hypot($.clientX-U.clientX,$.clientY-U.clientY)}return{logoRadius:V(b.logoSprite),whiteBackplateRadius:V(b.backplateSprite),countryRegionRadius:V(b.countryRegionSprite)}}function dd(l){let x=gt.find(b=>b.userData.prunedLineageAncestorNode.name===l);return x?Xa(x.position):null}function Em(l){let x=hd(l);if(!x)return null;let b=Vs(x.clientX,x.clientY);if(b?.interactionTargetKind!=="displayed_model")return null;let E=ve[b.modelIndex];return{projectedCanvasPosition:x,frontmostModelName:E.name,frontmostBaseModelName:E.base_model_name,frontmostLineageKey:E.lineage_key}}function wm(l){let x=dd(l);if(!x)return null;let b=Vs(x.clientX,x.clientY),E=b?.interactionTargetKind==="displayed_model"?ve[b.modelIndex]?.name??null:b?.prunedLineageAncestorNode?.name??null;return{projectedCanvasPosition:x,frontmostInteractionTargetKind:b?.interactionTargetKind??null,frontmostInteractionTargetName:E,frontmostInteractionTargetIsRequestedPrunedLineageAncestor:b?.interactionTargetKind!=="displayed_model"&&E===l}}function Am(){if(!re)return{built:!1,visible:!1,vertexCount:0,triangleCount:0,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:!0,allVertexPositionsAreFinite:!0};let l=re.geometry.attributes.position,x=Array.from(re.geometry.index.array);return{built:!0,visible:re.visible,vertexCount:l.count,triangleCount:x.length/3,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:x.every(b=>Number.isInteger(b)&&b>=0&&b<l.count),allVertexPositionsAreFinite:Array.from(l.array).every(Number.isFinite)}}function Tm(){let l=ve.filter(($,le)=>Nt(le)).length,x=new Set(Wh().filter($=>$.userData.interactionTargetKind==="displayed_model").map($=>$.userData.modelIndex)),b=ve.map(($,le)=>[$,le]).filter(([$])=>!gn($)).map(([,$])=>$),E=new Set(ve.map($=>$.creator)),U=new Set(ve.filter(($,le)=>Nt(le)).map($=>$.creator)).size,V=$a(qe).length,ne=$a(ut).length;return{interactiveRenderer:"threejs",activeMetricVariantKey:u,costAxisField:Ce.cost_axis_field,speedAxisField:Ce.speed_axis_field,displayedModelMarkerCount:ve.length,organizationLogoMarkerCount:ze.length,cameraFacingOrganizationLogoMarkerCount:it.filter($=>$.isSprite).length,depthTestedOrganizationLogoMarkerCount:it.filter($=>$.material.depthTest).length,depthWritingOrganizationLogoBackplateCount:ze.filter($=>$.backplateSprite.material.depthWrite).length,loadedOrganizationLogoCanvasTextureCount:[...E].filter($=>ct[$]==="loaded").length,failedOrganizationLogoCanvasTextureCount:[...E].filter($=>ct[$]==="failed").length,countryRegionMarkerVisible:at,countryRegionMarkerCount:at?l:0,organizationCount:E.size,visibleOrganizationCount:U,pinnedBaseModelNames:[...we],orbitInteractionActive:Ws,pinnedModelUuids:[...ye].filter($=>!$.startsWith("legacy:")),hoveredModelIndex:he,organizationLogoTextureLoadStateByCreatorName:{...ct},hoveredLineageKey:pe,hoveredReasoningBaseModelName:Re,hoveredPrunedLineageAncestorName:D,pinnedModelMarkerCount:ve.filter($=>De($)).length,displayedLineageSegmentEndpointCount:V,displayedReasoningVariantSegmentEndpointCount:ne,displayedPrunedLineageAncestorMarkerCount:gt.length,availableLineageCount:Object.keys(Se).length,selectedFrontierStandoutMetricName:oe,frontierStandoutAxisWeights:{...Ue},paretoFrontierModelCount:Ei().length,visibleParetoFrontierModelCount:Ei().filter($=>Nt(me[$.name])).length,frontierStyle:Y,achievableFrontierSurfaceVisible:W,paretoFrontierWireframeVisible:ot?.visible??!1,paretoFrontierSurfaceVisible:re?.visible??!1,achievableFrontierSurfaceObjectVisible:Fe?.visible??!1,exactAchievableBoundaryVisible:$e?.visible??!1,achievableFrontierGeometryKind:xe.achievable_frontier_geometry_kind??null,paretoFrontierSurfaceWritesDepth:re?.material.depthWrite??null,achievableFrontierSurfaceWritesDepth:Fe?.material.depthWrite??null,paretoFrontierSurfaceTriangleCount:re?re.geometry.index.count/3:0,renderedTriangleCountInLatestFrame:F.info.render.triangles,nonFiniteContractCoordinateCount:C,outOfRangeContractTriangleVertexIndexCount:_,skippedInvalidContractGeometryNames:[...G],visibleModelMarkerCount:l,showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod:Mt,recentReleaseFrontierDistanceGracePeriodMonths:w,recentReleaseGracePeriodOnlyModelMarkerCount:ve.filter($=>$.displayed_only_because_of_recent_release_grace_period===!0).length,pickableRecentReleaseGracePeriodOnlyModelMarkerCount:ve.filter(($,le)=>$.displayed_only_because_of_recent_release_grace_period===!0&&x.has(le)).length,showOnlyCurrentIntelligenceIndexVersionComparableModels:z,historicalIntelligenceIndexVersionModelMarkerCount:b.length,visibleHistoricalIntelligenceIndexVersionModelMarkerCount:b.filter($=>ze[$]?.logoSprite.visible).length,pickableHistoricalIntelligenceIndexVersionModelMarkerCount:b.filter($=>x.has($)).length,historicalIntelligenceIndexVersionStyledModelMarkerCount:ze.filter($=>$.backplateSprite.material===uc&&$.logoSprite.material.opacity<1).length,currentIntelligenceIndexVersionStyledModelMarkerCount:ze.filter($=>$.backplateSprite.material===cc&&$.logoSprite.material.opacity>=1).length,howToReadDrawerOpen:be?!be.hidden:!1,reportArtifactFingerprint:{...R},sidePanelExpanded:_e,markerSizeMultiplier:Pn,fixedAxisConfiguration:xe.three_dimensional_axis_configuration,cameraPosition:N.position.toArray()}}function $a(l){if(!l)return[];if(l.isLineSegments2){let b=l.geometry.attributes.instanceStart,E=l.geometry.attributes.instanceEnd;return Array.from({length:b.count},(U,V)=>[[b.getX(V),b.getY(V),b.getZ(V)],[E.getX(V),E.getY(V),E.getZ(V)]]).flat()}let x=l.geometry.attributes.position;return Array.from({length:x.count},(b,E)=>[x.getX(E),x.getY(E),x.getZ(E)])}function Cm(){return{lineage:$a(qe),reasoning:$a(ut)}}function Rm(){return ze.map((l,x)=>({name:ve[x]?.name,position:l.logoSprite.position.toArray(),visible:Nt(x)}))}function Im(){return gt.map(l=>l.position.toArray())}function Pm(){return{selectedFrontierStandoutMetricName:oe,frontierStandoutAxisWeights:{...Ue},ranking:Ei().map(l=>({name:l.name,value:Ge[l.name]})).sort((l,x)=>{let b=Number.isFinite(l.value)?l.value:-1/0;return(Number.isFinite(x.value)?x.value:-1/0)-b}),completeFrontierHypervolume:wt}}function Lm(l){return(fe?.model_analysis_records||[]).find(x=>de(x)===de(l))}function fd(l){return Lm(l)?.sensitivity_by_intelligence_half_width?.[I.sensitivity_intelligence_half_width]}function pd(){let l=a.refresh_difference_report?.frontier_comparison;return new Set((l?.status==="comparable"?l.entered_by_variant?.[u]||[]:[]).map(x=>x.toLowerCase()))}function Dm(){let l=pd();ze.forEach((x,b)=>{let E=ve[b],U=fd(E),V=U?.is_pareto_robust?"robust":U?.is_near_frontier?"near":E.panel?.layer===1&&U?.is_pareto_robust===!1?"sensitive":null,ne=x.sensitivityRingSprite;ne&&(ne.visible=Nt(b)&&I.sensitivity_intelligence_half_width!=="off"&&V!==null,V&&(ne.material=lc[V],ne.userData.normalMaterial=ne.material,ne.userData.normalRenderOrder=48,ne.userData.foregroundMaterial?.dispose(),ne.userData.foregroundMaterial=null)),x.newFrontierEntrySprite&&(x.newFrontierEntrySprite.visible=Nt(b)&&l.has(de(E)))})}let md=null;function Gr(){let l=window.matchMedia("(prefers-color-scheme: dark)").matches;k.background.set(l?1120295:16777215);let x={6583435:12044255,3359061:14542835,14212838:4412269,2383002:8436479,4674921:12044255,2193980:6219930};for(let E of[j,ie,ge])E.traverse(U=>{var ne;if(!U.material?.color||U.isSprite)return;let V=U.material;(ne=V.userData).lightThemeColor??(ne.lightThemeColor=V.color.getHex()),V.color.setHex(l?x[V.userData.lightThemeColor]??V.userData.lightThemeColor:V.userData.lightThemeColor)});if(md===l){Ht();return}md=l;for(let[E,U,V]of[["other","#4b5563",!1],["unclassified","#64748b",!0]]){let ne=Fh[E],$=ne.image.getContext("2d");$.clearRect(0,0,128,128),$.save(),$.translate(64,64),$.rotate(Math.PI/4),$.strokeStyle=l?"#cbd5e1":U,$.lineWidth=9,V&&$.setLineDash([10,8]),$.strokeRect(-39,-39,78,78),$.restore(),ne.needsUpdate=!0}let b=oc.image.getContext("2d");b.clearRect(0,0,128,128),b.beginPath(),b.arc(64,64,53,0,Math.PI*2),b.lineWidth=10,b.strokeStyle=l?"#e2e8f0":"rgba(15,23,42,0.8)",b.stroke(),oc.needsUpdate=!0,Ht()}m=Ip({camera:N,controls:K,canvas:F.domElement,graphContainer:d,getBoundingSphere:()=>{let l=new vn().setFromObject(j);return l.isEmpty()?new Cn(new B,Math.sqrt(3)):l.getBoundingSphere(new Cn)},getInitialCameraDirection:()=>{let l=xe.initial_camera_configuration.eye;return[l.x,l.y,l.z]},hitTest:Vs,onCameraStateCommitted:L,onDismissOverlay:()=>be&&!be.hidden?($s(!1),!0):fn?(_n(),!0):xt&&!xt.hidden&&et?.value?(xt.hidden=!0,et.setAttribute("aria-expanded","false"),et.removeAttribute("aria-activedescendant"),wn=-1,!0):!1,onClearSelection:()=>{_n(),ye.clear(),O(),Xs(),wi()},onFocusSearch:()=>{Hr(!0),et?.focus()},requestRender:Ht});function Nm(){return{metric_variant_key:u,pinned_model_uuids:[...ye].filter(l=>!l.startsWith("legacy:")).sort(),hidden_organization_identity_keys:[...new Set([...Le].map(l=>c[l]?.organization_identity_key).filter(Boolean))].sort(),standout_metric:oe,standout_axis_weights:{...Ue},camera:m.serializeCameraState(),display:{comparable_only:z,recent_release_grace_period:Mt,country_region_markers:at,achievable_frontier_surface:W,frontier_style:Y,marker_size_multiplier:Pn,pinned_comparison_expanded:!!Vt?.open,pinned_comparison_optional_fields:[...En].sort()}}}function Fm(l,x){if(l.metric_variant_key)if(o[l.metric_variant_key]){let[E,U]=l.metric_variant_key.split("__");Vr(E,U)}else x("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002");if(l.pinned_model_uuids){ye.clear();for(let E of l.pinned_model_uuids){let U=E.toLowerCase();if(ye.add(U),!Pe.has(U)){let V=`\u7F3A\u5931\u6A21\u578B ${U}`;Pe.set(U,{model_uuid:U,name:V,creator:"?",base_model_name:V,panel:{intelligence:null,release_date:"?"}}),x("\u90E8\u5206\u56FA\u5B9A\u6A21\u578B\u5728\u5F53\u524D\u6587\u4EF6\u4E2D\u7F3A\u5931\uFF0C\u5DF2\u4FDD\u7559 UUID \u4E0E\u672A\u4E0A\u56FE\u8BF4\u660E\u3002")}}O(),Xs()}if(l.hidden_organization_identity_keys){let E=new Set(l.hidden_organization_identity_keys);Le=new Set(Object.entries(c).filter(([,U])=>E.has(U.organization_identity_key)).map(([U])=>U)),Kh()}if(l.standout_metric&&Cc(l.standout_metric),l.standout_axis_weights){let E=l.standout_axis_weights;Rc(E.intelligence,E.cost,E.speed)}let b=l.display||{};b.comparable_only!==void 0&&xc(b.comparable_only),b.recent_release_grace_period!==void 0&&yc(b.recent_release_grace_period),b.country_region_markers!==void 0&&vc(b.country_region_markers),b.achievable_frontier_surface!==void 0&&Mc(b.achievable_frontier_surface),b.frontier_style&&Sc(b.frontier_style),b.marker_size_multiplier!==void 0&&pc(b.marker_size_multiplier),b.pinned_comparison_optional_fields&&(En.clear(),b.pinned_comparison_optional_fields.forEach(E=>En.add(E)),Vt.querySelectorAll("[data-comparison-field]").forEach(E=>{E.checked=En.has(E.dataset.comparisonField)}),ds(Ir,[...En]),Ga()),b.pinned_comparison_expanded!==void 0&&(Vt.open=b.pinned_comparison_expanded),l.camera&&m.restoreCameraState(l.camera),ms()}let Um=v.style.transition;v.style.transition="none",Sm(),Ic(u,!1),xs(),p=Ch({dataset:a,reportShell:h,toolbar:g,plotRegion:f,graphContainer:d,sidePanel:v,getVariantKey:()=>u,getSharedViewState:Nm,applySharedViewState:Fm,modelPassesSharedFilters:l=>{let x=ve.find(b=>de(b)===de(l))||l;return mc(l.creator)&&(!z||gn(l))&&(Mt||!x.displayed_only_because_of_recent_release_grace_period)},onExplorationFiltersChanged:l=>{Object.assign(I,l),ms(),Br()},resetCamera:()=>m.resetCamera(),setAxisAlignedCameraView:m.setAxisAlignedCameraView,pinModel:l=>qh(l),exportPng:async()=>{Gr();let l=await Pp({scene:k,camera:N,graphContainer:d,title:document.getElementById("frontier-3d-report-title").textContent,metadataLines:[`\u6570\u636E\u65E5\u671F\uFF1A${a.data_date||"\u672A\u77E5"}\uFF1B${Ce.cost_axis_label} \xD7 ${Ce.speed_axis_label}`,`\u672C\u53E3\u5F84\u4E0A\u56FE ${ve.length}\uFF1B\u53EF\u89C1 ${ve.filter((x,b)=>Nt(b)).length}\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97`,`\u667A\u80FD\u5206\u663E\u793A\uFF1A${I.measured_only?"\u4EC5\u5B9E\u6D4B":"\u542B\u5B9E\u6D4B\u3001\u4F30\u7B97\u4E0E\u672A\u77E5"}\uFF1B\u53D1\u5E03\u65E5\u671F\u622A\u6B62\uFF1A${I.cutoff_date||"\u5168\u90E8\u65E5\u671F"}\uFF08${I.date_mode==="hide"?"\u9690\u85CF":"\u6DE1\u51FA"}\uFF0C\u672A\u77E5\u65E5\u671F\u4FDD\u7559\uFF09`],legendLines:["\u5706\u73AF\uFF1A\u6B63\u5F0F\u524D\u6CBF\uFF1B\u91D1\u8272\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\uFF1A\u7A81\u51FA\u5EA6\uFF1B\u9752\u8272\uFF1A\u53EF\u9760\u7684\u65B0\u5165\u524D\u6CBF",`\u524D\u6CBF\u51E0\u4F55\uFF1A${W?"\u7CBE\u786E\u53EF\u8FBE\u9636\u68AF\uFF08\u57FA\u4E8E\u5DF2\u5C55\u793A\u5206\u6790\u70B9\uFF09":Y==="hidden"?"\u5DF2\u9690\u85CF":"Delaunay \u90BB\u63A5\u63D2\u503C\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762"}`,`\u7A81\u51FA\u5EA6\uFF1A${Yn[oe].label}\uFF1B\u6743\u91CD\uFF08\u667A\u80FD / \u6210\u672C / \u901F\u5EA6\uFF09\uFF1A${Ue.intelligence} / ${Ue.cost} / ${Ue.speed}`,...at?["\u56FD\u522B/\u5730\u533A\u5916\u6846\uFF1A\u7EA2\u5706\u4E2D\u56FD\uFF1B\u84DD\u5706\u89D2\u7F8E\u56FD\uFF1B\u7070\u83F1\u5F62\u5176\u4ED6\uFF1B\u865A\u7EBF\u83F1\u5F62\u672A\u5206\u7C7B"]:[],...Le.size?[`\u9690\u85CF\u5382\u5546\uFF1A${[...Le].join("\u3001")}`]:[],I.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`\u5047\u8BBE\u533A\u95F4\uFF1A\u667A\u80FD \xB1${I.sensitivity_intelligence_half_width}\uFF0C\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%\uFF1B\u5B9E\u7EBF\u7A33\u5065\uFF0C\u865A\u7EBF\u654F\u611F/\u8FD1\u524D\u6CBF\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4`],pinnedModelNames:Dc().map(x=>x.name)});Th(l,`frontier-${a.data_date||"unknown"}.png`),Ht()}}),tc(window.location.hash).state?.camera||m.resetCamera({commit:!1}),xs(),v.style.transition=Um,window.serializeFrontierViewState=p.getState,window.setFrontierExplorationFilters=p.setExplorationFilters,window.resetFrontierCameraView=()=>m.resetCamera(),window.setAxisAlignedFrontierCameraView=m.setAxisAlignedCameraView,window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Gr),Gr(),window.frontierThreeDimensionalVisualizationState=Tm,window.pinFrontierBaseModel=l=>Ae(l,!0),window.unpinFrontierBaseModel=l=>Ae(l,!1),window.togglePinnedFrontierBaseModel=Va,window.showFrontierLineageForModelName=l=>{let x=me[l];return x===void 0||!Nt(x)?!1:(zr(x),!0)},window.clearFrontierHoverState=_n,window.matchingFrontierBaseModelNames=hm,window.setFrontierMetricCombination=Vr,window.setParetoFrontierVisualizationStyle=Sc,window.setAchievableFrontierSurfaceVisibility=Mc,window.setCountryRegionMarkerVisibility=vc,window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels=xc,window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod=yc,window.setFrontierHowToReadDrawerOpen=$s,window.setFrontierSidePanelExpanded=Hr,window.selectFrontierStandoutMetric=Cc,window.setFrontierStandoutAxisWeights=Rc,window.setFrontierMarkerSizeMultiplier=pc,window.frontierStandoutRanking=Pm,window.frontierThreeDimensionalRendererDiagnostics={verificationGeometryConstructors:{Vector2:Je,Vector3:B,Scene:_r,Color:mt,CanvasTexture:Is,Sprite:Cs,SpriteMaterial:Ts,PlaneGeometry:Ps,Mesh:sn,PerspectiveCamera:en,OrthographicCamera:Ls},get axisAnnotationSizeMeasurementCount(){return Jn},get surfaceMaterialForVisibilityVerification(){return re?.material},get surfaceRenderOrder(){return re?.renderOrder},markerVisualEncodingSummary:()=>ze.map((l,x)=>({isPareto:ve[x].panel?.layer===1,paretoRingScale:l.paretoRingSprite.scale.x,backplateScale:l.backplateSprite.scale.x,standoutHaloVisible:l.standoutHaloSprite.visible,standoutHaloScale:l.standoutHaloSprite.scale.x,logoScale:l.logoSprite.scale.x,logoSizeAttenuation:l.logoSprite.material.sizeAttenuation})),camera:N,scene:k,controls:K,renderer:F,requestRender:Ht,pointerInteractionAtCanvasClientCoordinates:Vs,createRelationshipLineForVerification:ka,projectedCanvasPositionForModelName:hd,projectedCanvasMarkerRadiiForModelName:Mm,projectedCanvasPositionForPrunedLineageAncestorName:dd,frontmostPointerInteractionAtProjectedModelPosition:Em,frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition:wm,paretoFrontierSurfaceGeometrySummary:Am,transientRelationshipLineEndpointPositions:Cm,displayedModelMarkerPositionsAndVisibility:Rm,displayedPrunedLineageAncestorMarkerPositions:Im},yh((l,x)=>{let b=[...ye].map(V=>{let ne=Pe.get(V);return ne?[V,Object.fromEntries(["model_uuid","name","creator","base_model_name","reasoning_level_label","reasoning_level_sort_order"].map($=>[$,ne[$]]))]:null}).filter(Boolean);a=bh(l),o=a.metric_variants,M=a.artificial_analysis_data_provenance||{};let E=zc(),U=document.getElementById("aa-report-header-artificial-analysis-api-fetch-date");U.textContent=E.headerText,U.title=E.detailText,document.getElementById("aa-report-header-intelligence-index-version").textContent=`\u667A\u80FD\u6307\u6570 ${Bc()}`,window.FRONTIER_3D_VISUALIZATION_DATASET=a,Pe.clear(),b.forEach(([V,ne])=>Pe.set(V,{...ne,panel:{},historical_frame_absence_reason:x(ne.model_uuid)})),Object.values(o).forEach(V=>{(V.three_dimensional_scene?.displayed_model_markers||[]).forEach(ne=>Pe.set(de(ne),ne))}),Ic(u,!0)})})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
