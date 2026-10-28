(()=>{var Qi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ld=0,Wc=1,cd=2;var oa=1,hd=2,dr=3,Ii=0,fn=1,Hn=2,di=0,ys=1,Xc=2,qc=3,Yc=4,ud=5;var qi=100,dd=101,fd=102,pd=103,md=104,gd=200,_d=201,xd=202,yd=203,so=204,ro=205,vd=206,Md=207,bd=208,Sd=209,Ed=210,wd=211,Td=212,Ad=213,Cd=214,ao=0,oo=1,lo=2,vs=3,co=4,ho=5,uo=6,fo=7,$c=0,Rd=1,Pd=2,ri=0,Zc=1,Jc=2,Kc=3,jc=4,Qc=5,eh=6,th=7;var nh=300,ts=301,As=302,Go=303,Ho=304,la=306,po=1e3,hi=1001,mo=1002,Xt=1003,Id=1004;var ca=1005;var Zt=1006,Wo=1007;var ns=1008;var Nn=1009,ih=1010,sh=1011,fr=1012,Xo=1013,ai=1014,oi=1015,fi=1016,qo=1017,Yo=1018,pr=1020,rh=35902,ah=35899,oh=1021,lh=1022,Wn=1023,ui=1026,is=1027,ch=1028,$o=1029,ss=1030,Zo=1031;var Jo=1033,ha=33776,ua=33777,da=33778,fa=33779,Ko=35840,jo=35841,Qo=35842,el=35843,tl=36196,nl=37492,il=37496,sl=37488,rl=37489,pa=37490,al=37491,ol=37808,ll=37809,cl=37810,hl=37811,ul=37812,dl=37813,fl=37814,pl=37815,ml=37816,gl=37817,_l=37818,xl=37819,yl=37820,vl=37821,Ml=36492,bl=36494,Sl=36495,El=36283,wl=36284,ma=36285,Tl=36286;var kr=2300,go=2301,io=2302,Fc=2303,Oc=2400,Bc=2401,zc=2402;var Ld=3200;var hh=0,Dd=1,Ni="",Yt="srgb",Vr="srgb-linear",Gr="linear",yt="srgb";var _s=7680;var kc=519,Nd=512,Ud=513,Fd=514,Al=515,Od=516,Bd=517,Cl=518,zd=519,_o=35044;var uh="300 es",ni=2e3,Hr=2001;function kp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Vp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kd(){let i=Wr("canvas");return i.style.display="block",i}var Du={},ir=null;function Xr(...i){let e="THREE."+i.shift();ir?ir("log",e,...i):console.log(e,...i)}function Vd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=Vd(i);let e="THREE."+i.shift();if(ir)ir("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=Vd(i);let e="THREE."+i.shift();if(ir)ir("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function xs(...i){let e=i.join(" ");e in Du||(Du[e]=!0,Ge(...i))}function Gd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Hd={[ao]:oo,[lo]:uo,[co]:fo,[vs]:ho,[oo]:ao,[uo]:lo,[fo]:co,[ho]:vs},ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nu=1234567,Br=Math.PI/180,sr=180/Math.PI;function Ri(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function et(i,e,t){return Math.max(e,Math.min(t,i))}function dh(i,e){return(i%e+e)%e}function Gp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Hp(i,e,t){return i!==e?(t-i)/(e-i):0}function zr(i,e,t){return(1-t)*i+t*e}function Wp(i,e,t,n){return zr(i,e,1-Math.exp(-t*n))}function Xp(i,e=1){return e-Math.abs(dh(i,e*2)-e)}function qp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Yp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function $p(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Zp(i,e){return i+Math.random()*(e-i)}function Jp(i){return i*(.5-Math.random())}function Kp(i){i!==void 0&&(Nu=i);let e=Nu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jp(i){return i*Br}function Qp(i){return i*sr}function em(i){return(i&i-1)===0&&i!==0}function tm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function im(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),g=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*f,l*u,o*c);break;case"YZY":i.set(l*u,o*d,l*f,o*c);break;case"ZXZ":i.set(l*f,l*u,o*d,o*c);break;case"XZX":i.set(o*d,l*v,l*g,o*c);break;case"YXY":i.set(l*g,o*d,l*v,o*c);break;case"ZYZ":i.set(l*v,l*g,o*d,o*c);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Et(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var rs={DEG2RAD:Br,RAD2DEG:sr,generateUUID:Ri,clamp:et,euclideanModulo:dh,mapLinear:Gp,inverseLerp:Hp,lerp:zr,damp:Wp,pingpong:Xp,smoothstep:qp,smootherstep:Yp,randInt:$p,randFloat:Zp,randFloatSpread:Jp,seededRandom:Kp,degToRad:jp,radToDeg:Qp,isPowerOfTwo:em,ceilPowerOfTwo:tm,floorPowerOfTwo:nm,setQuaternionFromProperEuler:im,normalize:Et,denormalize:ti},_h=class _h{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_h.prototype.isVector2=!0;var ze=_h,Rn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],f=n[s+3],u=r[a+0],g=r[a+1],v=r[a+2],S=r[a+3];if(f!==S||l!==u||c!==g||d!==v){let m=l*u+c*g+d*v+f*S;m<0&&(u=-u,g=-g,v=-v,S=-S,m=-m);let p=1-o;if(m<.9995){let I=Math.acos(m),L=Math.sin(I);p=Math.sin(p*I)/L,o=Math.sin(o*I)/L,l=l*p+u*o,c=c*p+g*o,d=d*p+v*o,f=f*p+S*o}else{l=l*p+u*o,c=c*p+g*o,d=d*p+v*o,f=f*p+S*o;let I=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=I,c*=I,d*=I,f*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],f=r[a],u=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+d*f+l*g-c*u,e[t+1]=l*v+d*u+c*f-o*g,e[t+2]=c*v+d*g+o*u-l*f,e[t+3]=d*v-o*f-l*u-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),f=o(r/2),u=l(n/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=u*d*f+c*g*v,this._y=c*g*f-u*d*v,this._z=c*d*v+u*g*f,this._w=c*d*f-u*g*v;break;case"YXZ":this._x=u*d*f+c*g*v,this._y=c*g*f-u*d*v,this._z=c*d*v-u*g*f,this._w=c*d*f+u*g*v;break;case"ZXY":this._x=u*d*f-c*g*v,this._y=c*g*f+u*d*v,this._z=c*d*v+u*g*f,this._w=c*d*f-u*g*v;break;case"ZYX":this._x=u*d*f-c*g*v,this._y=c*g*f+u*d*v,this._z=c*d*v-u*g*f,this._w=c*d*f+u*g*v;break;case"YZX":this._x=u*d*f+c*g*v,this._y=c*g*f+u*d*v,this._z=c*d*v-u*g*f,this._w=c*d*f-u*g*v;break;case"XZY":this._x=u*d*f-c*g*v,this._y=c*g*f-u*d*v,this._z=c*d*v+u*g*f,this._w=c*d*f+u*g*v;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],f=t[10],u=n+o+f;if(u>0){let g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(d-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>f){let g=2*Math.sqrt(1+n-o-f);this._w=(d-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>f){let g=2*Math.sqrt(1+o-n-f);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+d)/g}else{let g=2*Math.sqrt(1+f-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},xh=class xh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Uu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Uu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*d,this.y=n+l*d+o*c-r*f,this.z=s+l*f+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xh.prototype.isVector3=!0;var N=xh,dc=new N,Uu=new Rn,yh=class yh{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],f=n[7],u=n[2],g=n[5],v=n[8],S=s[0],m=s[3],p=s[6],I=s[1],L=s[4],E=s[7],R=s[2],A=s[5],P=s[8];return r[0]=a*S+o*I+l*R,r[3]=a*m+o*L+l*A,r[6]=a*p+o*E+l*P,r[1]=c*S+d*I+f*R,r[4]=c*m+d*L+f*A,r[7]=c*p+d*E+f*P,r[2]=u*S+g*I+v*R,r[5]=u*m+g*L+v*A,r[8]=u*p+g*E+v*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*l-d*r,g=c*r-a*l,v=t*f+n*u+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/v;return e[0]=f*S,e[1]=(s*c-d*n)*S,e[2]=(o*n-s*a)*S,e[3]=u*S,e[4]=(d*t-s*l)*S,e[5]=(s*r-o*t)*S,e[6]=g*S,e[7]=(n*l-c*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fc.makeScale(e,t)),this}rotate(e){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fc.makeRotation(-e)),this}translate(e,t){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};yh.prototype.isMatrix3=!0;var je=yh,fc=new je,Fu=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ou=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sm(){let i={enabled:!0,workingColorSpace:Vr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===yt&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===yt&&(s.r=nr(s.r),s.g=nr(s.g),s.b=nr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ni?Gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vr]:{primaries:e,whitePoint:n,transfer:Gr,toXYZ:Fu,fromXYZ:Ou,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:Fu,fromXYZ:Ou,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}var ut=sm();function Pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Bs,xo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=Wr("canvas")),Bs.width=e.width,Bs.height=e.height;let s=Bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pi(t[n]/255)*255):t[n]=Pi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},rm=0,rr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Ri(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pc(s[a].image)):r.push(pc(s[a]))}else r=pc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function pc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var am=0,mc=new N,un=class i extends ii{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=hi,s=hi,r=Zt,a=ns,o=Wn,l=Nn,c=i.DEFAULT_ANISOTROPY,d=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Ri(),this.name="",this.source=new rr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case po:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case po:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=nh;un.DEFAULT_ANISOTROPY=1;var vh=class vh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],d=l[4],f=l[8],u=l[1],g=l[5],v=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(d-u)<.01&&Math.abs(f-S)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+S)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let L=(c+1)/2,E=(g+1)/2,R=(p+1)/2,A=(d+u)/4,P=(f+S)/4,y=(v+m)/4;return L>E&&L>R?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=A/n,r=P/n):E>R?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=A/s,r=y/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=y/r),this.set(n,s,r,t),this}let I=Math.sqrt((m-v)*(m-v)+(f-S)*(f-S)+(u-d)*(u-d));return Math.abs(I)<.001&&(I=1),this.x=(m-v)/I,this.y=(f-S)/I,this.z=(u-d)/I,this.w=Math.acos((c+g+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vh.prototype.isVector4=!0;var wt=vh,yo=class extends ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new un(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new rr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends yo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qr=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var vo=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vo=class Vo{constructor(e,t,n,s,r,a,o,l,c,d,f,u,g,v,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,f,u,g,v,S,m)}set(e,t,n,s,r,a,o,l,c,d,f,u,g,v,S,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=f,p[14]=u,p[3]=g,p[7]=v,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vo().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),a=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*d,g=a*f,v=o*d,S=o*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=g+v*c,t[5]=u-S*c,t[9]=-o*l,t[2]=S-u*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*d,g=l*f,v=c*d,S=c*f;t[0]=u+S*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=g*o-v,t[6]=S+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*d,g=l*f,v=c*d,S=c*f;t[0]=u-S*o,t[4]=-a*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*d,t[9]=S-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*d,g=a*f,v=o*d,S=o*f;t[0]=l*d,t[4]=v*c-g,t[8]=u*c+S,t[1]=l*f,t[5]=S*c+u,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,g=a*c,v=o*l,S=o*c;t[0]=l*d,t[4]=S-u*f,t[8]=v*f+g,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=g*f+v,t[10]=u-S*f}else if(e.order==="XZY"){let u=a*l,g=a*c,v=o*l,S=o*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=u*f+S,t[5]=a*d,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*d,t[10]=S*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(om,e,lm)}lookAt(e,t,n){let s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),ki.crossVectors(n,An),ki.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),ki.crossVectors(n,An)),ki.normalize(),Ia.crossVectors(An,ki),s[0]=ki.x,s[4]=Ia.x,s[8]=An.x,s[1]=ki.y,s[5]=Ia.y,s[9]=An.y,s[2]=ki.z,s[6]=Ia.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],f=n[5],u=n[9],g=n[13],v=n[2],S=n[6],m=n[10],p=n[14],I=n[3],L=n[7],E=n[11],R=n[15],A=s[0],P=s[4],y=s[8],C=s[12],U=s[1],F=s[5],W=s[9],ee=s[13],te=s[2],X=s[6],J=s[10],Z=s[14],ne=s[3],oe=s[7],Q=s[11],_e=s[15];return r[0]=a*A+o*U+l*te+c*ne,r[4]=a*P+o*F+l*X+c*oe,r[8]=a*y+o*W+l*J+c*Q,r[12]=a*C+o*ee+l*Z+c*_e,r[1]=d*A+f*U+u*te+g*ne,r[5]=d*P+f*F+u*X+g*oe,r[9]=d*y+f*W+u*J+g*Q,r[13]=d*C+f*ee+u*Z+g*_e,r[2]=v*A+S*U+m*te+p*ne,r[6]=v*P+S*F+m*X+p*oe,r[10]=v*y+S*W+m*J+p*Q,r[14]=v*C+S*ee+m*Z+p*_e,r[3]=I*A+L*U+E*te+R*ne,r[7]=I*P+L*F+E*X+R*oe,r[11]=I*y+L*W+E*J+R*Q,r[15]=I*C+L*ee+E*Z+R*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],f=e[6],u=e[10],g=e[14],v=e[3],S=e[7],m=e[11],p=e[15],I=l*g-c*u,L=o*g-c*f,E=o*u-l*f,R=a*g-c*d,A=a*u-l*d,P=a*f-o*d;return t*(S*I-m*L+p*E)-n*(v*I-m*R+p*A)+s*(v*L-S*R+p*P)-r*(v*E-S*A+m*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-n*(r*d-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=e[9],u=e[10],g=e[11],v=e[12],S=e[13],m=e[14],p=e[15],I=t*o-n*a,L=t*l-s*a,E=t*c-r*a,R=n*l-s*o,A=n*c-r*o,P=s*c-r*l,y=d*S-f*v,C=d*m-u*v,U=d*p-g*v,F=f*m-u*S,W=f*p-g*S,ee=u*p-g*m,te=I*ee-L*W+E*F+R*U-A*C+P*y;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/te;return e[0]=(o*ee-l*W+c*F)*X,e[1]=(s*W-n*ee-r*F)*X,e[2]=(S*P-m*A+p*R)*X,e[3]=(u*A-f*P-g*R)*X,e[4]=(l*U-a*ee-c*C)*X,e[5]=(t*ee-s*U+r*C)*X,e[6]=(m*E-v*P-p*L)*X,e[7]=(d*P-u*E+g*L)*X,e[8]=(a*W-o*U+c*y)*X,e[9]=(n*U-t*W-r*y)*X,e[10]=(v*A-S*E+p*I)*X,e[11]=(f*E-d*A-g*I)*X,e[12]=(o*C-a*F-l*y)*X,e[13]=(t*F-n*C+s*y)*X,e[14]=(S*L-v*R-m*I)*X,e[15]=(d*R-f*L+u*I)*X,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,f=o+o,u=r*c,g=r*d,v=r*f,S=a*d,m=a*f,p=o*f,I=l*c,L=l*d,E=l*f,R=n.x,A=n.y,P=n.z;return s[0]=(1-(S+p))*R,s[1]=(g+E)*R,s[2]=(v-L)*R,s[3]=0,s[4]=(g-E)*A,s[5]=(1-(u+p))*A,s[6]=(m+I)*A,s[7]=0,s[8]=(v+L)*P,s[9]=(m-I)*P,s[10]=(1-(u+S))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=zs.set(s[0],s[1],s[2]).length(),o=zs.set(s[4],s[5],s[6]).length(),l=zs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),jn.copy(this);let c=1/a,d=1/o,f=1/l;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=d,jn.elements[5]*=d,jn.elements[6]*=d,jn.elements[8]*=f,jn.elements[9]*=f,jn.elements[10]*=f,t.setFromRotationMatrix(jn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=ni,l=!1){let c=this.elements,d=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),g=(n+s)/(n-s),v,S;if(l)v=r/(a-r),S=a*r/(a-r);else if(o===ni)v=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Hr)v=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ni,l=!1){let c=this.elements,d=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),g=-(n+s)/(n-s),v,S;if(l)v=1/(a-r),S=a/(a-r);else if(o===ni)v=-2/(a-r),S=-(a+r)/(a-r);else if(o===Hr)v=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Vo.prototype.isMatrix4=!0;var Pt=Vo,zs=new N,jn=new Pt,om=new N(0,0,0),lm=new N(1,1,1),ki=new N,Ia=new N,An=new N,Bu=new Pt,zu=new Rn,Yi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],f=s[2],u=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zu.setFromEuler(this),this.setFromQuaternion(zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yi.DEFAULT_ORDER="XYZ";var ar=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},cm=0,ku=new N,ks=new Rn,Si=new Pt,La=new N,Pr=new N,hm=new N,um=new Rn,Vu=new N(1,0,0),Gu=new N(0,1,0),Hu=new N(0,0,1),Wu={type:"added"},dm={type:"removed"},Vs={type:"childadded",child:null},gc={type:"childremoved",child:null},vn=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new Yi,n=new Rn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Pt},normalMatrix:{value:new je}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Vu,e)}rotateY(e){return this.rotateOnAxis(Gu,e)}rotateZ(e){return this.rotateOnAxis(Hu,e)}translateOnAxis(e,t){return ku.copy(e).applyQuaternion(this.quaternion),this.position.add(ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vu,e)}translateY(e){return this.translateOnAxis(Gu,e)}translateZ(e){return this.translateOnAxis(Hu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(Pr,La,this.up):Si.lookAt(La,Pr,this.up),this.quaternion.setFromRotationMatrix(Si),s&&(Si.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Si),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(dm),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,hm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,um,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};vn.DEFAULT_UP=new N(0,1,0);vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gn=class extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}},fm={type:"move"},or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let S of e.hand.values()){let m=t.getJointPose(S,n),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),g=.02,v=.005;c.inputState.pinching&&u>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Da={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var at=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ut.workingColorSpace){if(e=dh(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=_c(a,r,e+1/3),this.g=_c(a,r,e),this.b=_c(a,r,e-1/3)}return ut.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){let n=Wd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return ut.workingToColorSpace(an.copy(this),e),Math.round(et(an.r*255,0,255))*65536+Math.round(et(an.g*255,0,255))*256+Math.round(et(an.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(an.copy(this),t);let n=an.r,s=an.g,r=an.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Yt){ut.workingToColorSpace(an.copy(this),e);let t=an.r,n=an.g,s=an.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(Da);let n=zr(Vi.h,Da.h,t),s=zr(Vi.s,Da.s,t),r=zr(Vi.l,Da.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new at;at.NAMES=Wd;var lr=class extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yi,this.environmentIntensity=1,this.environmentRotation=new Yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qn=new N,Ei=new N,xc=new N,wi=new N,Gs=new N,Hs=new N,Xu=new N,yc=new N,vc=new N,Mc=new N,bc=new wt,Sc=new wt,Ec=new wt,Ci=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Qn.subVectors(e,t),s.cross(Qn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Qn.subVectors(s,t),Ei.subVectors(n,t),xc.subVectors(e,t);let a=Qn.dot(Qn),o=Qn.dot(Ei),l=Qn.dot(xc),c=Ei.dot(Ei),d=Ei.dot(xc),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,g=(c*l-o*d)*u,v=(a*d-o*l)*u;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wi.x),l.addScaledVector(a,wi.y),l.addScaledVector(o,wi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return bc.setScalar(0),Sc.setScalar(0),Ec.setScalar(0),bc.fromBufferAttribute(e,t),Sc.fromBufferAttribute(e,n),Ec.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(bc,r.x),a.addScaledVector(Sc,r.y),a.addScaledVector(Ec,r.z),a}static isFrontFacing(e,t,n,s){return Qn.subVectors(n,t),Ei.subVectors(e,t),Qn.cross(Ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Qn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Gs.subVectors(s,n),Hs.subVectors(r,n),yc.subVectors(e,n);let l=Gs.dot(yc),c=Hs.dot(yc);if(l<=0&&c<=0)return t.copy(n);vc.subVectors(e,s);let d=Gs.dot(vc),f=Hs.dot(vc);if(d>=0&&f<=d)return t.copy(s);let u=l*f-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Gs,a);Mc.subVectors(e,r);let g=Gs.dot(Mc),v=Hs.dot(Mc);if(v>=0&&g<=v)return t.copy(r);let S=g*c-l*v;if(S<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Hs,o);let m=d*v-g*f;if(m<=0&&f-d>=0&&g-v>=0)return Xu.subVectors(r,s),o=(f-d)/(f-d+(g-v)),t.copy(s).addScaledVector(Xu,o);let p=1/(m+S+u);return a=S*p,o=u*p,t.copy(n).addScaledVector(Gs,a).addScaledVector(Hs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},In=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Na.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox)),Na.applyMatrix4(e.matrixWorld),this.union(Na)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ua.subVectors(this.max,Ir),Ws.subVectors(e.a,Ir),Xs.subVectors(e.b,Ir),qs.subVectors(e.c,Ir),Gi.subVectors(Xs,Ws),Hi.subVectors(qs,Xs),fs.subVectors(Ws,qs);let t=[0,-Gi.z,Gi.y,0,-Hi.z,Hi.y,0,-fs.z,fs.y,Gi.z,0,-Gi.x,Hi.z,0,-Hi.x,fs.z,0,-fs.x,-Gi.y,Gi.x,0,-Hi.y,Hi.x,0,-fs.y,fs.x,0];return!wc(t,Ws,Xs,qs,Ua)||(t=[1,0,0,0,1,0,0,0,1],!wc(t,Ws,Xs,qs,Ua))?!1:(Fa.crossVectors(Gi,Hi),t=[Fa.x,Fa.y,Fa.z],wc(t,Ws,Xs,qs,Ua))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ti=[new N,new N,new N,new N,new N,new N,new N,new N],ei=new N,Na=new In,Ws=new N,Xs=new N,qs=new N,Gi=new N,Hi=new N,fs=new N,Ir=new N,Ua=new N,Fa=new N,ps=new N;function wc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ps.fromArray(i,r);let o=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=e.dot(ps),c=t.dot(ps),d=n.dot(ps);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var zt=new N,Oa=new ze,pm=0,yn=class extends ii{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_o,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),s=Et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),s=Et(s,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_o&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Yr=class extends yn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $r=class extends yn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Bt=class extends yn{constructor(e,t,n){super(new Float32Array(e),t,n)}},mm=new In,Lr=new N,Tc=new N,si=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):mm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Lr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Tc)),this.expandByPoint(Lr.copy(e.center).sub(Tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gm=0,kn=new Pt,Ac=new vn,Ys=new N,Cn=new In,Dr=new In,Wt=new N,Jt=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kp(e)?$r:Yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return Ac.lookAt(e),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(Cn.min,Dr.min),Cn.expandByPoint(Wt),Wt.addVectors(Cn.max,Dr.max),Cn.expandByPoint(Wt)):(Cn.expandByPoint(Dr.min),Cn.expandByPoint(Dr.max))}Cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Wt.fromBufferAttribute(o,c),l&&(Ys.fromBufferAttribute(e,c),Wt.add(Ys)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new yn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new N,l[y]=new N;let c=new N,d=new N,f=new N,u=new ze,g=new ze,v=new ze,S=new N,m=new N;function p(y,C,U){c.fromBufferAttribute(n,y),d.fromBufferAttribute(n,C),f.fromBufferAttribute(n,U),u.fromBufferAttribute(r,y),g.fromBufferAttribute(r,C),v.fromBufferAttribute(r,U),d.sub(c),f.sub(c),g.sub(u),v.sub(u);let F=1/(g.x*v.y-v.x*g.y);isFinite(F)&&(S.copy(d).multiplyScalar(v.y).addScaledVector(f,-g.y).multiplyScalar(F),m.copy(f).multiplyScalar(g.x).addScaledVector(d,-v.x).multiplyScalar(F),o[y].add(S),o[C].add(S),o[U].add(S),l[y].add(m),l[C].add(m),l[U].add(m))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let y=0,C=I.length;y<C;++y){let U=I[y],F=U.start,W=U.count;for(let ee=F,te=F+W;ee<te;ee+=3)p(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}let L=new N,E=new N,R=new N,A=new N;function P(y){R.fromBufferAttribute(s,y),A.copy(R);let C=o[y];L.copy(C),L.sub(R.multiplyScalar(R.dot(C))).normalize(),E.crossVectors(A,C);let F=E.dot(l[y])<0?-1:1;a.setXYZW(y,L.x,L.y,L.z,F)}for(let y=0,C=I.length;y<C;++y){let U=I[y],F=U.start,W=U.count;for(let ee=F,te=F+W;ee<te;ee+=3)P(e.getX(ee+0)),P(e.getX(ee+1)),P(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new yn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,g=n.count;u<g;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,d=new N,f=new N;if(e)for(let u=0,g=e.count;u<g;u+=3){let v=e.getX(u+0),S=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,g=t.count;u<g;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(l.length*d),g=0,v=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?g=l[S]*o.data.stride+o.offset:g=l[S]*d;for(let p=0;p<d;p++)u[v++]=c[g++]}return new yn(u,d,f)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,f=c.length;d<f;d++){let u=c[d],g=e(u,n);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let f=0,u=c.length;f<u;f++){let g=c[f];d.push(g.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],f=r[c];for(let u=0,g=f.length;u<g;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_o,this.updateRanges=[],this.version=0,this.uuid=Ri()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},hn=new N,Ln=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),s=Et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),s=Et(s,this.array),r=Et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Xr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_m=0,Li=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=ys,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==Ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new at().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ze().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ms=class extends Li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$s,Nr=new N,Zs=new N,Js=new N,Ks=new ze,Ur=new ze,Xd=new Pt,Ba=new N,Fr=new N,za=new N,qu=new ze,Cc=new ze,Yu=new ze,bs=class extends vn{constructor(e=new Ms){if(super(),this.isSprite=!0,this.type="Sprite",$s===void 0){$s=new Jt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zr(t,5);$s.setIndex([0,1,2,0,2,3]),$s.setAttribute("position",new Ln(n,3,0,!1)),$s.setAttribute("uv",new Ln(n,2,3,!1))}this.geometry=$s,this.material=e,this.center=new ze(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Xe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Zs.setFromMatrixScale(this.matrixWorld),Xd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Js.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zs.multiplyScalar(-Js.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;ka(Ba.set(-.5,-.5,0),Js,a,Zs,s,r),ka(Fr.set(.5,-.5,0),Js,a,Zs,s,r),ka(za.set(.5,.5,0),Js,a,Zs,s,r),qu.set(0,0),Cc.set(1,0),Yu.set(1,1);let o=e.ray.intersectTriangle(Ba,Fr,za,!1,Nr);if(o===null&&(ka(Fr.set(-.5,.5,0),Js,a,Zs,s,r),Cc.set(0,1),o=e.ray.intersectTriangle(Ba,za,Fr,!1,Nr),o===null))return;let l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:Ci.getInterpolation(Nr,Ba,Fr,za,qu,Cc,Yu,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ka(i,e,t,n,s,r){Ks.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ur.x=r*Ks.x-s*Ks.y,Ur.y=s*Ks.x+r*Ks.y):Ur.copy(Ks),i.copy(e),i.x+=Ur.x,i.y+=Ur.y,i.applyMatrix4(Xd)}var Ai=new N,Rc=new N,Va=new N,Wi=new N,Pc=new N,Ga=new N,Ic=new N,$i=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Rc.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Rc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Va),o=Wi.dot(this.direction),l=-Wi.dot(Va),c=Wi.lengthSq(),d=Math.abs(1-a*a),f,u,g,v;if(d>0)if(f=a*l-o,u=a*o-l,v=r*d,f>=0)if(u>=-v)if(u<=v){let S=1/d;f*=S,u*=S,g=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;else u<=-v?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),g=-f*f+u*(u+2*l)+c):u<=v?(f=0,u=Math.min(Math.max(-r,-l),r),g=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),g=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Rc).addScaledVector(Va,u),g}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);let n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,n,s,r){Pc.subVectors(t,e),Ga.subVectors(n,e),Ic.crossVectors(Pc,Ga);let a=this.direction.dot(Ic),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);let l=o*this.direction.dot(Ga.crossVectors(Wi,Ga));if(l<0)return null;let c=o*this.direction.dot(Pc.cross(Wi));if(c<0||l+c>a)return null;let d=-o*Wi.dot(Ic);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ss=class extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=$c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$u=new Pt,ms=new $i,Ha=new si,Zu=new N,Wa=new N,Xa=new N,qa=new N,Lc=new N,Ya=new N,Ju=new N,$a=new N,Kt=class extends vn{constructor(e=new Jt,t=new Ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],f=r[l];d!==0&&(Lc.fromBufferAttribute(f,e),a?Ya.addScaledVector(Lc,d):Ya.addScaledVector(Lc.sub(t),d))}t.add(Ya)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ha.copy(n.boundingSphere),Ha.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(Ha.containsPoint(ms.origin)===!1&&(ms.intersectSphere(Ha,Zu)===null||ms.origin.distanceToSquared(Zu)>(e.far-e.near)**2))&&($u.copy(r).invert(),ms.copy(e.ray).applyMatrix4($u),!(n.boundingBox!==null&&ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,S=u.length;v<S;v++){let m=u[v],p=a[m.materialIndex],I=Math.max(m.start,g.start),L=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let E=I,R=L;E<R;E+=3){let A=o.getX(E),P=o.getX(E+1),y=o.getX(E+2);s=Za(this,p,e,n,c,d,f,A,P,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),S=Math.min(o.count,g.start+g.count);for(let m=v,p=S;m<p;m+=3){let I=o.getX(m),L=o.getX(m+1),E=o.getX(m+2);s=Za(this,a,e,n,c,d,f,I,L,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,S=u.length;v<S;v++){let m=u[v],p=a[m.materialIndex],I=Math.max(m.start,g.start),L=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let E=I,R=L;E<R;E+=3){let A=E,P=E+1,y=E+2;s=Za(this,p,e,n,c,d,f,A,P,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),S=Math.min(l.count,g.start+g.count);for(let m=v,p=S;m<p;m+=3){let I=m,L=m+1,E=m+2;s=Za(this,a,e,n,c,d,f,I,L,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function xm(i,e,t,n,s,r,a,o){let l;if(e.side===fn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Ii,o),l===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:i}}function Za(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Wa),i.getVertexPosition(l,Xa),i.getVertexPosition(c,qa);let d=xm(i,e,t,n,Wa,Xa,qa,Ju);if(d){let f=new N;Ci.getBarycoord(Ju,Wa,Xa,qa,f),s&&(d.uv=Ci.getInterpolatedAttribute(s,o,l,c,f,new ze)),r&&(d.uv1=Ci.getInterpolatedAttribute(r,o,l,c,f,new ze)),a&&(d.normal=Ci.getInterpolatedAttribute(a,o,l,c,f,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new N,materialIndex:0};Ci.getNormal(Wa,Xa,qa,u.normal),d.face=u,d.barycoord=f}return d}var Mo=class extends un{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Xt,d=Xt,f,u){super(null,a,o,l,c,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dc=new N,ym=new N,vm=new je,Vn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Dc.subVectors(n,t).cross(ym.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Dc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||vm.getNormalMatrix(e),s=this.coplanarPoint(Dc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},gs=new si,Mm=new ze(.5,.5),Ja=new N,Jr=class{constructor(e=new Vn,t=new Vn,n=new Vn,s=new Vn,r=new Vn,a=new Vn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],f=r[5],u=r[6],g=r[7],v=r[8],S=r[9],m=r[10],p=r[11],I=r[12],L=r[13],E=r[14],R=r[15];if(s[0].setComponents(c-a,g-d,p-v,R-I).normalize(),s[1].setComponents(c+a,g+d,p+v,R+I).normalize(),s[2].setComponents(c+o,g+f,p+S,R+L).normalize(),s[3].setComponents(c-o,g-f,p-S,R-L).normalize(),n)s[4].setComponents(l,u,m,E).normalize(),s[5].setComponents(c-l,g-u,p-m,R-E).normalize();else if(s[4].setComponents(c-l,g-u,p-m,R-E).normalize(),t===ni)s[5].setComponents(c+l,g+u,p+m,R+E).normalize();else if(t===Hr)s[5].setComponents(l,u,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){gs.center.set(0,0,0);let t=Mm.distanceTo(e.center);return gs.radius=.7071067811865476+t,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ja.x=s.normal.x>0?e.max.x:e.min.x,Ja.y=s.normal.y>0?e.max.y:e.min.y,Ja.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var cr=class extends Li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new at(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bo=new N,So=new N,Ku=new Pt,Or=new $i,Ka=new si,Nc=new N,ju=new N,Eo=class extends vn{constructor(e=new Jt,t=new cr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)bo.fromBufferAttribute(t,s-1),So.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=bo.distanceTo(So);e.setAttribute("lineDistance",new Bt(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,e.ray.intersectsSphere(Ka)===!1)return;Ku.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Ku);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let S=g,m=v-1;S<m;S+=c){let p=d.getX(S),I=d.getX(S+1),L=ja(this,e,Or,l,p,I,S);L&&t.push(L)}if(this.isLineLoop){let S=d.getX(v-1),m=d.getX(g),p=ja(this,e,Or,l,S,m,v-1);p&&t.push(p)}}else{let g=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let S=g,m=v-1;S<m;S+=c){let p=ja(this,e,Or,l,S,S+1,S);p&&t.push(p)}if(this.isLineLoop){let S=ja(this,e,Or,l,v-1,g,v-1);S&&t.push(S)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ja(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(bo.fromBufferAttribute(o,s),So.fromBufferAttribute(o,r),t.distanceSqToSegment(bo,So,Nc,ju)>n)return;Nc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Nc);if(!(c<e.near||c>e.far))return{distance:c,point:ju.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Qu=new N,ed=new N,Kr=class extends Eo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Qu.fromBufferAttribute(t,s),ed.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Qu.distanceTo(ed);e.setAttribute("lineDistance",new Bt(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var jr=class extends un{constructor(e=[],t=ts,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Es=class extends un{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Di=class extends un{constructor(e,t,n=ai,s,r,a,o=Xt,l=Xt,c,d=ui,f=1){if(d!==ui&&d!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},wo=class extends Di{constructor(e,t=ai,n=ts,s,r,a=Xt,o=Xt,l,c=ui){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qr=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},hr=class i extends Jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],f=[],u=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(f,2));function v(S,m,p,I,L,E,R,A,P,y,C){let U=E/P,F=R/y,W=E/2,ee=R/2,te=A/2,X=P+1,J=y+1,Z=0,ne=0,oe=new N;for(let Q=0;Q<J;Q++){let _e=Q*F-ee;for(let Re=0;Re<X;Re++){let Je=Re*U-W;oe[S]=Je*I,oe[m]=_e*L,oe[p]=te,c.push(oe.x,oe.y,oe.z),oe[S]=0,oe[m]=0,oe[p]=A>0?1:-1,d.push(oe.x,oe.y,oe.z),f.push(Re/P),f.push(1-Q/y),Z+=1}}for(let Q=0;Q<y;Q++)for(let _e=0;_e<P;_e++){let Re=u+_e+X*Q,Je=u+_e+X*(Q+1),ot=u+(_e+1)+X*(Q+1),ke=u+(_e+1)+X*Q;l.push(Re,Je,ke),l.push(Je,ot,ke),ne+=6}o.addGroup(g,ne,C),g+=ne,u+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ws=class i extends Jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,f=e/o,u=t/l,g=[],v=[],S=[],m=[];for(let p=0;p<d;p++){let I=p*u-a;for(let L=0;L<c;L++){let E=L*f-r;v.push(E,-I,0),S.push(0,0,1),m.push(L/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let I=0;I<o;I++){let L=I+c*p,E=I+c*(p+1),R=I+1+c*(p+1),A=I+1+c*p;g.push(L,E,A),g.push(E,R,A)}this.setIndex(g),this.setAttribute("position",new Bt(v,3)),this.setAttribute("normal",new Bt(S,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ea=class extends Jt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new N,r=new N;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,d=l.length;c<d;++c){let f=l[c],u=f.start,g=f.count;for(let v=u,S=u+g;v<S;v+=3)for(let m=0;m<3;m++){let p=o.getX(v+m),I=o.getX(v+(m+1)%3);s.fromBufferAttribute(a,p),r.fromBufferAttribute(a,I),td(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let d=3*o+c,f=3*o+(c+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,f),td(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Bt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function td(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Cs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(nd(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(nd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function on(i){let e={};for(let t=0;t<i.length;t++){let n=Cs(i[t]);for(let s in n)e[s]=n[s]}return e}function nd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var ga={clone:Cs,merge:on},Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=bm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new at().setHex(s.value);break;case"v2":this.uniforms[n].value=new ze().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new wt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Pt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},To=class extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ao=class extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Co=class extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Qa(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Zi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ro=class extends Zi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oc,endingEnd:Oc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Bc:r=e,o=2*t-n;break;case zc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Bc:a=e,l=2*n-t;break;case zc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,g=this._weightNext,v=(n-t)/(s-t),S=v*v,m=S*v,p=-u*m+2*u*S-u*v,I=(1+u)*m+(-1.5-2*u)*S+(-.5+u)*v+1,L=(-1-g)*m+(1.5+g)*S+.5*v,E=g*m-g*S;for(let R=0;R!==o;++R)r[R]=p*a[d+R]+I*a[c+R]+L*a[l+R]+E*a[f+R];return r}},Po=class extends Zi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),f=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*d;return r}},Io=class extends Zi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Lo=class extends Zi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,f=this.outTangents;if(!d||!f){let v=(n-t)/(s-t),S=1-v;for(let m=0;m!==o;++m)r[m]=a[c+m]*S+a[l+m]*v;return r}let u=o*2,g=e-1;for(let v=0;v!==o;++v){let S=a[c+v],m=a[l+v],p=g*u+v*2,I=f[p],L=f[p+1],E=e*u+v*2,R=d[E],A=d[E+1],P=(n-t)/(s-t),y,C,U,F,W;for(let ee=0;ee<8;ee++){y=P*P,C=y*P,U=1-P,F=U*U,W=F*U;let X=W*t+3*F*P*I+3*U*y*R+C*s-n;if(Math.abs(X)<1e-10)break;let J=3*F*(I-t)+6*U*P*(R-I)+3*y*(s-R);if(Math.abs(J)<1e-10)break;P=P-X/J,P=Math.max(0,Math.min(1,P))}r[v]=W*S+3*F*P*L+3*U*y*A+C*m}return r}},Dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qa(t,this.TimeBufferType),this.values=Qa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qa(e.times,Array),values:Qa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Lo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case go:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break;case Fc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return go;case this.InterpolantFactoryMethodSmooth:return io;case this.InterpolantFactoryMethodBezier:return Fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Xe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Vp(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Xe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===io,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let f=o*n,u=f-n,g=f+n;for(let v=0;v!==n;++v){let S=t[f+v];if(S!==t[u+v]||S!==t[g+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let g=0;g!==n;++g)t[u+g]=t[f+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=go;var Ji=class extends Dn{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=kr;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Do=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Do.prototype.ValueTypeName="color";var No=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};No.prototype.ValueTypeName="number";var Uo=class extends Zi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)Rn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ta=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Uo(this.times,this.values,this.getValueSize(),e)}};ta.prototype.ValueTypeName="quaternion";ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends Dn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=kr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Fo.prototype.ValueTypeName="vector";var Oo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,f){return c.push(d,f),this},this.removeHandler=function(d){let f=c.indexOf(d);return f!==-1&&c.splice(f,2),this},this.getHandler=function(d){for(let f=0,u=c.length;f<u;f+=2){let g=c[f],v=c[f+1];if(g.global&&(g.lastIndex=0),g.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qd=new Oo,Bo=class{constructor(e){this.manager=e!==void 0?e:qd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Bo.DEFAULT_MATERIAL_NAME="__DEFAULT";var eo=new N,to=new Rn,ci=new N,na=class extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eo,to,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(eo,to,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xi=new N,id=new ze,sd=new ze,$t=class extends na{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,id,sd),t.subVectors(sd,id)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ts=class extends na{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ia=class extends Jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var js=-90,Qs=1,zo=class extends vn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new $t(js,Qs,e,t);s.layers=this.layers,this.add(s);let r=new $t(js,Qs,e,t);r.layers=this.layers,this.add(r);let a=new $t(js,Qs,e,t);a.layers=this.layers,this.add(a);let o=new $t(js,Qs,e,t);o.layers=this.layers,this.add(o);let l=new $t(js,Qs,e,t);l.layers=this.layers,this.add(l);let c=new $t(js,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},ko=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var ph="\\[\\]\\.:\\/",wm=new RegExp("["+ph+"]","g"),mh="[^"+ph+"]",Tm="[^"+ph.replace("\\.","")+"]",Am=/((?:WC+[\/:])*)/.source.replace("WC",mh),Cm=/(WCOD+)?/.source.replace("WCOD",Tm),Rm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mh),Pm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mh),Im=new RegExp("^"+Am+Cm+Rm+Pm+"$"),Lm=["material","materials","bones","map"],Vc=class{constructor(e,t,n){let s=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Nt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wm,"")}static parseTrackName(e){let t=Im.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Lm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Nt.Composite=Vc;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Hy=new Float32Array(1);var ji=class extends Zr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var rd=new Pt,sa=class{constructor(e,t,n=0,s=1/0){this.ray=new $i(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ar,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return rd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rd),this}intersectObject(e,t=!0,n=[]){return Gc(e,this,n,t),n.sort(ad),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Gc(e[s],this,n,t);return n.sort(ad),n}};function ad(i,e){return i.distance-e.distance}function Gc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Gc(r[a],e,t,!0)}}var ur=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Mh=class Mh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Mh.prototype.isMatrix2=!0;var Hc=Mh;var od=new N,no=new N,er=new N,tr=new N,Uc=new N,Dm=new N,Nm=new N,ra=class{constructor(e=new N,t=new N){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){od.subVectors(e,this.start),no.subVectors(this.end,this.start);let n=no.dot(no);if(n===0)return 0;let r=no.dot(od)/n;return t&&(r=et(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Dm,n=Nm){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,d=e.end;er.subVectors(c,o),tr.subVectors(d,l),Uc.subVectors(o,l);let f=er.dot(er),u=tr.dot(tr),g=tr.dot(Uc);if(f<=s&&u<=s)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=s)r=0,a=g/u,a=et(a,0,1);else{let v=er.dot(Uc);if(u<=s)a=0,r=et(-v/f,0,1);else{let S=er.dot(tr),m=f*u-S*S;m!==0?r=et((S*g-v*u)/m,0,1):r=0,a=(S*r+g)/u,a<0?(a=0,r=et(-v/f,0,1)):a>1&&(a=1,r=et((S-v)/f,0,1))}}return t.copy(o).addScaledVector(er,r),n.copy(l).addScaledVector(tr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var aa=class extends ii{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ge("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function gh(i,e,t,n){let s=Um(n);switch(t){case oh:return i*e;case ch:return i*e/s.components*s.byteLength;case $o:return i*e/s.components*s.byteLength;case ss:return i*e*2/s.components*s.byteLength;case Zo:return i*e*2/s.components*s.byteLength;case lh:return i*e*3/s.components*s.byteLength;case Wn:return i*e*4/s.components*s.byteLength;case Jo:return i*e*4/s.components*s.byteLength;case ha:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case da:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jo:case el:return Math.max(i,16)*Math.max(e,8)/4;case Ko:case Qo:return Math.max(i,8)*Math.max(e,8)/2;case tl:case nl:case sl:case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case il:case pa:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ml:case bl:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case El:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ma:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Um(i){switch(i){case Nn:case ih:return{byteLength:1,components:1};case fr:case sh:case fi:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case ai:case Xo:case oi:return{byteLength:4,components:1};case rh:case ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function gf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Om(i){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let d=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,d);else{f.sort((g,v)=>g.start-v.start);let u=0;for(let g=1;g<f.length;g++){let v=f[u],S=f[g];S.start<=v.start+v.count+1?v.count=Math.max(v.count,S.start+S.count-v.start):(++u,f[u]=S)}f.length=u+1;for(let g=0,v=f.length;g<v;g++){let S=f[g];i.bufferSubData(c,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Bm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zm=`#ifdef USE_ALPHAHASH
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
#endif`,km=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
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
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
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
#endif`,Ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Km=`#ifdef USE_IRIDESCENCE
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
#endif`,jm=`#ifdef USE_BUMPMAP
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,og=`#define PI 3.141592653589793
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
} // validated`,lg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cg=`vec3 transformedNormal = objectNormal;
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
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",mg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gg=`#ifdef USE_ENVMAP
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
#endif`,_g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wg=`#ifdef USE_GRADIENTMAP
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
}`,Tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Ig=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ug=`PhysicalMaterial material;
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
#endif`,Fg=`uniform sampler2D dfgLUT;
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
}`,Og=`
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
#endif`,Bg=`#if defined( RE_IndirectDiffuse )
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
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$g=`#if defined( USE_POINTS_UV )
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
#endif`,Zg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e_=`#ifdef USE_MORPHTARGETS
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
#endif`,t_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,i_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,s_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,o_=`#ifdef USE_NORMALMAP
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
#endif`,l_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,c_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,p_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,__=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,x_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,v_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,S_=`float getShadowMask() {
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
}`,E_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,w_=`#ifdef USE_SKINNING
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
#endif`,T_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A_=`#ifdef USE_SKINNING
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
#endif`,C_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,I_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,L_=`#ifdef USE_TRANSMISSION
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
#endif`,D_=`#ifdef USE_TRANSMISSION
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
#endif`,N_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,B_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z_=`uniform sampler2D t2D;
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
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`#include <common>
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
}`,X_=`#if DEPTH_PACKING == 3200
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
}`,q_=`#define DISTANCE
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
}`,Y_=`#define DISTANCE
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
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Z_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`uniform float scale;
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
}`,K_=`uniform vec3 diffuse;
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
}`,j_=`#include <common>
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
}`,Q_=`uniform vec3 diffuse;
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
}`,e0=`#define LAMBERT
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
}`,t0=`#define LAMBERT
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
}`,n0=`#define MATCAP
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
}`,i0=`#define MATCAP
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
}`,s0=`#define NORMAL
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
}`,r0=`#define NORMAL
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
}`,a0=`#define PHONG
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
}`,o0=`#define PHONG
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
}`,l0=`#define STANDARD
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
}`,c0=`#define STANDARD
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
}`,h0=`#define TOON
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
}`,u0=`#define TOON
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
}`,d0=`uniform float size;
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
}`,f0=`uniform vec3 diffuse;
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
}`,p0=`#include <common>
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
}`,m0=`uniform vec3 color;
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
}`,g0=`uniform float rotation;
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
}`,_0=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:Bm,alphahash_pars_fragment:zm,alphamap_fragment:km,alphamap_pars_fragment:Vm,alphatest_fragment:Gm,alphatest_pars_fragment:Hm,aomap_fragment:Wm,aomap_pars_fragment:Xm,batching_pars_vertex:qm,batching_vertex:Ym,begin_vertex:$m,beginnormal_vertex:Zm,bsdfs:Jm,iridescence_fragment:Km,bumpmap_pars_fragment:jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:eg,clipping_planes_pars_vertex:tg,clipping_planes_vertex:ng,color_fragment:ig,color_pars_fragment:sg,color_pars_vertex:rg,color_vertex:ag,common:og,cube_uv_reflection_fragment:lg,defaultnormal_vertex:cg,displacementmap_pars_vertex:hg,displacementmap_vertex:ug,emissivemap_fragment:dg,emissivemap_pars_fragment:fg,colorspace_fragment:pg,colorspace_pars_fragment:mg,envmap_fragment:gg,envmap_common_pars_fragment:_g,envmap_pars_fragment:xg,envmap_pars_vertex:yg,envmap_physical_pars_fragment:Pg,envmap_vertex:vg,fog_vertex:Mg,fog_pars_vertex:bg,fog_fragment:Sg,fog_pars_fragment:Eg,gradientmap_pars_fragment:wg,lightmap_pars_fragment:Tg,lights_lambert_fragment:Ag,lights_lambert_pars_fragment:Cg,lights_pars_begin:Rg,lights_toon_fragment:Ig,lights_toon_pars_fragment:Lg,lights_phong_fragment:Dg,lights_phong_pars_fragment:Ng,lights_physical_fragment:Ug,lights_physical_pars_fragment:Fg,lights_fragment_begin:Og,lights_fragment_maps:Bg,lights_fragment_end:zg,lightprobes_pars_fragment:kg,logdepthbuf_fragment:Vg,logdepthbuf_pars_fragment:Gg,logdepthbuf_pars_vertex:Hg,logdepthbuf_vertex:Wg,map_fragment:Xg,map_pars_fragment:qg,map_particle_fragment:Yg,map_particle_pars_fragment:$g,metalnessmap_fragment:Zg,metalnessmap_pars_fragment:Jg,morphinstance_vertex:Kg,morphcolor_vertex:jg,morphnormal_vertex:Qg,morphtarget_pars_vertex:e_,morphtarget_vertex:t_,normal_fragment_begin:n_,normal_fragment_maps:i_,normal_pars_fragment:s_,normal_pars_vertex:r_,normal_vertex:a_,normalmap_pars_fragment:o_,clearcoat_normal_fragment_begin:l_,clearcoat_normal_fragment_maps:c_,clearcoat_pars_fragment:h_,iridescence_pars_fragment:u_,opaque_fragment:d_,packing:f_,premultiplied_alpha_fragment:p_,project_vertex:m_,dithering_fragment:g_,dithering_pars_fragment:__,roughnessmap_fragment:x_,roughnessmap_pars_fragment:y_,shadowmap_pars_fragment:v_,shadowmap_pars_vertex:M_,shadowmap_vertex:b_,shadowmask_pars_fragment:S_,skinbase_vertex:E_,skinning_pars_vertex:w_,skinning_vertex:T_,skinnormal_vertex:A_,specularmap_fragment:C_,specularmap_pars_fragment:R_,tonemapping_fragment:P_,tonemapping_pars_fragment:I_,transmission_fragment:L_,transmission_pars_fragment:D_,uv_pars_fragment:N_,uv_pars_vertex:U_,uv_vertex:F_,worldpos_vertex:O_,background_vert:B_,background_frag:z_,backgroundCube_vert:k_,backgroundCube_frag:V_,cube_vert:G_,cube_frag:H_,depth_vert:W_,depth_frag:X_,distance_vert:q_,distance_frag:Y_,equirect_vert:$_,equirect_frag:Z_,linedashed_vert:J_,linedashed_frag:K_,meshbasic_vert:j_,meshbasic_frag:Q_,meshlambert_vert:e0,meshlambert_frag:t0,meshmatcap_vert:n0,meshmatcap_frag:i0,meshnormal_vert:s0,meshnormal_frag:r0,meshphong_vert:a0,meshphong_frag:o0,meshphysical_vert:l0,meshphysical_frag:c0,meshtoon_vert:h0,meshtoon_frag:u0,points_vert:d0,points_frag:f0,shadow_vert:p0,shadow_frag:m0,sprite_vert:g0,sprite_frag:_0},we={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},pn={basic:{uniforms:on([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:on([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:on([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:on([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:on([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new at(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:on([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:on([we.points,we.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:on([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:on([we.common,we.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:on([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:on([we.sprite,we.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:on([we.common,we.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:on([we.lights,we.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};pn.physical={uniforms:on([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var Rl={r:0,b:0,g:0},x0=new Pt,_f=new je;_f.set(-1,0,0,0,1,0,0,0,1);function y0(i,e,t,n,s,r){let a=new at(0),o=s===!0?0:1,l,c,d=null,f=0,u=null;function g(I){let L=I.isScene===!0?I.background:null;if(L&&L.isTexture){let E=I.backgroundBlurriness>0;L=e.get(L,E)}return L}function v(I){let L=!1,E=g(I);E===null?m(a,o):E&&E.isColor&&(m(E,1),L=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(I,L){let E=g(L);E&&(E.isCubeTexture||E.mapping===la)?(c===void 0&&(c=new Kt(new hr(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Cs(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=E,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(x0.makeRotationFromEuler(L.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(_f),c.material.toneMapped=ut.getTransfer(E.colorSpace)!==yt,(d!==E||f!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,u=i.toneMapping),c.layers.enableAll(),I.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Kt(new ws(2,2),new dn({name:"BackgroundMaterial",uniforms:Cs(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=ut.getTransfer(E.colorSpace)!==yt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,f=E.version,u=i.toneMapping),l.layers.enableAll(),I.unshift(l,l.geometry,l.material,0,0,null))}function m(I,L){I.getRGB(Rl,fh(i)),t.buffers.color.setClear(Rl.r,Rl.g,Rl.b,L,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(I,L=1){a.set(I),o=L,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(I){o=I,m(a,o)},render:v,addToRenderList:S,dispose:p}}function v0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(F,W,ee,te,X){let J=!1,Z=f(F,te,ee,W);r!==Z&&(r=Z,c(r.object)),J=g(F,te,ee,X),J&&v(F,te,ee,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,E(F,W,ee,te),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function d(F){return i.deleteVertexArray(F)}function f(F,W,ee,te){let X=te.wireframe===!0,J=n[W.id];J===void 0&&(J={},n[W.id]=J);let Z=F.isInstancedMesh===!0?F.id:0,ne=J[Z];ne===void 0&&(ne={},J[Z]=ne);let oe=ne[ee.id];oe===void 0&&(oe={},ne[ee.id]=oe);let Q=oe[X];return Q===void 0&&(Q=u(l()),oe[X]=Q),Q}function u(F){let W=[],ee=[],te=[];for(let X=0;X<t;X++)W[X]=0,ee[X]=0,te[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:ee,attributeDivisors:te,object:F,attributes:{},index:null}}function g(F,W,ee,te){let X=r.attributes,J=W.attributes,Z=0,ne=ee.getAttributes();for(let oe in ne)if(ne[oe].location>=0){let _e=X[oe],Re=J[oe];if(Re===void 0&&(oe==="instanceMatrix"&&F.instanceMatrix&&(Re=F.instanceMatrix),oe==="instanceColor"&&F.instanceColor&&(Re=F.instanceColor)),_e===void 0||_e.attribute!==Re||Re&&_e.data!==Re.data)return!0;Z++}return r.attributesNum!==Z||r.index!==te}function v(F,W,ee,te){let X={},J=W.attributes,Z=0,ne=ee.getAttributes();for(let oe in ne)if(ne[oe].location>=0){let _e=J[oe];_e===void 0&&(oe==="instanceMatrix"&&F.instanceMatrix&&(_e=F.instanceMatrix),oe==="instanceColor"&&F.instanceColor&&(_e=F.instanceColor));let Re={};Re.attribute=_e,_e&&_e.data&&(Re.data=_e.data),X[oe]=Re,Z++}r.attributes=X,r.attributesNum=Z,r.index=te}function S(){let F=r.newAttributes;for(let W=0,ee=F.length;W<ee;W++)F[W]=0}function m(F){p(F,0)}function p(F,W){let ee=r.newAttributes,te=r.enabledAttributes,X=r.attributeDivisors;ee[F]=1,te[F]===0&&(i.enableVertexAttribArray(F),te[F]=1),X[F]!==W&&(i.vertexAttribDivisor(F,W),X[F]=W)}function I(){let F=r.newAttributes,W=r.enabledAttributes;for(let ee=0,te=W.length;ee<te;ee++)W[ee]!==F[ee]&&(i.disableVertexAttribArray(ee),W[ee]=0)}function L(F,W,ee,te,X,J,Z){Z===!0?i.vertexAttribIPointer(F,W,ee,X,J):i.vertexAttribPointer(F,W,ee,te,X,J)}function E(F,W,ee,te){S();let X=te.attributes,J=ee.getAttributes(),Z=W.defaultAttributeValues;for(let ne in J){let oe=J[ne];if(oe.location>=0){let Q=X[ne];if(Q===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),Q!==void 0){let _e=Q.normalized,Re=Q.itemSize,Je=e.get(Q);if(Je===void 0)continue;let ot=Je.buffer,ke=Je.type,re=Je.bytesPerElement,ge=ke===i.INT||ke===i.UNSIGNED_INT||Q.gpuType===Xo;if(Q.isInterleavedBufferAttribute){let ue=Q.data,qe=ue.stride,Ye=Q.offset;if(ue.isInstancedInterleavedBuffer){for(let Oe=0;Oe<oe.locationSize;Oe++)p(oe.location+Oe,ue.meshPerAttribute);F.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Oe=0;Oe<oe.locationSize;Oe++)m(oe.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let Oe=0;Oe<oe.locationSize;Oe++)L(oe.location+Oe,Re/oe.locationSize,ke,_e,qe*re,(Ye+Re/oe.locationSize*Oe)*re,ge)}else{if(Q.isInstancedBufferAttribute){for(let ue=0;ue<oe.locationSize;ue++)p(oe.location+ue,Q.meshPerAttribute);F.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ue=0;ue<oe.locationSize;ue++)m(oe.location+ue);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let ue=0;ue<oe.locationSize;ue++)L(oe.location+ue,Re/oe.locationSize,ke,_e,Re*re,Re/oe.locationSize*ue*re,ge)}}else if(Z!==void 0){let _e=Z[ne];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(oe.location,_e);break;case 3:i.vertexAttrib3fv(oe.location,_e);break;case 4:i.vertexAttrib4fv(oe.location,_e);break;default:i.vertexAttrib1fv(oe.location,_e)}}}}I()}function R(){C();for(let F in n){let W=n[F];for(let ee in W){let te=W[ee];for(let X in te){let J=te[X];for(let Z in J)d(J[Z].object),delete J[Z];delete te[X]}}delete n[F]}}function A(F){if(n[F.id]===void 0)return;let W=n[F.id];for(let ee in W){let te=W[ee];for(let X in te){let J=te[X];for(let Z in J)d(J[Z].object),delete J[Z];delete te[X]}}delete n[F.id]}function P(F){for(let W in n){let ee=n[W];for(let te in ee){let X=ee[te];if(X[F.id]===void 0)continue;let J=X[F.id];for(let Z in J)d(J[Z].object),delete J[Z];delete X[F.id]}}}function y(F){for(let W in n){let ee=n[W],te=F.isInstancedMesh===!0?F.id:0,X=ee[te];if(X!==void 0){for(let J in X){let Z=X[J];for(let ne in Z)d(Z[ne].object),delete Z[ne];delete X[J]}delete ee[te],Object.keys(ee).length===0&&delete n[W]}}}function C(){U(),a=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:U,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:m,disableUnusedAttributes:I}}function M0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let u=0;for(let g=0;g<d;g++)u+=c[g];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function b0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Wn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Nn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==oi&&!y)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(Ge("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),I=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:g,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:I,maxVaryings:L,maxFragmentUniforms:E,maxSamples:R,samples:A}}function S0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Vn,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let g=f.length!==0||u||n!==0||s;return s=u,n=f.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,g){let v=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||v===null||v.length===0||r&&!m)r?d(null):c();else{let I=r?0:n,L=I*4,E=p.clippingState||null;l.value=E,E=d(v,u,L,g);for(let R=0;R!==L;++R)E[R]=t[R];p.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=I}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(f,u,g,v){let S=f!==null?f.length:0,m=null;if(S!==0){if(m=l.value,v!==!0||m===null){let p=g+S*4,I=u.matrixWorldInverse;o.getNormalMatrix(I),(m===null||m.length<p)&&(m=new Float32Array(p));for(let L=0,E=g;L!==S;++L,E+=4)a.copy(f[L]).applyMatrix4(I,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}var as=4,Yd=[.125,.215,.35,.446,.526,.582],Rs=20,E0=256,_a=new Ts,$d=new at,bh=null,Sh=0,Eh=0,wh=!1,w0=new N,Il=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=w0}=r;bh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bh,Sh,Eh),this._renderer.xr.enabled=wh,e.scissorTest=!1,mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:fi,format:Wn,colorSpace:Vr,depthBuffer:!1},s=Zd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=T0(r)),this._blurMaterial=C0(r,e,t),this._ggxMaterial=A0(r,e,t)}return s}_compileMaterial(e){let t=new Kt(new Jt,e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,s,r){let l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,g=f.toneMapping;f.getClearColor($d),f.toneMapping=ri,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new hr,new Ss({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,m=S.material,p=!1,I=e.background;I?I.isColor&&(m.color.copy(I),e.background=null,p=!0):(m.color.copy($d),p=!0);for(let L=0;L<6;L++){let E=L%3;E===0?(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[L],r.y,r.z)):E===1?(l.up.set(0,0,c[L]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[L],r.z)):(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[L]));let R=this._cubeSize;mr(s,E*R,L>2?R:0,R,R),f.setRenderTarget(s),p&&f.render(S,l),f.render(e,l)}f.toneMapping=g,f.autoClear=u,e.background=I}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ts||e.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;mr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,_a)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=0+c*1.25,g=f*u,{_lodMax:v}=this,S=this._sizeLods[n],m=3*S*(n>v-as?n-v+as:0),p=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,mr(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(o,_a),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,mr(e,m,p,3*S,2*S),s.setRenderTarget(e),s.render(o,_a)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");let d=3,f=this._lodMeshes[s];f.material=c;let u=c.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Rs-1),S=r/v,m=isFinite(r)?1+Math.floor(d*S):Rs;m>Rs&&Ge(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Rs}`);let p=[],I=0;for(let P=0;P<Rs;++P){let y=P/S,C=Math.exp(-y*y/2);p.push(C),P===0?I+=C:P<m&&(I+=2*C)}for(let P=0;P<p.length;P++)p[P]=p[P]/I;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:L}=this;u.dTheta.value=v,u.mipInt.value=L-n;let E=this._sizeLods[s],R=3*E*(s>L-as?s-L+as:0),A=4*(this._cubeSize-E);mr(t,R,A,3*E,2*E),l.setRenderTarget(t),l.render(f,_a)}};function T0(i){let e=[],t=[],n=[],s=i,r=i-as+1+Yd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-as?l=Yd[a-i+as-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),d=-c,f=1+c,u=[d,d,f,d,f,f,d,d,f,f,d,f],g=6,v=6,S=3,m=2,p=1,I=new Float32Array(S*v*g),L=new Float32Array(m*v*g),E=new Float32Array(p*v*g);for(let A=0;A<g;A++){let P=A%3*2/3-1,y=A>2?0:-1,C=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];I.set(C,S*v*A),L.set(u,m*v*A);let U=[A,A,A,A,A,A];E.set(U,p*v*A)}let R=new Jt;R.setAttribute("position",new yn(I,S)),R.setAttribute("uv",new yn(L,m)),R.setAttribute("faceIndex",new yn(E,p)),n.push(new Kt(R,null)),s>as&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Zd(i,e,t){let n=new Pn(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function A0(i,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:E0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function C0(i,e,t){let n=new Float32Array(Rs),s=new N(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Jd(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Kd(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Nl(){return`

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
	`}var Ll=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new jr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hr(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:di});r.uniforms.tEquirect.value=t;let a=new Kt(s,r),o=t.minFilter;return t.minFilter===ns&&(t.minFilter=Zt),new zo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function R0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,g=!1){return u==null?null:g?a(u):r(u)}function r(u){if(u&&u.isTexture){let g=u.mapping;if(g===Go||g===Ho)if(e.has(u)){let v=e.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let S=new Ll(v.height);return S.fromEquirectangularTexture(i,u),e.set(u,S),u.addEventListener("dispose",c),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let g=u.mapping,v=g===Go||g===Ho,S=g===ts||g===As;if(v||S){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Il(i)),m=v?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let I=u.image;return v&&I&&I.height>0||S&&I&&l(I)?(n===null&&(n=new Il(i)),m=v?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,g){return g===Go?u.mapping=ts:g===Ho&&(u.mapping=As),u}function l(u){let g=0,v=6;for(let S=0;S<v;S++)u[S]!==void 0&&g++;return g===v}function c(u){let g=u.target;g.removeEventListener("dispose",c);let v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function d(u){let g=u.target;g.removeEventListener("dispose",d);let v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function P0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function I0(i,e,t,n){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&e.remove(u.index);for(let v in u.attributes)e.remove(u.attributes[v]);u.removeEventListener("dispose",a),delete s[u.id];let g=r.get(u);g&&(e.remove(g),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(f){let u=f.attributes;for(let g in u)e.update(u[g],i.ARRAY_BUFFER)}function c(f){let u=[],g=f.index,v=f.attributes.position,S=0;if(v===void 0)return;if(g!==null){let I=g.array;S=g.version;for(let L=0,E=I.length;L<E;L+=3){let R=I[L+0],A=I[L+1],P=I[L+2];u.push(R,A,A,P,P,R)}}else{let I=v.array;S=v.version;for(let L=0,E=I.length/3-1;L<E;L+=3){let R=L+0,A=L+1,P=L+2;u.push(R,A,A,P,P,R)}}let m=new(v.count>=65535?$r:Yr)(u,1);m.version=S;let p=r.get(f);p&&e.remove(p),r.set(f,m)}function d(f){let u=r.get(f);if(u){let g=f.index;g!==null&&u.version<g.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function L0(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function c(f,u,g){g!==0&&(i.drawElementsInstanced(n,u,r,f*a,g),t.update(u,n,g))}function d(f,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,g);let S=0;for(let m=0;m<g;m++)S+=u[m];t.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function D0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function N0(i,e,t){let n=new WeakMap,s=new wt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==f){let C=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],I=o.morphAttributes.color||[],L=0;g===!0&&(L=1),v===!0&&(L=2),S===!0&&(L=3);let E=o.attributes.position.count*L,R=1;E>e.maxTextureSize&&(R=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let A=new Float32Array(E*R*4*f),P=new qr(A,E,R,f);P.type=oi,P.needsUpdate=!0;let y=L*4;for(let U=0;U<f;U++){let F=m[U],W=p[U],ee=I[U],te=E*R*4*U;for(let X=0;X<F.count;X++){let J=X*y;g===!0&&(s.fromBufferAttribute(F,X),A[te+J+0]=s.x,A[te+J+1]=s.y,A[te+J+2]=s.z,A[te+J+3]=0),v===!0&&(s.fromBufferAttribute(W,X),A[te+J+4]=s.x,A[te+J+5]=s.y,A[te+J+6]=s.z,A[te+J+7]=0),S===!0&&(s.fromBufferAttribute(ee,X),A[te+J+8]=s.x,A[te+J+9]=s.y,A[te+J+10]=s.z,A[te+J+11]=ee.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new ze(E,R)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let S=0;S<c.length;S++)g+=c[S];let v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function U0(i,e,t,n,s){let r=new WeakMap;function a(c){let d=s.render.frame,f=c.geometry,u=e.get(c,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let g=c.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return u}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var F0={[Zc]:"LINEAR_TONE_MAPPING",[Jc]:"REINHARD_TONE_MAPPING",[Kc]:"CINEON_TONE_MAPPING",[jc]:"ACES_FILMIC_TONE_MAPPING",[eh]:"AGX_TONE_MAPPING",[th]:"NEUTRAL_TONE_MAPPING",[Qc]:"CUSTOM_TONE_MAPPING"};function O0(i,e,t,n,s,r){let a=new Pn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Di(e,t):void 0}),o=new Pn(e,t,{type:fi,depthBuffer:!1,stencilBuffer:!1}),l=new Jt;l.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bt([0,2,0,0,2,0],2));let c=new To({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Kt(l,c),f=new Ts(-1,1,1,-1,0,1),u=null,g=null,v=!1,S,m=null,p=[],I=!1;this.setSize=function(L,E){a.setSize(L,E),o.setSize(L,E);for(let R=0;R<p.length;R++){let A=p[R];A.setSize&&A.setSize(L,E)}},this.setEffects=function(L){p=L,I=p.length>0&&p[0].isRenderPass===!0;let E=a.width,R=a.height;for(let A=0;A<p.length;A++){let P=p[A];P.setSize&&P.setSize(E,R)}},this.begin=function(L,E){if(v||L.toneMapping===ri&&p.length===0)return!1;if(m=E,E!==null){let R=E.width,A=E.height;(a.width!==R||a.height!==A)&&this.setSize(R,A)}return I===!1&&L.setRenderTarget(a),S=L.toneMapping,L.toneMapping=ri,!0},this.hasRenderPass=function(){return I},this.end=function(L,E){L.toneMapping=S,v=!0;let R=a,A=o;for(let P=0;P<p.length;P++){let y=p[P];if(y.enabled!==!1&&(y.render(L,A,R,E),y.needsSwap!==!1)){let C=R;R=A,A=C}}if(u!==L.outputColorSpace||g!==L.toneMapping){u=L.outputColorSpace,g=L.toneMapping,c.defines={},ut.getTransfer(u)===yt&&(c.defines.SRGB_TRANSFER="");let P=F0[g];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,L.setRenderTarget(m),L.render(d,f),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var xf=new un,Ch=new Di(1,1),yf=new qr,vf=new vo,Mf=new jr,jd=[],Qd=[],ef=new Float32Array(16),tf=new Float32Array(9),nf=new Float32Array(4);function _r(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=jd[s];if(r===void 0&&(r=new Float32Array(s),jd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ul(i,e){let t=Qd[e];t===void 0&&(t=new Int32Array(e),Qd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function B0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function k0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function V0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function G0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;nf.set(n),i.uniformMatrix2fv(this.addr,!1,nf),Vt(t,n)}}function H0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;tf.set(n),i.uniformMatrix3fv(this.addr,!1,tf),Vt(t,n)}}function W0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;ef.set(n),i.uniformMatrix4fv(this.addr,!1,ef),Vt(t,n)}}function X0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function $0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Z0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function J0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function K0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Q0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ch.compareFunction=t.isReversedDepthBuffer()?Cl:Al,r=Ch):r=xf,t.setTexture2D(e||r,s)}function ex(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||vf,s)}function tx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Mf,s)}function nx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||yf,s)}function ix(i){switch(i){case 5126:return B0;case 35664:return z0;case 35665:return k0;case 35666:return V0;case 35674:return G0;case 35675:return H0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return q0;case 35668:case 35672:return Y0;case 35669:case 35673:return $0;case 5125:return Z0;case 36294:return J0;case 36295:return K0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return Q0;case 35679:case 36299:case 36307:return ex;case 35680:case 36300:case 36308:case 36293:return tx;case 36289:case 36303:case 36311:case 36292:return nx}}function sx(i,e){i.uniform1fv(this.addr,e)}function rx(i,e){let t=_r(e,this.size,2);i.uniform2fv(this.addr,t)}function ax(i,e){let t=_r(e,this.size,3);i.uniform3fv(this.addr,t)}function ox(i,e){let t=_r(e,this.size,4);i.uniform4fv(this.addr,t)}function lx(i,e){let t=_r(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cx(i,e){let t=_r(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hx(i,e){let t=_r(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ux(i,e){i.uniform1iv(this.addr,e)}function dx(i,e){i.uniform2iv(this.addr,e)}function fx(i,e){i.uniform3iv(this.addr,e)}function px(i,e){i.uniform4iv(this.addr,e)}function mx(i,e){i.uniform1uiv(this.addr,e)}function gx(i,e){i.uniform2uiv(this.addr,e)}function _x(i,e){i.uniform3uiv(this.addr,e)}function xx(i,e){i.uniform4uiv(this.addr,e)}function yx(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ch:a=xf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function vx(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||vf,r[a])}function Mx(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Mf,r[a])}function bx(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||yf,r[a])}function Sx(i){switch(i){case 5126:return sx;case 35664:return rx;case 35665:return ax;case 35666:return ox;case 35674:return lx;case 35675:return cx;case 35676:return hx;case 5124:case 35670:return ux;case 35667:case 35671:return dx;case 35668:case 35672:return fx;case 35669:case 35673:return px;case 5125:return mx;case 36294:return gx;case 36295:return _x;case 36296:return xx;case 35678:case 36198:case 36298:case 36306:case 35682:return yx;case 35679:case 36299:case 36307:return vx;case 35680:case 36300:case 36308:case 36293:return Mx;case 36289:case 36303:case 36311:case 36292:return bx}}var Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ix(t.type)}},Ph=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sx(t.type)}},Ih=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Th=/(\w+)(\])?(\[|\.)?/g;function sf(i,e){i.seq.push(e),i.map[e.id]=e}function Ex(i,e,t){let n=i.name,s=n.length;for(Th.lastIndex=0;;){let r=Th.exec(n),a=Th.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){sf(t,c===void 0?new Rh(o,i,e):new Ph(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Ih(o),sf(t,f)),t=f}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ex(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function rf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var wx=37297,Tx=0;function Ax(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var af=new je;function Cx(i){ut._getMatrix(af,ut.workingColorSpace,i);let e=`mat3( ${af.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(i)){case Gr:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function of(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ax(i.getShaderSource(e),o)}else return r}function Rx(i,e){let t=Cx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Px={[Zc]:"Linear",[Jc]:"Reinhard",[Kc]:"Cineon",[jc]:"ACESFilmic",[eh]:"AgX",[th]:"Neutral",[Qc]:"Custom"};function Ix(i,e){let t=Px[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Pl=new N;function Lx(){ut.getLuminanceCoefficients(Pl);let i=Pl.x.toFixed(4),e=Pl.y.toFixed(4),t=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ya).join(`
`)}function Nx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ux(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ya(i){return i!==""}function lf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Fx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lh(i){return i.replace(Fx,Bx)}var Ox=new Map;function Bx(i,e){let t=it[e];if(t===void 0){let n=Ox.get(e);if(n!==void 0)t=it[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lh(t)}var zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hf(i){return i.replace(zx,kx)}function kx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Vx={[oa]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function Gx(i){return Vx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Hx={[ts]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[la]:"ENVMAP_TYPE_CUBE_UV"};function Wx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Hx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Xx={[As]:"ENVMAP_MODE_REFRACTION"};function qx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Yx={[$c]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};function $x(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Yx[i.combine]||"ENVMAP_BLENDING_NONE"}function Zx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Jx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Gx(t),c=Wx(t),d=qx(t),f=$x(t),u=Zx(t),g=Dx(t),v=Nx(r),S=s.createProgram(),m,p,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ya).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ya).join(`
`),p.length>0&&(p+=`
`)):(m=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ya).join(`
`),p=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?it.tonemapping_pars_fragment:"",t.toneMapping!==ri?Ix("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Rx("linearToOutputTexel",t.outputColorSpace),Lx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ya).join(`
`)),a=Lh(a),a=lf(a,t),a=cf(a,t),o=Lh(o),o=lf(o,t),o=cf(o,t),a=hf(a),o=hf(o),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let L=I+m+a,E=I+p+o,R=rf(s,s.VERTEX_SHADER,L),A=rf(s,s.FRAGMENT_SHADER,E);s.attachShader(S,R),s.attachShader(S,A),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function P(F){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(S)||"",ee=s.getShaderInfoLog(R)||"",te=s.getShaderInfoLog(A)||"",X=W.trim(),J=ee.trim(),Z=te.trim(),ne=!0,oe=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,R,A);else{let Q=of(s,R,"vertex"),_e=of(s,A,"fragment");Xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+X+`
`+Q+`
`+_e)}else X!==""?Ge("WebGLProgram: Program Info Log:",X):(J===""||Z==="")&&(oe=!1);oe&&(F.diagnostics={runnable:ne,programLog:X,vertexShader:{log:J,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(R),s.deleteShader(A),y=new gr(s,S),C=Ux(s,S)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(S,wx)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tx++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=A,this}var Kx=0,Dh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nh(e),t.set(e,n)),n}},Nh=class{constructor(e){this.id=Kx++,this.code=e,this.usedTimes=0}};function jx(i){return i===ss||i===pa||i===ma}function Qx(i,e,t,n,s,r){let a=new ar,o=new Dh,l=new Set,c=[],d=new Map,f=n.logarithmicDepthBuffer,u=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function S(y,C,U,F,W,ee){let te=F.fog,X=W.geometry,J=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,Z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||J,Z),oe=ne&&ne.mapping===la?ne.image.height:null,Q=g[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Ge("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let _e=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Re=_e!==void 0?_e.length:0,Je=0;X.morphAttributes.position!==void 0&&(Je=1),X.morphAttributes.normal!==void 0&&(Je=2),X.morphAttributes.color!==void 0&&(Je=3);let ot,ke,re,ge;if(Q){let Pe=pn[Q];ot=Pe.vertexShader,ke=Pe.fragmentShader}else{ot=y.vertexShader,ke=y.fragmentShader;let Pe=o.getVertexShaderStage(y),Dt=o.getFragmentShaderStage(y);o.update(y,Pe,Dt),re=Pe.id,ge=Dt.id}let ue=i.getRenderTarget(),qe=i.state.buffers.depth.getReversed(),Ye=W.isInstancedMesh===!0,Oe=W.isBatchedMesh===!0,lt=!!y.map,Qe=!!y.matcap,dt=!!ne,st=!!y.aoMap,tt=!!y.lightMap,It=!!y.bumpMap&&y.wireframe===!1,mt=!!y.normalMap,At=!!y.displacementMap,Lt=!!y.emissiveMap,ft=!!y.metalnessMap,Ct=!!y.roughnessMap,z=y.anisotropy>0,Ht=y.clearcoat>0,rt=y.dispersion>0,w=y.iridescence>0,_=y.sheen>0,k=y.transmission>0,q=z&&!!y.anisotropyMap,j=Ht&&!!y.clearcoatMap,fe=Ht&&!!y.clearcoatNormalMap,xe=Ht&&!!y.clearcoatRoughnessMap,K=w&&!!y.iridescenceMap,ie=w&&!!y.iridescenceThicknessMap,pe=_&&!!y.sheenColorMap,Ne=_&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,Te=!!y.specularColorMap,Be=!!y.specularIntensityMap,Ve=k&&!!y.transmissionMap,$e=k&&!!y.thicknessMap,D=!!y.gradientMap,de=!!y.alphaMap,se=y.alphaTest>0,ye=!!y.alphaHash,Ae=!!y.extensions,he=ri;y.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(he=i.toneMapping);let Ue={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:ot,fragmentShader:ke,defines:y.defines,customVertexShaderID:re,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Oe,batchingColor:Oe&&W._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&W.instanceColor!==null,instancingMorph:Ye&&W.morphTexture!==null,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:lt,matcap:Qe,envMap:dt,envMapMode:dt&&ne.mapping,envMapCubeUVHeight:oe,aoMap:st,lightMap:tt,bumpMap:It,normalMap:mt,displacementMap:At,emissiveMap:Lt,normalMapObjectSpace:mt&&y.normalMapType===Dd,normalMapTangentSpace:mt&&y.normalMapType===hh,packedNormalMap:mt&&y.normalMapType===hh&&jx(y.normalMap.format),metalnessMap:ft,roughnessMap:Ct,anisotropy:z,anisotropyMap:q,clearcoat:Ht,clearcoatMap:j,clearcoatNormalMap:fe,clearcoatRoughnessMap:xe,dispersion:rt,iridescence:w,iridescenceMap:K,iridescenceThicknessMap:ie,sheen:_,sheenColorMap:pe,sheenRoughnessMap:Ne,specularMap:Ee,specularColorMap:Te,specularIntensityMap:Be,transmission:k,transmissionMap:Ve,thicknessMap:$e,gradientMap:D,opaque:y.transparent===!1&&y.blending===ys&&y.alphaToCoverage===!1,alphaMap:de,alphaTest:se,alphaHash:ye,combine:y.combine,mapUv:lt&&v(y.map.channel),aoMapUv:st&&v(y.aoMap.channel),lightMapUv:tt&&v(y.lightMap.channel),bumpMapUv:It&&v(y.bumpMap.channel),normalMapUv:mt&&v(y.normalMap.channel),displacementMapUv:At&&v(y.displacementMap.channel),emissiveMapUv:Lt&&v(y.emissiveMap.channel),metalnessMapUv:ft&&v(y.metalnessMap.channel),roughnessMapUv:Ct&&v(y.roughnessMap.channel),anisotropyMapUv:q&&v(y.anisotropyMap.channel),clearcoatMapUv:j&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:fe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&v(y.sheenRoughnessMap.channel),specularMapUv:Ee&&v(y.specularMap.channel),specularColorMapUv:Te&&v(y.specularColorMap.channel),specularIntensityMapUv:Be&&v(y.specularIntensityMap.channel),transmissionMapUv:Ve&&v(y.transmissionMap.channel),thicknessMapUv:$e&&v(y.thicknessMap.channel),alphaMapUv:de&&v(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(mt||z),vertexNormals:!!X.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!X.attributes.uv&&(lt||de),fog:!!te,useFog:y.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||X.attributes.normal===void 0&&mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:qe,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Je,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:lt&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===yt,decodeVideoTextureEmissive:Lt&&y.emissiveMap.isVideoTexture===!0&&ut.getTransfer(y.emissiveMap.colorSpace)===yt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Hn,flipSided:y.side===fn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ae&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&y.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function m(y){let C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(let U in y.defines)C.push(U),C.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(p(C,y),I(C,y),C.push(i.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function p(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function I(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function L(y){let C=g[y.type],U;if(C){let F=pn[C];U=ga.clone(F.uniforms)}else U=y.uniforms;return U}function E(y,C){let U=d.get(C);return U!==void 0?++U.usedTimes:(U=new Jx(i,C,y,s),c.push(U),d.set(C,U)),U}function R(y){if(--y.usedTimes===0){let C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function A(y){o.remove(y)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:L,acquireProgram:E,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:P}}function ey(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ty(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function df(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ff(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function o(u,g,v,S,m,p){let I=i[e];return I===void 0?(I={id:u.id,object:u,geometry:g,material:v,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:p},i[e]=I):(I.id=u.id,I.object=u,I.geometry=g,I.material=v,I.materialVariant=a(u),I.groupOrder=S,I.renderOrder=u.renderOrder,I.z=m,I.group=p),e++,I}function l(u,g,v,S,m,p){let I=o(u,g,v,S,m,p);v.transmission>0?n.push(I):v.transparent===!0?s.push(I):t.push(I)}function c(u,g,v,S,m,p){let I=o(u,g,v,S,m,p);v.transmission>0?n.unshift(I):v.transparent===!0?s.unshift(I):t.unshift(I)}function d(u,g,v){t.length>1&&t.sort(u||ty),n.length>1&&n.sort(g||df),s.length>1&&s.sort(g||df),v&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let u=e,g=i.length;u<g;u++){let v=i[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:d}}function ny(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new ff,i.set(n,[a])):s>=r.length?(a=new ff,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function iy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new at};break;case"SpotLight":t={position:new N,direction:new N,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function sy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var ry=0;function ay(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function oy(i){let e=new iy,t=sy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new Pt,a=new Pt;function o(c){let d=0,f=0,u=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let g=0,v=0,S=0,m=0,p=0,I=0,L=0,E=0,R=0,A=0,P=0;c.sort(ay);for(let C=0,U=c.length;C<U;C++){let F=c[C],W=F.color,ee=F.intensity,te=F.distance,X=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===ss?X=F.shadow.map.texture:X=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)d+=W.r*ee,f+=W.g*ee,u+=W.b*ee;else if(F.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(F.sh.coefficients[J],ee);P++}else if(F.isDirectionalLight){let J=e.get(F);if(J.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Z=F.shadow,ne=t.get(F);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,n.directionalShadow[g]=ne,n.directionalShadowMap[g]=X,n.directionalShadowMatrix[g]=F.shadow.matrix,I++}n.directional[g]=J,g++}else if(F.isSpotLight){let J=e.get(F);J.position.setFromMatrixPosition(F.matrixWorld),J.color.copy(W).multiplyScalar(ee),J.distance=te,J.coneCos=Math.cos(F.angle),J.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),J.decay=F.decay,n.spot[S]=J;let Z=F.shadow;if(F.map&&(n.spotLightMap[R]=F.map,R++,Z.updateMatrices(F),F.castShadow&&A++),n.spotLightMatrix[S]=Z.matrix,F.castShadow){let ne=t.get(F);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,n.spotShadow[S]=ne,n.spotShadowMap[S]=X,E++}S++}else if(F.isRectAreaLight){let J=e.get(F);J.color.copy(W).multiplyScalar(ee),J.halfWidth.set(F.width*.5,0,0),J.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=J,m++}else if(F.isPointLight){let J=e.get(F);if(J.color.copy(F.color).multiplyScalar(F.intensity),J.distance=F.distance,J.decay=F.decay,F.castShadow){let Z=F.shadow,ne=t.get(F);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,ne.shadowCameraNear=Z.camera.near,ne.shadowCameraFar=Z.camera.far,n.pointShadow[v]=ne,n.pointShadowMap[v]=X,n.pointShadowMatrix[v]=F.shadow.matrix,L++}n.point[v]=J,v++}else if(F.isHemisphereLight){let J=e.get(F);J.skyColor.copy(F.color).multiplyScalar(ee),J.groundColor.copy(F.groundColor).multiplyScalar(ee),n.hemi[p]=J,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==S||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==I||y.numPointShadows!==L||y.numSpotShadows!==E||y.numSpotMaps!==R||y.numLightProbes!==P)&&(n.directional.length=g,n.spot.length=S,n.rectArea.length=m,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=I,n.directionalShadowMap.length=I,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=I,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=E+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,y.directionalLength=g,y.pointLength=v,y.spotLength=S,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=I,y.numPointShadows=L,y.numSpotShadows=E,y.numSpotMaps=R,y.numLightProbes=P,n.version=ry++)}function l(c,d){let f=0,u=0,g=0,v=0,S=0,m=d.matrixWorldInverse;for(let p=0,I=c.length;p<I;p++){let L=c[p];if(L.isDirectionalLight){let E=n.directional[f];E.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),f++}else if(L.isSpotLight){let E=n.spot[g];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),g++}else if(L.isRectAreaLight){let E=n.rectArea[v];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(L.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(L.width*.5,0,0),E.halfHeight.set(0,L.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(L.isPointLight){let E=n.point[u];E.position.setFromMatrixPosition(L.matrixWorld),E.position.applyMatrix4(m),u++}else if(L.isHemisphereLight){let E=n.hemi[S];E.direction.setFromMatrixPosition(L.matrixWorld),E.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:n}}function pf(i){let e=new oy(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ly(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new pf(i),e.set(s,[o])):r>=a.length?(o=new pf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var cy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hy=`uniform sampler2D shadow_pass;
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
}`,uy=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],dy=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],mf=new Pt,xa=new N,Ah=new N;function fy(i,e,t){let n=new Jr,s=new ze,r=new ze,a=new wt,o=new Ao,l=new Co,c={},d=t.maxTextureSize,f={[Ii]:fn,[fn]:Ii,[Hn]:Hn},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:cy,fragmentShader:hy}),g=u.clone();g.defines.HORIZONTAL_PASS=1;let v=new Jt;v.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Kt(v,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let p=this.type;this.render=function(A,P,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===hd&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oa);let C=i.getRenderTarget(),U=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),W=i.state;W.setBlending(di),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let ee=p!==this.type;ee&&P.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(X=>X.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,X=A.length;te<X;te++){let J=A[te],Z=J.shadow;if(Z===void 0){Ge("WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let ne=Z.getFrameExtents();s.multiply(ne),r.copy(Z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,Z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,Z.mapSize.y=r.y));let oe=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=oe,Z.map===null||ee===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===dr){if(J.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Pn(s.x,s.y,{format:ss,type:fi,minFilter:Zt,magFilter:Zt,generateMipmaps:!1}),Z.map.texture.name=J.name+".shadowMap",Z.map.depthTexture=new Di(s.x,s.y,oi),Z.map.depthTexture.name=J.name+".shadowMapDepth",Z.map.depthTexture.format=ui,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Xt,Z.map.depthTexture.magFilter=Xt}else J.isPointLight?(Z.map=new Ll(s.x),Z.map.depthTexture=new wo(s.x,ai)):(Z.map=new Pn(s.x,s.y),Z.map.depthTexture=new Di(s.x,s.y,ai)),Z.map.depthTexture.name=J.name+".shadowMap",Z.map.depthTexture.format=ui,this.type===oa?(Z.map.depthTexture.compareFunction=oe?Cl:Al,Z.map.depthTexture.minFilter=Zt,Z.map.depthTexture.magFilter=Zt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Xt,Z.map.depthTexture.magFilter=Xt);Z.camera.updateProjectionMatrix()}let Q=Z.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<Q;_e++){if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(Z.map),i.clear());let Re=Z.getViewport(_e);a.set(r.x*Re.x,r.y*Re.y,r.x*Re.z,r.y*Re.w),W.viewport(a)}if(J.isPointLight){let Re=Z.camera,Je=Z.matrix,ot=J.distance||Re.far;ot!==Re.far&&(Re.far=ot,Re.updateProjectionMatrix()),xa.setFromMatrixPosition(J.matrixWorld),Re.position.copy(xa),Ah.copy(Re.position),Ah.add(uy[_e]),Re.up.copy(dy[_e]),Re.lookAt(Ah),Re.updateMatrixWorld(),Je.makeTranslation(-xa.x,-xa.y,-xa.z),mf.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(mf,Re.coordinateSystem,Re.reversedDepth)}else Z.updateMatrices(J);n=Z.getFrustum(),E(P,y,Z.camera,J,this.type)}Z.isPointLightShadow!==!0&&this.type===dr&&I(Z,y),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(C,U,F)};function I(A,P){let y=e.update(S);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Pn(s.x,s.y,{format:ss,type:fi})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,y,u,S,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value=A.mapSize,g.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,y,g,S,null)}function L(A,P,y,C){let U=null,F=y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)U=F;else if(U=y.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let W=U.uuid,ee=P.uuid,te=c[W];te===void 0&&(te={},c[W]=te);let X=te[ee];X===void 0&&(X=U.clone(),te[ee]=X,P.addEventListener("dispose",R)),U=X}if(U.visible=P.visible,U.wireframe=P.wireframe,C===dr?U.side=P.shadowSide!==null?P.shadowSide:P.side:U.side=P.shadowSide!==null?P.shadowSide:f[P.side],U.alphaMap=P.alphaMap,U.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,U.map=P.map,U.clipShadows=P.clipShadows,U.clippingPlanes=P.clippingPlanes,U.clipIntersection=P.clipIntersection,U.displacementMap=P.displacementMap,U.displacementScale=P.displacementScale,U.displacementBias=P.displacementBias,U.wireframeLinewidth=P.wireframeLinewidth,U.linewidth=P.linewidth,y.isPointLight===!0&&U.isMeshDistanceMaterial===!0){let W=i.properties.get(U);W.light=y}return U}function E(A,P,y,C,U){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&U===dr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,A.matrixWorld);let ee=e.update(A),te=A.material;if(Array.isArray(te)){let X=ee.groups;for(let J=0,Z=X.length;J<Z;J++){let ne=X[J],oe=te[ne.materialIndex];if(oe&&oe.visible){let Q=L(A,oe,C,U);A.onBeforeShadow(i,A,P,y,ee,Q,ne),i.renderBufferDirect(y,null,ee,Q,A,ne),A.onAfterShadow(i,A,P,y,ee,Q,ne)}}}else if(te.visible){let X=L(A,te,C,U);A.onBeforeShadow(i,A,P,y,ee,X,null),i.renderBufferDirect(y,null,ee,X,A,null),A.onAfterShadow(i,A,P,y,ee,X,null)}}let W=A.children;for(let ee=0,te=W.length;ee<te;ee++)E(W[ee],P,y,C,U)}function R(A){A.target.removeEventListener("dispose",R);for(let y in c){let C=c[y],U=A.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function py(i,e){function t(){let D=!1,de=new wt,se=null,ye=new wt(0,0,0,0);return{setMask:function(Ae){se!==Ae&&!D&&(i.colorMask(Ae,Ae,Ae,Ae),se=Ae)},setLocked:function(Ae){D=Ae},setClear:function(Ae,he,Ue,Pe,Dt){Dt===!0&&(Ae*=Pe,he*=Pe,Ue*=Pe),de.set(Ae,he,Ue,Pe),ye.equals(de)===!1&&(i.clearColor(Ae,he,Ue,Pe),ye.copy(de))},reset:function(){D=!1,se=null,ye.set(-1,0,0,0)}}}function n(){let D=!1,de=!1,se=null,ye=null,Ae=null;return{setReversed:function(he){if(de!==he){let Ue=e.get("EXT_clip_control");he?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),de=he;let Pe=Ae;Ae=null,this.setClear(Pe)}},getReversed:function(){return de},setTest:function(he){he?ue(i.DEPTH_TEST):qe(i.DEPTH_TEST)},setMask:function(he){se!==he&&!D&&(i.depthMask(he),se=he)},setFunc:function(he){if(de&&(he=Hd[he]),ye!==he){switch(he){case ao:i.depthFunc(i.NEVER);break;case oo:i.depthFunc(i.ALWAYS);break;case lo:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case co:i.depthFunc(i.EQUAL);break;case ho:i.depthFunc(i.GEQUAL);break;case uo:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=he}},setLocked:function(he){D=he},setClear:function(he){Ae!==he&&(Ae=he,de&&(he=1-he),i.clearDepth(he))},reset:function(){D=!1,se=null,ye=null,Ae=null,de=!1}}}function s(){let D=!1,de=null,se=null,ye=null,Ae=null,he=null,Ue=null,Pe=null,Dt=null;return{setTest:function(vt){D||(vt?ue(i.STENCIL_TEST):qe(i.STENCIL_TEST))},setMask:function(vt){de!==vt&&!D&&(i.stencilMask(vt),de=vt)},setFunc:function(vt,bn,Sn){(se!==vt||ye!==bn||Ae!==Sn)&&(i.stencilFunc(vt,bn,Sn),se=vt,ye=bn,Ae=Sn)},setOp:function(vt,bn,Sn){(he!==vt||Ue!==bn||Pe!==Sn)&&(i.stencilOp(vt,bn,Sn),he=vt,Ue=bn,Pe=Sn)},setLocked:function(vt){D=vt},setClear:function(vt){Dt!==vt&&(i.clearStencil(vt),Dt=vt)},reset:function(){D=!1,de=null,se=null,ye=null,Ae=null,he=null,Ue=null,Pe=null,Dt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,d={},f={},u={},g=new WeakMap,v=[],S=null,m=!1,p=null,I=null,L=null,E=null,R=null,A=null,P=null,y=new at(0,0,0),C=0,U=!1,F=null,W=null,ee=null,te=null,X=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,ne=0,oe=i.getParameter(i.VERSION);oe.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(oe)[1]),Z=ne>=1):oe.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),Z=ne>=2);let Q=null,_e={},Re=i.getParameter(i.SCISSOR_BOX),Je=i.getParameter(i.VIEWPORT),ot=new wt().fromArray(Re),ke=new wt().fromArray(Je);function re(D,de,se,ye){let Ae=new Uint8Array(4),he=i.createTexture();i.bindTexture(D,he),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<se;Ue++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,Ae):i.texImage2D(de+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ae);return he}let ge={};ge[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(i.DEPTH_TEST),a.setFunc(vs),It(!1),mt(Wc),ue(i.CULL_FACE),st(di);function ue(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function qe(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Ye(D,de){return u[D]!==de?(i.bindFramebuffer(D,de),u[D]=de,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=de),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=de),!0):!1}function Oe(D,de){let se=v,ye=!1;if(D){se=g.get(de),se===void 0&&(se=[],g.set(de,se));let Ae=D.textures;if(se.length!==Ae.length||se[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Ue=Ae.length;he<Ue;he++)se[he]=i.COLOR_ATTACHMENT0+he;se.length=Ae.length,ye=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,ye=!0);ye&&i.drawBuffers(se)}function lt(D){return S!==D?(i.useProgram(D),S=D,!0):!1}let Qe={[qi]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};Qe[pd]=i.MIN,Qe[md]=i.MAX;let dt={[gd]:i.ZERO,[_d]:i.ONE,[xd]:i.SRC_COLOR,[so]:i.SRC_ALPHA,[Ed]:i.SRC_ALPHA_SATURATE,[bd]:i.DST_COLOR,[vd]:i.DST_ALPHA,[yd]:i.ONE_MINUS_SRC_COLOR,[ro]:i.ONE_MINUS_SRC_ALPHA,[Sd]:i.ONE_MINUS_DST_COLOR,[Md]:i.ONE_MINUS_DST_ALPHA,[wd]:i.CONSTANT_COLOR,[Td]:i.ONE_MINUS_CONSTANT_COLOR,[Ad]:i.CONSTANT_ALPHA,[Cd]:i.ONE_MINUS_CONSTANT_ALPHA};function st(D,de,se,ye,Ae,he,Ue,Pe,Dt,vt){if(D===di){m===!0&&(qe(i.BLEND),m=!1);return}if(m===!1&&(ue(i.BLEND),m=!0),D!==ud){if(D!==p||vt!==U){if((I!==qi||R!==qi)&&(i.blendEquation(i.FUNC_ADD),I=qi,R=qi),vt)switch(D){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xc:i.blendFunc(i.ONE,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",D);break}else switch(D){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case qc:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yc:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",D);break}L=null,E=null,A=null,P=null,y.set(0,0,0),C=0,p=D,U=vt}return}Ae=Ae||de,he=he||se,Ue=Ue||ye,(de!==I||Ae!==R)&&(i.blendEquationSeparate(Qe[de],Qe[Ae]),I=de,R=Ae),(se!==L||ye!==E||he!==A||Ue!==P)&&(i.blendFuncSeparate(dt[se],dt[ye],dt[he],dt[Ue]),L=se,E=ye,A=he,P=Ue),(Pe.equals(y)===!1||Dt!==C)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Dt),y.copy(Pe),C=Dt),p=D,U=!1}function tt(D,de){D.side===Hn?qe(i.CULL_FACE):ue(i.CULL_FACE);let se=D.side===fn;de&&(se=!se),It(se),D.blending===ys&&D.transparent===!1?st(di):st(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ye=D.stencilWrite;o.setTest(ye),ye&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):qe(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(D){F!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),F=D)}function mt(D){D!==ld?(ue(i.CULL_FACE),D!==W&&(D===Wc?i.cullFace(i.BACK):D===cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):qe(i.CULL_FACE),W=D}function At(D){D!==ee&&(Z&&i.lineWidth(D),ee=D)}function Lt(D,de,se){D?(ue(i.POLYGON_OFFSET_FILL),(te!==de||X!==se)&&(te=de,X=se,a.getReversed()&&(de=-de),i.polygonOffset(de,se))):qe(i.POLYGON_OFFSET_FILL)}function ft(D){D?ue(i.SCISSOR_TEST):qe(i.SCISSOR_TEST)}function Ct(D){D===void 0&&(D=i.TEXTURE0+J-1),Q!==D&&(i.activeTexture(D),Q=D)}function z(D,de,se){se===void 0&&(Q===null?se=i.TEXTURE0+J-1:se=Q);let ye=_e[se];ye===void 0&&(ye={type:void 0,texture:void 0},_e[se]=ye),(ye.type!==D||ye.texture!==de)&&(Q!==se&&(i.activeTexture(se),Q=se),i.bindTexture(D,de||ge[D]),ye.type=D,ye.texture=de)}function Ht(){let D=_e[Q];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function rt(){try{i.compressedTexImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function _(){try{i.texSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function k(){try{i.texSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function j(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function fe(){try{i.texStorage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function xe(){try{i.texStorage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function K(){try{i.texImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function ie(){try{i.texImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function pe(D){return f[D]!==void 0?f[D]:i.getParameter(D)}function Ne(D,de){f[D]!==de&&(i.pixelStorei(D,de),f[D]=de)}function Ee(D){ot.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ot.copy(D))}function Te(D){ke.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),ke.copy(D))}function Be(D,de){let se=c.get(de);se===void 0&&(se=new WeakMap,c.set(de,se));let ye=se.get(D);ye===void 0&&(ye=i.getUniformBlockIndex(de,D.name),se.set(D,ye))}function Ve(D,de){let ye=c.get(de).get(D);l.get(de)!==ye&&(i.uniformBlockBinding(de,ye,D.__bindingPointIndex),l.set(de,ye))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},f={},Q=null,_e={},u={},g=new WeakMap,v=[],S=null,m=!1,p=null,I=null,L=null,E=null,R=null,A=null,P=null,y=new at(0,0,0),C=0,U=!1,F=null,W=null,ee=null,te=null,X=null,ot.set(0,0,i.canvas.width,i.canvas.height),ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ue,disable:qe,bindFramebuffer:Ye,drawBuffers:Oe,useProgram:lt,setBlending:st,setMaterial:tt,setFlipSided:It,setCullFace:mt,setLineWidth:At,setPolygonOffset:Lt,setScissorTest:ft,activeTexture:Ct,bindTexture:z,unbindTexture:Ht,compressedTexImage2D:rt,compressedTexImage3D:w,texImage2D:K,texImage3D:ie,pixelStorei:Ne,getParameter:pe,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:fe,texStorage3D:xe,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:q,compressedTexSubImage3D:j,scissor:Ee,viewport:Te,reset:$e}}function my(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,d=new WeakMap,f=new Set,u,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(w,_){return v?new OffscreenCanvas(w,_):Wr("canvas")}function m(w,_,k){let q=1,j=rt(w);if((j.width>k||j.height>k)&&(q=k/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let fe=Math.floor(q*j.width),xe=Math.floor(q*j.height);u===void 0&&(u=S(fe,xe));let K=_?S(fe,xe):u;return K.width=fe,K.height=xe,K.getContext("2d").drawImage(w,0,0,fe,xe),Ge("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+fe+"x"+xe+")."),K}else return"data"in w&&Ge("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function p(w){return w.generateMipmaps}function I(w){i.generateMipmap(w)}function L(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,k,q,j,fe=!1){if(w!==null){if(i[w]!==void 0)return i[w];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let xe;q&&(xe=e.get("EXT_texture_norm16"),xe||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8),k===i.UNSIGNED_SHORT&&xe&&(K=xe.R16_EXT),k===i.SHORT&&xe&&(K=xe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),_===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8),k===i.UNSIGNED_SHORT&&xe&&(K=xe.RG16_EXT),k===i.SHORT&&xe&&(K=xe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_SHORT&&xe&&(K=xe.RGB16_EXT),k===i.SHORT&&xe&&(K=xe.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),_===i.RGBA){let ie=fe?Gr:ut.getTransfer(j);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=ie===yt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&xe&&(K=xe.RGBA16_EXT),k===i.SHORT&&xe&&(K=xe.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function R(w,_){let k;return w?_===null||_===ai||_===pr?k=i.DEPTH24_STENCIL8:_===oi?k=i.DEPTH32F_STENCIL8:_===fr&&(k=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===pr?k=i.DEPTH_COMPONENT24:_===oi?k=i.DEPTH_COMPONENT32F:_===fr&&(k=i.DEPTH_COMPONENT16),k}function A(w,_){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Xt&&w.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function P(w){let _=w.target;_.removeEventListener("dispose",P),C(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function y(w){let _=w.target;_.removeEventListener("dispose",y),F(_)}function C(w){let _=n.get(w);if(_.__webglInit===void 0)return;let k=w.source,q=g.get(k);if(q){let j=q[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&U(w),Object.keys(q).length===0&&g.delete(k)}n.remove(w)}function U(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let k=w.source,q=g.get(k);delete q[_.__cacheKey],a.memory.textures--}function F(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let j=0;j<_.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(_.__webglFramebuffer[q][j]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let k=w.textures;for(let q=0,j=k.length;q<j;q++){let fe=n.get(k[q]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(k[q])}n.remove(w)}let W=0;function ee(){W=0}function te(){return W}function X(w){W=w}function J(){let w=W;return w>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),W+=1,w}function Z(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function ne(w,_){let k=n.get(w);if(w.isVideoTexture&&z(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){let q=w.image;if(q===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{qe(k,w,_);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function oe(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){qe(k,w,_);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function Q(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){qe(k,w,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function _e(w,_){let k=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&k.__version!==w.version){Ye(k,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}let Re={[po]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},Je={[Xt]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[ca]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[Wo]:i.LINEAR_MIPMAP_NEAREST,[ns]:i.LINEAR_MIPMAP_LINEAR},ot={[Nd]:i.NEVER,[zd]:i.ALWAYS,[Ud]:i.LESS,[Al]:i.LEQUAL,[Fd]:i.EQUAL,[Cl]:i.GEQUAL,[Od]:i.GREATER,[Bd]:i.NOTEQUAL};function ke(w,_){if(_.type===oi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===Wo||_.magFilter===ca||_.magFilter===ns||_.minFilter===Zt||_.minFilter===Wo||_.minFilter===ca||_.minFilter===ns)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Re[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Re[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Re[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Je[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Je[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ot[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xt||_.minFilter!==ca&&_.minFilter!==ns||_.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function re(w,_){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",P));let q=_.source,j=g.get(q);j===void 0&&(j={},g.set(q,j));let fe=Z(_);if(fe!==w.__cacheKey){j[fe]===void 0&&(j[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),j[fe].usedTimes++;let xe=j[w.__cacheKey];xe!==void 0&&(j[w.__cacheKey].usedTimes--,xe.usedTimes===0&&U(_)),w.__cacheKey=fe,w.__webglTexture=j[fe].texture}return k}function ge(w,_,k){return Math.floor(Math.floor(w/k)/_)}function ue(w,_,k,q){let fe=w.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,q,_.data);else{fe.sort((Ne,Ee)=>Ne.start-Ee.start);let xe=0;for(let Ne=1;Ne<fe.length;Ne++){let Ee=fe[xe],Te=fe[Ne],Be=Ee.start+Ee.count,Ve=ge(Te.start,_.width,4),$e=ge(Ee.start,_.width,4);Te.start<=Be+1&&Ve===$e&&ge(Te.start+Te.count-1,_.width,4)===Ve?Ee.count=Math.max(Ee.count,Te.start+Te.count-Ee.start):(++xe,fe[xe]=Te)}fe.length=xe+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ne=0,Ee=fe.length;Ne<Ee;Ne++){let Te=fe[Ne],Be=Math.floor(Te.start/4),Ve=Math.ceil(Te.count/4),$e=Be%_.width,D=Math.floor(Be/_.width),de=Ve,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,$e,D,de,se,k,q,_.data)}w.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function qe(w,_,k){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);let j=re(w,_),fe=_.source;t.bindTexture(q,w.__webglTexture,i.TEXTURE0+k);let xe=n.get(fe);if(fe.version!==xe.__version||j===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let se=ut.getPrimaries(ut.workingColorSpace),ye=_.colorSpace===Ni?null:ut.getPrimaries(_.colorSpace),Ae=_.colorSpace===Ni||se===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let ie=m(_.image,!1,s.maxTextureSize);ie=Ht(_,ie);let pe=r.convert(_.format,_.colorSpace),Ne=r.convert(_.type),Ee=E(_.internalFormat,pe,Ne,_.normalized,_.colorSpace,_.isVideoTexture);ke(q,_);let Te,Be=_.mipmaps,Ve=_.isVideoTexture!==!0,$e=xe.__version===void 0||j===!0,D=fe.dataReady,de=A(_,ie);if(_.isDepthTexture)Ee=R(_.format===is,_.type),$e&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Ee,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,pe,Ne,null));else if(_.isDataTexture)if(Be.length>0){Ve&&$e&&t.texStorage2D(i.TEXTURE_2D,de,Ee,Be[0].width,Be[0].height);for(let se=0,ye=Be.length;se<ye;se++)Te=Be[se],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Te.width,Te.height,pe,Ne,Te.data):t.texImage2D(i.TEXTURE_2D,se,Ee,Te.width,Te.height,0,pe,Ne,Te.data);_.generateMipmaps=!1}else Ve?($e&&t.texStorage2D(i.TEXTURE_2D,de,Ee,ie.width,ie.height),D&&ue(_,ie,pe,Ne)):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,pe,Ne,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ve&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Ee,Be[0].width,Be[0].height,ie.depth);for(let se=0,ye=Be.length;se<ye;se++)if(Te=Be[se],_.format!==Wn)if(pe!==null)if(Ve){if(D)if(_.layerUpdates.size>0){let Ae=gh(Te.width,Te.height,_.format,_.type);for(let he of _.layerUpdates){let Ue=Te.data.subarray(he*Ae/Te.data.BYTES_PER_ELEMENT,(he+1)*Ae/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,he,Te.width,Te.height,1,pe,Ue)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,ie.depth,pe,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Ee,Te.width,Te.height,ie.depth,0,Te.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,ie.depth,pe,Ne,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Ee,Te.width,Te.height,ie.depth,0,pe,Ne,Te.data)}else{Ve&&$e&&t.texStorage2D(i.TEXTURE_2D,de,Ee,Be[0].width,Be[0].height);for(let se=0,ye=Be.length;se<ye;se++)Te=Be[se],_.format!==Wn?pe!==null?Ve?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,Te.width,Te.height,pe,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Ee,Te.width,Te.height,0,Te.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Te.width,Te.height,pe,Ne,Te.data):t.texImage2D(i.TEXTURE_2D,se,Ee,Te.width,Te.height,0,pe,Ne,Te.data)}else if(_.isDataArrayTexture)if(Ve){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Ee,ie.width,ie.height,ie.depth),D)if(_.layerUpdates.size>0){let se=gh(ie.width,ie.height,_.format,_.type);for(let ye of _.layerUpdates){let Ae=ie.data.subarray(ye*se/ie.data.BYTES_PER_ELEMENT,(ye+1)*se/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ye,ie.width,ie.height,1,pe,Ne,Ae)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ne,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,ie.width,ie.height,ie.depth,0,pe,Ne,ie.data);else if(_.isData3DTexture)Ve?($e&&t.texStorage3D(i.TEXTURE_3D,de,Ee,ie.width,ie.height,ie.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ne,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,ie.width,ie.height,ie.depth,0,pe,Ne,ie.data);else if(_.isFramebufferTexture){if($e)if(Ve)t.texStorage2D(i.TEXTURE_2D,de,Ee,ie.width,ie.height);else{let se=ie.width,ye=ie.height;for(let Ae=0;Ae<de;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,Ee,se,ye,0,pe,Ne,null),se>>=1,ye>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),ie.parentNode!==se){se.appendChild(ie),f.add(_),se.onpaint=ye=>{let Ae=ye.changedElements;for(let he of f)Ae.includes(he.image)&&(he.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{let Ae=i.RGBA,he=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ae,he,Ue,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Ve&&$e){let se=rt(Be[0]);t.texStorage2D(i.TEXTURE_2D,de,Ee,se.width,se.height)}for(let se=0,ye=Be.length;se<ye;se++)Te=Be[se],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,pe,Ne,Te):t.texImage2D(i.TEXTURE_2D,se,Ee,pe,Ne,Te);_.generateMipmaps=!1}else if(Ve){if($e){let se=rt(ie);t.texStorage2D(i.TEXTURE_2D,de,Ee,se.width,se.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ne,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ee,pe,Ne,ie);p(_)&&I(q),xe.__version=fe.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ye(w,_,k){if(_.image.length!==6)return;let q=re(w,_),j=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);let fe=n.get(j);if(j.version!==fe.__version||q===!0){t.activeTexture(i.TEXTURE0+k);let xe=ut.getPrimaries(ut.workingColorSpace),K=_.colorSpace===Ni?null:ut.getPrimaries(_.colorSpace),ie=_.colorSpace===Ni||xe===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let pe=_.isCompressedTexture||_.image[0].isCompressedTexture,Ne=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let he=0;he<6;he++)!pe&&!Ne?Ee[he]=m(_.image[he],!0,s.maxCubemapSize):Ee[he]=Ne?_.image[he].image:_.image[he],Ee[he]=Ht(_,Ee[he]);let Te=Ee[0],Be=r.convert(_.format,_.colorSpace),Ve=r.convert(_.type),$e=E(_.internalFormat,Be,Ve,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,de=fe.__version===void 0||q===!0,se=j.dataReady,ye=A(_,Te);ke(i.TEXTURE_CUBE_MAP,_);let Ae;if(pe){D&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,$e,Te.width,Te.height);for(let he=0;he<6;he++){Ae=Ee[he].mipmaps;for(let Ue=0;Ue<Ae.length;Ue++){let Pe=Ae[Ue];_.format!==Wn?Be!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,0,0,Pe.width,Pe.height,Be,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,$e,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,0,0,Pe.width,Pe.height,Be,Ve,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,$e,Pe.width,Pe.height,0,Be,Ve,Pe.data)}}}else{if(Ae=_.mipmaps,D&&de){Ae.length>0&&ye++;let he=rt(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,$e,he.width,he.height)}for(let he=0;he<6;he++)if(Ne){D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ee[he].width,Ee[he].height,Be,Ve,Ee[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Ee[he].width,Ee[he].height,0,Be,Ve,Ee[he].data);for(let Ue=0;Ue<Ae.length;Ue++){let Dt=Ae[Ue].image[he].image;D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,0,0,Dt.width,Dt.height,Be,Ve,Dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,$e,Dt.width,Dt.height,0,Be,Ve,Dt.data)}}else{D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Be,Ve,Ee[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Be,Ve,Ee[he]);for(let Ue=0;Ue<Ae.length;Ue++){let Pe=Ae[Ue];D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,0,0,Be,Ve,Pe.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,$e,Be,Ve,Pe.image[he])}}}p(_)&&I(i.TEXTURE_CUBE_MAP),fe.__version=j.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Oe(w,_,k,q,j,fe){let xe=r.convert(k.format,k.colorSpace),K=r.convert(k.type),ie=E(k.internalFormat,xe,K,k.normalized,k.colorSpace),pe=n.get(_),Ne=n.get(k);if(Ne.__renderTarget=_,!pe.__hasExternalTextures){let Ee=Math.max(1,_.width>>fe),Te=Math.max(1,_.height>>fe);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,fe,ie,Ee,Te,_.depth,0,xe,K,null):t.texImage2D(j,fe,ie,Ee,Te,0,xe,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,Ne.__webglTexture,0,ft(_)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,Ne.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(w,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let q=_.depthTexture,j=q&&q.isDepthTexture?q.type:null,fe=R(_.stencilBuffer,j),xe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ct(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft(_),fe,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft(_),fe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,fe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xe,i.RENDERBUFFER,w)}else{let q=_.textures;for(let j=0;j<q.length;j++){let fe=q[j],xe=r.convert(fe.format,fe.colorSpace),K=r.convert(fe.type),ie=E(fe.internalFormat,xe,K,fe.normalized,fe.colorSpace);Ct(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft(_),ie,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft(_),ie,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ie,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Qe(w,_,k){let q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_.depthTexture);let pe=r.convert(_.depthTexture.format),Ne=r.convert(_.depthTexture.type),Ee;_.depthTexture.format===ui?Ee=i.DEPTH_COMPONENT24:_.depthTexture.format===is&&(Ee=i.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ee,_.width,_.height,0,pe,Ne,null)}}else ne(_.depthTexture,0);let fe=j.__webglTexture,xe=ft(_),K=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ie=_.depthTexture.format===is?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===ui)Ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,K,fe,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,ie,K,fe,0);else if(_.depthTexture.format===is)Ct(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,K,fe,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,ie,K,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function dt(w){let _=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let q=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){let j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=q}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let q=0;q<6;q++)Qe(_.__webglFramebuffer[q],w,q);else{let q=w.texture.mipmaps;q&&q.length>0?Qe(_.__webglFramebuffer[0],w,0):Qe(_.__webglFramebuffer,w,0)}else if(k){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),lt(_.__webglDepthbuffer[q],w,!1);else{let j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,fe)}}else{let q=w.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),lt(_.__webglDepthbuffer,w,!1);else{let j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function st(w,_,k){let q=n.get(w);_!==void 0&&Oe(q.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&dt(w)}function tt(w){let _=w.texture,k=n.get(w),q=n.get(_);w.addEventListener("dispose",y);let j=w.textures,fe=w.isWebGLCubeRenderTarget===!0,xe=j.length>1;if(xe||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),fe){k.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[K]=[];for(let ie=0;ie<_.mipmaps.length;ie++)k.__webglFramebuffer[K][ie]=i.createFramebuffer()}else k.__webglFramebuffer[K]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)k.__webglFramebuffer[K]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(xe)for(let K=0,ie=j.length;K<ie;K++){let pe=n.get(j[K]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Ct(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let K=0;K<j.length;K++){let ie=j[K];k.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[K]);let pe=r.convert(ie.format,ie.colorSpace),Ne=r.convert(ie.type),Ee=E(ie.internalFormat,pe,Ne,ie.normalized,ie.colorSpace,w.isXRRenderTarget===!0),Te=ft(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,Ee,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,k.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let ie=0;ie<_.mipmaps.length;ie++)Oe(k.__webglFramebuffer[K][ie],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ie);else Oe(k.__webglFramebuffer[K],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(_)&&I(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let K=0,ie=j.length;K<ie;K++){let pe=j[K],Ne=n.get(pe),Ee=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Ee=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Ne.__webglTexture),ke(Ee,pe),Oe(k.__webglFramebuffer,w,pe,i.COLOR_ATTACHMENT0+K,Ee,0),p(pe)&&I(Ee)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(K=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,q.__webglTexture),ke(K,_),_.mipmaps&&_.mipmaps.length>0)for(let ie=0;ie<_.mipmaps.length;ie++)Oe(k.__webglFramebuffer[ie],w,_,i.COLOR_ATTACHMENT0,K,ie);else Oe(k.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,K,0);p(_)&&I(K),t.unbindTexture()}w.depthBuffer&&dt(w)}function It(w){let _=w.textures;for(let k=0,q=_.length;k<q;k++){let j=_[k];if(p(j)){let fe=L(w),xe=n.get(j).__webglTexture;t.bindTexture(fe,xe),I(fe),t.unbindTexture()}}}let mt=[],At=[];function Lt(w){if(w.samples>0){if(Ct(w)===!1){let _=w.textures,k=w.width,q=w.height,j=i.COLOR_BUFFER_BIT,fe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=n.get(w),K=_.length>1;if(K)for(let pe=0;pe<_.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);let ie=w.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let pe=0;pe<_.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let Ne=n.get(_[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,j,i.NEAREST),l===!0&&(mt.length=0,At.length=0,mt.push(i.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(mt.push(fe),At.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,At)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let pe=0;pe<_.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let Ne=n.get(_[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ft(w){return Math.min(s.maxSamples,w.samples)}function Ct(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(w){let _=a.render.frame;d.get(w)!==_&&(d.set(w,_),w.update())}function Ht(w,_){let k=w.colorSpace,q=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Vr&&k!==Ni&&(ut.getTransfer(k)===yt?(q!==Wn||j!==Nn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",k)),_}function rt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=X,this.setTexture2D=ne,this.setTexture2DArray=oe,this.setTexture3D=Q,this.setTextureCube=_e,this.rebindTextures=st,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function gy(i,e){function t(n,s=Ni){let r,a=ut.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ah)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ih)return i.BYTE;if(n===sh)return i.SHORT;if(n===fr)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===fi)return i.HALF_FLOAT;if(n===oh)return i.ALPHA;if(n===lh)return i.RGB;if(n===Wn)return i.RGBA;if(n===ui)return i.DEPTH_COMPONENT;if(n===is)return i.DEPTH_STENCIL;if(n===ch)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===ss)return i.RG;if(n===Zo)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===ha||n===ua||n===da||n===fa)if(a===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===jo||n===Qo||n===el)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===nl||n===il||n===sl||n===rl||n===pa||n===al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tl||n===nl)return a===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===il)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===sl)return r.COMPRESSED_R11_EAC;if(n===rl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===pa)return r.COMPRESSED_RG11_EAC;if(n===al)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ll)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ul)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ml)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_l)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===bl||n===Sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ml)return a===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===wl||n===ma||n===Tl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var _y=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xy=`
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

}`,Uh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:_y,fragmentShader:xy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fh=class extends ii{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,f=null,u=null,g=null,v=null,S=typeof XRWebGLBinding<"u",m=new Uh,p={},I=t.getContextAttributes(),L=null,E=null,R=[],A=[],P=new ze,y=null,C=new $t;C.viewport=new wt;let U=new $t;U.viewport=new wt;let F=[C,U],W=new ko,ee=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ge=R[re];return ge===void 0&&(ge=new or,R[re]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(re){let ge=R[re];return ge===void 0&&(ge=new or,R[re]=ge),ge.getGripSpace()},this.getHand=function(re){let ge=R[re];return ge===void 0&&(ge=new or,R[re]=ge),ge.getHandSpace()};function X(re){let ge=A.indexOf(re.inputSource);if(ge===-1)return;let ue=R[ge];ue!==void 0&&(ue.update(re.inputSource,re.frame,c||a),ue.dispatchEvent({type:re.type,data:re.inputSource}))}function J(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",Z);for(let re=0;re<R.length;re++){let ge=A[re];ge!==null&&(A[re]=null,R[re].disconnect(ge))}ee=null,te=null,m.reset();for(let re in p)delete p[re];e.setRenderTarget(L),g=null,u=null,f=null,s=null,E=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(L=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",J),s.addEventListener("inputsourceschange",Z),I.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,qe=null,Ye=null;I.depth&&(Ye=I.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=I.stencil?is:ui,qe=I.stencil?pr:ai);let Oe={colorFormat:t.RGBA8,depthFormat:Ye,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Oe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new Pn(u.textureWidth,u.textureHeight,{format:Wn,type:Nn,depthTexture:new Di(u.textureWidth,u.textureHeight,qe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ue={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new Pn(g.framebufferWidth,g.framebufferHeight,{format:Wn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ke.setContext(s),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(re){for(let ge=0;ge<re.removed.length;ge++){let ue=re.removed[ge],qe=A.indexOf(ue);qe>=0&&(A[qe]=null,R[qe].disconnect(ue))}for(let ge=0;ge<re.added.length;ge++){let ue=re.added[ge],qe=A.indexOf(ue);if(qe===-1){for(let Oe=0;Oe<R.length;Oe++)if(Oe>=A.length){A.push(ue),qe=Oe;break}else if(A[Oe]===null){A[Oe]=ue,qe=Oe;break}if(qe===-1)break}let Ye=R[qe];Ye&&Ye.connect(ue)}}let ne=new N,oe=new N;function Q(re,ge,ue){ne.setFromMatrixPosition(ge.matrixWorld),oe.setFromMatrixPosition(ue.matrixWorld);let qe=ne.distanceTo(oe),Ye=ge.projectionMatrix.elements,Oe=ue.projectionMatrix.elements,lt=Ye[14]/(Ye[10]-1),Qe=Ye[14]/(Ye[10]+1),dt=(Ye[9]+1)/Ye[5],st=(Ye[9]-1)/Ye[5],tt=(Ye[8]-1)/Ye[0],It=(Oe[8]+1)/Oe[0],mt=lt*tt,At=lt*It,Lt=qe/(-tt+It),ft=Lt*-tt;if(ge.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(ft),re.translateZ(Lt),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Ye[10]===-1)re.projectionMatrix.copy(ge.projectionMatrix),re.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let Ct=lt+Lt,z=Qe+Lt,Ht=mt-ft,rt=At+(qe-ft),w=dt*Qe/z*Ct,_=st*Qe/z*Ct;re.projectionMatrix.makePerspective(Ht,rt,w,_,Ct,z),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function _e(re,ge){ge===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ge.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let ge=re.near,ue=re.far;m.texture!==null&&(m.depthNear>0&&(ge=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),W.near=U.near=C.near=ge,W.far=U.far=C.far=ue,(ee!==W.near||te!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),ee=W.near,te=W.far),W.layers.mask=re.layers.mask|6,C.layers.mask=W.layers.mask&-5,U.layers.mask=W.layers.mask&-3;let qe=re.parent,Ye=W.cameras;_e(W,qe);for(let Oe=0;Oe<Ye.length;Oe++)_e(Ye[Oe],qe);Ye.length===2?Q(W,C,U):W.projectionMatrix.copy(C.projectionMatrix),Re(re,W,qe)};function Re(re,ge,ue){ue===null?re.matrix.copy(ge.matrixWorld):(re.matrix.copy(ue.matrixWorld),re.matrix.invert(),re.matrix.multiply(ge.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(ge.projectionMatrix),re.projectionMatrixInverse.copy(ge.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=sr*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&g===null))return l},this.setFoveation=function(re){l=re,u!==null&&(u.fixedFoveation=re),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(re){return p[re]};let Je=null;function ot(re,ge){if(d=ge.getViewerPose(c||a),v=ge,d!==null){let ue=d.views;g!==null&&(e.setRenderTargetFramebuffer(E,g.framebuffer),e.setRenderTarget(E));let qe=!1;ue.length!==W.cameras.length&&(W.cameras.length=0,qe=!0);for(let Qe=0;Qe<ue.length;Qe++){let dt=ue[Qe],st=null;if(g!==null)st=g.getViewport(dt);else{let It=f.getViewSubImage(u,dt);st=It.viewport,Qe===0&&(e.setRenderTargetTextures(E,It.colorTexture,It.depthStencilTexture),e.setRenderTarget(E))}let tt=F[Qe];tt===void 0&&(tt=new $t,tt.layers.enable(Qe),tt.viewport=new wt,F[Qe]=tt),tt.matrix.fromArray(dt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(dt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(st.x,st.y,st.width,st.height),Qe===0&&(W.matrix.copy(tt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),qe===!0&&W.cameras.push(tt)}let Ye=s.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=n.getBinding();let Qe=f.getDepthInformation(ue[0]);Qe&&Qe.isValid&&Qe.texture&&m.init(Qe,s.renderState)}if(Ye&&Ye.includes("camera-access")&&S){e.state.unbindTexture(),f=n.getBinding();for(let Qe=0;Qe<ue.length;Qe++){let dt=ue[Qe].camera;if(dt){let st=p[dt];st||(st=new Qr,p[dt]=st);let tt=f.getCameraImage(dt);st.sourceTexture=tt}}}}for(let ue=0;ue<R.length;ue++){let qe=A[ue],Ye=R[ue];qe!==null&&Ye!==void 0&&Ye.update(qe,ge,c||a)}Je&&Je(re,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),v=null}let ke=new gf;ke.setAnimationLoop(ot),this.setAnimationLoop=function(re){Je=re},this.dispose=function(){}}},yy=new Pt,bf=new je;bf.set(-1,0,0,0,1,0,0,0,1);function vy(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,I,L,E){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&g(m,p,E)):p.isMeshMatcapMaterial?(r(m,p),v(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,I,L):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===fn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===fn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let I=e.get(p),L=I.envMap,E=I.envMapRotation;L&&(m.envMap.value=L,m.envMapRotation.value.setFromMatrix4(yy.makeRotationFromEuler(E)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(bf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,I,L){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*I,m.scale.value=L*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function g(m,p,I){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=I.texture,m.transmissionSamplerSize.value.set(I.width,I.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){let I=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(I.matrixWorld),m.nearDistance.value=I.shadow.camera.near,m.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function My(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,R){let A=R.program;n.uniformBlockBinding(E,A)}function c(E,R){let A=s[E.id];A===void 0&&(m(E),A=d(E),s[E.id]=A,E.addEventListener("dispose",I));let P=R.program;n.updateUBOMapping(E,P);let y=e.render.frame;r[E.id]!==y&&(u(E),r[E.id]=y)}function d(E){let R=f();E.__bindingPointIndex=R;let A=i.createBuffer(),P=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,P,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,A),A}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){let R=s[E.id],A=E.uniforms,P=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let y=0,C=A.length;y<C;y++){let U=A[y];if(Array.isArray(U))for(let F=0,W=U.length;F<W;F++)g(U[F],y,F,P);else g(U,y,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(E,R,A,P){if(S(E,R,A,P)===!0){let y=E.__offset,C=E.value;if(Array.isArray(C)){let U=0;for(let F=0;F<C.length;F++){let W=C[F],ee=p(W);v(W,E.__data,U),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(U+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(C,E.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,E.__data)}}function v(E,R,A){typeof E=="number"||typeof E=="boolean"?R[0]=E:E.isMatrix3?(R[0]=E.elements[0],R[1]=E.elements[1],R[2]=E.elements[2],R[3]=0,R[4]=E.elements[3],R[5]=E.elements[4],R[6]=E.elements[5],R[7]=0,R[8]=E.elements[6],R[9]=E.elements[7],R[10]=E.elements[8],R[11]=0):ArrayBuffer.isView(E)?R.set(new E.constructor(E.buffer,E.byteOffset,R.length)):E.toArray(R,A)}function S(E,R,A,P){let y=E.value,C=R+"_"+A;if(P[C]===void 0)return typeof y=="number"||typeof y=="boolean"?P[C]=y:ArrayBuffer.isView(y)?P[C]=y.slice():P[C]=y.clone(),!0;{let U=P[C];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return P[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(U.equals(y)===!1)return U.copy(y),!0}}return!1}function m(E){let R=E.uniforms,A=0,P=16;for(let C=0,U=R.length;C<U;C++){let F=Array.isArray(R[C])?R[C]:[R[C]];for(let W=0,ee=F.length;W<ee;W++){let te=F[W],X=Array.isArray(te.value)?te.value:[te.value];for(let J=0,Z=X.length;J<Z;J++){let ne=X[J],oe=p(ne),Q=A%P,_e=Q%oe.boundary,Re=Q+_e;A+=_e,Re!==0&&P-Re<oe.storage&&(A+=P-Re),te.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=A,A+=oe.storage}}}let y=A%P;return y>0&&(A+=P-y),E.__size=A,E.__cache={},this}function p(E){let R={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(R.boundary=4,R.storage=4):E.isVector2?(R.boundary=8,R.storage=8):E.isVector3||E.isColor?(R.boundary=16,R.storage=12):E.isVector4?(R.boundary=16,R.storage=16):E.isMatrix3?(R.boundary=48,R.storage=48):E.isMatrix4?(R.boundary=64,R.storage=64):E.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(R.boundary=16,R.storage=E.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",E),R}function I(E){let R=E.target;R.removeEventListener("dispose",I);let A=a.indexOf(R.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function L(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:L}}var by=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pi=null;function Sy(){return pi===null&&(pi=new Mo(by,16,16,ss,fi),pi.name="DFG_LUT",pi.minFilter=Zt,pi.magFilter=Zt,pi.wrapS=hi,pi.wrapT=hi,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}var Dl=class{constructor(e={}){let{canvas:t=kd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:g=Nn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let S=g,m=new Set([Jo,Zo,$o]),p=new Set([Nn,ai,fr,pr,qo,Yo]),I=new Uint32Array(4),L=new Int32Array(4),E=new N,R=null,A=null,P=[],y=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,F=!1,W=null,ee=null,te=null,X=null;this._outputColorSpace=Yt;let J=0,Z=0,ne=null,oe=-1,Q=null,_e=new wt,Re=new wt,Je=null,ot=new at(0),ke=0,re=t.width,ge=t.height,ue=1,qe=null,Ye=null,Oe=new wt(0,0,re,ge),lt=new wt(0,0,re,ge),Qe=!1,dt=new Jr,st=!1,tt=!1,It=new Pt,mt=new N,At=new wt,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function Ct(){return ne===null?ue:1}let z=n;function Ht(M,B){return t.getContext(M,B)}try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",vt,!1),t.addEventListener("webglcontextcreationerror",bn,!1),z===null){let B="webgl2";if(z=Ht(B,M),z===null)throw Ht(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Xe("WebGLRenderer: "+M.message),M}let rt,w,_,k,q,j,fe,xe,K,ie,pe,Ne,Ee,Te,Be,Ve,$e,D,de,se,ye,Ae,he;function Ue(){rt=new P0(z),rt.init(),ye=new gy(z,rt),w=new b0(z,rt,e,ye),_=new py(z,rt),w.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),ee=z.createFramebuffer(),te=z.createFramebuffer(),X=z.createFramebuffer(),k=new D0(z),q=new ey,j=new my(z,rt,_,q,w,ye,k),fe=new R0(U),xe=new Om(z),Ae=new v0(z,xe),K=new I0(z,xe,k,Ae),ie=new U0(z,K,xe,Ae,k),D=new N0(z,w,j),Be=new S0(q),pe=new Qx(U,fe,rt,w,Ae,Be),Ne=new vy(U,q),Ee=new ny,Te=new ly(rt),$e=new y0(U,fe,_,ie,v,l),Ve=new fy(U,ie,w),he=new My(z,k,w,_),de=new M0(z,rt,k),se=new L0(z,rt,k),k.programs=pe.programs,U.capabilities=w,U.extensions=rt,U.properties=q,U.renderLists=Ee,U.shadowMap=Ve,U.state=_,U.info=k}Ue(),S!==Nn&&(C=new O0(S,t.width,t.height,o,s,r));let Pe=new Fh(U,z);this.xr=Pe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let M=rt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=rt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(M){M!==void 0&&(ue=M,this.setSize(re,ge,!1))},this.getSize=function(M){return M.set(re,ge)},this.setSize=function(M,B,$=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}re=M,ge=B,t.width=Math.floor(M*ue),t.height=Math.floor(B*ue),$===!0&&(t.style.width=M+"px",t.style.height=B+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(re*ue,ge*ue).floor()},this.setDrawingBufferSize=function(M,B,$){re=M,ge=B,ue=$,t.width=Math.floor(M*$),t.height=Math.floor(B*$),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(S===Nn){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(_e)},this.getViewport=function(M){return M.copy(Oe)},this.setViewport=function(M,B,$,G){M.isVector4?Oe.set(M.x,M.y,M.z,M.w):Oe.set(M,B,$,G),_.viewport(_e.copy(Oe).multiplyScalar(ue).round())},this.getScissor=function(M){return M.copy(lt)},this.setScissor=function(M,B,$,G){M.isVector4?lt.set(M.x,M.y,M.z,M.w):lt.set(M,B,$,G),_.scissor(Re.copy(lt).multiplyScalar(ue).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(M){_.setScissorTest(Qe=M)},this.setOpaqueSort=function(M){qe=M},this.setTransparentSort=function(M){Ye=M},this.getClearColor=function(M){return M.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,$=!0){let G=0;if(M){let Y=!1;if(ne!==null){let Ce=ne.texture.format;Y=m.has(Ce)}if(Y){let Ce=ne.texture.type,ve=p.has(Ce),Se=$e.getClearColor(),Me=$e.getClearAlpha(),De=Se.r,He=Se.g,Ze=Se.b;ve?(I[0]=De,I[1]=He,I[2]=Ze,I[3]=Me,z.clearBufferuiv(z.COLOR,0,I)):(L[0]=De,L[1]=He,L[2]=Ze,L[3]=Me,z.clearBufferiv(z.COLOR,0,L))}else G|=z.COLOR_BUFFER_BIT}B&&(G|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&z.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),W=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",bn,!1),$e.dispose(),Ee.dispose(),Te.dispose(),q.dispose(),fe.dispose(),ie.dispose(),Ae.dispose(),he.dispose(),pe.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Ui),Pe.removeEventListener("sessionend",ln),qt.stop()};function Dt(M){M.preventDefault(),Xr("WebGLRenderer: Context Lost."),F=!0}function vt(){Xr("WebGLRenderer: Context Restored."),F=!1;let M=k.autoReset,B=Ve.enabled,$=Ve.autoUpdate,G=Ve.needsUpdate,Y=Ve.type;Ue(),k.autoReset=M,Ve.enabled=B,Ve.autoUpdate=$,Ve.needsUpdate=G,Ve.type=Y}function bn(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Sn(M){let B=M.target;B.removeEventListener("dispose",Sn),Xn(B)}function Xn(M){Ma(M),q.remove(M)}function Ma(M){let B=q.get(M).programs;B!==void 0&&(B.forEach(function($){pe.releaseProgram($)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,$,G,Y,Ce){B===null&&(B=Lt);let ve=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,Se=$n(M,B,$,G,Y);_.setMaterial(G,ve);let Me=$.index,De=1;if(G.wireframe===!0){if(Me=K.getWireframeAttribute($),Me===void 0)return;De=2}let He=$.drawRange,Ze=$.attributes.position,Fe=He.start*De,ct=(He.start+He.count)*De;Ce!==null&&(Fe=Math.max(Fe,Ce.start*De),ct=Math.min(ct,(Ce.start+Ce.count)*De)),Me!==null?(Fe=Math.max(Fe,0),ct=Math.min(ct,Me.count)):Ze!=null&&(Fe=Math.max(Fe,0),ct=Math.min(ct,Ze.count));let gt=ct-Fe;if(gt<0||gt===1/0)return;Ae.setup(Y,G,Se,$,Me);let Ke,pt=de;if(Me!==null&&(Ke=xe.get(Me),pt=se,pt.setIndex(Ke)),Y.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*Ct()),pt.setMode(z.LINES)):pt.setMode(z.TRIANGLES);else if(Y.isLine){let Ot=G.linewidth;Ot===void 0&&(Ot=1),_.setLineWidth(Ot*Ct()),Y.isLineSegments?pt.setMode(z.LINES):Y.isLineLoop?pt.setMode(z.LINE_LOOP):pt.setMode(z.LINE_STRIP)}else Y.isPoints?pt.setMode(z.POINTS):Y.isSprite&&pt.setMode(z.TRIANGLES);if(Y.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))pt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Ot=Y._multiDrawStarts,Ie=Y._multiDrawCounts,sn=Y._multiDrawCount,ht=Me?xe.get(Me).bytesPerElement:1,mn=q.get(G).currentProgram.getUniforms();for(let Ut=0;Ut<sn;Ut++)mn.setValue(z,"_gl_DrawID",Ut),pt.render(Ot[Ut]/ht,Ie[Ut])}else if(Y.isInstancedMesh)pt.renderInstances(Fe,gt,Y.count);else if($.isInstancedBufferGeometry){let Ot=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ie=Math.min($.instanceCount,Ot);pt.renderInstances(Fe,gt,Ie)}else pt.render(Fe,gt)};function vr(M,B,$){M.transparent===!0&&M.side===Hn&&M.forceSinglePass===!1?(M.side=fn,M.needsUpdate=!0,yi(M,B,$),M.side=Ii,M.needsUpdate=!0,yi(M,B,$),M.side=Hn):yi(M,B,$)}this.compile=function(M,B,$=null){$===null&&($=M),A=Te.get($),A.init(B),y.push(A),$.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),M!==$&&M.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),A.setupLights();let G=new Set;return M.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let Ce=Y.material;if(Ce)if(Array.isArray(Ce))for(let ve=0;ve<Ce.length;ve++){let Se=Ce[ve];vr(Se,$,Y),G.add(Se)}else vr(Ce,$,Y),G.add(Ce)}),A=y.pop(),G},this.compileAsync=function(M,B,$=null){let G=this.compile(M,B,$);return new Promise(Y=>{function Ce(){if(G.forEach(function(ve){q.get(ve).currentProgram.isReady()&&G.delete(ve)}),G.size===0){Y(M);return}setTimeout(Ce,10)}rt.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let xi=null;function nn(M){xi&&xi(M)}function Ui(){qt.stop()}function ln(){qt.start()}let qt=new gf;qt.setAnimationLoop(nn),typeof self<"u"&&qt.setContext(self),this.setAnimationLoop=function(M){xi=M,Pe.setAnimationLoop(M),M===null?qt.stop():qt.start()},Pe.addEventListener("sessionstart",Ui),Pe.addEventListener("sessionend",ln),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;W!==null&&W.renderStart(M,B);let $=Pe.enabled===!0&&Pe.isPresenting===!0,G=C!==null&&(ne===null||$)&&C.begin(U,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(B),B=Pe.getCamera()),M.isScene===!0&&M.onBeforeRender(U,M,B,ne),A=Te.get(M,y.length),A.init(B),A.state.textureUnits=j.getTextureUnits(),y.push(A),It.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),dt.setFromProjectionMatrix(It,ni,B.reversedDepth),tt=this.localClippingEnabled,st=Be.init(this.clippingPlanes,tt),R=Ee.get(M,P.length),R.init(),P.push(R),Pe.enabled===!0&&Pe.isPresenting===!0){let ve=U.xr.getDepthSensingMesh();ve!==null&&Un(ve,B,-1/0,U.sortObjects)}Un(M,B,0,U.sortObjects),R.finish(),U.sortObjects===!0&&R.sort(qe,Ye,B.reversedDepth),ft=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,ft&&$e.addToRenderList(R,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Be.beginShadows();let Y=A.state.shadowsArray;if(Ve.render(Y,M,B),st===!0&&Be.endShadows(),(G&&C.hasRenderPass())===!1){let ve=R.opaque,Se=R.transmissive;if(A.setupLights(),B.isArrayCamera){let Me=B.cameras;if(Se.length>0)for(let De=0,He=Me.length;De<He;De++){let Ze=Me[De];Mr(ve,Se,M,Ze)}ft&&$e.render(M);for(let De=0,He=Me.length;De<He;De++){let Ze=Me[De];qn(R,M,Ze,Ze.viewport)}}else Se.length>0&&Mr(ve,Se,M,B),ft&&$e.render(M),qn(R,M,B)}ne!==null&&Z===0&&(j.updateMultisampleRenderTarget(ne),j.updateRenderTargetMipmap(ne)),G&&C.end(U),M.isScene===!0&&M.onAfterRender(U,M,B),Ae.resetDefaultState(),oe=-1,Q=null,y.pop(),y.length>0?(A=y[y.length-1],j.setTextureUnits(A.state.textureUnits),st===!0&&Be.setGlobalState(U.clippingPlanes,A.state.camera)):A=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,W!==null&&W.renderEnd()};function Un(M,B,$,G){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||dt.intersectsSprite(M)){G&&At.setFromMatrixPosition(M.matrixWorld).applyMatrix4(It);let ve=ie.update(M),Se=M.material;Se.visible&&R.push(M,ve,Se,$,At.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||dt.intersectsObject(M))){let ve=ie.update(M),Se=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),At.copy(M.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),At.copy(ve.boundingSphere.center)),At.applyMatrix4(M.matrixWorld).applyMatrix4(It)),Array.isArray(Se)){let Me=ve.groups;for(let De=0,He=Me.length;De<He;De++){let Ze=Me[De],Fe=Se[Ze.materialIndex];Fe&&Fe.visible&&R.push(M,ve,Fe,$,At.z,Ze)}}else Se.visible&&R.push(M,ve,Se,$,At.z,null)}}let Ce=M.children;for(let ve=0,Se=Ce.length;ve<Se;ve++)Un(Ce[ve],B,$,G)}function qn(M,B,$,G){let{opaque:Y,transmissive:Ce,transparent:ve}=M;A.setupLightsView($),st===!0&&Be.setGlobalState(U.clippingPlanes,$),G&&_.viewport(_e.copy(G)),Y.length>0&&Fi(Y,B,$),Ce.length>0&&Fi(Ce,B,$),ve.length>0&&Fi(ve,B,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Mr(M,B,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[G.id]===void 0){let Fe=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[G.id]=new Pn(1,1,{generateMipmaps:!0,type:Fe?fi:Nn,minFilter:ns,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let Ce=A.state.transmissionRenderTarget[G.id],ve=G.viewport||_e;Ce.setSize(ve.z*U.transmissionResolutionScale,ve.w*U.transmissionResolutionScale);let Se=U.getRenderTarget(),Me=U.getActiveCubeFace(),De=U.getActiveMipmapLevel();U.setRenderTarget(Ce),U.getClearColor(ot),ke=U.getClearAlpha(),ke<1&&U.setClearColor(16777215,.5),U.clear(),ft&&$e.render($);let He=U.toneMapping;U.toneMapping=ri;let Ze=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),A.setupLightsView(G),st===!0&&Be.setGlobalState(U.clippingPlanes,G),Fi(M,$,G),j.updateMultisampleRenderTarget(Ce),j.updateRenderTargetMipmap(Ce),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let ct=0,gt=B.length;ct<gt;ct++){let Ke=B[ct],{object:pt,geometry:Ot,material:Ie,group:sn}=Ke;if(Ie.side===Hn&&pt.layers.test(G.layers)){let ht=Ie.side;Ie.side=fn,Ie.needsUpdate=!0,cs(pt,$,G,Ot,Ie,sn),Ie.side=ht,Ie.needsUpdate=!0,Fe=!0}}Fe===!0&&(j.updateMultisampleRenderTarget(Ce),j.updateRenderTargetMipmap(Ce))}U.setRenderTarget(Se,Me,De),U.setClearColor(ot,ke),Ze!==void 0&&(G.viewport=Ze),U.toneMapping=He}function Fi(M,B,$){let G=B.isScene===!0?B.overrideMaterial:null;for(let Y=0,Ce=M.length;Y<Ce;Y++){let ve=M[Y],{object:Se,geometry:Me,group:De}=ve,He=ve.material;He.allowOverride===!0&&G!==null&&(He=G),Se.layers.test($.layers)&&cs(Se,B,$,Me,He,De)}}function cs(M,B,$,G,Y,Ce){M.onBeforeRender(U,B,$,G,Y,Ce),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Y.onBeforeRender(U,B,$,G,M,Ce),Y.transparent===!0&&Y.side===Hn&&Y.forceSinglePass===!1?(Y.side=fn,Y.needsUpdate=!0,U.renderBufferDirect($,B,G,Y,M,Ce),Y.side=Ii,Y.needsUpdate=!0,U.renderBufferDirect($,B,G,Y,M,Ce),Y.side=Hn):U.renderBufferDirect($,B,G,Y,M,Ce),M.onAfterRender(U,B,$,G,Y,Ce)}function yi(M,B,$){B.isScene!==!0&&(B=Lt);let G=q.get(M),Y=A.state.lights,Ce=A.state.shadowsArray,ve=Y.state.version,Se=pe.getParameters(M,Y.state,Ce,B,$,A.state.lightProbeGridArray),Me=pe.getProgramCacheKey(Se),De=G.programs;G.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,G.fog=B.fog;let He=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;G.envMap=fe.get(M.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",Sn),De=new Map,G.programs=De);let Ze=De.get(Me);if(Ze!==void 0){if(G.currentProgram===Ze&&G.lightsStateVersion===ve)return On(M,Se),Ze}else Se.uniforms=pe.getUniforms(M),W!==null&&M.isNodeMaterial&&W.build(M,$,Se),M.onBeforeCompile(Se,U),Ze=pe.acquireProgram(Se,Me),De.set(Me,Ze),G.uniforms=Se.uniforms;let Fe=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Fe.clippingPlanes=Be.uniform),On(M,Se),G.needsLights=Zn(M),G.lightsStateVersion=ve,G.needsLights&&(Fe.ambientLightColor.value=Y.state.ambient,Fe.lightProbe.value=Y.state.probe,Fe.directionalLights.value=Y.state.directional,Fe.directionalLightShadows.value=Y.state.directionalShadow,Fe.spotLights.value=Y.state.spot,Fe.spotLightShadows.value=Y.state.spotShadow,Fe.rectAreaLights.value=Y.state.rectArea,Fe.ltc_1.value=Y.state.rectAreaLTC1,Fe.ltc_2.value=Y.state.rectAreaLTC2,Fe.pointLights.value=Y.state.point,Fe.pointLightShadows.value=Y.state.pointShadow,Fe.hemisphereLights.value=Y.state.hemi,Fe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Fe.spotLightMatrix.value=Y.state.spotLightMatrix,Fe.spotLightMap.value=Y.state.spotLightMap,Fe.pointShadowMatrix.value=Y.state.pointShadowMatrix),G.lightProbeGrid=A.state.lightProbeGridArray.length>0,G.currentProgram=Ze,G.uniformsList=null,Ze}function Fn(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=gr.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function On(M,B){let $=q.get(M);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function Yn(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(B.matrixWorld);for(let $=0,G=M.length;$<G;$++){let Y=M[$];if(Y.texture!==null&&Y.boundingBox.containsPoint(E))return Y}return null}function $n(M,B,$,G,Y){B.isScene!==!0&&(B=Lt),j.resetTextureUnits();let Ce=B.fog,ve=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?B.environment:null,Se=ne===null?U.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ut.workingColorSpace,Me=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,De=fe.get(G.envMap||ve,Me),He=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ze=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Fe=!!$.morphAttributes.position,ct=!!$.morphAttributes.normal,gt=!!$.morphAttributes.color,Ke=ri;G.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ke=U.toneMapping);let pt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ot=pt!==void 0?pt.length:0,Ie=q.get(G),sn=A.state.lights;if(st===!0&&(tt===!0||M!==Q)){let bt=M===Q&&G.id===oe;Be.setState(G,M,bt)}let ht=!1;G.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==sn.state.version||Ie.outputColorSpace!==Se||Y.isBatchedMesh&&Ie.batching===!1||!Y.isBatchedMesh&&Ie.batching===!0||Y.isBatchedMesh&&Ie.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ie.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ie.instancing===!1||!Y.isInstancedMesh&&Ie.instancing===!0||Y.isSkinnedMesh&&Ie.skinning===!1||!Y.isSkinnedMesh&&Ie.skinning===!0||Y.isInstancedMesh&&Ie.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ie.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ie.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ie.instancingMorph===!1&&Y.morphTexture!==null||Ie.envMap!==De||G.fog===!0&&Ie.fog!==Ce||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==Be.numPlanes||Ie.numIntersection!==Be.numIntersection)||Ie.vertexAlphas!==He||Ie.vertexTangents!==Ze||Ie.morphTargets!==Fe||Ie.morphNormals!==ct||Ie.morphColors!==gt||Ie.toneMapping!==Ke||Ie.morphTargetsCount!==Ot||!!Ie.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(ht=!0):(ht=!0,Ie.__version=G.version);let mn=Ie.currentProgram;ht===!0&&(mn=yi(G,B,Y),W&&G.isNodeMaterial&&W.onUpdateProgram(G,mn,Ie));let Ut=!1,En=!1,Oi=!1,_t=mn.getUniforms(),Mt=Ie.uniforms;if(_.useProgram(mn.program)&&(Ut=!0,En=!0,Oi=!0),G.id!==oe&&(oe=G.id,En=!0),Ie.needsLights){let bt=Yn(A.state.lightProbeGridArray,Y);Ie.lightProbeGrid!==bt&&(Ie.lightProbeGrid=bt,En=!0)}if(Ut||Q!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),_t.setValue(z,"projectionMatrix",M.projectionMatrix),_t.setValue(z,"viewMatrix",M.matrixWorldInverse);let gn=_t.map.cameraPosition;gn!==void 0&&gn.setValue(z,mt.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&_t.setValue(z,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_t.setValue(z,"isOrthographic",M.isOrthographicCamera===!0),Q!==M&&(Q=M,En=!0,Oi=!0)}if(Ie.needsLights&&(sn.state.directionalShadowMap.length>0&&_t.setValue(z,"directionalShadowMap",sn.state.directionalShadowMap,j),sn.state.spotShadowMap.length>0&&_t.setValue(z,"spotShadowMap",sn.state.spotShadowMap,j),sn.state.pointShadowMap.length>0&&_t.setValue(z,"pointShadowMap",sn.state.pointShadowMap,j)),Y.isSkinnedMesh){_t.setOptional(z,Y,"bindMatrix"),_t.setOptional(z,Y,"bindMatrixInverse");let bt=Y.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),_t.setValue(z,"boneTexture",bt.boneTexture,j))}Y.isBatchedMesh&&(_t.setOptional(z,Y,"batchingTexture"),_t.setValue(z,"batchingTexture",Y._matricesTexture,j),_t.setOptional(z,Y,"batchingIdTexture"),_t.setValue(z,"batchingIdTexture",Y._indirectTexture,j),_t.setOptional(z,Y,"batchingColorTexture"),Y._colorsTexture!==null&&_t.setValue(z,"batchingColorTexture",Y._colorsTexture,j));let wn=$.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&D.update(Y,$,mn),(En||Ie.receiveShadow!==Y.receiveShadow)&&(Ie.receiveShadow=Y.receiveShadow,_t.setValue(z,"receiveShadow",Y.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&B.environment!==null&&(Mt.envMapIntensity.value=B.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=Sy()),En){if(_t.setValue(z,"toneMappingExposure",U.toneMappingExposure),Ie.needsLights&&hs(Mt,Oi),Ce&&G.fog===!0&&Ne.refreshFogUniforms(Mt,Ce),Ne.refreshMaterialUniforms(Mt,G,ue,ge,A.state.transmissionRenderTarget[M.id]),Ie.needsLights&&Ie.lightProbeGrid){let bt=Ie.lightProbeGrid;Mt.probesSH.value=bt.texture,Mt.probesMin.value.copy(bt.boundingBox.min),Mt.probesMax.value.copy(bt.boundingBox.max),Mt.probesResolution.value.copy(bt.resolution)}gr.upload(z,Fn(Ie),Mt,j)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(gr.upload(z,Fn(Ie),Mt,j),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_t.setValue(z,"center",Y.center),_t.setValue(z,"modelViewMatrix",Y.modelViewMatrix),_t.setValue(z,"normalMatrix",Y.normalMatrix),_t.setValue(z,"modelMatrix",Y.matrixWorld),G.uniformsGroups!==void 0){let bt=G.uniformsGroups;for(let gn=0,Jn=bt.length;gn<Jn;gn++){let ba=bt[gn];he.update(ba,mn),he.bind(ba,mn)}}return mn}function hs(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function Zn(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,B,$){let G=q.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(M.texture).__webglTexture=B,q.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let $=q.get(M);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,$=0){ne=M,J=B,Z=$;let G=null,Y=!1,Ce=!1;if(M){let Se=q.get(M);if(Se.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,Se.__webglFramebuffer),_e.copy(M.viewport),Re.copy(M.scissor),Je=M.scissorTest,_.viewport(_e),_.scissor(Re),_.setScissorTest(Je),oe=-1;return}else if(Se.__webglFramebuffer===void 0)j.setupRenderTarget(M);else if(Se.__hasExternalTextures)j.rebindTextures(M,q.get(M.texture).__webglTexture,q.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let He=M.depthTexture;if(Se.__boundDepthTexture!==He){if(He!==null&&q.has(He)&&(M.width!==He.image.width||M.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(M)}}let Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(Ce=!0);let De=q.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[B])?G=De[B][$]:G=De[B],Y=!0):M.samples>0&&j.useMultisampledRTT(M)===!1?G=q.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?G=De[$]:G=De,_e.copy(M.viewport),Re.copy(M.scissor),Je=M.scissorTest}else _e.copy(Oe).multiplyScalar(ue).floor(),Re.copy(lt).multiplyScalar(ue).floor(),Je=Qe;if($!==0&&(G=ee),_.bindFramebuffer(z.FRAMEBUFFER,G)&&_.drawBuffers(M,G),_.viewport(_e),_.scissor(Re),_.setScissorTest(Je),Y){let Se=q.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Se.__webglTexture,$)}else if(Ce){let Se=B;for(let Me=0;Me<M.textures.length;Me++){let De=q.get(M.textures[Me]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Me,De.__webglTexture,$,Se)}}else if(M!==null&&$!==0){let Se=q.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Se.__webglTexture,$)}oe=-1},this.readRenderTargetPixels=function(M,B,$,G,Y,Ce,ve,Se=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=q.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Me=Me[ve]),Me){_.bindFramebuffer(z.FRAMEBUFFER,Me);try{let De=M.textures[Se],He=De.format,Ze=De.type;if(M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Se),!w.textureFormatReadable(He)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Ze)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-G&&$>=0&&$<=M.height-Y&&z.readPixels(B,$,G,Y,ye.convert(He),ye.convert(Ze),Ce)}finally{let De=ne!==null?q.get(ne).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,B,$,G,Y,Ce,ve,Se=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=q.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Me=Me[ve]),Me)if(B>=0&&B<=M.width-G&&$>=0&&$<=M.height-Y){_.bindFramebuffer(z.FRAMEBUFFER,Me);let De=M.textures[Se],He=De.format,Ze=De.type;if(M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Se),!w.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Fe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Fe),z.bufferData(z.PIXEL_PACK_BUFFER,Ce.byteLength,z.STREAM_READ),z.readPixels(B,$,G,Y,ye.convert(He),ye.convert(Ze),0);let ct=ne!==null?q.get(ne).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,ct);let gt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Gd(z,gt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Fe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ce),z.deleteBuffer(Fe),z.deleteSync(gt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,$=0){let G=Math.pow(2,-$),Y=Math.floor(M.image.width*G),Ce=Math.floor(M.image.height*G),ve=B!==null?B.x:0,Se=B!==null?B.y:0;j.setTexture2D(M,0),z.copyTexSubImage2D(z.TEXTURE_2D,$,0,0,ve,Se,Y,Ce),_.unbindTexture()},this.copyTextureToTexture=function(M,B,$=null,G=null,Y=0,Ce=0){let ve,Se,Me,De,He,Ze,Fe,ct,gt,Ke=M.isCompressedTexture?M.mipmaps[Ce]:M.image;if($!==null)ve=$.max.x-$.min.x,Se=$.max.y-$.min.y,Me=$.isBox3?$.max.z-$.min.z:1,De=$.min.x,He=$.min.y,Ze=$.isBox3?$.min.z:0;else{let Mt=Math.pow(2,-Y);ve=Math.floor(Ke.width*Mt),Se=Math.floor(Ke.height*Mt),M.isDataArrayTexture?Me=Ke.depth:M.isData3DTexture?Me=Math.floor(Ke.depth*Mt):Me=1,De=0,He=0,Ze=0}G!==null?(Fe=G.x,ct=G.y,gt=G.z):(Fe=0,ct=0,gt=0);let pt=ye.convert(B.format),Ot=ye.convert(B.type),Ie;B.isData3DTexture?(j.setTexture3D(B,0),Ie=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(j.setTexture2DArray(B,0),Ie=z.TEXTURE_2D_ARRAY):(j.setTexture2D(B,0),Ie=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);let sn=_.getParameter(z.UNPACK_ROW_LENGTH),ht=_.getParameter(z.UNPACK_IMAGE_HEIGHT),mn=_.getParameter(z.UNPACK_SKIP_PIXELS),Ut=_.getParameter(z.UNPACK_SKIP_ROWS),En=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,Ke.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ke.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,De),_.pixelStorei(z.UNPACK_SKIP_ROWS,He),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Ze);let Oi=M.isDataArrayTexture||M.isData3DTexture,_t=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let Mt=q.get(M),wn=q.get(B),bt=q.get(Mt.__renderTarget),gn=q.get(wn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,bt.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let Jn=0;Jn<Me;Jn++)Oi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(M).__webglTexture,Y,Ze+Jn),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(B).__webglTexture,Ce,gt+Jn)),z.blitFramebuffer(De,He,ve,Se,Fe,ct,ve,Se,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Y!==0||M.isRenderTargetTexture||q.has(M)){let Mt=q.get(M),wn=q.get(B);_.bindFramebuffer(z.READ_FRAMEBUFFER,te),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,X);for(let bt=0;bt<Me;bt++)Oi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Mt.__webglTexture,Y,Ze+bt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Mt.__webglTexture,Y),_t?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wn.__webglTexture,Ce,gt+bt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,wn.__webglTexture,Ce),Y!==0?z.blitFramebuffer(De,He,ve,Se,Fe,ct,ve,Se,z.COLOR_BUFFER_BIT,z.NEAREST):_t?z.copyTexSubImage3D(Ie,Ce,Fe,ct,gt+bt,De,He,ve,Se):z.copyTexSubImage2D(Ie,Ce,Fe,ct,De,He,ve,Se);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else _t?M.isDataTexture||M.isData3DTexture?z.texSubImage3D(Ie,Ce,Fe,ct,gt,ve,Se,Me,pt,Ot,Ke.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(Ie,Ce,Fe,ct,gt,ve,Se,Me,pt,Ke.data):z.texSubImage3D(Ie,Ce,Fe,ct,gt,ve,Se,Me,pt,Ot,Ke):M.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ce,Fe,ct,ve,Se,pt,Ot,Ke.data):M.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ce,Fe,ct,Ke.width,Ke.height,pt,Ke.data):z.texSubImage2D(z.TEXTURE_2D,Ce,Fe,ct,ve,Se,pt,Ot,Ke);_.pixelStorei(z.UNPACK_ROW_LENGTH,sn),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ht),_.pixelStorei(z.UNPACK_SKIP_PIXELS,mn),_.pixelStorei(z.UNPACK_SKIP_ROWS,Ut),_.pixelStorei(z.UNPACK_SKIP_IMAGES,En),Ce===0&&B.generateMipmaps&&z.generateMipmap(Ie),_.unbindTexture()},this.initRenderTarget=function(M){q.get(M).__webglFramebuffer===void 0&&j.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?j.setTextureCube(M,0):M.isData3DTexture?j.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?j.setTexture2DArray(M,0):j.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){J=0,Z=0,ne=null,_.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var Sf=new In,Fl=new N,xr=class extends ia{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Bt(e,3)),this.setAttribute("uv",new Bt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ji(t,6,1);return this.setAttribute("instanceStart",new Ln(n,3,0)),this.setAttribute("instanceEnd",new Ln(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ji(t,6,1);return this.setAttribute("instanceColorStart",new Ln(n,3,0)),this.setAttribute("instanceColorEnd",new Ln(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ea(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Sf.setFromBufferAttribute(t),this.boundingBox.union(Sf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Fl.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Fl)),Fl.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Fl));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};we.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ze},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};pn.line={uniforms:ga.merge([we.common,we.fog,we.line]),vertexShader:`
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
		`};var yr=class extends dn{constructor(e){super({type:"LineMaterial",uniforms:ga.clone(pn.line.uniforms),vertexShader:pn.line.vertexShader,fragmentShader:pn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Oh=new wt,Ef=new N,wf=new N,jt=new wt,Qt=new wt,mi=new wt,Bh=new N,zh=new Pt,en=new ra,Tf=new N,Ol=new In,Bl=new si,gi=new wt,_i,Ps;function Af(i,e,t){return gi.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),gi.multiplyScalar(1/gi.w),gi.x=Ps/t.width,gi.y=Ps/t.height,gi.applyMatrix4(i.projectionMatrixInverse),gi.multiplyScalar(1/gi.w),Math.abs(Math.max(gi.x,gi.y))}function wy(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,l=a;o<l;o++){en.start.fromBufferAttribute(s,o),en.end.fromBufferAttribute(r,o),en.applyMatrix4(t);let c=new N,d=new N;_i.distanceSqToSegment(en.start,en.end,d,c),d.distanceTo(c)<Ps*.5&&e.push({point:d,pointOnLine:c,distance:_i.origin.distanceTo(d),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Ty(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),f=-e.near;_i.at(1,mi),mi.w=1,mi.applyMatrix4(e.matrixWorldInverse),mi.applyMatrix4(n),mi.multiplyScalar(1/mi.w),mi.x*=r.x/2,mi.y*=r.y/2,mi.z=0,Bh.copy(mi),zh.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,g=d;u<g;u++){if(jt.fromBufferAttribute(l,u),Qt.fromBufferAttribute(c,u),jt.w=1,Qt.w=1,jt.applyMatrix4(zh),Qt.applyMatrix4(zh),jt.z>f&&Qt.z>f)continue;if(jt.z>f){let L=jt.z-Qt.z,E=(jt.z-f)/L;jt.lerp(Qt,E)}else if(Qt.z>f){let L=Qt.z-jt.z,E=(Qt.z-f)/L;Qt.lerp(jt,E)}jt.applyMatrix4(n),Qt.applyMatrix4(n),jt.multiplyScalar(1/jt.w),Qt.multiplyScalar(1/Qt.w),jt.x*=r.x/2,jt.y*=r.y/2,Qt.x*=r.x/2,Qt.y*=r.y/2,en.start.copy(jt),en.start.z=0,en.end.copy(Qt),en.end.z=0;let S=en.closestPointToPointParameter(Bh,!0);en.at(S,Tf);let m=rs.lerp(jt.z,Qt.z,S),p=m>=-1&&m<=1,I=Bh.distanceTo(Tf)<Ps*.5;if(p&&I){en.start.fromBufferAttribute(l,u),en.end.fromBufferAttribute(c,u),en.start.applyMatrix4(a),en.end.applyMatrix4(a);let L=new N,E=new N;_i.distanceSqToSegment(en.start,en.end,E,L),t.push({point:E,pointOnLine:L,distance:_i.origin.distanceTo(E),object:i,face:null,faceIndex:u,uv:null,uv1:null})}}}var zl=class extends Kt{constructor(e=new xr,t=new yr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Ef.fromBufferAttribute(t,a),wf.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Ef.distanceTo(wf);let r=new ji(s,2,1);return e.setAttribute("instanceDistanceStart",new Ln(r,1,0)),e.setAttribute("instanceDistanceEnd",new Ln(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_i=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;Ps=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Bl.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ps*.5;else{let f=Math.max(s.near,Bl.distanceToPoint(_i.origin));c=Af(s,f,l.resolution)}if(Bl.radius+=c,_i.intersectsSphere(Bl)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Ol.copy(o.boundingBox).applyMatrix4(a);let d;if(n)d=Ps*.5;else{let f=Math.max(s.near,Ol.distanceToPoint(_i.origin));d=Af(s,f,l.resolution)}Ol.expandByScalar(d),_i.intersectsBox(Ol)!==!1&&(n?wy(this,t):Ty(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Oh),this.material.uniforms.resolution.value.set(Oh.z,Oh.w))}};function Cf(i){let[e,t]=i.fixed_range.map(Number),n=t-e;if(!Number.isFinite(n)||n<=0)return[];if(i.scale_type==="log"&&n>=1){let d=Math.max(1,Math.ceil(n/6)),f=[];for(let u=Math.ceil(e);u<=t;u+=d)f.push(10**u);if(f.length>=3)return f;f.length=0;for(let u=Math.floor(e);u<=t;u+=1)for(let g of[1,2,5]){let v=u+Math.log10(g);v>=e&&v<=t&&f.push(Number((g*10**u).toPrecision(12)))}return f}let s=i.scale_type==="log"?10**e:e,r=i.scale_type==="log"?10**t:t,a=(r-s)/5,o=10**Math.floor(Math.log10(a)),l=[1,2,5,10].find(d=>d*o>=a)*o;Math.floor(r/l)-Math.ceil(s/l)<2&&(l/=2);let c=[];for(let d=Math.ceil(s/l);d<=Math.floor(r/l);d+=1)c.push(Number((d*l).toPrecision(12)));return c}var Rf=i=>String(i??"").trim().replace(/\s+/g," ").toLowerCase();function Pf(i,e,t=40){let n=Rf(e);if(!n)return{groups:[],totalGroupCount:0};let s=new Map,r=new Set;for(let a of i){let o=a.base_model_name||a.name;s.has(o)||s.set(o,[]),s.get(o).push(a),[a.name,o,a.creator,a.reasoning_level_label,a.tier].some(l=>Rf(l).includes(n))&&r.add(o)}return{totalGroupCount:r.size,groups:[...r].slice(0,t).map(a=>({baseModelName:a,models:s.get(a)}))}}function kh(i,e){return(i.reasoning_level_sort_order??0)-(e.reasoning_level_sort_order??0)||String(i.name).localeCompare(String(e.name))}function If(i,e){return!Number.isFinite(i)||!Number.isFinite(e)||e===0?null:(i-e)/Math.abs(e)*100}function va(i,e){return String(i).trim()===""||!Number.isFinite(Number(i))?e:Math.min(4,Math.max(.25,Number(i)))}function tn(i,e=3){return Number.isFinite(i)?Number(i.toPrecision(e)).toString():"\u672A\u8BB0\u5F55"}function Lf(i,e,t){let n=[];return t.map(s=>{if(!s.visible||s.width>i||s.height>e)return{id:s.id,hidden:!0};let r=Math.max(0,Math.min(i-s.width,s.x));for(let a=0;a<=Math.ceil(e/(s.height+2))*2;a+=1){let o=Math.ceil(a/2)*(a%2?1:-1)*(s.height+2),l=Math.max(0,Math.min(e-s.height,s.y+o));if(!n.some(c=>r<c.right+2&&r+s.width+2>c.x&&l<c.bottom+2&&l+s.height+2>c.y))return n.push({x:r,y:l,right:r+s.width,bottom:l+s.height}),{id:s.id,hidden:!1,x:r,y:l}}return{id:s.id,hidden:!0}})}function Df(i){let e=i.axes,t=l=>{let c=l.labels.find(d=>d.isTitle);return c?Math.max(c.width,c.height)/Math.max(1,Math.hypot(l.projectedEnd.x-l.projectedStart.x,l.projectedEnd.y-l.projectedStart.y)):0},n=e.slice().sort((l,c)=>t(c)-t(l)),s=new Set(e.flatMap(l=>l.labels.filter(c=>c.isTitle).map(c=>c.id))),r=[n,e,e.slice().reverse(),[e[1],e[2],e[0]],[e[2],e[0],e[1]],[e[0],e[2],e[1]],[e[1],e[0],e[2]]],a=[],o=-1;for(let l of r){let c=Ay(i,l.filter(Boolean)),d=c.filter(f=>s.has(f.id)&&!f.hidden).length;if(d>o&&(a=c,o=d),d===s.size)return c}return a}function Ay({canvasWidth:i,canvasHeight:e,projectedCenter:t,axes:n},s){let r=[],a=[],o=(u,g)=>u.x*g.x+u.y*g.y,l=(u,g)=>({x:u.x-g.x,y:u.y-g.y}),c=(u,g)=>({x:u.x*g,y:u.y*g}),d=u=>({x:-u.y,y:u.x}),f=(u,g)=>u.directions.reduce((v,S,m)=>v+Math.abs(o(S,g))*u.halfSizes[m],0);for(let u of[!0,!1])for(let{projectedStart:g,projectedEnd:v,labels:S}of u?s:n){let m=l(v,g),p=Math.hypot(m.x,m.y),I=p?c(m,1/p):{x:1,y:0},L=d(I),E={x:(g.x+v.x)/2,y:(g.y+v.y)/2};o(L,l(E,t))<0&&(L=c(L,-1));let R=Math.atan2(m.y,m.x)*180/Math.PI;R>90&&(R-=180),R<-90&&(R+=180);for(let A of S.filter(P=>P.isTitle===u)){let P=A.isTitle?R:0,y={id:A.id,hidden:!0,rotationDegrees:P};if(a.push(y),A.projectedDepth<-1||A.projectedDepth>1||p<1)continue;let C=P*Math.PI/180,U=(Math.abs(Math.cos(C))*A.width+Math.abs(Math.sin(C))*A.height)/2,F=(Math.abs(Math.sin(C))*A.width+Math.abs(Math.cos(C))*A.height)/2,W=A.isTitle?I:{x:1,y:0},ee={directions:[W,d(W)],halfSizes:[A.width/2,A.height/2]},te=o(l(A.anchor,g),m)/(p*p);for(let X of A.isTitle?[48,24,-48,-24,0,40,-40,32,-32,16,-16,8,-8,36,-36,12,-12]:[16,-16,8,-8,0]){let J=A.isTitle?0:te,Z=A.isTitle?1:te;for(let[Q,_e,Re]of[["x",i,U],["y",e,F]]){let Je=Math.max(0,Re+2-L[Q]*X),ot=Math.min(_e,_e-Re-2-L[Q]*X),ke=m[Q];if(Math.abs(ke)<1e-8)(g[Q]<Je||g[Q]>ot)&&(Z=-1);else{let re=(Je-g[Q])/ke,ge=(ot-g[Q])/ke;J=Math.max(J,Math.min(re,ge)),Z=Math.min(Z,Math.max(re,ge))}Je>ot&&(Z=-1)}if(J>Z)continue;let oe=[Math.max(J,Math.min(te,Z)),J,Z,...Array.from({length:7},(Q,_e)=>J+(Z-J)*(_e+1)/8)];for(let Q of A.isTitle?oe:[te]){let _e={x:g.x+m.x*Q+L.x*X,y:g.y+m.y*Q+L.y*X};if(!r.some(Re=>![...ee.directions,...Re.directions].some(Je=>Math.abs(o(l(_e,Re.center),Je))>=f(ee,Je)+f(Re,Je)+2))){Object.assign(y,{hidden:!1,..._e}),r.push({...ee,center:_e});break}}if(!y.hidden)break}}}return a}function Nf(i){if(i.schema_version==="frontier_3d_visualization_dataset/v2")return i;if(!["frontier_3d_browser_projection/v1","frontier_3d_visualization_dataset/v3"].includes(i.schema_version))throw new Error("\u4E0D\u652F\u6301\u7684 Frontier 3D \u6570\u636E\u5951\u7EA6\u7248\u672C");let e=["name","model_uuid","creator","base_model_name","lineage_family_key","reasoning_level_label","reasoning_level_sort_order"],t=r=>{let a=r.model_index;if(!Number.isInteger(a)||a<0||a>=i.models.length)throw new Error(`model_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let{identity_resolution:o,...l}=i.models[a];return l},n=({model_index:r,analysis_eligibility_index:a,excluded_model_explanation_index:o,...l})=>{if(a!==void 0){if(!Number.isInteger(a)||a<0||a>=(i.analysis_eligibility_definitions?.length||0))throw new Error(`analysis_eligibility_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let c=i.analysis_eligibility_definitions[a];l.analysis_eligibility={...c},Array.isArray(c.ineligibility_reason_codes)&&(l.analysis_eligibility.ineligibility_reason_codes=[...c.ineligibility_reason_codes])}if(o!==void 0){if(!Number.isInteger(o)||o<0||o>=(i.excluded_model_explanation_definitions?.length||0))throw new Error(`excluded_model_explanation_index \u5F15\u7528\u8D8A\u754C\uFF1A${o}`);let c=i.excluded_model_explanation_definitions[o];Object.assign(l,c,{missing_dimension_names:[...c.missing_dimension_names]})}return l},s=Object.fromEntries(Object.entries(i.metric_variants).map(([r,a])=>[r,{...a,three_dimensional_scene:{...a.three_dimensional_scene,displayed_model_markers:a.three_dimensional_scene.displayed_model_markers.map(o=>{let l=t(o),c=i.organization_identity_metadata_by_creator_name?.[l.creator]||{};return{...Object.fromEntries(["creator_uuid","organization_identity_key","country_region_category"].filter(d=>d in c).map(d=>[d,c[d]])),...l,x:l.panel?.[a.interaction_relationships?.cost_axis_field],y:l.panel?.[a.interaction_relationships?.speed_axis_field],z:l.panel?.intelligence,...n(o),panel:{...l.panel,...o.panel}}})},excluded_models_with_drop_reason:(a.excluded_models_with_drop_reason||[]).map(o=>{let l=t(o);return{name:l.name,creator:l.creator,model_uuid:l.model_uuid,...Object.fromEntries(["base_model_name","tier","reasoning_level_label","reasoning_level_sort_order"].filter(c=>c in l).map(c=>[c,l[c]])),intelligence:l.panel?.intelligence,release_date:l.panel?.release_date==="?"?null:l.panel?.release_date,...n(o)}}),interaction_relationships:{...a.interaction_relationships,lineages:Object.fromEntries(Object.entries(a.interaction_relationships?.lineages||{}).map(([o,l])=>[o,l.map(c=>{let d=t(c);return{...Object.fromEntries(e.filter(f=>f in d).map(f=>[f,d[f]])),...n(c)}})]))}}]));return{...i,metric_variants:s}}var Uf={type:"change"},Gh={type:"start"},Of={type:"end"},kl=new $i,Ff=new Vn,Cy=Math.cos(70*rs.DEG2RAD),Gt=new N,Mn=2*Math.PI,Tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vh=1e-6,Vl=class extends aa{constructor(e,t=null){super(e,t),this.state=Tt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qi.ROTATE,MIDDLE:Qi.DOLLY,RIGHT:Qi.PAN},this.touches={ONE:es.ROTATE,TWO:es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Rn,this._lastTargetPosition=new N,this._quat=new Rn().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ur,this._sphericalDelta=new ur,this._scale=1,this._panOffset=new N,this._rotateStart=new ze,this._rotateEnd=new ze,this._rotateDelta=new ze,this._panStart=new ze,this._panEnd=new ze,this._panDelta=new ze,this._dollyStart=new ze,this._dollyEnd=new ze,this._dollyDelta=new ze,this._dollyDirection=new N,this._mouse=new ze,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Py.bind(this),this._onPointerDown=Ry.bind(this),this._onPointerUp=Iy.bind(this),this._onContextMenu=By.bind(this),this._onMouseWheel=Ny.bind(this),this._onKeyDown=Uy.bind(this),this._onTouchStart=Fy.bind(this),this._onTouchMove=Oy.bind(this),this._onMouseDown=Ly.bind(this),this._onMouseMove=Dy.bind(this),this._interceptControlDown=zy.bind(this),this._interceptControlUp=ky.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Uf),this.update(),this.state=Tt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===Tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Mn:n>Math.PI&&(n-=Mn),s<-Math.PI?s+=Mn:s>Math.PI&&(s-=Mn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Gt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(kl.origin.copy(this.object.position),kl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(kl.direction))<Cy?this.object.lookAt(this.target):(Ff.setFromNormalAndCoplanarPoint(this.object.up,this.target),kl.intersectPlane(Ff,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vh||this._lastTargetPosition.distanceToSquared(this.target)>Vh?(this.dispatchEvent(Uf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Mn/60*this.autoRotateSpeed*e:Mn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Gt.copy(s).sub(this.target);let r=Gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ze,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ry(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Py(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Iy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Of),this.state=Tt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ly(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Qi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Tt.DOLLY;break;case Qi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Tt.ROTATE}break;case Qi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Tt.PAN}break;default:this.state=Tt.NONE}this.state!==Tt.NONE&&this.dispatchEvent(Gh)}function Dy(i){switch(this.state){case Tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ny(i){this.enabled===!1||this.enableZoom===!1||this.state!==Tt.NONE||(i.preventDefault(),this.dispatchEvent(Gh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Of))}function Uy(i){this.enabled!==!1&&this._handleKeyDown(i)}function Fy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case es.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Tt.TOUCH_ROTATE;break;case es.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Tt.TOUCH_PAN;break;default:this.state=Tt.NONE}break;case 2:switch(this.touches.TWO){case es.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Tt.TOUCH_DOLLY_PAN;break;case es.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Tt.TOUCH_DOLLY_ROTATE;break;default:this.state=Tt.NONE}break;default:this.state=Tt.NONE}this.state!==Tt.NONE&&this.dispatchEvent(Gh)}function Oy(i){switch(this._trackPointer(i),this.state){case Tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Tt.NONE}}function By(i){this.enabled!==!1&&i.preventDefault()}function zy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ky(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var os=Object.freeze({TREND_RESIDUAL:"trend_residual",INTELLIGENCE_UPLIFT:"intelligence_uplift",WEIGHTED_EXCLUSIVE_HYPERVOLUME:"weighted_exclusive_hypervolume",FRONTIER_DISTANCE:"frontier_distance"}),ls=Object.freeze({[os.TREND_RESIDUAL]:{label:"\u8D8B\u52BF\u6B8B\u5DEE",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"trend_residual"},[os.INTELLIGENCE_UPLIFT]:{label:"\u667A\u80FD\u62AC\u5347",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"intelligence_uplift"},[os.WEIGHTED_EXCLUSIVE_HYPERVOLUME]:{label:"\u52A0\u6743\u8D85\u4F53\u79EF",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!0,modelMetricFieldName:"weighted_exclusive_hypervolume"},[os.FRONTIER_DISTANCE]:{label:"\u5230\u524D\u6CBF\u5782\u8DDD",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!1,modelMetricFieldName:"frontier_distance"}});function Bf(i){let e=i.slice().sort((s,r)=>r[0]-s[0]||r[1]-s[1]),t=0,n=0;return e.forEach(([s,r])=>{r>n&&(t+=s*(r-n),n=r)}),t}function zf(i){if(!i.length)return 0;let e=i.slice().sort((r,a)=>a[2]-r[2]),t=0,n=null,s=[];return e.forEach(([r,a,o])=>{n!==null&&(t+=Bf(s)*(n-o)),s.push([r,a]),n=o}),t+Bf(s)*n}function Hh(i,e){let t=i.map(r=>{let a=r.normalized_improvement_coordinates;return[Math.pow(a.cost_efficiency,e.cost),Math.pow(a.speed,e.speed),Math.pow(a.intelligence,e.intelligence)]}),n=zf(t);return{contributions:t.map((r,a)=>n-zf(t.filter((o,l)=>a!==l))),completeFrontierHypervolume:n}}function kf(i,e,t){let n=ls[e];if(!n)throw new Error(`Unknown frontier standout metric: ${e}`);return n.usesAdjustableAxisWeights?Hh(i,t).contributions:i.map(s=>{let r=s.standout_metrics[n.modelMetricFieldName];return r==null||!isFinite(r)?NaN:r})}(function(){"use strict";let e=new Map,t=document.createElement("div");t.id="frontier-3d-runtime-diagnostic-banner",t.setAttribute("role","alert"),t.hidden=!0,document.body.append(t);function n(h,x){x?e.set(h,x):e.delete(h),t.textContent=[...e.values()].join("\uFF1B"),t.hidden=e.size===0}window.frontier3dRuntimeDiagnosticStatus=()=>Object.fromEntries(e),window.addEventListener("error",h=>n("window_error",`\u9875\u9762\u9519\u8BEF\uFF1A${String(h.message||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`)),window.addEventListener("unhandledrejection",h=>n("unhandled_rejection",`\u9875\u9762\u64CD\u4F5C\u5931\u8D25\uFF1A${String(h.reason?.message||h.reason||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`));let r=document.getElementById("frontier-3d-visualization-dataset-json");if(!r)throw new Error("Missing Frontier 3D visualization dataset");let a=Nf(JSON.parse(r.textContent)),o=a.metric_variants||{},l=a.organization_identity_metadata_by_creator_name||{},c=a.initial_variant_key;if(!o[c])throw new Error(`Missing initial metric variant: ${c}`);let d=document.getElementById(a.graph_div_id||"frontier3d"),f=document.getElementById("frontier-3d-plot-region"),u=document.getElementById("frontier-3d-report-shell"),g=document.getElementById("frontier-3d-toolbar"),v=document.getElementById("frontier-3d-side-panel");if(!d||!f||!u||!g||!v)throw new Error("Frontier 3D report document is incomplete");let S=document.getElementById("frontier-3d-report-header"),m=a.artificial_analysis_data_provenance||{},p=Number.isInteger(m.recent_release_frontier_distance_grace_period_months)?m.recent_release_frontier_distance_grace_period_months:null,I="https://artificialanalysis.ai/",L="\u5386\u53F2\u53E3\u5F84\uFF08\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u7684\u6210\u672C/\u5197\u957F\u5EA6\uFF09\uFF0C\u4E0D\u53C2\u4E0E\u672C\u53E3\u5F84\u524D\u6CBF\u8BA1\u7B97";function E(h){let x=document.querySelector(`meta[name="${h}"]`);return x&&x.getAttribute("content")||""}let R={rendererBundleSha256:E("frontier-3d-renderer-bundle-sha256")||"unknown",generatorGitCommit:E("frontier-3d-generator-git-commit")||"unknown",renderedAtUtc:E("frontier-3d-rendered-at-utc")||"unknown"};window.FRONTIER_3D_VISUALIZATION_DATASET=a;let A=new lr;A.background=new at(16777215);let P=new $t(42,1,.01,100);P.up.set(0,0,1);let y;try{y=new Dl({antialias:!0,alpha:!1,preserveDrawingBuffer:!1})}catch{n("webgl_unavailable","\u65E0\u6CD5\u542F\u52A8\u4E09\u7EF4\u56FE\uFF1A\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WebGL\uFF0C\u6216\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3\u3002\u8BF7\u542F\u7528\u6D4F\u89C8\u5668\u56FE\u5F62\u52A0\u901F\u540E\u91CD\u65B0\u52A0\u8F7D\u3002");return}let C=!1;y.domElement.addEventListener("webglcontextlost",h=>{h.preventDefault(),C=!0,he=!1,zn(),n("webgl_context","\u4E09\u7EF4\u56FE\u7684\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u6B63\u5728\u7B49\u5F85\u6D4F\u89C8\u5668\u6062\u590D\u3002")}),y.domElement.addEventListener("webglcontextrestored",()=>{C=!1,he=!1,Os(),n("webgl_context",null),Ut()}),y.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),y.outputColorSpace=Yt,y.domElement.setAttribute("data-frontier-threejs-canvas","true"),y.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF"),d.replaceChildren(y.domElement);let U=new Vl(P,y.domElement);U.enableDamping=!1,U.screenSpacePanning=!0,U.zoomToCursor=!0,U.minDistance=2.4,U.maxDistance=14;let F=new sa,W=new ze,ee=new Gn,te=new Gn,X=new Gn,J=new Gn;A.add(ee,te,X,J);let Z,ne,oe,Q=[],_e={},Re={},Je={},ot={},ke=[],re=[],ge=[],ue=[],qe={},Ye={},Oe=null,lt=null,Qe=null,dt=null,st=null,tt=null,It=null,mt=!1,At=!1,Lt=p>0,ft,Ct=0,z=0,Ht=[],rt="wireframe",w=!1,_=!window.matchMedia("(max-width: 640px)").matches,k=null,q=null,j=null,fe=null,xe=new Set,K=new Set,ie=new Map;function pe(h){return h.model_uuid||`legacy:${JSON.stringify([h.creator,h.name])}`}Object.values(o).forEach(h=>{(h.three_dimensional_scene?.displayed_model_markers||[]).forEach(x=>{ie.set(pe(x),x)})});function Ne(h){return K.has(pe(h))}function Ee(){xe=new Set([...K].map(h=>ie.get(h)?.base_model_name).filter(Boolean))}function Te(h){let x=[];for(let[b,T]of ie)T.base_model_name===h&&x.push(b);return x}function Be(h){let x=Te(h);return x.length>0&&x.every(b=>K.has(b))}function Ve(h,x){for(let[b,T]of ie)T.base_model_name===h&&(x?K.add(b):K.delete(b));return Ee(),Sa(),ds(),Promise.resolve(!0)}let $e=new Set,D=os.TREND_RESIDUAL,de={intelligence:1,cost:1,speed:1},se={},ye=null,Ae={},he=!1,Ue="frontier3d.marker-size-multiplier",Pe=Object.freeze({logo:22,backplate:29,countryRegion:38,paretoRing:38,pinnedRing:49,standoutHalo:52,standoutHaloMinimum:44,standoutHaloMaximum:64,missingStandoutHalo:48,prunedLineageAncestor:18}),Dt="frontier3d.pinned-comparison-fields";function vt(h,x){try{return JSON.parse(window.localStorage.getItem(h))??x}catch{return x}}function bn(h,x){try{window.localStorage.setItem(h,JSON.stringify(x))}catch{}}let Sn=vt(Ue,.5),Xn=Number.isFinite(Sn)?Math.min(1.5,Math.max(.5,Sn)):.5,Ma=["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"],vr=vt(Dt,[]),xi=new Set(Array.isArray(vr)?vr.filter(h=>Ma.includes(h)):[]),nn,Ui,ln,qt,Un=-1,qn=null,Mr=null,Fi=null,cs=document.createElement("div");cs.id="aa-pinned-model-name-labels",d.append(cs);let yi=document.createElement("div");yi.id="aa-lineage-overflow-direction-labels",d.append(yi);let Fn,On,Yn,$n,hs,Zn,M,B,$,G,Y,Ce=[],ve,Se,Me,De,He,Ze,Fe,ct,gt,Ke=document.createElement("div");Ke.id="aa-threejs-model-tooltip",Ke.className="aa-threejs-model-tooltip",Ke.hidden=!0,f.appendChild(Ke);let pt=[],Ot=new WeakMap,Ie=0,sn="";document.fonts?.ready.then(()=>{Ot=new WeakMap,Ut()});function ht(h,x,b){let T=document.createElement("div");if(T.className=b?"aa-threejs-axis-label":"aa-threejs-axis-tick-label",T.dataset.axisName=h,T.textContent=x,b){let O=h==="x"?"\u8D8A\u4F4E\u8D8A\u597D":"\u8D8A\u9AD8\u8D8A\u597D";T.dataset.directionHint=` ${h==="x"?"\u2193":"\u2191"} ${O}`,T.setAttribute("aria-label",`${x}\uFF0C${O}`)}return d.appendChild(T),T}function mn(){let h=d.clientWidth,x=d.clientHeight,b=`${h}:${x}:${window.innerWidth}:${window.innerHeight}`;b!==sn&&(Ot=new WeakMap,sn=b);let T=pt.flatMap(H=>H.labels).filter(({element:H})=>!Ot.has(H));for(let{element:H}of T)H.hidden=!1;for(let{element:H}of T)Ot.set(H,{width:H.offsetWidth,height:H.offsetHeight}),Ie+=1;let O=H=>{let le=H.clone().project(P);return{x:(le.x+1)*h/2,y:(1-le.y)*x/2,depth:le.z}},V=new Map,ae=pt.map(({start:H,end:le,labels:ce},me)=>({projectedStart:O(H),projectedEnd:O(le),labels:ce.map(({element:be,position:We,isTitle:nt},xt)=>{let Rt=`${me}:${xt}`;V.set(Rt,be);let xn=O(We);return{id:Rt,isTitle:nt,anchor:xn,projectedDepth:xn.depth,...Ot.get(be)}})}));for(let H of Df({canvasWidth:h,canvasHeight:x,projectedCenter:O(new N),axes:ae})){let le=V.get(H.id);le.hidden=H.hidden,!H.hidden&&(le.style.transform=`translate(-50%, -50%) rotate(${H.rotationDegrees}deg)`,le.style.left=`${H.x}px`,le.style.top=`${H.y}px`)}}function Ut(){he||C||(he=!0,window.requestAnimationFrame(()=>{he=!1,!C&&(y.render(A,P),mn(),Mu(),ru())}))}U.addEventListener("change",Ut);function En(h){for(;h.children.length;){let x=h.children.pop();x.userData.foregroundMaterial?.dispose(),!x.isSprite&&x.geometry&&x.geometry.dispose&&x.geometry.dispose(),x.material&&x.material.dispose&&!x.userData.sharedMaterial&&x.material.dispose()}}function Oi(h,x){return x.scale_type==="log"?Math.log10(Math.max(Number(h),Number.MIN_VALUE)):Number(h)}function _t(h,x){let b=x.fixed_range,T=Number(b[0]),O=Number(b[1]),V=Oi(h,x);return!Number.isFinite(V)||O===T?0:-1+2*(V-T)/(O-T)}function Mt(h,x,b){let T=ne.three_dimensional_axis_configuration;return new N(_t(h,T.x_axis),_t(x,T.y_axis),_t(b,T.z_axis))}function wn(h){return Mt(h.x,h.y,h.z).clampScalar(-1,1)}function bt(h){let x=Mt(h.x,h.y,h.z);return["\u6210\u672C","\u901F\u5EA6","\u667A\u80FD"].flatMap((b,T)=>{let O=x.getComponent(T);return O<-1?[`${b}\u4F4E\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2193`]:O>1?[`${b}\u9AD8\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2191`]:[]}).join("\uFF1B")}function gn(h,x,b=1){let T=new Jt;T.setAttribute("position",new Bt(h.flatMap(V=>V.toArray()),3));let O=new cr({color:x,linewidth:b});return new Kr(T,O)}function Jn(h,x,b,T=!1){let O=new xr;O.setPositions(h.flatMap(H=>H.toArray()));let V=new yr({color:x,linewidth:b,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,dashed:T});V.resolution.set(d.clientWidth,d.clientHeight);let ae=new zl(O,V);return ae.renderOrder=100,T&&ae.computeLineDistances(),ae}function ba(){En(ee);let h=(ae,H,le)=>new N(ae,H,le),x=[[h(-1,-1,-1),h(1,-1,-1)],[h(-1,1,-1),h(1,1,-1)],[h(-1,-1,1),h(1,-1,1)],[h(-1,1,1),h(1,1,1)],[h(-1,-1,-1),h(-1,1,-1)],[h(1,-1,-1),h(1,1,-1)],[h(-1,-1,1),h(-1,1,1)],[h(1,-1,1),h(1,1,1)],[h(-1,-1,-1),h(-1,-1,1)],[h(1,-1,-1),h(1,-1,1)],[h(-1,1,-1),h(-1,1,1)],[h(1,1,-1),h(1,1,1)]];ee.add(gn(x.flat(),6583435)),pt.forEach(({labels:ae})=>ae.forEach(({element:H})=>H.remove())),pt.length=0;let b=ne.three_dimensional_axis_configuration,T=[],O=[];[["x",h(-1,1,-1),h(1,1,-1),h(0,.04,0)],["y",h(-1,-1,-1),h(-1,1,-1),h(-.04,0,0)],["z",h(-1,-1,-1),h(-1,-1,1),h(-.04,0,0)]].forEach(([ae,H,le,ce])=>{let me=b[`${ae}_axis`],be=[{element:ht(ae,me.title_text,!0),position:H.clone().lerp(le,.5),isTitle:!0}];O.push(H,le),Cf(me).forEach(We=>{let nt=_t(We,me),xt=H.clone().lerp(le,(nt+1)/2);O.push(xt,xt.clone().add(ce));let Rt=ht(ae,Math.abs(We)>=1e6||We!==0&&Math.abs(We)<.001?We.toExponential():String(We),!1);Rt.dataset.axisValue=String(We),be.push({element:Rt,position:xt,isTitle:!1}),ae==="x"?T.push(h(nt,-1,-1),h(nt,1,-1)):ae==="y"?T.push(h(-1,nt,-1),h(1,nt,-1)):T.push(h(-1,-1,nt),h(-1,1,nt),h(-1,1,nt),h(1,1,nt))}),pt.push({start:H,end:le,labels:be})}),ee.add(gn(O,3359061));let V=gn(T,14212838);V.material.transparent=!0,V.material.opacity=.72,ee.add(V)}function Is(h){return typeof h=="number"&&Number.isFinite(h)}function Gl(h,x,b){let T=h?h[x]:void 0;return Array.isArray(T)?T:(T!=null&&(b.nonFiniteValueCount+=1),[])}function Wh(h,x){Ct+=x.nonFiniteValueCount,z+=x.outOfRangeIndexCount,Ht.push(h),console.warn(`Frontier 3D \u5951\u7EA6\u51E0\u4F55 ${h} \u542B\u975E\u6709\u9650\u5750\u6807/\u7D22\u5F15\u6216\u7ED3\u6784\u4E0D\u4E00\u81F4\uFF0C\u5DF2\u8DF3\u8FC7\u7ED8\u5236`,x)}function Xh(h,x){let b={nonFiniteValueCount:0,outOfRangeIndexCount:0},T=["x_coordinates","y_coordinates","z_coordinates"].map(me=>Gl(h,me,b)),[O,V,ae]=T,H=O.length===V.length&&O.length===ae.length;if(T.forEach(me=>me.forEach(be=>{be!=null&&!Is(be)&&(b.nonFiniteValueCount+=1)})),!H||b.nonFiniteValueCount)return Wh(x,b),[];let le=[],ce=null;for(let me=0;me<O.length;me+=1){let be=[O[me],V[me],ae[me]];if(be.some(nt=>nt==null)){ce=null;continue}let We=Mt(...be);ce&&le.push(ce,We),ce=We}return le}function qh(h,x,b){let T={nonFiniteValueCount:0,outOfRangeIndexCount:0},[O,V,ae]=["x_coordinates","y_coordinates","z_coordinates"].map(St=>Gl(h,St,T)),H=["triangle_vertex_index_a","triangle_vertex_index_b","triangle_vertex_index_c"].map(St=>Gl(h,St,T)),le=O.length,ce=H[0].length,me=["x_coordinates","y_coordinates","z_coordinates"].every(St=>Array.isArray(h?.[St]));if([O,V,ae].forEach(St=>St.forEach(Tn=>{Is(Tn)||(T.nonFiniteValueCount+=1)})),H.forEach(St=>St.forEach(Tn=>{!Is(Tn)||!Number.isInteger(Tn)?T.nonFiniteValueCount+=1:me&&(Tn<0||Tn>=le)&&(T.outOfRangeIndexCount+=1)})),!(V.length===le&&ae.length===le&&H.every(St=>St.length===ce))||T.nonFiniteValueCount||T.outOfRangeIndexCount)return Wh(b,T),null;if(!le||!ce)return null;let We=O.flatMap((St,Tn)=>Mt(St,V[Tn],ae[Tn]).toArray()),nt=[];for(let St=0;St<ce;St+=1)nt.push(H[0][St],H[1][St],H[2][St]);let xt=new Jt;xt.setAttribute("position",new Bt(We,3)),xt.setIndex(nt),xt.computeVertexNormals();let Rt=new Ss({side:Hn,transparent:!0,depthTest:!0,depthWrite:!1,...x}),xn=new Kt(xt,Rt);return xn.renderOrder=60,xn}function Vf(){En(te);let h=Xh(ne.pareto_frontier_wireframe_line_segments,"pareto_frontier_wireframe_line_segments");Oe=h.length?gn(h,2383002,2):null,Oe&&te.add(Oe),lt=qh(ne.pareto_frontier_surface_triangle_mesh,{color:3244733,opacity:.25},"pareto_frontier_surface_triangle_mesh"),lt&&te.add(lt),Qe=qh(ne.achievable_frontier_surface_triangle_mesh,{color:3253076,opacity:.2},"achievable_frontier_surface_triangle_mesh"),Qe&&te.add(Qe);let x=ne.exact_achievable_frontier_boundary_line_segments,b=x?Xh(x,"exact_achievable_frontier_boundary_line_segments"):[];dt=b.length?gn(b,2193980,1):null,dt&&te.add(dt),Kl()}function Kn(h){let x=document.createElement("canvas");x.width=128,x.height=128;let b=x.getContext("2d");h(b,x.width,x.height);let T=new Es(x);return T.colorSpace=Yt,T.needsUpdate=!0,T}function Hl(h,x,b,T,O,V){let ae=Math.min(V,T/2,O/2);h.beginPath(),h.roundRect(x,b,T,O,ae)}let Gf=Kn(h=>{Hl(h,8,8,112,112,24),h.fillStyle="rgba(255,255,255,0.96)",h.fill(),h.lineWidth=5,h.strokeStyle="rgba(71,85,105,0.45)",h.stroke()}),Hf=Kn(h=>{Hl(h,10,10,108,108,24),h.fillStyle="rgba(241,245,249,0.62)",h.fill(),h.setLineDash([14,9]),h.lineWidth=6,h.strokeStyle="rgba(71,85,105,0.9)",h.stroke()}),Wf=.42,Xf=Kn(h=>{h.beginPath(),h.arc(64,64,53,0,Math.PI*2),h.lineWidth=10,h.strokeStyle="rgba(15,23,42,0.66)",h.stroke()}),qf=Kn(h=>{let x=h.createRadialGradient(64,64,32,64,64,63);x.addColorStop(0,"rgba(49,130,189,0)"),x.addColorStop(.65,"rgba(49,130,189,0.32)"),x.addColorStop(1,"rgba(49,130,189,0)"),h.fillStyle=x,h.fillRect(0,0,128,128)}),Yf=Kn(h=>{h.beginPath(),h.arc(64,64,54,0,Math.PI*2),h.setLineDash([8,8]),h.lineWidth=5,h.strokeStyle="rgba(71,85,105,0.8)",h.stroke()}),$f=Kn(h=>{h.beginPath(),h.arc(64,64,54,0,Math.PI*2),h.lineWidth=12,h.strokeStyle="rgba(234,179,8,0.98)",h.stroke()}),Zf=Kn(h=>{h.beginPath(),h.arc(64,64,42,0,Math.PI*2),h.fillStyle="rgba(100,116,139,0.96)",h.fill(),h.lineWidth=8,h.strokeStyle="rgba(255,255,255,0.98)",h.stroke()}),Jf={china:Kn(h=>{h.beginPath(),h.arc(64,64,52,0,Math.PI*2),h.lineWidth=8,h.strokeStyle="#dc2626",h.stroke(),h.beginPath(),h.arc(64,64,42,0,Math.PI*2),h.lineWidth=4,h.strokeStyle="#dc2626",h.stroke()}),united_states:Kn(h=>{Hl(h,12,12,104,104,25),h.lineWidth=10,h.strokeStyle="#2563eb",h.stroke()}),other:Kn(h=>{h.save(),h.translate(64,64),h.rotate(Math.PI/4),h.strokeStyle="#4b5563",h.lineWidth=9,h.strokeRect(-39,-39,78,78),h.restore()}),unclassified:Kn(h=>{h.save(),h.translate(64,64),h.rotate(Math.PI/4),h.strokeStyle="#9ca3af",h.setLineDash([10,8]),h.lineWidth=9,h.strokeRect(-39,-39,78,78),h.restore()})};function vi(h,{depthWrite:x=!1}={}){return new Ms({map:h,transparent:!0,depthTest:!0,depthWrite:x,alphaTest:.02,sizeAttenuation:!1})}let Wl=vi(Gf,{depthWrite:!0}),Xl=vi(Hf,{depthWrite:!0}),Yh=vi(Xf),$h=vi($f),ql=vi(qf),Zh=vi(Yf),Yl=vi(Zf);Yl.depthTest=!1;let $l=Object.fromEntries(Object.entries(Jf).map(([h,x])=>[h,vi(x)]));[Wl,Xl,Yh,ql,Zh,$h,Yl,...Object.values($l)].forEach(h=>{h.userData={sharedMaterial:!0}});function Ls(h,x,b,T){let O=new bs(h);return O.position.copy(x),br(O,b),O.renderOrder=T,O.userData.sharedMaterial=!0,X.add(O),O}function br(h,x){h.userData.cssPixelSize=x;let b=x*Xn*2*Math.tan(rs.degToRad(P.fov/2))/Math.max(1,d.clientHeight);h.scale.set(b,b,1)}function Jh(h){if(!Number.isFinite(Number(h)))return!1;Xn=Math.min(1.5,Math.max(.5,Number(h))),nn&&(nn.value=String(Xn)),Ui&&(Ui.textContent=`${tn(Xn)}\xD7`);for(let x of[X,J])x.children.filter(b=>b.isSprite).forEach(b=>br(b,b.userData.cssPixelSize));return bn(Ue,Xn),Ut(),!0}function Kh(h){return!$e.has(h)}function _n(h){return h?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant!==!1}function Zl(h){return h?.analysis_eligibility?.ineligibility_reason_text||L}function Ft(h){let x=Q[h],b=ke[h];return!x||!b||b.hasNonFiniteContractCoordinate?!1:Jl(h).length===0}function Jl(h){let x=Q[h];if(!x)return[];let b=[];return Kh(x.creator)||b.push("\u5382\u5546\u7B5B\u9009"),At&&!_n(x)&&b.push("\u4EC5\u5F53\u671F\u53EF\u6BD4"),!Lt&&x.displayed_only_because_of_recent_release_grace_period===!0&&b.push("\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u5DF2\u5173\u95ED"),ke[h]?.hasNonFiniteContractCoordinate&&b.push("\u5750\u6807\u65E0\u6548"),b}let jh={};function Kf(h,x){let b=jh[h];return b||(b=x.clone(),b.opacity=Wf,b.userData={sharedMaterial:!0},jh[h]=b),b}function jf(h,x){let b=document.createElement("canvas");b.width=256,b.height=256;let T=b.getContext("2d"),O=new Es(b);O.colorSpace=Yt;let V=vi(O);V.userData={sharedMaterial:!0},Ye[h]="loading";let ae=new Image;return ae.onload=()=>{let H=Math.max(1,ae.naturalWidth),le=Math.max(1,ae.naturalHeight),ce=Math.min(224/H,224/le),me=H*ce,be=le*ce;T.clearRect(0,0,b.width,b.height),T.drawImage(ae,(b.width-me)/2,(b.height-be)/2,me,be),O.needsUpdate=!0,Ye[h]="loaded",Ut()},ae.onerror=()=>{Ye[h]="failed",console.error(`Unable to decode organization brand asset: ${h}`)},ae.src=x.logo_visualization_data_url,V}function Qf(){En(X),ke=[],re=[],ge=[],Q.forEach((h,x)=>{let b=[h.x,h.y,h.z].filter(xt=>!Is(xt)).length;Ct+=b;let T=b?new N:Mt(h.x,h.y,h.z),O=l[h.creator],V=_n(h),ae=Ls(V?Wl:Xl,T,Pe.backplate,30),H=O.country_region_category,le=Ls($l[H]||$l.unclassified,T,Pe.countryRegion,20);le.visible=mt;let ce=qe[h.creator];ce||(ce=jf(h.creator,O),qe[h.creator]=ce);let me=Ls(V?ce:Kf(h.creator,ce),T,Pe.logo,40);[ae,me].forEach(xt=>{xt.userData.modelIndex=x,xt.userData.interactionTargetKind="displayed_model"}),re.push(me),ge.push(ae,me);let be=Ls(Yh,T,Pe.paretoRing,45);be.visible=h.panel.layer===1;let We=Ls(ql,T,Pe.standoutHalo,15);We.visible=h.panel.layer===1;let nt=Ls($h,T,Pe.pinnedRing,50);nt.visible=!1,ke.push({creatorName:h.creator,isAnalysisEligible:V,hasNonFiniteContractCoordinate:b>0,logoSprite:me,backplateSprite:ae,countryRegionSprite:le,paretoRingSprite:be,standoutHaloSprite:We,pinnedRingSprite:nt})}),Sr(),Sa(),us()}function Sr(){Ql();let h=ue.find(x=>x.userData.prunedLineageAncestorNode.name===q)?.userData.prunedLineageAncestorNode;(k!==null&&!Ft(k)||h&&!Er(h))&&zn(),ke.forEach((x,b)=>{let T=Q[b],O=Ft(b);x.logoSprite.visible=O,x.backplateSprite.visible=O,x.countryRegionSprite.visible=O&&mt,x.paretoRingSprite.visible=O&&T.panel?.layer===1,x.standoutHaloSprite.visible=O&&T.panel?.layer===1,x.pinnedRingSprite.visible=O&&Ne(T)}),Au(),gu(),Aa(),wr(),ds(),sc(),wu(),Ze&&us(),Ut()}function Qh(h){return At=!!h,$n&&($n.checked=At),Sr(),Promise.resolve(At)}function eu(h){return Lt=p>0&&!!h,ft&&(ft.checked=Lt),Sr(),Promise.resolve(Lt)}function tu(h){mt=!!h,Yn&&(Yn.checked=mt);let x=document.getElementById("aa-country-region-legend");return x&&(x.hidden=!mt),mt&&ve&&(ve.open=!0),Sr(),Promise.resolve(mt)}function Kl(){Oe&&(Oe.visible=!w&&rt==="wireframe"),lt&&(lt.visible=!w&&rt==="solid"),Qe&&(Qe.visible=w),dt&&(dt.visible=w),Ce.forEach(h=>{h.disabled=w}),Aa(),$&&($.textContent=w?"\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u672C\u53E3\u5F84\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684 Pareto \u70B9\uFF0C\u8868\u793A\u6700\u9AD8\u53EF\u8FBE\u667A\u80FD\uFF1B\u4E0D\u53EF\u8FBE\u533A\u7559\u767D\u3002":"\u76F8\u90BB Pareto \u70B9\u7684 Delaunay \u63D2\u503C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\uFF1B\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002",pu()),Ut()}function nu(h){return["wireframe","solid","hidden"].includes(h)?(rt=h,Ce.forEach(x=>{x.setAttribute("aria-pressed",x.dataset.frontierStyle===rt?"true":"false")}),Kl(),Promise.resolve(!0)):Promise.resolve(!1)}function iu(h){return h&&ne.achievable_frontier_geometry_kind!=="exact_budget_steps"?Promise.resolve(!1):(w=!!h,B&&(B.checked=w),Kl(),Promise.resolve(w))}function ep(){let h=ne.initial_camera_configuration,x=h.eye,b=h.center;P.position.set(x.x*2.2,x.y*2.2,x.z*2.2),U.target.set(b.x,b.y,b.z),U.update()}function Er(h){let x=h.creator||h.lineage_family_key?.split("||")[0];if(x&&!Kh(x)||At&&!_n(h))return!1;if(!h.kept)return!0;let b=Q.findIndex(T=>h.model_uuid?T.model_uuid===h.model_uuid:T.name===h.name);return b>=0&&Ft(b)}function su(){ke.forEach((h,x)=>{let b=Ft(x)&&(Ne(Q[x])||k===x);for(let T of[h.logoSprite,h.backplateSprite,h.countryRegionSprite,h.paretoRingSprite,h.pinnedRingSprite,h.standoutHaloSprite])T&&(T.userData.normalMaterial||(T.userData.normalMaterial=T.material,T.userData.normalRenderOrder=T.renderOrder),b&&!T.userData.foregroundMaterial&&(T.userData.foregroundMaterial=T.userData.normalMaterial.clone(),T.userData.foregroundMaterial.depthTest=!1,T.userData.foregroundMaterial.depthWrite=!1),T.material=b?T.userData.foregroundMaterial:T.userData.normalMaterial,T.renderOrder=b?91+T.userData.normalRenderOrder/10:T.userData.normalRenderOrder)}),Oe&&(Oe.material.opacity=k!==null||q!==null?.25:.9)}function wr(){En(J),ue=[],st=null,tt=null,It=null;let h=new Set(Q.filter((H,le)=>Ne(H)&&Ft(le)).map(H=>H.lineage_key).filter(Boolean));j&&h.add(j);let x=[],b=new Set;function T(H,le,ce="previous_generation"){let me=pe(H);if(H.kept||b.has(me)||!Er(H))return;b.add(me);let be=new bs(Yl);be.position.copy(wn(H)),br(be,Pe.prunedLineageAncestor),be.renderOrder=90,be.userData={sharedMaterial:!0,interactionTargetKind:"pruned_lineage_ancestor",lineageKey:le,cssPixelSize:Pe.prunedLineageAncestor,prunedLineageAncestorNode:{...H,relationship_kind:ce}},J.add(be),ue.push(be)}h.forEach(H=>{let le=Je[H]||[];le.forEach(ce=>T(ce,H));for(let ce=1;ce<le.length;ce+=1){let me=le[ce-1],be=le[ce];!Er(me)||!Er(be)||x.push(wn(me),wn(be))}}),x.length&&(st=Jn(x,4674921,3),J.add(st));let O=k===null?null:Q[k];if(O?.lineage_family_key&&!Je[O.lineage_key]){let le=Object.entries(Je).flatMap(([ce,me])=>me.map(be=>({key:ce,node:be}))).filter(({node:ce})=>ce.lineage_family_key===O.lineage_family_key&&ce.base_model_name===O.base_model_name&&Er(ce)).sort((ce,me)=>me.node.reasoning_level_sort_order-ce.node.reasoning_level_sort_order)[0];le&&(It=Jn([Mt(O.x,O.y,O.z),wn(le.node)],4674921,3,!0),J.add(It),T(le.node,le.key,"same_generation_reasoning_variant"))}let V=new Set(Q.filter((H,le)=>Ne(H)&&Ft(le)).map(H=>H.base_model_name));fe&&V.add(fe);let ae=[];V.forEach(H=>{let le=Re[H]||_e[H]||[];for(let ce=1;ce<le.length;ce+=1)if(!(!Ft(le[ce-1])||!Ft(le[ce])))for(let me of[le[ce-1],le[ce]]){let be=Q[me];ae.push(Mt(be.x,be.y,be.z))}}),ae.length&&(tt=Jn(ae,11024042,3.5),J.add(tt)),su(),tp(),Ut()}function tp(){yi.replaceChildren(...ue.flatMap((h,x)=>{let b=bt(h.userData.prunedLineageAncestorNode);if(!b)return[];let T=Le("span","aa-lineage-overflow-direction-label",b);return T.dataset.ancestorIndex=String(x),[T]})),ru()}function ru(){for(let h of yi.children){let x=ue[Number(h.dataset.ancestorIndex)];if(!x){h.hidden=!0;continue}let b=x.position.clone().project(P);h.hidden=Math.abs(b.z)>1||Math.abs(b.x)>1||Math.abs(b.y)>1,h.style.left=`${Math.max(0,Math.min(d.clientWidth-h.offsetWidth,(b.x+1)*d.clientWidth/2+10))}px`,h.style.top=`${Math.max(0,Math.min(d.clientHeight-h.offsetHeight,(1-b.y)*d.clientHeight/2+10))}px`}}function jl(){return oe.cost_axis_unit||a.cost_metric_definitions?.[c.split("__")[0]]?.unit||"USD"}function np(h){let x=h.panel||{},b=_n(h),T=(V,ae)=>`<section class="aa-tooltip-section"><b>${V}</b><br>${ae.join("<br>")}</section>`,O=[["cost_to_run","\u6709\u6548\u8FD0\u884C\u6210\u672C","USD"],["blended_price_cache_input_output_7_to_2_to_1","7:2:1 \u6DF7\u5408\u5355\u4EF7","USD/M tokens"],["eff_speed","\u6709\u6548\u901F\u5EA6","tok/s"],["output_speed","\u539F\u59CB\u901F\u5EA6","tok/s"]].filter(([V])=>![oe.cost_axis_field,oe.speed_axis_field].includes(V));return T("\u6A21\u578B\u8EAB\u4EFD",[`<strong>${cn(h.name)}</strong>`,`${cn(h.creator)} \xB7 ${cn(h.reasoning_level_label||h.tier||"\u6863\u4F4D\u672A\u8BB0\u5F55")}`,`\u53D1\u5E03\uFF1A${cn(x.release_date||"\u672A\u8BB0\u5F55")}`])+T("\u5750\u6807\u4E0E\u5907\u7528\u53E3\u5F84",[`\u667A\u80FD\u6307\u6570\uFF1A${tn(x.intelligence)}`,`${cn(oe.speed_axis_label)}\uFF1A${tn(x[oe.speed_axis_field])} tok/s`,`${cn(oe.cost_axis_label)}\uFF1A${tn(x[oe.cost_axis_field])} ${cn(jl())}`,...O.map(([V,ae,H])=>`${ae}\uFF1A${tn(x[V])} ${H}`),`\u5197\u957F\u5EA6\uFF1A${tn(x.output_mtokens)} M tokens`])+T("\u524D\u6CBF\u4E0E\u7A81\u51FA\u5EA6",[b?`\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A${tn(x.layer)}`:"\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A\u4E0D\u53C2\u4E0E\uFF08\u5386\u53F2\u53E3\u5F84\uFF09",`${cn(ls[D].label)}\uFF1A${tc(cu(h))}`,`\u7A81\u51FA\u5EA6\u540D\u6B21\uFF1A${Ae[h.name]?`${Ae[h.name]} / ${bi().length}`:"\u672A\u53C2\u4E0E\u524D\u6CBF\u6392\u884C"}`,...b?[]:[cn(Zl(h))]])}function ip(h){let x=bt(h);return[`<strong>${cn(h.name)}</strong>`,h.relationship_kind==="same_generation_reasoning_variant"?"\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A":"\u8C31\u7CFB\u524D\u8EAB \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A",`\u53D1\u5E03\uFF1A${cn(h.release_date)}`,`\u667A\u80FD\u6307\u6570\uFF1A${tn(h.intelligence)}`,`${cn(oe.speed_axis_label)}\uFF1A${tn(h.y)} tok/s`,`${cn(oe.cost_axis_label)}\uFF1A${tn(h.x)} ${cn(jl())}`,...x?[`\u7BB1\u58C1\u5939\u7D27\uFF1A${cn(x)}\uFF1B\u4EE5\u4E0A\u6570\u503C\u4FDD\u7559\u539F\u503C\u3002`]:[]].join("<br>")}function cn(h){let x=document.createElement("span");return x.textContent=String(h),x.innerHTML}function Vy(h,x=1){return h==null||!Number.isFinite(Number(h))?"?":Number(h).toFixed(x)}function Tr(h,x){if(h===k&&q===null){x&&!Ke.hidden&&Ds(x);return}if(k=h,q=null,h===null){j=null,fe=null,Ke.hidden=!0,wr();return}let b=Q[h];j=b.lineage_key,fe=b.base_model_name,Ke.innerHTML=np(b),Ke.hidden=!1,Ds(x||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),wr()}function sp(h,x,b){if(q===x.name&&j===h){b&&!Ke.hidden&&Ds(b);return}k=null,q=x.name,j=h,fe=null,Ke.innerHTML=ip(x),Ke.hidden=!1,Ds(b||{clientX:f.getBoundingClientRect().left,clientY:f.getBoundingClientRect().top}),wr()}function Ds(h){Fi={clientX:h.clientX,clientY:h.clientY};let x=f.getBoundingClientRect();Ke.style.maxHeight=`${Math.max(0,x.height-16)}px`;let b=Ke.getBoundingClientRect(),T=Math.min(h.clientX-x.left+14,x.width-b.width-8),O=Math.min(h.clientY-x.top+14,x.height-b.height-8);Ke.style.left=`${Math.max(8,T)}px`,Ke.style.top=`${Math.max(8,O)}px`}function rp(h,x){if(qn=null,lu(h,x,!1),!h)return;qn=h.interactionTargetKind==="displayed_model"?Q[h.modelIndex]:h.prunedLineageAncestorNode,Ke.classList.add("is-touch-details"),Ke.setAttribute("role","dialog"),Ke.setAttribute("aria-label","\u6A21\u578B\u8BE6\u60C5");let b=Le("div","aa-touch-details-actions");if(h.interactionTargetKind==="displayed_model"){let O=()=>Be(qn.base_model_name)?"\u53D6\u6D88\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D":"\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D",V=Le("button","aa-secondary-button",O());V.type="button",V.addEventListener("click",()=>{Ea(qn.base_model_name),V.textContent=O()}),b.append(V)}let T=Le("button","aa-secondary-button","\u5173\u95ED\u8BE6\u60C5");T.type="button",T.addEventListener("click",zn),b.append(T),Ke.append(b),Ds(x)}function au(){return[...ge,...ue].filter(h=>h.visible)}function Ar(h,x){let b=y.domElement.getBoundingClientRect();W.x=(h-b.left)/b.width*2-1,W.y=-((x-b.top)/b.height)*2+1,F.setFromCamera(W,P);let T=F.intersectObjects(au(),!1),O=T.filter(V=>!V.object.material.depthTest);return O.sort((V,ae)=>ae.object.renderOrder-V.object.renderOrder||V.distance-ae.distance),(O[0]||T[0])?.object.userData||null}function ou(h){return Ar(h.clientX,h.clientY)}let ap=400,op=25,li=null,Ns=null,Cr=!1,Mi=null,Bn=null,Us=null,Fs=!1;function Ql(){Us!==null&&window.clearTimeout(Us),Us=null}function zn(){qn=null,Ke.classList.remove("is-touch-details"),Ke.removeAttribute("role"),Ql(),Bn!==null&&window.cancelAnimationFrame(Bn),Bn=null,Tr(null)}function lu(h,x,b=!0){if(!h){if(b&&(k!==null||q!==null)){Us===null&&(Us=window.setTimeout(()=>{Us=null,Tr(null)},ap));return}zn();return}Ql(),h.interactionTargetKind==="displayed_model"?Tr(h.modelIndex,x):sp(h.lineageKey,h.prunedLineageAncestorNode,x)}function ec(h=!1){if(qn||Fs||!Mi||y.getContext().isContextLost())return;let{clientX:x,clientY:b}=Mi,T=y.domElement.getBoundingClientRect();x<T.left||x>T.right||b<T.top||b>T.bottom||lu(Ar(x,b),Mi,h)}U.addEventListener("start",()=>{Fs=!0,li||zn()}),U.addEventListener("end",()=>{Fs=!1,Bn!==null&&window.cancelAnimationFrame(Bn),Bn=window.requestAnimationFrame(()=>{Bn=null,ec()})}),U.addEventListener("change",()=>{zn(),Fs||(Bn=window.requestAnimationFrame(()=>{Bn=null,ec()}))}),y.domElement.addEventListener("pointerdown",h=>{if(h.button!==0)return;Mr=h.pointerType;let x=ou(h);li={pointerId:h.pointerId,pointerType:h.pointerType,clientX:h.clientX,clientY:h.clientY,interactionTargetForDetails:x,displayedModelForClickPinToggle:x?.interactionTargetKind==="displayed_model"?Q[x.modelIndex]:null},Ns=null,Mi={clientX:h.clientX,clientY:h.clientY},Cr=!1},{capture:!0}),y.domElement.addEventListener("pointermove",h=>{li?.pointerId===h.pointerId&&(h.clientX-li.clientX)**2+(h.clientY-li.clientY)**2>=op&&(Cr=!0,zn()),h.pointerType!=="touch"&&(Mi={clientX:h.clientX,clientY:h.clientY},!(Fs||Bn!==null)&&(Bn=window.requestAnimationFrame(()=>{Bn=null,ec(!0)})))});function lp(h){li?.pointerId===h.pointerId&&(Ns=li,li=null,h.pointerType==="touch"&&!Cr&&(Mi=null,rp(Ns.interactionTargetForDetails,h)))}y.domElement.addEventListener("pointerup",lp),y.domElement.addEventListener("pointercancel",h=>{li?.pointerId===h.pointerId&&(li=null),Ns=null,Mi=null,zn()}),y.domElement.addEventListener("pointerleave",h=>{qn||(Mi=null,zn())}),y.domElement.addEventListener("click",h=>{let x=Ns;if(Ns=null,Mr==="touch"||x?.pointerType==="touch"||h.pointerType==="touch")return;if(Cr){Cr=!1;return}let b=x?null:ou(h),T=x?x.displayedModelForClickPinToggle:b?.interactionTargetKind==="displayed_model"?Q[b.modelIndex]:null;T&&Ea(T.base_model_name)});function Sa(){ke.forEach((h,x)=>{let b=Q[x];h.pinnedRingSprite.visible=Ft(x)&&Ne(b)}),wr(),sc(),vu(),Ut()}function Ea(h){return Ve(h,!Be(h))}function cp(h,x=!0){x?K.add(pe(h)):K.delete(pe(h)),Ee(),Sa(),ds()}function hp(h){let x=ls[D]?.modelMetricFieldName,b=h?.standout_metrics?.[x];return typeof b=="number"&&Number.isFinite(b)?b:NaN}function cu(h){return!h||!_n(h)?NaN:Object.prototype.hasOwnProperty.call(se,h.name)?se[h.name]:hp(h)}function tc(h){return D===os.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Number.isFinite(h)&&ye>0?`${tn(h/ye*100)}%`:"\u672A\u8BB0\u5F55":tn(h)}function bi(){return Q.filter(h=>h.panel?.layer===1&&[h.x,h.y,h.z].every(Is))}function us(){let h=bi(),x=D===os.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Hh(h,de):null;ye=x?.completeFrontierHypervolume??null;let b=x?.contributions||kf(h,D,de),T=b.filter(Number.isFinite);se={},h.forEach((O,V)=>{let ae=b[V];se[O.name]=ae;let H=ke[ot[O.name]];if(!H)return;let le=Number.isFinite(ae),ce=le&&T.length>1?(T.filter(nt=>nt<ae).length+(T.filter(nt=>nt===ae).length-1)/2)/(T.length-1):.5,me=H.standoutHaloSprite,be=le?ql:Zh;me.userData.foregroundMaterial?.dispose(),me.userData.foregroundMaterial=null,me.userData.normalMaterial=be,me.userData.normalRenderOrder=15,me.material=be;let We=Pe;br(me,le?We.standoutHaloMinimum+ce*(We.standoutHaloMaximum-We.standoutHaloMinimum):We.missingStandoutHalo)}),Ae={},h.map((O,V)=>({model:O,value:b[V]})).filter(O=>Number.isFinite(O.value)).sort((O,V)=>V.value-O.value).forEach((O,V)=>{Ae[O.model.name]=V+1}),su(),up(h,b),rc(),Ut()}function up(h,x){if(!Ze)return;let b=h.map((T,O)=>({model:T,value:x[O]})).sort((T,O)=>{let V=Number.isFinite(T.value)?T.value:-1/0;return(Number.isFinite(O.value)?O.value:-1/0)-V}).slice(0,12);Ze.replaceChildren(...b.map((T,O)=>{let V=document.createElement("button");V.type="button",V.className="aa-ranking-row",V.addEventListener("click",()=>cp(T.model)),V.setAttribute("aria-label",`\u56FA\u5B9A ${T.model.name}`);let ae=ot[T.model.name];Ft(ae)||(V.classList.add("is-hidden-by-current-filter"),V.title="\u5DF2\u88AB\u5F53\u524D\u7B5B\u9009\u9690\u85CF\uFF0C\u540D\u6B21\u4ECD\u6309\u5168\u96C6\u8BA1\u7B97");let H=document.createElement("span");H.className="aa-truncate",H.textContent=`${O+1}. ${T.model.name}`;let le=document.createElement("b");return le.className="aa-ranking-value",le.textContent=tc(T.value),le.title=ye===null?`\u539F\u59CB\u503C\uFF1A${T.value}`:`\u6392\u4ED6\u8D21\u732E ${T.value} \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF ${ye}`,V.append(H,le),V}))}function hu(h){return ls[h]?(D=h,He&&(He.value=h),ac(),us(),Promise.resolve(!0)):Promise.resolve(!1)}function uu(h,x,b){de={intelligence:va(h,de.intelligence),cost:va(x,de.cost),speed:va(b,de.speed)},Fe&&Object.entries(de).forEach(([T,O])=>{let V=Fe[T];V.slider.value=String(Math.log2(O)),V.number.value=O.toFixed(2)}),us()}function du(h,x){let b=o[h];if(!b)return!1;Mi=null,zn();let T=P.position.clone(),O=P.quaternion.clone(),V=U.target.clone();return c=h,Z=b,ne=Z.three_dimensional_scene,oe=Z.interaction_relationships,Ct=0,z=0,Ht=[],Q=ne.displayed_model_markers||[],_e=oe.base_groups||{},Re=oe.reasoning_variant_group_model_indices_by_base_model_name||{},Je=dp(oe.lineages||{}),ot={},Q.forEach((ae,H)=>{ot[ae.name]=H}),window.FRONTIER_3D_INTERACTION_RELATIONSHIPS={models:Q,base_groups:_e,reasoning_variant_group_model_indices_by_base_model_name:Re,lineages:Je,cost_axis_field:oe.cost_axis_field,speed_axis_field:oe.speed_axis_field},Q.forEach(ae=>ie.set(pe(ae),ae)),Ee(),ba(),Vf(),Qf(),Tr(null),x?(P.position.copy(T),P.quaternion.copy(O),U.target.copy(V),U.update()):ep(),wu(),Au(),Aa(),Mp(),sc(),ds(),us(),Ut(),!0}function dp(h){let x={};return Object.entries(h).forEach(([b,T])=>{let O=(Array.isArray(T)?T:[]).filter(V=>{if(!V?.lineage_family_key||!V?.reasoning_level_label)return!1;let ae=[V?.x,V?.y,V?.z].filter(H=>!Is(H)).length;return Ct+=ae,ae===0});O.length>=2&&(x[b]=O)}),x}function wa(h,x){let b=`${h}__${x}`;if(b===c)return Promise.resolve(!1);let T=du(b,!0);return T&&(Fn.value=h,On.value=x),Promise.resolve(T)}function Ta(h){let x=document.createElement("div");x.className="aa-toolbar-group";let b=document.createElement("span");return b.className="aa-toolbar-group-label",b.textContent=h,x.appendChild(b),x}function fu(h,x){let b=document.createElement("label");b.className="aa-toolbar-field";let T=document.createElement("span");return T.className="aa-toolbar-field-label",T.textContent=h,b.append(T,x),b}function fp(){let h=Ta("\u5750\u6807\u8F74\u53E3\u5F84");h.id="aa-metric-controls",Fn=document.createElement("select"),Fn.id="aa-cost-metric-select",Object.entries(a.cost_metric_definitions).forEach(([V,ae])=>{let H=document.createElement("option");H.value=V,H.textContent=ae.label,Fn.appendChild(H)}),On=document.createElement("select"),On.id="aa-speed-metric-select",Object.entries(a.speed_metric_definitions).forEach(([V,ae])=>{let H=document.createElement("option");H.value=V,H.textContent=ae.label,On.appendChild(H)});let[x,b]=c.split("__");Fn.value=x,On.value=b,Fn.addEventListener("change",()=>wa(Fn.value,On.value)),On.addEventListener("change",()=>wa(Fn.value,On.value)),h.append(fu("\u6210\u672C",Fn),fu("\u901F\u5EA6",On));let T=Le("button","aa-secondary-button","\u53E3\u5F84\u8BF4\u660E");T.id="aa-metric-explanation-button",T.type="button",T.addEventListener("click",()=>Rr(!0));let O=Le("button","aa-secondary-button","\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2");return O.id="aa-orthogonal-decomposition-preset",O.type="button",O.title="\u5207\u6362\u81F3 7:2:1 \u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u4FDD\u6301\u76F8\u673A",O.addEventListener("click",()=>wa("blended","raw")),h.append(T,O),h}function pp(){let h=Ta("\u6A21\u578B\u6807\u8BC6");h.id="aa-model-identity-controls";let x=document.createElement("span");x.className="aa-model-identity-logo-status",x.textContent="\u5382\u5546 Logo";let b=document.createElement("label");b.className="aa-toggle-row",Yn=document.createElement("input"),Yn.id="aa-country-region-marker-toggle",Yn.type="checkbox",Yn.checked=mt,Yn.addEventListener("change",()=>tu(Yn.checked)),b.append(Yn,document.createTextNode("\u663E\u793A\u56FD\u522B\u5916\u6846"));let T=document.createElement("label");T.className="aa-toggle-row",T.title="\u9690\u85CF\u672C\u53E3\u5F84\u4E0B\u7528\u5230\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u6210\u672C\u6216\u5197\u957F\u5EA6\u7684\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF08\u865A\u7EBF\u5E95\u677F\uFF09\uFF1B\u9690\u85CF\u540E\u5B83\u4EEC\u4E5F\u4E0D\u53EF\u60AC\u505C\u6216\u70B9\u9009",$n=document.createElement("input"),$n.id="aa-show-only-current-intelligence-index-version-comparable-models-toggle",$n.type="checkbox",$n.checked=At,$n.addEventListener("change",()=>Qh($n.checked)),T.append($n,document.createTextNode("\u4EC5\u5F53\u671F\u53EF\u6BD4"));let O=document.createElement("label");O.className="aa-toggle-row",O.title="\u4EC5\u63A7\u5236\u53EA\u56E0\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u624D\u4FDD\u7559\u7684\u70B9\uFF1B\u4E0D\u91CD\u7B97\u5206\u6790\u3001\u5750\u6807\u8303\u56F4\u6216\u76F8\u673A",ft=document.createElement("input"),ft.id="aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle",ft.type="checkbox",ft.checked=Lt,ft.disabled=!(p>0),ft.addEventListener("change",()=>eu(ft.checked));let V=p===null?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":p===0?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u751F\u6210\u65F6\u5DF2\u5173\u95ED":`\u663E\u793A\u8FD1 ${p} \u4E2A\u6708\u53D1\u5E03\u7684\u8FDC\u79BB\u524D\u6CBF\u6A21\u578B`;O.append(ft,document.createTextNode(V)),h.append(x,b,T,O);let ae=Le("label","aa-marker-size-control","\u6807\u8BB0\u5C3A\u5BF8 ");return nn=document.createElement("input"),nn.id="aa-marker-size-slider",nn.type="range",nn.min="0.5",nn.max="1.5",nn.step="0.05",nn.value=String(Xn),nn.setAttribute("aria-label","\u6807\u8BB0\u5C3A\u5BF8\u500D\u6570\uFF0C1 \u500D\u5BF9\u5E94 Logo 22 \u50CF\u7D20"),Ui=Le("output","",`${tn(Xn)}\xD7`),Ui.htmlFor=nn.id,nn.addEventListener("input",()=>Jh(Number(nn.value))),ae.append(nn,Ui),h.append(ae),h}function pu(){let h=w?"\u7CBE\u786E\u53EF\u8FBE\u9762":"\u975E\u5E15\u7D2F\u6258\u9762",x=$.hidden?"\u5C55\u5F00":"\u6536\u8D77";G.textContent=h,G.setAttribute("aria-label",`${x}\u51E0\u4F55\u8BF4\u660E\uFF1A${h}`),G.title=`${x}\u51E0\u4F55\u8BF4\u660E\uFF1B\u5C55\u5F00\u540E\u4E00\u5206\u949F\u81EA\u52A8\u6536\u8D77`}function nc(h){window.clearTimeout(Y),$.hidden=!h,G.setAttribute("aria-expanded",String(h)),pu(),h&&(Y=window.setTimeout(()=>nc(!1),6e4))}function mp(){let h=Ta("\u524D\u6CBF\u63CF\u7ED8");h.classList.add("aa-frontier-geometry-controls");let x=document.createElement("div");x.className="aa-segmented-control",Ce=[["wireframe","\u53C2\u7167\u7EBF\u6846"],["solid","\u53C2\u7167\u5B9E\u5FC3"],["hidden","\u9690\u85CF\u53C2\u7167"]].map(([O,V])=>{let ae=document.createElement("button");return ae.type="button",ae.textContent=V,ae.dataset.frontierStyle=O,ae.setAttribute("aria-pressed",O===rt?"true":"false"),ae.addEventListener("click",()=>nu(O)),x.appendChild(ae),ae});let b=document.createElement("label");b.className="aa-toggle-row",B=document.createElement("input"),B.id="aa-achievable-surface-toggle",B.type="checkbox",B.setAttribute("aria-describedby","aa-frontier-geometry-explanation"),B.addEventListener("change",()=>iu(B.checked)),b.append(B,document.createTextNode("\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09")),$=Le("p","aa-frontier-geometry-explanation"),$.id="aa-frontier-geometry-explanation",$.setAttribute("role","status"),G=document.createElement("button"),G.id="aa-frontier-geometry-explanation-toggle",G.className="aa-frontier-geometry-explanation-toggle",G.type="button",G.setAttribute("aria-controls",$.id),G.addEventListener("click",()=>nc($.hidden));let T=document.createElement("div");return T.className="aa-frontier-geometry-toggle-and-explanation",T.append(b,G,$),h.append(x,T),nc(!0),h}function gp(){let h=Ta("\u7A81\u51FA\u5EA6\u53E3\u5F84");return He=document.createElement("select"),He.id="aa-standout-metric-select",He.setAttribute("aria-label","\u7A81\u51FA\u5EA6\u6307\u6807"),Object.entries(ls).forEach(([x,b])=>{let T=document.createElement("option");T.value=x,T.textContent=b.label,He.appendChild(T)}),He.value=D,He.addEventListener("change",()=>hu(He.value)),h.appendChild(He),h}function ic(h,x){let b=document.createElement("section");if(b.className="aa-control-section",b.id=h,x){let T=document.createElement("h2");T.className="aa-section-title",T.textContent=x,b.appendChild(T)}return b}function _p(){let h=ic("aa-search-panel","\u641C\u7D22\u4E0E\u56FA\u5B9A");return Me=document.createElement("input"),Me.id="aa-search-input",Me.className="aa-search-input",Me.type="search",Me.placeholder="\u641C\u7D22\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D",Me.setAttribute("aria-label","\u641C\u7D22\u6A21\u578B\u3001\u57FA\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D"),Me.setAttribute("role","combobox"),Me.setAttribute("aria-expanded","false"),Me.setAttribute("aria-controls","aa-search-results"),Me.setAttribute("aria-autocomplete","list"),De=Le("div","aa-search-results"),De.id="aa-search-results",De.setAttribute("role","region"),De.setAttribute("aria-label","\u6A21\u578B\u641C\u7D22\u7ED3\u679C"),Me.addEventListener("input",()=>{Un=-1,ds()}),h.addEventListener("keydown",x=>{let b=[...De.querySelectorAll("button")];x.key==="Escape"?(x.preventDefault(),Me.value="",ds(),Me.focus()):["ArrowDown","ArrowUp"].includes(x.key)&&b.length?(x.preventDefault(),Un=Un<0?x.key==="ArrowDown"?0:b.length-1:(Un+(x.key==="ArrowDown"?1:b.length-1))%b.length,b.forEach((T,O)=>T.classList.toggle("is-keyboard-active",O===Un)),Me.setAttribute("aria-activedescendant",b[Un].id),b[Un].scrollIntoView({block:"nearest"})):x.key==="Enter"&&x.target===Me&&b.length&&(x.preventDefault(),b[Math.max(0,Un)]?.click())}),h.append(Me,De),h}function mu(h){let x=[...Q.map((b,T)=>({...b,displayedModelIndex:T})),...(Z?.excluded_models_with_drop_reason||[]).map(b=>{let T=b.model_uuid?ie.get(b.model_uuid):[...ie.values()].find(O=>O.name===b.name);return{...T,...b,base_model_name:b.base_model_name||T?.base_model_name||b.name}})];return Pf(x,h)}function xp(h){return mu(h).groups.map(x=>x.baseModelName)}function ds(){if(!De||!Me)return;let{groups:h,totalGroupCount:x}=mu(Me.value),b=!!Me.value.trim(),T=Le("div","aa-search-result-summary",`\u627E\u5230 ${x} \u7EC4${x>40?"\uFF0C\u4EC5\u663E\u793A\u524D 40 \u7EC4":""}`);T.setAttribute("role","status"),De.replaceChildren(T,...h.map(({baseModelName:O,models:V},ae)=>{let H=V.filter(be=>be.displayedModelIndex!==void 0&&!ke[be.displayedModelIndex]?.hasNonFiniteContractCoordinate),le=document.createElement(H.length?"button":"div");le.className="aa-result-row",le.dataset.baseModelName=O,H.length&&(le.type="button",le.classList.add("aa-search-result-pin-button"),le.id=`aa-search-result-action-${ae}`,le.addEventListener("click",()=>Ea(O))),xe.has(O)&&le.classList.add("is-pinned");let ce=Le("span","aa-search-result-name",O),me=V.slice().sort(kh).map(be=>{let We=be.reasoning_level_label||be.name;if(be.displayedModelIndex===void 0)return`${We}\uFF1A\u672A\u4E0A\u56FE\uFF0C${be.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807"}${be.missing_dimension_names?.length?`\uFF08\u7F3A\u5C11 ${be.missing_dimension_names.join("\u3001")}\uFF09`:""}`;let nt=Jl(be.displayedModelIndex);return nt.length&&le.classList.add("is-hidden-by-model-visibility-filter"),nt.includes("\u4EC5\u5F53\u671F\u53EF\u6BD4")&&le.classList.add("is-hidden-by-comparable-only-toggle"),`${We}\uFF1A${nt.length?`\u7B5B\u9009\u9690\u85CF\uFF08${nt.join("\u3001")}\uFF09`:"\u5DF2\u4E0A\u56FE"}${_n(be)?"":`\uFF1B${Zl(be)}`}`});return V.filter(be=>be.displayedModelIndex!==void 0).every(be=>!Ft(be.displayedModelIndex))&&le.classList.add("is-hidden-by-current-filter"),le.title=me.join("\uFF1B"),ce.append(Le("span","aa-search-result-hidden-note",me.join("\uFF1B"))),le.append(ce),H.length&&le.append(Le("span","aa-search-result-action-label",Be(O)?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A")),le})),De.style.display=b?"block":"none",Me.setAttribute("aria-expanded",String(b)),Me.removeAttribute("aria-activedescendant")}function yp(){let h=document.createElement("div");return h.id="aa-country-region-legend",h.className="aa-country-region-legend",h.hidden=!mt,[["china","\u4E2D\u56FD","\u53CC\u5706\u73AF"],["united-states","\u7F8E\u56FD","\u5706\u89D2\u65B9\u73AF"],["other","\u5176\u4ED6 / \u672A\u5206\u7C7B","\u83F1\u5F62\u73AF"]].forEach(([x,b,T])=>{let O=document.createElement("span");O.className="aa-country-region-legend-item",O.dataset.countryRegionCategory=x==="united-states"?"united_states":x,O.dataset.visibleCountryRegionModelCount="0";let V=document.createElement("span");V.className=`aa-country-region-swatch is-${x}`,V.setAttribute("aria-hidden","true"),O.append(V,document.createTextNode(`${b}\uFF08${T}\uFF09`)),O.append(Le("span","aa-country-region-visible-model-count"," \xB7 0")),h.appendChild(O)}),h}function vp(){return ve=document.createElement("details"),ve.id="aa-organization-filter-panel",ve.className="aa-control-section aa-collapsible-section",ve.open=!1,ve}function Mp(){if(!ve)return;let h=ve.open,x={};Q.forEach(V=>{x[V.creator]=(x[V.creator]||0)+1});let b=document.createElement("summary");b.className="aa-section-title aa-collapsible-summary",b.id="aa-organization-filter-count-summary",b.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}\uFF09`;let T=Object.keys(x).sort((V,ae)=>V.localeCompare(ae)).map(V=>{let ae=l[V],H=document.createElement("label");H.className="aa-organization-filter-row",H.dataset.creatorName=V;let le=document.createElement("input");le.type="checkbox",le.checked=!$e.has(V),le.addEventListener("change",()=>{le.checked?$e.delete(V):$e.add(V),Sr()});let ce=document.createElement("img");ce.className="aa-organization-logo-preview",ce.src=ae.logo_visualization_data_url,ce.alt="";let me=document.createElement("span");me.className="aa-truncate",me.textContent=V;let be=document.createElement("span");return be.className="aa-muted",be.dataset.visibleOrganizationModelCount="0",be.textContent=String(x[V]),H.append(le,ce,me,be),H}),O=document.createElement("div");O.className="aa-organization-filter-rows",O.append(...T),ve.replaceChildren(b,yp(),O),ve.open=h,gu()}function gu(){if(!ve)return;let h={},x={},b={};Q.forEach((O,V)=>{if(h[O.creator]=(h[O.creator]||0)+1,!Ft(V))return;x[O.creator]=(x[O.creator]||0)+1;let ae=["china","united_states"].includes(O.country_region_category)?O.country_region_category:"other";b[ae]=(b[ae]||0)+1}),ve.querySelectorAll(".aa-organization-filter-row").forEach(O=>{let V=x[O.dataset.creatorName]||0,ae=h[O.dataset.creatorName]||0,H=O.querySelector("[data-visible-organization-model-count]");H.dataset.visibleOrganizationModelCount=String(V),H.textContent=V===ae?String(ae):`${V}/${ae}`}),ve.querySelectorAll("[data-country-region-category]").forEach(O=>{let V=b[O.dataset.countryRegionCategory]||0;O.dataset.visibleCountryRegionModelCount=String(V),O.querySelector(".aa-country-region-visible-model-count").textContent=` \xB7 ${V}`});let T=ve.querySelector("#aa-organization-filter-count-summary");T&&(T.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}/${Object.keys(h).length}\uFF09`)}function bp(){return Se=ic("aa-pinned-panel","\u5DF2\u56FA\u5B9A"),Se}function _u(){return[...xe].flatMap(h=>[...K].map(x=>ie.get(x)).filter(x=>x?.base_model_name===h).sort(kh))}function xu(h){return Q.find(x=>pe(x)===pe(h))}function yu(h){let x=Q.findIndex(b=>pe(b)===pe(h));return x<0?`\u5F53\u524D\u53E3\u5F84\u672A\u4E0A\u56FE\uFF1A${(Z.excluded_models_with_drop_reason||[]).find(T=>T.model_uuid?T.model_uuid===h.model_uuid:T.name===h.name)?.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807\u6216\u5DF2\u88AB\u526A\u679D"}`:[...Jl(x),..._n(Q[x])?[]:[Zl(Q[x])]].join("\uFF1B")||"\u5F53\u671F\u53EF\u6BD4"}function sc(){if(!Se)return;let h=[...xe];Se.style.display=h.length?"block":"none";let x=Le("div","aa-pinned-header"),b=Le("h2","aa-section-title",`\u5DF2\u56FA\u5B9A\uFF08${K.size} \u6863\u4F4D\uFF09`),T=Le("button","aa-link-button","\u6E05\u7A7A\u5168\u90E8");T.id="aa-clear-all-pinned-models",T.type="button",T.addEventListener("click",()=>{K.clear(),Ee(),Sa(),ds()}),x.append(b,T);let O=Le("div","aa-pinned-list");h.forEach(V=>{let ae=Le("article","aa-pinned-card"),H=Le("div","aa-pinned-card-header"),le=Le("button","aa-link-button","\u79FB\u9664");le.type="button",le.setAttribute("aria-label",`\u79FB\u9664 ${V} \u7684\u5168\u90E8\u56FA\u5B9A\u6863\u4F4D`),le.addEventListener("click",()=>Ve(V,!1)),H.append(Le("b","aa-truncate",V),le),ae.append(H);for(let ce of _u().filter(me=>me.base_model_name===V)){let me=xu(ce),be=Le("div","aa-pinned-variant-card",`${ce.name} \xB7 \u667A\u80FD ${tn(me?.panel.intelligence??ce.panel.intelligence)} \xB7 ${ce.reasoning_level_label||"\u6863\u4F4D\u672A\u8BB0\u5F55"}`);be.dataset.modelIdentity=pe(ce);let We=yu(ce);be.append(Le("div","aa-pinned-model-status",We)),me||be.classList.add("is-hidden-by-current-filter"),me&&!_n(me)&&be.classList.add("is-historical-intelligence-index-version"),ce.model_uuid||be.append(Le("div","aa-muted","\u65E7\u5951\u7EA6\u7F3A\u5C11 UUID\uFF0C\u91CD\u65B0\u751F\u6210\u540E\u53EF\u6309\u7A33\u5B9A\u8EAB\u4EFD\u56FA\u5B9A")),ae.append(be)}O.append(ae)}),Se.replaceChildren(x,O),rc(),vu()}function Sp(){ln=document.createElement("details"),ln.id="aa-pinned-comparison-panel";let h=Le("summary","aa-section-title","\u5C55\u5F00\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4"),x=Le("fieldset","aa-comparison-field-controls");x.append(Le("legend","","\u53EF\u9009\u5B57\u6BB5\uFF08\u81EA\u52A8\u4FDD\u5B58\uFF09"));let b={output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"};for(let T of Ma){let O=Le("label","aa-checkbox-chip"),V=document.createElement("input");V.type="checkbox",V.checked=xi.has(T),V.dataset.comparisonField=T,V.addEventListener("change",()=>{V.checked?xi.add(T):xi.delete(T),bn(Dt,[...xi]),rc()}),O.append(V,document.createTextNode(b[T])),x.append(O)}qt=Le("div","aa-comparison-table-scroll-region"),qt.tabIndex=0,qt.setAttribute("aria-label","\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\u8868\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8"),ln.append(h,x,qt),Ru(qt),ln.addEventListener("toggle",()=>{ln.open&&window.matchMedia("(max-width: 1024px)").matches&&Ca(!0),Cu()}),u.append(ln)}function rc(){if(!ln||!Z)return;let h=_u();ln.hidden=h.length===0,ln.querySelector("summary").textContent=`\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\uFF08${h.length} \u6863\u4F4D\uFF09`;let x=h.map(xu),b=x.findIndex(ce=>ce&&_n(ce)&&[ce.x,ce.y,ce.z].every(Number.isFinite)),T=document.createElement("table");T.id="aa-pinned-comparison-table";let O=Le("caption","",b>=0?`\u0394% \u57FA\u51C6\uFF1A${h[b].name}\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u57FA\u51C6\u6216\u6700\u4F18\u503C\u9AD8\u4EAE\uFF1B\u96F6\u57FA\u51C6\u4E0D\u8BA1\u7B97\u767E\u5206\u6BD4\u3002`:"\u5F53\u524D\u53E3\u5F84\u6CA1\u6709\u53EF\u6BD4\u57FA\u51C6\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u6700\u4F18\u503C\u9AD8\u4EAE\u3002"),V=document.createElement("thead"),ae=document.createElement("tr");ae.append(Le("th","","\u6307\u6807")),h.forEach(ce=>{let me=Le("th","",ce.name);me.scope="col",me.dataset.modelIdentity=pe(ce),ae.append(me)}),V.append(ae);let H=[{field:"creator",label:"\u5382\u5546",identity:!0},{field:"reasoning_level_label",label:"\u63A8\u7406\u6863\u4F4D",identity:!0},{field:"release_date",label:"\u53D1\u5E03\u65E5\u671F",identity:!0},{field:"status",label:"\u5F53\u524D\u72B6\u6001",identity:!0},{field:"intelligence",label:"\u667A\u80FD\u6307\u6570",higherIsBetter:!0},{field:oe.cost_axis_field,label:oe.cost_axis_label,unit:jl(),higherIsBetter:!1},{field:oe.speed_axis_field,label:oe.speed_axis_label,unit:"tok/s",higherIsBetter:!0},{field:"layer",label:"\u5E15\u7D2F\u6258\u5C42\u7EA7",higherIsBetter:!1},{field:"standout",label:ls[D].label,higherIsBetter:!0},...[...xi].filter(ce=>![oe.cost_axis_field,oe.speed_axis_field].includes(ce)).map(ce=>({field:ce,label:{output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"}[ce],unit:ce==="output_mtokens"?"M tokens":["output_speed","eff_speed"].includes(ce)?"tok/s":ce==="cost_to_run"?"USD":"USD/M tokens",higherIsBetter:["output_speed","eff_speed"].includes(ce)}))],le=document.createElement("tbody");for(let ce of H){let me=document.createElement("tr");me.dataset.comparisonField=ce.field;let be=Le("th","",`${ce.label}${ce.unit?` (${ce.unit})`:""}`);be.scope="row",me.append(be);let We=h.map((Rt,xn)=>{if(ce.field==="status")return yu(Rt);if(ce.identity)return Rt[ce.field]??Rt.panel?.[ce.field]??"\u672A\u8BB0\u5F55";let St=x[xn];return St?ce.field==="standout"?cu(St):St.panel?.[ce.field]:null}),nt=We.filter((Rt,xn)=>x[xn]&&_n(x[xn])&&Number.isFinite(Rt)),xt=nt.length?ce.higherIsBetter?Math.max(...nt):Math.min(...nt):null;We.forEach((Rt,xn)=>{let St=document.createElement("td"),Tn=x[xn]&&_n(x[xn]);if(St.textContent=ce.identity?String(Rt):x[xn]?ce.field==="standout"?tc(Rt):tn(Rt):"\u5F53\u524D\u53E3\u5F84\u7F3A\u5E2D",!ce.identity&&Tn&&Number.isFinite(Rt)&&Rt===xt&&St.classList.add("is-best-comparable-value"),!ce.identity&&Tn&&b>=0){let uc=If(Rt,We[b]);uc!==null&&St.append(Le("span","aa-comparison-delta",` \u0394 ${uc>0?"+":""}${tn(uc)}%`))}Tn||St.classList.add("is-unavailable-for-comparison"),me.append(St)}),le.append(me)}T.append(O,V,le),qt.replaceChildren(T),Bi(qt)}function vu(){cs.replaceChildren(...Q.flatMap((h,x)=>{if(!Ne(h)||!Ft(x))return[];let b=Le("span","aa-pinned-model-name-label",h.name);return b.dataset.modelIndex=String(x),[b]})),Mu()}function Mu(){let h=[...cs.children],x=h.map((b,T)=>{let V=ke[Number(b.dataset.modelIndex)]?.logoSprite.position?.clone().project(P);return b.hidden=!1,{id:T,visible:V&&Math.abs(V.z)<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1,x:V?(V.x+1)*d.clientWidth/2+12*Xn:0,y:V?(1-V.y)*d.clientHeight/2:0,width:b.offsetWidth,height:b.offsetHeight}});for(let b of Lf(d.clientWidth,d.clientHeight,x)){let T=h[b.id];T.hidden=b.hidden,b.hidden||(T.style.left=`${b.x}px`,T.style.top=`${b.y}px`)}}function Ep(){let h=ic("aa-standout-panel","\u7A81\u51FA\u5EA6");h.append(gp());let x=Le("p","aa-weight-note");x.id="aa-standout-metric-description",h.append(x);let b=document.createElement("div");b.id="aa-standout-weight-controls",b.className="aa-weight-block",Fe={},[["intelligence","\u667A\u80FD"],["cost","\u6210\u672C"],["speed","\u901F\u5EA6"]].forEach(([V,ae])=>{let H=document.createElement("div");H.className="aa-weight-row";let le=document.createElement("span");le.textContent=ae;let ce=document.createElement("input");ce.type="range",ce.min="-2",ce.max="2",ce.step="0.05",ce.value="0",ce.id=`aa-weight-slider-${V}`;let me=document.createElement("input");me.type="number",me.min="0.25",me.max="4",me.step="0.05",me.value="1.00",me.className="aa-weight-number",me.id=`aa-weight-number-${V}`,me.setAttribute("aria-label",`${ae}\u7A81\u51FA\u5EA6\u6743\u91CD`),ce.setAttribute("aria-label",`${ae}\u7A81\u51FA\u5EA6\u6743\u91CD\u6ED1\u6746`),ce.addEventListener("input",()=>{de[V]=Math.pow(2,Number(ce.value)),me.value=de[V].toFixed(2),us()});let be=()=>{let We=va(me.value,de[V]);de[V]=We,me.value=We.toFixed(2),ce.value=String(Math.log2(We)),us()};me.addEventListener("blur",be),me.addEventListener("keydown",We=>{We.key==="Enter"&&(We.preventDefault(),be())}),H.append(le,ce,me),b.appendChild(H),Fe[V]={slider:ce,number:me}});let T=Le("button","aa-secondary-button","\u91CD\u7F6E\u4E09\u4E2A\u6743\u91CD\u4E3A 1");T.type="button",T.id="aa-reset-standout-axis-weights",T.addEventListener("click",()=>uu(1,1,1)),b.append(Le("p","aa-weight-note","\u6743\u91CD\u4EE5\u6307\u6570\u6539\u53D8\u5F52\u4E00\u5750\u6807\uFF0C\u4EC5\u5F71\u54CD\u52A0\u6743\u8D85\u4F53\u79EF\uFF1B\u5141\u8BB8 0.25\u20134\u3002\u7F16\u8F91\u6570\u5B57\u540E\u6309 Enter \u6216\u79FB\u51FA\u7126\u70B9\u63D0\u4EA4\u3002"),T);let O=document.createElement("h3");return O.className="aa-section-title",O.textContent="\u524D\u6CBF\u6392\u884C\uFF08\u524D 12 \u540D\uFF09",Ze=document.createElement("div"),Ze.id="aa-standout-ranking",Ze.className="aa-ranking-list",h.append(b,O,Ze),ac(),h}function ac(){let h=document.getElementById("aa-standout-metric-description");h&&(h.textContent={trend_residual:"\u8D8B\u52BF\u6B8B\u5DEE\uFF1A\u6A21\u578B\u667A\u80FD\u76F8\u5BF9\u524D\u6CBF\u6210\u672C\u4E0E\u901F\u5EA6\u8D8B\u52BF\u62DF\u5408\u7684\u504F\u79BB\uFF0C\u8D8A\u9AD8\u8D8A\u7A81\u51FA\u3002",intelligence_uplift:"\u667A\u80FD\u62AC\u5347\uFF1A\u4E0E\u5176\u4ED6\u524D\u6CBF\u53C2\u7167\u76F8\u6BD4\u7684\u667A\u80FD\u589E\u91CF\uFF1B\u7F3A\u5C11\u53C2\u7167\u65F6\u4E0D\u8BA1\u7B97\u3002",weighted_exclusive_hypervolume:"\u52A0\u6743\u8D85\u4F53\u79EF\u5360\u6BD4 = \u8BE5\u6A21\u578B\u7684\u6392\u4ED6\u8D21\u732E \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF\u3002\u6309\u539F\u59CB\u8D21\u732E\u6392\u5E8F\uFF0C\u7B5B\u9009\u4E0D\u6539\u53D8\u5206\u6BCD\u3002",frontier_distance:"\u5230\u524D\u6CBF\u5782\u8DDD\uFF1A\u6CBF\u7528\u5F53\u524D\u5206\u6790\u65B9\u6CD5\u7684\u51E0\u4F55\u8DDD\u79BB\uFF1B\u4E0D\u8868\u793A\u5B9E\u9645\u53EF\u8FBE\u7684\u65B0\u6A21\u578B\u3002"}[D]);let x=document.getElementById("aa-standout-weight-controls");x&&(x.hidden=!ls[D].usesAdjustableAxisWeights)}function wp(){return ct=document.createElement("details"),ct.id="aa-current-view-panel",ct.className="aa-control-section aa-current-view-details",ct.open=!0,ct}function bu(){return ne?.current_view||{}}function oc(){return Q.filter(h=>!_n(h)).length}function lc(){let h=m.current_intelligence_index_version;return h?`v${String(h).replace(/^v/i,"")}`:"\u7248\u672C\u672A\u77E5"}function Su(){let h=m.current_intelligence_index_version_source==="inferred_from_accepted_embedded_model_catalog_partition";return`${lc()}${h?"\uFF08\u6309\u76EE\u5F55\u5206\u533A\u63A8\u5B9A\uFF09":""}`}function Eu(){let h=m.artificial_analysis_api_response_fetched_at_utc;if(!h)return{headerText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5",detailText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5\uFF08\u5951\u7EA6\u672A\u8BB0\u5F55 API \u6293\u53D6\u65F6\u95F4\uFF09"};let x=m.artificial_analysis_api_response_fetched_at_utc_source==="inferred_from_cache_file_modification_time";return{headerText:`API \u6293\u53D6\u4E8E ${String(h).slice(0,10)}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":""}`,detailText:`${h}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":"\uFF08\u6293\u53D6\u65F6\u8BB0\u5F55\uFF09"}`}}function Tp(){let{rendererBundleSha256:h,generatorGitCommit:x,renderedAtUtc:b}=R,T=x.endsWith("-dirty"),O=x.replace(/-dirty$/,""),V=/^[0-9a-f]{40}$/.test(O)?O.slice(0,12):O;return[`bundle ${h.slice(0,12)}`,`commit ${V}${T?"-dirty":""}`,`\u6E32\u67D3 ${b}`].join(" \xB7 ")}function wu(){if(!ct||!ne)return;let h=bu(),x=document.createElement("summary");x.className="aa-section-title aa-collapsible-summary",x.textContent="\u5F53\u524D\u89C6\u56FE";let b=document.createElement("dl");b.className="aa-current-view-grid";let T=oc();[["\u6E32\u67D3\u5668","three.js"],["\u6570\u636E\u65E5\u671F",h.data_date||a.data_date||"?"],["\u667A\u80FD\u6307\u6570",lc()],["\u6210\u672C\u53E3\u5F84",h.cost_metric_label||oe.cost_axis_label],["\u901F\u5EA6\u53E3\u5F84",h.speed_metric_label||oe.speed_axis_label],["\u53EF\u89C1 / \u5951\u7EA6\u6A21\u578B\u6570",`${Q.filter((O,V)=>Ft(V)).length} / ${Q.length}`],["\u53C2\u4E0E\u5206\u6790\uFF08\u5951\u7EA6\u5168\u96C6\uFF09",String(Q.length-T)],["\u5386\u53F2\u53E3\u5F84\u70B9",String(T)],["\u5168\u5C40 Pareto \u6570",String(bi().length)],["\u53EF\u89C1 Pareto \u6570",String(bi().filter(O=>Ft(ot[O.name])).length)],["\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650",p===null?"\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":`${p} \u4E2A\u6708 \xB7 ${Lt?"\u663E\u793A":"\u9690\u85CF"}\u5BBD\u9650\u4E13\u5C5E\u70B9`],["\u5BBD\u9650\u4E13\u5C5E\u70B9",String(Q.filter(O=>O.displayed_only_because_of_recent_release_grace_period===!0).length)],["\u526A\u679D\u53C2\u8003\u65E5",h.pruning_reference_date||m.pruning_reference_date||"\u672A\u8BB0\u5F55"],["\u4EA7\u7269\u6307\u7EB9",Tp(),"aa-current-view-report-artifact-fingerprint"]].forEach(([O,V,ae])=>{let H=document.createElement("dt");H.textContent=O;let le=document.createElement("dd");le.textContent=V,ae&&(le.id=ae,le.title=[`renderer bundle sha256\uFF1A${R.rendererBundleSha256}`,`generator git commit\uFF1A${R.generatorGitCommit}`,`rendered at (UTC)\uFF1A${R.renderedAtUtc}`].join(`
`)),b.append(H,le)}),ct.replaceChildren(x,b)}function Le(h,x,b){let T=document.createElement(h);return x&&(T.className=x),b!==void 0&&(T.textContent=b),T}function Tu(h,x){let b=Le("a","aa-artificial-analysis-attribution-link",h);return x&&(b.id=x),b.href=I,b.target="_blank",b.rel="noopener noreferrer",b}function Ap(){if(!S)return;let h=S.querySelector("h1")||Le("h1","frontier-3d-report-title",document.title),x=Le("div","aa-report-header-metadata-row");x.id="aa-report-header-metadata-row",x.tabIndex=0,x.setAttribute("aria-label","\u6A21\u578B\u8BA1\u6570\u4E0E\u6570\u636E\u6765\u6E90\uFF0C\u7A84\u5C4F\u53EF\u6A2A\u5411\u6EDA\u52A8"),Ru(x);let b=Tu("\u6570\u636E\uFF1AArtificial Analysis","aa-report-header-artificial-analysis-attribution-link");b.append(Le("span","aa-external-link-glyph"," \u2197"));let T=Eu(),O=Le("span","aa-report-header-metadata-item",T.headerText);O.id="aa-report-header-artificial-analysis-api-fetch-date",O.title=T.detailText;let V=Le("span","aa-report-header-metadata-item",`\u667A\u80FD\u6307\u6570 ${Su()}`);V.id="aa-report-header-intelligence-index-version",hs=Le("span","aa-report-header-metadata-item"),hs.id="aa-report-header-model-count-summary",x.append(b,O,V,hs),Zn=Le("button","aa-how-to-read-drawer-toggle-button","\u5982\u4F55\u9605\u8BFB \u24D8"),Zn.type="button",Zn.id="aa-how-to-read-drawer-toggle",Zn.setAttribute("aria-expanded","false"),Zn.setAttribute("aria-controls","aa-how-to-read-drawer"),Zn.addEventListener("click",()=>Rr(M.hidden));let ae=Le("div","aa-report-header-title-row"),H=Le("div","aa-report-header-actions"),le=Le("button","aa-secondary-button","\u89C6\u56FE\u8BBE\u7F6E");le.type="button",le.id="aa-view-settings-toggle",le.setAttribute("aria-expanded","false"),le.setAttribute("aria-controls",g.id),le.addEventListener("click",()=>{let be=u.classList.toggle("is-view-settings-expanded");le.setAttribute("aria-expanded",String(be))}),H.append(Zn,le),ae.append(h,H);let ce=[ae,x],me=m.embedded_model_catalog_partition_rejection_warning_text;if(typeof me=="string"&&me.trim()){let be=Le("div","aa-report-header-data-quality-warning",`\u26A0 ${me}`);be.id="aa-report-header-embedded-model-catalog-partition-rejection-warning",be.setAttribute("role","alert"),ce.push(be)}S.replaceChildren(...ce)}function Au(){if(!hs)return;let h=Q.length,x=Q.filter((V,ae)=>Ft(ae)).length,b=oc(),T=[x===h?`\u663E\u793A ${h} \u4E2A\u6A21\u578B`:`\u663E\u793A ${x}/${h} \u4E2A\u6A21\u578B`,`\u5168\u5C40 Pareto ${bi().length}`,`\u53EF\u89C1 Pareto ${bi().filter(V=>Ft(ot[V.name])).length}`],O=Q.filter((V,ae)=>!_n(V)&&Ft(ae)).length;b&&T.push(`\u5386\u53F2\u53E3\u5F84 ${O===b?b:`${O}/${b}`}`),hs.textContent=T.join(" \xB7 "),Bi(document.getElementById("aa-report-header-metadata-row"))}function Cp(h){return h.scrollWidth-h.clientWidth>1&&h.scrollLeft+h.clientWidth<h.scrollWidth-1}function Bi(h){h&&h.classList.toggle("has-inline-overflow-fade",Cp(h))}function Cu(){Bi(document.getElementById("aa-report-header-metadata-row")),Bi(qt),window.requestAnimationFrame(()=>{Bi(document.getElementById("aa-report-header-metadata-row")),Bi(qt)})}function Ru(h){!h||h.dataset.horizontalOverflowFadeBound==="true"||(h.dataset.horizontalOverflowFadeBound="true",h.addEventListener("scroll",()=>Bi(h),{passive:!0}),Bi(h))}function Rp(){M=document.createElement("section"),M.id="aa-how-to-read-drawer",M.className="aa-how-to-read-drawer",M.setAttribute("aria-label","\u5982\u4F55\u9605\u8BFB\u672C\u56FE"),M.tabIndex=-1,M.hidden=!0,f.appendChild(M),document.addEventListener("keydown",h=>{h.key==="Escape"&&!M.hidden&&Rr(!1),h.key==="Escape"&&qn&&zn()})}function Rr(h){if(!M)return Promise.resolve(!1);let x=!!h,b=!M.hidden,T=M.contains(document.activeElement);return x&&Aa(),M.hidden=!x,Zn?.setAttribute("aria-expanded",String(x)),x&&!b?M.focus({preventScroll:!0}):!x&&b&&T&&Zn?.focus({preventScroll:!0}),Promise.resolve(x)}function zi(h,...x){let b=Le("section","aa-how-to-read-drawer-section");return b.append(Le("h3","aa-how-to-read-drawer-section-title",h),...x),b}function Aa(){if(!M||!ne)return;let h=bu(),x=ne.three_dimensional_axis_configuration||{},b=Le("div","aa-how-to-read-drawer-header"),T=Le("button","aa-link-button","\u5173\u95ED");T.type="button",T.id="aa-how-to-read-drawer-close-button",T.addEventListener("click",()=>Rr(!1)),b.append(Le("h2","aa-section-title","\u5982\u4F55\u9605\u8BFB"),T);let O=Le("ul","aa-how-to-read-drawer-list");[[`\u6210\u672C\u8F74 x\uFF1A${x.x_axis?.title_text||h.cost_metric_label||"\u6210\u672C"}\u3002\u8D8A\u4F4E\u8D8A\u597D\uFF08\u8D8A\u4FBF\u5B9C\uFF09\u3002`,h.cost_metric_note?`\u53E3\u5F84\uFF1A${h.cost_metric_note}`:""],[`\u901F\u5EA6\u8F74 y\uFF1A${h.speed_axis_title_text||x.y_axis?.title_text||h.speed_metric_label||"\u901F\u5EA6"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,h.speed_metric_note?`\u53E3\u5F84\uFF1A${h.speed_metric_note}`:""],[`\u667A\u80FD\u8F74 z\uFF1A${x.z_axis?.title_text||"\u667A\u80FD\u6307\u6570"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,""]].forEach(([We,nt])=>{let xt=Le("li","",We);nt&&xt.append(Le("div","aa-how-to-read-drawer-metric-note",nt)),O.appendChild(xt)});let V=oc(),ae=Le("p","aa-how-to-read-drawer-paragraph");ae.append(Le("span","aa-historical-intelligence-index-version-swatch"),document.createTextNode(`\u865A\u7EBF\u5E95\u677F\u3001\u534A\u900F\u660E Logo \u7684\u70B9\u662F\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF1A\u672C\u53E3\u5F84\u7528\u5230\u7684\u6210\u672C\u6216\u5197\u957F\u5EA6\u6765\u81EA\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\uFF08\u5F53\u671F\u4E3A ${lc()}\uFF09\u3002\u5B83\u4EEC\u7167\u5E38\u663E\u793A\uFF0C\u4F46\u4E0D\u53C2\u4E0E Pareto\u3001\u7A81\u51FA\u5EA6\u3001\u5F52\u4E00\u5316\u4E0E\u524D\u6CBF\u51E0\u4F55\u7684\u8BA1\u7B97\u3002\u5F53\u524D\u53E3\u5F84\u5171 ${V} \u4E2A\uFF1B\u52FE\u9009\u5DE5\u5177\u680F\u300C\u4EC5\u5F53\u671F\u53EF\u6BD4\u300D\u53EF\u9690\u85CF\u5B83\u4EEC\u3002`));let H=Le("dl","aa-current-view-grid"),le=m.embedded_model_catalog_intelligence_index_version,ce=m.embedded_model_catalog_captured_at_utc,me=m.artificial_analysis_website_page_fetch_paused,be=m.artificial_analysis_api_tier;[["\u6570\u636E\u63D0\u4F9B\u65B9",Tu("Artificial Analysis")],["API \u6293\u53D6",Eu().detailText],["\u667A\u80FD\u6307\u6570",`${Su()}${be?`\uFF08API ${be} tier\uFF09`:""}`],["\u5185\u5D4C\u6A21\u578B\u76EE\u5F55",le?`v${le}${ce?`\uFF0C\u7F13\u5B58\u4E8E ${ce}`:""}`:"\u672A\u8BB0\u5F55"],["\u7F51\u9875\u6293\u53D6",me===!0?"\u5DF2\u6682\u505C\uFF08\u53EA\u8BFB\u5DF2\u6709\u7F13\u5B58\uFF09":me===!1?"\u5DF2\u5F00\u542F":"\u672A\u8BB0\u5F55"],["\u526A\u679D\u53C2\u8003\u65E5",m.pruning_reference_date||"\u672A\u8BB0\u5F55"]].forEach(([We,nt])=>{let xt=document.createElement("dd");xt.append(nt),H.append(Le("dt","",We),xt)}),M.replaceChildren(b,zi("\u4E09\u4E2A\u5750\u6807\u8F74",O,Le("p","aa-how-to-read-drawer-paragraph","\u521D\u59CB\u89C6\u89D2\u4ECE\u300C\u4F4E\u6210\u672C\u3001\u9AD8\u901F\u5EA6\u3001\u9AD8\u667A\u80FD\u300D\u4E00\u89D2\u770B\u5411\u5BF9\u89D2\uFF1B\u62D6\u62FD\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u53F3\u952E\u62D6\u52A8\u5E73\u79FB\u3002")),zi("Pareto \u524D\u6CBF",Le("p","aa-how-to-read-drawer-paragraph","\u5E26\u6DF1\u8272\u5706\u73AF\u7684\u70B9\u662F\u672C\u53E3\u5F84\u7684 Pareto \u70B9\uFF1A\u6CA1\u6709\u5176\u4ED6\u6A21\u578B\u5728\u6210\u672C\u3001\u901F\u5EA6\u3001\u667A\u80FD\u4E0A\u540C\u65F6\u4E0D\u5DEE\u4E14\u81F3\u5C11\u4E00\u7EF4\u66F4\u597D\u3002\u9ED8\u8BA4\u7684 Delaunay \u90BB\u63A5\u63D2\u503C\u8FDE\u63A5\u8FD9\u4E9B\u70B9\uFF0C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\u3002\u52FE\u9009\u300C\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09\u300D\u53EF\u5207\u6362\u4E3A\u5DF2\u5C55\u793A\u5206\u6790\u70B9\u7684\u7CBE\u786E\u9884\u7B97\u53EF\u8FBE\u9762\u3002")),zi("\u5386\u53F2\u53E3\u5F84\u70B9",ae),zi("\u53E3\u5F84\u4E0E\u6B63\u4EA4\u5206\u89E3",Le("p","aa-how-to-read-drawer-paragraph",[...Object.values(a.cost_metric_definitions||{}).map(We=>We.description||`${We.label}\uFF1A${We.unit||"USD"}`),...Object.values(a.speed_metric_definitions||{}).map(We=>We.description||`${We.label}\uFF1A\u751F\u6210\u901F\u5EA6 tok/s`),"\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2\u91C7\u7528\u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u5206\u522B\u89C2\u5BDF\u5355\u4EF7\u3001\u541E\u5410\u4E0E\u667A\u80FD\u3002\u6709\u6548\u6210\u672C\u4E0E\u6709\u6548\u901F\u5EA6\u90FD\u53D7\u5230\u8F93\u51FA\u957F\u5EA6\u5F71\u54CD\u3002\u5207\u6362\u53E3\u5F84\u4FDD\u7559\u76F8\u673A\uFF0C\u56FA\u5B9A\u8F74\u57DF\u6765\u81EA\u8BE5\u53E3\u5F84\u5B8C\u6574\u663E\u793A\u96C6\u5408\uFF1B\u7B5B\u9009\u548C\u5BBD\u9650\u5F00\u5173\u4E0D\u6539\u53D8\u8F74\u57DF\u3002"].join(" "))),zi("\u56FE\u4F8B",Le("p","aa-how-to-read-drawer-paragraph",["\u6DF1\u8272\u73AF\uFF1A\u5E15\u7D2F\u6258\u8EAB\u4EFD\uFF1B\u91D1\u8272\u73AF\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\u5149\u6655\uFF1A\u5F53\u524D\u7A81\u51FA\u5EA6\u7684\u76F8\u5BF9\u5927\u5C0F\uFF0C\u865A\u7EBF\u5149\u6655\u8868\u793A\u7F3A\u5C11\u6570\u503C\u3002","\u7D2B\u8272\u5B9E\u7EBF\uFF1A\u540C\u4EE3\u63A8\u7406\u6863\u4F4D\uFF1B\u7070\u8272\u5B9E\u7EBF\uFF1A\u540C\u6863\u4F4D\u8DE8\u4EE3\u8C31\u7CFB\uFF1B\u7070\u8272\u865A\u7EBF\uFF1A\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D\u53C2\u7167\u3002\u7070\u70B9\uFF1A\u88AB\u526A\u679D\u7684\u8C31\u7CFB\u524D\u8EAB\uFF1B\u8D85\u8303\u56F4\u524D\u8EAB\u5939\u7D27\u5728\u7BB1\u58C1\uFF0C\u8BE6\u60C5\u7528 \u2191\u2193 \u63D0\u793A\u65B9\u5411\u5E76\u4FDD\u7559\u539F\u503C\u3002",w?"\u5F53\u524D\u663E\u793A\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684\u5E15\u7D2F\u6258\u70B9\u3002":`\u5F53\u524D${rt==="hidden"?"\u9690\u85CF":rt==="solid"?"\u663E\u793A\u5B9E\u5FC3":"\u663E\u793A\u7EBF\u6846"} Delaunay \u90BB\u63A5\u53C2\u7167\uFF0C\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002`,mt?"\u56FD\u522B\u5916\u6846\u5DF2\u5F00\u542F\uFF1A\u4E2D\u56FD\u53CC\u5706\u73AF\u3001\u7F8E\u56FD\u5706\u89D2\u65B9\u73AF\u3001\u5176\u4ED6\u83F1\u5F62\u73AF\uFF1B\u56FD\u522B\u53EA\u6807\u8BC6\u5382\u5546\u5F52\u5C5E\u3002":"\u56FD\u522B\u5916\u6846\u5173\u95ED\uFF1B\u5F00\u542F\u65F6\u540C\u6B65\u663E\u793A\u56FD\u522B\u56FE\u4F8B\u3002"].join(" "))),zi("\u672A\u4E0A\u56FE\u6A21\u578B\u4E0E\u5382\u5546",Le("p","aa-how-to-read-drawer-paragraph",(()=>{let We=Z.excluded_models_with_drop_reason||[],nt=[...new Set(We.map(xt=>xt.creator))].filter(xt=>!Q.some(Rt=>Rt.creator===xt));return`${We.length} \u4E2A\u6709\u667A\u80FD\u5206\u7684\u6A21\u578B\u672A\u4E0A\u56FE\u3002\u53EF\u5728\u641C\u7D22\u4E2D\u6309\u6A21\u578B\u6216\u5382\u5546\u67E5\u770B\u5B9E\u9645\u539F\u56E0\u3002${nt.map(xt=>`${xt}\uFF1A${[...new Set(We.filter(Rt=>Rt.creator===xt).map(Rt=>Rt.drop_reason))].join("\u3001")}`).join("\uFF1B")}`})())),zi("\u6570\u636E\u6765\u6E90",H),zi("\u54C1\u724C\u4E0E\u8BB8\u53EF",Le("p","aa-how-to-read-drawer-paragraph","\u672C\u62A5\u544A\u4F7F\u7528 Lobe Icons \u7684 MIT \u8BB8\u53EF\u56FE\u6807\u4E0E\u672C\u5730\u54C1\u724C\u8D44\u4EA7\u3002\u54C1\u724C\u540D\u79F0\u548C\u5546\u6807\u5C5E\u4E8E\u5404\u81EA\u6743\u5229\u4EBA\uFF0C\u4EC5\u7528\u4E8E\u6807\u8BC6\u5382\u5546\uFF0C\u4E0D\u8868\u793A\u8BA4\u53EF\u6216\u5408\u4F5C\u3002\u5B8C\u6574\u8BB8\u53EF\u89C1\u672C\u9875\u6E90\u4EE3\u7801\u7684 Lobe Icons MIT \u8BB8\u53EF\u58F0\u660E\u3002")))}function Ca(h){_=!!h,u.classList.toggle("is-side-panel-collapsed",!_);let x=window.matchMedia("(max-width: 1024px)").matches;gt.textContent=_?x?"\u2304":"\u203A":x?"\u2303":"\u2039",gt.setAttribute("aria-label",`${_?"\u6536\u8D77":"\u5C55\u5F00"}\u56FE\u8868\u63A7\u5236\u680F`),gt.setAttribute("aria-controls","aa-side-panel-body"),gt.setAttribute("aria-expanded",String(_)),window.setTimeout(Os,210)}function Pp(){Ap(),Rp(),g.replaceChildren(fp(),pp(),mp());let h=document.createElement("div");h.className="aa-side-panel-header";let x=document.createElement("div");x.className="aa-side-panel-label",x.textContent="\u56FE\u8868\u63A7\u5236",gt=document.createElement("button"),gt.type="button",gt.id="aa-side-panel-toggle",gt.className="aa-icon-button",gt.addEventListener("click",()=>Ca(!_)),h.append(x,gt);let b=document.createElement("div");b.className="aa-side-panel-body",b.id="aa-side-panel-body",b.append(_p(),vp(),bp(),Ep(),wp()),v.replaceChildren(h,b),Sp(),ac(),Pu()}function Pu(){let h=window.matchMedia("(max-width: 640px)").matches,x=document.getElementById("aa-report-header-metadata-row"),b=document.getElementById("aa-report-header-model-count-summary");x&&b&&(h?x.prepend(b):x.append(b)),Cu(),ln&&(window.matchMedia("(max-width: 1024px)").matches?Se.after(ln):u.append(ln)),Ca(_)}window.addEventListener("resize",Pu);function Os(){let h=Math.max(1,d.clientWidth),x=Math.max(1,d.clientHeight),b=Math.min(window.devicePixelRatio||1,2);y.getPixelRatio()!==b&&y.setPixelRatio(b),y.setSize(h,x,!1),y.setViewport(0,0,y.domElement.width/b,y.domElement.height/b);for(let T of[st,tt,It])T?.material.resolution.set(h,x);P.aspect=h/x,P.updateProjectionMatrix();for(let T of[X,J])T.children.filter(O=>O.isSprite).forEach(O=>br(O,O.userData.cssPixelSize));!Ke.hidden&&Fi&&Ds(Fi),Ut()}new ResizeObserver(Os).observe(d),window.addEventListener("resize",Os);let cc;function hc(){cc?.removeEventListener("change",hc),cc=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`),cc.addEventListener("change",hc),Os()}hc();function Ra(h){let x=h.clone().project(P),b=y.domElement.getBoundingClientRect();return{clientX:b.left+(x.x+1)/2*b.width,clientY:b.top+(1-x.y)/2*b.height,normalizedDeviceDepth:x.z}}function Iu(h){let x=ot[h];return x===void 0?null:Ra(ke[x].logoSprite.position)}function Ip(h){let x=ot[h];if(x===void 0)return null;let b=ke[x],T=new N().setFromMatrixColumn(P.matrixWorld,0),O=Ra(b.logoSprite.position);function V(ae){if(!ae.material.sizeAttenuation)return ae.scale.x*d.clientHeight/(4*Math.tan(rs.degToRad(P.fov/2)));let H=Ra(ae.position.clone().addScaledVector(T,ae.scale.x/2));return Math.hypot(H.clientX-O.clientX,H.clientY-O.clientY)}return{logoRadius:V(b.logoSprite),whiteBackplateRadius:V(b.backplateSprite),countryRegionRadius:V(b.countryRegionSprite)}}function Lu(h){let x=ue.find(b=>b.userData.prunedLineageAncestorNode.name===h);return x?Ra(x.position):null}function Lp(h){let x=Iu(h);if(!x)return null;let b=Ar(x.clientX,x.clientY);if(b?.interactionTargetKind!=="displayed_model")return null;let T=Q[b.modelIndex];return{projectedCanvasPosition:x,frontmostModelName:T.name,frontmostBaseModelName:T.base_model_name,frontmostLineageKey:T.lineage_key}}function Dp(h){let x=Lu(h);if(!x)return null;let b=Ar(x.clientX,x.clientY),T=b?.interactionTargetKind==="displayed_model"?Q[b.modelIndex]?.name??null:b?.prunedLineageAncestorNode?.name??null;return{projectedCanvasPosition:x,frontmostInteractionTargetKind:b?.interactionTargetKind??null,frontmostInteractionTargetName:T,frontmostInteractionTargetIsRequestedPrunedLineageAncestor:b?.interactionTargetKind!=="displayed_model"&&T===h}}function Np(){if(!lt)return{built:!1,visible:!1,vertexCount:0,triangleCount:0,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:!0,allVertexPositionsAreFinite:!0};let h=lt.geometry.attributes.position,x=Array.from(lt.geometry.index.array);return{built:!0,visible:lt.visible,vertexCount:h.count,triangleCount:x.length/3,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:x.every(b=>Number.isInteger(b)&&b>=0&&b<h.count),allVertexPositionsAreFinite:Array.from(h.array).every(Number.isFinite)}}function Up(){let h=Q.filter((H,le)=>Ft(le)).length,x=new Set(au().filter(H=>H.userData.interactionTargetKind==="displayed_model").map(H=>H.userData.modelIndex)),b=Q.map((H,le)=>[H,le]).filter(([H])=>!_n(H)).map(([,H])=>H),T=new Set(Q.map(H=>H.creator)),O=new Set(Q.filter((H,le)=>Ft(le)).map(H=>H.creator)).size,V=Pa(st).length,ae=Pa(tt).length;return{interactiveRenderer:"threejs",activeMetricVariantKey:c,costAxisField:oe.cost_axis_field,speedAxisField:oe.speed_axis_field,displayedModelMarkerCount:Q.length,organizationLogoMarkerCount:ke.length,cameraFacingOrganizationLogoMarkerCount:re.filter(H=>H.isSprite).length,depthTestedOrganizationLogoMarkerCount:re.filter(H=>H.material.depthTest).length,depthWritingOrganizationLogoBackplateCount:ke.filter(H=>H.backplateSprite.material.depthWrite).length,loadedOrganizationLogoCanvasTextureCount:[...T].filter(H=>Ye[H]==="loaded").length,failedOrganizationLogoCanvasTextureCount:[...T].filter(H=>Ye[H]==="failed").length,countryRegionMarkerVisible:mt,countryRegionMarkerCount:mt?h:0,organizationCount:T.size,visibleOrganizationCount:O,pinnedBaseModelNames:[...xe],orbitInteractionActive:Fs,pinnedModelUuids:[...K].filter(H=>!H.startsWith("legacy:")),hoveredModelIndex:k,organizationLogoTextureLoadStateByCreatorName:{...Ye},hoveredLineageKey:j,hoveredReasoningBaseModelName:fe,hoveredPrunedLineageAncestorName:q,pinnedModelMarkerCount:Q.filter(H=>Ne(H)).length,displayedLineageSegmentEndpointCount:V,displayedReasoningVariantSegmentEndpointCount:ae,displayedPrunedLineageAncestorMarkerCount:ue.length,availableLineageCount:Object.keys(Je).length,selectedFrontierStandoutMetricName:D,frontierStandoutAxisWeights:{...de},paretoFrontierModelCount:bi().length,visibleParetoFrontierModelCount:bi().filter(H=>Ft(ot[H.name])).length,frontierStyle:rt,achievableFrontierSurfaceVisible:w,paretoFrontierWireframeVisible:Oe?.visible??!1,paretoFrontierSurfaceVisible:lt?.visible??!1,achievableFrontierSurfaceObjectVisible:Qe?.visible??!1,exactAchievableBoundaryVisible:dt?.visible??!1,achievableFrontierGeometryKind:ne.achievable_frontier_geometry_kind??null,paretoFrontierSurfaceWritesDepth:lt?.material.depthWrite??null,achievableFrontierSurfaceWritesDepth:Qe?.material.depthWrite??null,paretoFrontierSurfaceTriangleCount:lt?lt.geometry.index.count/3:0,renderedTriangleCountInLatestFrame:y.info.render.triangles,nonFiniteContractCoordinateCount:Ct,outOfRangeContractTriangleVertexIndexCount:z,skippedInvalidContractGeometryNames:[...Ht],visibleModelMarkerCount:h,showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod:Lt,recentReleaseFrontierDistanceGracePeriodMonths:p,recentReleaseGracePeriodOnlyModelMarkerCount:Q.filter(H=>H.displayed_only_because_of_recent_release_grace_period===!0).length,pickableRecentReleaseGracePeriodOnlyModelMarkerCount:Q.filter((H,le)=>H.displayed_only_because_of_recent_release_grace_period===!0&&x.has(le)).length,showOnlyCurrentIntelligenceIndexVersionComparableModels:At,historicalIntelligenceIndexVersionModelMarkerCount:b.length,visibleHistoricalIntelligenceIndexVersionModelMarkerCount:b.filter(H=>ke[H]?.logoSprite.visible).length,pickableHistoricalIntelligenceIndexVersionModelMarkerCount:b.filter(H=>x.has(H)).length,historicalIntelligenceIndexVersionStyledModelMarkerCount:ke.filter(H=>H.backplateSprite.material===Xl&&H.logoSprite.material.opacity<1).length,currentIntelligenceIndexVersionStyledModelMarkerCount:ke.filter(H=>H.backplateSprite.material===Wl&&H.logoSprite.material.opacity>=1).length,howToReadDrawerOpen:M?!M.hidden:!1,reportArtifactFingerprint:{...R},sidePanelExpanded:_,markerSizeMultiplier:Xn,fixedAxisConfiguration:ne.three_dimensional_axis_configuration,cameraPosition:P.position.toArray()}}function Pa(h){if(!h)return[];if(h.isLineSegments2){let b=h.geometry.attributes.instanceStart,T=h.geometry.attributes.instanceEnd;return Array.from({length:b.count},(O,V)=>[[b.getX(V),b.getY(V),b.getZ(V)],[T.getX(V),T.getY(V),T.getZ(V)]]).flat()}let x=h.geometry.attributes.position;return Array.from({length:x.count},(b,T)=>[x.getX(T),x.getY(T),x.getZ(T)])}function Fp(){return{lineage:Pa(st),reasoning:Pa(tt)}}function Op(){return ke.map((h,x)=>({name:Q[x]?.name,position:h.logoSprite.position.toArray(),visible:Ft(x)}))}function Bp(){return ue.map(h=>h.position.toArray())}function zp(){return{selectedFrontierStandoutMetricName:D,frontierStandoutAxisWeights:{...de},ranking:bi().map(h=>({name:h.name,value:se[h.name]})).sort((h,x)=>{let b=Number.isFinite(h.value)?h.value:-1/0;return(Number.isFinite(x.value)?x.value:-1/0)-b}),completeFrontierHypervolume:ye}}Pp(),du(c,!1),Os(),window.frontierThreeDimensionalVisualizationState=Up,window.pinFrontierBaseModel=h=>Ve(h,!0),window.unpinFrontierBaseModel=h=>Ve(h,!1),window.togglePinnedFrontierBaseModel=Ea,window.showFrontierLineageForModelName=h=>{let x=ot[h];return x===void 0||!Ft(x)?!1:(Tr(x),!0)},window.clearFrontierHoverState=zn,window.matchingFrontierBaseModelNames=xp,window.setFrontierMetricCombination=wa,window.setParetoFrontierVisualizationStyle=nu,window.setAchievableFrontierSurfaceVisibility=iu,window.setCountryRegionMarkerVisibility=tu,window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels=Qh,window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod=eu,window.setFrontierHowToReadDrawerOpen=Rr,window.setFrontierSidePanelExpanded=Ca,window.selectFrontierStandoutMetric=hu,window.setFrontierStandoutAxisWeights=uu,window.setFrontierMarkerSizeMultiplier=Jh,window.frontierStandoutRanking=zp,window.frontierThreeDimensionalRendererDiagnostics={verificationGeometryConstructors:{Vector2:ze,Vector3:N,Scene:lr,Color:at,CanvasTexture:Es,Sprite:bs,SpriteMaterial:Ms,PlaneGeometry:ws,Mesh:Kt,PerspectiveCamera:$t,OrthographicCamera:Ts},get axisAnnotationSizeMeasurementCount(){return Ie},get surfaceMaterialForVisibilityVerification(){return lt?.material},get surfaceRenderOrder(){return lt?.renderOrder},markerVisualEncodingSummary:()=>ke.map((h,x)=>({isPareto:Q[x].panel?.layer===1,paretoRingScale:h.paretoRingSprite.scale.x,backplateScale:h.backplateSprite.scale.x,standoutHaloVisible:h.standoutHaloSprite.visible,standoutHaloScale:h.standoutHaloSprite.scale.x,logoScale:h.logoSprite.scale.x,logoSizeAttenuation:h.logoSprite.material.sizeAttenuation})),camera:P,controls:U,renderer:y,requestRender:Ut,pointerInteractionAtCanvasClientCoordinates:Ar,createRelationshipLineForVerification:Jn,projectedCanvasPositionForModelName:Iu,projectedCanvasMarkerRadiiForModelName:Ip,projectedCanvasPositionForPrunedLineageAncestorName:Lu,frontmostPointerInteractionAtProjectedModelPosition:Lp,frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition:Dp,paretoFrontierSurfaceGeometrySummary:Np,transientRelationshipLineEndpointPositions:Fp,displayedModelMarkerPositionsAndVisibility:Op,displayedPrunedLineageAncestorMarkerPositions:Bp}})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
