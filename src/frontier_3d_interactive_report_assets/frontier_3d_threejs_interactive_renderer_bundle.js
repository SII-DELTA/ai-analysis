(()=>{var ts={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qh=0,Su=1,Yh=2;var va=1,Zh=2,Sr=3,Fi=0,vn=1,Yn=2,mi=0,Ms=1,Mu=2,Eu=3,wu=4,jh=5;var Yi=100,Jh=101,Kh=102,Qh=103,ef=104,tf=200,nf=201,sf=202,rf=203,So=204,Mo=205,af=206,of=207,lf=208,cf=209,uf=210,df=211,hf=212,ff=213,pf=214,Eo=0,wo=1,Ao=2,Es=3,To=4,Co=5,Ro=6,Io=7,Au=0,mf=1,gf=2,ri=0,Tu=1,Cu=2,Ru=3,Iu=4,Pu=5,Lu=6,Du=7;var Nu=300,is=301,Ps=302,rl=303,al=304,ba=306,Po=1e3,fi=1001,Lo=1002,Kt=1003,_f=1004;var Sa=1005;var nn=1006,ol=1007;var ss=1008;var Hn=1009,Fu=1010,Uu=1011,Mr=1012,ll=1013,ai=1014,oi=1015,gi=1016,cl=1017,ul=1018,Er=1020,Ou=35902,Bu=35899,zu=1021,ku=1022,Zn=1023,pi=1026,rs=1027,Vu=1028,dl=1029,as=1030,hl=1031;var fl=1033,Ma=33776,Ea=33777,wa=33778,Aa=33779,pl=35840,ml=35841,gl=35842,_l=35843,xl=36196,yl=37492,vl=37496,bl=37488,Sl=37489,Ta=37490,Ml=37491,El=37808,wl=37809,Al=37810,Tl=37811,Cl=37812,Rl=37813,Il=37814,Pl=37815,Ll=37816,Dl=37817,Nl=37818,Fl=37819,Ul=37820,Ol=37821,Bl=36492,zl=36494,kl=36495,Vl=36283,Hl=36284,Ca=36285,Gl=36286;var Qr=2300,Do=2301,bo=2302,pu=2303,mu=2400,gu=2401,_u=2402;var xf=3200;var Hu=0,yf=1,Bi="",$t="srgb",ea="srgb-linear",ta="linear",wt="srgb";var bs=7680;var xu=519,vf=512,bf=513,Sf=514,Wl=515,Mf=516,Ef=517,Xl=518,wf=519,No=35044;var Gu="300 es",ii=2e3,na=2001;function Hm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Af(){let i=ia("canvas");return i.style.display="block",i}var xh={},fr=null;function sa(...i){let e="THREE."+i.shift();fr?fr("log",e,...i):console.log(e,...i)}function Tf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qe(...i){i=Tf(i);let e="THREE."+i.shift();if(fr)fr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function nt(...i){i=Tf(i);let e="THREE."+i.shift();if(fr)fr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ss(...i){let e=i.join(" ");e in xh||(xh[e]=!0,Qe(...i))}function Cf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Rf={[Eo]:wo,[Ao]:Ro,[To]:Io,[Es]:Co,[wo]:Eo,[Ro]:Ao,[Io]:To,[Co]:Es},si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yh=1234567,Jr=Math.PI/180,pr=180/Math.PI;function Di(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]+"-"+un[e&255]+un[e>>8&255]+"-"+un[e>>16&15|64]+un[e>>24&255]+"-"+un[t&63|128]+un[t>>8&255]+"-"+un[t>>16&255]+un[t>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function ut(i,e,t){return Math.max(e,Math.min(t,i))}function Wu(i,e){return(i%e+e)%e}function Wm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Xm(i,e,t){return i!==e?(t-i)/(e-i):0}function Kr(i,e,t){return(1-t)*i+t*e}function $m(i,e,t,n){return Kr(i,e,1-Math.exp(-t*n))}function qm(i,e=1){return e-Math.abs(Wu(i,e*2)-e)}function Ym(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Zm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function jm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Jm(i,e){return i+Math.random()*(e-i)}function Km(i){return i*(.5-Math.random())}function Qm(i){i!==void 0&&(yh=i);let e=yh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eg(i){return i*Jr}function tg(i){return i*pr}function ng(i){return(i&i-1)===0&&i!==0}function ig(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function sg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function rg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),u=r((e+n)/2),h=a((e+n)/2),p=r((e-n)/2),d=a((e-n)/2),g=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*p,c*d,o*u);break;case"YZY":i.set(c*d,o*h,c*p,o*u);break;case"ZXZ":i.set(c*p,c*d,o*h,o*u);break;case"XZX":i.set(o*h,c*v,c*g,o*u);break;case"YXY":i.set(c*g,o*h,c*v,o*u);break;case"ZYZ":i.set(c*v,c*g,o*h,o*u);break;default:Qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var _i={DEG2RAD:Jr,RAD2DEG:pr,generateUUID:Di,clamp:ut,euclideanModulo:Wu,mapLinear:Wm,inverseLerp:Xm,lerp:Kr,damp:$m,pingpong:qm,smoothstep:Ym,smootherstep:Zm,randInt:jm,randFloat:Jm,randFloatSpread:Km,seededRandom:Qm,degToRad:eg,radToDeg:tg,isPowerOfTwo:ng,ceilPowerOfTwo:ig,floorPowerOfTwo:sg,setQuaternionFromProperEuler:rg,normalize:Rt,denormalize:ni},Zu=class Zu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Zu.prototype.isVector2=!0;var Je=Zu,Un=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],u=n[s+1],h=n[s+2],p=n[s+3],d=r[a+0],g=r[a+1],v=r[a+2],b=r[a+3];if(p!==b||c!==d||u!==g||h!==v){let m=c*d+u*g+h*v+p*b;m<0&&(d=-d,g=-g,v=-v,b=-b,m=-m);let f=1-o;if(m<.9995){let R=Math.acos(m),P=Math.sin(R);f=Math.sin(f*R)/P,o=Math.sin(o*R)/P,c=c*f+d*o,u=u*f+g*o,h=h*f+v*o,p=p*f+b*o}else{c=c*f+d*o,u=u*f+g*o,h=h*f+v*o,p=p*f+b*o;let R=1/Math.sqrt(c*c+u*u+h*h+p*p);c*=R,u*=R,h*=R,p*=R}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],u=n[s+2],h=n[s+3],p=r[a],d=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+h*p+c*g-u*d,e[t+1]=c*v+h*d+u*p-o*g,e[t+2]=u*v+h*g+o*d-c*p,e[t+3]=h*v-o*p-c*d-u*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(n/2),h=o(s/2),p=o(r/2),d=c(n/2),g=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=d*h*p+u*g*v,this._y=u*g*p-d*h*v,this._z=u*h*v+d*g*p,this._w=u*h*p-d*g*v;break;case"YXZ":this._x=d*h*p+u*g*v,this._y=u*g*p-d*h*v,this._z=u*h*v-d*g*p,this._w=u*h*p+d*g*v;break;case"ZXY":this._x=d*h*p-u*g*v,this._y=u*g*p+d*h*v,this._z=u*h*v+d*g*p,this._w=u*h*p-d*g*v;break;case"ZYX":this._x=d*h*p-u*g*v,this._y=u*g*p+d*h*v,this._z=u*h*v-d*g*p,this._w=u*h*p+d*g*v;break;case"YZX":this._x=d*h*p+u*g*v,this._y=u*g*p+d*h*v,this._z=u*h*v-d*g*p,this._w=u*h*p-d*g*v;break;case"XZY":this._x=d*h*p-u*g*v,this._y=u*g*p-d*h*v,this._z=u*h*v+d*g*p,this._w=u*h*p+d*g*v;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],u=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-c)*g,this._y=(r-u)*g,this._z=(a-s)*g}else if(n>o&&n>p){let g=2*Math.sqrt(1+n-o-p);this._w=(h-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+u)/g}else if(o>p){let g=2*Math.sqrt(1+o-n-p);this._w=(r-u)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+h)/g}else{let g=2*Math.sqrt(1+p-n-o);this._w=(a-s)/g,this._x=(r+u)/g,this._y=(c+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,u=t._z,h=t._w;return this._x=n*h+a*o+s*u-r*c,this._y=s*h+a*c+r*o-n*u,this._z=r*h+a*u+n*c-s*o,this._w=a*h-n*o-s*c-r*u,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let u=Math.acos(o),h=Math.sin(u);c=Math.sin(c*u)/h,t=Math.sin(t*u)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ju=class ju{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*s-o*n),h=2*(o*t-r*s),p=2*(r*n-a*t);return this.x=t+c*u+a*p-o*h,this.y=n+c*h+o*u-r*p,this.z=s+c*p+r*h-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wc.copy(this).projectOnVector(e),this.sub(Wc)}reflect(e){return this.sub(Wc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ju.prototype.isVector3=!0;var B=ju,Wc=new B,vh=new Un,Ju=class Ju{constructor(e,t,n,s,r,a,o,c,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u)}set(e,t,n,s,r,a,o,c,u){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],u=n[1],h=n[4],p=n[7],d=n[2],g=n[5],v=n[8],b=s[0],m=s[3],f=s[6],R=s[1],P=s[4],E=s[7],A=s[2],C=s[5],L=s[8];return r[0]=a*b+o*R+c*A,r[3]=a*m+o*P+c*C,r[6]=a*f+o*E+c*L,r[1]=u*b+h*R+p*A,r[4]=u*m+h*P+p*C,r[7]=u*f+h*E+p*L,r[2]=d*b+g*R+v*A,r[5]=d*m+g*P+v*C,r[8]=d*f+g*E+v*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8];return t*a*h-t*o*u-n*r*h+n*o*c+s*r*u-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8],p=h*a-o*u,d=o*c-h*r,g=u*r-a*c,v=t*p+n*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return e[0]=p*b,e[1]=(s*u-h*n)*b,e[2]=(o*n-s*a)*b,e[3]=d*b,e[4]=(h*t-s*c)*b,e[5]=(s*r-o*t)*b,e[6]=g*b,e[7]=(n*c-u*t)*b,e[8]=(a*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),u=Math.sin(r);return this.set(n*c,n*u,-n*(c*a+u*o)+a+e,-s*u,s*c,-s*(-u*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Xc.makeScale(e,t)),this}rotate(e){return Ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Xc.makeRotation(-e)),this}translate(e,t){return Ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ju.prototype.isMatrix3=!0;var lt=Ju,Xc=new lt,bh=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sh=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ag(){let i={enabled:!0,workingColorSpace:ea,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===wt&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===wt&&(s.r=hr(s.r),s.g=hr(s.g),s.b=hr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?ta:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ea]:{primaries:e,whitePoint:n,transfer:ta,toXYZ:bh,fromXYZ:Sh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:wt,toXYZ:bh,fromXYZ:Sh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}var vt=ag();function Ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ys,Fo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ys===void 0&&(Ys=ia("canvas")),Ys.width=e.width,Ys.height=e.height;let s=Ys.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ys}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ia("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ni(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},og=0,mr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=Di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($c(s[a].image)):r.push($c(s[a]))}else r=$c(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function $c(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}var lg=0,qc=new B,xn=class i extends si{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=fi,s=fi,r=nn,a=ss,o=Zn,c=Hn,u=i.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Di(),this.name="",this.source=new mr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qc).x}get height(){return this.source.getSize(qc).y}get depth(){return this.source.getSize(qc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Po:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Po:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Nu;xn.DEFAULT_ANISOTROPY=1;var Ku=class Ku{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,u=c[0],h=c[4],p=c[8],d=c[1],g=c[5],v=c[9],b=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-b)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+b)<.1&&Math.abs(v+m)<.1&&Math.abs(u+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let P=(u+1)/2,E=(g+1)/2,A=(f+1)/2,C=(h+d)/4,L=(p+b)/4,y=(v+m)/4;return P>E&&P>A?P<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(P),s=C/n,r=L/n):E>A?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=C/s,r=y/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=L/r,s=y/r),this.set(n,s,r,t),this}let R=Math.sqrt((m-v)*(m-v)+(p-b)*(p-b)+(d-h)*(d-h));return Math.abs(R)<.001&&(R=1),this.x=(m-v)/R,this.y=(p-b)/R,this.z=(d-h)/R,this.w=Math.acos((u+g+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ku.prototype.isVector4=!0;var It=Ku,Uo=class extends si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new xn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new mr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},On=class extends Uo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ra=class extends xn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oo=class extends xn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var sl=class sl{constructor(e,t,n,s,r,a,o,c,u,h,p,d,g,v,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u,h,p,d,g,v,b,m)}set(e,t,n,s,r,a,o,c,u,h,p,d,g,v,b,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=u,f[6]=h,f[10]=p,f[14]=d,f[3]=g,f[7]=v,f[11]=b,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Zs.setFromMatrixColumn(e,0).length(),r=1/Zs.setFromMatrixColumn(e,1).length(),a=1/Zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),u=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let d=a*h,g=a*p,v=o*h,b=o*p;t[0]=c*h,t[4]=-c*p,t[8]=u,t[1]=g+v*u,t[5]=d-b*u,t[9]=-o*c,t[2]=b-d*u,t[6]=v+g*u,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,g=c*p,v=u*h,b=u*p;t[0]=d+b*o,t[4]=v*o-g,t[8]=a*u,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=g*o-v,t[6]=b+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,g=c*p,v=u*h,b=u*p;t[0]=d-b*o,t[4]=-a*p,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*h,t[9]=b-d*o,t[2]=-a*u,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,g=a*p,v=o*h,b=o*p;t[0]=c*h,t[4]=v*u-g,t[8]=d*u+b,t[1]=c*p,t[5]=b*u+d,t[9]=g*u-v,t[2]=-u,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,g=a*u,v=o*c,b=o*u;t[0]=c*h,t[4]=b-d*p,t[8]=v*p+g,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-u*h,t[6]=g*p+v,t[10]=d-b*p}else if(e.order==="XZY"){let d=a*c,g=a*u,v=o*c,b=o*u;t[0]=c*h,t[4]=-p,t[8]=u*h,t[1]=d*p+b,t[5]=a*h,t[9]=g*p-v,t[2]=v*p-g,t[6]=o*h,t[10]=b*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cg,e,ug)}lookAt(e,t,n){let s=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Hi.crossVectors(n,Dn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Hi.crossVectors(n,Dn)),Hi.normalize(),Ya.crossVectors(Dn,Hi),s[0]=Hi.x,s[4]=Ya.x,s[8]=Dn.x,s[1]=Hi.y,s[5]=Ya.y,s[9]=Dn.y,s[2]=Hi.z,s[6]=Ya.z,s[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],u=n[12],h=n[1],p=n[5],d=n[9],g=n[13],v=n[2],b=n[6],m=n[10],f=n[14],R=n[3],P=n[7],E=n[11],A=n[15],C=s[0],L=s[4],y=s[8],I=s[12],z=s[1],D=s[5],O=s[9],ee=s[13],Q=s[2],H=s[6],te=s[10],j=s[14],oe=s[3],ce=s[7],me=s[11],ge=s[15];return r[0]=a*C+o*z+c*Q+u*oe,r[4]=a*L+o*D+c*H+u*ce,r[8]=a*y+o*O+c*te+u*me,r[12]=a*I+o*ee+c*j+u*ge,r[1]=h*C+p*z+d*Q+g*oe,r[5]=h*L+p*D+d*H+g*ce,r[9]=h*y+p*O+d*te+g*me,r[13]=h*I+p*ee+d*j+g*ge,r[2]=v*C+b*z+m*Q+f*oe,r[6]=v*L+b*D+m*H+f*ce,r[10]=v*y+b*O+m*te+f*me,r[14]=v*I+b*ee+m*j+f*ge,r[3]=R*C+P*z+E*Q+A*oe,r[7]=R*L+P*D+E*H+A*ce,r[11]=R*y+P*O+E*te+A*me,r[15]=R*I+P*ee+E*j+A*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],u=e[13],h=e[2],p=e[6],d=e[10],g=e[14],v=e[3],b=e[7],m=e[11],f=e[15],R=c*g-u*d,P=o*g-u*p,E=o*d-c*p,A=a*g-u*h,C=a*d-c*h,L=a*p-o*h;return t*(b*R-m*P+f*E)-n*(v*R-m*A+f*C)+s*(v*P-b*A+f*L)-r*(v*E-b*C+m*L)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],u=e[6],h=e[10];return t*(a*h-o*u)-n*(r*h-o*c)+s*(r*u-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],h=e[8],p=e[9],d=e[10],g=e[11],v=e[12],b=e[13],m=e[14],f=e[15],R=t*o-n*a,P=t*c-s*a,E=t*u-r*a,A=n*c-s*o,C=n*u-r*o,L=s*u-r*c,y=h*b-p*v,I=h*m-d*v,z=h*f-g*v,D=p*m-d*b,O=p*f-g*b,ee=d*f-g*m,Q=R*ee-P*O+E*D+A*z-C*I+L*y;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/Q;return e[0]=(o*ee-c*O+u*D)*H,e[1]=(s*O-n*ee-r*D)*H,e[2]=(b*L-m*C+f*A)*H,e[3]=(d*C-p*L-g*A)*H,e[4]=(c*z-a*ee-u*I)*H,e[5]=(t*ee-s*z+r*I)*H,e[6]=(m*E-v*L-f*P)*H,e[7]=(h*L-d*E+g*P)*H,e[8]=(a*O-o*z+u*y)*H,e[9]=(n*z-t*O-r*y)*H,e[10]=(v*C-b*E+f*R)*H,e[11]=(p*E-h*C-g*R)*H,e[12]=(o*I-a*D-c*y)*H,e[13]=(t*D-n*I+s*y)*H,e[14]=(b*P-v*A-m*R)*H,e[15]=(h*A-p*P+d*R)*H,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,u=r*a,h=r*o;return this.set(u*a+n,u*o-s*c,u*c+s*o,0,u*o+s*c,h*o+n,h*c-s*a,0,u*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,u=r+r,h=a+a,p=o+o,d=r*u,g=r*h,v=r*p,b=a*h,m=a*p,f=o*p,R=c*u,P=c*h,E=c*p,A=n.x,C=n.y,L=n.z;return s[0]=(1-(b+f))*A,s[1]=(g+E)*A,s[2]=(v-P)*A,s[3]=0,s[4]=(g-E)*C,s[5]=(1-(d+f))*C,s[6]=(m+R)*C,s[7]=0,s[8]=(v+P)*L,s[9]=(m-R)*L,s[10]=(1-(d+b))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Zs.set(s[0],s[1],s[2]).length(),o=Zs.set(s[4],s[5],s[6]).length(),c=Zs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Qn.copy(this);let u=1/a,h=1/o,p=1/c;return Qn.elements[0]*=u,Qn.elements[1]*=u,Qn.elements[2]*=u,Qn.elements[4]*=h,Qn.elements[5]*=h,Qn.elements[6]*=h,Qn.elements[8]*=p,Qn.elements[9]*=p,Qn.elements[10]*=p,t.setFromRotationMatrix(Qn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=ii,c=!1){let u=this.elements,h=2*r/(t-e),p=2*r/(n-s),d=(t+e)/(t-e),g=(n+s)/(n-s),v,b;if(c)v=r/(a-r),b=a*r/(a-r);else if(o===ii)v=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===na)v=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=h,u[4]=0,u[8]=d,u[12]=0,u[1]=0,u[5]=p,u[9]=g,u[13]=0,u[2]=0,u[6]=0,u[10]=v,u[14]=b,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ii,c=!1){let u=this.elements,h=2/(t-e),p=2/(n-s),d=-(t+e)/(t-e),g=-(n+s)/(n-s),v,b;if(c)v=1/(a-r),b=a/(a-r);else if(o===ii)v=-2/(a-r),b=-(a+r)/(a-r);else if(o===na)v=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=h,u[4]=0,u[8]=0,u[12]=d,u[1]=0,u[5]=p,u[9]=0,u[13]=g,u[2]=0,u[6]=0,u[10]=v,u[14]=b,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};sl.prototype.isMatrix4=!0;var Ut=sl,Zs=new B,Qn=new Ut,cg=new B(0,0,0),ug=new B(1,1,1),Hi=new B,Ya=new B,Dn=new B,Mh=new Ut,Eh=new Un,Zi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],u=s[5],h=s[9],p=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ut(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eh.setFromEuler(this),this.setFromQuaternion(Eh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zi.DEFAULT_ORDER="XYZ";var gr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},dg=0,wh=new B,js=new Un,Ti=new Ut,Za=new B,Gr=new B,hg=new B,fg=new Un,Ah=new B(1,0,0),Th=new B(0,1,0),Ch=new B(0,0,1),Rh={type:"added"},pg={type:"removed"},Js={type:"childadded",child:null},Yc={type:"childremoved",child:null},An=class i extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new Zi,n=new Un,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ut},normalMatrix:{value:new lt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(Ah,e)}rotateY(e){return this.rotateOnAxis(Th,e)}rotateZ(e){return this.rotateOnAxis(Ch,e)}translateOnAxis(e,t){return wh.copy(e).applyQuaternion(this.quaternion),this.position.add(wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ah,e)}translateY(e){return this.translateOnAxis(Th,e)}translateZ(e){return this.translateOnAxis(Ch,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Za.copy(e):Za.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Gr,Za,this.up):Ti.lookAt(Za,Gr,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),js.setFromRotationMatrix(Ti),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rh),Js.child=e,this.dispatchEvent(Js),Js.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pg),Yc.child=e,this.dispatchEvent(Yc),Yc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rh),Js.child=e,this.dispatchEvent(Js),Js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,fg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){let p=c[u];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),u=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let c=[];for(let u in o){let h=o[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};An.DEFAULT_UP=new B(0,1,0);An.DEFAULT_MATRIX_AUTO_UPDATE=!0;An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fn=class extends An{constructor(){super(),this.isGroup=!0,this.type="Group"}},mg={type:"move"},_r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,n),f=this._getHandJoint(u,b);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],d=h.position.distanceTo(p.position),g=.02,v=.005;u.inputState.pinching&&d>g+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=g-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},If={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},ja={h:0,s:0,l:0};function Zc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var xt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=vt.workingColorSpace){if(e=Wu(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Zc(a,r,e+1/3),this.g=Zc(a,r,e),this.b=Zc(a,r,e-1/3)}return vt.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){let n=If[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return vt.workingToColorSpace(dn.copy(this),e),Math.round(ut(dn.r*255,0,255))*65536+Math.round(ut(dn.g*255,0,255))*256+Math.round(ut(dn.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(dn.copy(this),t);let n=dn.r,s=dn.g,r=dn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,u,h=(o+a)/2;if(o===a)c=0,u=0;else{let p=a-o;switch(u=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=$t){vt.workingToColorSpace(dn.copy(this),e);let t=dn.r,n=dn.g,s=dn.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(ja);let n=Kr(Gi.h,ja.h,t),s=Kr(Gi.s,ja.s,t),r=Kr(Gi.l,ja.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},dn=new xt;xt.NAMES=If;var xr=class extends An{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zi,this.environmentIntensity=1,this.environmentRotation=new Zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ei=new B,Ci=new B,jc=new B,Ri=new B,Ks=new B,Qs=new B,Ih=new B,Jc=new B,Kc=new B,Qc=new B,eu=new It,tu=new It,nu=new It,Li=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ei.subVectors(e,t),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ei.subVectors(s,t),Ci.subVectors(n,t),jc.subVectors(e,t);let a=ei.dot(ei),o=ei.dot(Ci),c=ei.dot(jc),u=Ci.dot(Ci),h=Ci.dot(jc),p=a*u-o*o;if(p===0)return r.set(0,0,0),null;let d=1/p,g=(u*c-o*h)*d,v=(a*h-o*c)*d;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ri.x),c.addScaledVector(a,Ri.y),c.addScaledVector(o,Ri.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return eu.setScalar(0),tu.setScalar(0),nu.setScalar(0),eu.fromBufferAttribute(e,t),tu.fromBufferAttribute(e,n),nu.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(eu,r.x),a.addScaledVector(tu,r.y),a.addScaledVector(nu,r.z),a}static isFrontFacing(e,t,n,s){return ei.subVectors(n,t),Ci.subVectors(e,t),ei.cross(Ci).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ei.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ks.subVectors(s,n),Qs.subVectors(r,n),Jc.subVectors(e,n);let c=Ks.dot(Jc),u=Qs.dot(Jc);if(c<=0&&u<=0)return t.copy(n);Kc.subVectors(e,s);let h=Ks.dot(Kc),p=Qs.dot(Kc);if(h>=0&&p<=h)return t.copy(s);let d=c*p-h*u;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ks,a);Qc.subVectors(e,r);let g=Ks.dot(Qc),v=Qs.dot(Qc);if(v>=0&&g<=v)return t.copy(r);let b=g*u-c*v;if(b<=0&&u>=0&&v<=0)return o=u/(u-v),t.copy(n).addScaledVector(Qs,o);let m=h*v-g*p;if(m<=0&&p-h>=0&&g-v>=0)return Ih.subVectors(r,s),o=(p-h)/(p-h+(g-v)),t.copy(s).addScaledVector(Ih,o);let f=1/(m+b+d);return a=b*f,o=d*f,t.copy(n).addScaledVector(Ks,a).addScaledVector(Qs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Bn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ti):ti.fromBufferAttribute(r,a),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ja.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ja.copy(n.boundingBox)),Ja.applyMatrix4(e.matrixWorld),this.union(Ja)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wr),Ka.subVectors(this.max,Wr),er.subVectors(e.a,Wr),tr.subVectors(e.b,Wr),nr.subVectors(e.c,Wr),Wi.subVectors(tr,er),Xi.subVectors(nr,tr),_s.subVectors(er,nr);let t=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-_s.z,_s.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,_s.z,0,-_s.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-_s.y,_s.x,0];return!iu(t,er,tr,nr,Ka)||(t=[1,0,0,0,1,0,0,0,1],!iu(t,er,tr,nr,Ka))?!1:(Qa.crossVectors(Wi,Xi),t=[Qa.x,Qa.y,Qa.z],iu(t,er,tr,nr,Ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ii=[new B,new B,new B,new B,new B,new B,new B,new B],ti=new B,Ja=new Bn,er=new B,tr=new B,nr=new B,Wi=new B,Xi=new B,_s=new B,Wr=new B,Ka=new B,Qa=new B,xs=new B;function iu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xs.fromArray(i,r);let o=s.x*Math.abs(xs.x)+s.y*Math.abs(xs.y)+s.z*Math.abs(xs.z),c=e.dot(xs),u=t.dot(xs),h=n.dot(xs);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>o)return!1}return!0}var Ht=new B,eo=new Je,gg=0,wn=class extends si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=No,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==No&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var aa=class extends wn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var oa=class extends wn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Vt=class extends wn{constructor(e,t,n){super(new Float32Array(e),t,n)}},_g=new Bn,Xr=new B,su=new B,zn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):_g.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);let t=Xr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Xr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(su)),this.expandByPoint(Xr.copy(e.center).sub(su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xg=0,$n=new Ut,ru=new An,ir=new B,Nn=new Bn,$r=new Bn,Jt=new B,sn=class i extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hm(e)?oa:aa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,t,n){return $n.makeTranslation(e,t,n),this.applyMatrix4($n),this}scale(e,t,n){return $n.makeScale(e,t,n),this.applyMatrix4($n),this}lookAt(e){return ru.lookAt(e),ru.updateMatrix(),this.applyMatrix4(ru.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];$r.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(Nn.min,$r.min),Nn.expandByPoint(Jt),Jt.addVectors(Nn.max,$r.max),Nn.expandByPoint(Jt)):(Nn.expandByPoint($r.min),Nn.expandByPoint($r.max))}Nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let u=0,h=o.count;u<h;u++)Jt.fromBufferAttribute(o,u),c&&(ir.fromBufferAttribute(e,u),Jt.add(ir)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new wn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new B,c[y]=new B;let u=new B,h=new B,p=new B,d=new Je,g=new Je,v=new Je,b=new B,m=new B;function f(y,I,z){u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,I),p.fromBufferAttribute(n,z),d.fromBufferAttribute(r,y),g.fromBufferAttribute(r,I),v.fromBufferAttribute(r,z),h.sub(u),p.sub(u),g.sub(d),v.sub(d);let D=1/(g.x*v.y-v.x*g.y);isFinite(D)&&(b.copy(h).multiplyScalar(v.y).addScaledVector(p,-g.y).multiplyScalar(D),m.copy(p).multiplyScalar(g.x).addScaledVector(h,-v.x).multiplyScalar(D),o[y].add(b),o[I].add(b),o[z].add(b),c[y].add(m),c[I].add(m),c[z].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let y=0,I=R.length;y<I;++y){let z=R[y],D=z.start,O=z.count;for(let ee=D,Q=D+O;ee<Q;ee+=3)f(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}let P=new B,E=new B,A=new B,C=new B;function L(y){A.fromBufferAttribute(s,y),C.copy(A);let I=o[y];P.copy(I),P.sub(A.multiplyScalar(A.dot(I))).normalize(),E.crossVectors(C,I);let D=E.dot(c[y])<0?-1:1;a.setXYZW(y,P.x,P.y,P.z,D)}for(let y=0,I=R.length;y<I;++y){let z=R[y],D=z.start,O=z.count;for(let ee=D,Q=D+O;ee<Q;ee+=3)L(e.getX(ee+0)),L(e.getX(ee+1)),L(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);let s=new B,r=new B,a=new B,o=new B,c=new B,u=new B,h=new B,p=new B;if(e)for(let d=0,g=e.count;d<g;d+=3){let v=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,m),o.add(h),c.add(h),u.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,c){let u=o.array,h=o.itemSize,p=o.normalized,d=new u.constructor(c.length*h),g=0,v=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?g=c[b]*o.data.stride+o.offset:g=c[b]*h;for(let f=0;f<h;f++)d[v++]=u[g++]}return new wn(d,h,p)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],u=e(c,n);t.setAttribute(o,u)}let r=this.morphAttributes;for(let o in r){let c=[],u=r[o];for(let h=0,p=u.length;h<p;h++){let d=u[h],g=e(d,n);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let u=n[c];e.data.attributes[c]=u.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let u=this.morphAttributes[c],h=[];for(let p=0,d=u.length;p<d;p++){let g=u[p];h.push(g.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let u in s){let h=s[u];this.setAttribute(u,h.clone(t))}let r=e.morphAttributes;for(let u in r){let h=[],p=r[u];for(let d=0,g=p.length;d<g;d++)h.push(p[d].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let u=0,h=a.length;u<h;u++){let p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},la=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=No,this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},_n=new B,kn=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){sa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){sa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yg=0,Ui=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=Ms,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=Mo,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xt(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(n.blending=this.blending),this.side!==Fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==So&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==Yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new xt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Je().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Je().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ws=class extends Ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},sr,qr=new B,rr=new B,ar=new B,or=new Je,Yr=new Je,Pf=new Ut,to=new B,Zr=new B,no=new B,Ph=new Je,au=new Je,Lh=new Je,As=class extends An{constructor(e=new ws){if(super(),this.isSprite=!0,this.type="Sprite",sr===void 0){sr=new sn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new la(t,5);sr.setIndex([0,1,2,0,2,3]),sr.setAttribute("position",new kn(n,3,0,!1)),sr.setAttribute("uv",new kn(n,2,3,!1))}this.geometry=sr,this.material=e,this.center=new Je(.5,.5),this.count=1}raycast(e,t){e.camera===null&&nt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rr.setFromMatrixScale(this.matrixWorld),Pf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rr.multiplyScalar(-ar.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;io(to.set(-.5,-.5,0),ar,a,rr,s,r),io(Zr.set(.5,-.5,0),ar,a,rr,s,r),io(no.set(.5,.5,0),ar,a,rr,s,r),Ph.set(0,0),au.set(1,0),Lh.set(1,1);let o=e.ray.intersectTriangle(to,Zr,no,!1,qr);if(o===null&&(io(Zr.set(-.5,.5,0),ar,a,rr,s,r),au.set(0,1),o=e.ray.intersectTriangle(to,no,Zr,!1,qr),o===null))return;let c=e.ray.origin.distanceTo(qr);c<e.near||c>e.far||t.push({distance:c,point:qr.clone(),uv:Li.getInterpolation(qr,to,Zr,no,Ph,au,Lh,new Je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function io(i,e,t,n,s,r){or.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Yr.x=r*or.x-s*or.y,Yr.y=s*or.x+r*or.y):Yr.copy(or),i.copy(e),i.x+=Yr.x,i.y+=Yr.y,i.applyMatrix4(Pf)}var Pi=new B,ou=new B,so=new B,$i=new B,lu=new B,ro=new B,cu=new B,ji=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ou.copy(e).add(t).multiplyScalar(.5),so.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(ou);let r=e.distanceTo(t)*.5,a=-this.direction.dot(so),o=$i.dot(this.direction),c=-$i.dot(so),u=$i.lengthSq(),h=Math.abs(1-a*a),p,d,g,v;if(h>0)if(p=a*c-o,d=a*o-c,v=r*h,p>=0)if(d>=-v)if(d<=v){let b=1/h;p*=b,d*=b,g=p*(p+a*d+2*o)+d*(a*p+d+2*c)+u}else d=r,p=Math.max(0,-(a*d+o)),g=-p*p+d*(d+2*c)+u;else d=-r,p=Math.max(0,-(a*d+o)),g=-p*p+d*(d+2*c)+u;else d<=-v?(p=Math.max(0,-(-a*r+o)),d=p>0?-r:Math.min(Math.max(-r,-c),r),g=-p*p+d*(d+2*c)+u):d<=v?(p=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+u):(p=Math.max(0,-(a*r+o)),d=p>0?r:Math.min(Math.max(-r,-c),r),g=-p*p+d*(d+2*c)+u);else d=a>0?-r:r,p=Math.max(0,-(a*d+o)),g=-p*p+d*(d+2*c)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(ou).addScaledVector(so,d),g}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);let n=Pi.dot(this.direction),s=Pi.dot(Pi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,u=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,s=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,s=(e.min.x-d.x)*u),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,s,r){lu.subVectors(t,e),ro.subVectors(n,e),cu.crossVectors(lu,ro);let a=this.direction.dot(cu),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,e);let c=o*this.direction.dot(ro.crossVectors($i,ro));if(c<0)return null;let u=o*this.direction.dot(lu.cross($i));if(u<0||c+u>a)return null;let h=-o*$i.dot(cu);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ts=class extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zi,this.combine=Au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Dh=new Ut,ys=new ji,ao=new zn,Nh=new B,oo=new B,lo=new B,co=new B,uu=new B,uo=new B,Fh=new B,ho=new B,rn=class extends An{constructor(e=new sn,t=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){uo.set(0,0,0);for(let c=0,u=r.length;c<u;c++){let h=o[c],p=r[c];h!==0&&(uu.fromBufferAttribute(p,e),a?uo.addScaledVector(uu,h):uo.addScaledVector(uu.sub(t),h))}t.add(uo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(r),ys.copy(e.ray).recast(e.near),!(ao.containsPoint(ys.origin)===!1&&(ys.intersectSphere(ao,Nh)===null||ys.origin.distanceToSquared(Nh)>(e.far-e.near)**2))&&(Dh.copy(r).invert(),ys.copy(e.ray).applyMatrix4(Dh),!(n.boundingBox!==null&&ys.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ys)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,u=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,b=d.length;v<b;v++){let m=d[v],f=a[m.materialIndex],R=Math.max(m.start,g.start),P=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let E=R,A=P;E<A;E+=3){let C=o.getX(E),L=o.getX(E+1),y=o.getX(E+2);s=fo(this,f,e,n,u,h,p,C,L,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),b=Math.min(o.count,g.start+g.count);for(let m=v,f=b;m<f;m+=3){let R=o.getX(m),P=o.getX(m+1),E=o.getX(m+2);s=fo(this,a,e,n,u,h,p,R,P,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,b=d.length;v<b;v++){let m=d[v],f=a[m.materialIndex],R=Math.max(m.start,g.start),P=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let E=R,A=P;E<A;E+=3){let C=E,L=E+1,y=E+2;s=fo(this,f,e,n,u,h,p,C,L,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),b=Math.min(c.count,g.start+g.count);for(let m=v,f=b;m<f;m+=3){let R=m,P=m+1,E=m+2;s=fo(this,a,e,n,u,h,p,R,P,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function vg(i,e,t,n,s,r,a,o){let c;if(e.side===vn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Fi,o),c===null)return null;ho.copy(o),ho.applyMatrix4(i.matrixWorld);let u=t.ray.origin.distanceTo(ho);return u<t.near||u>t.far?null:{distance:u,point:ho.clone(),object:i}}function fo(i,e,t,n,s,r,a,o,c,u){i.getVertexPosition(o,oo),i.getVertexPosition(c,lo),i.getVertexPosition(u,co);let h=vg(i,e,t,n,oo,lo,co,Fh);if(h){let p=new B;Li.getBarycoord(Fh,oo,lo,co,p),s&&(h.uv=Li.getInterpolatedAttribute(s,o,c,u,p,new Je)),r&&(h.uv1=Li.getInterpolatedAttribute(r,o,c,u,p,new Je)),a&&(h.normal=Li.getInterpolatedAttribute(a,o,c,u,p,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:u,normal:new B,materialIndex:0};Li.getNormal(oo,lo,co,d.normal),h.face=d,h.barycoord=p}return h}var Bo=class extends xn{constructor(e=null,t=1,n=1,s,r,a,o,c,u=Kt,h=Kt,p,d){super(null,a,o,c,u,h,s,r,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var du=new B,bg=new B,Sg=new lt,qn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=du.subVectors(n,t).cross(bg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(du),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Sg.getNormalMatrix(e),s=this.coplanarPoint(du).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},vs=new zn,Mg=new Je(.5,.5),po=new B,ca=class{constructor(e=new qn,t=new qn,n=new qn,s=new qn,r=new qn,a=new qn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ii,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],u=r[3],h=r[4],p=r[5],d=r[6],g=r[7],v=r[8],b=r[9],m=r[10],f=r[11],R=r[12],P=r[13],E=r[14],A=r[15];if(s[0].setComponents(u-a,g-h,f-v,A-R).normalize(),s[1].setComponents(u+a,g+h,f+v,A+R).normalize(),s[2].setComponents(u+o,g+p,f+b,A+P).normalize(),s[3].setComponents(u-o,g-p,f-b,A-P).normalize(),n)s[4].setComponents(c,d,m,E).normalize(),s[5].setComponents(u-c,g-d,f-m,A-E).normalize();else if(s[4].setComponents(u-c,g-d,f-m,A-E).normalize(),t===ii)s[5].setComponents(u+c,g+d,f+m,A+E).normalize();else if(t===na)s[5].setComponents(c,d,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(e){vs.center.set(0,0,0);let t=Mg.distanceTo(e.center);return vs.radius=.7071067811865476+t,vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(po.x=s.normal.x>0?e.max.x:e.min.x,po.y=s.normal.y>0?e.max.y:e.min.y,po.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yr=class extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zo=new B,ko=new B,Uh=new Ut,jr=new ji,mo=new zn,hu=new B,Oh=new B,Vo=class extends An{constructor(e=new sn,t=new yr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)zo.fromBufferAttribute(t,s-1),ko.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=zo.distanceTo(ko);e.setAttribute("lineDistance",new Vt(n,1))}else Qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(s),mo.radius+=r,e.ray.intersectsSphere(mo)===!1)return;Uh.copy(s).invert(),jr.copy(e.ray).applyMatrix4(Uh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let g=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let b=g,m=v-1;b<m;b+=u){let f=h.getX(b),R=h.getX(b+1),P=go(this,e,jr,c,f,R,b);P&&t.push(P)}if(this.isLineLoop){let b=h.getX(v-1),m=h.getX(g),f=go(this,e,jr,c,b,m,v-1);f&&t.push(f)}}else{let g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let b=g,m=v-1;b<m;b+=u){let f=go(this,e,jr,c,b,b+1,b);f&&t.push(f)}if(this.isLineLoop){let b=go(this,e,jr,c,v-1,g,v-1);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function go(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(zo.fromBufferAttribute(o,s),ko.fromBufferAttribute(o,r),t.distanceSqToSegment(zo,ko,hu,Oh)>n)return;hu.applyMatrix4(i.matrixWorld);let u=e.ray.origin.distanceTo(hu);if(!(u<e.near||u>e.far))return{distance:u,point:Oh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Bh=new B,zh=new B,ua=class extends Vo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bh.fromBufferAttribute(t,s),zh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bh.distanceTo(zh);e.setAttribute("lineDistance",new Vt(n,1))}else Qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var da=class extends xn{constructor(e=[],t=is,n,s,r,a,o,c,u,h){super(e,t,n,s,r,a,o,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cs=class extends xn{constructor(e,t,n,s,r,a,o,c,u){super(e,t,n,s,r,a,o,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Oi=class extends xn{constructor(e,t,n=ai,s,r,a,o=Kt,c=Kt,u,h=pi,p=1){if(h!==pi&&h!==rs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:p};super(d,s,r,a,o,c,h,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ho=class extends Oi{constructor(e,t=ai,n=is,s,r,a=Kt,o=Kt,c,u=pi){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,u),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ha=class extends xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},vr=class i extends sn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],u=[],h=[],p=[],d=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(p,2));function v(b,m,f,R,P,E,A,C,L,y,I){let z=E/L,D=A/y,O=E/2,ee=A/2,Q=C/2,H=L+1,te=y+1,j=0,oe=0,ce=new B;for(let me=0;me<te;me++){let ge=me*D-ee;for(let Me=0;Me<H;Me++){let ke=Me*z-O;ce[b]=ke*R,ce[m]=ge*P,ce[f]=Q,u.push(ce.x,ce.y,ce.z),ce[b]=0,ce[m]=0,ce[f]=C>0?1:-1,h.push(ce.x,ce.y,ce.z),p.push(Me/L),p.push(1-me/y),j+=1}}for(let me=0;me<y;me++)for(let ge=0;ge<L;ge++){let Me=d+ge+H*me,ke=d+ge+H*(me+1),Be=d+(ge+1)+H*(me+1),he=d+(ge+1)+H*me;c.push(Me,ke,he),c.push(ke,Be,he),oe+=6}o.addGroup(g,oe,I),g+=oe,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Rs=class i extends sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),u=o+1,h=c+1,p=e/o,d=t/c,g=[],v=[],b=[],m=[];for(let f=0;f<h;f++){let R=f*d-a;for(let P=0;P<u;P++){let E=P*p-r;v.push(E,-R,0),b.push(0,0,1),m.push(P/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let R=0;R<o;R++){let P=R+u*f,E=R+u*(f+1),A=R+1+u*(f+1),C=R+1+u*f;g.push(P,E,C),g.push(E,A,C)}this.setIndex(g),this.setAttribute("position",new Vt(v,3)),this.setAttribute("normal",new Vt(b,3)),this.setAttribute("uv",new Vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var fa=class extends sn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new B,r=new B;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let u=0,h=c.length;u<h;++u){let p=c[u],d=p.start,g=p.count;for(let v=d,b=d+g;v<b;v+=3)for(let m=0;m<3;m++){let f=o.getX(v+m),R=o.getX(v+(m+1)%3);s.fromBufferAttribute(a,f),r.fromBufferAttribute(a,R),kh(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let u=0;u<3;u++){let h=3*o+u,p=3*o+(u+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,p),kh(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Vt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function kh(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Ls(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Vh(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Vh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function hn(i){let e={};for(let t=0;t<i.length;t++){let n=Ls(i[t]);for(let s in n)e[s]=n[s]}return e}function Vh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Eg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}var Ra={clone:Ls,merge:hn},wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ag=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yn=class extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wg,this.fragmentShader=Ag,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ls(e.uniforms),this.uniformsGroups=Eg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new xt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Je().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Go=class extends yn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Wo=class extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xo=class extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _o(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Ji=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},$o=class extends Ji{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mu,endingEnd:mu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case gu:r=e,o=2*t-n;break;case _u:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case gu:a=e,c=2*n-t;break;case _u:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let u=(n-t)*.5,h=this.valueSize;this._weightPrev=u/(t-o),this._weightNext=u/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,g=this._weightNext,v=(n-t)/(s-t),b=v*v,m=b*v,f=-d*m+2*d*b-d*v,R=(1+d)*m+(-1.5-2*d)*b+(-.5+d)*v+1,P=(-1-g)*m+(1.5+g)*b+.5*v,E=g*m-g*b;for(let A=0;A!==o;++A)r[A]=f*a[h+A]+R*a[u+A]+P*a[c+A]+E*a[p+A];return r}},qo=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,h=(n-t)/(s-t),p=1-h;for(let d=0;d!==o;++d)r[d]=a[u+d]*p+a[c+d]*h;return r}},Yo=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Zo=class extends Ji{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let v=(n-t)/(s-t),b=1-v;for(let m=0;m!==o;++m)r[m]=a[u+m]*b+a[c+m]*v;return r}let d=o*2,g=e-1;for(let v=0;v!==o;++v){let b=a[u+v],m=a[c+v],f=g*d+v*2,R=p[f],P=p[f+1],E=e*d+v*2,A=h[E],C=h[E+1],L=(n-t)/(s-t),y,I,z,D,O;for(let ee=0;ee<8;ee++){y=L*L,I=y*L,z=1-L,D=z*z,O=D*z;let H=O*t+3*D*L*R+3*z*y*A+I*s-n;if(Math.abs(H)<1e-10)break;let te=3*D*(R-t)+6*z*L*(A-R)+3*y*(s-A);if(Math.abs(te)<1e-10)break;L=L-H/te,L=Math.max(0,Math.min(1,L))}r[v]=O*b+3*D*L*P+3*z*y*C+I*m}return r}},Vn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_o(t,this.TimeBufferType),this.values=_o(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_o(e.times,Array),values:_o(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Zo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Qr:t=this.InterpolantFactoryMethodDiscrete;break;case Do:t=this.InterpolantFactoryMethodLinear;break;case bo:t=this.InterpolantFactoryMethodSmooth;break;case pu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Qe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qr;case this.InterpolantFactoryMethodLinear:return Do;case this.InterpolantFactoryMethodSmooth:return bo;case this.InterpolantFactoryMethodBezier:return pu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(nt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(nt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){nt("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){nt("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Gm(s))for(let o=0,c=s.length;o!==c;++o){let u=s[o];if(isNaN(u)){nt("KeyframeTrack: Value is not a valid number.",this,o,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,u=e[o],h=e[o+1];if(u!==h&&(o!==1||u!==e[0]))if(s)c=!0;else{let p=o*n,d=p-n,g=p+n;for(let v=0;v!==n;++v){let b=t[p+v];if(b!==t[d+v]||b!==t[g+v]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let p=o*n,d=a*n;for(let g=0;g!==n;++g)t[d+g]=t[p+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,u=0;u!==n;++u)t[c+u]=t[o+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Vn.prototype.ValueTypeName="";Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=Do;var Ki=class extends Vn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Qr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}};jo.prototype.ValueTypeName="color";var Jo=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}};Jo.prototype.ValueTypeName="number";var Ko=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),u=e*o;for(let h=u+o;u!==h;u+=4)Un.slerpFlat(r,0,a,u-o,a,u,c);return r}},pa=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}};pa.prototype.ValueTypeName="quaternion";pa.prototype.InterpolantFactoryMethodSmooth=void 0;var Qi=class extends Vn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="string";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Qr;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Qo=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}};Qo.prototype.ValueTypeName="vector";var el=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,p){return u.push(h,p),this},this.removeHandler=function(h){let p=u.indexOf(h);return p!==-1&&u.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=u.length;p<d;p+=2){let g=u[p],v=u[p+1];if(g.global&&(g.lastIndex=0),g.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Lf=new el,tl=class{constructor(e){this.manager=e!==void 0?e:Lf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};tl.DEFAULT_MATERIAL_NAME="__DEFAULT";var xo=new B,yo=new Un,hi=new B,ma=class extends An{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xo,yo,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,yo,hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xo,yo,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,yo,hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new B,Hh=new Je,Gh=new Je,tn=class extends ma{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,Hh,Gh),t.subVectors(Gh,Hh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/u,s*=a.width/c,n*=a.height/u}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Is=class extends ma{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ga=class extends sn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var lr=-90,cr=1,nl=class extends An{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(lr,cr,e,t);s.layers=this.layers,this.add(s);let r=new tn(lr,cr,e,t);r.layers=this.layers,this.add(r);let a=new tn(lr,cr,e,t);a.layers=this.layers,this.add(a);let o=new tn(lr,cr,e,t);o.layers=this.layers,this.add(o);let c=new tn(lr,cr,e,t);c.layers=this.layers,this.add(c);let u=new tn(lr,cr,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let u of t)this.remove(u);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,u,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},il=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var $u="\\[\\]\\.:\\/",Tg=new RegExp("["+$u+"]","g"),qu="[^"+$u+"]",Cg="[^"+$u.replace("\\.","")+"]",Rg=/((?:WC+[\/:])*)/.source.replace("WC",qu),Ig=/(WCOD+)?/.source.replace("WCOD",Cg),Pg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qu),Lg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qu),Dg=new RegExp("^"+Rg+Ig+Pg+Lg+"$"),Ng=["material","materials","bones","map"],yu=class{constructor(e,t,n){let s=n||Ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Tg,"")}static parseTrackName(e){let t=Dg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ng.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===u){u=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}let a=e[s];if(a===void 0){let u=t.nodeName;nt("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ot.Composite=yu;Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray];Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eb=new Float32Array(1);var es=class extends la{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Wh=new Ut,_a=class{constructor(e,t,n=0,s=1/0){this.ray=new ji(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new gr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):nt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Wh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wh),this}intersectObject(e,t=!0,n=[]){return vu(e,this,n,t),n.sort(Xh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)vu(e[s],this,n,t);return n.sort(Xh),n}};function Xh(i,e){return i.distance-e.distance}function vu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)vu(r[a],e,t,!0)}}var br=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Qu=class Qu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Qu.prototype.isMatrix2=!0;var bu=Qu;var $h=new B,vo=new B,ur=new B,dr=new B,fu=new B,Fg=new B,Ug=new B,xa=class{constructor(e=new B,t=new B){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){$h.subVectors(e,this.start),vo.subVectors(this.end,this.start);let n=vo.dot(vo);if(n===0)return 0;let r=vo.dot($h)/n;return t&&(r=ut(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Fg,n=Ug){let s=10000000000000001e-32,r,a,o=this.start,c=e.start,u=this.end,h=e.end;ur.subVectors(u,o),dr.subVectors(h,c),fu.subVectors(o,c);let p=ur.dot(ur),d=dr.dot(dr),g=dr.dot(fu);if(p<=s&&d<=s)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(p<=s)r=0,a=g/d,a=ut(a,0,1);else{let v=ur.dot(fu);if(d<=s)a=0,r=ut(-v/p,0,1);else{let b=ur.dot(dr),m=p*d-b*b;m!==0?r=ut((b*g-v*d)/m,0,1):r=0,a=(b*r+g)/d,a<0?(a=0,r=ut(-v/p,0,1)):a>1&&(a=1,r=ut((b-v)/p,0,1))}}return t.copy(o).addScaledVector(ur,r),n.copy(c).addScaledVector(dr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var ya=class extends si{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Qe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Yu(i,e,t,n){let s=Og(n);switch(t){case zu:return i*e;case Vu:return i*e/s.components*s.byteLength;case dl:return i*e/s.components*s.byteLength;case as:return i*e*2/s.components*s.byteLength;case hl:return i*e*2/s.components*s.byteLength;case ku:return i*e*3/s.components*s.byteLength;case Zn:return i*e*4/s.components*s.byteLength;case fl:return i*e*4/s.components*s.byteLength;case Ma:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wa:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:case _l:return Math.max(i,16)*Math.max(e,8)/4;case pl:case gl:return Math.max(i,8)*Math.max(e,8)/2;case xl:case yl:case bl:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vl:case Ta:case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bl:case zl:case kl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ca:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Og(i){switch(i){case Hn:case Fu:return{byteLength:1,components:1};case Mr:case Uu:case gi:return{byteLength:2,components:1};case cl:case ul:return{byteLength:2,components:4};case ai:case ll:case oi:return{byteLength:4,components:1};case Ou:case Bu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function tp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function zg(i){let e=new WeakMap;function t(o,c){let u=o.array,h=o.usage,p=u.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,u,h),o.onUploadCallback();let g;if(u instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)g=i.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=i.SHORT;else if(u instanceof Uint32Array)g=i.UNSIGNED_INT;else if(u instanceof Int32Array)g=i.INT;else if(u instanceof Int8Array)g=i.BYTE;else if(u instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,c,u){let h=c.array,p=c.updateRanges;if(i.bindBuffer(u,o),p.length===0)i.bufferSubData(u,0,h);else{p.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<p.length;g++){let v=p[d],b=p[g];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++d,p[d]=b)}p.length=d+1;for(let g=0,v=p.length;g<v;g++){let b=p[g];i.bufferSubData(u,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let u=e.get(o);if(u===void 0)e.set(o,t(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,c),u.version=o.version}}return{get:s,remove:r,update:a}}var kg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vg=`#ifdef USE_ALPHAHASH
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
#endif`,Hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$g=`#ifdef USE_AOMAP
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
#endif`,qg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yg=`#ifdef USE_BATCHING
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
#endif`,Zg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
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
#endif`,e_=`#ifdef USE_BUMPMAP
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
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,c_=`#define PI 3.141592653589793
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
} // validated`,u_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,d_=`vec3 transformedNormal = objectNormal;
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
#endif`,h_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,f_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g_="gl_FragColor = linearToOutputTexel( gl_FragColor );",__=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,x_=`#ifdef USE_ENVMAP
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
#endif`,y_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,v_=`#ifdef USE_ENVMAP
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
#endif`,b_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S_=`#ifdef USE_ENVMAP
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
#endif`,M_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,E_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,w_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,T_=`#ifdef USE_GRADIENTMAP
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
}`,C_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,L_=`#ifdef USE_ENVMAP
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
#endif`,D_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,U_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O_=`PhysicalMaterial material;
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
#endif`,B_=`uniform sampler2D dfgLUT;
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
}`,z_=`
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
#endif`,k_=`#if defined( RE_IndirectDiffuse )
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
#endif`,V_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,H_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,G_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,q_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Z_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,j_=`#if defined( USE_POINTS_UV )
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
#endif`,J_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,t0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n0=`#ifdef USE_MORPHTARGETS
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
#endif`,i0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,r0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,c0=`#ifdef USE_NORMALMAP
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
#endif`,u0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,d0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,f0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,p0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,m0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,g0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,x0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,y0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,v0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,b0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,E0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,w0=`float getShadowMask() {
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
}`,A0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T0=`#ifdef USE_SKINNING
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
#endif`,C0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,R0=`#ifdef USE_SKINNING
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
#endif`,I0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,P0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,L0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,N0=`#ifdef USE_TRANSMISSION
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
#endif`,F0=`#ifdef USE_TRANSMISSION
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
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,k0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,V0=`uniform sampler2D t2D;
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
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`#include <common>
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
}`,q0=`#if DEPTH_PACKING == 3200
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
}`,Y0=`#define DISTANCE
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
}`,Z0=`#define DISTANCE
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
}`,j0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K0=`uniform float scale;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,ex=`#include <common>
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
}`,tx=`uniform vec3 diffuse;
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
}`,nx=`#define LAMBERT
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
}`,ix=`#define LAMBERT
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
}`,sx=`#define MATCAP
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
}`,rx=`#define MATCAP
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
}`,ax=`#define NORMAL
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
}`,ox=`#define NORMAL
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
}`,lx=`#define PHONG
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
}`,cx=`#define PHONG
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
}`,ux=`#define STANDARD
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
}`,dx=`#define STANDARD
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
}`,hx=`#define TOON
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
}`,fx=`#define TOON
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
}`,px=`uniform float size;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,_x=`uniform vec3 color;
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
}`,xx=`uniform float rotation;
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
}`,yx=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:kg,alphahash_pars_fragment:Vg,alphamap_fragment:Hg,alphamap_pars_fragment:Gg,alphatest_fragment:Wg,alphatest_pars_fragment:Xg,aomap_fragment:$g,aomap_pars_fragment:qg,batching_pars_vertex:Yg,batching_vertex:Zg,begin_vertex:jg,beginnormal_vertex:Jg,bsdfs:Kg,iridescence_fragment:Qg,bumpmap_pars_fragment:e_,clipping_planes_fragment:t_,clipping_planes_pars_fragment:n_,clipping_planes_pars_vertex:i_,clipping_planes_vertex:s_,color_fragment:r_,color_pars_fragment:a_,color_pars_vertex:o_,color_vertex:l_,common:c_,cube_uv_reflection_fragment:u_,defaultnormal_vertex:d_,displacementmap_pars_vertex:h_,displacementmap_vertex:f_,emissivemap_fragment:p_,emissivemap_pars_fragment:m_,colorspace_fragment:g_,colorspace_pars_fragment:__,envmap_fragment:x_,envmap_common_pars_fragment:y_,envmap_pars_fragment:v_,envmap_pars_vertex:b_,envmap_physical_pars_fragment:L_,envmap_vertex:S_,fog_vertex:M_,fog_pars_vertex:E_,fog_fragment:w_,fog_pars_fragment:A_,gradientmap_pars_fragment:T_,lightmap_pars_fragment:C_,lights_lambert_fragment:R_,lights_lambert_pars_fragment:I_,lights_pars_begin:P_,lights_toon_fragment:D_,lights_toon_pars_fragment:N_,lights_phong_fragment:F_,lights_phong_pars_fragment:U_,lights_physical_fragment:O_,lights_physical_pars_fragment:B_,lights_fragment_begin:z_,lights_fragment_maps:k_,lights_fragment_end:V_,lightprobes_pars_fragment:H_,logdepthbuf_fragment:G_,logdepthbuf_pars_fragment:W_,logdepthbuf_pars_vertex:X_,logdepthbuf_vertex:$_,map_fragment:q_,map_pars_fragment:Y_,map_particle_fragment:Z_,map_particle_pars_fragment:j_,metalnessmap_fragment:J_,metalnessmap_pars_fragment:K_,morphinstance_vertex:Q_,morphcolor_vertex:e0,morphnormal_vertex:t0,morphtarget_pars_vertex:n0,morphtarget_vertex:i0,normal_fragment_begin:s0,normal_fragment_maps:r0,normal_pars_fragment:a0,normal_pars_vertex:o0,normal_vertex:l0,normalmap_pars_fragment:c0,clearcoat_normal_fragment_begin:u0,clearcoat_normal_fragment_maps:d0,clearcoat_pars_fragment:h0,iridescence_pars_fragment:f0,opaque_fragment:p0,packing:m0,premultiplied_alpha_fragment:g0,project_vertex:_0,dithering_fragment:x0,dithering_pars_fragment:y0,roughnessmap_fragment:v0,roughnessmap_pars_fragment:b0,shadowmap_pars_fragment:S0,shadowmap_pars_vertex:M0,shadowmap_vertex:E0,shadowmask_pars_fragment:w0,skinbase_vertex:A0,skinning_pars_vertex:T0,skinning_vertex:C0,skinnormal_vertex:R0,specularmap_fragment:I0,specularmap_pars_fragment:P0,tonemapping_fragment:L0,tonemapping_pars_fragment:D0,transmission_fragment:N0,transmission_pars_fragment:F0,uv_pars_fragment:U0,uv_pars_vertex:O0,uv_vertex:B0,worldpos_vertex:z0,background_vert:k0,background_frag:V0,backgroundCube_vert:H0,backgroundCube_frag:G0,cube_vert:W0,cube_frag:X0,depth_vert:$0,depth_frag:q0,distance_vert:Y0,distance_frag:Z0,equirect_vert:j0,equirect_frag:J0,linedashed_vert:K0,linedashed_frag:Q0,meshbasic_vert:ex,meshbasic_frag:tx,meshlambert_vert:nx,meshlambert_frag:ix,meshmatcap_vert:sx,meshmatcap_frag:rx,meshnormal_vert:ax,meshnormal_frag:ox,meshphong_vert:lx,meshphong_frag:cx,meshphysical_vert:ux,meshphysical_frag:dx,meshtoon_vert:hx,meshtoon_frag:fx,points_vert:px,points_frag:mx,shadow_vert:gx,shadow_frag:_x,sprite_vert:xx,sprite_frag:yx},Le={common:{diffuse:{value:new xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new xt(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},bn={basic:{uniforms:hn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:hn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new xt(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:hn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new xt(0)},specular:{value:new xt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:hn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:hn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new xt(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:hn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:hn([Le.points,Le.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:hn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:hn([Le.common,Le.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:hn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:hn([Le.sprite,Le.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:hn([Le.common,Le.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:hn([Le.lights,Le.fog,{color:{value:new xt(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};bn.physical={uniforms:hn([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new xt(0)},specularColor:{value:new xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};var $l={r:0,b:0,g:0},vx=new Ut,np=new lt;np.set(-1,0,0,0,1,0,0,0,1);function bx(i,e,t,n,s,r){let a=new xt(0),o=s===!0?0:1,c,u,h=null,p=0,d=null;function g(R){let P=R.isScene===!0?R.background:null;if(P&&P.isTexture){let E=R.backgroundBlurriness>0;P=e.get(P,E)}return P}function v(R){let P=!1,E=g(R);E===null?m(a,o):E&&E.isColor&&(m(E,1),P=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||P)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(R,P){let E=g(P);E&&(E.isCubeTexture||E.mapping===ba)?(u===void 0&&(u=new rn(new vr(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:Ls(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),u.material.uniforms.envMap.value=E,u.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(vx.makeRotationFromEuler(P.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(np),u.material.toneMapped=vt.getTransfer(E.colorSpace)!==wt,(h!==E||p!==E.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=E,p=E.version,d=i.toneMapping),u.layers.enableAll(),R.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new rn(new Rs(2,2),new yn({name:"BackgroundMaterial",uniforms:Ls(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.toneMapped=vt.getTransfer(E.colorSpace)!==wt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||p!==E.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=E,p=E.version,d=i.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null))}function m(R,P){R.getRGB($l,Xu(i)),t.buffers.color.setClear($l.r,$l.g,$l.b,P,r)}function f(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,P=1){a.set(R),o=P,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(R){o=R,m(a,o)},render:v,addToRenderList:b,dispose:f}}function Sx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(D,O,ee,Q,H){let te=!1,j=p(D,Q,ee,O);r!==j&&(r=j,u(r.object)),te=g(D,Q,ee,H),te&&v(D,Q,ee,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,E(D,O,ee,Q),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function u(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function p(D,O,ee,Q){let H=Q.wireframe===!0,te=n[O.id];te===void 0&&(te={},n[O.id]=te);let j=D.isInstancedMesh===!0?D.id:0,oe=te[j];oe===void 0&&(oe={},te[j]=oe);let ce=oe[ee.id];ce===void 0&&(ce={},oe[ee.id]=ce);let me=ce[H];return me===void 0&&(me=d(c()),ce[H]=me),me}function d(D){let O=[],ee=[],Q=[];for(let H=0;H<t;H++)O[H]=0,ee[H]=0,Q[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:ee,attributeDivisors:Q,object:D,attributes:{},index:null}}function g(D,O,ee,Q){let H=r.attributes,te=O.attributes,j=0,oe=ee.getAttributes();for(let ce in oe)if(oe[ce].location>=0){let ge=H[ce],Me=te[ce];if(Me===void 0&&(ce==="instanceMatrix"&&D.instanceMatrix&&(Me=D.instanceMatrix),ce==="instanceColor"&&D.instanceColor&&(Me=D.instanceColor)),ge===void 0||ge.attribute!==Me||Me&&ge.data!==Me.data)return!0;j++}return r.attributesNum!==j||r.index!==Q}function v(D,O,ee,Q){let H={},te=O.attributes,j=0,oe=ee.getAttributes();for(let ce in oe)if(oe[ce].location>=0){let ge=te[ce];ge===void 0&&(ce==="instanceMatrix"&&D.instanceMatrix&&(ge=D.instanceMatrix),ce==="instanceColor"&&D.instanceColor&&(ge=D.instanceColor));let Me={};Me.attribute=ge,ge&&ge.data&&(Me.data=ge.data),H[ce]=Me,j++}r.attributes=H,r.attributesNum=j,r.index=Q}function b(){let D=r.newAttributes;for(let O=0,ee=D.length;O<ee;O++)D[O]=0}function m(D){f(D,0)}function f(D,O){let ee=r.newAttributes,Q=r.enabledAttributes,H=r.attributeDivisors;ee[D]=1,Q[D]===0&&(i.enableVertexAttribArray(D),Q[D]=1),H[D]!==O&&(i.vertexAttribDivisor(D,O),H[D]=O)}function R(){let D=r.newAttributes,O=r.enabledAttributes;for(let ee=0,Q=O.length;ee<Q;ee++)O[ee]!==D[ee]&&(i.disableVertexAttribArray(ee),O[ee]=0)}function P(D,O,ee,Q,H,te,j){j===!0?i.vertexAttribIPointer(D,O,ee,H,te):i.vertexAttribPointer(D,O,ee,Q,H,te)}function E(D,O,ee,Q){b();let H=Q.attributes,te=ee.getAttributes(),j=O.defaultAttributeValues;for(let oe in te){let ce=te[oe];if(ce.location>=0){let me=H[oe];if(me===void 0&&(oe==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),oe==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),me!==void 0){let ge=me.normalized,Me=me.itemSize,ke=e.get(me);if(ke===void 0)continue;let Be=ke.buffer,he=ke.type,se=ke.bytesPerElement,Se=he===i.INT||he===i.UNSIGNED_INT||me.gpuType===ll;if(me.isInterleavedBufferAttribute){let ye=me.data,Ze=ye.stride,Ve=me.offset;if(ye.isInstancedInterleavedBuffer){for(let Ye=0;Ye<ce.locationSize;Ye++)f(ce.location+Ye,ye.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Ye=0;Ye<ce.locationSize;Ye++)m(ce.location+Ye);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let Ye=0;Ye<ce.locationSize;Ye++)P(ce.location+Ye,Me/ce.locationSize,he,ge,Ze*se,(Ve+Me/ce.locationSize*Ye)*se,Se)}else{if(me.isInstancedBufferAttribute){for(let ye=0;ye<ce.locationSize;ye++)f(ce.location+ye,me.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ye=0;ye<ce.locationSize;ye++)m(ce.location+ye);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let ye=0;ye<ce.locationSize;ye++)P(ce.location+ye,Me/ce.locationSize,he,ge,Me*se,Me/ce.locationSize*ye*se,Se)}}else if(j!==void 0){let ge=j[oe];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(ce.location,ge);break;case 3:i.vertexAttrib3fv(ce.location,ge);break;case 4:i.vertexAttrib4fv(ce.location,ge);break;default:i.vertexAttrib1fv(ce.location,ge)}}}}R()}function A(){I();for(let D in n){let O=n[D];for(let ee in O){let Q=O[ee];for(let H in Q){let te=Q[H];for(let j in te)h(te[j].object),delete te[j];delete Q[H]}}delete n[D]}}function C(D){if(n[D.id]===void 0)return;let O=n[D.id];for(let ee in O){let Q=O[ee];for(let H in Q){let te=Q[H];for(let j in te)h(te[j].object),delete te[j];delete Q[H]}}delete n[D.id]}function L(D){for(let O in n){let ee=n[O];for(let Q in ee){let H=ee[Q];if(H[D.id]===void 0)continue;let te=H[D.id];for(let j in te)h(te[j].object),delete te[j];delete H[D.id]}}}function y(D){for(let O in n){let ee=n[O],Q=D.isInstancedMesh===!0?D.id:0,H=ee[Q];if(H!==void 0){for(let te in H){let j=H[te];for(let oe in j)h(j[oe].object),delete j[oe];delete H[te]}delete ee[Q],Object.keys(ee).length===0&&delete n[O]}}}function I(){z(),a=!0,r!==s&&(r=s,u(r.object))}function z(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:z,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:L,initAttributes:b,enableAttribute:m,disableUnusedAttributes:R}}function Mx(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ex(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Zn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let y=L===gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Hn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==oi&&!y)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp",h=c(u);h!==u&&(Qe("WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);let p=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),C=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:R,maxVaryings:P,maxFragmentUniforms:E,maxSamples:A,samples:C}}function wx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new qn,o=new lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){let g=p.length!==0||d||n!==0||s;return s=d,n=p.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){t=h(p,d,0)},this.setState=function(p,d,g){let v=p.clippingPlanes,b=p.clipIntersection,m=p.clipShadows,f=i.get(p);if(!s||v===null||v.length===0||r&&!m)r?h(null):u();else{let R=r?0:n,P=R*4,E=f.clippingState||null;c.value=E,E=h(v,d,P,g);for(let A=0;A!==P;++A)E[A]=t[A];f.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=R}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(p,d,g,v){let b=p!==null?p.length:0,m=null;if(b!==0){if(m=c.value,v!==!0||m===null){let f=g+b*4,R=d.matrixWorldInverse;o.getNormalMatrix(R),(m===null||m.length<f)&&(m=new Float32Array(f));for(let P=0,E=g;P!==b;++P,E+=4)a.copy(p[P]).applyMatrix4(R,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}var os=4,Df=[.125,.215,.35,.446,.526,.582],Ds=20,Ax=256,Ia=new Is,Nf=new xt,ed=null,td=0,nd=0,id=!1,Tx=new B,Yl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Tx}=r;ed=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Of(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ed,td,nd),this._renderer.xr.enabled=id,e.scissorTest=!1,wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===Ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ed=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:gi,format:Zn,colorSpace:ea,depthBuffer:!1},s=Ff(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ff(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cx(r)),this._blurMaterial=Ix(r,e,t),this._ggxMaterial=Rx(r,e,t)}return s}_compileMaterial(e){let t=new rn(new sn,e);this._renderer.compile(t,Ia)}_sceneToCubeUV(e,t,n,s,r){let c=new tn(90,1,t,n),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,d=p.autoClear,g=p.toneMapping;p.getClearColor(Nf),p.toneMapping=ri,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rn(new vr,new Ts({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,m=b.material,f=!1,R=e.background;R?R.isColor&&(m.color.copy(R),e.background=null,f=!0):(m.color.copy(Nf),f=!0);for(let P=0;P<6;P++){let E=P%3;E===0?(c.up.set(0,u[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[P],r.y,r.z)):E===1?(c.up.set(0,0,u[P]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[P],r.z)):(c.up.set(0,u[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[P]));let A=this._cubeSize;wr(s,E*A,P>2?A:0,A,A),p.setRenderTarget(s),f&&p.render(b,c),p.render(e,c)}p.toneMapping=g,p.autoClear=d,e.background=R}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===Ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Of()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ia)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,u=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(u*u-h*h),d=0+u*1.25,g=p*d,{_lodMax:v}=this,b=this._sizeLods[n],m=3*b*(n>v-os?n-v+os:0),f=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=g,c.mipInt.value=v-t,wr(r,m,f,3*b,2*b),s.setRenderTarget(r),s.render(o,Ia),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-n,wr(e,m,f,3*b,2*b),s.setRenderTarget(e),s.render(o,Ia)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&nt("blur direction must be either latitudinal or longitudinal!");let h=3,p=this._lodMeshes[s];p.material=u;let d=u.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Ds-1),b=r/v,m=isFinite(r)?1+Math.floor(h*b):Ds;m>Ds&&Qe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ds}`);let f=[],R=0;for(let L=0;L<Ds;++L){let y=L/b,I=Math.exp(-y*y/2);f.push(I),L===0?R+=I:L<m&&(R+=2*I)}for(let L=0;L<f.length;L++)f[L]=f[L]/R;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:P}=this;d.dTheta.value=v,d.mipInt.value=P-n;let E=this._sizeLods[s],A=3*E*(s>P-os?s-P+os:0),C=4*(this._cubeSize-E);wr(t,A,C,3*E,2*E),c.setRenderTarget(t),c.render(p,Ia)}};function Cx(i){let e=[],t=[],n=[],s=i,r=i-os+1+Df.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-os?c=Df[a-i+os-1]:a===0&&(c=0),t.push(c);let u=1/(o-2),h=-u,p=1+u,d=[h,h,p,h,p,p,h,h,p,p,h,p],g=6,v=6,b=3,m=2,f=1,R=new Float32Array(b*v*g),P=new Float32Array(m*v*g),E=new Float32Array(f*v*g);for(let C=0;C<g;C++){let L=C%3*2/3-1,y=C>2?0:-1,I=[L,y,0,L+2/3,y,0,L+2/3,y+1,0,L,y,0,L+2/3,y+1,0,L,y+1,0];R.set(I,b*v*C),P.set(d,m*v*C);let z=[C,C,C,C,C,C];E.set(z,f*v*C)}let A=new sn;A.setAttribute("position",new wn(R,b)),A.setAttribute("uv",new wn(P,m)),A.setAttribute("faceIndex",new wn(E,f)),n.push(new rn(A,null)),s>os&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ff(i,e,t){let n=new On(i,e,t);return n.texture.mapping=ba,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Rx(i,e,t){return new yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ax,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ix(i,e,t){let n=new Float32Array(Ds),s=new B(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Uf(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Of(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function jl(){return`

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
	`}var Zl=class extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new da(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vr(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:Ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:mi});r.uniforms.tEquirect.value=t;let a=new rn(s,r),o=t.minFilter;return t.minFilter===ss&&(t.minFilter=nn),new nl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Px(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){let g=d.mapping;if(g===rl||g===al)if(e.has(d)){let v=e.get(d).texture;return o(v,d.mapping)}else{let v=d.image;if(v&&v.height>0){let b=new Zl(v.height);return b.fromEquirectangularTexture(i,d),e.set(d,b),d.addEventListener("dispose",u),o(b.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let g=d.mapping,v=g===rl||g===al,b=g===is||g===Ps;if(v||b){let m=t.get(d),f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return n===null&&(n=new Yl(i)),m=v?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let R=d.image;return v&&R&&R.height>0||b&&R&&c(R)?(n===null&&(n=new Yl(i)),m=v?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,g){return g===rl?d.mapping=is:g===al&&(d.mapping=Ps),d}function c(d){let g=0,v=6;for(let b=0;b<v;b++)d[b]!==void 0&&g++;return g===v}function u(d){let g=d.target;g.removeEventListener("dispose",u);let v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function h(d){let g=d.target;g.removeEventListener("dispose",h);let v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Lx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ss("WebGLRenderer: "+n+" extension not supported."),s}}}function Dx(i,e,t,n){let s={},r=new WeakMap;function a(p){let d=p.target;d.index!==null&&e.remove(d.index);for(let v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];let g=r.get(d);g&&(e.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(p,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(p){let d=p.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER)}function u(p){let d=[],g=p.index,v=p.attributes.position,b=0;if(v===void 0)return;if(g!==null){let R=g.array;b=g.version;for(let P=0,E=R.length;P<E;P+=3){let A=R[P+0],C=R[P+1],L=R[P+2];d.push(A,C,C,L,L,A)}}else{let R=v.array;b=v.version;for(let P=0,E=R.length/3-1;P<E;P+=3){let A=P+0,C=P+1,L=P+2;d.push(A,C,C,L,L,A)}}let m=new(v.count>=65535?oa:aa)(d,1);m.version=b;let f=r.get(p);f&&e.remove(f),r.set(p,m)}function h(p){let d=r.get(p);if(d){let g=p.index;g!==null&&d.version<g.version&&u(p)}else u(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:h}}function Nx(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,d){i.drawElements(n,d,r,p*a),t.update(d,n,1)}function u(p,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,p*a,g),t.update(d,n,g))}function h(p,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,g);let b=0;for(let m=0;m<g;m++)b+=d[m];t.update(b,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function Fx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ux(i,e,t){let n=new WeakMap,s=new It;function r(a,o,c){let u=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==p){let I=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",I)};d!==void 0&&d.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],R=o.morphAttributes.color||[],P=0;g===!0&&(P=1),v===!0&&(P=2),b===!0&&(P=3);let E=o.attributes.position.count*P,A=1;E>e.maxTextureSize&&(A=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let C=new Float32Array(E*A*4*p),L=new ra(C,E,A,p);L.type=oi,L.needsUpdate=!0;let y=P*4;for(let z=0;z<p;z++){let D=m[z],O=f[z],ee=R[z],Q=E*A*4*z;for(let H=0;H<D.count;H++){let te=H*y;g===!0&&(s.fromBufferAttribute(D,H),C[Q+te+0]=s.x,C[Q+te+1]=s.y,C[Q+te+2]=s.z,C[Q+te+3]=0),v===!0&&(s.fromBufferAttribute(O,H),C[Q+te+4]=s.x,C[Q+te+5]=s.y,C[Q+te+6]=s.z,C[Q+te+7]=0),b===!0&&(s.fromBufferAttribute(ee,H),C[Q+te+8]=s.x,C[Q+te+9]=s.y,C[Q+te+10]=s.z,C[Q+te+11]=ee.itemSize===4?s.w:1)}}d={count:p,texture:L,size:new Je(E,A)},n.set(o,d),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let b=0;b<u.length;b++)g+=u[b];let v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",u)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Ox(i,e,t,n,s){let r=new WeakMap;function a(u){let h=s.render.frame,p=u.geometry,d=e.get(u,p);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),r.get(u)!==h&&(t.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,i.ARRAY_BUFFER),r.set(u,h))),u.isSkinnedMesh){let g=u.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return d}function o(){r=new WeakMap}function c(u){let h=u.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Bx={[Tu]:"LINEAR_TONE_MAPPING",[Cu]:"REINHARD_TONE_MAPPING",[Ru]:"CINEON_TONE_MAPPING",[Iu]:"ACES_FILMIC_TONE_MAPPING",[Lu]:"AGX_TONE_MAPPING",[Du]:"NEUTRAL_TONE_MAPPING",[Pu]:"CUSTOM_TONE_MAPPING"};function zx(i,e,t,n,s,r){let a=new On(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Oi(e,t):void 0}),o=new On(e,t,{type:gi,depthBuffer:!1,stencilBuffer:!1}),c=new sn;c.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Vt([0,2,0,0,2,0],2));let u=new Go({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new rn(c,u),p=new Is(-1,1,1,-1,0,1),d=null,g=null,v=!1,b,m=null,f=[],R=!1;this.setSize=function(P,E){a.setSize(P,E),o.setSize(P,E);for(let A=0;A<f.length;A++){let C=f[A];C.setSize&&C.setSize(P,E)}},this.setEffects=function(P){f=P,R=f.length>0&&f[0].isRenderPass===!0;let E=a.width,A=a.height;for(let C=0;C<f.length;C++){let L=f[C];L.setSize&&L.setSize(E,A)}},this.begin=function(P,E){if(v||P.toneMapping===ri&&f.length===0)return!1;if(m=E,E!==null){let A=E.width,C=E.height;(a.width!==A||a.height!==C)&&this.setSize(A,C)}return R===!1&&P.setRenderTarget(a),b=P.toneMapping,P.toneMapping=ri,!0},this.hasRenderPass=function(){return R},this.end=function(P,E){P.toneMapping=b,v=!0;let A=a,C=o;for(let L=0;L<f.length;L++){let y=f[L];if(y.enabled!==!1&&(y.render(P,C,A,E),y.needsSwap!==!1)){let I=A;A=C,C=I}}if(d!==P.outputColorSpace||g!==P.toneMapping){d=P.outputColorSpace,g=P.toneMapping,u.defines={},vt.getTransfer(d)===wt&&(u.defines.SRGB_TRANSFER="");let L=Bx[g];L&&(u.defines[L]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,P.setRenderTarget(m),P.render(h,p),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),u.dispose()}}var ip=new xn,ad=new Oi(1,1),sp=new ra,rp=new Oo,ap=new da,Bf=[],zf=[],kf=new Float32Array(16),Vf=new Float32Array(9),Hf=new Float32Array(4);function Cr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Bf[s];if(r===void 0&&(r=new Float32Array(s),Bf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function qt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Jl(i,e){let t=zf[e];t===void 0&&(t=new Int32Array(e),zf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function kx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2fv(this.addr,e),Yt(t,e)}}function Hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;i.uniform3fv(this.addr,e),Yt(t,e)}}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4fv(this.addr,e),Yt(t,e)}}function Wx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Hf.set(n),i.uniformMatrix2fv(this.addr,!1,Hf),Yt(t,n)}}function Xx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Vf.set(n),i.uniformMatrix3fv(this.addr,!1,Vf),Yt(t,n)}}function $x(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;kf.set(n),i.uniformMatrix4fv(this.addr,!1,kf),Yt(t,n)}}function qx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2iv(this.addr,e),Yt(t,e)}}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3iv(this.addr,e),Yt(t,e)}}function jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4iv(this.addr,e),Yt(t,e)}}function Jx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2uiv(this.addr,e),Yt(t,e)}}function Qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3uiv(this.addr,e),Yt(t,e)}}function ey(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4uiv(this.addr,e),Yt(t,e)}}function ty(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ad.compareFunction=t.isReversedDepthBuffer()?Xl:Wl,r=ad):r=ip,t.setTexture2D(e||r,s)}function ny(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||rp,s)}function iy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ap,s)}function sy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||sp,s)}function ry(i){switch(i){case 5126:return kx;case 35664:return Vx;case 35665:return Hx;case 35666:return Gx;case 35674:return Wx;case 35675:return Xx;case 35676:return $x;case 5124:case 35670:return qx;case 35667:case 35671:return Yx;case 35668:case 35672:return Zx;case 35669:case 35673:return jx;case 5125:return Jx;case 36294:return Kx;case 36295:return Qx;case 36296:return ey;case 35678:case 36198:case 36298:case 36306:case 35682:return ty;case 35679:case 36299:case 36307:return ny;case 35680:case 36300:case 36308:case 36293:return iy;case 36289:case 36303:case 36311:case 36292:return sy}}function ay(i,e){i.uniform1fv(this.addr,e)}function oy(i,e){let t=Cr(e,this.size,2);i.uniform2fv(this.addr,t)}function ly(i,e){let t=Cr(e,this.size,3);i.uniform3fv(this.addr,t)}function cy(i,e){let t=Cr(e,this.size,4);i.uniform4fv(this.addr,t)}function uy(i,e){let t=Cr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function dy(i,e){let t=Cr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hy(i,e){let t=Cr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function fy(i,e){i.uniform1iv(this.addr,e)}function py(i,e){i.uniform2iv(this.addr,e)}function my(i,e){i.uniform3iv(this.addr,e)}function gy(i,e){i.uniform4iv(this.addr,e)}function _y(i,e){i.uniform1uiv(this.addr,e)}function xy(i,e){i.uniform2uiv(this.addr,e)}function yy(i,e){i.uniform3uiv(this.addr,e)}function vy(i,e){i.uniform4uiv(this.addr,e)}function by(i,e,t){let n=this.cache,s=e.length,r=Jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ad:a=ip;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Sy(i,e,t){let n=this.cache,s=e.length,r=Jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||rp,r[a])}function My(i,e,t){let n=this.cache,s=e.length,r=Jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||ap,r[a])}function Ey(i,e,t){let n=this.cache,s=e.length,r=Jl(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),Yt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||sp,r[a])}function wy(i){switch(i){case 5126:return ay;case 35664:return oy;case 35665:return ly;case 35666:return cy;case 35674:return uy;case 35675:return dy;case 35676:return hy;case 5124:case 35670:return fy;case 35667:case 35671:return py;case 35668:case 35672:return my;case 35669:case 35673:return gy;case 5125:return _y;case 36294:return xy;case 36295:return yy;case 36296:return vy;case 35678:case 36198:case 36298:case 36306:case 35682:return by;case 35679:case 36299:case 36307:return Sy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return Ey}}var od=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ry(t.type)}},ld=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wy(t.type)}},cd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},sd=/(\w+)(\])?(\[|\.)?/g;function Gf(i,e){i.seq.push(e),i.map[e.id]=e}function Ay(i,e,t){let n=i.name,s=n.length;for(sd.lastIndex=0;;){let r=sd.exec(n),a=sd.lastIndex,o=r[1],c=r[2]==="]",u=r[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===s){Gf(t,u===void 0?new od(o,i,e):new ld(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new cd(o),Gf(t,p)),t=p}}}var Ar=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Ay(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Wf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Ty=37297,Cy=0;function Ry(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Xf=new lt;function Iy(i){vt._getMatrix(Xf,vt.workingColorSpace,i);let e=`mat3( ${Xf.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(i)){case ta:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function $f(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ry(i.getShaderSource(e),o)}else return r}function Py(i,e){let t=Iy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Ly={[Tu]:"Linear",[Cu]:"Reinhard",[Ru]:"Cineon",[Iu]:"ACESFilmic",[Lu]:"AgX",[Du]:"Neutral",[Pu]:"Custom"};function Dy(i,e){let t=Ly[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ql=new B;function Ny(){vt.getLuminanceCoefficients(ql);let i=ql.x.toFixed(4),e=ql.y.toFixed(4),t=ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(La).join(`
`)}function Uy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Oy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function La(i){return i!==""}function qf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var By=/^[ \t]*#include +<([\w\d./]+)>/gm;function ud(i){return i.replace(By,ky)}var zy=new Map;function ky(i,e){let t=mt[e];if(t===void 0){let n=zy.get(e);if(n!==void 0)t=mt[n],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ud(t)}var Vy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zf(i){return i.replace(Vy,Hy)}function Hy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Gy={[va]:"SHADOWMAP_TYPE_PCF",[Sr]:"SHADOWMAP_TYPE_VSM"};function Wy(i){return Gy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Xy={[is]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE",[ba]:"ENVMAP_TYPE_CUBE_UV"};function $y(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Xy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var qy={[Ps]:"ENVMAP_MODE_REFRACTION"};function Yy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":qy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Zy={[Au]:"ENVMAP_BLENDING_MULTIPLY",[mf]:"ENVMAP_BLENDING_MIX",[gf]:"ENVMAP_BLENDING_ADD"};function jy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zy[i.combine]||"ENVMAP_BLENDING_NONE"}function Jy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ky(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Wy(t),u=$y(t),h=Yy(t),p=jy(t),d=Jy(t),g=Fy(t),v=Uy(r),b=s.createProgram(),m,f,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(La).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(La).join(`
`),f.length>0&&(f+=`
`)):(m=[jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(La).join(`
`),f=[jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?mt.tonemapping_pars_fragment:"",t.toneMapping!==ri?Dy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Py("linearToOutputTexel",t.outputColorSpace),Ny(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(La).join(`
`)),a=ud(a),a=qf(a,t),a=Yf(a,t),o=ud(o),o=qf(o,t),o=Yf(o,t),a=Zf(a),o=Zf(o),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let P=R+m+a,E=R+f+o,A=Wf(s,s.VERTEX_SHADER,P),C=Wf(s,s.FRAGMENT_SHADER,E);s.attachShader(b,A),s.attachShader(b,C),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function L(D){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(b)||"",ee=s.getShaderInfoLog(A)||"",Q=s.getShaderInfoLog(C)||"",H=O.trim(),te=ee.trim(),j=Q.trim(),oe=!0,ce=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,A,C);else{let me=$f(s,A,"vertex"),ge=$f(s,C,"fragment");nt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+me+`
`+ge)}else H!==""?Qe("WebGLProgram: Program Info Log:",H):(te===""||j==="")&&(ce=!1);ce&&(D.diagnostics={runnable:oe,programLog:H,vertexShader:{log:te,prefix:m},fragmentShader:{log:j,prefix:f}})}s.deleteShader(A),s.deleteShader(C),y=new Ar(s,b),I=Oy(s,b)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let I;this.getAttributes=function(){return I===void 0&&L(this),I};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(b,Ty)),z},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cy++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=A,this.fragmentShader=C,this}var Qy=0,dd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hd(e),t.set(e,n)),n}},hd=class{constructor(e){this.id=Qy++,this.code=e,this.usedTimes=0}};function ev(i){return i===as||i===Ta||i===Ca}function tv(i,e,t,n,s,r){let a=new gr,o=new dd,c=new Set,u=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function b(y,I,z,D,O,ee){let Q=D.fog,H=O.geometry,te=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,j=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,oe=e.get(y.envMap||te,j),ce=oe&&oe.mapping===ba?oe.image.height:null,me=g[y.type];y.precision!==null&&(d=n.getMaxPrecision(y.precision),d!==y.precision&&Qe("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let ge=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Me=ge!==void 0?ge.length:0,ke=0;H.morphAttributes.position!==void 0&&(ke=1),H.morphAttributes.normal!==void 0&&(ke=2),H.morphAttributes.color!==void 0&&(ke=3);let Be,he,se,Se;if(me){let De=bn[me];Be=De.vertexShader,he=De.fragmentShader}else{Be=y.vertexShader,he=y.fragmentShader;let De=o.getVertexShaderStage(y),Pt=o.getFragmentShaderStage(y);o.update(y,De,Pt),se=De.id,Se=Pt.id}let ye=i.getRenderTarget(),Ze=i.state.buffers.depth.getReversed(),Ve=O.isInstancedMesh===!0,Ye=O.isBatchedMesh===!0,Mt=!!y.map,je=!!y.matcap,ht=!!oe,rt=!!y.aoMap,tt=!!y.lightMap,it=!!y.bumpMap&&y.wireframe===!1,fe=!!y.normalMap,Ue=!!y.displacementMap,Xe=!!y.emissiveMap,Oe=!!y.metalnessMap,at=!!y.roughnessMap,U=y.anisotropy>0,ft=y.clearcoat>0,Ke=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,X=y.transmission>0,Y=U&&!!y.anisotropyMap,J=ft&&!!y.clearcoatMap,pe=ft&&!!y.clearcoatNormalMap,ve=ft&&!!y.clearcoatRoughnessMap,W=T&&!!y.iridescenceMap,k=T&&!!y.iridescenceThicknessMap,re=_&&!!y.sheenColorMap,Ee=_&&!!y.sheenRoughnessMap,ie=!!y.specularMap,_e=!!y.specularColorMap,Ne=!!y.specularIntensityMap,Fe=X&&!!y.transmissionMap,xe=X&&!!y.thicknessMap,N=!!y.gradientMap,be=!!y.alphaMap,ae=y.alphaTest>0,Te=!!y.alphaHash,Pe=!!y.extensions,de=ri;y.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(de=i.toneMapping);let ze={shaderID:me,shaderType:y.type,shaderName:y.name,vertexShader:Be,fragmentShader:he,defines:y.defines,customVertexShaderID:se,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Ye,batchingColor:Ye&&O._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&O.instanceColor!==null,instancingMorph:Ve&&O.morphTexture!==null,outputColorSpace:ye===null?i.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Mt,matcap:je,envMap:ht,envMapMode:ht&&oe.mapping,envMapCubeUVHeight:ce,aoMap:rt,lightMap:tt,bumpMap:it,normalMap:fe,displacementMap:Ue,emissiveMap:Xe,normalMapObjectSpace:fe&&y.normalMapType===yf,normalMapTangentSpace:fe&&y.normalMapType===Hu,packedNormalMap:fe&&y.normalMapType===Hu&&ev(y.normalMap.format),metalnessMap:Oe,roughnessMap:at,anisotropy:U,anisotropyMap:Y,clearcoat:ft,clearcoatMap:J,clearcoatNormalMap:pe,clearcoatRoughnessMap:ve,dispersion:Ke,iridescence:T,iridescenceMap:W,iridescenceThicknessMap:k,sheen:_,sheenColorMap:re,sheenRoughnessMap:Ee,specularMap:ie,specularColorMap:_e,specularIntensityMap:Ne,transmission:X,transmissionMap:Fe,thicknessMap:xe,gradientMap:N,opaque:y.transparent===!1&&y.blending===Ms&&y.alphaToCoverage===!1,alphaMap:be,alphaTest:ae,alphaHash:Te,combine:y.combine,mapUv:Mt&&v(y.map.channel),aoMapUv:rt&&v(y.aoMap.channel),lightMapUv:tt&&v(y.lightMap.channel),bumpMapUv:it&&v(y.bumpMap.channel),normalMapUv:fe&&v(y.normalMap.channel),displacementMapUv:Ue&&v(y.displacementMap.channel),emissiveMapUv:Xe&&v(y.emissiveMap.channel),metalnessMapUv:Oe&&v(y.metalnessMap.channel),roughnessMapUv:at&&v(y.roughnessMap.channel),anisotropyMapUv:Y&&v(y.anisotropyMap.channel),clearcoatMapUv:J&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:k&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:re&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(y.sheenRoughnessMap.channel),specularMapUv:ie&&v(y.specularMap.channel),specularColorMapUv:_e&&v(y.specularColorMap.channel),specularIntensityMapUv:Ne&&v(y.specularIntensityMap.channel),transmissionMapUv:Fe&&v(y.transmissionMap.channel),thicknessMapUv:xe&&v(y.thicknessMap.channel),alphaMapUv:be&&v(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(fe||U),vertexNormals:!!H.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(Mt||be),fog:!!Q,useFog:y.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&fe===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ze,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ke,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:Mt&&y.map.isVideoTexture===!0&&vt.getTransfer(y.map.colorSpace)===wt,decodeVideoTextureEmissive:Xe&&y.emissiveMap.isVideoTexture===!0&&vt.getTransfer(y.emissiveMap.colorSpace)===wt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Yn,flipSided:y.side===vn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&y.extensions.multiDraw===!0||Ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function m(y){let I=[];if(y.shaderID?I.push(y.shaderID):(I.push(y.customVertexShaderID),I.push(y.customFragmentShaderID)),y.defines!==void 0)for(let z in y.defines)I.push(z),I.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(f(I,y),R(I,y),I.push(i.outputColorSpace)),I.push(y.customProgramCacheKey),I.join()}function f(y,I){y.push(I.precision),y.push(I.outputColorSpace),y.push(I.envMapMode),y.push(I.envMapCubeUVHeight),y.push(I.mapUv),y.push(I.alphaMapUv),y.push(I.lightMapUv),y.push(I.aoMapUv),y.push(I.bumpMapUv),y.push(I.normalMapUv),y.push(I.displacementMapUv),y.push(I.emissiveMapUv),y.push(I.metalnessMapUv),y.push(I.roughnessMapUv),y.push(I.anisotropyMapUv),y.push(I.clearcoatMapUv),y.push(I.clearcoatNormalMapUv),y.push(I.clearcoatRoughnessMapUv),y.push(I.iridescenceMapUv),y.push(I.iridescenceThicknessMapUv),y.push(I.sheenColorMapUv),y.push(I.sheenRoughnessMapUv),y.push(I.specularMapUv),y.push(I.specularColorMapUv),y.push(I.specularIntensityMapUv),y.push(I.transmissionMapUv),y.push(I.thicknessMapUv),y.push(I.combine),y.push(I.fogExp2),y.push(I.sizeAttenuation),y.push(I.morphTargetsCount),y.push(I.morphAttributeCount),y.push(I.numDirLights),y.push(I.numPointLights),y.push(I.numSpotLights),y.push(I.numSpotLightMaps),y.push(I.numHemiLights),y.push(I.numRectAreaLights),y.push(I.numDirLightShadows),y.push(I.numPointLightShadows),y.push(I.numSpotLightShadows),y.push(I.numSpotLightShadowsWithMaps),y.push(I.numLightProbes),y.push(I.shadowMapType),y.push(I.toneMapping),y.push(I.numClippingPlanes),y.push(I.numClipIntersection),y.push(I.depthPacking)}function R(y,I){a.disableAll(),I.instancing&&a.enable(0),I.instancingColor&&a.enable(1),I.instancingMorph&&a.enable(2),I.matcap&&a.enable(3),I.envMap&&a.enable(4),I.normalMapObjectSpace&&a.enable(5),I.normalMapTangentSpace&&a.enable(6),I.clearcoat&&a.enable(7),I.iridescence&&a.enable(8),I.alphaTest&&a.enable(9),I.vertexColors&&a.enable(10),I.vertexAlphas&&a.enable(11),I.vertexUv1s&&a.enable(12),I.vertexUv2s&&a.enable(13),I.vertexUv3s&&a.enable(14),I.vertexTangents&&a.enable(15),I.anisotropy&&a.enable(16),I.alphaHash&&a.enable(17),I.batching&&a.enable(18),I.dispersion&&a.enable(19),I.batchingColor&&a.enable(20),I.gradientMap&&a.enable(21),I.packedNormalMap&&a.enable(22),I.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),I.fog&&a.enable(0),I.useFog&&a.enable(1),I.flatShading&&a.enable(2),I.logarithmicDepthBuffer&&a.enable(3),I.reversedDepthBuffer&&a.enable(4),I.skinning&&a.enable(5),I.morphTargets&&a.enable(6),I.morphNormals&&a.enable(7),I.morphColors&&a.enable(8),I.premultipliedAlpha&&a.enable(9),I.shadowMapEnabled&&a.enable(10),I.doubleSided&&a.enable(11),I.flipSided&&a.enable(12),I.useDepthPacking&&a.enable(13),I.dithering&&a.enable(14),I.transmission&&a.enable(15),I.sheen&&a.enable(16),I.opaque&&a.enable(17),I.pointsUvs&&a.enable(18),I.decodeVideoTexture&&a.enable(19),I.decodeVideoTextureEmissive&&a.enable(20),I.alphaToCoverage&&a.enable(21),I.numLightProbeGrids>0&&a.enable(22),I.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function P(y){let I=g[y.type],z;if(I){let D=bn[I];z=Ra.clone(D.uniforms)}else z=y.uniforms;return z}function E(y,I){let z=h.get(I);return z!==void 0?++z.usedTimes:(z=new Ky(i,I,y,s),u.push(z),h.set(I,z)),z}function A(y){if(--y.usedTimes===0){let I=u.indexOf(y);u[I]=u[u.length-1],u.pop(),h.delete(y.cacheKey),y.destroy()}}function C(y){o.remove(y)}function L(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:P,acquireProgram:E,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:L}}function nv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function iv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Jf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,v,b,m,f){let R=i[e];return R===void 0?(R={id:d.id,object:d,geometry:g,material:v,materialVariant:a(d),groupOrder:b,renderOrder:d.renderOrder,z:m,group:f},i[e]=R):(R.id=d.id,R.object=d,R.geometry=g,R.material=v,R.materialVariant=a(d),R.groupOrder=b,R.renderOrder=d.renderOrder,R.z=m,R.group=f),e++,R}function c(d,g,v,b,m,f){let R=o(d,g,v,b,m,f);v.transmission>0?n.push(R):v.transparent===!0?s.push(R):t.push(R)}function u(d,g,v,b,m,f){let R=o(d,g,v,b,m,f);v.transmission>0?n.unshift(R):v.transparent===!0?s.unshift(R):t.unshift(R)}function h(d,g,v){t.length>1&&t.sort(d||iv),n.length>1&&n.sort(g||Jf),s.length>1&&s.sort(g||Jf),v&&(t.reverse(),n.reverse(),s.reverse())}function p(){for(let d=e,g=i.length;d<g;d++){let v=i[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:u,finish:p,sort:h}}function sv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Kf,i.set(n,[a])):s>=r.length?(a=new Kf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function rv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new xt};break;case"SpotLight":t={position:new B,direction:new B,color:new xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new xt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new xt,groundColor:new xt};break;case"RectAreaLight":t={color:new xt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function av(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var ov=0;function lv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function cv(i){let e=new rv,t=av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new B);let s=new B,r=new Ut,a=new Ut;function o(u){let h=0,p=0,d=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let g=0,v=0,b=0,m=0,f=0,R=0,P=0,E=0,A=0,C=0,L=0;u.sort(lv);for(let I=0,z=u.length;I<z;I++){let D=u[I],O=D.color,ee=D.intensity,Q=D.distance,H=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===as?H=D.shadow.map.texture:H=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=O.r*ee,p+=O.g*ee,d+=O.b*ee;else if(D.isLightProbe){for(let te=0;te<9;te++)n.probe[te].addScaledVector(D.sh.coefficients[te],ee);L++}else if(D.isDirectionalLight){let te=e.get(D);if(te.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,oe=t.get(D);oe.shadowIntensity=j.intensity,oe.shadowBias=j.bias,oe.shadowNormalBias=j.normalBias,oe.shadowRadius=j.radius,oe.shadowMapSize=j.mapSize,n.directionalShadow[g]=oe,n.directionalShadowMap[g]=H,n.directionalShadowMatrix[g]=D.shadow.matrix,R++}n.directional[g]=te,g++}else if(D.isSpotLight){let te=e.get(D);te.position.setFromMatrixPosition(D.matrixWorld),te.color.copy(O).multiplyScalar(ee),te.distance=Q,te.coneCos=Math.cos(D.angle),te.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),te.decay=D.decay,n.spot[b]=te;let j=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,j.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[b]=j.matrix,D.castShadow){let oe=t.get(D);oe.shadowIntensity=j.intensity,oe.shadowBias=j.bias,oe.shadowNormalBias=j.normalBias,oe.shadowRadius=j.radius,oe.shadowMapSize=j.mapSize,n.spotShadow[b]=oe,n.spotShadowMap[b]=H,E++}b++}else if(D.isRectAreaLight){let te=e.get(D);te.color.copy(O).multiplyScalar(ee),te.halfWidth.set(D.width*.5,0,0),te.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=te,m++}else if(D.isPointLight){let te=e.get(D);if(te.color.copy(D.color).multiplyScalar(D.intensity),te.distance=D.distance,te.decay=D.decay,D.castShadow){let j=D.shadow,oe=t.get(D);oe.shadowIntensity=j.intensity,oe.shadowBias=j.bias,oe.shadowNormalBias=j.normalBias,oe.shadowRadius=j.radius,oe.shadowMapSize=j.mapSize,oe.shadowCameraNear=j.camera.near,oe.shadowCameraFar=j.camera.far,n.pointShadow[v]=oe,n.pointShadowMap[v]=H,n.pointShadowMatrix[v]=D.shadow.matrix,P++}n.point[v]=te,v++}else if(D.isHemisphereLight){let te=e.get(D);te.skyColor.copy(D.color).multiplyScalar(ee),te.groundColor.copy(D.groundColor).multiplyScalar(ee),n.hemi[f]=te,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Le.LTC_FLOAT_1,n.rectAreaLTC2=Le.LTC_FLOAT_2):(n.rectAreaLTC1=Le.LTC_HALF_1,n.rectAreaLTC2=Le.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=d;let y=n.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==b||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==R||y.numPointShadows!==P||y.numSpotShadows!==E||y.numSpotMaps!==A||y.numLightProbes!==L)&&(n.directional.length=g,n.spot.length=b,n.rectArea.length=m,n.point.length=v,n.hemi.length=f,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=R,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=E+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,y.directionalLength=g,y.pointLength=v,y.spotLength=b,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=R,y.numPointShadows=P,y.numSpotShadows=E,y.numSpotMaps=A,y.numLightProbes=L,n.version=ov++)}function c(u,h){let p=0,d=0,g=0,v=0,b=0,m=h.matrixWorldInverse;for(let f=0,R=u.length;f<R;f++){let P=u[f];if(P.isDirectionalLight){let E=n.directional[p];E.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),p++}else if(P.isSpotLight){let E=n.spot[g];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),g++}else if(P.isRectAreaLight){let E=n.rectArea[v];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(P.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(P.width*.5,0,0),E.halfHeight.set(0,P.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(P.isPointLight){let E=n.point[d];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(m),d++}else if(P.isHemisphereLight){let E=n.hemi[b];E.direction.setFromMatrixPosition(P.matrixWorld),E.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:n}}function Qf(i){let e=new cv(i),t=[],n=[],s=[];function r(d){p.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function u(){e.setup(t)}function h(d){e.setupView(t,d)}let p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:u,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function uv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Qf(i),e.set(s,[o])):r>=a.length?(o=new Qf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var dv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hv=`uniform sampler2D shadow_pass;
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
}`,fv=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],pv=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],ep=new Ut,Pa=new B,rd=new B;function mv(i,e,t){let n=new ca,s=new Je,r=new Je,a=new It,o=new Wo,c=new Xo,u={},h=t.maxTextureSize,p={[Fi]:vn,[vn]:Fi,[Yn]:Yn},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:dv,fragmentShader:hv}),g=d.clone();g.defines.HORIZONTAL_PASS=1;let v=new sn;v.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new rn(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=va;let f=this.type;this.render=function(C,L,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===Zh&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=va);let I=i.getRenderTarget(),z=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),O=i.state;O.setBlending(mi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let ee=f!==this.type;ee&&L.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(H=>H.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,H=C.length;Q<H;Q++){let te=C[Q],j=te.shadow;if(j===void 0){Qe("WebGLShadowMap:",te,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let oe=j.getFrameExtents();s.multiply(oe),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,j.mapSize.y=r.y));let ce=i.state.buffers.depth.getReversed();if(j.camera._reversedDepth=ce,j.map===null||ee===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===Sr){if(te.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new On(s.x,s.y,{format:as,type:gi,minFilter:nn,magFilter:nn,generateMipmaps:!1}),j.map.texture.name=te.name+".shadowMap",j.map.depthTexture=new Oi(s.x,s.y,oi),j.map.depthTexture.name=te.name+".shadowMapDepth",j.map.depthTexture.format=pi,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Kt,j.map.depthTexture.magFilter=Kt}else te.isPointLight?(j.map=new Zl(s.x),j.map.depthTexture=new Ho(s.x,ai)):(j.map=new On(s.x,s.y),j.map.depthTexture=new Oi(s.x,s.y,ai)),j.map.depthTexture.name=te.name+".shadowMap",j.map.depthTexture.format=pi,this.type===va?(j.map.depthTexture.compareFunction=ce?Xl:Wl,j.map.depthTexture.minFilter=nn,j.map.depthTexture.magFilter=nn):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Kt,j.map.depthTexture.magFilter=Kt);j.camera.updateProjectionMatrix()}let me=j.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<me;ge++){if(j.map.isWebGLCubeRenderTarget)i.setRenderTarget(j.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(j.map),i.clear());let Me=j.getViewport(ge);a.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),O.viewport(a)}if(te.isPointLight){let Me=j.camera,ke=j.matrix,Be=te.distance||Me.far;Be!==Me.far&&(Me.far=Be,Me.updateProjectionMatrix()),Pa.setFromMatrixPosition(te.matrixWorld),Me.position.copy(Pa),rd.copy(Me.position),rd.add(fv[ge]),Me.up.copy(pv[ge]),Me.lookAt(rd),Me.updateMatrixWorld(),ke.makeTranslation(-Pa.x,-Pa.y,-Pa.z),ep.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),j._frustum.setFromProjectionMatrix(ep,Me.coordinateSystem,Me.reversedDepth)}else j.updateMatrices(te);n=j.getFrustum(),E(L,y,j.camera,te,this.type)}j.isPointLightShadow!==!0&&this.type===Sr&&R(j,y),j.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(I,z,D)};function R(C,L){let y=e.update(b);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,g.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new On(s.x,s.y,{format:as,type:gi})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,y,d,b,null),g.uniforms.shadow_pass.value=C.mapPass.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,y,g,b,null)}function P(C,L,y,I){let z=null,D=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)z=D;else if(z=y.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=z.uuid,ee=L.uuid,Q=u[O];Q===void 0&&(Q={},u[O]=Q);let H=Q[ee];H===void 0&&(H=z.clone(),Q[ee]=H,L.addEventListener("dispose",A)),z=H}if(z.visible=L.visible,z.wireframe=L.wireframe,I===Sr?z.side=L.shadowSide!==null?L.shadowSide:L.side:z.side=L.shadowSide!==null?L.shadowSide:p[L.side],z.alphaMap=L.alphaMap,z.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,z.map=L.map,z.clipShadows=L.clipShadows,z.clippingPlanes=L.clippingPlanes,z.clipIntersection=L.clipIntersection,z.displacementMap=L.displacementMap,z.displacementScale=L.displacementScale,z.displacementBias=L.displacementBias,z.wireframeLinewidth=L.wireframeLinewidth,z.linewidth=L.linewidth,y.isPointLight===!0&&z.isMeshDistanceMaterial===!0){let O=i.properties.get(z);O.light=y}return z}function E(C,L,y,I,z){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&z===Sr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let ee=e.update(C),Q=C.material;if(Array.isArray(Q)){let H=ee.groups;for(let te=0,j=H.length;te<j;te++){let oe=H[te],ce=Q[oe.materialIndex];if(ce&&ce.visible){let me=P(C,ce,I,z);C.onBeforeShadow(i,C,L,y,ee,me,oe),i.renderBufferDirect(y,null,ee,me,C,oe),C.onAfterShadow(i,C,L,y,ee,me,oe)}}}else if(Q.visible){let H=P(C,Q,I,z);C.onBeforeShadow(i,C,L,y,ee,H,null),i.renderBufferDirect(y,null,ee,H,C,null),C.onAfterShadow(i,C,L,y,ee,H,null)}}let O=C.children;for(let ee=0,Q=O.length;ee<Q;ee++)E(O[ee],L,y,I,z)}function A(C){C.target.removeEventListener("dispose",A);for(let y in u){let I=u[y],z=C.target.uuid;z in I&&(I[z].dispose(),delete I[z])}}}function gv(i,e){function t(){let N=!1,be=new It,ae=null,Te=new It(0,0,0,0);return{setMask:function(Pe){ae!==Pe&&!N&&(i.colorMask(Pe,Pe,Pe,Pe),ae=Pe)},setLocked:function(Pe){N=Pe},setClear:function(Pe,de,ze,De,Pt){Pt===!0&&(Pe*=De,de*=De,ze*=De),be.set(Pe,de,ze,De),Te.equals(be)===!1&&(i.clearColor(Pe,de,ze,De),Te.copy(be))},reset:function(){N=!1,ae=null,Te.set(-1,0,0,0)}}}function n(){let N=!1,be=!1,ae=null,Te=null,Pe=null;return{setReversed:function(de){if(be!==de){let ze=e.get("EXT_clip_control");de?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),be=de;let De=Pe;Pe=null,this.setClear(De)}},getReversed:function(){return be},setTest:function(de){de?ye(i.DEPTH_TEST):Ze(i.DEPTH_TEST)},setMask:function(de){ae!==de&&!N&&(i.depthMask(de),ae=de)},setFunc:function(de){if(be&&(de=Rf[de]),Te!==de){switch(de){case Eo:i.depthFunc(i.NEVER);break;case wo:i.depthFunc(i.ALWAYS);break;case Ao:i.depthFunc(i.LESS);break;case Es:i.depthFunc(i.LEQUAL);break;case To:i.depthFunc(i.EQUAL);break;case Co:i.depthFunc(i.GEQUAL);break;case Ro:i.depthFunc(i.GREATER);break;case Io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Te=de}},setLocked:function(de){N=de},setClear:function(de){Pe!==de&&(Pe=de,be&&(de=1-de),i.clearDepth(de))},reset:function(){N=!1,ae=null,Te=null,Pe=null,be=!1}}}function s(){let N=!1,be=null,ae=null,Te=null,Pe=null,de=null,ze=null,De=null,Pt=null;return{setTest:function(St){N||(St?ye(i.STENCIL_TEST):Ze(i.STENCIL_TEST))},setMask:function(St){be!==St&&!N&&(i.stencilMask(St),be=St)},setFunc:function(St,fn,cn){(ae!==St||Te!==fn||Pe!==cn)&&(i.stencilFunc(St,fn,cn),ae=St,Te=fn,Pe=cn)},setOp:function(St,fn,cn){(de!==St||ze!==fn||De!==cn)&&(i.stencilOp(St,fn,cn),de=St,ze=fn,De=cn)},setLocked:function(St){N=St},setClear:function(St){Pt!==St&&(i.clearStencil(St),Pt=St)},reset:function(){N=!1,be=null,ae=null,Te=null,Pe=null,de=null,ze=null,De=null,Pt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,u=new WeakMap,h={},p={},d={},g=new WeakMap,v=[],b=null,m=!1,f=null,R=null,P=null,E=null,A=null,C=null,L=null,y=new xt(0,0,0),I=0,z=!1,D=null,O=null,ee=null,Q=null,H=null,te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,oe=0,ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(ce)[1]),j=oe>=1):ce.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),j=oe>=2);let me=null,ge={},Me=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),Be=new It().fromArray(Me),he=new It().fromArray(ke);function se(N,be,ae,Te){let Pe=new Uint8Array(4),de=i.createTexture();i.bindTexture(N,de),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<ae;ze++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(be+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return de}let Se={};Se[i.TEXTURE_2D]=se(i.TEXTURE_2D,i.TEXTURE_2D,1),Se[i.TEXTURE_CUBE_MAP]=se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[i.TEXTURE_2D_ARRAY]=se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Se[i.TEXTURE_3D]=se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(i.DEPTH_TEST),a.setFunc(Es),it(!1),fe(Su),ye(i.CULL_FACE),rt(mi);function ye(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Ze(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ve(N,be){return d[N]!==be?(i.bindFramebuffer(N,be),d[N]=be,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=be),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=be),!0):!1}function Ye(N,be){let ae=v,Te=!1;if(N){ae=g.get(be),ae===void 0&&(ae=[],g.set(be,ae));let Pe=N.textures;if(ae.length!==Pe.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let de=0,ze=Pe.length;de<ze;de++)ae[de]=i.COLOR_ATTACHMENT0+de;ae.length=Pe.length,Te=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Te=!0);Te&&i.drawBuffers(ae)}function Mt(N){return b!==N?(i.useProgram(N),b=N,!0):!1}let je={[Yi]:i.FUNC_ADD,[Jh]:i.FUNC_SUBTRACT,[Kh]:i.FUNC_REVERSE_SUBTRACT};je[Qh]=i.MIN,je[ef]=i.MAX;let ht={[tf]:i.ZERO,[nf]:i.ONE,[sf]:i.SRC_COLOR,[So]:i.SRC_ALPHA,[uf]:i.SRC_ALPHA_SATURATE,[lf]:i.DST_COLOR,[af]:i.DST_ALPHA,[rf]:i.ONE_MINUS_SRC_COLOR,[Mo]:i.ONE_MINUS_SRC_ALPHA,[cf]:i.ONE_MINUS_DST_COLOR,[of]:i.ONE_MINUS_DST_ALPHA,[df]:i.CONSTANT_COLOR,[hf]:i.ONE_MINUS_CONSTANT_COLOR,[ff]:i.CONSTANT_ALPHA,[pf]:i.ONE_MINUS_CONSTANT_ALPHA};function rt(N,be,ae,Te,Pe,de,ze,De,Pt,St){if(N===mi){m===!0&&(Ze(i.BLEND),m=!1);return}if(m===!1&&(ye(i.BLEND),m=!0),N!==jh){if(N!==f||St!==z){if((R!==Yi||A!==Yi)&&(i.blendEquation(i.FUNC_ADD),R=Yi,A=Yi),St)switch(N){case Ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mu:i.blendFunc(i.ONE,i.ONE);break;case Eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:nt("WebGLState: Invalid blending: ",N);break}else switch(N){case Ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Eu:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wu:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",N);break}P=null,E=null,C=null,L=null,y.set(0,0,0),I=0,f=N,z=St}return}Pe=Pe||be,de=de||ae,ze=ze||Te,(be!==R||Pe!==A)&&(i.blendEquationSeparate(je[be],je[Pe]),R=be,A=Pe),(ae!==P||Te!==E||de!==C||ze!==L)&&(i.blendFuncSeparate(ht[ae],ht[Te],ht[de],ht[ze]),P=ae,E=Te,C=de,L=ze),(De.equals(y)===!1||Pt!==I)&&(i.blendColor(De.r,De.g,De.b,Pt),y.copy(De),I=Pt),f=N,z=!1}function tt(N,be){N.side===Yn?Ze(i.CULL_FACE):ye(i.CULL_FACE);let ae=N.side===vn;be&&(ae=!ae),it(ae),N.blending===Ms&&N.transparent===!1?rt(mi):rt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let Te=N.stencilWrite;o.setTest(Te),Te&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Xe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Ze(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(N){D!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),D=N)}function fe(N){N!==qh?(ye(i.CULL_FACE),N!==O&&(N===Su?i.cullFace(i.BACK):N===Yh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ze(i.CULL_FACE),O=N}function Ue(N){N!==ee&&(j&&i.lineWidth(N),ee=N)}function Xe(N,be,ae){N?(ye(i.POLYGON_OFFSET_FILL),(Q!==be||H!==ae)&&(Q=be,H=ae,a.getReversed()&&(be=-be),i.polygonOffset(be,ae))):Ze(i.POLYGON_OFFSET_FILL)}function Oe(N){N?ye(i.SCISSOR_TEST):Ze(i.SCISSOR_TEST)}function at(N){N===void 0&&(N=i.TEXTURE0+te-1),me!==N&&(i.activeTexture(N),me=N)}function U(N,be,ae){ae===void 0&&(me===null?ae=i.TEXTURE0+te-1:ae=me);let Te=ge[ae];Te===void 0&&(Te={type:void 0,texture:void 0},ge[ae]=Te),(Te.type!==N||Te.texture!==be)&&(me!==ae&&(i.activeTexture(ae),me=ae),i.bindTexture(N,be||Se[N]),Te.type=N,Te.texture=be)}function ft(){let N=ge[me];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Ke(){try{i.compressedTexImage2D(...arguments)}catch(N){nt("WebGLState:",N)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(N){nt("WebGLState:",N)}}function _(){try{i.texSubImage2D(...arguments)}catch(N){nt("WebGLState:",N)}}function X(){try{i.texSubImage3D(...arguments)}catch(N){nt("WebGLState:",N)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(N){nt("WebGLState:",N)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(N){nt("WebGLState:",N)}}function pe(){try{i.texStorage2D(...arguments)}catch(N){nt("WebGLState:",N)}}function ve(){try{i.texStorage3D(...arguments)}catch(N){nt("WebGLState:",N)}}function W(){try{i.texImage2D(...arguments)}catch(N){nt("WebGLState:",N)}}function k(){try{i.texImage3D(...arguments)}catch(N){nt("WebGLState:",N)}}function re(N){return p[N]!==void 0?p[N]:i.getParameter(N)}function Ee(N,be){p[N]!==be&&(i.pixelStorei(N,be),p[N]=be)}function ie(N){Be.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Be.copy(N))}function _e(N){he.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),he.copy(N))}function Ne(N,be){let ae=u.get(be);ae===void 0&&(ae=new WeakMap,u.set(be,ae));let Te=ae.get(N);Te===void 0&&(Te=i.getUniformBlockIndex(be,N.name),ae.set(N,Te))}function Fe(N,be){let Te=u.get(be).get(N);c.get(be)!==Te&&(i.uniformBlockBinding(be,Te,N.__bindingPointIndex),c.set(be,Te))}function xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},me=null,ge={},d={},g=new WeakMap,v=[],b=null,m=!1,f=null,R=null,P=null,E=null,A=null,C=null,L=null,y=new xt(0,0,0),I=0,z=!1,D=null,O=null,ee=null,Q=null,H=null,Be.set(0,0,i.canvas.width,i.canvas.height),he.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:Ze,bindFramebuffer:Ve,drawBuffers:Ye,useProgram:Mt,setBlending:rt,setMaterial:tt,setFlipSided:it,setCullFace:fe,setLineWidth:Ue,setPolygonOffset:Xe,setScissorTest:Oe,activeTexture:at,bindTexture:U,unbindTexture:ft,compressedTexImage2D:Ke,compressedTexImage3D:T,texImage2D:W,texImage3D:k,pixelStorei:Ee,getParameter:re,updateUBOMapping:Ne,uniformBlockBinding:Fe,texStorage2D:pe,texStorage3D:ve,texSubImage2D:_,texSubImage3D:X,compressedTexSubImage2D:Y,compressedTexSubImage3D:J,scissor:ie,viewport:_e,reset:xe}}function _v(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Je,h=new WeakMap,p=new Set,d,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(T,_){return v?new OffscreenCanvas(T,_):ia("canvas")}function m(T,_,X){let Y=1,J=Ke(T);if((J.width>X||J.height>X)&&(Y=X/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let pe=Math.floor(Y*J.width),ve=Math.floor(Y*J.height);d===void 0&&(d=b(pe,ve));let W=_?b(pe,ve):d;return W.width=pe,W.height=ve,W.getContext("2d").drawImage(T,0,0,pe,ve),Qe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+pe+"x"+ve+")."),W}else return"data"in T&&Qe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function f(T){return T.generateMipmaps}function R(T){i.generateMipmap(T)}function P(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,_,X,Y,J,pe=!1){if(T!==null){if(i[T]!==void 0)return i[T];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ve;Y&&(ve=e.get("EXT_texture_norm16"),ve||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=_;if(_===i.RED&&(X===i.FLOAT&&(W=i.R32F),X===i.HALF_FLOAT&&(W=i.R16F),X===i.UNSIGNED_BYTE&&(W=i.R8),X===i.UNSIGNED_SHORT&&ve&&(W=ve.R16_EXT),X===i.SHORT&&ve&&(W=ve.R16_SNORM_EXT)),_===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(W=i.R8UI),X===i.UNSIGNED_SHORT&&(W=i.R16UI),X===i.UNSIGNED_INT&&(W=i.R32UI),X===i.BYTE&&(W=i.R8I),X===i.SHORT&&(W=i.R16I),X===i.INT&&(W=i.R32I)),_===i.RG&&(X===i.FLOAT&&(W=i.RG32F),X===i.HALF_FLOAT&&(W=i.RG16F),X===i.UNSIGNED_BYTE&&(W=i.RG8),X===i.UNSIGNED_SHORT&&ve&&(W=ve.RG16_EXT),X===i.SHORT&&ve&&(W=ve.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(W=i.RG8UI),X===i.UNSIGNED_SHORT&&(W=i.RG16UI),X===i.UNSIGNED_INT&&(W=i.RG32UI),X===i.BYTE&&(W=i.RG8I),X===i.SHORT&&(W=i.RG16I),X===i.INT&&(W=i.RG32I)),_===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(W=i.RGB8UI),X===i.UNSIGNED_SHORT&&(W=i.RGB16UI),X===i.UNSIGNED_INT&&(W=i.RGB32UI),X===i.BYTE&&(W=i.RGB8I),X===i.SHORT&&(W=i.RGB16I),X===i.INT&&(W=i.RGB32I)),_===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),X===i.UNSIGNED_INT&&(W=i.RGBA32UI),X===i.BYTE&&(W=i.RGBA8I),X===i.SHORT&&(W=i.RGBA16I),X===i.INT&&(W=i.RGBA32I)),_===i.RGB&&(X===i.UNSIGNED_SHORT&&ve&&(W=ve.RGB16_EXT),X===i.SHORT&&ve&&(W=ve.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),_===i.RGBA){let k=pe?ta:vt.getTransfer(J);X===i.FLOAT&&(W=i.RGBA32F),X===i.HALF_FLOAT&&(W=i.RGBA16F),X===i.UNSIGNED_BYTE&&(W=k===wt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&ve&&(W=ve.RGBA16_EXT),X===i.SHORT&&ve&&(W=ve.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function A(T,_){let X;return T?_===null||_===ai||_===Er?X=i.DEPTH24_STENCIL8:_===oi?X=i.DEPTH32F_STENCIL8:_===Mr&&(X=i.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===Er?X=i.DEPTH_COMPONENT24:_===oi?X=i.DEPTH_COMPONENT32F:_===Mr&&(X=i.DEPTH_COMPONENT16),X}function C(T,_){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Kt&&T.minFilter!==nn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function L(T){let _=T.target;_.removeEventListener("dispose",L),I(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&p.delete(_)}function y(T){let _=T.target;_.removeEventListener("dispose",y),D(_)}function I(T){let _=n.get(T);if(_.__webglInit===void 0)return;let X=T.source,Y=g.get(X);if(Y){let J=Y[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&z(T),Object.keys(Y).length===0&&g.delete(X)}n.remove(T)}function z(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let X=T.source,Y=g.get(X);delete Y[_.__cacheKey],a.memory.textures--}function D(T){let _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let J=0;J<_.__webglFramebuffer[Y].length;J++)i.deleteFramebuffer(_.__webglFramebuffer[Y][J]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let X=T.textures;for(let Y=0,J=X.length;Y<J;Y++){let pe=n.get(X[Y]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(X[Y])}n.remove(T)}let O=0;function ee(){O=0}function Q(){return O}function H(T){O=T}function te(){let T=O;return T>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),O+=1,T}function j(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function oe(T,_){let X=n.get(T);if(T.isVideoTexture&&U(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&X.__version!==T.version){let Y=T.image;if(Y===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ze(X,T,_);return}}else T.isExternalTexture&&(X.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+_)}function ce(T,_){let X=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&X.__version!==T.version){Ze(X,T,_);return}else T.isExternalTexture&&(X.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+_)}function me(T,_){let X=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&X.__version!==T.version){Ze(X,T,_);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+_)}function ge(T,_){let X=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&X.__version!==T.version){Ve(X,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+_)}let Me={[Po]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Lo]:i.MIRRORED_REPEAT},ke={[Kt]:i.NEAREST,[_f]:i.NEAREST_MIPMAP_NEAREST,[Sa]:i.NEAREST_MIPMAP_LINEAR,[nn]:i.LINEAR,[ol]:i.LINEAR_MIPMAP_NEAREST,[ss]:i.LINEAR_MIPMAP_LINEAR},Be={[vf]:i.NEVER,[wf]:i.ALWAYS,[bf]:i.LESS,[Wl]:i.LEQUAL,[Sf]:i.EQUAL,[Xl]:i.GEQUAL,[Mf]:i.GREATER,[Ef]:i.NOTEQUAL};function he(T,_){if(_.type===oi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===nn||_.magFilter===ol||_.magFilter===Sa||_.magFilter===ss||_.minFilter===nn||_.minFilter===ol||_.minFilter===Sa||_.minFilter===ss)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Me[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Me[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Me[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ke[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ke[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Be[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Kt||_.minFilter!==Sa&&_.minFilter!==ss||_.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function se(T,_){let X=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",L));let Y=_.source,J=g.get(Y);J===void 0&&(J={},g.set(Y,J));let pe=j(_);if(pe!==T.__cacheKey){J[pe]===void 0&&(J[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),J[pe].usedTimes++;let ve=J[T.__cacheKey];ve!==void 0&&(J[T.__cacheKey].usedTimes--,ve.usedTimes===0&&z(_)),T.__cacheKey=pe,T.__webglTexture=J[pe].texture}return X}function Se(T,_,X){return Math.floor(Math.floor(T/X)/_)}function ye(T,_,X,Y){let pe=T.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,X,Y,_.data);else{pe.sort((Ee,ie)=>Ee.start-ie.start);let ve=0;for(let Ee=1;Ee<pe.length;Ee++){let ie=pe[ve],_e=pe[Ee],Ne=ie.start+ie.count,Fe=Se(_e.start,_.width,4),xe=Se(ie.start,_.width,4);_e.start<=Ne+1&&Fe===xe&&Se(_e.start+_e.count-1,_.width,4)===Fe?ie.count=Math.max(ie.count,_e.start+_e.count-ie.start):(++ve,pe[ve]=_e)}pe.length=ve+1;let W=t.getParameter(i.UNPACK_ROW_LENGTH),k=t.getParameter(i.UNPACK_SKIP_PIXELS),re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ee=0,ie=pe.length;Ee<ie;Ee++){let _e=pe[Ee],Ne=Math.floor(_e.start/4),Fe=Math.ceil(_e.count/4),xe=Ne%_.width,N=Math.floor(Ne/_.width),be=Fe,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,xe,N,be,ae,X,Y,_.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,W),t.pixelStorei(i.UNPACK_SKIP_PIXELS,k),t.pixelStorei(i.UNPACK_SKIP_ROWS,re)}}function Ze(T,_,X){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);let J=se(T,_),pe=_.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+X);let ve=n.get(pe);if(pe.version!==ve.__version||J===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ae=vt.getPrimaries(vt.workingColorSpace),Te=_.colorSpace===Bi?null:vt.getPrimaries(_.colorSpace),Pe=_.colorSpace===Bi||ae===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let k=m(_.image,!1,s.maxTextureSize);k=ft(_,k);let re=r.convert(_.format,_.colorSpace),Ee=r.convert(_.type),ie=E(_.internalFormat,re,Ee,_.normalized,_.colorSpace,_.isVideoTexture);he(Y,_);let _e,Ne=_.mipmaps,Fe=_.isVideoTexture!==!0,xe=ve.__version===void 0||J===!0,N=pe.dataReady,be=C(_,k);if(_.isDepthTexture)ie=A(_.format===rs,_.type),xe&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,ie,k.width,k.height):t.texImage2D(i.TEXTURE_2D,0,ie,k.width,k.height,0,re,Ee,null));else if(_.isDataTexture)if(Ne.length>0){Fe&&xe&&t.texStorage2D(i.TEXTURE_2D,be,ie,Ne[0].width,Ne[0].height);for(let ae=0,Te=Ne.length;ae<Te;ae++)_e=Ne[ae],Fe?N&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,re,Ee,_e.data):t.texImage2D(i.TEXTURE_2D,ae,ie,_e.width,_e.height,0,re,Ee,_e.data);_.generateMipmaps=!1}else Fe?(xe&&t.texStorage2D(i.TEXTURE_2D,be,ie,k.width,k.height),N&&ye(_,k,re,Ee)):t.texImage2D(i.TEXTURE_2D,0,ie,k.width,k.height,0,re,Ee,k.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ie,Ne[0].width,Ne[0].height,k.depth);for(let ae=0,Te=Ne.length;ae<Te;ae++)if(_e=Ne[ae],_.format!==Zn)if(re!==null)if(Fe){if(N)if(_.layerUpdates.size>0){let Pe=Yu(_e.width,_e.height,_.format,_.type);for(let de of _.layerUpdates){let ze=_e.data.subarray(de*Pe/_e.data.BYTES_PER_ELEMENT,(de+1)*Pe/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,de,_e.width,_e.height,1,re,ze)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,k.depth,re,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,ie,_e.width,_e.height,k.depth,0,_e.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,k.depth,re,Ee,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,ie,_e.width,_e.height,k.depth,0,re,Ee,_e.data)}else{Fe&&xe&&t.texStorage2D(i.TEXTURE_2D,be,ie,Ne[0].width,Ne[0].height);for(let ae=0,Te=Ne.length;ae<Te;ae++)_e=Ne[ae],_.format!==Zn?re!==null?Fe?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,re,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,ie,_e.width,_e.height,0,_e.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?N&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,re,Ee,_e.data):t.texImage2D(i.TEXTURE_2D,ae,ie,_e.width,_e.height,0,re,Ee,_e.data)}else if(_.isDataArrayTexture)if(Fe){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ie,k.width,k.height,k.depth),N)if(_.layerUpdates.size>0){let ae=Yu(k.width,k.height,_.format,_.type);for(let Te of _.layerUpdates){let Pe=k.data.subarray(Te*ae/k.data.BYTES_PER_ELEMENT,(Te+1)*ae/k.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Te,k.width,k.height,1,re,Ee,Pe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,k.width,k.height,k.depth,re,Ee,k.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ie,k.width,k.height,k.depth,0,re,Ee,k.data);else if(_.isData3DTexture)Fe?(xe&&t.texStorage3D(i.TEXTURE_3D,be,ie,k.width,k.height,k.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,k.width,k.height,k.depth,re,Ee,k.data)):t.texImage3D(i.TEXTURE_3D,0,ie,k.width,k.height,k.depth,0,re,Ee,k.data);else if(_.isFramebufferTexture){if(xe)if(Fe)t.texStorage2D(i.TEXTURE_2D,be,ie,k.width,k.height);else{let ae=k.width,Te=k.height;for(let Pe=0;Pe<be;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,ie,ae,Te,0,re,Ee,null),ae>>=1,Te>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),k.parentNode!==ae){ae.appendChild(k),p.add(_),ae.onpaint=Te=>{let Pe=Te.changedElements;for(let de of p)Pe.includes(de.image)&&(de.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,k);else{let Pe=i.RGBA,de=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,de,ze,k)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Fe&&xe){let ae=Ke(Ne[0]);t.texStorage2D(i.TEXTURE_2D,be,ie,ae.width,ae.height)}for(let ae=0,Te=Ne.length;ae<Te;ae++)_e=Ne[ae],Fe?N&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,re,Ee,_e):t.texImage2D(i.TEXTURE_2D,ae,ie,re,Ee,_e);_.generateMipmaps=!1}else if(Fe){if(xe){let ae=Ke(k);t.texStorage2D(i.TEXTURE_2D,be,ie,ae.width,ae.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,Ee,k)}else t.texImage2D(i.TEXTURE_2D,0,ie,re,Ee,k);f(_)&&R(Y),ve.__version=pe.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ve(T,_,X){if(_.image.length!==6)return;let Y=se(T,_),J=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+X);let pe=n.get(J);if(J.version!==pe.__version||Y===!0){t.activeTexture(i.TEXTURE0+X);let ve=vt.getPrimaries(vt.workingColorSpace),W=_.colorSpace===Bi?null:vt.getPrimaries(_.colorSpace),k=_.colorSpace===Bi||ve===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,k);let re=_.isCompressedTexture||_.image[0].isCompressedTexture,Ee=_.image[0]&&_.image[0].isDataTexture,ie=[];for(let de=0;de<6;de++)!re&&!Ee?ie[de]=m(_.image[de],!0,s.maxCubemapSize):ie[de]=Ee?_.image[de].image:_.image[de],ie[de]=ft(_,ie[de]);let _e=ie[0],Ne=r.convert(_.format,_.colorSpace),Fe=r.convert(_.type),xe=E(_.internalFormat,Ne,Fe,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,be=pe.__version===void 0||Y===!0,ae=J.dataReady,Te=C(_,_e);he(i.TEXTURE_CUBE_MAP,_);let Pe;if(re){N&&be&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,xe,_e.width,_e.height);for(let de=0;de<6;de++){Pe=ie[de].mipmaps;for(let ze=0;ze<Pe.length;ze++){let De=Pe[ze];_.format!==Zn?Ne!==null?N?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,0,0,De.width,De.height,Ne,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,xe,De.width,De.height,0,De.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,0,0,De.width,De.height,Ne,Fe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,xe,De.width,De.height,0,Ne,Fe,De.data)}}}else{if(Pe=_.mipmaps,N&&be){Pe.length>0&&Te++;let de=Ke(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,xe,de.width,de.height)}for(let de=0;de<6;de++)if(Ee){N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,ie[de].width,ie[de].height,Ne,Fe,ie[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,xe,ie[de].width,ie[de].height,0,Ne,Fe,ie[de].data);for(let ze=0;ze<Pe.length;ze++){let Pt=Pe[ze].image[de].image;N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,0,0,Pt.width,Pt.height,Ne,Fe,Pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,xe,Pt.width,Pt.height,0,Ne,Fe,Pt.data)}}else{N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Ne,Fe,ie[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,xe,Ne,Fe,ie[de]);for(let ze=0;ze<Pe.length;ze++){let De=Pe[ze];N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,0,0,Ne,Fe,De.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,xe,Ne,Fe,De.image[de])}}}f(_)&&R(i.TEXTURE_CUBE_MAP),pe.__version=J.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ye(T,_,X,Y,J,pe){let ve=r.convert(X.format,X.colorSpace),W=r.convert(X.type),k=E(X.internalFormat,ve,W,X.normalized,X.colorSpace),re=n.get(_),Ee=n.get(X);if(Ee.__renderTarget=_,!re.__hasExternalTextures){let ie=Math.max(1,_.width>>pe),_e=Math.max(1,_.height>>pe);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,pe,k,ie,_e,_.depth,0,ve,W,null):t.texImage2D(J,pe,k,ie,_e,0,ve,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,J,Ee.__webglTexture,0,Oe(_)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,J,Ee.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(T,_,X){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let Y=_.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,pe=A(_.stencilBuffer,J),ve=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;at(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Oe(_),pe,_.width,_.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe(_),pe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,pe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,T)}else{let Y=_.textures;for(let J=0;J<Y.length;J++){let pe=Y[J],ve=r.convert(pe.format,pe.colorSpace),W=r.convert(pe.type),k=E(pe.internalFormat,ve,W,pe.normalized,pe.colorSpace);at(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Oe(_),k,_.width,_.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe(_),k,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,k,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function je(T,_,X){let Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",L)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),he(i.TEXTURE_CUBE_MAP,_.depthTexture);let re=r.convert(_.depthTexture.format),Ee=r.convert(_.depthTexture.type),ie;_.depthTexture.format===pi?ie=i.DEPTH_COMPONENT24:_.depthTexture.format===rs&&(ie=i.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ie,_.width,_.height,0,re,Ee,null)}}else oe(_.depthTexture,0);let pe=J.__webglTexture,ve=Oe(_),W=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,k=_.depthTexture.format===rs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===pi)at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,W,pe,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,k,W,pe,0);else if(_.depthTexture.format===rs)at(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,W,pe,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,k,W,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ht(T){let _=n.get(T),X=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let Y=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=Y}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(X)for(let Y=0;Y<6;Y++)je(_.__webglFramebuffer[Y],T,Y);else{let Y=T.texture.mipmaps;Y&&Y.length>0?je(_.__webglFramebuffer[0],T,0):je(_.__webglFramebuffer,T,0)}else if(X){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),Mt(_.__webglDepthbuffer[Y],T,!1);else{let J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,pe)}}else{let Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Mt(_.__webglDepthbuffer,T,!1);else{let J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,pe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(T,_,X){let Y=n.get(T);_!==void 0&&Ye(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&ht(T)}function tt(T){let _=T.texture,X=n.get(T),Y=n.get(_);T.addEventListener("dispose",y);let J=T.textures,pe=T.isWebGLCubeRenderTarget===!0,ve=J.length>1;if(ve||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),pe){X.__webglFramebuffer=[];for(let W=0;W<6;W++)if(_.mipmaps&&_.mipmaps.length>0){X.__webglFramebuffer[W]=[];for(let k=0;k<_.mipmaps.length;k++)X.__webglFramebuffer[W][k]=i.createFramebuffer()}else X.__webglFramebuffer[W]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){X.__webglFramebuffer=[];for(let W=0;W<_.mipmaps.length;W++)X.__webglFramebuffer[W]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ve)for(let W=0,k=J.length;W<k;W++){let re=n.get(J[W]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&at(T)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let W=0;W<J.length;W++){let k=J[W];X.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[W]);let re=r.convert(k.format,k.colorSpace),Ee=r.convert(k.type),ie=E(k.internalFormat,re,Ee,k.normalized,k.colorSpace,T.isXRRenderTarget===!0),_e=Oe(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,ie,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,X.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),Mt(X.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),he(i.TEXTURE_CUBE_MAP,_);for(let W=0;W<6;W++)if(_.mipmaps&&_.mipmaps.length>0)for(let k=0;k<_.mipmaps.length;k++)Ye(X.__webglFramebuffer[W][k],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,k);else Ye(X.__webglFramebuffer[W],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);f(_)&&R(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let W=0,k=J.length;W<k;W++){let re=J[W],Ee=n.get(re),ie=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ie=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,Ee.__webglTexture),he(ie,re),Ye(X.__webglFramebuffer,T,re,i.COLOR_ATTACHMENT0+W,ie,0),f(re)&&R(ie)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(W=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,Y.__webglTexture),he(W,_),_.mipmaps&&_.mipmaps.length>0)for(let k=0;k<_.mipmaps.length;k++)Ye(X.__webglFramebuffer[k],T,_,i.COLOR_ATTACHMENT0,W,k);else Ye(X.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,W,0);f(_)&&R(W),t.unbindTexture()}T.depthBuffer&&ht(T)}function it(T){let _=T.textures;for(let X=0,Y=_.length;X<Y;X++){let J=_[X];if(f(J)){let pe=P(T),ve=n.get(J).__webglTexture;t.bindTexture(pe,ve),R(pe),t.unbindTexture()}}}let fe=[],Ue=[];function Xe(T){if(T.samples>0){if(at(T)===!1){let _=T.textures,X=T.width,Y=T.height,J=i.COLOR_BUFFER_BIT,pe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(T),W=_.length>1;if(W)for(let re=0;re<_.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);let k=T.texture.mipmaps;k&&k.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let re=0;re<_.length;re++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[re]);let Ee=n.get(_[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ee,0)}i.blitFramebuffer(0,0,X,Y,0,0,X,Y,J,i.NEAREST),c===!0&&(fe.length=0,Ue.length=0,fe.push(i.COLOR_ATTACHMENT0+re),T.depthBuffer&&T.resolveDepthBuffer===!1&&(fe.push(pe),Ue.push(pe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let re=0;re<_.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,ve.__webglColorRenderbuffer[re]);let Ee=n.get(_[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Oe(T){return Math.min(s.maxSamples,T.samples)}function at(T){let _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function ft(T,_){let X=T.colorSpace,Y=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||X!==ea&&X!==Bi&&(vt.getTransfer(X)===wt?(Y!==Zn||J!==Hn)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",X)),_}function Ke(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(u.width=T.naturalWidth||T.width,u.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(u.width=T.displayWidth,u.height=T.displayHeight):(u.width=T.width,u.height=T.height),u}this.allocateTextureUnit=te,this.resetTextureUnits=ee,this.getTextureUnits=Q,this.setTextureUnits=H,this.setTexture2D=oe,this.setTexture2DArray=ce,this.setTexture3D=me,this.setTextureCube=ge,this.rebindTextures=rt,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Ye,this.useMultisampledRTT=at,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function xv(i,e){function t(n,s=Bi){let r,a=vt.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===cl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ul)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ou)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fu)return i.BYTE;if(n===Uu)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===ll)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===gi)return i.HALF_FLOAT;if(n===zu)return i.ALPHA;if(n===ku)return i.RGB;if(n===Zn)return i.RGBA;if(n===pi)return i.DEPTH_COMPONENT;if(n===rs)return i.DEPTH_STENCIL;if(n===Vu)return i.RED;if(n===dl)return i.RED_INTEGER;if(n===as)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===fl)return i.RGBA_INTEGER;if(n===Ma||n===Ea||n===wa||n===Aa)if(a===wt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pl||n===ml||n===gl||n===_l)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xl||n===yl||n===vl||n===bl||n===Sl||n===Ta||n===Ml)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xl||n===yl)return a===wt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===bl)return r.COMPRESSED_R11_EAC;if(n===Sl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ta)return r.COMPRESSED_RG11_EAC;if(n===Ml)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===El||n===wl||n===Al||n===Tl||n===Cl||n===Rl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl||n===Fl||n===Ul||n===Ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===El)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Al)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Tl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Il)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ll)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Dl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fl)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ol)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bl||n===zl||n===kl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Bl)return a===wt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vl||n===Hl||n===Ca||n===Gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Er?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var yv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vv=`
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

}`,fd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ha(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new yn({vertexShader:yv,fragmentShader:vv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new Rs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pd=class extends si{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,u=null,h=null,p=null,d=null,g=null,v=null,b=typeof XRWebGLBinding<"u",m=new fd,f={},R=t.getContextAttributes(),P=null,E=null,A=[],C=[],L=new Je,y=null,I=new tn;I.viewport=new It;let z=new tn;z.viewport=new It;let D=[I,z],O=new il,ee=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let Se=A[se];return Se===void 0&&(Se=new _r,A[se]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(se){let Se=A[se];return Se===void 0&&(Se=new _r,A[se]=Se),Se.getGripSpace()},this.getHand=function(se){let Se=A[se];return Se===void 0&&(Se=new _r,A[se]=Se),Se.getHandSpace()};function H(se){let Se=C.indexOf(se.inputSource);if(Se===-1)return;let ye=A[Se];ye!==void 0&&(ye.update(se.inputSource,se.frame,u||a),ye.dispatchEvent({type:se.type,data:se.inputSource}))}function te(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",j);for(let se=0;se<A.length;se++){let Se=C[se];Se!==null&&(C[se]=null,A[se].disconnect(Se))}ee=null,Q=null,m.reset();for(let se in f)delete f[se];e.setRenderTarget(P),g=null,d=null,p=null,s=null,E=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(se){u=se},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(P=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",te),s.addEventListener("inputsourceschange",j),R.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(L),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ze=null,Ve=null;R.depth&&(Ve=R.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=R.stencil?rs:pi,Ze=R.stencil?Er:ai);let Ye={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};p=this.getBinding(),d=p.createProjectionLayer(Ye),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new On(d.textureWidth,d.textureHeight,{format:Zn,type:Hn,depthTexture:new Oi(d.textureWidth,d.textureHeight,Ze,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ye={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new On(g.framebufferWidth,g.framebufferHeight,{format:Zn,type:Hn,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await s.requestReferenceSpace(o),he.setContext(s),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(se){for(let Se=0;Se<se.removed.length;Se++){let ye=se.removed[Se],Ze=C.indexOf(ye);Ze>=0&&(C[Ze]=null,A[Ze].disconnect(ye))}for(let Se=0;Se<se.added.length;Se++){let ye=se.added[Se],Ze=C.indexOf(ye);if(Ze===-1){for(let Ye=0;Ye<A.length;Ye++)if(Ye>=C.length){C.push(ye),Ze=Ye;break}else if(C[Ye]===null){C[Ye]=ye,Ze=Ye;break}if(Ze===-1)break}let Ve=A[Ze];Ve&&Ve.connect(ye)}}let oe=new B,ce=new B;function me(se,Se,ye){oe.setFromMatrixPosition(Se.matrixWorld),ce.setFromMatrixPosition(ye.matrixWorld);let Ze=oe.distanceTo(ce),Ve=Se.projectionMatrix.elements,Ye=ye.projectionMatrix.elements,Mt=Ve[14]/(Ve[10]-1),je=Ve[14]/(Ve[10]+1),ht=(Ve[9]+1)/Ve[5],rt=(Ve[9]-1)/Ve[5],tt=(Ve[8]-1)/Ve[0],it=(Ye[8]+1)/Ye[0],fe=Mt*tt,Ue=Mt*it,Xe=Ze/(-tt+it),Oe=Xe*-tt;if(Se.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Oe),se.translateZ(Xe),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Ve[10]===-1)se.projectionMatrix.copy(Se.projectionMatrix),se.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{let at=Mt+Xe,U=je+Xe,ft=fe-Oe,Ke=Ue+(Ze-Oe),T=ht*je/U*at,_=rt*je/U*at;se.projectionMatrix.makePerspective(ft,Ke,T,_,at,U),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function ge(se,Se){Se===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(Se.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let Se=se.near,ye=se.far;m.texture!==null&&(m.depthNear>0&&(Se=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),O.near=z.near=I.near=Se,O.far=z.far=I.far=ye,(ee!==O.near||Q!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),ee=O.near,Q=O.far),O.layers.mask=se.layers.mask|6,I.layers.mask=O.layers.mask&-5,z.layers.mask=O.layers.mask&-3;let Ze=se.parent,Ve=O.cameras;ge(O,Ze);for(let Ye=0;Ye<Ve.length;Ye++)ge(Ve[Ye],Ze);Ve.length===2?me(O,I,z):O.projectionMatrix.copy(I.projectionMatrix),Me(se,O,Ze)};function Me(se,Se,ye){ye===null?se.matrix.copy(Se.matrixWorld):(se.matrix.copy(ye.matrixWorld),se.matrix.invert(),se.matrix.multiply(Se.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(Se.projectionMatrix),se.projectionMatrixInverse.copy(Se.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=pr*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(se){c=se,d!==null&&(d.fixedFoveation=se),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=se)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(se){return f[se]};let ke=null;function Be(se,Se){if(h=Se.getViewerPose(u||a),v=Se,h!==null){let ye=h.views;g!==null&&(e.setRenderTargetFramebuffer(E,g.framebuffer),e.setRenderTarget(E));let Ze=!1;ye.length!==O.cameras.length&&(O.cameras.length=0,Ze=!0);for(let je=0;je<ye.length;je++){let ht=ye[je],rt=null;if(g!==null)rt=g.getViewport(ht);else{let it=p.getViewSubImage(d,ht);rt=it.viewport,je===0&&(e.setRenderTargetTextures(E,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(E))}let tt=D[je];tt===void 0&&(tt=new tn,tt.layers.enable(je),tt.viewport=new It,D[je]=tt),tt.matrix.fromArray(ht.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(ht.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(rt.x,rt.y,rt.width,rt.height),je===0&&(O.matrix.copy(tt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ze===!0&&O.cameras.push(tt)}let Ve=s.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=n.getBinding();let je=p.getDepthInformation(ye[0]);je&&je.isValid&&je.texture&&m.init(je,s.renderState)}if(Ve&&Ve.includes("camera-access")&&b){e.state.unbindTexture(),p=n.getBinding();for(let je=0;je<ye.length;je++){let ht=ye[je].camera;if(ht){let rt=f[ht];rt||(rt=new ha,f[ht]=rt);let tt=p.getCameraImage(ht);rt.sourceTexture=tt}}}}for(let ye=0;ye<A.length;ye++){let Ze=C[ye],Ve=A[ye];Ze!==null&&Ve!==void 0&&Ve.update(Ze,Se,u||a)}ke&&ke(se,Se),Se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Se}),v=null}let he=new tp;he.setAnimationLoop(Be),this.setAnimationLoop=function(se){ke=se},this.dispose=function(){}}},bv=new Ut,op=new lt;op.set(-1,0,0,0,1,0,0,0,1);function Sv(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Xu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,R,P,E){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),p(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&g(m,f,E)):f.isMeshMatcapMaterial?(r(m,f),v(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),b(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,R,P):f.isSpriteMaterial?u(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===vn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===vn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let R=e.get(f),P=R.envMap,E=R.envMapRotation;P&&(m.envMap.value=P,m.envMapRotation.value.setFromMatrix4(bv.makeRotationFromEuler(E)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(op),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,R,P){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*R,m.scale.value=P*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function p(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function g(m,f,R){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===vn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function b(m,f){let R=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Mv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,A){let C=A.program;n.uniformBlockBinding(E,C)}function u(E,A){let C=s[E.id];C===void 0&&(m(E),C=h(E),s[E.id]=C,E.addEventListener("dispose",R));let L=A.program;n.updateUBOMapping(E,L);let y=e.render.frame;r[E.id]!==y&&(d(E),r[E.id]=y)}function h(E){let A=p();E.__bindingPointIndex=A;let C=i.createBuffer(),L=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,L,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,C),C}function p(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let A=s[E.id],C=E.uniforms,L=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let y=0,I=C.length;y<I;y++){let z=C[y];if(Array.isArray(z))for(let D=0,O=z.length;D<O;D++)g(z[D],y,D,L);else g(z,y,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(E,A,C,L){if(b(E,A,C,L)===!0){let y=E.__offset,I=E.value;if(Array.isArray(I)){let z=0;for(let D=0;D<I.length;D++){let O=I[D],ee=f(O);v(O,E.__data,z),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(z+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(I,E.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,E.__data)}}function v(E,A,C){typeof E=="number"||typeof E=="boolean"?A[0]=E:E.isMatrix3?(A[0]=E.elements[0],A[1]=E.elements[1],A[2]=E.elements[2],A[3]=0,A[4]=E.elements[3],A[5]=E.elements[4],A[6]=E.elements[5],A[7]=0,A[8]=E.elements[6],A[9]=E.elements[7],A[10]=E.elements[8],A[11]=0):ArrayBuffer.isView(E)?A.set(new E.constructor(E.buffer,E.byteOffset,A.length)):E.toArray(A,C)}function b(E,A,C,L){let y=E.value,I=A+"_"+C;if(L[I]===void 0)return typeof y=="number"||typeof y=="boolean"?L[I]=y:ArrayBuffer.isView(y)?L[I]=y.slice():L[I]=y.clone(),!0;{let z=L[I];if(typeof y=="number"||typeof y=="boolean"){if(z!==y)return L[I]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(z.equals(y)===!1)return z.copy(y),!0}}return!1}function m(E){let A=E.uniforms,C=0,L=16;for(let I=0,z=A.length;I<z;I++){let D=Array.isArray(A[I])?A[I]:[A[I]];for(let O=0,ee=D.length;O<ee;O++){let Q=D[O],H=Array.isArray(Q.value)?Q.value:[Q.value];for(let te=0,j=H.length;te<j;te++){let oe=H[te],ce=f(oe),me=C%L,ge=me%ce.boundary,Me=me+ge;C+=ge,Me!==0&&L-Me<ce.storage&&(C+=L-Me),Q.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=C,C+=ce.storage}}}let y=C%L;return y>0&&(C+=L-y),E.__size=C,E.__cache={},this}function f(E){let A={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(A.boundary=4,A.storage=4):E.isVector2?(A.boundary=8,A.storage=8):E.isVector3||E.isColor?(A.boundary=16,A.storage=12):E.isVector4?(A.boundary=16,A.storage=16):E.isMatrix3?(A.boundary=48,A.storage=48):E.isMatrix4?(A.boundary=64,A.storage=64):E.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(A.boundary=16,A.storage=E.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",E),A}function R(E){let A=E.target;A.removeEventListener("dispose",R);let C=a.indexOf(A.__bindingPointIndex);a.splice(C,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function P(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:u,dispose:P}}var Ev=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xi=null;function wv(){return xi===null&&(xi=new Bo(Ev,16,16,as,gi),xi.name="DFG_LUT",xi.minFilter=nn,xi.magFilter=nn,xi.wrapS=fi,xi.wrapT=fi,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}var Tr=class{constructor(e={}){let{canvas:t=Af(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:g=Hn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let b=g,m=new Set([fl,hl,dl]),f=new Set([Hn,ai,Mr,Er,cl,ul]),R=new Uint32Array(4),P=new Int32Array(4),E=new B,A=null,C=null,L=[],y=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let z=this,D=!1,O=null,ee=null,Q=null,H=null;this._outputColorSpace=$t;let te=0,j=0,oe=null,ce=-1,me=null,ge=new It,Me=new It,ke=null,Be=new xt(0),he=0,se=t.width,Se=t.height,ye=1,Ze=null,Ve=null,Ye=new It(0,0,se,Se),Mt=new It(0,0,se,Se),je=!1,ht=new ca,rt=!1,tt=!1,it=new Ut,fe=new B,Ue=new It,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Oe=!1;function at(){return oe===null?ye:1}let U=n;function ft(M,G){return t.getContext(M,G)}try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",fn,!1),U===null){let G="webgl2";if(U=ft(G,M),U===null)throw ft(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw nt("WebGLRenderer: "+M.message),M}let Ke,T,_,X,Y,J,pe,ve,W,k,re,Ee,ie,_e,Ne,Fe,xe,N,be,ae,Te,Pe,de;function ze(){Ke=new Lx(U),Ke.init(),Te=new xv(U,Ke),T=new Ex(U,Ke,e,Te),_=new gv(U,Ke),T.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),ee=U.createFramebuffer(),Q=U.createFramebuffer(),H=U.createFramebuffer(),X=new Fx(U),Y=new nv,J=new _v(U,Ke,_,Y,T,Te,X),pe=new Px(z),ve=new zg(U),Pe=new Sx(U,ve),W=new Dx(U,ve,X,Pe),k=new Ox(U,W,ve,Pe,X),N=new Ux(U,T,J),Ne=new wx(Y),re=new tv(z,pe,Ke,T,Pe,Ne),Ee=new Sv(z,Y),ie=new sv,_e=new uv(Ke),xe=new bx(z,pe,_,k,v,c),Fe=new mv(z,k,T),de=new Mv(U,X,T,_),be=new Mx(U,Ke,X),ae=new Nx(U,Ke,X),X.programs=re.programs,z.capabilities=T,z.extensions=Ke,z.properties=Y,z.renderLists=ie,z.shadowMap=Fe,z.state=_,z.info=X}ze(),b!==Hn&&(I=new zx(b,t.width,t.height,o,s,r));let De=new pd(z,U);this.xr=De,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=Ke.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Ke.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(M){M!==void 0&&(ye=M,this.setSize(se,Se,!1))},this.getSize=function(M){return M.set(se,Se)},this.setSize=function(M,G,K=!0){if(De.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}se=M,Se=G,t.width=Math.floor(M*ye),t.height=Math.floor(G*ye),K===!0&&(t.style.width=M+"px",t.style.height=G+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,M,G)},this.getDrawingBufferSize=function(M){return M.set(se*ye,Se*ye).floor()},this.setDrawingBufferSize=function(M,G,K){se=M,Se=G,ye=K,t.width=Math.floor(M*K),t.height=Math.floor(G*K),this.setViewport(0,0,M,G)},this.setEffects=function(M){if(b===Hn){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let G=0;G<M.length;G++)if(M[G].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ge)},this.getViewport=function(M){return M.copy(Ye)},this.setViewport=function(M,G,K,q){M.isVector4?Ye.set(M.x,M.y,M.z,M.w):Ye.set(M,G,K,q),_.viewport(ge.copy(Ye).multiplyScalar(ye).round())},this.getScissor=function(M){return M.copy(Mt)},this.setScissor=function(M,G,K,q){M.isVector4?Mt.set(M.x,M.y,M.z,M.w):Mt.set(M,G,K,q),_.scissor(Me.copy(Mt).multiplyScalar(ye).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(M){_.setScissorTest(je=M)},this.setOpaqueSort=function(M){Ze=M},this.setTransparentSort=function(M){Ve=M},this.getClearColor=function(M){return M.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(M=!0,G=!0,K=!0){let q=0;if(M){let Z=!1;if(oe!==null){let Re=oe.texture.format;Z=m.has(Re)}if(Z){let Re=oe.texture.type,Ae=f.has(Re),Ce=xe.getClearColor(),We=xe.getClearAlpha(),qe=Ce.r,ot=Ce.g,dt=Ce.b;Ae?(R[0]=qe,R[1]=ot,R[2]=dt,R[3]=We,U.clearBufferuiv(U.COLOR,0,R)):(P[0]=qe,P[1]=ot,P[2]=dt,P[3]=We,U.clearBufferiv(U.COLOR,0,P))}else q|=U.COLOR_BUFFER_BIT}G&&(q|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",fn,!1),xe.dispose(),ie.dispose(),_e.dispose(),Y.dispose(),pe.dispose(),k.dispose(),Pe.dispose(),de.dispose(),re.dispose(),De.dispose(),De.removeEventListener("sessionstart",Lr),De.removeEventListener("sessionend",Cn),li.stop()};function Pt(M){M.preventDefault(),sa("WebGLRenderer: Context Lost."),D=!0}function St(){sa("WebGLRenderer: Context Restored."),D=!1;let M=X.autoReset,G=Fe.enabled,K=Fe.autoUpdate,q=Fe.needsUpdate,Z=Fe.type;ze(),X.autoReset=M,Fe.enabled=G,Fe.autoUpdate=K,Fe.needsUpdate=q,Fe.type=Z}function fn(M){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function cn(M){let G=M.target;G.removeEventListener("dispose",cn),Fa(G)}function Fa(M){Jn(M),Y.remove(M)}function Jn(M){let G=Y.get(M).programs;G!==void 0&&(G.forEach(function(K){re.releaseProgram(K)}),M.isShaderMaterial&&re.releaseShaderCache(M))}this.renderBufferDirect=function(M,G,K,q,Z,Re){G===null&&(G=Xe);let Ae=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Ce=ds(M,G,K,q,Z);_.setMaterial(q,Ae);let We=K.index,qe=1;if(q.wireframe===!0){if(We=W.getWireframeAttribute(K),We===void 0)return;qe=2}let ot=K.drawRange,dt=K.attributes.position,He=ot.start*qe,bt=(ot.start+ot.count)*qe;Re!==null&&(He=Math.max(He,Re.start*qe),bt=Math.min(bt,(Re.start+Re.count)*qe)),We!==null?(He=Math.max(He,0),bt=Math.min(bt,We.count)):dt!=null&&(He=Math.max(He,0),bt=Math.min(bt,dt.count));let st=bt-He;if(st<0||st===1/0)return;Pe.setup(Z,q,Ce,K,We);let yt,gt=be;if(We!==null&&(yt=ve.get(We),gt=ae,gt.setIndex(yt)),Z.isMesh)q.wireframe===!0?(_.setLineWidth(q.wireframeLinewidth*at()),gt.setMode(U.LINES)):gt.setMode(U.TRIANGLES);else if(Z.isLine){let Bt=q.linewidth;Bt===void 0&&(Bt=1),_.setLineWidth(Bt*at()),Z.isLineSegments?gt.setMode(U.LINES):Z.isLineLoop?gt.setMode(U.LINE_LOOP):gt.setMode(U.LINE_STRIP)}else Z.isPoints?gt.setMode(U.POINTS):Z.isSprite&&gt.setMode(U.TRIANGLES);if(Z.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))gt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Bt=Z._multiDrawStarts,Ge=Z._multiDrawCounts,kt=Z._multiDrawCount,ct=We?ve.get(We).bytesPerElement:1,_t=Y.get(q).currentProgram.getUniforms();for(let In=0;In<kt;In++)_t.setValue(U,"_gl_DrawID",In),gt.render(Bt[In]/ct,Ge[In])}else if(Z.isInstancedMesh)gt.renderInstances(He,st,Z.count);else if(K.isInstancedBufferGeometry){let Bt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ge=Math.min(K.instanceCount,Bt);gt.renderInstances(He,st,Ge)}else gt.render(He,st)};function Us(M,G,K){M.transparent===!0&&M.side===Yn&&M.forceSinglePass===!1?(M.side=vn,M.needsUpdate=!0,Sn(M,G,K),M.side=Fi,M.needsUpdate=!0,Sn(M,G,K),M.side=Yn):Sn(M,G,K)}this.compile=function(M,G,K=null){K===null&&(K=M),C=_e.get(K),C.init(G),y.push(C),K.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(C.pushLight(Z),Z.castShadow&&C.pushShadow(Z))}),M!==K&&M.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(C.pushLight(Z),Z.castShadow&&C.pushShadow(Z))}),C.setupLights();let q=new Set;return M.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Re=Z.material;if(Re)if(Array.isArray(Re))for(let Ae=0;Ae<Re.length;Ae++){let Ce=Re[Ae];Us(Ce,K,Z),q.add(Ce)}else Us(Re,K,Z),q.add(Re)}),C=y.pop(),q},this.compileAsync=function(M,G,K=null){let q=this.compile(M,G,K);return new Promise(Z=>{function Re(){if(q.forEach(function(Ae){Y.get(Ae).currentProgram.isReady()&&q.delete(Ae)}),q.size===0){Z(M);return}setTimeout(Re,10)}Ke.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Os=null;function Pr(M){Os&&Os(M)}function Lr(){li.stop()}function Cn(){li.start()}let li=new tp;li.setAnimationLoop(Pr),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(M){Os=M,De.setAnimationLoop(M),M===null?li.stop():li.start()},De.addEventListener("sessionstart",Lr),De.addEventListener("sessionend",Cn),this.render=function(M,G){if(G!==void 0&&G.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(M,G);let K=De.enabled===!0&&De.isPresenting===!0,q=I!==null&&(oe===null||K)&&I.begin(z,oe);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(G),G=De.getCamera()),M.isScene===!0&&M.onBeforeRender(z,M,G,oe),C=_e.get(M,y.length),C.init(G),C.state.textureUnits=J.getTextureUnits(),y.push(C),it.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ht.setFromProjectionMatrix(it,ii,G.reversedDepth),tt=this.localClippingEnabled,rt=Ne.init(this.clippingPlanes,tt),A=ie.get(M,L.length),A.init(),L.push(A),De.enabled===!0&&De.isPresenting===!0){let Ae=z.xr.getDepthSensingMesh();Ae!==null&&Bs(Ae,G,-1/0,z.sortObjects)}Bs(M,G,0,z.sortObjects),A.finish(),z.sortObjects===!0&&A.sort(Ze,Ve,G.reversedDepth),Oe=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,Oe&&xe.addToRenderList(A,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Ne.beginShadows();let Z=C.state.shadowsArray;if(Fe.render(Z,M,G),rt===!0&&Ne.endShadows(),(q&&I.hasRenderPass())===!1){let Ae=A.opaque,Ce=A.transmissive;if(C.setupLights(),G.isArrayCamera){let We=G.cameras;if(Ce.length>0)for(let qe=0,ot=We.length;qe<ot;qe++){let dt=We[qe];Qt(Ae,Ce,M,dt)}Oe&&xe.render(M);for(let qe=0,ot=We.length;qe<ot;qe++){let dt=We[qe];Rn(A,M,dt,dt.viewport)}}else Ce.length>0&&Qt(Ae,Ce,M,G),Oe&&xe.render(M),Rn(A,M,G)}oe!==null&&j===0&&(J.updateMultisampleRenderTarget(oe),J.updateRenderTargetMipmap(oe)),q&&I.end(z),M.isScene===!0&&M.onAfterRender(z,M,G),Pe.resetDefaultState(),ce=-1,me=null,y.pop(),y.length>0?(C=y[y.length-1],J.setTextureUnits(C.state.textureUnits),rt===!0&&Ne.setGlobalState(z.clippingPlanes,C.state.camera)):C=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,O!==null&&O.renderEnd()};function Bs(M,G,K,q){if(M.visible===!1)return;if(M.layers.test(G.layers)){if(M.isGroup)K=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(G);else if(M.isLightProbeGrid)C.pushLightProbeGrid(M);else if(M.isLight)C.pushLight(M),M.castShadow&&C.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ht.intersectsSprite(M)){q&&Ue.setFromMatrixPosition(M.matrixWorld).applyMatrix4(it);let Ae=k.update(M),Ce=M.material;Ce.visible&&A.push(M,Ae,Ce,K,Ue.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ht.intersectsObject(M))){let Ae=k.update(M),Ce=M.material;if(q&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ue.copy(M.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ue.copy(Ae.boundingSphere.center)),Ue.applyMatrix4(M.matrixWorld).applyMatrix4(it)),Array.isArray(Ce)){let We=Ae.groups;for(let qe=0,ot=We.length;qe<ot;qe++){let dt=We[qe],He=Ce[dt.materialIndex];He&&He.visible&&A.push(M,Ae,He,K,Ue.z,dt)}}else Ce.visible&&A.push(M,Ae,Ce,K,Ue.z,null)}}let Re=M.children;for(let Ae=0,Ce=Re.length;Ae<Ce;Ae++)Bs(Re[Ae],G,K,q)}function Rn(M,G,K,q){let{opaque:Z,transmissive:Re,transparent:Ae}=M;C.setupLightsView(K),rt===!0&&Ne.setGlobalState(z.clippingPlanes,K),q&&_.viewport(ge.copy(q)),Z.length>0&&ci(Z,G,K),Re.length>0&&ci(Re,G,K),Ae.length>0&&ci(Ae,G,K),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Qt(M,G,K,q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[q.id]===void 0){let He=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[q.id]=new On(1,1,{generateMipmaps:!0,type:He?gi:Hn,minFilter:ss,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}let Re=C.state.transmissionRenderTarget[q.id],Ae=q.viewport||ge;Re.setSize(Ae.z*z.transmissionResolutionScale,Ae.w*z.transmissionResolutionScale);let Ce=z.getRenderTarget(),We=z.getActiveCubeFace(),qe=z.getActiveMipmapLevel();z.setRenderTarget(Re),z.getClearColor(Be),he=z.getClearAlpha(),he<1&&z.setClearColor(16777215,.5),z.clear(),Oe&&xe.render(K);let ot=z.toneMapping;z.toneMapping=ri;let dt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),C.setupLightsView(q),rt===!0&&Ne.setGlobalState(z.clippingPlanes,q),ci(M,K,q),J.updateMultisampleRenderTarget(Re),J.updateRenderTargetMipmap(Re),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let bt=0,st=G.length;bt<st;bt++){let yt=G[bt],{object:gt,geometry:Bt,material:Ge,group:kt}=yt;if(Ge.side===Yn&&gt.layers.test(q.layers)){let ct=Ge.side;Ge.side=vn,Ge.needsUpdate=!0,jt(gt,K,q,Bt,Ge,kt),Ge.side=ct,Ge.needsUpdate=!0,He=!0}}He===!0&&(J.updateMultisampleRenderTarget(Re),J.updateRenderTargetMipmap(Re))}z.setRenderTarget(Ce,We,qe),z.setClearColor(Be,he),dt!==void 0&&(q.viewport=dt),z.toneMapping=ot}function ci(M,G,K){let q=G.isScene===!0?G.overrideMaterial:null;for(let Z=0,Re=M.length;Z<Re;Z++){let Ae=M[Z],{object:Ce,geometry:We,group:qe}=Ae,ot=Ae.material;ot.allowOverride===!0&&q!==null&&(ot=q),Ce.layers.test(K.layers)&&jt(Ce,G,K,We,ot,qe)}}function jt(M,G,K,q,Z,Re){M.onBeforeRender(z,G,K,q,Z,Re),M.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Z.onBeforeRender(z,G,K,q,M,Re),Z.transparent===!0&&Z.side===Yn&&Z.forceSinglePass===!1?(Z.side=vn,Z.needsUpdate=!0,z.renderBufferDirect(K,G,q,Z,M,Re),Z.side=Fi,Z.needsUpdate=!0,z.renderBufferDirect(K,G,q,Z,M,Re),Z.side=Yn):z.renderBufferDirect(K,G,q,Z,M,Re),M.onAfterRender(z,G,K,q,Z,Re)}function Sn(M,G,K){G.isScene!==!0&&(G=Xe);let q=Y.get(M),Z=C.state.lights,Re=C.state.shadowsArray,Ae=Z.state.version,Ce=re.getParameters(M,Z.state,Re,G,K,C.state.lightProbeGridArray),We=re.getProgramCacheKey(Ce),qe=q.programs;q.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?G.environment:null,q.fog=G.fog;let ot=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;q.envMap=pe.get(M.envMap||q.environment,ot),q.envMapRotation=q.environment!==null&&M.envMap===null?G.environmentRotation:M.envMapRotation,qe===void 0&&(M.addEventListener("dispose",cn),qe=new Map,q.programs=qe);let dt=qe.get(We);if(dt!==void 0){if(q.currentProgram===dt&&q.lightsStateVersion===Ae)return pn(M,Ce),dt}else Ce.uniforms=re.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,K,Ce),M.onBeforeCompile(Ce,z),dt=re.acquireProgram(Ce,We),qe.set(We,dt),q.uniforms=Ce.uniforms;let He=q.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(He.clippingPlanes=Ne.uniform),pn(M,Ce),q.needsLights=ks(M),q.lightsStateVersion=Ae,q.needsLights&&(He.ambientLightColor.value=Z.state.ambient,He.lightProbe.value=Z.state.probe,He.directionalLights.value=Z.state.directional,He.directionalLightShadows.value=Z.state.directionalShadow,He.spotLights.value=Z.state.spot,He.spotLightShadows.value=Z.state.spotShadow,He.rectAreaLights.value=Z.state.rectArea,He.ltc_1.value=Z.state.rectAreaLTC1,He.ltc_2.value=Z.state.rectAreaLTC2,He.pointLights.value=Z.state.point,He.pointLightShadows.value=Z.state.pointShadow,He.hemisphereLights.value=Z.state.hemi,He.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,He.spotLightMatrix.value=Z.state.spotLightMatrix,He.spotLightMap.value=Z.state.spotLightMap,He.pointShadowMatrix.value=Z.state.pointShadowMatrix),q.lightProbeGrid=C.state.lightProbeGridArray.length>0,q.currentProgram=dt,q.uniformsList=null,dt}function Gn(M){if(M.uniformsList===null){let G=M.currentProgram.getUniforms();M.uniformsList=Ar.seqWithValue(G.seq,M.uniforms)}return M.uniformsList}function pn(M,G){let K=Y.get(M);K.outputColorSpace=G.outputColorSpace,K.batching=G.batching,K.batchingColor=G.batchingColor,K.instancing=G.instancing,K.instancingColor=G.instancingColor,K.instancingMorph=G.instancingMorph,K.skinning=G.skinning,K.morphTargets=G.morphTargets,K.morphNormals=G.morphNormals,K.morphColors=G.morphColors,K.morphTargetsCount=G.morphTargetsCount,K.numClippingPlanes=G.numClippingPlanes,K.numIntersection=G.numClipIntersection,K.vertexAlphas=G.vertexAlphas,K.vertexTangents=G.vertexTangents,K.toneMapping=G.toneMapping}function Ua(M,G){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(G.matrixWorld);for(let K=0,q=M.length;K<q;K++){let Z=M[K];if(Z.texture!==null&&Z.boundingBox.containsPoint(E))return Z}return null}function ds(M,G,K,q,Z){G.isScene!==!0&&(G=Xe),J.resetTextureUnits();let Re=G.fog,Ae=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?G.environment:null,Ce=oe===null?z.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:vt.workingColorSpace,We=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,qe=pe.get(q.envMap||Ae,We),ot=q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,dt=!!K.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),He=!!K.morphAttributes.position,bt=!!K.morphAttributes.normal,st=!!K.morphAttributes.color,yt=ri;q.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(yt=z.toneMapping);let gt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Bt=gt!==void 0?gt.length:0,Ge=Y.get(q),kt=C.state.lights;if(rt===!0&&(tt===!0||M!==me)){let At=M===me&&q.id===ce;Ne.setState(q,M,At)}let ct=!1;q.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==kt.state.version||Ge.outputColorSpace!==Ce||Z.isBatchedMesh&&Ge.batching===!1||!Z.isBatchedMesh&&Ge.batching===!0||Z.isBatchedMesh&&Ge.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Ge.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Ge.instancing===!1||!Z.isInstancedMesh&&Ge.instancing===!0||Z.isSkinnedMesh&&Ge.skinning===!1||!Z.isSkinnedMesh&&Ge.skinning===!0||Z.isInstancedMesh&&Ge.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ge.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ge.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ge.instancingMorph===!1&&Z.morphTexture!==null||Ge.envMap!==qe||q.fog===!0&&Ge.fog!==Re||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Ne.numPlanes||Ge.numIntersection!==Ne.numIntersection)||Ge.vertexAlphas!==ot||Ge.vertexTangents!==dt||Ge.morphTargets!==He||Ge.morphNormals!==bt||Ge.morphColors!==st||Ge.toneMapping!==yt||Ge.morphTargetsCount!==Bt||!!Ge.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(ct=!0):(ct=!0,Ge.__version=q.version);let _t=Ge.currentProgram;ct===!0&&(_t=Sn(q,G,Z),O&&q.isNodeMaterial&&O.onUpdateProgram(q,_t,Ge));let In=!1,Mn=!1,Pn=!1,Et=_t.getUniforms(),Nt=Ge.uniforms;if(_.useProgram(_t.program)&&(In=!0,Mn=!0,Pn=!0),q.id!==ce&&(ce=q.id,Mn=!0),Ge.needsLights){let At=Ua(C.state.lightProbeGridArray,Z);Ge.lightProbeGrid!==At&&(Ge.lightProbeGrid=At,Mn=!0)}if(In||me!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Et.setValue(U,"projectionMatrix",M.projectionMatrix),Et.setValue(U,"viewMatrix",M.matrixWorldInverse);let Kn=Et.map.cameraPosition;Kn!==void 0&&Kn.setValue(U,fe.setFromMatrixPosition(M.matrixWorld)),T.logarithmicDepthBuffer&&Et.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Et.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),me!==M&&(me=M,Mn=!0,Pn=!0)}if(Ge.needsLights&&(kt.state.directionalShadowMap.length>0&&Et.setValue(U,"directionalShadowMap",kt.state.directionalShadowMap,J),kt.state.spotShadowMap.length>0&&Et.setValue(U,"spotShadowMap",kt.state.spotShadowMap,J),kt.state.pointShadowMap.length>0&&Et.setValue(U,"pointShadowMap",kt.state.pointShadowMap,J)),Z.isSkinnedMesh){Et.setOptional(U,Z,"bindMatrix"),Et.setOptional(U,Z,"bindMatrixInverse");let At=Z.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Et.setValue(U,"boneTexture",At.boneTexture,J))}Z.isBatchedMesh&&(Et.setOptional(U,Z,"batchingTexture"),Et.setValue(U,"batchingTexture",Z._matricesTexture,J),Et.setOptional(U,Z,"batchingIdTexture"),Et.setValue(U,"batchingIdTexture",Z._indirectTexture,J),Et.setOptional(U,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Et.setValue(U,"batchingColorTexture",Z._colorsTexture,J));let En=K.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&N.update(Z,K,_t),(Mn||Ge.receiveShadow!==Z.receiveShadow)&&(Ge.receiveShadow=Z.receiveShadow,Et.setValue(U,"receiveShadow",Z.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&G.environment!==null&&(Nt.envMapIntensity.value=G.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=wv()),Mn){if(Et.setValue(U,"toneMappingExposure",z.toneMappingExposure),Ge.needsLights&&zs(Nt,Pn),Re&&q.fog===!0&&Ee.refreshFogUniforms(Nt,Re),Ee.refreshMaterialUniforms(Nt,q,ye,Se,C.state.transmissionRenderTarget[M.id]),Ge.needsLights&&Ge.lightProbeGrid){let At=Ge.lightProbeGrid;Nt.probesSH.value=At.texture,Nt.probesMin.value.copy(At.boundingBox.min),Nt.probesMax.value.copy(At.boundingBox.max),Nt.probesResolution.value.copy(At.resolution)}Ar.upload(U,Gn(Ge),Nt,J)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ar.upload(U,Gn(Ge),Nt,J),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Et.setValue(U,"center",Z.center),Et.setValue(U,"modelViewMatrix",Z.modelViewMatrix),Et.setValue(U,"normalMatrix",Z.normalMatrix),Et.setValue(U,"modelMatrix",Z.matrixWorld),q.uniformsGroups!==void 0){let At=q.uniformsGroups;for(let Kn=0,Mi=At.length;Kn<Mi;Kn++){let Oa=At[Kn];de.update(Oa,_t),de.bind(Oa,_t)}}return _t}function zs(M,G){M.ambientLightColor.needsUpdate=G,M.lightProbe.needsUpdate=G,M.directionalLights.needsUpdate=G,M.directionalLightShadows.needsUpdate=G,M.pointLights.needsUpdate=G,M.pointLightShadows.needsUpdate=G,M.spotLights.needsUpdate=G,M.spotLightShadows.needsUpdate=G,M.rectAreaLights.needsUpdate=G,M.hemisphereLights.needsUpdate=G}function ks(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(M,G,K){let q=Y.get(M);q.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),Y.get(M.texture).__webglTexture=G,Y.get(M.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:K,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,G){let K=Y.get(M);K.__webglFramebuffer=G,K.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(M,G=0,K=0){oe=M,te=G,j=K;let q=null,Z=!1,Re=!1;if(M){let Ce=Y.get(M);if(Ce.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,Ce.__webglFramebuffer),ge.copy(M.viewport),Me.copy(M.scissor),ke=M.scissorTest,_.viewport(ge),_.scissor(Me),_.setScissorTest(ke),ce=-1;return}else if(Ce.__webglFramebuffer===void 0)J.setupRenderTarget(M);else if(Ce.__hasExternalTextures)J.rebindTextures(M,Y.get(M.texture).__webglTexture,Y.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ot=M.depthTexture;if(Ce.__boundDepthTexture!==ot){if(ot!==null&&Y.has(ot)&&(M.width!==ot.image.width||M.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(M)}}let We=M.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Re=!0);let qe=Y.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(qe[G])?q=qe[G][K]:q=qe[G],Z=!0):M.samples>0&&J.useMultisampledRTT(M)===!1?q=Y.get(M).__webglMultisampledFramebuffer:Array.isArray(qe)?q=qe[K]:q=qe,ge.copy(M.viewport),Me.copy(M.scissor),ke=M.scissorTest}else ge.copy(Ye).multiplyScalar(ye).floor(),Me.copy(Mt).multiplyScalar(ye).floor(),ke=je;if(K!==0&&(q=ee),_.bindFramebuffer(U.FRAMEBUFFER,q)&&_.drawBuffers(M,q),_.viewport(ge),_.scissor(Me),_.setScissorTest(ke),Z){let Ce=Y.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ce.__webglTexture,K)}else if(Re){let Ce=G;for(let We=0;We<M.textures.length;We++){let qe=Y.get(M.textures[We]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+We,qe.__webglTexture,K,Ce)}}else if(M!==null&&K!==0){let Ce=Y.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ce.__webglTexture,K)}ce=-1},this.readRenderTargetPixels=function(M,G,K,q,Z,Re,Ae,Ce=0){if(!(M&&M.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=Y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(We=We[Ae]),We){_.bindFramebuffer(U.FRAMEBUFFER,We);try{let qe=M.textures[Ce],ot=qe.format,dt=qe.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ce),!T.textureFormatReadable(ot)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(dt)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=M.width-q&&K>=0&&K<=M.height-Z&&U.readPixels(G,K,q,Z,Te.convert(ot),Te.convert(dt),Re)}finally{let qe=oe!==null?Y.get(oe).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(M,G,K,q,Z,Re,Ae,Ce=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=Y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(We=We[Ae]),We)if(G>=0&&G<=M.width-q&&K>=0&&K<=M.height-Z){_.bindFramebuffer(U.FRAMEBUFFER,We);let qe=M.textures[Ce],ot=qe.format,dt=qe.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ce),!T.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let He=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,He),U.bufferData(U.PIXEL_PACK_BUFFER,Re.byteLength,U.STREAM_READ),U.readPixels(G,K,q,Z,Te.convert(ot),Te.convert(dt),0);let bt=oe!==null?Y.get(oe).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,bt);let st=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Cf(U,st,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,He),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Re),U.deleteBuffer(He),U.deleteSync(st),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,G=null,K=0){let q=Math.pow(2,-K),Z=Math.floor(M.image.width*q),Re=Math.floor(M.image.height*q),Ae=G!==null?G.x:0,Ce=G!==null?G.y:0;J.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,Ae,Ce,Z,Re),_.unbindTexture()},this.copyTextureToTexture=function(M,G,K=null,q=null,Z=0,Re=0){let Ae,Ce,We,qe,ot,dt,He,bt,st,yt=M.isCompressedTexture?M.mipmaps[Re]:M.image;if(K!==null)Ae=K.max.x-K.min.x,Ce=K.max.y-K.min.y,We=K.isBox3?K.max.z-K.min.z:1,qe=K.min.x,ot=K.min.y,dt=K.isBox3?K.min.z:0;else{let Nt=Math.pow(2,-Z);Ae=Math.floor(yt.width*Nt),Ce=Math.floor(yt.height*Nt),M.isDataArrayTexture?We=yt.depth:M.isData3DTexture?We=Math.floor(yt.depth*Nt):We=1,qe=0,ot=0,dt=0}q!==null?(He=q.x,bt=q.y,st=q.z):(He=0,bt=0,st=0);let gt=Te.convert(G.format),Bt=Te.convert(G.type),Ge;G.isData3DTexture?(J.setTexture3D(G,0),Ge=U.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(J.setTexture2DArray(G,0),Ge=U.TEXTURE_2D_ARRAY):(J.setTexture2D(G,0),Ge=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);let kt=_.getParameter(U.UNPACK_ROW_LENGTH),ct=_.getParameter(U.UNPACK_IMAGE_HEIGHT),_t=_.getParameter(U.UNPACK_SKIP_PIXELS),In=_.getParameter(U.UNPACK_SKIP_ROWS),Mn=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,yt.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,yt.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,qe),_.pixelStorei(U.UNPACK_SKIP_ROWS,ot),_.pixelStorei(U.UNPACK_SKIP_IMAGES,dt);let Pn=M.isDataArrayTexture||M.isData3DTexture,Et=G.isDataArrayTexture||G.isData3DTexture;if(M.isDepthTexture){let Nt=Y.get(M),En=Y.get(G),At=Y.get(Nt.__renderTarget),Kn=Y.get(En.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,At.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Mi=0;Mi<We;Mi++)Pn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Y.get(M).__webglTexture,Z,dt+Mi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Y.get(G).__webglTexture,Re,st+Mi)),U.blitFramebuffer(qe,ot,Ae,Ce,He,bt,Ae,Ce,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Z!==0||M.isRenderTargetTexture||Y.has(M)){let Nt=Y.get(M),En=Y.get(G);_.bindFramebuffer(U.READ_FRAMEBUFFER,Q),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,H);for(let At=0;At<We;At++)Pn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Nt.__webglTexture,Z,dt+At):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Nt.__webglTexture,Z),Et?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,En.__webglTexture,Re,st+At):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,En.__webglTexture,Re),Z!==0?U.blitFramebuffer(qe,ot,Ae,Ce,He,bt,Ae,Ce,U.COLOR_BUFFER_BIT,U.NEAREST):Et?U.copyTexSubImage3D(Ge,Re,He,bt,st+At,qe,ot,Ae,Ce):U.copyTexSubImage2D(Ge,Re,He,bt,qe,ot,Ae,Ce);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Et?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(Ge,Re,He,bt,st,Ae,Ce,We,gt,Bt,yt.data):G.isCompressedArrayTexture?U.compressedTexSubImage3D(Ge,Re,He,bt,st,Ae,Ce,We,gt,yt.data):U.texSubImage3D(Ge,Re,He,bt,st,Ae,Ce,We,gt,Bt,yt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Re,He,bt,Ae,Ce,gt,Bt,yt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Re,He,bt,yt.width,yt.height,gt,yt.data):U.texSubImage2D(U.TEXTURE_2D,Re,He,bt,Ae,Ce,gt,Bt,yt);_.pixelStorei(U.UNPACK_ROW_LENGTH,kt),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ct),_.pixelStorei(U.UNPACK_SKIP_PIXELS,_t),_.pixelStorei(U.UNPACK_SKIP_ROWS,In),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Mn),Re===0&&G.generateMipmaps&&U.generateMipmap(Ge),_.unbindTexture()},this.initRenderTarget=function(M){Y.get(M).__webglFramebuffer===void 0&&J.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?J.setTextureCube(M,0):M.isData3DTexture?J.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?J.setTexture2DArray(M,0):J.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){te=0,j=0,oe=null,_.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}};var lp=new Bn,Kl=new B,Rr=class extends ga{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Vt(e,3)),this.setAttribute("uv",new Vt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new es(t,6,1);return this.setAttribute("instanceStart",new kn(n,3,0)),this.setAttribute("instanceEnd",new kn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new es(t,6,1);return this.setAttribute("instanceColorStart",new kn(n,3,0)),this.setAttribute("instanceColorEnd",new kn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new fa(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),lp.setFromBufferAttribute(t),this.boundingBox.union(lp))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Kl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Kl)),Kl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Kl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Le.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Je},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};bn.line={uniforms:Ra.merge([Le.common,Le.fog,Le.line]),vertexShader:`
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
		`};var Ir=class extends yn{constructor(e){super({type:"LineMaterial",uniforms:Ra.clone(bn.line.uniforms),vertexShader:bn.line.vertexShader,fragmentShader:bn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var gd=new It,cp=new B,up=new B,an=new It,on=new It,yi=new It,_d=new B,xd=new Ut,ln=new xa,dp=new B,Ql=new Bn,ec=new zn,vi=new It,bi,Ns;function hp(i,e,t){return vi.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),vi.multiplyScalar(1/vi.w),vi.x=Ns/t.width,vi.y=Ns/t.height,vi.applyMatrix4(i.projectionMatrixInverse),vi.multiplyScalar(1/vi.w),Math.abs(Math.max(vi.x,vi.y))}function Av(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,c=a;o<c;o++){ln.start.fromBufferAttribute(s,o),ln.end.fromBufferAttribute(r,o),ln.applyMatrix4(t);let u=new B,h=new B;bi.distanceSqToSegment(ln.start,ln.end,h,u),h.distanceTo(u)<Ns*.5&&e.push({point:h,pointOnLine:u,distance:bi.origin.distanceTo(h),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Tv(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,c=o.attributes.instanceStart,u=o.attributes.instanceEnd,h=Math.min(o.instanceCount,c.count),p=-e.near;bi.at(1,yi),yi.w=1,yi.applyMatrix4(e.matrixWorldInverse),yi.applyMatrix4(n),yi.multiplyScalar(1/yi.w),yi.x*=r.x/2,yi.y*=r.y/2,yi.z=0,_d.copy(yi),xd.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,g=h;d<g;d++){if(an.fromBufferAttribute(c,d),on.fromBufferAttribute(u,d),an.w=1,on.w=1,an.applyMatrix4(xd),on.applyMatrix4(xd),an.z>p&&on.z>p)continue;if(an.z>p){let P=an.z-on.z,E=(an.z-p)/P;an.lerp(on,E)}else if(on.z>p){let P=on.z-an.z,E=(on.z-p)/P;on.lerp(an,E)}an.applyMatrix4(n),on.applyMatrix4(n),an.multiplyScalar(1/an.w),on.multiplyScalar(1/on.w),an.x*=r.x/2,an.y*=r.y/2,on.x*=r.x/2,on.y*=r.y/2,ln.start.copy(an),ln.start.z=0,ln.end.copy(on),ln.end.z=0;let b=ln.closestPointToPointParameter(_d,!0);ln.at(b,dp);let m=_i.lerp(an.z,on.z,b),f=m>=-1&&m<=1,R=_d.distanceTo(dp)<Ns*.5;if(f&&R){ln.start.fromBufferAttribute(c,d),ln.end.fromBufferAttribute(u,d),ln.start.applyMatrix4(a),ln.end.applyMatrix4(a);let P=new B,E=new B;bi.distanceSqToSegment(ln.start,ln.end,E,P),t.push({point:E,pointOnLine:P,distance:bi.origin.distanceTo(E),object:i,face:null,faceIndex:d,uv:null,uv1:null})}}}var tc=class extends rn{constructor(e=new Rr,t=new Ir({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,c=t.count;a<c;a++,o+=2)cp.fromBufferAttribute(t,a),up.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+cp.distanceTo(up);let r=new es(s,2,1);return e.setAttribute("instanceDistanceStart",new kn(r,1,0)),e.setAttribute("instanceDistanceEnd",new kn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;bi=e.ray;let a=this.matrixWorld,o=this.geometry,c=this.material;Ns=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),ec.copy(o.boundingSphere).applyMatrix4(a);let u;if(n)u=Ns*.5;else{let p=Math.max(s.near,ec.distanceToPoint(bi.origin));u=hp(s,p,c.resolution)}if(ec.radius+=u,bi.intersectsSphere(ec)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Ql.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Ns*.5;else{let p=Math.max(s.near,Ql.distanceToPoint(bi.origin));h=hp(s,p,c.resolution)}Ql.expandByScalar(h),bi.intersectsBox(Ql)!==!1&&(n?Av(this,t):Tv(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(gd),this.material.uniforms.resolution.value.set(gd.z,gd.w))}};var ls=Object.freeze({TREND_RESIDUAL:"trend_residual",INTELLIGENCE_UPLIFT:"intelligence_uplift",WEIGHTED_EXCLUSIVE_HYPERVOLUME:"weighted_exclusive_hypervolume",FRONTIER_DISTANCE:"frontier_distance"}),jn=Object.freeze({[ls.TREND_RESIDUAL]:{label:"\u8D8B\u52BF\u6B8B\u5DEE",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"trend_residual"},[ls.INTELLIGENCE_UPLIFT]:{label:"\u667A\u80FD\u62AC\u5347",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"intelligence_uplift"},[ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME]:{label:"\u52A0\u6743\u8D85\u4F53\u79EF",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!0,modelMetricFieldName:"weighted_exclusive_hypervolume"},[ls.FRONTIER_DISTANCE]:{label:"\u5230\u524D\u6CBF\u5782\u8DDD",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!1,modelMetricFieldName:"frontier_distance"}});function fp(i){let e=i.slice().sort((s,r)=>r[0]-s[0]||r[1]-s[1]),t=0,n=0;return e.forEach(([s,r])=>{r>n&&(t+=s*(r-n),n=r)}),t}function pp(i){if(!i.length)return 0;let e=i.slice().sort((r,a)=>a[2]-r[2]),t=0,n=null,s=[];return e.forEach(([r,a,o])=>{n!==null&&(t+=fp(s)*(n-o)),s.push([r,a]),n=o}),t+fp(s)*n}function Da(i,e){let t=i.map(r=>{let a=r.normalized_improvement_coordinates;return[Math.pow(a.cost_efficiency,e.cost),Math.pow(a.speed,e.speed),Math.pow(a.intelligence,e.intelligence)]}),n=pp(t);return{contributions:t.map((r,a)=>n-pp(t.filter((o,c)=>a!==c))),completeFrontierHypervolume:n}}function mp(i,e,t){let n=jn[e];if(!n)throw new Error(`Unknown frontier standout metric: ${e}`);return n.usesAdjustableAxisWeights?Da(i,t).contributions:i.map(s=>{let r=s.standout_metrics[n.modelMetricFieldName];return r==null||!isFinite(r)?NaN:r})}var gp=new WeakMap;async function xp(i){if(typeof DecompressionStream!="function")throw new Error("\u6D4F\u89C8\u5668\u7F3A\u5C11 gzip \u89E3\u7801\u80FD\u529B\uFF0C\u8BF7\u4F7F\u7528\u652F\u6301 DecompressionStream \u7684\u6D4F\u89C8\u5668");return JSON.parse(await new Response(i.stream().pipeThrough(new DecompressionStream("gzip"))).text())}async function Cv(i){let e=Uint8Array.from(atob(i),t=>t.charCodeAt(0));return xp(new Blob([e]))}async function yp(i,e=globalThis.fetch){if(i.schema_version!=="frontier_3d_historical_progress_browser_transport/v1"||!Array.isArray(i.payload_segment_urls)||!i.payload_segment_urls.length||i.payload_segment_urls.some(a=>typeof a!="string"||!/^[a-z0-9-]+\.gzpart$/.test(a)))throw new Error("\u5386\u53F2\u62A5\u544A\u5206\u6BB5\u8D44\u6E90\u6E05\u5355\u65E0\u6548");let t=await Promise.all(i.payload_segment_urls.map(async a=>{let o=await e(a);if(!o.ok)throw new Error(`\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u8BFB\u53D6\u5931\u8D25\uFF1A${a}\uFF08${o.status}\uFF09`);return o.arrayBuffer()})),n=new Blob(t);if(n.size!==i.compressed_payload_byte_count)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u603B\u957F\u5EA6\u4E0D\u5339\u914D");let s=await globalThis.crypto.subtle.digest("SHA-256",await n.arrayBuffer());if([...new Uint8Array(s)].map(a=>a.toString(16).padStart(2,"0")).join("")!==i.compressed_payload_sha256)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90 SHA256 \u4E0D\u5339\u914D");return xp(n)}function _p(i,e,t,n){if(i.has(e))return i.get(e);let s=Cv(t).catch(r=>{throw i.get(e)===s&&i.delete(e),r});for(i.set(e,s);i.size>n;)i.delete(i.keys().next().value);return s}async function vp(i,e){if(e.scientific_dataset)return{scientific_dataset:e.scientific_dataset,scene_geometry_definitions:i.scene_geometry_definitions};let t=gp.get(i);t||(t={frames:new Map,geometries:new Map},gp.set(i,t));let n=await _p(t.frames,e.historical_frame_id,e.scientific_dataset_compressed_base64_gzip,4);if(!n||!n.metric_variants)throw new Error("\u5386\u53F2\u65F6\u95F4\u6B65\u573A\u666F\u7ED3\u6784\u65E0\u6548");let s=i.scene_geometry_definitions_compressed_base64_gzip,r=new Array(s.length);return await Promise.all(Object.values(n.metric_variants).map(async a=>{let o=a.three_dimensional_scene.historical_scene_geometry_definition_index;if(!Number.isInteger(o)||o<0||o>=s.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");let c=await _p(t.geometries,o,s[o],8);if(!c||typeof c!="object"||Array.isArray(c))throw new Error("\u5386\u53F2\u51E0\u4F55\u7ED3\u6784\u65E0\u6548");r[o]=c})),{scientific_dataset:n,scene_geometry_definitions:r}}function yd(i,e){return i.frames.filter(t=>t.historical_view_mode===e.historical_view_mode&&t.analysis_sample_policy===e.analysis_sample_policy&&(e.intelligence_index_version==="all_versions"||t.intelligence_index_version===e.intelligence_index_version)&&(e.historical_view_mode==="observation_replay"||t.source_snapshot_id===e.source_snapshot_id)).sort((t,n)=>(t.release_cutoff_date||t.observed_at_utc).localeCompare(n.release_cutoff_date||n.observed_at_utc))}function bp(i,e){let t=e.model_observation_indices.map(s=>{if(!Number.isInteger(s)||s<0||s>=i.model_observations.length)throw new Error("\u5386\u53F2\u6A21\u578B\u89C2\u6D4B\u5F15\u7528\u8D8A\u754C");return i.model_observations[s]}),n=Object.fromEntries(Object.entries(e.scientific_dataset.metric_variants).map(([s,r])=>{let{historical_scene_geometry_definition_index:a,...o}=r.three_dimensional_scene;if(!Number.isInteger(a)||a<0||a>=i.scene_geometry_definitions.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");return[s,{...r,three_dimensional_scene:{...o,...i.scene_geometry_definitions[a]}}]}));return{...i.scientific_dataset_shared_metadata,...e.scientific_dataset,metric_variants:n,models:t}}function Rv(i,e,t){let n=!!(i&&i.intelligence_index_version!==e.intelligence_index_version),s=new Set(i?.metric_variant_summaries[t]?.pareto_model_uuids||[]),r=new Set(e.metric_variant_summaries[t]?.pareto_model_uuids||[]);return{methodology_boundary:n,entered_model_uuids:n||!i?[]:[...r].filter(a=>!s.has(a)),left_model_uuids:n||!i?[]:[...s].filter(a=>!r.has(a))}}function Sp(i,e,t){let s=i.frames.find(r=>r.source_snapshot_id===e.source_snapshot_id&&r.historical_view_mode==="observation_replay"&&r.analysis_sample_policy==="include_estimated")?.model_observation_indices.map(r=>i.model_observations[r]).find(r=>r.model_uuid===t);if(!s)return"\u672C\u6B21\u6837\u672C\u7F3A\u5E2D\u6216\u6CA1\u6709\u53EF\u7528\u667A\u80FD\u5206\uFF0C\u672A\u501F\u7528\u5176\u4ED6\u65E5\u671F\u6570\u503C";if(e.analysis_sample_policy==="measured_only"&&s.artificial_analysis_intelligence_index_is_estimated!==!1)return"\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B\uFF1A\u8BE5\u6A21\u578B\u4E3A\u4F30\u7B97\u6216\u4F30\u7B97\u72B6\u6001\u672A\u77E5\uFF0C\u672A\u7EB3\u5165\u5F53\u524D\u5206\u6790\u6837\u672C";if(e.historical_view_mode==="release_retrospective"){let r=i.frames.filter(a=>a.source_snapshot_id===e.source_snapshot_id&&a.historical_view_mode==="release_retrospective"&&a.analysis_sample_policy==="include_estimated").find(a=>a.model_observation_indices.some(o=>i.model_observations[o].model_uuid===t));if(!r)return"\u7F3A\u5C11\u5DF2\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\uFF0C\u672A\u52A0\u5165\u53D1\u5E03\u56DE\u6EAF";if(r.release_cutoff_date>e.release_cutoff_date)return`\u5C1A\u672A\u8FBE\u5230\u8BE5\u6A21\u578B\u7EDF\u4E00\u53D1\u5E03\u6B65\uFF08${r.release_cutoff_date}\uFF09`}return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6"}function Iv(i,e,t,n,s){let r=t.metric_variants[n],a=u=>(u.model_uuid||t.models[u.model_index]?.model_uuid)===s,o=r.three_dimensional_scene.displayed_model_markers.find(a);if(o){if(![o.x,o.y,o.z].every(Number.isFinite))return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6";let u=o.analysis_eligibility;return u?.is_analysis_eligible_for_current_metric_variant===!1?u.ineligibility_reason_text||"\u6240\u9009\u53E3\u5F84\u4E0B\u4E0D\u5177\u5907\u5206\u6790\u8D44\u683C":"\u8BE5\u96C6\u5408\u4E2D\u5DF2\u975E\u524D\u6CBF"}return r.excluded_models_with_drop_reason?.find(a)?.drop_reason||Sp(i,e,s)}function Pv(i){let e=null;return i.map(t=>{if(!t||!Number.isFinite(t.y))return e=null,"";let n=!e||e.version!==t.version?`M${t.x},${t.y}`:`H${t.x}V${t.y}`;return e=t,n}).join("")}function Lv(i,e,t,n,s){let r=e.metric_variant_summaries[t]?.rankings_by_metric[n]||[];if(n!=="weighted_exclusive_hypervolume"||Object.values(s).every(c=>c===1))return r;let a=e.metric_variant_summaries[t].normalized_frontier_models;if(!a){let c=bp(i,e),u=c.metric_variants[t].three_dimensional_scene.displayed_model_markers,h=new Set(e.metric_variant_summaries[t].pareto_model_uuids);a=u.map(p=>({...c.models[p.model_index],...p})).filter(p=>h.has(p.model_uuid))}let o=Da(a,s);return a.map((c,u)=>({model_uuid:c.model_uuid,value:o.contributions[u]})).sort((c,u)=>u.value-c.value||c.model_uuid.localeCompare(u.model_uuid)).map((c,u)=>({...c,rank:u+1}))}async function vd(i,{waitForSceneTransition:e=()=>Promise.resolve(),sceneTransitionState:t=()=>({is_active:!1})}={}){let n=document.getElementById("frontier-3d-historical-progress-dataset-json");if(!n)return;let s=JSON.parse(n.textContent);if(s.schema_version==="frontier_3d_historical_progress_browser_transport/v1"){let fe=document.createElement("p");fe.id="aa-historical-resource-loading-status",fe.setAttribute("role","status"),fe.textContent="\u6B63\u5728\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74\uFF0C\u5F53\u524D\u573A\u666F\u53EF\u7EE7\u7EED\u6D4F\u89C8\u3002",document.getElementById("frontier-3d-toolbar").before(fe);try{if(s=await yp(s),s.schema_version!=="frontier_3d_historical_progress_browser_projection/v1")throw new Error("\u5386\u53F2\u8D44\u6E90\u4E2D\u7684\u6295\u5F71\u7248\u672C\u4E0D\u5339\u914D");fe.remove()}catch(Ue){fe.textContent=`\u5386\u53F2\u65F6\u95F4\u8F74\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u521D\u59CB\u573A\u666F\uFF1A${String(Ue.message||Ue)}\u3002`;let Xe=document.createElement("button");Xe.type="button",Xe.textContent="\u91CD\u65B0\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74",Xe.addEventListener("click",()=>{fe.remove(),vd(i)}),fe.append(Xe);return}}if(!["frontier_3d_historical_progress_dataset/v1","frontier_3d_historical_progress_browser_projection/v1"].includes(s.schema_version))throw new Error("\u5386\u53F2\u6570\u636E\u5951\u7EA6\u7248\u672C\u4E0D\u5339\u914D");let r=new Map(s.frames.map(fe=>[fe.historical_frame_id,fe])),a=r.get(s.initial_historical_frame_id),o=a.intelligence_index_version,c=null,u=[],h=a,p=o,d=0,g=!1,v="",b=new Map,m=new Map(s.source_snapshots.map(fe=>[fe.source_snapshot_id,fe])),f=(fe,Ue,Xe)=>{let Oe=document.createElement(fe);return Ue!==void 0&&(Oe.textContent=Ue),Xe&&(Oe.id=Xe),Oe},R=(fe,Ue,Xe)=>{let Oe=f("label",Ue),at=f("select",void 0,Xe);return Oe.append(at),fe.append(Oe),at},P=(fe,Ue)=>{let Xe=f("option",Ue);return Xe.value=fe,Xe},E=(fe,Ue,Xe)=>{let Oe=f("button",fe,Ue);return Oe.type="button",Oe.addEventListener("click",Xe),Oe},A=f("details",void 0,"aa-historical-progress-controls");A.open=!matchMedia("(max-width: 640px)").matches;let C=f("summary","\u5386\u53F2\u89C6\u56FE"),L=f("div",void 0,"aa-historical-progress-fields"),y=R(L,"\u5386\u53F2\u89C6\u89D2","aa-historical-view-mode");y.append(P("release_retrospective","\u56FA\u5B9A\u7248\u672C \xB7 \u53D1\u5E03\u56DE\u6EAF"),P("observation_replay","\u771F\u5B9E\u6863\u6848 \xB7 \u89C2\u6D4B\u56DE\u653E"));let I=R(L,"\u6307\u6570\u7248\u672C","aa-historical-index-version"),z=R(L,"\u6570\u503C\u89C2\u6D4B\u5FEB\u7167","aa-historical-source-snapshot"),D=R(L,"\u5206\u6790\u6837\u672C","aa-historical-analysis-sample");D.append(P("include_estimated","\u5305\u542B\u4F30\u7B97\uFF0C\u672A\u77E5\u53E6\u6807"),P("measured_only","\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B"));let O=f("div",void 0,"aa-historical-timeline"),ee=E("\u4E0A\u4E00\u6B65","aa-historical-previous-step",()=>ht(Number(H.value)-1)),Q=E("\u4E0B\u4E00\u6B65","aa-historical-next-step",()=>ht(Number(H.value)+1)),H=f("input",void 0,"aa-historical-step-range");H.type="range",H.min="0",H.step="1",H.setAttribute("aria-label","\u9009\u62E9\u5386\u53F2\u65F6\u95F4\u6B65");let te=f("output",void 0,"aa-historical-current-date");te.htmlFor=H.id,O.append(ee,H,Q,te);let j=f("p",void 0,"aa-historical-view-explanation");A.append(C,L,O,j);let oe=(s.source_validation_outcomes||[]).filter(fe=>fe.status==="rejected");oe.length&&A.append(f("p",`\u91C7\u7528 ${s.source_snapshots.length} \u4EFD\u9A8C\u8BC1\u6837\u672C\uFF1B\u9694\u79BB ${oe.length} \u4EFD\u6765\u6E90\uFF1A${oe.map(fe=>`${fe.source_snapshot_id}\uFF08${fe.rejection_reason}\uFF09`).join("\uFF1B")}`)),document.getElementById("frontier-3d-toolbar").before(A);let ce=f("p","","aa-historical-frame-loading-status");ce.setAttribute("role","status"),ce.setAttribute("aria-live","polite"),A.after(ce);let me=f("details",void 0,"aa-historical-progress-panel");me.className="aa-control-section",me.open=!0,me.append(f("summary","\u5386\u53F2\u8FDB\u6B65\u4E0E\u8D21\u732E\u8005"));let ge=f("p",void 0,"aa-historical-coverage-summary"),Me=f("h3","\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206"),ke=document.createElementNS("http://www.w3.org/2000/svg","svg");ke.id="aa-historical-intelligence-chart";let Be=R(me,"\u540D\u6B21\u8F68\u8FF9\u6A21\u578B","aa-historical-trajectory-model"),he=document.createElementNS("http://www.w3.org/2000/svg","svg");he.id="aa-historical-rank-chart";let se=f("p",void 0,"aa-historical-method-note"),Se=f("div",void 0,"aa-historical-membership-changes");me.append(ge,Me,ke,Be.parentElement,he,se,Se),document.getElementById("aa-search-panel").after(me);let ye=()=>window.frontierThreeDimensionalVisualizationState().activeMetricVariantKey,Ze=()=>window.frontierStandoutRanking(),Ve=fe=>`${fe.observed_at_utc.replace("T"," ").replace("Z"," UTC")} \xB7 ${fe.source_model_count} \u6A21\u578B${fe.observed_at_utc_source==="inferred_from_cache_file_modification_time"?" \xB7 \u65F6\u95F4\u63A8\u65AD":""}${fe.intelligence_index_version_resolution==="api_family_refined_by_paired_catalog"?" \xB7 \u8865\u4E01\u7248\u672C\u636E\u914D\u5957\u76EE\u5F55\u7EC6\u5316":""}`,Ye=[...new Set(s.source_snapshots.map(fe=>fe.intelligence_index_version))].sort((fe,Ue)=>Ue.localeCompare(fe,void 0,{numeric:!0}));function Mt(){y.value=a.historical_view_mode,D.value=a.analysis_sample_policy,I.replaceChildren(...Ye.map(Oe=>P(Oe,`V${Oe}`))),a.historical_view_mode==="observation_replay"&&I.prepend(P("all_versions","\u5168\u90E8\u7248\u672C\uFF0C\u5206\u6BB5\u663E\u793A")),I.value=o;let fe=s.source_snapshots.filter(Oe=>o==="all_versions"||Oe.intelligence_index_version===o);z.replaceChildren(...fe.map(Oe=>P(Oe.source_snapshot_id,Ve(Oe)))),z.value=a.source_snapshot_id,z.disabled=a.historical_view_mode==="observation_replay",u=yd(s,{...a,intelligence_index_version:o}),H.max=String(Math.max(0,u.length-1)),H.value=String(u.indexOf(a)),H.setAttribute("aria-valuetext",a.release_cutoff_date||a.observed_at_utc),ee.disabled=Number(H.value)<=0,Q.disabled=Number(H.value)>=u.length-1;let Ue=m.get(a.source_snapshot_id),Xe=a.historical_view_mode==="release_retrospective"?`\u53D1\u5E03\u622A\u6B62 ${a.release_cutoff_date}`:`\u6863\u6848\u89C2\u6D4B ${a.observed_at_utc.slice(0,10)}`;te.value=`${Xe} \xB7 ${Number(H.value)+1}/${u.length}`,C.textContent=`\u5386\u53F2\u89C6\u56FE \xB7 ${Xe} \xB7 V${a.intelligence_index_version}`,j.textContent=a.historical_view_mode==="release_retrospective"?`\u6570\u503C\u56FA\u5B9A\u5728 ${Ve(Ue)}\u3002\u5DF2\u786E\u8BA4\u540C release \u7684\u5404 effort \u6309\u6700\u65E9\u53D1\u5E03\u65E5\u671F\u540C\u6B65\u6B65\u8FDB\uFF1B\u5F52\u7EC4\u672A\u77E5\u8005\u4FDD\u7559 AA \u65E5\u671F\u5E76\u53E6\u6807\u3002\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u6210\u7EE9\u4E0D\u4EE3\u8868\u53D1\u5E03\u5F53\u5E74\u5DF2\u77E5\u72B6\u6001\u3002`:`\u4EC5\u56DE\u653E\u4FDD\u7559\u7684\u89C2\u6D4B\uFF0C\u4E0D\u63D2\u503C\u3001\u4E0D\u56DE\u586B\u672A\u6765\u6570\u503C\u3002${Ve(Ue)}\uFF1B\u6837\u672C\u7F3A\u5E2D\u4E0D\u4EE3\u8868\u6A21\u578B\u5F53\u65F6\u4E0D\u53EF\u7528\u3002`}async function je(fe,Ue=!0){if(!fe)return!1;let Xe=++d,Oe=o;if(a=fe,Mt(),g=Ue,A.setAttribute("aria-busy",String(g)),me.setAttribute("aria-busy",String(g)),!Ue)return it(),!0;ce.textContent="\u6B63\u5728\u8F7D\u5165\u65F6\u95F4\u6B65\u3002",ce.title="";try{let at=await vp(s,fe);if(Xe!==d)return!1;let U=bp({...s,scene_geometry_definitions:at.scene_geometry_definitions},{...fe,scientific_dataset:at.scientific_dataset});if(await e(),Xe!==d)return!1;let ft=!1,Ke=()=>{ft||(ft=!0,h=fe,p=Oe,Xe===d&&(g=!1))};return await i(U,T=>Sp(s,fe,T),{versionBoundary:h.intelligence_index_version!==fe.intelligence_index_version,onCommitted:Ke}),Ke(),it(),Xe===d&&(ce.textContent=""),!0}catch(at){return Xe!==d||(await e(),Xe!==d)||(a=h,o=p,g=!1,Mt(),ce.textContent="\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u4E0A\u4E00\u6709\u6548\u573A\u666F\u3002\u8BF7\u91CD\u65B0\u9009\u62E9\u65F6\u95F4\u6B65\u3002",ce.title=`\u65F6\u95F4\u6B65\u8F7D\u5165\u5931\u8D25\uFF1A${String(at.message||at)}\u3002\u53EF\u4EE5\u7EE7\u7EED\u9009\u62E9\u5176\u4ED6\u65F6\u95F4\u6B65\u3002`,it()),!1}finally{Xe===d&&(A.setAttribute("aria-busy","false"),me.setAttribute("aria-busy","false"))}}function ht(fe){return je(u[Math.min(u.length-1,Math.max(0,fe))])}function rt(fe){let Ue={...a,intelligence_index_version:o,...fe},Xe=yd(s,Ue);if(!Xe.length)return!1;let Oe=Ue.release_cutoff_date&&Ue.historical_view_mode==="release_retrospective"?[...Xe].reverse().find(at=>at.release_cutoff_date<=Ue.release_cutoff_date)||Xe[0]:Xe.at(-1);return o=Ue.intelligence_index_version,je(Oe)}y.addEventListener("change",()=>{let fe=o==="all_versions"?a.intelligence_index_version:o;rt({historical_view_mode:y.value,intelligence_index_version:fe})}),I.addEventListener("change",()=>{let fe=s.source_snapshots.filter(Ue=>I.value==="all_versions"||Ue.intelligence_index_version===I.value).at(-1);rt({intelligence_index_version:I.value,source_snapshot_id:fe.source_snapshot_id,release_cutoff_date:null})}),z.addEventListener("change",()=>rt({source_snapshot_id:z.value,release_cutoff_date:null})),D.addEventListener("change",()=>rt({analysis_sample_policy:D.value})),H.addEventListener("input",()=>ht(Number(H.value))),Be.addEventListener("change",()=>{c=Be.value,it()});function tt(fe,Ue,Xe,Oe=!1,at=Ue,U=u){fe.replaceChildren(),fe.setAttribute("viewBox","0 0 360 150"),fe.setAttribute("role","img"),fe.setAttribute("aria-label",Xe);let ft=(W,k,re)=>{let Ee=document.createElementNS(fe.namespaceURI,W);return Object.entries(k).forEach(([ie,_e])=>Ee.setAttribute(ie,String(_e))),re!==void 0&&(Ee.textContent=re),fe.append(Ee),Ee};if(!Ue.filter(W=>Number.isFinite(W.value)).length){ft("text",{x:12,y:65},"\u8BE5\u533A\u95F4\u6682\u65E0\u53EF\u6BD4\u6570\u636E\u6216\u524D\u6CBF\u540D\u6B21");return}let T=U.map(W=>Date.parse(W.release_cutoff_date||W.observed_at_utc)),_=T[0],X=T.at(-1)-_||1,Y=at.filter(W=>Number.isFinite(W.value)),J=Oe?1:Math.min(...Y.map(W=>W.value)),pe=Math.max(J+1,...Y.map(W=>W.value)),ve=Ue.map(W=>Number.isFinite(W.value)?{x:35+305*(Date.parse(W.frame.release_cutoff_date||W.frame.observed_at_utc)-_)/X,y:Oe?18+100*(W.value-J)/(pe-J):118-100*(W.value-J)/(pe-J),version:W.frame.intelligence_index_version,item:W}:null);ft("path",{d:"M35,15V120H345",class:"aa-history-chart-axis"}),ft("path",{d:Pv(ve),class:"aa-history-chart-line"}),ft("text",{x:2,y:22},Oe?"1":pe.toFixed(1)),ft("text",{x:2,y:118},Oe?pe.toFixed(0):J.toFixed(1)),ft("text",{x:35,y:143},(U[0].release_cutoff_date||U[0].observed_at_utc).slice(0,10)),ft("text",{x:345,y:143,"text-anchor":"end"},(U.at(-1).release_cutoff_date||U.at(-1).observed_at_utc).slice(0,10)),ve.filter(Boolean).forEach(W=>{let k=ft("circle",{cx:W.x,cy:W.y,r:W.item.frame===h?4.5:2.5,class:"aa-history-chart-point"}),re=document.createElementNS(fe.namespaceURI,"title");re.textContent=`${W.item.frame.release_cutoff_date||W.item.frame.observed_at_utc} \xB7 V${W.version} \xB7 ${W.item.value}`,k.append(re),k.addEventListener("click",()=>je(W.item.frame))})}function it(){let fe=h,Ue=yd(s,{...fe,intelligence_index_version:p}),Xe=ye(),Oe=fe.metric_variant_summaries[Xe],at=Ze(),U=at.selectedFrontierStandoutMetricName,ft=JSON.stringify([Xe,U,at.frontierStandoutAxisWeights,Ue.map(ie=>ie.historical_frame_id)]);v!==ft&&(v=ft,b.clear());let Ke=Ue.map(ie=>(b.has(ie.historical_frame_id)||b.set(ie.historical_frame_id,Lv(s,ie,Xe,U,at.frontierStandoutAxisWeights)),b.get(ie.historical_frame_id))),T=Ue.indexOf(fe),_=Ke[T]||[],X=Ue.slice(0,T+1),Y=new Set(Ke.slice(0,T+1).flat().map(ie=>ie.model_uuid)),J=[...Y].sort((ie,_e)=>(s.models_by_uuid[ie]?.name||ie).localeCompare(s.models_by_uuid[_e]?.name||_e));Y.has(c)||(c=_[0]?.model_uuid||J[0]||null),Be.replaceChildren(...J.map(ie=>P(ie,s.models_by_uuid[ie]?.name||ie))),Be.value=c||"";let pe=fe.model_observation_indices.filter(ie=>s.release_identity_resolution_by_model_uuid?.[s.model_observations[ie].model_uuid]==="unresolved_release_group").length;ge.textContent=`${Oe.analysis_eligible_model_count} \u4E2A\u53EF\u6BD4\u6A21\u578B \xB7 ${Oe.pareto_model_uuids.length} \u4E2A\u524D\u6CBF\u6210\u5458 \xB7 \u5176\u4E2D\u4F30\u7B97 ${Oe.estimated_intelligence_count}\uFF0C\u4F30\u7B97\u72B6\u6001\u672A\u77E5 ${Oe.unknown_estimation_status_count}\uFF1Brelease \u5F52\u7EC4\u672A\u77E5 ${pe}\u3002${Oe.unavailable_reason||""}`;let ve=Ue.map(ie=>({frame:ie,value:ie.metric_variant_summaries[Xe].highest_comparable_intelligence}));tt(ke,ve.slice(0,T+1),"\u540C\u7248\u672C\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206\uFF0C\u7248\u672C\u65AD\u70B9\u4E0D\u8FDE\u63A5",!1,ve,Ue);let W=Ue.map((ie,_e)=>({frame:ie,value:Ke[_e].find(Ne=>Ne.model_uuid===c)?.rank??null}));tt(he,W.slice(0,T+1),`${s.models_by_uuid[c]?.name||"\u6240\u9009\u6A21\u578B"}\u7684${jn[U].label}\u524D\u6CBF\u540D\u6B21\u8F68\u8FF9`,!0,W,Ue),se.textContent=`\u73B0\u884C\u65B9\u6CD5 \xB7 ${jn[U].label}\uFF1B\u5206\u6790\u5168\u96C6\u4E0D\u6309\u5E74\u9F84\u5220\u9664\u6A21\u578B\u3002\u540D\u6B21\u53EA\u89E3\u91CA\u8BE5\u65F6\u70B9\u7684\u6BD4\u8F83\uFF0C\u5206\u503C\u4E0D\u4F5C\u8DE8\u65E5\u671F\u589E\u957F\u91CF\u3002${Oe.small_sample_warning||""} F1 \u5019\u9009\u672A\u542F\u7528\u3002`;let k=Rv(Ue[T-1],fe,Xe);if(Se.replaceChildren(f("h3","\u524D\u6CBF\u6210\u5458\u8FDB\u51FA")),k.methodology_boundary)Se.append(f("p","\u6307\u6570\u7248\u672C\u53D8\u5316\uFF0C\u91CD\u7F6E\u6BD4\u8F83\u8D77\u70B9\uFF1B\u4E0D\u628A\u4E24\u7248\u6210\u5458\u5DEE\u5F02\u89E3\u91CA\u4E3A\u8FDB\u6B65\u3002"));else if(!T)Se.append(f("p","\u5F53\u524D\u5E8F\u5217\u8D77\u70B9\uFF0C\u4E0D\u63A8\u65AD\u66F4\u65E9\u65E5\u671F\u7684\u6210\u5458\u3002"));else{let ie=f("ul");for(let _e of k.entered_model_uuids)ie.append(f("li",`\u8FDB\u5165\uFF1A${s.models_by_uuid[_e]?.name||_e}`));for(let _e of k.left_model_uuids)ie.append(f("li",`\u9000\u51FA\uFF1A${s.models_by_uuid[_e]?.name||_e} \xB7 ${Iv(s,fe,window.FRONTIER_3D_VISUALIZATION_DATASET,Xe,_e)}`));Se.append(ie.childNodes.length?ie:f("p","\u524D\u6CBF\u6210\u5458\u672A\u53D8\u5316\u3002")),fe.historical_view_mode==="observation_replay"&&Se.append(f("p","\u6863\u6848\u95F4\u4E5F\u53EF\u80FD\u53D1\u751F\u4EF7\u683C\u3001\u901F\u5EA6\u3001\u8BC4\u6D4B\u6216\u8986\u76D6\u53D8\u5316\uFF0C\u6B64\u5904\u4E0D\u4F5C\u56E0\u679C\u5F52\u56E0\u3002"))}let re=document.getElementById("aa-speed-metric-select"),Ee=Xe.split("__")[0];for(let ie of re.options){let _e=fe.metric_variant_summaries[`${Ee}__${ie.value}`]?.unavailable_reason;ie.disabled=!!(_e&&_e.includes("\u5F52\u4E00\u5E38\u6570")),ie.title=_e||""}}window.addEventListener("frontier-3d-view-updated",it),window.setHistoricalFrontierTimelineSelection=fe=>{if(fe.historical_frame_id){let Ue=r.get(fe.historical_frame_id);return Ue?(o=Ue.intelligence_index_version,je(Ue)):!1}return rt(fe)},window.historicalFrontierVisualizationState=()=>({...a,scientific_dataset:void 0,scientific_dataset_compressed_base64_gzip:void 0,rendered_historical_frame_id:h.historical_frame_id,is_frame_loading:g,scene_transition:t(),current_series_frame_ids:u.map(fe=>fe.historical_frame_id),selected_trajectory_model_uuid:c,source_observed_at_utc_source:m.get(a.source_snapshot_id).observed_at_utc_source,methodology_implementation_sha256:s.standout_methodology.methodology_implementation_sha256}),je(a,!1)}function Mp(i,e){return i.length===e.length&&i.every((t,n)=>t===e[n])}function Dv(i,e){if(i===e)return!0;let t=Object.keys(i.attributes);return t.length!==Object.keys(e.attributes).length||!!i.index!=!!e.index||i.index&&!Mp(i.index.array,e.index.array)?!1:t.every(n=>e.attributes[n]&&i.attributes[n].itemSize===e.attributes[n].itemSize&&Mp(i.attributes[n].array,e.attributes[n].array))}function Nv(i,e){let t=["type","opacity","map","depthTest","depthWrite","alphaTest","side","blending","sizeAttenuation","linewidth","dashed"];return i.type===e.type&&i.visible===e.visible&&i.renderOrder===e.renderOrder&&i.position.equals(e.position)&&i.quaternion.equals(e.quaternion)&&i.scale.equals(e.scale)&&t.every(n=>i.material[n]===e.material[n])&&i.material.color?.getHex()===e.material.color?.getHex()&&(i.isSprite||Dv(i.geometry,e.geometry))}function Ep({outgoingGroup:i,requestRender:e,disposeObject:t,reducedMotionMediaQuery:n}){let s=null,r=!1,a=0,o=b=>({key:b.key,object_uuid:b.object.uuid,opacity:b.object.material.opacity,position:b.object.position.toArray()});function c(b){b.transitionMaterial&&(b.object.material===b.transitionMaterial&&(b.object.material=b.originalMaterial),b.transitionMaterial.dispose(),b.transitionMaterial=null)}function u(b,m){b.transitionMaterial?b.object.material!==b.transitionMaterial&&(b.originalMaterial=b.object.material,b.transitionMaterial.copy(b.originalMaterial)):(b.originalMaterial=b.object.material,b.transitionMaterial=b.originalMaterial.clone()),b.transitionMaterial.transparent=!0,b.transitionMaterial.depthWrite=!1,b.transitionMaterial.opacity=b.originalMaterial.opacity*m,b.object.material=b.transitionMaterial}function h(b){for(let m of b.outgoingLayers)c(m),i.remove(m.object),t(m.object);b.outgoingLayers=[]}function p(b){r=!0;try{b.rebuildScene();let m=new Map(b.outgoingLayers.map(R=>[R.key,R])),f=new Set;for(let R of b.getLayers()){let P=m.get(R.key);if(!b.versionBoundary&&P&&Nv(P.object,R.object)){let E=R.object.parent;E.remove(R.object),P.object.userData.modelIndex=R.object.userData.modelIndex,R.replaceObject(P.object),t(R.object),E.add(P.object),b.retainedLayers.push(P),f.add(P)}else R.object.visible&&(b.incomingLayers.push(R),u(R,0))}b.outgoingLayers=b.outgoingLayers.filter(R=>f.has(R)?!1:R.object.visible?!0:(i.remove(R.object),t(R.object),!1)),b.onLayersReconciled(),b.hasCommitted=!0,b.resolveCommitted()}finally{r=!1}}function d(){if(!s||r)return;let b=s;b.hasCommitted||p(b),h(b),b.incomingLayers.forEach(c),s=null,a+=1,b.resolveSettled(),e()}function g(b){if(!s)return!1;if(n.matches)return d(),!1;let m=s,f=m.versionBoundary?300/2:300,R=Math.min(1,Math.max(0,(b-m.startedAt)/f)),P=1-(1-R)**4;return m.outgoingLayers.forEach(E=>u(E,1-P)),m.hasCommitted&&m.incomingLayers.forEach(E=>u(E,P)),R===1&&(m.hasCommitted?d():(h(m),p(m),m.startedAt=Math.max(b,performance.now()),m.phase="fading_in")),s!==null}function v({getLayers:b,rebuildScene:m,onLayersReconciled:f,versionBoundary:R=!1}){if(d(),n.matches)return m(),Promise.resolve();let P,E,A=new Promise(y=>{P=y}),C=new Promise(y=>{E=y}),L=b();return L.forEach(y=>i.add(y.object)),s={getLayers:b,rebuildScene:m,onLayersReconciled:f,versionBoundary:R,outgoingLayers:L,incomingLayers:[],retainedLayers:[],hasCommitted:!1,phase:R?"fading_out":"crossfading",startedAt:performance.now(),resolveCommitted:P,resolveSettled:E,settled:C},R||(p(s),s.startedAt=performance.now()),e(),A}return n.addEventListener("change",()=>{n.matches&&d()}),{replaceScene:v,advance:g,finish:d,whenSettled:()=>s?.settled||Promise.resolve(),isPickable:b=>b.parent!==i&&b.material.opacity>0,diagnostics:()=>({is_active:s!==null,phase:s?.phase||"idle",duration_ms:300,easing:"ease-out-quart",version_boundary:s?.versionBoundary||!1,retained_layers:(s?.retainedLayers||[]).map(o),incoming_layers:(s?.incomingLayers||[]).map(o),outgoing_layers:(s?.outgoingLayers||[]).map(o),temporary_material_count:[...s?.incomingLayers||[],...s?.outgoingLayers||[]].filter(b=>b.transitionMaterial).length,completed_transition_count:a})}}function wp(i){let[e,t]=i.fixed_range.map(Number),n=t-e;if(!Number.isFinite(n)||n<=0)return[];if(i.scale_type==="log"&&n>=1){let h=Math.max(1,Math.ceil(n/6)),p=[];for(let d=Math.ceil(e);d<=t;d+=h)p.push(10**d);if(p.length>=3)return p;p.length=0;for(let d=Math.floor(e);d<=t;d+=1)for(let g of[1,2,5]){let v=d+Math.log10(g);v>=e&&v<=t&&p.push(Number((g*10**d).toPrecision(12)))}return p}let s=i.scale_type==="log"?10**e:e,r=i.scale_type==="log"?10**t:t,a=(r-s)/5,o=10**Math.floor(Math.log10(a)),c=[1,2,5,10].find(h=>h*o>=a)*o;Math.floor(r/c)-Math.ceil(s/c)<2&&(c/=2);let u=[];for(let h=Math.ceil(s/c);h<=Math.floor(r/c);h+=1)u.push(Number((h*c).toPrecision(12)));return u}var Ap=i=>String(i??"").trim().replace(/\s+/g," ").toLowerCase();function Tp(i,e,t=40){let n=Ap(e);if(!n)return{groups:[],totalGroupCount:0};let s=new Map,r=new Set;for(let a of i){let o=a.base_model_name||a.name;s.has(o)||s.set(o,[]),s.get(o).push(a),[a.name,o,a.creator,a.reasoning_level_label,a.tier].some(c=>Ap(c).includes(n))&&r.add(o)}return{totalGroupCount:r.size,groups:[...r].slice(0,t).map(a=>({baseModelName:a,models:s.get(a)}))}}function bd(i,e){return(i.reasoning_level_sort_order??0)-(e.reasoning_level_sort_order??0)||String(i.name).localeCompare(String(e.name))}function Cp(i,e){return!Number.isFinite(i)||!Number.isFinite(e)||e===0?null:(i-e)/Math.abs(e)*100}function Na(i,e){return String(i).trim()===""||!Number.isFinite(Number(i))?e:Math.min(4,Math.max(.25,Number(i)))}function Gt(i,e=3){return Number.isFinite(i)?Number(i.toPrecision(e)).toString():"\u672A\u8BB0\u5F55"}function Rp(i,e,t){let n=[];return t.map(s=>{if(!s.visible||s.width>i||s.height>e)return{id:s.id,hidden:!0};let r=Math.max(0,Math.min(i-s.width,s.x));for(let a=0;a<=Math.ceil(e/(s.height+2))*2;a+=1){let o=Math.ceil(a/2)*(a%2?1:-1)*(s.height+2),c=Math.max(0,Math.min(e-s.height,s.y+o));if(!n.some(u=>r<u.right+2&&r+s.width+2>u.x&&c<u.bottom+2&&c+s.height+2>u.y))return n.push({x:r,y:c,right:r+s.width,bottom:c+s.height}),{id:s.id,hidden:!1,x:r,y:c}}return{id:s.id,hidden:!0}})}function Ip(i){let e=i.axes,t=c=>{let u=c.labels.find(h=>h.isTitle);return u?Math.max(u.width,u.height)/Math.max(1,Math.hypot(c.projectedEnd.x-c.projectedStart.x,c.projectedEnd.y-c.projectedStart.y)):0},n=e.slice().sort((c,u)=>t(u)-t(c)),s=new Set(e.flatMap(c=>c.labels.filter(u=>u.isTitle).map(u=>u.id))),r=[n,e,e.slice().reverse(),[e[1],e[2],e[0]],[e[2],e[0],e[1]],[e[0],e[2],e[1]],[e[1],e[0],e[2]]],a=[],o=-1;for(let c of r){let u=Fv(i,c.filter(Boolean)),h=u.filter(p=>s.has(p.id)&&!p.hidden).length;if(h>o&&(a=u,o=h),h===s.size)return u}return a}function Fv({canvasWidth:i,canvasHeight:e,projectedCenter:t,axes:n},s){let r=[],a=[],o=(d,g)=>d.x*g.x+d.y*g.y,c=(d,g)=>({x:d.x-g.x,y:d.y-g.y}),u=(d,g)=>({x:d.x*g,y:d.y*g}),h=d=>({x:-d.y,y:d.x}),p=(d,g)=>d.directions.reduce((v,b,m)=>v+Math.abs(o(b,g))*d.halfSizes[m],0);for(let d of[!0,!1])for(let{projectedStart:g,projectedEnd:v,labels:b}of d?s:n){let m=c(v,g),f=Math.hypot(m.x,m.y),R=f?u(m,1/f):{x:1,y:0},P=h(R),E={x:(g.x+v.x)/2,y:(g.y+v.y)/2};o(P,c(E,t))<0&&(P=u(P,-1));let A=Math.atan2(m.y,m.x)*180/Math.PI;A>90&&(A-=180),A<-90&&(A+=180);for(let C of b.filter(L=>L.isTitle===d)){let L=C.isTitle?A:0,y={id:C.id,hidden:!0,rotationDegrees:L};if(a.push(y),C.projectedDepth<-1||C.projectedDepth>1||f<1)continue;let I=L*Math.PI/180,z=(Math.abs(Math.cos(I))*C.width+Math.abs(Math.sin(I))*C.height)/2,D=(Math.abs(Math.sin(I))*C.width+Math.abs(Math.cos(I))*C.height)/2,O=C.isTitle?R:{x:1,y:0},ee={directions:[O,h(O)],halfSizes:[C.width/2,C.height/2]},Q=o(c(C.anchor,g),m)/(f*f);for(let H of C.isTitle?[48,24,-48,-24,0,40,-40,32,-32,16,-16,8,-8,36,-36,12,-12]:[16,-16,8,-8,0]){let te=C.isTitle?0:Q,j=C.isTitle?1:Q;for(let[me,ge,Me]of[["x",i,z],["y",e,D]]){let ke=Math.max(0,Me+2-P[me]*H),Be=Math.min(ge,ge-Me-2-P[me]*H),he=m[me];if(Math.abs(he)<1e-8)(g[me]<ke||g[me]>Be)&&(j=-1);else{let se=(ke-g[me])/he,Se=(Be-g[me])/he;te=Math.max(te,Math.min(se,Se)),j=Math.min(j,Math.max(se,Se))}ke>Be&&(j=-1)}if(te>j)continue;let ce=[Math.max(te,Math.min(Q,j)),te,j,...Array.from({length:7},(me,ge)=>te+(j-te)*(ge+1)/8)];for(let me of C.isTitle?ce:[Q]){let ge={x:g.x+m.x*me+P.x*H,y:g.y+m.y*me+P.y*H};if(!r.some(Me=>![...ee.directions,...Me.directions].some(ke=>Math.abs(o(c(ge,Me.center),ke))>=p(ee,ke)+p(Me,ke)+2))){Object.assign(y,{hidden:!1,...ge}),r.push({...ee,center:ge});break}}if(!y.hidden)break}}}return a}function Sd(i){if(i.schema_version==="frontier_3d_visualization_dataset/v2")return i;if(!["frontier_3d_browser_projection/v1","frontier_3d_visualization_dataset/v3","frontier_3d_browser_projection/v2","frontier_3d_visualization_dataset/v4"].includes(i.schema_version))throw new Error("\u4E0D\u652F\u6301\u7684 Frontier 3D \u6570\u636E\u5951\u7EA6\u7248\u672C");let e=["name","model_uuid","creator","base_model_name","lineage_family_key","reasoning_level_label","reasoning_level_sort_order"],t=r=>{let a=r.model_index;if(!Number.isInteger(a)||a<0||a>=i.models.length)throw new Error(`model_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let{identity_resolution:o,...c}=i.models[a];return c},n=({model_index:r,analysis_eligibility_index:a,excluded_model_explanation_index:o,...c})=>{if(a!==void 0){if(!Number.isInteger(a)||a<0||a>=(i.analysis_eligibility_definitions?.length||0))throw new Error(`analysis_eligibility_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let u=i.analysis_eligibility_definitions[a];c.analysis_eligibility={...u},Array.isArray(u.ineligibility_reason_codes)&&(c.analysis_eligibility.ineligibility_reason_codes=[...u.ineligibility_reason_codes])}if(o!==void 0){if(!Number.isInteger(o)||o<0||o>=(i.excluded_model_explanation_definitions?.length||0))throw new Error(`excluded_model_explanation_index \u5F15\u7528\u8D8A\u754C\uFF1A${o}`);let u=i.excluded_model_explanation_definitions[o];Object.assign(c,u,{missing_dimension_names:[...u.missing_dimension_names]})}return c},s=Object.fromEntries(Object.entries(i.metric_variants).map(([r,a])=>[r,{...a,model_analysis_records:a.model_analysis_records?.map(o=>({...t(o),...n(o),model_index:o.model_index})),three_dimensional_scene:{...a.three_dimensional_scene,displayed_model_markers:a.three_dimensional_scene.displayed_model_markers.map(o=>{let c=t(o),u=i.organization_identity_metadata_by_creator_name?.[c.creator]||{};return{...Object.fromEntries(["creator_uuid","organization_identity_key","country_region_category"].filter(h=>h in u).map(h=>[h,u[h]])),...c,x:c.panel?.[a.interaction_relationships?.cost_axis_field],y:c.panel?.[a.interaction_relationships?.speed_axis_field],z:c.panel?.intelligence,...n(o),panel:{...c.panel,...o.panel}}})},excluded_models_with_drop_reason:(a.excluded_models_with_drop_reason||[]).map(o=>{let c=t(o);return{name:c.name,creator:c.creator,model_uuid:c.model_uuid,...Object.fromEntries(["base_model_name","tier","reasoning_level_label","reasoning_level_sort_order"].filter(u=>u in c).map(u=>[u,c[u]])),intelligence:c.panel?.intelligence,release_date:c.panel?.release_date==="?"?null:c.panel?.release_date,...n(o)}}),interaction_relationships:{...a.interaction_relationships,lineages:Object.fromEntries(Object.entries(a.interaction_relationships?.lineages||{}).map(([o,c])=>[o,c.map(u=>{let h=t(u);return{...Object.fromEntries(e.filter(p=>p in h).map(p=>[p,h[p]])),...n(u)}})]))}}]));return{...i,metric_variants:s}}var Ed="#frontier-view-state-v1=",Uv=/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i,Ov=/^(effective|blended)__(effective|raw|tasks_per_hour)$/,Md=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t,Fs=i=>typeof i=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(i)&&Number.isFinite(Date.parse(i))&&new Date(i).toISOString().slice(0,10)===i;function Pp(i){if(!i||i.version!==1||typeof i!="object"||Array.isArray(i))return null;let e={version:1};typeof i.metric_variant_key=="string"&&Ov.test(i.metric_variant_key)&&(e.metric_variant_key=i.metric_variant_key);for(let[a,o]of[["pinned_model_uuids",c=>Uv.test(c)],["hidden_organization_identity_keys",c=>c.length>0&&c.length<=200]])Array.isArray(i[a])&&(e[a]=[...new Set(i[a].filter(c=>typeof c=="string"&&o(c)).slice(0,1024))]);["trend_residual","intelligence_uplift","frontier_distance","weighted_exclusive_hypervolume"].includes(i.standout_metric)&&(e.standout_metric=i.standout_metric);let t=i.standout_axis_weights;t&&["intelligence","cost","speed"].every(a=>Md(t[a],.25,4))&&(e.standout_axis_weights=Object.fromEntries(["intelligence","cost","speed"].map(a=>[a,t[a]])));let n=i.display;if(n&&typeof n=="object"){e.display={};for(let a of["measured_only","comparable_only","recent_release_grace_period","country_region_markers","achievable_frontier_surface","pinned_comparison_expanded"])typeof n[a]=="boolean"&&(e.display[a]=n[a]);Array.isArray(n.pinned_comparison_optional_fields)&&(e.display.pinned_comparison_optional_fields=[...new Set(n.pinned_comparison_optional_fields.filter(a=>["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"].includes(a)))]),["wireframe","solid","hidden"].includes(n.frontier_style)&&(e.display.frontier_style=n.frontier_style),Md(n.marker_size_multiplier,.5,1.5)&&(e.display.marker_size_multiplier=n.marker_size_multiplier),["off","0.5","1"].includes(n.sensitivity_intelligence_half_width)&&(e.display.sensitivity_intelligence_half_width=n.sensitivity_intelligence_half_width)}let s=i.camera,r=a=>Array.isArray(a)&&a.length===3&&a.every(o=>Md(o,-1e6,1e6));return s&&[s.position,s.target,s.up].every(r)&&Math.hypot(...s.up)>1e-6&&Math.hypot(...s.position.map((a,o)=>a-s.target[o]))>1e-6&&(e.camera={position:[...s.position],target:[...s.target],up:[...s.up]}),i.date_filter&&(i.date_filter.cutoff_date===null||Fs(i.date_filter.cutoff_date))&&["fade","hide"].includes(i.date_filter.mode)&&(e.date_filter={cutoff_date:i.date_filter.cutoff_date,mode:i.date_filter.mode}),i.table&&typeof i.table=="object"&&(e.table={},["chart","table"].includes(i.table.active_tab)&&(e.table.active_tab=i.table.active_tab),cs.some(a=>a.key===i.table.sort_field)&&(e.table.sort_field=i.table.sort_field),["asc","desc"].includes(i.table.sort_direction)&&(e.table.sort_direction=i.table.sort_direction),typeof i.table.search_text=="string"&&(e.table.search_text=i.table.search_text.slice(0,256)),["all","eligible","ineligible","displayed","excluded"].includes(i.table.analysis_filter)&&(e.table.analysis_filter=i.table.analysis_filter)),e}function Ad(i){let e=Pp(i);if(!e)throw new Error("\u89C6\u56FE\u72B6\u6001\u7248\u672C\u65E0\u6548");return Ed+encodeURIComponent(JSON.stringify(e))}function nc(i){if(!i)return{state:null,reason:null};if(!i.startsWith(Ed))return{state:null,reason:i.startsWith("#frontier-view-state-")?"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002":null};try{if(i.length>131072)throw new Error;let e=Pp(JSON.parse(decodeURIComponent(i.slice(Ed.length))));return{state:e,reason:e?null:"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}catch{return{state:null,reason:"\u5206\u4EAB\u72B6\u6001\u65E0\u6CD5\u89E3\u6790\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}}function us(i,e={}){if(e.measured_only&&i.intelligence_measurement_status!=="measured")return{visible:!1,faded:!1,reason:"\u667A\u80FD\u5206\u672A\u7ECF\u6838\u9A8C\u4E3A\u5B9E\u6D4B"};let t=i.panel?.release_date,n=Fs(e.cutoff_date)&&Fs(t)&&t>e.cutoff_date;return{visible:!(n&&e.date_mode==="hide"),faded:!!(n&&e.date_mode==="fade"),reason:n?"\u665A\u4E8E\u6240\u9009\u53D1\u5E03\u65E5\u671F":null}}var Td=i=>({measured:"\u5B9E\u6D4B",estimated:"\u4F30\u7B97",unknown:"\u672A\u77E5"})[i]||"\u672A\u77E5";function ic(i,e){return i?.is_pareto_robust==null?"\u4E0D\u53EF\u5206\u6790":i.is_pareto_robust?"\u7A33\u5065\u524D\u6CBF":i.is_near_frontier?"\u8FD1\u524D\u6CBF":e?"\u654F\u611F\u524D\u6CBF":"\u975E\u524D\u6CBF"}function wd(i){if(i.missing_dimension_names?.length)return!1;let e=i.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant;return typeof e=="boolean"?e:i.is_displayed&&Number.isFinite(i.layer)?!0:null}var cs=[{key:"name",label:"\u6A21\u578B",value:i=>i.name},{key:"creator",label:"\u5382\u5546",value:i=>i.creator},{key:"model_uuid",label:"\u6A21\u578B UUID",value:i=>i.model_uuid},{key:"intelligence",label:"\u667A\u80FD\u5206\uFF08\u5206\uFF09",value:i=>i.panel?.intelligence},{key:"measurement_status",label:"\u667A\u80FD\u5206\u72B6\u6001",value:i=>Td(i.intelligence_measurement_status)},{key:"catalog_estimated_flag",label:"\u76EE\u5F55\u539F\u59CB isEstimated",value:i=>i.artificial_analysis_intelligence_index_is_estimated},{key:"cost_to_run",label:"\u6709\u6548\u8FD0\u884C\u6210\u672C\uFF08USD\uFF09",value:i=>i.panel?.cost_to_run},{key:"blended_price_cache_input_output_7_to_2_to_1",label:"7:2:1 \u6DF7\u5408\u5355\u4EF7\uFF08USD/M tokens\uFF09",value:i=>i.panel?.blended_price_cache_input_output_7_to_2_to_1},{key:"eff_speed",label:"\u6709\u6548\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.eff_speed},{key:"output_speed",label:"\u539F\u59CB\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.output_speed},{key:"intelligence_index_tasks_per_hour",label:"\u4EFB\u52A1\u901F\u5EA6\uFF08\u4EFB\u52A1/\u5C0F\u65F6\uFF09",value:i=>i.panel?.intelligence_index_tasks_per_hour},{key:"artificial_analysis_intelligence_index_time_per_task_seconds",label:"\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09",value:i=>i.panel?.artificial_analysis_intelligence_index_time_per_task_seconds},{key:"task_time_unavailability_reason",label:"\u4EFB\u52A1\u901F\u5EA6\u7F3A\u5931\u539F\u56E0",value:i=>i.intelligence_index_task_time_evidence?.unavailability_reason},{key:"median_end_to_end_response_time_seconds",label:"API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u79D2\uFF0C\u72EC\u7ACB\u5B57\u6BB5\uFF09",value:i=>i.panel?.median_end_to_end_response_time_seconds},{key:"release_date",label:"\u53D1\u5E03\u65E5\u671F",value:i=>i.panel?.release_date==="?"?null:i.panel?.release_date},{key:"eligibility",label:"\u5206\u6790\u8D44\u683C",value:i=>wd(i)===!0?"\u5408\u683C":wd(i)===!1?"\u4E0D\u5408\u683C":"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u672A\u8BB0\u5F55\uFF09"},{key:"layer",label:"\u6B63\u5F0F\u524D\u6CBF\u5C42\u53F7",value:i=>i.layer},{key:"drop_reason",label:"\u4E0A\u56FE\u72B6\u6001\u4E0E\u539F\u56E0",value:i=>i.drop_reason},{key:"sensitivity",label:"\u654F\u611F\u6027\uFF08\u5047\u8BBE\u533A\u95F4\uFF09",value:i=>i.sensitivity_text||"\u5173\u95ED"},{key:"sources",label:"\u6570\u503C\u4E0E\u72B6\u6001\u6765\u6E90",value:i=>JSON.stringify({...i.value_provenance,intelligence:i.intelligence_measurement_evidence,intelligence_index_task_time:i.intelligence_index_task_time_evidence,api_end_to_end_latency:"Artificial Analysis API performance.median_end_to_end_response_time_seconds"})}];function Lp(i,e={}){let t=(e.search_text||"").trim().toLocaleLowerCase(),n=cs.find(r=>r.key===e.sort_field)||cs.find(r=>r.key==="intelligence"),s=e.sort_direction==="asc"?1:-1;return i.filter(r=>{if(t&&!`${r.name} ${r.creator} ${r.model_uuid||""}`.toLocaleLowerCase().includes(t))return!1;let a=wd(r);return!(e.analysis_filter==="eligible"&&a!==!0||e.analysis_filter==="ineligible"&&a!==!1||e.analysis_filter==="displayed"&&!r.is_displayed||e.analysis_filter==="excluded"&&r.is_displayed)}).sort((r,a)=>{let o=n.value(r),c=n.value(a),u=o==null||typeof o=="number"&&!Number.isFinite(o),h=c==null||typeof c=="number"&&!Number.isFinite(c);return u||h?Number(u)-Number(h)||r.model_index-a.model_index:(typeof o=="number"&&typeof c=="number"?o-c:String(o).localeCompare(String(c),"zh-CN"))*s||r.model_index-a.model_index})}function Dp(i){let e=t=>{let n=t==null?"":String(t);return typeof t=="string"&&/^[\s\u0000-\u001f]*[=+\-@]/u.test(n)&&(n="'"+n),'"'+n.replaceAll('"','""')+'"'};return"\uFEFF"+[cs.map(t=>e(t.label)).join(","),...i.map(t=>cs.map(n=>e(n.value(t))).join(","))].join(`\r
`)+`\r
`}var zt=(i,e,t)=>{let n=document.createElement(i);return n.textContent=e,t&&(n.className=t),n},Si=(i,e,t)=>{let n=zt("button",i,"aa-secondary-button");return n.type="button",e&&(n.id=e),n.addEventListener("click",t),n};function Cd(i,e){let t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=e,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),1e3)}function Rd({dataset:i,reportShell:e,toolbar:t,plotRegion:n,graphContainer:s,sidePanel:r,webglAvailable:a=!0,getVariantKey:o=()=>i.initial_variant_key,getSharedViewState:c=()=>({}),applySharedViewState:u=()=>{},onExplorationFiltersChanged:h=()=>{},modelPassesSharedFilters:p=()=>!0,resetCamera:d=()=>{},setAxisAlignedCameraView:g=()=>{},exportPng:v=()=>{},pinModel:b=()=>{}}){let m=!1,f=null,R=null,P=i.initial_variant_key,E={},A=[],C=()=>a?o():P,L={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"},y={active_tab:a?"chart":"table",sort_field:"intelligence",sort_direction:"desc",search_text:"",analysis_filter:"all"},I=[],z=zt("nav","","aa-exploration-bar");z.id="aa-model-exploration-bar",z.setAttribute("aria-label","\u89C6\u56FE\u3001\u5206\u4EAB\u4E0E\u5BFC\u51FA");let D=zt("div","","aa-exploration-tabs");D.setAttribute("role","tablist");let O=Si("\u56FE\u8868","aa-chart-view-tab",()=>Ke("chart")),ee=Si("\u5168\u6A21\u578B\u8868","aa-table-view-tab",()=>Ke("table"));for(let k of[O,ee])k.setAttribute("role","tab");O.setAttribute("aria-controls",s.id),ee.setAttribute("aria-controls","aa-all-model-table-panel"),D.append(O,ee),a||(O.disabled=!0);let Q=Si("\u91CD\u7F6E\u89C6\u89D2","aa-reset-camera-view",d),H=document.createElement("select");H.id="aa-axis-aligned-camera-view",H.setAttribute("aria-label","\u8F74\u5BF9\u9F50\u89C6\u89D2");for(let[k,re]of[["","\u8F74\u5BF9\u9F50\u89C6\u89D2"],["intelligence_cost","\u667A\u80FD \xD7 \u6210\u672C"],["intelligence_speed","\u667A\u80FD \xD7 \u901F\u5EA6"],["cost_speed","\u6210\u672C \xD7 \u901F\u5EA6"]])H.add(new Option(re,k));H.addEventListener("change",()=>{H.value&&g(H.value),H.value="",J()});let te=Si("\u590D\u5236\u89C6\u56FE\u94FE\u63A5","aa-copy-frontier-view-link",ft),j=Si("\u5BFC\u51FA 2\xD7 PNG","aa-export-frontier-png",async()=>{j.disabled=!0;try{await v(),Oe("PNG \u5DF2\u751F\u6210\uFF0C\u5305\u542B\u5F53\u524D\u89C6\u89D2\u3001\u56FE\u4F8B\u3001\u6570\u636E\u65E5\u671F\u4E0E AA \u7F72\u540D\u3002")}catch(k){Oe(`PNG \u5BFC\u51FA\u5931\u8D25\uFF1A${k?.message||"\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3"}\uFF1B\u53EF\u91CD\u8BD5\u3002`)}finally{j.disabled=!a}});Q.disabled=H.disabled=j.disabled=!a;let oe=zt("span","","aa-exploration-status");oe.id="aa-exploration-status",oe.setAttribute("role","status");let ce=document.createElement("textarea");if(ce.id="aa-frontier-view-link-fallback",ce.setAttribute("aria-label","\u53EF\u590D\u5236\u7684\u89C6\u56FE\u94FE\u63A5"),ce.readOnly=!0,ce.hidden=!0,z.append(D,Q,H,te,j,oe,ce),t.before(z),!a){e.classList.add("is-view-settings-expanded");let k=zt("p",`\u6570\u636E\u65E5\u671F\uFF1A${i.data_date||"\u672A\u77E5"} \xB7 `,"aa-exploration-note"),re=zt("a","Artificial Analysis");re.href="https://artificialanalysis.ai/",k.append(re),document.getElementById("frontier-3d-report-header").append(k);for(let[Ee,ie,_e]of[[0,"\u6210\u672C\u53E3\u5F84",i.cost_metric_definitions],[1,"\u901F\u5EA6\u53E3\u5F84",i.speed_metric_definitions]]){let Ne=zt("label",ie,"aa-toolbar-field"),Fe=document.createElement("select");Fe.setAttribute("aria-label",ie);for(let[xe,N]of Object.entries(_e))Fe.add(new Option(N.label,xe));Fe.value=P.split("__")[Ee],A.push(Fe),Fe.addEventListener("change",()=>{let xe=A.map(N=>N.value).join("__");i.metric_variants[xe]&&(P=xe,J())}),Ne.append(Fe),t.append(Ne)}}let me=zt("details","","aa-model-exploration-controls");me.id="aa-model-exploration-controls",me.append(zt("summary","\u7B5B\u9009\u4E0E\u654F\u611F\u6027 / \u65E5\u671F\u63A2\u7D22"));let ge=document.createElement("input");ge.type="checkbox",ge.id="aa-measured-intelligence-only";let Me=zt("label","\u4EC5\u5B9E\u6D4B\u667A\u80FD\u5206 ");Me.prepend(ge),ge.addEventListener("change",()=>T({measured_only:ge.checked}));let ke=document.createElement("select");ke.id="aa-sensitivity-intelligence-half-width",ke.setAttribute("aria-label","\u654F\u611F\u6027\u5047\u8BBE\u533A\u95F4");for(let[k,re]of[["off","\u654F\u611F\u6027\u6807\u6CE8\uFF1A\u5173\u95ED"],["0.5","\u667A\u80FD \xB10.5\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"],["1","\u667A\u80FD \xB11\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"]])ke.add(new Option(re,k));ke.addEventListener("change",()=>T({sensitivity_intelligence_half_width:ke.value}));let Be=document.createElement("input");Be.type="date",Be.id="aa-release-date-cutoff",Be.setAttribute("aria-label","\u53D1\u5E03\u65E5\u671F\u622A\u6B62\u65E5\u671F\uFF0C\u7559\u7A7A\u663E\u793A\u5168\u90E8"),Be.addEventListener("change",()=>{X(),T({cutoff_date:Fs(Be.value)?Be.value:null})});let he=document.createElement("select");he.id="aa-release-date-visibility-mode",he.setAttribute("aria-label","\u665A\u4E8E\u622A\u6B62\u65E5\u671F\u7684\u6A21\u578B"),he.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u6DE1\u51FA","fade")),he.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u9690\u85CF","hide")),he.addEventListener("change",()=>T({date_mode:he.value}));let se=Si("\u64AD\u653E\u53D1\u5E03\u65E5\u671F","aa-play-release-date-filter",Y);se.setAttribute("aria-pressed","false");let Se=Si("\u663E\u793A\u5168\u90E8\u65E5\u671F","aa-show-all-release-dates",()=>{X(),T({cutoff_date:null})}),ye=zt("p","\u4EC5\u63A2\u7D22\u5F53\u524D\u5FEB\u7167\u7684\u53D1\u5E03\u65E5\u671F\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97\u3002\u672A\u77E5\u53D1\u5E03\u65E5\u671F\u5355\u72EC\u4FDD\u7559\uFF0C\u4E0D\u63A8\u65AD\u65E5\u671F\u3002","aa-exploration-note"),Ze=zt("p","\u5B9E\u7EBF\u5149\u73AF\uFF1A\u7A33\u5065\u524D\u6CBF\uFF1B\u865A\u7EBF\u5149\u73AF\uFF1A\u654F\u611F\u524D\u6CBF / \u8FD1\u524D\u6CBF\u3002\u533A\u95F4\u4E3A\u72EC\u7ACB\u5047\u8BBE\uFF0C\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E5F\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE\uFF1B\u6B63\u5F0F\u524D\u6CBF\u548C\u6392\u540D\u4FDD\u6301\u5168\u5C40\u5206\u6790\u3002","aa-exploration-note");Ze.id="aa-sensitivity-legend",Ze.hidden=!0;let Ve=zt("p","\u4EFB\u52A1\u901F\u5EA6 = 3600 \xF7 \u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09\u3002API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\u662F\u53E6\u4E00\u72EC\u7ACB\u6D4B\u91CF\uFF0C\u4E0D\u7528\u4E8E\u8865\u4F4D\u3002","aa-exploration-note");me.append(Me,ke,Be,he,se,Se,ye,Ze,Ve),(r.querySelector(".aa-side-panel-body")||r).append(me);let Ye=zt("section","","aa-all-model-table-panel");Ye.id="aa-all-model-table-panel",Ye.setAttribute("role","tabpanel"),Ye.setAttribute("aria-labelledby",ee.id);let Mt=zt("div","","aa-all-model-table-tools"),je=document.createElement("input");je.type="search",je.id="aa-all-model-table-search",je.placeholder="\u7B5B\u9009\u6A21\u578B\u3001\u5382\u5546\u6216 UUID",je.setAttribute("aria-label",je.placeholder),je.addEventListener("input",()=>{y.search_text=je.value,_(),U()});let ht=document.createElement("select");ht.id="aa-all-model-analysis-filter",ht.setAttribute("aria-label","\u7B5B\u9009\u5206\u6790\u4E0E\u4E0A\u56FE\u8D44\u683C");for(let[k,re]of[["all","\u5168\u90E8\u8F93\u5165\u8BB0\u5F55"],["eligible","\u5206\u6790\u5408\u683C"],["ineligible","\u5206\u6790\u4E0D\u5408\u683C"],["displayed","\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE"],["excluded","\u672C\u53E3\u5F84\u672A\u4E0A\u56FE"]])ht.add(new Option(re,k));ht.addEventListener("change",()=>{y.analysis_filter=ht.value,_(),U()});let rt=Si("\u5BFC\u51FA\u5F53\u524D\u8868\u683C CSV","aa-export-all-model-table-csv",()=>Cd(new Blob([Dp(I)],{type:"text/csv;charset=utf-8"}),`frontier-models-${i.data_date||"unknown"}.csv`)),tt=zt("p","","aa-exploration-note");tt.id="aa-all-model-table-counts";let it=document.createElement("table");it.id="aa-all-model-table",it.append(zt("caption","\u5168\u90E8\u6A21\u578B\uFF1A\u542B\u7F3A\u503C\u3001\u88AB\u526A\u679D\u53CA\u5206\u6790\u4E0D\u5408\u683C\u8BB0\u5F55\uFF1B\u6570\u503C\u4FDD\u7559\u5168\u5C40\u5206\u6790\u53E3\u5F84\u3002"));let fe=it.createTHead().insertRow();for(let k of cs){let re=document.createElement("th");re.scope="col",re.dataset.sortField=k.key,re.append(Si(k.label,`aa-sort-model-table-${k.key}`,()=>{y.sort_direction=y.sort_field===k.key&&y.sort_direction==="desc"?"asc":"desc",y.sort_field=k.key,_(),U()})),fe.append(re)}let Ue=it.createTBody(),Xe=zt("div","","aa-all-model-table-scroll");Xe.tabIndex=0,Xe.setAttribute("aria-label","\u53EF\u6A2A\u5411\u4E0E\u7EB5\u5411\u6EDA\u52A8\u7684\u5168\u90E8\u6A21\u578B\u8868"),Xe.append(it),Mt.append(je,ht,rt),Ye.append(Mt,tt,Xe),n.append(Ye),O.addEventListener("keydown",k=>{["ArrowRight","ArrowLeft"].includes(k.key)&&(k.preventDefault(),Ke("table"),ee.focus())}),ee.addEventListener("keydown",k=>{a&&["ArrowRight","ArrowLeft"].includes(k.key)&&(k.preventDefault(),Ke("chart"),O.focus())});function Oe(k){oe.textContent=k}function at(){let k=a?c():E;return{...k,version:1,metric_variant_key:C(),display:{...k.display,measured_only:L.measured_only,sensitivity_intelligence_half_width:L.sensitivity_intelligence_half_width},date_filter:{cutoff_date:L.cutoff_date,mode:L.date_mode},table:{...y}}}function U(){m||f!==null||(f=window.setTimeout(()=>{f=null;let k=Ad(at());if(k!==window.location.hash)try{window.history.replaceState(window.history.state,"",k)}catch{Oe("\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u66F4\u65B0\u5730\u5740\u680F\uFF1B\u590D\u5236\u94FE\u63A5\u4ECD\u53EF\u4FDD\u5B58\u89C6\u56FE\u3002 ")}},0))}async function ft(){let k=window.location.href.split("#")[0]+Ad(at()),re=window.location.protocol==="file:"?" \u672C\u5730\u6587\u4EF6\u5206\u4EAB\u9700\u540C\u65F6\u63D0\u4F9B\u5BF9\u5E94 HTML\u3002":"";try{await navigator.clipboard.writeText(k),ce.hidden=!0,Oe("\u5DF2\u590D\u5236\u5F53\u524D\u89C6\u56FE\u94FE\u63A5\u3002"+re)}catch{ce.hidden=!1,ce.value=k,ce.focus(),ce.select(),Oe("\u65E0\u6CD5\u8BBF\u95EE\u526A\u8D34\u677F\uFF0C\u94FE\u63A5\u5DF2\u9009\u4E2D\uFF0C\u53EF\u624B\u52A8\u590D\u5236\u3002"+re)}}function Ke(k){y.active_tab=a?k:"table";let re=y.active_tab==="table";Ye.hidden=!re,s.style.visibility=re?"hidden":"",O.setAttribute("aria-selected",String(!re)),ee.setAttribute("aria-selected",String(re)),O.tabIndex=re?-1:0,ee.tabIndex=re?0:-1,_(),U()}function T(k){Object.assign(L,k),ge.checked=L.measured_only,Be.value=L.cutoff_date||"",he.value=L.date_mode,ke.value=L.sensitivity_intelligence_half_width,Ze.hidden=ke.value==="off",h({...L}),_(),U()}function _(){let k=i.metric_variants[C()],re=k?.three_dimensional_scene?.displayed_model_markers||[],Ee=k?.model_analysis_records;if(!Ee){let xe=new Map((i.models||[]).map(N=>[N.model_uuid||JSON.stringify([N.creator,N.name]),{...N,is_displayed:!1,drop_reason:"\u65E7\u6587\u4EF6\u672A\u7559\u5B58\u672C\u53E3\u5F84\u8D44\u683C\u6216\u672A\u4E0A\u56FE\u539F\u56E0"}]));for(let N of[...re,...k?.excluded_models_with_drop_reason||[]]){let be=N.model_uuid||JSON.stringify([N.creator,N.name]),ae=xe.get(be);xe.set(be,{...ae,...N,panel:{...ae?.panel,...N.panel,intelligence:N.panel?.intelligence??N.intelligence??ae?.panel?.intelligence,release_date:N.panel?.release_date??N.release_date??ae?.panel?.release_date},is_displayed:re.includes(N),layer:N.panel?.layer})}Ee=[...xe.values()].map((N,be)=>({...N,model_index:be}))}let ie=xe=>{if(!p(xe))return!1;if(a)return!0;let N=i.organization_identity_metadata_by_creator_name?.[xe.creator]?.organization_identity_key;if(E.hidden_organization_identity_keys?.includes(N)||E.display?.comparable_only&&xe.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant===!1)return!1;let be=re.find(ae=>ae.model_uuid===xe.model_uuid);return E.display?.recent_release_grace_period!==!1||!be?.displayed_only_because_of_recent_release_grace_period},_e=Ee.filter(xe=>ie(xe)&&us(xe,L).visible);I=Lp(_e.map(xe=>({...xe,sensitivity_text:L.sensitivity_intelligence_half_width==="off"?"\u5173\u95ED":ic(xe.sensitivity_by_intelligence_half_width?.[L.sensitivity_intelligence_half_width],xe.layer===1)})),y);let Ne=re.filter(xe=>ie(xe)&&us(xe,L).visible).length;if(tt.textContent=`\u5168\u5C40\u8F93\u5165 ${Ee.length}\uFF1B\u5F53\u524D\u7B5B\u9009\u8868\u683C ${I.length}\uFF1B\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE ${re.length}\uFF0C\u53EF\u89C1 ${Ne}\u3002${i.model_table_coverage==="all_input_records"?"":"\u65E7\u6587\u4EF6\u53EA\u8986\u76D6\u5B9E\u9645\u7559\u5B58\u8BB0\u5F55\uFF0C\u65E0\u6CD5\u6062\u590D\u539F\u59CB\u8F93\u5165\u7684\u5168\u90E8\u6A21\u578B\u3002"} \u672A\u77E5\u53D1\u5E03\u65E5\u671F ${Ee.filter(xe=>!Fs(xe.panel?.release_date)).length}\u3002`,Ye.hidden||m)return;for(let xe of fe.cells)xe.setAttribute("aria-sort",xe.dataset.sortField===y.sort_field?y.sort_direction==="asc"?"ascending":"descending":"none");let Fe=document.createDocumentFragment();for(let xe of I){let N=document.createElement("tr");N.dataset.modelUuid=xe.model_uuid||"",N.dataset.dateFaded=String(us(xe,L).faded);for(let be of cs){let ae=N.insertCell(),Te=be.value(xe);if(ae.textContent=Te==null?"\u672A\u77E5":typeof Te=="number"?Number(Te.toPrecision(6)).toString():String(Te),be.key==="name"&&a&&xe.model_uuid){let Pe=Si(xe.name,"",()=>{b(xe),J()});Pe.setAttribute("aria-label",`\u56FA\u5B9A ${xe.name}`),ae.replaceChildren(Pe)}}Fe.append(N)}Ue.replaceChildren(Fe)}function X(){R!==null&&window.clearInterval(R),R=null,se.textContent="\u64AD\u653E\u53D1\u5E03\u65E5\u671F",se.setAttribute("aria-pressed","false")}function Y(){if(R!==null){X();return}let k=[...new Set((i.models||Object.values(i.metric_variants).flatMap(ie=>ie.three_dimensional_scene.displayed_model_markers)).map(ie=>ie.panel?.release_date).filter(Fs))].sort();if(!k.length){Oe("\u6CA1\u6709\u53EF\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\u53EF\u64AD\u653E\u3002");return}let re=L.cutoff_date?k.findIndex(ie=>ie>L.cutoff_date):0;re<0&&(re=0);let Ee=()=>{T({cutoff_date:k[re++]}),re>=k.length&&X()};se.textContent="\u6682\u505C\u53D1\u5E03\u65E5\u671F",se.setAttribute("aria-pressed","true"),R=window.setInterval(Ee,900),Ee()}function J(){_(),U()}function pe(k){X(),i=k,_()}function ve(){let{state:k,reason:re}=nc(window.location.hash);if(re&&Oe(re),!!k){X(),f!==null&&window.clearTimeout(f),f=null,m=!0;try{k.table&&Object.assign(y,k.table),a||(E=k,k.metric_variant_key&&i.metric_variants[k.metric_variant_key]?P=k.metric_variant_key:k.metric_variant_key&&Oe("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002"),A.forEach((Ee,ie)=>{Ee.value=P.split("__")[ie]})),k.date_filter&&Object.assign(L,{cutoff_date:k.date_filter.cutoff_date,date_mode:k.date_filter.mode});for(let Ee of["measured_only","sensitivity_intelligence_half_width"])k.display?.[Ee]!==void 0&&(L[Ee]=k.display[Ee]);u(k,Oe),T(L),je.value=y.search_text,ht.value=y.analysis_filter,Ke(y.active_tab)}finally{m=!1}_()}}window.addEventListener("hashchange",ve),window.addEventListener("popstate",ve),window.addEventListener("pagehide",X),document.addEventListener("visibilitychange",()=>{document.hidden&&X()});let W=i.refresh_difference_report;if(W){let k=zt("details","","aa-model-exploration-controls");k.id="aa-refresh-difference-summary",k.append(zt("summary",`\u5237\u65B0\u5DEE\u5F02${i.previous_data_date?` \xB7 \u76F8\u6BD4 ${i.previous_data_date}`:""}`));let re=W.status==="comparable"?[`\u65B0\u589E ${W.added_model_uuids?.length||0}\uFF1B\u672C\u6B21\u672A\u51FA\u73B0 ${W.absent_model_uuids?.length||0}\uFF08\u4E0D\u4EE3\u8868\u9000\u5E02\uFF09\u3002`,`\u5B57\u6BB5\u7F3A\u5931\u53D8\u5316 ${W.field_missingness_changes?.length||0}\uFF1B\u53EF\u6BD4\u6B63\u503C\u53D8\u5316\u8D85\u8FC7 10%\uFF1A${W.metric_changes_exceeding_ten_percent?.length||0}\u3002`,W.frontier_comparison?.status==="comparable"?"\u524D\u6CBF\u8FDB\u51FA\u6765\u81EA\u5339\u914D\u7684\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u3002":W.frontier_comparison?.reason]:[W.reason];for(let ie of re.filter(Boolean))k.append(zt("p",ie,"aa-exploration-note"));let Ee=zt("pre",JSON.stringify(W,null,2),"aa-refresh-difference-records");if(k.append(Ee),(r.querySelector(".aa-side-panel-body")||r).append(k),W.index_version_warning){let ie=zt("p",W.index_version_warning,"aa-report-header-data-quality-warning");ie.id="aa-index-version-change-warning",document.getElementById("frontier-3d-report-header").append(ie)}}return m=!0,Ke(y.active_tab),m=!1,ve(),_(),{getState:at,getFilters:()=>({...L}),setExplorationFilters:T,sharedViewChanged:J,replaceScientificDataset:pe,refresh:_,announce:Oe,pausePlayback:X}}function Bv({radius:i,verticalFieldOfViewDegrees:e,canvasWidth:t,canvasHeight:n,paddingCssPixels:s=56}){if(![i,e,t,n].every(u=>Number.isFinite(u)&&u>0)||e>=180)throw new Error("\u81EA\u52A8\u53D6\u666F\u9700\u8981\u6709\u6548\u5305\u56F4\u7403\u3001\u89C6\u573A\u4E0E\u753B\u5E03\u5C3A\u5BF8");let r=Math.max(.4,1-2*s/t),a=Math.max(.4,1-2*s/n),o=Math.tan(_i.degToRad(e/2)),c=Math.atan(o*Math.min(a,r*t/n));return i/Math.sin(c)*1.04}function Np({camera:i,controls:e,canvas:t,graphContainer:n,getBoundingSphere:s,getInitialCameraDirection:r,hitTest:a,onCameraStateCommitted:o,onDismissOverlay:c,onClearSelection:u,onFocusSearch:h,requestRender:p}){let d=!0,g=null,v=`${window.innerWidth}:${window.innerHeight}`,b={intelligence_cost:[0,-1,0],intelligence_speed:[1,0,0],cost_speed:[0,0,1]};function m(A){i.up.fromArray(A).normalize(),e._quat.setFromUnitVectors(i.up,new B(0,1,0)),e._quatInverse.copy(e._quat).invert()}function f(A=!0){let C=s(),L=Math.max(1,n.clientWidth),y=Math.max(1,n.clientHeight);i.aspect=L/y;let I=Bv({radius:Math.max(C.radius,.01),verticalFieldOfViewDegrees:i.fov,canvasWidth:L,canvasHeight:y}),z=new B(...g?b[g]:r()).normalize();m(g==="cost_speed"?[0,1,0]:[0,0,1]),e.target.copy(C.center),i.position.copy(C.center).addScaledVector(z,I),i.near=.01,i.far=Math.max(100,I*4),e.maxDistance=Math.max(14,I*3),i.updateProjectionMatrix(),e.update(),p(),A&&o()}function R({commit:A=!0}={}){d=!0,g=null,f(A)}function P(A){return b[A]?(d=!0,g=A,f(),!0):!1}function E(A){d=!1,m(A.up),e.target.fromArray(A.target),i.position.fromArray(A.position);let C=i.position.distanceTo(e.target);e.maxDistance=Math.max(e.maxDistance,C*1.01),e.minDistance=Math.min(e.minDistance,C*.99),i.far=Math.max(100,C*4),i.updateProjectionMatrix(),e.update(),p()}return t.tabIndex=0,t.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF\uFF1B\u65B9\u5411\u952E\u65CB\u8F6C\uFF0C\u659C\u6760\u641C\u7D22\uFF0CEscape \u5173\u95ED\u6D6E\u5C42\u6216\u6E05\u9664\u56FA\u5B9A\uFF0C\u53CC\u51FB\u7A7A\u767D\u91CD\u7F6E\u89C6\u89D2"),t.addEventListener("dblclick",A=>{a(A.clientX,A.clientY)||R()}),e.addEventListener("start",()=>{d=!1}),e.addEventListener("end",o),document.addEventListener("keydown",A=>{let C=A.target.closest?.("input,textarea,select,[contenteditable='true']");if(A.key==="Escape"){if(c()){A.preventDefault(),A.stopImmediatePropagation();return}if(C)return;u(),A.preventDefault(),A.stopImmediatePropagation();return}if(C||A.ctrlKey||A.metaKey||A.altKey)return;if(A.key==="/"){A.preventDefault(),h();return}if(A.target!==t||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(A.key))return;A.preventDefault(),d=!1;let L=i.position.clone().sub(e.target),I=A.key==="ArrowLeft"||A.key==="ArrowRight"?i.up.clone():new B().crossVectors(i.up,L).normalize();L.applyAxisAngle(I,(A.key==="ArrowLeft"||A.key==="ArrowUp"?1:-1)*Math.PI/36),Math.abs(L.clone().normalize().dot(i.up))<.995&&i.position.copy(e.target).add(L),e.update(),p(),o()},!0),{resetCamera:R,setAxisAlignedCameraView:P,restoreCameraState:E,diagnostics:()=>({automaticFraming:d,selectedAxisView:g}),serializeCameraState:()=>Object.fromEntries([["position",i.position],["target",e.target],["up",i.up]].map(([A,C])=>[A,C.toArray().map(L=>Math.abs(L)<1e-10?0:Number(L.toPrecision(12)))])),onResize:()=>{let A=`${window.innerWidth}:${window.innerHeight}`;d&&A!==v&&f(!1),v=A}}}async function Fp({scene:i,camera:e,graphContainer:t,title:n,metadataLines:s,legendLines:r,pinnedModelNames:a}){let o=Math.max(1,t.clientWidth),c=Math.max(1,t.clientHeight),u=getComputedStyle(document.body).fontFamily,h=window.matchMedia("(prefers-color-scheme: dark)").matches,p=h?"#111827":"#ffffff",d=h?"#f3f4f6":"#17202a",g=document.createElement("canvas"),v=g.getContext("2d");if(!v)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u753B\u5E03");v.font=`13px ${u}`;function b(L){let y=[],I="";for(let z of String(L))v.measureText(I+z).width>Math.max(50,o-32)&&(y.push(I),I=""),I+=z;return I&&y.push(I),y}let m=[n,...s].flatMap(b),f=[...r,`\u56FA\u5B9A\u6A21\u578B\uFF1A${a.length?a.join("\u3001"):"\u65E0"}`,"\u6570\u636E\u6765\u6E90\uFF1AArtificial Analysis \xB7 https://artificialanalysis.ai/"].flatMap(b),R=20+m.length*20,P=20+f.length*20,E=document.createElement("canvas");E.width=o*2,E.height=(c+R+P)*2;let A=E.getContext("2d");if(!A)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u4E0A\u4E0B\u6587");let C;window.frontier3dLastPngExportStatus={inProgress:!0,resourcesReleased:!1,width:E.width,height:E.height};try{C=new Tr({antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),C.outputColorSpace=$t,C.setPixelRatio(2),C.setSize(o,c,!1);let L=e.clone();L.aspect=o/c,L.updateProjectionMatrix(),C.render(i,L),A.scale(2,2),A.fillStyle=p,A.fillRect(0,0,o,E.height/2),A.fillStyle=d,A.textBaseline="top",m.forEach((D,O)=>{A.font=`${O===0?"600 15":"13"}px ${u}`,A.fillText(D,16,10+O*20)}),A.drawImage(C.domElement,0,R,o,c);let y=t.getBoundingClientRect();A.save(),A.beginPath(),A.rect(0,R,o,c),A.clip();let I=[...t.querySelectorAll(".aa-threejs-axis-label,.aa-threejs-axis-tick-label,.aa-pinned-model-name-label")].sort((D,O)=>(parseInt(getComputedStyle(D).zIndex,10)||0)-(parseInt(getComputedStyle(O).zIndex,10)||0));for(let D of I){if(D.hidden||D.style.display==="none")continue;let O=D.getBoundingClientRect();if(!O.width||!O.height)continue;let ee=O.x-y.x+O.width/2,Q=R+O.y-y.y+O.height/2,H=/rotate\(([-\d.]+)deg\)/.exec(D.style.transform)?.[1]||0;A.save(),A.translate(ee,Q),A.rotate(Number(H)*Math.PI/180);let te=getComputedStyle(D),j=parseFloat(te.fontSize)||12,oe=parseFloat(te.lineHeight)||j*1.3;A.font=`${te.fontWeight} ${j}px ${u}`;let ce=(D.textContent+(D.dataset.directionHint||"")).replace(/\s+/g," ").trim(),me=Math.max(20,D.offsetWidth-8),ge=[],Me="";for(let he of ce)Me&&A.measureText(Me+he).width>me&&(ge.push(Me),Me=""),Me+=he;Me&&ge.push(Me);let ke=Math.max(...ge.map(he=>A.measureText(he).width),0),Be=ge.length*oe;A.fillStyle=p,A.fillRect(-ke/2-3,-Be/2-2,ke+6,Be+4),A.fillStyle=d,A.textAlign="center",A.textBaseline="middle",ge.forEach((he,se)=>A.fillText(he,0,(se-(ge.length-1)/2)*oe)),A.restore()}return A.restore(),A.font=`13px ${u}`,A.fillStyle=d,f.forEach((D,O)=>A.fillText(D,16,R+c+10+O*20)),await new Promise((D,O)=>E.toBlob(ee=>ee?D(ee):O(new Error("\u6D4F\u89C8\u5668\u672A\u80FD\u7F16\u7801 PNG")),"image/png"))}finally{C?.dispose(),C?.forceContextLoss(),C?.domElement.remove(),window.frontier3dLastPngExportStatus={...window.frontier3dLastPngExportStatus,inProgress:!1,resourcesReleased:!0},g.width=g.height=0,E.width=E.height=0}}var Up={type:"change"},Pd={type:"start"},Bp={type:"end"},sc=new ji,Op=new qn,zv=Math.cos(70*_i.DEG2RAD),Zt=new B,Tn=2*Math.PI,Dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Id=1e-6,rc=class extends ya{constructor(e,t=null){super(e,t),this.state=Dt.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ts.ROTATE,MIDDLE:ts.DOLLY,RIGHT:ts.PAN},this.touches={ONE:ns.ROTATE,TWO:ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Un,this._lastTargetPosition=new B,this._quat=new Un().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new br,this._sphericalDelta=new br,this._scale=1,this._panOffset=new B,this._rotateStart=new Je,this._rotateEnd=new Je,this._rotateDelta=new Je,this._panStart=new Je,this._panEnd=new Je,this._panDelta=new Je,this._dollyStart=new Je,this._dollyEnd=new Je,this._dollyDelta=new Je,this._dollyDirection=new B,this._mouse=new Je,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Vv.bind(this),this._onPointerDown=kv.bind(this),this._onPointerUp=Hv.bind(this),this._onContextMenu=Zv.bind(this),this._onMouseWheel=Xv.bind(this),this._onKeyDown=$v.bind(this),this._onTouchStart=qv.bind(this),this._onTouchMove=Yv.bind(this),this._onMouseDown=Gv.bind(this),this._onMouseMove=Wv.bind(this),this._interceptControlDown=jv.bind(this),this._interceptControlUp=Jv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Up),this.update(),this.state=Dt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Zt.copy(t).sub(this.target),Zt.applyQuaternion(this._quat),this._spherical.setFromVector3(Zt),this.autoRotate&&this.state===Dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Tn:n>Math.PI&&(n-=Tn),s<-Math.PI?s+=Tn:s>Math.PI&&(s-=Tn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Zt.setFromSpherical(this._spherical),Zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Zt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let u=new B(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(o),this.object.updateMatrixWorld(),a=Zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(sc.origin.copy(this.object.position),sc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sc.direction))<zv?this.object.lookAt(this.target):(Op.setFromNormalAndCoplanarPoint(this.object.up,this.target),sc.intersectPlane(Op,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Id||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Id||this._lastTargetPosition.distanceToSquared(this.target)>Id?(this.dispatchEvent(Up),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Tn/60*this.autoRotateSpeed*e:Tn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Zt.setFromMatrixColumn(t,0),Zt.multiplyScalar(-e),this._panOffset.add(Zt)}_panUp(e,t){this.screenSpacePanning===!0?Zt.setFromMatrixColumn(t,1):(Zt.setFromMatrixColumn(t,0),Zt.crossVectors(this.object.up,Zt)),Zt.multiplyScalar(e),this._panOffset.add(Zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Zt.copy(s).sub(this.target);let r=Zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Je,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function kv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Vv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Hv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Bp),this.state=Dt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Gv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ts.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Dt.DOLLY;break;case ts.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Dt.ROTATE}break;case ts.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Dt.PAN}break;default:this.state=Dt.NONE}this.state!==Dt.NONE&&this.dispatchEvent(Pd)}function Wv(i){switch(this.state){case Dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Xv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Dt.NONE||(i.preventDefault(),this.dispatchEvent(Pd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Bp))}function $v(i){this.enabled!==!1&&this._handleKeyDown(i)}function qv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ns.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Dt.TOUCH_ROTATE;break;case ns.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Dt.TOUCH_PAN;break;default:this.state=Dt.NONE}break;case 2:switch(this.touches.TWO){case ns.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Dt.TOUCH_DOLLY_PAN;break;case ns.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Dt.TOUCH_DOLLY_ROTATE;break;default:this.state=Dt.NONE}break;default:this.state=Dt.NONE}this.state!==Dt.NONE&&this.dispatchEvent(Pd)}function Yv(i){switch(this._trackPointer(i),this.state){case Dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Dt.NONE}}function Zv(i){this.enabled!==!1&&i.preventDefault()}function jv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Jv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}(function(){"use strict";let e=new Map,t=document.createElement("div");t.id="frontier-3d-runtime-diagnostic-banner",t.setAttribute("role","alert"),t.hidden=!0,document.body.append(t);function n(l,x){x?e.set(l,x):e.delete(l),t.textContent=[...e.values()].join("\uFF1B"),t.hidden=e.size===0}window.frontier3dRuntimeDiagnosticStatus=()=>Object.fromEntries(e),window.addEventListener("error",l=>n("window_error",`\u9875\u9762\u9519\u8BEF\uFF1A${String(l.message||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`)),window.addEventListener("unhandledrejection",l=>n("unhandled_rejection",`\u9875\u9762\u64CD\u4F5C\u5931\u8D25\uFF1A${String(l.reason?.message||l.reason||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`));let r=document.getElementById("frontier-3d-visualization-dataset-json");if(!r)throw new Error("Missing Frontier 3D visualization dataset");let a=Sd(JSON.parse(r.textContent)),o=a.metric_variants||{},c=a.organization_identity_metadata_by_creator_name||{},u=a.initial_variant_key;if(!o[u])throw new Error(`Missing initial metric variant: ${u}`);let h=document.getElementById(a.graph_div_id||"frontier3d"),p=document.getElementById("frontier-3d-plot-region"),d=document.getElementById("frontier-3d-report-shell"),g=document.getElementById("frontier-3d-toolbar"),v=document.getElementById("frontier-3d-side-panel");if(!h||!p||!d||!g||!v)throw new Error("Frontier 3D report document is incomplete");let b=document.getElementById("frontier-3d-report-header"),m=null,f=null,R={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"};function P(){m?.sharedViewChanged()}let E=a.artificial_analysis_data_provenance||{},A=Number.isInteger(E.recent_release_frontier_distance_grace_period_months)?E.recent_release_frontier_distance_grace_period_months:null,C="https://artificialanalysis.ai/",L="\u5386\u53F2\u53E3\u5F84\uFF08\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u7684\u6210\u672C/\u5197\u957F\u5EA6\uFF09\uFF0C\u4E0D\u53C2\u4E0E\u672C\u53E3\u5F84\u524D\u6CBF\u8BA1\u7B97";function y(l){let x=document.querySelector(`meta[name="${l}"]`);return x&&x.getAttribute("content")||""}let I={rendererBundleSha256:y("frontier-3d-renderer-bundle-sha256")||"unknown",generatorGitCommit:y("frontier-3d-generator-git-commit")||"unknown",renderedAtUtc:y("frontier-3d-rendered-at-utc")||"unknown"};window.FRONTIER_3D_VISUALIZATION_DATASET=a;let z=new xr;z.background=new xt(16777215);let D=new tn(42,1,.01,100);D.up.set(0,0,1);let O;try{O=new Tr({antialias:!0,alpha:!1,preserveDrawingBuffer:!1})}catch{n("webgl_unavailable","\u65E0\u6CD5\u542F\u52A8\u4E09\u7EF4\u56FE\uFF1A\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WebGL\uFF0C\u6216\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3\u3002\u8BF7\u542F\u7528\u6D4F\u89C8\u5668\u56FE\u5F62\u52A0\u901F\u540E\u91CD\u65B0\u52A0\u8F7D\u3002"),m=Rd({dataset:a,reportShell:d,toolbar:g,plotRegion:p,graphContainer:h,sidePanel:v,webglAvailable:!1}),window.serializeFrontierViewState=m.getState,window.setFrontierExplorationFilters=m.setExplorationFilters;return}let ee=!1,Q=null;O.domElement.addEventListener("webglcontextlost",l=>{l.preventDefault(),ee=!0,Q?.finish(),cn=!1,gn(),n("webgl_context","\u4E09\u7EF4\u56FE\u7684\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u6B63\u5728\u7B49\u5F85\u6D4F\u89C8\u5668\u6062\u590D\u3002")}),O.domElement.addEventListener("webglcontextrestored",()=>{ee=!1,cn=!1,gs(),n("webgl_context",null),Wt()}),O.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),O.outputColorSpace=$t,O.domElement.setAttribute("data-frontier-threejs-canvas","true"),O.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF"),h.replaceChildren(O.domElement);let H=new rc(D,O.domElement);H.enableDamping=!1,H.screenSpacePanning=!0,H.zoomToCursor=!0,H.minDistance=2.4,H.maxDistance=14;let te=new _a,j=new Je,oe=new Fn,ce=new Fn,me=new Fn,ge=new Fn;z.add(oe,ce,me,ge);let Me,ke,Be,he=[],se={},Se={},ye={},Ze={},Ve=[],Ye=[],Mt=[],je=[],ht={},rt={},tt=null,it=null,fe=null,Ue=null,Xe=null,Oe=null,at=null,U=!1,ft=!1,Ke=A>0,T,_=0,X=0,Y=[],J="wireframe",pe=!1,ve=!window.matchMedia("(max-width: 640px)").matches,W=null,k=null,re=null,Ee=null,ie=null,_e=new Set,Ne=new Set,Fe=new Map;function xe(l){return l.model_uuid?.toLowerCase()||`legacy:${JSON.stringify([l.creator,l.name])}`}(a.models||[]).forEach(l=>Fe.set(xe(l),l)),Object.values(o).forEach(l=>{(l.three_dimensional_scene?.displayed_model_markers||[]).forEach(x=>{Fe.set(xe(x),x)})});function N(l){return Ne.has(xe(l))}function be(){_e=new Set([...Ne].map(l=>Fe.get(l)?.base_model_name).filter(Boolean))}function ae(l){let x=[];for(let[S,w]of Fe)w.base_model_name===l&&x.push(S);return x}function Te(l){let x=ae(l);return x.length>0&&x.every(S=>Ne.has(S))}function Pe(l,x){for(let[S,w]of Fe)w.base_model_name===l&&(x?Ne.add(S):Ne.delete(S));return be(),$s(),Ai(),Promise.resolve(!0)}let de=new Set,ze=ls.TREND_RESIDUAL,De={intelligence:1,cost:1,speed:1},Pt={},St=null,fn={},cn=!1,Fa="frontier3d.marker-size-multiplier",Jn=Object.freeze({logo:22,backplate:29,countryRegion:38,paretoRing:38,pinnedRing:49,standoutHalo:52,standoutHaloMinimum:44,standoutHaloMaximum:64,missingStandoutHalo:48,prunedLineageAncestor:18}),Us="frontier3d.pinned-comparison-fields";function Os(l,x){try{return JSON.parse(window.localStorage.getItem(l))??x}catch{return x}}function Pr(l,x){try{window.localStorage.setItem(l,JSON.stringify(x))}catch{}}let Lr=Os(Fa,.5),Cn=Number.isFinite(Lr)?Math.min(1.5,Math.max(.5,Lr)):.5,li=["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"],Bs=Os(Us,[]),Rn=new Set(Array.isArray(Bs)?Bs.filter(l=>li.includes(l)):[]),Qt,ci,jt,Sn,Gn=-1,pn=null,Ua=null,ds=null,zs=document.createElement("div");zs.id="aa-pinned-model-name-labels",h.append(zs);let ks=document.createElement("div");ks.id="aa-lineage-overflow-direction-labels",h.append(ks);let M,G,K,q,Z,Re,Ae,Ce,We,qe,ot,dt=[],He,bt,st,yt,gt,Bt,Ge,kt,ct,_t=document.createElement("div");_t.id="aa-threejs-model-tooltip",_t.className="aa-threejs-model-tooltip",_t.hidden=!0;let In=document.createElement("div");_t.append(In);let Mn=$e("div","aa-touch-details-actions"),Pn=$e("button","aa-secondary-button");Pn.type="button",Pn.addEventListener("click",()=>{pn&&W!==null&&Ha(pn.base_model_name)});let Et=$e("button","aa-secondary-button","\u5173\u95ED\u8BE6\u60C5");Et.type="button",Et.addEventListener("click",gn),Mn.append(Et),p.appendChild(_t);let Nt=[],En=new WeakMap,At=0,Kn="";document.fonts?.ready.then(()=>{En=new WeakMap,Wt()});function Mi(l,x,S){let w=document.createElement("div");if(w.className=S?"aa-threejs-axis-label":"aa-threejs-axis-tick-label",w.dataset.axisName=l,w.textContent=x,S){let F=l==="x"?"\u8D8A\u4F4E\u8D8A\u597D":"\u8D8A\u9AD8\u8D8A\u597D";w.dataset.directionHint=` ${l==="x"?"\u2193":"\u2191"} ${F}`,w.setAttribute("aria-label",`${x}\uFF0C${F}`)}return h.appendChild(w),w}function Oa(){let{width:l,height:x}=h.getBoundingClientRect(),S=`${l}:${x}:${window.innerWidth}:${window.innerHeight}`;S!==Kn&&(En=new WeakMap,Kn=S);let w=Nt.flatMap($=>$.labels).filter(({element:$})=>!En.has($));for(let{element:$}of w)$.hidden=!1;for(let{element:$}of w)En.set($,{width:$.offsetWidth,height:$.offsetHeight}),At+=1;let F=$=>{let le=$.clone().project(D);return{x:(le.x+1)*l/2,y:(1-le.y)*x/2,depth:le.z}},V=new Map,ne=Nt.map(({start:$,end:le,labels:ue},we)=>({projectedStart:F($),projectedEnd:F(le),labels:ue.map(({element:Ie,position:et,isTitle:pt},Lt)=>{let Tt=`${we}:${Lt}`;V.set(Tt,Ie);let Xt=F(et);return{id:Tt,isTitle:pt,anchor:Xt,projectedDepth:Xt.depth,...En.get(Ie)}})}));for(let $ of Ip({canvasWidth:l,canvasHeight:x,projectedCenter:F(new B),axes:ne})){let le=V.get($.id);le.hidden=$.hidden,!$.hidden&&(le.style.transform=`translate(-50%, -50%) rotate(${$.rotationDegrees}deg)`,le.style.left=`${$.x}px`,le.style.top=`${$.y}px`)}}function Wt(){cn||ee||(cn=!0,window.requestAnimationFrame(l=>{if(cn=!1,ee)return;let x=Q?.advance(l);O.render(z,D),Oa(),rh(),Gd(),x&&Wt()}))}H.addEventListener("change",Wt);function Ba(l){for(;l.children.length;){let x=l.children[0];l.remove(x),Ld(x)}}function Ld(l){let x=new Set([l.userData.foregroundMaterial,l.userData.dateFadedMaterial]);l.userData.sharedMaterial||x.add(l.material),x.forEach(S=>S?.dispose()),l.isSprite||l.geometry?.dispose()}function zp(l,x){return x.scale_type==="log"?Math.log10(Math.max(Number(l),Number.MIN_VALUE)):Number(l)}function za(l,x){let S=x.fixed_range,w=Number(S[0]),F=Number(S[1]),V=zp(l,x);return!Number.isFinite(V)||F===w?0:-1+2*(V-w)/(F-w)}function hs(l,x,S){let w=ke.three_dimensional_axis_configuration;return new B(za(l,w.x_axis),za(x,w.y_axis),za(S,w.z_axis))}function ka(l){return hs(l.x,l.y,l.z).clampScalar(-1,1)}function Dd(l){let x=hs(l.x,l.y,l.z);return["\u6210\u672C","\u901F\u5EA6","\u667A\u80FD"].flatMap((S,w)=>{let F=x.getComponent(w);return F<-1?[`${S}\u4F4E\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2193`]:F>1?[`${S}\u9AD8\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2191`]:[]}).join("\uFF1B")}function Dr(l,x,S=1){let w=new sn;w.setAttribute("position",new Vt(l.flatMap(V=>V.toArray()),3));let F=new yr({color:x,linewidth:S});return new ua(w,F)}function Va(l,x,S,w=!1){let F=new Rr;F.setPositions(l.flatMap($=>$.toArray()));let V=new Ir({color:x,linewidth:S,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,dashed:w});V.resolution.set(h.clientWidth,h.clientHeight);let ne=new tc(F,V);return ne.renderOrder=100,w&&ne.computeLineDistances(),ne}function kp(){Ba(oe);let l=(ne,$,le)=>new B(ne,$,le),x=[[l(-1,-1,-1),l(1,-1,-1)],[l(-1,1,-1),l(1,1,-1)],[l(-1,-1,1),l(1,-1,1)],[l(-1,1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,1,-1)],[l(1,-1,-1),l(1,1,-1)],[l(-1,-1,1),l(-1,1,1)],[l(1,-1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,-1,1)],[l(1,-1,-1),l(1,-1,1)],[l(-1,1,-1),l(-1,1,1)],[l(1,1,-1),l(1,1,1)]];oe.add(Dr(x.flat(),6583435)),Nt.forEach(({labels:ne})=>ne.forEach(({element:$})=>$.remove())),Nt.length=0;let S=ke.three_dimensional_axis_configuration,w=[],F=[];[["x",l(-1,1,-1),l(1,1,-1),l(0,.04,0)],["y",l(-1,-1,-1),l(-1,1,-1),l(-.04,0,0)],["z",l(-1,-1,-1),l(-1,-1,1),l(-.04,0,0)]].forEach(([ne,$,le,ue])=>{let we=S[`${ne}_axis`],Ie=[{element:Mi(ne,we.title_text,!0),position:$.clone().lerp(le,.5),isTitle:!0}];F.push($,le),wp(we).forEach(et=>{let pt=za(et,we),Lt=$.clone().lerp(le,(pt+1)/2);F.push(Lt,Lt.clone().add(ue));let Tt=Mi(ne,Math.abs(et)>=1e6||et!==0&&Math.abs(et)<.001?et.toExponential():String(et),!1);Tt.dataset.axisValue=String(et),Ie.push({element:Tt,position:Lt,isTitle:!1}),ne==="x"?w.push(l(pt,-1,-1),l(pt,1,-1)):ne==="y"?w.push(l(-1,pt,-1),l(1,pt,-1)):w.push(l(-1,-1,pt),l(-1,1,pt),l(-1,1,pt),l(1,1,pt))}),Nt.push({start:$,end:le,labels:Ie})}),oe.add(Dr(F,3359061));let V=Dr(w,14212838);V.material.transparent=!0,V.material.opacity=.72,oe.add(V)}function Vs(l){return typeof l=="number"&&Number.isFinite(l)}function ac(l,x,S){let w=l?l[x]:void 0;return Array.isArray(w)?w:(w!=null&&(S.nonFiniteValueCount+=1),[])}function Nd(l,x){_+=x.nonFiniteValueCount,X+=x.outOfRangeIndexCount,Y.push(l),console.warn(`Frontier 3D \u5951\u7EA6\u51E0\u4F55 ${l} \u542B\u975E\u6709\u9650\u5750\u6807/\u7D22\u5F15\u6216\u7ED3\u6784\u4E0D\u4E00\u81F4\uFF0C\u5DF2\u8DF3\u8FC7\u7ED8\u5236`,x)}function Fd(l,x){let S={nonFiniteValueCount:0,outOfRangeIndexCount:0},w=["x_coordinates","y_coordinates","z_coordinates"].map(we=>ac(l,we,S)),[F,V,ne]=w,$=F.length===V.length&&F.length===ne.length;if(w.forEach(we=>we.forEach(Ie=>{Ie!=null&&!Vs(Ie)&&(S.nonFiniteValueCount+=1)})),!$||S.nonFiniteValueCount)return Nd(x,S),[];let le=[],ue=null;for(let we=0;we<F.length;we+=1){let Ie=[F[we],V[we],ne[we]];if(Ie.some(pt=>pt==null)){ue=null;continue}let et=hs(...Ie);ue&&le.push(ue,et),ue=et}return le}function Ud(l,x,S){let w={nonFiniteValueCount:0,outOfRangeIndexCount:0},[F,V,ne]=["x_coordinates","y_coordinates","z_coordinates"].map(Ct=>ac(l,Ct,w)),$=["triangle_vertex_index_a","triangle_vertex_index_b","triangle_vertex_index_c"].map(Ct=>ac(l,Ct,w)),le=F.length,ue=$[0].length,we=["x_coordinates","y_coordinates","z_coordinates"].every(Ct=>Array.isArray(l?.[Ct]));if([F,V,ne].forEach(Ct=>Ct.forEach(Ln=>{Vs(Ln)||(w.nonFiniteValueCount+=1)})),$.forEach(Ct=>Ct.forEach(Ln=>{!Vs(Ln)||!Number.isInteger(Ln)?w.nonFiniteValueCount+=1:we&&(Ln<0||Ln>=le)&&(w.outOfRangeIndexCount+=1)})),!(V.length===le&&ne.length===le&&$.every(Ct=>Ct.length===ue))||w.nonFiniteValueCount||w.outOfRangeIndexCount)return Nd(S,w),null;if(!le||!ue)return null;let et=F.flatMap((Ct,Ln)=>hs(Ct,V[Ln],ne[Ln]).toArray()),pt=[];for(let Ct=0;Ct<ue;Ct+=1)pt.push($[0][Ct],$[1][Ct],$[2][Ct]);let Lt=new sn;Lt.setAttribute("position",new Vt(et,3)),Lt.setIndex(pt),Lt.computeVertexNormals();let Tt=new Ts({side:Yn,transparent:!0,depthTest:!0,depthWrite:!1,...x}),Xt=new rn(Lt,Tt);return Xt.renderOrder=60,Xt}function Vp(){Ba(ce);let l=Fd(ke.pareto_frontier_wireframe_line_segments,"pareto_frontier_wireframe_line_segments");tt=l.length?Dr(l,2383002,2):null,tt&&ce.add(tt),it=Ud(ke.pareto_frontier_surface_triangle_mesh,{color:3244733,opacity:.25},"pareto_frontier_surface_triangle_mesh"),it&&ce.add(it),fe=Ud(ke.achievable_frontier_surface_triangle_mesh,{color:3253076,opacity:.2},"achievable_frontier_surface_triangle_mesh"),fe&&ce.add(fe);let x=ke.exact_achievable_frontier_boundary_line_segments,S=x?Fd(x,"exact_achievable_frontier_boundary_line_segments"):[];Ue=S.length?Dr(S,2193980,1):null,Ue&&ce.add(Ue),Sc()}function Wn(l){let x=document.createElement("canvas");x.width=128,x.height=128;let S=x.getContext("2d");l(S,x.width,x.height);let w=new Cs(x);return w.colorSpace=$t,w.needsUpdate=!0,w}function oc(l,x,S,w,F,V){let ne=Math.min(V,w/2,F/2);l.beginPath(),l.roundRect(x,S,w,F,ne)}let Hp=Wn(l=>{oc(l,8,8,112,112,24),l.fillStyle="rgba(255,255,255,0.96)",l.fill(),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.45)",l.stroke()}),Gp=Wn(l=>{oc(l,10,10,108,108,24),l.fillStyle="rgba(241,245,249,0.62)",l.fill(),l.setLineDash([14,9]),l.lineWidth=6,l.strokeStyle="rgba(71,85,105,0.9)",l.stroke()}),Wp=.42,lc=Wn(l=>{l.beginPath(),l.arc(64,64,53,0,Math.PI*2),l.lineWidth=10,l.strokeStyle="rgba(15,23,42,0.66)",l.stroke()}),Xp=Wn(l=>{let x=l.createRadialGradient(64,64,32,64,64,63);x.addColorStop(0,"rgba(49,130,189,0)"),x.addColorStop(.65,"rgba(49,130,189,0.32)"),x.addColorStop(1,"rgba(49,130,189,0)"),l.fillStyle=x,l.fillRect(0,0,128,128)}),$p=Wn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.setLineDash([8,8]),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.8)",l.stroke()}),cc=Object.fromEntries([["robust","#16a34a",!1],["sensitive","#b45309",!0],["near","#a855f7",!0],["new_entry","#0891b2",!1]].map(([l,x,S])=>[l,ui(Wn(w=>{w.beginPath(),w.arc(64,64,54,0,Math.PI*2),w.lineWidth=6,w.strokeStyle=x,S&&w.setLineDash([9,7]),w.stroke()}))])),qp=Wn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.lineWidth=12,l.strokeStyle="rgba(234,179,8,0.98)",l.stroke()}),Yp=Wn(l=>{l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.fillStyle="rgba(100,116,139,0.96)",l.fill(),l.lineWidth=8,l.strokeStyle="rgba(255,255,255,0.98)",l.stroke()}),Od={china:Wn(l=>{l.beginPath(),l.arc(64,64,52,0,Math.PI*2),l.lineWidth=8,l.strokeStyle="#dc2626",l.stroke(),l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.lineWidth=4,l.strokeStyle="#dc2626",l.stroke()}),united_states:Wn(l=>{oc(l,12,12,104,104,25),l.lineWidth=10,l.strokeStyle="#2563eb",l.stroke()}),other:Wn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#4b5563",l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()}),unclassified:Wn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#9ca3af",l.setLineDash([10,8]),l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()})};function ui(l,{depthWrite:x=!1}={}){return new ws({map:l,transparent:!0,depthTest:!0,depthWrite:x,alphaTest:.02,sizeAttenuation:!1})}let uc=ui(Hp,{depthWrite:!0}),dc=ui(Gp,{depthWrite:!0}),Bd=ui(lc),zd=ui(qp),hc=ui(Xp),kd=ui($p),fc=ui(Yp);fc.depthTest=!1;let pc=Object.fromEntries(Object.entries(Od).map(([l,x])=>[l,ui(x)]));[uc,dc,Bd,hc,kd,zd,fc,...Object.values(pc)].forEach(l=>{l.userData={sharedMaterial:!0}});function zi(l,x,S,w){let F=new As(l);return F.position.copy(x),Nr(F,S),F.renderOrder=w,F.userData.sharedMaterial=!0,me.add(F),F}function Nr(l,x){l.userData.cssPixelSize=x;let S=x*Cn*2*Math.tan(_i.degToRad(D.fov/2))/Math.max(1,h.clientHeight);l.scale.set(S,S,1)}function mc(l){if(Q?.finish(),!Number.isFinite(Number(l)))return!1;Cn=Math.min(1.5,Math.max(.5,Number(l))),Qt&&(Qt.value=String(Cn)),ci&&(ci.textContent=`${Gt(Cn)}\xD7`);for(let x of[me,ge])x.children.filter(S=>S.isSprite).forEach(S=>Nr(S,S.userData.cssPixelSize));return Pr(Fa,Cn),Wt(),P(),!0}function gc(l){return!de.has(l)}function mn(l){return l?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant!==!1}function _c(l){return l?.analysis_eligibility?.ineligibility_reason_text||L}function Ft(l){let x=he[l],S=Ve[l];return!x||!S||S.hasNonFiniteContractCoordinate?!1:xc(l).length===0}function xc(l){let x=he[l];if(!x)return[];let S=[],w=us(x,R);return w.visible||S.push(w.reason),gc(x.creator)||S.push("\u5382\u5546\u7B5B\u9009"),ft&&!mn(x)&&S.push("\u4EC5\u5F53\u671F\u53EF\u6BD4"),!Ke&&x.displayed_only_because_of_recent_release_grace_period===!0&&S.push("\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u5DF2\u5173\u95ED"),Ve[l]?.hasNonFiniteContractCoordinate&&S.push("\u5750\u6807\u65E0\u6548"),S}let Vd={};function Zp(l,x){let S=Vd[l];return S||(S=x.clone(),S.opacity=Wp,S.userData={sharedMaterial:!0},Vd[l]=S),S}function jp(l,x){let S=document.createElement("canvas");S.width=256,S.height=256;let w=S.getContext("2d"),F=new Cs(S);F.colorSpace=$t;let V=ui(F);V.userData={sharedMaterial:!0},rt[l]="loading";let ne=new Image;return ne.onload=()=>{let $=Math.max(1,ne.naturalWidth),le=Math.max(1,ne.naturalHeight),ue=Math.min(224/$,224/le),we=$*ue,Ie=le*ue;w.clearRect(0,0,S.width,S.height),w.drawImage(ne,(S.width-we)/2,(S.height-Ie)/2,we,Ie),F.needsUpdate=!0,rt[l]="loaded",Wt()},ne.onerror=()=>{rt[l]="failed",console.error(`Unable to decode organization brand asset: ${l}`)},ne.src=x.logo_visualization_data_url,V}function Jp(){Ba(me),Ve=[],Ye=[],Mt=[],he.forEach((l,x)=>{let S=[l.x,l.y,l.z].filter(Xt=>!Vs(Xt)).length;_+=S;let w=S?new B:hs(l.x,l.y,l.z),F=c[l.creator],V=mn(l),ne=zi(V?uc:dc,w,Jn.backplate,30),$=F.country_region_category,le=zi(pc[$]||pc.unclassified,w,Jn.countryRegion,20);le.visible=U;let ue=ht[l.creator];ue||(ue=jp(l.creator,F),ht[l.creator]=ue);let we=zi(V?ue:Zp(l.creator,ue),w,Jn.logo,40);[ne,we].forEach(Xt=>{Xt.userData.modelIndex=x,Xt.userData.interactionTargetKind="displayed_model"}),Ye.push(we),Mt.push(ne,we);let Ie=zi(Bd,w,Jn.paretoRing,45);Ie.visible=l.panel.layer===1;let et=zi(hc,w,Jn.standoutHalo,15);et.visible=l.panel.layer===1;let pt=zi(zd,w,Jn.pinnedRing,50);pt.visible=!1;let Lt=zi(cc.robust,w,60,48);Lt.visible=!1;let Tt=zi(cc.new_entry,w,70,47);Tt.visible=!1,Ve.push({sensitivityRingSprite:Lt,newFrontierEntrySprite:Tt,creatorName:l.creator,isAnalysisEligible:V,hasNonFiniteContractCoordinate:S>0,logoSprite:we,backplateSprite:ne,countryRegionSprite:le,paretoRingSprite:Ie,standoutHaloSprite:et,pinnedRingSprite:pt})}),fs(),$s(),ms()}function fs(){Q?.finish(),Ac(),(W!==null&&!Ft(W)||re&&!Fr(re))&&gn(),Ve.forEach((l,x)=>{let S=he[x],w=Ft(x);l.logoSprite.visible=w,l.backplateSprite.visible=w,l.countryRegionSprite.visible=w&&U,l.paretoRingSprite.visible=w&&S.panel?.layer===1,l.standoutHaloSprite.visible=w&&S.panel?.layer===1,l.pinnedRingSprite.visible=w&&N(S)}),Om(),ch(),th(),Xa(),Ur(),Ai(),Fc(),oh(),Bt&&ms(),Wt(),P()}function yc(l){return ft=!!l,q&&(q.checked=ft),fs(),Promise.resolve(ft)}function vc(l){return Ke=A>0&&!!l,T&&(T.checked=Ke),fs(),Promise.resolve(Ke)}function bc(l){Q?.finish(),U=!!l,K&&(K.checked=U);let x=document.getElementById("aa-country-region-legend");return x&&(x.hidden=!U),U&&He&&(He.open=!0),fs(),Promise.resolve(U)}function Sc(){tt&&(tt.visible=!pe&&J==="wireframe"),it&&(it.visible=!pe&&J==="solid"),fe&&(fe.visible=pe),Ue&&(Ue.visible=pe),dt.forEach(l=>{l.disabled=pe}),Xa(),We&&(We.textContent=pe?"\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u672C\u53E3\u5F84\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684 Pareto \u70B9\uFF0C\u8868\u793A\u6700\u9AD8\u53EF\u8FBE\u667A\u80FD\uFF1B\u4E0D\u53EF\u8FBE\u533A\u7559\u767D\u3002":"\u76F8\u90BB Pareto \u70B9\u7684 Delaunay \u63D2\u503C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\uFF1B\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002",Kd()),Wt(),P()}function Mc(l){return Q?.finish(),["wireframe","solid","hidden"].includes(l)?(J=l,dt.forEach(x=>{x.setAttribute("aria-pressed",x.dataset.frontierStyle===J?"true":"false")}),Sc(),Promise.resolve(!0)):Promise.resolve(!1)}function Ec(l){return Q?.finish(),l&&ke.achievable_frontier_geometry_kind!=="exact_budget_steps"?Promise.resolve(!1):(pe=!!l,Ce&&(Ce.checked=pe),Sc(),Promise.resolve(pe))}function Kp(){f.resetCamera({commit:!1})}function Fr(l){let x=l.creator||l.lineage_family_key?.split("||")[0];if(x&&!gc(x)||ft&&!mn(l))return!1;let w=Fe.get(xe(l))||{...l,panel:{release_date:l.release_date}};if(!us(w,R).visible)return!1;if(!l.kept)return!0;let F=he.findIndex(V=>l.model_uuid?V.model_uuid===l.model_uuid:V.name===l.name);return F>=0&&Ft(F)}function Hd(){Ve.forEach((l,x)=>{let S=Ft(x)&&(N(he[x])||W===x);for(let w of[l.logoSprite,l.backplateSprite,l.countryRegionSprite,l.paretoRingSprite,l.pinnedRingSprite,l.standoutHaloSprite,l.sensitivityRingSprite,l.newFrontierEntrySprite])w&&(w.userData.normalMaterial||(w.userData.normalMaterial=w.material,w.userData.normalRenderOrder=w.renderOrder),S&&!w.userData.foregroundMaterial&&(w.userData.foregroundMaterial=w.userData.normalMaterial.clone(),w.userData.foregroundMaterial.depthTest=!1,w.userData.foregroundMaterial.depthWrite=!1),w.material=S?w.userData.foregroundMaterial:w.userData.normalMaterial,us(he[x],R).faded&&(w.userData.dateFadedMaterial||(w.userData.dateFadedMaterial=w.material.clone()),w.userData.dateFadedMaterial.copy(w.material),w.userData.dateFadedMaterial.opacity=w.material.opacity*.24,w.userData.dateFadedMaterial.depthWrite=!1,w.material=w.userData.dateFadedMaterial),w.renderOrder=S?91+w.userData.normalRenderOrder/10:w.userData.normalRenderOrder)}),tt&&(tt.material.opacity=W!==null||k!==null?.25:.9)}function Ur(){Ba(ge),je=[],Xe=null,Oe=null,at=null;let l=new Set(he.filter(($,le)=>N($)&&Ft(le)).map($=>$.lineage_key).filter(Boolean));Ee&&l.add(Ee);let x=[],S=new Set;function w($,le,ue="previous_generation"){let we=xe($);if($.kept||S.has(we)||!Fr($))return;S.add(we);let Ie=new As(fc);Ie.position.copy(ka($)),Nr(Ie,Jn.prunedLineageAncestor),Ie.renderOrder=90,Ie.userData={sharedMaterial:!0,interactionTargetKind:"pruned_lineage_ancestor",lineageKey:le,cssPixelSize:Jn.prunedLineageAncestor,prunedLineageAncestorNode:{...$,relationship_kind:ue}},ge.add(Ie),je.push(Ie)}l.forEach($=>{let le=ye[$]||[];le.forEach(ue=>w(ue,$));for(let ue=1;ue<le.length;ue+=1){let we=le[ue-1],Ie=le[ue];!Fr(we)||!Fr(Ie)||x.push(ka(we),ka(Ie))}}),x.length&&(Xe=Va(x,4674921,3),ge.add(Xe));let F=W===null?null:he[W];if(F?.lineage_family_key&&!ye[F.lineage_key]){let le=Object.entries(ye).flatMap(([ue,we])=>we.map(Ie=>({key:ue,node:Ie}))).filter(({node:ue})=>ue.lineage_family_key===F.lineage_family_key&&ue.base_model_name===F.base_model_name&&Fr(ue)).sort((ue,we)=>we.node.reasoning_level_sort_order-ue.node.reasoning_level_sort_order)[0];le&&(at=Va([hs(F.x,F.y,F.z),ka(le.node)],4674921,3,!0),ge.add(at),w(le.node,le.key,"same_generation_reasoning_variant"))}let V=new Set(he.filter(($,le)=>N($)&&Ft(le)).map($=>$.base_model_name));ie&&V.add(ie);let ne=[];V.forEach($=>{let le=Se[$]||se[$]||[];for(let ue=1;ue<le.length;ue+=1)if(!(!Ft(le[ue-1])||!Ft(le[ue])))for(let we of[le[ue-1],le[ue]]){let Ie=he[we];ne.push(hs(Ie.x,Ie.y,Ie.z))}}),ne.length&&(Oe=Va(ne,11024042,3.5),ge.add(Oe)),Hd(),Hr(),Qp(),Wt()}function Qp(){ks.replaceChildren(...je.flatMap((l,x)=>{let S=Dd(l.userData.prunedLineageAncestorNode);if(!S)return[];let w=$e("span","aa-lineage-overflow-direction-label",S);return w.dataset.ancestorIndex=String(x),[w]})),Gd()}function Gd(){for(let l of ks.children){let x=je[Number(l.dataset.ancestorIndex)];if(!x){l.hidden=!0;continue}let S=x.position.clone().project(D);l.hidden=Math.abs(S.z)>1||Math.abs(S.x)>1||Math.abs(S.y)>1,l.style.left=`${Math.max(0,Math.min(h.clientWidth-l.offsetWidth,(S.x+1)*h.clientWidth/2+10))}px`,l.style.top=`${Math.max(0,Math.min(h.clientHeight-l.offsetHeight,(1-S.y)*h.clientHeight/2+10))}px`}}function Wd(){return Be.speed_axis_field==="intelligence_index_tasks_per_hour"?"\u4EFB\u52A1/\u5C0F\u65F6":"tok/s"}function wc(){return Be.cost_axis_unit||a.cost_metric_definitions?.[u.split("__")[0]]?.unit||"USD"}function em(l){let x=l.panel||{},S=mn(l),w=(V,ne)=>`<section class="aa-tooltip-section"><b>${V}</b><br>${ne.join("<br>")}</section>`,F=[["cost_to_run","\u6709\u6548\u8FD0\u884C\u6210\u672C","USD"],["blended_price_cache_input_output_7_to_2_to_1","7:2:1 \u6DF7\u5408\u5355\u4EF7","USD/M tokens"],["eff_speed","\u6709\u6548\u901F\u5EA6","tok/s"],["output_speed","\u539F\u59CB\u901F\u5EA6","tok/s"]].filter(([V])=>![Be.cost_axis_field,Be.speed_axis_field].includes(V));return w("\u6A21\u578B\u8EAB\u4EFD",[`<strong>${en(l.name)}</strong>`,`${en(l.creator)} \xB7 ${en(l.reasoning_level_label||l.tier||"\u6863\u4F4D\u672A\u8BB0\u5F55")}`,`\u53D1\u5E03\uFF1A${en(x.release_date&&x.release_date!=="?"?x.release_date:"\u672A\u77E5\u53D1\u5E03\u65E5\u671F")}`])+w("\u5750\u6807\u4E0E\u5907\u7528\u53E3\u5F84",[`\u667A\u80FD\u6307\u6570\uFF1A${Gt(x.intelligence)}\uFF08${Td(l.intelligence_measurement_status)}\uFF09`,`\u667A\u80FD\u5206\u6765\u6E90\uFF1A${en(l.intelligence_measurement_evidence?.source?`\u5DF2\u63A5\u53D7\u7684 AA \u76EE\u5F55\uFF08v${l.intelligence_measurement_evidence.catalog_intelligence_index_version||"\u672A\u77E5"}\uFF1B${l.intelligence_measurement_evidence.catalog_captured_at_utc||"\u6293\u53D6\u65F6\u95F4\u672A\u77E5"}\uFF09`:"\u672A\u77E5\uFF1B\u539F\u59CB\u76EE\u5F55\u6807\u8BB0\u4E0D\u4F5C\u4E3A\u5B9E\u6D4B\u8BC1\u660E")}`,`\u4EFB\u52A1\u901F\u5EA6\uFF1A${Gt(x.intelligence_index_tasks_per_hour)} \u4EFB\u52A1/\u5C0F\u65F6\uFF1B\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6 ${Gt(x.artificial_analysis_intelligence_index_time_per_task_seconds)} \u79D2`,...l.intelligence_index_task_time_evidence?.unavailability_reason?[en(l.intelligence_index_task_time_evidence.unavailability_reason)]:[],`API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u72EC\u7ACB\u5B57\u6BB5\uFF09\uFF1A${Gt(x.median_end_to_end_response_time_seconds)} \u79D2`,`${en(Be.speed_axis_label)}\uFF1A${Gt(x[Be.speed_axis_field])} ${Wd()}`,`${en(Be.cost_axis_label)}\uFF1A${Gt(x[Be.cost_axis_field])} ${en(wc())}`,...F.map(([V,ne,$])=>`${ne}\uFF1A${Gt(x[V])} ${$}`),`\u5197\u957F\u5EA6\uFF1A${Gt(x.output_mtokens)} M tokens`])+w("\u654F\u611F\u6027\u5047\u8BBE\u4E0E\u5237\u65B0",[R.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`${ic(mh(l),x.layer===1)}\uFF1A\u667A\u80FD \xB1${R.sensitivity_intelligence_half_width}\uFF1B\u6210\u672C\u3001\u901F\u5EA6\u5404 \xB110%\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE`,gh().has(xe(l))?"\u672C\u671F\u65B0\u5165\u524D\u6CBF\uFF08\u5339\u914D\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\uFF09":"\u524D\u6CBF\u8FDB\u51FA\u4EC5\u5728\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u53EF\u6BD4\u8F83\u65F6\u6807\u8BB0"])+w("\u524D\u6CBF\u4E0E\u7A81\u51FA\u5EA6",[S?`\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A${Gt(x.layer)}`:"\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A\u4E0D\u53C2\u4E0E\uFF08\u5386\u53F2\u53E3\u5F84\uFF09",`${en(jn[ze].label)}\uFF1A${Cc(jd(l))}`,`\u7A81\u51FA\u5EA6\u540D\u6B21\uFF1A${fn[l.name]?`${fn[l.name]} / ${wi().length}`:"\u672A\u53C2\u4E0E\u524D\u6CBF\u6392\u884C"}`,...S?[]:[en(_c(l))]])}function tm(l){let x=Dd(l);return[`<strong>${en(l.name)}</strong>`,l.relationship_kind==="same_generation_reasoning_variant"?"\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A":"\u8C31\u7CFB\u524D\u8EAB \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A",`\u53D1\u5E03\uFF1A${en(l.release_date)}`,`\u667A\u80FD\u6307\u6570\uFF1A${Gt(l.intelligence)}`,`${en(Be.speed_axis_label)}\uFF1A${Gt(l.y)} ${Wd()}`,`${en(Be.cost_axis_label)}\uFF1A${Gt(l.x)} ${en(wc())}`,...x?[`\u7BB1\u58C1\u5939\u7D27\uFF1A${en(x)}\uFF1B\u4EE5\u4E0A\u6570\u503C\u4FDD\u7559\u539F\u503C\u3002`]:[]].join("<br>")}function en(l){let x=document.createElement("span");return x.textContent=String(l),x.innerHTML}function Kv(l,x=1){return l==null||!Number.isFinite(Number(l))?"?":Number(l).toFixed(x)}function Xd(){pn&&(W===null?Pn.remove():(Pn.textContent=Te(pn.base_model_name)?"\u53D6\u6D88\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D":"\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D",Pn.parentElement||Mn.prepend(Pn)),Mn.parentElement||_t.append(Mn))}function Or(l=!0){if(_t.hidden)return;let x=W===null?null:he[W],S=x?null:re;if(!x&&!S)return;let w=l?_t.scrollTop:0;In.innerHTML=x?em(x):tm(S),pn&&(pn=x||S,Xd()),_t.scrollTop=w,ds&&ps(ds)}function Br(l,x){if(l===W&&k===null){x&&!_t.hidden&&ps(x);return}if(W=l,k=null,re=null,l===null){Ee=null,ie=null,_t.hidden=!0,Ur();return}let S=he[l];Ee=S.lineage_key,ie=S.base_model_name,_t.hidden=!1,Or(!1),ps(x||{clientX:p.getBoundingClientRect().left,clientY:p.getBoundingClientRect().top}),Ur()}function nm(l,x,S){if(k===x.name&&Ee===l){S&&!_t.hidden&&ps(S);return}W=null,k=x.name,re=x,Ee=l,ie=null,_t.hidden=!1,Or(!1),ps(S||{clientX:p.getBoundingClientRect().left,clientY:p.getBoundingClientRect().top}),Ur()}function ps(l){ds={clientX:l.clientX,clientY:l.clientY};let x=p.getBoundingClientRect();_t.style.maxHeight=`${Math.max(0,x.height-16)}px`;let S=_t.getBoundingClientRect(),w=Math.min(l.clientX-x.left+14,x.width-S.width-8),F=Math.min(l.clientY-x.top+14,x.height-S.height-8);_t.style.left=`${Math.max(8,w)}px`,_t.style.top=`${Math.max(8,F)}px`}function im(l,x){if(!l){gn();return}pn=l.interactionTargetKind==="displayed_model"?he[l.modelIndex]:l.prunedLineageAncestorNode,_t.classList.add("is-touch-details"),_t.setAttribute("role","dialog"),_t.setAttribute("aria-label","\u6A21\u578B\u8BE6\u60C5"),Yd(l,x,!1),Or(),ps(x)}function $d(){return[...Mt,...je].filter(l=>l.visible&&(!Q||Q.isPickable(l)))}function Hs(l,x){let S=O.domElement.getBoundingClientRect();j.x=(l-S.left)/S.width*2-1,j.y=-((x-S.top)/S.height)*2+1,te.setFromCamera(j,D);let w=te.intersectObjects($d(),!1),F=w.filter(V=>!V.object.material.depthTest);return F.sort((V,ne)=>ne.object.renderOrder-V.object.renderOrder||V.distance-ne.distance),(F[0]||w[0])?.object.userData||null}function qd(l){return Hs(l.clientX,l.clientY)}let sm=400,rm=25,di=null,Gs=null,zr=!1,Ei=null,Xn=null,Ws=null,Xs=!1;function Ac(){Ws!==null&&window.clearTimeout(Ws),Ws=null}function gn(){pn=null,Mn.remove(),_t.classList.remove("is-touch-details"),_t.removeAttribute("role"),_t.removeAttribute("aria-label"),Ac(),Xn!==null&&window.cancelAnimationFrame(Xn),Xn=null,Br(null)}function Yd(l,x,S=!0){if(!l){if(S&&(W!==null||k!==null)){Ws===null&&(Ws=window.setTimeout(()=>{Ws=null,Br(null)},sm));return}gn();return}Ac(),l.interactionTargetKind==="displayed_model"?Br(l.modelIndex,x):nm(l.lineageKey,l.prunedLineageAncestorNode,x)}function Tc(l=!1){if(pn||Xs||!Ei||O.getContext().isContextLost())return;let{clientX:x,clientY:S}=Ei,w=O.domElement.getBoundingClientRect();x<w.left||x>w.right||S<w.top||S>w.bottom||Yd(Hs(x,S),Ei,l)}H.addEventListener("start",()=>{Xs=!0,di||gn()}),H.addEventListener("end",()=>{Xs=!1,Xn!==null&&window.cancelAnimationFrame(Xn),Xn=window.requestAnimationFrame(()=>{Xn=null,Tc()})}),H.addEventListener("change",()=>{gn(),Xs||(Xn=window.requestAnimationFrame(()=>{Xn=null,Tc()}))}),O.domElement.addEventListener("pointerdown",l=>{if(l.button!==0)return;Ua=l.pointerType;let x=qd(l);di={pointerId:l.pointerId,pointerType:l.pointerType,clientX:l.clientX,clientY:l.clientY,interactionTargetForDetails:x,displayedModelForClickPinToggle:x?.interactionTargetKind==="displayed_model"?he[x.modelIndex]:null},Gs=null,Ei={clientX:l.clientX,clientY:l.clientY},zr=!1},{capture:!0}),O.domElement.addEventListener("pointermove",l=>{di?.pointerId===l.pointerId&&(l.clientX-di.clientX)**2+(l.clientY-di.clientY)**2>=rm&&(zr=!0,gn()),l.pointerType!=="touch"&&(Ei={clientX:l.clientX,clientY:l.clientY},!(Xs||Xn!==null)&&(Xn=window.requestAnimationFrame(()=>{Xn=null,Tc(!0)})))});function am(l){di?.pointerId===l.pointerId&&(Gs=di,di=null,l.pointerType==="touch"&&!zr&&(Ei=null,im(Gs.interactionTargetForDetails,l)))}O.domElement.addEventListener("pointerup",am),O.domElement.addEventListener("pointercancel",l=>{di?.pointerId===l.pointerId&&(di=null),Gs=null,Ei=null,gn()}),O.domElement.addEventListener("pointerleave",l=>{pn||(Ei=null,gn())}),O.domElement.addEventListener("click",l=>{let x=Gs;if(Gs=null,Ua==="touch"||x?.pointerType==="touch"||l.pointerType==="touch")return;if(zr){zr=!1;return}let S=x?null:qd(l),w=x?x.displayedModelForClickPinToggle:S?.interactionTargetKind==="displayed_model"?he[S.modelIndex]:null;w&&Ha(w.base_model_name)});function $s(){Ve.forEach((l,x)=>{let S=he[x];l.pinnedRingSprite.visible=Ft(x)&&N(S)}),Ur(),Fc(),sh(),Xd(),Wt(),P()}function Ha(l){return Pe(l,!Te(l))}function Zd(l,x=!0){x?Ne.add(xe(l)):Ne.delete(xe(l)),be(),$s(),Ai()}function om(l){let x=jn[ze]?.modelMetricFieldName,S=l?.standout_metrics?.[x];return typeof S=="number"&&Number.isFinite(S)?S:NaN}function jd(l){return!l||!mn(l)?NaN:Object.prototype.hasOwnProperty.call(Pt,l.name)?Pt[l.name]:om(l)}function Cc(l){return ze===ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Number.isFinite(l)&&St>0?`${Gt(l/St*100)}%`:"\u672A\u8BB0\u5F55":Gt(l)}function wi(){return he.filter(l=>l.panel?.layer===1&&[l.x,l.y,l.z].every(Vs))}function ms(){let l=wi(),x=ze===ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Da(l,De):null;St=x?.completeFrontierHypervolume??null;let S=x?.contributions||mp(l,ze,De),w=S.filter(Number.isFinite);Pt={},l.forEach((F,V)=>{let ne=S[V];Pt[F.name]=ne;let $=Ve[Ze[F.name]];if(!$)return;let le=Number.isFinite(ne),ue=le&&w.length>1?(w.filter(pt=>pt<ne).length+(w.filter(pt=>pt===ne).length-1)/2)/(w.length-1):.5,we=$.standoutHaloSprite,Ie=le?hc:kd;we.userData.foregroundMaterial?.dispose(),we.userData.foregroundMaterial=null,we.userData.normalMaterial=Ie,we.userData.normalRenderOrder=15,we.material=Ie;let et=Jn;Nr(we,le?et.standoutHaloMinimum+ue*(et.standoutHaloMaximum-et.standoutHaloMinimum):et.missingStandoutHalo)}),fn={},l.map((F,V)=>({model:F,value:S[V]})).filter(F=>Number.isFinite(F.value)).sort((F,V)=>V.value-F.value).forEach((F,V)=>{fn[F.model.name]=V+1}),Or(),Hd(),lm(l,S),Wa(),Wt(),P()}function lm(l,x){if(!Bt)return;let S=l.map((w,F)=>({model:w,value:x[F]})).sort((w,F)=>{let V=Number.isFinite(w.value)?w.value:-1/0;return(Number.isFinite(F.value)?F.value:-1/0)-V}).slice(0,12);Bt.replaceChildren(...S.map((w,F)=>{let V=document.createElement("button");V.type="button",V.className="aa-ranking-row",V.addEventListener("click",()=>Zd(w.model)),V.setAttribute("aria-label",`\u56FA\u5B9A ${w.model.name}`);let ne=Ze[w.model.name];Ft(ne)||(V.classList.add("is-hidden-by-current-filter"),V.title="\u5DF2\u88AB\u5F53\u524D\u7B5B\u9009\u9690\u85CF\uFF0C\u540D\u6B21\u4ECD\u6309\u5168\u96C6\u8BA1\u7B97");let $=document.createElement("span");$.className="aa-truncate",$.textContent=`${F+1}. ${w.model.name}`;let le=document.createElement("b");return le.className="aa-ranking-value",le.textContent=Cc(w.value),le.title=St===null?`\u539F\u59CB\u503C\uFF1A${w.value}`:`\u6392\u4ED6\u8D21\u732E ${w.value} \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF ${St}`,V.append($,le),V}))}function Rc(l){return jn[l]?(ze=l,gt&&(gt.value=l),Uc(),ms(),window.dispatchEvent(new Event("frontier-3d-view-updated")),Promise.resolve(!0)):Promise.resolve(!1)}function Ic(l,x,S){De={intelligence:Na(l,De.intelligence),cost:Na(x,De.cost),speed:Na(S,De.speed)},Ge&&Object.entries(De).forEach(([w,F])=>{let V=Ge[w];V.slider.value=String(Math.log2(F)),V.number.value=F.toFixed(2)}),ms(),window.dispatchEvent(new Event("frontier-3d-view-updated"))}function Pc(l,x){Q?.finish();let S=o[l];if(!S)return!1;Ei=null,gn();let w=D.position.clone(),F=D.quaternion.clone(),V=H.target.clone();return u=l,Me=S,ke=Me.three_dimensional_scene,Be=Me.interaction_relationships,_=0,X=0,Y=[],he=ke.displayed_model_markers||[],se=Be.base_groups||{},Se=Be.reasoning_variant_group_model_indices_by_base_model_name||{},ye=cm(Be.lineages||{}),Ze={},he.forEach((ne,$)=>{Ze[ne.name]=$}),window.FRONTIER_3D_INTERACTION_RELATIONSHIPS={models:he,base_groups:se,reasoning_variant_group_model_indices_by_base_model_name:Se,lineages:ye,cost_axis_field:Be.cost_axis_field,speed_axis_field:Be.speed_axis_field},he.forEach(ne=>Fe.set(xe(ne),ne)),be(),kp(),Vp(),Jp(),Hr(),Br(null),x?(D.position.copy(w),D.quaternion.copy(F),H.target.copy(V)):Kp(),oh(),ch(),Xa(),eh(),Fc(),Ai(),ms(),Wt(),window.dispatchEvent(new Event("frontier-3d-view-updated")),!0}function cm(l){let x={};return Object.entries(l).forEach(([S,w])=>{let F=(Array.isArray(w)?w:[]).filter(V=>{if(!V?.lineage_family_key||!V?.reasoning_level_label)return!1;let ne=[V?.x,V?.y,V?.z].filter($=>!Vs($)).length;return _+=ne,ne===0});F.length>=2&&(x[S]=F)}),x}function kr(l,x){let S=`${l}__${x}`;if(S===u)return Promise.resolve(!1);let w=Pc(S,!0);return w&&(M.value=l,G.value=x,P()),Promise.resolve(w)}function Ga(l){let x=document.createElement("div");x.className="aa-toolbar-group";let S=document.createElement("span");return S.className="aa-toolbar-group-label",S.textContent=l,x.appendChild(S),x}function Jd(l,x){let S=document.createElement("label");S.className="aa-toolbar-field";let w=document.createElement("span");return w.className="aa-toolbar-field-label",w.textContent=l,S.append(w,x),S}function um(){let l=Ga("\u5750\u6807\u8F74\u53E3\u5F84");l.id="aa-metric-controls",M=document.createElement("select"),M.id="aa-cost-metric-select",Object.entries(a.cost_metric_definitions).forEach(([V,ne])=>{let $=document.createElement("option");$.value=V,$.textContent=ne.label,M.appendChild($)}),G=document.createElement("select"),G.id="aa-speed-metric-select",Object.entries(a.speed_metric_definitions).forEach(([V,ne])=>{let $=document.createElement("option");$.value=V,$.textContent=ne.label,G.appendChild($)});let[x,S]=u.split("__");M.value=x,G.value=S,M.addEventListener("change",()=>kr(M.value,G.value)),G.addEventListener("change",()=>kr(M.value,G.value)),l.append(Jd("\u6210\u672C",M),Jd("\u901F\u5EA6",G));let w=$e("button","aa-secondary-button","\u53E3\u5F84\u8BF4\u660E");w.id="aa-metric-explanation-button",w.type="button",w.addEventListener("click",()=>qs(!0));let F=$e("button","aa-secondary-button","\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2");return F.id="aa-orthogonal-decomposition-preset",F.type="button",F.title="\u5207\u6362\u81F3 7:2:1 \u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u4FDD\u6301\u76F8\u673A",F.addEventListener("click",()=>kr("blended","raw")),l.append(w,F),l}function dm(){let l=Ga("\u6A21\u578B\u6807\u8BC6");l.id="aa-model-identity-controls";let x=document.createElement("span");x.className="aa-model-identity-logo-status",x.textContent="\u5382\u5546 Logo";let S=document.createElement("label");S.className="aa-toggle-row",K=document.createElement("input"),K.id="aa-country-region-marker-toggle",K.type="checkbox",K.checked=U,K.addEventListener("change",()=>bc(K.checked)),S.append(K,document.createTextNode("\u663E\u793A\u56FD\u522B\u5916\u6846"));let w=document.createElement("label");w.className="aa-toggle-row",w.title="\u9690\u85CF\u672C\u53E3\u5F84\u4E0B\u7528\u5230\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u6210\u672C\u6216\u5197\u957F\u5EA6\u7684\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF08\u865A\u7EBF\u5E95\u677F\uFF09\uFF1B\u9690\u85CF\u540E\u5B83\u4EEC\u4E5F\u4E0D\u53EF\u60AC\u505C\u6216\u70B9\u9009",q=document.createElement("input"),q.id="aa-show-only-current-intelligence-index-version-comparable-models-toggle",q.type="checkbox",q.checked=ft,q.addEventListener("change",()=>yc(q.checked)),w.append(q,document.createTextNode("\u4EC5\u5F53\u671F\u53EF\u6BD4"));let F=document.createElement("label");F.className="aa-toggle-row",F.title="\u4EC5\u63A7\u5236\u53EA\u56E0\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u624D\u4FDD\u7559\u7684\u70B9\uFF1B\u4E0D\u91CD\u7B97\u5206\u6790\u3001\u5750\u6807\u8303\u56F4\u6216\u76F8\u673A",T=document.createElement("input"),T.id="aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle",T.type="checkbox",T.checked=Ke,T.disabled=!(A>0),T.addEventListener("change",()=>vc(T.checked));let V=A===null?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":A===0?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u751F\u6210\u65F6\u5DF2\u5173\u95ED":`\u663E\u793A\u8FD1 ${A} \u4E2A\u6708\u53D1\u5E03\u7684\u8FDC\u79BB\u524D\u6CBF\u6A21\u578B`;F.append(T,document.createTextNode(V)),l.append(x,S,w,F);let ne=$e("label","aa-marker-size-control","\u6807\u8BB0\u5C3A\u5BF8 ");return Qt=document.createElement("input"),Qt.id="aa-marker-size-slider",Qt.type="range",Qt.min="0.5",Qt.max="1.5",Qt.step="0.05",Qt.value=String(Cn),Qt.setAttribute("aria-label","\u6807\u8BB0\u5C3A\u5BF8\u500D\u6570\uFF0C1 \u500D\u5BF9\u5E94 Logo 22 \u50CF\u7D20"),ci=$e("output","",`${Gt(Cn)}\xD7`),ci.htmlFor=Qt.id,Qt.addEventListener("input",()=>mc(Number(Qt.value))),ne.append(Qt,ci),l.append(ne),l}function Kd(){let l=pe?"\u7CBE\u786E\u53EF\u8FBE\u9762":"\u975E\u5E15\u7D2F\u6258\u9762",x=We.hidden?"\u5C55\u5F00":"\u6536\u8D77";qe.textContent=l,qe.setAttribute("aria-label",`${x}\u51E0\u4F55\u8BF4\u660E\uFF1A${l}`),qe.title=`${x}\u51E0\u4F55\u8BF4\u660E\uFF1B\u5C55\u5F00\u540E\u4E00\u5206\u949F\u81EA\u52A8\u6536\u8D77`}function Lc(l){window.clearTimeout(ot),We.hidden=!l,qe.setAttribute("aria-expanded",String(l)),Kd(),l&&(ot=window.setTimeout(()=>Lc(!1),6e4))}function hm(){let l=Ga("\u524D\u6CBF\u63CF\u7ED8");l.classList.add("aa-frontier-geometry-controls");let x=document.createElement("div");x.className="aa-segmented-control",dt=[["wireframe","\u53C2\u7167\u7EBF\u6846"],["solid","\u53C2\u7167\u5B9E\u5FC3"],["hidden","\u9690\u85CF\u53C2\u7167"]].map(([F,V])=>{let ne=document.createElement("button");return ne.type="button",ne.textContent=V,ne.dataset.frontierStyle=F,ne.setAttribute("aria-pressed",F===J?"true":"false"),ne.addEventListener("click",()=>Mc(F)),x.appendChild(ne),ne});let S=document.createElement("label");S.className="aa-toggle-row",Ce=document.createElement("input"),Ce.id="aa-achievable-surface-toggle",Ce.type="checkbox",Ce.setAttribute("aria-describedby","aa-frontier-geometry-explanation"),Ce.addEventListener("change",()=>Ec(Ce.checked)),S.append(Ce,document.createTextNode("\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09")),We=$e("p","aa-frontier-geometry-explanation"),We.id="aa-frontier-geometry-explanation",We.setAttribute("role","status"),qe=document.createElement("button"),qe.id="aa-frontier-geometry-explanation-toggle",qe.className="aa-frontier-geometry-explanation-toggle",qe.type="button",qe.setAttribute("aria-controls",We.id),qe.addEventListener("click",()=>Lc(We.hidden));let w=document.createElement("div");return w.className="aa-frontier-geometry-toggle-and-explanation",w.append(S,qe,We),l.append(x,w),Lc(!0),l}function fm(){let l=Ga("\u7A81\u51FA\u5EA6\u53E3\u5F84");return gt=document.createElement("select"),gt.id="aa-standout-metric-select",gt.setAttribute("aria-label","\u7A81\u51FA\u5EA6\u6307\u6807"),Object.entries(jn).forEach(([x,S])=>{let w=document.createElement("option");w.value=x,w.textContent=S.label,gt.appendChild(w)}),gt.value=ze,gt.addEventListener("change",()=>Rc(gt.value)),l.appendChild(gt),l}function Dc(l,x){let S=document.createElement("section");if(S.className="aa-control-section",S.id=l,x){let w=document.createElement("h2");w.className="aa-section-title",w.textContent=x,S.appendChild(w)}return S}function pm(){let l=Dc("aa-search-panel","\u641C\u7D22\u4E0E\u56FA\u5B9A");return st=document.createElement("input"),st.id="aa-search-input",st.className="aa-search-input",st.type="search",st.placeholder="\u641C\u7D22\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D",st.setAttribute("aria-label","\u641C\u7D22\u6A21\u578B\u3001\u57FA\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D"),st.setAttribute("role","combobox"),st.setAttribute("aria-expanded","false"),st.setAttribute("aria-controls","aa-search-results"),st.setAttribute("aria-autocomplete","list"),yt=$e("div","aa-search-results"),yt.id="aa-search-results",yt.setAttribute("role","region"),yt.setAttribute("aria-label","\u6A21\u578B\u641C\u7D22\u7ED3\u679C"),st.addEventListener("input",()=>{Gn=-1,Ai()}),st.addEventListener("focus",Ai),l.addEventListener("keydown",x=>{let S=[...yt.querySelectorAll("button")];x.key==="Escape"?(x.preventDefault(),st.value="",Ai(),st.focus()):["ArrowDown","ArrowUp"].includes(x.key)&&S.length?(x.preventDefault(),Gn=Gn<0?x.key==="ArrowDown"?0:S.length-1:(Gn+(x.key==="ArrowDown"?1:S.length-1))%S.length,S.forEach((w,F)=>w.classList.toggle("is-keyboard-active",F===Gn)),st.setAttribute("aria-activedescendant",S[Gn].id),S[Gn].scrollIntoView({block:"nearest"})):x.key==="Enter"&&x.target===st&&S.length&&(x.preventDefault(),S[Math.max(0,Gn)]?.click())}),l.append(st,yt),l}function Qd(l){let x=[...he.map((w,F)=>({...w,displayedModelIndex:F})),...(Me?.excluded_models_with_drop_reason||[]).map(w=>{let F=w.model_uuid?Fe.get(w.model_uuid):[...Fe.values()].find(V=>V.name===w.name);return{...F,...w,base_model_name:w.base_model_name||F?.base_model_name||w.name}})],S=new Set(x.map(xe));for(let w of Me?.model_analysis_records||[])S.has(xe(w))||x.push({...w,base_model_name:w.base_model_name||w.name});return Tp(x,l)}function mm(l){return Qd(l).groups.map(x=>x.baseModelName)}function Ai(){if(!yt||!st)return;let{groups:l,totalGroupCount:x}=Qd(st.value),S=!!st.value.trim(),w=$e("div","aa-search-result-summary",`\u627E\u5230 ${x} \u7EC4${x>40?"\uFF0C\u4EC5\u663E\u793A\u524D 40 \u7EC4":""}`);w.setAttribute("role","status"),yt.replaceChildren(w,...l.map(({baseModelName:F,models:V},ne)=>{let $=V.filter(Ie=>Ie.displayedModelIndex!==void 0&&!Ve[Ie.displayedModelIndex]?.hasNonFiniteContractCoordinate),le=document.createElement($.length?"button":"div");le.className="aa-result-row",le.dataset.baseModelName=F,$.length&&(le.type="button",le.classList.add("aa-search-result-pin-button"),le.id=`aa-search-result-action-${ne}`,le.addEventListener("click",()=>Ha(F))),_e.has(F)&&le.classList.add("is-pinned");let ue=$e("span","aa-search-result-name",F),we=V.slice().sort(bd).map(Ie=>{let et=Ie.reasoning_level_label||Ie.name;if(Ie.displayedModelIndex===void 0)return`${et}\uFF1A\u672A\u4E0A\u56FE\uFF0C${Ie.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807"}${Ie.missing_dimension_names?.length?`\uFF08\u7F3A\u5C11 ${Ie.missing_dimension_names.join("\u3001")}\uFF09`:""}`;let pt=xc(Ie.displayedModelIndex);return pt.length&&le.classList.add("is-hidden-by-model-visibility-filter"),pt.includes("\u4EC5\u5F53\u671F\u53EF\u6BD4")&&le.classList.add("is-hidden-by-comparable-only-toggle"),`${et}\uFF1A${pt.length?`\u7B5B\u9009\u9690\u85CF\uFF08${pt.join("\u3001")}\uFF09`:"\u5DF2\u4E0A\u56FE"}${mn(Ie)?"":`\uFF1B${_c(Ie)}`}`});return V.filter(Ie=>Ie.displayedModelIndex!==void 0).every(Ie=>!Ft(Ie.displayedModelIndex))&&le.classList.add("is-hidden-by-current-filter"),le.title=we.join("\uFF1B"),ue.append($e("span","aa-search-result-hidden-note",we.join("\uFF1B"))),le.append(ue),$.length&&le.append($e("span","aa-search-result-action-label",Te(F)?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A")),le})),yt.hidden=!S,yt.style.display=S?"block":"none",st.setAttribute("aria-expanded",String(S)),st.removeAttribute("aria-activedescendant")}function gm(){let l=document.createElement("div");return l.id="aa-country-region-legend",l.className="aa-country-region-legend",l.hidden=!U,[["china","\u4E2D\u56FD","\u53CC\u5706\u73AF"],["united-states","\u7F8E\u56FD","\u5706\u89D2\u65B9\u73AF"],["other","\u5176\u4ED6 / \u672A\u5206\u7C7B","\u83F1\u5F62\u73AF"]].forEach(([x,S,w])=>{let F=document.createElement("span");F.className="aa-country-region-legend-item",F.dataset.countryRegionCategory=x==="united-states"?"united_states":x,F.dataset.visibleCountryRegionModelCount="0";let V=document.createElement("span");V.className=`aa-country-region-swatch is-${x}`,V.setAttribute("aria-hidden","true"),F.append(V,document.createTextNode(`${S}\uFF08${w}\uFF09`)),F.append($e("span","aa-country-region-visible-model-count"," \xB7 0")),l.appendChild(F)}),l}function _m(){return He=document.createElement("details"),He.id="aa-organization-filter-panel",He.className="aa-control-section aa-collapsible-section",He.open=!1,He}function eh(){if(!He)return;let l=He.open,x={};he.forEach(V=>{x[V.creator]=(x[V.creator]||0)+1});let S=document.createElement("summary");S.className="aa-section-title aa-collapsible-summary",S.id="aa-organization-filter-count-summary",S.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}\uFF09`;let w=Object.keys(x).sort((V,ne)=>V.localeCompare(ne)).map(V=>{let ne=c[V],$=document.createElement("label");$.className="aa-organization-filter-row",$.dataset.creatorName=V;let le=document.createElement("input");le.type="checkbox",le.checked=!de.has(V),le.addEventListener("change",()=>{le.checked?de.delete(V):de.add(V),fs()});let ue=document.createElement("img");ue.className="aa-organization-logo-preview",ue.src=ne.logo_visualization_data_url,ue.alt="";let we=document.createElement("span");we.className="aa-truncate",we.textContent=V;let Ie=document.createElement("span");return Ie.className="aa-muted",Ie.dataset.visibleOrganizationModelCount="0",Ie.textContent=String(x[V]),$.append(le,ue,we,Ie),$}),F=document.createElement("div");F.className="aa-organization-filter-rows",F.append(...w),He.replaceChildren(S,gm(),F),He.open=l,th()}function th(){if(!He)return;let l={},x={},S={};he.forEach((F,V)=>{if(l[F.creator]=(l[F.creator]||0)+1,!Ft(V))return;x[F.creator]=(x[F.creator]||0)+1;let ne=["china","united_states"].includes(F.country_region_category)?F.country_region_category:"other";S[ne]=(S[ne]||0)+1}),He.querySelectorAll(".aa-organization-filter-row").forEach(F=>{let V=x[F.dataset.creatorName]||0,ne=l[F.dataset.creatorName]||0,$=F.querySelector("[data-visible-organization-model-count]");$.dataset.visibleOrganizationModelCount=String(V),$.textContent=V===ne?String(ne):`${V}/${ne}`}),He.querySelectorAll("[data-country-region-category]").forEach(F=>{let V=S[F.dataset.countryRegionCategory]||0;F.dataset.visibleCountryRegionModelCount=String(V),F.querySelector(".aa-country-region-visible-model-count").textContent=` \xB7 ${V}`});let w=He.querySelector("#aa-organization-filter-count-summary");w&&(w.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}/${Object.keys(l).length}\uFF09`)}function xm(){return bt=Dc("aa-pinned-panel","\u5DF2\u56FA\u5B9A"),bt}function Nc(){return[..._e].flatMap(l=>[...Ne].map(x=>Fe.get(x)).filter(x=>x?.base_model_name===l).sort(bd))}function nh(l){return he.find(x=>xe(x)===xe(l))}function ih(l){let x=he.findIndex(S=>xe(S)===xe(l));return x<0?`\u5F53\u524D\u53E3\u5F84\u672A\u4E0A\u56FE\uFF1A${(Me.excluded_models_with_drop_reason||[]).find(w=>w.model_uuid?w.model_uuid===l.model_uuid:w.name===l.name)?.drop_reason||l.historical_frame_absence_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807\u6216\u5DF2\u88AB\u526A\u679D"}`:[...xc(x),...mn(he[x])?[]:[_c(he[x])]].join("\uFF1B")||"\u5F53\u671F\u53EF\u6BD4"}function Fc(){if(!bt)return;let l=[..._e];bt.style.display=l.length?"block":"none";let x=$e("div","aa-pinned-header"),S=$e("h2","aa-section-title",`\u5DF2\u56FA\u5B9A\uFF08${Ne.size} \u6863\u4F4D\uFF09`),w=$e("button","aa-link-button","\u6E05\u7A7A\u5168\u90E8");w.id="aa-clear-all-pinned-models",w.type="button",w.addEventListener("click",()=>{Ne.clear(),be(),$s(),Ai()}),x.append(S,w);let F=$e("div","aa-pinned-list");l.forEach(V=>{let ne=$e("article","aa-pinned-card"),$=$e("div","aa-pinned-card-header"),le=$e("button","aa-link-button","\u79FB\u9664");le.type="button",le.setAttribute("aria-label",`\u79FB\u9664 ${V} \u7684\u5168\u90E8\u56FA\u5B9A\u6863\u4F4D`),le.addEventListener("click",()=>Pe(V,!1)),$.append($e("b","aa-truncate",V),le),ne.append($);for(let ue of Nc().filter(we=>we.base_model_name===V)){let we=nh(ue),Ie=$e("div","aa-pinned-variant-card",`${ue.name} \xB7 \u667A\u80FD ${Gt(we?.panel.intelligence??ue.panel.intelligence)} \xB7 ${ue.reasoning_level_label||"\u6863\u4F4D\u672A\u8BB0\u5F55"}`);Ie.dataset.modelIdentity=xe(ue);let et=ih(ue);Ie.append($e("div","aa-pinned-model-status",et)),we||Ie.classList.add("is-hidden-by-current-filter"),we&&!mn(we)&&Ie.classList.add("is-historical-intelligence-index-version"),ue.model_uuid||Ie.append($e("div","aa-muted","\u65E7\u5951\u7EA6\u7F3A\u5C11 UUID\uFF0C\u91CD\u65B0\u751F\u6210\u540E\u53EF\u6309\u7A33\u5B9A\u8EAB\u4EFD\u56FA\u5B9A")),ne.append(Ie)}F.append(ne)}),bt.replaceChildren(x,F),Wa(),sh()}function ym(){jt=document.createElement("details"),jt.id="aa-pinned-comparison-panel";let l=$e("summary","aa-section-title","\u5C55\u5F00\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4"),x=$e("fieldset","aa-comparison-field-controls");x.append($e("legend","","\u53EF\u9009\u5B57\u6BB5\uFF08\u81EA\u52A8\u4FDD\u5B58\uFF09"));let S={output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"};for(let w of li){let F=$e("label","aa-checkbox-chip"),V=document.createElement("input");V.type="checkbox",V.checked=Rn.has(w),V.dataset.comparisonField=w,V.addEventListener("change",()=>{V.checked?Rn.add(w):Rn.delete(w),Pr(Us,[...Rn]),Wa(),P()}),F.append(V,document.createTextNode(S[w])),x.append(F)}Sn=$e("div","aa-comparison-table-scroll-region"),Sn.tabIndex=0,Sn.setAttribute("aria-label","\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\u8868\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8"),jt.append(l,x,Sn),dh(Sn),jt.addEventListener("toggle",()=>{jt.open&&window.matchMedia("(max-width: 1024px)").matches&&Vr(!0),uh(),P()}),d.append(jt)}function Wa(){if(!jt||!Me)return;let l=Nc();jt.hidden=l.length===0,jt.querySelector("summary").textContent=`\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\uFF08${l.length} \u6863\u4F4D\uFF09`;let x=l.map(nh),S=x.findIndex(ue=>ue&&mn(ue)&&[ue.x,ue.y,ue.z].every(Number.isFinite)),w=document.createElement("table");w.id="aa-pinned-comparison-table";let F=$e("caption","",S>=0?`\u0394% \u57FA\u51C6\uFF1A${l[S].name}\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u57FA\u51C6\u6216\u6700\u4F18\u503C\u9AD8\u4EAE\uFF1B\u96F6\u57FA\u51C6\u4E0D\u8BA1\u7B97\u767E\u5206\u6BD4\u3002`:"\u5F53\u524D\u53E3\u5F84\u6CA1\u6709\u53EF\u6BD4\u57FA\u51C6\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u6700\u4F18\u503C\u9AD8\u4EAE\u3002"),V=document.createElement("thead"),ne=document.createElement("tr");ne.append($e("th","","\u6307\u6807")),l.forEach(ue=>{let we=$e("th","",ue.name);we.scope="col",we.dataset.modelIdentity=xe(ue),ne.append(we)}),V.append(ne);let $=[{field:"creator",label:"\u5382\u5546",identity:!0},{field:"reasoning_level_label",label:"\u63A8\u7406\u6863\u4F4D",identity:!0},{field:"release_date",label:"\u53D1\u5E03\u65E5\u671F",identity:!0},{field:"status",label:"\u5F53\u524D\u72B6\u6001",identity:!0},{field:"intelligence",label:"\u667A\u80FD\u6307\u6570",higherIsBetter:!0},{field:Be.cost_axis_field,label:Be.cost_axis_label,unit:wc(),higherIsBetter:!1},{field:Be.speed_axis_field,label:Be.speed_axis_label,unit:"tok/s",higherIsBetter:!0},{field:"layer",label:"\u5E15\u7D2F\u6258\u5C42\u7EA7",higherIsBetter:!1},{field:"standout",label:jn[ze].label,higherIsBetter:!0},...[...Rn].filter(ue=>![Be.cost_axis_field,Be.speed_axis_field].includes(ue)).map(ue=>({field:ue,label:{output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"}[ue],unit:ue==="output_mtokens"?"M tokens":["output_speed","eff_speed"].includes(ue)?"tok/s":ue==="cost_to_run"?"USD":"USD/M tokens",higherIsBetter:["output_speed","eff_speed"].includes(ue)}))],le=document.createElement("tbody");for(let ue of $){let we=document.createElement("tr");we.dataset.comparisonField=ue.field;let Ie=$e("th","",`${ue.label}${ue.unit?` (${ue.unit})`:""}`);Ie.scope="row",we.append(Ie);let et=l.map((Tt,Xt)=>{if(ue.field==="status")return ih(Tt);if(ue.identity)return Tt[ue.field]??Tt.panel?.[ue.field]??"\u672A\u8BB0\u5F55";let Ct=x[Xt];return Ct?ue.field==="standout"?jd(Ct):Ct.panel?.[ue.field]:null}),pt=et.filter((Tt,Xt)=>x[Xt]&&mn(x[Xt])&&Number.isFinite(Tt)),Lt=pt.length?ue.higherIsBetter?Math.max(...pt):Math.min(...pt):null;et.forEach((Tt,Xt)=>{let Ct=document.createElement("td"),Ln=x[Xt]&&mn(x[Xt]);if(Ct.textContent=ue.identity?String(Tt):x[Xt]?ue.field==="standout"?Cc(Tt):Gt(Tt):"\u5F53\u524D\u53E3\u5F84\u7F3A\u5E2D",!ue.identity&&Ln&&Number.isFinite(Tt)&&Tt===Lt&&Ct.classList.add("is-best-comparable-value"),!ue.identity&&Ln&&S>=0){let Gc=Cp(Tt,et[S]);Gc!==null&&Ct.append($e("span","aa-comparison-delta",` \u0394 ${Gc>0?"+":""}${Gt(Gc)}%`))}Ln||Ct.classList.add("is-unavailable-for-comparison"),we.append(Ct)}),le.append(we)}w.append(F,V,le),Sn.replaceChildren(w),ki(Sn)}function sh(){zs.replaceChildren(...he.flatMap((l,x)=>{if(!N(l)||!Ft(x))return[];let S=$e("span","aa-pinned-model-name-label",l.name);return S.dataset.modelIndex=String(x),[S]})),rh()}function rh(){let l=[...zs.children],x=l.map((S,w)=>{let V=Ve[Number(S.dataset.modelIndex)]?.logoSprite.position?.clone().project(D);return S.hidden=!1,{id:w,visible:V&&Math.abs(V.z)<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1,x:V?(V.x+1)*h.clientWidth/2+12*Cn:0,y:V?(1-V.y)*h.clientHeight/2:0,width:S.offsetWidth,height:S.offsetHeight}});for(let S of Rp(h.clientWidth,h.clientHeight,x)){let w=l[S.id];w.hidden=S.hidden,S.hidden||(w.style.left=`${S.x}px`,w.style.top=`${S.y}px`)}}function vm(){let l=Dc("aa-standout-panel","\u7A81\u51FA\u5EA6");l.append(fm());let x=$e("p","aa-weight-note");x.id="aa-standout-metric-description",l.append(x);let S=document.createElement("div");S.id="aa-standout-weight-controls",S.className="aa-weight-block",Ge={},[["intelligence","\u667A\u80FD"],["cost","\u6210\u672C"],["speed","\u901F\u5EA6"]].forEach(([V,ne])=>{let $=document.createElement("div");$.className="aa-weight-row";let le=document.createElement("span");le.textContent=ne;let ue=document.createElement("input");ue.type="range",ue.min="-2",ue.max="2",ue.step="0.05",ue.value="0",ue.id=`aa-weight-slider-${V}`;let we=document.createElement("input");we.type="number",we.min="0.25",we.max="4",we.step="0.05",we.value="1.00",we.className="aa-weight-number",we.id=`aa-weight-number-${V}`,we.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD`),ue.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD\u6ED1\u6746`),ue.addEventListener("input",()=>{De[V]=Math.pow(2,Number(ue.value)),we.value=De[V].toFixed(2),ms()});let Ie=()=>{let et=Na(we.value,De[V]);De[V]=et,we.value=et.toFixed(2),ue.value=String(Math.log2(et)),ms()};we.addEventListener("blur",Ie),we.addEventListener("keydown",et=>{et.key==="Enter"&&(et.preventDefault(),Ie())}),$.append(le,ue,we),S.appendChild($),Ge[V]={slider:ue,number:we}});let w=$e("button","aa-secondary-button","\u91CD\u7F6E\u4E09\u4E2A\u6743\u91CD\u4E3A 1");w.type="button",w.id="aa-reset-standout-axis-weights",w.addEventListener("click",()=>Ic(1,1,1)),S.append($e("p","aa-weight-note","\u6743\u91CD\u4EE5\u6307\u6570\u6539\u53D8\u5F52\u4E00\u5750\u6807\uFF0C\u4EC5\u5F71\u54CD\u52A0\u6743\u8D85\u4F53\u79EF\uFF1B\u5141\u8BB8 0.25\u20134\u3002\u7F16\u8F91\u6570\u5B57\u540E\u6309 Enter \u6216\u79FB\u51FA\u7126\u70B9\u63D0\u4EA4\u3002"),w);let F=document.createElement("h3");return F.className="aa-section-title",F.textContent="\u524D\u6CBF\u6392\u884C\uFF08\u524D 12 \u540D\uFF09",Bt=document.createElement("div"),Bt.id="aa-standout-ranking",Bt.className="aa-ranking-list",l.append(S,F,Bt),Uc(),l}function Uc(){let l=document.getElementById("aa-standout-metric-description");l&&(l.textContent={trend_residual:"\u8D8B\u52BF\u6B8B\u5DEE\uFF1A\u6A21\u578B\u667A\u80FD\u76F8\u5BF9\u524D\u6CBF\u6210\u672C\u4E0E\u901F\u5EA6\u8D8B\u52BF\u62DF\u5408\u7684\u504F\u79BB\uFF0C\u8D8A\u9AD8\u8D8A\u7A81\u51FA\u3002",intelligence_uplift:"\u667A\u80FD\u62AC\u5347\uFF1A\u4E0E\u5176\u4ED6\u524D\u6CBF\u53C2\u7167\u76F8\u6BD4\u7684\u667A\u80FD\u589E\u91CF\uFF1B\u7F3A\u5C11\u53C2\u7167\u65F6\u4E0D\u8BA1\u7B97\u3002",weighted_exclusive_hypervolume:"\u52A0\u6743\u8D85\u4F53\u79EF\u5360\u6BD4 = \u8BE5\u6A21\u578B\u7684\u6392\u4ED6\u8D21\u732E \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF\u3002\u6309\u539F\u59CB\u8D21\u732E\u6392\u5E8F\uFF0C\u7B5B\u9009\u4E0D\u6539\u53D8\u5206\u6BCD\u3002",frontier_distance:"\u5230\u524D\u6CBF\u5782\u8DDD\uFF1A\u6CBF\u7528\u5F53\u524D\u5206\u6790\u65B9\u6CD5\u7684\u51E0\u4F55\u8DDD\u79BB\uFF1B\u4E0D\u8868\u793A\u5B9E\u9645\u53EF\u8FBE\u7684\u65B0\u6A21\u578B\u3002"}[ze]);let x=document.getElementById("aa-standout-weight-controls");x&&(x.hidden=!jn[ze].usesAdjustableAxisWeights)}function bm(){return kt=document.createElement("details"),kt.id="aa-current-view-panel",kt.className="aa-control-section aa-current-view-details",kt.open=!0,kt}function ah(){return ke?.current_view||{}}function Oc(){return he.filter(l=>!mn(l)).length}function Bc(){let l=E.current_intelligence_index_version;return l?`v${String(l).replace(/^v/i,"")}`:"\u7248\u672C\u672A\u77E5"}function zc(){let l=E.current_intelligence_index_version_source==="inferred_from_accepted_embedded_model_catalog_partition";return`${Bc()}${l?"\uFF08\u6309\u76EE\u5F55\u5206\u533A\u63A8\u5B9A\uFF09":""}`}function kc(){let l=E.artificial_analysis_api_response_fetched_at_utc;if(!l)return{headerText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5",detailText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5\uFF08\u5951\u7EA6\u672A\u8BB0\u5F55 API \u6293\u53D6\u65F6\u95F4\uFF09"};let x=E.artificial_analysis_api_response_fetched_at_utc_source==="inferred_from_cache_file_modification_time";return{headerText:`API \u6293\u53D6\u4E8E ${String(l).slice(0,10)}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":""}`,detailText:`${l}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":"\uFF08\u6293\u53D6\u65F6\u8BB0\u5F55\uFF09"}`}}function Sm(){let{rendererBundleSha256:l,generatorGitCommit:x,renderedAtUtc:S}=I,w=x.endsWith("-dirty"),F=x.replace(/-dirty$/,""),V=/^[0-9a-f]{40}$/.test(F)?F.slice(0,12):F;return[`bundle ${l.slice(0,12)}`,`commit ${V}${w?"-dirty":""}`,`\u6E32\u67D3 ${S}`].join(" \xB7 ")}function oh(){if(!kt||!ke)return;let l=ah(),x=document.createElement("summary");x.className="aa-section-title aa-collapsible-summary",x.textContent="\u5F53\u524D\u89C6\u56FE";let S=document.createElement("dl");S.className="aa-current-view-grid";let w=Oc();[["\u6E32\u67D3\u5668","three.js"],["\u6570\u636E\u65E5\u671F",l.data_date||a.data_date||"?"],["\u667A\u80FD\u6307\u6570",Bc()],["\u6210\u672C\u53E3\u5F84",l.cost_metric_label||Be.cost_axis_label],["\u901F\u5EA6\u53E3\u5F84",l.speed_metric_label||Be.speed_axis_label],["\u53EF\u89C1 / \u5951\u7EA6\u6A21\u578B\u6570",`${he.filter((F,V)=>Ft(V)).length} / ${he.length}`],["\u53C2\u4E0E\u5206\u6790\uFF08\u5951\u7EA6\u5168\u96C6\uFF09",String(he.length-w)],["\u5386\u53F2\u53E3\u5F84\u70B9",String(w)],["\u5168\u5C40 Pareto \u6570",String(wi().length)],["\u53EF\u89C1 Pareto \u6570",String(wi().filter(F=>Ft(Ze[F.name])).length)],["\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650",A===null?"\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":`${A} \u4E2A\u6708 \xB7 ${Ke?"\u663E\u793A":"\u9690\u85CF"}\u5BBD\u9650\u4E13\u5C5E\u70B9`],["\u5BBD\u9650\u4E13\u5C5E\u70B9",String(he.filter(F=>F.displayed_only_because_of_recent_release_grace_period===!0).length)],["\u526A\u679D\u53C2\u8003\u65E5",l.pruning_reference_date||E.pruning_reference_date||"\u672A\u8BB0\u5F55"],["\u4EA7\u7269\u6307\u7EB9",Sm(),"aa-current-view-report-artifact-fingerprint"]].forEach(([F,V,ne])=>{let $=document.createElement("dt");$.textContent=F;let le=document.createElement("dd");le.textContent=V,ne&&(le.id=ne,le.title=[`renderer bundle sha256\uFF1A${I.rendererBundleSha256}`,`generator git commit\uFF1A${I.generatorGitCommit}`,`rendered at (UTC)\uFF1A${I.renderedAtUtc}`].join(`
`)),S.append($,le)}),kt.replaceChildren(x,S)}function $e(l,x,S){let w=document.createElement(l);return x&&(w.className=x),S!==void 0&&(w.textContent=S),w}function lh(l,x){let S=$e("a","aa-artificial-analysis-attribution-link",l);return x&&(S.id=x),S.href=C,S.target="_blank",S.rel="noopener noreferrer",S}function Mm(){if(!b)return;let l=b.querySelector("h1")||$e("h1","frontier-3d-report-title",document.title),x=$e("div","aa-report-header-metadata-row");x.id="aa-report-header-metadata-row",x.tabIndex=0,x.setAttribute("aria-label","\u6A21\u578B\u8BA1\u6570\u4E0E\u6570\u636E\u6765\u6E90\uFF0C\u7A84\u5C4F\u53EF\u6A2A\u5411\u6EDA\u52A8"),dh(x);let S=lh("\u6570\u636E\uFF1AArtificial Analysis","aa-report-header-artificial-analysis-attribution-link");S.append($e("span","aa-external-link-glyph"," \u2197"));let w=kc(),F=$e("span","aa-report-header-metadata-item",w.headerText);F.id="aa-report-header-artificial-analysis-api-fetch-date",F.title=w.detailText;let V=$e("span","aa-report-header-metadata-item",`\u667A\u80FD\u6307\u6570 ${zc()}`);V.id="aa-report-header-intelligence-index-version",Z=$e("span","aa-report-header-metadata-item"),Z.id="aa-report-header-model-count-summary",x.append(S,F,V,Z),Re=$e("button","aa-how-to-read-drawer-toggle-button","\u5982\u4F55\u9605\u8BFB \u24D8"),Re.type="button",Re.id="aa-how-to-read-drawer-toggle",Re.setAttribute("aria-expanded","false"),Re.setAttribute("aria-controls","aa-how-to-read-drawer"),Re.addEventListener("click",()=>qs(Ae.hidden));let ne=$e("div","aa-report-header-title-row"),$=$e("div","aa-report-header-actions"),le=$e("button","aa-secondary-button","\u89C6\u56FE\u8BBE\u7F6E");le.type="button",le.id="aa-view-settings-toggle",le.setAttribute("aria-expanded","false"),le.setAttribute("aria-controls",g.id),le.addEventListener("click",()=>{let Ie=d.classList.toggle("is-view-settings-expanded");le.setAttribute("aria-expanded",String(Ie))}),$.append(Re,le),ne.append(l,$);let ue=[ne,x],we=E.embedded_model_catalog_partition_rejection_warning_text;if(typeof we=="string"&&we.trim()){let Ie=$e("div","aa-report-header-data-quality-warning",`\u26A0 ${we}`);Ie.id="aa-report-header-embedded-model-catalog-partition-rejection-warning",Ie.setAttribute("role","alert"),ue.push(Ie)}b.replaceChildren(...ue)}function ch(){if(!Z)return;let l=he.length,x=he.filter((V,ne)=>Ft(ne)).length,S=Oc(),w=[`\u5168\u90E8\u8F93\u5165 ${a.model_table_coverage==="all_input_records"?a.models.length:"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u8986\u76D6\u6709\u9650\uFF09"}`,x===l?`\u663E\u793A ${l} \u4E2A\u6A21\u578B`:`\u663E\u793A ${x}/${l} \u4E2A\u6A21\u578B`,`\u5168\u5C40 Pareto ${wi().length}`,`\u53EF\u89C1 Pareto ${wi().filter(V=>Ft(Ze[V.name])).length}`],F=he.filter((V,ne)=>!mn(V)&&Ft(ne)).length;S&&w.push(`\u5386\u53F2\u53E3\u5F84 ${F===S?S:`${F}/${S}`}`),Z.textContent=w.join(" \xB7 "),ki(document.getElementById("aa-report-header-metadata-row"))}function Em(l){return l.scrollWidth-l.clientWidth>1&&l.scrollLeft+l.clientWidth<l.scrollWidth-1}function ki(l){l&&l.classList.toggle("has-inline-overflow-fade",Em(l))}function uh(){ki(document.getElementById("aa-report-header-metadata-row")),ki(Sn),window.requestAnimationFrame(()=>{ki(document.getElementById("aa-report-header-metadata-row")),ki(Sn)})}function dh(l){!l||l.dataset.horizontalOverflowFadeBound==="true"||(l.dataset.horizontalOverflowFadeBound="true",l.addEventListener("scroll",()=>ki(l),{passive:!0}),ki(l))}function wm(){Ae=document.createElement("section"),Ae.id="aa-how-to-read-drawer",Ae.className="aa-how-to-read-drawer",Ae.setAttribute("aria-label","\u5982\u4F55\u9605\u8BFB\u672C\u56FE"),Ae.tabIndex=-1,Ae.hidden=!0,p.appendChild(Ae),document.addEventListener("keydown",l=>{l.key==="Escape"&&!Ae.hidden&&qs(!1),l.key==="Escape"&&pn&&gn()})}function qs(l){if(!Ae)return Promise.resolve(!1);let x=!!l,S=!Ae.hidden,w=Ae.contains(document.activeElement);return x&&Xa(),Ae.hidden=!x,Re?.setAttribute("aria-expanded",String(x)),x&&!S?Ae.focus({preventScroll:!0}):!x&&S&&w&&Re?.focus({preventScroll:!0}),Promise.resolve(x)}function Vi(l,...x){let S=$e("section","aa-how-to-read-drawer-section");return S.append($e("h3","aa-how-to-read-drawer-section-title",l),...x),S}function Xa(){if(!Ae||!ke)return;let l=ah(),x=ke.three_dimensional_axis_configuration||{},S=$e("div","aa-how-to-read-drawer-header"),w=$e("button","aa-link-button","\u5173\u95ED");w.type="button",w.id="aa-how-to-read-drawer-close-button",w.addEventListener("click",()=>qs(!1)),S.append($e("h2","aa-section-title","\u5982\u4F55\u9605\u8BFB"),w);let F=$e("ul","aa-how-to-read-drawer-list");[[`\u6210\u672C\u8F74 x\uFF1A${x.x_axis?.title_text||l.cost_metric_label||"\u6210\u672C"}\u3002\u8D8A\u4F4E\u8D8A\u597D\uFF08\u8D8A\u4FBF\u5B9C\uFF09\u3002`,l.cost_metric_note?`\u53E3\u5F84\uFF1A${l.cost_metric_note}`:""],[`\u901F\u5EA6\u8F74 y\uFF1A${l.speed_axis_title_text||x.y_axis?.title_text||l.speed_metric_label||"\u901F\u5EA6"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,l.speed_metric_note?`\u53E3\u5F84\uFF1A${l.speed_metric_note}`:""],[`\u667A\u80FD\u8F74 z\uFF1A${x.z_axis?.title_text||"\u667A\u80FD\u6307\u6570"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,""]].forEach(([et,pt])=>{let Lt=$e("li","",et);pt&&Lt.append($e("div","aa-how-to-read-drawer-metric-note",pt)),F.appendChild(Lt)});let V=Oc(),ne=$e("p","aa-how-to-read-drawer-paragraph");ne.append($e("span","aa-historical-intelligence-index-version-swatch"),document.createTextNode(`\u865A\u7EBF\u5E95\u677F\u3001\u534A\u900F\u660E Logo \u7684\u70B9\u662F\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF1A\u672C\u53E3\u5F84\u7528\u5230\u7684\u6210\u672C\u6216\u5197\u957F\u5EA6\u6765\u81EA\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\uFF08\u5F53\u671F\u4E3A ${Bc()}\uFF09\u3002\u5B83\u4EEC\u7167\u5E38\u663E\u793A\uFF0C\u4F46\u4E0D\u53C2\u4E0E Pareto\u3001\u7A81\u51FA\u5EA6\u3001\u5F52\u4E00\u5316\u4E0E\u524D\u6CBF\u51E0\u4F55\u7684\u8BA1\u7B97\u3002\u5F53\u524D\u53E3\u5F84\u5171 ${V} \u4E2A\uFF1B\u52FE\u9009\u5DE5\u5177\u680F\u300C\u4EC5\u5F53\u671F\u53EF\u6BD4\u300D\u53EF\u9690\u85CF\u5B83\u4EEC\u3002`));let $=$e("dl","aa-current-view-grid"),le=E.embedded_model_catalog_intelligence_index_version,ue=E.embedded_model_catalog_captured_at_utc,we=E.artificial_analysis_website_page_fetch_paused,Ie=E.artificial_analysis_api_tier;[["\u6570\u636E\u63D0\u4F9B\u65B9",lh("Artificial Analysis")],["API \u6293\u53D6",kc().detailText],["\u667A\u80FD\u6307\u6570",`${zc()}${Ie?`\uFF08API ${Ie} tier\uFF09`:""}`],["\u5185\u5D4C\u6A21\u578B\u76EE\u5F55",le?`v${le}${ue?`\uFF0C\u7F13\u5B58\u4E8E ${ue}`:""}`:"\u672A\u8BB0\u5F55"],["\u7F51\u9875\u6293\u53D6",we===!0?"\u5DF2\u6682\u505C\uFF08\u53EA\u8BFB\u5DF2\u6709\u7F13\u5B58\uFF09":we===!1?"\u5DF2\u5F00\u542F":"\u672A\u8BB0\u5F55"],["\u526A\u679D\u53C2\u8003\u65E5",E.pruning_reference_date||"\u672A\u8BB0\u5F55"]].forEach(([et,pt])=>{let Lt=document.createElement("dd");Lt.append(pt),$.append($e("dt","",et),Lt)}),Ae.replaceChildren(S,Vi("\u4E09\u4E2A\u5750\u6807\u8F74",F,$e("p","aa-how-to-read-drawer-paragraph","\u521D\u59CB\u89C6\u89D2\u4ECE\u300C\u4F4E\u6210\u672C\u3001\u9AD8\u901F\u5EA6\u3001\u9AD8\u667A\u80FD\u300D\u4E00\u89D2\u770B\u5411\u5BF9\u89D2\uFF1B\u62D6\u62FD\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u53F3\u952E\u62D6\u52A8\u5E73\u79FB\u3002")),Vi("Pareto \u524D\u6CBF",$e("p","aa-how-to-read-drawer-paragraph","\u5E26\u6DF1\u8272\u5706\u73AF\u7684\u70B9\u662F\u672C\u53E3\u5F84\u7684 Pareto \u70B9\uFF1A\u6CA1\u6709\u5176\u4ED6\u6A21\u578B\u5728\u6210\u672C\u3001\u901F\u5EA6\u3001\u667A\u80FD\u4E0A\u540C\u65F6\u4E0D\u5DEE\u4E14\u81F3\u5C11\u4E00\u7EF4\u66F4\u597D\u3002\u9ED8\u8BA4\u7684 Delaunay \u90BB\u63A5\u63D2\u503C\u8FDE\u63A5\u8FD9\u4E9B\u70B9\uFF0C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\u3002\u52FE\u9009\u300C\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09\u300D\u53EF\u5207\u6362\u4E3A\u5DF2\u5C55\u793A\u5206\u6790\u70B9\u7684\u7CBE\u786E\u9884\u7B97\u53EF\u8FBE\u9762\u3002")),Vi("\u5386\u53F2\u53E3\u5F84\u70B9",ne),Vi("\u53E3\u5F84\u4E0E\u6B63\u4EA4\u5206\u89E3",$e("p","aa-how-to-read-drawer-paragraph",[...Object.values(a.cost_metric_definitions||{}).map(et=>et.description||`${et.label}\uFF1A${et.unit||"USD"}`),...Object.values(a.speed_metric_definitions||{}).map(et=>et.description||`${et.label}\uFF1A\u751F\u6210\u901F\u5EA6 tok/s`),"\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2\u91C7\u7528\u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u5206\u522B\u89C2\u5BDF\u5355\u4EF7\u3001\u541E\u5410\u4E0E\u667A\u80FD\u3002\u6709\u6548\u6210\u672C\u4E0E\u6709\u6548\u901F\u5EA6\u90FD\u53D7\u5230\u8F93\u51FA\u957F\u5EA6\u5F71\u54CD\u3002\u5207\u6362\u53E3\u5F84\u4FDD\u7559\u76F8\u673A\uFF0C\u56FA\u5B9A\u8F74\u57DF\u6765\u81EA\u8BE5\u53E3\u5F84\u5B8C\u6574\u663E\u793A\u96C6\u5408\uFF1B\u7B5B\u9009\u548C\u5BBD\u9650\u5F00\u5173\u4E0D\u6539\u53D8\u8F74\u57DF\u3002"].join(" "))),Vi("\u56FE\u4F8B",$e("p","aa-how-to-read-drawer-paragraph",["\u6DF1\u8272\u73AF\uFF1A\u5E15\u7D2F\u6258\u8EAB\u4EFD\uFF1B\u91D1\u8272\u73AF\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\u5149\u6655\uFF1A\u5F53\u524D\u7A81\u51FA\u5EA6\u7684\u76F8\u5BF9\u5927\u5C0F\uFF0C\u865A\u7EBF\u5149\u6655\u8868\u793A\u7F3A\u5C11\u6570\u503C\u3002","\u7D2B\u8272\u5B9E\u7EBF\uFF1A\u540C\u4EE3\u63A8\u7406\u6863\u4F4D\uFF1B\u7070\u8272\u5B9E\u7EBF\uFF1A\u540C\u6863\u4F4D\u8DE8\u4EE3\u8C31\u7CFB\uFF1B\u7070\u8272\u865A\u7EBF\uFF1A\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D\u53C2\u7167\u3002\u7070\u70B9\uFF1A\u88AB\u526A\u679D\u7684\u8C31\u7CFB\u524D\u8EAB\uFF1B\u8D85\u8303\u56F4\u524D\u8EAB\u5939\u7D27\u5728\u7BB1\u58C1\uFF0C\u8BE6\u60C5\u7528 \u2191\u2193 \u63D0\u793A\u65B9\u5411\u5E76\u4FDD\u7559\u539F\u503C\u3002",pe?"\u5F53\u524D\u663E\u793A\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684\u5E15\u7D2F\u6258\u70B9\u3002":`\u5F53\u524D${J==="hidden"?"\u9690\u85CF":J==="solid"?"\u663E\u793A\u5B9E\u5FC3":"\u663E\u793A\u7EBF\u6846"} Delaunay \u90BB\u63A5\u53C2\u7167\uFF0C\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002`,U?"\u56FD\u522B\u5916\u6846\u5DF2\u5F00\u542F\uFF1A\u4E2D\u56FD\u53CC\u5706\u73AF\u3001\u7F8E\u56FD\u5706\u89D2\u65B9\u73AF\u3001\u5176\u4ED6\u83F1\u5F62\u73AF\uFF1B\u56FD\u522B\u53EA\u6807\u8BC6\u5382\u5546\u5F52\u5C5E\u3002":"\u56FD\u522B\u5916\u6846\u5173\u95ED\uFF1B\u5F00\u542F\u65F6\u540C\u6B65\u663E\u793A\u56FD\u522B\u56FE\u4F8B\u3002"].join(" "))),Vi("\u672A\u4E0A\u56FE\u6A21\u578B\u4E0E\u5382\u5546",$e("p","aa-how-to-read-drawer-paragraph",(()=>{let et=Me.excluded_models_with_drop_reason||[],pt=[...new Set(et.map(Lt=>Lt.creator))].filter(Lt=>!he.some(Tt=>Tt.creator===Lt));return`${et.length} \u4E2A\u6709\u667A\u80FD\u5206\u7684\u6A21\u578B\u672A\u4E0A\u56FE\u3002\u53EF\u5728\u641C\u7D22\u4E2D\u6309\u6A21\u578B\u6216\u5382\u5546\u67E5\u770B\u5B9E\u9645\u539F\u56E0\u3002${pt.map(Lt=>`${Lt}\uFF1A${[...new Set(et.filter(Tt=>Tt.creator===Lt).map(Tt=>Tt.drop_reason))].join("\u3001")}`).join("\uFF1B")}`})())),Vi("\u6570\u636E\u6765\u6E90",$),Vi("\u54C1\u724C\u4E0E\u8BB8\u53EF",$e("p","aa-how-to-read-drawer-paragraph","\u672C\u62A5\u544A\u4F7F\u7528 Lobe Icons \u7684 MIT \u8BB8\u53EF\u56FE\u6807\u4E0E\u672C\u5730\u54C1\u724C\u8D44\u4EA7\u3002\u54C1\u724C\u540D\u79F0\u548C\u5546\u6807\u5C5E\u4E8E\u5404\u81EA\u6743\u5229\u4EBA\uFF0C\u4EC5\u7528\u4E8E\u6807\u8BC6\u5382\u5546\uFF0C\u4E0D\u8868\u793A\u8BA4\u53EF\u6216\u5408\u4F5C\u3002\u5B8C\u6574\u8BB8\u53EF\u89C1\u672C\u9875\u6E90\u4EE3\u7801\u7684 Lobe Icons MIT \u8BB8\u53EF\u58F0\u660E\u3002")))}function Vr(l){ve=!!l,d.classList.toggle("is-side-panel-collapsed",!ve);let x=window.matchMedia("(max-width: 1024px)").matches;ct.textContent=ve?x?"\u2304":"\u203A":x?"\u2303":"\u2039",ct.setAttribute("aria-label",`${ve?"\u6536\u8D77":"\u5C55\u5F00"}\u56FE\u8868\u63A7\u5236\u680F`),ct.setAttribute("aria-controls","aa-side-panel-body"),ct.setAttribute("aria-expanded",String(ve)),window.setTimeout(gs,210)}function Am(){Mm(),wm(),g.replaceChildren(um(),dm(),hm());let l=document.createElement("div");l.className="aa-side-panel-header";let x=document.createElement("div");x.className="aa-side-panel-label",x.textContent="\u56FE\u8868\u63A7\u5236",ct=document.createElement("button"),ct.type="button",ct.id="aa-side-panel-toggle",ct.className="aa-icon-button",ct.addEventListener("click",()=>Vr(!ve)),l.append(x,ct);let S=document.createElement("div");S.className="aa-side-panel-body",S.id="aa-side-panel-body",S.append(pm(),_m(),xm(),vm(),bm()),v.replaceChildren(l,S),ym(),Uc(),hh()}function hh(){let l=window.matchMedia("(max-width: 640px)").matches,x=document.getElementById("aa-report-header-metadata-row"),S=document.getElementById("aa-report-header-model-count-summary");x&&S&&(l?x.prepend(S):x.append(S)),uh(),jt&&(window.matchMedia("(max-width: 1024px)").matches?bt.after(jt):d.append(jt)),Vr(ve)}window.addEventListener("resize",hh);function gs(){let l=Math.max(1,h.clientWidth),x=Math.max(1,h.clientHeight),S=Math.min(window.devicePixelRatio||1,2);O.getPixelRatio()!==S&&O.setPixelRatio(S),O.setSize(l,x,!1),O.setViewport(0,0,O.domElement.width/S,O.domElement.height/S);for(let w of[Xe,Oe,at])w?.material.resolution.set(l,x);D.aspect=l/x,D.updateProjectionMatrix(),f?.onResize();for(let w of[me,ge])w.children.filter(F=>F.isSprite).forEach(F=>Nr(F,F.userData.cssPixelSize));!_t.hidden&&ds&&ps(ds),Wt()}new ResizeObserver(gs).observe(h),window.addEventListener("resize",gs);let Vc;function Hc(){Vc?.removeEventListener("change",Hc),Vc=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`),Vc.addEventListener("change",Hc),gs()}Hc();function $a(l){let x=l.clone().project(D),S=O.domElement.getBoundingClientRect();return{clientX:S.left+(x.x+1)/2*S.width,clientY:S.top+(1-x.y)/2*S.height,normalizedDeviceDepth:x.z}}function fh(l){let x=Ze[l];return x===void 0?null:$a(Ve[x].logoSprite.position)}function Tm(l){let x=Ze[l];if(x===void 0)return null;let S=Ve[x],w=new B().setFromMatrixColumn(D.matrixWorld,0),F=$a(S.logoSprite.position);function V(ne){if(!ne.material.sizeAttenuation)return ne.scale.x*h.clientHeight/(4*Math.tan(_i.degToRad(D.fov/2)));let $=$a(ne.position.clone().addScaledVector(w,ne.scale.x/2));return Math.hypot($.clientX-F.clientX,$.clientY-F.clientY)}return{logoRadius:V(S.logoSprite),whiteBackplateRadius:V(S.backplateSprite),countryRegionRadius:V(S.countryRegionSprite)}}function ph(l){let x=je.find(S=>S.userData.prunedLineageAncestorNode.name===l);return x?$a(x.position):null}function Cm(l){let x=fh(l);if(!x)return null;let S=Hs(x.clientX,x.clientY);if(S?.interactionTargetKind!=="displayed_model")return null;let w=he[S.modelIndex];return{projectedCanvasPosition:x,frontmostModelName:w.name,frontmostBaseModelName:w.base_model_name,frontmostLineageKey:w.lineage_key}}function Rm(l){let x=ph(l);if(!x)return null;let S=Hs(x.clientX,x.clientY),w=S?.interactionTargetKind==="displayed_model"?he[S.modelIndex]?.name??null:S?.prunedLineageAncestorNode?.name??null;return{projectedCanvasPosition:x,frontmostInteractionTargetKind:S?.interactionTargetKind??null,frontmostInteractionTargetName:w,frontmostInteractionTargetIsRequestedPrunedLineageAncestor:S?.interactionTargetKind!=="displayed_model"&&w===l}}function Im(){if(!it)return{built:!1,visible:!1,vertexCount:0,triangleCount:0,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:!0,allVertexPositionsAreFinite:!0};let l=it.geometry.attributes.position,x=Array.from(it.geometry.index.array);return{built:!0,visible:it.visible,vertexCount:l.count,triangleCount:x.length/3,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:x.every(S=>Number.isInteger(S)&&S>=0&&S<l.count),allVertexPositionsAreFinite:Array.from(l.array).every(Number.isFinite)}}function Pm(){let l=he.filter(($,le)=>Ft(le)).length,x=new Set($d().filter($=>$.userData.interactionTargetKind==="displayed_model").map($=>$.userData.modelIndex)),S=he.map(($,le)=>[$,le]).filter(([$])=>!mn($)).map(([,$])=>$),w=new Set(he.map($=>$.creator)),F=new Set(he.filter(($,le)=>Ft(le)).map($=>$.creator)).size,V=qa(Xe).length,ne=qa(Oe).length;return{interactiveRenderer:"threejs",activeMetricVariantKey:u,costAxisField:Be.cost_axis_field,speedAxisField:Be.speed_axis_field,displayedModelMarkerCount:he.length,organizationLogoMarkerCount:Ve.length,cameraFacingOrganizationLogoMarkerCount:Ye.filter($=>$.isSprite).length,depthTestedOrganizationLogoMarkerCount:Ye.filter($=>$.material.depthTest).length,depthWritingOrganizationLogoBackplateCount:Ve.filter($=>$.backplateSprite.material.depthWrite).length,loadedOrganizationLogoCanvasTextureCount:[...w].filter($=>rt[$]==="loaded").length,failedOrganizationLogoCanvasTextureCount:[...w].filter($=>rt[$]==="failed").length,countryRegionMarkerVisible:U,countryRegionMarkerCount:U?l:0,organizationCount:w.size,visibleOrganizationCount:F,pinnedBaseModelNames:[..._e],orbitInteractionActive:Xs,pinnedModelUuids:[...Ne].filter($=>!$.startsWith("legacy:")),hoveredModelIndex:W,organizationLogoTextureLoadStateByCreatorName:{...rt},hoveredLineageKey:Ee,hoveredReasoningBaseModelName:ie,hoveredPrunedLineageAncestorName:k,pinnedModelMarkerCount:he.filter($=>N($)).length,displayedLineageSegmentEndpointCount:V,displayedReasoningVariantSegmentEndpointCount:ne,displayedPrunedLineageAncestorMarkerCount:je.length,availableLineageCount:Object.keys(ye).length,selectedFrontierStandoutMetricName:ze,frontierStandoutAxisWeights:{...De},paretoFrontierModelCount:wi().length,visibleParetoFrontierModelCount:wi().filter($=>Ft(Ze[$.name])).length,frontierStyle:J,achievableFrontierSurfaceVisible:pe,paretoFrontierWireframeVisible:tt?.visible??!1,paretoFrontierSurfaceVisible:it?.visible??!1,achievableFrontierSurfaceObjectVisible:fe?.visible??!1,exactAchievableBoundaryVisible:Ue?.visible??!1,achievableFrontierGeometryKind:ke.achievable_frontier_geometry_kind??null,paretoFrontierSurfaceWritesDepth:it?.material.depthWrite??null,achievableFrontierSurfaceWritesDepth:fe?.material.depthWrite??null,paretoFrontierSurfaceTriangleCount:it?it.geometry.index.count/3:0,renderedTriangleCountInLatestFrame:O.info.render.triangles,nonFiniteContractCoordinateCount:_,outOfRangeContractTriangleVertexIndexCount:X,skippedInvalidContractGeometryNames:[...Y],visibleModelMarkerCount:l,showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod:Ke,recentReleaseFrontierDistanceGracePeriodMonths:A,recentReleaseGracePeriodOnlyModelMarkerCount:he.filter($=>$.displayed_only_because_of_recent_release_grace_period===!0).length,pickableRecentReleaseGracePeriodOnlyModelMarkerCount:he.filter(($,le)=>$.displayed_only_because_of_recent_release_grace_period===!0&&x.has(le)).length,showOnlyCurrentIntelligenceIndexVersionComparableModels:ft,historicalIntelligenceIndexVersionModelMarkerCount:S.length,visibleHistoricalIntelligenceIndexVersionModelMarkerCount:S.filter($=>Ve[$]?.logoSprite.visible).length,pickableHistoricalIntelligenceIndexVersionModelMarkerCount:S.filter($=>x.has($)).length,historicalIntelligenceIndexVersionStyledModelMarkerCount:Ve.filter($=>$.backplateSprite.material===dc&&$.logoSprite.material.opacity<1).length,currentIntelligenceIndexVersionStyledModelMarkerCount:Ve.filter($=>$.backplateSprite.material===uc&&$.logoSprite.material.opacity>=1).length,howToReadDrawerOpen:Ae?!Ae.hidden:!1,reportArtifactFingerprint:{...I},sidePanelExpanded:ve,markerSizeMultiplier:Cn,fixedAxisConfiguration:ke.three_dimensional_axis_configuration,cameraPosition:D.position.toArray()}}function qa(l){if(!l)return[];if(l.isLineSegments2){let S=l.geometry.attributes.instanceStart,w=l.geometry.attributes.instanceEnd;return Array.from({length:S.count},(F,V)=>[[S.getX(V),S.getY(V),S.getZ(V)],[w.getX(V),w.getY(V),w.getZ(V)]]).flat()}let x=l.geometry.attributes.position;return Array.from({length:x.count},(S,w)=>[x.getX(w),x.getY(w),x.getZ(w)])}function Lm(){return{lineage:qa(Xe),reasoning:qa(Oe)}}function Dm(){return Ve.map((l,x)=>({name:he[x]?.name,position:l.logoSprite.position.toArray(),visible:Ft(x)}))}function Nm(){return je.map(l=>l.position.toArray())}function Fm(){return{selectedFrontierStandoutMetricName:ze,frontierStandoutAxisWeights:{...De},ranking:wi().map(l=>({name:l.name,value:Pt[l.name]})).sort((l,x)=>{let S=Number.isFinite(l.value)?l.value:-1/0;return(Number.isFinite(x.value)?x.value:-1/0)-S}),completeFrontierHypervolume:St}}function Um(l){return(Me?.model_analysis_records||[]).find(x=>xe(x)===xe(l))}function mh(l){return Um(l)?.sensitivity_by_intelligence_half_width?.[R.sensitivity_intelligence_half_width]}function gh(){let l=a.refresh_difference_report?.frontier_comparison;return new Set((l?.status==="comparable"?l.entered_by_variant?.[u]||[]:[]).map(x=>x.toLowerCase()))}function Om(){let l=gh();Ve.forEach((x,S)=>{let w=he[S],F=mh(w),V=F?.is_pareto_robust?"robust":F?.is_near_frontier?"near":w.panel?.layer===1&&F?.is_pareto_robust===!1?"sensitive":null,ne=x.sensitivityRingSprite;ne&&(ne.visible=Ft(S)&&R.sensitivity_intelligence_half_width!=="off"&&V!==null,V&&(ne.material=cc[V],ne.userData.normalMaterial=ne.material,ne.userData.normalRenderOrder=48,ne.userData.foregroundMaterial?.dispose(),ne.userData.foregroundMaterial=null)),x.newFrontierEntrySprite&&(x.newFrontierEntrySprite.visible=Ft(S)&&l.has(xe(w)))})}let _h=null;function Hr(){let l=window.matchMedia("(prefers-color-scheme: dark)").matches;z.background.set(l?1120295:16777215);let x={6583435:12044255,3359061:14542835,14212838:4412269,2383002:8436479,4674921:12044255,2193980:6219930};for(let w of[oe,ce,ge])w.traverse(F=>{var ne;if(!F.material?.color||F.isSprite)return;let V=F.material;(ne=V.userData).lightThemeColor??(ne.lightThemeColor=V.color.getHex()),V.color.setHex(l?x[V.userData.lightThemeColor]??V.userData.lightThemeColor:V.userData.lightThemeColor)});if(_h===l){Wt();return}_h=l;for(let[w,F,V]of[["other","#4b5563",!1],["unclassified","#64748b",!0]]){let ne=Od[w],$=ne.image.getContext("2d");$.clearRect(0,0,128,128),$.save(),$.translate(64,64),$.rotate(Math.PI/4),$.strokeStyle=l?"#cbd5e1":F,$.lineWidth=9,V&&$.setLineDash([10,8]),$.strokeRect(-39,-39,78,78),$.restore(),ne.needsUpdate=!0}let S=lc.image.getContext("2d");S.clearRect(0,0,128,128),S.beginPath(),S.arc(64,64,53,0,Math.PI*2),S.lineWidth=10,S.strokeStyle=l?"#e2e8f0":"rgba(15,23,42,0.8)",S.stroke(),lc.needsUpdate=!0,Wt()}f=Np({camera:D,controls:H,canvas:O.domElement,graphContainer:h,getBoundingSphere:()=>new zn(new B,Math.sqrt(3)),getInitialCameraDirection:()=>{let l=ke.initial_camera_configuration.eye;return[l.x,l.y,l.z]},hitTest:Hs,onCameraStateCommitted:P,onDismissOverlay:()=>Ae&&!Ae.hidden?(qs(!1),!0):pn?(gn(),!0):yt&&!yt.hidden&&st?.value?(yt.hidden=!0,st.setAttribute("aria-expanded","false"),st.removeAttribute("aria-activedescendant"),Gn=-1,!0):!1,onClearSelection:()=>{gn(),Ne.clear(),be(),$s(),Ai()},onFocusSearch:()=>{Vr(!0),st?.focus()},requestRender:Wt});function Bm(){return{metric_variant_key:u,pinned_model_uuids:[...Ne].filter(l=>!l.startsWith("legacy:")).sort(),hidden_organization_identity_keys:[...new Set([...de].map(l=>c[l]?.organization_identity_key).filter(Boolean))].sort(),standout_metric:ze,standout_axis_weights:{...De},camera:f.serializeCameraState(),display:{comparable_only:ft,recent_release_grace_period:Ke,country_region_markers:U,achievable_frontier_surface:pe,frontier_style:J,marker_size_multiplier:Cn,pinned_comparison_expanded:!!jt?.open,pinned_comparison_optional_fields:[...Rn].sort()}}}function zm(l,x){if(l.metric_variant_key)if(o[l.metric_variant_key]){let[w,F]=l.metric_variant_key.split("__");kr(w,F)}else x("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002");if(l.pinned_model_uuids){Ne.clear();for(let w of l.pinned_model_uuids){let F=w.toLowerCase();if(Ne.add(F),!Fe.has(F)){let V=`\u7F3A\u5931\u6A21\u578B ${F}`;Fe.set(F,{model_uuid:F,name:V,creator:"?",base_model_name:V,panel:{intelligence:null,release_date:"?"}}),x("\u90E8\u5206\u56FA\u5B9A\u6A21\u578B\u5728\u5F53\u524D\u6587\u4EF6\u4E2D\u7F3A\u5931\uFF0C\u5DF2\u4FDD\u7559 UUID \u4E0E\u672A\u4E0A\u56FE\u8BF4\u660E\u3002")}}be(),$s()}if(l.hidden_organization_identity_keys){let w=new Set(l.hidden_organization_identity_keys);de=new Set(Object.entries(c).filter(([,F])=>w.has(F.organization_identity_key)).map(([F])=>F)),eh()}if(l.standout_metric&&Rc(l.standout_metric),l.standout_axis_weights){let w=l.standout_axis_weights;Ic(w.intelligence,w.cost,w.speed)}let S=l.display||{};S.comparable_only!==void 0&&yc(S.comparable_only),S.recent_release_grace_period!==void 0&&vc(S.recent_release_grace_period),S.country_region_markers!==void 0&&bc(S.country_region_markers),S.achievable_frontier_surface!==void 0&&Ec(S.achievable_frontier_surface),S.frontier_style&&Mc(S.frontier_style),S.marker_size_multiplier!==void 0&&mc(S.marker_size_multiplier),S.pinned_comparison_optional_fields&&(Rn.clear(),S.pinned_comparison_optional_fields.forEach(w=>Rn.add(w)),jt.querySelectorAll("[data-comparison-field]").forEach(w=>{w.checked=Rn.has(w.dataset.comparisonField)}),Pr(Us,[...Rn]),Wa()),S.pinned_comparison_expanded!==void 0&&(jt.open=S.pinned_comparison_expanded),l.camera&&f.restoreCameraState(l.camera),fs()}let km=v.style.transition;v.style.transition="none",Am(),Pc(u,!1),gs(),m=Rd({dataset:a,reportShell:d,toolbar:g,plotRegion:p,graphContainer:h,sidePanel:v,getVariantKey:()=>u,getSharedViewState:Bm,applySharedViewState:zm,modelPassesSharedFilters:l=>{let x=he.find(S=>xe(S)===xe(l))||l;return gc(l.creator)&&(!ft||mn(l))&&(Ke||!x.displayed_only_because_of_recent_release_grace_period)},onExplorationFiltersChanged:l=>{Object.assign(R,l),fs(),Or()},resetCamera:()=>f.resetCamera(),setAxisAlignedCameraView:f.setAxisAlignedCameraView,pinModel:l=>Zd(l),exportPng:async()=>{Q?.finish(),Hr();let l=await Fp({scene:z,camera:D,graphContainer:h,title:document.getElementById("frontier-3d-report-title").textContent,metadataLines:[`\u6570\u636E\u65E5\u671F\uFF1A${a.data_date||"\u672A\u77E5"}\uFF1B${Be.cost_axis_label} \xD7 ${Be.speed_axis_label}`,`\u672C\u53E3\u5F84\u4E0A\u56FE ${he.length}\uFF1B\u53EF\u89C1 ${he.filter((x,S)=>Ft(S)).length}\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97`,`\u667A\u80FD\u5206\u663E\u793A\uFF1A${R.measured_only?"\u4EC5\u5B9E\u6D4B":"\u542B\u5B9E\u6D4B\u3001\u4F30\u7B97\u4E0E\u672A\u77E5"}\uFF1B\u53D1\u5E03\u65E5\u671F\u622A\u6B62\uFF1A${R.cutoff_date||"\u5168\u90E8\u65E5\u671F"}\uFF08${R.date_mode==="hide"?"\u9690\u85CF":"\u6DE1\u51FA"}\uFF0C\u672A\u77E5\u65E5\u671F\u4FDD\u7559\uFF09`],legendLines:["\u5706\u73AF\uFF1A\u6B63\u5F0F\u524D\u6CBF\uFF1B\u91D1\u8272\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\uFF1A\u7A81\u51FA\u5EA6\uFF1B\u9752\u8272\uFF1A\u53EF\u9760\u7684\u65B0\u5165\u524D\u6CBF",`\u524D\u6CBF\u51E0\u4F55\uFF1A${pe?"\u7CBE\u786E\u53EF\u8FBE\u9636\u68AF\uFF08\u57FA\u4E8E\u5DF2\u5C55\u793A\u5206\u6790\u70B9\uFF09":J==="hidden"?"\u5DF2\u9690\u85CF":"Delaunay \u90BB\u63A5\u63D2\u503C\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762"}`,`\u7A81\u51FA\u5EA6\uFF1A${jn[ze].label}\uFF1B\u6743\u91CD\uFF08\u667A\u80FD / \u6210\u672C / \u901F\u5EA6\uFF09\uFF1A${De.intelligence} / ${De.cost} / ${De.speed}`,...U?["\u56FD\u522B/\u5730\u533A\u5916\u6846\uFF1A\u7EA2\u5706\u4E2D\u56FD\uFF1B\u84DD\u5706\u89D2\u7F8E\u56FD\uFF1B\u7070\u83F1\u5F62\u5176\u4ED6\uFF1B\u865A\u7EBF\u83F1\u5F62\u672A\u5206\u7C7B"]:[],...de.size?[`\u9690\u85CF\u5382\u5546\uFF1A${[...de].join("\u3001")}`]:[],R.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`\u5047\u8BBE\u533A\u95F4\uFF1A\u667A\u80FD \xB1${R.sensitivity_intelligence_half_width}\uFF0C\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%\uFF1B\u5B9E\u7EBF\u7A33\u5065\uFF0C\u865A\u7EBF\u654F\u611F/\u8FD1\u524D\u6CBF\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4`],pinnedModelNames:Nc().map(x=>x.name)});Cd(l,`frontier-${a.data_date||"unknown"}.png`),Wt()}}),nc(window.location.hash).state?.camera||f.resetCamera({commit:!1}),gs(),v.style.transition=km,window.serializeFrontierViewState=m.getState,window.setFrontierExplorationFilters=m.setExplorationFilters,window.resetFrontierCameraView=()=>f.resetCamera(),window.setAxisAlignedFrontierCameraView=f.setAxisAlignedCameraView,window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Hr),Hr(),window.frontierThreeDimensionalVisualizationState=Pm,window.pinFrontierBaseModel=l=>Pe(l,!0),window.unpinFrontierBaseModel=l=>Pe(l,!1),window.togglePinnedFrontierBaseModel=Ha,window.showFrontierLineageForModelName=l=>{let x=Ze[l];return x===void 0||!Ft(x)?!1:(Br(x),!0)},window.clearFrontierHoverState=gn,window.matchingFrontierBaseModelNames=mm,window.setFrontierMetricCombination=kr,window.setParetoFrontierVisualizationStyle=Mc,window.setAchievableFrontierSurfaceVisibility=Ec,window.setCountryRegionMarkerVisibility=bc,window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels=yc,window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod=vc,window.setFrontierHowToReadDrawerOpen=qs,window.setFrontierSidePanelExpanded=Vr,window.selectFrontierStandoutMetric=Rc,window.setFrontierStandoutAxisWeights=Ic,window.setFrontierMarkerSizeMultiplier=mc,window.frontierStandoutRanking=Fm,window.frontierThreeDimensionalRendererDiagnostics={verificationGeometryConstructors:{Vector2:Je,Vector3:B,Scene:xr,Color:xt,CanvasTexture:Cs,Sprite:As,SpriteMaterial:ws,PlaneGeometry:Rs,Mesh:rn,PerspectiveCamera:tn,OrthographicCamera:Is},get axisAnnotationSizeMeasurementCount(){return At},get surfaceMaterialForVisibilityVerification(){return it?.material},get surfaceRenderOrder(){return it?.renderOrder},markerVisualEncodingSummary:()=>Ve.map((l,x)=>({isPareto:he[x].panel?.layer===1,paretoRingScale:l.paretoRingSprite.scale.x,backplateScale:l.backplateSprite.scale.x,standoutHaloVisible:l.standoutHaloSprite.visible,standoutHaloScale:l.standoutHaloSprite.scale.x,logoScale:l.logoSprite.scale.x,logoSizeAttenuation:l.logoSprite.material.sizeAttenuation})),camera:D,scene:z,controls:H,renderer:O,historicalSceneTransitionState:()=>Q?.diagnostics()||{is_active:!1},cameraViewState:f.diagnostics,requestRender:Wt,pointerInteractionAtCanvasClientCoordinates:Hs,createRelationshipLineForVerification:Va,projectedCanvasPositionForModelName:fh,projectedCanvasMarkerRadiiForModelName:Tm,projectedCanvasPositionForPrunedLineageAncestorName:ph,frontmostPointerInteractionAtProjectedModelPosition:Cm,frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition:Rm,paretoFrontierSurfaceGeometrySummary:Im,transientRelationshipLineEndpointPositions:Lm,displayedModelMarkerPositionsAndVisibility:Dm,displayedPrunedLineageAncestorMarkerPositions:Nm};function Vm(){let l=Ve.flatMap((x,S)=>Object.entries(x).filter(([,w])=>w?.isSprite).map(([w,F])=>({key:`${xe(he[S])}/${w}`,object:F,replaceObject:V=>{x[w]=V}})));for(let[x,S,w]of[["frontier/wireframe",tt,F=>{tt=F}],["frontier/surface",it,F=>{it=F}],["frontier/achievable-surface",fe,F=>{fe=F}],["frontier/exact-boundary",Ue,F=>{Ue=F}]])S&&l.push({key:x,object:S,replaceObject:w});return l}if(document.getElementById("frontier-3d-historical-progress-dataset-json")){let l=new Fn;l.name="historical-scene-non-pickable-outgoing-layers",z.add(l),Q=Ep({outgoingGroup:l,requestRender:Wt,disposeObject:Ld,reducedMotionMediaQuery:window.matchMedia("(prefers-reduced-motion: reduce)")}),document.addEventListener("visibilitychange",()=>{document.hidden&&Q.finish()})}vd((l,x,{versionBoundary:S,onCommitted:w})=>Q.replaceScene({getLayers:Vm,versionBoundary:S,onLayersReconciled:()=>{Ye=Ve.map(F=>F.logoSprite),Mt=Ve.flatMap(F=>[F.backplateSprite,F.logoSprite])},rebuildScene:()=>{let F=[...Ne].map($=>{let le=Fe.get($);return le?[$,Object.fromEntries(["model_uuid","name","creator","base_model_name","reasoning_level_label","reasoning_level_sort_order"].map(ue=>[ue,le[ue]]))]:null}).filter(Boolean);a=Sd(l),o=a.metric_variants,E=a.artificial_analysis_data_provenance||{};let V=kc(),ne=document.getElementById("aa-report-header-artificial-analysis-api-fetch-date");ne.textContent=V.headerText,ne.title=V.detailText,document.getElementById("aa-report-header-intelligence-index-version").textContent=`\u667A\u80FD\u6307\u6570 ${zc()}`,window.FRONTIER_3D_VISUALIZATION_DATASET=a,Fe.clear(),F.forEach(([$,le])=>Fe.set($,{...le,panel:{},historical_frame_absence_reason:x(le.model_uuid)})),(a.models||[]).forEach($=>Fe.set(xe($),$)),Object.values(o).forEach($=>{($.three_dimensional_scene?.displayed_model_markers||[]).forEach(le=>Fe.set(xe(le),le))}),w(),Pc(u,!0),m.replaceScientificDataset(a)}}),{waitForSceneTransition:()=>Q.whenSettled(),sceneTransitionState:()=>Q.diagnostics()})})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
