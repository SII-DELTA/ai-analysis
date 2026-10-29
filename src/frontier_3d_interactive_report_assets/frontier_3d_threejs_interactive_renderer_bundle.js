(()=>{var ns={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hd=0,_h=1,Gd=2;var ba=1,Wd=2,br=3,Di=0,Mn=1,qn=2,pi=0,ws=1,xh=2,yh=3,vh=4,Xd=5;var Zi=100,qd=101,Yd=102,$d=103,Zd=104,Jd=200,jd=201,Kd=202,Qd=203,vo=204,bo=205,ef=206,tf=207,nf=208,sf=209,rf=210,af=211,of=212,lf=213,cf=214,Mo=0,So=1,Eo=2,As=3,wo=4,Ao=5,To=6,Co=7,bh=0,hf=1,uf=2,si=0,Mh=1,Sh=2,Eh=3,wh=4,Ah=5,Th=6,Ch=7;var Rh=300,ss=301,Ds=302,il=303,sl=304,Ma=306,Ro=1e3,di=1001,Po=1002,jt=1003,df=1004;var Sa=1005;var tn=1006,rl=1007;var rs=1008;var zn=1009,Ph=1010,Ih=1011,Mr=1012,al=1013,ri=1014,ai=1015,mi=1016,ol=1017,ll=1018,Sr=1020,Lh=35902,Dh=35899,Nh=1021,Fh=1022,Yn=1023,fi=1026,as=1027,Uh=1028,cl=1029,os=1030,hl=1031;var ul=1033,Ea=33776,wa=33777,Aa=33778,Ta=33779,dl=35840,fl=35841,pl=35842,ml=35843,gl=36196,_l=37492,xl=37496,yl=37488,vl=37489,Ca=37490,bl=37491,Ml=37808,Sl=37809,El=37810,wl=37811,Al=37812,Tl=37813,Cl=37814,Rl=37815,Pl=37816,Il=37817,Ll=37818,Dl=37819,Nl=37820,Fl=37821,Ul=36492,Ol=36494,Bl=36495,zl=36283,kl=36284,Ra=36285,Vl=36286;var ea=2300,Io=2301,yo=2302,ch=2303,hh=2400,uh=2401,dh=2402;var ff=3200;var Oh=0,pf=1,Ui="",qt="srgb",ta="srgb-linear",na="linear",vt="srgb";var Ss=7680;var fh=519,mf=512,gf=513,_f=514,Hl=515,xf=516,yf=517,Gl=518,vf=519,Lo=35044;var Bh="300 es",ni=2e3,ia=2001;function Cm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Rm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function bf(){let i=sa("canvas");return i.style.display="block",i}var fd={},dr=null;function ra(...i){let e="THREE."+i.shift();dr?dr("log",e,...i):console.log(e,...i)}function Mf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){i=Mf(i);let e="THREE."+i.shift();if(dr)dr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=Mf(i);let e="THREE."+i.shift();if(dr)dr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Es(...i){let e=i.join(" ");e in fd||(fd[e]=!0,Ze(...i))}function Sf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Ef={[Mo]:So,[Eo]:To,[wo]:Co,[As]:Ao,[So]:Mo,[To]:Eo,[Co]:wo,[Ao]:As},ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pd=1234567,Kr=Math.PI/180,fr=180/Math.PI;function Ii(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function zh(i,e){return(i%e+e)%e}function Pm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Im(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function Lm(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function Dm(i,e=1){return e-Math.abs(zh(i,e*2)-e)}function Nm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Um(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Om(i,e){return i+Math.random()*(e-i)}function Bm(i){return i*(.5-Math.random())}function zm(i){i!==void 0&&(pd=i);let e=pd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function km(i){return i*Kr}function Vm(i){return i*fr}function Hm(i){return(i&i-1)===0&&i!==0}function Gm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),h=r((e+n)/2),d=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),m=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*d,c*f,c*u,o*h);break;case"YZY":i.set(c*u,o*d,c*f,o*h);break;case"ZXZ":i.set(c*f,c*u,o*d,o*h);break;case"XZX":i.set(o*d,c*v,c*m,o*h);break;case"YXY":i.set(c*m,o*d,c*v,o*h);break;case"ZYZ":i.set(c*v,c*m,o*d,o*h);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Tt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var gi={DEG2RAD:Kr,RAD2DEG:fr,generateUUID:Ii,clamp:st,euclideanModulo:zh,mapLinear:Pm,inverseLerp:Im,lerp:Qr,damp:Lm,pingpong:Dm,smoothstep:Nm,smootherstep:Fm,randInt:Um,randFloat:Om,randFloatSpread:Bm,seededRandom:zm,degToRad:km,radToDeg:Vm,isPowerOfTwo:Hm,ceilPowerOfTwo:Gm,floorPowerOfTwo:Wm,setQuaternionFromProperEuler:Xm,normalize:Tt,denormalize:ti},Wh=class Wh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Wh.prototype.isVector2=!0;var Xe=Wh,Fn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],h=n[s+1],d=n[s+2],f=n[s+3],u=r[a+0],m=r[a+1],v=r[a+2],A=r[a+3];if(f!==A||c!==u||h!==m||d!==v){let g=c*u+h*m+d*v+f*A;g<0&&(u=-u,m=-m,v=-v,A=-A,g=-g);let p=1-o;if(g<.9995){let P=Math.acos(g),L=Math.sin(P);p=Math.sin(p*P)/L,o=Math.sin(o*P)/L,c=c*p+u*o,h=h*p+m*o,d=d*p+v*o,f=f*p+A*o}else{c=c*p+u*o,h=h*p+m*o,d=d*p+v*o,f=f*p+A*o;let P=1/Math.sqrt(c*c+h*h+d*d+f*f);c*=P,h*=P,d*=P,f*=P}}e[t]=c,e[t+1]=h,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],h=n[s+2],d=n[s+3],f=r[a],u=r[a+1],m=r[a+2],v=r[a+3];return e[t]=o*v+d*f+c*m-h*u,e[t+1]=c*v+d*u+h*f-o*m,e[t+2]=h*v+d*m+o*u-c*f,e[t+3]=d*v-o*f-c*u-h*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,h=o(n/2),d=o(s/2),f=o(r/2),u=c(n/2),m=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=u*d*f+h*m*v,this._y=h*m*f-u*d*v,this._z=h*d*v+u*m*f,this._w=h*d*f-u*m*v;break;case"YXZ":this._x=u*d*f+h*m*v,this._y=h*m*f-u*d*v,this._z=h*d*v-u*m*f,this._w=h*d*f+u*m*v;break;case"ZXY":this._x=u*d*f-h*m*v,this._y=h*m*f+u*d*v,this._z=h*d*v+u*m*f,this._w=h*d*f-u*m*v;break;case"ZYX":this._x=u*d*f-h*m*v,this._y=h*m*f+u*d*v,this._z=h*d*v-u*m*f,this._w=h*d*f+u*m*v;break;case"YZX":this._x=u*d*f+h*m*v,this._y=h*m*f+u*d*v,this._z=h*d*v-u*m*f,this._w=h*d*f-u*m*v;break;case"XZY":this._x=u*d*f-h*m*v,this._y=h*m*f-u*d*v,this._z=h*d*v+u*m*f,this._w=h*d*f+u*m*v;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],h=t[2],d=t[6],f=t[10],u=n+o+f;if(u>0){let m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-h)*m,this._z=(a-s)*m}else if(n>o&&n>f){let m=2*Math.sqrt(1+n-o-f);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+h)/m}else if(o>f){let m=2*Math.sqrt(1+o-n-f);this._w=(r-h)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{let m=2*Math.sqrt(1+f-n-o);this._w=(a-s)/m,this._x=(r+h)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,h=t._z,d=t._w;return this._x=n*d+a*o+s*h-r*c,this._y=s*d+a*c+r*o-n*h,this._z=r*d+a*h+n*c-s*o,this._w=a*d-n*o-s*c-r*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let h=Math.acos(o),d=Math.sin(h);c=Math.sin(c*h)/d,t=Math.sin(t*h)/d,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Xh=class Xh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(md.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,h=2*(a*s-o*n),d=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*h+a*f-o*d,this.y=n+c*d+o*h-r*f,this.z=s+c*f+r*d-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zc.copy(this).projectOnVector(e),this.sub(zc)}reflect(e){return this.sub(zc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Xh.prototype.isVector3=!0;var O=Xh,zc=new O,md=new Fn,qh=class qh{constructor(e,t,n,s,r,a,o,c,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,h)}set(e,t,n,s,r,a,o,c,h){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],h=n[1],d=n[4],f=n[7],u=n[2],m=n[5],v=n[8],A=s[0],g=s[3],p=s[6],P=s[1],L=s[4],E=s[7],w=s[2],T=s[5],I=s[8];return r[0]=a*A+o*P+c*w,r[3]=a*g+o*L+c*T,r[6]=a*p+o*E+c*I,r[1]=h*A+d*P+f*w,r[4]=h*g+d*L+f*T,r[7]=h*p+d*E+f*I,r[2]=u*A+m*P+v*w,r[5]=u*g+m*L+v*T,r[8]=u*p+m*E+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],h=e[7],d=e[8];return t*a*d-t*o*h-n*r*d+n*o*c+s*r*h-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],h=e[7],d=e[8],f=d*a-o*h,u=o*c-d*r,m=h*r-a*c,v=t*f+n*u+s*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/v;return e[0]=f*A,e[1]=(s*h-d*n)*A,e[2]=(o*n-s*a)*A,e[3]=u*A,e[4]=(d*t-s*c)*A,e[5]=(s*r-o*t)*A,e[6]=m*A,e[7]=(n*c-h*t)*A,e[8]=(a*t-n*r)*A,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),h=Math.sin(r);return this.set(n*c,n*h,-n*(c*a+h*o)+a+e,-s*h,s*c,-s*(-h*a+c*o)+o+t,0,0,1),this}scale(e,t){return Es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(kc.makeScale(e,t)),this}rotate(e){return Es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(kc.makeRotation(-e)),this}translate(e,t){return Es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(kc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};qh.prototype.isMatrix3=!0;var it=qh,kc=new it,gd=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_d=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qm(){let i={enabled:!0,workingColorSpace:ta,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=ur(s.r),s.g=ur(s.g),s.b=ur(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ui?na:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ta]:{primaries:e,whitePoint:n,transfer:na,toXYZ:gd,fromXYZ:_d,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:gd,fromXYZ:_d,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),i}var dt=qm();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ur(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ys,Do=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ys===void 0&&(Ys=sa("canvas")),Ys.width=e.width,Ys.height=e.height;let s=Ys.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ys}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ym=0,pr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vc(s[a].image)):r.push(Vc(s[a]))}else r=Vc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Vc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Do.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var $m=0,Hc=new O,yn=class i extends ii{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=di,s=di,r=tn,a=rs,o=Yn,c=zn,h=i.DEFAULT_ANISOTROPY,d=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=Ii(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Hc).x}get height(){return this.source.getSize(Hc).y}get depth(){return this.source.getSize(Hc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ro:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case Po:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ro:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case Po:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Rh;yn.DEFAULT_ANISOTROPY=1;var Yh=class Yh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,h=c[0],d=c[4],f=c[8],u=c[1],m=c[5],v=c[9],A=c[2],g=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(f-A)<.01&&Math.abs(v-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+A)<.1&&Math.abs(v+g)<.1&&Math.abs(h+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let L=(h+1)/2,E=(m+1)/2,w=(p+1)/2,T=(d+u)/4,I=(f+A)/4,y=(v+g)/4;return L>E&&L>w?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=T/n,r=I/n):E>w?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=T/s,r=y/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=I/r,s=y/r),this.set(n,s,r,t),this}let P=Math.sqrt((g-v)*(g-v)+(f-A)*(f-A)+(u-d)*(u-d));return Math.abs(P)<.001&&(P=1),this.x=(g-v)/P,this.y=(f-A)/P,this.z=(u-d)/P,this.w=Math.acos((h+m+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Yh.prototype.isVector4=!0;var Ct=Yh,No=class extends ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new yn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Un=class extends No{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},aa=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fo=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nl=class nl{constructor(e,t,n,s,r,a,o,c,h,d,f,u,m,v,A,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,h,d,f,u,m,v,A,g)}set(e,t,n,s,r,a,o,c,h,d,f,u,m,v,A,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=h,p[6]=d,p[10]=f,p[14]=u,p[3]=m,p[7]=v,p[11]=A,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/$s.setFromMatrixColumn(e,0).length(),r=1/$s.setFromMatrixColumn(e,1).length(),a=1/$s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),h=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*d,m=a*f,v=o*d,A=o*f;t[0]=c*d,t[4]=-c*f,t[8]=h,t[1]=m+v*h,t[5]=u-A*h,t[9]=-o*c,t[2]=A-u*h,t[6]=v+m*h,t[10]=a*c}else if(e.order==="YXZ"){let u=c*d,m=c*f,v=h*d,A=h*f;t[0]=u+A*o,t[4]=v*o-m,t[8]=a*h,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=m*o-v,t[6]=A+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*d,m=c*f,v=h*d,A=h*f;t[0]=u-A*o,t[4]=-a*f,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*d,t[9]=A-u*o,t[2]=-a*h,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*d,m=a*f,v=o*d,A=o*f;t[0]=c*d,t[4]=v*h-m,t[8]=u*h+A,t[1]=c*f,t[5]=A*h+u,t[9]=m*h-v,t[2]=-h,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,m=a*h,v=o*c,A=o*h;t[0]=c*d,t[4]=A-u*f,t[8]=v*f+m,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-h*d,t[6]=m*f+v,t[10]=u-A*f}else if(e.order==="XZY"){let u=a*c,m=a*h,v=o*c,A=o*h;t[0]=c*d,t[4]=-f,t[8]=h*d,t[1]=u*f+A,t[5]=a*d,t[9]=m*f-v,t[2]=v*f-m,t[6]=o*d,t[10]=A*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zm,e,Jm)}lookAt(e,t,n){let s=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Gi.crossVectors(n,Dn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Gi.crossVectors(n,Dn)),Gi.normalize(),qa.crossVectors(Dn,Gi),s[0]=Gi.x,s[4]=qa.x,s[8]=Dn.x,s[1]=Gi.y,s[5]=qa.y,s[9]=Dn.y,s[2]=Gi.z,s[6]=qa.z,s[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],h=n[12],d=n[1],f=n[5],u=n[9],m=n[13],v=n[2],A=n[6],g=n[10],p=n[14],P=n[3],L=n[7],E=n[11],w=n[15],T=s[0],I=s[4],y=s[8],R=s[12],k=s[1],D=s[5],N=s[9],Q=s[13],te=s[2],X=s[6],ee=s[10],J=s[14],re=s[3],ce=s[7],pe=s[11],de=s[15];return r[0]=a*T+o*k+c*te+h*re,r[4]=a*I+o*D+c*X+h*ce,r[8]=a*y+o*N+c*ee+h*pe,r[12]=a*R+o*Q+c*J+h*de,r[1]=d*T+f*k+u*te+m*re,r[5]=d*I+f*D+u*X+m*ce,r[9]=d*y+f*N+u*ee+m*pe,r[13]=d*R+f*Q+u*J+m*de,r[2]=v*T+A*k+g*te+p*re,r[6]=v*I+A*D+g*X+p*ce,r[10]=v*y+A*N+g*ee+p*pe,r[14]=v*R+A*Q+g*J+p*de,r[3]=P*T+L*k+E*te+w*re,r[7]=P*I+L*D+E*X+w*ce,r[11]=P*y+L*N+E*ee+w*pe,r[15]=P*R+L*Q+E*J+w*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],h=e[13],d=e[2],f=e[6],u=e[10],m=e[14],v=e[3],A=e[7],g=e[11],p=e[15],P=c*m-h*u,L=o*m-h*f,E=o*u-c*f,w=a*m-h*d,T=a*u-c*d,I=a*f-o*d;return t*(A*P-g*L+p*E)-n*(v*P-g*w+p*T)+s*(v*L-A*w+p*I)-r*(v*E-A*T+g*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],h=e[6],d=e[10];return t*(a*d-o*h)-n*(r*d-o*c)+s*(r*h-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],h=e[7],d=e[8],f=e[9],u=e[10],m=e[11],v=e[12],A=e[13],g=e[14],p=e[15],P=t*o-n*a,L=t*c-s*a,E=t*h-r*a,w=n*c-s*o,T=n*h-r*o,I=s*h-r*c,y=d*A-f*v,R=d*g-u*v,k=d*p-m*v,D=f*g-u*A,N=f*p-m*A,Q=u*p-m*g,te=P*Q-L*N+E*D+w*k-T*R+I*y;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/te;return e[0]=(o*Q-c*N+h*D)*X,e[1]=(s*N-n*Q-r*D)*X,e[2]=(A*I-g*T+p*w)*X,e[3]=(u*T-f*I-m*w)*X,e[4]=(c*k-a*Q-h*R)*X,e[5]=(t*Q-s*k+r*R)*X,e[6]=(g*E-v*I-p*L)*X,e[7]=(d*I-u*E+m*L)*X,e[8]=(a*N-o*k+h*y)*X,e[9]=(n*k-t*N-r*y)*X,e[10]=(v*T-A*E+p*P)*X,e[11]=(f*E-d*T-m*P)*X,e[12]=(o*R-a*D-c*y)*X,e[13]=(t*D-n*R+s*y)*X,e[14]=(A*L-v*w-g*P)*X,e[15]=(d*w-f*L+u*P)*X,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,h=r*a,d=r*o;return this.set(h*a+n,h*o-s*c,h*c+s*o,0,h*o+s*c,d*o+n,d*c-s*a,0,h*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,h=r+r,d=a+a,f=o+o,u=r*h,m=r*d,v=r*f,A=a*d,g=a*f,p=o*f,P=c*h,L=c*d,E=c*f,w=n.x,T=n.y,I=n.z;return s[0]=(1-(A+p))*w,s[1]=(m+E)*w,s[2]=(v-L)*w,s[3]=0,s[4]=(m-E)*T,s[5]=(1-(u+p))*T,s[6]=(g+P)*T,s[7]=0,s[8]=(v+L)*I,s[9]=(g-P)*I,s[10]=(1-(u+A))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=$s.set(s[0],s[1],s[2]).length(),o=$s.set(s[4],s[5],s[6]).length(),c=$s.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Kn.copy(this);let h=1/a,d=1/o,f=1/c;return Kn.elements[0]*=h,Kn.elements[1]*=h,Kn.elements[2]*=h,Kn.elements[4]*=d,Kn.elements[5]*=d,Kn.elements[6]*=d,Kn.elements[8]*=f,Kn.elements[9]*=f,Kn.elements[10]*=f,t.setFromRotationMatrix(Kn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=ni,c=!1){let h=this.elements,d=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),m=(n+s)/(n-s),v,A;if(c)v=r/(a-r),A=a*r/(a-r);else if(o===ni)v=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===ia)v=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=d,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=f,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=A,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ni,c=!1){let h=this.elements,d=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),m=-(n+s)/(n-s),v,A;if(c)v=1/(a-r),A=a/(a-r);else if(o===ni)v=-2/(a-r),A=-(a+r)/(a-r);else if(o===ia)v=-1/(a-r),A=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=d,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=f,h[9]=0,h[13]=m,h[2]=0,h[6]=0,h[10]=v,h[14]=A,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nl.prototype.isMatrix4=!0;var Ft=nl,$s=new O,Kn=new Ft,Zm=new O(0,0,0),Jm=new O(1,1,1),Gi=new O,qa=new O,Dn=new O,xd=new Ft,yd=new Fn,Ji=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],h=s[5],d=s[9],f=s[2],u=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,h),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yd.setFromEuler(this),this.setFromQuaternion(yd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ji.DEFAULT_ORDER="XYZ";var mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},jm=0,vd=new O,Zs=new Fn,wi=new Ft,Ya=new O,Wr=new O,Km=new O,Qm=new Fn,bd=new O(1,0,0),Md=new O(0,1,0),Sd=new O(0,0,1),Ed={type:"added"},eg={type:"removed"},Js={type:"childadded",child:null},Gc={type:"childremoved",child:null},Tn=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new Ji,n=new Fn,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new it}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(bd,e)}rotateY(e){return this.rotateOnAxis(Md,e)}rotateZ(e){return this.rotateOnAxis(Sd,e)}translateOnAxis(e,t){return vd.copy(e).applyQuaternion(this.quaternion),this.position.add(vd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bd,e)}translateY(e){return this.translateOnAxis(Md,e)}translateZ(e){return this.translateOnAxis(Sd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ya.copy(e):Ya.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Wr,Ya,this.up):wi.lookAt(Ya,Wr,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(wi),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ed),Js.child=e,this.dispatchEvent(Js),Js.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eg),Gc.child=e,this.dispatchEvent(Gc),Gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ed),Js.child=e,this.dispatchEvent(Js),Js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,Km),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,Qm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let h=0,d=c.length;h<d;h++){let f=c[h];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,h=this.material.length;c<h;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),h=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let c=[];for(let h in o){let d=o[h];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Tn.DEFAULT_UP=new O(0,1,0);Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=class extends Tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},tg={type:"move"},gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(let A of e.hand.values()){let g=t.getJointPose(A,n),p=this._getHandJoint(h,A);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let d=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],u=d.position.distanceTo(f.position),m=.02,v=.005;h.inputState.pinching&&u>m+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&u<=m-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},$a={h:0,s:0,l:0};function Wc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ut=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=zh(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Wc(a,r,e+1/3),this.g=Wc(a,r,e),this.b=Wc(a,r,e-1/3)}return dt.colorSpaceToWorking(this,s),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let n=wf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=ur(e.r),this.g=ur(e.g),this.b=ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return dt.workingToColorSpace(un.copy(this),e),Math.round(st(un.r*255,0,255))*65536+Math.round(st(un.g*255,0,255))*256+Math.round(st(un.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(un.copy(this),t);let n=un.r,s=un.g,r=un.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,h,d=(o+a)/2;if(o===a)c=0,h=0;else{let f=a-o;switch(h=d<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=h,e.l=d,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=qt){dt.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,s=un.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL($a);let n=Qr(Wi.h,$a.h,t),s=Qr(Wi.s,$a.s,t),r=Qr(Wi.l,$a.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new ut;ut.NAMES=wf;var _r=class extends Tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ji,this.environmentIntensity=1,this.environmentRotation=new Ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qn=new O,Ai=new O,Xc=new O,Ti=new O,js=new O,Ks=new O,wd=new O,qc=new O,Yc=new O,$c=new O,Zc=new Ct,Jc=new Ct,jc=new Ct,Pi=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Qn.subVectors(e,t),s.cross(Qn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Qn.subVectors(s,t),Ai.subVectors(n,t),Xc.subVectors(e,t);let a=Qn.dot(Qn),o=Qn.dot(Ai),c=Qn.dot(Xc),h=Ai.dot(Ai),d=Ai.dot(Xc),f=a*h-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,m=(h*c-o*d)*u,v=(a*d-o*c)*u;return r.set(1-m-v,v,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ti.x),c.addScaledVector(a,Ti.y),c.addScaledVector(o,Ti.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Zc.setScalar(0),Jc.setScalar(0),jc.setScalar(0),Zc.fromBufferAttribute(e,t),Jc.fromBufferAttribute(e,n),jc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Zc,r.x),a.addScaledVector(Jc,r.y),a.addScaledVector(jc,r.z),a}static isFrontFacing(e,t,n,s){return Qn.subVectors(n,t),Ai.subVectors(e,t),Qn.cross(Ai).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),Qn.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;js.subVectors(s,n),Ks.subVectors(r,n),qc.subVectors(e,n);let c=js.dot(qc),h=Ks.dot(qc);if(c<=0&&h<=0)return t.copy(n);Yc.subVectors(e,s);let d=js.dot(Yc),f=Ks.dot(Yc);if(d>=0&&f<=d)return t.copy(s);let u=c*f-d*h;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(js,a);$c.subVectors(e,r);let m=js.dot($c),v=Ks.dot($c);if(v>=0&&m<=v)return t.copy(r);let A=m*h-c*v;if(A<=0&&h>=0&&v<=0)return o=h/(h-v),t.copy(n).addScaledVector(Ks,o);let g=d*v-m*f;if(g<=0&&f-d>=0&&m-v>=0)return wd.subVectors(r,s),o=(f-d)/(f-d+(m-v)),t.copy(s).addScaledVector(wd,o);let p=1/(g+A+u);return a=A*p,o=u*p,t.copy(n).addScaledVector(js,a).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},vn=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xr),Ja.subVectors(this.max,Xr),Qs.subVectors(e.a,Xr),er.subVectors(e.b,Xr),tr.subVectors(e.c,Xr),Xi.subVectors(er,Qs),qi.subVectors(tr,er),ys.subVectors(Qs,tr);let t=[0,-Xi.z,Xi.y,0,-qi.z,qi.y,0,-ys.z,ys.y,Xi.z,0,-Xi.x,qi.z,0,-qi.x,ys.z,0,-ys.x,-Xi.y,Xi.x,0,-qi.y,qi.x,0,-ys.y,ys.x,0];return!Kc(t,Qs,er,tr,Ja)||(t=[1,0,0,0,1,0,0,0,1],!Kc(t,Qs,er,tr,Ja))?!1:(ja.crossVectors(Xi,qi),t=[ja.x,ja.y,ja.z],Kc(t,Qs,er,tr,Ja))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ci=[new O,new O,new O,new O,new O,new O,new O,new O],ei=new O,Za=new vn,Qs=new O,er=new O,tr=new O,Xi=new O,qi=new O,ys=new O,Xr=new O,Ja=new O,ja=new O,vs=new O;function Kc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){vs.fromArray(i,r);let o=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),c=e.dot(vs),h=t.dot(vs),d=n.dot(vs);if(Math.max(-Math.max(c,h,d),Math.min(c,h,d))>o)return!1}return!0}var Gt=new O,Ka=new Xe,ng=0,An=class extends ii{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Lo,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ka.fromBufferAttribute(this,t),Ka.applyMatrix3(e),this.setXY(t,Ka.x,Ka.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array),r=Tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var oa=class extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var la=class extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var kt=class extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}},ig=new vn,qr=new O,Qc=new O,Cn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ig.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);let t=qr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(Qc)),this.expandByPoint(qr.copy(e.center).sub(Qc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},sg=0,Gn=new Ft,eh=new Tn,nr=new O,Nn=new vn,Yr=new vn,Jt=new O,nn=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cm(e)?la:oa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new it().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return eh.lookAt(e),eh.updateMatrix(),this.applyMatrix4(eh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Yr.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(Nn.min,Yr.min),Nn.expandByPoint(Jt),Jt.addVectors(Nn.max,Yr.max),Nn.expandByPoint(Jt)):(Nn.expandByPoint(Yr.min),Nn.expandByPoint(Yr.max))}Nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let h=0,d=o.count;h<d;h++)Jt.fromBufferAttribute(o,h),c&&(nr.fromBufferAttribute(e,h),Jt.add(nr)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new An(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new O,c[y]=new O;let h=new O,d=new O,f=new O,u=new Xe,m=new Xe,v=new Xe,A=new O,g=new O;function p(y,R,k){h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,R),f.fromBufferAttribute(n,k),u.fromBufferAttribute(r,y),m.fromBufferAttribute(r,R),v.fromBufferAttribute(r,k),d.sub(h),f.sub(h),m.sub(u),v.sub(u);let D=1/(m.x*v.y-v.x*m.y);isFinite(D)&&(A.copy(d).multiplyScalar(v.y).addScaledVector(f,-m.y).multiplyScalar(D),g.copy(f).multiplyScalar(m.x).addScaledVector(d,-v.x).multiplyScalar(D),o[y].add(A),o[R].add(A),o[k].add(A),c[y].add(g),c[R].add(g),c[k].add(g))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let y=0,R=P.length;y<R;++y){let k=P[y],D=k.start,N=k.count;for(let Q=D,te=D+N;Q<te;Q+=3)p(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}let L=new O,E=new O,w=new O,T=new O;function I(y){w.fromBufferAttribute(s,y),T.copy(w);let R=o[y];L.copy(R),L.sub(w.multiplyScalar(w.dot(R))).normalize(),E.crossVectors(T,R);let D=E.dot(c[y])<0?-1:1;a.setXYZW(y,L.x,L.y,L.z,D)}for(let y=0,R=P.length;y<R;++y){let k=P[y],D=k.start,N=k.count;for(let Q=D,te=D+N;Q<te;Q+=3)I(e.getX(Q+0)),I(e.getX(Q+1)),I(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);let s=new O,r=new O,a=new O,o=new O,c=new O,h=new O,d=new O,f=new O;if(e)for(let u=0,m=e.count;u<m;u+=3){let v=e.getX(u+0),A=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,A),a.fromBufferAttribute(t,g),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,g),o.add(d),c.add(d),h.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(A,c.x,c.y,c.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let u=0,m=t.count;u<m;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,c){let h=o.array,d=o.itemSize,f=o.normalized,u=new h.constructor(c.length*d),m=0,v=0;for(let A=0,g=c.length;A<g;A++){o.isInterleavedBufferAttribute?m=c[A]*o.data.stride+o.offset:m=c[A]*d;for(let p=0;p<d;p++)u[v++]=h[m++]}return new An(u,d,f)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],h=e(c,n);t.setAttribute(o,h)}let r=this.morphAttributes;for(let o in r){let c=[],h=r[o];for(let d=0,f=h.length;d<f;d++){let u=h[d],m=e(u,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let h=a[o];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let h=n[c];e.data.attributes[c]=h.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],d=[];for(let f=0,u=h.length;f<u;f++){let m=h[f];d.push(m.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let h in s){let d=s[h];this.setAttribute(h,d.clone(t))}let r=e.morphAttributes;for(let h in r){let d=[],f=r[h];for(let u=0,m=f.length;u<m;u++)d.push(f[u].clone(t));this.morphAttributes[h]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let h=0,d=a.length;h<d;h++){let f=a[h];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ca=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Lo,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},xn=new O,On=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array),r=Tt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ra("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new An(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ra("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},rg=0,Ni=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=ws,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vo,this.blendDst=bo,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(n.blending=this.blending),this.side!==Di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==vo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==Zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ut().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ts=class extends Ni{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ir,$r=new O,sr=new O,rr=new O,ar=new Xe,Zr=new Xe,Af=new Ft,Qa=new O,Jr=new O,eo=new O,Ad=new Xe,th=new Xe,Td=new Xe,Cs=class extends Tn{constructor(e=new Ts){if(super(),this.isSprite=!0,this.type="Sprite",ir===void 0){ir=new nn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ca(t,5);ir.setIndex([0,1,2,0,2,3]),ir.setAttribute("position",new On(n,3,0,!1)),ir.setAttribute("uv",new On(n,2,3,!1))}this.geometry=ir,this.material=e,this.center=new Xe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sr.setFromMatrixScale(this.matrixWorld),Af.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sr.multiplyScalar(-rr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;to(Qa.set(-.5,-.5,0),rr,a,sr,s,r),to(Jr.set(.5,-.5,0),rr,a,sr,s,r),to(eo.set(.5,.5,0),rr,a,sr,s,r),Ad.set(0,0),th.set(1,0),Td.set(1,1);let o=e.ray.intersectTriangle(Qa,Jr,eo,!1,$r);if(o===null&&(to(Jr.set(-.5,.5,0),rr,a,sr,s,r),th.set(0,1),o=e.ray.intersectTriangle(Qa,eo,Jr,!1,$r),o===null))return;let c=e.ray.origin.distanceTo($r);c<e.near||c>e.far||t.push({distance:c,point:$r.clone(),uv:Pi.getInterpolation($r,Qa,Jr,eo,Ad,th,Td,new Xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function to(i,e,t,n,s,r){ar.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Zr.x=r*ar.x-s*ar.y,Zr.y=s*ar.x+r*ar.y):Zr.copy(ar),i.copy(e),i.x+=Zr.x,i.y+=Zr.y,i.applyMatrix4(Af)}var Ri=new O,nh=new O,no=new O,Yi=new O,ih=new O,io=new O,sh=new O,ji=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){nh.copy(e).add(t).multiplyScalar(.5),no.copy(t).sub(e).normalize(),Yi.copy(this.origin).sub(nh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(no),o=Yi.dot(this.direction),c=-Yi.dot(no),h=Yi.lengthSq(),d=Math.abs(1-a*a),f,u,m,v;if(d>0)if(f=a*c-o,u=a*o-c,v=r*d,f>=0)if(u>=-v)if(u<=v){let A=1/d;f*=A,u*=A,m=f*(f+a*u+2*o)+u*(a*f+u+2*c)+h}else u=r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+h;else u=-r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+h;else u<=-v?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+h):u<=v?(f=0,u=Math.min(Math.max(-r,-c),r),m=u*(u+2*c)+h):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+h);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(nh).addScaledVector(no,u),m}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);let n=Ri.dot(this.direction),s=Ri.dot(Ri)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,h=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return h>=0?(n=(e.min.x-u.x)*h,s=(e.max.x-u.x)*h):(n=(e.max.x-u.x)*h,s=(e.min.x-u.x)*h),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,n,s,r){ih.subVectors(t,e),io.subVectors(n,e),sh.crossVectors(ih,io);let a=this.direction.dot(sh),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yi.subVectors(this.origin,e);let c=o*this.direction.dot(io.crossVectors(Yi,io));if(c<0)return null;let h=o*this.direction.dot(ih.cross(Yi));if(h<0||c+h>a)return null;let d=-o*Yi.dot(sh);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rs=class extends Ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.combine=bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Cd=new Ft,bs=new ji,so=new Cn,Rd=new O,ro=new O,ao=new O,oo=new O,rh=new O,lo=new O,Pd=new O,co=new O,sn=class extends Tn{constructor(e=new nn,t=new Rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){lo.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let d=o[c],f=r[c];d!==0&&(rh.fromBufferAttribute(f,e),a?lo.addScaledVector(rh,d):lo.addScaledVector(rh.sub(t),d))}t.add(lo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(so.containsPoint(bs.origin)===!1&&(bs.intersectSphere(so,Rd)===null||bs.origin.distanceToSquared(Rd)>(e.far-e.near)**2))&&(Cd.copy(r).invert(),bs.copy(e.ray).applyMatrix4(Cd),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,h=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,A=u.length;v<A;v++){let g=u[v],p=a[g.materialIndex],P=Math.max(g.start,m.start),L=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=P,w=L;E<w;E+=3){let T=o.getX(E),I=o.getX(E+1),y=o.getX(E+2);s=ho(this,p,e,n,h,d,f,T,I,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,m.start),A=Math.min(o.count,m.start+m.count);for(let g=v,p=A;g<p;g+=3){let P=o.getX(g),L=o.getX(g+1),E=o.getX(g+2);s=ho(this,a,e,n,h,d,f,P,L,E),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,A=u.length;v<A;v++){let g=u[v],p=a[g.materialIndex],P=Math.max(g.start,m.start),L=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=P,w=L;E<w;E+=3){let T=E,I=E+1,y=E+2;s=ho(this,p,e,n,h,d,f,T,I,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,m.start),A=Math.min(c.count,m.start+m.count);for(let g=v,p=A;g<p;g+=3){let P=g,L=g+1,E=g+2;s=ho(this,a,e,n,h,d,f,P,L,E),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function ag(i,e,t,n,s,r,a,o){let c;if(e.side===Mn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Di,o),c===null)return null;co.copy(o),co.applyMatrix4(i.matrixWorld);let h=t.ray.origin.distanceTo(co);return h<t.near||h>t.far?null:{distance:h,point:co.clone(),object:i}}function ho(i,e,t,n,s,r,a,o,c,h){i.getVertexPosition(o,ro),i.getVertexPosition(c,ao),i.getVertexPosition(h,oo);let d=ag(i,e,t,n,ro,ao,oo,Pd);if(d){let f=new O;Pi.getBarycoord(Pd,ro,ao,oo,f),s&&(d.uv=Pi.getInterpolatedAttribute(s,o,c,h,f,new Xe)),r&&(d.uv1=Pi.getInterpolatedAttribute(r,o,c,h,f,new Xe)),a&&(d.normal=Pi.getInterpolatedAttribute(a,o,c,h,f,new O),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:c,c:h,normal:new O,materialIndex:0};Pi.getNormal(ro,ao,oo,u.normal),d.face=u,d.barycoord=f}return d}var Uo=class extends yn{constructor(e=null,t=1,n=1,s,r,a,o,c,h=jt,d=jt,f,u){super(null,a,o,c,h,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ah=new O,og=new O,lg=new it,Wn=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=ah.subVectors(n,t).cross(og.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(ah),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||lg.getNormalMatrix(e),s=this.coplanarPoint(ah).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ms=new Cn,cg=new Xe(.5,.5),uo=new O,ha=class{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],h=r[3],d=r[4],f=r[5],u=r[6],m=r[7],v=r[8],A=r[9],g=r[10],p=r[11],P=r[12],L=r[13],E=r[14],w=r[15];if(s[0].setComponents(h-a,m-d,p-v,w-P).normalize(),s[1].setComponents(h+a,m+d,p+v,w+P).normalize(),s[2].setComponents(h+o,m+f,p+A,w+L).normalize(),s[3].setComponents(h-o,m-f,p-A,w-L).normalize(),n)s[4].setComponents(c,u,g,E).normalize(),s[5].setComponents(h-c,m-u,p-g,w-E).normalize();else if(s[4].setComponents(h-c,m-u,p-g,w-E).normalize(),t===ni)s[5].setComponents(h+c,m+u,p+g,w+E).normalize();else if(t===ia)s[5].setComponents(c,u,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(e){Ms.center.set(0,0,0);let t=cg.distanceTo(e.center);return Ms.radius=.7071067811865476+t,Ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(uo.x=s.normal.x>0?e.max.x:e.min.x,uo.y=s.normal.y>0?e.max.y:e.min.y,uo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(uo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xr=class extends Ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oo=new O,Bo=new O,Id=new Ft,jr=new ji,fo=new Cn,oh=new O,Ld=new O,zo=class extends Tn{constructor(e=new nn,t=new xr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Oo.fromBufferAttribute(t,s-1),Bo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Oo.distanceTo(Bo);e.setAttribute("lineDistance",new kt(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(s),fo.radius+=r,e.ray.intersectsSphere(fo)===!1)return;Id.copy(s).invert(),jr.copy(e.ray).applyMatrix4(Id);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,h=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let m=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let A=m,g=v-1;A<g;A+=h){let p=d.getX(A),P=d.getX(A+1),L=po(this,e,jr,c,p,P,A);L&&t.push(L)}if(this.isLineLoop){let A=d.getX(v-1),g=d.getX(m),p=po(this,e,jr,c,A,g,v-1);p&&t.push(p)}}else{let m=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let A=m,g=v-1;A<g;A+=h){let p=po(this,e,jr,c,A,A+1,A);p&&t.push(p)}if(this.isLineLoop){let A=po(this,e,jr,c,v-1,m,v-1);A&&t.push(A)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function po(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Oo.fromBufferAttribute(o,s),Bo.fromBufferAttribute(o,r),t.distanceSqToSegment(Oo,Bo,oh,Ld)>n)return;oh.applyMatrix4(i.matrixWorld);let h=e.ray.origin.distanceTo(oh);if(!(h<e.near||h>e.far))return{distance:h,point:Ld.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Dd=new O,Nd=new O,ua=class extends zo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Dd.fromBufferAttribute(t,s),Nd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Dd.distanceTo(Nd);e.setAttribute("lineDistance",new kt(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var da=class extends yn{constructor(e=[],t=ss,n,s,r,a,o,c,h,d){super(e,t,n,s,r,a,o,c,h,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ps=class extends yn{constructor(e,t,n,s,r,a,o,c,h){super(e,t,n,s,r,a,o,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Fi=class extends yn{constructor(e,t,n=ri,s,r,a,o=jt,c=jt,h,d=fi,f=1){if(d!==fi&&d!==as)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,c,d,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ko=class extends Fi{constructor(e,t=ri,n=ss,s,r,a=jt,o=jt,c,h=fi){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,c,h),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fa=class extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},yr=class i extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],h=[],d=[],f=[],u=0,m=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new kt(h,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(f,2));function v(A,g,p,P,L,E,w,T,I,y,R){let k=E/I,D=w/y,N=E/2,Q=w/2,te=T/2,X=I+1,ee=y+1,J=0,re=0,ce=new O;for(let pe=0;pe<ee;pe++){let de=pe*D-Q;for(let ge=0;ge<X;ge++){let Pe=ge*k-N;ce[A]=Pe*P,ce[g]=de*L,ce[p]=te,h.push(ce.x,ce.y,ce.z),ce[A]=0,ce[g]=0,ce[p]=T>0?1:-1,d.push(ce.x,ce.y,ce.z),f.push(ge/I),f.push(1-pe/y),J+=1}}for(let pe=0;pe<y;pe++)for(let de=0;de<I;de++){let ge=u+de+X*pe,Pe=u+de+X*(pe+1),ye=u+(de+1)+X*(pe+1),qe=u+(de+1)+X*pe;c.push(ge,Pe,qe),c.push(Pe,ye,qe),re+=6}o.addGroup(m,re,R),m+=re,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Is=class i extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),h=o+1,d=c+1,f=e/o,u=t/c,m=[],v=[],A=[],g=[];for(let p=0;p<d;p++){let P=p*u-a;for(let L=0;L<h;L++){let E=L*f-r;v.push(E,-P,0),A.push(0,0,1),g.push(L/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let P=0;P<o;P++){let L=P+h*p,E=P+h*(p+1),w=P+1+h*(p+1),T=P+1+h*p;m.push(L,E,T),m.push(E,w,T)}this.setIndex(m),this.setAttribute("position",new kt(v,3)),this.setAttribute("normal",new kt(A,3)),this.setAttribute("uv",new kt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var pa=class extends nn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new O,r=new O;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let h=0,d=c.length;h<d;++h){let f=c[h],u=f.start,m=f.count;for(let v=u,A=u+m;v<A;v+=3)for(let g=0;g<3;g++){let p=o.getX(v+g),P=o.getX(v+(g+1)%3);s.fromBufferAttribute(a,p),r.fromBufferAttribute(a,P),Fd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let h=0;h<3;h++){let d=3*o+h,f=3*o+(h+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,f),Fd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new kt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Fd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Ud(s))s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Ud(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function dn(i){let e={};for(let t=0;t<i.length;t++){let n=Ns(i[t]);for(let s in n)e[s]=n[s]}return e}function Ud(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function hg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var Pa={clone:Ns,merge:dn},ug=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ug,this.fragmentShader=dg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=hg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ut().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ct().fromArray(s.value);break;case"m3":this.uniforms[n].value=new it().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ft().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Vo=class extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ho=class extends Ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Go=class extends Ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function mo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Ki=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hh,endingEnd:hh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case uh:r=e,o=2*t-n;break;case dh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case uh:a=e,c=2*n-t;break;case dh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let h=(n-t)*.5,d=this.valueSize;this._weightPrev=h/(t-o),this._weightNext=h/(c-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,h=c-o,d=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,m=this._weightNext,v=(n-t)/(s-t),A=v*v,g=A*v,p=-u*g+2*u*A-u*v,P=(1+u)*g+(-1.5-2*u)*A+(-.5+u)*v+1,L=(-1-m)*g+(1.5+m)*A+.5*v,E=m*g-m*A;for(let w=0;w!==o;++w)r[w]=p*a[d+w]+P*a[h+w]+L*a[c+w]+E*a[f+w];return r}},Xo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,h=c-o,d=(n-t)/(s-t),f=1-d;for(let u=0;u!==o;++u)r[u]=a[h+u]*f+a[c+u]*d;return r}},qo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Yo=class extends Ki{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,h=c-o,d=this.inTangents,f=this.outTangents;if(!d||!f){let v=(n-t)/(s-t),A=1-v;for(let g=0;g!==o;++g)r[g]=a[h+g]*A+a[c+g]*v;return r}let u=o*2,m=e-1;for(let v=0;v!==o;++v){let A=a[h+v],g=a[c+v],p=m*u+v*2,P=f[p],L=f[p+1],E=e*u+v*2,w=d[E],T=d[E+1],I=(n-t)/(s-t),y,R,k,D,N;for(let Q=0;Q<8;Q++){y=I*I,R=y*I,k=1-I,D=k*k,N=D*k;let X=N*t+3*D*I*P+3*k*y*w+R*s-n;if(Math.abs(X)<1e-10)break;let ee=3*D*(P-t)+6*k*I*(w-P)+3*y*(s-w);if(Math.abs(ee)<1e-10)break;I=I-X/ee,I=Math.max(0,Math.min(1,I))}r[v]=N*A+3*D*I*L+3*k*y*T+R*g}return r}},Bn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=mo(t,this.TimeBufferType),this.values=mo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:mo(e.times,Array),values:mo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ea:t=this.InterpolantFactoryMethodDiscrete;break;case Io:t=this.InterpolantFactoryMethodLinear;break;case yo:t=this.InterpolantFactoryMethodSmooth;break;case ch:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return Io;case this.InterpolantFactoryMethodSmooth:return yo;case this.InterpolantFactoryMethodBezier:return ch}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ke("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ke("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Rm(s))for(let o=0,c=s.length;o!==c;++o){let h=s[o];if(isNaN(h)){Ke("KeyframeTrack: Value is not a valid number.",this,o,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===yo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,h=e[o],d=e[o+1];if(h!==d&&(o!==1||h!==e[0]))if(s)c=!0;else{let f=o*n,u=f-n,m=f+n;for(let v=0;v!==n;++v){let A=t[f+v];if(A!==t[u+v]||A!==t[m+v]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let m=0;m!==n;++m)t[u+m]=t[f+m]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,h=0;h!==n;++h)t[c+h]=t[o+h];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=Io;var Qi=class extends Bn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=ea;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var $o=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};$o.prototype.ValueTypeName="color";var Zo=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};Zo.prototype.ValueTypeName="number";var Jo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),h=e*o;for(let d=h+o;h!==d;h+=4)Fn.slerpFlat(r,0,a,h-o,a,h,c);return r}},ma=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Jo(this.times,this.values,this.getValueSize(),e)}};ma.prototype.ValueTypeName="quaternion";ma.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends Bn{constructor(e,t,n){super(e,t,n)}};es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=ea;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};jo.prototype.ValueTypeName="vector";var Ko=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,f){return h.push(d,f),this},this.removeHandler=function(d){let f=h.indexOf(d);return f!==-1&&h.splice(f,2),this},this.getHandler=function(d){for(let f=0,u=h.length;f<u;f+=2){let m=h[f],v=h[f+1];if(m.global&&(m.lastIndex=0),m.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Tf=new Ko,Qo=class{constructor(e){this.manager=e!==void 0?e:Tf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var go=new O,_o=new Fn,ui=new O,ga=class extends Tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(go,_o,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,_o,ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(go,_o,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,_o,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$i=new O,Od=new Xe,Bd=new Xe,en=class extends ga{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,Od,Bd),t.subVectors(Bd,Od)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Kr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/h,s*=a.width/c,n*=a.height/h}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ls=class extends ga{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var _a=class extends nn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var or=-90,lr=1,el=class extends Tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new en(or,lr,e,t);s.layers=this.layers,this.add(s);let r=new en(or,lr,e,t);r.layers=this.layers,this.add(r);let a=new en(or,lr,e,t);a.layers=this.layers,this.add(a);let o=new en(or,lr,e,t);o.layers=this.layers,this.add(o);let c=new en(or,lr,e,t);c.layers=this.layers,this.add(c);let h=new en(or,lr,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let h of t)this.remove(h);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,h,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,m),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},tl=class extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Vh="\\[\\]\\.:\\/",fg=new RegExp("["+Vh+"]","g"),Hh="[^"+Vh+"]",pg="[^"+Vh.replace("\\.","")+"]",mg=/((?:WC+[\/:])*)/.source.replace("WC",Hh),gg=/(WCOD+)?/.source.replace("WCOD",pg),_g=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hh),xg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hh),yg=new RegExp("^"+mg+gg+_g+xg+"$"),vg=["material","materials","bones","map"],ph=class{constructor(e,t,n){let s=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fg,"")}static parseTrackName(e){let t=yg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);vg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===h){h=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let a=e[s];if(a===void 0){let h=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=ph;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Dv=new Float32Array(1);var ts=class extends ca{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var zd=new Ft,xa=class{constructor(e,t,n=0,s=1/0){this.ray=new ji(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zd),this}intersectObject(e,t=!0,n=[]){return mh(e,this,n,t),n.sort(kd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)mh(e[s],this,n,t);return n.sort(kd),n}};function kd(i,e){return i.distance-e.distance}function mh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)mh(r[a],e,t,!0)}}var vr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var $h=class $h{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};$h.prototype.isMatrix2=!0;var gh=$h;var Vd=new O,xo=new O,cr=new O,hr=new O,lh=new O,bg=new O,Mg=new O,ya=class{constructor(e=new O,t=new O){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Vd.subVectors(e,this.start),xo.subVectors(this.end,this.start);let n=xo.dot(xo);if(n===0)return 0;let r=xo.dot(Vd)/n;return t&&(r=st(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=bg,n=Mg){let s=10000000000000001e-32,r,a,o=this.start,c=e.start,h=this.end,d=e.end;cr.subVectors(h,o),hr.subVectors(d,c),lh.subVectors(o,c);let f=cr.dot(cr),u=hr.dot(hr),m=hr.dot(lh);if(f<=s&&u<=s)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(f<=s)r=0,a=m/u,a=st(a,0,1);else{let v=cr.dot(lh);if(u<=s)a=0,r=st(-v/f,0,1);else{let A=cr.dot(hr),g=f*u-A*A;g!==0?r=st((A*m-v*u)/g,0,1):r=0,a=(A*r+m)/u,a<0?(a=0,r=st(-v/f,0,1)):a>1&&(a=1,r=st((A-v)/f,0,1))}}return t.copy(o).addScaledVector(cr,r),n.copy(c).addScaledVector(hr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var va=class extends ii{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ze("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Gh(i,e,t,n){let s=Sg(n);switch(t){case Nh:return i*e;case Uh:return i*e/s.components*s.byteLength;case cl:return i*e/s.components*s.byteLength;case os:return i*e*2/s.components*s.byteLength;case hl:return i*e*2/s.components*s.byteLength;case Fh:return i*e*3/s.components*s.byteLength;case Yn:return i*e*4/s.components*s.byteLength;case ul:return i*e*4/s.components*s.byteLength;case Ea:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fl:case ml:return Math.max(i,16)*Math.max(e,8)/4;case dl:case pl:return Math.max(i,8)*Math.max(e,8)/2;case gl:case _l:case yl:case vl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xl:case Ca:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ul:case Ol:case Bl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case zl:case kl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ra:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sg(i){switch(i){case zn:case Ph:return{byteLength:1,components:1};case Mr:case Ih:case mi:return{byteLength:2,components:1};case ol:case ll:return{byteLength:2,components:4};case ri:case al:case ai:return{byteLength:4,components:1};case Lh:case Dh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Jf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function wg(i){let e=new WeakMap;function t(o,c){let h=o.array,d=o.usage,f=h.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,h,d),o.onUploadCallback();let m;if(h instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)m=i.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=i.SHORT;else if(h instanceof Uint32Array)m=i.UNSIGNED_INT;else if(h instanceof Int32Array)m=i.INT;else if(h instanceof Int8Array)m=i.BYTE;else if(h instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,h){let d=c.array,f=c.updateRanges;if(i.bindBuffer(h,o),f.length===0)i.bufferSubData(h,0,d);else{f.sort((m,v)=>m.start-v.start);let u=0;for(let m=1;m<f.length;m++){let v=f[u],A=f[m];A.start<=v.start+v.count+1?v.count=Math.max(v.count,A.start+A.count-v.start):(++u,f[u]=A)}f.length=u+1;for(let m=0,v=f.length;m<v;m++){let A=f[m];i.bufferSubData(h,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let h=e.get(o);if(h===void 0)e.set(o,t(o,c));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,c),h.version=o.version}}return{get:s,remove:r,update:a}}var Ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tg=`#ifdef USE_ALPHAHASH
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
#endif`,Cg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ig=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lg=`#ifdef USE_AOMAP
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
#endif`,Dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ng=`#ifdef USE_BATCHING
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
#endif`,Fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ug=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Og=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zg=`#ifdef USE_IRIDESCENCE
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
#endif`,kg=`#ifdef USE_BUMPMAP
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
#endif`,Vg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Zg=`#define PI 3.141592653589793
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
} // validated`,Jg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jg=`vec3 transformedNormal = objectNormal;
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
#endif`,Kg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n_="gl_FragColor = linearToOutputTexel( gl_FragColor );",i_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s_=`#ifdef USE_ENVMAP
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
#endif`,r_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,a_=`#ifdef USE_ENVMAP
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
#endif`,o_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l_=`#ifdef USE_ENVMAP
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
#endif`,c_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,u_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f_=`#ifdef USE_GRADIENTMAP
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
}`,p_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,__=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,x_=`#ifdef USE_ENVMAP
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
#endif`,y_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,v_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,b_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,S_=`PhysicalMaterial material;
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
#endif`,E_=`uniform sampler2D dfgLUT;
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
}`,w_=`
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
#endif`,A_=`#if defined( RE_IndirectDiffuse )
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
#endif`,T_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,R_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,I_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,D_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,N_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,F_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,U_=`#if defined( USE_POINTS_UV )
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
#endif`,O_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,B_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,z_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H_=`#ifdef USE_MORPHTARGETS
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
#endif`,G_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,X_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Z_=`#ifdef USE_NORMALMAP
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
#endif`,J_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Q_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,e0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,t0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,n0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,a0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,u0=`float getShadowMask() {
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
}`,d0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f0=`#ifdef USE_SKINNING
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
#endif`,p0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m0=`#ifdef USE_SKINNING
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
#endif`,g0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,x0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,y0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,v0=`#ifdef USE_TRANSMISSION
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
#endif`,b0=`#ifdef USE_TRANSMISSION
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
#endif`,M0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,A0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T0=`uniform sampler2D t2D;
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
}`,C0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`#include <common>
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
}`,D0=`#if DEPTH_PACKING == 3200
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
}`,N0=`#define DISTANCE
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
}`,F0=`#define DISTANCE
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,O0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`uniform float scale;
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
}`,z0=`uniform vec3 diffuse;
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
}`,k0=`#include <common>
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
}`,V0=`uniform vec3 diffuse;
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
}`,H0=`#define LAMBERT
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
}`,G0=`#define LAMBERT
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
}`,W0=`#define MATCAP
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
}`,X0=`#define MATCAP
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
}`,q0=`#define NORMAL
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
}`,Y0=`#define NORMAL
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
}`,$0=`#define PHONG
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
}`,Z0=`#define PHONG
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
}`,J0=`#define STANDARD
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
}`,j0=`#define STANDARD
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
}`,K0=`#define TOON
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
}`,Q0=`#define TOON
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
}`,ex=`uniform float size;
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
}`,tx=`uniform vec3 diffuse;
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
}`,nx=`#include <common>
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
}`,ix=`uniform vec3 color;
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
}`,sx=`uniform float rotation;
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
}`,rx=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Ag,alphahash_pars_fragment:Tg,alphamap_fragment:Cg,alphamap_pars_fragment:Rg,alphatest_fragment:Pg,alphatest_pars_fragment:Ig,aomap_fragment:Lg,aomap_pars_fragment:Dg,batching_pars_vertex:Ng,batching_vertex:Fg,begin_vertex:Ug,beginnormal_vertex:Og,bsdfs:Bg,iridescence_fragment:zg,bumpmap_pars_fragment:kg,clipping_planes_fragment:Vg,clipping_planes_pars_fragment:Hg,clipping_planes_pars_vertex:Gg,clipping_planes_vertex:Wg,color_fragment:Xg,color_pars_fragment:qg,color_pars_vertex:Yg,color_vertex:$g,common:Zg,cube_uv_reflection_fragment:Jg,defaultnormal_vertex:jg,displacementmap_pars_vertex:Kg,displacementmap_vertex:Qg,emissivemap_fragment:e_,emissivemap_pars_fragment:t_,colorspace_fragment:n_,colorspace_pars_fragment:i_,envmap_fragment:s_,envmap_common_pars_fragment:r_,envmap_pars_fragment:a_,envmap_pars_vertex:o_,envmap_physical_pars_fragment:x_,envmap_vertex:l_,fog_vertex:c_,fog_pars_vertex:h_,fog_fragment:u_,fog_pars_fragment:d_,gradientmap_pars_fragment:f_,lightmap_pars_fragment:p_,lights_lambert_fragment:m_,lights_lambert_pars_fragment:g_,lights_pars_begin:__,lights_toon_fragment:y_,lights_toon_pars_fragment:v_,lights_phong_fragment:b_,lights_phong_pars_fragment:M_,lights_physical_fragment:S_,lights_physical_pars_fragment:E_,lights_fragment_begin:w_,lights_fragment_maps:A_,lights_fragment_end:T_,lightprobes_pars_fragment:C_,logdepthbuf_fragment:R_,logdepthbuf_pars_fragment:P_,logdepthbuf_pars_vertex:I_,logdepthbuf_vertex:L_,map_fragment:D_,map_pars_fragment:N_,map_particle_fragment:F_,map_particle_pars_fragment:U_,metalnessmap_fragment:O_,metalnessmap_pars_fragment:B_,morphinstance_vertex:z_,morphcolor_vertex:k_,morphnormal_vertex:V_,morphtarget_pars_vertex:H_,morphtarget_vertex:G_,normal_fragment_begin:W_,normal_fragment_maps:X_,normal_pars_fragment:q_,normal_pars_vertex:Y_,normal_vertex:$_,normalmap_pars_fragment:Z_,clearcoat_normal_fragment_begin:J_,clearcoat_normal_fragment_maps:j_,clearcoat_pars_fragment:K_,iridescence_pars_fragment:Q_,opaque_fragment:e0,packing:t0,premultiplied_alpha_fragment:n0,project_vertex:i0,dithering_fragment:s0,dithering_pars_fragment:r0,roughnessmap_fragment:a0,roughnessmap_pars_fragment:o0,shadowmap_pars_fragment:l0,shadowmap_pars_vertex:c0,shadowmap_vertex:h0,shadowmask_pars_fragment:u0,skinbase_vertex:d0,skinning_pars_vertex:f0,skinning_vertex:p0,skinnormal_vertex:m0,specularmap_fragment:g0,specularmap_pars_fragment:_0,tonemapping_fragment:x0,tonemapping_pars_fragment:y0,transmission_fragment:v0,transmission_pars_fragment:b0,uv_pars_fragment:M0,uv_pars_vertex:S0,uv_vertex:E0,worldpos_vertex:w0,background_vert:A0,background_frag:T0,backgroundCube_vert:C0,backgroundCube_frag:R0,cube_vert:P0,cube_frag:I0,depth_vert:L0,depth_frag:D0,distance_vert:N0,distance_frag:F0,equirect_vert:U0,equirect_frag:O0,linedashed_vert:B0,linedashed_frag:z0,meshbasic_vert:k0,meshbasic_frag:V0,meshlambert_vert:H0,meshlambert_frag:G0,meshmatcap_vert:W0,meshmatcap_frag:X0,meshnormal_vert:q0,meshnormal_frag:Y0,meshphong_vert:$0,meshphong_frag:Z0,meshphysical_vert:J0,meshphysical_frag:j0,meshtoon_vert:K0,meshtoon_frag:Q0,points_vert:ex,points_frag:tx,shadow_vert:nx,shadow_frag:ix,sprite_vert:sx,sprite_frag:rx},Le={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},Sn={basic:{uniforms:dn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:dn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:dn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:dn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:dn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new ut(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:dn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:dn([Le.points,Le.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:dn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:dn([Le.common,Le.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:dn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:dn([Le.sprite,Le.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:dn([Le.common,Le.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:dn([Le.lights,Le.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Sn.physical={uniforms:dn([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var Wl={r:0,b:0,g:0},ax=new Ft,jf=new it;jf.set(-1,0,0,0,1,0,0,0,1);function ox(i,e,t,n,s,r){let a=new ut(0),o=s===!0?0:1,c,h,d=null,f=0,u=null;function m(P){let L=P.isScene===!0?P.background:null;if(L&&L.isTexture){let E=P.backgroundBlurriness>0;L=e.get(L,E)}return L}function v(P){let L=!1,E=m(P);E===null?g(a,o):E&&E.isColor&&(g(E,1),L=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(P,L){let E=m(L);E&&(E.isCubeTexture||E.mapping===Ma)?(h===void 0&&(h=new sn(new yr(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Ns(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ax.makeRotationFromEuler(L.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(jf),h.material.toneMapped=dt.getTransfer(E.colorSpace)!==vt,(d!==E||f!==E.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,d=E,f=E.version,u=i.toneMapping),h.layers.enableAll(),P.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new sn(new Is(2,2),new bn({name:"BackgroundMaterial",uniforms:Ns(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.toneMapped=dt.getTransfer(E.colorSpace)!==vt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,u=i.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function g(P,L){P.getRGB(Wl,kh(i)),t.buffers.color.setClear(Wl.r,Wl.g,Wl.b,L,r)}function p(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(P,L=1){a.set(P),o=L,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(P){o=P,g(a,o)},render:v,addToRenderList:A,dispose:p}}function lx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(D,N,Q,te,X){let ee=!1,J=f(D,te,Q,N);r!==J&&(r=J,h(r.object)),ee=m(D,te,Q,X),ee&&v(D,te,Q,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,E(D,N,Q,te),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function h(D){return i.bindVertexArray(D)}function d(D){return i.deleteVertexArray(D)}function f(D,N,Q,te){let X=te.wireframe===!0,ee=n[N.id];ee===void 0&&(ee={},n[N.id]=ee);let J=D.isInstancedMesh===!0?D.id:0,re=ee[J];re===void 0&&(re={},ee[J]=re);let ce=re[Q.id];ce===void 0&&(ce={},re[Q.id]=ce);let pe=ce[X];return pe===void 0&&(pe=u(c()),ce[X]=pe),pe}function u(D){let N=[],Q=[],te=[];for(let X=0;X<t;X++)N[X]=0,Q[X]=0,te[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:Q,attributeDivisors:te,object:D,attributes:{},index:null}}function m(D,N,Q,te){let X=r.attributes,ee=N.attributes,J=0,re=Q.getAttributes();for(let ce in re)if(re[ce].location>=0){let de=X[ce],ge=ee[ce];if(ge===void 0&&(ce==="instanceMatrix"&&D.instanceMatrix&&(ge=D.instanceMatrix),ce==="instanceColor"&&D.instanceColor&&(ge=D.instanceColor)),de===void 0||de.attribute!==ge||ge&&de.data!==ge.data)return!0;J++}return r.attributesNum!==J||r.index!==te}function v(D,N,Q,te){let X={},ee=N.attributes,J=0,re=Q.getAttributes();for(let ce in re)if(re[ce].location>=0){let de=ee[ce];de===void 0&&(ce==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),ce==="instanceColor"&&D.instanceColor&&(de=D.instanceColor));let ge={};ge.attribute=de,de&&de.data&&(ge.data=de.data),X[ce]=ge,J++}r.attributes=X,r.attributesNum=J,r.index=te}function A(){let D=r.newAttributes;for(let N=0,Q=D.length;N<Q;N++)D[N]=0}function g(D){p(D,0)}function p(D,N){let Q=r.newAttributes,te=r.enabledAttributes,X=r.attributeDivisors;Q[D]=1,te[D]===0&&(i.enableVertexAttribArray(D),te[D]=1),X[D]!==N&&(i.vertexAttribDivisor(D,N),X[D]=N)}function P(){let D=r.newAttributes,N=r.enabledAttributes;for(let Q=0,te=N.length;Q<te;Q++)N[Q]!==D[Q]&&(i.disableVertexAttribArray(Q),N[Q]=0)}function L(D,N,Q,te,X,ee,J){J===!0?i.vertexAttribIPointer(D,N,Q,X,ee):i.vertexAttribPointer(D,N,Q,te,X,ee)}function E(D,N,Q,te){A();let X=te.attributes,ee=Q.getAttributes(),J=N.defaultAttributeValues;for(let re in ee){let ce=ee[re];if(ce.location>=0){let pe=X[re];if(pe===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor)),pe!==void 0){let de=pe.normalized,ge=pe.itemSize,Pe=e.get(pe);if(Pe===void 0)continue;let ye=Pe.buffer,qe=Pe.type,ie=Pe.bytesPerElement,Me=qe===i.INT||qe===i.UNSIGNED_INT||pe.gpuType===al;if(pe.isInterleavedBufferAttribute){let me=pe.data,Oe=me.stride,Qe=pe.offset;if(me.isInstancedInterleavedBuffer){for(let He=0;He<ce.locationSize;He++)p(ce.location+He,me.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let He=0;He<ce.locationSize;He++)g(ce.location+He);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let He=0;He<ce.locationSize;He++)L(ce.location+He,ge/ce.locationSize,qe,de,Oe*ie,(Qe+ge/ce.locationSize*He)*ie,Me)}else{if(pe.isInstancedBufferAttribute){for(let me=0;me<ce.locationSize;me++)p(ce.location+me,pe.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let me=0;me<ce.locationSize;me++)g(ce.location+me);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let me=0;me<ce.locationSize;me++)L(ce.location+me,ge/ce.locationSize,qe,de,ge*ie,ge/ce.locationSize*me*ie,Me)}}else if(J!==void 0){let de=J[re];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(ce.location,de);break;case 3:i.vertexAttrib3fv(ce.location,de);break;case 4:i.vertexAttrib4fv(ce.location,de);break;default:i.vertexAttrib1fv(ce.location,de)}}}}P()}function w(){R();for(let D in n){let N=n[D];for(let Q in N){let te=N[Q];for(let X in te){let ee=te[X];for(let J in ee)d(ee[J].object),delete ee[J];delete te[X]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let N=n[D.id];for(let Q in N){let te=N[Q];for(let X in te){let ee=te[X];for(let J in ee)d(ee[J].object),delete ee[J];delete te[X]}}delete n[D.id]}function I(D){for(let N in n){let Q=n[N];for(let te in Q){let X=Q[te];if(X[D.id]===void 0)continue;let ee=X[D.id];for(let J in ee)d(ee[J].object),delete ee[J];delete X[D.id]}}}function y(D){for(let N in n){let Q=n[N],te=D.isInstancedMesh===!0?D.id:0,X=Q[te];if(X!==void 0){for(let ee in X){let J=X[ee];for(let re in J)d(J[re].object),delete J[re];delete X[ee]}delete Q[te],Object.keys(Q).length===0&&delete n[N]}}}function R(){k(),a=!0,r!==s&&(r=s,h(r.object))}function k(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:I,initAttributes:A,enableAttribute:g,disableUnusedAttributes:P}}function cx(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let u=0;for(let m=0;m<d;m++)u+=h[m];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function hx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Yn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let y=I===mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==zn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ai&&!y)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp",d=c(h);d!==h&&(Ze("WebGLRenderer:",h,"not supported, using",d,"instead."),h=d);let f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),P=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:v,maxTextureSize:A,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:P,maxVaryings:L,maxFragmentUniforms:E,maxSamples:w,samples:T}}function ux(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Wn,o=new it,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let m=f.length!==0||u||n!==0||s;return s=u,n=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,m){let v=f.clippingPlanes,A=f.clipIntersection,g=f.clipShadows,p=i.get(f);if(!s||v===null||v.length===0||r&&!g)r?d(null):h();else{let P=r?0:n,L=P*4,E=p.clippingState||null;c.value=E,E=d(v,u,L,m);for(let w=0;w!==L;++w)E[w]=t[w];p.clippingState=E,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=P}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(f,u,m,v){let A=f!==null?f.length:0,g=null;if(A!==0){if(g=c.value,v!==!0||g===null){let p=m+A*4,P=u.matrixWorldInverse;o.getNormalMatrix(P),(g===null||g.length<p)&&(g=new Float32Array(p));for(let L=0,E=m;L!==A;++L,E+=4)a.copy(f[L]).applyMatrix4(P,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,g}}var ls=4,Cf=[.125,.215,.35,.446,.526,.582],Fs=20,dx=256,Ia=new Ls,Rf=new ut,Zh=null,Jh=0,jh=0,Kh=!1,fx=new O,ql=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=fx}=r;Zh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=If(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Zh,Jh,jh),this._renderer.xr.enabled=Kh,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),jh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:mi,format:Yn,colorSpace:ta,depthBuffer:!1},s=Pf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=px(r)),this._blurMaterial=gx(r,e,t),this._ggxMaterial=mx(r,e,t)}return s}_compileMaterial(e){let t=new sn(new nn,e);this._renderer.compile(t,Ia)}_sceneToCubeUV(e,t,n,s,r){let c=new en(90,1,t,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(Rf),f.toneMapping=si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new sn(new yr,new Rs({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));let A=this._backgroundBox,g=A.material,p=!1,P=e.background;P?P.isColor&&(g.color.copy(P),e.background=null,p=!0):(g.color.copy(Rf),p=!0);for(let L=0;L<6;L++){let E=L%3;E===0?(c.up.set(0,h[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[L],r.y,r.z)):E===1?(c.up.set(0,0,h[L]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[L],r.z)):(c.up.set(0,h[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[L]));let w=this._cubeSize;Er(s,E*w,L>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(A,c),f.render(e,c)}f.toneMapping=m,f.autoClear=u,e.background=P}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ss||e.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=If());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ia)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,h=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(h*h-d*d),u=0+h*1.25,m=f*u,{_lodMax:v}=this,A=this._sizeLods[n],g=3*A*(n>v-ls?n-v+ls:0),p=4*(this._cubeSize-A);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=v-t,Er(r,g,p,3*A,2*A),s.setRenderTarget(r),s.render(o,Ia),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-n,Er(e,g,p,3*A,2*A),s.setRenderTarget(e),s.render(o,Ia)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");let d=3,f=this._lodMeshes[s];f.material=h;let u=h.uniforms,m=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Fs-1),A=r/v,g=isFinite(r)?1+Math.floor(d*A):Fs;g>Fs&&Ze(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fs}`);let p=[],P=0;for(let I=0;I<Fs;++I){let y=I/A,R=Math.exp(-y*y/2);p.push(R),I===0?P+=R:I<g&&(P+=2*R)}for(let I=0;I<p.length;I++)p[I]=p[I]/P;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:L}=this;u.dTheta.value=v,u.mipInt.value=L-n;let E=this._sizeLods[s],w=3*E*(s>L-ls?s-L+ls:0),T=4*(this._cubeSize-E);Er(t,w,T,3*E,2*E),c.setRenderTarget(t),c.render(f,Ia)}};function px(i){let e=[],t=[],n=[],s=i,r=i-ls+1+Cf.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ls?c=Cf[a-i+ls-1]:a===0&&(c=0),t.push(c);let h=1/(o-2),d=-h,f=1+h,u=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,v=6,A=3,g=2,p=1,P=new Float32Array(A*v*m),L=new Float32Array(g*v*m),E=new Float32Array(p*v*m);for(let T=0;T<m;T++){let I=T%3*2/3-1,y=T>2?0:-1,R=[I,y,0,I+2/3,y,0,I+2/3,y+1,0,I,y,0,I+2/3,y+1,0,I,y+1,0];P.set(R,A*v*T),L.set(u,g*v*T);let k=[T,T,T,T,T,T];E.set(k,p*v*T)}let w=new nn;w.setAttribute("position",new An(P,A)),w.setAttribute("uv",new An(L,g)),w.setAttribute("faceIndex",new An(E,p)),n.push(new sn(w,null)),s>ls&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Pf(i,e,t){let n=new Un(i,e,t);return n.texture.mapping=Ma,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function mx(i,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$l(),fragmentShader:`

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
		`,blending:pi,depthTest:!1,depthWrite:!1})}function gx(i,e,t){let n=new Float32Array(Fs),s=new O(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$l(),fragmentShader:`

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
		`,blending:pi,depthTest:!1,depthWrite:!1})}function If(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$l(),fragmentShader:`

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
		`,blending:pi,depthTest:!1,depthWrite:!1})}function Lf(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function $l(){return`

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
			`},s=new yr(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:pi});r.uniforms.tEquirect.value=t;let a=new sn(s,r),o=t.minFilter;return t.minFilter===rs&&(t.minFilter=tn),new el(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function _x(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){let m=u.mapping;if(m===il||m===sl)if(e.has(u)){let v=e.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let A=new Yl(v.height);return A.fromEquirectangularTexture(i,u),e.set(u,A),u.addEventListener("dispose",h),o(A.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let m=u.mapping,v=m===il||m===sl,A=m===ss||m===Ds;if(v||A){let g=t.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ql(i)),g=v?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let P=u.image;return v&&P&&P.height>0||A&&P&&c(P)?(n===null&&(n=new ql(i)),g=v?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,m){return m===il?u.mapping=ss:m===sl&&(u.mapping=Ds),u}function c(u){let m=0,v=6;for(let A=0;A<v;A++)u[A]!==void 0&&m++;return m===v}function h(u){let m=u.target;m.removeEventListener("dispose",h);let v=e.get(m);v!==void 0&&(e.delete(m),v.dispose())}function d(u){let m=u.target;m.removeEventListener("dispose",d);let v=t.get(m);v!==void 0&&(t.delete(m),v.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function xx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Es("WebGLRenderer: "+n+" extension not supported."),s}}}function yx(i,e,t,n){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&e.remove(u.index);for(let v in u.attributes)e.remove(u.attributes[v]);u.removeEventListener("dispose",a),delete s[u.id];let m=r.get(u);m&&(e.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(f){let u=f.attributes;for(let m in u)e.update(u[m],i.ARRAY_BUFFER)}function h(f){let u=[],m=f.index,v=f.attributes.position,A=0;if(v===void 0)return;if(m!==null){let P=m.array;A=m.version;for(let L=0,E=P.length;L<E;L+=3){let w=P[L+0],T=P[L+1],I=P[L+2];u.push(w,T,T,I,I,w)}}else{let P=v.array;A=v.version;for(let L=0,E=P.length/3-1;L<E;L+=3){let w=L+0,T=L+1,I=L+2;u.push(w,T,T,I,I,w)}}let g=new(v.count>=65535?la:oa)(u,1);g.version=A;let p=r.get(f);p&&e.remove(p),r.set(f,g)}function d(f){let u=r.get(f);if(u){let m=f.index;m!==null&&u.version<m.version&&h(f)}else h(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:d}}function vx(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function h(f,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,f*a,m),t.update(u,n,m))}function d(f,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,m);let A=0;for(let g=0;g<m;g++)A+=u[g];t.update(A,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=h,this.renderMultiDraw=d}function bx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Mx(i,e,t){let n=new WeakMap,s=new Ct;function r(a,o,c){let h=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==f){let R=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,A=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],P=o.morphAttributes.color||[],L=0;m===!0&&(L=1),v===!0&&(L=2),A===!0&&(L=3);let E=o.attributes.position.count*L,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let T=new Float32Array(E*w*4*f),I=new aa(T,E,w,f);I.type=ai,I.needsUpdate=!0;let y=L*4;for(let k=0;k<f;k++){let D=g[k],N=p[k],Q=P[k],te=E*w*4*k;for(let X=0;X<D.count;X++){let ee=X*y;m===!0&&(s.fromBufferAttribute(D,X),T[te+ee+0]=s.x,T[te+ee+1]=s.y,T[te+ee+2]=s.z,T[te+ee+3]=0),v===!0&&(s.fromBufferAttribute(N,X),T[te+ee+4]=s.x,T[te+ee+5]=s.y,T[te+ee+6]=s.z,T[te+ee+7]=0),A===!0&&(s.fromBufferAttribute(Q,X),T[te+ee+8]=s.x,T[te+ee+9]=s.y,T[te+ee+10]=s.z,T[te+ee+11]=Q.itemSize===4?s.w:1)}}u={count:f,texture:I,size:new Xe(E,w)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let A=0;A<h.length;A++)m+=h[A];let v=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",h)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Sx(i,e,t,n,s){let r=new WeakMap;function a(h){let d=s.render.frame,f=h.geometry,u=e.get(h,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),r.get(h)!==d&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){let m=h.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function o(){r=new WeakMap}function c(h){let d=h.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var Ex={[Mh]:"LINEAR_TONE_MAPPING",[Sh]:"REINHARD_TONE_MAPPING",[Eh]:"CINEON_TONE_MAPPING",[wh]:"ACES_FILMIC_TONE_MAPPING",[Th]:"AGX_TONE_MAPPING",[Ch]:"NEUTRAL_TONE_MAPPING",[Ah]:"CUSTOM_TONE_MAPPING"};function wx(i,e,t,n,s,r){let a=new Un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Fi(e,t):void 0}),o=new Un(e,t,{type:mi,depthBuffer:!1,stencilBuffer:!1}),c=new nn;c.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new kt([0,2,0,0,2,0],2));let h=new Vo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new sn(c,h),f=new Ls(-1,1,1,-1,0,1),u=null,m=null,v=!1,A,g=null,p=[],P=!1;this.setSize=function(L,E){a.setSize(L,E),o.setSize(L,E);for(let w=0;w<p.length;w++){let T=p[w];T.setSize&&T.setSize(L,E)}},this.setEffects=function(L){p=L,P=p.length>0&&p[0].isRenderPass===!0;let E=a.width,w=a.height;for(let T=0;T<p.length;T++){let I=p[T];I.setSize&&I.setSize(E,w)}},this.begin=function(L,E){if(v||L.toneMapping===si&&p.length===0)return!1;if(g=E,E!==null){let w=E.width,T=E.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return P===!1&&L.setRenderTarget(a),A=L.toneMapping,L.toneMapping=si,!0},this.hasRenderPass=function(){return P},this.end=function(L,E){L.toneMapping=A,v=!0;let w=a,T=o;for(let I=0;I<p.length;I++){let y=p[I];if(y.enabled!==!1&&(y.render(L,T,w,E),y.needsSwap!==!1)){let R=w;w=T,T=R}}if(u!==L.outputColorSpace||m!==L.toneMapping){u=L.outputColorSpace,m=L.toneMapping,h.defines={},dt.getTransfer(u)===vt&&(h.defines.SRGB_TRANSFER="");let I=Ex[m];I&&(h.defines[I]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,L.setRenderTarget(g),L.render(d,f),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),h.dispose()}}var Kf=new yn,tu=new Fi(1,1),Qf=new aa,ep=new Fo,tp=new da,Df=[],Nf=[],Ff=new Float32Array(16),Uf=new Float32Array(9),Of=new Float32Array(4);function Tr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Df[s];if(r===void 0&&(r=new Float32Array(s),Df[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Yt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zl(i,e){let t=Nf[e];t===void 0&&(t=new Int32Array(e),Nf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ax(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function Cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function Rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function Px(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,n))return;Of.set(n),i.uniformMatrix2fv(this.addr,!1,Of),$t(t,n)}}function Ix(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,n))return;Uf.set(n),i.uniformMatrix3fv(this.addr,!1,Uf),$t(t,n)}}function Lx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,n))return;Ff.set(n),i.uniformMatrix4fv(this.addr,!1,Ff),$t(t,n)}}function Dx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function Fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function Ux(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function Ox(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function Vx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(tu.compareFunction=t.isReversedDepthBuffer()?Gl:Hl,r=tu):r=Kf,t.setTexture2D(e||r,s)}function Hx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ep,s)}function Gx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||tp,s)}function Wx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Qf,s)}function Xx(i){switch(i){case 5126:return Ax;case 35664:return Tx;case 35665:return Cx;case 35666:return Rx;case 35674:return Px;case 35675:return Ix;case 35676:return Lx;case 5124:case 35670:return Dx;case 35667:case 35671:return Nx;case 35668:case 35672:return Fx;case 35669:case 35673:return Ux;case 5125:return Ox;case 36294:return Bx;case 36295:return zx;case 36296:return kx;case 35678:case 36198:case 36298:case 36306:case 35682:return Vx;case 35679:case 36299:case 36307:return Hx;case 35680:case 36300:case 36308:case 36293:return Gx;case 36289:case 36303:case 36311:case 36292:return Wx}}function qx(i,e){i.uniform1fv(this.addr,e)}function Yx(i,e){let t=Tr(e,this.size,2);i.uniform2fv(this.addr,t)}function $x(i,e){let t=Tr(e,this.size,3);i.uniform3fv(this.addr,t)}function Zx(i,e){let t=Tr(e,this.size,4);i.uniform4fv(this.addr,t)}function Jx(i,e){let t=Tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function jx(i,e){let t=Tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Kx(i,e){let t=Tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Qx(i,e){i.uniform1iv(this.addr,e)}function ey(i,e){i.uniform2iv(this.addr,e)}function ty(i,e){i.uniform3iv(this.addr,e)}function ny(i,e){i.uniform4iv(this.addr,e)}function iy(i,e){i.uniform1uiv(this.addr,e)}function sy(i,e){i.uniform2uiv(this.addr,e)}function ry(i,e){i.uniform3uiv(this.addr,e)}function ay(i,e){i.uniform4uiv(this.addr,e)}function oy(i,e,t){let n=this.cache,s=e.length,r=Zl(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=tu:a=Kf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function ly(i,e,t){let n=this.cache,s=e.length,r=Zl(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ep,r[a])}function cy(i,e,t){let n=this.cache,s=e.length,r=Zl(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||tp,r[a])}function hy(i,e,t){let n=this.cache,s=e.length,r=Zl(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Qf,r[a])}function uy(i){switch(i){case 5126:return qx;case 35664:return Yx;case 35665:return $x;case 35666:return Zx;case 35674:return Jx;case 35675:return jx;case 35676:return Kx;case 5124:case 35670:return Qx;case 35667:case 35671:return ey;case 35668:case 35672:return ty;case 35669:case 35673:return ny;case 5125:return iy;case 36294:return sy;case 36295:return ry;case 36296:return ay;case 35678:case 36198:case 36298:case 36306:case 35682:return oy;case 35679:case 36299:case 36307:return ly;case 35680:case 36300:case 36308:case 36293:return cy;case 36289:case 36303:case 36311:case 36292:return hy}}var nu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xx(t.type)}},iu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uy(t.type)}},su=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Qh=/(\w+)(\])?(\[|\.)?/g;function Bf(i,e){i.seq.push(e),i.map[e.id]=e}function dy(i,e,t){let n=i.name,s=n.length;for(Qh.lastIndex=0;;){let r=Qh.exec(n),a=Qh.lastIndex,o=r[1],c=r[2]==="]",h=r[3];if(c&&(o=o|0),h===void 0||h==="["&&a+2===s){Bf(t,h===void 0?new nu(o,i,e):new iu(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new su(o),Bf(t,f)),t=f}}}var wr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);dy(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function zf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var fy=37297,py=0;function my(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var kf=new it;function gy(i){dt._getMatrix(kf,dt.workingColorSpace,i);let e=`mat3( ${kf.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case na:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Vf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+my(i.getShaderSource(e),o)}else return r}function _y(i,e){let t=gy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var xy={[Mh]:"Linear",[Sh]:"Reinhard",[Eh]:"Cineon",[wh]:"ACESFilmic",[Th]:"AgX",[Ch]:"Neutral",[Ah]:"Custom"};function yy(i,e){let t=xy[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xl=new O;function vy(){dt.getLuminanceCoefficients(Xl);let i=Xl.x.toFixed(4),e=Xl.y.toFixed(4),t=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function by(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Da).join(`
`)}function My(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Sy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Da(i){return i!==""}function Hf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ey=/^[ \t]*#include +<([\w\d./]+)>/gm;function ru(i){return i.replace(Ey,Ay)}var wy=new Map;function Ay(i,e){let t=lt[e];if(t===void 0){let n=wy.get(e);if(n!==void 0)t=lt[n],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ru(t)}var Ty=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wf(i){return i.replace(Ty,Cy)}function Cy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Ry={[ba]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function Py(i){return Ry[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Iy={[ss]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE",[Ma]:"ENVMAP_TYPE_CUBE_UV"};function Ly(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Iy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Dy={[Ds]:"ENVMAP_MODE_REFRACTION"};function Ny(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Dy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fy={[bh]:"ENVMAP_BLENDING_MULTIPLY",[hf]:"ENVMAP_BLENDING_MIX",[uf]:"ENVMAP_BLENDING_ADD"};function Uy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Fy[i.combine]||"ENVMAP_BLENDING_NONE"}function Oy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function By(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Py(t),h=Ly(t),d=Ny(t),f=Uy(t),u=Oy(t),m=by(t),v=My(r),A=s.createProgram(),g,p,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Da).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Da).join(`
`),p.length>0&&(p+=`
`)):(g=[Xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Da).join(`
`),p=[Xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?lt.tonemapping_pars_fragment:"",t.toneMapping!==si?yy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,_y("linearToOutputTexel",t.outputColorSpace),vy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Da).join(`
`)),a=ru(a),a=Hf(a,t),a=Gf(a,t),o=ru(o),o=Hf(o,t),o=Gf(o,t),a=Wf(a),o=Wf(o),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let L=P+g+a,E=P+p+o,w=zf(s,s.VERTEX_SHADER,L),T=zf(s,s.FRAGMENT_SHADER,E);s.attachShader(A,w),s.attachShader(A,T),t.index0AttributeName!==void 0?s.bindAttribLocation(A,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(A,0,"position"),s.linkProgram(A);function I(D){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(A)||"",Q=s.getShaderInfoLog(w)||"",te=s.getShaderInfoLog(T)||"",X=N.trim(),ee=Q.trim(),J=te.trim(),re=!0,ce=!0;if(s.getProgramParameter(A,s.LINK_STATUS)===!1)if(re=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,A,w,T);else{let pe=Vf(s,w,"vertex"),de=Vf(s,T,"fragment");Ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(A,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+X+`
`+pe+`
`+de)}else X!==""?Ze("WebGLProgram: Program Info Log:",X):(ee===""||J==="")&&(ce=!1);ce&&(D.diagnostics={runnable:re,programLog:X,vertexShader:{log:ee,prefix:g},fragmentShader:{log:J,prefix:p}})}s.deleteShader(w),s.deleteShader(T),y=new wr(s,A),R=Sy(s,A)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let R;this.getAttributes=function(){return R===void 0&&I(this),R};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(A,fy)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=py++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=w,this.fragmentShader=T,this}var zy=0,au=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ou(e),t.set(e,n)),n}},ou=class{constructor(e){this.id=zy++,this.code=e,this.usedTimes=0}};function ky(i){return i===os||i===Ca||i===Ra}function Vy(i,e,t,n,s,r){let a=new mr,o=new au,c=new Set,h=[],d=new Map,f=n.logarithmicDepthBuffer,u=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function A(y,R,k,D,N,Q){let te=D.fog,X=N.geometry,ee=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,J=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,re=e.get(y.envMap||ee,J),ce=re&&re.mapping===Ma?re.image.height:null,pe=m[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Ze("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let de=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ge=de!==void 0?de.length:0,Pe=0;X.morphAttributes.position!==void 0&&(Pe=1),X.morphAttributes.normal!==void 0&&(Pe=2),X.morphAttributes.color!==void 0&&(Pe=3);let ye,qe,ie,Me;if(pe){let ke=Sn[pe];ye=ke.vertexShader,qe=ke.fragmentShader}else{ye=y.vertexShader,qe=y.fragmentShader;let ke=o.getVertexShaderStage(y),St=o.getFragmentShaderStage(y);o.update(y,ke,St),ie=ke.id,Me=St.id}let me=i.getRenderTarget(),Oe=i.state.buffers.depth.getReversed(),Qe=N.isInstancedMesh===!0,He=N.isBatchedMesh===!0,gt=!!y.map,et=!!y.matcap,rt=!!re,at=!!y.aoMap,Je=!!y.lightMap,mt=!!y.bumpMap&&y.wireframe===!1,bt=!!y.normalMap,It=!!y.displacementMap,Mt=!!y.emissiveMap,ht=!!y.metalnessMap,ct=!!y.roughnessMap,z=y.anisotropy>0,Dt=y.clearcoat>0,tt=y.dispersion>0,C=y.iridescence>0,_=y.sheen>0,G=y.transmission>0,Y=z&&!!y.anisotropyMap,K=Dt&&!!y.clearcoatMap,_e=Dt&&!!y.clearcoatNormalMap,ue=Dt&&!!y.clearcoatRoughnessMap,B=C&&!!y.iridescenceMap,$=C&&!!y.iridescenceThicknessMap,fe=_&&!!y.sheenColorMap,Te=_&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,xe=!!y.specularColorMap,De=!!y.specularIntensityMap,he=G&&!!y.transmissionMap,Ie=G&&!!y.thicknessMap,U=!!y.gradientMap,be=!!y.alphaMap,se=y.alphaTest>0,we=!!y.alphaHash,Re=!!y.extensions,ae=si;y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(ae=i.toneMapping);let Ne={shaderID:pe,shaderType:y.type,shaderName:y.name,vertexShader:ye,fragmentShader:qe,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:Me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:He,batchingColor:He&&N._colorsTexture!==null,instancing:Qe,instancingColor:Qe&&N.instanceColor!==null,instancingMorph:Qe&&N.morphTexture!==null,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:dt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:gt,matcap:et,envMap:rt,envMapMode:rt&&re.mapping,envMapCubeUVHeight:ce,aoMap:at,lightMap:Je,bumpMap:mt,normalMap:bt,displacementMap:It,emissiveMap:Mt,normalMapObjectSpace:bt&&y.normalMapType===pf,normalMapTangentSpace:bt&&y.normalMapType===Oh,packedNormalMap:bt&&y.normalMapType===Oh&&ky(y.normalMap.format),metalnessMap:ht,roughnessMap:ct,anisotropy:z,anisotropyMap:Y,clearcoat:Dt,clearcoatMap:K,clearcoatNormalMap:_e,clearcoatRoughnessMap:ue,dispersion:tt,iridescence:C,iridescenceMap:B,iridescenceThicknessMap:$,sheen:_,sheenColorMap:fe,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:xe,specularIntensityMap:De,transmission:G,transmissionMap:he,thicknessMap:Ie,gradientMap:U,opaque:y.transparent===!1&&y.blending===ws&&y.alphaToCoverage===!1,alphaMap:be,alphaTest:se,alphaHash:we,combine:y.combine,mapUv:gt&&v(y.map.channel),aoMapUv:at&&v(y.aoMap.channel),lightMapUv:Je&&v(y.lightMap.channel),bumpMapUv:mt&&v(y.bumpMap.channel),normalMapUv:bt&&v(y.normalMap.channel),displacementMapUv:It&&v(y.displacementMap.channel),emissiveMapUv:Mt&&v(y.emissiveMap.channel),metalnessMapUv:ht&&v(y.metalnessMap.channel),roughnessMapUv:ct&&v(y.roughnessMap.channel),anisotropyMapUv:Y&&v(y.anisotropyMap.channel),clearcoatMapUv:K&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:_e&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:B&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:$&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Te&&v(y.sheenRoughnessMap.channel),specularMapUv:Ee&&v(y.specularMap.channel),specularColorMapUv:xe&&v(y.specularColorMap.channel),specularIntensityMapUv:De&&v(y.specularIntensityMap.channel),transmissionMapUv:he&&v(y.transmissionMap.channel),thicknessMapUv:Ie&&v(y.thicknessMap.channel),alphaMapUv:be&&v(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(bt||z),vertexNormals:!!X.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(gt||be),fog:!!te,useFog:y.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||X.attributes.normal===void 0&&bt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Oe,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Pe,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:gt&&y.map.isVideoTexture===!0&&dt.getTransfer(y.map.colorSpace)===vt,decodeVideoTextureEmissive:Mt&&y.emissiveMap.isVideoTexture===!0&&dt.getTransfer(y.emissiveMap.colorSpace)===vt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===qn,flipSided:y.side===Mn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&y.extensions.multiDraw===!0||He)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(y){let R=[];if(y.shaderID?R.push(y.shaderID):(R.push(y.customVertexShaderID),R.push(y.customFragmentShaderID)),y.defines!==void 0)for(let k in y.defines)R.push(k),R.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(p(R,y),P(R,y),R.push(i.outputColorSpace)),R.push(y.customProgramCacheKey),R.join()}function p(y,R){y.push(R.precision),y.push(R.outputColorSpace),y.push(R.envMapMode),y.push(R.envMapCubeUVHeight),y.push(R.mapUv),y.push(R.alphaMapUv),y.push(R.lightMapUv),y.push(R.aoMapUv),y.push(R.bumpMapUv),y.push(R.normalMapUv),y.push(R.displacementMapUv),y.push(R.emissiveMapUv),y.push(R.metalnessMapUv),y.push(R.roughnessMapUv),y.push(R.anisotropyMapUv),y.push(R.clearcoatMapUv),y.push(R.clearcoatNormalMapUv),y.push(R.clearcoatRoughnessMapUv),y.push(R.iridescenceMapUv),y.push(R.iridescenceThicknessMapUv),y.push(R.sheenColorMapUv),y.push(R.sheenRoughnessMapUv),y.push(R.specularMapUv),y.push(R.specularColorMapUv),y.push(R.specularIntensityMapUv),y.push(R.transmissionMapUv),y.push(R.thicknessMapUv),y.push(R.combine),y.push(R.fogExp2),y.push(R.sizeAttenuation),y.push(R.morphTargetsCount),y.push(R.morphAttributeCount),y.push(R.numDirLights),y.push(R.numPointLights),y.push(R.numSpotLights),y.push(R.numSpotLightMaps),y.push(R.numHemiLights),y.push(R.numRectAreaLights),y.push(R.numDirLightShadows),y.push(R.numPointLightShadows),y.push(R.numSpotLightShadows),y.push(R.numSpotLightShadowsWithMaps),y.push(R.numLightProbes),y.push(R.shadowMapType),y.push(R.toneMapping),y.push(R.numClippingPlanes),y.push(R.numClipIntersection),y.push(R.depthPacking)}function P(y,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function L(y){let R=m[y.type],k;if(R){let D=Sn[R];k=Pa.clone(D.uniforms)}else k=y.uniforms;return k}function E(y,R){let k=d.get(R);return k!==void 0?++k.usedTimes:(k=new By(i,R,y,s),h.push(k),d.set(R,k)),k}function w(y){if(--y.usedTimes===0){let R=h.indexOf(y);h[R]=h[h.length-1],h.pop(),d.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function I(){o.dispose()}return{getParameters:A,getProgramCacheKey:g,getUniforms:L,acquireProgram:E,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:I}}function Hy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Gy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,v,A,g,p){let P=i[e];return P===void 0?(P={id:u.id,object:u,geometry:m,material:v,materialVariant:a(u),groupOrder:A,renderOrder:u.renderOrder,z:g,group:p},i[e]=P):(P.id=u.id,P.object=u,P.geometry=m,P.material=v,P.materialVariant=a(u),P.groupOrder=A,P.renderOrder=u.renderOrder,P.z=g,P.group=p),e++,P}function c(u,m,v,A,g,p){let P=o(u,m,v,A,g,p);v.transmission>0?n.push(P):v.transparent===!0?s.push(P):t.push(P)}function h(u,m,v,A,g,p){let P=o(u,m,v,A,g,p);v.transmission>0?n.unshift(P):v.transparent===!0?s.unshift(P):t.unshift(P)}function d(u,m,v){t.length>1&&t.sort(u||Gy),n.length>1&&n.sort(m||qf),s.length>1&&s.sort(m||qf),v&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let u=e,m=i.length;u<m;u++){let v=i[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:h,finish:f,sort:d}}function Wy(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Yf,i.set(n,[a])):s>=r.length?(a=new Yf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Xy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new ut};break;case"SpotLight":t={position:new O,direction:new O,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new ut,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":t={color:new ut,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function qy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Yy=0;function $y(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zy(i){let e=new Xy,t=qy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new O);let s=new O,r=new Ft,a=new Ft;function o(h){let d=0,f=0,u=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let m=0,v=0,A=0,g=0,p=0,P=0,L=0,E=0,w=0,T=0,I=0;h.sort($y);for(let R=0,k=h.length;R<k;R++){let D=h[R],N=D.color,Q=D.intensity,te=D.distance,X=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===os?X=D.shadow.map.texture:X=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=N.r*Q,f+=N.g*Q,u+=N.b*Q;else if(D.isLightProbe){for(let ee=0;ee<9;ee++)n.probe[ee].addScaledVector(D.sh.coefficients[ee],Q);I++}else if(D.isDirectionalLight){let ee=e.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let J=D.shadow,re=t.get(D);re.shadowIntensity=J.intensity,re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,n.directionalShadow[m]=re,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=D.shadow.matrix,P++}n.directional[m]=ee,m++}else if(D.isSpotLight){let ee=e.get(D);ee.position.setFromMatrixPosition(D.matrixWorld),ee.color.copy(N).multiplyScalar(Q),ee.distance=te,ee.coneCos=Math.cos(D.angle),ee.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ee.decay=D.decay,n.spot[A]=ee;let J=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,J.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[A]=J.matrix,D.castShadow){let re=t.get(D);re.shadowIntensity=J.intensity,re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,n.spotShadow[A]=re,n.spotShadowMap[A]=X,E++}A++}else if(D.isRectAreaLight){let ee=e.get(D);ee.color.copy(N).multiplyScalar(Q),ee.halfWidth.set(D.width*.5,0,0),ee.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=ee,g++}else if(D.isPointLight){let ee=e.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity),ee.distance=D.distance,ee.decay=D.decay,D.castShadow){let J=D.shadow,re=t.get(D);re.shadowIntensity=J.intensity,re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,re.shadowCameraNear=J.camera.near,re.shadowCameraFar=J.camera.far,n.pointShadow[v]=re,n.pointShadowMap[v]=X,n.pointShadowMatrix[v]=D.shadow.matrix,L++}n.point[v]=ee,v++}else if(D.isHemisphereLight){let ee=e.get(D);ee.skyColor.copy(D.color).multiplyScalar(Q),ee.groundColor.copy(D.groundColor).multiplyScalar(Q),n.hemi[p]=ee,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Le.LTC_FLOAT_1,n.rectAreaLTC2=Le.LTC_FLOAT_2):(n.rectAreaLTC1=Le.LTC_HALF_1,n.rectAreaLTC2=Le.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==m||y.pointLength!==v||y.spotLength!==A||y.rectAreaLength!==g||y.hemiLength!==p||y.numDirectionalShadows!==P||y.numPointShadows!==L||y.numSpotShadows!==E||y.numSpotMaps!==w||y.numLightProbes!==I)&&(n.directional.length=m,n.spot.length=A,n.rectArea.length=g,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=P,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=E+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=I,y.directionalLength=m,y.pointLength=v,y.spotLength=A,y.rectAreaLength=g,y.hemiLength=p,y.numDirectionalShadows=P,y.numPointShadows=L,y.numSpotShadows=E,y.numSpotMaps=w,y.numLightProbes=I,n.version=Yy++)}function c(h,d){let f=0,u=0,m=0,v=0,A=0,g=d.matrixWorldInverse;for(let p=0,P=h.length;p<P;p++){let L=h[p];if(L.isDirectionalLight){let E=n.directional[f];E.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),f++}else if(L.isSpotLight){let E=n.spot[m];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(L.isRectAreaLight){let E=n.rectArea[v];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(g),a.identity(),r.copy(L.matrixWorld),r.premultiply(g),a.extractRotation(r),E.halfWidth.set(L.width*.5,0,0),E.halfHeight.set(0,L.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(L.isPointLight){let E=n.point[u];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(g),u++}else if(L.isHemisphereLight){let E=n.hemi[A];E.direction.setFromMatrixPosition(L.matrixWorld),E.direction.transformDirection(g),A++}}}return{setup:o,setupView:c,state:n}}function $f(i){let e=new Zy(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function h(){e.setup(t)}function d(u){e.setupView(t,u)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:h,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Jy(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new $f(i),e.set(s,[o])):r>=a.length?(o=new $f(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var jy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ky=`uniform sampler2D shadow_pass;
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
}`,Qy=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],ev=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Zf=new Ft,La=new O,eu=new O;function tv(i,e,t){let n=new ha,s=new Xe,r=new Xe,a=new Ct,o=new Ho,c=new Go,h={},d=t.maxTextureSize,f={[Di]:Mn,[Mn]:Di,[qn]:qn},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:jy,fragmentShader:Ky}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let v=new nn;v.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new sn(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ba;let p=this.type;this.render=function(T,I,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Wd&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ba);let R=i.getRenderTarget(),k=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),N=i.state;N.setBlending(pi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let Q=p!==this.type;Q&&I.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(X=>X.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,X=T.length;te<X;te++){let ee=T[te],J=ee.shadow;if(J===void 0){Ze("WebGLShadowMap:",ee,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let re=J.getFrameExtents();s.multiply(re),r.copy(J.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/re.x),s.x=r.x*re.x,J.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/re.y),s.y=r.y*re.y,J.mapSize.y=r.y));let ce=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=ce,J.map===null||Q===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===br){if(ee.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new Un(s.x,s.y,{format:os,type:mi,minFilter:tn,magFilter:tn,generateMipmaps:!1}),J.map.texture.name=ee.name+".shadowMap",J.map.depthTexture=new Fi(s.x,s.y,ai),J.map.depthTexture.name=ee.name+".shadowMapDepth",J.map.depthTexture.format=fi,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=jt,J.map.depthTexture.magFilter=jt}else ee.isPointLight?(J.map=new Yl(s.x),J.map.depthTexture=new ko(s.x,ri)):(J.map=new Un(s.x,s.y),J.map.depthTexture=new Fi(s.x,s.y,ri)),J.map.depthTexture.name=ee.name+".shadowMap",J.map.depthTexture.format=fi,this.type===ba?(J.map.depthTexture.compareFunction=ce?Gl:Hl,J.map.depthTexture.minFilter=tn,J.map.depthTexture.magFilter=tn):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=jt,J.map.depthTexture.magFilter=jt);J.camera.updateProjectionMatrix()}let pe=J.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<pe;de++){if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,de),i.clear();else{de===0&&(i.setRenderTarget(J.map),i.clear());let ge=J.getViewport(de);a.set(r.x*ge.x,r.y*ge.y,r.x*ge.z,r.y*ge.w),N.viewport(a)}if(ee.isPointLight){let ge=J.camera,Pe=J.matrix,ye=ee.distance||ge.far;ye!==ge.far&&(ge.far=ye,ge.updateProjectionMatrix()),La.setFromMatrixPosition(ee.matrixWorld),ge.position.copy(La),eu.copy(ge.position),eu.add(Qy[de]),ge.up.copy(ev[de]),ge.lookAt(eu),ge.updateMatrixWorld(),Pe.makeTranslation(-La.x,-La.y,-La.z),Zf.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),J._frustum.setFromProjectionMatrix(Zf,ge.coordinateSystem,ge.reversedDepth)}else J.updateMatrices(ee);n=J.getFrustum(),E(I,y,J.camera,ee,this.type)}J.isPointLightShadow!==!0&&this.type===br&&P(J,y),J.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(R,k,D)};function P(T,I){let y=e.update(A);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Un(s.x,s.y,{format:os,type:mi})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(I,null,y,u,A,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(I,null,y,m,A,null)}function L(T,I,y,R){let k=null,D=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)k=D;else if(k=y.isPointLight===!0?c:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let N=k.uuid,Q=I.uuid,te=h[N];te===void 0&&(te={},h[N]=te);let X=te[Q];X===void 0&&(X=k.clone(),te[Q]=X,I.addEventListener("dispose",w)),k=X}if(k.visible=I.visible,k.wireframe=I.wireframe,R===br?k.side=I.shadowSide!==null?I.shadowSide:I.side:k.side=I.shadowSide!==null?I.shadowSide:f[I.side],k.alphaMap=I.alphaMap,k.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,k.map=I.map,k.clipShadows=I.clipShadows,k.clippingPlanes=I.clippingPlanes,k.clipIntersection=I.clipIntersection,k.displacementMap=I.displacementMap,k.displacementScale=I.displacementScale,k.displacementBias=I.displacementBias,k.wireframeLinewidth=I.wireframeLinewidth,k.linewidth=I.linewidth,y.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let N=i.properties.get(k);N.light=y}return k}function E(T,I,y,R,k){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&k===br)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let Q=e.update(T),te=T.material;if(Array.isArray(te)){let X=Q.groups;for(let ee=0,J=X.length;ee<J;ee++){let re=X[ee],ce=te[re.materialIndex];if(ce&&ce.visible){let pe=L(T,ce,R,k);T.onBeforeShadow(i,T,I,y,Q,pe,re),i.renderBufferDirect(y,null,Q,pe,T,re),T.onAfterShadow(i,T,I,y,Q,pe,re)}}}else if(te.visible){let X=L(T,te,R,k);T.onBeforeShadow(i,T,I,y,Q,X,null),i.renderBufferDirect(y,null,Q,X,T,null),T.onAfterShadow(i,T,I,y,Q,X,null)}}let N=T.children;for(let Q=0,te=N.length;Q<te;Q++)E(N[Q],I,y,R,k)}function w(T){T.target.removeEventListener("dispose",w);for(let y in h){let R=h[y],k=T.target.uuid;k in R&&(R[k].dispose(),delete R[k])}}}function nv(i,e){function t(){let U=!1,be=new Ct,se=null,we=new Ct(0,0,0,0);return{setMask:function(Re){se!==Re&&!U&&(i.colorMask(Re,Re,Re,Re),se=Re)},setLocked:function(Re){U=Re},setClear:function(Re,ae,Ne,ke,St){St===!0&&(Re*=ke,ae*=ke,Ne*=ke),be.set(Re,ae,Ne,ke),we.equals(be)===!1&&(i.clearColor(Re,ae,Ne,ke),we.copy(be))},reset:function(){U=!1,se=null,we.set(-1,0,0,0)}}}function n(){let U=!1,be=!1,se=null,we=null,Re=null;return{setReversed:function(ae){if(be!==ae){let Ne=e.get("EXT_clip_control");ae?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),be=ae;let ke=Re;Re=null,this.setClear(ke)}},getReversed:function(){return be},setTest:function(ae){ae?me(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(ae){se!==ae&&!U&&(i.depthMask(ae),se=ae)},setFunc:function(ae){if(be&&(ae=Ef[ae]),we!==ae){switch(ae){case Mo:i.depthFunc(i.NEVER);break;case So:i.depthFunc(i.ALWAYS);break;case Eo:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case wo:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case To:i.depthFunc(i.GREATER);break;case Co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=ae}},setLocked:function(ae){U=ae},setClear:function(ae){Re!==ae&&(Re=ae,be&&(ae=1-ae),i.clearDepth(ae))},reset:function(){U=!1,se=null,we=null,Re=null,be=!1}}}function s(){let U=!1,be=null,se=null,we=null,Re=null,ae=null,Ne=null,ke=null,St=null;return{setTest:function(yt){U||(yt?me(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(yt){be!==yt&&!U&&(i.stencilMask(yt),be=yt)},setFunc:function(yt,ln,Pn){(se!==yt||we!==ln||Re!==Pn)&&(i.stencilFunc(yt,ln,Pn),se=yt,we=ln,Re=Pn)},setOp:function(yt,ln,Pn){(ae!==yt||Ne!==ln||ke!==Pn)&&(i.stencilOp(yt,ln,Pn),ae=yt,Ne=ln,ke=Pn)},setLocked:function(yt){U=yt},setClear:function(yt){St!==yt&&(i.clearStencil(yt),St=yt)},reset:function(){U=!1,be=null,se=null,we=null,Re=null,ae=null,Ne=null,ke=null,St=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,h=new WeakMap,d={},f={},u={},m=new WeakMap,v=[],A=null,g=!1,p=null,P=null,L=null,E=null,w=null,T=null,I=null,y=new ut(0,0,0),R=0,k=!1,D=null,N=null,Q=null,te=null,X=null,ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,re=0,ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(ce)[1]),J=re>=1):ce.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),J=re>=2);let pe=null,de={},ge=i.getParameter(i.SCISSOR_BOX),Pe=i.getParameter(i.VIEWPORT),ye=new Ct().fromArray(ge),qe=new Ct().fromArray(Pe);function ie(U,be,se,we){let Re=new Uint8Array(4),ae=i.createTexture();i.bindTexture(U,ae),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<se;Ne++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(be+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return ae}let Me={};Me[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(i.DEPTH_TEST),a.setFunc(As),mt(!1),bt(_h),me(i.CULL_FACE),at(pi);function me(U){d[U]!==!0&&(i.enable(U),d[U]=!0)}function Oe(U){d[U]!==!1&&(i.disable(U),d[U]=!1)}function Qe(U,be){return u[U]!==be?(i.bindFramebuffer(U,be),u[U]=be,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=be),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=be),!0):!1}function He(U,be){let se=v,we=!1;if(U){se=m.get(be),se===void 0&&(se=[],m.set(be,se));let Re=U.textures;if(se.length!==Re.length||se[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ne=Re.length;ae<Ne;ae++)se[ae]=i.COLOR_ATTACHMENT0+ae;se.length=Re.length,we=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,we=!0);we&&i.drawBuffers(se)}function gt(U){return A!==U?(i.useProgram(U),A=U,!0):!1}let et={[Zi]:i.FUNC_ADD,[qd]:i.FUNC_SUBTRACT,[Yd]:i.FUNC_REVERSE_SUBTRACT};et[$d]=i.MIN,et[Zd]=i.MAX;let rt={[Jd]:i.ZERO,[jd]:i.ONE,[Kd]:i.SRC_COLOR,[vo]:i.SRC_ALPHA,[rf]:i.SRC_ALPHA_SATURATE,[nf]:i.DST_COLOR,[ef]:i.DST_ALPHA,[Qd]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[sf]:i.ONE_MINUS_DST_COLOR,[tf]:i.ONE_MINUS_DST_ALPHA,[af]:i.CONSTANT_COLOR,[of]:i.ONE_MINUS_CONSTANT_COLOR,[lf]:i.CONSTANT_ALPHA,[cf]:i.ONE_MINUS_CONSTANT_ALPHA};function at(U,be,se,we,Re,ae,Ne,ke,St,yt){if(U===pi){g===!0&&(Oe(i.BLEND),g=!1);return}if(g===!1&&(me(i.BLEND),g=!0),U!==Xd){if(U!==p||yt!==k){if((P!==Zi||w!==Zi)&&(i.blendEquation(i.FUNC_ADD),P=Zi,w=Zi),yt)switch(U){case ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xh:i.blendFunc(i.ONE,i.ONE);break;case yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",U);break}else switch(U){case ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case yh:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vh:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",U);break}L=null,E=null,T=null,I=null,y.set(0,0,0),R=0,p=U,k=yt}return}Re=Re||be,ae=ae||se,Ne=Ne||we,(be!==P||Re!==w)&&(i.blendEquationSeparate(et[be],et[Re]),P=be,w=Re),(se!==L||we!==E||ae!==T||Ne!==I)&&(i.blendFuncSeparate(rt[se],rt[we],rt[ae],rt[Ne]),L=se,E=we,T=ae,I=Ne),(ke.equals(y)===!1||St!==R)&&(i.blendColor(ke.r,ke.g,ke.b,St),y.copy(ke),R=St),p=U,k=!1}function Je(U,be){U.side===qn?Oe(i.CULL_FACE):me(i.CULL_FACE);let se=U.side===Mn;be&&(se=!se),mt(se),U.blending===ws&&U.transparent===!1?at(pi):at(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let we=U.stencilWrite;o.setTest(we),we&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Mt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function mt(U){D!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),D=U)}function bt(U){U!==Hd?(me(i.CULL_FACE),U!==N&&(U===_h?i.cullFace(i.BACK):U===Gd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),N=U}function It(U){U!==Q&&(J&&i.lineWidth(U),Q=U)}function Mt(U,be,se){U?(me(i.POLYGON_OFFSET_FILL),(te!==be||X!==se)&&(te=be,X=se,a.getReversed()&&(be=-be),i.polygonOffset(be,se))):Oe(i.POLYGON_OFFSET_FILL)}function ht(U){U?me(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function ct(U){U===void 0&&(U=i.TEXTURE0+ee-1),pe!==U&&(i.activeTexture(U),pe=U)}function z(U,be,se){se===void 0&&(pe===null?se=i.TEXTURE0+ee-1:se=pe);let we=de[se];we===void 0&&(we={type:void 0,texture:void 0},de[se]=we),(we.type!==U||we.texture!==be)&&(pe!==se&&(i.activeTexture(se),pe=se),i.bindTexture(U,be||Me[U]),we.type=U,we.texture=be)}function Dt(){let U=de[pe];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function tt(){try{i.compressedTexImage2D(...arguments)}catch(U){Ke("WebGLState:",U)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(U){Ke("WebGLState:",U)}}function _(){try{i.texSubImage2D(...arguments)}catch(U){Ke("WebGLState:",U)}}function G(){try{i.texSubImage3D(...arguments)}catch(U){Ke("WebGLState:",U)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ke("WebGLState:",U)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ke("WebGLState:",U)}}function _e(){try{i.texStorage2D(...arguments)}catch(U){Ke("WebGLState:",U)}}function ue(){try{i.texStorage3D(...arguments)}catch(U){Ke("WebGLState:",U)}}function B(){try{i.texImage2D(...arguments)}catch(U){Ke("WebGLState:",U)}}function $(){try{i.texImage3D(...arguments)}catch(U){Ke("WebGLState:",U)}}function fe(U){return f[U]!==void 0?f[U]:i.getParameter(U)}function Te(U,be){f[U]!==be&&(i.pixelStorei(U,be),f[U]=be)}function Ee(U){ye.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ye.copy(U))}function xe(U){qe.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),qe.copy(U))}function De(U,be){let se=h.get(be);se===void 0&&(se=new WeakMap,h.set(be,se));let we=se.get(U);we===void 0&&(we=i.getUniformBlockIndex(be,U.name),se.set(U,we))}function he(U,be){let we=h.get(be).get(U);c.get(be)!==we&&(i.uniformBlockBinding(be,we,U.__bindingPointIndex),c.set(be,we))}function Ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},f={},pe=null,de={},u={},m=new WeakMap,v=[],A=null,g=!1,p=null,P=null,L=null,E=null,w=null,T=null,I=null,y=new ut(0,0,0),R=0,k=!1,D=null,N=null,Q=null,te=null,X=null,ye.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:me,disable:Oe,bindFramebuffer:Qe,drawBuffers:He,useProgram:gt,setBlending:at,setMaterial:Je,setFlipSided:mt,setCullFace:bt,setLineWidth:It,setPolygonOffset:Mt,setScissorTest:ht,activeTexture:ct,bindTexture:z,unbindTexture:Dt,compressedTexImage2D:tt,compressedTexImage3D:C,texImage2D:B,texImage3D:$,pixelStorei:Te,getParameter:fe,updateUBOMapping:De,uniformBlockBinding:he,texStorage2D:_e,texStorage3D:ue,texSubImage2D:_,texSubImage3D:G,compressedTexSubImage2D:Y,compressedTexSubImage3D:K,scissor:Ee,viewport:xe,reset:Ie}}function iv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Xe,d=new WeakMap,f=new Set,u,m=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(C,_){return v?new OffscreenCanvas(C,_):sa("canvas")}function g(C,_,G){let Y=1,K=tt(C);if((K.width>G||K.height>G)&&(Y=G/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let _e=Math.floor(Y*K.width),ue=Math.floor(Y*K.height);u===void 0&&(u=A(_e,ue));let B=_?A(_e,ue):u;return B.width=_e,B.height=ue,B.getContext("2d").drawImage(C,0,0,_e,ue),Ze("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+_e+"x"+ue+")."),B}else return"data"in C&&Ze("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function p(C){return C.generateMipmaps}function P(C){i.generateMipmap(C)}function L(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(C,_,G,Y,K,_e=!1){if(C!==null){if(i[C]!==void 0)return i[C];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ue;Y&&(ue=e.get("EXT_texture_norm16"),ue||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let B=_;if(_===i.RED&&(G===i.FLOAT&&(B=i.R32F),G===i.HALF_FLOAT&&(B=i.R16F),G===i.UNSIGNED_BYTE&&(B=i.R8),G===i.UNSIGNED_SHORT&&ue&&(B=ue.R16_EXT),G===i.SHORT&&ue&&(B=ue.R16_SNORM_EXT)),_===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(B=i.R8UI),G===i.UNSIGNED_SHORT&&(B=i.R16UI),G===i.UNSIGNED_INT&&(B=i.R32UI),G===i.BYTE&&(B=i.R8I),G===i.SHORT&&(B=i.R16I),G===i.INT&&(B=i.R32I)),_===i.RG&&(G===i.FLOAT&&(B=i.RG32F),G===i.HALF_FLOAT&&(B=i.RG16F),G===i.UNSIGNED_BYTE&&(B=i.RG8),G===i.UNSIGNED_SHORT&&ue&&(B=ue.RG16_EXT),G===i.SHORT&&ue&&(B=ue.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(B=i.RG8UI),G===i.UNSIGNED_SHORT&&(B=i.RG16UI),G===i.UNSIGNED_INT&&(B=i.RG32UI),G===i.BYTE&&(B=i.RG8I),G===i.SHORT&&(B=i.RG16I),G===i.INT&&(B=i.RG32I)),_===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(B=i.RGB8UI),G===i.UNSIGNED_SHORT&&(B=i.RGB16UI),G===i.UNSIGNED_INT&&(B=i.RGB32UI),G===i.BYTE&&(B=i.RGB8I),G===i.SHORT&&(B=i.RGB16I),G===i.INT&&(B=i.RGB32I)),_===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(B=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(B=i.RGBA16UI),G===i.UNSIGNED_INT&&(B=i.RGBA32UI),G===i.BYTE&&(B=i.RGBA8I),G===i.SHORT&&(B=i.RGBA16I),G===i.INT&&(B=i.RGBA32I)),_===i.RGB&&(G===i.UNSIGNED_SHORT&&ue&&(B=ue.RGB16_EXT),G===i.SHORT&&ue&&(B=ue.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(B=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(B=i.R11F_G11F_B10F)),_===i.RGBA){let $=_e?na:dt.getTransfer(K);G===i.FLOAT&&(B=i.RGBA32F),G===i.HALF_FLOAT&&(B=i.RGBA16F),G===i.UNSIGNED_BYTE&&(B=$===vt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ue&&(B=ue.RGBA16_EXT),G===i.SHORT&&ue&&(B=ue.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(B=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(B=i.RGB5_A1)}return(B===i.R16F||B===i.R32F||B===i.RG16F||B===i.RG32F||B===i.RGBA16F||B===i.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function w(C,_){let G;return C?_===null||_===ri||_===Sr?G=i.DEPTH24_STENCIL8:_===ai?G=i.DEPTH32F_STENCIL8:_===Mr&&(G=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ri||_===Sr?G=i.DEPTH_COMPONENT24:_===ai?G=i.DEPTH_COMPONENT32F:_===Mr&&(G=i.DEPTH_COMPONENT16),G}function T(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==jt&&C.minFilter!==tn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){let _=C.target;_.removeEventListener("dispose",I),R(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function y(C){let _=C.target;_.removeEventListener("dispose",y),D(_)}function R(C){let _=n.get(C);if(_.__webglInit===void 0)return;let G=C.source,Y=m.get(G);if(Y){let K=Y[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&k(C),Object.keys(Y).length===0&&m.delete(G)}n.remove(C)}function k(C){let _=n.get(C);i.deleteTexture(_.__webglTexture);let G=C.source,Y=m.get(G);delete Y[_.__cacheKey],a.memory.textures--}function D(C){let _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let K=0;K<_.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let G=C.textures;for(let Y=0,K=G.length;Y<K;Y++){let _e=n.get(G[Y]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(G[Y])}n.remove(C)}let N=0;function Q(){N=0}function te(){return N}function X(C){N=C}function ee(){let C=N;return C>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),N+=1,C}function J(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function re(C,_){let G=n.get(C);if(C.isVideoTexture&&z(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&G.__version!==C.version){let Y=C.image;if(Y===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Oe(G,C,_);return}}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+_)}function ce(C,_){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){Oe(G,C,_);return}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+_)}function pe(C,_){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){Oe(G,C,_);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+_)}function de(C,_){let G=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&G.__version!==C.version){Qe(G,C,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+_)}let ge={[Ro]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[Po]:i.MIRRORED_REPEAT},Pe={[jt]:i.NEAREST,[df]:i.NEAREST_MIPMAP_NEAREST,[Sa]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[rl]:i.LINEAR_MIPMAP_NEAREST,[rs]:i.LINEAR_MIPMAP_LINEAR},ye={[mf]:i.NEVER,[vf]:i.ALWAYS,[gf]:i.LESS,[Hl]:i.LEQUAL,[_f]:i.EQUAL,[Gl]:i.GEQUAL,[xf]:i.GREATER,[yf]:i.NOTEQUAL};function qe(C,_){if(_.type===ai&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===tn||_.magFilter===rl||_.magFilter===Sa||_.magFilter===rs||_.minFilter===tn||_.minFilter===rl||_.minFilter===Sa||_.minFilter===rs)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ge[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ge[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ge[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Pe[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Pe[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ye[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===jt||_.minFilter!==Sa&&_.minFilter!==rs||_.type===ai&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ie(C,_){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));let Y=_.source,K=m.get(Y);K===void 0&&(K={},m.set(Y,K));let _e=J(_);if(_e!==C.__cacheKey){K[_e]===void 0&&(K[_e]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),K[_e].usedTimes++;let ue=K[C.__cacheKey];ue!==void 0&&(K[C.__cacheKey].usedTimes--,ue.usedTimes===0&&k(_)),C.__cacheKey=_e,C.__webglTexture=K[_e].texture}return G}function Me(C,_,G){return Math.floor(Math.floor(C/G)/_)}function me(C,_,G,Y){let _e=C.updateRanges;if(_e.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,G,Y,_.data);else{_e.sort((Te,Ee)=>Te.start-Ee.start);let ue=0;for(let Te=1;Te<_e.length;Te++){let Ee=_e[ue],xe=_e[Te],De=Ee.start+Ee.count,he=Me(xe.start,_.width,4),Ie=Me(Ee.start,_.width,4);xe.start<=De+1&&he===Ie&&Me(xe.start+xe.count-1,_.width,4)===he?Ee.count=Math.max(Ee.count,xe.start+xe.count-Ee.start):(++ue,_e[ue]=xe)}_e.length=ue+1;let B=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Te=0,Ee=_e.length;Te<Ee;Te++){let xe=_e[Te],De=Math.floor(xe.start/4),he=Math.ceil(xe.count/4),Ie=De%_.width,U=Math.floor(De/_.width),be=he,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ie,U,be,se,G,Y,_.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,B),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function Oe(C,_,G){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);let K=ie(C,_),_e=_.source;t.bindTexture(Y,C.__webglTexture,i.TEXTURE0+G);let ue=n.get(_e);if(_e.version!==ue.__version||K===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let se=dt.getPrimaries(dt.workingColorSpace),we=_.colorSpace===Ui?null:dt.getPrimaries(_.colorSpace),Re=_.colorSpace===Ui||se===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let $=g(_.image,!1,s.maxTextureSize);$=Dt(_,$);let fe=r.convert(_.format,_.colorSpace),Te=r.convert(_.type),Ee=E(_.internalFormat,fe,Te,_.normalized,_.colorSpace,_.isVideoTexture);qe(Y,_);let xe,De=_.mipmaps,he=_.isVideoTexture!==!0,Ie=ue.__version===void 0||K===!0,U=_e.dataReady,be=T(_,$);if(_.isDepthTexture)Ee=w(_.format===as,_.type),Ie&&(he?t.texStorage2D(i.TEXTURE_2D,1,Ee,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,Ee,$.width,$.height,0,fe,Te,null));else if(_.isDataTexture)if(De.length>0){he&&Ie&&t.texStorage2D(i.TEXTURE_2D,be,Ee,De[0].width,De[0].height);for(let se=0,we=De.length;se<we;se++)xe=De[se],he?U&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,xe.width,xe.height,fe,Te,xe.data):t.texImage2D(i.TEXTURE_2D,se,Ee,xe.width,xe.height,0,fe,Te,xe.data);_.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(i.TEXTURE_2D,be,Ee,$.width,$.height),U&&me(_,$,fe,Te)):t.texImage2D(i.TEXTURE_2D,0,Ee,$.width,$.height,0,fe,Te,$.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){he&&Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Ee,De[0].width,De[0].height,$.depth);for(let se=0,we=De.length;se<we;se++)if(xe=De[se],_.format!==Yn)if(fe!==null)if(he){if(U)if(_.layerUpdates.size>0){let Re=Gh(xe.width,xe.height,_.format,_.type);for(let ae of _.layerUpdates){let Ne=xe.data.subarray(ae*Re/xe.data.BYTES_PER_ELEMENT,(ae+1)*Re/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,ae,xe.width,xe.height,1,fe,Ne)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,xe.width,xe.height,$.depth,fe,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Ee,xe.width,xe.height,$.depth,0,xe.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,xe.width,xe.height,$.depth,fe,Te,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Ee,xe.width,xe.height,$.depth,0,fe,Te,xe.data)}else{he&&Ie&&t.texStorage2D(i.TEXTURE_2D,be,Ee,De[0].width,De[0].height);for(let se=0,we=De.length;se<we;se++)xe=De[se],_.format!==Yn?fe!==null?he?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,xe.width,xe.height,fe,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Ee,xe.width,xe.height,0,xe.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?U&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,xe.width,xe.height,fe,Te,xe.data):t.texImage2D(i.TEXTURE_2D,se,Ee,xe.width,xe.height,0,fe,Te,xe.data)}else if(_.isDataArrayTexture)if(he){if(Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Ee,$.width,$.height,$.depth),U)if(_.layerUpdates.size>0){let se=Gh($.width,$.height,_.format,_.type);for(let we of _.layerUpdates){let Re=$.data.subarray(we*se/$.data.BYTES_PER_ELEMENT,(we+1)*se/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,we,$.width,$.height,1,fe,Te,Re)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,fe,Te,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,$.width,$.height,$.depth,0,fe,Te,$.data);else if(_.isData3DTexture)he?(Ie&&t.texStorage3D(i.TEXTURE_3D,be,Ee,$.width,$.height,$.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,fe,Te,$.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,$.width,$.height,$.depth,0,fe,Te,$.data);else if(_.isFramebufferTexture){if(Ie)if(he)t.texStorage2D(i.TEXTURE_2D,be,Ee,$.width,$.height);else{let se=$.width,we=$.height;for(let Re=0;Re<be;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ee,se,we,0,fe,Te,null),se>>=1,we>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),$.parentNode!==se){se.appendChild($),f.add(_),se.onpaint=we=>{let Re=we.changedElements;for(let ae of f)Re.includes(ae.image)&&(ae.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,$);else{let Re=i.RGBA,ae=i.RGBA,Ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Re,ae,Ne,$)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(he&&Ie){let se=tt(De[0]);t.texStorage2D(i.TEXTURE_2D,be,Ee,se.width,se.height)}for(let se=0,we=De.length;se<we;se++)xe=De[se],he?U&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe,Te,xe):t.texImage2D(i.TEXTURE_2D,se,Ee,fe,Te,xe);_.generateMipmaps=!1}else if(he){if(Ie){let se=tt($);t.texStorage2D(i.TEXTURE_2D,be,Ee,se.width,se.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Te,$)}else t.texImage2D(i.TEXTURE_2D,0,Ee,fe,Te,$);p(_)&&P(Y),ue.__version=_e.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Qe(C,_,G){if(_.image.length!==6)return;let Y=ie(C,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+G);let _e=n.get(K);if(K.version!==_e.__version||Y===!0){t.activeTexture(i.TEXTURE0+G);let ue=dt.getPrimaries(dt.workingColorSpace),B=_.colorSpace===Ui?null:dt.getPrimaries(_.colorSpace),$=_.colorSpace===Ui||ue===B?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let fe=_.isCompressedTexture||_.image[0].isCompressedTexture,Te=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let ae=0;ae<6;ae++)!fe&&!Te?Ee[ae]=g(_.image[ae],!0,s.maxCubemapSize):Ee[ae]=Te?_.image[ae].image:_.image[ae],Ee[ae]=Dt(_,Ee[ae]);let xe=Ee[0],De=r.convert(_.format,_.colorSpace),he=r.convert(_.type),Ie=E(_.internalFormat,De,he,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,be=_e.__version===void 0||Y===!0,se=K.dataReady,we=T(_,xe);qe(i.TEXTURE_CUBE_MAP,_);let Re;if(fe){U&&be&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ie,xe.width,xe.height);for(let ae=0;ae<6;ae++){Re=Ee[ae].mipmaps;for(let Ne=0;Ne<Re.length;Ne++){let ke=Re[Ne];_.format!==Yn?De!==null?U?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,ke.width,ke.height,De,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,Ie,ke.width,ke.height,0,ke.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,ke.width,ke.height,De,he,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,Ie,ke.width,ke.height,0,De,he,ke.data)}}}else{if(Re=_.mipmaps,U&&be){Re.length>0&&we++;let ae=tt(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ie,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Te){U?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ee[ae].width,Ee[ae].height,De,he,Ee[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ie,Ee[ae].width,Ee[ae].height,0,De,he,Ee[ae].data);for(let Ne=0;Ne<Re.length;Ne++){let St=Re[Ne].image[ae].image;U?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,St.width,St.height,De,he,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,Ie,St.width,St.height,0,De,he,St.data)}}else{U?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,De,he,Ee[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ie,De,he,Ee[ae]);for(let Ne=0;Ne<Re.length;Ne++){let ke=Re[Ne];U?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,De,he,ke.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,Ie,De,he,ke.image[ae])}}}p(_)&&P(i.TEXTURE_CUBE_MAP),_e.__version=K.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function He(C,_,G,Y,K,_e){let ue=r.convert(G.format,G.colorSpace),B=r.convert(G.type),$=E(G.internalFormat,ue,B,G.normalized,G.colorSpace),fe=n.get(_),Te=n.get(G);if(Te.__renderTarget=_,!fe.__hasExternalTextures){let Ee=Math.max(1,_.width>>_e),xe=Math.max(1,_.height>>_e);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,_e,$,Ee,xe,_.depth,0,ue,B,null):t.texImage2D(K,_e,$,Ee,xe,0,ue,B,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,Te.__webglTexture,0,ht(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,Te.__webglTexture,_e),t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(C,_,G){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){let Y=_.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,_e=w(_.stencilBuffer,K),ue=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ct(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(_),_e,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(_),_e,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,_e,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,C)}else{let Y=_.textures;for(let K=0;K<Y.length;K++){let _e=Y[K],ue=r.convert(_e.format,_e.colorSpace),B=r.convert(_e.type),$=E(_e.internalFormat,ue,B,_e.normalized,_e.colorSpace);ct(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(_),$,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(_),$,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,$,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function et(C,_,G){let Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),qe(i.TEXTURE_CUBE_MAP,_.depthTexture);let fe=r.convert(_.depthTexture.format),Te=r.convert(_.depthTexture.type),Ee;_.depthTexture.format===fi?Ee=i.DEPTH_COMPONENT24:_.depthTexture.format===as&&(Ee=i.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Ee,_.width,_.height,0,fe,Te,null)}}else re(_.depthTexture,0);let _e=K.__webglTexture,ue=ht(_),B=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,$=_.depthTexture.format===as?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===fi)ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,B,_e,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,$,B,_e,0);else if(_.depthTexture.format===as)ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,B,_e,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,$,B,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function rt(C){let _=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let Y=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){let K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=Y}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(G)for(let Y=0;Y<6;Y++)et(_.__webglFramebuffer[Y],C,Y);else{let Y=C.texture.mipmaps;Y&&Y.length>0?et(_.__webglFramebuffer[0],C,0):et(_.__webglFramebuffer,C,0)}else if(G){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),gt(_.__webglDepthbuffer[Y],C,!1);else{let K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,_e)}}else{let Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),gt(_.__webglDepthbuffer,C,!1);else{let K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,_e)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(C,_,G){let Y=n.get(C);_!==void 0&&He(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&rt(C)}function Je(C){let _=C.texture,G=n.get(C),Y=n.get(_);C.addEventListener("dispose",y);let K=C.textures,_e=C.isWebGLCubeRenderTarget===!0,ue=K.length>1;if(ue||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),_e){G.__webglFramebuffer=[];for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[B]=[];for(let $=0;$<_.mipmaps.length;$++)G.__webglFramebuffer[B][$]=i.createFramebuffer()}else G.__webglFramebuffer[B]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let B=0;B<_.mipmaps.length;B++)G.__webglFramebuffer[B]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ue)for(let B=0,$=K.length;B<$;B++){let fe=n.get(K[B]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&ct(C)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let B=0;B<K.length;B++){let $=K[B];G.__webglColorRenderbuffer[B]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[B]);let fe=r.convert($.format,$.colorSpace),Te=r.convert($.type),Ee=E($.internalFormat,fe,Te,$.normalized,$.colorSpace,C.isXRRenderTarget===!0),xe=ht(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,xe,Ee,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+B,i.RENDERBUFFER,G.__webglColorRenderbuffer[B])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_e){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),qe(i.TEXTURE_CUBE_MAP,_);for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)He(G.__webglFramebuffer[B][$],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+B,$);else He(G.__webglFramebuffer[B],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);p(_)&&P(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let B=0,$=K.length;B<$;B++){let fe=K[B],Te=n.get(fe),Ee=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ee=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Te.__webglTexture),qe(Ee,fe),He(G.__webglFramebuffer,C,fe,i.COLOR_ATTACHMENT0+B,Ee,0),p(fe)&&P(Ee)}t.unbindTexture()}else{let B=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(B=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(B,Y.__webglTexture),qe(B,_),_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)He(G.__webglFramebuffer[$],C,_,i.COLOR_ATTACHMENT0,B,$);else He(G.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,B,0);p(_)&&P(B),t.unbindTexture()}C.depthBuffer&&rt(C)}function mt(C){let _=C.textures;for(let G=0,Y=_.length;G<Y;G++){let K=_[G];if(p(K)){let _e=L(C),ue=n.get(K).__webglTexture;t.bindTexture(_e,ue),P(_e),t.unbindTexture()}}}let bt=[],It=[];function Mt(C){if(C.samples>0){if(ct(C)===!1){let _=C.textures,G=C.width,Y=C.height,K=i.COLOR_BUFFER_BIT,_e=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(C),B=_.length>1;if(B)for(let fe=0;fe<_.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);let $=C.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<_.length;fe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),B){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Te=n.get(_[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,G,Y,0,0,G,Y,K,i.NEAREST),c===!0&&(bt.length=0,It.length=0,bt.push(i.COLOR_ATTACHMENT0+fe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(bt.push(_e),It.push(_e),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,It)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),B)for(let fe=0;fe<_.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Te=n.get(_[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ht(C){return Math.min(s.maxSamples,C.samples)}function ct(C){let _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(C){let _=a.render.frame;d.get(C)!==_&&(d.set(C,_),C.update())}function Dt(C,_){let G=C.colorSpace,Y=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==ta&&G!==Ui&&(dt.getTransfer(G)===vt?(Y!==Yn||K!==zn)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",G)),_}function tt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(h.width=C.naturalWidth||C.width,h.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(h.width=C.displayWidth,h.height=C.displayHeight):(h.width=C.width,h.height=C.height),h}this.allocateTextureUnit=ee,this.resetTextureUnits=Q,this.getTextureUnits=te,this.setTextureUnits=X,this.setTexture2D=re,this.setTexture2DArray=ce,this.setTexture3D=pe,this.setTextureCube=de,this.rebindTextures=at,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=He,this.useMultisampledRTT=ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sv(i,e){function t(n,s=Ui){let r,a=dt.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===ol)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Lh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ph)return i.BYTE;if(n===Ih)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===al)return i.INT;if(n===ri)return i.UNSIGNED_INT;if(n===ai)return i.FLOAT;if(n===mi)return i.HALF_FLOAT;if(n===Nh)return i.ALPHA;if(n===Fh)return i.RGB;if(n===Yn)return i.RGBA;if(n===fi)return i.DEPTH_COMPONENT;if(n===as)return i.DEPTH_STENCIL;if(n===Uh)return i.RED;if(n===cl)return i.RED_INTEGER;if(n===os)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===ul)return i.RGBA_INTEGER;if(n===Ea||n===wa||n===Aa||n===Ta)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dl||n===fl||n===pl||n===ml)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gl||n===_l||n===xl||n===yl||n===vl||n===Ca||n===bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gl||n===_l)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===yl)return r.COMPRESSED_R11_EAC;if(n===vl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ca)return r.COMPRESSED_RG11_EAC;if(n===bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ml||n===Sl||n===El||n===wl||n===Al||n===Tl||n===Cl||n===Rl||n===Pl||n===Il||n===Ll||n===Dl||n===Nl||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ml)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===El)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Il)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ll)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ul||n===Ol||n===Bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ul)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ol)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zl||n===kl||n===Ra||n===Vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===zl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,av=`
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

}`,lu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:rv,fragmentShader:av,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new sn(new Is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cu=class extends ii{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,h=null,d=null,f=null,u=null,m=null,v=null,A=typeof XRWebGLBinding<"u",g=new lu,p={},P=t.getContextAttributes(),L=null,E=null,w=[],T=[],I=new Xe,y=null,R=new en;R.viewport=new Ct;let k=new en;k.viewport=new Ct;let D=[R,k],N=new tl,Q=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let Me=w[ie];return Me===void 0&&(Me=new gr,w[ie]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ie){let Me=w[ie];return Me===void 0&&(Me=new gr,w[ie]=Me),Me.getGripSpace()},this.getHand=function(ie){let Me=w[ie];return Me===void 0&&(Me=new gr,w[ie]=Me),Me.getHandSpace()};function X(ie){let Me=T.indexOf(ie.inputSource);if(Me===-1)return;let me=w[Me];me!==void 0&&(me.update(ie.inputSource,ie.frame,h||a),me.dispatchEvent({type:ie.type,data:ie.inputSource}))}function ee(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",J);for(let ie=0;ie<w.length;ie++){let Me=T[ie];Me!==null&&(T[ie]=null,w[ie].disconnect(Me))}Q=null,te=null,g.reset();for(let ie in p)delete p[ie];e.setRenderTarget(L),m=null,u=null,f=null,s=null,E=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(ie){h=ie},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&A&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(L=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",J),P.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(I),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Oe=null,Qe=null;P.depth&&(Qe=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=P.stencil?as:fi,Oe=P.stencil?Sr:ri);let He={colorFormat:t.RGBA8,depthFormat:Qe,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(He),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new Un(u.textureWidth,u.textureHeight,{format:Yn,type:zn,depthTexture:new Fi(u.textureWidth,u.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let me={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Un(m.framebufferWidth,m.framebufferHeight,{format:Yn,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function J(ie){for(let Me=0;Me<ie.removed.length;Me++){let me=ie.removed[Me],Oe=T.indexOf(me);Oe>=0&&(T[Oe]=null,w[Oe].disconnect(me))}for(let Me=0;Me<ie.added.length;Me++){let me=ie.added[Me],Oe=T.indexOf(me);if(Oe===-1){for(let He=0;He<w.length;He++)if(He>=T.length){T.push(me),Oe=He;break}else if(T[He]===null){T[He]=me,Oe=He;break}if(Oe===-1)break}let Qe=w[Oe];Qe&&Qe.connect(me)}}let re=new O,ce=new O;function pe(ie,Me,me){re.setFromMatrixPosition(Me.matrixWorld),ce.setFromMatrixPosition(me.matrixWorld);let Oe=re.distanceTo(ce),Qe=Me.projectionMatrix.elements,He=me.projectionMatrix.elements,gt=Qe[14]/(Qe[10]-1),et=Qe[14]/(Qe[10]+1),rt=(Qe[9]+1)/Qe[5],at=(Qe[9]-1)/Qe[5],Je=(Qe[8]-1)/Qe[0],mt=(He[8]+1)/He[0],bt=gt*Je,It=gt*mt,Mt=Oe/(-Je+mt),ht=Mt*-Je;if(Me.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(ht),ie.translateZ(Mt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Qe[10]===-1)ie.projectionMatrix.copy(Me.projectionMatrix),ie.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{let ct=gt+Mt,z=et+Mt,Dt=bt-ht,tt=It+(Oe-ht),C=rt*et/z*ct,_=at*et/z*ct;ie.projectionMatrix.makePerspective(Dt,tt,C,_,ct,z),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function de(ie,Me){Me===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(Me.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let Me=ie.near,me=ie.far;g.texture!==null&&(g.depthNear>0&&(Me=g.depthNear),g.depthFar>0&&(me=g.depthFar)),N.near=k.near=R.near=Me,N.far=k.far=R.far=me,(Q!==N.near||te!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),Q=N.near,te=N.far),N.layers.mask=ie.layers.mask|6,R.layers.mask=N.layers.mask&-5,k.layers.mask=N.layers.mask&-3;let Oe=ie.parent,Qe=N.cameras;de(N,Oe);for(let He=0;He<Qe.length;He++)de(Qe[He],Oe);Qe.length===2?pe(N,R,k):N.projectionMatrix.copy(R.projectionMatrix),ge(ie,N,Oe)};function ge(ie,Me,me){me===null?ie.matrix.copy(Me.matrixWorld):(ie.matrix.copy(me.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(Me.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(Me.projectionMatrix),ie.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=fr*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(ie){c=ie,u!==null&&(u.fixedFoveation=ie),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(ie){return p[ie]};let Pe=null;function ye(ie,Me){if(d=Me.getViewerPose(h||a),v=Me,d!==null){let me=d.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Oe=!1;me.length!==N.cameras.length&&(N.cameras.length=0,Oe=!0);for(let et=0;et<me.length;et++){let rt=me[et],at=null;if(m!==null)at=m.getViewport(rt);else{let mt=f.getViewSubImage(u,rt);at=mt.viewport,et===0&&(e.setRenderTargetTextures(E,mt.colorTexture,mt.depthStencilTexture),e.setRenderTarget(E))}let Je=D[et];Je===void 0&&(Je=new en,Je.layers.enable(et),Je.viewport=new Ct,D[et]=Je),Je.matrix.fromArray(rt.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(rt.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(at.x,at.y,at.width,at.height),et===0&&(N.matrix.copy(Je.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Oe===!0&&N.cameras.push(Je)}let Qe=s.enabledFeatures;if(Qe&&Qe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&A){f=n.getBinding();let et=f.getDepthInformation(me[0]);et&&et.isValid&&et.texture&&g.init(et,s.renderState)}if(Qe&&Qe.includes("camera-access")&&A){e.state.unbindTexture(),f=n.getBinding();for(let et=0;et<me.length;et++){let rt=me[et].camera;if(rt){let at=p[rt];at||(at=new fa,p[rt]=at);let Je=f.getCameraImage(rt);at.sourceTexture=Je}}}}for(let me=0;me<w.length;me++){let Oe=T[me],Qe=w[me];Oe!==null&&Qe!==void 0&&Qe.update(Oe,Me,h||a)}Pe&&Pe(ie,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),v=null}let qe=new Jf;qe.setAnimationLoop(ye),this.setAnimationLoop=function(ie){Pe=ie},this.dispose=function(){}}},ov=new Ft,np=new it;np.set(-1,0,0,0,1,0,0,0,1);function lv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,kh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,P,L,E){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),d(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&m(g,p,E)):p.isMeshMatcapMaterial?(r(g,p),v(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),A(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,P,L):p.isSpriteMaterial?h(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Mn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Mn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let P=e.get(p),L=P.envMap,E=P.envMapRotation;L&&(g.envMap.value=L,g.envMapRotation.value.setFromMatrix4(ov.makeRotationFromEuler(E)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(np),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,P,L){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*P,g.scale.value=L*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,P){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=P.texture,g.transmissionSamplerSize.value.set(P.width,P.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,p){p.matcap&&(g.matcap.value=p.matcap)}function A(g,p){let P=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(P.matrixWorld),g.nearDistance.value=P.shadow.camera.near,g.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){let T=w.program;n.uniformBlockBinding(E,T)}function h(E,w){let T=s[E.id];T===void 0&&(g(E),T=d(E),s[E.id]=T,E.addEventListener("dispose",P));let I=w.program;n.updateUBOMapping(E,I);let y=e.render.frame;r[E.id]!==y&&(u(E),r[E.id]=y)}function d(E){let w=f();E.__bindingPointIndex=w;let T=i.createBuffer(),I=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,I,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){let w=s[E.id],T=E.uniforms,I=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,R=T.length;y<R;y++){let k=T[y];if(Array.isArray(k))for(let D=0,N=k.length;D<N;D++)m(k[D],y,D,I);else m(k,y,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,w,T,I){if(A(E,w,T,I)===!0){let y=E.__offset,R=E.value;if(Array.isArray(R)){let k=0;for(let D=0;D<R.length;D++){let N=R[D],Q=p(N);v(N,E.__data,k),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(k+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,E.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,E.__data)}}function v(E,w,T){typeof E=="number"||typeof E=="boolean"?w[0]=E:E.isMatrix3?(w[0]=E.elements[0],w[1]=E.elements[1],w[2]=E.elements[2],w[3]=0,w[4]=E.elements[3],w[5]=E.elements[4],w[6]=E.elements[5],w[7]=0,w[8]=E.elements[6],w[9]=E.elements[7],w[10]=E.elements[8],w[11]=0):ArrayBuffer.isView(E)?w.set(new E.constructor(E.buffer,E.byteOffset,w.length)):E.toArray(w,T)}function A(E,w,T,I){let y=E.value,R=w+"_"+T;if(I[R]===void 0)return typeof y=="number"||typeof y=="boolean"?I[R]=y:ArrayBuffer.isView(y)?I[R]=y.slice():I[R]=y.clone(),!0;{let k=I[R];if(typeof y=="number"||typeof y=="boolean"){if(k!==y)return I[R]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(k.equals(y)===!1)return k.copy(y),!0}}return!1}function g(E){let w=E.uniforms,T=0,I=16;for(let R=0,k=w.length;R<k;R++){let D=Array.isArray(w[R])?w[R]:[w[R]];for(let N=0,Q=D.length;N<Q;N++){let te=D[N],X=Array.isArray(te.value)?te.value:[te.value];for(let ee=0,J=X.length;ee<J;ee++){let re=X[ee],ce=p(re),pe=T%I,de=pe%ce.boundary,ge=pe+de;T+=de,ge!==0&&I-ge<ce.storage&&(T+=I-ge),te.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=T,T+=ce.storage}}}let y=T%I;return y>0&&(T+=I-y),E.__size=T,E.__cache={},this}function p(E){let w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(w.boundary=16,w.storage=E.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",E),w}function P(E){let w=E.target;w.removeEventListener("dispose",P);let T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function L(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:h,dispose:L}}var hv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_i=null;function uv(){return _i===null&&(_i=new Uo(hv,16,16,os,mi),_i.name="DFG_LUT",_i.minFilter=tn,_i.magFilter=tn,_i.wrapS=di,_i.wrapT=di,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}var Ar=class{constructor(e={}){let{canvas:t=bf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=zn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let A=m,g=new Set([ul,hl,cl]),p=new Set([zn,ri,Mr,Sr,ol,ll]),P=new Uint32Array(4),L=new Int32Array(4),E=new O,w=null,T=null,I=[],y=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,D=!1,N=null,Q=null,te=null,X=null;this._outputColorSpace=qt;let ee=0,J=0,re=null,ce=-1,pe=null,de=new Ct,ge=new Ct,Pe=null,ye=new ut(0),qe=0,ie=t.width,Me=t.height,me=1,Oe=null,Qe=null,He=new Ct(0,0,ie,Me),gt=new Ct(0,0,ie,Me),et=!1,rt=new ha,at=!1,Je=!1,mt=new Ft,bt=new O,It=new Ct,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ht=!1;function ct(){return re===null?me:1}let z=n;function Dt(b,H){return t.getContext(b,H)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",ln,!1),z===null){let H="webgl2";if(z=Dt(H,b),z===null)throw Dt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Ke("WebGLRenderer: "+b.message),b}let tt,C,_,G,Y,K,_e,ue,B,$,fe,Te,Ee,xe,De,he,Ie,U,be,se,we,Re,ae;function Ne(){tt=new xx(z),tt.init(),we=new sv(z,tt),C=new hx(z,tt,e,we),_=new nv(z,tt),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),Q=z.createFramebuffer(),te=z.createFramebuffer(),X=z.createFramebuffer(),G=new bx(z),Y=new Hy,K=new iv(z,tt,_,Y,C,we,G),_e=new _x(k),ue=new wg(z),Re=new lx(z,ue),B=new yx(z,ue,G,Re),$=new Sx(z,B,ue,Re,G),U=new Mx(z,C,K),De=new ux(Y),fe=new Vy(k,_e,tt,C,Re,De),Te=new lv(k,Y),Ee=new Wy,xe=new Jy(tt),Ie=new ox(k,_e,_,$,v,c),he=new tv(k,$,C),ae=new cv(z,G,C,_),be=new cx(z,tt,G),se=new vx(z,tt,G),G.programs=fe.programs,k.capabilities=C,k.extensions=tt,k.properties=Y,k.renderLists=Ee,k.shadowMap=he,k.state=_,k.info=G}Ne(),A!==zn&&(R=new wx(A,t.width,t.height,o,s,r));let ke=new cu(k,z);this.xr=ke,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let b=tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(b){b!==void 0&&(me=b,this.setSize(ie,Me,!1))},this.getSize=function(b){return b.set(ie,Me)},this.setSize=function(b,H,j=!0){if(ke.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=b,Me=H,t.width=Math.floor(b*me),t.height=Math.floor(H*me),j===!0&&(t.style.width=b+"px",t.style.height=H+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(ie*me,Me*me).floor()},this.setDrawingBufferSize=function(b,H,j){ie=b,Me=H,me=j,t.width=Math.floor(b*j),t.height=Math.floor(H*j),this.setViewport(0,0,b,H)},this.setEffects=function(b){if(A===zn){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let H=0;H<b.length;H++)if(b[H].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(de)},this.getViewport=function(b){return b.copy(He)},this.setViewport=function(b,H,j,Z){b.isVector4?He.set(b.x,b.y,b.z,b.w):He.set(b,H,j,Z),_.viewport(de.copy(He).multiplyScalar(me).round())},this.getScissor=function(b){return b.copy(gt)},this.setScissor=function(b,H,j,Z){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,H,j,Z),_.scissor(ge.copy(gt).multiplyScalar(me).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(b){_.setScissorTest(et=b)},this.setOpaqueSort=function(b){Oe=b},this.setTransparentSort=function(b){Qe=b},this.getClearColor=function(b){return b.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(b=!0,H=!0,j=!0){let Z=0;if(b){let q=!1;if(re!==null){let ve=re.texture.format;q=g.has(ve)}if(q){let ve=re.texture.type,Fe=p.has(ve),Ae=Ie.getClearColor(),Be=Ie.getClearAlpha(),Ge=Ae.r,nt=Ae.g,Ye=Ae.b;Fe?(P[0]=Ge,P[1]=nt,P[2]=Ye,P[3]=Be,z.clearBufferuiv(z.COLOR,0,P)):(L[0]=Ge,L[1]=nt,L[2]=Ye,L[3]=Be,z.clearBufferiv(z.COLOR,0,L))}else Z|=z.COLOR_BUFFER_BIT}H&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),N=b},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),Ie.dispose(),Ee.dispose(),xe.dispose(),Y.dispose(),_e.dispose(),$.dispose(),Re.dispose(),ae.dispose(),fe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",In),ke.removeEventListener("sessionend",Lr),oi.stop()};function St(b){b.preventDefault(),ra("WebGLRenderer: Context Lost."),D=!0}function yt(){ra("WebGLRenderer: Context Restored."),D=!1;let b=G.autoReset,H=he.enabled,j=he.autoUpdate,Z=he.needsUpdate,q=he.type;Ne(),G.autoReset=b,he.enabled=H,he.autoUpdate=j,he.needsUpdate=Z,he.type=q}function ln(b){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Pn(b){let H=b.target;H.removeEventListener("dispose",Pn),$n(H)}function $n(b){Pr(b),Y.remove(b)}function Pr(b){let H=Y.get(b).programs;H!==void 0&&(H.forEach(function(j){fe.releaseProgram(j)}),b.isShaderMaterial&&fe.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,j,Z,q,ve){H===null&&(H=Mt);let Fe=q.isMesh&&q.matrixWorld.determinantAffine()<0,Ae=Bs(b,H,j,Z,q);_.setMaterial(Z,Fe);let Be=j.index,Ge=1;if(Z.wireframe===!0){if(Be=B.getWireframeAttribute(j),Be===void 0)return;Ge=2}let nt=j.drawRange,Ye=j.attributes.position,Ve=nt.start*Ge,$e=(nt.start+nt.count)*Ge;ve!==null&&(Ve=Math.max(Ve,ve.start*Ge),$e=Math.min($e,(ve.start+ve.count)*Ge)),Be!==null?(Ve=Math.max(Ve,0),$e=Math.min($e,Be.count)):Ye!=null&&(Ve=Math.max(Ve,0),$e=Math.min($e,Ye.count));let ft=$e-Ve;if(ft<0||ft===1/0)return;Re.setup(q,Z,Ae,j,Be);let _t,pt=be;if(Be!==null&&(_t=ue.get(Be),pt=se,pt.setIndex(_t)),q.isMesh)Z.wireframe===!0?(_.setLineWidth(Z.wireframeLinewidth*ct()),pt.setMode(z.LINES)):pt.setMode(z.TRIANGLES);else if(q.isLine){let zt=Z.linewidth;zt===void 0&&(zt=1),_.setLineWidth(zt*ct()),q.isLineSegments?pt.setMode(z.LINES):q.isLineLoop?pt.setMode(z.LINE_LOOP):pt.setMode(z.LINE_STRIP)}else q.isPoints?pt.setMode(z.POINTS):q.isSprite&&pt.setMode(z.TRIANGLES);if(q.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))pt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let zt=q._multiDrawStarts,Ue=q._multiDrawCounts,Ot=q._multiDrawCount,We=Be?ue.get(Be).bytesPerElement:1,pn=Y.get(Z).currentProgram.getUniforms();for(let cn=0;cn<Ot;cn++)pn.setValue(z,"_gl_DrawID",cn),pt.render(zt[cn]/We,Ue[cn])}else if(q.isInstancedMesh)pt.renderInstances(Ve,ft,q.count);else if(j.isInstancedBufferGeometry){let zt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ue=Math.min(j.instanceCount,zt);pt.renderInstances(Ve,ft,Ue)}else pt.render(Ve,ft)};function Ir(b,H,j){b.transparent===!0&&b.side===qn&&b.forceSinglePass===!1?(b.side=Mn,b.needsUpdate=!0,wn(b,H,j),b.side=Di,b.needsUpdate=!0,wn(b,H,j),b.side=qn):wn(b,H,j)}this.compile=function(b,H,j=null){j===null&&(j=b),T=xe.get(j),T.init(H),y.push(T),j.traverseVisible(function(q){q.isLight&&q.layers.test(H.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),b!==j&&b.traverseVisible(function(q){q.isLight&&q.layers.test(H.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),T.setupLights();let Z=new Set;return b.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let ve=q.material;if(ve)if(Array.isArray(ve))for(let Fe=0;Fe<ve.length;Fe++){let Ae=ve[Fe];Ir(Ae,j,q),Z.add(Ae)}else Ir(ve,j,q),Z.add(ve)}),T=y.pop(),Z},this.compileAsync=function(b,H,j=null){let Z=this.compile(b,H,j);return new Promise(q=>{function ve(){if(Z.forEach(function(Fe){Y.get(Fe).currentProgram.isReady()&&Z.delete(Fe)}),Z.size===0){q(b);return}setTimeout(ve,10)}tt.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ds=null;function Fa(b){ds&&ds(b)}function In(){oi.stop()}function Lr(){oi.start()}let oi=new Jf;oi.setAnimationLoop(Fa),typeof self<"u"&&oi.setContext(self),this.setAnimationLoop=function(b){ds=b,ke.setAnimationLoop(b),b===null?oi.stop():oi.start()},ke.addEventListener("sessionstart",In),ke.addEventListener("sessionend",Lr),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(b,H);let j=ke.enabled===!0&&ke.isPresenting===!0,Z=R!==null&&(re===null||j)&&R.begin(k,re);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(H),H=ke.getCamera()),b.isScene===!0&&b.onBeforeRender(k,b,H,re),T=xe.get(b,y.length),T.init(H),T.state.textureUnits=K.getTextureUnits(),y.push(T),mt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),rt.setFromProjectionMatrix(mt,ni,H.reversedDepth),Je=this.localClippingEnabled,at=De.init(this.clippingPlanes,Je),w=Ee.get(b,I.length),w.init(),I.push(w),ke.enabled===!0&&ke.isPresenting===!0){let Fe=k.xr.getDepthSensingMesh();Fe!==null&&En(Fe,H,-1/0,k.sortObjects)}En(b,H,0,k.sortObjects),w.finish(),k.sortObjects===!0&&w.sort(Oe,Qe,H.reversedDepth),ht=ke.enabled===!1||ke.isPresenting===!1||ke.hasDepthSensing()===!1,ht&&Ie.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&De.beginShadows();let q=T.state.shadowsArray;if(he.render(q,b,H),at===!0&&De.endShadows(),(Z&&R.hasRenderPass())===!1){let Fe=w.opaque,Ae=w.transmissive;if(T.setupLights(),H.isArrayCamera){let Be=H.cameras;if(Ae.length>0)for(let Ge=0,nt=Be.length;Ge<nt;Ge++){let Ye=Be[Ge];Bi(Fe,Ae,b,Ye)}ht&&Ie.render(b);for(let Ge=0,nt=Be.length;Ge<nt;Ge++){let Ye=Be[Ge];Kt(w,b,Ye,Ye.viewport)}}else Ae.length>0&&Bi(Fe,Ae,b,H),ht&&Ie.render(b),Kt(w,b,H)}re!==null&&J===0&&(K.updateMultisampleRenderTarget(re),K.updateRenderTargetMipmap(re)),Z&&R.end(k),b.isScene===!0&&b.onAfterRender(k,b,H),Re.resetDefaultState(),ce=-1,pe=null,y.pop(),y.length>0?(T=y[y.length-1],K.setTextureUnits(T.state.textureUnits),at===!0&&De.setGlobalState(k.clippingPlanes,T.state.camera)):T=null,I.pop(),I.length>0?w=I[I.length-1]:w=null,N!==null&&N.renderEnd()};function En(b,H,j,Z){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||rt.intersectsSprite(b)){Z&&It.setFromMatrixPosition(b.matrixWorld).applyMatrix4(mt);let Fe=$.update(b),Ae=b.material;Ae.visible&&w.push(b,Fe,Ae,j,It.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||rt.intersectsObject(b))){let Fe=$.update(b),Ae=b.material;if(Z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),It.copy(b.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),It.copy(Fe.boundingSphere.center)),It.applyMatrix4(b.matrixWorld).applyMatrix4(mt)),Array.isArray(Ae)){let Be=Fe.groups;for(let Ge=0,nt=Be.length;Ge<nt;Ge++){let Ye=Be[Ge],Ve=Ae[Ye.materialIndex];Ve&&Ve.visible&&w.push(b,Fe,Ve,j,It.z,Ye)}}else Ae.visible&&w.push(b,Fe,Ae,j,It.z,null)}}let ve=b.children;for(let Fe=0,Ae=ve.length;Fe<Ae;Fe++)En(ve[Fe],H,j,Z)}function Kt(b,H,j,Z){let{opaque:q,transmissive:ve,transparent:Fe}=b;T.setupLightsView(j),at===!0&&De.setGlobalState(k.clippingPlanes,j),Z&&_.viewport(de.copy(Z)),q.length>0&&Vt(q,H,j),ve.length>0&&Vt(ve,H,j),Fe.length>0&&Vt(Fe,H,j),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Bi(b,H,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[Z.id]===void 0){let Ve=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[Z.id]=new Un(1,1,{generateMipmaps:!0,type:Ve?mi:zn,minFilter:rs,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace})}let ve=T.state.transmissionRenderTarget[Z.id],Fe=Z.viewport||de;ve.setSize(Fe.z*k.transmissionResolutionScale,Fe.w*k.transmissionResolutionScale);let Ae=k.getRenderTarget(),Be=k.getActiveCubeFace(),Ge=k.getActiveMipmapLevel();k.setRenderTarget(ve),k.getClearColor(ye),qe=k.getClearAlpha(),qe<1&&k.setClearColor(16777215,.5),k.clear(),ht&&Ie.render(j);let nt=k.toneMapping;k.toneMapping=si;let Ye=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),T.setupLightsView(Z),at===!0&&De.setGlobalState(k.clippingPlanes,Z),Vt(b,j,Z),K.updateMultisampleRenderTarget(ve),K.updateRenderTargetMipmap(ve),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let $e=0,ft=H.length;$e<ft;$e++){let _t=H[$e],{object:pt,geometry:zt,material:Ue,group:Ot}=_t;if(Ue.side===qn&&pt.layers.test(Z.layers)){let We=Ue.side;Ue.side=Mn,Ue.needsUpdate=!0,kn(pt,j,Z,zt,Ue,Ot),Ue.side=We,Ue.needsUpdate=!0,Ve=!0}}Ve===!0&&(K.updateMultisampleRenderTarget(ve),K.updateRenderTargetMipmap(ve))}k.setRenderTarget(Ae,Be,Ge),k.setClearColor(ye,qe),Ye!==void 0&&(Z.viewport=Ye),k.toneMapping=nt}function Vt(b,H,j){let Z=H.isScene===!0?H.overrideMaterial:null;for(let q=0,ve=b.length;q<ve;q++){let Fe=b[q],{object:Ae,geometry:Be,group:Ge}=Fe,nt=Fe.material;nt.allowOverride===!0&&Z!==null&&(nt=Z),Ae.layers.test(j.layers)&&kn(Ae,H,j,Be,nt,Ge)}}function kn(b,H,j,Z,q,ve){b.onBeforeRender(k,H,j,Z,q,ve),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(k,H,j,Z,b,ve),q.transparent===!0&&q.side===qn&&q.forceSinglePass===!1?(q.side=Mn,q.needsUpdate=!0,k.renderBufferDirect(j,H,Z,q,b,ve),q.side=Di,q.needsUpdate=!0,k.renderBufferDirect(j,H,Z,q,b,ve),q.side=qn):k.renderBufferDirect(j,H,Z,q,b,ve),b.onAfterRender(k,H,j,Z,q,ve)}function wn(b,H,j){H.isScene!==!0&&(H=Mt);let Z=Y.get(b),q=T.state.lights,ve=T.state.shadowsArray,Fe=q.state.version,Ae=fe.getParameters(b,q.state,ve,H,j,T.state.lightProbeGridArray),Be=fe.getProgramCacheKey(Ae),Ge=Z.programs;Z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?H.environment:null,Z.fog=H.fog;let nt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;Z.envMap=_e.get(b.envMap||Z.environment,nt),Z.envMapRotation=Z.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,Ge===void 0&&(b.addEventListener("dispose",Pn),Ge=new Map,Z.programs=Ge);let Ye=Ge.get(Be);if(Ye!==void 0){if(Z.currentProgram===Ye&&Z.lightsStateVersion===Fe)return Dr(b,Ae),Ye}else Ae.uniforms=fe.getUniforms(b),N!==null&&b.isNodeMaterial&&N.build(b,j,Ae),b.onBeforeCompile(Ae,k),Ye=fe.acquireProgram(Ae,Be),Ge.set(Be,Ye),Z.uniforms=Ae.uniforms;let Ve=Z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ve.clippingPlanes=De.uniform),Dr(b,Ae),Z.needsLights=Zn(b),Z.lightsStateVersion=Fe,Z.needsLights&&(Ve.ambientLightColor.value=q.state.ambient,Ve.lightProbe.value=q.state.probe,Ve.directionalLights.value=q.state.directional,Ve.directionalLightShadows.value=q.state.directionalShadow,Ve.spotLights.value=q.state.spot,Ve.spotLightShadows.value=q.state.spotShadow,Ve.rectAreaLights.value=q.state.rectArea,Ve.ltc_1.value=q.state.rectAreaLTC1,Ve.ltc_2.value=q.state.rectAreaLTC2,Ve.pointLights.value=q.state.point,Ve.pointLightShadows.value=q.state.pointShadow,Ve.hemisphereLights.value=q.state.hemi,Ve.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ve.spotLightMatrix.value=q.state.spotLightMatrix,Ve.spotLightMap.value=q.state.spotLightMap,Ve.pointShadowMatrix.value=q.state.pointShadowMatrix),Z.lightProbeGrid=T.state.lightProbeGridArray.length>0,Z.currentProgram=Ye,Z.uniformsList=null,Ye}function fn(b){if(b.uniformsList===null){let H=b.currentProgram.getUniforms();b.uniformsList=wr.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Dr(b,H){let j=Y.get(b);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function fs(b,H){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;E.setFromMatrixPosition(H.matrixWorld);for(let j=0,Z=b.length;j<Z;j++){let q=b[j];if(q.texture!==null&&q.boundingBox.containsPoint(E))return q}return null}function Bs(b,H,j,Z,q){H.isScene!==!0&&(H=Mt),K.resetTextureUnits();let ve=H.fog,Fe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?H.environment:null,Ae=re===null?k.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:dt.workingColorSpace,Be=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ge=_e.get(Z.envMap||Fe,Be),nt=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ye=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ve=!!j.morphAttributes.position,$e=!!j.morphAttributes.normal,ft=!!j.morphAttributes.color,_t=si;Z.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(_t=k.toneMapping);let pt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,zt=pt!==void 0?pt.length:0,Ue=Y.get(Z),Ot=T.state.lights;if(at===!0&&(Je===!0||b!==pe)){let Et=b===pe&&Z.id===ce;De.setState(Z,b,Et)}let We=!1;Z.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Ot.state.version||Ue.outputColorSpace!==Ae||q.isBatchedMesh&&Ue.batching===!1||!q.isBatchedMesh&&Ue.batching===!0||q.isBatchedMesh&&Ue.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ue.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ue.instancing===!1||!q.isInstancedMesh&&Ue.instancing===!0||q.isSkinnedMesh&&Ue.skinning===!1||!q.isSkinnedMesh&&Ue.skinning===!0||q.isInstancedMesh&&Ue.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ue.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ue.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ue.instancingMorph===!1&&q.morphTexture!==null||Ue.envMap!==Ge||Z.fog===!0&&Ue.fog!==ve||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==De.numPlanes||Ue.numIntersection!==De.numIntersection)||Ue.vertexAlphas!==nt||Ue.vertexTangents!==Ye||Ue.morphTargets!==Ve||Ue.morphNormals!==$e||Ue.morphColors!==ft||Ue.toneMapping!==_t||Ue.morphTargetsCount!==zt||!!Ue.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(We=!0):(We=!0,Ue.__version=Z.version);let pn=Ue.currentProgram;We===!0&&(pn=wn(Z,H,q),N&&Z.isNodeMaterial&&N.onUpdateProgram(Z,pn,Ue));let cn=!1,mn=!1,li=!1,xt=pn.getUniforms(),Lt=Ue.uniforms;if(_.useProgram(pn.program)&&(cn=!0,mn=!0,li=!0),Z.id!==ce&&(ce=Z.id,mn=!0),Ue.needsLights){let Et=fs(T.state.lightProbeGridArray,q);Ue.lightProbeGrid!==Et&&(Ue.lightProbeGrid=Et,mn=!0)}if(cn||pe!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),xt.setValue(z,"projectionMatrix",b.projectionMatrix),xt.setValue(z,"viewMatrix",b.matrixWorldInverse);let jn=xt.map.cameraPosition;jn!==void 0&&jn.setValue(z,bt.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&xt.setValue(z,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&xt.setValue(z,"isOrthographic",b.isOrthographicCamera===!0),pe!==b&&(pe=b,mn=!0,li=!0)}if(Ue.needsLights&&(Ot.state.directionalShadowMap.length>0&&xt.setValue(z,"directionalShadowMap",Ot.state.directionalShadowMap,K),Ot.state.spotShadowMap.length>0&&xt.setValue(z,"spotShadowMap",Ot.state.spotShadowMap,K),Ot.state.pointShadowMap.length>0&&xt.setValue(z,"pointShadowMap",Ot.state.pointShadowMap,K)),q.isSkinnedMesh){xt.setOptional(z,q,"bindMatrix"),xt.setOptional(z,q,"bindMatrixInverse");let Et=q.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),xt.setValue(z,"boneTexture",Et.boneTexture,K))}q.isBatchedMesh&&(xt.setOptional(z,q,"batchingTexture"),xt.setValue(z,"batchingTexture",q._matricesTexture,K),xt.setOptional(z,q,"batchingIdTexture"),xt.setValue(z,"batchingIdTexture",q._indirectTexture,K),xt.setOptional(z,q,"batchingColorTexture"),q._colorsTexture!==null&&xt.setValue(z,"batchingColorTexture",q._colorsTexture,K));let Jn=j.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&U.update(q,j,pn),(mn||Ue.receiveShadow!==q.receiveShadow)&&(Ue.receiveShadow=q.receiveShadow,xt.setValue(z,"receiveShadow",q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&H.environment!==null&&(Lt.envMapIntensity.value=H.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=uv()),mn){if(xt.setValue(z,"toneMappingExposure",k.toneMappingExposure),Ue.needsLights&&zs(Lt,li),ve&&Z.fog===!0&&Te.refreshFogUniforms(Lt,ve),Te.refreshMaterialUniforms(Lt,Z,me,Me,T.state.transmissionRenderTarget[b.id]),Ue.needsLights&&Ue.lightProbeGrid){let Et=Ue.lightProbeGrid;Lt.probesSH.value=Et.texture,Lt.probesMin.value.copy(Et.boundingBox.min),Lt.probesMax.value.copy(Et.boundingBox.max),Lt.probesResolution.value.copy(Et.resolution)}wr.upload(z,fn(Ue),Lt,K)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(wr.upload(z,fn(Ue),Lt,K),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&xt.setValue(z,"center",q.center),xt.setValue(z,"modelViewMatrix",q.modelViewMatrix),xt.setValue(z,"normalMatrix",q.normalMatrix),xt.setValue(z,"modelMatrix",q.matrixWorld),Z.uniformsGroups!==void 0){let Et=Z.uniformsGroups;for(let jn=0,zi=Et.length;jn<zi;jn++){let Ht=Et[jn];ae.update(Ht,pn),ae.bind(Ht,pn)}}return pn}function zs(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function Zn(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(b,H,j){let Z=Y.get(b);Z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Y.get(b.texture).__webglTexture=H,Y.get(b.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,H){let j=Y.get(b);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,j=0){re=b,ee=H,J=j;let Z=null,q=!1,ve=!1;if(b){let Ae=Y.get(b);if(Ae.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,Ae.__webglFramebuffer),de.copy(b.viewport),ge.copy(b.scissor),Pe=b.scissorTest,_.viewport(de),_.scissor(ge),_.setScissorTest(Pe),ce=-1;return}else if(Ae.__webglFramebuffer===void 0)K.setupRenderTarget(b);else if(Ae.__hasExternalTextures)K.rebindTextures(b,Y.get(b.texture).__webglTexture,Y.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let nt=b.depthTexture;if(Ae.__boundDepthTexture!==nt){if(nt!==null&&Y.has(nt)&&(b.width!==nt.image.width||b.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(b)}}let Be=b.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ve=!0);let Ge=Y.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[H])?Z=Ge[H][j]:Z=Ge[H],q=!0):b.samples>0&&K.useMultisampledRTT(b)===!1?Z=Y.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?Z=Ge[j]:Z=Ge,de.copy(b.viewport),ge.copy(b.scissor),Pe=b.scissorTest}else de.copy(He).multiplyScalar(me).floor(),ge.copy(gt).multiplyScalar(me).floor(),Pe=et;if(j!==0&&(Z=Q),_.bindFramebuffer(z.FRAMEBUFFER,Z)&&_.drawBuffers(b,Z),_.viewport(de),_.scissor(ge),_.setScissorTest(Pe),q){let Ae=Y.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ae.__webglTexture,j)}else if(ve){let Ae=H;for(let Be=0;Be<b.textures.length;Be++){let Ge=Y.get(b.textures[Be]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Be,Ge.__webglTexture,j,Ae)}}else if(b!==null&&j!==0){let Ae=Y.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ae.__webglTexture,j)}ce=-1},this.readRenderTargetPixels=function(b,H,j,Z,q,ve,Fe,Ae=0){if(!(b&&b.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Fe!==void 0&&(Be=Be[Fe]),Be){_.bindFramebuffer(z.FRAMEBUFFER,Be);try{let Ge=b.textures[Ae],nt=Ge.format,Ye=Ge.type;if(b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ae),!C.textureFormatReadable(nt)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Ye)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-Z&&j>=0&&j<=b.height-q&&z.readPixels(H,j,Z,q,we.convert(nt),we.convert(Ye),ve)}finally{let Ge=re!==null?Y.get(re).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(b,H,j,Z,q,ve,Fe,Ae=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Fe!==void 0&&(Be=Be[Fe]),Be)if(H>=0&&H<=b.width-Z&&j>=0&&j<=b.height-q){_.bindFramebuffer(z.FRAMEBUFFER,Be);let Ge=b.textures[Ae],nt=Ge.format,Ye=Ge.type;if(b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ae),!C.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ve=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ve),z.bufferData(z.PIXEL_PACK_BUFFER,ve.byteLength,z.STREAM_READ),z.readPixels(H,j,Z,q,we.convert(nt),we.convert(Ye),0);let $e=re!==null?Y.get(re).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,$e);let ft=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Sf(z,ft,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ve),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ve),z.deleteBuffer(Ve),z.deleteSync(ft),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,H=null,j=0){let Z=Math.pow(2,-j),q=Math.floor(b.image.width*Z),ve=Math.floor(b.image.height*Z),Fe=H!==null?H.x:0,Ae=H!==null?H.y:0;K.setTexture2D(b,0),z.copyTexSubImage2D(z.TEXTURE_2D,j,0,0,Fe,Ae,q,ve),_.unbindTexture()},this.copyTextureToTexture=function(b,H,j=null,Z=null,q=0,ve=0){let Fe,Ae,Be,Ge,nt,Ye,Ve,$e,ft,_t=b.isCompressedTexture?b.mipmaps[ve]:b.image;if(j!==null)Fe=j.max.x-j.min.x,Ae=j.max.y-j.min.y,Be=j.isBox3?j.max.z-j.min.z:1,Ge=j.min.x,nt=j.min.y,Ye=j.isBox3?j.min.z:0;else{let Lt=Math.pow(2,-q);Fe=Math.floor(_t.width*Lt),Ae=Math.floor(_t.height*Lt),b.isDataArrayTexture?Be=_t.depth:b.isData3DTexture?Be=Math.floor(_t.depth*Lt):Be=1,Ge=0,nt=0,Ye=0}Z!==null?(Ve=Z.x,$e=Z.y,ft=Z.z):(Ve=0,$e=0,ft=0);let pt=we.convert(H.format),zt=we.convert(H.type),Ue;H.isData3DTexture?(K.setTexture3D(H,0),Ue=z.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(K.setTexture2DArray(H,0),Ue=z.TEXTURE_2D_ARRAY):(K.setTexture2D(H,0),Ue=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,H.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,H.unpackAlignment);let Ot=_.getParameter(z.UNPACK_ROW_LENGTH),We=_.getParameter(z.UNPACK_IMAGE_HEIGHT),pn=_.getParameter(z.UNPACK_SKIP_PIXELS),cn=_.getParameter(z.UNPACK_SKIP_ROWS),mn=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,_t.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,_t.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Ge),_.pixelStorei(z.UNPACK_SKIP_ROWS,nt),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Ye);let li=b.isDataArrayTexture||b.isData3DTexture,xt=H.isDataArrayTexture||H.isData3DTexture;if(b.isDepthTexture){let Lt=Y.get(b),Jn=Y.get(H),Et=Y.get(Lt.__renderTarget),jn=Y.get(Jn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,Et.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let zi=0;zi<Be;zi++)li&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(b).__webglTexture,q,Ye+zi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(H).__webglTexture,ve,ft+zi)),z.blitFramebuffer(Ge,nt,Fe,Ae,Ve,$e,Fe,Ae,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(q!==0||b.isRenderTargetTexture||Y.has(b)){let Lt=Y.get(b),Jn=Y.get(H);_.bindFramebuffer(z.READ_FRAMEBUFFER,te),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,X);for(let Et=0;Et<Be;Et++)li?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Lt.__webglTexture,q,Ye+Et):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Lt.__webglTexture,q),xt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Jn.__webglTexture,ve,ft+Et):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Jn.__webglTexture,ve),q!==0?z.blitFramebuffer(Ge,nt,Fe,Ae,Ve,$e,Fe,Ae,z.COLOR_BUFFER_BIT,z.NEAREST):xt?z.copyTexSubImage3D(Ue,ve,Ve,$e,ft+Et,Ge,nt,Fe,Ae):z.copyTexSubImage2D(Ue,ve,Ve,$e,Ge,nt,Fe,Ae);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else xt?b.isDataTexture||b.isData3DTexture?z.texSubImage3D(Ue,ve,Ve,$e,ft,Fe,Ae,Be,pt,zt,_t.data):H.isCompressedArrayTexture?z.compressedTexSubImage3D(Ue,ve,Ve,$e,ft,Fe,Ae,Be,pt,_t.data):z.texSubImage3D(Ue,ve,Ve,$e,ft,Fe,Ae,Be,pt,zt,_t):b.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,ve,Ve,$e,Fe,Ae,pt,zt,_t.data):b.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,ve,Ve,$e,_t.width,_t.height,pt,_t.data):z.texSubImage2D(z.TEXTURE_2D,ve,Ve,$e,Fe,Ae,pt,zt,_t);_.pixelStorei(z.UNPACK_ROW_LENGTH,Ot),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,We),_.pixelStorei(z.UNPACK_SKIP_PIXELS,pn),_.pixelStorei(z.UNPACK_SKIP_ROWS,cn),_.pixelStorei(z.UNPACK_SKIP_IMAGES,mn),ve===0&&H.generateMipmaps&&z.generateMipmap(Ue),_.unbindTexture()},this.initRenderTarget=function(b){Y.get(b).__webglFramebuffer===void 0&&K.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?K.setTextureCube(b,0):b.isData3DTexture?K.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?K.setTexture2DArray(b,0):K.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){ee=0,J=0,re=null,_.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};var ip=new vn,Jl=new O,Cr=class extends _a{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new kt(e,3)),this.setAttribute("uv",new kt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ts(t,6,1);return this.setAttribute("instanceStart",new On(n,3,0)),this.setAttribute("instanceEnd",new On(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ts(t,6,1);return this.setAttribute("instanceColorStart",new On(n,3,0)),this.setAttribute("instanceColorEnd",new On(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new pa(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ip.setFromBufferAttribute(t),this.boundingBox.union(ip))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jl)),Jl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Jl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Le.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Xe},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Sn.line={uniforms:Pa.merge([Le.common,Le.fog,Le.line]),vertexShader:`
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
		`};var Rr=class extends bn{constructor(e){super({type:"LineMaterial",uniforms:Pa.clone(Sn.line.uniforms),vertexShader:Sn.line.vertexShader,fragmentShader:Sn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var uu=new Ct,sp=new O,rp=new O,rn=new Ct,an=new Ct,xi=new Ct,du=new O,fu=new Ft,on=new ya,ap=new O,jl=new vn,Kl=new Cn,yi=new Ct,vi,Us;function op(i,e,t){return yi.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),yi.multiplyScalar(1/yi.w),yi.x=Us/t.width,yi.y=Us/t.height,yi.applyMatrix4(i.projectionMatrixInverse),yi.multiplyScalar(1/yi.w),Math.abs(Math.max(yi.x,yi.y))}function dv(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,c=a;o<c;o++){on.start.fromBufferAttribute(s,o),on.end.fromBufferAttribute(r,o),on.applyMatrix4(t);let h=new O,d=new O;vi.distanceSqToSegment(on.start,on.end,d,h),d.distanceTo(h)<Us*.5&&e.push({point:d,pointOnLine:h,distance:vi.origin.distanceTo(d),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function fv(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,c=o.attributes.instanceStart,h=o.attributes.instanceEnd,d=Math.min(o.instanceCount,c.count),f=-e.near;vi.at(1,xi),xi.w=1,xi.applyMatrix4(e.matrixWorldInverse),xi.applyMatrix4(n),xi.multiplyScalar(1/xi.w),xi.x*=r.x/2,xi.y*=r.y/2,xi.z=0,du.copy(xi),fu.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,m=d;u<m;u++){if(rn.fromBufferAttribute(c,u),an.fromBufferAttribute(h,u),rn.w=1,an.w=1,rn.applyMatrix4(fu),an.applyMatrix4(fu),rn.z>f&&an.z>f)continue;if(rn.z>f){let L=rn.z-an.z,E=(rn.z-f)/L;rn.lerp(an,E)}else if(an.z>f){let L=an.z-rn.z,E=(an.z-f)/L;an.lerp(rn,E)}rn.applyMatrix4(n),an.applyMatrix4(n),rn.multiplyScalar(1/rn.w),an.multiplyScalar(1/an.w),rn.x*=r.x/2,rn.y*=r.y/2,an.x*=r.x/2,an.y*=r.y/2,on.start.copy(rn),on.start.z=0,on.end.copy(an),on.end.z=0;let A=on.closestPointToPointParameter(du,!0);on.at(A,ap);let g=gi.lerp(rn.z,an.z,A),p=g>=-1&&g<=1,P=du.distanceTo(ap)<Us*.5;if(p&&P){on.start.fromBufferAttribute(c,u),on.end.fromBufferAttribute(h,u),on.start.applyMatrix4(a),on.end.applyMatrix4(a);let L=new O,E=new O;vi.distanceSqToSegment(on.start,on.end,E,L),t.push({point:E,pointOnLine:L,distance:vi.origin.distanceTo(E),object:i,face:null,faceIndex:u,uv:null,uv1:null})}}}var Ql=class extends sn{constructor(e=new Cr,t=new Rr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,c=t.count;a<c;a++,o+=2)sp.fromBufferAttribute(t,a),rp.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+sp.distanceTo(rp);let r=new ts(s,2,1);return e.setAttribute("instanceDistanceStart",new On(r,1,0)),e.setAttribute("instanceDistanceEnd",new On(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;vi=e.ray;let a=this.matrixWorld,o=this.geometry,c=this.material;Us=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Kl.copy(o.boundingSphere).applyMatrix4(a);let h;if(n)h=Us*.5;else{let f=Math.max(s.near,Kl.distanceToPoint(vi.origin));h=op(s,f,c.resolution)}if(Kl.radius+=h,vi.intersectsSphere(Kl)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),jl.copy(o.boundingBox).applyMatrix4(a);let d;if(n)d=Us*.5;else{let f=Math.max(s.near,jl.distanceToPoint(vi.origin));d=op(s,f,c.resolution)}jl.expandByScalar(d),vi.intersectsBox(jl)!==!1&&(n?dv(this,t):fv(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(uu),this.material.uniforms.resolution.value.set(uu.z,uu.w))}};function lp(i){let[e,t]=i.fixed_range.map(Number),n=t-e;if(!Number.isFinite(n)||n<=0)return[];if(i.scale_type==="log"&&n>=1){let d=Math.max(1,Math.ceil(n/6)),f=[];for(let u=Math.ceil(e);u<=t;u+=d)f.push(10**u);if(f.length>=3)return f;f.length=0;for(let u=Math.floor(e);u<=t;u+=1)for(let m of[1,2,5]){let v=u+Math.log10(m);v>=e&&v<=t&&f.push(Number((m*10**u).toPrecision(12)))}return f}let s=i.scale_type==="log"?10**e:e,r=i.scale_type==="log"?10**t:t,a=(r-s)/5,o=10**Math.floor(Math.log10(a)),c=[1,2,5,10].find(d=>d*o>=a)*o;Math.floor(r/c)-Math.ceil(s/c)<2&&(c/=2);let h=[];for(let d=Math.ceil(s/c);d<=Math.floor(r/c);d+=1)h.push(Number((d*c).toPrecision(12)));return h}var cp=i=>String(i??"").trim().replace(/\s+/g," ").toLowerCase();function hp(i,e,t=40){let n=cp(e);if(!n)return{groups:[],totalGroupCount:0};let s=new Map,r=new Set;for(let a of i){let o=a.base_model_name||a.name;s.has(o)||s.set(o,[]),s.get(o).push(a),[a.name,o,a.creator,a.reasoning_level_label,a.tier].some(c=>cp(c).includes(n))&&r.add(o)}return{totalGroupCount:r.size,groups:[...r].slice(0,t).map(a=>({baseModelName:a,models:s.get(a)}))}}function pu(i,e){return(i.reasoning_level_sort_order??0)-(e.reasoning_level_sort_order??0)||String(i.name).localeCompare(String(e.name))}function up(i,e){return!Number.isFinite(i)||!Number.isFinite(e)||e===0?null:(i-e)/Math.abs(e)*100}function Na(i,e){return String(i).trim()===""||!Number.isFinite(Number(i))?e:Math.min(4,Math.max(.25,Number(i)))}function Wt(i,e=3){return Number.isFinite(i)?Number(i.toPrecision(e)).toString():"\u672A\u8BB0\u5F55"}function dp(i,e,t){let n=[];return t.map(s=>{if(!s.visible||s.width>i||s.height>e)return{id:s.id,hidden:!0};let r=Math.max(0,Math.min(i-s.width,s.x));for(let a=0;a<=Math.ceil(e/(s.height+2))*2;a+=1){let o=Math.ceil(a/2)*(a%2?1:-1)*(s.height+2),c=Math.max(0,Math.min(e-s.height,s.y+o));if(!n.some(h=>r<h.right+2&&r+s.width+2>h.x&&c<h.bottom+2&&c+s.height+2>h.y))return n.push({x:r,y:c,right:r+s.width,bottom:c+s.height}),{id:s.id,hidden:!1,x:r,y:c}}return{id:s.id,hidden:!0}})}function fp(i){let e=i.axes,t=c=>{let h=c.labels.find(d=>d.isTitle);return h?Math.max(h.width,h.height)/Math.max(1,Math.hypot(c.projectedEnd.x-c.projectedStart.x,c.projectedEnd.y-c.projectedStart.y)):0},n=e.slice().sort((c,h)=>t(h)-t(c)),s=new Set(e.flatMap(c=>c.labels.filter(h=>h.isTitle).map(h=>h.id))),r=[n,e,e.slice().reverse(),[e[1],e[2],e[0]],[e[2],e[0],e[1]],[e[0],e[2],e[1]],[e[1],e[0],e[2]]],a=[],o=-1;for(let c of r){let h=pv(i,c.filter(Boolean)),d=h.filter(f=>s.has(f.id)&&!f.hidden).length;if(d>o&&(a=h,o=d),d===s.size)return h}return a}function pv({canvasWidth:i,canvasHeight:e,projectedCenter:t,axes:n},s){let r=[],a=[],o=(u,m)=>u.x*m.x+u.y*m.y,c=(u,m)=>({x:u.x-m.x,y:u.y-m.y}),h=(u,m)=>({x:u.x*m,y:u.y*m}),d=u=>({x:-u.y,y:u.x}),f=(u,m)=>u.directions.reduce((v,A,g)=>v+Math.abs(o(A,m))*u.halfSizes[g],0);for(let u of[!0,!1])for(let{projectedStart:m,projectedEnd:v,labels:A}of u?s:n){let g=c(v,m),p=Math.hypot(g.x,g.y),P=p?h(g,1/p):{x:1,y:0},L=d(P),E={x:(m.x+v.x)/2,y:(m.y+v.y)/2};o(L,c(E,t))<0&&(L=h(L,-1));let w=Math.atan2(g.y,g.x)*180/Math.PI;w>90&&(w-=180),w<-90&&(w+=180);for(let T of A.filter(I=>I.isTitle===u)){let I=T.isTitle?w:0,y={id:T.id,hidden:!0,rotationDegrees:I};if(a.push(y),T.projectedDepth<-1||T.projectedDepth>1||p<1)continue;let R=I*Math.PI/180,k=(Math.abs(Math.cos(R))*T.width+Math.abs(Math.sin(R))*T.height)/2,D=(Math.abs(Math.sin(R))*T.width+Math.abs(Math.cos(R))*T.height)/2,N=T.isTitle?P:{x:1,y:0},Q={directions:[N,d(N)],halfSizes:[T.width/2,T.height/2]},te=o(c(T.anchor,m),g)/(p*p);for(let X of T.isTitle?[48,24,-48,-24,0,40,-40,32,-32,16,-16,8,-8,36,-36,12,-12]:[16,-16,8,-8,0]){let ee=T.isTitle?0:te,J=T.isTitle?1:te;for(let[pe,de,ge]of[["x",i,k],["y",e,D]]){let Pe=Math.max(0,ge+2-L[pe]*X),ye=Math.min(de,de-ge-2-L[pe]*X),qe=g[pe];if(Math.abs(qe)<1e-8)(m[pe]<Pe||m[pe]>ye)&&(J=-1);else{let ie=(Pe-m[pe])/qe,Me=(ye-m[pe])/qe;ee=Math.max(ee,Math.min(ie,Me)),J=Math.min(J,Math.max(ie,Me))}Pe>ye&&(J=-1)}if(ee>J)continue;let ce=[Math.max(ee,Math.min(te,J)),ee,J,...Array.from({length:7},(pe,de)=>ee+(J-ee)*(de+1)/8)];for(let pe of T.isTitle?ce:[te]){let de={x:m.x+g.x*pe+L.x*X,y:m.y+g.y*pe+L.y*X};if(!r.some(ge=>![...Q.directions,...ge.directions].some(Pe=>Math.abs(o(c(de,ge.center),Pe))>=f(Q,Pe)+f(ge,Pe)+2))){Object.assign(y,{hidden:!1,...de}),r.push({...Q,center:de});break}}if(!y.hidden)break}}}return a}function pp(i){if(i.schema_version==="frontier_3d_visualization_dataset/v2")return i;if(!["frontier_3d_browser_projection/v1","frontier_3d_visualization_dataset/v3","frontier_3d_browser_projection/v2","frontier_3d_visualization_dataset/v4"].includes(i.schema_version))throw new Error("\u4E0D\u652F\u6301\u7684 Frontier 3D \u6570\u636E\u5951\u7EA6\u7248\u672C");let e=["name","model_uuid","creator","base_model_name","lineage_family_key","reasoning_level_label","reasoning_level_sort_order"],t=r=>{let a=r.model_index;if(!Number.isInteger(a)||a<0||a>=i.models.length)throw new Error(`model_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let{identity_resolution:o,...c}=i.models[a];return c},n=({model_index:r,analysis_eligibility_index:a,excluded_model_explanation_index:o,...c})=>{if(a!==void 0){if(!Number.isInteger(a)||a<0||a>=(i.analysis_eligibility_definitions?.length||0))throw new Error(`analysis_eligibility_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let h=i.analysis_eligibility_definitions[a];c.analysis_eligibility={...h},Array.isArray(h.ineligibility_reason_codes)&&(c.analysis_eligibility.ineligibility_reason_codes=[...h.ineligibility_reason_codes])}if(o!==void 0){if(!Number.isInteger(o)||o<0||o>=(i.excluded_model_explanation_definitions?.length||0))throw new Error(`excluded_model_explanation_index \u5F15\u7528\u8D8A\u754C\uFF1A${o}`);let h=i.excluded_model_explanation_definitions[o];Object.assign(c,h,{missing_dimension_names:[...h.missing_dimension_names]})}return c},s=Object.fromEntries(Object.entries(i.metric_variants).map(([r,a])=>[r,{...a,model_analysis_records:a.model_analysis_records?.map(o=>({...t(o),...n(o),model_index:o.model_index})),three_dimensional_scene:{...a.three_dimensional_scene,displayed_model_markers:a.three_dimensional_scene.displayed_model_markers.map(o=>{let c=t(o),h=i.organization_identity_metadata_by_creator_name?.[c.creator]||{};return{...Object.fromEntries(["creator_uuid","organization_identity_key","country_region_category"].filter(d=>d in h).map(d=>[d,h[d]])),...c,x:c.panel?.[a.interaction_relationships?.cost_axis_field],y:c.panel?.[a.interaction_relationships?.speed_axis_field],z:c.panel?.intelligence,...n(o),panel:{...c.panel,...o.panel}}})},excluded_models_with_drop_reason:(a.excluded_models_with_drop_reason||[]).map(o=>{let c=t(o);return{name:c.name,creator:c.creator,model_uuid:c.model_uuid,...Object.fromEntries(["base_model_name","tier","reasoning_level_label","reasoning_level_sort_order"].filter(h=>h in c).map(h=>[h,c[h]])),intelligence:c.panel?.intelligence,release_date:c.panel?.release_date==="?"?null:c.panel?.release_date,...n(o)}}),interaction_relationships:{...a.interaction_relationships,lineages:Object.fromEntries(Object.entries(a.interaction_relationships?.lineages||{}).map(([o,c])=>[o,c.map(h=>{let d=t(h);return{...Object.fromEntries(e.filter(f=>f in d).map(f=>[f,d[f]])),...n(h)}})]))}}]));return{...i,metric_variants:s}}var gu="#frontier-view-state-v1=",mv=/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i,gv=/^(effective|blended)__(effective|raw|tasks_per_hour)$/,mu=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t,Os=i=>typeof i=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(i)&&Number.isFinite(Date.parse(i))&&new Date(i).toISOString().slice(0,10)===i;function mp(i){if(!i||i.version!==1||typeof i!="object"||Array.isArray(i))return null;let e={version:1};typeof i.metric_variant_key=="string"&&gv.test(i.metric_variant_key)&&(e.metric_variant_key=i.metric_variant_key);for(let[a,o]of[["pinned_model_uuids",c=>mv.test(c)],["hidden_organization_identity_keys",c=>c.length>0&&c.length<=200]])Array.isArray(i[a])&&(e[a]=[...new Set(i[a].filter(c=>typeof c=="string"&&o(c)).slice(0,1024))]);["trend_residual","intelligence_uplift","frontier_distance","weighted_exclusive_hypervolume"].includes(i.standout_metric)&&(e.standout_metric=i.standout_metric);let t=i.standout_axis_weights;t&&["intelligence","cost","speed"].every(a=>mu(t[a],.25,4))&&(e.standout_axis_weights=Object.fromEntries(["intelligence","cost","speed"].map(a=>[a,t[a]])));let n=i.display;if(n&&typeof n=="object"){e.display={};for(let a of["measured_only","comparable_only","recent_release_grace_period","country_region_markers","achievable_frontier_surface","pinned_comparison_expanded"])typeof n[a]=="boolean"&&(e.display[a]=n[a]);Array.isArray(n.pinned_comparison_optional_fields)&&(e.display.pinned_comparison_optional_fields=[...new Set(n.pinned_comparison_optional_fields.filter(a=>["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"].includes(a)))]),["wireframe","solid","hidden"].includes(n.frontier_style)&&(e.display.frontier_style=n.frontier_style),mu(n.marker_size_multiplier,.5,1.5)&&(e.display.marker_size_multiplier=n.marker_size_multiplier),["off","0.5","1"].includes(n.sensitivity_intelligence_half_width)&&(e.display.sensitivity_intelligence_half_width=n.sensitivity_intelligence_half_width)}let s=i.camera,r=a=>Array.isArray(a)&&a.length===3&&a.every(o=>mu(o,-1e6,1e6));return s&&[s.position,s.target,s.up].every(r)&&Math.hypot(...s.up)>1e-6&&Math.hypot(...s.position.map((a,o)=>a-s.target[o]))>1e-6&&(e.camera={position:[...s.position],target:[...s.target],up:[...s.up]}),i.date_filter&&(i.date_filter.cutoff_date===null||Os(i.date_filter.cutoff_date))&&["fade","hide"].includes(i.date_filter.mode)&&(e.date_filter={cutoff_date:i.date_filter.cutoff_date,mode:i.date_filter.mode}),i.table&&typeof i.table=="object"&&(e.table={},["chart","table"].includes(i.table.active_tab)&&(e.table.active_tab=i.table.active_tab),cs.some(a=>a.key===i.table.sort_field)&&(e.table.sort_field=i.table.sort_field),["asc","desc"].includes(i.table.sort_direction)&&(e.table.sort_direction=i.table.sort_direction),typeof i.table.search_text=="string"&&(e.table.search_text=i.table.search_text.slice(0,256)),["all","eligible","ineligible","displayed","excluded"].includes(i.table.analysis_filter)&&(e.table.analysis_filter=i.table.analysis_filter)),e}function xu(i){let e=mp(i);if(!e)throw new Error("\u89C6\u56FE\u72B6\u6001\u7248\u672C\u65E0\u6548");return gu+encodeURIComponent(JSON.stringify(e))}function ec(i){if(!i)return{state:null,reason:null};if(!i.startsWith(gu))return{state:null,reason:i.startsWith("#frontier-view-state-")?"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002":null};try{if(i.length>131072)throw new Error;let e=mp(JSON.parse(decodeURIComponent(i.slice(gu.length))));return{state:e,reason:e?null:"\u5206\u4EAB\u72B6\u6001\u7248\u672C\u4E0D\u652F\u6301\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}catch{return{state:null,reason:"\u5206\u4EAB\u72B6\u6001\u65E0\u6CD5\u89E3\u6790\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u89C6\u56FE\u3002"}}}function hs(i,e={}){if(e.measured_only&&i.intelligence_measurement_status!=="measured")return{visible:!1,faded:!1,reason:"\u667A\u80FD\u5206\u672A\u7ECF\u6838\u9A8C\u4E3A\u5B9E\u6D4B"};let t=i.panel?.release_date,n=Os(e.cutoff_date)&&Os(t)&&t>e.cutoff_date;return{visible:!(n&&e.date_mode==="hide"),faded:!!(n&&e.date_mode==="fade"),reason:n?"\u665A\u4E8E\u6240\u9009\u53D1\u5E03\u65E5\u671F":null}}var yu=i=>({measured:"\u5B9E\u6D4B",estimated:"\u4F30\u7B97",unknown:"\u672A\u77E5"})[i]||"\u672A\u77E5";function tc(i,e){return i?.is_pareto_robust==null?"\u4E0D\u53EF\u5206\u6790":i.is_pareto_robust?"\u7A33\u5065\u524D\u6CBF":i.is_near_frontier?"\u8FD1\u524D\u6CBF":e?"\u654F\u611F\u524D\u6CBF":"\u975E\u524D\u6CBF"}function _u(i){if(i.missing_dimension_names?.length)return!1;let e=i.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant;return typeof e=="boolean"?e:i.is_displayed&&Number.isFinite(i.layer)?!0:null}var cs=[{key:"name",label:"\u6A21\u578B",value:i=>i.name},{key:"creator",label:"\u5382\u5546",value:i=>i.creator},{key:"model_uuid",label:"\u6A21\u578B UUID",value:i=>i.model_uuid},{key:"intelligence",label:"\u667A\u80FD\u5206\uFF08\u5206\uFF09",value:i=>i.panel?.intelligence},{key:"measurement_status",label:"\u667A\u80FD\u5206\u72B6\u6001",value:i=>yu(i.intelligence_measurement_status)},{key:"catalog_estimated_flag",label:"\u76EE\u5F55\u539F\u59CB isEstimated",value:i=>i.artificial_analysis_intelligence_index_is_estimated},{key:"cost_to_run",label:"\u6709\u6548\u8FD0\u884C\u6210\u672C\uFF08USD\uFF09",value:i=>i.panel?.cost_to_run},{key:"blended_price_cache_input_output_7_to_2_to_1",label:"7:2:1 \u6DF7\u5408\u5355\u4EF7\uFF08USD/M tokens\uFF09",value:i=>i.panel?.blended_price_cache_input_output_7_to_2_to_1},{key:"eff_speed",label:"\u6709\u6548\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.eff_speed},{key:"output_speed",label:"\u539F\u59CB\u901F\u5EA6\uFF08tok/s\uFF09",value:i=>i.panel?.output_speed},{key:"intelligence_index_tasks_per_hour",label:"\u4EFB\u52A1\u901F\u5EA6\uFF08\u4EFB\u52A1/\u5C0F\u65F6\uFF09",value:i=>i.panel?.intelligence_index_tasks_per_hour},{key:"artificial_analysis_intelligence_index_time_per_task_seconds",label:"\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09",value:i=>i.panel?.artificial_analysis_intelligence_index_time_per_task_seconds},{key:"task_time_unavailability_reason",label:"\u4EFB\u52A1\u901F\u5EA6\u7F3A\u5931\u539F\u56E0",value:i=>i.intelligence_index_task_time_evidence?.unavailability_reason},{key:"median_end_to_end_response_time_seconds",label:"API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u79D2\uFF0C\u72EC\u7ACB\u5B57\u6BB5\uFF09",value:i=>i.panel?.median_end_to_end_response_time_seconds},{key:"release_date",label:"\u53D1\u5E03\u65E5\u671F",value:i=>i.panel?.release_date==="?"?null:i.panel?.release_date},{key:"eligibility",label:"\u5206\u6790\u8D44\u683C",value:i=>_u(i)===!0?"\u5408\u683C":_u(i)===!1?"\u4E0D\u5408\u683C":"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u672A\u8BB0\u5F55\uFF09"},{key:"layer",label:"\u6B63\u5F0F\u524D\u6CBF\u5C42\u53F7",value:i=>i.layer},{key:"drop_reason",label:"\u4E0A\u56FE\u72B6\u6001\u4E0E\u539F\u56E0",value:i=>i.drop_reason},{key:"sensitivity",label:"\u654F\u611F\u6027\uFF08\u5047\u8BBE\u533A\u95F4\uFF09",value:i=>i.sensitivity_text||"\u5173\u95ED"},{key:"sources",label:"\u6570\u503C\u4E0E\u72B6\u6001\u6765\u6E90",value:i=>JSON.stringify({...i.value_provenance,intelligence:i.intelligence_measurement_evidence,intelligence_index_task_time:i.intelligence_index_task_time_evidence,api_end_to_end_latency:"Artificial Analysis API performance.median_end_to_end_response_time_seconds"})}];function gp(i,e={}){let t=(e.search_text||"").trim().toLocaleLowerCase(),n=cs.find(r=>r.key===e.sort_field)||cs.find(r=>r.key==="intelligence"),s=e.sort_direction==="asc"?1:-1;return i.filter(r=>{if(t&&!`${r.name} ${r.creator} ${r.model_uuid||""}`.toLocaleLowerCase().includes(t))return!1;let a=_u(r);return!(e.analysis_filter==="eligible"&&a!==!0||e.analysis_filter==="ineligible"&&a!==!1||e.analysis_filter==="displayed"&&!r.is_displayed||e.analysis_filter==="excluded"&&r.is_displayed)}).sort((r,a)=>{let o=n.value(r),c=n.value(a),h=o==null||typeof o=="number"&&!Number.isFinite(o),d=c==null||typeof c=="number"&&!Number.isFinite(c);return h||d?Number(h)-Number(d)||r.model_index-a.model_index:(typeof o=="number"&&typeof c=="number"?o-c:String(o).localeCompare(String(c),"zh-CN"))*s||r.model_index-a.model_index})}function _p(i){let e=t=>{let n=t==null?"":String(t);return typeof t=="string"&&/^[\s\u0000-\u001f]*[=+\-@]/u.test(n)&&(n="'"+n),'"'+n.replaceAll('"','""')+'"'};return"\uFEFF"+[cs.map(t=>e(t.label)).join(","),...i.map(t=>cs.map(n=>e(n.value(t))).join(","))].join(`\r
`)+`\r
`}var Bt=(i,e,t)=>{let n=document.createElement(i);return n.textContent=e,t&&(n.className=t),n},bi=(i,e,t)=>{let n=Bt("button",i,"aa-secondary-button");return n.type="button",e&&(n.id=e),n.addEventListener("click",t),n};function vu(i,e){let t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=e,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),1e3)}function bu({dataset:i,reportShell:e,toolbar:t,plotRegion:n,graphContainer:s,sidePanel:r,webglAvailable:a=!0,getVariantKey:o=()=>i.initial_variant_key,getSharedViewState:c=()=>({}),applySharedViewState:h=()=>{},onExplorationFiltersChanged:d=()=>{},modelPassesSharedFilters:f=()=>!0,resetCamera:u=()=>{},setAxisAlignedCameraView:m=()=>{},exportPng:v=()=>{},pinModel:A=()=>{}}){let g=!1,p=null,P=null,L=i.initial_variant_key,E={},w=[],T=()=>a?o():L,I={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"},y={active_tab:a?"chart":"table",sort_field:"intelligence",sort_direction:"desc",search_text:"",analysis_filter:"all"},R=[],k=Bt("nav","","aa-exploration-bar");k.id="aa-model-exploration-bar",k.setAttribute("aria-label","\u89C6\u56FE\u3001\u5206\u4EAB\u4E0E\u5BFC\u51FA");let D=Bt("div","","aa-exploration-tabs");D.setAttribute("role","tablist");let N=bi("\u56FE\u8868","aa-chart-view-tab",()=>tt("chart")),Q=bi("\u5168\u6A21\u578B\u8868","aa-table-view-tab",()=>tt("table"));for(let B of[N,Q])B.setAttribute("role","tab");N.setAttribute("aria-controls",s.id),Q.setAttribute("aria-controls","aa-all-model-table-panel"),D.append(N,Q),a||(N.disabled=!0);let te=bi("\u91CD\u7F6E\u89C6\u89D2","aa-reset-camera-view",u),X=document.createElement("select");X.id="aa-axis-aligned-camera-view",X.setAttribute("aria-label","\u8F74\u5BF9\u9F50\u89C6\u89D2");for(let[B,$]of[["","\u8F74\u5BF9\u9F50\u89C6\u89D2"],["intelligence_cost","\u667A\u80FD \xD7 \u6210\u672C"],["intelligence_speed","\u667A\u80FD \xD7 \u901F\u5EA6"],["cost_speed","\u6210\u672C \xD7 \u901F\u5EA6"]])X.add(new Option($,B));X.addEventListener("change",()=>{X.value&&m(X.value),X.value="",K()});let ee=bi("\u590D\u5236\u89C6\u56FE\u94FE\u63A5","aa-copy-frontier-view-link",Dt),J=bi("\u5BFC\u51FA 2\xD7 PNG","aa-export-frontier-png",async()=>{J.disabled=!0;try{await v(),ht("PNG \u5DF2\u751F\u6210\uFF0C\u5305\u542B\u5F53\u524D\u89C6\u89D2\u3001\u56FE\u4F8B\u3001\u6570\u636E\u65E5\u671F\u4E0E AA \u7F72\u540D\u3002")}catch(B){ht(`PNG \u5BFC\u51FA\u5931\u8D25\uFF1A${B?.message||"\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3"}\uFF1B\u53EF\u91CD\u8BD5\u3002`)}finally{J.disabled=!a}});te.disabled=X.disabled=J.disabled=!a;let re=Bt("span","","aa-exploration-status");re.id="aa-exploration-status",re.setAttribute("role","status");let ce=document.createElement("textarea");if(ce.id="aa-frontier-view-link-fallback",ce.setAttribute("aria-label","\u53EF\u590D\u5236\u7684\u89C6\u56FE\u94FE\u63A5"),ce.readOnly=!0,ce.hidden=!0,k.append(D,te,X,ee,J,re,ce),t.before(k),!a){e.classList.add("is-view-settings-expanded");let B=Bt("p",`\u6570\u636E\u65E5\u671F\uFF1A${i.data_date||"\u672A\u77E5"} \xB7 `,"aa-exploration-note"),$=Bt("a","Artificial Analysis");$.href="https://artificialanalysis.ai/",B.append($),document.getElementById("frontier-3d-report-header").append(B);for(let[fe,Te,Ee]of[[0,"\u6210\u672C\u53E3\u5F84",i.cost_metric_definitions],[1,"\u901F\u5EA6\u53E3\u5F84",i.speed_metric_definitions]]){let xe=Bt("label",Te,"aa-toolbar-field"),De=document.createElement("select");De.setAttribute("aria-label",Te);for(let[he,Ie]of Object.entries(Ee))De.add(new Option(Ie.label,he));De.value=L.split("__")[fe],w.push(De),De.addEventListener("change",()=>{let he=w.map(Ie=>Ie.value).join("__");i.metric_variants[he]&&(L=he,K())}),xe.append(De),t.append(xe)}}let pe=Bt("details","","aa-model-exploration-controls");pe.id="aa-model-exploration-controls",pe.append(Bt("summary","\u7B5B\u9009\u4E0E\u654F\u611F\u6027 / \u65E5\u671F\u63A2\u7D22"));let de=document.createElement("input");de.type="checkbox",de.id="aa-measured-intelligence-only";let ge=Bt("label","\u4EC5\u5B9E\u6D4B\u667A\u80FD\u5206 ");ge.prepend(de),de.addEventListener("change",()=>C({measured_only:de.checked}));let Pe=document.createElement("select");Pe.id="aa-sensitivity-intelligence-half-width",Pe.setAttribute("aria-label","\u654F\u611F\u6027\u5047\u8BBE\u533A\u95F4");for(let[B,$]of[["off","\u654F\u611F\u6027\u6807\u6CE8\uFF1A\u5173\u95ED"],["0.5","\u667A\u80FD \xB10.5\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"],["1","\u667A\u80FD \xB11\uFF1B\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%"]])Pe.add(new Option($,B));Pe.addEventListener("change",()=>C({sensitivity_intelligence_half_width:Pe.value}));let ye=document.createElement("input");ye.type="date",ye.id="aa-release-date-cutoff",ye.setAttribute("aria-label","\u53D1\u5E03\u65E5\u671F\u622A\u6B62\u65E5\u671F\uFF0C\u7559\u7A7A\u663E\u793A\u5168\u90E8"),ye.addEventListener("change",()=>{G(),C({cutoff_date:Os(ye.value)?ye.value:null})});let qe=document.createElement("select");qe.id="aa-release-date-visibility-mode",qe.setAttribute("aria-label","\u665A\u4E8E\u622A\u6B62\u65E5\u671F\u7684\u6A21\u578B"),qe.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u6DE1\u51FA","fade")),qe.add(new Option("\u665A\u4E8E\u622A\u6B62\u65E5\u671F\uFF1A\u9690\u85CF","hide")),qe.addEventListener("change",()=>C({date_mode:qe.value}));let ie=bi("\u64AD\u653E\u53D1\u5E03\u65E5\u671F","aa-play-release-date-filter",Y);ie.setAttribute("aria-pressed","false");let Me=bi("\u663E\u793A\u5168\u90E8\u65E5\u671F","aa-show-all-release-dates",()=>{G(),C({cutoff_date:null})}),me=Bt("p","\u4EC5\u63A2\u7D22\u5F53\u524D\u5FEB\u7167\u7684\u53D1\u5E03\u65E5\u671F\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97\u3002\u672A\u77E5\u53D1\u5E03\u65E5\u671F\u5355\u72EC\u4FDD\u7559\uFF0C\u4E0D\u63A8\u65AD\u65E5\u671F\u3002","aa-exploration-note"),Oe=Bt("p","\u5B9E\u7EBF\u5149\u73AF\uFF1A\u7A33\u5065\u524D\u6CBF\uFF1B\u865A\u7EBF\u5149\u73AF\uFF1A\u654F\u611F\u524D\u6CBF / \u8FD1\u524D\u6CBF\u3002\u533A\u95F4\u4E3A\u72EC\u7ACB\u5047\u8BBE\uFF0C\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E5F\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE\uFF1B\u6B63\u5F0F\u524D\u6CBF\u548C\u6392\u540D\u4FDD\u6301\u5168\u5C40\u5206\u6790\u3002","aa-exploration-note");Oe.id="aa-sensitivity-legend",Oe.hidden=!0;let Qe=Bt("p","\u4EFB\u52A1\u901F\u5EA6 = 3600 \xF7 \u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6\uFF08\u79D2\uFF09\u3002API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\u662F\u53E6\u4E00\u72EC\u7ACB\u6D4B\u91CF\uFF0C\u4E0D\u7528\u4E8E\u8865\u4F4D\u3002","aa-exploration-note");pe.append(ge,Pe,ye,qe,ie,Me,me,Oe,Qe),(r.querySelector(".aa-side-panel-body")||r).append(pe);let He=Bt("section","","aa-all-model-table-panel");He.id="aa-all-model-table-panel",He.setAttribute("role","tabpanel"),He.setAttribute("aria-labelledby",Q.id);let gt=Bt("div","","aa-all-model-table-tools"),et=document.createElement("input");et.type="search",et.id="aa-all-model-table-search",et.placeholder="\u7B5B\u9009\u6A21\u578B\u3001\u5382\u5546\u6216 UUID",et.setAttribute("aria-label",et.placeholder),et.addEventListener("input",()=>{y.search_text=et.value,_(),z()});let rt=document.createElement("select");rt.id="aa-all-model-analysis-filter",rt.setAttribute("aria-label","\u7B5B\u9009\u5206\u6790\u4E0E\u4E0A\u56FE\u8D44\u683C");for(let[B,$]of[["all","\u5168\u90E8\u8F93\u5165\u8BB0\u5F55"],["eligible","\u5206\u6790\u5408\u683C"],["ineligible","\u5206\u6790\u4E0D\u5408\u683C"],["displayed","\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE"],["excluded","\u672C\u53E3\u5F84\u672A\u4E0A\u56FE"]])rt.add(new Option($,B));rt.addEventListener("change",()=>{y.analysis_filter=rt.value,_(),z()});let at=bi("\u5BFC\u51FA\u5F53\u524D\u8868\u683C CSV","aa-export-all-model-table-csv",()=>vu(new Blob([_p(R)],{type:"text/csv;charset=utf-8"}),`frontier-models-${i.data_date||"unknown"}.csv`)),Je=Bt("p","","aa-exploration-note");Je.id="aa-all-model-table-counts";let mt=document.createElement("table");mt.id="aa-all-model-table",mt.append(Bt("caption","\u5168\u90E8\u6A21\u578B\uFF1A\u542B\u7F3A\u503C\u3001\u88AB\u526A\u679D\u53CA\u5206\u6790\u4E0D\u5408\u683C\u8BB0\u5F55\uFF1B\u6570\u503C\u4FDD\u7559\u5168\u5C40\u5206\u6790\u53E3\u5F84\u3002"));let bt=mt.createTHead().insertRow();for(let B of cs){let $=document.createElement("th");$.scope="col",$.dataset.sortField=B.key,$.append(bi(B.label,`aa-sort-model-table-${B.key}`,()=>{y.sort_direction=y.sort_field===B.key&&y.sort_direction==="desc"?"asc":"desc",y.sort_field=B.key,_(),z()})),bt.append($)}let It=mt.createTBody(),Mt=Bt("div","","aa-all-model-table-scroll");Mt.tabIndex=0,Mt.setAttribute("aria-label","\u53EF\u6A2A\u5411\u4E0E\u7EB5\u5411\u6EDA\u52A8\u7684\u5168\u90E8\u6A21\u578B\u8868"),Mt.append(mt),gt.append(et,rt,at),He.append(gt,Je,Mt),n.append(He),N.addEventListener("keydown",B=>{["ArrowRight","ArrowLeft"].includes(B.key)&&(B.preventDefault(),tt("table"),Q.focus())}),Q.addEventListener("keydown",B=>{a&&["ArrowRight","ArrowLeft"].includes(B.key)&&(B.preventDefault(),tt("chart"),N.focus())});function ht(B){re.textContent=B}function ct(){let B=a?c():E;return{...B,version:1,metric_variant_key:T(),display:{...B.display,measured_only:I.measured_only,sensitivity_intelligence_half_width:I.sensitivity_intelligence_half_width},date_filter:{cutoff_date:I.cutoff_date,mode:I.date_mode},table:{...y}}}function z(){g||p!==null||(p=window.setTimeout(()=>{p=null;let B=xu(ct());if(B!==window.location.hash)try{window.history.replaceState(window.history.state,"",B)}catch{ht("\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u66F4\u65B0\u5730\u5740\u680F\uFF1B\u590D\u5236\u94FE\u63A5\u4ECD\u53EF\u4FDD\u5B58\u89C6\u56FE\u3002 ")}},0))}async function Dt(){let B=window.location.href.split("#")[0]+xu(ct()),$=window.location.protocol==="file:"?" \u672C\u5730\u6587\u4EF6\u5206\u4EAB\u9700\u540C\u65F6\u63D0\u4F9B\u5BF9\u5E94 HTML\u3002":"";try{await navigator.clipboard.writeText(B),ce.hidden=!0,ht("\u5DF2\u590D\u5236\u5F53\u524D\u89C6\u56FE\u94FE\u63A5\u3002"+$)}catch{ce.hidden=!1,ce.value=B,ce.focus(),ce.select(),ht("\u65E0\u6CD5\u8BBF\u95EE\u526A\u8D34\u677F\uFF0C\u94FE\u63A5\u5DF2\u9009\u4E2D\uFF0C\u53EF\u624B\u52A8\u590D\u5236\u3002"+$)}}function tt(B){y.active_tab=a?B:"table";let $=y.active_tab==="table";He.hidden=!$,s.style.visibility=$?"hidden":"",N.setAttribute("aria-selected",String(!$)),Q.setAttribute("aria-selected",String($)),N.tabIndex=$?-1:0,Q.tabIndex=$?0:-1,_(),z()}function C(B){Object.assign(I,B),de.checked=I.measured_only,ye.value=I.cutoff_date||"",qe.value=I.date_mode,Pe.value=I.sensitivity_intelligence_half_width,Oe.hidden=Pe.value==="off",d({...I}),_(),z()}function _(){let B=i.metric_variants[T()],$=B?.three_dimensional_scene?.displayed_model_markers||[],fe=B?.model_analysis_records;if(!fe){let he=new Map((i.models||[]).map(Ie=>[Ie.model_uuid||JSON.stringify([Ie.creator,Ie.name]),{...Ie,is_displayed:!1,drop_reason:"\u65E7\u6587\u4EF6\u672A\u7559\u5B58\u672C\u53E3\u5F84\u8D44\u683C\u6216\u672A\u4E0A\u56FE\u539F\u56E0"}]));for(let Ie of[...$,...B?.excluded_models_with_drop_reason||[]]){let U=Ie.model_uuid||JSON.stringify([Ie.creator,Ie.name]),be=he.get(U);he.set(U,{...be,...Ie,panel:{...be?.panel,...Ie.panel,intelligence:Ie.panel?.intelligence??Ie.intelligence??be?.panel?.intelligence,release_date:Ie.panel?.release_date??Ie.release_date??be?.panel?.release_date},is_displayed:$.includes(Ie),layer:Ie.panel?.layer})}fe=[...he.values()].map((Ie,U)=>({...Ie,model_index:U}))}let Te=he=>{if(!f(he))return!1;if(a)return!0;let Ie=i.organization_identity_metadata_by_creator_name?.[he.creator]?.organization_identity_key;if(E.hidden_organization_identity_keys?.includes(Ie)||E.display?.comparable_only&&he.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant===!1)return!1;let U=$.find(be=>be.model_uuid===he.model_uuid);return E.display?.recent_release_grace_period!==!1||!U?.displayed_only_because_of_recent_release_grace_period},Ee=fe.filter(he=>Te(he)&&hs(he,I).visible);R=gp(Ee.map(he=>({...he,sensitivity_text:I.sensitivity_intelligence_half_width==="off"?"\u5173\u95ED":tc(he.sensitivity_by_intelligence_half_width?.[I.sensitivity_intelligence_half_width],he.layer===1)})),y);let xe=$.filter(he=>Te(he)&&hs(he,I).visible).length;if(Je.textContent=`\u5168\u5C40\u8F93\u5165 ${fe.length}\uFF1B\u5F53\u524D\u7B5B\u9009\u8868\u683C ${R.length}\uFF1B\u672C\u53E3\u5F84\u5DF2\u4E0A\u56FE ${$.length}\uFF0C\u53EF\u89C1 ${xe}\u3002${i.model_table_coverage==="all_input_records"?"":"\u65E7\u6587\u4EF6\u53EA\u8986\u76D6\u5B9E\u9645\u7559\u5B58\u8BB0\u5F55\uFF0C\u65E0\u6CD5\u6062\u590D\u539F\u59CB\u8F93\u5165\u7684\u5168\u90E8\u6A21\u578B\u3002"} \u672A\u77E5\u53D1\u5E03\u65E5\u671F ${fe.filter(he=>!Os(he.panel?.release_date)).length}\u3002`,He.hidden||g)return;for(let he of bt.cells)he.setAttribute("aria-sort",he.dataset.sortField===y.sort_field?y.sort_direction==="asc"?"ascending":"descending":"none");let De=document.createDocumentFragment();for(let he of R){let Ie=document.createElement("tr");Ie.dataset.modelUuid=he.model_uuid||"",Ie.dataset.dateFaded=String(hs(he,I).faded);for(let U of cs){let be=Ie.insertCell(),se=U.value(he);if(be.textContent=se==null?"\u672A\u77E5":typeof se=="number"?Number(se.toPrecision(6)).toString():String(se),U.key==="name"&&a&&he.model_uuid){let we=bi(he.name,"",()=>{A(he),K()});we.setAttribute("aria-label",`\u56FA\u5B9A ${he.name}`),be.replaceChildren(we)}}De.append(Ie)}It.replaceChildren(De)}function G(){P!==null&&window.clearInterval(P),P=null,ie.textContent="\u64AD\u653E\u53D1\u5E03\u65E5\u671F",ie.setAttribute("aria-pressed","false")}function Y(){if(P!==null){G();return}let B=[...new Set((i.models||Object.values(i.metric_variants).flatMap(Te=>Te.three_dimensional_scene.displayed_model_markers)).map(Te=>Te.panel?.release_date).filter(Os))].sort();if(!B.length){ht("\u6CA1\u6709\u53EF\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\u53EF\u64AD\u653E\u3002");return}let $=I.cutoff_date?B.findIndex(Te=>Te>I.cutoff_date):0;$<0&&($=0);let fe=()=>{C({cutoff_date:B[$++]}),$>=B.length&&G()};ie.textContent="\u6682\u505C\u53D1\u5E03\u65E5\u671F",ie.setAttribute("aria-pressed","true"),P=window.setInterval(fe,900),fe()}function K(){_(),z()}function _e(){let{state:B,reason:$}=ec(window.location.hash);if($&&ht($),!!B){G(),p!==null&&window.clearTimeout(p),p=null,g=!0;try{B.table&&Object.assign(y,B.table),a||(E=B,B.metric_variant_key&&i.metric_variants[B.metric_variant_key]?L=B.metric_variant_key:B.metric_variant_key&&ht("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002"),w.forEach((fe,Te)=>{fe.value=L.split("__")[Te]})),B.date_filter&&Object.assign(I,{cutoff_date:B.date_filter.cutoff_date,date_mode:B.date_filter.mode});for(let fe of["measured_only","sensitivity_intelligence_half_width"])B.display?.[fe]!==void 0&&(I[fe]=B.display[fe]);h(B,ht),C(I),et.value=y.search_text,rt.value=y.analysis_filter,tt(y.active_tab)}finally{g=!1}_()}}window.addEventListener("hashchange",_e),window.addEventListener("popstate",_e),window.addEventListener("pagehide",G),document.addEventListener("visibilitychange",()=>{document.hidden&&G()});let ue=i.refresh_difference_report;if(ue){let B=Bt("details","","aa-model-exploration-controls");B.id="aa-refresh-difference-summary",B.append(Bt("summary",`\u5237\u65B0\u5DEE\u5F02${i.previous_data_date?` \xB7 \u76F8\u6BD4 ${i.previous_data_date}`:""}`));let $=ue.status==="comparable"?[`\u65B0\u589E ${ue.added_model_uuids?.length||0}\uFF1B\u672C\u6B21\u672A\u51FA\u73B0 ${ue.absent_model_uuids?.length||0}\uFF08\u4E0D\u4EE3\u8868\u9000\u5E02\uFF09\u3002`,`\u5B57\u6BB5\u7F3A\u5931\u53D8\u5316 ${ue.field_missingness_changes?.length||0}\uFF1B\u53EF\u6BD4\u6B63\u503C\u53D8\u5316\u8D85\u8FC7 10%\uFF1A${ue.metric_changes_exceeding_ten_percent?.length||0}\u3002`,ue.frontier_comparison?.status==="comparable"?"\u524D\u6CBF\u8FDB\u51FA\u6765\u81EA\u5339\u914D\u7684\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u3002":ue.frontier_comparison?.reason]:[ue.reason];for(let Te of $.filter(Boolean))B.append(Bt("p",Te,"aa-exploration-note"));let fe=Bt("pre",JSON.stringify(ue,null,2),"aa-refresh-difference-records");if(B.append(fe),(r.querySelector(".aa-side-panel-body")||r).append(B),ue.index_version_warning){let Te=Bt("p",ue.index_version_warning,"aa-report-header-data-quality-warning");Te.id="aa-index-version-change-warning",document.getElementById("frontier-3d-report-header").append(Te)}}return g=!0,tt(y.active_tab),g=!1,_e(),_(),{getState:ct,getFilters:()=>({...I}),setExplorationFilters:C,sharedViewChanged:K,refresh:_,announce:ht,pausePlayback:G}}function _v({radius:i,verticalFieldOfViewDegrees:e,canvasWidth:t,canvasHeight:n,paddingCssPixels:s=56}){if(![i,e,t,n].every(h=>Number.isFinite(h)&&h>0)||e>=180)throw new Error("\u81EA\u52A8\u53D6\u666F\u9700\u8981\u6709\u6548\u5305\u56F4\u7403\u3001\u89C6\u573A\u4E0E\u753B\u5E03\u5C3A\u5BF8");let r=Math.max(.4,1-2*s/t),a=Math.max(.4,1-2*s/n),o=Math.tan(gi.degToRad(e/2)),c=Math.atan(o*Math.min(a,r*t/n));return i/Math.sin(c)*1.04}function xp({camera:i,controls:e,canvas:t,graphContainer:n,getBoundingSphere:s,getInitialCameraDirection:r,hitTest:a,onCameraStateCommitted:o,onDismissOverlay:c,onClearSelection:h,onFocusSearch:d,requestRender:f}){let u=!0,m=null,v=`${window.innerWidth}:${window.innerHeight}`,A={intelligence_cost:[0,-1,0],intelligence_speed:[1,0,0],cost_speed:[0,0,1]};function g(w){i.up.fromArray(w).normalize(),e._quat.setFromUnitVectors(i.up,new O(0,1,0)),e._quatInverse.copy(e._quat).invert()}function p(w=!0){let T=s(),I=Math.max(1,n.clientWidth),y=Math.max(1,n.clientHeight);i.aspect=I/y;let R=_v({radius:Math.max(T.radius,.01),verticalFieldOfViewDegrees:i.fov,canvasWidth:I,canvasHeight:y}),k=new O(...m?A[m]:r()).normalize();g(m==="cost_speed"?[0,1,0]:[0,0,1]),e.target.copy(T.center),i.position.copy(T.center).addScaledVector(k,R),i.near=.01,i.far=Math.max(100,R*4),e.maxDistance=Math.max(14,R*3),i.updateProjectionMatrix(),e.update(),f(),w&&o()}function P({commit:w=!0}={}){u=!0,m=null,p(w)}function L(w){return A[w]?(u=!0,m=w,p(),!0):!1}function E(w){u=!1,g(w.up),e.target.fromArray(w.target),i.position.fromArray(w.position);let T=i.position.distanceTo(e.target);e.maxDistance=Math.max(e.maxDistance,T*1.01),e.minDistance=Math.min(e.minDistance,T*.99),i.far=Math.max(100,T*4),i.updateProjectionMatrix(),e.update(),f()}return t.tabIndex=0,t.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF\uFF1B\u65B9\u5411\u952E\u65CB\u8F6C\uFF0C\u659C\u6760\u641C\u7D22\uFF0CEscape \u5173\u95ED\u6D6E\u5C42\u6216\u6E05\u9664\u56FA\u5B9A\uFF0C\u53CC\u51FB\u7A7A\u767D\u91CD\u7F6E\u89C6\u89D2"),t.addEventListener("dblclick",w=>{a(w.clientX,w.clientY)||P()}),e.addEventListener("start",()=>{u=!1}),e.addEventListener("end",o),document.addEventListener("keydown",w=>{let T=w.target.closest?.("input,textarea,select,[contenteditable='true']");if(w.key==="Escape"){if(c()){w.preventDefault(),w.stopImmediatePropagation();return}if(T)return;h(),w.preventDefault(),w.stopImmediatePropagation();return}if(T||w.ctrlKey||w.metaKey||w.altKey)return;if(w.key==="/"){w.preventDefault(),d();return}if(w.target!==t||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key))return;w.preventDefault(),u=!1;let I=i.position.clone().sub(e.target),R=w.key==="ArrowLeft"||w.key==="ArrowRight"?i.up.clone():new O().crossVectors(i.up,I).normalize();I.applyAxisAngle(R,(w.key==="ArrowLeft"||w.key==="ArrowUp"?1:-1)*Math.PI/36),Math.abs(I.clone().normalize().dot(i.up))<.995&&i.position.copy(e.target).add(I),e.update(),f(),o()},!0),{resetCamera:P,setAxisAlignedCameraView:L,restoreCameraState:E,serializeCameraState:()=>Object.fromEntries([["position",i.position],["target",e.target],["up",i.up]].map(([w,T])=>[w,T.toArray().map(I=>Math.abs(I)<1e-10?0:Number(I.toPrecision(12)))])),onResize:()=>{let w=`${window.innerWidth}:${window.innerHeight}`;u&&w!==v&&p(!1),v=w}}}async function yp({scene:i,camera:e,graphContainer:t,title:n,metadataLines:s,legendLines:r,pinnedModelNames:a}){let o=Math.max(1,t.clientWidth),c=Math.max(1,t.clientHeight),h=getComputedStyle(document.body).fontFamily,d=window.matchMedia("(prefers-color-scheme: dark)").matches,f=d?"#111827":"#ffffff",u=d?"#f3f4f6":"#17202a",m=document.createElement("canvas"),v=m.getContext("2d");if(!v)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u753B\u5E03");v.font=`13px ${h}`;function A(I){let y=[],R="";for(let k of String(I))v.measureText(R+k).width>Math.max(50,o-32)&&(y.push(R),R=""),R+=k;return R&&y.push(R),y}let g=[n,...s].flatMap(A),p=[...r,`\u56FA\u5B9A\u6A21\u578B\uFF1A${a.length?a.join("\u3001"):"\u65E0"}`,"\u6570\u636E\u6765\u6E90\uFF1AArtificial Analysis \xB7 https://artificialanalysis.ai/"].flatMap(A),P=20+g.length*20,L=20+p.length*20,E=document.createElement("canvas");E.width=o*2,E.height=(c+P+L)*2;let w=E.getContext("2d");if(!w)throw new Error("\u65E0\u6CD5\u521B\u5EFA PNG \u5408\u6210\u4E0A\u4E0B\u6587");let T;window.frontier3dLastPngExportStatus={inProgress:!0,resourcesReleased:!1,width:E.width,height:E.height};try{T=new Ar({antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),T.outputColorSpace=qt,T.setPixelRatio(2),T.setSize(o,c,!1);let I=e.clone();I.aspect=o/c,I.updateProjectionMatrix(),T.render(i,I),w.scale(2,2),w.fillStyle=f,w.fillRect(0,0,o,E.height/2),w.fillStyle=u,w.textBaseline="top",g.forEach((D,N)=>{w.font=`${N===0?"600 15":"13"}px ${h}`,w.fillText(D,16,10+N*20)}),w.drawImage(T.domElement,0,P,o,c);let y=t.getBoundingClientRect();w.save(),w.beginPath(),w.rect(0,P,o,c),w.clip();let R=[...t.querySelectorAll(".aa-threejs-axis-label,.aa-threejs-axis-tick-label,.aa-pinned-model-name-label")].sort((D,N)=>(parseInt(getComputedStyle(D).zIndex,10)||0)-(parseInt(getComputedStyle(N).zIndex,10)||0));for(let D of R){if(D.hidden||D.style.display==="none")continue;let N=D.getBoundingClientRect();if(!N.width||!N.height)continue;let Q=N.x-y.x+N.width/2,te=P+N.y-y.y+N.height/2,X=/rotate\(([-\d.]+)deg\)/.exec(D.style.transform)?.[1]||0;w.save(),w.translate(Q,te),w.rotate(Number(X)*Math.PI/180);let ee=getComputedStyle(D),J=parseFloat(ee.fontSize)||12,re=parseFloat(ee.lineHeight)||J*1.3;w.font=`${ee.fontWeight} ${J}px ${h}`;let ce=(D.textContent+(D.dataset.directionHint||"")).replace(/\s+/g," ").trim(),pe=Math.max(20,D.offsetWidth-8),de=[],ge="";for(let qe of ce)ge&&w.measureText(ge+qe).width>pe&&(de.push(ge),ge=""),ge+=qe;ge&&de.push(ge);let Pe=Math.max(...de.map(qe=>w.measureText(qe).width),0),ye=de.length*re;w.fillStyle=f,w.fillRect(-Pe/2-3,-ye/2-2,Pe+6,ye+4),w.fillStyle=u,w.textAlign="center",w.textBaseline="middle",de.forEach((qe,ie)=>w.fillText(qe,0,(ie-(de.length-1)/2)*re)),w.restore()}return w.restore(),w.font=`13px ${h}`,w.fillStyle=u,p.forEach((D,N)=>w.fillText(D,16,P+c+10+N*20)),await new Promise((D,N)=>E.toBlob(Q=>Q?D(Q):N(new Error("\u6D4F\u89C8\u5668\u672A\u80FD\u7F16\u7801 PNG")),"image/png"))}finally{T?.dispose(),T?.forceContextLoss(),T?.domElement.remove(),window.frontier3dLastPngExportStatus={...window.frontier3dLastPngExportStatus,inProgress:!1,resourcesReleased:!0},m.width=m.height=0,E.width=E.height=0}}var vp={type:"change"},Su={type:"start"},Mp={type:"end"},nc=new ji,bp=new Wn,xv=Math.cos(70*gi.DEG2RAD),Zt=new O,Rn=2*Math.PI,Pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Mu=1e-6,ic=class extends va{constructor(e,t=null){super(e,t),this.state=Pt.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ns.ROTATE,MIDDLE:ns.DOLLY,RIGHT:ns.PAN},this.touches={ONE:is.ROTATE,TWO:is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Fn,this._lastTargetPosition=new O,this._quat=new Fn().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vr,this._sphericalDelta=new vr,this._scale=1,this._panOffset=new O,this._rotateStart=new Xe,this._rotateEnd=new Xe,this._rotateDelta=new Xe,this._panStart=new Xe,this._panEnd=new Xe,this._panDelta=new Xe,this._dollyStart=new Xe,this._dollyEnd=new Xe,this._dollyDelta=new Xe,this._dollyDirection=new O,this._mouse=new Xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vv.bind(this),this._onPointerDown=yv.bind(this),this._onPointerUp=bv.bind(this),this._onContextMenu=Cv.bind(this),this._onMouseWheel=Ev.bind(this),this._onKeyDown=wv.bind(this),this._onTouchStart=Av.bind(this),this._onTouchMove=Tv.bind(this),this._onMouseDown=Mv.bind(this),this._onMouseMove=Sv.bind(this),this._interceptControlDown=Rv.bind(this),this._interceptControlUp=Pv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vp),this.update(),this.state=Pt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Zt.copy(t).sub(this.target),Zt.applyQuaternion(this._quat),this._spherical.setFromVector3(Zt),this.autoRotate&&this.state===Pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Rn:n>Math.PI&&(n-=Rn),s<-Math.PI?s+=Rn:s>Math.PI&&(s-=Rn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Zt.setFromSpherical(this._spherical),Zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Zt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let h=new O(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),a=Zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(nc.origin.copy(this.object.position),nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nc.direction))<xv?this.object.lookAt(this.target):(bp.setFromNormalAndCoplanarPoint(this.object.up,this.target),nc.intersectPlane(bp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Mu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Mu||this._lastTargetPosition.distanceToSquared(this.target)>Mu?(this.dispatchEvent(vp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Rn/60*this.autoRotateSpeed*e:Rn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Zt.setFromMatrixColumn(t,0),Zt.multiplyScalar(-e),this._panOffset.add(Zt)}_panUp(e,t){this.screenSpacePanning===!0?Zt.setFromMatrixColumn(t,1):(Zt.setFromMatrixColumn(t,0),Zt.crossVectors(this.object.up,Zt)),Zt.multiplyScalar(e),this._panOffset.add(Zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Zt.copy(s).sub(this.target);let r=Zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Xe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function yv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function vv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function bv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mp),this.state=Pt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Mv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Pt.DOLLY;break;case ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Pt.ROTATE}break;case ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Pt.PAN}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Su)}function Sv(i){switch(this.state){case Pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ev(i){this.enabled===!1||this.enableZoom===!1||this.state!==Pt.NONE||(i.preventDefault(),this.dispatchEvent(Su),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Mp))}function wv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Av(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Pt.TOUCH_ROTATE;break;case is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Pt.TOUCH_PAN;break;default:this.state=Pt.NONE}break;case 2:switch(this.touches.TWO){case is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Pt.TOUCH_DOLLY_PAN;break;case is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Pt.TOUCH_DOLLY_ROTATE;break;default:this.state=Pt.NONE}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Su)}function Tv(i){switch(this._trackPointer(i),this.state){case Pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Pt.NONE}}function Cv(i){this.enabled!==!1&&i.preventDefault()}function Rv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Pv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var us=Object.freeze({TREND_RESIDUAL:"trend_residual",INTELLIGENCE_UPLIFT:"intelligence_uplift",WEIGHTED_EXCLUSIVE_HYPERVOLUME:"weighted_exclusive_hypervolume",FRONTIER_DISTANCE:"frontier_distance"}),Oi=Object.freeze({[us.TREND_RESIDUAL]:{label:"\u8D8B\u52BF\u6B8B\u5DEE",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"trend_residual"},[us.INTELLIGENCE_UPLIFT]:{label:"\u667A\u80FD\u62AC\u5347",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"intelligence_uplift"},[us.WEIGHTED_EXCLUSIVE_HYPERVOLUME]:{label:"\u52A0\u6743\u8D85\u4F53\u79EF",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!0,modelMetricFieldName:"weighted_exclusive_hypervolume"},[us.FRONTIER_DISTANCE]:{label:"\u5230\u524D\u6CBF\u5782\u8DDD",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!1,modelMetricFieldName:"frontier_distance"}});function Sp(i){let e=i.slice().sort((s,r)=>r[0]-s[0]||r[1]-s[1]),t=0,n=0;return e.forEach(([s,r])=>{r>n&&(t+=s*(r-n),n=r)}),t}function Ep(i){if(!i.length)return 0;let e=i.slice().sort((r,a)=>a[2]-r[2]),t=0,n=null,s=[];return e.forEach(([r,a,o])=>{n!==null&&(t+=Sp(s)*(n-o)),s.push([r,a]),n=o}),t+Sp(s)*n}function Eu(i,e){let t=i.map(r=>{let a=r.normalized_improvement_coordinates;return[Math.pow(a.cost_efficiency,e.cost),Math.pow(a.speed,e.speed),Math.pow(a.intelligence,e.intelligence)]}),n=Ep(t);return{contributions:t.map((r,a)=>n-Ep(t.filter((o,c)=>a!==c))),completeFrontierHypervolume:n}}function wp(i,e,t){let n=Oi[e];if(!n)throw new Error(`Unknown frontier standout metric: ${e}`);return n.usesAdjustableAxisWeights?Eu(i,t).contributions:i.map(s=>{let r=s.standout_metrics[n.modelMetricFieldName];return r==null||!isFinite(r)?NaN:r})}(function(){"use strict";let e=new Map,t=document.createElement("div");t.id="frontier-3d-runtime-diagnostic-banner",t.setAttribute("role","alert"),t.hidden=!0,document.body.append(t);function n(l,x){x?e.set(l,x):e.delete(l),t.textContent=[...e.values()].join("\uFF1B"),t.hidden=e.size===0}window.frontier3dRuntimeDiagnosticStatus=()=>Object.fromEntries(e),window.addEventListener("error",l=>n("window_error",`\u9875\u9762\u9519\u8BEF\uFF1A${String(l.message||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`)),window.addEventListener("unhandledrejection",l=>n("unhandled_rejection",`\u9875\u9762\u64CD\u4F5C\u5931\u8D25\uFF1A${String(l.reason?.message||l.reason||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`));let r=document.getElementById("frontier-3d-visualization-dataset-json");if(!r)throw new Error("Missing Frontier 3D visualization dataset");let a=pp(JSON.parse(r.textContent)),o=a.metric_variants||{},c=a.organization_identity_metadata_by_creator_name||{},h=a.initial_variant_key;if(!o[h])throw new Error(`Missing initial metric variant: ${h}`);let d=document.getElementById(a.graph_div_id||"frontier3d"),f=document.getElementById("frontier-3d-plot-region"),u=document.getElementById("frontier-3d-report-shell"),m=document.getElementById("frontier-3d-toolbar"),v=document.getElementById("frontier-3d-side-panel");if(!d||!f||!u||!m||!v)throw new Error("Frontier 3D report document is incomplete");let A=document.getElementById("frontier-3d-report-header"),g=null,p=null,P={measured_only:!1,cutoff_date:null,date_mode:"fade",sensitivity_intelligence_half_width:"off"};function L(){g?.sharedViewChanged()}let E=a.artificial_analysis_data_provenance||{},w=Number.isInteger(E.recent_release_frontier_distance_grace_period_months)?E.recent_release_frontier_distance_grace_period_months:null,T="https://artificialanalysis.ai/",I="\u5386\u53F2\u53E3\u5F84\uFF08\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u7684\u6210\u672C/\u5197\u957F\u5EA6\uFF09\uFF0C\u4E0D\u53C2\u4E0E\u672C\u53E3\u5F84\u524D\u6CBF\u8BA1\u7B97";function y(l){let x=document.querySelector(`meta[name="${l}"]`);return x&&x.getAttribute("content")||""}let R={rendererBundleSha256:y("frontier-3d-renderer-bundle-sha256")||"unknown",generatorGitCommit:y("frontier-3d-generator-git-commit")||"unknown",renderedAtUtc:y("frontier-3d-rendered-at-utc")||"unknown"};window.FRONTIER_3D_VISUALIZATION_DATASET=a;let k=new _r;k.background=new ut(16777215);let D=new en(42,1,.01,100);D.up.set(0,0,1);let N;try{N=new Ar({antialias:!0,alpha:!1,preserveDrawingBuffer:!1})}catch{n("webgl_unavailable","\u65E0\u6CD5\u542F\u52A8\u4E09\u7EF4\u56FE\uFF1A\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WebGL\uFF0C\u6216\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3\u3002\u8BF7\u542F\u7528\u6D4F\u89C8\u5668\u56FE\u5F62\u52A0\u901F\u540E\u91CD\u65B0\u52A0\u8F7D\u3002"),g=bu({dataset:a,reportShell:u,toolbar:m,plotRegion:f,graphContainer:d,sidePanel:v,webglAvailable:!1}),window.serializeFrontierViewState=g.getState,window.setFrontierExplorationFilters=g.setExplorationFilters;return}let Q=!1;N.domElement.addEventListener("webglcontextlost",l=>{l.preventDefault(),Q=!0,ln=!1,_n(),n("webgl_context","\u4E09\u7EF4\u56FE\u7684\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u6B63\u5728\u7B49\u5F85\u6D4F\u89C8\u5668\u6062\u590D\u3002")}),N.domElement.addEventListener("webglcontextrestored",()=>{Q=!1,ln=!1,xs(),n("webgl_context",null),Ht()}),N.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),N.outputColorSpace=qt,N.domElement.setAttribute("data-frontier-threejs-canvas","true"),N.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF"),d.replaceChildren(N.domElement);let te=new ic(D,N.domElement);te.enableDamping=!1,te.screenSpacePanning=!0,te.zoomToCursor=!0,te.minDistance=2.4,te.maxDistance=14;let X=new xa,ee=new Xe,J=new Xn,re=new Xn,ce=new Xn,pe=new Xn;k.add(J,re,ce,pe);let de,ge,Pe,ye=[],qe={},ie={},Me={},me={},Oe=[],Qe=[],He=[],gt=[],et={},rt={},at=null,Je=null,mt=null,bt=null,It=null,Mt=null,ht=null,ct=!1,z=!1,Dt=w>0,tt,C=0,_=0,G=[],Y="wireframe",K=!1,_e=!window.matchMedia("(max-width: 640px)").matches,ue=null,B=null,$=null,fe=null,Te=null,Ee=new Set,xe=new Set,De=new Map;function he(l){return l.model_uuid?.toLowerCase()||`legacy:${JSON.stringify([l.creator,l.name])}`}(a.models||[]).forEach(l=>De.set(he(l),l)),Object.values(o).forEach(l=>{(l.three_dimensional_scene?.displayed_model_markers||[]).forEach(x=>{De.set(he(x),x)})});function Ie(l){return xe.has(he(l))}function U(){Ee=new Set([...xe].map(l=>De.get(l)?.base_model_name).filter(Boolean))}function be(l){let x=[];for(let[M,S]of De)S.base_model_name===l&&x.push(M);return x}function se(l){let x=be(l);return x.length>0&&x.every(M=>xe.has(M))}function we(l,x){for(let[M,S]of De)S.base_model_name===l&&(x?xe.add(M):xe.delete(M));return U(),Xs(),Ei(),Promise.resolve(!0)}let Re=new Set,ae=us.TREND_RESIDUAL,Ne={intelligence:1,cost:1,speed:1},ke={},St=null,yt={},ln=!1,Pn="frontier3d.marker-size-multiplier",$n=Object.freeze({logo:22,backplate:29,countryRegion:38,paretoRing:38,pinnedRing:49,standoutHalo:52,standoutHaloMinimum:44,standoutHaloMaximum:64,missingStandoutHalo:48,prunedLineageAncestor:18}),Pr="frontier3d.pinned-comparison-fields";function Ir(l,x){try{return JSON.parse(window.localStorage.getItem(l))??x}catch{return x}}function ds(l,x){try{window.localStorage.setItem(l,JSON.stringify(x))}catch{}}let Fa=Ir(Pn,.5),In=Number.isFinite(Fa)?Math.min(1.5,Math.max(.5,Fa)):.5,Lr=["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"],oi=Ir(Pr,[]),En=new Set(Array.isArray(oi)?oi.filter(l=>Lr.includes(l)):[]),Kt,Bi,Vt,kn,wn=-1,fn=null,Dr=null,fs=null,Bs=document.createElement("div");Bs.id="aa-pinned-model-name-labels",d.append(Bs);let zs=document.createElement("div");zs.id="aa-lineage-overflow-direction-labels",d.append(zs);let Zn,b,H,j,Z,q,ve,Fe,Ae,Be,Ge,nt=[],Ye,Ve,$e,ft,_t,pt,zt,Ue,Ot,We=document.createElement("div");We.id="aa-threejs-model-tooltip",We.className="aa-threejs-model-tooltip",We.hidden=!0;let pn=document.createElement("div");We.append(pn);let cn=ze("div","aa-touch-details-actions"),mn=ze("button","aa-secondary-button");mn.type="button",mn.addEventListener("click",()=>{fn&&ue!==null&&ka(fn.base_model_name)});let li=ze("button","aa-secondary-button","\u5173\u95ED\u8BE6\u60C5");li.type="button",li.addEventListener("click",_n),cn.append(li),f.appendChild(We);let xt=[],Lt=new WeakMap,Jn=0,Et="";document.fonts?.ready.then(()=>{Lt=new WeakMap,Ht()});function jn(l,x,M){let S=document.createElement("div");if(S.className=M?"aa-threejs-axis-label":"aa-threejs-axis-tick-label",S.dataset.axisName=l,S.textContent=x,M){let F=l==="x"?"\u8D8A\u4F4E\u8D8A\u597D":"\u8D8A\u9AD8\u8D8A\u597D";S.dataset.directionHint=` ${l==="x"?"\u2193":"\u2191"} ${F}`,S.setAttribute("aria-label",`${x}\uFF0C${F}`)}return d.appendChild(S),S}function zi(){let{width:l,height:x}=d.getBoundingClientRect(),M=`${l}:${x}:${window.innerWidth}:${window.innerHeight}`;M!==Et&&(Lt=new WeakMap,Et=M);let S=xt.flatMap(W=>W.labels).filter(({element:W})=>!Lt.has(W));for(let{element:W}of S)W.hidden=!1;for(let{element:W}of S)Lt.set(W,{width:W.offsetWidth,height:W.offsetHeight}),Jn+=1;let F=W=>{let oe=W.clone().project(D);return{x:(oe.x+1)*l/2,y:(1-oe.y)*x/2,depth:oe.z}},V=new Map,ne=xt.map(({start:W,end:oe,labels:le},Se)=>({projectedStart:F(W),projectedEnd:F(oe),labels:le.map(({element:Ce,position:je,isTitle:ot},Rt)=>{let wt=`${Se}:${Rt}`;V.set(wt,Ce);let Xt=F(je);return{id:wt,isTitle:ot,anchor:Xt,projectedDepth:Xt.depth,...Lt.get(Ce)}})}));for(let W of fp({canvasWidth:l,canvasHeight:x,projectedCenter:F(new O),axes:ne})){let oe=V.get(W.id);oe.hidden=W.hidden,!W.hidden&&(oe.style.transform=`translate(-50%, -50%) rotate(${W.rotationDegrees}deg)`,oe.style.left=`${W.x}px`,oe.style.top=`${W.y}px`)}}function Ht(){ln||Q||(ln=!0,window.requestAnimationFrame(()=>{ln=!1,!Q&&(N.render(k,D),zi(),Ku(),Fu())}))}te.addEventListener("change",Ht);function Ua(l){for(;l.children.length;){let x=l.children.pop();x.userData.foregroundMaterial?.dispose(),x.userData.dateFadedMaterial?.dispose(),!x.isSprite&&x.geometry&&x.geometry.dispose&&x.geometry.dispose(),x.material&&x.material.dispose&&!x.userData.sharedMaterial&&x.material.dispose()}}function Ap(l,x){return x.scale_type==="log"?Math.log10(Math.max(Number(l),Number.MIN_VALUE)):Number(l)}function Oa(l,x){let M=x.fixed_range,S=Number(M[0]),F=Number(M[1]),V=Ap(l,x);return!Number.isFinite(V)||F===S?0:-1+2*(V-S)/(F-S)}function ps(l,x,M){let S=ge.three_dimensional_axis_configuration;return new O(Oa(l,S.x_axis),Oa(x,S.y_axis),Oa(M,S.z_axis))}function Ba(l){return ps(l.x,l.y,l.z).clampScalar(-1,1)}function wu(l){let x=ps(l.x,l.y,l.z);return["\u6210\u672C","\u901F\u5EA6","\u667A\u80FD"].flatMap((M,S)=>{let F=x.getComponent(S);return F<-1?[`${M}\u4F4E\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2193`]:F>1?[`${M}\u9AD8\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2191`]:[]}).join("\uFF1B")}function Nr(l,x,M=1){let S=new nn;S.setAttribute("position",new kt(l.flatMap(V=>V.toArray()),3));let F=new xr({color:x,linewidth:M});return new ua(S,F)}function za(l,x,M,S=!1){let F=new Cr;F.setPositions(l.flatMap(W=>W.toArray()));let V=new Rr({color:x,linewidth:M,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,dashed:S});V.resolution.set(d.clientWidth,d.clientHeight);let ne=new Ql(F,V);return ne.renderOrder=100,S&&ne.computeLineDistances(),ne}function Tp(){Ua(J);let l=(ne,W,oe)=>new O(ne,W,oe),x=[[l(-1,-1,-1),l(1,-1,-1)],[l(-1,1,-1),l(1,1,-1)],[l(-1,-1,1),l(1,-1,1)],[l(-1,1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,1,-1)],[l(1,-1,-1),l(1,1,-1)],[l(-1,-1,1),l(-1,1,1)],[l(1,-1,1),l(1,1,1)],[l(-1,-1,-1),l(-1,-1,1)],[l(1,-1,-1),l(1,-1,1)],[l(-1,1,-1),l(-1,1,1)],[l(1,1,-1),l(1,1,1)]];J.add(Nr(x.flat(),6583435)),xt.forEach(({labels:ne})=>ne.forEach(({element:W})=>W.remove())),xt.length=0;let M=ge.three_dimensional_axis_configuration,S=[],F=[];[["x",l(-1,1,-1),l(1,1,-1),l(0,.04,0)],["y",l(-1,-1,-1),l(-1,1,-1),l(-.04,0,0)],["z",l(-1,-1,-1),l(-1,-1,1),l(-.04,0,0)]].forEach(([ne,W,oe,le])=>{let Se=M[`${ne}_axis`],Ce=[{element:jn(ne,Se.title_text,!0),position:W.clone().lerp(oe,.5),isTitle:!0}];F.push(W,oe),lp(Se).forEach(je=>{let ot=Oa(je,Se),Rt=W.clone().lerp(oe,(ot+1)/2);F.push(Rt,Rt.clone().add(le));let wt=jn(ne,Math.abs(je)>=1e6||je!==0&&Math.abs(je)<.001?je.toExponential():String(je),!1);wt.dataset.axisValue=String(je),Ce.push({element:wt,position:Rt,isTitle:!1}),ne==="x"?S.push(l(ot,-1,-1),l(ot,1,-1)):ne==="y"?S.push(l(-1,ot,-1),l(1,ot,-1)):S.push(l(-1,-1,ot),l(-1,1,ot),l(-1,1,ot),l(1,1,ot))}),xt.push({start:W,end:oe,labels:Ce})}),J.add(Nr(F,3359061));let V=Nr(S,14212838);V.material.transparent=!0,V.material.opacity=.72,J.add(V)}function ks(l){return typeof l=="number"&&Number.isFinite(l)}function sc(l,x,M){let S=l?l[x]:void 0;return Array.isArray(S)?S:(S!=null&&(M.nonFiniteValueCount+=1),[])}function Au(l,x){C+=x.nonFiniteValueCount,_+=x.outOfRangeIndexCount,G.push(l),console.warn(`Frontier 3D \u5951\u7EA6\u51E0\u4F55 ${l} \u542B\u975E\u6709\u9650\u5750\u6807/\u7D22\u5F15\u6216\u7ED3\u6784\u4E0D\u4E00\u81F4\uFF0C\u5DF2\u8DF3\u8FC7\u7ED8\u5236`,x)}function Tu(l,x){let M={nonFiniteValueCount:0,outOfRangeIndexCount:0},S=["x_coordinates","y_coordinates","z_coordinates"].map(Se=>sc(l,Se,M)),[F,V,ne]=S,W=F.length===V.length&&F.length===ne.length;if(S.forEach(Se=>Se.forEach(Ce=>{Ce!=null&&!ks(Ce)&&(M.nonFiniteValueCount+=1)})),!W||M.nonFiniteValueCount)return Au(x,M),[];let oe=[],le=null;for(let Se=0;Se<F.length;Se+=1){let Ce=[F[Se],V[Se],ne[Se]];if(Ce.some(ot=>ot==null)){le=null;continue}let je=ps(...Ce);le&&oe.push(le,je),le=je}return oe}function Cu(l,x,M){let S={nonFiniteValueCount:0,outOfRangeIndexCount:0},[F,V,ne]=["x_coordinates","y_coordinates","z_coordinates"].map(At=>sc(l,At,S)),W=["triangle_vertex_index_a","triangle_vertex_index_b","triangle_vertex_index_c"].map(At=>sc(l,At,S)),oe=F.length,le=W[0].length,Se=["x_coordinates","y_coordinates","z_coordinates"].every(At=>Array.isArray(l?.[At]));if([F,V,ne].forEach(At=>At.forEach(Ln=>{ks(Ln)||(S.nonFiniteValueCount+=1)})),W.forEach(At=>At.forEach(Ln=>{!ks(Ln)||!Number.isInteger(Ln)?S.nonFiniteValueCount+=1:Se&&(Ln<0||Ln>=oe)&&(S.outOfRangeIndexCount+=1)})),!(V.length===oe&&ne.length===oe&&W.every(At=>At.length===le))||S.nonFiniteValueCount||S.outOfRangeIndexCount)return Au(M,S),null;if(!oe||!le)return null;let je=F.flatMap((At,Ln)=>ps(At,V[Ln],ne[Ln]).toArray()),ot=[];for(let At=0;At<le;At+=1)ot.push(W[0][At],W[1][At],W[2][At]);let Rt=new nn;Rt.setAttribute("position",new kt(je,3)),Rt.setIndex(ot),Rt.computeVertexNormals();let wt=new Rs({side:qn,transparent:!0,depthTest:!0,depthWrite:!1,...x}),Xt=new sn(Rt,wt);return Xt.renderOrder=60,Xt}function Cp(){Ua(re);let l=Tu(ge.pareto_frontier_wireframe_line_segments,"pareto_frontier_wireframe_line_segments");at=l.length?Nr(l,2383002,2):null,at&&re.add(at),Je=Cu(ge.pareto_frontier_surface_triangle_mesh,{color:3244733,opacity:.25},"pareto_frontier_surface_triangle_mesh"),Je&&re.add(Je),mt=Cu(ge.achievable_frontier_surface_triangle_mesh,{color:3253076,opacity:.2},"achievable_frontier_surface_triangle_mesh"),mt&&re.add(mt);let x=ge.exact_achievable_frontier_boundary_line_segments,M=x?Tu(x,"exact_achievable_frontier_boundary_line_segments"):[];bt=M.length?Nr(M,2193980,1):null,bt&&re.add(bt),vc()}function Vn(l){let x=document.createElement("canvas");x.width=128,x.height=128;let M=x.getContext("2d");l(M,x.width,x.height);let S=new Ps(x);return S.colorSpace=qt,S.needsUpdate=!0,S}function rc(l,x,M,S,F,V){let ne=Math.min(V,S/2,F/2);l.beginPath(),l.roundRect(x,M,S,F,ne)}let Rp=Vn(l=>{rc(l,8,8,112,112,24),l.fillStyle="rgba(255,255,255,0.96)",l.fill(),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.45)",l.stroke()}),Pp=Vn(l=>{rc(l,10,10,108,108,24),l.fillStyle="rgba(241,245,249,0.62)",l.fill(),l.setLineDash([14,9]),l.lineWidth=6,l.strokeStyle="rgba(71,85,105,0.9)",l.stroke()}),Ip=.42,ac=Vn(l=>{l.beginPath(),l.arc(64,64,53,0,Math.PI*2),l.lineWidth=10,l.strokeStyle="rgba(15,23,42,0.66)",l.stroke()}),Lp=Vn(l=>{let x=l.createRadialGradient(64,64,32,64,64,63);x.addColorStop(0,"rgba(49,130,189,0)"),x.addColorStop(.65,"rgba(49,130,189,0.32)"),x.addColorStop(1,"rgba(49,130,189,0)"),l.fillStyle=x,l.fillRect(0,0,128,128)}),Dp=Vn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.setLineDash([8,8]),l.lineWidth=5,l.strokeStyle="rgba(71,85,105,0.8)",l.stroke()}),oc=Object.fromEntries([["robust","#16a34a",!1],["sensitive","#b45309",!0],["near","#a855f7",!0],["new_entry","#0891b2",!1]].map(([l,x,M])=>[l,ci(Vn(S=>{S.beginPath(),S.arc(64,64,54,0,Math.PI*2),S.lineWidth=6,S.strokeStyle=x,M&&S.setLineDash([9,7]),S.stroke()}))])),Np=Vn(l=>{l.beginPath(),l.arc(64,64,54,0,Math.PI*2),l.lineWidth=12,l.strokeStyle="rgba(234,179,8,0.98)",l.stroke()}),Fp=Vn(l=>{l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.fillStyle="rgba(100,116,139,0.96)",l.fill(),l.lineWidth=8,l.strokeStyle="rgba(255,255,255,0.98)",l.stroke()}),Ru={china:Vn(l=>{l.beginPath(),l.arc(64,64,52,0,Math.PI*2),l.lineWidth=8,l.strokeStyle="#dc2626",l.stroke(),l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.lineWidth=4,l.strokeStyle="#dc2626",l.stroke()}),united_states:Vn(l=>{rc(l,12,12,104,104,25),l.lineWidth=10,l.strokeStyle="#2563eb",l.stroke()}),other:Vn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#4b5563",l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()}),unclassified:Vn(l=>{l.save(),l.translate(64,64),l.rotate(Math.PI/4),l.strokeStyle="#9ca3af",l.setLineDash([10,8]),l.lineWidth=9,l.strokeRect(-39,-39,78,78),l.restore()})};function ci(l,{depthWrite:x=!1}={}){return new Ts({map:l,transparent:!0,depthTest:!0,depthWrite:x,alphaTest:.02,sizeAttenuation:!1})}let lc=ci(Rp,{depthWrite:!0}),cc=ci(Pp,{depthWrite:!0}),Pu=ci(ac),Iu=ci(Np),hc=ci(Lp),Lu=ci(Dp),uc=ci(Fp);uc.depthTest=!1;let dc=Object.fromEntries(Object.entries(Ru).map(([l,x])=>[l,ci(x)]));[lc,cc,Pu,hc,Lu,Iu,uc,...Object.values(dc)].forEach(l=>{l.userData={sharedMaterial:!0}});function ki(l,x,M,S){let F=new Cs(l);return F.position.copy(x),Fr(F,M),F.renderOrder=S,F.userData.sharedMaterial=!0,ce.add(F),F}function Fr(l,x){l.userData.cssPixelSize=x;let M=x*In*2*Math.tan(gi.degToRad(D.fov/2))/Math.max(1,d.clientHeight);l.scale.set(M,M,1)}function fc(l){if(!Number.isFinite(Number(l)))return!1;In=Math.min(1.5,Math.max(.5,Number(l))),Kt&&(Kt.value=String(In)),Bi&&(Bi.textContent=`${Wt(In)}\xD7`);for(let x of[ce,pe])x.children.filter(M=>M.isSprite).forEach(M=>Fr(M,M.userData.cssPixelSize));return ds(Pn,In),Ht(),L(),!0}function pc(l){return!Re.has(l)}function gn(l){return l?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant!==!1}function mc(l){return l?.analysis_eligibility?.ineligibility_reason_text||I}function Nt(l){let x=ye[l],M=Oe[l];return!x||!M||M.hasNonFiniteContractCoordinate?!1:gc(l).length===0}function gc(l){let x=ye[l];if(!x)return[];let M=[],S=hs(x,P);return S.visible||M.push(S.reason),pc(x.creator)||M.push("\u5382\u5546\u7B5B\u9009"),z&&!gn(x)&&M.push("\u4EC5\u5F53\u671F\u53EF\u6BD4"),!Dt&&x.displayed_only_because_of_recent_release_grace_period===!0&&M.push("\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u5DF2\u5173\u95ED"),Oe[l]?.hasNonFiniteContractCoordinate&&M.push("\u5750\u6807\u65E0\u6548"),M}let Du={};function Up(l,x){let M=Du[l];return M||(M=x.clone(),M.opacity=Ip,M.userData={sharedMaterial:!0},Du[l]=M),M}function Op(l,x){let M=document.createElement("canvas");M.width=256,M.height=256;let S=M.getContext("2d"),F=new Ps(M);F.colorSpace=qt;let V=ci(F);V.userData={sharedMaterial:!0},rt[l]="loading";let ne=new Image;return ne.onload=()=>{let W=Math.max(1,ne.naturalWidth),oe=Math.max(1,ne.naturalHeight),le=Math.min(224/W,224/oe),Se=W*le,Ce=oe*le;S.clearRect(0,0,M.width,M.height),S.drawImage(ne,(M.width-Se)/2,(M.height-Ce)/2,Se,Ce),F.needsUpdate=!0,rt[l]="loaded",Ht()},ne.onerror=()=>{rt[l]="failed",console.error(`Unable to decode organization brand asset: ${l}`)},ne.src=x.logo_visualization_data_url,V}function Bp(){Ua(ce),Oe=[],Qe=[],He=[],ye.forEach((l,x)=>{let M=[l.x,l.y,l.z].filter(Xt=>!ks(Xt)).length;C+=M;let S=M?new O:ps(l.x,l.y,l.z),F=c[l.creator],V=gn(l),ne=ki(V?lc:cc,S,$n.backplate,30),W=F.country_region_category,oe=ki(dc[W]||dc.unclassified,S,$n.countryRegion,20);oe.visible=ct;let le=et[l.creator];le||(le=Op(l.creator,F),et[l.creator]=le);let Se=ki(V?le:Up(l.creator,le),S,$n.logo,40);[ne,Se].forEach(Xt=>{Xt.userData.modelIndex=x,Xt.userData.interactionTargetKind="displayed_model"}),Qe.push(Se),He.push(ne,Se);let Ce=ki(Pu,S,$n.paretoRing,45);Ce.visible=l.panel.layer===1;let je=ki(hc,S,$n.standoutHalo,15);je.visible=l.panel.layer===1;let ot=ki(Iu,S,$n.pinnedRing,50);ot.visible=!1;let Rt=ki(oc.robust,S,60,48);Rt.visible=!1;let wt=ki(oc.new_entry,S,70,47);wt.visible=!1,Oe.push({sensitivityRingSprite:Rt,newFrontierEntrySprite:wt,creatorName:l.creator,isAnalysisEligible:V,hasNonFiniteContractCoordinate:M>0,logoSprite:Se,backplateSprite:ne,countryRegionSprite:oe,paretoRingSprite:Ce,standoutHaloSprite:je,pinnedRingSprite:ot})}),ms(),Xs(),_s()}function ms(){Ec(),(ue!==null&&!Nt(ue)||$&&!Ur($))&&_n(),Oe.forEach((l,x)=>{let M=ye[x],S=Nt(x);l.logoSprite.visible=S,l.backplateSprite.visible=S,l.countryRegionSprite.visible=S&&ct,l.paretoRingSprite.visible=S&&M.panel?.layer===1,l.standoutHaloSprite.visible=S&&M.panel?.layer===1,l.pinnedRingSprite.visible=S&&Ie(M)}),Em(),sd(),$u(),Ga(),Or(),Ei(),Lc(),nd(),pt&&_s(),Ht(),L()}function _c(l){return z=!!l,j&&(j.checked=z),ms(),Promise.resolve(z)}function xc(l){return Dt=w>0&&!!l,tt&&(tt.checked=Dt),ms(),Promise.resolve(Dt)}function yc(l){ct=!!l,H&&(H.checked=ct);let x=document.getElementById("aa-country-region-legend");return x&&(x.hidden=!ct),ct&&Ye&&(Ye.open=!0),ms(),Promise.resolve(ct)}function vc(){at&&(at.visible=!K&&Y==="wireframe"),Je&&(Je.visible=!K&&Y==="solid"),mt&&(mt.visible=K),bt&&(bt.visible=K),nt.forEach(l=>{l.disabled=K}),Ga(),Ae&&(Ae.textContent=K?"\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u672C\u53E3\u5F84\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684 Pareto \u70B9\uFF0C\u8868\u793A\u6700\u9AD8\u53EF\u8FBE\u667A\u80FD\uFF1B\u4E0D\u53EF\u8FBE\u533A\u7559\u767D\u3002":"\u76F8\u90BB Pareto \u70B9\u7684 Delaunay \u63D2\u503C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\uFF1B\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002",Xu()),Ht(),L()}function bc(l){return["wireframe","solid","hidden"].includes(l)?(Y=l,nt.forEach(x=>{x.setAttribute("aria-pressed",x.dataset.frontierStyle===Y?"true":"false")}),vc(),Promise.resolve(!0)):Promise.resolve(!1)}function Mc(l){return l&&ge.achievable_frontier_geometry_kind!=="exact_budget_steps"?Promise.resolve(!1):(K=!!l,Fe&&(Fe.checked=K),vc(),Promise.resolve(K))}function zp(){p.resetCamera({commit:!1})}function Ur(l){let x=l.creator||l.lineage_family_key?.split("||")[0];if(x&&!pc(x)||z&&!gn(l))return!1;let S=De.get(he(l))||{...l,panel:{release_date:l.release_date}};if(!hs(S,P).visible)return!1;if(!l.kept)return!0;let F=ye.findIndex(V=>l.model_uuid?V.model_uuid===l.model_uuid:V.name===l.name);return F>=0&&Nt(F)}function Nu(){Oe.forEach((l,x)=>{let M=Nt(x)&&(Ie(ye[x])||ue===x);for(let S of[l.logoSprite,l.backplateSprite,l.countryRegionSprite,l.paretoRingSprite,l.pinnedRingSprite,l.standoutHaloSprite,l.sensitivityRingSprite,l.newFrontierEntrySprite])S&&(S.userData.normalMaterial||(S.userData.normalMaterial=S.material,S.userData.normalRenderOrder=S.renderOrder),M&&!S.userData.foregroundMaterial&&(S.userData.foregroundMaterial=S.userData.normalMaterial.clone(),S.userData.foregroundMaterial.depthTest=!1,S.userData.foregroundMaterial.depthWrite=!1),S.material=M?S.userData.foregroundMaterial:S.userData.normalMaterial,hs(ye[x],P).faded&&(S.userData.dateFadedMaterial||(S.userData.dateFadedMaterial=S.material.clone()),S.userData.dateFadedMaterial.copy(S.material),S.userData.dateFadedMaterial.opacity=S.material.opacity*.24,S.userData.dateFadedMaterial.depthWrite=!1,S.material=S.userData.dateFadedMaterial),S.renderOrder=M?91+S.userData.normalRenderOrder/10:S.userData.normalRenderOrder)}),at&&(at.material.opacity=ue!==null||B!==null?.25:.9)}function Or(){Ua(pe),gt=[],It=null,Mt=null,ht=null;let l=new Set(ye.filter((W,oe)=>Ie(W)&&Nt(oe)).map(W=>W.lineage_key).filter(Boolean));fe&&l.add(fe);let x=[],M=new Set;function S(W,oe,le="previous_generation"){let Se=he(W);if(W.kept||M.has(Se)||!Ur(W))return;M.add(Se);let Ce=new Cs(uc);Ce.position.copy(Ba(W)),Fr(Ce,$n.prunedLineageAncestor),Ce.renderOrder=90,Ce.userData={sharedMaterial:!0,interactionTargetKind:"pruned_lineage_ancestor",lineageKey:oe,cssPixelSize:$n.prunedLineageAncestor,prunedLineageAncestorNode:{...W,relationship_kind:le}},pe.add(Ce),gt.push(Ce)}l.forEach(W=>{let oe=Me[W]||[];oe.forEach(le=>S(le,W));for(let le=1;le<oe.length;le+=1){let Se=oe[le-1],Ce=oe[le];!Ur(Se)||!Ur(Ce)||x.push(Ba(Se),Ba(Ce))}}),x.length&&(It=za(x,4674921,3),pe.add(It));let F=ue===null?null:ye[ue];if(F?.lineage_family_key&&!Me[F.lineage_key]){let oe=Object.entries(Me).flatMap(([le,Se])=>Se.map(Ce=>({key:le,node:Ce}))).filter(({node:le})=>le.lineage_family_key===F.lineage_family_key&&le.base_model_name===F.base_model_name&&Ur(le)).sort((le,Se)=>Se.node.reasoning_level_sort_order-le.node.reasoning_level_sort_order)[0];oe&&(ht=za([ps(F.x,F.y,F.z),Ba(oe.node)],4674921,3,!0),pe.add(ht),S(oe.node,oe.key,"same_generation_reasoning_variant"))}let V=new Set(ye.filter((W,oe)=>Ie(W)&&Nt(oe)).map(W=>W.base_model_name));Te&&V.add(Te);let ne=[];V.forEach(W=>{let oe=ie[W]||qe[W]||[];for(let le=1;le<oe.length;le+=1)if(!(!Nt(oe[le-1])||!Nt(oe[le])))for(let Se of[oe[le-1],oe[le]]){let Ce=ye[Se];ne.push(ps(Ce.x,Ce.y,Ce.z))}}),ne.length&&(Mt=za(ne,11024042,3.5),pe.add(Mt)),Nu(),Gr(),kp(),Ht()}function kp(){zs.replaceChildren(...gt.flatMap((l,x)=>{let M=wu(l.userData.prunedLineageAncestorNode);if(!M)return[];let S=ze("span","aa-lineage-overflow-direction-label",M);return S.dataset.ancestorIndex=String(x),[S]})),Fu()}function Fu(){for(let l of zs.children){let x=gt[Number(l.dataset.ancestorIndex)];if(!x){l.hidden=!0;continue}let M=x.position.clone().project(D);l.hidden=Math.abs(M.z)>1||Math.abs(M.x)>1||Math.abs(M.y)>1,l.style.left=`${Math.max(0,Math.min(d.clientWidth-l.offsetWidth,(M.x+1)*d.clientWidth/2+10))}px`,l.style.top=`${Math.max(0,Math.min(d.clientHeight-l.offsetHeight,(1-M.y)*d.clientHeight/2+10))}px`}}function Uu(){return Pe.speed_axis_field==="intelligence_index_tasks_per_hour"?"\u4EFB\u52A1/\u5C0F\u65F6":"tok/s"}function Sc(){return Pe.cost_axis_unit||a.cost_metric_definitions?.[h.split("__")[0]]?.unit||"USD"}function Vp(l){let x=l.panel||{},M=gn(l),S=(V,ne)=>`<section class="aa-tooltip-section"><b>${V}</b><br>${ne.join("<br>")}</section>`,F=[["cost_to_run","\u6709\u6548\u8FD0\u884C\u6210\u672C","USD"],["blended_price_cache_input_output_7_to_2_to_1","7:2:1 \u6DF7\u5408\u5355\u4EF7","USD/M tokens"],["eff_speed","\u6709\u6548\u901F\u5EA6","tok/s"],["output_speed","\u539F\u59CB\u901F\u5EA6","tok/s"]].filter(([V])=>![Pe.cost_axis_field,Pe.speed_axis_field].includes(V));return S("\u6A21\u578B\u8EAB\u4EFD",[`<strong>${Qt(l.name)}</strong>`,`${Qt(l.creator)} \xB7 ${Qt(l.reasoning_level_label||l.tier||"\u6863\u4F4D\u672A\u8BB0\u5F55")}`,`\u53D1\u5E03\uFF1A${Qt(x.release_date&&x.release_date!=="?"?x.release_date:"\u672A\u77E5\u53D1\u5E03\u65E5\u671F")}`])+S("\u5750\u6807\u4E0E\u5907\u7528\u53E3\u5F84",[`\u667A\u80FD\u6307\u6570\uFF1A${Wt(x.intelligence)}\uFF08${yu(l.intelligence_measurement_status)}\uFF09`,`\u667A\u80FD\u5206\u6765\u6E90\uFF1A${Qt(l.intelligence_measurement_evidence?.source?`\u5DF2\u63A5\u53D7\u7684 AA \u76EE\u5F55\uFF08v${l.intelligence_measurement_evidence.catalog_intelligence_index_version||"\u672A\u77E5"}\uFF1B${l.intelligence_measurement_evidence.catalog_captured_at_utc||"\u6293\u53D6\u65F6\u95F4\u672A\u77E5"}\uFF09`:"\u672A\u77E5\uFF1B\u539F\u59CB\u76EE\u5F55\u6807\u8BB0\u4E0D\u4F5C\u4E3A\u5B9E\u6D4B\u8BC1\u660E")}`,`\u4EFB\u52A1\u901F\u5EA6\uFF1A${Wt(x.intelligence_index_tasks_per_hour)} \u4EFB\u52A1/\u5C0F\u65F6\uFF1B\u667A\u80FD\u6307\u6570\u4EFB\u52A1\u8017\u65F6 ${Wt(x.artificial_analysis_intelligence_index_time_per_task_seconds)} \u79D2`,...l.intelligence_index_task_time_evidence?.unavailability_reason?[Qt(l.intelligence_index_task_time_evidence.unavailability_reason)]:[],`API \u7AEF\u5230\u7AEF\u5EF6\u8FDF\uFF08\u72EC\u7ACB\u5B57\u6BB5\uFF09\uFF1A${Wt(x.median_end_to_end_response_time_seconds)} \u79D2`,`${Qt(Pe.speed_axis_label)}\uFF1A${Wt(x[Pe.speed_axis_field])} ${Uu()}`,`${Qt(Pe.cost_axis_label)}\uFF1A${Wt(x[Pe.cost_axis_field])} ${Qt(Sc())}`,...F.map(([V,ne,W])=>`${ne}\uFF1A${Wt(x[V])} ${W}`),`\u5197\u957F\u5EA6\uFF1A${Wt(x.output_mtokens)} M tokens`])+S("\u654F\u611F\u6027\u5047\u8BBE\u4E0E\u5237\u65B0",[P.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`${tc(hd(l),x.layer===1)}\uFF1A\u667A\u80FD \xB1${P.sensitivity_intelligence_half_width}\uFF1B\u6210\u672C\u3001\u901F\u5EA6\u5404 \xB110%\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4\uFF0C\u4E0D\u8986\u76D6\u91CD\u5B9A\u6807\u8BEF\u5DEE`,ud().has(he(l))?"\u672C\u671F\u65B0\u5165\u524D\u6CBF\uFF08\u5339\u914D\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\uFF09":"\u524D\u6CBF\u8FDB\u51FA\u4EC5\u5728\u5386\u53F2\u79D1\u5B66\u5FEB\u7167\u53EF\u6BD4\u8F83\u65F6\u6807\u8BB0"])+S("\u524D\u6CBF\u4E0E\u7A81\u51FA\u5EA6",[M?`\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A${Wt(x.layer)}`:"\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A\u4E0D\u53C2\u4E0E\uFF08\u5386\u53F2\u53E3\u5F84\uFF09",`${Qt(Oi[ae].label)}\uFF1A${Ac(Hu(l))}`,`\u7A81\u51FA\u5EA6\u540D\u6B21\uFF1A${yt[l.name]?`${yt[l.name]} / ${Si().length}`:"\u672A\u53C2\u4E0E\u524D\u6CBF\u6392\u884C"}`,...M?[]:[Qt(mc(l))]])}function Hp(l){let x=wu(l);return[`<strong>${Qt(l.name)}</strong>`,l.relationship_kind==="same_generation_reasoning_variant"?"\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A":"\u8C31\u7CFB\u524D\u8EAB \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A",`\u53D1\u5E03\uFF1A${Qt(l.release_date)}`,`\u667A\u80FD\u6307\u6570\uFF1A${Wt(l.intelligence)}`,`${Qt(Pe.speed_axis_label)}\uFF1A${Wt(l.y)} ${Uu()}`,`${Qt(Pe.cost_axis_label)}\uFF1A${Wt(l.x)} ${Qt(Sc())}`,...x?[`\u7BB1\u58C1\u5939\u7D27\uFF1A${Qt(x)}\uFF1B\u4EE5\u4E0A\u6570\u503C\u4FDD\u7559\u539F\u503C\u3002`]:[]].join("<br>")}function Qt(l){let x=document.createElement("span");return x.textContent=String(l),x.innerHTML}function Iv(l,x=1){return l==null||!Number.isFinite(Number(l))?"?":Number(l).toFixed(x)}function Ou(){fn&&(ue===null?mn.remove():(mn.textContent=se(fn.base_model_name)?"\u53D6\u6D88\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D":"\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D",mn.parentElement||cn.prepend(mn)),cn.parentElement||We.append(cn))}function Br(l=!0){if(We.hidden)return;let x=ue===null?null:ye[ue],M=x?null:$;if(!x&&!M)return;let S=l?We.scrollTop:0;pn.innerHTML=x?Vp(x):Hp(M),fn&&(fn=x||M,Ou()),We.scrollTop=S,fs&&gs(fs)}function zr(l,x){if(l===ue&&B===null){x&&!We.hidden&&gs(x);return}if(ue=l,B=null,$=null,l===null){fe=null,Te=null,We.hidden=!0,Or();return}let M=ye[l];fe=M.lineage_key,Te=M.base_model_name,We.hidden=!1,Br(!1),gs(x||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),Or()}function Gp(l,x,M){if(B===x.name&&fe===l){M&&!We.hidden&&gs(M);return}ue=null,B=x.name,$=x,fe=l,Te=null,We.hidden=!1,Br(!1),gs(M||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),Or()}function gs(l){fs={clientX:l.clientX,clientY:l.clientY};let x=f.getBoundingClientRect();We.style.maxHeight=`${Math.max(0,x.height-16)}px`;let M=We.getBoundingClientRect(),S=Math.min(l.clientX-x.left+14,x.width-M.width-8),F=Math.min(l.clientY-x.top+14,x.height-M.height-8);We.style.left=`${Math.max(8,S)}px`,We.style.top=`${Math.max(8,F)}px`}function Wp(l,x){if(!l){_n();return}fn=l.interactionTargetKind==="displayed_model"?ye[l.modelIndex]:l.prunedLineageAncestorNode,We.classList.add("is-touch-details"),We.setAttribute("role","dialog"),We.setAttribute("aria-label","\u6A21\u578B\u8BE6\u60C5"),ku(l,x,!1),Br(),gs(x)}function Bu(){return[...He,...gt].filter(l=>l.visible)}function Vs(l,x){let M=N.domElement.getBoundingClientRect();ee.x=(l-M.left)/M.width*2-1,ee.y=-((x-M.top)/M.height)*2+1,X.setFromCamera(ee,D);let S=X.intersectObjects(Bu(),!1),F=S.filter(V=>!V.object.material.depthTest);return F.sort((V,ne)=>ne.object.renderOrder-V.object.renderOrder||V.distance-ne.distance),(F[0]||S[0])?.object.userData||null}function zu(l){return Vs(l.clientX,l.clientY)}let Xp=400,qp=25,hi=null,Hs=null,kr=!1,Mi=null,Hn=null,Gs=null,Ws=!1;function Ec(){Gs!==null&&window.clearTimeout(Gs),Gs=null}function _n(){fn=null,cn.remove(),We.classList.remove("is-touch-details"),We.removeAttribute("role"),We.removeAttribute("aria-label"),Ec(),Hn!==null&&window.cancelAnimationFrame(Hn),Hn=null,zr(null)}function ku(l,x,M=!0){if(!l){if(M&&(ue!==null||B!==null)){Gs===null&&(Gs=window.setTimeout(()=>{Gs=null,zr(null)},Xp));return}_n();return}Ec(),l.interactionTargetKind==="displayed_model"?zr(l.modelIndex,x):Gp(l.lineageKey,l.prunedLineageAncestorNode,x)}function wc(l=!1){if(fn||Ws||!Mi||N.getContext().isContextLost())return;let{clientX:x,clientY:M}=Mi,S=N.domElement.getBoundingClientRect();x<S.left||x>S.right||M<S.top||M>S.bottom||ku(Vs(x,M),Mi,l)}te.addEventListener("start",()=>{Ws=!0,hi||_n()}),te.addEventListener("end",()=>{Ws=!1,Hn!==null&&window.cancelAnimationFrame(Hn),Hn=window.requestAnimationFrame(()=>{Hn=null,wc()})}),te.addEventListener("change",()=>{_n(),Ws||(Hn=window.requestAnimationFrame(()=>{Hn=null,wc()}))}),N.domElement.addEventListener("pointerdown",l=>{if(l.button!==0)return;Dr=l.pointerType;let x=zu(l);hi={pointerId:l.pointerId,pointerType:l.pointerType,clientX:l.clientX,clientY:l.clientY,interactionTargetForDetails:x,displayedModelForClickPinToggle:x?.interactionTargetKind==="displayed_model"?ye[x.modelIndex]:null},Hs=null,Mi={clientX:l.clientX,clientY:l.clientY},kr=!1},{capture:!0}),N.domElement.addEventListener("pointermove",l=>{hi?.pointerId===l.pointerId&&(l.clientX-hi.clientX)**2+(l.clientY-hi.clientY)**2>=qp&&(kr=!0,_n()),l.pointerType!=="touch"&&(Mi={clientX:l.clientX,clientY:l.clientY},!(Ws||Hn!==null)&&(Hn=window.requestAnimationFrame(()=>{Hn=null,wc(!0)})))});function Yp(l){hi?.pointerId===l.pointerId&&(Hs=hi,hi=null,l.pointerType==="touch"&&!kr&&(Mi=null,Wp(Hs.interactionTargetForDetails,l)))}N.domElement.addEventListener("pointerup",Yp),N.domElement.addEventListener("pointercancel",l=>{hi?.pointerId===l.pointerId&&(hi=null),Hs=null,Mi=null,_n()}),N.domElement.addEventListener("pointerleave",l=>{fn||(Mi=null,_n())}),N.domElement.addEventListener("click",l=>{let x=Hs;if(Hs=null,Dr==="touch"||x?.pointerType==="touch"||l.pointerType==="touch")return;if(kr){kr=!1;return}let M=x?null:zu(l),S=x?x.displayedModelForClickPinToggle:M?.interactionTargetKind==="displayed_model"?ye[M.modelIndex]:null;S&&ka(S.base_model_name)});function Xs(){Oe.forEach((l,x)=>{let M=ye[x];l.pinnedRingSprite.visible=Nt(x)&&Ie(M)}),Or(),Lc(),ju(),Ou(),Ht(),L()}function ka(l){return we(l,!se(l))}function Vu(l,x=!0){x?xe.add(he(l)):xe.delete(he(l)),U(),Xs(),Ei()}function $p(l){let x=Oi[ae]?.modelMetricFieldName,M=l?.standout_metrics?.[x];return typeof M=="number"&&Number.isFinite(M)?M:NaN}function Hu(l){return!l||!gn(l)?NaN:Object.prototype.hasOwnProperty.call(ke,l.name)?ke[l.name]:$p(l)}function Ac(l){return ae===us.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Number.isFinite(l)&&St>0?`${Wt(l/St*100)}%`:"\u672A\u8BB0\u5F55":Wt(l)}function Si(){return ye.filter(l=>l.panel?.layer===1&&[l.x,l.y,l.z].every(ks))}function _s(){let l=Si(),x=ae===us.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Eu(l,Ne):null;St=x?.completeFrontierHypervolume??null;let M=x?.contributions||wp(l,ae,Ne),S=M.filter(Number.isFinite);ke={},l.forEach((F,V)=>{let ne=M[V];ke[F.name]=ne;let W=Oe[me[F.name]];if(!W)return;let oe=Number.isFinite(ne),le=oe&&S.length>1?(S.filter(ot=>ot<ne).length+(S.filter(ot=>ot===ne).length-1)/2)/(S.length-1):.5,Se=W.standoutHaloSprite,Ce=oe?hc:Lu;Se.userData.foregroundMaterial?.dispose(),Se.userData.foregroundMaterial=null,Se.userData.normalMaterial=Ce,Se.userData.normalRenderOrder=15,Se.material=Ce;let je=$n;Fr(Se,oe?je.standoutHaloMinimum+le*(je.standoutHaloMaximum-je.standoutHaloMinimum):je.missingStandoutHalo)}),yt={},l.map((F,V)=>({model:F,value:M[V]})).filter(F=>Number.isFinite(F.value)).sort((F,V)=>V.value-F.value).forEach((F,V)=>{yt[F.model.name]=V+1}),Br(),Nu(),Zp(l,M),Ha(),Ht(),L()}function Zp(l,x){if(!pt)return;let M=l.map((S,F)=>({model:S,value:x[F]})).sort((S,F)=>{let V=Number.isFinite(S.value)?S.value:-1/0;return(Number.isFinite(F.value)?F.value:-1/0)-V}).slice(0,12);pt.replaceChildren(...M.map((S,F)=>{let V=document.createElement("button");V.type="button",V.className="aa-ranking-row",V.addEventListener("click",()=>Vu(S.model)),V.setAttribute("aria-label",`\u56FA\u5B9A ${S.model.name}`);let ne=me[S.model.name];Nt(ne)||(V.classList.add("is-hidden-by-current-filter"),V.title="\u5DF2\u88AB\u5F53\u524D\u7B5B\u9009\u9690\u85CF\uFF0C\u540D\u6B21\u4ECD\u6309\u5168\u96C6\u8BA1\u7B97");let W=document.createElement("span");W.className="aa-truncate",W.textContent=`${F+1}. ${S.model.name}`;let oe=document.createElement("b");return oe.className="aa-ranking-value",oe.textContent=Ac(S.value),oe.title=St===null?`\u539F\u59CB\u503C\uFF1A${S.value}`:`\u6392\u4ED6\u8D21\u732E ${S.value} \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF ${St}`,V.append(W,oe),V}))}function Tc(l){return Oi[l]?(ae=l,_t&&(_t.value=l),Dc(),_s(),Promise.resolve(!0)):Promise.resolve(!1)}function Cc(l,x,M){Ne={intelligence:Na(l,Ne.intelligence),cost:Na(x,Ne.cost),speed:Na(M,Ne.speed)},zt&&Object.entries(Ne).forEach(([S,F])=>{let V=zt[S];V.slider.value=String(Math.log2(F)),V.number.value=F.toFixed(2)}),_s()}function Gu(l,x){let M=o[l];if(!M)return!1;Mi=null,_n();let S=D.position.clone(),F=D.quaternion.clone(),V=te.target.clone();return h=l,de=M,ge=de.three_dimensional_scene,Pe=de.interaction_relationships,C=0,_=0,G=[],ye=ge.displayed_model_markers||[],qe=Pe.base_groups||{},ie=Pe.reasoning_variant_group_model_indices_by_base_model_name||{},Me=Jp(Pe.lineages||{}),me={},ye.forEach((ne,W)=>{me[ne.name]=W}),window.FRONTIER_3D_INTERACTION_RELATIONSHIPS={models:ye,base_groups:qe,reasoning_variant_group_model_indices_by_base_model_name:ie,lineages:Me,cost_axis_field:Pe.cost_axis_field,speed_axis_field:Pe.speed_axis_field},ye.forEach(ne=>De.set(he(ne),ne)),U(),Tp(),Cp(),Bp(),Gr(),zr(null),x?(D.position.copy(S),D.quaternion.copy(F),te.target.copy(V),te.update()):zp(),nd(),sd(),Ga(),Yu(),Lc(),Ei(),_s(),Ht(),!0}function Jp(l){let x={};return Object.entries(l).forEach(([M,S])=>{let F=(Array.isArray(S)?S:[]).filter(V=>{if(!V?.lineage_family_key||!V?.reasoning_level_label)return!1;let ne=[V?.x,V?.y,V?.z].filter(W=>!ks(W)).length;return C+=ne,ne===0});F.length>=2&&(x[M]=F)}),x}function Vr(l,x){let M=`${l}__${x}`;if(M===h)return Promise.resolve(!1);let S=Gu(M,!0);return S&&(Zn.value=l,b.value=x,L()),Promise.resolve(S)}function Va(l){let x=document.createElement("div");x.className="aa-toolbar-group";let M=document.createElement("span");return M.className="aa-toolbar-group-label",M.textContent=l,x.appendChild(M),x}function Wu(l,x){let M=document.createElement("label");M.className="aa-toolbar-field";let S=document.createElement("span");return S.className="aa-toolbar-field-label",S.textContent=l,M.append(S,x),M}function jp(){let l=Va("\u5750\u6807\u8F74\u53E3\u5F84");l.id="aa-metric-controls",Zn=document.createElement("select"),Zn.id="aa-cost-metric-select",Object.entries(a.cost_metric_definitions).forEach(([V,ne])=>{let W=document.createElement("option");W.value=V,W.textContent=ne.label,Zn.appendChild(W)}),b=document.createElement("select"),b.id="aa-speed-metric-select",Object.entries(a.speed_metric_definitions).forEach(([V,ne])=>{let W=document.createElement("option");W.value=V,W.textContent=ne.label,b.appendChild(W)});let[x,M]=h.split("__");Zn.value=x,b.value=M,Zn.addEventListener("change",()=>Vr(Zn.value,b.value)),b.addEventListener("change",()=>Vr(Zn.value,b.value)),l.append(Wu("\u6210\u672C",Zn),Wu("\u901F\u5EA6",b));let S=ze("button","aa-secondary-button","\u53E3\u5F84\u8BF4\u660E");S.id="aa-metric-explanation-button",S.type="button",S.addEventListener("click",()=>qs(!0));let F=ze("button","aa-secondary-button","\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2");return F.id="aa-orthogonal-decomposition-preset",F.type="button",F.title="\u5207\u6362\u81F3 7:2:1 \u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u4FDD\u6301\u76F8\u673A",F.addEventListener("click",()=>Vr("blended","raw")),l.append(S,F),l}function Kp(){let l=Va("\u6A21\u578B\u6807\u8BC6");l.id="aa-model-identity-controls";let x=document.createElement("span");x.className="aa-model-identity-logo-status",x.textContent="\u5382\u5546 Logo";let M=document.createElement("label");M.className="aa-toggle-row",H=document.createElement("input"),H.id="aa-country-region-marker-toggle",H.type="checkbox",H.checked=ct,H.addEventListener("change",()=>yc(H.checked)),M.append(H,document.createTextNode("\u663E\u793A\u56FD\u522B\u5916\u6846"));let S=document.createElement("label");S.className="aa-toggle-row",S.title="\u9690\u85CF\u672C\u53E3\u5F84\u4E0B\u7528\u5230\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u6210\u672C\u6216\u5197\u957F\u5EA6\u7684\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF08\u865A\u7EBF\u5E95\u677F\uFF09\uFF1B\u9690\u85CF\u540E\u5B83\u4EEC\u4E5F\u4E0D\u53EF\u60AC\u505C\u6216\u70B9\u9009",j=document.createElement("input"),j.id="aa-show-only-current-intelligence-index-version-comparable-models-toggle",j.type="checkbox",j.checked=z,j.addEventListener("change",()=>_c(j.checked)),S.append(j,document.createTextNode("\u4EC5\u5F53\u671F\u53EF\u6BD4"));let F=document.createElement("label");F.className="aa-toggle-row",F.title="\u4EC5\u63A7\u5236\u53EA\u56E0\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u624D\u4FDD\u7559\u7684\u70B9\uFF1B\u4E0D\u91CD\u7B97\u5206\u6790\u3001\u5750\u6807\u8303\u56F4\u6216\u76F8\u673A",tt=document.createElement("input"),tt.id="aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle",tt.type="checkbox",tt.checked=Dt,tt.disabled=!(w>0),tt.addEventListener("change",()=>xc(tt.checked));let V=w===null?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":w===0?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u751F\u6210\u65F6\u5DF2\u5173\u95ED":`\u663E\u793A\u8FD1 ${w} \u4E2A\u6708\u53D1\u5E03\u7684\u8FDC\u79BB\u524D\u6CBF\u6A21\u578B`;F.append(tt,document.createTextNode(V)),l.append(x,M,S,F);let ne=ze("label","aa-marker-size-control","\u6807\u8BB0\u5C3A\u5BF8 ");return Kt=document.createElement("input"),Kt.id="aa-marker-size-slider",Kt.type="range",Kt.min="0.5",Kt.max="1.5",Kt.step="0.05",Kt.value=String(In),Kt.setAttribute("aria-label","\u6807\u8BB0\u5C3A\u5BF8\u500D\u6570\uFF0C1 \u500D\u5BF9\u5E94 Logo 22 \u50CF\u7D20"),Bi=ze("output","",`${Wt(In)}\xD7`),Bi.htmlFor=Kt.id,Kt.addEventListener("input",()=>fc(Number(Kt.value))),ne.append(Kt,Bi),l.append(ne),l}function Xu(){let l=K?"\u7CBE\u786E\u53EF\u8FBE\u9762":"\u975E\u5E15\u7D2F\u6258\u9762",x=Ae.hidden?"\u5C55\u5F00":"\u6536\u8D77";Be.textContent=l,Be.setAttribute("aria-label",`${x}\u51E0\u4F55\u8BF4\u660E\uFF1A${l}`),Be.title=`${x}\u51E0\u4F55\u8BF4\u660E\uFF1B\u5C55\u5F00\u540E\u4E00\u5206\u949F\u81EA\u52A8\u6536\u8D77`}function Rc(l){window.clearTimeout(Ge),Ae.hidden=!l,Be.setAttribute("aria-expanded",String(l)),Xu(),l&&(Ge=window.setTimeout(()=>Rc(!1),6e4))}function Qp(){let l=Va("\u524D\u6CBF\u63CF\u7ED8");l.classList.add("aa-frontier-geometry-controls");let x=document.createElement("div");x.className="aa-segmented-control",nt=[["wireframe","\u53C2\u7167\u7EBF\u6846"],["solid","\u53C2\u7167\u5B9E\u5FC3"],["hidden","\u9690\u85CF\u53C2\u7167"]].map(([F,V])=>{let ne=document.createElement("button");return ne.type="button",ne.textContent=V,ne.dataset.frontierStyle=F,ne.setAttribute("aria-pressed",F===Y?"true":"false"),ne.addEventListener("click",()=>bc(F)),x.appendChild(ne),ne});let M=document.createElement("label");M.className="aa-toggle-row",Fe=document.createElement("input"),Fe.id="aa-achievable-surface-toggle",Fe.type="checkbox",Fe.setAttribute("aria-describedby","aa-frontier-geometry-explanation"),Fe.addEventListener("change",()=>Mc(Fe.checked)),M.append(Fe,document.createTextNode("\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09")),Ae=ze("p","aa-frontier-geometry-explanation"),Ae.id="aa-frontier-geometry-explanation",Ae.setAttribute("role","status"),Be=document.createElement("button"),Be.id="aa-frontier-geometry-explanation-toggle",Be.className="aa-frontier-geometry-explanation-toggle",Be.type="button",Be.setAttribute("aria-controls",Ae.id),Be.addEventListener("click",()=>Rc(Ae.hidden));let S=document.createElement("div");return S.className="aa-frontier-geometry-toggle-and-explanation",S.append(M,Be,Ae),l.append(x,S),Rc(!0),l}function em(){let l=Va("\u7A81\u51FA\u5EA6\u53E3\u5F84");return _t=document.createElement("select"),_t.id="aa-standout-metric-select",_t.setAttribute("aria-label","\u7A81\u51FA\u5EA6\u6307\u6807"),Object.entries(Oi).forEach(([x,M])=>{let S=document.createElement("option");S.value=x,S.textContent=M.label,_t.appendChild(S)}),_t.value=ae,_t.addEventListener("change",()=>Tc(_t.value)),l.appendChild(_t),l}function Pc(l,x){let M=document.createElement("section");if(M.className="aa-control-section",M.id=l,x){let S=document.createElement("h2");S.className="aa-section-title",S.textContent=x,M.appendChild(S)}return M}function tm(){let l=Pc("aa-search-panel","\u641C\u7D22\u4E0E\u56FA\u5B9A");return $e=document.createElement("input"),$e.id="aa-search-input",$e.className="aa-search-input",$e.type="search",$e.placeholder="\u641C\u7D22\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D",$e.setAttribute("aria-label","\u641C\u7D22\u6A21\u578B\u3001\u57FA\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D"),$e.setAttribute("role","combobox"),$e.setAttribute("aria-expanded","false"),$e.setAttribute("aria-controls","aa-search-results"),$e.setAttribute("aria-autocomplete","list"),ft=ze("div","aa-search-results"),ft.id="aa-search-results",ft.setAttribute("role","region"),ft.setAttribute("aria-label","\u6A21\u578B\u641C\u7D22\u7ED3\u679C"),$e.addEventListener("input",()=>{wn=-1,Ei()}),$e.addEventListener("focus",Ei),l.addEventListener("keydown",x=>{let M=[...ft.querySelectorAll("button")];x.key==="Escape"?(x.preventDefault(),$e.value="",Ei(),$e.focus()):["ArrowDown","ArrowUp"].includes(x.key)&&M.length?(x.preventDefault(),wn=wn<0?x.key==="ArrowDown"?0:M.length-1:(wn+(x.key==="ArrowDown"?1:M.length-1))%M.length,M.forEach((S,F)=>S.classList.toggle("is-keyboard-active",F===wn)),$e.setAttribute("aria-activedescendant",M[wn].id),M[wn].scrollIntoView({block:"nearest"})):x.key==="Enter"&&x.target===$e&&M.length&&(x.preventDefault(),M[Math.max(0,wn)]?.click())}),l.append($e,ft),l}function qu(l){let x=[...ye.map((S,F)=>({...S,displayedModelIndex:F})),...(de?.excluded_models_with_drop_reason||[]).map(S=>{let F=S.model_uuid?De.get(S.model_uuid):[...De.values()].find(V=>V.name===S.name);return{...F,...S,base_model_name:S.base_model_name||F?.base_model_name||S.name}})],M=new Set(x.map(he));for(let S of de?.model_analysis_records||[])M.has(he(S))||x.push({...S,base_model_name:S.base_model_name||S.name});return hp(x,l)}function nm(l){return qu(l).groups.map(x=>x.baseModelName)}function Ei(){if(!ft||!$e)return;let{groups:l,totalGroupCount:x}=qu($e.value),M=!!$e.value.trim(),S=ze("div","aa-search-result-summary",`\u627E\u5230 ${x} \u7EC4${x>40?"\uFF0C\u4EC5\u663E\u793A\u524D 40 \u7EC4":""}`);S.setAttribute("role","status"),ft.replaceChildren(S,...l.map(({baseModelName:F,models:V},ne)=>{let W=V.filter(Ce=>Ce.displayedModelIndex!==void 0&&!Oe[Ce.displayedModelIndex]?.hasNonFiniteContractCoordinate),oe=document.createElement(W.length?"button":"div");oe.className="aa-result-row",oe.dataset.baseModelName=F,W.length&&(oe.type="button",oe.classList.add("aa-search-result-pin-button"),oe.id=`aa-search-result-action-${ne}`,oe.addEventListener("click",()=>ka(F))),Ee.has(F)&&oe.classList.add("is-pinned");let le=ze("span","aa-search-result-name",F),Se=V.slice().sort(pu).map(Ce=>{let je=Ce.reasoning_level_label||Ce.name;if(Ce.displayedModelIndex===void 0)return`${je}\uFF1A\u672A\u4E0A\u56FE\uFF0C${Ce.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807"}${Ce.missing_dimension_names?.length?`\uFF08\u7F3A\u5C11 ${Ce.missing_dimension_names.join("\u3001")}\uFF09`:""}`;let ot=gc(Ce.displayedModelIndex);return ot.length&&oe.classList.add("is-hidden-by-model-visibility-filter"),ot.includes("\u4EC5\u5F53\u671F\u53EF\u6BD4")&&oe.classList.add("is-hidden-by-comparable-only-toggle"),`${je}\uFF1A${ot.length?`\u7B5B\u9009\u9690\u85CF\uFF08${ot.join("\u3001")}\uFF09`:"\u5DF2\u4E0A\u56FE"}${gn(Ce)?"":`\uFF1B${mc(Ce)}`}`});return V.filter(Ce=>Ce.displayedModelIndex!==void 0).every(Ce=>!Nt(Ce.displayedModelIndex))&&oe.classList.add("is-hidden-by-current-filter"),oe.title=Se.join("\uFF1B"),le.append(ze("span","aa-search-result-hidden-note",Se.join("\uFF1B"))),oe.append(le),W.length&&oe.append(ze("span","aa-search-result-action-label",se(F)?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A")),oe})),ft.hidden=!M,ft.style.display=M?"block":"none",$e.setAttribute("aria-expanded",String(M)),$e.removeAttribute("aria-activedescendant")}function im(){let l=document.createElement("div");return l.id="aa-country-region-legend",l.className="aa-country-region-legend",l.hidden=!ct,[["china","\u4E2D\u56FD","\u53CC\u5706\u73AF"],["united-states","\u7F8E\u56FD","\u5706\u89D2\u65B9\u73AF"],["other","\u5176\u4ED6 / \u672A\u5206\u7C7B","\u83F1\u5F62\u73AF"]].forEach(([x,M,S])=>{let F=document.createElement("span");F.className="aa-country-region-legend-item",F.dataset.countryRegionCategory=x==="united-states"?"united_states":x,F.dataset.visibleCountryRegionModelCount="0";let V=document.createElement("span");V.className=`aa-country-region-swatch is-${x}`,V.setAttribute("aria-hidden","true"),F.append(V,document.createTextNode(`${M}\uFF08${S}\uFF09`)),F.append(ze("span","aa-country-region-visible-model-count"," \xB7 0")),l.appendChild(F)}),l}function sm(){return Ye=document.createElement("details"),Ye.id="aa-organization-filter-panel",Ye.className="aa-control-section aa-collapsible-section",Ye.open=!1,Ye}function Yu(){if(!Ye)return;let l=Ye.open,x={};ye.forEach(V=>{x[V.creator]=(x[V.creator]||0)+1});let M=document.createElement("summary");M.className="aa-section-title aa-collapsible-summary",M.id="aa-organization-filter-count-summary",M.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}\uFF09`;let S=Object.keys(x).sort((V,ne)=>V.localeCompare(ne)).map(V=>{let ne=c[V],W=document.createElement("label");W.className="aa-organization-filter-row",W.dataset.creatorName=V;let oe=document.createElement("input");oe.type="checkbox",oe.checked=!Re.has(V),oe.addEventListener("change",()=>{oe.checked?Re.delete(V):Re.add(V),ms()});let le=document.createElement("img");le.className="aa-organization-logo-preview",le.src=ne.logo_visualization_data_url,le.alt="";let Se=document.createElement("span");Se.className="aa-truncate",Se.textContent=V;let Ce=document.createElement("span");return Ce.className="aa-muted",Ce.dataset.visibleOrganizationModelCount="0",Ce.textContent=String(x[V]),W.append(oe,le,Se,Ce),W}),F=document.createElement("div");F.className="aa-organization-filter-rows",F.append(...S),Ye.replaceChildren(M,im(),F),Ye.open=l,$u()}function $u(){if(!Ye)return;let l={},x={},M={};ye.forEach((F,V)=>{if(l[F.creator]=(l[F.creator]||0)+1,!Nt(V))return;x[F.creator]=(x[F.creator]||0)+1;let ne=["china","united_states"].includes(F.country_region_category)?F.country_region_category:"other";M[ne]=(M[ne]||0)+1}),Ye.querySelectorAll(".aa-organization-filter-row").forEach(F=>{let V=x[F.dataset.creatorName]||0,ne=l[F.dataset.creatorName]||0,W=F.querySelector("[data-visible-organization-model-count]");W.dataset.visibleOrganizationModelCount=String(V),W.textContent=V===ne?String(ne):`${V}/${ne}`}),Ye.querySelectorAll("[data-country-region-category]").forEach(F=>{let V=M[F.dataset.countryRegionCategory]||0;F.dataset.visibleCountryRegionModelCount=String(V),F.querySelector(".aa-country-region-visible-model-count").textContent=` \xB7 ${V}`});let S=Ye.querySelector("#aa-organization-filter-count-summary");S&&(S.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}/${Object.keys(l).length}\uFF09`)}function rm(){return Ve=Pc("aa-pinned-panel","\u5DF2\u56FA\u5B9A"),Ve}function Ic(){return[...Ee].flatMap(l=>[...xe].map(x=>De.get(x)).filter(x=>x?.base_model_name===l).sort(pu))}function Zu(l){return ye.find(x=>he(x)===he(l))}function Ju(l){let x=ye.findIndex(M=>he(M)===he(l));return x<0?`\u5F53\u524D\u53E3\u5F84\u672A\u4E0A\u56FE\uFF1A${(de.excluded_models_with_drop_reason||[]).find(S=>S.model_uuid?S.model_uuid===l.model_uuid:S.name===l.name)?.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807\u6216\u5DF2\u88AB\u526A\u679D"}`:[...gc(x),...gn(ye[x])?[]:[mc(ye[x])]].join("\uFF1B")||"\u5F53\u671F\u53EF\u6BD4"}function Lc(){if(!Ve)return;let l=[...Ee];Ve.style.display=l.length?"block":"none";let x=ze("div","aa-pinned-header"),M=ze("h2","aa-section-title",`\u5DF2\u56FA\u5B9A\uFF08${xe.size} \u6863\u4F4D\uFF09`),S=ze("button","aa-link-button","\u6E05\u7A7A\u5168\u90E8");S.id="aa-clear-all-pinned-models",S.type="button",S.addEventListener("click",()=>{xe.clear(),U(),Xs(),Ei()}),x.append(M,S);let F=ze("div","aa-pinned-list");l.forEach(V=>{let ne=ze("article","aa-pinned-card"),W=ze("div","aa-pinned-card-header"),oe=ze("button","aa-link-button","\u79FB\u9664");oe.type="button",oe.setAttribute("aria-label",`\u79FB\u9664 ${V} \u7684\u5168\u90E8\u56FA\u5B9A\u6863\u4F4D`),oe.addEventListener("click",()=>we(V,!1)),W.append(ze("b","aa-truncate",V),oe),ne.append(W);for(let le of Ic().filter(Se=>Se.base_model_name===V)){let Se=Zu(le),Ce=ze("div","aa-pinned-variant-card",`${le.name} \xB7 \u667A\u80FD ${Wt(Se?.panel.intelligence??le.panel.intelligence)} \xB7 ${le.reasoning_level_label||"\u6863\u4F4D\u672A\u8BB0\u5F55"}`);Ce.dataset.modelIdentity=he(le);let je=Ju(le);Ce.append(ze("div","aa-pinned-model-status",je)),Se||Ce.classList.add("is-hidden-by-current-filter"),Se&&!gn(Se)&&Ce.classList.add("is-historical-intelligence-index-version"),le.model_uuid||Ce.append(ze("div","aa-muted","\u65E7\u5951\u7EA6\u7F3A\u5C11 UUID\uFF0C\u91CD\u65B0\u751F\u6210\u540E\u53EF\u6309\u7A33\u5B9A\u8EAB\u4EFD\u56FA\u5B9A")),ne.append(Ce)}F.append(ne)}),Ve.replaceChildren(x,F),Ha(),ju()}function am(){Vt=document.createElement("details"),Vt.id="aa-pinned-comparison-panel";let l=ze("summary","aa-section-title","\u5C55\u5F00\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4"),x=ze("fieldset","aa-comparison-field-controls");x.append(ze("legend","","\u53EF\u9009\u5B57\u6BB5\uFF08\u81EA\u52A8\u4FDD\u5B58\uFF09"));let M={output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"};for(let S of Lr){let F=ze("label","aa-checkbox-chip"),V=document.createElement("input");V.type="checkbox",V.checked=En.has(S),V.dataset.comparisonField=S,V.addEventListener("change",()=>{V.checked?En.add(S):En.delete(S),ds(Pr,[...En]),Ha(),L()}),F.append(V,document.createTextNode(M[S])),x.append(F)}kn=ze("div","aa-comparison-table-scroll-region"),kn.tabIndex=0,kn.setAttribute("aria-label","\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\u8868\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8"),Vt.append(l,x,kn),ad(kn),Vt.addEventListener("toggle",()=>{Vt.open&&window.matchMedia("(max-width: 1024px)").matches&&Hr(!0),rd(),L()}),u.append(Vt)}function Ha(){if(!Vt||!de)return;let l=Ic();Vt.hidden=l.length===0,Vt.querySelector("summary").textContent=`\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\uFF08${l.length} \u6863\u4F4D\uFF09`;let x=l.map(Zu),M=x.findIndex(le=>le&&gn(le)&&[le.x,le.y,le.z].every(Number.isFinite)),S=document.createElement("table");S.id="aa-pinned-comparison-table";let F=ze("caption","",M>=0?`\u0394% \u57FA\u51C6\uFF1A${l[M].name}\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u57FA\u51C6\u6216\u6700\u4F18\u503C\u9AD8\u4EAE\uFF1B\u96F6\u57FA\u51C6\u4E0D\u8BA1\u7B97\u767E\u5206\u6BD4\u3002`:"\u5F53\u524D\u53E3\u5F84\u6CA1\u6709\u53EF\u6BD4\u57FA\u51C6\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u6700\u4F18\u503C\u9AD8\u4EAE\u3002"),V=document.createElement("thead"),ne=document.createElement("tr");ne.append(ze("th","","\u6307\u6807")),l.forEach(le=>{let Se=ze("th","",le.name);Se.scope="col",Se.dataset.modelIdentity=he(le),ne.append(Se)}),V.append(ne);let W=[{field:"creator",label:"\u5382\u5546",identity:!0},{field:"reasoning_level_label",label:"\u63A8\u7406\u6863\u4F4D",identity:!0},{field:"release_date",label:"\u53D1\u5E03\u65E5\u671F",identity:!0},{field:"status",label:"\u5F53\u524D\u72B6\u6001",identity:!0},{field:"intelligence",label:"\u667A\u80FD\u6307\u6570",higherIsBetter:!0},{field:Pe.cost_axis_field,label:Pe.cost_axis_label,unit:Sc(),higherIsBetter:!1},{field:Pe.speed_axis_field,label:Pe.speed_axis_label,unit:"tok/s",higherIsBetter:!0},{field:"layer",label:"\u5E15\u7D2F\u6258\u5C42\u7EA7",higherIsBetter:!1},{field:"standout",label:Oi[ae].label,higherIsBetter:!0},...[...En].filter(le=>![Pe.cost_axis_field,Pe.speed_axis_field].includes(le)).map(le=>({field:le,label:{output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"}[le],unit:le==="output_mtokens"?"M tokens":["output_speed","eff_speed"].includes(le)?"tok/s":le==="cost_to_run"?"USD":"USD/M tokens",higherIsBetter:["output_speed","eff_speed"].includes(le)}))],oe=document.createElement("tbody");for(let le of W){let Se=document.createElement("tr");Se.dataset.comparisonField=le.field;let Ce=ze("th","",`${le.label}${le.unit?` (${le.unit})`:""}`);Ce.scope="row",Se.append(Ce);let je=l.map((wt,Xt)=>{if(le.field==="status")return Ju(wt);if(le.identity)return wt[le.field]??wt.panel?.[le.field]??"\u672A\u8BB0\u5F55";let At=x[Xt];return At?le.field==="standout"?Hu(At):At.panel?.[le.field]:null}),ot=je.filter((wt,Xt)=>x[Xt]&&gn(x[Xt])&&Number.isFinite(wt)),Rt=ot.length?le.higherIsBetter?Math.max(...ot):Math.min(...ot):null;je.forEach((wt,Xt)=>{let At=document.createElement("td"),Ln=x[Xt]&&gn(x[Xt]);if(At.textContent=le.identity?String(wt):x[Xt]?le.field==="standout"?Ac(wt):Wt(wt):"\u5F53\u524D\u53E3\u5F84\u7F3A\u5E2D",!le.identity&&Ln&&Number.isFinite(wt)&&wt===Rt&&At.classList.add("is-best-comparable-value"),!le.identity&&Ln&&M>=0){let Bc=up(wt,je[M]);Bc!==null&&At.append(ze("span","aa-comparison-delta",` \u0394 ${Bc>0?"+":""}${Wt(Bc)}%`))}Ln||At.classList.add("is-unavailable-for-comparison"),Se.append(At)}),oe.append(Se)}S.append(F,V,oe),kn.replaceChildren(S),Vi(kn)}function ju(){Bs.replaceChildren(...ye.flatMap((l,x)=>{if(!Ie(l)||!Nt(x))return[];let M=ze("span","aa-pinned-model-name-label",l.name);return M.dataset.modelIndex=String(x),[M]})),Ku()}function Ku(){let l=[...Bs.children],x=l.map((M,S)=>{let V=Oe[Number(M.dataset.modelIndex)]?.logoSprite.position?.clone().project(D);return M.hidden=!1,{id:S,visible:V&&Math.abs(V.z)<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1,x:V?(V.x+1)*d.clientWidth/2+12*In:0,y:V?(1-V.y)*d.clientHeight/2:0,width:M.offsetWidth,height:M.offsetHeight}});for(let M of dp(d.clientWidth,d.clientHeight,x)){let S=l[M.id];S.hidden=M.hidden,M.hidden||(S.style.left=`${M.x}px`,S.style.top=`${M.y}px`)}}function om(){let l=Pc("aa-standout-panel","\u7A81\u51FA\u5EA6");l.append(em());let x=ze("p","aa-weight-note");x.id="aa-standout-metric-description",l.append(x);let M=document.createElement("div");M.id="aa-standout-weight-controls",M.className="aa-weight-block",zt={},[["intelligence","\u667A\u80FD"],["cost","\u6210\u672C"],["speed","\u901F\u5EA6"]].forEach(([V,ne])=>{let W=document.createElement("div");W.className="aa-weight-row";let oe=document.createElement("span");oe.textContent=ne;let le=document.createElement("input");le.type="range",le.min="-2",le.max="2",le.step="0.05",le.value="0",le.id=`aa-weight-slider-${V}`;let Se=document.createElement("input");Se.type="number",Se.min="0.25",Se.max="4",Se.step="0.05",Se.value="1.00",Se.className="aa-weight-number",Se.id=`aa-weight-number-${V}`,Se.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD`),le.setAttribute("aria-label",`${ne}\u7A81\u51FA\u5EA6\u6743\u91CD\u6ED1\u6746`),le.addEventListener("input",()=>{Ne[V]=Math.pow(2,Number(le.value)),Se.value=Ne[V].toFixed(2),_s()});let Ce=()=>{let je=Na(Se.value,Ne[V]);Ne[V]=je,Se.value=je.toFixed(2),le.value=String(Math.log2(je)),_s()};Se.addEventListener("blur",Ce),Se.addEventListener("keydown",je=>{je.key==="Enter"&&(je.preventDefault(),Ce())}),W.append(oe,le,Se),M.appendChild(W),zt[V]={slider:le,number:Se}});let S=ze("button","aa-secondary-button","\u91CD\u7F6E\u4E09\u4E2A\u6743\u91CD\u4E3A 1");S.type="button",S.id="aa-reset-standout-axis-weights",S.addEventListener("click",()=>Cc(1,1,1)),M.append(ze("p","aa-weight-note","\u6743\u91CD\u4EE5\u6307\u6570\u6539\u53D8\u5F52\u4E00\u5750\u6807\uFF0C\u4EC5\u5F71\u54CD\u52A0\u6743\u8D85\u4F53\u79EF\uFF1B\u5141\u8BB8 0.25\u20134\u3002\u7F16\u8F91\u6570\u5B57\u540E\u6309 Enter \u6216\u79FB\u51FA\u7126\u70B9\u63D0\u4EA4\u3002"),S);let F=document.createElement("h3");return F.className="aa-section-title",F.textContent="\u524D\u6CBF\u6392\u884C\uFF08\u524D 12 \u540D\uFF09",pt=document.createElement("div"),pt.id="aa-standout-ranking",pt.className="aa-ranking-list",l.append(M,F,pt),Dc(),l}function Dc(){let l=document.getElementById("aa-standout-metric-description");l&&(l.textContent={trend_residual:"\u8D8B\u52BF\u6B8B\u5DEE\uFF1A\u6A21\u578B\u667A\u80FD\u76F8\u5BF9\u524D\u6CBF\u6210\u672C\u4E0E\u901F\u5EA6\u8D8B\u52BF\u62DF\u5408\u7684\u504F\u79BB\uFF0C\u8D8A\u9AD8\u8D8A\u7A81\u51FA\u3002",intelligence_uplift:"\u667A\u80FD\u62AC\u5347\uFF1A\u4E0E\u5176\u4ED6\u524D\u6CBF\u53C2\u7167\u76F8\u6BD4\u7684\u667A\u80FD\u589E\u91CF\uFF1B\u7F3A\u5C11\u53C2\u7167\u65F6\u4E0D\u8BA1\u7B97\u3002",weighted_exclusive_hypervolume:"\u52A0\u6743\u8D85\u4F53\u79EF\u5360\u6BD4 = \u8BE5\u6A21\u578B\u7684\u6392\u4ED6\u8D21\u732E \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF\u3002\u6309\u539F\u59CB\u8D21\u732E\u6392\u5E8F\uFF0C\u7B5B\u9009\u4E0D\u6539\u53D8\u5206\u6BCD\u3002",frontier_distance:"\u5230\u524D\u6CBF\u5782\u8DDD\uFF1A\u6CBF\u7528\u5F53\u524D\u5206\u6790\u65B9\u6CD5\u7684\u51E0\u4F55\u8DDD\u79BB\uFF1B\u4E0D\u8868\u793A\u5B9E\u9645\u53EF\u8FBE\u7684\u65B0\u6A21\u578B\u3002"}[ae]);let x=document.getElementById("aa-standout-weight-controls");x&&(x.hidden=!Oi[ae].usesAdjustableAxisWeights)}function lm(){return Ue=document.createElement("details"),Ue.id="aa-current-view-panel",Ue.className="aa-control-section aa-current-view-details",Ue.open=!0,Ue}function Qu(){return ge?.current_view||{}}function Nc(){return ye.filter(l=>!gn(l)).length}function Fc(){let l=E.current_intelligence_index_version;return l?`v${String(l).replace(/^v/i,"")}`:"\u7248\u672C\u672A\u77E5"}function ed(){let l=E.current_intelligence_index_version_source==="inferred_from_accepted_embedded_model_catalog_partition";return`${Fc()}${l?"\uFF08\u6309\u76EE\u5F55\u5206\u533A\u63A8\u5B9A\uFF09":""}`}function td(){let l=E.artificial_analysis_api_response_fetched_at_utc;if(!l)return{headerText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5",detailText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5\uFF08\u5951\u7EA6\u672A\u8BB0\u5F55 API \u6293\u53D6\u65F6\u95F4\uFF09"};let x=E.artificial_analysis_api_response_fetched_at_utc_source==="inferred_from_cache_file_modification_time";return{headerText:`API \u6293\u53D6\u4E8E ${String(l).slice(0,10)}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":""}`,detailText:`${l}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":"\uFF08\u6293\u53D6\u65F6\u8BB0\u5F55\uFF09"}`}}function cm(){let{rendererBundleSha256:l,generatorGitCommit:x,renderedAtUtc:M}=R,S=x.endsWith("-dirty"),F=x.replace(/-dirty$/,""),V=/^[0-9a-f]{40}$/.test(F)?F.slice(0,12):F;return[`bundle ${l.slice(0,12)}`,`commit ${V}${S?"-dirty":""}`,`\u6E32\u67D3 ${M}`].join(" \xB7 ")}function nd(){if(!Ue||!ge)return;let l=Qu(),x=document.createElement("summary");x.className="aa-section-title aa-collapsible-summary",x.textContent="\u5F53\u524D\u89C6\u56FE";let M=document.createElement("dl");M.className="aa-current-view-grid";let S=Nc();[["\u6E32\u67D3\u5668","three.js"],["\u6570\u636E\u65E5\u671F",l.data_date||a.data_date||"?"],["\u667A\u80FD\u6307\u6570",Fc()],["\u6210\u672C\u53E3\u5F84",l.cost_metric_label||Pe.cost_axis_label],["\u901F\u5EA6\u53E3\u5F84",l.speed_metric_label||Pe.speed_axis_label],["\u53EF\u89C1 / \u5951\u7EA6\u6A21\u578B\u6570",`${ye.filter((F,V)=>Nt(V)).length} / ${ye.length}`],["\u53C2\u4E0E\u5206\u6790\uFF08\u5951\u7EA6\u5168\u96C6\uFF09",String(ye.length-S)],["\u5386\u53F2\u53E3\u5F84\u70B9",String(S)],["\u5168\u5C40 Pareto \u6570",String(Si().length)],["\u53EF\u89C1 Pareto \u6570",String(Si().filter(F=>Nt(me[F.name])).length)],["\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650",w===null?"\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":`${w} \u4E2A\u6708 \xB7 ${Dt?"\u663E\u793A":"\u9690\u85CF"}\u5BBD\u9650\u4E13\u5C5E\u70B9`],["\u5BBD\u9650\u4E13\u5C5E\u70B9",String(ye.filter(F=>F.displayed_only_because_of_recent_release_grace_period===!0).length)],["\u526A\u679D\u53C2\u8003\u65E5",l.pruning_reference_date||E.pruning_reference_date||"\u672A\u8BB0\u5F55"],["\u4EA7\u7269\u6307\u7EB9",cm(),"aa-current-view-report-artifact-fingerprint"]].forEach(([F,V,ne])=>{let W=document.createElement("dt");W.textContent=F;let oe=document.createElement("dd");oe.textContent=V,ne&&(oe.id=ne,oe.title=[`renderer bundle sha256\uFF1A${R.rendererBundleSha256}`,`generator git commit\uFF1A${R.generatorGitCommit}`,`rendered at (UTC)\uFF1A${R.renderedAtUtc}`].join(`
`)),M.append(W,oe)}),Ue.replaceChildren(x,M)}function ze(l,x,M){let S=document.createElement(l);return x&&(S.className=x),M!==void 0&&(S.textContent=M),S}function id(l,x){let M=ze("a","aa-artificial-analysis-attribution-link",l);return x&&(M.id=x),M.href=T,M.target="_blank",M.rel="noopener noreferrer",M}function hm(){if(!A)return;let l=A.querySelector("h1")||ze("h1","frontier-3d-report-title",document.title),x=ze("div","aa-report-header-metadata-row");x.id="aa-report-header-metadata-row",x.tabIndex=0,x.setAttribute("aria-label","\u6A21\u578B\u8BA1\u6570\u4E0E\u6570\u636E\u6765\u6E90\uFF0C\u7A84\u5C4F\u53EF\u6A2A\u5411\u6EDA\u52A8"),ad(x);let M=id("\u6570\u636E\uFF1AArtificial Analysis","aa-report-header-artificial-analysis-attribution-link");M.append(ze("span","aa-external-link-glyph"," \u2197"));let S=td(),F=ze("span","aa-report-header-metadata-item",S.headerText);F.id="aa-report-header-artificial-analysis-api-fetch-date",F.title=S.detailText;let V=ze("span","aa-report-header-metadata-item",`\u667A\u80FD\u6307\u6570 ${ed()}`);V.id="aa-report-header-intelligence-index-version",Z=ze("span","aa-report-header-metadata-item"),Z.id="aa-report-header-model-count-summary",x.append(M,F,V,Z),q=ze("button","aa-how-to-read-drawer-toggle-button","\u5982\u4F55\u9605\u8BFB \u24D8"),q.type="button",q.id="aa-how-to-read-drawer-toggle",q.setAttribute("aria-expanded","false"),q.setAttribute("aria-controls","aa-how-to-read-drawer"),q.addEventListener("click",()=>qs(ve.hidden));let ne=ze("div","aa-report-header-title-row"),W=ze("div","aa-report-header-actions"),oe=ze("button","aa-secondary-button","\u89C6\u56FE\u8BBE\u7F6E");oe.type="button",oe.id="aa-view-settings-toggle",oe.setAttribute("aria-expanded","false"),oe.setAttribute("aria-controls",m.id),oe.addEventListener("click",()=>{let Ce=u.classList.toggle("is-view-settings-expanded");oe.setAttribute("aria-expanded",String(Ce))}),W.append(q,oe),ne.append(l,W);let le=[ne,x],Se=E.embedded_model_catalog_partition_rejection_warning_text;if(typeof Se=="string"&&Se.trim()){let Ce=ze("div","aa-report-header-data-quality-warning",`\u26A0 ${Se}`);Ce.id="aa-report-header-embedded-model-catalog-partition-rejection-warning",Ce.setAttribute("role","alert"),le.push(Ce)}A.replaceChildren(...le)}function sd(){if(!Z)return;let l=ye.length,x=ye.filter((V,ne)=>Nt(ne)).length,M=Nc(),S=[`\u5168\u90E8\u8F93\u5165 ${a.model_table_coverage==="all_input_records"?a.models.length:"\u672A\u77E5\uFF08\u65E7\u6587\u4EF6\u8986\u76D6\u6709\u9650\uFF09"}`,x===l?`\u663E\u793A ${l} \u4E2A\u6A21\u578B`:`\u663E\u793A ${x}/${l} \u4E2A\u6A21\u578B`,`\u5168\u5C40 Pareto ${Si().length}`,`\u53EF\u89C1 Pareto ${Si().filter(V=>Nt(me[V.name])).length}`],F=ye.filter((V,ne)=>!gn(V)&&Nt(ne)).length;M&&S.push(`\u5386\u53F2\u53E3\u5F84 ${F===M?M:`${F}/${M}`}`),Z.textContent=S.join(" \xB7 "),Vi(document.getElementById("aa-report-header-metadata-row"))}function um(l){return l.scrollWidth-l.clientWidth>1&&l.scrollLeft+l.clientWidth<l.scrollWidth-1}function Vi(l){l&&l.classList.toggle("has-inline-overflow-fade",um(l))}function rd(){Vi(document.getElementById("aa-report-header-metadata-row")),Vi(kn),window.requestAnimationFrame(()=>{Vi(document.getElementById("aa-report-header-metadata-row")),Vi(kn)})}function ad(l){!l||l.dataset.horizontalOverflowFadeBound==="true"||(l.dataset.horizontalOverflowFadeBound="true",l.addEventListener("scroll",()=>Vi(l),{passive:!0}),Vi(l))}function dm(){ve=document.createElement("section"),ve.id="aa-how-to-read-drawer",ve.className="aa-how-to-read-drawer",ve.setAttribute("aria-label","\u5982\u4F55\u9605\u8BFB\u672C\u56FE"),ve.tabIndex=-1,ve.hidden=!0,f.appendChild(ve),document.addEventListener("keydown",l=>{l.key==="Escape"&&!ve.hidden&&qs(!1),l.key==="Escape"&&fn&&_n()})}function qs(l){if(!ve)return Promise.resolve(!1);let x=!!l,M=!ve.hidden,S=ve.contains(document.activeElement);return x&&Ga(),ve.hidden=!x,q?.setAttribute("aria-expanded",String(x)),x&&!M?ve.focus({preventScroll:!0}):!x&&M&&S&&q?.focus({preventScroll:!0}),Promise.resolve(x)}function Hi(l,...x){let M=ze("section","aa-how-to-read-drawer-section");return M.append(ze("h3","aa-how-to-read-drawer-section-title",l),...x),M}function Ga(){if(!ve||!ge)return;let l=Qu(),x=ge.three_dimensional_axis_configuration||{},M=ze("div","aa-how-to-read-drawer-header"),S=ze("button","aa-link-button","\u5173\u95ED");S.type="button",S.id="aa-how-to-read-drawer-close-button",S.addEventListener("click",()=>qs(!1)),M.append(ze("h2","aa-section-title","\u5982\u4F55\u9605\u8BFB"),S);let F=ze("ul","aa-how-to-read-drawer-list");[[`\u6210\u672C\u8F74 x\uFF1A${x.x_axis?.title_text||l.cost_metric_label||"\u6210\u672C"}\u3002\u8D8A\u4F4E\u8D8A\u597D\uFF08\u8D8A\u4FBF\u5B9C\uFF09\u3002`,l.cost_metric_note?`\u53E3\u5F84\uFF1A${l.cost_metric_note}`:""],[`\u901F\u5EA6\u8F74 y\uFF1A${l.speed_axis_title_text||x.y_axis?.title_text||l.speed_metric_label||"\u901F\u5EA6"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,l.speed_metric_note?`\u53E3\u5F84\uFF1A${l.speed_metric_note}`:""],[`\u667A\u80FD\u8F74 z\uFF1A${x.z_axis?.title_text||"\u667A\u80FD\u6307\u6570"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,""]].forEach(([je,ot])=>{let Rt=ze("li","",je);ot&&Rt.append(ze("div","aa-how-to-read-drawer-metric-note",ot)),F.appendChild(Rt)});let V=Nc(),ne=ze("p","aa-how-to-read-drawer-paragraph");ne.append(ze("span","aa-historical-intelligence-index-version-swatch"),document.createTextNode(`\u865A\u7EBF\u5E95\u677F\u3001\u534A\u900F\u660E Logo \u7684\u70B9\u662F\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF1A\u672C\u53E3\u5F84\u7528\u5230\u7684\u6210\u672C\u6216\u5197\u957F\u5EA6\u6765\u81EA\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\uFF08\u5F53\u671F\u4E3A ${Fc()}\uFF09\u3002\u5B83\u4EEC\u7167\u5E38\u663E\u793A\uFF0C\u4F46\u4E0D\u53C2\u4E0E Pareto\u3001\u7A81\u51FA\u5EA6\u3001\u5F52\u4E00\u5316\u4E0E\u524D\u6CBF\u51E0\u4F55\u7684\u8BA1\u7B97\u3002\u5F53\u524D\u53E3\u5F84\u5171 ${V} \u4E2A\uFF1B\u52FE\u9009\u5DE5\u5177\u680F\u300C\u4EC5\u5F53\u671F\u53EF\u6BD4\u300D\u53EF\u9690\u85CF\u5B83\u4EEC\u3002`));let W=ze("dl","aa-current-view-grid"),oe=E.embedded_model_catalog_intelligence_index_version,le=E.embedded_model_catalog_captured_at_utc,Se=E.artificial_analysis_website_page_fetch_paused,Ce=E.artificial_analysis_api_tier;[["\u6570\u636E\u63D0\u4F9B\u65B9",id("Artificial Analysis")],["API \u6293\u53D6",td().detailText],["\u667A\u80FD\u6307\u6570",`${ed()}${Ce?`\uFF08API ${Ce} tier\uFF09`:""}`],["\u5185\u5D4C\u6A21\u578B\u76EE\u5F55",oe?`v${oe}${le?`\uFF0C\u7F13\u5B58\u4E8E ${le}`:""}`:"\u672A\u8BB0\u5F55"],["\u7F51\u9875\u6293\u53D6",Se===!0?"\u5DF2\u6682\u505C\uFF08\u53EA\u8BFB\u5DF2\u6709\u7F13\u5B58\uFF09":Se===!1?"\u5DF2\u5F00\u542F":"\u672A\u8BB0\u5F55"],["\u526A\u679D\u53C2\u8003\u65E5",E.pruning_reference_date||"\u672A\u8BB0\u5F55"]].forEach(([je,ot])=>{let Rt=document.createElement("dd");Rt.append(ot),W.append(ze("dt","",je),Rt)}),ve.replaceChildren(M,Hi("\u4E09\u4E2A\u5750\u6807\u8F74",F,ze("p","aa-how-to-read-drawer-paragraph","\u521D\u59CB\u89C6\u89D2\u4ECE\u300C\u4F4E\u6210\u672C\u3001\u9AD8\u901F\u5EA6\u3001\u9AD8\u667A\u80FD\u300D\u4E00\u89D2\u770B\u5411\u5BF9\u89D2\uFF1B\u62D6\u62FD\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u53F3\u952E\u62D6\u52A8\u5E73\u79FB\u3002")),Hi("Pareto \u524D\u6CBF",ze("p","aa-how-to-read-drawer-paragraph","\u5E26\u6DF1\u8272\u5706\u73AF\u7684\u70B9\u662F\u672C\u53E3\u5F84\u7684 Pareto \u70B9\uFF1A\u6CA1\u6709\u5176\u4ED6\u6A21\u578B\u5728\u6210\u672C\u3001\u901F\u5EA6\u3001\u667A\u80FD\u4E0A\u540C\u65F6\u4E0D\u5DEE\u4E14\u81F3\u5C11\u4E00\u7EF4\u66F4\u597D\u3002\u9ED8\u8BA4\u7684 Delaunay \u90BB\u63A5\u63D2\u503C\u8FDE\u63A5\u8FD9\u4E9B\u70B9\uFF0C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\u3002\u52FE\u9009\u300C\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09\u300D\u53EF\u5207\u6362\u4E3A\u5DF2\u5C55\u793A\u5206\u6790\u70B9\u7684\u7CBE\u786E\u9884\u7B97\u53EF\u8FBE\u9762\u3002")),Hi("\u5386\u53F2\u53E3\u5F84\u70B9",ne),Hi("\u53E3\u5F84\u4E0E\u6B63\u4EA4\u5206\u89E3",ze("p","aa-how-to-read-drawer-paragraph",[...Object.values(a.cost_metric_definitions||{}).map(je=>je.description||`${je.label}\uFF1A${je.unit||"USD"}`),...Object.values(a.speed_metric_definitions||{}).map(je=>je.description||`${je.label}\uFF1A\u751F\u6210\u901F\u5EA6 tok/s`),"\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2\u91C7\u7528\u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u5206\u522B\u89C2\u5BDF\u5355\u4EF7\u3001\u541E\u5410\u4E0E\u667A\u80FD\u3002\u6709\u6548\u6210\u672C\u4E0E\u6709\u6548\u901F\u5EA6\u90FD\u53D7\u5230\u8F93\u51FA\u957F\u5EA6\u5F71\u54CD\u3002\u5207\u6362\u53E3\u5F84\u4FDD\u7559\u76F8\u673A\uFF0C\u56FA\u5B9A\u8F74\u57DF\u6765\u81EA\u8BE5\u53E3\u5F84\u5B8C\u6574\u663E\u793A\u96C6\u5408\uFF1B\u7B5B\u9009\u548C\u5BBD\u9650\u5F00\u5173\u4E0D\u6539\u53D8\u8F74\u57DF\u3002"].join(" "))),Hi("\u56FE\u4F8B",ze("p","aa-how-to-read-drawer-paragraph",["\u6DF1\u8272\u73AF\uFF1A\u5E15\u7D2F\u6258\u8EAB\u4EFD\uFF1B\u91D1\u8272\u73AF\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\u5149\u6655\uFF1A\u5F53\u524D\u7A81\u51FA\u5EA6\u7684\u76F8\u5BF9\u5927\u5C0F\uFF0C\u865A\u7EBF\u5149\u6655\u8868\u793A\u7F3A\u5C11\u6570\u503C\u3002","\u7D2B\u8272\u5B9E\u7EBF\uFF1A\u540C\u4EE3\u63A8\u7406\u6863\u4F4D\uFF1B\u7070\u8272\u5B9E\u7EBF\uFF1A\u540C\u6863\u4F4D\u8DE8\u4EE3\u8C31\u7CFB\uFF1B\u7070\u8272\u865A\u7EBF\uFF1A\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D\u53C2\u7167\u3002\u7070\u70B9\uFF1A\u88AB\u526A\u679D\u7684\u8C31\u7CFB\u524D\u8EAB\uFF1B\u8D85\u8303\u56F4\u524D\u8EAB\u5939\u7D27\u5728\u7BB1\u58C1\uFF0C\u8BE6\u60C5\u7528 \u2191\u2193 \u63D0\u793A\u65B9\u5411\u5E76\u4FDD\u7559\u539F\u503C\u3002",K?"\u5F53\u524D\u663E\u793A\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684\u5E15\u7D2F\u6258\u70B9\u3002":`\u5F53\u524D${Y==="hidden"?"\u9690\u85CF":Y==="solid"?"\u663E\u793A\u5B9E\u5FC3":"\u663E\u793A\u7EBF\u6846"} Delaunay \u90BB\u63A5\u53C2\u7167\uFF0C\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002`,ct?"\u56FD\u522B\u5916\u6846\u5DF2\u5F00\u542F\uFF1A\u4E2D\u56FD\u53CC\u5706\u73AF\u3001\u7F8E\u56FD\u5706\u89D2\u65B9\u73AF\u3001\u5176\u4ED6\u83F1\u5F62\u73AF\uFF1B\u56FD\u522B\u53EA\u6807\u8BC6\u5382\u5546\u5F52\u5C5E\u3002":"\u56FD\u522B\u5916\u6846\u5173\u95ED\uFF1B\u5F00\u542F\u65F6\u540C\u6B65\u663E\u793A\u56FD\u522B\u56FE\u4F8B\u3002"].join(" "))),Hi("\u672A\u4E0A\u56FE\u6A21\u578B\u4E0E\u5382\u5546",ze("p","aa-how-to-read-drawer-paragraph",(()=>{let je=de.excluded_models_with_drop_reason||[],ot=[...new Set(je.map(Rt=>Rt.creator))].filter(Rt=>!ye.some(wt=>wt.creator===Rt));return`${je.length} \u4E2A\u6709\u667A\u80FD\u5206\u7684\u6A21\u578B\u672A\u4E0A\u56FE\u3002\u53EF\u5728\u641C\u7D22\u4E2D\u6309\u6A21\u578B\u6216\u5382\u5546\u67E5\u770B\u5B9E\u9645\u539F\u56E0\u3002${ot.map(Rt=>`${Rt}\uFF1A${[...new Set(je.filter(wt=>wt.creator===Rt).map(wt=>wt.drop_reason))].join("\u3001")}`).join("\uFF1B")}`})())),Hi("\u6570\u636E\u6765\u6E90",W),Hi("\u54C1\u724C\u4E0E\u8BB8\u53EF",ze("p","aa-how-to-read-drawer-paragraph","\u672C\u62A5\u544A\u4F7F\u7528 Lobe Icons \u7684 MIT \u8BB8\u53EF\u56FE\u6807\u4E0E\u672C\u5730\u54C1\u724C\u8D44\u4EA7\u3002\u54C1\u724C\u540D\u79F0\u548C\u5546\u6807\u5C5E\u4E8E\u5404\u81EA\u6743\u5229\u4EBA\uFF0C\u4EC5\u7528\u4E8E\u6807\u8BC6\u5382\u5546\uFF0C\u4E0D\u8868\u793A\u8BA4\u53EF\u6216\u5408\u4F5C\u3002\u5B8C\u6574\u8BB8\u53EF\u89C1\u672C\u9875\u6E90\u4EE3\u7801\u7684 Lobe Icons MIT \u8BB8\u53EF\u58F0\u660E\u3002")))}function Hr(l){_e=!!l,u.classList.toggle("is-side-panel-collapsed",!_e);let x=window.matchMedia("(max-width: 1024px)").matches;Ot.textContent=_e?x?"\u2304":"\u203A":x?"\u2303":"\u2039",Ot.setAttribute("aria-label",`${_e?"\u6536\u8D77":"\u5C55\u5F00"}\u56FE\u8868\u63A7\u5236\u680F`),Ot.setAttribute("aria-controls","aa-side-panel-body"),Ot.setAttribute("aria-expanded",String(_e)),window.setTimeout(xs,210)}function fm(){hm(),dm(),m.replaceChildren(jp(),Kp(),Qp());let l=document.createElement("div");l.className="aa-side-panel-header";let x=document.createElement("div");x.className="aa-side-panel-label",x.textContent="\u56FE\u8868\u63A7\u5236",Ot=document.createElement("button"),Ot.type="button",Ot.id="aa-side-panel-toggle",Ot.className="aa-icon-button",Ot.addEventListener("click",()=>Hr(!_e)),l.append(x,Ot);let M=document.createElement("div");M.className="aa-side-panel-body",M.id="aa-side-panel-body",M.append(tm(),sm(),rm(),om(),lm()),v.replaceChildren(l,M),am(),Dc(),od()}function od(){let l=window.matchMedia("(max-width: 640px)").matches,x=document.getElementById("aa-report-header-metadata-row"),M=document.getElementById("aa-report-header-model-count-summary");x&&M&&(l?x.prepend(M):x.append(M)),rd(),Vt&&(window.matchMedia("(max-width: 1024px)").matches?Ve.after(Vt):u.append(Vt)),Hr(_e)}window.addEventListener("resize",od);function xs(){let l=Math.max(1,d.clientWidth),x=Math.max(1,d.clientHeight),M=Math.min(window.devicePixelRatio||1,2);N.getPixelRatio()!==M&&N.setPixelRatio(M),N.setSize(l,x,!1),N.setViewport(0,0,N.domElement.width/M,N.domElement.height/M);for(let S of[It,Mt,ht])S?.material.resolution.set(l,x);D.aspect=l/x,D.updateProjectionMatrix(),p?.onResize();for(let S of[ce,pe])S.children.filter(F=>F.isSprite).forEach(F=>Fr(F,F.userData.cssPixelSize));!We.hidden&&fs&&gs(fs),Ht()}new ResizeObserver(xs).observe(d),window.addEventListener("resize",xs);let Uc;function Oc(){Uc?.removeEventListener("change",Oc),Uc=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`),Uc.addEventListener("change",Oc),xs()}Oc();function Wa(l){let x=l.clone().project(D),M=N.domElement.getBoundingClientRect();return{clientX:M.left+(x.x+1)/2*M.width,clientY:M.top+(1-x.y)/2*M.height,normalizedDeviceDepth:x.z}}function ld(l){let x=me[l];return x===void 0?null:Wa(Oe[x].logoSprite.position)}function pm(l){let x=me[l];if(x===void 0)return null;let M=Oe[x],S=new O().setFromMatrixColumn(D.matrixWorld,0),F=Wa(M.logoSprite.position);function V(ne){if(!ne.material.sizeAttenuation)return ne.scale.x*d.clientHeight/(4*Math.tan(gi.degToRad(D.fov/2)));let W=Wa(ne.position.clone().addScaledVector(S,ne.scale.x/2));return Math.hypot(W.clientX-F.clientX,W.clientY-F.clientY)}return{logoRadius:V(M.logoSprite),whiteBackplateRadius:V(M.backplateSprite),countryRegionRadius:V(M.countryRegionSprite)}}function cd(l){let x=gt.find(M=>M.userData.prunedLineageAncestorNode.name===l);return x?Wa(x.position):null}function mm(l){let x=ld(l);if(!x)return null;let M=Vs(x.clientX,x.clientY);if(M?.interactionTargetKind!=="displayed_model")return null;let S=ye[M.modelIndex];return{projectedCanvasPosition:x,frontmostModelName:S.name,frontmostBaseModelName:S.base_model_name,frontmostLineageKey:S.lineage_key}}function gm(l){let x=cd(l);if(!x)return null;let M=Vs(x.clientX,x.clientY),S=M?.interactionTargetKind==="displayed_model"?ye[M.modelIndex]?.name??null:M?.prunedLineageAncestorNode?.name??null;return{projectedCanvasPosition:x,frontmostInteractionTargetKind:M?.interactionTargetKind??null,frontmostInteractionTargetName:S,frontmostInteractionTargetIsRequestedPrunedLineageAncestor:M?.interactionTargetKind!=="displayed_model"&&S===l}}function _m(){if(!Je)return{built:!1,visible:!1,vertexCount:0,triangleCount:0,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:!0,allVertexPositionsAreFinite:!0};let l=Je.geometry.attributes.position,x=Array.from(Je.geometry.index.array);return{built:!0,visible:Je.visible,vertexCount:l.count,triangleCount:x.length/3,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:x.every(M=>Number.isInteger(M)&&M>=0&&M<l.count),allVertexPositionsAreFinite:Array.from(l.array).every(Number.isFinite)}}function xm(){let l=ye.filter((W,oe)=>Nt(oe)).length,x=new Set(Bu().filter(W=>W.userData.interactionTargetKind==="displayed_model").map(W=>W.userData.modelIndex)),M=ye.map((W,oe)=>[W,oe]).filter(([W])=>!gn(W)).map(([,W])=>W),S=new Set(ye.map(W=>W.creator)),F=new Set(ye.filter((W,oe)=>Nt(oe)).map(W=>W.creator)).size,V=Xa(It).length,ne=Xa(Mt).length;return{interactiveRenderer:"threejs",activeMetricVariantKey:h,costAxisField:Pe.cost_axis_field,speedAxisField:Pe.speed_axis_field,displayedModelMarkerCount:ye.length,organizationLogoMarkerCount:Oe.length,cameraFacingOrganizationLogoMarkerCount:Qe.filter(W=>W.isSprite).length,depthTestedOrganizationLogoMarkerCount:Qe.filter(W=>W.material.depthTest).length,depthWritingOrganizationLogoBackplateCount:Oe.filter(W=>W.backplateSprite.material.depthWrite).length,loadedOrganizationLogoCanvasTextureCount:[...S].filter(W=>rt[W]==="loaded").length,failedOrganizationLogoCanvasTextureCount:[...S].filter(W=>rt[W]==="failed").length,countryRegionMarkerVisible:ct,countryRegionMarkerCount:ct?l:0,organizationCount:S.size,visibleOrganizationCount:F,pinnedBaseModelNames:[...Ee],orbitInteractionActive:Ws,pinnedModelUuids:[...xe].filter(W=>!W.startsWith("legacy:")),hoveredModelIndex:ue,organizationLogoTextureLoadStateByCreatorName:{...rt},hoveredLineageKey:fe,hoveredReasoningBaseModelName:Te,hoveredPrunedLineageAncestorName:B,pinnedModelMarkerCount:ye.filter(W=>Ie(W)).length,displayedLineageSegmentEndpointCount:V,displayedReasoningVariantSegmentEndpointCount:ne,displayedPrunedLineageAncestorMarkerCount:gt.length,availableLineageCount:Object.keys(Me).length,selectedFrontierStandoutMetricName:ae,frontierStandoutAxisWeights:{...Ne},paretoFrontierModelCount:Si().length,visibleParetoFrontierModelCount:Si().filter(W=>Nt(me[W.name])).length,frontierStyle:Y,achievableFrontierSurfaceVisible:K,paretoFrontierWireframeVisible:at?.visible??!1,paretoFrontierSurfaceVisible:Je?.visible??!1,achievableFrontierSurfaceObjectVisible:mt?.visible??!1,exactAchievableBoundaryVisible:bt?.visible??!1,achievableFrontierGeometryKind:ge.achievable_frontier_geometry_kind??null,paretoFrontierSurfaceWritesDepth:Je?.material.depthWrite??null,achievableFrontierSurfaceWritesDepth:mt?.material.depthWrite??null,paretoFrontierSurfaceTriangleCount:Je?Je.geometry.index.count/3:0,renderedTriangleCountInLatestFrame:N.info.render.triangles,nonFiniteContractCoordinateCount:C,outOfRangeContractTriangleVertexIndexCount:_,skippedInvalidContractGeometryNames:[...G],visibleModelMarkerCount:l,showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod:Dt,recentReleaseFrontierDistanceGracePeriodMonths:w,recentReleaseGracePeriodOnlyModelMarkerCount:ye.filter(W=>W.displayed_only_because_of_recent_release_grace_period===!0).length,pickableRecentReleaseGracePeriodOnlyModelMarkerCount:ye.filter((W,oe)=>W.displayed_only_because_of_recent_release_grace_period===!0&&x.has(oe)).length,showOnlyCurrentIntelligenceIndexVersionComparableModels:z,historicalIntelligenceIndexVersionModelMarkerCount:M.length,visibleHistoricalIntelligenceIndexVersionModelMarkerCount:M.filter(W=>Oe[W]?.logoSprite.visible).length,pickableHistoricalIntelligenceIndexVersionModelMarkerCount:M.filter(W=>x.has(W)).length,historicalIntelligenceIndexVersionStyledModelMarkerCount:Oe.filter(W=>W.backplateSprite.material===cc&&W.logoSprite.material.opacity<1).length,currentIntelligenceIndexVersionStyledModelMarkerCount:Oe.filter(W=>W.backplateSprite.material===lc&&W.logoSprite.material.opacity>=1).length,howToReadDrawerOpen:ve?!ve.hidden:!1,reportArtifactFingerprint:{...R},sidePanelExpanded:_e,markerSizeMultiplier:In,fixedAxisConfiguration:ge.three_dimensional_axis_configuration,cameraPosition:D.position.toArray()}}function Xa(l){if(!l)return[];if(l.isLineSegments2){let M=l.geometry.attributes.instanceStart,S=l.geometry.attributes.instanceEnd;return Array.from({length:M.count},(F,V)=>[[M.getX(V),M.getY(V),M.getZ(V)],[S.getX(V),S.getY(V),S.getZ(V)]]).flat()}let x=l.geometry.attributes.position;return Array.from({length:x.count},(M,S)=>[x.getX(S),x.getY(S),x.getZ(S)])}function ym(){return{lineage:Xa(It),reasoning:Xa(Mt)}}function vm(){return Oe.map((l,x)=>({name:ye[x]?.name,position:l.logoSprite.position.toArray(),visible:Nt(x)}))}function bm(){return gt.map(l=>l.position.toArray())}function Mm(){return{selectedFrontierStandoutMetricName:ae,frontierStandoutAxisWeights:{...Ne},ranking:Si().map(l=>({name:l.name,value:ke[l.name]})).sort((l,x)=>{let M=Number.isFinite(l.value)?l.value:-1/0;return(Number.isFinite(x.value)?x.value:-1/0)-M}),completeFrontierHypervolume:St}}function Sm(l){return(de?.model_analysis_records||[]).find(x=>he(x)===he(l))}function hd(l){return Sm(l)?.sensitivity_by_intelligence_half_width?.[P.sensitivity_intelligence_half_width]}function ud(){let l=a.refresh_difference_report?.frontier_comparison;return new Set((l?.status==="comparable"?l.entered_by_variant?.[h]||[]:[]).map(x=>x.toLowerCase()))}function Em(){let l=ud();Oe.forEach((x,M)=>{let S=ye[M],F=hd(S),V=F?.is_pareto_robust?"robust":F?.is_near_frontier?"near":S.panel?.layer===1&&F?.is_pareto_robust===!1?"sensitive":null,ne=x.sensitivityRingSprite;ne&&(ne.visible=Nt(M)&&P.sensitivity_intelligence_half_width!=="off"&&V!==null,V&&(ne.material=oc[V],ne.userData.normalMaterial=ne.material,ne.userData.normalRenderOrder=48,ne.userData.foregroundMaterial?.dispose(),ne.userData.foregroundMaterial=null)),x.newFrontierEntrySprite&&(x.newFrontierEntrySprite.visible=Nt(M)&&l.has(he(S)))})}let dd=null;function Gr(){let l=window.matchMedia("(prefers-color-scheme: dark)").matches;k.background.set(l?1120295:16777215);let x={6583435:12044255,3359061:14542835,14212838:4412269,2383002:8436479,4674921:12044255,2193980:6219930};for(let S of[J,re,pe])S.traverse(F=>{var ne;if(!F.material?.color||F.isSprite)return;let V=F.material;(ne=V.userData).lightThemeColor??(ne.lightThemeColor=V.color.getHex()),V.color.setHex(l?x[V.userData.lightThemeColor]??V.userData.lightThemeColor:V.userData.lightThemeColor)});if(dd===l){Ht();return}dd=l;for(let[S,F,V]of[["other","#4b5563",!1],["unclassified","#64748b",!0]]){let ne=Ru[S],W=ne.image.getContext("2d");W.clearRect(0,0,128,128),W.save(),W.translate(64,64),W.rotate(Math.PI/4),W.strokeStyle=l?"#cbd5e1":F,W.lineWidth=9,V&&W.setLineDash([10,8]),W.strokeRect(-39,-39,78,78),W.restore(),ne.needsUpdate=!0}let M=ac.image.getContext("2d");M.clearRect(0,0,128,128),M.beginPath(),M.arc(64,64,53,0,Math.PI*2),M.lineWidth=10,M.strokeStyle=l?"#e2e8f0":"rgba(15,23,42,0.8)",M.stroke(),ac.needsUpdate=!0,Ht()}p=xp({camera:D,controls:te,canvas:N.domElement,graphContainer:d,getBoundingSphere:()=>{let l=new vn().setFromObject(J);return l.isEmpty()?new Cn(new O,Math.sqrt(3)):l.getBoundingSphere(new Cn)},getInitialCameraDirection:()=>{let l=ge.initial_camera_configuration.eye;return[l.x,l.y,l.z]},hitTest:Vs,onCameraStateCommitted:L,onDismissOverlay:()=>ve&&!ve.hidden?(qs(!1),!0):fn?(_n(),!0):ft&&!ft.hidden&&$e?.value?(ft.hidden=!0,$e.setAttribute("aria-expanded","false"),$e.removeAttribute("aria-activedescendant"),wn=-1,!0):!1,onClearSelection:()=>{_n(),xe.clear(),U(),Xs(),Ei()},onFocusSearch:()=>{Hr(!0),$e?.focus()},requestRender:Ht});function wm(){return{metric_variant_key:h,pinned_model_uuids:[...xe].filter(l=>!l.startsWith("legacy:")).sort(),hidden_organization_identity_keys:[...new Set([...Re].map(l=>c[l]?.organization_identity_key).filter(Boolean))].sort(),standout_metric:ae,standout_axis_weights:{...Ne},camera:p.serializeCameraState(),display:{comparable_only:z,recent_release_grace_period:Dt,country_region_markers:ct,achievable_frontier_surface:K,frontier_style:Y,marker_size_multiplier:In,pinned_comparison_expanded:!!Vt?.open,pinned_comparison_optional_fields:[...En].sort()}}}function Am(l,x){if(l.metric_variant_key)if(o[l.metric_variant_key]){let[S,F]=l.metric_variant_key.split("__");Vr(S,F)}else x("\u5206\u4EAB\u53E3\u5F84\u5728\u672C\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\uFF1B\u4FDD\u7559\u5F53\u524D\u53E3\u5F84\u3002");if(l.pinned_model_uuids){xe.clear();for(let S of l.pinned_model_uuids){let F=S.toLowerCase();if(xe.add(F),!De.has(F)){let V=`\u7F3A\u5931\u6A21\u578B ${F}`;De.set(F,{model_uuid:F,name:V,creator:"?",base_model_name:V,panel:{intelligence:null,release_date:"?"}}),x("\u90E8\u5206\u56FA\u5B9A\u6A21\u578B\u5728\u5F53\u524D\u6587\u4EF6\u4E2D\u7F3A\u5931\uFF0C\u5DF2\u4FDD\u7559 UUID \u4E0E\u672A\u4E0A\u56FE\u8BF4\u660E\u3002")}}U(),Xs()}if(l.hidden_organization_identity_keys){let S=new Set(l.hidden_organization_identity_keys);Re=new Set(Object.entries(c).filter(([,F])=>S.has(F.organization_identity_key)).map(([F])=>F)),Yu()}if(l.standout_metric&&Tc(l.standout_metric),l.standout_axis_weights){let S=l.standout_axis_weights;Cc(S.intelligence,S.cost,S.speed)}let M=l.display||{};M.comparable_only!==void 0&&_c(M.comparable_only),M.recent_release_grace_period!==void 0&&xc(M.recent_release_grace_period),M.country_region_markers!==void 0&&yc(M.country_region_markers),M.achievable_frontier_surface!==void 0&&Mc(M.achievable_frontier_surface),M.frontier_style&&bc(M.frontier_style),M.marker_size_multiplier!==void 0&&fc(M.marker_size_multiplier),M.pinned_comparison_optional_fields&&(En.clear(),M.pinned_comparison_optional_fields.forEach(S=>En.add(S)),Vt.querySelectorAll("[data-comparison-field]").forEach(S=>{S.checked=En.has(S.dataset.comparisonField)}),ds(Pr,[...En]),Ha()),M.pinned_comparison_expanded!==void 0&&(Vt.open=M.pinned_comparison_expanded),l.camera&&p.restoreCameraState(l.camera),ms()}let Tm=v.style.transition;v.style.transition="none",fm(),Gu(h,!1),xs(),g=bu({dataset:a,reportShell:u,toolbar:m,plotRegion:f,graphContainer:d,sidePanel:v,getVariantKey:()=>h,getSharedViewState:wm,applySharedViewState:Am,modelPassesSharedFilters:l=>{let x=ye.find(M=>he(M)===he(l))||l;return pc(l.creator)&&(!z||gn(l))&&(Dt||!x.displayed_only_because_of_recent_release_grace_period)},onExplorationFiltersChanged:l=>{Object.assign(P,l),ms(),Br()},resetCamera:()=>p.resetCamera(),setAxisAlignedCameraView:p.setAxisAlignedCameraView,pinModel:l=>Vu(l),exportPng:async()=>{Gr();let l=await yp({scene:k,camera:D,graphContainer:d,title:document.getElementById("frontier-3d-report-title").textContent,metadataLines:[`\u6570\u636E\u65E5\u671F\uFF1A${a.data_date||"\u672A\u77E5"}\uFF1B${Pe.cost_axis_label} \xD7 ${Pe.speed_axis_label}`,`\u672C\u53E3\u5F84\u4E0A\u56FE ${ye.length}\uFF1B\u53EF\u89C1 ${ye.filter((x,M)=>Nt(M)).length}\uFF1B\u6309\u5F53\u524D\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u8BC4\u6D4B\u53E3\u5F84\u8BA1\u7B97`,`\u667A\u80FD\u5206\u663E\u793A\uFF1A${P.measured_only?"\u4EC5\u5B9E\u6D4B":"\u542B\u5B9E\u6D4B\u3001\u4F30\u7B97\u4E0E\u672A\u77E5"}\uFF1B\u53D1\u5E03\u65E5\u671F\u622A\u6B62\uFF1A${P.cutoff_date||"\u5168\u90E8\u65E5\u671F"}\uFF08${P.date_mode==="hide"?"\u9690\u85CF":"\u6DE1\u51FA"}\uFF0C\u672A\u77E5\u65E5\u671F\u4FDD\u7559\uFF09`],legendLines:["\u5706\u73AF\uFF1A\u6B63\u5F0F\u524D\u6CBF\uFF1B\u91D1\u8272\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\uFF1A\u7A81\u51FA\u5EA6\uFF1B\u9752\u8272\uFF1A\u53EF\u9760\u7684\u65B0\u5165\u524D\u6CBF",`\u524D\u6CBF\u51E0\u4F55\uFF1A${K?"\u7CBE\u786E\u53EF\u8FBE\u9636\u68AF\uFF08\u57FA\u4E8E\u5DF2\u5C55\u793A\u5206\u6790\u70B9\uFF09":Y==="hidden"?"\u5DF2\u9690\u85CF":"Delaunay \u90BB\u63A5\u63D2\u503C\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762"}`,`\u7A81\u51FA\u5EA6\uFF1A${Oi[ae].label}\uFF1B\u6743\u91CD\uFF08\u667A\u80FD / \u6210\u672C / \u901F\u5EA6\uFF09\uFF1A${Ne.intelligence} / ${Ne.cost} / ${Ne.speed}`,...ct?["\u56FD\u522B/\u5730\u533A\u5916\u6846\uFF1A\u7EA2\u5706\u4E2D\u56FD\uFF1B\u84DD\u5706\u89D2\u7F8E\u56FD\uFF1B\u7070\u83F1\u5F62\u5176\u4ED6\uFF1B\u865A\u7EBF\u83F1\u5F62\u672A\u5206\u7C7B"]:[],...Re.size?[`\u9690\u85CF\u5382\u5546\uFF1A${[...Re].join("\u3001")}`]:[],P.sensitivity_intelligence_half_width==="off"?"\u654F\u611F\u6027\u6807\u6CE8\u5173\u95ED":`\u5047\u8BBE\u533A\u95F4\uFF1A\u667A\u80FD \xB1${P.sensitivity_intelligence_half_width}\uFF0C\u6210\u672C\u4E0E\u901F\u5EA6\u5404 \xB110%\uFF1B\u5B9E\u7EBF\u7A33\u5065\uFF0C\u865A\u7EBF\u654F\u611F/\u8FD1\u524D\u6CBF\uFF1B\u4E0D\u662F AA \u7F6E\u4FE1\u533A\u95F4`],pinnedModelNames:Ic().map(x=>x.name)});vu(l,`frontier-${a.data_date||"unknown"}.png`),Ht()}}),ec(window.location.hash).state?.camera||p.resetCamera({commit:!1}),xs(),v.style.transition=Tm,window.serializeFrontierViewState=g.getState,window.setFrontierExplorationFilters=g.setExplorationFilters,window.resetFrontierCameraView=()=>p.resetCamera(),window.setAxisAlignedFrontierCameraView=p.setAxisAlignedCameraView,window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Gr),Gr(),window.frontierThreeDimensionalVisualizationState=xm,window.pinFrontierBaseModel=l=>we(l,!0),window.unpinFrontierBaseModel=l=>we(l,!1),window.togglePinnedFrontierBaseModel=ka,window.showFrontierLineageForModelName=l=>{let x=me[l];return x===void 0||!Nt(x)?!1:(zr(x),!0)},window.clearFrontierHoverState=_n,window.matchingFrontierBaseModelNames=nm,window.setFrontierMetricCombination=Vr,window.setParetoFrontierVisualizationStyle=bc,window.setAchievableFrontierSurfaceVisibility=Mc,window.setCountryRegionMarkerVisibility=yc,window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels=_c,window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod=xc,window.setFrontierHowToReadDrawerOpen=qs,window.setFrontierSidePanelExpanded=Hr,window.selectFrontierStandoutMetric=Tc,window.setFrontierStandoutAxisWeights=Cc,window.setFrontierMarkerSizeMultiplier=fc,window.frontierStandoutRanking=Mm,window.frontierThreeDimensionalRendererDiagnostics={verificationGeometryConstructors:{Vector2:Xe,Vector3:O,Scene:_r,Color:ut,CanvasTexture:Ps,Sprite:Cs,SpriteMaterial:Ts,PlaneGeometry:Is,Mesh:sn,PerspectiveCamera:en,OrthographicCamera:Ls},get axisAnnotationSizeMeasurementCount(){return Jn},get surfaceMaterialForVisibilityVerification(){return Je?.material},get surfaceRenderOrder(){return Je?.renderOrder},markerVisualEncodingSummary:()=>Oe.map((l,x)=>({isPareto:ye[x].panel?.layer===1,paretoRingScale:l.paretoRingSprite.scale.x,backplateScale:l.backplateSprite.scale.x,standoutHaloVisible:l.standoutHaloSprite.visible,standoutHaloScale:l.standoutHaloSprite.scale.x,logoScale:l.logoSprite.scale.x,logoSizeAttenuation:l.logoSprite.material.sizeAttenuation})),camera:D,scene:k,controls:te,renderer:N,requestRender:Ht,pointerInteractionAtCanvasClientCoordinates:Vs,createRelationshipLineForVerification:za,projectedCanvasPositionForModelName:ld,projectedCanvasMarkerRadiiForModelName:pm,projectedCanvasPositionForPrunedLineageAncestorName:cd,frontmostPointerInteractionAtProjectedModelPosition:mm,frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition:gm,paretoFrontierSurfaceGeometrySummary:_m,transientRelationshipLineEndpointPositions:ym,displayedModelMarkerPositionsAndVisibility:vm,displayedPrunedLineageAncestorMarkerPositions:bm}})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
