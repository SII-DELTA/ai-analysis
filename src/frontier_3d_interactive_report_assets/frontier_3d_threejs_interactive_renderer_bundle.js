(()=>{var es={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ud=0,$c=1,dd=2;var oa=1,fd=2,dr=3,Li=0,fn=1,Gn=2,fi=0,ys=1,Zc=2,jc=3,Jc=4,pd=5;var Yi=100,md=101,gd=102,_d=103,xd=104,yd=200,vd=201,bd=202,Md=203,ro=204,ao=205,Sd=206,Ed=207,wd=208,Td=209,Ad=210,Cd=211,Rd=212,Id=213,Pd=214,oo=0,lo=1,co=2,vs=3,ho=4,uo=5,fo=6,po=7,Kc=0,Ld=1,Dd=2,ri=0,Qc=1,eh=2,th=3,nh=4,ih=5,sh=6,rh=7;var ah=300,ns=301,As=302,Go=303,Wo=304,la=306,mo=1e3,ui=1001,go=1002,Xt=1003,Nd=1004;var ca=1005;var Zt=1006,Xo=1007;var is=1008;var Nn=1009,oh=1010,lh=1011,fr=1012,qo=1013,ai=1014,oi=1015,pi=1016,Yo=1017,$o=1018,pr=1020,ch=35902,hh=35899,uh=1021,dh=1022,Wn=1023,di=1026,ss=1027,fh=1028,Zo=1029,rs=1030,jo=1031;var Jo=1033,ha=33776,ua=33777,da=33778,fa=33779,Ko=35840,Qo=35841,el=35842,tl=35843,nl=36196,il=37492,sl=37496,rl=37488,al=37489,pa=37490,ol=37491,ll=37808,cl=37809,hl=37810,ul=37811,dl=37812,fl=37813,pl=37814,ml=37815,gl=37816,_l=37817,xl=37818,yl=37819,vl=37820,bl=37821,Ml=36492,Sl=36494,El=36495,wl=36283,Tl=36284,ma=36285,Al=36286;var kr=2300,_o=2301,so=2302,kc=2303,Vc=2400,Hc=2401,Gc=2402;var Ud=3200;var ph=0,Fd=1,Ui="",Yt="srgb",Vr="srgb-linear",Hr="linear",St="srgb";var _s=7680;var Wc=519,Od=512,Bd=513,zd=514,Cl=515,kd=516,Vd=517,Rl=518,Hd=519,xo=35044;var mh="300 es",ni=2e3,Gr=2001;function Zp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function jp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gd(){let i=Wr("canvas");return i.style.display="block",i}var Fu={},ir=null;function Xr(...i){let e="THREE."+i.shift();ir?ir("log",e,...i):console.log(e,...i)}function Wd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function qe(...i){i=Wd(i);let e="THREE."+i.shift();if(ir)ir("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=Wd(i);let e="THREE."+i.shift();if(ir)ir("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function xs(...i){let e=i.join(" ");e in Fu||(Fu[e]=!0,qe(...i))}function Xd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var qd={[oo]:lo,[co]:fo,[ho]:po,[vs]:uo,[lo]:oo,[fo]:co,[po]:ho,[uo]:vs},ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ou=1234567,Br=Math.PI/180,sr=180/Math.PI;function Ii(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function gh(i,e){return(i%e+e)%e}function Jp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Kp(i,e,t){return i!==e?(t-i)/(e-i):0}function zr(i,e,t){return(1-t)*i+t*e}function Qp(i,e,t,n){return zr(i,e,1-Math.exp(-t*n))}function em(i,e=1){return e-Math.abs(gh(i,e*2)-e)}function tm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function nm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function im(i,e){return i+Math.floor(Math.random()*(e-i+1))}function sm(i,e){return i+Math.random()*(e-i)}function rm(i){return i*(.5-Math.random())}function am(i){i!==void 0&&(Ou=i);let e=Ou+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function om(i){return i*Br}function lm(i){return i*sr}function cm(i){return(i&i-1)===0&&i!==0}function hm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function um(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),p=r((e-n)/2),u=a((e-n)/2),g=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*p,l*u,o*c);break;case"YZY":i.set(l*u,o*d,l*p,o*c);break;case"ZXZ":i.set(l*p,l*u,o*d,o*c);break;case"XZX":i.set(o*d,l*v,l*g,o*c);break;case"YXY":i.set(l*g,o*d,l*v,o*c);break;case"ZYZ":i.set(l*v,l*g,o*d,o*c);break;default:qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var as={DEG2RAD:Br,RAD2DEG:sr,generateUUID:Ii,clamp:rt,euclideanModulo:gh,mapLinear:Jp,inverseLerp:Kp,lerp:zr,damp:Qp,pingpong:em,smoothstep:tm,smootherstep:nm,randInt:im,randFloat:sm,randFloatSpread:rm,seededRandom:am,degToRad:om,radToDeg:lm,isPowerOfTwo:cm,ceilPowerOfTwo:hm,floorPowerOfTwo:um,setQuaternionFromProperEuler:dm,normalize:Ct,denormalize:ti},bh=class bh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};bh.prototype.isVector2=!0;var We=bh,Rn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],p=n[s+3],u=r[a+0],g=r[a+1],v=r[a+2],E=r[a+3];if(p!==E||l!==u||c!==g||d!==v){let f=l*u+c*g+d*v+p*E;f<0&&(u=-u,g=-g,v=-v,E=-E,f=-f);let m=1-o;if(f<.9995){let P=Math.acos(f),L=Math.sin(P);m=Math.sin(m*P)/L,o=Math.sin(o*P)/L,l=l*m+u*o,c=c*m+g*o,d=d*m+v*o,p=p*m+E*o}else{l=l*m+u*o,c=c*m+g*o,d=d*m+v*o,p=p*m+E*o;let P=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=P,c*=P,d*=P,p*=P}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],p=r[a],u=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+d*p+l*g-c*u,e[t+1]=l*v+d*u+c*p-o*g,e[t+2]=c*v+d*g+o*u-l*p,e[t+3]=d*v-o*p-l*u-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),p=o(r/2),u=l(n/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=u*d*p+c*g*v,this._y=c*g*p-u*d*v,this._z=c*d*v+u*g*p,this._w=c*d*p-u*g*v;break;case"YXZ":this._x=u*d*p+c*g*v,this._y=c*g*p-u*d*v,this._z=c*d*v-u*g*p,this._w=c*d*p+u*g*v;break;case"ZXY":this._x=u*d*p-c*g*v,this._y=c*g*p+u*d*v,this._z=c*d*v+u*g*p,this._w=c*d*p-u*g*v;break;case"ZYX":this._x=u*d*p-c*g*v,this._y=c*g*p+u*d*v,this._z=c*d*v-u*g*p,this._w=c*d*p+u*g*v;break;case"YZX":this._x=u*d*p+c*g*v,this._y=c*g*p+u*d*v,this._z=c*d*v-u*g*p,this._w=c*d*p-u*g*v;break;case"XZY":this._x=u*d*p-c*g*v,this._y=c*g*p-u*d*v,this._z=c*d*v+u*g*p,this._w=c*d*p+u*g*v;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],p=t[10],u=n+o+p;if(u>0){let g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(d-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>p){let g=2*Math.sqrt(1+n-o-p);this._w=(d-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>p){let g=2*Math.sqrt(1+o-n-p);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+d)/g}else{let g=2*Math.sqrt(1+p-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Mh=class Mh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),p=2*(r*n-a*t);return this.x=t+l*c+a*p-o*d,this.y=n+l*d+o*c-r*p,this.z=s+l*p+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gc.copy(this).projectOnVector(e),this.sub(gc)}reflect(e){return this.sub(gc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Mh.prototype.isVector3=!0;var N=Mh,gc=new N,Bu=new Rn,Sh=class Sh{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],p=n[7],u=n[2],g=n[5],v=n[8],E=s[0],f=s[3],m=s[6],P=s[1],L=s[4],S=s[7],R=s[2],A=s[5],I=s[8];return r[0]=a*E+o*P+l*R,r[3]=a*f+o*L+l*A,r[6]=a*m+o*S+l*I,r[1]=c*E+d*P+p*R,r[4]=c*f+d*L+p*A,r[7]=c*m+d*S+p*I,r[2]=u*E+g*P+v*R,r[5]=u*f+g*L+v*A,r[8]=u*m+g*S+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*a-o*c,u=o*l-d*r,g=c*r-a*l,v=t*p+n*u+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let E=1/v;return e[0]=p*E,e[1]=(s*c-d*n)*E,e[2]=(o*n-s*a)*E,e[3]=u*E,e[4]=(d*t-s*l)*E,e[5]=(s*r-o*t)*E,e[6]=g*E,e[7]=(n*l-c*t)*E,e[8]=(a*t-n*r)*E,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_c.makeScale(e,t)),this}rotate(e){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_c.makeRotation(-e)),this}translate(e,t){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_c.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Sh.prototype.isMatrix3=!0;var st=Sh,_c=new st,zu=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ku=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fm(){let i={enabled:!0,workingColorSpace:Vr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===St&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===St&&(s.r=nr(s.r),s.g=nr(s.g),s.b=nr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ui?Hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vr]:{primaries:e,whitePoint:n,transfer:Hr,toXYZ:zu,fromXYZ:ku,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:St,toXYZ:zu,fromXYZ:ku,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}var xt=fm();function Pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Bs,yo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=Wr("canvas")),Bs.width=e.width,Bs.height=e.height;let s=Bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pi(t[n]/255)*255):t[n]=Pi(t[n]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},pm=0,rr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xc(s[a].image)):r.push(xc(s[a]))}else r=xc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function xc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}var mm=0,yc=new N,un=class i extends ii{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ui,s=ui,r=Zt,a=is,o=Wn,l=Nn,c=i.DEFAULT_ANISOTROPY,d=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Ii(),this.name="",this.source=new rr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yc).x}get height(){return this.source.getSize(yc).y}get depth(){return this.source.getSize(yc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mo:e.x=e.x-Math.floor(e.x);break;case ui:e.x=e.x<0?0:1;break;case go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mo:e.y=e.y-Math.floor(e.y);break;case ui:e.y=e.y<0?0:1;break;case go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=ah;un.DEFAULT_ANISOTROPY=1;var Eh=class Eh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],d=l[4],p=l[8],u=l[1],g=l[5],v=l[9],E=l[2],f=l[6],m=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-E)<.01&&Math.abs(v-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+E)<.1&&Math.abs(v+f)<.1&&Math.abs(c+g+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let L=(c+1)/2,S=(g+1)/2,R=(m+1)/2,A=(d+u)/4,I=(p+E)/4,y=(v+f)/4;return L>S&&L>R?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=A/n,r=I/n):S>R?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=A/s,r=y/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=I/r,s=y/r),this.set(n,s,r,t),this}let P=Math.sqrt((f-v)*(f-v)+(p-E)*(p-E)+(u-d)*(u-d));return Math.abs(P)<.001&&(P=1),this.x=(f-v)/P,this.y=(p-E)/P,this.z=(u-d)/P,this.w=Math.acos((c+g+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Eh.prototype.isVector4=!0;var Rt=Eh,vo=class extends ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new un(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new rr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends vo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qr=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var bo=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ho=class Ho{constructor(e,t,n,s,r,a,o,l,c,d,p,u,g,v,E,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,p,u,g,v,E,f)}set(e,t,n,s,r,a,o,l,c,d,p,u,g,v,E,f){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=d,m[10]=p,m[14]=u,m[3]=g,m[7]=v,m[11]=E,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ho().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),a=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let u=a*d,g=a*p,v=o*d,E=o*p;t[0]=l*d,t[4]=-l*p,t[8]=c,t[1]=g+v*c,t[5]=u-E*c,t[9]=-o*l,t[2]=E-u*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*d,g=l*p,v=c*d,E=c*p;t[0]=u+E*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*p,t[5]=a*d,t[9]=-o,t[2]=g*o-v,t[6]=E+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*d,g=l*p,v=c*d,E=c*p;t[0]=u-E*o,t[4]=-a*p,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*d,t[9]=E-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*d,g=a*p,v=o*d,E=o*p;t[0]=l*d,t[4]=v*c-g,t[8]=u*c+E,t[1]=l*p,t[5]=E*c+u,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,g=a*c,v=o*l,E=o*c;t[0]=l*d,t[4]=E-u*p,t[8]=v*p+g,t[1]=p,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=g*p+v,t[10]=u-E*p}else if(e.order==="XZY"){let u=a*l,g=a*c,v=o*l,E=o*c;t[0]=l*d,t[4]=-p,t[8]=c*d,t[1]=u*p+E,t[5]=a*d,t[9]=g*p-v,t[2]=v*p-g,t[6]=o*d,t[10]=E*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gm,e,_m)}lookAt(e,t,n){let s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Vi.crossVectors(n,An),Vi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Vi.crossVectors(n,An)),Vi.normalize(),La.crossVectors(An,Vi),s[0]=Vi.x,s[4]=La.x,s[8]=An.x,s[1]=Vi.y,s[5]=La.y,s[9]=An.y,s[2]=Vi.z,s[6]=La.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],p=n[5],u=n[9],g=n[13],v=n[2],E=n[6],f=n[10],m=n[14],P=n[3],L=n[7],S=n[11],R=n[15],A=s[0],I=s[4],y=s[8],C=s[12],U=s[1],F=s[5],q=s[9],ie=s[13],ee=s[2],Y=s[6],K=s[10],J=s[14],ne=s[3],oe=s[7],te=s[11],xe=s[15];return r[0]=a*A+o*U+l*ee+c*ne,r[4]=a*I+o*F+l*Y+c*oe,r[8]=a*y+o*q+l*K+c*te,r[12]=a*C+o*ie+l*J+c*xe,r[1]=d*A+p*U+u*ee+g*ne,r[5]=d*I+p*F+u*Y+g*oe,r[9]=d*y+p*q+u*K+g*te,r[13]=d*C+p*ie+u*J+g*xe,r[2]=v*A+E*U+f*ee+m*ne,r[6]=v*I+E*F+f*Y+m*oe,r[10]=v*y+E*q+f*K+m*te,r[14]=v*C+E*ie+f*J+m*xe,r[3]=P*A+L*U+S*ee+R*ne,r[7]=P*I+L*F+S*Y+R*oe,r[11]=P*y+L*q+S*K+R*te,r[15]=P*C+L*ie+S*J+R*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],u=e[10],g=e[14],v=e[3],E=e[7],f=e[11],m=e[15],P=l*g-c*u,L=o*g-c*p,S=o*u-l*p,R=a*g-c*d,A=a*u-l*d,I=a*p-o*d;return t*(E*P-f*L+m*S)-n*(v*P-f*R+m*A)+s*(v*L-E*R+m*I)-r*(v*S-E*A+f*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-n*(r*d-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],u=e[10],g=e[11],v=e[12],E=e[13],f=e[14],m=e[15],P=t*o-n*a,L=t*l-s*a,S=t*c-r*a,R=n*l-s*o,A=n*c-r*o,I=s*c-r*l,y=d*E-p*v,C=d*f-u*v,U=d*m-g*v,F=p*f-u*E,q=p*m-g*E,ie=u*m-g*f,ee=P*ie-L*q+S*F+R*U-A*C+I*y;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Y=1/ee;return e[0]=(o*ie-l*q+c*F)*Y,e[1]=(s*q-n*ie-r*F)*Y,e[2]=(E*I-f*A+m*R)*Y,e[3]=(u*A-p*I-g*R)*Y,e[4]=(l*U-a*ie-c*C)*Y,e[5]=(t*ie-s*U+r*C)*Y,e[6]=(f*S-v*I-m*L)*Y,e[7]=(d*I-u*S+g*L)*Y,e[8]=(a*q-o*U+c*y)*Y,e[9]=(n*U-t*q-r*y)*Y,e[10]=(v*A-E*S+m*P)*Y,e[11]=(p*S-d*A-g*P)*Y,e[12]=(o*C-a*F-l*y)*Y,e[13]=(t*F-n*C+s*y)*Y,e[14]=(E*L-v*R-f*P)*Y,e[15]=(d*R-p*L+u*P)*Y,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,p=o+o,u=r*c,g=r*d,v=r*p,E=a*d,f=a*p,m=o*p,P=l*c,L=l*d,S=l*p,R=n.x,A=n.y,I=n.z;return s[0]=(1-(E+m))*R,s[1]=(g+S)*R,s[2]=(v-L)*R,s[3]=0,s[4]=(g-S)*A,s[5]=(1-(u+m))*A,s[6]=(f+P)*A,s[7]=0,s[8]=(v+L)*I,s[9]=(f-P)*I,s[10]=(1-(u+E))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=zs.set(s[0],s[1],s[2]).length(),o=zs.set(s[4],s[5],s[6]).length(),l=zs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Kn.copy(this);let c=1/a,d=1/o,p=1/l;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=d,Kn.elements[5]*=d,Kn.elements[6]*=d,Kn.elements[8]*=p,Kn.elements[9]*=p,Kn.elements[10]*=p,t.setFromRotationMatrix(Kn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=ni,l=!1){let c=this.elements,d=2*r/(t-e),p=2*r/(n-s),u=(t+e)/(t-e),g=(n+s)/(n-s),v,E;if(l)v=r/(a-r),E=a*r/(a-r);else if(o===ni)v=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===Gr)v=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ni,l=!1){let c=this.elements,d=2/(t-e),p=2/(n-s),u=-(t+e)/(t-e),g=-(n+s)/(n-s),v,E;if(l)v=1/(a-r),E=a/(a-r);else if(o===ni)v=-2/(a-r),E=-(a+r)/(a-r);else if(o===Gr)v=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ho.prototype.isMatrix4=!0;var Lt=Ho,zs=new N,Kn=new Lt,gm=new N(0,0,0),_m=new N(1,1,1),Vi=new N,La=new N,An=new N,Vu=new Lt,Hu=new Rn,$i=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],p=s[2],u=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$i.DEFAULT_ORDER="XYZ";var ar=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},xm=0,Gu=new N,ks=new Rn,Ei=new Lt,Da=new N,Ir=new N,ym=new N,vm=new Rn,Wu=new N(1,0,0),Xu=new N(0,1,0),qu=new N(0,0,1),Yu={type:"added"},bm={type:"removed"},Vs={type:"childadded",child:null},vc={type:"childremoved",child:null},vn=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new $i,n=new Rn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new st}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Wu,e)}rotateY(e){return this.rotateOnAxis(Xu,e)}rotateZ(e){return this.rotateOnAxis(qu,e)}translateOnAxis(e,t){return Gu.copy(e).applyQuaternion(this.quaternion),this.position.add(Gu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wu,e)}translateY(e){return this.translateOnAxis(Xu,e)}translateZ(e){return this.translateOnAxis(qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(Ir,Da,this.up):Ei.lookAt(Da,Ir,this.up),this.quaternion.setFromRotationMatrix(Ei),s&&(Ei.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Ei),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bm),vc.child=e,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,ym),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,vm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let p=l[c];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),p=a(e.shapes),u=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};vn.DEFAULT_UP=new N(0,1,0);vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Hn=class extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mm={type:"move"},or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let E of e.hand.values()){let f=t.getJointPose(E,n),m=this._getHandJoint(c,E);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}let d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),g=.02,v=.005;c.inputState.pinching&&u>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Hn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Yd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Na={h:0,s:0,l:0};function bc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ft=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=xt.workingColorSpace){if(e=gh(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=bc(a,r,e+1/3),this.g=bc(a,r,e),this.b=bc(a,r,e-1/3)}return xt.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function n(r){r!==void 0&&parseFloat(r)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){let n=Yd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return xt.workingToColorSpace(an.copy(this),e),Math.round(rt(an.r*255,0,255))*65536+Math.round(rt(an.g*255,0,255))*256+Math.round(rt(an.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(an.copy(this),t);let n=an.r,s=an.g,r=an.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=d<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Yt){xt.workingToColorSpace(an.copy(this),e);let t=an.r,n=an.g,s=an.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(Na);let n=zr(Hi.h,Na.h,t),s=zr(Hi.s,Na.s,t),r=zr(Hi.l,Na.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new ft;ft.NAMES=Yd;var lr=class extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $i,this.environmentIntensity=1,this.environmentRotation=new $i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qn=new N,wi=new N,Mc=new N,Ti=new N,Hs=new N,Gs=new N,$u=new N,Sc=new N,Ec=new N,wc=new N,Tc=new Rt,Ac=new Rt,Cc=new Rt,Ri=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Qn.subVectors(e,t),s.cross(Qn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Qn.subVectors(s,t),wi.subVectors(n,t),Mc.subVectors(e,t);let a=Qn.dot(Qn),o=Qn.dot(wi),l=Qn.dot(Mc),c=wi.dot(wi),d=wi.dot(Mc),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let u=1/p,g=(c*l-o*d)*u,v=(a*d-o*l)*u;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ti.x),l.addScaledVector(a,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Tc.setScalar(0),Ac.setScalar(0),Cc.setScalar(0),Tc.fromBufferAttribute(e,t),Ac.fromBufferAttribute(e,n),Cc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Tc,r.x),a.addScaledVector(Ac,r.y),a.addScaledVector(Cc,r.z),a}static isFrontFacing(e,t,n,s){return Qn.subVectors(n,t),wi.subVectors(e,t),Qn.cross(wi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Qn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Hs.subVectors(s,n),Gs.subVectors(r,n),Sc.subVectors(e,n);let l=Hs.dot(Sc),c=Gs.dot(Sc);if(l<=0&&c<=0)return t.copy(n);Ec.subVectors(e,s);let d=Hs.dot(Ec),p=Gs.dot(Ec);if(d>=0&&p<=d)return t.copy(s);let u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Hs,a);wc.subVectors(e,r);let g=Hs.dot(wc),v=Gs.dot(wc);if(v>=0&&g<=v)return t.copy(r);let E=g*c-l*v;if(E<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Gs,o);let f=d*v-g*p;if(f<=0&&p-d>=0&&g-v>=0)return $u.subVectors(r,s),o=(p-d)/(p-d+(g-v)),t.copy(s).addScaledVector($u,o);let m=1/(f+E+u);return a=E*m,o=u*m,t.copy(n).addScaledVector(Hs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),Fa.subVectors(this.max,Pr),Ws.subVectors(e.a,Pr),Xs.subVectors(e.b,Pr),qs.subVectors(e.c,Pr),Gi.subVectors(Xs,Ws),Wi.subVectors(qs,Xs),fs.subVectors(Ws,qs);let t=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-fs.z,fs.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,fs.z,0,-fs.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-fs.y,fs.x,0];return!Rc(t,Ws,Xs,qs,Fa)||(t=[1,0,0,0,1,0,0,0,1],!Rc(t,Ws,Xs,qs,Fa))?!1:(Oa.crossVectors(Gi,Wi),t=[Oa.x,Oa.y,Oa.z],Rc(t,Ws,Xs,qs,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ai=[new N,new N,new N,new N,new N,new N,new N,new N],ei=new N,Ua=new Pn,Ws=new N,Xs=new N,qs=new N,Gi=new N,Wi=new N,fs=new N,Pr=new N,Fa=new N,Oa=new N,ps=new N;function Rc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ps.fromArray(i,r);let o=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=e.dot(ps),c=t.dot(ps),d=n.dot(ps);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var kt=new N,Ba=new We,Sm=0,yn=class extends ii{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xo,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Yr=class extends yn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $r=class extends yn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var zt=class extends yn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Em=new Pn,Lr=new N,Ic=new N,si=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Em.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Lr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Ic)),this.expandByPoint(Lr.copy(e.center).sub(Ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wm=0,kn=new Lt,Pc=new vn,Ys=new N,Cn=new Pn,Dr=new Pn,Wt=new N,jt=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zp(e)?$r:Yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return Pc.lookAt(e),Pc.updateMatrix(),this.applyMatrix4(Pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(Cn.min,Dr.min),Cn.expandByPoint(Wt),Wt.addVectors(Cn.max,Dr.max),Cn.expandByPoint(Wt)):(Cn.expandByPoint(Dr.min),Cn.expandByPoint(Dr.max))}Cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Wt.fromBufferAttribute(o,c),l&&(Ys.fromBufferAttribute(e,c),Wt.add(Ys)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new yn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new N,l[y]=new N;let c=new N,d=new N,p=new N,u=new We,g=new We,v=new We,E=new N,f=new N;function m(y,C,U){c.fromBufferAttribute(n,y),d.fromBufferAttribute(n,C),p.fromBufferAttribute(n,U),u.fromBufferAttribute(r,y),g.fromBufferAttribute(r,C),v.fromBufferAttribute(r,U),d.sub(c),p.sub(c),g.sub(u),v.sub(u);let F=1/(g.x*v.y-v.x*g.y);isFinite(F)&&(E.copy(d).multiplyScalar(v.y).addScaledVector(p,-g.y).multiplyScalar(F),f.copy(p).multiplyScalar(g.x).addScaledVector(d,-v.x).multiplyScalar(F),o[y].add(E),o[C].add(E),o[U].add(E),l[y].add(f),l[C].add(f),l[U].add(f))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let y=0,C=P.length;y<C;++y){let U=P[y],F=U.start,q=U.count;for(let ie=F,ee=F+q;ie<ee;ie+=3)m(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}let L=new N,S=new N,R=new N,A=new N;function I(y){R.fromBufferAttribute(s,y),A.copy(R);let C=o[y];L.copy(C),L.sub(R.multiplyScalar(R.dot(C))).normalize(),S.crossVectors(A,C);let F=S.dot(l[y])<0?-1:1;a.setXYZW(y,L.x,L.y,L.z,F)}for(let y=0,C=P.length;y<C;++y){let U=P[y],F=U.start,q=U.count;for(let ie=F,ee=F+q;ie<ee;ie+=3)I(e.getX(ie+0)),I(e.getX(ie+1)),I(e.getX(ie+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new yn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,g=n.count;u<g;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,d=new N,p=new N;if(e)for(let u=0,g=e.count;u<g;u+=3){let v=e.getX(u+0),E=e.getX(u+1),f=e.getX(u+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,f),d.subVectors(a,r),p.subVectors(s,r),d.cross(p),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,f),o.add(d),l.add(d),c.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(E,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,g=t.count;u<g;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),p.subVectors(s,r),d.cross(p),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d),g=0,v=0;for(let E=0,f=l.length;E<f;E++){o.isInterleavedBufferAttribute?g=l[E]*o.data.stride+o.offset:g=l[E]*d;for(let m=0;m<d;m++)u[v++]=c[g++]}return new yn(u,d,p)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,p=c.length;d<p;d++){let u=c[d],g=e(u,n);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){let g=c[p];d.push(g.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],p=r[c];for(let u=0,g=p.length;u<g;u++)d.push(p[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xo,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},hn=new N,Ln=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Xr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Tm=0,Di=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=ys,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=ao,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==Li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ro&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==Yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ft().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new We().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},bs=class extends Di{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$s,Nr=new N,Zs=new N,js=new N,Js=new We,Ur=new We,$d=new Lt,za=new N,Fr=new N,ka=new N,Zu=new We,Lc=new We,ju=new We,Ms=class extends vn{constructor(e=new bs){if(super(),this.isSprite=!0,this.type="Sprite",$s===void 0){$s=new jt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zr(t,5);$s.setIndex([0,1,2,0,2,3]),$s.setAttribute("position",new Ln(n,3,0,!1)),$s.setAttribute("uv",new Ln(n,2,3,!1))}this.geometry=$s,this.material=e,this.center=new We(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Zs.setFromMatrixScale(this.matrixWorld),$d.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zs.multiplyScalar(-js.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Va(za.set(-.5,-.5,0),js,a,Zs,s,r),Va(Fr.set(.5,-.5,0),js,a,Zs,s,r),Va(ka.set(.5,.5,0),js,a,Zs,s,r),Zu.set(0,0),Lc.set(1,0),ju.set(1,1);let o=e.ray.intersectTriangle(za,Fr,ka,!1,Nr);if(o===null&&(Va(Fr.set(-.5,.5,0),js,a,Zs,s,r),Lc.set(0,1),o=e.ray.intersectTriangle(za,ka,Fr,!1,Nr),o===null))return;let l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:Ri.getInterpolation(Nr,za,Fr,ka,Zu,Lc,ju,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Va(i,e,t,n,s,r){Js.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ur.x=r*Js.x-s*Js.y,Ur.y=s*Js.x+r*Js.y):Ur.copy(Js),i.copy(e),i.x+=Ur.x,i.y+=Ur.y,i.applyMatrix4($d)}var Ci=new N,Dc=new N,Ha=new N,Xi=new N,Nc=new N,Ga=new N,Uc=new N,Zi=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Dc.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),Xi.copy(this.origin).sub(Dc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ha),o=Xi.dot(this.direction),l=-Xi.dot(Ha),c=Xi.lengthSq(),d=Math.abs(1-a*a),p,u,g,v;if(d>0)if(p=a*l-o,u=a*o-l,v=r*d,p>=0)if(u>=-v)if(u<=v){let E=1/d;p*=E,u*=E,g=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=r,p=Math.max(0,-(a*u+o)),g=-p*p+u*(u+2*l)+c;else u=-r,p=Math.max(0,-(a*u+o)),g=-p*p+u*(u+2*l)+c;else u<=-v?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-l),r),g=-p*p+u*(u+2*l)+c):u<=v?(p=0,u=Math.min(Math.max(-r,-l),r),g=u*(u+2*l)+c):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-l),r),g=-p*p+u*(u+2*l)+c);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),g=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Dc).addScaledVector(Ha,u),g}intersectSphere(e,t){Ci.subVectors(e.center,this.origin);let n=Ci.dot(this.direction),s=Ci.dot(Ci)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,n,s,r){Nc.subVectors(t,e),Ga.subVectors(n,e),Uc.crossVectors(Nc,Ga);let a=this.direction.dot(Uc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xi.subVectors(this.origin,e);let l=o*this.direction.dot(Ga.crossVectors(Xi,Ga));if(l<0)return null;let c=o*this.direction.dot(Nc.cross(Xi));if(c<0||l+c>a)return null;let d=-o*Xi.dot(Uc);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ss=class extends Di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $i,this.combine=Kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ju=new Lt,ms=new Zi,Wa=new si,Ku=new N,Xa=new N,qa=new N,Ya=new N,Fc=new N,$a=new N,Qu=new N,Za=new N,Jt=class extends vn{constructor(e=new jt,t=new Ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){$a.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],p=r[l];d!==0&&(Fc.fromBufferAttribute(p,e),a?$a.addScaledVector(Fc,d):$a.addScaledVector(Fc.sub(t),d))}t.add($a)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(Wa.containsPoint(ms.origin)===!1&&(ms.intersectSphere(Wa,Ku)===null||ms.origin.distanceToSquared(Ku)>(e.far-e.near)**2))&&(Ju.copy(r).invert(),ms.copy(e.ray).applyMatrix4(Ju),!(n.boundingBox!==null&&ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,p=r.attributes.normal,u=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,E=u.length;v<E;v++){let f=u[v],m=a[f.materialIndex],P=Math.max(f.start,g.start),L=Math.min(o.count,Math.min(f.start+f.count,g.start+g.count));for(let S=P,R=L;S<R;S+=3){let A=o.getX(S),I=o.getX(S+1),y=o.getX(S+2);s=ja(this,m,e,n,c,d,p,A,I,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let f=v,m=E;f<m;f+=3){let P=o.getX(f),L=o.getX(f+1),S=o.getX(f+2);s=ja(this,a,e,n,c,d,p,P,L,S),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,E=u.length;v<E;v++){let f=u[v],m=a[f.materialIndex],P=Math.max(f.start,g.start),L=Math.min(l.count,Math.min(f.start+f.count,g.start+g.count));for(let S=P,R=L;S<R;S+=3){let A=S,I=S+1,y=S+2;s=ja(this,m,e,n,c,d,p,A,I,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),E=Math.min(l.count,g.start+g.count);for(let f=v,m=E;f<m;f+=3){let P=f,L=f+1,S=f+2;s=ja(this,a,e,n,c,d,p,P,L,S),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}};function Am(i,e,t,n,s,r,a,o){let l;if(e.side===fn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Li,o),l===null)return null;Za.copy(o),Za.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Za);return c<t.near||c>t.far?null:{distance:c,point:Za.clone(),object:i}}function ja(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Xa),i.getVertexPosition(l,qa),i.getVertexPosition(c,Ya);let d=Am(i,e,t,n,Xa,qa,Ya,Qu);if(d){let p=new N;Ri.getBarycoord(Qu,Xa,qa,Ya,p),s&&(d.uv=Ri.getInterpolatedAttribute(s,o,l,c,p,new We)),r&&(d.uv1=Ri.getInterpolatedAttribute(r,o,l,c,p,new We)),a&&(d.normal=Ri.getInterpolatedAttribute(a,o,l,c,p,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new N,materialIndex:0};Ri.getNormal(Xa,qa,Ya,u.normal),d.face=u,d.barycoord=p}return d}var Mo=class extends un{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Xt,d=Xt,p,u){super(null,a,o,l,c,d,s,r,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oc=new N,Cm=new N,Rm=new st,Vn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Oc.subVectors(n,t).cross(Cm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Oc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rm.getNormalMatrix(e),s=this.coplanarPoint(Oc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},gs=new si,Im=new We(.5,.5),Ja=new N,jr=class{constructor(e=new Vn,t=new Vn,n=new Vn,s=new Vn,r=new Vn,a=new Vn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],p=r[5],u=r[6],g=r[7],v=r[8],E=r[9],f=r[10],m=r[11],P=r[12],L=r[13],S=r[14],R=r[15];if(s[0].setComponents(c-a,g-d,m-v,R-P).normalize(),s[1].setComponents(c+a,g+d,m+v,R+P).normalize(),s[2].setComponents(c+o,g+p,m+E,R+L).normalize(),s[3].setComponents(c-o,g-p,m-E,R-L).normalize(),n)s[4].setComponents(l,u,f,S).normalize(),s[5].setComponents(c-l,g-u,m-f,R-S).normalize();else if(s[4].setComponents(c-l,g-u,m-f,R-S).normalize(),t===ni)s[5].setComponents(c+l,g+u,m+f,R+S).normalize();else if(t===Gr)s[5].setComponents(l,u,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){gs.center.set(0,0,0);let t=Im.distanceTo(e.center);return gs.radius=.7071067811865476+t,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ja.x=s.normal.x>0?e.max.x:e.min.x,Ja.y=s.normal.y>0?e.max.y:e.min.y,Ja.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var cr=class extends Di{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},So=new N,Eo=new N,ed=new Lt,Or=new Zi,Ka=new si,Bc=new N,td=new N,wo=class extends vn{constructor(e=new jt,t=new cr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)So.fromBufferAttribute(t,s-1),Eo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=So.distanceTo(Eo);e.setAttribute("lineDistance",new zt(n,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,e.ray.intersectsSphere(Ka)===!1)return;ed.copy(s).invert(),Or.copy(e.ray).applyMatrix4(ed);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let E=g,f=v-1;E<f;E+=c){let m=d.getX(E),P=d.getX(E+1),L=Qa(this,e,Or,l,m,P,E);L&&t.push(L)}if(this.isLineLoop){let E=d.getX(v-1),f=d.getX(g),m=Qa(this,e,Or,l,E,f,v-1);m&&t.push(m)}}else{let g=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let E=g,f=v-1;E<f;E+=c){let m=Qa(this,e,Or,l,E,E+1,E);m&&t.push(m)}if(this.isLineLoop){let E=Qa(this,e,Or,l,v-1,g,v-1);E&&t.push(E)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Qa(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(So.fromBufferAttribute(o,s),Eo.fromBufferAttribute(o,r),t.distanceSqToSegment(So,Eo,Bc,td)>n)return;Bc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Bc);if(!(c<e.near||c>e.far))return{distance:c,point:td.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var nd=new N,id=new N,Jr=class extends wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)nd.fromBufferAttribute(t,s),id.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+nd.distanceTo(id);e.setAttribute("lineDistance",new zt(n,1))}else qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Kr=class extends un{constructor(e=[],t=ns,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Es=class extends un{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ni=class extends un{constructor(e,t,n=ai,s,r,a,o=Xt,l=Xt,c,d=di,p=1){if(d!==di&&d!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:p};super(u,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},To=class extends Ni{constructor(e,t=ai,n=ns,s,r,a=Xt,o=Xt,l,c=di){let d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qr=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},hr=class i extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],p=[],u=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(p,2));function v(E,f,m,P,L,S,R,A,I,y,C){let U=S/I,F=R/y,q=S/2,ie=R/2,ee=A/2,Y=I+1,K=y+1,J=0,ne=0,oe=new N;for(let te=0;te<K;te++){let xe=te*F-ie;for(let we=0;we<Y;we++){let Qe=we*U-q;oe[E]=Qe*P,oe[f]=xe*L,oe[m]=ee,c.push(oe.x,oe.y,oe.z),oe[E]=0,oe[f]=0,oe[m]=A>0?1:-1,d.push(oe.x,oe.y,oe.z),p.push(we/I),p.push(1-te/y),J+=1}}for(let te=0;te<y;te++)for(let xe=0;xe<I;xe++){let we=u+xe+Y*te,Qe=u+xe+Y*(te+1),ht=u+(xe+1)+Y*(te+1),ze=u+(xe+1)+Y*te;l.push(we,Qe,ze),l.push(Qe,ht,ze),ne+=6}o.addGroup(g,ne,C),g+=ne,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ws=class i extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,p=e/o,u=t/l,g=[],v=[],E=[],f=[];for(let m=0;m<d;m++){let P=m*u-a;for(let L=0;L<c;L++){let S=L*p-r;v.push(S,-P,0),E.push(0,0,1),f.push(L/o),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let P=0;P<o;P++){let L=P+c*m,S=P+c*(m+1),R=P+1+c*(m+1),A=P+1+c*m;g.push(L,S,A),g.push(S,R,A)}this.setIndex(g),this.setAttribute("position",new zt(v,3)),this.setAttribute("normal",new zt(E,3)),this.setAttribute("uv",new zt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ea=class extends jt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,s=new N,r=new N;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,d=l.length;c<d;++c){let p=l[c],u=p.start,g=p.count;for(let v=u,E=u+g;v<E;v+=3)for(let f=0;f<3;f++){let m=o.getX(v+f),P=o.getX(v+(f+1)%3);s.fromBufferAttribute(a,m),r.fromBufferAttribute(a,P),sd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let d=3*o+c,p=3*o+(c+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,p),sd(s,r,n)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new zt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function sd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(s)===!0?!1:(t.add(n),t.add(s),!0)}function Cs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(rd(s))s.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(rd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function on(i){let e={};for(let t=0;t<i.length;t++){let n=Cs(i[t]);for(let s in n)e[s]=n[s]}return e}function rd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Pm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _h(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}var ga={clone:Cs,merge:on},Lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends Di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lm,this.fragmentShader=Dm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=Pm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ft().setHex(s.value);break;case"v2":this.uniforms[n].value=new We().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Rt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new st().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ao=class extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Co=class extends Di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ro=class extends Di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function eo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var ji=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Io=class extends ji{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vc,endingEnd:Vc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hc:r=e,o=2*t-n;break;case Gc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Hc:a=e,l=2*n-t;break;case Gc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,g=this._weightNext,v=(n-t)/(s-t),E=v*v,f=E*v,m=-u*f+2*u*E-u*v,P=(1+u)*f+(-1.5-2*u)*E+(-.5+u)*v+1,L=(-1-g)*f+(1.5+g)*E+.5*v,S=g*f-g*E;for(let R=0;R!==o;++R)r[R]=m*a[d+R]+P*a[c+R]+L*a[l+R]+S*a[p+R];return r}},Po=class extends ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(s-t),p=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*p+a[l+u]*d;return r}},Lo=class extends ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Do=class extends ji{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,p=this.outTangents;if(!d||!p){let v=(n-t)/(s-t),E=1-v;for(let f=0;f!==o;++f)r[f]=a[c+f]*E+a[l+f]*v;return r}let u=o*2,g=e-1;for(let v=0;v!==o;++v){let E=a[c+v],f=a[l+v],m=g*u+v*2,P=p[m],L=p[m+1],S=e*u+v*2,R=d[S],A=d[S+1],I=(n-t)/(s-t),y,C,U,F,q;for(let ie=0;ie<8;ie++){y=I*I,C=y*I,U=1-I,F=U*U,q=F*U;let Y=q*t+3*F*I*P+3*U*y*R+C*s-n;if(Math.abs(Y)<1e-10)break;let K=3*F*(P-t)+6*U*I*(R-P)+3*y*(s-R);if(Math.abs(K)<1e-10)break;I=I-Y/K,I=Math.max(0,Math.min(1,I))}r[v]=q*E+3*F*I*L+3*U*y*A+C*f}return r}},Dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=eo(t,this.TimeBufferType),this.values=eo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:eo(e.times,Array),values:eo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Do(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case _o:t=this.InterpolantFactoryMethodLinear;break;case so:t=this.InterpolantFactoryMethodSmooth;break;case kc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return qe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return _o;case this.InterpolantFactoryMethodSmooth:return so;case this.InterpolantFactoryMethodBezier:return kc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ke("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ke("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&jp(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ke("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===so,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let p=o*n,u=p-n,g=p+n;for(let v=0;v!==n;++v){let E=t[p+v];if(E!==t[u+v]||E!==t[g+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let p=o*n,u=a*n;for(let g=0;g!==n;++g)t[u+g]=t[p+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=_o;var Ji=class extends Dn{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=kr;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var No=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};No.prototype.ValueTypeName="color";var Uo=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Uo.prototype.ValueTypeName="number";var Fo=class extends ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)Rn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ta=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}};ta.prototype.ValueTypeName="quaternion";ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends Dn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=kr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Oo.prototype.ValueTypeName="vector";var Bo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,p){return c.push(d,p),this},this.removeHandler=function(d){let p=c.indexOf(d);return p!==-1&&c.splice(p,2),this},this.getHandler=function(d){for(let p=0,u=c.length;p<u;p+=2){let g=c[p],v=c[p+1];if(g.global&&(g.lastIndex=0),g.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Zd=new Bo,zo=class{constructor(e){this.manager=e!==void 0?e:Zd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};zo.DEFAULT_MATERIAL_NAME="__DEFAULT";var to=new N,no=new Rn,hi=new N,na=class extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(to,no,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(to,no,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new N,ad=new We,od=new We,$t=class extends na{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,ad,od),t.subVectors(od,ad)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ts=class extends na{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ia=class extends jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ks=-90,Qs=1,ko=class extends vn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new $t(Ks,Qs,e,t);s.layers=this.layers,this.add(s);let r=new $t(Ks,Qs,e,t);r.layers=this.layers,this.add(r);let a=new $t(Ks,Qs,e,t);a.layers=this.layers,this.add(a);let o=new $t(Ks,Qs,e,t);o.layers=this.layers,this.add(o);let l=new $t(Ks,Qs,e,t);l.layers=this.layers,this.add(l);let c=new $t(Ks,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(p,u,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},Vo=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var xh="\\[\\]\\.:\\/",Nm=new RegExp("["+xh+"]","g"),yh="[^"+xh+"]",Um="[^"+xh.replace("\\.","")+"]",Fm=/((?:WC+[\/:])*)/.source.replace("WC",yh),Om=/(WCOD+)?/.source.replace("WCOD",Um),Bm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yh),zm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yh),km=new RegExp("^"+Fm+Om+Bm+zm+"$"),Vm=["material","materials","bones","map"],Xc=class{constructor(e,t,n){let s=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Nt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Nm,"")}static parseTrackName(e){let t=km.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Vm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Nt.Composite=Xc;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var iv=new Float32Array(1);var Qi=class extends Zr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var ld=new Lt,sa=class{constructor(e,t,n=0,s=1/0){this.ray=new Zi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ar,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ld.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ld),this}intersectObject(e,t=!0,n=[]){return qc(e,this,n,t),n.sort(cd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)qc(e[s],this,n,t);return n.sort(cd),n}};function cd(i,e){return i.distance-e.distance}function qc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)qc(r[a],e,t,!0)}}var ur=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var wh=class wh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};wh.prototype.isMatrix2=!0;var Yc=wh;var hd=new N,io=new N,er=new N,tr=new N,zc=new N,Hm=new N,Gm=new N,ra=class{constructor(e=new N,t=new N){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){hd.subVectors(e,this.start),io.subVectors(this.end,this.start);let n=io.dot(io);if(n===0)return 0;let r=io.dot(hd)/n;return t&&(r=rt(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Hm,n=Gm){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,d=e.end;er.subVectors(c,o),tr.subVectors(d,l),zc.subVectors(o,l);let p=er.dot(er),u=tr.dot(tr),g=tr.dot(zc);if(p<=s&&u<=s)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(p<=s)r=0,a=g/u,a=rt(a,0,1);else{let v=er.dot(zc);if(u<=s)a=0,r=rt(-v/p,0,1);else{let E=er.dot(tr),f=p*u-E*E;f!==0?r=rt((E*g-v*u)/f,0,1):r=0,a=(E*r+g)/u,a<0?(a=0,r=rt(-v/p,0,1)):a>1&&(a=1,r=rt((E-v)/p,0,1))}}return t.copy(o).addScaledVector(er,r),n.copy(l).addScaledVector(tr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var aa=class extends ii{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){qe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function vh(i,e,t,n){let s=Wm(n);switch(t){case uh:return i*e;case fh:return i*e/s.components*s.byteLength;case Zo:return i*e/s.components*s.byteLength;case rs:return i*e*2/s.components*s.byteLength;case jo:return i*e*2/s.components*s.byteLength;case dh:return i*e*3/s.components*s.byteLength;case Wn:return i*e*4/s.components*s.byteLength;case Jo:return i*e*4/s.components*s.byteLength;case ha:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case da:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qo:case tl:return Math.max(i,16)*Math.max(e,8)/4;case Ko:case el:return Math.max(i,8)*Math.max(e,8)/2;case nl:case il:case rl:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sl:case pa:case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case bl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ml:case Sl:case El:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wl:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ma:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wm(i){switch(i){case Nn:case oh:return{byteLength:1,components:1};case fr:case lh:case pi:return{byteLength:2,components:1};case Yo:case $o:return{byteLength:2,components:4};case ai:case qo:case oi:return{byteLength:4,components:1};case ch:case hh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function yf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qm(i){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,p=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let d=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,d);else{p.sort((g,v)=>g.start-v.start);let u=0;for(let g=1;g<p.length;g++){let v=p[u],E=p[g];E.start<=v.start+v.count+1?v.count=Math.max(v.count,E.start+E.count-v.start):(++u,p[u]=E)}p.length=u+1;for(let g=0,v=p.length;g<v;g++){let E=p[g];i.bufferSubData(c,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$m=`#ifdef USE_ALPHAHASH
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
#endif`,Zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qm=`#ifdef USE_AOMAP
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
#endif`,eg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tg=`#ifdef USE_BATCHING
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
#endif`,ng=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ig=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ag=`#ifdef USE_IRIDESCENCE
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
#endif`,og=`#ifdef USE_BUMPMAP
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
#endif`,lg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ug=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gg=`#define PI 3.141592653589793
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
} // validated`,_g=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xg=`vec3 transformedNormal = objectNormal;
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
#endif`,yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Eg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wg=`#ifdef USE_ENVMAP
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
#endif`,Tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ag=`#ifdef USE_ENVMAP
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
#endif`,Cg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rg=`#ifdef USE_ENVMAP
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
#endif`,Ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ng=`#ifdef USE_GRADIENTMAP
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
}`,Ug=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zg=`#ifdef USE_ENVMAP
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
#endif`,kg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wg=`PhysicalMaterial material;
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
#endif`,Xg=`uniform sampler2D dfgLUT;
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
}`,qg=`
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
#endif`,Yg=`#if defined( RE_IndirectDiffuse )
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
#endif`,$g=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,e_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,i_=`#if defined( USE_POINTS_UV )
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
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
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
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,d_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,f_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
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
#endif`,__=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,x_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,y_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,M_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,S_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,w_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,C_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,R_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,P_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,L_=`float getShadowMask() {
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
}`,D_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N_=`#ifdef USE_SKINNING
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
#endif`,U_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F_=`#ifdef USE_SKINNING
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
#endif`,O_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,V_=`#ifdef USE_TRANSMISSION
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
#endif`,H_=`#ifdef USE_TRANSMISSION
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
#endif`,G_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$_=`uniform sampler2D t2D;
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
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,J_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`#include <common>
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
}`,e0=`#if DEPTH_PACKING == 3200
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
}`,t0=`#define DISTANCE
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
}`,n0=`#define DISTANCE
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
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`uniform float scale;
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
}`,a0=`uniform vec3 diffuse;
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
}`,o0=`#include <common>
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
}`,l0=`uniform vec3 diffuse;
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
}`,c0=`#define LAMBERT
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
}`,h0=`#define LAMBERT
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
}`,u0=`#define MATCAP
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
}`,d0=`#define MATCAP
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
}`,f0=`#define NORMAL
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
}`,p0=`#define NORMAL
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
}`,m0=`#define PHONG
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
}`,g0=`#define PHONG
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
}`,_0=`#define STANDARD
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
}`,x0=`#define STANDARD
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
}`,y0=`#define TOON
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
}`,v0=`#define TOON
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
}`,b0=`uniform float size;
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
}`,M0=`uniform vec3 diffuse;
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
}`,S0=`#include <common>
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
}`,E0=`uniform vec3 color;
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
}`,w0=`uniform float rotation;
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
}`,T0=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:Ym,alphahash_pars_fragment:$m,alphamap_fragment:Zm,alphamap_pars_fragment:jm,alphatest_fragment:Jm,alphatest_pars_fragment:Km,aomap_fragment:Qm,aomap_pars_fragment:eg,batching_pars_vertex:tg,batching_vertex:ng,begin_vertex:ig,beginnormal_vertex:sg,bsdfs:rg,iridescence_fragment:ag,bumpmap_pars_fragment:og,clipping_planes_fragment:lg,clipping_planes_pars_fragment:cg,clipping_planes_pars_vertex:hg,clipping_planes_vertex:ug,color_fragment:dg,color_pars_fragment:fg,color_pars_vertex:pg,color_vertex:mg,common:gg,cube_uv_reflection_fragment:_g,defaultnormal_vertex:xg,displacementmap_pars_vertex:yg,displacementmap_vertex:vg,emissivemap_fragment:bg,emissivemap_pars_fragment:Mg,colorspace_fragment:Sg,colorspace_pars_fragment:Eg,envmap_fragment:wg,envmap_common_pars_fragment:Tg,envmap_pars_fragment:Ag,envmap_pars_vertex:Cg,envmap_physical_pars_fragment:zg,envmap_vertex:Rg,fog_vertex:Ig,fog_pars_vertex:Pg,fog_fragment:Lg,fog_pars_fragment:Dg,gradientmap_pars_fragment:Ng,lightmap_pars_fragment:Ug,lights_lambert_fragment:Fg,lights_lambert_pars_fragment:Og,lights_pars_begin:Bg,lights_toon_fragment:kg,lights_toon_pars_fragment:Vg,lights_phong_fragment:Hg,lights_phong_pars_fragment:Gg,lights_physical_fragment:Wg,lights_physical_pars_fragment:Xg,lights_fragment_begin:qg,lights_fragment_maps:Yg,lights_fragment_end:$g,lightprobes_pars_fragment:Zg,logdepthbuf_fragment:jg,logdepthbuf_pars_fragment:Jg,logdepthbuf_pars_vertex:Kg,logdepthbuf_vertex:Qg,map_fragment:e_,map_pars_fragment:t_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:a_,morphcolor_vertex:o_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:h_,normal_fragment_begin:u_,normal_fragment_maps:d_,normal_pars_fragment:f_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:__,clearcoat_normal_fragment_maps:x_,clearcoat_pars_fragment:y_,iridescence_pars_fragment:v_,opaque_fragment:b_,packing:M_,premultiplied_alpha_fragment:S_,project_vertex:E_,dithering_fragment:w_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:C_,shadowmap_pars_fragment:R_,shadowmap_pars_vertex:I_,shadowmap_vertex:P_,shadowmask_pars_fragment:L_,skinbase_vertex:D_,skinning_pars_vertex:N_,skinning_vertex:U_,skinnormal_vertex:F_,specularmap_fragment:O_,specularmap_pars_fragment:B_,tonemapping_fragment:z_,tonemapping_pars_fragment:k_,transmission_fragment:V_,transmission_pars_fragment:H_,uv_pars_fragment:G_,uv_pars_vertex:W_,uv_vertex:X_,worldpos_vertex:q_,background_vert:Y_,background_frag:$_,backgroundCube_vert:Z_,backgroundCube_frag:j_,cube_vert:J_,cube_frag:K_,depth_vert:Q_,depth_frag:e0,distance_vert:t0,distance_frag:n0,equirect_vert:i0,equirect_frag:s0,linedashed_vert:r0,linedashed_frag:a0,meshbasic_vert:o0,meshbasic_frag:l0,meshlambert_vert:c0,meshlambert_frag:h0,meshmatcap_vert:u0,meshmatcap_frag:d0,meshnormal_vert:f0,meshnormal_frag:p0,meshphong_vert:m0,meshphong_frag:g0,meshphysical_vert:_0,meshphysical_frag:x0,meshtoon_vert:y0,meshtoon_frag:v0,points_vert:b0,points_frag:M0,shadow_vert:S0,shadow_frag:E0,sprite_vert:w0,sprite_frag:T0},Ae={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},pn={basic:{uniforms:on([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:on([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ft(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:on([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:on([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:on([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new ft(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:on([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:on([Ae.points,Ae.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:on([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:on([Ae.common,Ae.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:on([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:on([Ae.sprite,Ae.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:on([Ae.common,Ae.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:on([Ae.lights,Ae.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};pn.physical={uniforms:on([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var Il={r:0,b:0,g:0},A0=new Lt,vf=new st;vf.set(-1,0,0,0,1,0,0,0,1);function C0(i,e,t,n,s,r){let a=new ft(0),o=s===!0?0:1,l,c,d=null,p=0,u=null;function g(P){let L=P.isScene===!0?P.background:null;if(L&&L.isTexture){let S=P.backgroundBlurriness>0;L=e.get(L,S)}return L}function v(P){let L=!1,S=g(P);S===null?f(a,o):S&&S.isColor&&(f(S,1),L=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(P,L){let S=g(L);S&&(S.isCubeTexture||S.mapping===la)?(c===void 0&&(c=new Jt(new hr(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Cs(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(A0.makeRotationFromEuler(L.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vf),c.material.toneMapped=xt.getTransfer(S.colorSpace)!==St,(d!==S||p!==S.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=S,p=S.version,u=i.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Jt(new ws(2,2),new dn({name:"BackgroundMaterial",uniforms:Cs(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=xt.getTransfer(S.colorSpace)!==St,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||p!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=S,p=S.version,u=i.toneMapping),l.layers.enableAll(),P.unshift(l,l.geometry,l.material,0,0,null))}function f(P,L){P.getRGB(Il,_h(i)),t.buffers.color.setClear(Il.r,Il.g,Il.b,L,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(P,L=1){a.set(P),o=L,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(P){o=P,f(a,o)},render:v,addToRenderList:E,dispose:m}}function R0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(F,q,ie,ee,Y){let K=!1,J=p(F,ee,ie,q);r!==J&&(r=J,c(r.object)),K=g(F,ee,ie,Y),K&&v(F,ee,ie,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(F,q,ie,ee),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function d(F){return i.deleteVertexArray(F)}function p(F,q,ie,ee){let Y=ee.wireframe===!0,K=n[q.id];K===void 0&&(K={},n[q.id]=K);let J=F.isInstancedMesh===!0?F.id:0,ne=K[J];ne===void 0&&(ne={},K[J]=ne);let oe=ne[ie.id];oe===void 0&&(oe={},ne[ie.id]=oe);let te=oe[Y];return te===void 0&&(te=u(l()),oe[Y]=te),te}function u(F){let q=[],ie=[],ee=[];for(let Y=0;Y<t;Y++)q[Y]=0,ie[Y]=0,ee[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ie,attributeDivisors:ee,object:F,attributes:{},index:null}}function g(F,q,ie,ee){let Y=r.attributes,K=q.attributes,J=0,ne=ie.getAttributes();for(let oe in ne)if(ne[oe].location>=0){let xe=Y[oe],we=K[oe];if(we===void 0&&(oe==="instanceMatrix"&&F.instanceMatrix&&(we=F.instanceMatrix),oe==="instanceColor"&&F.instanceColor&&(we=F.instanceColor)),xe===void 0||xe.attribute!==we||we&&xe.data!==we.data)return!0;J++}return r.attributesNum!==J||r.index!==ee}function v(F,q,ie,ee){let Y={},K=q.attributes,J=0,ne=ie.getAttributes();for(let oe in ne)if(ne[oe].location>=0){let xe=K[oe];xe===void 0&&(oe==="instanceMatrix"&&F.instanceMatrix&&(xe=F.instanceMatrix),oe==="instanceColor"&&F.instanceColor&&(xe=F.instanceColor));let we={};we.attribute=xe,xe&&xe.data&&(we.data=xe.data),Y[oe]=we,J++}r.attributes=Y,r.attributesNum=J,r.index=ee}function E(){let F=r.newAttributes;for(let q=0,ie=F.length;q<ie;q++)F[q]=0}function f(F){m(F,0)}function m(F,q){let ie=r.newAttributes,ee=r.enabledAttributes,Y=r.attributeDivisors;ie[F]=1,ee[F]===0&&(i.enableVertexAttribArray(F),ee[F]=1),Y[F]!==q&&(i.vertexAttribDivisor(F,q),Y[F]=q)}function P(){let F=r.newAttributes,q=r.enabledAttributes;for(let ie=0,ee=q.length;ie<ee;ie++)q[ie]!==F[ie]&&(i.disableVertexAttribArray(ie),q[ie]=0)}function L(F,q,ie,ee,Y,K,J){J===!0?i.vertexAttribIPointer(F,q,ie,Y,K):i.vertexAttribPointer(F,q,ie,ee,Y,K)}function S(F,q,ie,ee){E();let Y=ee.attributes,K=ie.getAttributes(),J=q.defaultAttributeValues;for(let ne in K){let oe=K[ne];if(oe.location>=0){let te=Y[ne];if(te===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(te=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(te=F.instanceColor)),te!==void 0){let xe=te.normalized,we=te.itemSize,Qe=e.get(te);if(Qe===void 0)continue;let ht=Qe.buffer,ze=Qe.type,re=Qe.bytesPerElement,ye=ze===i.INT||ze===i.UNSIGNED_INT||te.gpuType===qo;if(te.isInterleavedBufferAttribute){let de=te.data,je=de.stride,Ze=te.offset;if(de.isInstancedInterleavedBuffer){for(let Fe=0;Fe<oe.locationSize;Fe++)m(oe.location+Fe,de.meshPerAttribute);F.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Fe=0;Fe<oe.locationSize;Fe++)f(oe.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Fe=0;Fe<oe.locationSize;Fe++)L(oe.location+Fe,we/oe.locationSize,ze,xe,je*re,(Ze+we/oe.locationSize*Fe)*re,ye)}else{if(te.isInstancedBufferAttribute){for(let de=0;de<oe.locationSize;de++)m(oe.location+de,te.meshPerAttribute);F.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let de=0;de<oe.locationSize;de++)f(oe.location+de);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let de=0;de<oe.locationSize;de++)L(oe.location+de,we/oe.locationSize,ze,xe,we*re,we/oe.locationSize*de*re,ye)}}else if(J!==void 0){let xe=J[ne];if(xe!==void 0)switch(xe.length){case 2:i.vertexAttrib2fv(oe.location,xe);break;case 3:i.vertexAttrib3fv(oe.location,xe);break;case 4:i.vertexAttrib4fv(oe.location,xe);break;default:i.vertexAttrib1fv(oe.location,xe)}}}}P()}function R(){C();for(let F in n){let q=n[F];for(let ie in q){let ee=q[ie];for(let Y in ee){let K=ee[Y];for(let J in K)d(K[J].object),delete K[J];delete ee[Y]}}delete n[F]}}function A(F){if(n[F.id]===void 0)return;let q=n[F.id];for(let ie in q){let ee=q[ie];for(let Y in ee){let K=ee[Y];for(let J in K)d(K[J].object),delete K[J];delete ee[Y]}}delete n[F.id]}function I(F){for(let q in n){let ie=n[q];for(let ee in ie){let Y=ie[ee];if(Y[F.id]===void 0)continue;let K=Y[F.id];for(let J in K)d(K[J].object),delete K[J];delete Y[F.id]}}}function y(F){for(let q in n){let ie=n[q],ee=F.isInstancedMesh===!0?F.id:0,Y=ie[ee];if(Y!==void 0){for(let K in Y){let J=Y[K];for(let ne in J)d(J[ne].object),delete J[ne];delete Y[K]}delete ie[ee],Object.keys(ie).length===0&&delete n[q]}}}function C(){U(),a=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:U,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:y,releaseStatesOfProgram:I,initAttributes:E,enableAttribute:f,disableUnusedAttributes:P}}function I0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let u=0;for(let g=0;g<d;g++)u+=c[g];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function P0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Wn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let y=I===pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Nn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==oi&&!y)}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(qe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),P=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:g,maxVertexTextures:v,maxTextureSize:E,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:P,maxVaryings:L,maxFragmentUniforms:S,maxSamples:R,samples:A}}function L0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Vn,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let g=p.length!==0||u||n!==0||s;return s=u,n=p.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){t=d(p,u,0)},this.setState=function(p,u,g){let v=p.clippingPlanes,E=p.clipIntersection,f=p.clipShadows,m=i.get(p);if(!s||v===null||v.length===0||r&&!f)r?d(null):c();else{let P=r?0:n,L=P*4,S=m.clippingState||null;l.value=S,S=d(v,u,L,g);for(let R=0;R!==L;++R)S[R]=t[R];m.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=P}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,u,g,v){let E=p!==null?p.length:0,f=null;if(E!==0){if(f=l.value,v!==!0||f===null){let m=g+E*4,P=u.matrixWorldInverse;o.getNormalMatrix(P),(f===null||f.length<m)&&(f=new Float32Array(m));for(let L=0,S=g;L!==E;++L,S+=4)a.copy(p[L]).applyMatrix4(P,o),a.normal.toArray(f,S),f[S+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,f}}var os=4,jd=[.125,.215,.35,.446,.526,.582],Rs=20,D0=256,_a=new Ts,Jd=new ft,Th=null,Ah=0,Ch=0,Rh=!1,N0=new N,Ll=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=N0}=r;Th=this._renderer.getRenderTarget(),Ah=this._renderer.getActiveCubeFace(),Ch=this._renderer.getActiveMipmapLevel(),Rh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Th,Ah,Ch),this._renderer.xr.enabled=Rh,e.scissorTest=!1,mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Th=this._renderer.getRenderTarget(),Ah=this._renderer.getActiveCubeFace(),Ch=this._renderer.getActiveMipmapLevel(),Rh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:pi,format:Wn,colorSpace:Vr,depthBuffer:!1},s=Kd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=U0(r)),this._blurMaterial=O0(r,e,t),this._ggxMaterial=F0(r,e,t)}return s}_compileMaterial(e){let t=new Jt(new jt,e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,s,r){let l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,g=p.toneMapping;p.getClearColor(Jd),p.toneMapping=ri,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new hr,new Ss({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));let E=this._backgroundBox,f=E.material,m=!1,P=e.background;P?P.isColor&&(f.color.copy(P),e.background=null,m=!0):(f.color.copy(Jd),m=!0);for(let L=0;L<6;L++){let S=L%3;S===0?(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[L],r.y,r.z)):S===1?(l.up.set(0,0,c[L]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[L],r.z)):(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[L]));let R=this._cubeSize;mr(s,S*R,L>2?R:0,R,R),p.setRenderTarget(s),m&&p.render(E,l),p.render(e,l)}p.toneMapping=g,p.autoClear=u,e.background=P}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ns||e.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ef()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;mr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,_a)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,g=p*u,{_lodMax:v}=this,E=this._sizeLods[n],f=3*E*(n>v-os?n-v+os:0),m=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,mr(r,f,m,3*E,2*E),s.setRenderTarget(r),s.render(o,_a),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,mr(e,f,m,3*E,2*E),s.setRenderTarget(e),s.render(o,_a)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");let d=3,p=this._lodMeshes[s];p.material=c;let u=c.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Rs-1),E=r/v,f=isFinite(r)?1+Math.floor(d*E):Rs;f>Rs&&qe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Rs}`);let m=[],P=0;for(let I=0;I<Rs;++I){let y=I/E,C=Math.exp(-y*y/2);m.push(C),I===0?P+=C:I<f&&(P+=2*C)}for(let I=0;I<m.length;I++)m[I]=m[I]/P;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:L}=this;u.dTheta.value=v,u.mipInt.value=L-n;let S=this._sizeLods[s],R=3*S*(s>L-os?s-L+os:0),A=4*(this._cubeSize-S);mr(t,R,A,3*S,2*S),l.setRenderTarget(t),l.render(p,_a)}};function U0(i){let e=[],t=[],n=[],s=i,r=i-os+1+jd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-os?l=jd[a-i+os-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],g=6,v=6,E=3,f=2,m=1,P=new Float32Array(E*v*g),L=new Float32Array(f*v*g),S=new Float32Array(m*v*g);for(let A=0;A<g;A++){let I=A%3*2/3-1,y=A>2?0:-1,C=[I,y,0,I+2/3,y,0,I+2/3,y+1,0,I,y,0,I+2/3,y+1,0,I,y+1,0];P.set(C,E*v*A),L.set(u,f*v*A);let U=[A,A,A,A,A,A];S.set(U,m*v*A)}let R=new jt;R.setAttribute("position",new yn(P,E)),R.setAttribute("uv",new yn(L,f)),R.setAttribute("faceIndex",new yn(S,m)),n.push(new Jt(R,null)),s>os&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Kd(i,e,t){let n=new In(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function F0(i,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:D0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function O0(i,e,t){let n=new Float32Array(Rs),s=new N(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Qd(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ef(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Ul(){return`

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
	`}var Dl=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hr(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:fi});r.uniforms.tEquirect.value=t;let a=new Jt(s,r),o=t.minFilter;return t.minFilter===is&&(t.minFilter=Zt),new ko(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function B0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,g=!1){return u==null?null:g?a(u):r(u)}function r(u){if(u&&u.isTexture){let g=u.mapping;if(g===Go||g===Wo)if(e.has(u)){let v=e.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let E=new Dl(v.height);return E.fromEquirectangularTexture(i,u),e.set(u,E),u.addEventListener("dispose",c),o(E.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let g=u.mapping,v=g===Go||g===Wo,E=g===ns||g===As;if(v||E){let f=t.get(u),m=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Ll(i)),f=v?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{let P=u.image;return v&&P&&P.height>0||E&&P&&l(P)?(n===null&&(n=new Ll(i)),f=v?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function o(u,g){return g===Go?u.mapping=ns:g===Wo&&(u.mapping=As),u}function l(u){let g=0,v=6;for(let E=0;E<v;E++)u[E]!==void 0&&g++;return g===v}function c(u){let g=u.target;g.removeEventListener("dispose",c);let v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function d(u){let g=u.target;g.removeEventListener("dispose",d);let v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function z0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function k0(i,e,t,n){let s={},r=new WeakMap;function a(p){let u=p.target;u.index!==null&&e.remove(u.index);for(let v in u.attributes)e.remove(u.attributes[v]);u.removeEventListener("dispose",a),delete s[u.id];let g=r.get(u);g&&(e.remove(g),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(p){let u=p.attributes;for(let g in u)e.update(u[g],i.ARRAY_BUFFER)}function c(p){let u=[],g=p.index,v=p.attributes.position,E=0;if(v===void 0)return;if(g!==null){let P=g.array;E=g.version;for(let L=0,S=P.length;L<S;L+=3){let R=P[L+0],A=P[L+1],I=P[L+2];u.push(R,A,A,I,I,R)}}else{let P=v.array;E=v.version;for(let L=0,S=P.length/3-1;L<S;L+=3){let R=L+0,A=L+1,I=L+2;u.push(R,A,A,I,I,R)}}let f=new(v.count>=65535?$r:Yr)(u,1);f.version=E;let m=r.get(p);m&&e.remove(m),r.set(p,f)}function d(p){let u=r.get(p);if(u){let g=p.index;g!==null&&u.version<g.version&&c(p)}else c(p);return r.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function V0(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,u){i.drawElements(n,u,r,p*a),t.update(u,n,1)}function c(p,u,g){g!==0&&(i.drawElementsInstanced(n,u,r,p*a,g),t.update(u,n,g))}function d(p,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,g);let E=0;for(let f=0;f<g;f++)E+=u[f];t.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function H0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function G0(i,e,t){let n=new WeakMap,s=new Rt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==p){let C=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],P=o.morphAttributes.color||[],L=0;g===!0&&(L=1),v===!0&&(L=2),E===!0&&(L=3);let S=o.attributes.position.count*L,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let A=new Float32Array(S*R*4*p),I=new qr(A,S,R,p);I.type=oi,I.needsUpdate=!0;let y=L*4;for(let U=0;U<p;U++){let F=f[U],q=m[U],ie=P[U],ee=S*R*4*U;for(let Y=0;Y<F.count;Y++){let K=Y*y;g===!0&&(s.fromBufferAttribute(F,Y),A[ee+K+0]=s.x,A[ee+K+1]=s.y,A[ee+K+2]=s.z,A[ee+K+3]=0),v===!0&&(s.fromBufferAttribute(q,Y),A[ee+K+4]=s.x,A[ee+K+5]=s.y,A[ee+K+6]=s.z,A[ee+K+7]=0),E===!0&&(s.fromBufferAttribute(ie,Y),A[ee+K+8]=s.x,A[ee+K+9]=s.y,A[ee+K+10]=s.z,A[ee+K+11]=ie.itemSize===4?s.w:1)}}u={count:p,texture:I,size:new We(S,R)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let E=0;E<c.length;E++)g+=c[E];let v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function W0(i,e,t,n,s){let r=new WeakMap;function a(c){let d=s.render.frame,p=c.geometry,u=e.get(c,p);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let g=c.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return u}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var X0={[Qc]:"LINEAR_TONE_MAPPING",[eh]:"REINHARD_TONE_MAPPING",[th]:"CINEON_TONE_MAPPING",[nh]:"ACES_FILMIC_TONE_MAPPING",[sh]:"AGX_TONE_MAPPING",[rh]:"NEUTRAL_TONE_MAPPING",[ih]:"CUSTOM_TONE_MAPPING"};function q0(i,e,t,n,s,r){let a=new In(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ni(e,t):void 0}),o=new In(e,t,{type:pi,depthBuffer:!1,stencilBuffer:!1}),l=new jt;l.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new zt([0,2,0,0,2,0],2));let c=new Ao({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Jt(l,c),p=new Ts(-1,1,1,-1,0,1),u=null,g=null,v=!1,E,f=null,m=[],P=!1;this.setSize=function(L,S){a.setSize(L,S),o.setSize(L,S);for(let R=0;R<m.length;R++){let A=m[R];A.setSize&&A.setSize(L,S)}},this.setEffects=function(L){m=L,P=m.length>0&&m[0].isRenderPass===!0;let S=a.width,R=a.height;for(let A=0;A<m.length;A++){let I=m[A];I.setSize&&I.setSize(S,R)}},this.begin=function(L,S){if(v||L.toneMapping===ri&&m.length===0)return!1;if(f=S,S!==null){let R=S.width,A=S.height;(a.width!==R||a.height!==A)&&this.setSize(R,A)}return P===!1&&L.setRenderTarget(a),E=L.toneMapping,L.toneMapping=ri,!0},this.hasRenderPass=function(){return P},this.end=function(L,S){L.toneMapping=E,v=!0;let R=a,A=o;for(let I=0;I<m.length;I++){let y=m[I];if(y.enabled!==!1&&(y.render(L,A,R,S),y.needsSwap!==!1)){let C=R;R=A,A=C}}if(u!==L.outputColorSpace||g!==L.toneMapping){u=L.outputColorSpace,g=L.toneMapping,c.defines={},xt.getTransfer(u)===St&&(c.defines.SRGB_TRANSFER="");let I=X0[g];I&&(c.defines[I]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,L.setRenderTarget(f),L.render(d,p),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var bf=new un,Lh=new Ni(1,1),Mf=new qr,Sf=new bo,Ef=new Kr,tf=[],nf=[],sf=new Float32Array(16),rf=new Float32Array(9),af=new Float32Array(4);function _r(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=tf[s];if(r===void 0&&(r=new Float32Array(s),tf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fl(i,e){let t=nf[e];t===void 0&&(t=new Int32Array(e),nf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function J0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;af.set(n),i.uniformMatrix2fv(this.addr,!1,af),Ht(t,n)}}function K0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;rf.set(n),i.uniformMatrix3fv(this.addr,!1,rf),Ht(t,n)}}function Q0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;sf.set(n),i.uniformMatrix4fv(this.addr,!1,sf),Ht(t,n)}}function ex(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function sx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function lx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Lh.compareFunction=t.isReversedDepthBuffer()?Rl:Cl,r=Lh):r=bf,t.setTexture2D(e||r,s)}function cx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Sf,s)}function hx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ef,s)}function ux(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Mf,s)}function dx(i){switch(i){case 5126:return Y0;case 35664:return $0;case 35665:return Z0;case 35666:return j0;case 35674:return J0;case 35675:return K0;case 35676:return Q0;case 5124:case 35670:return ex;case 35667:case 35671:return tx;case 35668:case 35672:return nx;case 35669:case 35673:return ix;case 5125:return sx;case 36294:return rx;case 36295:return ax;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return ux}}function fx(i,e){i.uniform1fv(this.addr,e)}function px(i,e){let t=_r(e,this.size,2);i.uniform2fv(this.addr,t)}function mx(i,e){let t=_r(e,this.size,3);i.uniform3fv(this.addr,t)}function gx(i,e){let t=_r(e,this.size,4);i.uniform4fv(this.addr,t)}function _x(i,e){let t=_r(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function xx(i,e){let t=_r(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function yx(i,e){let t=_r(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function vx(i,e){i.uniform1iv(this.addr,e)}function bx(i,e){i.uniform2iv(this.addr,e)}function Mx(i,e){i.uniform3iv(this.addr,e)}function Sx(i,e){i.uniform4iv(this.addr,e)}function Ex(i,e){i.uniform1uiv(this.addr,e)}function wx(i,e){i.uniform2uiv(this.addr,e)}function Tx(i,e){i.uniform3uiv(this.addr,e)}function Ax(i,e){i.uniform4uiv(this.addr,e)}function Cx(i,e,t){let n=this.cache,s=e.length,r=Fl(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Lh:a=bf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Rx(i,e,t){let n=this.cache,s=e.length,r=Fl(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Sf,r[a])}function Ix(i,e,t){let n=this.cache,s=e.length,r=Fl(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ef,r[a])}function Px(i,e,t){let n=this.cache,s=e.length,r=Fl(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mf,r[a])}function Lx(i){switch(i){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return _x;case 35675:return xx;case 35676:return yx;case 5124:case 35670:return vx;case 35667:case 35671:return bx;case 35668:case 35672:return Mx;case 35669:case 35673:return Sx;case 5125:return Ex;case 36294:return wx;case 36295:return Tx;case 36296:return Ax;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Rx;case 35680:case 36300:case 36308:case 36293:return Ix;case 36289:case 36303:case 36311:case 36292:return Px}}var Dh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dx(t.type)}},Nh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lx(t.type)}},Uh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Ih=/(\w+)(\])?(\[|\.)?/g;function of(i,e){i.seq.push(e),i.map[e.id]=e}function Dx(i,e,t){let n=i.name,s=n.length;for(Ih.lastIndex=0;;){let r=Ih.exec(n),a=Ih.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){of(t,c===void 0?new Dh(o,i,e):new Nh(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new Uh(o),of(t,p)),t=p}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Dx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function lf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Nx=37297,Ux=0;function Fx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var cf=new st;function Ox(i){xt._getMatrix(cf,xt.workingColorSpace,i);let e=`mat3( ${cf.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(i)){case Hr:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Fx(i.getShaderSource(e),o)}else return r}function Bx(i,e){let t=Ox(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var zx={[Qc]:"Linear",[eh]:"Reinhard",[th]:"Cineon",[nh]:"ACESFilmic",[sh]:"AgX",[rh]:"Neutral",[ih]:"Custom"};function kx(i,e){let t=zx[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Pl=new N;function Vx(){xt.getLuminanceCoefficients(Pl);let i=Pl.x.toFixed(4),e=Pl.y.toFixed(4),t=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ya).join(`
`)}function Gx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ya(i){return i!==""}function uf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function df(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fh(i){return i.replace(Xx,Yx)}var qx=new Map;function Yx(i,e){let t=dt[e];if(t===void 0){let n=qx.get(e);if(n!==void 0)t=dt[n],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fh(t)}var $x=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ff(i){return i.replace($x,Zx)}function Zx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var jx={[oa]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function Jx(i){return jx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Kx={[ns]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[la]:"ENVMAP_TYPE_CUBE_UV"};function Qx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Kx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var ey={[As]:"ENVMAP_MODE_REFRACTION"};function ty(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ey[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ny={[Kc]:"ENVMAP_BLENDING_MULTIPLY",[Ld]:"ENVMAP_BLENDING_MIX",[Dd]:"ENVMAP_BLENDING_ADD"};function iy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ny[i.combine]||"ENVMAP_BLENDING_NONE"}function sy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ry(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Jx(t),c=Qx(t),d=ty(t),p=iy(t),u=sy(t),g=Hx(t),v=Gx(r),E=s.createProgram(),f,m,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ya).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ya).join(`
`),m.length>0&&(m+=`
`)):(f=[pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ya).join(`
`),m=[pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?dt.tonemapping_pars_fragment:"",t.toneMapping!==ri?kx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,Bx("linearToOutputTexel",t.outputColorSpace),Vx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ya).join(`
`)),a=Fh(a),a=uf(a,t),a=df(a,t),o=Fh(o),o=uf(o,t),o=df(o,t),a=ff(a),o=ff(o),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",t.glslVersion===mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let L=P+f+a,S=P+m+o,R=lf(s,s.VERTEX_SHADER,L),A=lf(s,s.FRAGMENT_SHADER,S);s.attachShader(E,R),s.attachShader(E,A),t.index0AttributeName!==void 0?s.bindAttribLocation(E,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E);function I(F){if(i.debug.checkShaderErrors){let q=s.getProgramInfoLog(E)||"",ie=s.getShaderInfoLog(R)||"",ee=s.getShaderInfoLog(A)||"",Y=q.trim(),K=ie.trim(),J=ee.trim(),ne=!0,oe=!0;if(s.getProgramParameter(E,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,E,R,A);else{let te=hf(s,R,"vertex"),xe=hf(s,A,"fragment");Ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(E,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+Y+`
`+te+`
`+xe)}else Y!==""?qe("WebGLProgram: Program Info Log:",Y):(K===""||J==="")&&(oe=!1);oe&&(F.diagnostics={runnable:ne,programLog:Y,vertexShader:{log:K,prefix:f},fragmentShader:{log:J,prefix:m}})}s.deleteShader(R),s.deleteShader(A),y=new gr(s,E),C=Wx(s,E)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let C;this.getAttributes=function(){return C===void 0&&I(this),C};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(E,Nx)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ux++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=R,this.fragmentShader=A,this}var ay=0,Oh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bh(e),t.set(e,n)),n}},Bh=class{constructor(e){this.id=ay++,this.code=e,this.usedTimes=0}};function oy(i){return i===rs||i===pa||i===ma}function ly(i,e,t,n,s,r){let a=new ar,o=new Oh,l=new Set,c=[],d=new Map,p=n.logarithmicDepthBuffer,u=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function E(y,C,U,F,q,ie){let ee=F.fog,Y=q.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,J=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||K,J),oe=ne&&ne.mapping===la?ne.image.height:null,te=g[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&qe("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let xe=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,we=xe!==void 0?xe.length:0,Qe=0;Y.morphAttributes.position!==void 0&&(Qe=1),Y.morphAttributes.normal!==void 0&&(Qe=2),Y.morphAttributes.color!==void 0&&(Qe=3);let ht,ze,re,ye;if(te){let Pe=pn[te];ht=Pe.vertexShader,ze=Pe.fragmentShader}else{ht=y.vertexShader,ze=y.fragmentShader;let Pe=o.getVertexShaderStage(y),Dt=o.getFragmentShaderStage(y);o.update(y,Pe,Dt),re=Pe.id,ye=Dt.id}let de=i.getRenderTarget(),je=i.state.buffers.depth.getReversed(),Ze=q.isInstancedMesh===!0,Fe=q.isBatchedMesh===!0,lt=!!y.map,et=!!y.matcap,pt=!!ne,ot=!!y.aoMap,ce=!!y.lightMap,Ne=!!y.bumpMap&&y.wireframe===!1,Oe=!!y.normalMap,He=!!y.displacementMap,ct=!!y.emissiveMap,Je=!!y.metalnessMap,mt=!!y.roughnessMap,B=y.anisotropy>0,Ot=y.clearcoat>0,at=y.dispersion>0,w=y.iridescence>0,_=y.sheen>0,k=y.transmission>0,$=B&&!!y.anisotropyMap,G=Ot&&!!y.clearcoatMap,fe=Ot&&!!y.clearcoatNormalMap,ge=Ot&&!!y.clearcoatRoughnessMap,H=w&&!!y.iridescenceMap,Q=w&&!!y.iridescenceThicknessMap,pe=_&&!!y.sheenColorMap,Be=_&&!!y.sheenRoughnessMap,Te=!!y.specularMap,Ce=!!y.specularColorMap,Ge=!!y.specularIntensityMap,Xe=k&&!!y.transmissionMap,tt=k&&!!y.thicknessMap,D=!!y.gradientMap,me=!!y.alphaMap,ae=y.alphaTest>0,ve=!!y.alphaHash,Re=!!y.extensions,ue=ri;y.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(ue=i.toneMapping);let ke={shaderID:te,shaderType:y.type,shaderName:y.name,vertexShader:ht,fragmentShader:ze,defines:y.defines,customVertexShaderID:re,customFragmentShaderID:ye,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&q._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&q.instanceColor!==null,instancingMorph:Ze&&q.morphTexture!==null,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:lt,matcap:et,envMap:pt,envMapMode:pt&&ne.mapping,envMapCubeUVHeight:oe,aoMap:ot,lightMap:ce,bumpMap:Ne,normalMap:Oe,displacementMap:He,emissiveMap:ct,normalMapObjectSpace:Oe&&y.normalMapType===Fd,normalMapTangentSpace:Oe&&y.normalMapType===ph,packedNormalMap:Oe&&y.normalMapType===ph&&oy(y.normalMap.format),metalnessMap:Je,roughnessMap:mt,anisotropy:B,anisotropyMap:$,clearcoat:Ot,clearcoatMap:G,clearcoatNormalMap:fe,clearcoatRoughnessMap:ge,dispersion:at,iridescence:w,iridescenceMap:H,iridescenceThicknessMap:Q,sheen:_,sheenColorMap:pe,sheenRoughnessMap:Be,specularMap:Te,specularColorMap:Ce,specularIntensityMap:Ge,transmission:k,transmissionMap:Xe,thicknessMap:tt,gradientMap:D,opaque:y.transparent===!1&&y.blending===ys&&y.alphaToCoverage===!1,alphaMap:me,alphaTest:ae,alphaHash:ve,combine:y.combine,mapUv:lt&&v(y.map.channel),aoMapUv:ot&&v(y.aoMap.channel),lightMapUv:ce&&v(y.lightMap.channel),bumpMapUv:Ne&&v(y.bumpMap.channel),normalMapUv:Oe&&v(y.normalMap.channel),displacementMapUv:He&&v(y.displacementMap.channel),emissiveMapUv:ct&&v(y.emissiveMap.channel),metalnessMapUv:Je&&v(y.metalnessMap.channel),roughnessMapUv:mt&&v(y.roughnessMap.channel),anisotropyMapUv:$&&v(y.anisotropyMap.channel),clearcoatMapUv:G&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:fe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:H&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&v(y.sheenRoughnessMap.channel),specularMapUv:Te&&v(y.specularMap.channel),specularColorMapUv:Ce&&v(y.specularColorMap.channel),specularIntensityMapUv:Ge&&v(y.specularIntensityMap.channel),transmissionMapUv:Xe&&v(y.transmissionMap.channel),thicknessMapUv:tt&&v(y.thicknessMap.channel),alphaMapUv:me&&v(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Oe||B),vertexNormals:!!Y.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Y.attributes.uv&&(lt||me),fog:!!ee,useFog:y.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||Y.attributes.normal===void 0&&Oe===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:je,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Qe,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:ie.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:lt&&y.map.isVideoTexture===!0&&xt.getTransfer(y.map.colorSpace)===St,decodeVideoTextureEmissive:ct&&y.emissiveMap.isVideoTexture===!0&&xt.getTransfer(y.emissiveMap.colorSpace)===St,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Gn,flipSided:y.side===fn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&y.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function f(y){let C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(let U in y.defines)C.push(U),C.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(m(C,y),P(C,y),C.push(i.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function m(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function P(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function L(y){let C=g[y.type],U;if(C){let F=pn[C];U=ga.clone(F.uniforms)}else U=y.uniforms;return U}function S(y,C){let U=d.get(C);return U!==void 0?++U.usedTimes:(U=new ry(i,C,y,s),c.push(U),d.set(C,U)),U}function R(y){if(--y.usedTimes===0){let C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function A(y){o.remove(y)}function I(){o.dispose()}return{getParameters:E,getProgramCacheKey:f,getUniforms:L,acquireProgram:S,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:I}}function cy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function hy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function mf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function o(u,g,v,E,f,m){let P=i[e];return P===void 0?(P={id:u.id,object:u,geometry:g,material:v,materialVariant:a(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:m},i[e]=P):(P.id=u.id,P.object=u,P.geometry=g,P.material=v,P.materialVariant=a(u),P.groupOrder=E,P.renderOrder=u.renderOrder,P.z=f,P.group=m),e++,P}function l(u,g,v,E,f,m){let P=o(u,g,v,E,f,m);v.transmission>0?n.push(P):v.transparent===!0?s.push(P):t.push(P)}function c(u,g,v,E,f,m){let P=o(u,g,v,E,f,m);v.transmission>0?n.unshift(P):v.transparent===!0?s.unshift(P):t.unshift(P)}function d(u,g,v){t.length>1&&t.sort(u||hy),n.length>1&&n.sort(g||mf),s.length>1&&s.sort(g||mf),v&&(t.reverse(),n.reverse(),s.reverse())}function p(){for(let u=e,g=i.length;u<g;u++){let v=i[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:d}}function uy(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new gf,i.set(n,[a])):s>=r.length?(a=new gf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function dy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ft};break;case"SpotLight":t={position:new N,direction:new N,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ft,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":t={color:new ft,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function fy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var py=0;function my(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gy(i){let e=new dy,t=fy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new Lt,a=new Lt;function o(c){let d=0,p=0,u=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let g=0,v=0,E=0,f=0,m=0,P=0,L=0,S=0,R=0,A=0,I=0;c.sort(my);for(let C=0,U=c.length;C<U;C++){let F=c[C],q=F.color,ie=F.intensity,ee=F.distance,Y=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===rs?Y=F.shadow.map.texture:Y=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)d+=q.r*ie,p+=q.g*ie,u+=q.b*ie;else if(F.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(F.sh.coefficients[K],ie);I++}else if(F.isDirectionalLight){let K=e.get(F);if(K.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let J=F.shadow,ne=t.get(F);ne.shadowIntensity=J.intensity,ne.shadowBias=J.bias,ne.shadowNormalBias=J.normalBias,ne.shadowRadius=J.radius,ne.shadowMapSize=J.mapSize,n.directionalShadow[g]=ne,n.directionalShadowMap[g]=Y,n.directionalShadowMatrix[g]=F.shadow.matrix,P++}n.directional[g]=K,g++}else if(F.isSpotLight){let K=e.get(F);K.position.setFromMatrixPosition(F.matrixWorld),K.color.copy(q).multiplyScalar(ie),K.distance=ee,K.coneCos=Math.cos(F.angle),K.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),K.decay=F.decay,n.spot[E]=K;let J=F.shadow;if(F.map&&(n.spotLightMap[R]=F.map,R++,J.updateMatrices(F),F.castShadow&&A++),n.spotLightMatrix[E]=J.matrix,F.castShadow){let ne=t.get(F);ne.shadowIntensity=J.intensity,ne.shadowBias=J.bias,ne.shadowNormalBias=J.normalBias,ne.shadowRadius=J.radius,ne.shadowMapSize=J.mapSize,n.spotShadow[E]=ne,n.spotShadowMap[E]=Y,S++}E++}else if(F.isRectAreaLight){let K=e.get(F);K.color.copy(q).multiplyScalar(ie),K.halfWidth.set(F.width*.5,0,0),K.halfHeight.set(0,F.height*.5,0),n.rectArea[f]=K,f++}else if(F.isPointLight){let K=e.get(F);if(K.color.copy(F.color).multiplyScalar(F.intensity),K.distance=F.distance,K.decay=F.decay,F.castShadow){let J=F.shadow,ne=t.get(F);ne.shadowIntensity=J.intensity,ne.shadowBias=J.bias,ne.shadowNormalBias=J.normalBias,ne.shadowRadius=J.radius,ne.shadowMapSize=J.mapSize,ne.shadowCameraNear=J.camera.near,ne.shadowCameraFar=J.camera.far,n.pointShadow[v]=ne,n.pointShadowMap[v]=Y,n.pointShadowMatrix[v]=F.shadow.matrix,L++}n.point[v]=K,v++}else if(F.isHemisphereLight){let K=e.get(F);K.skyColor.copy(F.color).multiplyScalar(ie),K.groundColor.copy(F.groundColor).multiplyScalar(ie),n.hemi[m]=K,m++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=p,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==E||y.rectAreaLength!==f||y.hemiLength!==m||y.numDirectionalShadows!==P||y.numPointShadows!==L||y.numSpotShadows!==S||y.numSpotMaps!==R||y.numLightProbes!==I)&&(n.directional.length=g,n.spot.length=E,n.rectArea.length=f,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=P,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=S+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=I,y.directionalLength=g,y.pointLength=v,y.spotLength=E,y.rectAreaLength=f,y.hemiLength=m,y.numDirectionalShadows=P,y.numPointShadows=L,y.numSpotShadows=S,y.numSpotMaps=R,y.numLightProbes=I,n.version=py++)}function l(c,d){let p=0,u=0,g=0,v=0,E=0,f=d.matrixWorldInverse;for(let m=0,P=c.length;m<P;m++){let L=c[m];if(L.isDirectionalLight){let S=n.directional[p];S.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),p++}else if(L.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(L.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(L.matrixWorld),s.setFromMatrixPosition(L.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),g++}else if(L.isRectAreaLight){let S=n.rectArea[v];S.position.setFromMatrixPosition(L.matrixWorld),S.position.applyMatrix4(f),a.identity(),r.copy(L.matrixWorld),r.premultiply(f),a.extractRotation(r),S.halfWidth.set(L.width*.5,0,0),S.halfHeight.set(0,L.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(L.isPointLight){let S=n.point[u];S.position.setFromMatrixPosition(L.matrixWorld),S.position.applyMatrix4(f),u++}else if(L.isHemisphereLight){let S=n.hemi[E];S.direction.setFromMatrixPosition(L.matrixWorld),S.direction.transformDirection(f),E++}}}return{setup:o,setupView:l,state:n}}function _f(i){let e=new gy(i),t=[],n=[],s=[];function r(u){p.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}let p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function _y(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new _f(i),e.set(s,[o])):r>=a.length?(o=new _f(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var xy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yy=`uniform sampler2D shadow_pass;
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
}`,vy=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],by=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],xf=new Lt,xa=new N,Ph=new N;function My(i,e,t){let n=new jr,s=new We,r=new We,a=new Rt,o=new Co,l=new Ro,c={},d=t.maxTextureSize,p={[Li]:fn,[fn]:Li,[Gn]:Gn},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:xy,fragmentShader:yy}),g=u.clone();g.defines.HORIZONTAL_PASS=1;let v=new jt;v.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let E=new Jt(v,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let m=this.type;this.render=function(A,I,y){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;this.type===fd&&(qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oa);let C=i.getRenderTarget(),U=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),q=i.state;q.setBlending(fi),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let ie=m!==this.type;ie&&I.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(Y=>Y.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,Y=A.length;ee<Y;ee++){let K=A[ee],J=K.shadow;if(J===void 0){qe("WebGLShadowMap:",K,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let ne=J.getFrameExtents();s.multiply(ne),r.copy(J.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,J.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,J.mapSize.y=r.y));let oe=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=oe,J.map===null||ie===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===dr){if(K.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new In(s.x,s.y,{format:rs,type:pi,minFilter:Zt,magFilter:Zt,generateMipmaps:!1}),J.map.texture.name=K.name+".shadowMap",J.map.depthTexture=new Ni(s.x,s.y,oi),J.map.depthTexture.name=K.name+".shadowMapDepth",J.map.depthTexture.format=di,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Xt,J.map.depthTexture.magFilter=Xt}else K.isPointLight?(J.map=new Dl(s.x),J.map.depthTexture=new To(s.x,ai)):(J.map=new In(s.x,s.y),J.map.depthTexture=new Ni(s.x,s.y,ai)),J.map.depthTexture.name=K.name+".shadowMap",J.map.depthTexture.format=di,this.type===oa?(J.map.depthTexture.compareFunction=oe?Rl:Cl,J.map.depthTexture.minFilter=Zt,J.map.depthTexture.magFilter=Zt):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Xt,J.map.depthTexture.magFilter=Xt);J.camera.updateProjectionMatrix()}let te=J.map.isWebGLCubeRenderTarget?6:1;for(let xe=0;xe<te;xe++){if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,xe),i.clear();else{xe===0&&(i.setRenderTarget(J.map),i.clear());let we=J.getViewport(xe);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),q.viewport(a)}if(K.isPointLight){let we=J.camera,Qe=J.matrix,ht=K.distance||we.far;ht!==we.far&&(we.far=ht,we.updateProjectionMatrix()),xa.setFromMatrixPosition(K.matrixWorld),we.position.copy(xa),Ph.copy(we.position),Ph.add(vy[xe]),we.up.copy(by[xe]),we.lookAt(Ph),we.updateMatrixWorld(),Qe.makeTranslation(-xa.x,-xa.y,-xa.z),xf.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),J._frustum.setFromProjectionMatrix(xf,we.coordinateSystem,we.reversedDepth)}else J.updateMatrices(K);n=J.getFrustum(),S(I,y,J.camera,K,this.type)}J.isPointLightShadow!==!0&&this.type===dr&&P(J,y),J.needsUpdate=!1}m=this.type,f.needsUpdate=!1,i.setRenderTarget(C,U,F)};function P(A,I){let y=e.update(E);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new In(s.x,s.y,{format:rs,type:pi})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(I,null,y,u,E,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value=A.mapSize,g.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(I,null,y,g,E,null)}function L(A,I,y,C){let U=null,F=y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)U=F;else if(U=y.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let q=U.uuid,ie=I.uuid,ee=c[q];ee===void 0&&(ee={},c[q]=ee);let Y=ee[ie];Y===void 0&&(Y=U.clone(),ee[ie]=Y,I.addEventListener("dispose",R)),U=Y}if(U.visible=I.visible,U.wireframe=I.wireframe,C===dr?U.side=I.shadowSide!==null?I.shadowSide:I.side:U.side=I.shadowSide!==null?I.shadowSide:p[I.side],U.alphaMap=I.alphaMap,U.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,U.map=I.map,U.clipShadows=I.clipShadows,U.clippingPlanes=I.clippingPlanes,U.clipIntersection=I.clipIntersection,U.displacementMap=I.displacementMap,U.displacementScale=I.displacementScale,U.displacementBias=I.displacementBias,U.wireframeLinewidth=I.wireframeLinewidth,U.linewidth=I.linewidth,y.isPointLight===!0&&U.isMeshDistanceMaterial===!0){let q=i.properties.get(U);q.light=y}return U}function S(A,I,y,C,U){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&U===dr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,A.matrixWorld);let ie=e.update(A),ee=A.material;if(Array.isArray(ee)){let Y=ie.groups;for(let K=0,J=Y.length;K<J;K++){let ne=Y[K],oe=ee[ne.materialIndex];if(oe&&oe.visible){let te=L(A,oe,C,U);A.onBeforeShadow(i,A,I,y,ie,te,ne),i.renderBufferDirect(y,null,ie,te,A,ne),A.onAfterShadow(i,A,I,y,ie,te,ne)}}}else if(ee.visible){let Y=L(A,ee,C,U);A.onBeforeShadow(i,A,I,y,ie,Y,null),i.renderBufferDirect(y,null,ie,Y,A,null),A.onAfterShadow(i,A,I,y,ie,Y,null)}}let q=A.children;for(let ie=0,ee=q.length;ie<ee;ie++)S(q[ie],I,y,C,U)}function R(A){A.target.removeEventListener("dispose",R);for(let y in c){let C=c[y],U=A.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function Sy(i,e){function t(){let D=!1,me=new Rt,ae=null,ve=new Rt(0,0,0,0);return{setMask:function(Re){ae!==Re&&!D&&(i.colorMask(Re,Re,Re,Re),ae=Re)},setLocked:function(Re){D=Re},setClear:function(Re,ue,ke,Pe,Dt){Dt===!0&&(Re*=Pe,ue*=Pe,ke*=Pe),me.set(Re,ue,ke,Pe),ve.equals(me)===!1&&(i.clearColor(Re,ue,ke,Pe),ve.copy(me))},reset:function(){D=!1,ae=null,ve.set(-1,0,0,0)}}}function n(){let D=!1,me=!1,ae=null,ve=null,Re=null;return{setReversed:function(ue){if(me!==ue){let ke=e.get("EXT_clip_control");ue?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),me=ue;let Pe=Re;Re=null,this.setClear(Pe)}},getReversed:function(){return me},setTest:function(ue){ue?de(i.DEPTH_TEST):je(i.DEPTH_TEST)},setMask:function(ue){ae!==ue&&!D&&(i.depthMask(ue),ae=ue)},setFunc:function(ue){if(me&&(ue=qd[ue]),ve!==ue){switch(ue){case oo:i.depthFunc(i.NEVER);break;case lo:i.depthFunc(i.ALWAYS);break;case co:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case ho:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case fo:i.depthFunc(i.GREATER);break;case po:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=ue}},setLocked:function(ue){D=ue},setClear:function(ue){Re!==ue&&(Re=ue,me&&(ue=1-ue),i.clearDepth(ue))},reset:function(){D=!1,ae=null,ve=null,Re=null,me=!1}}}function s(){let D=!1,me=null,ae=null,ve=null,Re=null,ue=null,ke=null,Pe=null,Dt=null;return{setTest:function(Et){D||(Et?de(i.STENCIL_TEST):je(i.STENCIL_TEST))},setMask:function(Et){me!==Et&&!D&&(i.stencilMask(Et),me=Et)},setFunc:function(Et,Mn,Sn){(ae!==Et||ve!==Mn||Re!==Sn)&&(i.stencilFunc(Et,Mn,Sn),ae=Et,ve=Mn,Re=Sn)},setOp:function(Et,Mn,Sn){(ue!==Et||ke!==Mn||Pe!==Sn)&&(i.stencilOp(Et,Mn,Sn),ue=Et,ke=Mn,Pe=Sn)},setLocked:function(Et){D=Et},setClear:function(Et){Dt!==Et&&(i.clearStencil(Et),Dt=Et)},reset:function(){D=!1,me=null,ae=null,ve=null,Re=null,ue=null,ke=null,Pe=null,Dt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,d={},p={},u={},g=new WeakMap,v=[],E=null,f=!1,m=null,P=null,L=null,S=null,R=null,A=null,I=null,y=new ft(0,0,0),C=0,U=!1,F=null,q=null,ie=null,ee=null,Y=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,ne=0,oe=i.getParameter(i.VERSION);oe.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(oe)[1]),J=ne>=1):oe.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),J=ne>=2);let te=null,xe={},we=i.getParameter(i.SCISSOR_BOX),Qe=i.getParameter(i.VIEWPORT),ht=new Rt().fromArray(we),ze=new Rt().fromArray(Qe);function re(D,me,ae,ve){let Re=new Uint8Array(4),ue=i.createTexture();i.bindTexture(D,ue),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<ae;ke++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(me,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(me+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return ue}let ye={};ye[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),de(i.DEPTH_TEST),a.setFunc(vs),Ne(!1),Oe($c),de(i.CULL_FACE),ot(fi);function de(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function je(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Ze(D,me){return u[D]!==me?(i.bindFramebuffer(D,me),u[D]=me,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=me),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=me),!0):!1}function Fe(D,me){let ae=v,ve=!1;if(D){ae=g.get(me),ae===void 0&&(ae=[],g.set(me,ae));let Re=D.textures;if(ae.length!==Re.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,ke=Re.length;ue<ke;ue++)ae[ue]=i.COLOR_ATTACHMENT0+ue;ae.length=Re.length,ve=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,ve=!0);ve&&i.drawBuffers(ae)}function lt(D){return E!==D?(i.useProgram(D),E=D,!0):!1}let et={[Yi]:i.FUNC_ADD,[md]:i.FUNC_SUBTRACT,[gd]:i.FUNC_REVERSE_SUBTRACT};et[_d]=i.MIN,et[xd]=i.MAX;let pt={[yd]:i.ZERO,[vd]:i.ONE,[bd]:i.SRC_COLOR,[ro]:i.SRC_ALPHA,[Ad]:i.SRC_ALPHA_SATURATE,[wd]:i.DST_COLOR,[Sd]:i.DST_ALPHA,[Md]:i.ONE_MINUS_SRC_COLOR,[ao]:i.ONE_MINUS_SRC_ALPHA,[Td]:i.ONE_MINUS_DST_COLOR,[Ed]:i.ONE_MINUS_DST_ALPHA,[Cd]:i.CONSTANT_COLOR,[Rd]:i.ONE_MINUS_CONSTANT_COLOR,[Id]:i.CONSTANT_ALPHA,[Pd]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(D,me,ae,ve,Re,ue,ke,Pe,Dt,Et){if(D===fi){f===!0&&(je(i.BLEND),f=!1);return}if(f===!1&&(de(i.BLEND),f=!0),D!==pd){if(D!==m||Et!==U){if((P!==Yi||R!==Yi)&&(i.blendEquation(i.FUNC_ADD),P=Yi,R=Yi),Et)switch(D){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zc:i.blendFunc(i.ONE,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",D);break}else switch(D){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case jc:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jc:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",D);break}L=null,S=null,A=null,I=null,y.set(0,0,0),C=0,m=D,U=Et}return}Re=Re||me,ue=ue||ae,ke=ke||ve,(me!==P||Re!==R)&&(i.blendEquationSeparate(et[me],et[Re]),P=me,R=Re),(ae!==L||ve!==S||ue!==A||ke!==I)&&(i.blendFuncSeparate(pt[ae],pt[ve],pt[ue],pt[ke]),L=ae,S=ve,A=ue,I=ke),(Pe.equals(y)===!1||Dt!==C)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Dt),y.copy(Pe),C=Dt),m=D,U=!1}function ce(D,me){D.side===Gn?je(i.CULL_FACE):de(i.CULL_FACE);let ae=D.side===fn;me&&(ae=!ae),Ne(ae),D.blending===ys&&D.transparent===!1?ot(fi):ot(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ve=D.stencilWrite;o.setTest(ve),ve&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ct(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):je(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(D){F!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),F=D)}function Oe(D){D!==ud?(de(i.CULL_FACE),D!==q&&(D===$c?i.cullFace(i.BACK):D===dd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):je(i.CULL_FACE),q=D}function He(D){D!==ie&&(J&&i.lineWidth(D),ie=D)}function ct(D,me,ae){D?(de(i.POLYGON_OFFSET_FILL),(ee!==me||Y!==ae)&&(ee=me,Y=ae,a.getReversed()&&(me=-me),i.polygonOffset(me,ae))):je(i.POLYGON_OFFSET_FILL)}function Je(D){D?de(i.SCISSOR_TEST):je(i.SCISSOR_TEST)}function mt(D){D===void 0&&(D=i.TEXTURE0+K-1),te!==D&&(i.activeTexture(D),te=D)}function B(D,me,ae){ae===void 0&&(te===null?ae=i.TEXTURE0+K-1:ae=te);let ve=xe[ae];ve===void 0&&(ve={type:void 0,texture:void 0},xe[ae]=ve),(ve.type!==D||ve.texture!==me)&&(te!==ae&&(i.activeTexture(ae),te=ae),i.bindTexture(D,me||ye[D]),ve.type=D,ve.texture=me)}function Ot(){let D=xe[te];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function at(){try{i.compressedTexImage2D(...arguments)}catch(D){Ke("WebGLState:",D)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(D){Ke("WebGLState:",D)}}function _(){try{i.texSubImage2D(...arguments)}catch(D){Ke("WebGLState:",D)}}function k(){try{i.texSubImage3D(...arguments)}catch(D){Ke("WebGLState:",D)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Ke("WebGLState:",D)}}function G(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Ke("WebGLState:",D)}}function fe(){try{i.texStorage2D(...arguments)}catch(D){Ke("WebGLState:",D)}}function ge(){try{i.texStorage3D(...arguments)}catch(D){Ke("WebGLState:",D)}}function H(){try{i.texImage2D(...arguments)}catch(D){Ke("WebGLState:",D)}}function Q(){try{i.texImage3D(...arguments)}catch(D){Ke("WebGLState:",D)}}function pe(D){return p[D]!==void 0?p[D]:i.getParameter(D)}function Be(D,me){p[D]!==me&&(i.pixelStorei(D,me),p[D]=me)}function Te(D){ht.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ht.copy(D))}function Ce(D){ze.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),ze.copy(D))}function Ge(D,me){let ae=c.get(me);ae===void 0&&(ae=new WeakMap,c.set(me,ae));let ve=ae.get(D);ve===void 0&&(ve=i.getUniformBlockIndex(me,D.name),ae.set(D,ve))}function Xe(D,me){let ve=c.get(me).get(D);l.get(me)!==ve&&(i.uniformBlockBinding(me,ve,D.__bindingPointIndex),l.set(me,ve))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},p={},te=null,xe={},u={},g=new WeakMap,v=[],E=null,f=!1,m=null,P=null,L=null,S=null,R=null,A=null,I=null,y=new ft(0,0,0),C=0,U=!1,F=null,q=null,ie=null,ee=null,Y=null,ht.set(0,0,i.canvas.width,i.canvas.height),ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:de,disable:je,bindFramebuffer:Ze,drawBuffers:Fe,useProgram:lt,setBlending:ot,setMaterial:ce,setFlipSided:Ne,setCullFace:Oe,setLineWidth:He,setPolygonOffset:ct,setScissorTest:Je,activeTexture:mt,bindTexture:B,unbindTexture:Ot,compressedTexImage2D:at,compressedTexImage3D:w,texImage2D:H,texImage3D:Q,pixelStorei:Be,getParameter:pe,updateUBOMapping:Ge,uniformBlockBinding:Xe,texStorage2D:fe,texStorage3D:ge,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:$,compressedTexSubImage3D:G,scissor:Te,viewport:Ce,reset:tt}}function Ey(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,d=new WeakMap,p=new Set,u,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(w,_){return v?new OffscreenCanvas(w,_):Wr("canvas")}function f(w,_,k){let $=1,G=at(w);if((G.width>k||G.height>k)&&($=k/Math.max(G.width,G.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let fe=Math.floor($*G.width),ge=Math.floor($*G.height);u===void 0&&(u=E(fe,ge));let H=_?E(fe,ge):u;return H.width=fe,H.height=ge,H.getContext("2d").drawImage(w,0,0,fe,ge),qe("WebGLRenderer: Texture has been resized from ("+G.width+"x"+G.height+") to ("+fe+"x"+ge+")."),H}else return"data"in w&&qe("WebGLRenderer: Image in DataTexture is too big ("+G.width+"x"+G.height+")."),w;return w}function m(w){return w.generateMipmaps}function P(w){i.generateMipmap(w)}function L(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(w,_,k,$,G,fe=!1){if(w!==null){if(i[w]!==void 0)return i[w];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ge;$&&(ge=e.get("EXT_texture_norm16"),ge||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=_;if(_===i.RED&&(k===i.FLOAT&&(H=i.R32F),k===i.HALF_FLOAT&&(H=i.R16F),k===i.UNSIGNED_BYTE&&(H=i.R8),k===i.UNSIGNED_SHORT&&ge&&(H=ge.R16_EXT),k===i.SHORT&&ge&&(H=ge.R16_SNORM_EXT)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.R8UI),k===i.UNSIGNED_SHORT&&(H=i.R16UI),k===i.UNSIGNED_INT&&(H=i.R32UI),k===i.BYTE&&(H=i.R8I),k===i.SHORT&&(H=i.R16I),k===i.INT&&(H=i.R32I)),_===i.RG&&(k===i.FLOAT&&(H=i.RG32F),k===i.HALF_FLOAT&&(H=i.RG16F),k===i.UNSIGNED_BYTE&&(H=i.RG8),k===i.UNSIGNED_SHORT&&ge&&(H=ge.RG16_EXT),k===i.SHORT&&ge&&(H=ge.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RG8UI),k===i.UNSIGNED_SHORT&&(H=i.RG16UI),k===i.UNSIGNED_INT&&(H=i.RG32UI),k===i.BYTE&&(H=i.RG8I),k===i.SHORT&&(H=i.RG16I),k===i.INT&&(H=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RGB8UI),k===i.UNSIGNED_SHORT&&(H=i.RGB16UI),k===i.UNSIGNED_INT&&(H=i.RGB32UI),k===i.BYTE&&(H=i.RGB8I),k===i.SHORT&&(H=i.RGB16I),k===i.INT&&(H=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),k===i.UNSIGNED_INT&&(H=i.RGBA32UI),k===i.BYTE&&(H=i.RGBA8I),k===i.SHORT&&(H=i.RGBA16I),k===i.INT&&(H=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_SHORT&&ge&&(H=ge.RGB16_EXT),k===i.SHORT&&ge&&(H=ge.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(H=i.R11F_G11F_B10F)),_===i.RGBA){let Q=fe?Hr:xt.getTransfer(G);k===i.FLOAT&&(H=i.RGBA32F),k===i.HALF_FLOAT&&(H=i.RGBA16F),k===i.UNSIGNED_BYTE&&(H=Q===St?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&ge&&(H=ge.RGBA16_EXT),k===i.SHORT&&ge&&(H=ge.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function R(w,_){let k;return w?_===null||_===ai||_===pr?k=i.DEPTH24_STENCIL8:_===oi?k=i.DEPTH32F_STENCIL8:_===fr&&(k=i.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===pr?k=i.DEPTH_COMPONENT24:_===oi?k=i.DEPTH_COMPONENT32F:_===fr&&(k=i.DEPTH_COMPONENT16),k}function A(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Xt&&w.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function I(w){let _=w.target;_.removeEventListener("dispose",I),C(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&p.delete(_)}function y(w){let _=w.target;_.removeEventListener("dispose",y),F(_)}function C(w){let _=n.get(w);if(_.__webglInit===void 0)return;let k=w.source,$=g.get(k);if($){let G=$[_.__cacheKey];G.usedTimes--,G.usedTimes===0&&U(w),Object.keys($).length===0&&g.delete(k)}n.remove(w)}function U(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let k=w.source,$=g.get(k);delete $[_.__cacheKey],a.memory.textures--}function F(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let G=0;G<_.__webglFramebuffer[$].length;G++)i.deleteFramebuffer(_.__webglFramebuffer[$][G]);else i.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)i.deleteFramebuffer(_.__webglFramebuffer[$]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let k=w.textures;for(let $=0,G=k.length;$<G;$++){let fe=n.get(k[$]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(k[$])}n.remove(w)}let q=0;function ie(){q=0}function ee(){return q}function Y(w){q=w}function K(){let w=q;return w>=s.maxTextures&&qe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),q+=1,w}function J(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function ne(w,_){let k=n.get(w);if(w.isVideoTexture&&B(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){let $=w.image;if($===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{je(k,w,_);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function oe(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){je(k,w,_);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function te(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){je(k,w,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function xe(w,_){let k=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&k.__version!==w.version){Ze(k,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}let we={[mo]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[go]:i.MIRRORED_REPEAT},Qe={[Xt]:i.NEAREST,[Nd]:i.NEAREST_MIPMAP_NEAREST,[ca]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[Xo]:i.LINEAR_MIPMAP_NEAREST,[is]:i.LINEAR_MIPMAP_LINEAR},ht={[Od]:i.NEVER,[Hd]:i.ALWAYS,[Bd]:i.LESS,[Cl]:i.LEQUAL,[zd]:i.EQUAL,[Rl]:i.GEQUAL,[kd]:i.GREATER,[Vd]:i.NOTEQUAL};function ze(w,_){if(_.type===oi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===Xo||_.magFilter===ca||_.magFilter===is||_.minFilter===Zt||_.minFilter===Xo||_.minFilter===ca||_.minFilter===is)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,we[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,we[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,we[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Qe[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Qe[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ht[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xt||_.minFilter!==ca&&_.minFilter!==is||_.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function re(w,_){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",I));let $=_.source,G=g.get($);G===void 0&&(G={},g.set($,G));let fe=J(_);if(fe!==w.__cacheKey){G[fe]===void 0&&(G[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),G[fe].usedTimes++;let ge=G[w.__cacheKey];ge!==void 0&&(G[w.__cacheKey].usedTimes--,ge.usedTimes===0&&U(_)),w.__cacheKey=fe,w.__webglTexture=G[fe].texture}return k}function ye(w,_,k){return Math.floor(Math.floor(w/k)/_)}function de(w,_,k,$){let fe=w.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,$,_.data);else{fe.sort((Be,Te)=>Be.start-Te.start);let ge=0;for(let Be=1;Be<fe.length;Be++){let Te=fe[ge],Ce=fe[Be],Ge=Te.start+Te.count,Xe=ye(Ce.start,_.width,4),tt=ye(Te.start,_.width,4);Ce.start<=Ge+1&&Xe===tt&&ye(Ce.start+Ce.count-1,_.width,4)===Xe?Te.count=Math.max(Te.count,Ce.start+Ce.count-Te.start):(++ge,fe[ge]=Ce)}fe.length=ge+1;let H=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Be=0,Te=fe.length;Be<Te;Be++){let Ce=fe[Be],Ge=Math.floor(Ce.start/4),Xe=Math.ceil(Ce.count/4),tt=Ge%_.width,D=Math.floor(Ge/_.width),me=Xe,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,tt,D,me,ae,k,$,_.data)}w.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,H),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function je(w,_,k){let $=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=i.TEXTURE_3D);let G=re(w,_),fe=_.source;t.bindTexture($,w.__webglTexture,i.TEXTURE0+k);let ge=n.get(fe);if(fe.version!==ge.__version||G===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ae=xt.getPrimaries(xt.workingColorSpace),ve=_.colorSpace===Ui?null:xt.getPrimaries(_.colorSpace),Re=_.colorSpace===Ui||ae===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=f(_.image,!1,s.maxTextureSize);Q=Ot(_,Q);let pe=r.convert(_.format,_.colorSpace),Be=r.convert(_.type),Te=S(_.internalFormat,pe,Be,_.normalized,_.colorSpace,_.isVideoTexture);ze($,_);let Ce,Ge=_.mipmaps,Xe=_.isVideoTexture!==!0,tt=ge.__version===void 0||G===!0,D=fe.dataReady,me=A(_,Q);if(_.isDepthTexture)Te=R(_.format===ss,_.type),tt&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,Te,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Te,Q.width,Q.height,0,pe,Be,null));else if(_.isDataTexture)if(Ge.length>0){Xe&&tt&&t.texStorage2D(i.TEXTURE_2D,me,Te,Ge[0].width,Ge[0].height);for(let ae=0,ve=Ge.length;ae<ve;ae++)Ce=Ge[ae],Xe?D&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ce.width,Ce.height,pe,Be,Ce.data):t.texImage2D(i.TEXTURE_2D,ae,Te,Ce.width,Ce.height,0,pe,Be,Ce.data);_.generateMipmaps=!1}else Xe?(tt&&t.texStorage2D(i.TEXTURE_2D,me,Te,Q.width,Q.height),D&&de(_,Q,pe,Be)):t.texImage2D(i.TEXTURE_2D,0,Te,Q.width,Q.height,0,pe,Be,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xe&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Te,Ge[0].width,Ge[0].height,Q.depth);for(let ae=0,ve=Ge.length;ae<ve;ae++)if(Ce=Ge[ae],_.format!==Wn)if(pe!==null)if(Xe){if(D)if(_.layerUpdates.size>0){let Re=vh(Ce.width,Ce.height,_.format,_.type);for(let ue of _.layerUpdates){let ke=Ce.data.subarray(ue*Re/Ce.data.BYTES_PER_ELEMENT,(ue+1)*Re/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,ue,Ce.width,Ce.height,1,pe,ke)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ce.width,Ce.height,Q.depth,pe,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Te,Ce.width,Ce.height,Q.depth,0,Ce.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ce.width,Ce.height,Q.depth,pe,Be,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Te,Ce.width,Ce.height,Q.depth,0,pe,Be,Ce.data)}else{Xe&&tt&&t.texStorage2D(i.TEXTURE_2D,me,Te,Ge[0].width,Ge[0].height);for(let ae=0,ve=Ge.length;ae<ve;ae++)Ce=Ge[ae],_.format!==Wn?pe!==null?Xe?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Ce.width,Ce.height,pe,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Te,Ce.width,Ce.height,0,Ce.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?D&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ce.width,Ce.height,pe,Be,Ce.data):t.texImage2D(i.TEXTURE_2D,ae,Te,Ce.width,Ce.height,0,pe,Be,Ce.data)}else if(_.isDataArrayTexture)if(Xe){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Te,Q.width,Q.height,Q.depth),D)if(_.layerUpdates.size>0){let ae=vh(Q.width,Q.height,_.format,_.type);for(let ve of _.layerUpdates){let Re=Q.data.subarray(ve*ae/Q.data.BYTES_PER_ELEMENT,(ve+1)*ae/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,Q.width,Q.height,1,pe,Be,Re)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pe,Be,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,Q.width,Q.height,Q.depth,0,pe,Be,Q.data);else if(_.isData3DTexture)Xe?(tt&&t.texStorage3D(i.TEXTURE_3D,me,Te,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pe,Be,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Te,Q.width,Q.height,Q.depth,0,pe,Be,Q.data);else if(_.isFramebufferTexture){if(tt)if(Xe)t.texStorage2D(i.TEXTURE_2D,me,Te,Q.width,Q.height);else{let ae=Q.width,ve=Q.height;for(let Re=0;Re<me;Re++)t.texImage2D(i.TEXTURE_2D,Re,Te,ae,ve,0,pe,Be,null),ae>>=1,ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),Q.parentNode!==ae){ae.appendChild(Q),p.add(_),ae.onpaint=ve=>{let Re=ve.changedElements;for(let ue of p)Re.includes(ue.image)&&(ue.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let Re=i.RGBA,ue=i.RGBA,ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Re,ue,ke,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ge.length>0){if(Xe&&tt){let ae=at(Ge[0]);t.texStorage2D(i.TEXTURE_2D,me,Te,ae.width,ae.height)}for(let ae=0,ve=Ge.length;ae<ve;ae++)Ce=Ge[ae],Xe?D&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,pe,Be,Ce):t.texImage2D(i.TEXTURE_2D,ae,Te,pe,Be,Ce);_.generateMipmaps=!1}else if(Xe){if(tt){let ae=at(Q);t.texStorage2D(i.TEXTURE_2D,me,Te,ae.width,ae.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Be,Q)}else t.texImage2D(i.TEXTURE_2D,0,Te,pe,Be,Q);m(_)&&P($),ge.__version=fe.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ze(w,_,k){if(_.image.length!==6)return;let $=re(w,_),G=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);let fe=n.get(G);if(G.version!==fe.__version||$===!0){t.activeTexture(i.TEXTURE0+k);let ge=xt.getPrimaries(xt.workingColorSpace),H=_.colorSpace===Ui?null:xt.getPrimaries(_.colorSpace),Q=_.colorSpace===Ui||ge===H?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let pe=_.isCompressedTexture||_.image[0].isCompressedTexture,Be=_.image[0]&&_.image[0].isDataTexture,Te=[];for(let ue=0;ue<6;ue++)!pe&&!Be?Te[ue]=f(_.image[ue],!0,s.maxCubemapSize):Te[ue]=Be?_.image[ue].image:_.image[ue],Te[ue]=Ot(_,Te[ue]);let Ce=Te[0],Ge=r.convert(_.format,_.colorSpace),Xe=r.convert(_.type),tt=S(_.internalFormat,Ge,Xe,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,me=fe.__version===void 0||$===!0,ae=G.dataReady,ve=A(_,Ce);ze(i.TEXTURE_CUBE_MAP,_);let Re;if(pe){D&&me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,tt,Ce.width,Ce.height);for(let ue=0;ue<6;ue++){Re=Te[ue].mipmaps;for(let ke=0;ke<Re.length;ke++){let Pe=Re[ke];_.format!==Wn?Ge!==null?D?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,0,0,Pe.width,Pe.height,Ge,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,tt,Pe.width,Pe.height,0,Pe.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,0,0,Pe.width,Pe.height,Ge,Xe,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,tt,Pe.width,Pe.height,0,Ge,Xe,Pe.data)}}}else{if(Re=_.mipmaps,D&&me){Re.length>0&&ve++;let ue=at(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,tt,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Be){D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Te[ue].width,Te[ue].height,Ge,Xe,Te[ue].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,tt,Te[ue].width,Te[ue].height,0,Ge,Xe,Te[ue].data);for(let ke=0;ke<Re.length;ke++){let Dt=Re[ke].image[ue].image;D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,0,0,Dt.width,Dt.height,Ge,Xe,Dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,tt,Dt.width,Dt.height,0,Ge,Xe,Dt.data)}}else{D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ge,Xe,Te[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,tt,Ge,Xe,Te[ue]);for(let ke=0;ke<Re.length;ke++){let Pe=Re[ke];D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,0,0,Ge,Xe,Pe.image[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,tt,Ge,Xe,Pe.image[ue])}}}m(_)&&P(i.TEXTURE_CUBE_MAP),fe.__version=G.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Fe(w,_,k,$,G,fe){let ge=r.convert(k.format,k.colorSpace),H=r.convert(k.type),Q=S(k.internalFormat,ge,H,k.normalized,k.colorSpace),pe=n.get(_),Be=n.get(k);if(Be.__renderTarget=_,!pe.__hasExternalTextures){let Te=Math.max(1,_.width>>fe),Ce=Math.max(1,_.height>>fe);G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?t.texImage3D(G,fe,Q,Te,Ce,_.depth,0,ge,H,null):t.texImage2D(G,fe,Q,Te,Ce,0,ge,H,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,G,Be.__webglTexture,0,Je(_)):(G===i.TEXTURE_2D||G>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&G<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,G,Be.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(w,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let $=_.depthTexture,G=$&&$.isDepthTexture?$.type:null,fe=R(_.stencilBuffer,G),ge=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je(_),fe,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je(_),fe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,fe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,w)}else{let $=_.textures;for(let G=0;G<$.length;G++){let fe=$[G],ge=r.convert(fe.format,fe.colorSpace),H=r.convert(fe.type),Q=S(fe.internalFormat,ge,H,fe.normalized,fe.colorSpace);mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je(_),Q,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je(_),Q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function et(w,_,k){let $=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let G=n.get(_.depthTexture);if(G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(G.__webglInit===void 0&&(G.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),G.__webglTexture===void 0){G.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),ze(i.TEXTURE_CUBE_MAP,_.depthTexture);let pe=r.convert(_.depthTexture.format),Be=r.convert(_.depthTexture.type),Te;_.depthTexture.format===di?Te=i.DEPTH_COMPONENT24:_.depthTexture.format===ss&&(Te=i.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Te,_.width,_.height,0,pe,Be,null)}}else ne(_.depthTexture,0);let fe=G.__webglTexture,ge=Je(_),H=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,Q=_.depthTexture.format===ss?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===di)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,H,fe,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,Q,H,fe,0);else if(_.depthTexture.format===ss)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,H,fe,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,Q,H,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function pt(w){let _=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let $=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let G=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",G)};$.addEventListener("dispose",G),_.__depthDisposeCallback=G}_.__boundDepthTexture=$}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let $=0;$<6;$++)et(_.__webglFramebuffer[$],w,$);else{let $=w.texture.mipmaps;$&&$.length>0?et(_.__webglFramebuffer[0],w,0):et(_.__webglFramebuffer,w,0)}else if(k){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=i.createRenderbuffer(),lt(_.__webglDepthbuffer[$],w,!1);else{let G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,fe)}}else{let $=w.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),lt(_.__webglDepthbuffer,w,!1);else{let G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(w,_,k){let $=n.get(w);_!==void 0&&Fe($.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&pt(w)}function ce(w){let _=w.texture,k=n.get(w),$=n.get(_);w.addEventListener("dispose",y);let G=w.textures,fe=w.isWebGLCubeRenderTarget===!0,ge=G.length>1;if(ge||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=_.version,a.memory.textures++),fe){k.__webglFramebuffer=[];for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[H]=[];for(let Q=0;Q<_.mipmaps.length;Q++)k.__webglFramebuffer[H][Q]=i.createFramebuffer()}else k.__webglFramebuffer[H]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let H=0;H<_.mipmaps.length;H++)k.__webglFramebuffer[H]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(ge)for(let H=0,Q=G.length;H<Q;H++){let pe=n.get(G[H]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&mt(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let H=0;H<G.length;H++){let Q=G[H];k.__webglColorRenderbuffer[H]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[H]);let pe=r.convert(Q.format,Q.colorSpace),Be=r.convert(Q.type),Te=S(Q.internalFormat,pe,Be,Q.normalized,Q.colorSpace,w.isXRRenderTarget===!0),Ce=Je(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Te,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,k.__webglColorRenderbuffer[H])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),ze(i.TEXTURE_CUBE_MAP,_);for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)Fe(k.__webglFramebuffer[H][Q],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,Q);else Fe(k.__webglFramebuffer[H],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);m(_)&&P(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let H=0,Q=G.length;H<Q;H++){let pe=G[H],Be=n.get(pe),Te=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Te=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,Be.__webglTexture),ze(Te,pe),Fe(k.__webglFramebuffer,w,pe,i.COLOR_ATTACHMENT0+H,Te,0),m(pe)&&P(Te)}t.unbindTexture()}else{let H=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(H=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(H,$.__webglTexture),ze(H,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)Fe(k.__webglFramebuffer[Q],w,_,i.COLOR_ATTACHMENT0,H,Q);else Fe(k.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,H,0);m(_)&&P(H),t.unbindTexture()}w.depthBuffer&&pt(w)}function Ne(w){let _=w.textures;for(let k=0,$=_.length;k<$;k++){let G=_[k];if(m(G)){let fe=L(w),ge=n.get(G).__webglTexture;t.bindTexture(fe,ge),P(fe),t.unbindTexture()}}}let Oe=[],He=[];function ct(w){if(w.samples>0){if(mt(w)===!1){let _=w.textures,k=w.width,$=w.height,G=i.COLOR_BUFFER_BIT,fe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(w),H=_.length>1;if(H)for(let pe=0;pe<_.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);let Q=w.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let pe=0;pe<_.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(G|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(G|=i.STENCIL_BUFFER_BIT)),H){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[pe]);let Be=n.get(_[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,k,$,0,0,k,$,G,i.NEAREST),l===!0&&(Oe.length=0,He.length=0,Oe.push(i.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Oe.push(fe),He.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,He)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Oe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),H)for(let pe=0;pe<_.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,ge.__webglColorRenderbuffer[pe]);let Be=n.get(_[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Je(w){return Math.min(s.maxSamples,w.samples)}function mt(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function B(w){let _=a.render.frame;d.get(w)!==_&&(d.set(w,_),w.update())}function Ot(w,_){let k=w.colorSpace,$=w.format,G=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Vr&&k!==Ui&&(xt.getTransfer(k)===St?($!==Wn||G!==Nn)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",k)),_}function at(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=ie,this.getTextureUnits=ee,this.setTextureUnits=Y,this.setTexture2D=ne,this.setTexture2DArray=oe,this.setTexture3D=te,this.setTextureCube=xe,this.rebindTextures=ot,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function wy(i,e){function t(n,s=Ui){let r,a=xt.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===Yo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ch)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===oh)return i.BYTE;if(n===lh)return i.SHORT;if(n===fr)return i.UNSIGNED_SHORT;if(n===qo)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===pi)return i.HALF_FLOAT;if(n===uh)return i.ALPHA;if(n===dh)return i.RGB;if(n===Wn)return i.RGBA;if(n===di)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===fh)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===rs)return i.RG;if(n===jo)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===ha||n===ua||n===da||n===fa)if(a===St)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===Qo||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl||n===rl||n===al||n===pa||n===ol)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return a===St?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===rl)return r.COMPRESSED_R11_EAC;if(n===al)return r.COMPRESSED_SIGNED_R11_EAC;if(n===pa)return r.COMPRESSED_RG11_EAC;if(n===ol)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl||n===bl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ll)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ul)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ml)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===Sl||n===El)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ml)return a===St?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wl||n===Tl||n===ma||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ay=`
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

}`,zh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:Ty,fragmentShader:Ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kh=class extends ii{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,g=null,v=null,E=typeof XRWebGLBinding<"u",f=new zh,m={},P=t.getContextAttributes(),L=null,S=null,R=[],A=[],I=new We,y=null,C=new $t;C.viewport=new Rt;let U=new $t;U.viewport=new Rt;let F=[C,U],q=new Vo,ie=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ye=R[re];return ye===void 0&&(ye=new or,R[re]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(re){let ye=R[re];return ye===void 0&&(ye=new or,R[re]=ye),ye.getGripSpace()},this.getHand=function(re){let ye=R[re];return ye===void 0&&(ye=new or,R[re]=ye),ye.getHandSpace()};function Y(re){let ye=A.indexOf(re.inputSource);if(ye===-1)return;let de=R[ye];de!==void 0&&(de.update(re.inputSource,re.frame,c||a),de.dispatchEvent({type:re.type,data:re.inputSource}))}function K(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",J);for(let re=0;re<R.length;re++){let ye=A[re];ye!==null&&(A[re]=null,R[re].disconnect(ye))}ie=null,ee=null,f.reset();for(let re in m)delete m[re];e.setRenderTarget(L),g=null,u=null,p=null,s=null,S=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,n.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return p===null&&E&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(L=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",K),s.addEventListener("inputsourceschange",J),P.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(I),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,je=null,Ze=null;P.depth&&(Ze=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=P.stencil?ss:di,je=P.stencil?pr:ai);let Fe={colorFormat:t.RGBA8,depthFormat:Ze,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new In(u.textureWidth,u.textureHeight,{format:Wn,type:Nn,depthTexture:new Ni(u.textureWidth,u.textureHeight,je,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let de={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new In(g.framebufferWidth,g.framebufferHeight,{format:Wn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ze.setContext(s),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function J(re){for(let ye=0;ye<re.removed.length;ye++){let de=re.removed[ye],je=A.indexOf(de);je>=0&&(A[je]=null,R[je].disconnect(de))}for(let ye=0;ye<re.added.length;ye++){let de=re.added[ye],je=A.indexOf(de);if(je===-1){for(let Fe=0;Fe<R.length;Fe++)if(Fe>=A.length){A.push(de),je=Fe;break}else if(A[Fe]===null){A[Fe]=de,je=Fe;break}if(je===-1)break}let Ze=R[je];Ze&&Ze.connect(de)}}let ne=new N,oe=new N;function te(re,ye,de){ne.setFromMatrixPosition(ye.matrixWorld),oe.setFromMatrixPosition(de.matrixWorld);let je=ne.distanceTo(oe),Ze=ye.projectionMatrix.elements,Fe=de.projectionMatrix.elements,lt=Ze[14]/(Ze[10]-1),et=Ze[14]/(Ze[10]+1),pt=(Ze[9]+1)/Ze[5],ot=(Ze[9]-1)/Ze[5],ce=(Ze[8]-1)/Ze[0],Ne=(Fe[8]+1)/Fe[0],Oe=lt*ce,He=lt*Ne,ct=je/(-ce+Ne),Je=ct*-ce;if(ye.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Je),re.translateZ(ct),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Ze[10]===-1)re.projectionMatrix.copy(ye.projectionMatrix),re.projectionMatrixInverse.copy(ye.projectionMatrixInverse);else{let mt=lt+ct,B=et+ct,Ot=Oe-Je,at=He+(je-Je),w=pt*et/B*mt,_=ot*et/B*mt;re.projectionMatrix.makePerspective(Ot,at,w,_,mt,B),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function xe(re,ye){ye===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ye.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let ye=re.near,de=re.far;f.texture!==null&&(f.depthNear>0&&(ye=f.depthNear),f.depthFar>0&&(de=f.depthFar)),q.near=U.near=C.near=ye,q.far=U.far=C.far=de,(ie!==q.near||ee!==q.far)&&(s.updateRenderState({depthNear:q.near,depthFar:q.far}),ie=q.near,ee=q.far),q.layers.mask=re.layers.mask|6,C.layers.mask=q.layers.mask&-5,U.layers.mask=q.layers.mask&-3;let je=re.parent,Ze=q.cameras;xe(q,je);for(let Fe=0;Fe<Ze.length;Fe++)xe(Ze[Fe],je);Ze.length===2?te(q,C,U):q.projectionMatrix.copy(C.projectionMatrix),we(re,q,je)};function we(re,ye,de){de===null?re.matrix.copy(ye.matrixWorld):(re.matrix.copy(de.matrixWorld),re.matrix.invert(),re.matrix.multiply(ye.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(ye.projectionMatrix),re.projectionMatrixInverse.copy(ye.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=sr*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(u===null&&g===null))return l},this.setFoveation=function(re){l=re,u!==null&&(u.fixedFoveation=re),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=re)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(q)},this.getCameraTexture=function(re){return m[re]};let Qe=null;function ht(re,ye){if(d=ye.getViewerPose(c||a),v=ye,d!==null){let de=d.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let je=!1;de.length!==q.cameras.length&&(q.cameras.length=0,je=!0);for(let et=0;et<de.length;et++){let pt=de[et],ot=null;if(g!==null)ot=g.getViewport(pt);else{let Ne=p.getViewSubImage(u,pt);ot=Ne.viewport,et===0&&(e.setRenderTargetTextures(S,Ne.colorTexture,Ne.depthStencilTexture),e.setRenderTarget(S))}let ce=F[et];ce===void 0&&(ce=new $t,ce.layers.enable(et),ce.viewport=new Rt,F[et]=ce),ce.matrix.fromArray(pt.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(pt.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(ot.x,ot.y,ot.width,ot.height),et===0&&(q.matrix.copy(ce.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),je===!0&&q.cameras.push(ce)}let Ze=s.enabledFeatures;if(Ze&&Ze.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){p=n.getBinding();let et=p.getDepthInformation(de[0]);et&&et.isValid&&et.texture&&f.init(et,s.renderState)}if(Ze&&Ze.includes("camera-access")&&E){e.state.unbindTexture(),p=n.getBinding();for(let et=0;et<de.length;et++){let pt=de[et].camera;if(pt){let ot=m[pt];ot||(ot=new Qr,m[pt]=ot);let ce=p.getCameraImage(pt);ot.sourceTexture=ce}}}}for(let de=0;de<R.length;de++){let je=A[de],Ze=R[de];je!==null&&Ze!==void 0&&Ze.update(je,ye,c||a)}Qe&&Qe(re,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),v=null}let ze=new yf;ze.setAnimationLoop(ht),this.setAnimationLoop=function(re){Qe=re},this.dispose=function(){}}},Cy=new Lt,wf=new st;wf.set(-1,0,0,0,1,0,0,0,1);function Ry(i,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function n(f,m){m.color.getRGB(f.fogColor.value,_h(i)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,P,L,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),p(f,m)):m.isMeshPhongMaterial?(r(f,m),d(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),u(f,m),m.isMeshPhysicalMaterial&&g(f,m,S)):m.isMeshMatcapMaterial?(r(f,m),v(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),E(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(a(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?l(f,m,P,L):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===fn&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===fn&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);let P=e.get(m),L=P.envMap,S=P.envMapRotation;L&&(f.envMap.value=L,f.envMapRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(S)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(wf),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function a(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,P,L){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*P,f.scale.value=L*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function d(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function p(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function u(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function g(f,m,P){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===fn&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=P.texture,f.transmissionSamplerSize.value.set(P.width,P.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function v(f,m){m.matcap&&(f.matcap.value=m.matcap)}function E(f,m){let P=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(P.matrixWorld),f.nearDistance.value=P.shadow.camera.near,f.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Iy(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,R){let A=R.program;n.uniformBlockBinding(S,A)}function c(S,R){let A=s[S.id];A===void 0&&(f(S),A=d(S),s[S.id]=A,S.addEventListener("dispose",P));let I=R.program;n.updateUBOMapping(S,I);let y=e.render.frame;r[S.id]!==y&&(u(S),r[S.id]=y)}function d(S){let R=p();S.__bindingPointIndex=R;let A=i.createBuffer(),I=S.__size,y=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,I,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,A),A}function p(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){let R=s[S.id],A=S.uniforms,I=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let y=0,C=A.length;y<C;y++){let U=A[y];if(Array.isArray(U))for(let F=0,q=U.length;F<q;F++)g(U[F],y,F,I);else g(U,y,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(S,R,A,I){if(E(S,R,A,I)===!0){let y=S.__offset,C=S.value;if(Array.isArray(C)){let U=0;for(let F=0;F<C.length;F++){let q=C[F],ie=m(q);v(q,S.__data,U),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(U+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(C,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,S.__data)}}function v(S,R,A){typeof S=="number"||typeof S=="boolean"?R[0]=S:S.isMatrix3?(R[0]=S.elements[0],R[1]=S.elements[1],R[2]=S.elements[2],R[3]=0,R[4]=S.elements[3],R[5]=S.elements[4],R[6]=S.elements[5],R[7]=0,R[8]=S.elements[6],R[9]=S.elements[7],R[10]=S.elements[8],R[11]=0):ArrayBuffer.isView(S)?R.set(new S.constructor(S.buffer,S.byteOffset,R.length)):S.toArray(R,A)}function E(S,R,A,I){let y=S.value,C=R+"_"+A;if(I[C]===void 0)return typeof y=="number"||typeof y=="boolean"?I[C]=y:ArrayBuffer.isView(y)?I[C]=y.slice():I[C]=y.clone(),!0;{let U=I[C];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return I[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(U.equals(y)===!1)return U.copy(y),!0}}return!1}function f(S){let R=S.uniforms,A=0,I=16;for(let C=0,U=R.length;C<U;C++){let F=Array.isArray(R[C])?R[C]:[R[C]];for(let q=0,ie=F.length;q<ie;q++){let ee=F[q],Y=Array.isArray(ee.value)?ee.value:[ee.value];for(let K=0,J=Y.length;K<J;K++){let ne=Y[K],oe=m(ne),te=A%I,xe=te%oe.boundary,we=te+xe;A+=xe,we!==0&&I-we<oe.storage&&(A+=I-we),ee.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=A,A+=oe.storage}}}let y=A%I;return y>0&&(A+=I-y),S.__size=A,S.__cache={},this}function m(S){let R={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(R.boundary=4,R.storage=4):S.isVector2?(R.boundary=8,R.storage=8):S.isVector3||S.isColor?(R.boundary=16,R.storage=12):S.isVector4?(R.boundary=16,R.storage=16):S.isMatrix3?(R.boundary=48,R.storage=48):S.isMatrix4?(R.boundary=64,R.storage=64):S.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(R.boundary=16,R.storage=S.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",S),R}function P(S){let R=S.target;R.removeEventListener("dispose",P);let A=a.indexOf(R.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function L(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:L}}var Py=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),mi=null;function Ly(){return mi===null&&(mi=new Mo(Py,16,16,rs,pi),mi.name="DFG_LUT",mi.minFilter=Zt,mi.magFilter=Zt,mi.wrapS=ui,mi.wrapT=ui,mi.generateMipmaps=!1,mi.needsUpdate=!0),mi}var Nl=class{constructor(e={}){let{canvas:t=Gd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:g=Nn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let E=g,f=new Set([Jo,jo,Zo]),m=new Set([Nn,ai,fr,pr,Yo,$o]),P=new Uint32Array(4),L=new Int32Array(4),S=new N,R=null,A=null,I=[],y=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,F=!1,q=null,ie=null,ee=null,Y=null;this._outputColorSpace=Yt;let K=0,J=0,ne=null,oe=-1,te=null,xe=new Rt,we=new Rt,Qe=null,ht=new ft(0),ze=0,re=t.width,ye=t.height,de=1,je=null,Ze=null,Fe=new Rt(0,0,re,ye),lt=new Rt(0,0,re,ye),et=!1,pt=new jr,ot=!1,ce=!1,Ne=new Lt,Oe=new N,He=new Rt,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Je=!1;function mt(){return ne===null?de:1}let B=n;function Ot(b,z){return t.getContext(b,z)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",Et,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),B===null){let z="webgl2";if(B=Ot(z,b),B===null)throw Ot(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Ke("WebGLRenderer: "+b.message),b}let at,w,_,k,$,G,fe,ge,H,Q,pe,Be,Te,Ce,Ge,Xe,tt,D,me,ae,ve,Re,ue;function ke(){at=new z0(B),at.init(),ve=new wy(B,at),w=new P0(B,at,e,ve),_=new Sy(B,at),w.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),ie=B.createFramebuffer(),ee=B.createFramebuffer(),Y=B.createFramebuffer(),k=new H0(B),$=new cy,G=new Ey(B,at,_,$,w,ve,k),fe=new B0(U),ge=new qm(B),Re=new R0(B,ge),H=new k0(B,ge,k,Re),Q=new W0(B,H,ge,Re,k),D=new G0(B,w,G),Ge=new L0($),pe=new ly(U,fe,at,w,Re,Ge),Be=new Ry(U,$),Te=new uy,Ce=new _y(at),tt=new C0(U,fe,_,Q,v,l),Xe=new My(U,Q,w),ue=new Iy(B,k,w,_),me=new I0(B,at,k),ae=new V0(B,at,k),k.programs=pe.programs,U.capabilities=w,U.extensions=at,U.properties=$,U.renderLists=Te,U.shadowMap=Xe,U.state=_,U.info=k}ke(),E!==Nn&&(C=new q0(E,t.width,t.height,o,s,r));let Pe=new kh(U,B);this.xr=Pe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let b=at.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=at.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(b){b!==void 0&&(de=b,this.setSize(re,ye,!1))},this.getSize=function(b){return b.set(re,ye)},this.setSize=function(b,z,j=!0){if(Pe.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}re=b,ye=z,t.width=Math.floor(b*de),t.height=Math.floor(z*de),j===!0&&(t.style.width=b+"px",t.style.height=z+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(re*de,ye*de).floor()},this.setDrawingBufferSize=function(b,z,j){re=b,ye=z,de=j,t.width=Math.floor(b*j),t.height=Math.floor(z*j),this.setViewport(0,0,b,z)},this.setEffects=function(b){if(E===Nn){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let z=0;z<b.length;z++)if(b[z].isOutputPass===!0){qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(xe)},this.getViewport=function(b){return b.copy(Fe)},this.setViewport=function(b,z,j,X){b.isVector4?Fe.set(b.x,b.y,b.z,b.w):Fe.set(b,z,j,X),_.viewport(xe.copy(Fe).multiplyScalar(de).round())},this.getScissor=function(b){return b.copy(lt)},this.setScissor=function(b,z,j,X){b.isVector4?lt.set(b.x,b.y,b.z,b.w):lt.set(b,z,j,X),_.scissor(we.copy(lt).multiplyScalar(de).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(b){_.setScissorTest(et=b)},this.setOpaqueSort=function(b){je=b},this.setTransparentSort=function(b){Ze=b},this.getClearColor=function(b){return b.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(b=!0,z=!0,j=!0){let X=0;if(b){let Z=!1;if(ne!==null){let Ie=ne.texture.format;Z=f.has(Ie)}if(Z){let Ie=ne.texture.type,be=m.has(Ie),Ee=tt.getClearColor(),Me=tt.getClearAlpha(),Ue=Ee.r,Ye=Ee.g,nt=Ee.b;be?(P[0]=Ue,P[1]=Ye,P[2]=nt,P[3]=Me,B.clearBufferuiv(B.COLOR,0,P)):(L[0]=Ue,L[1]=Ye,L[2]=nt,L[3]=Me,B.clearBufferiv(B.COLOR,0,L))}else X|=B.COLOR_BUFFER_BIT}z&&(X|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),q=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",Et,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),tt.dispose(),Te.dispose(),Ce.dispose(),$.dispose(),fe.dispose(),Q.dispose(),Re.dispose(),ue.dispose(),pe.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Fi),Pe.removeEventListener("sessionend",ln),qt.stop()};function Dt(b){b.preventDefault(),Xr("WebGLRenderer: Context Lost."),F=!0}function Et(){Xr("WebGLRenderer: Context Restored."),F=!1;let b=k.autoReset,z=Xe.enabled,j=Xe.autoUpdate,X=Xe.needsUpdate,Z=Xe.type;ke(),k.autoReset=b,Xe.enabled=z,Xe.autoUpdate=j,Xe.needsUpdate=X,Xe.type=Z}function Mn(b){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Sn(b){let z=b.target;z.removeEventListener("dispose",Sn),Xn(z)}function Xn(b){Ma(b),$.remove(b)}function Ma(b){let z=$.get(b).programs;z!==void 0&&(z.forEach(function(j){pe.releaseProgram(j)}),b.isShaderMaterial&&pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,j,X,Z,Ie){z===null&&(z=ct);let be=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Ee=$n(b,z,j,X,Z);_.setMaterial(X,be);let Me=j.index,Ue=1;if(X.wireframe===!0){if(Me=H.getWireframeAttribute(j),Me===void 0)return;Ue=2}let Ye=j.drawRange,nt=j.attributes.position,Ve=Ye.start*Ue,gt=(Ye.start+Ye.count)*Ue;Ie!==null&&(Ve=Math.max(Ve,Ie.start*Ue),gt=Math.min(gt,(Ie.start+Ie.count)*Ue)),Me!==null?(Ve=Math.max(Ve,0),gt=Math.min(gt,Me.count)):nt!=null&&(Ve=Math.max(Ve,0),gt=Math.min(gt,nt.count));let vt=gt-Ve;if(vt<0||vt===1/0)return;Re.setup(Z,X,Ee,j,Me);let it,yt=me;if(Me!==null&&(it=ge.get(Me),yt=ae,yt.setIndex(it)),Z.isMesh)X.wireframe===!0?(_.setLineWidth(X.wireframeLinewidth*mt()),yt.setMode(B.LINES)):yt.setMode(B.TRIANGLES);else if(Z.isLine){let Bt=X.linewidth;Bt===void 0&&(Bt=1),_.setLineWidth(Bt*mt()),Z.isLineSegments?yt.setMode(B.LINES):Z.isLineLoop?yt.setMode(B.LINE_LOOP):yt.setMode(B.LINE_STRIP)}else Z.isPoints?yt.setMode(B.POINTS):Z.isSprite&&yt.setMode(B.TRIANGLES);if(Z.isBatchedMesh)if(at.get("WEBGL_multi_draw"))yt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Bt=Z._multiDrawStarts,Le=Z._multiDrawCounts,sn=Z._multiDrawCount,_t=Me?ge.get(Me).bytesPerElement:1,mn=$.get(X).currentProgram.getUniforms();for(let Ut=0;Ut<sn;Ut++)mn.setValue(B,"_gl_DrawID",Ut),yt.render(Bt[Ut]/_t,Le[Ut])}else if(Z.isInstancedMesh)yt.renderInstances(Ve,vt,Z.count);else if(j.isInstancedBufferGeometry){let Bt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Le=Math.min(j.instanceCount,Bt);yt.renderInstances(Ve,vt,Le)}else yt.render(Ve,vt)};function vr(b,z,j){b.transparent===!0&&b.side===Gn&&b.forceSinglePass===!1?(b.side=fn,b.needsUpdate=!0,vi(b,z,j),b.side=Li,b.needsUpdate=!0,vi(b,z,j),b.side=Gn):vi(b,z,j)}this.compile=function(b,z,j=null){j===null&&(j=b),A=Ce.get(j),A.init(z),y.push(A),j.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(A.pushLight(Z),Z.castShadow&&A.pushShadow(Z))}),b!==j&&b.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(A.pushLight(Z),Z.castShadow&&A.pushShadow(Z))}),A.setupLights();let X=new Set;return b.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Ie=Z.material;if(Ie)if(Array.isArray(Ie))for(let be=0;be<Ie.length;be++){let Ee=Ie[be];vr(Ee,j,Z),X.add(Ee)}else vr(Ie,j,Z),X.add(Ie)}),A=y.pop(),X},this.compileAsync=function(b,z,j=null){let X=this.compile(b,z,j);return new Promise(Z=>{function Ie(){if(X.forEach(function(be){$.get(be).currentProgram.isReady()&&X.delete(be)}),X.size===0){Z(b);return}setTimeout(Ie,10)}at.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let yi=null;function nn(b){yi&&yi(b)}function Fi(){qt.stop()}function ln(){qt.start()}let qt=new yf;qt.setAnimationLoop(nn),typeof self<"u"&&qt.setContext(self),this.setAnimationLoop=function(b){yi=b,Pe.setAnimationLoop(b),b===null?qt.stop():qt.start()},Pe.addEventListener("sessionstart",Fi),Pe.addEventListener("sessionend",ln),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;q!==null&&q.renderStart(b,z);let j=Pe.enabled===!0&&Pe.isPresenting===!0,X=C!==null&&(ne===null||j)&&C.begin(U,ne);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(z),z=Pe.getCamera()),b.isScene===!0&&b.onBeforeRender(U,b,z,ne),A=Ce.get(b,y.length),A.init(z),A.state.textureUnits=G.getTextureUnits(),y.push(A),Ne.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),pt.setFromProjectionMatrix(Ne,ni,z.reversedDepth),ce=this.localClippingEnabled,ot=Ge.init(this.clippingPlanes,ce),R=Te.get(b,I.length),R.init(),I.push(R),Pe.enabled===!0&&Pe.isPresenting===!0){let be=U.xr.getDepthSensingMesh();be!==null&&Un(be,z,-1/0,U.sortObjects)}Un(b,z,0,U.sortObjects),R.finish(),U.sortObjects===!0&&R.sort(je,Ze,z.reversedDepth),Je=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,Je&&tt.addToRenderList(R,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ot===!0&&Ge.beginShadows();let Z=A.state.shadowsArray;if(Xe.render(Z,b,z),ot===!0&&Ge.endShadows(),(X&&C.hasRenderPass())===!1){let be=R.opaque,Ee=R.transmissive;if(A.setupLights(),z.isArrayCamera){let Me=z.cameras;if(Ee.length>0)for(let Ue=0,Ye=Me.length;Ue<Ye;Ue++){let nt=Me[Ue];br(be,Ee,b,nt)}Je&&tt.render(b);for(let Ue=0,Ye=Me.length;Ue<Ye;Ue++){let nt=Me[Ue];qn(R,b,nt,nt.viewport)}}else Ee.length>0&&br(be,Ee,b,z),Je&&tt.render(b),qn(R,b,z)}ne!==null&&J===0&&(G.updateMultisampleRenderTarget(ne),G.updateRenderTargetMipmap(ne)),X&&C.end(U),b.isScene===!0&&b.onAfterRender(U,b,z),Re.resetDefaultState(),oe=-1,te=null,y.pop(),y.length>0?(A=y[y.length-1],G.setTextureUnits(A.state.textureUnits),ot===!0&&Ge.setGlobalState(U.clippingPlanes,A.state.camera)):A=null,I.pop(),I.length>0?R=I[I.length-1]:R=null,q!==null&&q.renderEnd()};function Un(b,z,j,X){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLightProbeGrid)A.pushLightProbeGrid(b);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||pt.intersectsSprite(b)){X&&He.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ne);let be=Q.update(b),Ee=b.material;Ee.visible&&R.push(b,be,Ee,j,He.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||pt.intersectsObject(b))){let be=Q.update(b),Ee=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),He.copy(b.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),He.copy(be.boundingSphere.center)),He.applyMatrix4(b.matrixWorld).applyMatrix4(Ne)),Array.isArray(Ee)){let Me=be.groups;for(let Ue=0,Ye=Me.length;Ue<Ye;Ue++){let nt=Me[Ue],Ve=Ee[nt.materialIndex];Ve&&Ve.visible&&R.push(b,be,Ve,j,He.z,nt)}}else Ee.visible&&R.push(b,be,Ee,j,He.z,null)}}let Ie=b.children;for(let be=0,Ee=Ie.length;be<Ee;be++)Un(Ie[be],z,j,X)}function qn(b,z,j,X){let{opaque:Z,transmissive:Ie,transparent:be}=b;A.setupLightsView(j),ot===!0&&Ge.setGlobalState(U.clippingPlanes,j),X&&_.viewport(xe.copy(X)),Z.length>0&&Oi(Z,z,j),Ie.length>0&&Oi(Ie,z,j),be.length>0&&Oi(be,z,j),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function br(b,z,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){let Ve=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new In(1,1,{generateMipmaps:!0,type:Ve?pi:Nn,minFilter:is,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace})}let Ie=A.state.transmissionRenderTarget[X.id],be=X.viewport||xe;Ie.setSize(be.z*U.transmissionResolutionScale,be.w*U.transmissionResolutionScale);let Ee=U.getRenderTarget(),Me=U.getActiveCubeFace(),Ue=U.getActiveMipmapLevel();U.setRenderTarget(Ie),U.getClearColor(ht),ze=U.getClearAlpha(),ze<1&&U.setClearColor(16777215,.5),U.clear(),Je&&tt.render(j);let Ye=U.toneMapping;U.toneMapping=ri;let nt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),ot===!0&&Ge.setGlobalState(U.clippingPlanes,X),Oi(b,j,X),G.updateMultisampleRenderTarget(Ie),G.updateRenderTargetMipmap(Ie),at.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let gt=0,vt=z.length;gt<vt;gt++){let it=z[gt],{object:yt,geometry:Bt,material:Le,group:sn}=it;if(Le.side===Gn&&yt.layers.test(X.layers)){let _t=Le.side;Le.side=fn,Le.needsUpdate=!0,cs(yt,j,X,Bt,Le,sn),Le.side=_t,Le.needsUpdate=!0,Ve=!0}}Ve===!0&&(G.updateMultisampleRenderTarget(Ie),G.updateRenderTargetMipmap(Ie))}U.setRenderTarget(Ee,Me,Ue),U.setClearColor(ht,ze),nt!==void 0&&(X.viewport=nt),U.toneMapping=Ye}function Oi(b,z,j){let X=z.isScene===!0?z.overrideMaterial:null;for(let Z=0,Ie=b.length;Z<Ie;Z++){let be=b[Z],{object:Ee,geometry:Me,group:Ue}=be,Ye=be.material;Ye.allowOverride===!0&&X!==null&&(Ye=X),Ee.layers.test(j.layers)&&cs(Ee,z,j,Me,Ye,Ue)}}function cs(b,z,j,X,Z,Ie){b.onBeforeRender(U,z,j,X,Z,Ie),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Z.onBeforeRender(U,z,j,X,b,Ie),Z.transparent===!0&&Z.side===Gn&&Z.forceSinglePass===!1?(Z.side=fn,Z.needsUpdate=!0,U.renderBufferDirect(j,z,X,Z,b,Ie),Z.side=Li,Z.needsUpdate=!0,U.renderBufferDirect(j,z,X,Z,b,Ie),Z.side=Gn):U.renderBufferDirect(j,z,X,Z,b,Ie),b.onAfterRender(U,z,j,X,Z,Ie)}function vi(b,z,j){z.isScene!==!0&&(z=ct);let X=$.get(b),Z=A.state.lights,Ie=A.state.shadowsArray,be=Z.state.version,Ee=pe.getParameters(b,Z.state,Ie,z,j,A.state.lightProbeGridArray),Me=pe.getProgramCacheKey(Ee),Ue=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?z.environment:null,X.fog=z.fog;let Ye=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=fe.get(b.envMap||X.environment,Ye),X.envMapRotation=X.environment!==null&&b.envMap===null?z.environmentRotation:b.envMapRotation,Ue===void 0&&(b.addEventListener("dispose",Sn),Ue=new Map,X.programs=Ue);let nt=Ue.get(Me);if(nt!==void 0){if(X.currentProgram===nt&&X.lightsStateVersion===be)return On(b,Ee),nt}else Ee.uniforms=pe.getUniforms(b),q!==null&&b.isNodeMaterial&&q.build(b,j,Ee),b.onBeforeCompile(Ee,U),nt=pe.acquireProgram(Ee,Me),Ue.set(Me,nt),X.uniforms=Ee.uniforms;let Ve=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ve.clippingPlanes=Ge.uniform),On(b,Ee),X.needsLights=Zn(b),X.lightsStateVersion=be,X.needsLights&&(Ve.ambientLightColor.value=Z.state.ambient,Ve.lightProbe.value=Z.state.probe,Ve.directionalLights.value=Z.state.directional,Ve.directionalLightShadows.value=Z.state.directionalShadow,Ve.spotLights.value=Z.state.spot,Ve.spotLightShadows.value=Z.state.spotShadow,Ve.rectAreaLights.value=Z.state.rectArea,Ve.ltc_1.value=Z.state.rectAreaLTC1,Ve.ltc_2.value=Z.state.rectAreaLTC2,Ve.pointLights.value=Z.state.point,Ve.pointLightShadows.value=Z.state.pointShadow,Ve.hemisphereLights.value=Z.state.hemi,Ve.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ve.spotLightMatrix.value=Z.state.spotLightMatrix,Ve.spotLightMap.value=Z.state.spotLightMap,Ve.pointShadowMatrix.value=Z.state.pointShadowMatrix),X.lightProbeGrid=A.state.lightProbeGridArray.length>0,X.currentProgram=nt,X.uniformsList=null,nt}function Fn(b){if(b.uniformsList===null){let z=b.currentProgram.getUniforms();b.uniformsList=gr.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function On(b,z){let j=$.get(b);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}function Yn(b,z){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;S.setFromMatrixPosition(z.matrixWorld);for(let j=0,X=b.length;j<X;j++){let Z=b[j];if(Z.texture!==null&&Z.boundingBox.containsPoint(S))return Z}return null}function $n(b,z,j,X,Z){z.isScene!==!0&&(z=ct),G.resetTextureUnits();let Ie=z.fog,be=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?z.environment:null,Ee=ne===null?U.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:xt.workingColorSpace,Me=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ue=fe.get(X.envMap||be,Me),Ye=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,nt=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ve=!!j.morphAttributes.position,gt=!!j.morphAttributes.normal,vt=!!j.morphAttributes.color,it=ri;X.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(it=U.toneMapping);let yt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Bt=yt!==void 0?yt.length:0,Le=$.get(X),sn=A.state.lights;if(ot===!0&&(ce===!0||b!==te)){let Tt=b===te&&X.id===oe;Ge.setState(X,b,Tt)}let _t=!1;X.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==sn.state.version||Le.outputColorSpace!==Ee||Z.isBatchedMesh&&Le.batching===!1||!Z.isBatchedMesh&&Le.batching===!0||Z.isBatchedMesh&&Le.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Le.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Le.instancing===!1||!Z.isInstancedMesh&&Le.instancing===!0||Z.isSkinnedMesh&&Le.skinning===!1||!Z.isSkinnedMesh&&Le.skinning===!0||Z.isInstancedMesh&&Le.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Le.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Le.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Le.instancingMorph===!1&&Z.morphTexture!==null||Le.envMap!==Ue||X.fog===!0&&Le.fog!==Ie||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==Ge.numPlanes||Le.numIntersection!==Ge.numIntersection)||Le.vertexAlphas!==Ye||Le.vertexTangents!==nt||Le.morphTargets!==Ve||Le.morphNormals!==gt||Le.morphColors!==vt||Le.toneMapping!==it||Le.morphTargetsCount!==Bt||!!Le.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(_t=!0):(_t=!0,Le.__version=X.version);let mn=Le.currentProgram;_t===!0&&(mn=vi(X,z,Z),q&&X.isNodeMaterial&&q.onUpdateProgram(X,mn,Le));let Ut=!1,En=!1,Bi=!1,bt=mn.getUniforms(),wt=Le.uniforms;if(_.useProgram(mn.program)&&(Ut=!0,En=!0,Bi=!0),X.id!==oe&&(oe=X.id,En=!0),Le.needsLights){let Tt=Yn(A.state.lightProbeGridArray,Z);Le.lightProbeGrid!==Tt&&(Le.lightProbeGrid=Tt,En=!0)}if(Ut||te!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),bt.setValue(B,"projectionMatrix",b.projectionMatrix),bt.setValue(B,"viewMatrix",b.matrixWorldInverse);let gn=bt.map.cameraPosition;gn!==void 0&&gn.setValue(B,Oe.setFromMatrixPosition(b.matrixWorld)),w.logarithmicDepthBuffer&&bt.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&bt.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),te!==b&&(te=b,En=!0,Bi=!0)}if(Le.needsLights&&(sn.state.directionalShadowMap.length>0&&bt.setValue(B,"directionalShadowMap",sn.state.directionalShadowMap,G),sn.state.spotShadowMap.length>0&&bt.setValue(B,"spotShadowMap",sn.state.spotShadowMap,G),sn.state.pointShadowMap.length>0&&bt.setValue(B,"pointShadowMap",sn.state.pointShadowMap,G)),Z.isSkinnedMesh){bt.setOptional(B,Z,"bindMatrix"),bt.setOptional(B,Z,"bindMatrixInverse");let Tt=Z.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),bt.setValue(B,"boneTexture",Tt.boneTexture,G))}Z.isBatchedMesh&&(bt.setOptional(B,Z,"batchingTexture"),bt.setValue(B,"batchingTexture",Z._matricesTexture,G),bt.setOptional(B,Z,"batchingIdTexture"),bt.setValue(B,"batchingIdTexture",Z._indirectTexture,G),bt.setOptional(B,Z,"batchingColorTexture"),Z._colorsTexture!==null&&bt.setValue(B,"batchingColorTexture",Z._colorsTexture,G));let wn=j.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&D.update(Z,j,mn),(En||Le.receiveShadow!==Z.receiveShadow)&&(Le.receiveShadow=Z.receiveShadow,bt.setValue(B,"receiveShadow",Z.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&z.environment!==null&&(wt.envMapIntensity.value=z.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=Ly()),En){if(bt.setValue(B,"toneMappingExposure",U.toneMappingExposure),Le.needsLights&&hs(wt,Bi),Ie&&X.fog===!0&&Be.refreshFogUniforms(wt,Ie),Be.refreshMaterialUniforms(wt,X,de,ye,A.state.transmissionRenderTarget[b.id]),Le.needsLights&&Le.lightProbeGrid){let Tt=Le.lightProbeGrid;wt.probesSH.value=Tt.texture,wt.probesMin.value.copy(Tt.boundingBox.min),wt.probesMax.value.copy(Tt.boundingBox.max),wt.probesResolution.value.copy(Tt.resolution)}gr.upload(B,Fn(Le),wt,G)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(gr.upload(B,Fn(Le),wt,G),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&bt.setValue(B,"center",Z.center),bt.setValue(B,"modelViewMatrix",Z.modelViewMatrix),bt.setValue(B,"normalMatrix",Z.normalMatrix),bt.setValue(B,"modelMatrix",Z.matrixWorld),X.uniformsGroups!==void 0){let Tt=X.uniformsGroups;for(let gn=0,jn=Tt.length;gn<jn;gn++){let Sa=Tt[gn];ue.update(Sa,mn),ue.bind(Sa,mn)}}return mn}function hs(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function Zn(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(b,z,j){let X=$.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),$.get(b.texture).__webglTexture=z,$.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:j,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,z){let j=$.get(b);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,j=0){ne=b,K=z,J=j;let X=null,Z=!1,Ie=!1;if(b){let Ee=$.get(b);if(Ee.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(B.FRAMEBUFFER,Ee.__webglFramebuffer),xe.copy(b.viewport),we.copy(b.scissor),Qe=b.scissorTest,_.viewport(xe),_.scissor(we),_.setScissorTest(Qe),oe=-1;return}else if(Ee.__webglFramebuffer===void 0)G.setupRenderTarget(b);else if(Ee.__hasExternalTextures)G.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ye=b.depthTexture;if(Ee.__boundDepthTexture!==Ye){if(Ye!==null&&$.has(Ye)&&(b.width!==Ye.image.width||b.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");G.setupDepthRenderbuffer(b)}}let Me=b.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(Ie=!0);let Ue=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ue[z])?X=Ue[z][j]:X=Ue[z],Z=!0):b.samples>0&&G.useMultisampledRTT(b)===!1?X=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Ue)?X=Ue[j]:X=Ue,xe.copy(b.viewport),we.copy(b.scissor),Qe=b.scissorTest}else xe.copy(Fe).multiplyScalar(de).floor(),we.copy(lt).multiplyScalar(de).floor(),Qe=et;if(j!==0&&(X=ie),_.bindFramebuffer(B.FRAMEBUFFER,X)&&_.drawBuffers(b,X),_.viewport(xe),_.scissor(we),_.setScissorTest(Qe),Z){let Ee=$.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ee.__webglTexture,j)}else if(Ie){let Ee=z;for(let Me=0;Me<b.textures.length;Me++){let Ue=$.get(b.textures[Me]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Me,Ue.__webglTexture,j,Ee)}}else if(b!==null&&j!==0){let Ee=$.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ee.__webglTexture,j)}oe=-1},this.readRenderTargetPixels=function(b,z,j,X,Z,Ie,be,Ee=0){if(!(b&&b.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Me=Me[be]),Me){_.bindFramebuffer(B.FRAMEBUFFER,Me);try{let Ue=b.textures[Ee],Ye=Ue.format,nt=Ue.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ee),!w.textureFormatReadable(Ye)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(nt)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-X&&j>=0&&j<=b.height-Z&&B.readPixels(z,j,X,Z,ve.convert(Ye),ve.convert(nt),Ie)}finally{let Ue=ne!==null?$.get(ne).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(b,z,j,X,Z,Ie,be,Ee=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Me=Me[be]),Me)if(z>=0&&z<=b.width-X&&j>=0&&j<=b.height-Z){_.bindFramebuffer(B.FRAMEBUFFER,Me);let Ue=b.textures[Ee],Ye=Ue.format,nt=Ue.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ee),!w.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ve=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ve),B.bufferData(B.PIXEL_PACK_BUFFER,Ie.byteLength,B.STREAM_READ),B.readPixels(z,j,X,Z,ve.convert(Ye),ve.convert(nt),0);let gt=ne!==null?$.get(ne).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,gt);let vt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Xd(B,vt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ve),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Ie),B.deleteBuffer(Ve),B.deleteSync(vt),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,z=null,j=0){let X=Math.pow(2,-j),Z=Math.floor(b.image.width*X),Ie=Math.floor(b.image.height*X),be=z!==null?z.x:0,Ee=z!==null?z.y:0;G.setTexture2D(b,0),B.copyTexSubImage2D(B.TEXTURE_2D,j,0,0,be,Ee,Z,Ie),_.unbindTexture()},this.copyTextureToTexture=function(b,z,j=null,X=null,Z=0,Ie=0){let be,Ee,Me,Ue,Ye,nt,Ve,gt,vt,it=b.isCompressedTexture?b.mipmaps[Ie]:b.image;if(j!==null)be=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Me=j.isBox3?j.max.z-j.min.z:1,Ue=j.min.x,Ye=j.min.y,nt=j.isBox3?j.min.z:0;else{let wt=Math.pow(2,-Z);be=Math.floor(it.width*wt),Ee=Math.floor(it.height*wt),b.isDataArrayTexture?Me=it.depth:b.isData3DTexture?Me=Math.floor(it.depth*wt):Me=1,Ue=0,Ye=0,nt=0}X!==null?(Ve=X.x,gt=X.y,vt=X.z):(Ve=0,gt=0,vt=0);let yt=ve.convert(z.format),Bt=ve.convert(z.type),Le;z.isData3DTexture?(G.setTexture3D(z,0),Le=B.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(G.setTexture2DArray(z,0),Le=B.TEXTURE_2D_ARRAY):(G.setTexture2D(z,0),Le=B.TEXTURE_2D),_.activeTexture(B.TEXTURE0),_.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,z.flipY),_.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),_.pixelStorei(B.UNPACK_ALIGNMENT,z.unpackAlignment);let sn=_.getParameter(B.UNPACK_ROW_LENGTH),_t=_.getParameter(B.UNPACK_IMAGE_HEIGHT),mn=_.getParameter(B.UNPACK_SKIP_PIXELS),Ut=_.getParameter(B.UNPACK_SKIP_ROWS),En=_.getParameter(B.UNPACK_SKIP_IMAGES);_.pixelStorei(B.UNPACK_ROW_LENGTH,it.width),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,it.height),_.pixelStorei(B.UNPACK_SKIP_PIXELS,Ue),_.pixelStorei(B.UNPACK_SKIP_ROWS,Ye),_.pixelStorei(B.UNPACK_SKIP_IMAGES,nt);let Bi=b.isDataArrayTexture||b.isData3DTexture,bt=z.isDataArrayTexture||z.isData3DTexture;if(b.isDepthTexture){let wt=$.get(b),wn=$.get(z),Tt=$.get(wt.__renderTarget),gn=$.get(wn.__renderTarget);_.bindFramebuffer(B.READ_FRAMEBUFFER,Tt.__webglFramebuffer),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let jn=0;jn<Me;jn++)Bi&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,$.get(b).__webglTexture,Z,nt+jn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,$.get(z).__webglTexture,Ie,vt+jn)),B.blitFramebuffer(Ue,Ye,be,Ee,Ve,gt,be,Ee,B.DEPTH_BUFFER_BIT,B.NEAREST);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Z!==0||b.isRenderTargetTexture||$.has(b)){let wt=$.get(b),wn=$.get(z);_.bindFramebuffer(B.READ_FRAMEBUFFER,ee),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,Y);for(let Tt=0;Tt<Me;Tt++)Bi?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,wt.__webglTexture,Z,nt+Tt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,wt.__webglTexture,Z),bt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,wn.__webglTexture,Ie,vt+Tt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,wn.__webglTexture,Ie),Z!==0?B.blitFramebuffer(Ue,Ye,be,Ee,Ve,gt,be,Ee,B.COLOR_BUFFER_BIT,B.NEAREST):bt?B.copyTexSubImage3D(Le,Ie,Ve,gt,vt+Tt,Ue,Ye,be,Ee):B.copyTexSubImage2D(Le,Ie,Ve,gt,Ue,Ye,be,Ee);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else bt?b.isDataTexture||b.isData3DTexture?B.texSubImage3D(Le,Ie,Ve,gt,vt,be,Ee,Me,yt,Bt,it.data):z.isCompressedArrayTexture?B.compressedTexSubImage3D(Le,Ie,Ve,gt,vt,be,Ee,Me,yt,it.data):B.texSubImage3D(Le,Ie,Ve,gt,vt,be,Ee,Me,yt,Bt,it):b.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Ie,Ve,gt,be,Ee,yt,Bt,it.data):b.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Ie,Ve,gt,it.width,it.height,yt,it.data):B.texSubImage2D(B.TEXTURE_2D,Ie,Ve,gt,be,Ee,yt,Bt,it);_.pixelStorei(B.UNPACK_ROW_LENGTH,sn),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_t),_.pixelStorei(B.UNPACK_SKIP_PIXELS,mn),_.pixelStorei(B.UNPACK_SKIP_ROWS,Ut),_.pixelStorei(B.UNPACK_SKIP_IMAGES,En),Ie===0&&z.generateMipmaps&&B.generateMipmap(Le),_.unbindTexture()},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&G.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?G.setTextureCube(b,0):b.isData3DTexture?G.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?G.setTexture2DArray(b,0):G.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){K=0,J=0,ne=null,_.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}};var Tf=new Pn,Ol=new N,xr=class extends ia{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new zt(e,3)),this.setAttribute("uv",new zt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Qi(t,6,1);return this.setAttribute("instanceStart",new Ln(n,3,0)),this.setAttribute("instanceEnd",new Ln(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Qi(t,6,1);return this.setAttribute("instanceColorStart",new Ln(n,3,0)),this.setAttribute("instanceColorEnd",new Ln(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ea(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Tf.setFromBufferAttribute(t),this.boundingBox.union(Tf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ol.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ol)),Ol.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ol));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ae.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new We},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};pn.line={uniforms:ga.merge([Ae.common,Ae.fog,Ae.line]),vertexShader:`
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
		`};var yr=class extends dn{constructor(e){super({type:"LineMaterial",uniforms:ga.clone(pn.line.uniforms),vertexShader:pn.line.vertexShader,fragmentShader:pn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Vh=new Rt,Af=new N,Cf=new N,Kt=new Rt,Qt=new Rt,gi=new Rt,Hh=new N,Gh=new Lt,en=new ra,Rf=new N,Bl=new Pn,zl=new si,_i=new Rt,xi,Is;function If(i,e,t){return _i.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),_i.multiplyScalar(1/_i.w),_i.x=Is/t.width,_i.y=Is/t.height,_i.applyMatrix4(i.projectionMatrixInverse),_i.multiplyScalar(1/_i.w),Math.abs(Math.max(_i.x,_i.y))}function Ny(i,e){let t=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,l=a;o<l;o++){en.start.fromBufferAttribute(s,o),en.end.fromBufferAttribute(r,o),en.applyMatrix4(t);let c=new N,d=new N;xi.distanceSqToSegment(en.start,en.end,d,c),d.distanceTo(c)<Is*.5&&e.push({point:d,pointOnLine:c,distance:xi.origin.distanceTo(d),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Uy(i,e,t){let n=e.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),p=-e.near;xi.at(1,gi),gi.w=1,gi.applyMatrix4(e.matrixWorldInverse),gi.applyMatrix4(n),gi.multiplyScalar(1/gi.w),gi.x*=r.x/2,gi.y*=r.y/2,gi.z=0,Hh.copy(gi),Gh.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,g=d;u<g;u++){if(Kt.fromBufferAttribute(l,u),Qt.fromBufferAttribute(c,u),Kt.w=1,Qt.w=1,Kt.applyMatrix4(Gh),Qt.applyMatrix4(Gh),Kt.z>p&&Qt.z>p)continue;if(Kt.z>p){let L=Kt.z-Qt.z,S=(Kt.z-p)/L;Kt.lerp(Qt,S)}else if(Qt.z>p){let L=Qt.z-Kt.z,S=(Qt.z-p)/L;Qt.lerp(Kt,S)}Kt.applyMatrix4(n),Qt.applyMatrix4(n),Kt.multiplyScalar(1/Kt.w),Qt.multiplyScalar(1/Qt.w),Kt.x*=r.x/2,Kt.y*=r.y/2,Qt.x*=r.x/2,Qt.y*=r.y/2,en.start.copy(Kt),en.start.z=0,en.end.copy(Qt),en.end.z=0;let E=en.closestPointToPointParameter(Hh,!0);en.at(E,Rf);let f=as.lerp(Kt.z,Qt.z,E),m=f>=-1&&f<=1,P=Hh.distanceTo(Rf)<Is*.5;if(m&&P){en.start.fromBufferAttribute(l,u),en.end.fromBufferAttribute(c,u),en.start.applyMatrix4(a),en.end.applyMatrix4(a);let L=new N,S=new N;xi.distanceSqToSegment(en.start,en.end,S,L),t.push({point:S,pointOnLine:L,distance:xi.origin.distanceTo(S),object:i,face:null,faceIndex:u,uv:null,uv1:null})}}}var kl=class extends Jt{constructor(e=new xr,t=new yr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Af.fromBufferAttribute(t,a),Cf.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Af.distanceTo(Cf);let r=new Qi(s,2,1);return e.setAttribute("instanceDistanceStart",new Ln(r,1,0)),e.setAttribute("instanceDistanceEnd",new Ln(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,s=e.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;xi=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;Is=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),zl.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Is*.5;else{let p=Math.max(s.near,zl.distanceToPoint(xi.origin));c=If(s,p,l.resolution)}if(zl.radius+=c,xi.intersectsSphere(zl)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Bl.copy(o.boundingBox).applyMatrix4(a);let d;if(n)d=Is*.5;else{let p=Math.max(s.near,Bl.distanceToPoint(xi.origin));d=If(s,p,l.resolution)}Bl.expandByScalar(d),xi.intersectsBox(Bl)!==!1&&(n?Ny(this,t):Uy(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Vh),this.material.uniforms.resolution.value.set(Vh.z,Vh.w))}};var ls=Object.freeze({TREND_RESIDUAL:"trend_residual",INTELLIGENCE_UPLIFT:"intelligence_uplift",WEIGHTED_EXCLUSIVE_HYPERVOLUME:"weighted_exclusive_hypervolume",FRONTIER_DISTANCE:"frontier_distance"}),li=Object.freeze({[ls.TREND_RESIDUAL]:{label:"\u8D8B\u52BF\u6B8B\u5DEE",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"trend_residual"},[ls.INTELLIGENCE_UPLIFT]:{label:"\u667A\u80FD\u62AC\u5347",displayedDecimalPlaces:1,usesAdjustableAxisWeights:!1,modelMetricFieldName:"intelligence_uplift"},[ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME]:{label:"\u52A0\u6743\u8D85\u4F53\u79EF",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!0,modelMetricFieldName:"weighted_exclusive_hypervolume"},[ls.FRONTIER_DISTANCE]:{label:"\u5230\u524D\u6CBF\u5782\u8DDD",displayedDecimalPlaces:3,usesAdjustableAxisWeights:!1,modelMetricFieldName:"frontier_distance"}});function Pf(i){let e=i.slice().sort((s,r)=>r[0]-s[0]||r[1]-s[1]),t=0,n=0;return e.forEach(([s,r])=>{r>n&&(t+=s*(r-n),n=r)}),t}function Lf(i){if(!i.length)return 0;let e=i.slice().sort((r,a)=>a[2]-r[2]),t=0,n=null,s=[];return e.forEach(([r,a,o])=>{n!==null&&(t+=Pf(s)*(n-o)),s.push([r,a]),n=o}),t+Pf(s)*n}function va(i,e){let t=i.map(r=>{let a=r.normalized_improvement_coordinates;return[Math.pow(a.cost_efficiency,e.cost),Math.pow(a.speed,e.speed),Math.pow(a.intelligence,e.intelligence)]}),n=Lf(t);return{contributions:t.map((r,a)=>n-Lf(t.filter((o,l)=>a!==l))),completeFrontierHypervolume:n}}function Df(i,e,t){let n=li[e];if(!n)throw new Error(`Unknown frontier standout metric: ${e}`);return n.usesAdjustableAxisWeights?va(i,t).contributions:i.map(s=>{let r=s.standout_metrics[n.modelMetricFieldName];return r==null||!isFinite(r)?NaN:r})}var Nf=new WeakMap;async function Ff(i){if(typeof DecompressionStream!="function")throw new Error("\u6D4F\u89C8\u5668\u7F3A\u5C11 gzip \u89E3\u7801\u80FD\u529B\uFF0C\u8BF7\u4F7F\u7528\u652F\u6301 DecompressionStream \u7684\u6D4F\u89C8\u5668");return JSON.parse(await new Response(i.stream().pipeThrough(new DecompressionStream("gzip"))).text())}async function Fy(i){let e=Uint8Array.from(atob(i),t=>t.charCodeAt(0));return Ff(new Blob([e]))}async function Of(i,e=globalThis.fetch){if(i.schema_version!=="frontier_3d_historical_progress_browser_transport/v1"||!Array.isArray(i.payload_segment_urls)||!i.payload_segment_urls.length||i.payload_segment_urls.some(a=>typeof a!="string"||!/^[a-z0-9-]+\.gzpart$/.test(a)))throw new Error("\u5386\u53F2\u62A5\u544A\u5206\u6BB5\u8D44\u6E90\u6E05\u5355\u65E0\u6548");let t=await Promise.all(i.payload_segment_urls.map(async a=>{let o=await e(a);if(!o.ok)throw new Error(`\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u8BFB\u53D6\u5931\u8D25\uFF1A${a}\uFF08${o.status}\uFF09`);return o.arrayBuffer()})),n=new Blob(t);if(n.size!==i.compressed_payload_byte_count)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90\u603B\u957F\u5EA6\u4E0D\u5339\u914D");let s=await globalThis.crypto.subtle.digest("SHA-256",await n.arrayBuffer());if([...new Uint8Array(s)].map(a=>a.toString(16).padStart(2,"0")).join("")!==i.compressed_payload_sha256)throw new Error("\u5386\u53F2\u62A5\u544A\u8D44\u6E90 SHA256 \u4E0D\u5339\u914D");return Ff(n)}function Uf(i,e,t,n){if(i.has(e))return i.get(e);let s=Fy(t).catch(r=>{throw i.get(e)===s&&i.delete(e),r});for(i.set(e,s);i.size>n;)i.delete(i.keys().next().value);return s}async function Bf(i,e){if(e.scientific_dataset)return{scientific_dataset:e.scientific_dataset,scene_geometry_definitions:i.scene_geometry_definitions};let t=Nf.get(i);t||(t={frames:new Map,geometries:new Map},Nf.set(i,t));let n=await Uf(t.frames,e.historical_frame_id,e.scientific_dataset_compressed_base64_gzip,4);if(!n||!n.metric_variants)throw new Error("\u5386\u53F2\u65F6\u95F4\u6B65\u573A\u666F\u7ED3\u6784\u65E0\u6548");let s=i.scene_geometry_definitions_compressed_base64_gzip,r=new Array(s.length);return await Promise.all(Object.values(n.metric_variants).map(async a=>{let o=a.three_dimensional_scene.historical_scene_geometry_definition_index;if(!Number.isInteger(o)||o<0||o>=s.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");let l=await Uf(t.geometries,o,s[o],8);if(!l||typeof l!="object"||Array.isArray(l))throw new Error("\u5386\u53F2\u51E0\u4F55\u7ED3\u6784\u65E0\u6548");r[o]=l})),{scientific_dataset:n,scene_geometry_definitions:r}}function zf(i,e){return i.frames.filter(t=>t.historical_view_mode===e.historical_view_mode&&t.analysis_sample_policy===e.analysis_sample_policy&&(e.intelligence_index_version==="all_versions"||t.intelligence_index_version===e.intelligence_index_version)&&(e.historical_view_mode==="observation_replay"||t.source_snapshot_id===e.source_snapshot_id)).sort((t,n)=>(t.release_cutoff_date||t.observed_at_utc).localeCompare(n.release_cutoff_date||n.observed_at_utc))}function kf(i,e){let t=e.model_observation_indices.map(s=>{if(!Number.isInteger(s)||s<0||s>=i.model_observations.length)throw new Error("\u5386\u53F2\u6A21\u578B\u89C2\u6D4B\u5F15\u7528\u8D8A\u754C");return i.model_observations[s]}),n=Object.fromEntries(Object.entries(e.scientific_dataset.metric_variants).map(([s,r])=>{let{historical_scene_geometry_definition_index:a,...o}=r.three_dimensional_scene;if(!Number.isInteger(a)||a<0||a>=i.scene_geometry_definitions.length)throw new Error("\u5386\u53F2\u51E0\u4F55\u5F15\u7528\u8D8A\u754C");return[s,{...r,three_dimensional_scene:{...o,...i.scene_geometry_definitions[a]}}]}));return{...i.scientific_dataset_shared_metadata,...e.scientific_dataset,metric_variants:n,models:t}}function Oy(i,e,t){let n=!!(i&&i.intelligence_index_version!==e.intelligence_index_version),s=new Set(i?.metric_variant_summaries[t]?.pareto_model_uuids||[]),r=new Set(e.metric_variant_summaries[t]?.pareto_model_uuids||[]);return{methodology_boundary:n,entered_model_uuids:n||!i?[]:[...r].filter(a=>!s.has(a)),left_model_uuids:n||!i?[]:[...s].filter(a=>!r.has(a))}}function Wh(i,e,t){let s=i.frames.find(r=>r.source_snapshot_id===e.source_snapshot_id&&r.historical_view_mode==="observation_replay"&&r.analysis_sample_policy==="include_estimated")?.model_observation_indices.map(r=>i.model_observations[r]).find(r=>r.model_uuid===t);if(!s)return"\u672C\u6B21\u6837\u672C\u7F3A\u5E2D\u6216\u6CA1\u6709\u53EF\u7528\u667A\u80FD\u5206\uFF0C\u672A\u501F\u7528\u5176\u4ED6\u65E5\u671F\u6570\u503C";if(e.analysis_sample_policy==="measured_only"&&s.artificial_analysis_intelligence_index_is_estimated!==!1)return"\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B\uFF1A\u8BE5\u6A21\u578B\u4E3A\u4F30\u7B97\u6216\u4F30\u7B97\u72B6\u6001\u672A\u77E5\uFF0C\u672A\u7EB3\u5165\u5F53\u524D\u5206\u6790\u6837\u672C";if(e.historical_view_mode==="release_retrospective"){let r=i.frames.filter(a=>a.source_snapshot_id===e.source_snapshot_id&&a.historical_view_mode==="release_retrospective"&&a.analysis_sample_policy==="include_estimated").find(a=>a.model_observation_indices.some(o=>i.model_observations[o].model_uuid===t));if(!r)return"\u7F3A\u5C11\u5DF2\u6838\u9A8C\u7684\u53D1\u5E03\u65E5\u671F\uFF0C\u672A\u52A0\u5165\u53D1\u5E03\u56DE\u6EAF";if(r.release_cutoff_date>e.release_cutoff_date)return`\u5C1A\u672A\u8FBE\u5230\u8BE5\u6A21\u578B\u7EDF\u4E00\u53D1\u5E03\u6B65\uFF08${r.release_cutoff_date}\uFF09`}return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6"}function By(i,e,t,n,s){let r=t.metric_variants[n],a=c=>(c.model_uuid||t.models[c.model_index]?.model_uuid)===s,o=r.three_dimensional_scene.displayed_model_markers.find(a);if(o){if(![o.x,o.y,o.z].every(Number.isFinite))return"\u8BE5\u65F6\u70B9\u7F3A\u5C11\u6240\u9009\u53E3\u5F84\u9700\u8981\u7684\u53EF\u6BD4\u7EF4\u5EA6";let c=o.analysis_eligibility;return c?.is_analysis_eligible_for_current_metric_variant===!1?c.ineligibility_reason_text||"\u6240\u9009\u53E3\u5F84\u4E0B\u4E0D\u5177\u5907\u5206\u6790\u8D44\u683C":"\u8BE5\u96C6\u5408\u4E2D\u5DF2\u975E\u524D\u6CBF"}return r.excluded_models_with_drop_reason?.find(a)?.drop_reason||Wh(i,e,s)}function zy(i){let e=null;return i.map(t=>{if(!t||!Number.isFinite(t.y))return e=null,"";let n=!e||e.version!==t.version?`M${t.x},${t.y}`:`H${t.x}V${t.y}`;return e=t,n}).join("")}function ky(i,e,t,n,s){let r=e.metric_variant_summaries[t]?.rankings_by_metric[n]||[];if(n!=="weighted_exclusive_hypervolume"||Object.values(s).every(l=>l===1))return r;let a=e.metric_variant_summaries[t].normalized_frontier_models;if(!a){let l=kf(i,e),c=l.metric_variants[t].three_dimensional_scene.displayed_model_markers,d=new Set(e.metric_variant_summaries[t].pareto_model_uuids);a=c.map(p=>({...l.models[p.model_index],...p})).filter(p=>d.has(p.model_uuid))}let o=va(a,s);return a.map((l,c)=>({model_uuid:l.model_uuid,value:o.contributions[c]})).sort((l,c)=>c.value-l.value||l.model_uuid.localeCompare(c.model_uuid)).map((l,c)=>({...l,rank:c+1}))}async function Xh(i){let e=document.getElementById("frontier-3d-historical-progress-dataset-json");if(!e)return;let t=JSON.parse(e.textContent);if(t.schema_version==="frontier_3d_historical_progress_browser_transport/v1"){let ce=document.createElement("p");ce.id="aa-historical-resource-loading-status",ce.setAttribute("role","status"),ce.textContent="\u6B63\u5728\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74\uFF0C\u5F53\u524D\u573A\u666F\u53EF\u7EE7\u7EED\u6D4F\u89C8\u3002",document.getElementById("frontier-3d-toolbar").before(ce);try{if(t=await Of(t),t.schema_version!=="frontier_3d_historical_progress_browser_projection/v1")throw new Error("\u5386\u53F2\u8D44\u6E90\u4E2D\u7684\u6295\u5F71\u7248\u672C\u4E0D\u5339\u914D");ce.remove()}catch(Ne){ce.textContent=`\u5386\u53F2\u65F6\u95F4\u8F74\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u521D\u59CB\u573A\u666F\uFF1A${String(Ne.message||Ne)}\u3002`;let Oe=document.createElement("button");Oe.type="button",Oe.textContent="\u91CD\u65B0\u8F7D\u5165\u5386\u53F2\u65F6\u95F4\u8F74",Oe.addEventListener("click",()=>{ce.remove(),Xh(i)}),ce.append(Oe);return}}if(!["frontier_3d_historical_progress_dataset/v1","frontier_3d_historical_progress_browser_projection/v1"].includes(t.schema_version))throw new Error("\u5386\u53F2\u6570\u636E\u5951\u7EA6\u7248\u672C\u4E0D\u5339\u914D");let n=new Map(t.frames.map(ce=>[ce.historical_frame_id,ce])),s=n.get(t.initial_historical_frame_id),r=s.intelligence_index_version,a=null,o=[],l=s,c=r,d={...window.FRONTIER_3D_VISUALIZATION_DATASET,schema_version:"frontier_3d_visualization_dataset/v2"},p=0,u=!1,g="",v=new Map,E=new Map(t.source_snapshots.map(ce=>[ce.source_snapshot_id,ce])),f=(ce,Ne,Oe)=>{let He=document.createElement(ce);return Ne!==void 0&&(He.textContent=Ne),Oe&&(He.id=Oe),He},m=(ce,Ne,Oe)=>{let He=f("label",Ne),ct=f("select",void 0,Oe);return He.append(ct),ce.append(He),ct},P=(ce,Ne)=>{let Oe=f("option",Ne);return Oe.value=ce,Oe},L=(ce,Ne,Oe)=>{let He=f("button",ce,Ne);return He.type="button",He.addEventListener("click",Oe),He},S=f("details",void 0,"aa-historical-progress-controls");S.open=!matchMedia("(max-width: 640px)").matches;let R=f("summary","\u5386\u53F2\u89C6\u56FE"),A=f("div",void 0,"aa-historical-progress-fields"),I=m(A,"\u5386\u53F2\u89C6\u89D2","aa-historical-view-mode");I.append(P("release_retrospective","\u56FA\u5B9A\u7248\u672C \xB7 \u53D1\u5E03\u56DE\u6EAF"),P("observation_replay","\u771F\u5B9E\u6863\u6848 \xB7 \u89C2\u6D4B\u56DE\u653E"));let y=m(A,"\u6307\u6570\u7248\u672C","aa-historical-index-version"),C=m(A,"\u6570\u503C\u89C2\u6D4B\u5FEB\u7167","aa-historical-source-snapshot"),U=m(A,"\u5206\u6790\u6837\u672C","aa-historical-analysis-sample");U.append(P("include_estimated","\u5305\u542B\u4F30\u7B97\uFF0C\u672A\u77E5\u53E6\u6807"),P("measured_only","\u4EC5\u5DF2\u786E\u8BA4\u5B9E\u6D4B"));let F=f("div",void 0,"aa-historical-timeline"),q=L("\u4E0A\u4E00\u6B65","aa-historical-previous-step",()=>lt(Number(ee.value)-1)),ie=L("\u4E0B\u4E00\u6B65","aa-historical-next-step",()=>lt(Number(ee.value)+1)),ee=f("input",void 0,"aa-historical-step-range");ee.type="range",ee.min="0",ee.step="1",ee.setAttribute("aria-label","\u9009\u62E9\u5386\u53F2\u65F6\u95F4\u6B65");let Y=f("output",void 0,"aa-historical-current-date");Y.htmlFor=ee.id,F.append(q,ee,ie,Y);let K=f("p",void 0,"aa-historical-view-explanation");K.setAttribute("role","status"),S.append(R,A,F,K);let J=(t.source_validation_outcomes||[]).filter(ce=>ce.status==="rejected");J.length&&S.append(f("p",`\u91C7\u7528 ${t.source_snapshots.length} \u4EFD\u9A8C\u8BC1\u6837\u672C\uFF1B\u9694\u79BB ${J.length} \u4EFD\u6765\u6E90\uFF1A${J.map(ce=>`${ce.source_snapshot_id}\uFF08${ce.rejection_reason}\uFF09`).join("\uFF1B")}`)),document.getElementById("frontier-3d-toolbar").before(S);let ne=f("details",void 0,"aa-historical-progress-panel");ne.className="aa-control-section",ne.open=!0,ne.append(f("summary","\u5386\u53F2\u8FDB\u6B65\u4E0E\u8D21\u732E\u8005"));let oe=f("p",void 0,"aa-historical-coverage-summary"),te=f("h3","\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206"),xe=document.createElementNS("http://www.w3.org/2000/svg","svg");xe.id="aa-historical-intelligence-chart";let we=m(ne,"\u540D\u6B21\u8F68\u8FF9\u6A21\u578B","aa-historical-trajectory-model"),Qe=document.createElementNS("http://www.w3.org/2000/svg","svg");Qe.id="aa-historical-rank-chart";let ht=f("p",void 0,"aa-historical-method-note"),ze=f("div",void 0,"aa-historical-membership-changes");ne.append(oe,te,xe,we.parentElement,Qe,ht,ze),document.getElementById("aa-search-panel").after(ne);let re=()=>window.frontierThreeDimensionalVisualizationState().activeMetricVariantKey,ye=()=>window.frontierStandoutRanking(),de=ce=>`${ce.observed_at_utc.replace("T"," ").replace("Z"," UTC")} \xB7 ${ce.source_model_count} \u6A21\u578B${ce.observed_at_utc_source==="inferred_from_cache_file_modification_time"?" \xB7 \u65F6\u95F4\u63A8\u65AD":""}${ce.intelligence_index_version_resolution==="api_family_refined_by_paired_catalog"?" \xB7 \u8865\u4E01\u7248\u672C\u636E\u914D\u5957\u76EE\u5F55\u7EC6\u5316":""}`,je=[...new Set(t.source_snapshots.map(ce=>ce.intelligence_index_version))].sort((ce,Ne)=>Ne.localeCompare(ce,void 0,{numeric:!0}));function Ze(){I.value=s.historical_view_mode,U.value=s.analysis_sample_policy,y.replaceChildren(...je.map(He=>P(He,`V${He}`))),s.historical_view_mode==="observation_replay"&&y.prepend(P("all_versions","\u5168\u90E8\u7248\u672C\uFF0C\u5206\u6BB5\u663E\u793A")),y.value=r;let ce=t.source_snapshots.filter(He=>r==="all_versions"||He.intelligence_index_version===r);C.replaceChildren(...ce.map(He=>P(He.source_snapshot_id,de(He)))),C.value=s.source_snapshot_id,C.disabled=s.historical_view_mode==="observation_replay",o=zf(t,{...s,intelligence_index_version:r}),ee.max=String(Math.max(0,o.length-1)),ee.value=String(o.indexOf(s)),ee.setAttribute("aria-valuetext",s.release_cutoff_date||s.observed_at_utc),q.disabled=Number(ee.value)<=0,ie.disabled=Number(ee.value)>=o.length-1;let Ne=E.get(s.source_snapshot_id),Oe=s.historical_view_mode==="release_retrospective"?`\u53D1\u5E03\u622A\u6B62 ${s.release_cutoff_date}`:`\u6863\u6848\u89C2\u6D4B ${s.observed_at_utc.slice(0,10)}`;Y.value=`${Oe} \xB7 ${Number(ee.value)+1}/${o.length}`,R.textContent=`\u5386\u53F2\u89C6\u56FE \xB7 ${Oe} \xB7 V${s.intelligence_index_version}`,K.textContent=s.historical_view_mode==="release_retrospective"?`\u6570\u503C\u56FA\u5B9A\u5728 ${de(Ne)}\u3002\u5DF2\u786E\u8BA4\u540C release \u7684\u5404 effort \u6309\u6700\u65E9\u53D1\u5E03\u65E5\u671F\u540C\u6B65\u6B65\u8FDB\uFF1B\u5F52\u7EC4\u672A\u77E5\u8005\u4FDD\u7559 AA \u65E5\u671F\u5E76\u53E6\u6807\u3002\u4EF7\u683C\u3001\u901F\u5EA6\u548C\u6210\u7EE9\u4E0D\u4EE3\u8868\u53D1\u5E03\u5F53\u5E74\u5DF2\u77E5\u72B6\u6001\u3002`:`\u4EC5\u56DE\u653E\u4FDD\u7559\u7684\u89C2\u6D4B\uFF0C\u4E0D\u63D2\u503C\u3001\u4E0D\u56DE\u586B\u672A\u6765\u6570\u503C\u3002${de(Ne)}\uFF1B\u6837\u672C\u7F3A\u5E2D\u4E0D\u4EE3\u8868\u6A21\u578B\u5F53\u65F6\u4E0D\u53EF\u7528\u3002`}async function Fe(ce,Ne=!0){if(!ce)return!1;let Oe=++p;if(s=ce,Ze(),u=Ne,S.setAttribute("aria-busy",String(u)),ne.setAttribute("aria-busy",String(u)),!Ne)return ot(),!0;let He=K.textContent;K.textContent=`\u6B63\u5728\u8F7D\u5165\u65F6\u95F4\u6B65\u3002${He}`;try{let ct=await Bf(t,ce);if(Oe!==p)return!1;let Je=kf({...t,scene_geometry_definitions:ct.scene_geometry_definitions},{...ce,scientific_dataset:ct.scientific_dataset});return u=!1,i(Je,mt=>Wh(t,ce,mt)),l=ce,c=r,d=Je,K.textContent=He,!0}catch(ct){return Oe!==p||(s=l,r=c,u=!1,Ze(),d&&i(d,Je=>Wh(t,l,Je)),K.textContent=`\u65F6\u95F4\u6B65\u8F7D\u5165\u5931\u8D25\uFF0C\u4FDD\u7559\u4E0A\u4E00\u6709\u6548\u573A\u666F\uFF1A${String(ct.message||ct)}\u3002\u53EF\u4EE5\u7EE7\u7EED\u9009\u62E9\u5176\u4ED6\u65F6\u95F4\u6B65\u3002`),!1}finally{Oe===p&&(S.setAttribute("aria-busy","false"),ne.setAttribute("aria-busy","false"))}}function lt(ce){return Fe(o[Math.min(o.length-1,Math.max(0,ce))])}function et(ce){let Ne={...s,intelligence_index_version:r,...ce},Oe=zf(t,Ne);if(!Oe.length)return!1;let He=Ne.release_cutoff_date&&Ne.historical_view_mode==="release_retrospective"?[...Oe].reverse().find(ct=>ct.release_cutoff_date<=Ne.release_cutoff_date)||Oe[0]:Oe.at(-1);return r=Ne.intelligence_index_version,Fe(He)}I.addEventListener("change",()=>{let ce=r==="all_versions"?s.intelligence_index_version:r;et({historical_view_mode:I.value,intelligence_index_version:ce})}),y.addEventListener("change",()=>{let ce=t.source_snapshots.filter(Ne=>y.value==="all_versions"||Ne.intelligence_index_version===y.value).at(-1);et({intelligence_index_version:y.value,source_snapshot_id:ce.source_snapshot_id,release_cutoff_date:null})}),C.addEventListener("change",()=>et({source_snapshot_id:C.value,release_cutoff_date:null})),U.addEventListener("change",()=>et({analysis_sample_policy:U.value})),ee.addEventListener("input",()=>lt(Number(ee.value))),we.addEventListener("change",()=>{a=we.value,ot()});function pt(ce,Ne,Oe,He=!1,ct=Ne){ce.replaceChildren(),ce.setAttribute("viewBox","0 0 360 150"),ce.setAttribute("role","img"),ce.setAttribute("aria-label",Oe);let Je=(G,fe,ge)=>{let H=document.createElementNS(ce.namespaceURI,G);return Object.entries(fe).forEach(([Q,pe])=>H.setAttribute(Q,String(pe))),ge!==void 0&&(H.textContent=ge),ce.append(H),H};if(!Ne.filter(G=>Number.isFinite(G.value)).length){Je("text",{x:12,y:65},"\u8BE5\u533A\u95F4\u6682\u65E0\u53EF\u6BD4\u6570\u636E\u6216\u524D\u6CBF\u540D\u6B21");return}let B=o.map(G=>Date.parse(G.release_cutoff_date||G.observed_at_utc)),Ot=B[0],at=B.at(-1)-Ot||1,w=ct.filter(G=>Number.isFinite(G.value)),_=He?1:Math.min(...w.map(G=>G.value)),k=Math.max(_+1,...w.map(G=>G.value)),$=Ne.map(G=>Number.isFinite(G.value)?{x:35+305*(Date.parse(G.frame.release_cutoff_date||G.frame.observed_at_utc)-Ot)/at,y:He?18+100*(G.value-_)/(k-_):118-100*(G.value-_)/(k-_),version:G.frame.intelligence_index_version,item:G}:null);Je("path",{d:"M35,15V120H345",class:"aa-history-chart-axis"}),Je("path",{d:zy($),class:"aa-history-chart-line"}),Je("text",{x:2,y:22},He?"1":k.toFixed(1)),Je("text",{x:2,y:118},He?k.toFixed(0):_.toFixed(1)),Je("text",{x:35,y:143},(o[0].release_cutoff_date||o[0].observed_at_utc).slice(0,10)),Je("text",{x:345,y:143,"text-anchor":"end"},(o.at(-1).release_cutoff_date||o.at(-1).observed_at_utc).slice(0,10)),$.filter(Boolean).forEach(G=>{let fe=Je("circle",{cx:G.x,cy:G.y,r:G.item.frame===s?4.5:2.5,class:"aa-history-chart-point"}),ge=document.createElementNS(ce.namespaceURI,"title");ge.textContent=`${G.item.frame.release_cutoff_date||G.item.frame.observed_at_utc} \xB7 V${G.version} \xB7 ${G.item.value}`,fe.append(ge),fe.addEventListener("click",()=>Fe(G.item.frame))})}function ot(){if(u)return;let ce=re(),Ne=s.metric_variant_summaries[ce],Oe=ye(),He=Oe.selectedFrontierStandoutMetricName,ct=JSON.stringify([ce,He,Oe.frontierStandoutAxisWeights,o.map(H=>H.historical_frame_id)]);g!==ct&&(g=ct,v.clear());let Je=o.map(H=>(v.has(H.historical_frame_id)||v.set(H.historical_frame_id,ky(t,H,ce,He,Oe.frontierStandoutAxisWeights)),v.get(H.historical_frame_id))),mt=o.indexOf(s),B=Je[mt]||[],Ot=o.slice(0,mt+1),at=new Set(Je.slice(0,mt+1).flat().map(H=>H.model_uuid)),w=[...at].sort((H,Q)=>(t.models_by_uuid[H]?.name||H).localeCompare(t.models_by_uuid[Q]?.name||Q));at.has(a)||(a=B[0]?.model_uuid||w[0]||null),we.replaceChildren(...w.map(H=>P(H,t.models_by_uuid[H]?.name||H))),we.value=a||"";let _=s.model_observation_indices.filter(H=>t.release_identity_resolution_by_model_uuid?.[t.model_observations[H].model_uuid]==="unresolved_release_group").length;oe.textContent=`${Ne.analysis_eligible_model_count} \u4E2A\u53EF\u6BD4\u6A21\u578B \xB7 ${Ne.pareto_model_uuids.length} \u4E2A\u524D\u6CBF\u6210\u5458 \xB7 \u5176\u4E2D\u4F30\u7B97 ${Ne.estimated_intelligence_count}\uFF0C\u4F30\u7B97\u72B6\u6001\u672A\u77E5 ${Ne.unknown_estimation_status_count}\uFF1Brelease \u5F52\u7EC4\u672A\u77E5 ${_}\u3002${Ne.unavailable_reason||""}`;let k=o.map(H=>({frame:H,value:H.metric_variant_summaries[ce].highest_comparable_intelligence}));pt(xe,k.slice(0,mt+1),"\u540C\u7248\u672C\u53EF\u6BD4\u5019\u9009\u96C6\u6700\u9AD8\u667A\u80FD\u5206\uFF0C\u7248\u672C\u65AD\u70B9\u4E0D\u8FDE\u63A5",!1,k);let $=o.map((H,Q)=>({frame:H,value:Je[Q].find(pe=>pe.model_uuid===a)?.rank??null}));pt(Qe,$.slice(0,mt+1),`${t.models_by_uuid[a]?.name||"\u6240\u9009\u6A21\u578B"}\u7684${li[He].label}\u524D\u6CBF\u540D\u6B21\u8F68\u8FF9`,!0,$),ht.textContent=`\u73B0\u884C\u65B9\u6CD5 \xB7 ${li[He].label}\uFF1B\u5206\u6790\u5168\u96C6\u4E0D\u6309\u5E74\u9F84\u5220\u9664\u6A21\u578B\u3002\u540D\u6B21\u53EA\u89E3\u91CA\u8BE5\u65F6\u70B9\u7684\u6BD4\u8F83\uFF0C\u5206\u503C\u4E0D\u4F5C\u8DE8\u65E5\u671F\u589E\u957F\u91CF\u3002${Ne.small_sample_warning||""} F1 \u5019\u9009\u672A\u542F\u7528\u3002`;let G=Oy(o[mt-1],s,ce);if(ze.replaceChildren(f("h3","\u524D\u6CBF\u6210\u5458\u8FDB\u51FA")),G.methodology_boundary)ze.append(f("p","\u6307\u6570\u7248\u672C\u53D8\u5316\uFF0C\u91CD\u7F6E\u6BD4\u8F83\u8D77\u70B9\uFF1B\u4E0D\u628A\u4E24\u7248\u6210\u5458\u5DEE\u5F02\u89E3\u91CA\u4E3A\u8FDB\u6B65\u3002"));else if(!mt)ze.append(f("p","\u5F53\u524D\u5E8F\u5217\u8D77\u70B9\uFF0C\u4E0D\u63A8\u65AD\u66F4\u65E9\u65E5\u671F\u7684\u6210\u5458\u3002"));else{let H=f("ul");for(let Q of G.entered_model_uuids)H.append(f("li",`\u8FDB\u5165\uFF1A${t.models_by_uuid[Q]?.name||Q}`));for(let Q of G.left_model_uuids)H.append(f("li",`\u9000\u51FA\uFF1A${t.models_by_uuid[Q]?.name||Q} \xB7 ${By(t,s,window.FRONTIER_3D_VISUALIZATION_DATASET,ce,Q)}`));ze.append(H.childNodes.length?H:f("p","\u524D\u6CBF\u6210\u5458\u672A\u53D8\u5316\u3002")),s.historical_view_mode==="observation_replay"&&ze.append(f("p","\u6863\u6848\u95F4\u4E5F\u53EF\u80FD\u53D1\u751F\u4EF7\u683C\u3001\u901F\u5EA6\u3001\u8BC4\u6D4B\u6216\u8986\u76D6\u53D8\u5316\uFF0C\u6B64\u5904\u4E0D\u4F5C\u56E0\u679C\u5F52\u56E0\u3002"))}let fe=document.getElementById("aa-speed-metric-select"),ge=ce.split("__")[0];for(let H of fe.options){let Q=s.metric_variant_summaries[`${ge}__${H.value}`]?.unavailable_reason;H.disabled=!!(Q&&Q.includes("\u5F52\u4E00\u5E38\u6570")),H.title=Q||""}}window.addEventListener("frontier-3d-view-updated",ot),window.setHistoricalFrontierTimelineSelection=ce=>{if(ce.historical_frame_id){let Ne=n.get(ce.historical_frame_id);return Ne?(r=Ne.intelligence_index_version,Fe(Ne)):!1}return et(ce)},window.historicalFrontierVisualizationState=()=>({...s,scientific_dataset:void 0,scientific_dataset_compressed_base64_gzip:void 0,rendered_historical_frame_id:l.historical_frame_id,is_frame_loading:u,current_series_frame_ids:o.map(ce=>ce.historical_frame_id),selected_trajectory_model_uuid:a,source_observed_at_utc_source:E.get(s.source_snapshot_id).observed_at_utc_source,methodology_implementation_sha256:t.standout_methodology.methodology_implementation_sha256}),Fe(s,!1)}function Vf(i){let[e,t]=i.fixed_range.map(Number),n=t-e;if(!Number.isFinite(n)||n<=0)return[];if(i.scale_type==="log"&&n>=1){let d=Math.max(1,Math.ceil(n/6)),p=[];for(let u=Math.ceil(e);u<=t;u+=d)p.push(10**u);if(p.length>=3)return p;p.length=0;for(let u=Math.floor(e);u<=t;u+=1)for(let g of[1,2,5]){let v=u+Math.log10(g);v>=e&&v<=t&&p.push(Number((g*10**u).toPrecision(12)))}return p}let s=i.scale_type==="log"?10**e:e,r=i.scale_type==="log"?10**t:t,a=(r-s)/5,o=10**Math.floor(Math.log10(a)),l=[1,2,5,10].find(d=>d*o>=a)*o;Math.floor(r/l)-Math.ceil(s/l)<2&&(l/=2);let c=[];for(let d=Math.ceil(s/l);d<=Math.floor(r/l);d+=1)c.push(Number((d*l).toPrecision(12)));return c}var Hf=i=>String(i??"").trim().replace(/\s+/g," ").toLowerCase();function Gf(i,e,t=40){let n=Hf(e);if(!n)return{groups:[],totalGroupCount:0};let s=new Map,r=new Set;for(let a of i){let o=a.base_model_name||a.name;s.has(o)||s.set(o,[]),s.get(o).push(a),[a.name,o,a.creator,a.reasoning_level_label,a.tier].some(l=>Hf(l).includes(n))&&r.add(o)}return{totalGroupCount:r.size,groups:[...r].slice(0,t).map(a=>({baseModelName:a,models:s.get(a)}))}}function qh(i,e){return(i.reasoning_level_sort_order??0)-(e.reasoning_level_sort_order??0)||String(i.name).localeCompare(String(e.name))}function Wf(i,e){return!Number.isFinite(i)||!Number.isFinite(e)||e===0?null:(i-e)/Math.abs(e)*100}function ba(i,e){return String(i).trim()===""||!Number.isFinite(Number(i))?e:Math.min(4,Math.max(.25,Number(i)))}function tn(i,e=3){return Number.isFinite(i)?Number(i.toPrecision(e)).toString():"\u672A\u8BB0\u5F55"}function Xf(i,e,t){let n=[];return t.map(s=>{if(!s.visible||s.width>i||s.height>e)return{id:s.id,hidden:!0};let r=Math.max(0,Math.min(i-s.width,s.x));for(let a=0;a<=Math.ceil(e/(s.height+2))*2;a+=1){let o=Math.ceil(a/2)*(a%2?1:-1)*(s.height+2),l=Math.max(0,Math.min(e-s.height,s.y+o));if(!n.some(c=>r<c.right+2&&r+s.width+2>c.x&&l<c.bottom+2&&l+s.height+2>c.y))return n.push({x:r,y:l,right:r+s.width,bottom:l+s.height}),{id:s.id,hidden:!1,x:r,y:l}}return{id:s.id,hidden:!0}})}function qf(i){let e=i.axes,t=l=>{let c=l.labels.find(d=>d.isTitle);return c?Math.max(c.width,c.height)/Math.max(1,Math.hypot(l.projectedEnd.x-l.projectedStart.x,l.projectedEnd.y-l.projectedStart.y)):0},n=e.slice().sort((l,c)=>t(c)-t(l)),s=new Set(e.flatMap(l=>l.labels.filter(c=>c.isTitle).map(c=>c.id))),r=[n,e,e.slice().reverse(),[e[1],e[2],e[0]],[e[2],e[0],e[1]],[e[0],e[2],e[1]],[e[1],e[0],e[2]]],a=[],o=-1;for(let l of r){let c=Vy(i,l.filter(Boolean)),d=c.filter(p=>s.has(p.id)&&!p.hidden).length;if(d>o&&(a=c,o=d),d===s.size)return c}return a}function Vy({canvasWidth:i,canvasHeight:e,projectedCenter:t,axes:n},s){let r=[],a=[],o=(u,g)=>u.x*g.x+u.y*g.y,l=(u,g)=>({x:u.x-g.x,y:u.y-g.y}),c=(u,g)=>({x:u.x*g,y:u.y*g}),d=u=>({x:-u.y,y:u.x}),p=(u,g)=>u.directions.reduce((v,E,f)=>v+Math.abs(o(E,g))*u.halfSizes[f],0);for(let u of[!0,!1])for(let{projectedStart:g,projectedEnd:v,labels:E}of u?s:n){let f=l(v,g),m=Math.hypot(f.x,f.y),P=m?c(f,1/m):{x:1,y:0},L=d(P),S={x:(g.x+v.x)/2,y:(g.y+v.y)/2};o(L,l(S,t))<0&&(L=c(L,-1));let R=Math.atan2(f.y,f.x)*180/Math.PI;R>90&&(R-=180),R<-90&&(R+=180);for(let A of E.filter(I=>I.isTitle===u)){let I=A.isTitle?R:0,y={id:A.id,hidden:!0,rotationDegrees:I};if(a.push(y),A.projectedDepth<-1||A.projectedDepth>1||m<1)continue;let C=I*Math.PI/180,U=(Math.abs(Math.cos(C))*A.width+Math.abs(Math.sin(C))*A.height)/2,F=(Math.abs(Math.sin(C))*A.width+Math.abs(Math.cos(C))*A.height)/2,q=A.isTitle?P:{x:1,y:0},ie={directions:[q,d(q)],halfSizes:[A.width/2,A.height/2]},ee=o(l(A.anchor,g),f)/(m*m);for(let Y of A.isTitle?[48,24,-48,-24,0,40,-40,32,-32,16,-16,8,-8,36,-36,12,-12]:[16,-16,8,-8,0]){let K=A.isTitle?0:ee,J=A.isTitle?1:ee;for(let[te,xe,we]of[["x",i,U],["y",e,F]]){let Qe=Math.max(0,we+2-L[te]*Y),ht=Math.min(xe,xe-we-2-L[te]*Y),ze=f[te];if(Math.abs(ze)<1e-8)(g[te]<Qe||g[te]>ht)&&(J=-1);else{let re=(Qe-g[te])/ze,ye=(ht-g[te])/ze;K=Math.max(K,Math.min(re,ye)),J=Math.min(J,Math.max(re,ye))}Qe>ht&&(J=-1)}if(K>J)continue;let oe=[Math.max(K,Math.min(ee,J)),K,J,...Array.from({length:7},(te,xe)=>K+(J-K)*(xe+1)/8)];for(let te of A.isTitle?oe:[ee]){let xe={x:g.x+f.x*te+L.x*Y,y:g.y+f.y*te+L.y*Y};if(!r.some(we=>![...ie.directions,...we.directions].some(Qe=>Math.abs(o(l(xe,we.center),Qe))>=p(ie,Qe)+p(we,Qe)+2))){Object.assign(y,{hidden:!1,...xe}),r.push({...ie,center:xe});break}}if(!y.hidden)break}}}return a}function Yh(i){if(i.schema_version==="frontier_3d_visualization_dataset/v2")return i;if(!["frontier_3d_browser_projection/v1","frontier_3d_visualization_dataset/v3"].includes(i.schema_version))throw new Error("\u4E0D\u652F\u6301\u7684 Frontier 3D \u6570\u636E\u5951\u7EA6\u7248\u672C");let e=["name","model_uuid","creator","base_model_name","lineage_family_key","reasoning_level_label","reasoning_level_sort_order"],t=r=>{let a=r.model_index;if(!Number.isInteger(a)||a<0||a>=i.models.length)throw new Error(`model_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let{identity_resolution:o,...l}=i.models[a];return l},n=({model_index:r,analysis_eligibility_index:a,excluded_model_explanation_index:o,...l})=>{if(a!==void 0){if(!Number.isInteger(a)||a<0||a>=(i.analysis_eligibility_definitions?.length||0))throw new Error(`analysis_eligibility_index \u5F15\u7528\u8D8A\u754C\uFF1A${a}`);let c=i.analysis_eligibility_definitions[a];l.analysis_eligibility={...c},Array.isArray(c.ineligibility_reason_codes)&&(l.analysis_eligibility.ineligibility_reason_codes=[...c.ineligibility_reason_codes])}if(o!==void 0){if(!Number.isInteger(o)||o<0||o>=(i.excluded_model_explanation_definitions?.length||0))throw new Error(`excluded_model_explanation_index \u5F15\u7528\u8D8A\u754C\uFF1A${o}`);let c=i.excluded_model_explanation_definitions[o];Object.assign(l,c,{missing_dimension_names:[...c.missing_dimension_names]})}return l},s=Object.fromEntries(Object.entries(i.metric_variants).map(([r,a])=>[r,{...a,three_dimensional_scene:{...a.three_dimensional_scene,displayed_model_markers:a.three_dimensional_scene.displayed_model_markers.map(o=>{let l=t(o),c=i.organization_identity_metadata_by_creator_name?.[l.creator]||{};return{...Object.fromEntries(["creator_uuid","organization_identity_key","country_region_category"].filter(d=>d in c).map(d=>[d,c[d]])),...l,x:l.panel?.[a.interaction_relationships?.cost_axis_field],y:l.panel?.[a.interaction_relationships?.speed_axis_field],z:l.panel?.intelligence,...n(o),panel:{...l.panel,...o.panel}}})},excluded_models_with_drop_reason:(a.excluded_models_with_drop_reason||[]).map(o=>{let l=t(o);return{name:l.name,creator:l.creator,model_uuid:l.model_uuid,...Object.fromEntries(["base_model_name","tier","reasoning_level_label","reasoning_level_sort_order"].filter(c=>c in l).map(c=>[c,l[c]])),intelligence:l.panel?.intelligence,release_date:l.panel?.release_date==="?"?null:l.panel?.release_date,...n(o)}}),interaction_relationships:{...a.interaction_relationships,lineages:Object.fromEntries(Object.entries(a.interaction_relationships?.lineages||{}).map(([o,l])=>[o,l.map(c=>{let d=t(c);return{...Object.fromEntries(e.filter(p=>p in d).map(p=>[p,d[p]])),...n(c)}})]))}}]));return{...i,metric_variants:s}}var Yf={type:"change"},Zh={type:"start"},Zf={type:"end"},Vl=new Zi,$f=new Vn,Hy=Math.cos(70*as.DEG2RAD),Gt=new N,bn=2*Math.PI,It={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$h=1e-6,Hl=class extends aa{constructor(e,t=null){super(e,t),this.state=It.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:es.ROTATE,MIDDLE:es.DOLLY,RIGHT:es.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Rn,this._lastTargetPosition=new N,this._quat=new Rn().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ur,this._sphericalDelta=new ur,this._scale=1,this._panOffset=new N,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new N,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Wy.bind(this),this._onPointerDown=Gy.bind(this),this._onPointerUp=Xy.bind(this),this._onContextMenu=Ky.bind(this),this._onMouseWheel=$y.bind(this),this._onKeyDown=Zy.bind(this),this._onTouchStart=jy.bind(this),this._onTouchMove=Jy.bind(this),this._onMouseDown=qy.bind(this),this._onMouseMove=Yy.bind(this),this._interceptControlDown=Qy.bind(this),this._interceptControlUp=ev.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yf),this.update(),this.state=It.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===It.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=bn:n>Math.PI&&(n-=bn),s<-Math.PI?s+=bn:s>Math.PI&&(s-=bn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Gt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Vl.origin.copy(this.object.position),Vl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vl.direction))<Hy?this.object.lookAt(this.target):($f.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vl.intersectPlane($f,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$h||this._lastTargetPosition.distanceToSquared(this.target)>$h?(this.dispatchEvent(Yf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Gt.copy(s).sub(this.target);let r=Gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new We,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Gy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Wy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Xy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zf),this.state=It.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function qy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case es.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=It.DOLLY;break;case es.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}break;case es.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Zh)}function Yy(i){switch(this.state){case It.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case It.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case It.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function $y(i){this.enabled===!1||this.enableZoom===!1||this.state!==It.NONE||(i.preventDefault(),this.dispatchEvent(Zh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Zf))}function Zy(i){this.enabled!==!1&&this._handleKeyDown(i)}function jy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=It.TOUCH_ROTATE;break;case ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=It.TOUCH_PAN;break;default:this.state=It.NONE}break;case 2:switch(this.touches.TWO){case ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=It.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=It.TOUCH_DOLLY_ROTATE;break;default:this.state=It.NONE}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Zh)}function Jy(i){switch(this._trackPointer(i),this.state){case It.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case It.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case It.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case It.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=It.NONE}}function Ky(i){this.enabled!==!1&&i.preventDefault()}function Qy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ev(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}(function(){"use strict";let e=new Map,t=document.createElement("div");t.id="frontier-3d-runtime-diagnostic-banner",t.setAttribute("role","alert"),t.hidden=!0,document.body.append(t);function n(h,x){x?e.set(h,x):e.delete(h),t.textContent=[...e.values()].join("\uFF1B"),t.hidden=e.size===0}window.frontier3dRuntimeDiagnosticStatus=()=>Object.fromEntries(e),window.addEventListener("error",h=>n("window_error",`\u9875\u9762\u9519\u8BEF\uFF1A${String(h.message||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`)),window.addEventListener("unhandledrejection",h=>n("unhandled_rejection",`\u9875\u9762\u64CD\u4F5C\u5931\u8D25\uFF1A${String(h.reason?.message||h.reason||"\u672A\u77E5\u9519\u8BEF").slice(0,300)}`));let r=document.getElementById("frontier-3d-visualization-dataset-json");if(!r)throw new Error("Missing Frontier 3D visualization dataset");let a=Yh(JSON.parse(r.textContent)),o=a.metric_variants||{},l=a.organization_identity_metadata_by_creator_name||{},c=a.initial_variant_key;if(!o[c])throw new Error(`Missing initial metric variant: ${c}`);let d=document.getElementById(a.graph_div_id||"frontier3d"),p=document.getElementById("frontier-3d-plot-region"),u=document.getElementById("frontier-3d-report-shell"),g=document.getElementById("frontier-3d-toolbar"),v=document.getElementById("frontier-3d-side-panel");if(!d||!p||!u||!g||!v)throw new Error("Frontier 3D report document is incomplete");let E=document.getElementById("frontier-3d-report-header"),f=a.artificial_analysis_data_provenance||{},m=Number.isInteger(f.recent_release_frontier_distance_grace_period_months)?f.recent_release_frontier_distance_grace_period_months:null,P="https://artificialanalysis.ai/",L="\u5386\u53F2\u53E3\u5F84\uFF08\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u7684\u6210\u672C/\u5197\u957F\u5EA6\uFF09\uFF0C\u4E0D\u53C2\u4E0E\u672C\u53E3\u5F84\u524D\u6CBF\u8BA1\u7B97";function S(h){let x=document.querySelector(`meta[name="${h}"]`);return x&&x.getAttribute("content")||""}let R={rendererBundleSha256:S("frontier-3d-renderer-bundle-sha256")||"unknown",generatorGitCommit:S("frontier-3d-generator-git-commit")||"unknown",renderedAtUtc:S("frontier-3d-rendered-at-utc")||"unknown"};window.FRONTIER_3D_VISUALIZATION_DATASET=a;let A=new lr;A.background=new ft(16777215);let I=new $t(42,1,.01,100);I.up.set(0,0,1);let y;try{y=new Nl({antialias:!0,alpha:!1,preserveDrawingBuffer:!1})}catch{n("webgl_unavailable","\u65E0\u6CD5\u542F\u52A8\u4E09\u7EF4\u56FE\uFF1A\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WebGL\uFF0C\u6216\u56FE\u5F62\u8D44\u6E90\u4E0D\u8DB3\u3002\u8BF7\u542F\u7528\u6D4F\u89C8\u5668\u56FE\u5F62\u52A0\u901F\u540E\u91CD\u65B0\u52A0\u8F7D\u3002");return}let C=!1;y.domElement.addEventListener("webglcontextlost",h=>{h.preventDefault(),C=!0,ue=!1,zn(),n("webgl_context","\u4E09\u7EF4\u56FE\u7684\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u6B63\u5728\u7B49\u5F85\u6D4F\u89C8\u5668\u6062\u590D\u3002")}),y.domElement.addEventListener("webglcontextrestored",()=>{C=!1,ue=!1,Os(),n("webgl_context",null),Ut()}),y.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),y.outputColorSpace=Yt,y.domElement.setAttribute("data-frontier-threejs-canvas","true"),y.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 AI \u6A21\u578B\u4E09\u7EF4\u5E15\u7D2F\u6258\u524D\u6CBF"),d.replaceChildren(y.domElement);let U=new Hl(I,y.domElement);U.enableDamping=!1,U.screenSpacePanning=!0,U.zoomToCursor=!0,U.minDistance=2.4,U.maxDistance=14;let F=new sa,q=new We,ie=new Hn,ee=new Hn,Y=new Hn,K=new Hn;A.add(ie,ee,Y,K);let J,ne,oe,te=[],xe={},we={},Qe={},ht={},ze=[],re=[],ye=[],de=[],je={},Ze={},Fe=null,lt=null,et=null,pt=null,ot=null,ce=null,Ne=null,Oe=!1,He=!1,ct=m>0,Je,mt=0,B=0,Ot=[],at="wireframe",w=!1,_=!window.matchMedia("(max-width: 640px)").matches,k=null,$=null,G=null,fe=null,ge=new Set,H=new Set,Q=new Map;function pe(h){return h.model_uuid||`legacy:${JSON.stringify([h.creator,h.name])}`}Object.values(o).forEach(h=>{(h.three_dimensional_scene?.displayed_model_markers||[]).forEach(x=>{Q.set(pe(x),x)})});function Be(h){return H.has(pe(h))}function Te(){ge=new Set([...H].map(h=>Q.get(h)?.base_model_name).filter(Boolean))}function Ce(h){let x=[];for(let[M,T]of Q)T.base_model_name===h&&x.push(M);return x}function Ge(h){let x=Ce(h);return x.length>0&&x.every(M=>H.has(M))}function Xe(h,x){for(let[M,T]of Q)T.base_model_name===h&&(x?H.add(M):H.delete(M));return Te(),Ea(),ds(),Promise.resolve(!0)}let tt=new Set,D=ls.TREND_RESIDUAL,me={intelligence:1,cost:1,speed:1},ae={},ve=null,Re={},ue=!1,ke="frontier3d.marker-size-multiplier",Pe=Object.freeze({logo:22,backplate:29,countryRegion:38,paretoRing:38,pinnedRing:49,standoutHalo:52,standoutHaloMinimum:44,standoutHaloMaximum:64,missingStandoutHalo:48,prunedLineageAncestor:18}),Dt="frontier3d.pinned-comparison-fields";function Et(h,x){try{return JSON.parse(window.localStorage.getItem(h))??x}catch{return x}}function Mn(h,x){try{window.localStorage.setItem(h,JSON.stringify(x))}catch{}}let Sn=Et(ke,.5),Xn=Number.isFinite(Sn)?Math.min(1.5,Math.max(.5,Sn)):.5,Ma=["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"],vr=Et(Dt,[]),yi=new Set(Array.isArray(vr)?vr.filter(h=>Ma.includes(h)):[]),nn,Fi,ln,qt,Un=-1,qn=null,br=null,Oi=null,cs=document.createElement("div");cs.id="aa-pinned-model-name-labels",d.append(cs);let vi=document.createElement("div");vi.id="aa-lineage-overflow-direction-labels",d.append(vi);let Fn,On,Yn,$n,hs,Zn,b,z,j,X,Z,Ie=[],be,Ee,Me,Ue,Ye,nt,Ve,gt,vt,it=document.createElement("div");it.id="aa-threejs-model-tooltip",it.className="aa-threejs-model-tooltip",it.hidden=!0,p.appendChild(it);let yt=[],Bt=new WeakMap,Le=0,sn="";document.fonts?.ready.then(()=>{Bt=new WeakMap,Ut()});function _t(h,x,M){let T=document.createElement("div");if(T.className=M?"aa-threejs-axis-label":"aa-threejs-axis-tick-label",T.dataset.axisName=h,T.textContent=x,M){let O=h==="x"?"\u8D8A\u4F4E\u8D8A\u597D":"\u8D8A\u9AD8\u8D8A\u597D";T.dataset.directionHint=` ${h==="x"?"\u2193":"\u2191"} ${O}`,T.setAttribute("aria-label",`${x}\uFF0C${O}`)}return d.appendChild(T),T}function mn(){let h=d.clientWidth,x=d.clientHeight,M=`${h}:${x}:${window.innerWidth}:${window.innerHeight}`;M!==sn&&(Bt=new WeakMap,sn=M);let T=yt.flatMap(W=>W.labels).filter(({element:W})=>!Bt.has(W));for(let{element:W}of T)W.hidden=!1;for(let{element:W}of T)Bt.set(W,{width:W.offsetWidth,height:W.offsetHeight}),Le+=1;let O=W=>{let le=W.clone().project(I);return{x:(le.x+1)*h/2,y:(1-le.y)*x/2,depth:le.z}},V=new Map,se=yt.map(({start:W,end:le,labels:he},_e)=>({projectedStart:O(W),projectedEnd:O(le),labels:he.map(({element:Se,position:$e,isTitle:ut},Mt)=>{let Pt=`${_e}:${Mt}`;V.set(Pt,Se);let xn=O($e);return{id:Pt,isTitle:ut,anchor:xn,projectedDepth:xn.depth,...Bt.get(Se)}})}));for(let W of qf({canvasWidth:h,canvasHeight:x,projectedCenter:O(new N),axes:se})){let le=V.get(W.id);le.hidden=W.hidden,!W.hidden&&(le.style.transform=`translate(-50%, -50%) rotate(${W.rotationDegrees}deg)`,le.style.left=`${W.x}px`,le.style.top=`${W.y}px`)}}function Ut(){ue||C||(ue=!0,window.requestAnimationFrame(()=>{ue=!1,!C&&(y.render(A,I),mn(),Tu(),uu())}))}U.addEventListener("change",Ut);function En(h){for(;h.children.length;){let x=h.children.pop();x.userData.foregroundMaterial?.dispose(),!x.isSprite&&x.geometry&&x.geometry.dispose&&x.geometry.dispose(),x.material&&x.material.dispose&&!x.userData.sharedMaterial&&x.material.dispose()}}function Bi(h,x){return x.scale_type==="log"?Math.log10(Math.max(Number(h),Number.MIN_VALUE)):Number(h)}function bt(h,x){let M=x.fixed_range,T=Number(M[0]),O=Number(M[1]),V=Bi(h,x);return!Number.isFinite(V)||O===T?0:-1+2*(V-T)/(O-T)}function wt(h,x,M){let T=ne.three_dimensional_axis_configuration;return new N(bt(h,T.x_axis),bt(x,T.y_axis),bt(M,T.z_axis))}function wn(h){return wt(h.x,h.y,h.z).clampScalar(-1,1)}function Tt(h){let x=wt(h.x,h.y,h.z);return["\u6210\u672C","\u901F\u5EA6","\u667A\u80FD"].flatMap((M,T)=>{let O=x.getComponent(T);return O<-1?[`${M}\u4F4E\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2193`]:O>1?[`${M}\u9AD8\u4E8E\u7BB1\u4F53\u8303\u56F4 \u2191`]:[]}).join("\uFF1B")}function gn(h,x,M=1){let T=new jt;T.setAttribute("position",new zt(h.flatMap(V=>V.toArray()),3));let O=new cr({color:x,linewidth:M});return new Jr(T,O)}function jn(h,x,M,T=!1){let O=new xr;O.setPositions(h.flatMap(W=>W.toArray()));let V=new yr({color:x,linewidth:M,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,dashed:T});V.resolution.set(d.clientWidth,d.clientHeight);let se=new kl(O,V);return se.renderOrder=100,T&&se.computeLineDistances(),se}function Sa(){En(ie);let h=(se,W,le)=>new N(se,W,le),x=[[h(-1,-1,-1),h(1,-1,-1)],[h(-1,1,-1),h(1,1,-1)],[h(-1,-1,1),h(1,-1,1)],[h(-1,1,1),h(1,1,1)],[h(-1,-1,-1),h(-1,1,-1)],[h(1,-1,-1),h(1,1,-1)],[h(-1,-1,1),h(-1,1,1)],[h(1,-1,1),h(1,1,1)],[h(-1,-1,-1),h(-1,-1,1)],[h(1,-1,-1),h(1,-1,1)],[h(-1,1,-1),h(-1,1,1)],[h(1,1,-1),h(1,1,1)]];ie.add(gn(x.flat(),6583435)),yt.forEach(({labels:se})=>se.forEach(({element:W})=>W.remove())),yt.length=0;let M=ne.three_dimensional_axis_configuration,T=[],O=[];[["x",h(-1,1,-1),h(1,1,-1),h(0,.04,0)],["y",h(-1,-1,-1),h(-1,1,-1),h(-.04,0,0)],["z",h(-1,-1,-1),h(-1,-1,1),h(-.04,0,0)]].forEach(([se,W,le,he])=>{let _e=M[`${se}_axis`],Se=[{element:_t(se,_e.title_text,!0),position:W.clone().lerp(le,.5),isTitle:!0}];O.push(W,le),Vf(_e).forEach($e=>{let ut=bt($e,_e),Mt=W.clone().lerp(le,(ut+1)/2);O.push(Mt,Mt.clone().add(he));let Pt=_t(se,Math.abs($e)>=1e6||$e!==0&&Math.abs($e)<.001?$e.toExponential():String($e),!1);Pt.dataset.axisValue=String($e),Se.push({element:Pt,position:Mt,isTitle:!1}),se==="x"?T.push(h(ut,-1,-1),h(ut,1,-1)):se==="y"?T.push(h(-1,ut,-1),h(1,ut,-1)):T.push(h(-1,-1,ut),h(-1,1,ut),h(-1,1,ut),h(1,1,ut))}),yt.push({start:W,end:le,labels:Se})}),ie.add(gn(O,3359061));let V=gn(T,14212838);V.material.transparent=!0,V.material.opacity=.72,ie.add(V)}function Ps(h){return typeof h=="number"&&Number.isFinite(h)}function Gl(h,x,M){let T=h?h[x]:void 0;return Array.isArray(T)?T:(T!=null&&(M.nonFiniteValueCount+=1),[])}function jh(h,x){mt+=x.nonFiniteValueCount,B+=x.outOfRangeIndexCount,Ot.push(h),console.warn(`Frontier 3D \u5951\u7EA6\u51E0\u4F55 ${h} \u542B\u975E\u6709\u9650\u5750\u6807/\u7D22\u5F15\u6216\u7ED3\u6784\u4E0D\u4E00\u81F4\uFF0C\u5DF2\u8DF3\u8FC7\u7ED8\u5236`,x)}function Jh(h,x){let M={nonFiniteValueCount:0,outOfRangeIndexCount:0},T=["x_coordinates","y_coordinates","z_coordinates"].map(_e=>Gl(h,_e,M)),[O,V,se]=T,W=O.length===V.length&&O.length===se.length;if(T.forEach(_e=>_e.forEach(Se=>{Se!=null&&!Ps(Se)&&(M.nonFiniteValueCount+=1)})),!W||M.nonFiniteValueCount)return jh(x,M),[];let le=[],he=null;for(let _e=0;_e<O.length;_e+=1){let Se=[O[_e],V[_e],se[_e]];if(Se.some(ut=>ut==null)){he=null;continue}let $e=wt(...Se);he&&le.push(he,$e),he=$e}return le}function Kh(h,x,M){let T={nonFiniteValueCount:0,outOfRangeIndexCount:0},[O,V,se]=["x_coordinates","y_coordinates","z_coordinates"].map(At=>Gl(h,At,T)),W=["triangle_vertex_index_a","triangle_vertex_index_b","triangle_vertex_index_c"].map(At=>Gl(h,At,T)),le=O.length,he=W[0].length,_e=["x_coordinates","y_coordinates","z_coordinates"].every(At=>Array.isArray(h?.[At]));if([O,V,se].forEach(At=>At.forEach(Tn=>{Ps(Tn)||(T.nonFiniteValueCount+=1)})),W.forEach(At=>At.forEach(Tn=>{!Ps(Tn)||!Number.isInteger(Tn)?T.nonFiniteValueCount+=1:_e&&(Tn<0||Tn>=le)&&(T.outOfRangeIndexCount+=1)})),!(V.length===le&&se.length===le&&W.every(At=>At.length===he))||T.nonFiniteValueCount||T.outOfRangeIndexCount)return jh(M,T),null;if(!le||!he)return null;let $e=O.flatMap((At,Tn)=>wt(At,V[Tn],se[Tn]).toArray()),ut=[];for(let At=0;At<he;At+=1)ut.push(W[0][At],W[1][At],W[2][At]);let Mt=new jt;Mt.setAttribute("position",new zt($e,3)),Mt.setIndex(ut),Mt.computeVertexNormals();let Pt=new Ss({side:Gn,transparent:!0,depthTest:!0,depthWrite:!1,...x}),xn=new Jt(Mt,Pt);return xn.renderOrder=60,xn}function jf(){En(ee);let h=Jh(ne.pareto_frontier_wireframe_line_segments,"pareto_frontier_wireframe_line_segments");Fe=h.length?gn(h,2383002,2):null,Fe&&ee.add(Fe),lt=Kh(ne.pareto_frontier_surface_triangle_mesh,{color:3244733,opacity:.25},"pareto_frontier_surface_triangle_mesh"),lt&&ee.add(lt),et=Kh(ne.achievable_frontier_surface_triangle_mesh,{color:3253076,opacity:.2},"achievable_frontier_surface_triangle_mesh"),et&&ee.add(et);let x=ne.exact_achievable_frontier_boundary_line_segments,M=x?Jh(x,"exact_achievable_frontier_boundary_line_segments"):[];pt=M.length?gn(M,2193980,1):null,pt&&ee.add(pt),Kl()}function Jn(h){let x=document.createElement("canvas");x.width=128,x.height=128;let M=x.getContext("2d");h(M,x.width,x.height);let T=new Es(x);return T.colorSpace=Yt,T.needsUpdate=!0,T}function Wl(h,x,M,T,O,V){let se=Math.min(V,T/2,O/2);h.beginPath(),h.roundRect(x,M,T,O,se)}let Jf=Jn(h=>{Wl(h,8,8,112,112,24),h.fillStyle="rgba(255,255,255,0.96)",h.fill(),h.lineWidth=5,h.strokeStyle="rgba(71,85,105,0.45)",h.stroke()}),Kf=Jn(h=>{Wl(h,10,10,108,108,24),h.fillStyle="rgba(241,245,249,0.62)",h.fill(),h.setLineDash([14,9]),h.lineWidth=6,h.strokeStyle="rgba(71,85,105,0.9)",h.stroke()}),Qf=.42,ep=Jn(h=>{h.beginPath(),h.arc(64,64,53,0,Math.PI*2),h.lineWidth=10,h.strokeStyle="rgba(15,23,42,0.66)",h.stroke()}),tp=Jn(h=>{let x=h.createRadialGradient(64,64,32,64,64,63);x.addColorStop(0,"rgba(49,130,189,0)"),x.addColorStop(.65,"rgba(49,130,189,0.32)"),x.addColorStop(1,"rgba(49,130,189,0)"),h.fillStyle=x,h.fillRect(0,0,128,128)}),np=Jn(h=>{h.beginPath(),h.arc(64,64,54,0,Math.PI*2),h.setLineDash([8,8]),h.lineWidth=5,h.strokeStyle="rgba(71,85,105,0.8)",h.stroke()}),ip=Jn(h=>{h.beginPath(),h.arc(64,64,54,0,Math.PI*2),h.lineWidth=12,h.strokeStyle="rgba(234,179,8,0.98)",h.stroke()}),sp=Jn(h=>{h.beginPath(),h.arc(64,64,42,0,Math.PI*2),h.fillStyle="rgba(100,116,139,0.96)",h.fill(),h.lineWidth=8,h.strokeStyle="rgba(255,255,255,0.98)",h.stroke()}),rp={china:Jn(h=>{h.beginPath(),h.arc(64,64,52,0,Math.PI*2),h.lineWidth=8,h.strokeStyle="#dc2626",h.stroke(),h.beginPath(),h.arc(64,64,42,0,Math.PI*2),h.lineWidth=4,h.strokeStyle="#dc2626",h.stroke()}),united_states:Jn(h=>{Wl(h,12,12,104,104,25),h.lineWidth=10,h.strokeStyle="#2563eb",h.stroke()}),other:Jn(h=>{h.save(),h.translate(64,64),h.rotate(Math.PI/4),h.strokeStyle="#4b5563",h.lineWidth=9,h.strokeRect(-39,-39,78,78),h.restore()}),unclassified:Jn(h=>{h.save(),h.translate(64,64),h.rotate(Math.PI/4),h.strokeStyle="#9ca3af",h.setLineDash([10,8]),h.lineWidth=9,h.strokeRect(-39,-39,78,78),h.restore()})};function bi(h,{depthWrite:x=!1}={}){return new bs({map:h,transparent:!0,depthTest:!0,depthWrite:x,alphaTest:.02,sizeAttenuation:!1})}let Xl=bi(Jf,{depthWrite:!0}),ql=bi(Kf,{depthWrite:!0}),Qh=bi(ep),eu=bi(ip),Yl=bi(tp),tu=bi(np),$l=bi(sp);$l.depthTest=!1;let Zl=Object.fromEntries(Object.entries(rp).map(([h,x])=>[h,bi(x)]));[Xl,ql,Qh,Yl,tu,eu,$l,...Object.values(Zl)].forEach(h=>{h.userData={sharedMaterial:!0}});function Ls(h,x,M,T){let O=new Ms(h);return O.position.copy(x),Mr(O,M),O.renderOrder=T,O.userData.sharedMaterial=!0,Y.add(O),O}function Mr(h,x){h.userData.cssPixelSize=x;let M=x*Xn*2*Math.tan(as.degToRad(I.fov/2))/Math.max(1,d.clientHeight);h.scale.set(M,M,1)}function nu(h){if(!Number.isFinite(Number(h)))return!1;Xn=Math.min(1.5,Math.max(.5,Number(h))),nn&&(nn.value=String(Xn)),Fi&&(Fi.textContent=`${tn(Xn)}\xD7`);for(let x of[Y,K])x.children.filter(M=>M.isSprite).forEach(M=>Mr(M,M.userData.cssPixelSize));return Mn(ke,Xn),Ut(),!0}function iu(h){return!tt.has(h)}function _n(h){return h?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant!==!1}function jl(h){return h?.analysis_eligibility?.ineligibility_reason_text||L}function Ft(h){let x=te[h],M=ze[h];return!x||!M||M.hasNonFiniteContractCoordinate?!1:Jl(h).length===0}function Jl(h){let x=te[h];if(!x)return[];let M=[];return iu(x.creator)||M.push("\u5382\u5546\u7B5B\u9009"),He&&!_n(x)&&M.push("\u4EC5\u5F53\u671F\u53EF\u6BD4"),!ct&&x.displayed_only_because_of_recent_release_grace_period===!0&&M.push("\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u5DF2\u5173\u95ED"),ze[h]?.hasNonFiniteContractCoordinate&&M.push("\u5750\u6807\u65E0\u6548"),M}let su={};function ap(h,x){let M=su[h];return M||(M=x.clone(),M.opacity=Qf,M.userData={sharedMaterial:!0},su[h]=M),M}function op(h,x){let M=document.createElement("canvas");M.width=256,M.height=256;let T=M.getContext("2d"),O=new Es(M);O.colorSpace=Yt;let V=bi(O);V.userData={sharedMaterial:!0},Ze[h]="loading";let se=new Image;return se.onload=()=>{let W=Math.max(1,se.naturalWidth),le=Math.max(1,se.naturalHeight),he=Math.min(224/W,224/le),_e=W*he,Se=le*he;T.clearRect(0,0,M.width,M.height),T.drawImage(se,(M.width-_e)/2,(M.height-Se)/2,_e,Se),O.needsUpdate=!0,Ze[h]="loaded",Ut()},se.onerror=()=>{Ze[h]="failed",console.error(`Unable to decode organization brand asset: ${h}`)},se.src=x.logo_visualization_data_url,V}function lp(){En(Y),ze=[],re=[],ye=[],te.forEach((h,x)=>{let M=[h.x,h.y,h.z].filter(Mt=>!Ps(Mt)).length;mt+=M;let T=M?new N:wt(h.x,h.y,h.z),O=l[h.creator],V=_n(h),se=Ls(V?Xl:ql,T,Pe.backplate,30),W=O.country_region_category,le=Ls(Zl[W]||Zl.unclassified,T,Pe.countryRegion,20);le.visible=Oe;let he=je[h.creator];he||(he=op(h.creator,O),je[h.creator]=he);let _e=Ls(V?he:ap(h.creator,he),T,Pe.logo,40);[se,_e].forEach(Mt=>{Mt.userData.modelIndex=x,Mt.userData.interactionTargetKind="displayed_model"}),re.push(_e),ye.push(se,_e);let Se=Ls(Qh,T,Pe.paretoRing,45);Se.visible=h.panel.layer===1;let $e=Ls(Yl,T,Pe.standoutHalo,15);$e.visible=h.panel.layer===1;let ut=Ls(eu,T,Pe.pinnedRing,50);ut.visible=!1,ze.push({creatorName:h.creator,isAnalysisEligible:V,hasNonFiniteContractCoordinate:M>0,logoSprite:_e,backplateSprite:se,countryRegionSprite:le,paretoRingSprite:Se,standoutHaloSprite:$e,pinnedRingSprite:ut})}),Sr(),Ea(),us()}function Sr(){ec();let h=de.find(x=>x.userData.prunedLineageAncestorNode.name===$)?.userData.prunedLineageAncestorNode;(k!==null&&!Ft(k)||h&&!Er(h))&&zn(),ze.forEach((x,M)=>{let T=te[M],O=Ft(M);x.logoSprite.visible=O,x.backplateSprite.visible=O,x.countryRegionSprite.visible=O&&Oe,x.paretoRingSprite.visible=O&&T.panel?.layer===1,x.standoutHaloSprite.visible=O&&T.panel?.layer===1,x.pinnedRingSprite.visible=O&&Be(T)}),Iu(),bu(),Ca(),wr(),ds(),ac(),Cu(),nt&&us(),Ut()}function ru(h){return He=!!h,$n&&($n.checked=He),Sr(),Promise.resolve(He)}function au(h){return ct=m>0&&!!h,Je&&(Je.checked=ct),Sr(),Promise.resolve(ct)}function ou(h){Oe=!!h,Yn&&(Yn.checked=Oe);let x=document.getElementById("aa-country-region-legend");return x&&(x.hidden=!Oe),Oe&&be&&(be.open=!0),Sr(),Promise.resolve(Oe)}function Kl(){Fe&&(Fe.visible=!w&&at==="wireframe"),lt&&(lt.visible=!w&&at==="solid"),et&&(et.visible=w),pt&&(pt.visible=w),Ie.forEach(h=>{h.disabled=w}),Ca(),j&&(j.textContent=w?"\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u672C\u53E3\u5F84\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684 Pareto \u70B9\uFF0C\u8868\u793A\u6700\u9AD8\u53EF\u8FBE\u667A\u80FD\uFF1B\u4E0D\u53EF\u8FBE\u533A\u7559\u767D\u3002":"\u76F8\u90BB Pareto \u70B9\u7684 Delaunay \u63D2\u503C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\uFF1B\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002",yu()),Ut()}function lu(h){return["wireframe","solid","hidden"].includes(h)?(at=h,Ie.forEach(x=>{x.setAttribute("aria-pressed",x.dataset.frontierStyle===at?"true":"false")}),Kl(),Promise.resolve(!0)):Promise.resolve(!1)}function cu(h){return h&&ne.achievable_frontier_geometry_kind!=="exact_budget_steps"?Promise.resolve(!1):(w=!!h,z&&(z.checked=w),Kl(),Promise.resolve(w))}function cp(){let h=ne.initial_camera_configuration,x=h.eye,M=h.center;I.position.set(x.x*2.2,x.y*2.2,x.z*2.2),U.target.set(M.x,M.y,M.z),U.update()}function Er(h){let x=h.creator||h.lineage_family_key?.split("||")[0];if(x&&!iu(x)||He&&!_n(h))return!1;if(!h.kept)return!0;let M=te.findIndex(T=>h.model_uuid?T.model_uuid===h.model_uuid:T.name===h.name);return M>=0&&Ft(M)}function hu(){ze.forEach((h,x)=>{let M=Ft(x)&&(Be(te[x])||k===x);for(let T of[h.logoSprite,h.backplateSprite,h.countryRegionSprite,h.paretoRingSprite,h.pinnedRingSprite,h.standoutHaloSprite])T&&(T.userData.normalMaterial||(T.userData.normalMaterial=T.material,T.userData.normalRenderOrder=T.renderOrder),M&&!T.userData.foregroundMaterial&&(T.userData.foregroundMaterial=T.userData.normalMaterial.clone(),T.userData.foregroundMaterial.depthTest=!1,T.userData.foregroundMaterial.depthWrite=!1),T.material=M?T.userData.foregroundMaterial:T.userData.normalMaterial,T.renderOrder=M?91+T.userData.normalRenderOrder/10:T.userData.normalRenderOrder)}),Fe&&(Fe.material.opacity=k!==null||$!==null?.25:.9)}function wr(){En(K),de=[],ot=null,ce=null,Ne=null;let h=new Set(te.filter((W,le)=>Be(W)&&Ft(le)).map(W=>W.lineage_key).filter(Boolean));G&&h.add(G);let x=[],M=new Set;function T(W,le,he="previous_generation"){let _e=pe(W);if(W.kept||M.has(_e)||!Er(W))return;M.add(_e);let Se=new Ms($l);Se.position.copy(wn(W)),Mr(Se,Pe.prunedLineageAncestor),Se.renderOrder=90,Se.userData={sharedMaterial:!0,interactionTargetKind:"pruned_lineage_ancestor",lineageKey:le,cssPixelSize:Pe.prunedLineageAncestor,prunedLineageAncestorNode:{...W,relationship_kind:he}},K.add(Se),de.push(Se)}h.forEach(W=>{let le=Qe[W]||[];le.forEach(he=>T(he,W));for(let he=1;he<le.length;he+=1){let _e=le[he-1],Se=le[he];!Er(_e)||!Er(Se)||x.push(wn(_e),wn(Se))}}),x.length&&(ot=jn(x,4674921,3),K.add(ot));let O=k===null?null:te[k];if(O?.lineage_family_key&&!Qe[O.lineage_key]){let le=Object.entries(Qe).flatMap(([he,_e])=>_e.map(Se=>({key:he,node:Se}))).filter(({node:he})=>he.lineage_family_key===O.lineage_family_key&&he.base_model_name===O.base_model_name&&Er(he)).sort((he,_e)=>_e.node.reasoning_level_sort_order-he.node.reasoning_level_sort_order)[0];le&&(Ne=jn([wt(O.x,O.y,O.z),wn(le.node)],4674921,3,!0),K.add(Ne),T(le.node,le.key,"same_generation_reasoning_variant"))}let V=new Set(te.filter((W,le)=>Be(W)&&Ft(le)).map(W=>W.base_model_name));fe&&V.add(fe);let se=[];V.forEach(W=>{let le=we[W]||xe[W]||[];for(let he=1;he<le.length;he+=1)if(!(!Ft(le[he-1])||!Ft(le[he])))for(let _e of[le[he-1],le[he]]){let Se=te[_e];se.push(wt(Se.x,Se.y,Se.z))}}),se.length&&(ce=jn(se,11024042,3.5),K.add(ce)),hu(),hp(),Ut()}function hp(){vi.replaceChildren(...de.flatMap((h,x)=>{let M=Tt(h.userData.prunedLineageAncestorNode);if(!M)return[];let T=De("span","aa-lineage-overflow-direction-label",M);return T.dataset.ancestorIndex=String(x),[T]})),uu()}function uu(){for(let h of vi.children){let x=de[Number(h.dataset.ancestorIndex)];if(!x){h.hidden=!0;continue}let M=x.position.clone().project(I);h.hidden=Math.abs(M.z)>1||Math.abs(M.x)>1||Math.abs(M.y)>1,h.style.left=`${Math.max(0,Math.min(d.clientWidth-h.offsetWidth,(M.x+1)*d.clientWidth/2+10))}px`,h.style.top=`${Math.max(0,Math.min(d.clientHeight-h.offsetHeight,(1-M.y)*d.clientHeight/2+10))}px`}}function Ql(){return oe.cost_axis_unit||a.cost_metric_definitions?.[c.split("__")[0]]?.unit||"USD"}function up(h){let x=h.panel||{},M=_n(h),T=(V,se)=>`<section class="aa-tooltip-section"><b>${V}</b><br>${se.join("<br>")}</section>`,O=[["cost_to_run","\u6709\u6548\u8FD0\u884C\u6210\u672C","USD"],["blended_price_cache_input_output_7_to_2_to_1","7:2:1 \u6DF7\u5408\u5355\u4EF7","USD/M tokens"],["eff_speed","\u6709\u6548\u901F\u5EA6","tok/s"],["output_speed","\u539F\u59CB\u901F\u5EA6","tok/s"]].filter(([V])=>![oe.cost_axis_field,oe.speed_axis_field].includes(V));return T("\u6A21\u578B\u8EAB\u4EFD",[`<strong>${cn(h.name)}</strong>`,`${cn(h.creator)} \xB7 ${cn(h.reasoning_level_label||h.tier||"\u6863\u4F4D\u672A\u8BB0\u5F55")}`,`\u53D1\u5E03\uFF1A${cn(x.release_date||"\u672A\u8BB0\u5F55")}`])+T("\u5750\u6807\u4E0E\u5907\u7528\u53E3\u5F84",[`\u667A\u80FD\u6307\u6570\uFF1A${tn(x.intelligence)}`,`${cn(oe.speed_axis_label)}\uFF1A${tn(x[oe.speed_axis_field])} tok/s`,`${cn(oe.cost_axis_label)}\uFF1A${tn(x[oe.cost_axis_field])} ${cn(Ql())}`,...O.map(([V,se,W])=>`${se}\uFF1A${tn(x[V])} ${W}`),`\u5197\u957F\u5EA6\uFF1A${tn(x.output_mtokens)} M tokens`])+T("\u524D\u6CBF\u4E0E\u7A81\u51FA\u5EA6",[M?`\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A${tn(x.layer)}`:"\u5E15\u7D2F\u6258\u5C42\u7EA7\uFF1A\u4E0D\u53C2\u4E0E\uFF08\u5386\u53F2\u53E3\u5F84\uFF09",`${cn(li[D].label)}\uFF1A${nc(mu(h))}`,`\u7A81\u51FA\u5EA6\u540D\u6B21\uFF1A${Re[h.name]?`${Re[h.name]} / ${Si().length}`:"\u672A\u53C2\u4E0E\u524D\u6CBF\u6392\u884C"}`,...M?[]:[cn(jl(h))]])}function dp(h){let x=Tt(h);return[`<strong>${cn(h.name)}</strong>`,h.relationship_kind==="same_generation_reasoning_variant"?"\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A":"\u8C31\u7CFB\u524D\u8EAB \xB7 \u5DF2\u4ECE\u4E3B\u6563\u70B9\u88C1\u526A",`\u53D1\u5E03\uFF1A${cn(h.release_date)}`,`\u667A\u80FD\u6307\u6570\uFF1A${tn(h.intelligence)}`,`${cn(oe.speed_axis_label)}\uFF1A${tn(h.y)} tok/s`,`${cn(oe.cost_axis_label)}\uFF1A${tn(h.x)} ${cn(Ql())}`,...x?[`\u7BB1\u58C1\u5939\u7D27\uFF1A${cn(x)}\uFF1B\u4EE5\u4E0A\u6570\u503C\u4FDD\u7559\u539F\u503C\u3002`]:[]].join("<br>")}function cn(h){let x=document.createElement("span");return x.textContent=String(h),x.innerHTML}function tv(h,x=1){return h==null||!Number.isFinite(Number(h))?"?":Number(h).toFixed(x)}function Tr(h,x){if(h===k&&$===null){x&&!it.hidden&&Ds(x);return}if(k=h,$=null,h===null){G=null,fe=null,it.hidden=!0,wr();return}let M=te[h];G=M.lineage_key,fe=M.base_model_name,it.innerHTML=up(M),it.hidden=!1,Ds(x||{clientX:p.getBoundingClientRect().left,clientY:p.getBoundingClientRect().top}),wr()}function fp(h,x,M){if($===x.name&&G===h){M&&!it.hidden&&Ds(M);return}k=null,$=x.name,G=h,fe=null,it.innerHTML=dp(x),it.hidden=!1,Ds(M||{clientX:p.getBoundingClientRect().left,clientY:p.getBoundingClientRect().top}),wr()}function Ds(h){Oi={clientX:h.clientX,clientY:h.clientY};let x=p.getBoundingClientRect();it.style.maxHeight=`${Math.max(0,x.height-16)}px`;let M=it.getBoundingClientRect(),T=Math.min(h.clientX-x.left+14,x.width-M.width-8),O=Math.min(h.clientY-x.top+14,x.height-M.height-8);it.style.left=`${Math.max(8,T)}px`,it.style.top=`${Math.max(8,O)}px`}function pp(h,x){if(qn=null,pu(h,x,!1),!h)return;qn=h.interactionTargetKind==="displayed_model"?te[h.modelIndex]:h.prunedLineageAncestorNode,it.classList.add("is-touch-details"),it.setAttribute("role","dialog"),it.setAttribute("aria-label","\u6A21\u578B\u8BE6\u60C5");let M=De("div","aa-touch-details-actions");if(h.interactionTargetKind==="displayed_model"){let O=()=>Ge(qn.base_model_name)?"\u53D6\u6D88\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D":"\u56FA\u5B9A\u5168\u90E8\u6863\u4F4D",V=De("button","aa-secondary-button",O());V.type="button",V.addEventListener("click",()=>{wa(qn.base_model_name),V.textContent=O()}),M.append(V)}let T=De("button","aa-secondary-button","\u5173\u95ED\u8BE6\u60C5");T.type="button",T.addEventListener("click",zn),M.append(T),it.append(M),Ds(x)}function du(){return[...ye,...de].filter(h=>h.visible)}function Ar(h,x){let M=y.domElement.getBoundingClientRect();q.x=(h-M.left)/M.width*2-1,q.y=-((x-M.top)/M.height)*2+1,F.setFromCamera(q,I);let T=F.intersectObjects(du(),!1),O=T.filter(V=>!V.object.material.depthTest);return O.sort((V,se)=>se.object.renderOrder-V.object.renderOrder||V.distance-se.distance),(O[0]||T[0])?.object.userData||null}function fu(h){return Ar(h.clientX,h.clientY)}let mp=400,gp=25,ci=null,Ns=null,Cr=!1,Mi=null,Bn=null,Us=null,Fs=!1;function ec(){Us!==null&&window.clearTimeout(Us),Us=null}function zn(){qn=null,it.classList.remove("is-touch-details"),it.removeAttribute("role"),ec(),Bn!==null&&window.cancelAnimationFrame(Bn),Bn=null,Tr(null)}function pu(h,x,M=!0){if(!h){if(M&&(k!==null||$!==null)){Us===null&&(Us=window.setTimeout(()=>{Us=null,Tr(null)},mp));return}zn();return}ec(),h.interactionTargetKind==="displayed_model"?Tr(h.modelIndex,x):fp(h.lineageKey,h.prunedLineageAncestorNode,x)}function tc(h=!1){if(qn||Fs||!Mi||y.getContext().isContextLost())return;let{clientX:x,clientY:M}=Mi,T=y.domElement.getBoundingClientRect();x<T.left||x>T.right||M<T.top||M>T.bottom||pu(Ar(x,M),Mi,h)}U.addEventListener("start",()=>{Fs=!0,ci||zn()}),U.addEventListener("end",()=>{Fs=!1,Bn!==null&&window.cancelAnimationFrame(Bn),Bn=window.requestAnimationFrame(()=>{Bn=null,tc()})}),U.addEventListener("change",()=>{zn(),Fs||(Bn=window.requestAnimationFrame(()=>{Bn=null,tc()}))}),y.domElement.addEventListener("pointerdown",h=>{if(h.button!==0)return;br=h.pointerType;let x=fu(h);ci={pointerId:h.pointerId,pointerType:h.pointerType,clientX:h.clientX,clientY:h.clientY,interactionTargetForDetails:x,displayedModelForClickPinToggle:x?.interactionTargetKind==="displayed_model"?te[x.modelIndex]:null},Ns=null,Mi={clientX:h.clientX,clientY:h.clientY},Cr=!1},{capture:!0}),y.domElement.addEventListener("pointermove",h=>{ci?.pointerId===h.pointerId&&(h.clientX-ci.clientX)**2+(h.clientY-ci.clientY)**2>=gp&&(Cr=!0,zn()),h.pointerType!=="touch"&&(Mi={clientX:h.clientX,clientY:h.clientY},!(Fs||Bn!==null)&&(Bn=window.requestAnimationFrame(()=>{Bn=null,tc(!0)})))});function _p(h){ci?.pointerId===h.pointerId&&(Ns=ci,ci=null,h.pointerType==="touch"&&!Cr&&(Mi=null,pp(Ns.interactionTargetForDetails,h)))}y.domElement.addEventListener("pointerup",_p),y.domElement.addEventListener("pointercancel",h=>{ci?.pointerId===h.pointerId&&(ci=null),Ns=null,Mi=null,zn()}),y.domElement.addEventListener("pointerleave",h=>{qn||(Mi=null,zn())}),y.domElement.addEventListener("click",h=>{let x=Ns;if(Ns=null,br==="touch"||x?.pointerType==="touch"||h.pointerType==="touch")return;if(Cr){Cr=!1;return}let M=x?null:fu(h),T=x?x.displayedModelForClickPinToggle:M?.interactionTargetKind==="displayed_model"?te[M.modelIndex]:null;T&&wa(T.base_model_name)});function Ea(){ze.forEach((h,x)=>{let M=te[x];h.pinnedRingSprite.visible=Ft(x)&&Be(M)}),wr(),ac(),wu(),Ut()}function wa(h){return Xe(h,!Ge(h))}function xp(h,x=!0){x?H.add(pe(h)):H.delete(pe(h)),Te(),Ea(),ds()}function yp(h){let x=li[D]?.modelMetricFieldName,M=h?.standout_metrics?.[x];return typeof M=="number"&&Number.isFinite(M)?M:NaN}function mu(h){return!h||!_n(h)?NaN:Object.prototype.hasOwnProperty.call(ae,h.name)?ae[h.name]:yp(h)}function nc(h){return D===ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME?Number.isFinite(h)&&ve>0?`${tn(h/ve*100)}%`:"\u672A\u8BB0\u5F55":tn(h)}function Si(){return te.filter(h=>h.panel?.layer===1&&[h.x,h.y,h.z].every(Ps))}function us(){let h=Si(),x=D===ls.WEIGHTED_EXCLUSIVE_HYPERVOLUME?va(h,me):null;ve=x?.completeFrontierHypervolume??null;let M=x?.contributions||Df(h,D,me),T=M.filter(Number.isFinite);ae={},h.forEach((O,V)=>{let se=M[V];ae[O.name]=se;let W=ze[ht[O.name]];if(!W)return;let le=Number.isFinite(se),he=le&&T.length>1?(T.filter(ut=>ut<se).length+(T.filter(ut=>ut===se).length-1)/2)/(T.length-1):.5,_e=W.standoutHaloSprite,Se=le?Yl:tu;_e.userData.foregroundMaterial?.dispose(),_e.userData.foregroundMaterial=null,_e.userData.normalMaterial=Se,_e.userData.normalRenderOrder=15,_e.material=Se;let $e=Pe;Mr(_e,le?$e.standoutHaloMinimum+he*($e.standoutHaloMaximum-$e.standoutHaloMinimum):$e.missingStandoutHalo)}),Re={},h.map((O,V)=>({model:O,value:M[V]})).filter(O=>Number.isFinite(O.value)).sort((O,V)=>V.value-O.value).forEach((O,V)=>{Re[O.model.name]=V+1}),hu(),vp(h,M),oc(),Ut()}function vp(h,x){if(!nt)return;let M=h.map((T,O)=>({model:T,value:x[O]})).sort((T,O)=>{let V=Number.isFinite(T.value)?T.value:-1/0;return(Number.isFinite(O.value)?O.value:-1/0)-V}).slice(0,12);nt.replaceChildren(...M.map((T,O)=>{let V=document.createElement("button");V.type="button",V.className="aa-ranking-row",V.addEventListener("click",()=>xp(T.model)),V.setAttribute("aria-label",`\u56FA\u5B9A ${T.model.name}`);let se=ht[T.model.name];Ft(se)||(V.classList.add("is-hidden-by-current-filter"),V.title="\u5DF2\u88AB\u5F53\u524D\u7B5B\u9009\u9690\u85CF\uFF0C\u540D\u6B21\u4ECD\u6309\u5168\u96C6\u8BA1\u7B97");let W=document.createElement("span");W.className="aa-truncate",W.textContent=`${O+1}. ${T.model.name}`;let le=document.createElement("b");return le.className="aa-ranking-value",le.textContent=nc(T.value),le.title=ve===null?`\u539F\u59CB\u503C\uFF1A${T.value}`:`\u6392\u4ED6\u8D21\u732E ${T.value} \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF ${ve}`,V.append(W,le),V}))}function gu(h){return li[h]?(D=h,Ye&&(Ye.value=h),lc(),us(),window.dispatchEvent(new Event("frontier-3d-view-updated")),Promise.resolve(!0)):Promise.resolve(!1)}function _u(h,x,M){me={intelligence:ba(h,me.intelligence),cost:ba(x,me.cost),speed:ba(M,me.speed)},Ve&&Object.entries(me).forEach(([T,O])=>{let V=Ve[T];V.slider.value=String(Math.log2(O)),V.number.value=O.toFixed(2)}),us(),window.dispatchEvent(new Event("frontier-3d-view-updated"))}function ic(h,x){let M=o[h];if(!M)return!1;Mi=null,zn();let T=I.position.clone(),O=I.quaternion.clone(),V=U.target.clone();return c=h,J=M,ne=J.three_dimensional_scene,oe=J.interaction_relationships,mt=0,B=0,Ot=[],te=ne.displayed_model_markers||[],xe=oe.base_groups||{},we=oe.reasoning_variant_group_model_indices_by_base_model_name||{},Qe=bp(oe.lineages||{}),ht={},te.forEach((se,W)=>{ht[se.name]=W}),window.FRONTIER_3D_INTERACTION_RELATIONSHIPS={models:te,base_groups:xe,reasoning_variant_group_model_indices_by_base_model_name:we,lineages:Qe,cost_axis_field:oe.cost_axis_field,speed_axis_field:oe.speed_axis_field},te.forEach(se=>Q.set(pe(se),se)),Te(),Sa(),jf(),lp(),Tr(null),x?(I.position.copy(T),I.quaternion.copy(O),U.target.copy(V),U.update()):cp(),Cu(),Iu(),Ca(),Ip(),ac(),ds(),us(),Ut(),window.dispatchEvent(new Event("frontier-3d-view-updated")),!0}function bp(h){let x={};return Object.entries(h).forEach(([M,T])=>{let O=(Array.isArray(T)?T:[]).filter(V=>{if(!V?.lineage_family_key||!V?.reasoning_level_label)return!1;let se=[V?.x,V?.y,V?.z].filter(W=>!Ps(W)).length;return mt+=se,se===0});O.length>=2&&(x[M]=O)}),x}function Ta(h,x){let M=`${h}__${x}`;if(M===c)return Promise.resolve(!1);let T=ic(M,!0);return T&&(Fn.value=h,On.value=x),Promise.resolve(T)}function Aa(h){let x=document.createElement("div");x.className="aa-toolbar-group";let M=document.createElement("span");return M.className="aa-toolbar-group-label",M.textContent=h,x.appendChild(M),x}function xu(h,x){let M=document.createElement("label");M.className="aa-toolbar-field";let T=document.createElement("span");return T.className="aa-toolbar-field-label",T.textContent=h,M.append(T,x),M}function Mp(){let h=Aa("\u5750\u6807\u8F74\u53E3\u5F84");h.id="aa-metric-controls",Fn=document.createElement("select"),Fn.id="aa-cost-metric-select",Object.entries(a.cost_metric_definitions).forEach(([V,se])=>{let W=document.createElement("option");W.value=V,W.textContent=se.label,Fn.appendChild(W)}),On=document.createElement("select"),On.id="aa-speed-metric-select",Object.entries(a.speed_metric_definitions).forEach(([V,se])=>{let W=document.createElement("option");W.value=V,W.textContent=se.label,On.appendChild(W)});let[x,M]=c.split("__");Fn.value=x,On.value=M,Fn.addEventListener("change",()=>Ta(Fn.value,On.value)),On.addEventListener("change",()=>Ta(Fn.value,On.value)),h.append(xu("\u6210\u672C",Fn),xu("\u901F\u5EA6",On));let T=De("button","aa-secondary-button","\u53E3\u5F84\u8BF4\u660E");T.id="aa-metric-explanation-button",T.type="button",T.addEventListener("click",()=>Rr(!0));let O=De("button","aa-secondary-button","\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2");return O.id="aa-orthogonal-decomposition-preset",O.type="button",O.title="\u5207\u6362\u81F3 7:2:1 \u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u4FDD\u6301\u76F8\u673A",O.addEventListener("click",()=>Ta("blended","raw")),h.append(T,O),h}function Sp(){let h=Aa("\u6A21\u578B\u6807\u8BC6");h.id="aa-model-identity-controls";let x=document.createElement("span");x.className="aa-model-identity-logo-status",x.textContent="\u5382\u5546 Logo";let M=document.createElement("label");M.className="aa-toggle-row",Yn=document.createElement("input"),Yn.id="aa-country-region-marker-toggle",Yn.type="checkbox",Yn.checked=Oe,Yn.addEventListener("change",()=>ou(Yn.checked)),M.append(Yn,document.createTextNode("\u663E\u793A\u56FD\u522B\u5916\u6846"));let T=document.createElement("label");T.className="aa-toggle-row",T.title="\u9690\u85CF\u672C\u53E3\u5F84\u4E0B\u7528\u5230\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\u6210\u672C\u6216\u5197\u957F\u5EA6\u7684\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF08\u865A\u7EBF\u5E95\u677F\uFF09\uFF1B\u9690\u85CF\u540E\u5B83\u4EEC\u4E5F\u4E0D\u53EF\u60AC\u505C\u6216\u70B9\u9009",$n=document.createElement("input"),$n.id="aa-show-only-current-intelligence-index-version-comparable-models-toggle",$n.type="checkbox",$n.checked=He,$n.addEventListener("change",()=>ru($n.checked)),T.append($n,document.createTextNode("\u4EC5\u5F53\u671F\u53EF\u6BD4"));let O=document.createElement("label");O.className="aa-toggle-row",O.title="\u4EC5\u63A7\u5236\u53EA\u56E0\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\u624D\u4FDD\u7559\u7684\u70B9\uFF1B\u4E0D\u91CD\u7B97\u5206\u6790\u3001\u5750\u6807\u8303\u56F4\u6216\u76F8\u673A",Je=document.createElement("input"),Je.id="aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle",Je.type="checkbox",Je.checked=ct,Je.disabled=!(m>0),Je.addEventListener("change",()=>au(Je.checked));let V=m===null?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":m===0?"\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650\uFF1A\u751F\u6210\u65F6\u5DF2\u5173\u95ED":`\u663E\u793A\u8FD1 ${m} \u4E2A\u6708\u53D1\u5E03\u7684\u8FDC\u79BB\u524D\u6CBF\u6A21\u578B`;O.append(Je,document.createTextNode(V)),h.append(x,M,T,O);let se=De("label","aa-marker-size-control","\u6807\u8BB0\u5C3A\u5BF8 ");return nn=document.createElement("input"),nn.id="aa-marker-size-slider",nn.type="range",nn.min="0.5",nn.max="1.5",nn.step="0.05",nn.value=String(Xn),nn.setAttribute("aria-label","\u6807\u8BB0\u5C3A\u5BF8\u500D\u6570\uFF0C1 \u500D\u5BF9\u5E94 Logo 22 \u50CF\u7D20"),Fi=De("output","",`${tn(Xn)}\xD7`),Fi.htmlFor=nn.id,nn.addEventListener("input",()=>nu(Number(nn.value))),se.append(nn,Fi),h.append(se),h}function yu(){let h=w?"\u7CBE\u786E\u53EF\u8FBE\u9762":"\u975E\u5E15\u7D2F\u6258\u9762",x=j.hidden?"\u5C55\u5F00":"\u6536\u8D77";X.textContent=h,X.setAttribute("aria-label",`${x}\u51E0\u4F55\u8BF4\u660E\uFF1A${h}`),X.title=`${x}\u51E0\u4F55\u8BF4\u660E\uFF1B\u5C55\u5F00\u540E\u4E00\u5206\u949F\u81EA\u52A8\u6536\u8D77`}function sc(h){window.clearTimeout(Z),j.hidden=!h,X.setAttribute("aria-expanded",String(h)),yu(),h&&(Z=window.setTimeout(()=>sc(!1),6e4))}function Ep(){let h=Aa("\u524D\u6CBF\u63CF\u7ED8");h.classList.add("aa-frontier-geometry-controls");let x=document.createElement("div");x.className="aa-segmented-control",Ie=[["wireframe","\u53C2\u7167\u7EBF\u6846"],["solid","\u53C2\u7167\u5B9E\u5FC3"],["hidden","\u9690\u85CF\u53C2\u7167"]].map(([O,V])=>{let se=document.createElement("button");return se.type="button",se.textContent=V,se.dataset.frontierStyle=O,se.setAttribute("aria-pressed",O===at?"true":"false"),se.addEventListener("click",()=>lu(O)),x.appendChild(se),se});let M=document.createElement("label");M.className="aa-toggle-row",z=document.createElement("input"),z.id="aa-achievable-surface-toggle",z.type="checkbox",z.setAttribute("aria-describedby","aa-frontier-geometry-explanation"),z.addEventListener("change",()=>cu(z.checked)),M.append(z,document.createTextNode("\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09")),j=De("p","aa-frontier-geometry-explanation"),j.id="aa-frontier-geometry-explanation",j.setAttribute("role","status"),X=document.createElement("button"),X.id="aa-frontier-geometry-explanation-toggle",X.className="aa-frontier-geometry-explanation-toggle",X.type="button",X.setAttribute("aria-controls",j.id),X.addEventListener("click",()=>sc(j.hidden));let T=document.createElement("div");return T.className="aa-frontier-geometry-toggle-and-explanation",T.append(M,X,j),h.append(x,T),sc(!0),h}function wp(){let h=Aa("\u7A81\u51FA\u5EA6\u53E3\u5F84");return Ye=document.createElement("select"),Ye.id="aa-standout-metric-select",Ye.setAttribute("aria-label","\u7A81\u51FA\u5EA6\u6307\u6807"),Object.entries(li).forEach(([x,M])=>{let T=document.createElement("option");T.value=x,T.textContent=M.label,Ye.appendChild(T)}),Ye.value=D,Ye.addEventListener("change",()=>gu(Ye.value)),h.appendChild(Ye),h}function rc(h,x){let M=document.createElement("section");if(M.className="aa-control-section",M.id=h,x){let T=document.createElement("h2");T.className="aa-section-title",T.textContent=x,M.appendChild(T)}return M}function Tp(){let h=rc("aa-search-panel","\u641C\u7D22\u4E0E\u56FA\u5B9A");return Me=document.createElement("input"),Me.id="aa-search-input",Me.className="aa-search-input",Me.type="search",Me.placeholder="\u641C\u7D22\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D",Me.setAttribute("aria-label","\u641C\u7D22\u6A21\u578B\u3001\u57FA\u6A21\u578B\u3001\u5382\u5546\u6216\u6863\u4F4D"),Me.setAttribute("role","combobox"),Me.setAttribute("aria-expanded","false"),Me.setAttribute("aria-controls","aa-search-results"),Me.setAttribute("aria-autocomplete","list"),Ue=De("div","aa-search-results"),Ue.id="aa-search-results",Ue.setAttribute("role","region"),Ue.setAttribute("aria-label","\u6A21\u578B\u641C\u7D22\u7ED3\u679C"),Me.addEventListener("input",()=>{Un=-1,ds()}),h.addEventListener("keydown",x=>{let M=[...Ue.querySelectorAll("button")];x.key==="Escape"?(x.preventDefault(),Me.value="",ds(),Me.focus()):["ArrowDown","ArrowUp"].includes(x.key)&&M.length?(x.preventDefault(),Un=Un<0?x.key==="ArrowDown"?0:M.length-1:(Un+(x.key==="ArrowDown"?1:M.length-1))%M.length,M.forEach((T,O)=>T.classList.toggle("is-keyboard-active",O===Un)),Me.setAttribute("aria-activedescendant",M[Un].id),M[Un].scrollIntoView({block:"nearest"})):x.key==="Enter"&&x.target===Me&&M.length&&(x.preventDefault(),M[Math.max(0,Un)]?.click())}),h.append(Me,Ue),h}function vu(h){let x=[...te.map((M,T)=>({...M,displayedModelIndex:T})),...(J?.excluded_models_with_drop_reason||[]).map(M=>{let T=M.model_uuid?Q.get(M.model_uuid):[...Q.values()].find(O=>O.name===M.name);return{...T,...M,base_model_name:M.base_model_name||T?.base_model_name||M.name}})];return Gf(x,h)}function Ap(h){return vu(h).groups.map(x=>x.baseModelName)}function ds(){if(!Ue||!Me)return;let{groups:h,totalGroupCount:x}=vu(Me.value),M=!!Me.value.trim(),T=De("div","aa-search-result-summary",`\u627E\u5230 ${x} \u7EC4${x>40?"\uFF0C\u4EC5\u663E\u793A\u524D 40 \u7EC4":""}`);T.setAttribute("role","status"),Ue.replaceChildren(T,...h.map(({baseModelName:O,models:V},se)=>{let W=V.filter(Se=>Se.displayedModelIndex!==void 0&&!ze[Se.displayedModelIndex]?.hasNonFiniteContractCoordinate),le=document.createElement(W.length?"button":"div");le.className="aa-result-row",le.dataset.baseModelName=O,W.length&&(le.type="button",le.classList.add("aa-search-result-pin-button"),le.id=`aa-search-result-action-${se}`,le.addEventListener("click",()=>wa(O))),ge.has(O)&&le.classList.add("is-pinned");let he=De("span","aa-search-result-name",O),_e=V.slice().sort(qh).map(Se=>{let $e=Se.reasoning_level_label||Se.name;if(Se.displayedModelIndex===void 0)return`${$e}\uFF1A\u672A\u4E0A\u56FE\uFF0C${Se.drop_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807"}${Se.missing_dimension_names?.length?`\uFF08\u7F3A\u5C11 ${Se.missing_dimension_names.join("\u3001")}\uFF09`:""}`;let ut=Jl(Se.displayedModelIndex);return ut.length&&le.classList.add("is-hidden-by-model-visibility-filter"),ut.includes("\u4EC5\u5F53\u671F\u53EF\u6BD4")&&le.classList.add("is-hidden-by-comparable-only-toggle"),`${$e}\uFF1A${ut.length?`\u7B5B\u9009\u9690\u85CF\uFF08${ut.join("\u3001")}\uFF09`:"\u5DF2\u4E0A\u56FE"}${_n(Se)?"":`\uFF1B${jl(Se)}`}`});return V.filter(Se=>Se.displayedModelIndex!==void 0).every(Se=>!Ft(Se.displayedModelIndex))&&le.classList.add("is-hidden-by-current-filter"),le.title=_e.join("\uFF1B"),he.append(De("span","aa-search-result-hidden-note",_e.join("\uFF1B"))),le.append(he),W.length&&le.append(De("span","aa-search-result-action-label",Ge(O)?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A")),le})),Ue.style.display=M?"block":"none",Me.setAttribute("aria-expanded",String(M)),Me.removeAttribute("aria-activedescendant")}function Cp(){let h=document.createElement("div");return h.id="aa-country-region-legend",h.className="aa-country-region-legend",h.hidden=!Oe,[["china","\u4E2D\u56FD","\u53CC\u5706\u73AF"],["united-states","\u7F8E\u56FD","\u5706\u89D2\u65B9\u73AF"],["other","\u5176\u4ED6 / \u672A\u5206\u7C7B","\u83F1\u5F62\u73AF"]].forEach(([x,M,T])=>{let O=document.createElement("span");O.className="aa-country-region-legend-item",O.dataset.countryRegionCategory=x==="united-states"?"united_states":x,O.dataset.visibleCountryRegionModelCount="0";let V=document.createElement("span");V.className=`aa-country-region-swatch is-${x}`,V.setAttribute("aria-hidden","true"),O.append(V,document.createTextNode(`${M}\uFF08${T}\uFF09`)),O.append(De("span","aa-country-region-visible-model-count"," \xB7 0")),h.appendChild(O)}),h}function Rp(){return be=document.createElement("details"),be.id="aa-organization-filter-panel",be.className="aa-control-section aa-collapsible-section",be.open=!1,be}function Ip(){if(!be)return;let h=be.open,x={};te.forEach(V=>{x[V.creator]=(x[V.creator]||0)+1});let M=document.createElement("summary");M.className="aa-section-title aa-collapsible-summary",M.id="aa-organization-filter-count-summary",M.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}\uFF09`;let T=Object.keys(x).sort((V,se)=>V.localeCompare(se)).map(V=>{let se=l[V],W=document.createElement("label");W.className="aa-organization-filter-row",W.dataset.creatorName=V;let le=document.createElement("input");le.type="checkbox",le.checked=!tt.has(V),le.addEventListener("change",()=>{le.checked?tt.delete(V):tt.add(V),Sr()});let he=document.createElement("img");he.className="aa-organization-logo-preview",he.src=se.logo_visualization_data_url,he.alt="";let _e=document.createElement("span");_e.className="aa-truncate",_e.textContent=V;let Se=document.createElement("span");return Se.className="aa-muted",Se.dataset.visibleOrganizationModelCount="0",Se.textContent=String(x[V]),W.append(le,he,_e,Se),W}),O=document.createElement("div");O.className="aa-organization-filter-rows",O.append(...T),be.replaceChildren(M,Cp(),O),be.open=h,bu()}function bu(){if(!be)return;let h={},x={},M={};te.forEach((O,V)=>{if(h[O.creator]=(h[O.creator]||0)+1,!Ft(V))return;x[O.creator]=(x[O.creator]||0)+1;let se=["china","united_states"].includes(O.country_region_category)?O.country_region_category:"other";M[se]=(M[se]||0)+1}),be.querySelectorAll(".aa-organization-filter-row").forEach(O=>{let V=x[O.dataset.creatorName]||0,se=h[O.dataset.creatorName]||0,W=O.querySelector("[data-visible-organization-model-count]");W.dataset.visibleOrganizationModelCount=String(V),W.textContent=V===se?String(se):`${V}/${se}`}),be.querySelectorAll("[data-country-region-category]").forEach(O=>{let V=M[O.dataset.countryRegionCategory]||0;O.dataset.visibleCountryRegionModelCount=String(V),O.querySelector(".aa-country-region-visible-model-count").textContent=` \xB7 ${V}`});let T=be.querySelector("#aa-organization-filter-count-summary");T&&(T.textContent=`\u5382\u5546\u7B5B\u9009\uFF08${Object.keys(x).length}/${Object.keys(h).length}\uFF09`)}function Pp(){return Ee=rc("aa-pinned-panel","\u5DF2\u56FA\u5B9A"),Ee}function Mu(){return[...ge].flatMap(h=>[...H].map(x=>Q.get(x)).filter(x=>x?.base_model_name===h).sort(qh))}function Su(h){return te.find(x=>pe(x)===pe(h))}function Eu(h){let x=te.findIndex(M=>pe(M)===pe(h));return x<0?`\u5F53\u524D\u53E3\u5F84\u672A\u4E0A\u56FE\uFF1A${(J.excluded_models_with_drop_reason||[]).find(T=>T.model_uuid?T.model_uuid===h.model_uuid:T.name===h.name)?.drop_reason||h.historical_frame_absence_reason||"\u7F3A\u5C11\u53EF\u663E\u793A\u5750\u6807\u6216\u5DF2\u88AB\u526A\u679D"}`:[...Jl(x),..._n(te[x])?[]:[jl(te[x])]].join("\uFF1B")||"\u5F53\u671F\u53EF\u6BD4"}function ac(){if(!Ee)return;let h=[...ge];Ee.style.display=h.length?"block":"none";let x=De("div","aa-pinned-header"),M=De("h2","aa-section-title",`\u5DF2\u56FA\u5B9A\uFF08${H.size} \u6863\u4F4D\uFF09`),T=De("button","aa-link-button","\u6E05\u7A7A\u5168\u90E8");T.id="aa-clear-all-pinned-models",T.type="button",T.addEventListener("click",()=>{H.clear(),Te(),Ea(),ds()}),x.append(M,T);let O=De("div","aa-pinned-list");h.forEach(V=>{let se=De("article","aa-pinned-card"),W=De("div","aa-pinned-card-header"),le=De("button","aa-link-button","\u79FB\u9664");le.type="button",le.setAttribute("aria-label",`\u79FB\u9664 ${V} \u7684\u5168\u90E8\u56FA\u5B9A\u6863\u4F4D`),le.addEventListener("click",()=>Xe(V,!1)),W.append(De("b","aa-truncate",V),le),se.append(W);for(let he of Mu().filter(_e=>_e.base_model_name===V)){let _e=Su(he),Se=De("div","aa-pinned-variant-card",`${he.name} \xB7 \u667A\u80FD ${tn(_e?.panel.intelligence??he.panel.intelligence)} \xB7 ${he.reasoning_level_label||"\u6863\u4F4D\u672A\u8BB0\u5F55"}`);Se.dataset.modelIdentity=pe(he);let $e=Eu(he);Se.append(De("div","aa-pinned-model-status",$e)),_e||Se.classList.add("is-hidden-by-current-filter"),_e&&!_n(_e)&&Se.classList.add("is-historical-intelligence-index-version"),he.model_uuid||Se.append(De("div","aa-muted","\u65E7\u5951\u7EA6\u7F3A\u5C11 UUID\uFF0C\u91CD\u65B0\u751F\u6210\u540E\u53EF\u6309\u7A33\u5B9A\u8EAB\u4EFD\u56FA\u5B9A")),se.append(Se)}O.append(se)}),Ee.replaceChildren(x,O),oc(),wu()}function Lp(){ln=document.createElement("details"),ln.id="aa-pinned-comparison-panel";let h=De("summary","aa-section-title","\u5C55\u5F00\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4"),x=De("fieldset","aa-comparison-field-controls");x.append(De("legend","","\u53EF\u9009\u5B57\u6BB5\uFF08\u81EA\u52A8\u4FDD\u5B58\uFF09"));let M={output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"};for(let T of Ma){let O=De("label","aa-checkbox-chip"),V=document.createElement("input");V.type="checkbox",V.checked=yi.has(T),V.dataset.comparisonField=T,V.addEventListener("change",()=>{V.checked?yi.add(T):yi.delete(T),Mn(Dt,[...yi]),oc()}),O.append(V,document.createTextNode(M[T])),x.append(O)}qt=De("div","aa-comparison-table-scroll-region"),qt.tabIndex=0,qt.setAttribute("aria-label","\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\u8868\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8"),ln.append(h,x,qt),Lu(qt),ln.addEventListener("toggle",()=>{ln.open&&window.matchMedia("(max-width: 1024px)").matches&&Ra(!0),Pu()}),u.append(ln)}function oc(){if(!ln||!J)return;let h=Mu();ln.hidden=h.length===0,ln.querySelector("summary").textContent=`\u56FA\u5B9A\u6A21\u578B\u5BF9\u6BD4\uFF08${h.length} \u6863\u4F4D\uFF09`;let x=h.map(Su),M=x.findIndex(he=>he&&_n(he)&&[he.x,he.y,he.z].every(Number.isFinite)),T=document.createElement("table");T.id="aa-pinned-comparison-table";let O=De("caption","",M>=0?`\u0394% \u57FA\u51C6\uFF1A${h[M].name}\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u57FA\u51C6\u6216\u6700\u4F18\u503C\u9AD8\u4EAE\uFF1B\u96F6\u57FA\u51C6\u4E0D\u8BA1\u7B97\u767E\u5206\u6BD4\u3002`:"\u5F53\u524D\u53E3\u5F84\u6CA1\u6709\u53EF\u6BD4\u57FA\u51C6\uFF1B\u5386\u53F2\u53E3\u5F84\u4E0D\u53C2\u4E0E\u6700\u4F18\u503C\u9AD8\u4EAE\u3002"),V=document.createElement("thead"),se=document.createElement("tr");se.append(De("th","","\u6307\u6807")),h.forEach(he=>{let _e=De("th","",he.name);_e.scope="col",_e.dataset.modelIdentity=pe(he),se.append(_e)}),V.append(se);let W=[{field:"creator",label:"\u5382\u5546",identity:!0},{field:"reasoning_level_label",label:"\u63A8\u7406\u6863\u4F4D",identity:!0},{field:"release_date",label:"\u53D1\u5E03\u65E5\u671F",identity:!0},{field:"status",label:"\u5F53\u524D\u72B6\u6001",identity:!0},{field:"intelligence",label:"\u667A\u80FD\u6307\u6570",higherIsBetter:!0},{field:oe.cost_axis_field,label:oe.cost_axis_label,unit:Ql(),higherIsBetter:!1},{field:oe.speed_axis_field,label:oe.speed_axis_label,unit:"tok/s",higherIsBetter:!0},{field:"layer",label:"\u5E15\u7D2F\u6258\u5C42\u7EA7",higherIsBetter:!1},{field:"standout",label:li[D].label,higherIsBetter:!0},...[...yi].filter(he=>![oe.cost_axis_field,oe.speed_axis_field].includes(he)).map(he=>({field:he,label:{output_speed:"\u539F\u59CB\u901F\u5EA6",eff_speed:"\u6709\u6548\u901F\u5EA6",cost_to_run:"\u6709\u6548\u8FD0\u884C\u6210\u672C",blended_price_cache_input_output_7_to_2_to_1:"7:2:1 \u6DF7\u5408\u5355\u4EF7",output_mtokens:"\u5197\u957F\u5EA6"}[he],unit:he==="output_mtokens"?"M tokens":["output_speed","eff_speed"].includes(he)?"tok/s":he==="cost_to_run"?"USD":"USD/M tokens",higherIsBetter:["output_speed","eff_speed"].includes(he)}))],le=document.createElement("tbody");for(let he of W){let _e=document.createElement("tr");_e.dataset.comparisonField=he.field;let Se=De("th","",`${he.label}${he.unit?` (${he.unit})`:""}`);Se.scope="row",_e.append(Se);let $e=h.map((Pt,xn)=>{if(he.field==="status")return Eu(Pt);if(he.identity)return Pt[he.field]??Pt.panel?.[he.field]??"\u672A\u8BB0\u5F55";let At=x[xn];return At?he.field==="standout"?mu(At):At.panel?.[he.field]:null}),ut=$e.filter((Pt,xn)=>x[xn]&&_n(x[xn])&&Number.isFinite(Pt)),Mt=ut.length?he.higherIsBetter?Math.max(...ut):Math.min(...ut):null;$e.forEach((Pt,xn)=>{let At=document.createElement("td"),Tn=x[xn]&&_n(x[xn]);if(At.textContent=he.identity?String(Pt):x[xn]?he.field==="standout"?nc(Pt):tn(Pt):"\u5F53\u524D\u53E3\u5F84\u7F3A\u5E2D",!he.identity&&Tn&&Number.isFinite(Pt)&&Pt===Mt&&At.classList.add("is-best-comparable-value"),!he.identity&&Tn&&M>=0){let mc=Wf(Pt,$e[M]);mc!==null&&At.append(De("span","aa-comparison-delta",` \u0394 ${mc>0?"+":""}${tn(mc)}%`))}Tn||At.classList.add("is-unavailable-for-comparison"),_e.append(At)}),le.append(_e)}T.append(O,V,le),qt.replaceChildren(T),zi(qt)}function wu(){cs.replaceChildren(...te.flatMap((h,x)=>{if(!Be(h)||!Ft(x))return[];let M=De("span","aa-pinned-model-name-label",h.name);return M.dataset.modelIndex=String(x),[M]})),Tu()}function Tu(){let h=[...cs.children],x=h.map((M,T)=>{let V=ze[Number(M.dataset.modelIndex)]?.logoSprite.position?.clone().project(I);return M.hidden=!1,{id:T,visible:V&&Math.abs(V.z)<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1,x:V?(V.x+1)*d.clientWidth/2+12*Xn:0,y:V?(1-V.y)*d.clientHeight/2:0,width:M.offsetWidth,height:M.offsetHeight}});for(let M of Xf(d.clientWidth,d.clientHeight,x)){let T=h[M.id];T.hidden=M.hidden,M.hidden||(T.style.left=`${M.x}px`,T.style.top=`${M.y}px`)}}function Dp(){let h=rc("aa-standout-panel","\u7A81\u51FA\u5EA6");h.append(wp());let x=De("p","aa-weight-note");x.id="aa-standout-metric-description",h.append(x);let M=document.createElement("div");M.id="aa-standout-weight-controls",M.className="aa-weight-block",Ve={},[["intelligence","\u667A\u80FD"],["cost","\u6210\u672C"],["speed","\u901F\u5EA6"]].forEach(([V,se])=>{let W=document.createElement("div");W.className="aa-weight-row";let le=document.createElement("span");le.textContent=se;let he=document.createElement("input");he.type="range",he.min="-2",he.max="2",he.step="0.05",he.value="0",he.id=`aa-weight-slider-${V}`;let _e=document.createElement("input");_e.type="number",_e.min="0.25",_e.max="4",_e.step="0.05",_e.value="1.00",_e.className="aa-weight-number",_e.id=`aa-weight-number-${V}`,_e.setAttribute("aria-label",`${se}\u7A81\u51FA\u5EA6\u6743\u91CD`),he.setAttribute("aria-label",`${se}\u7A81\u51FA\u5EA6\u6743\u91CD\u6ED1\u6746`),he.addEventListener("input",()=>{me[V]=Math.pow(2,Number(he.value)),_e.value=me[V].toFixed(2),us()});let Se=()=>{let $e=ba(_e.value,me[V]);me[V]=$e,_e.value=$e.toFixed(2),he.value=String(Math.log2($e)),us()};_e.addEventListener("blur",Se),_e.addEventListener("keydown",$e=>{$e.key==="Enter"&&($e.preventDefault(),Se())}),W.append(le,he,_e),M.appendChild(W),Ve[V]={slider:he,number:_e}});let T=De("button","aa-secondary-button","\u91CD\u7F6E\u4E09\u4E2A\u6743\u91CD\u4E3A 1");T.type="button",T.id="aa-reset-standout-axis-weights",T.addEventListener("click",()=>_u(1,1,1)),M.append(De("p","aa-weight-note","\u6743\u91CD\u4EE5\u6307\u6570\u6539\u53D8\u5F52\u4E00\u5750\u6807\uFF0C\u4EC5\u5F71\u54CD\u52A0\u6743\u8D85\u4F53\u79EF\uFF1B\u5141\u8BB8 0.25\u20134\u3002\u7F16\u8F91\u6570\u5B57\u540E\u6309 Enter \u6216\u79FB\u51FA\u7126\u70B9\u63D0\u4EA4\u3002"),T);let O=document.createElement("h3");return O.className="aa-section-title",O.textContent="\u524D\u6CBF\u6392\u884C\uFF08\u524D 12 \u540D\uFF09",nt=document.createElement("div"),nt.id="aa-standout-ranking",nt.className="aa-ranking-list",h.append(M,O,nt),lc(),h}function lc(){let h=document.getElementById("aa-standout-metric-description");h&&(h.textContent={trend_residual:"\u8D8B\u52BF\u6B8B\u5DEE\uFF1A\u6A21\u578B\u667A\u80FD\u76F8\u5BF9\u524D\u6CBF\u6210\u672C\u4E0E\u901F\u5EA6\u8D8B\u52BF\u62DF\u5408\u7684\u504F\u79BB\uFF0C\u8D8A\u9AD8\u8D8A\u7A81\u51FA\u3002",intelligence_uplift:"\u667A\u80FD\u62AC\u5347\uFF1A\u4E0E\u5176\u4ED6\u524D\u6CBF\u53C2\u7167\u76F8\u6BD4\u7684\u667A\u80FD\u589E\u91CF\uFF1B\u7F3A\u5C11\u53C2\u7167\u65F6\u4E0D\u8BA1\u7B97\u3002",weighted_exclusive_hypervolume:"\u52A0\u6743\u8D85\u4F53\u79EF\u5360\u6BD4 = \u8BE5\u6A21\u578B\u7684\u6392\u4ED6\u8D21\u732E \xF7 \u5B8C\u6574\u524D\u6CBF\u8D85\u4F53\u79EF\u3002\u6309\u539F\u59CB\u8D21\u732E\u6392\u5E8F\uFF0C\u7B5B\u9009\u4E0D\u6539\u53D8\u5206\u6BCD\u3002",frontier_distance:"\u5230\u524D\u6CBF\u5782\u8DDD\uFF1A\u6CBF\u7528\u5F53\u524D\u5206\u6790\u65B9\u6CD5\u7684\u51E0\u4F55\u8DDD\u79BB\uFF1B\u4E0D\u8868\u793A\u5B9E\u9645\u53EF\u8FBE\u7684\u65B0\u6A21\u578B\u3002"}[D]);let x=document.getElementById("aa-standout-weight-controls");x&&(x.hidden=!li[D].usesAdjustableAxisWeights)}function Np(){return gt=document.createElement("details"),gt.id="aa-current-view-panel",gt.className="aa-control-section aa-current-view-details",gt.open=!0,gt}function Au(){return ne?.current_view||{}}function cc(){return te.filter(h=>!_n(h)).length}function hc(){let h=f.current_intelligence_index_version;return h?`v${String(h).replace(/^v/i,"")}`:"\u7248\u672C\u672A\u77E5"}function uc(){let h=f.current_intelligence_index_version_source==="inferred_from_accepted_embedded_model_catalog_partition";return`${hc()}${h?"\uFF08\u6309\u76EE\u5F55\u5206\u533A\u63A8\u5B9A\uFF09":""}`}function dc(){let h=f.artificial_analysis_api_response_fetched_at_utc;if(!h)return{headerText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5",detailText:"\u6293\u53D6\u65F6\u95F4\u672A\u77E5\uFF08\u5951\u7EA6\u672A\u8BB0\u5F55 API \u6293\u53D6\u65F6\u95F4\uFF09"};let x=f.artificial_analysis_api_response_fetched_at_utc_source==="inferred_from_cache_file_modification_time";return{headerText:`API \u6293\u53D6\u4E8E ${String(h).slice(0,10)}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":""}`,detailText:`${h}${x?"\uFF08\u6309\u7F13\u5B58\u6587\u4EF6\u65F6\u95F4\u63A8\u65AD\uFF09":"\uFF08\u6293\u53D6\u65F6\u8BB0\u5F55\uFF09"}`}}function Up(){let{rendererBundleSha256:h,generatorGitCommit:x,renderedAtUtc:M}=R,T=x.endsWith("-dirty"),O=x.replace(/-dirty$/,""),V=/^[0-9a-f]{40}$/.test(O)?O.slice(0,12):O;return[`bundle ${h.slice(0,12)}`,`commit ${V}${T?"-dirty":""}`,`\u6E32\u67D3 ${M}`].join(" \xB7 ")}function Cu(){if(!gt||!ne)return;let h=Au(),x=document.createElement("summary");x.className="aa-section-title aa-collapsible-summary",x.textContent="\u5F53\u524D\u89C6\u56FE";let M=document.createElement("dl");M.className="aa-current-view-grid";let T=cc();[["\u6E32\u67D3\u5668","three.js"],["\u6570\u636E\u65E5\u671F",h.data_date||a.data_date||"?"],["\u667A\u80FD\u6307\u6570",hc()],["\u6210\u672C\u53E3\u5F84",h.cost_metric_label||oe.cost_axis_label],["\u901F\u5EA6\u53E3\u5F84",h.speed_metric_label||oe.speed_axis_label],["\u53EF\u89C1 / \u5951\u7EA6\u6A21\u578B\u6570",`${te.filter((O,V)=>Ft(V)).length} / ${te.length}`],["\u53C2\u4E0E\u5206\u6790\uFF08\u5951\u7EA6\u5168\u96C6\uFF09",String(te.length-T)],["\u5386\u53F2\u53E3\u5F84\u70B9",String(T)],["\u5168\u5C40 Pareto \u6570",String(Si().length)],["\u53EF\u89C1 Pareto \u6570",String(Si().filter(O=>Ft(ht[O.name])).length)],["\u8FD1\u671F\u53D1\u5E03\u5BBD\u9650",m===null?"\u65E7\u5951\u7EA6\u672A\u8BB0\u5F55":`${m} \u4E2A\u6708 \xB7 ${ct?"\u663E\u793A":"\u9690\u85CF"}\u5BBD\u9650\u4E13\u5C5E\u70B9`],["\u5BBD\u9650\u4E13\u5C5E\u70B9",String(te.filter(O=>O.displayed_only_because_of_recent_release_grace_period===!0).length)],["\u526A\u679D\u53C2\u8003\u65E5",h.pruning_reference_date||f.pruning_reference_date||"\u672A\u8BB0\u5F55"],["\u4EA7\u7269\u6307\u7EB9",Up(),"aa-current-view-report-artifact-fingerprint"]].forEach(([O,V,se])=>{let W=document.createElement("dt");W.textContent=O;let le=document.createElement("dd");le.textContent=V,se&&(le.id=se,le.title=[`renderer bundle sha256\uFF1A${R.rendererBundleSha256}`,`generator git commit\uFF1A${R.generatorGitCommit}`,`rendered at (UTC)\uFF1A${R.renderedAtUtc}`].join(`
`)),M.append(W,le)}),gt.replaceChildren(x,M)}function De(h,x,M){let T=document.createElement(h);return x&&(T.className=x),M!==void 0&&(T.textContent=M),T}function Ru(h,x){let M=De("a","aa-artificial-analysis-attribution-link",h);return x&&(M.id=x),M.href=P,M.target="_blank",M.rel="noopener noreferrer",M}function Fp(){if(!E)return;let h=E.querySelector("h1")||De("h1","frontier-3d-report-title",document.title),x=De("div","aa-report-header-metadata-row");x.id="aa-report-header-metadata-row",x.tabIndex=0,x.setAttribute("aria-label","\u6A21\u578B\u8BA1\u6570\u4E0E\u6570\u636E\u6765\u6E90\uFF0C\u7A84\u5C4F\u53EF\u6A2A\u5411\u6EDA\u52A8"),Lu(x);let M=Ru("\u6570\u636E\uFF1AArtificial Analysis","aa-report-header-artificial-analysis-attribution-link");M.append(De("span","aa-external-link-glyph"," \u2197"));let T=dc(),O=De("span","aa-report-header-metadata-item",T.headerText);O.id="aa-report-header-artificial-analysis-api-fetch-date",O.title=T.detailText;let V=De("span","aa-report-header-metadata-item",`\u667A\u80FD\u6307\u6570 ${uc()}`);V.id="aa-report-header-intelligence-index-version",hs=De("span","aa-report-header-metadata-item"),hs.id="aa-report-header-model-count-summary",x.append(M,O,V,hs),Zn=De("button","aa-how-to-read-drawer-toggle-button","\u5982\u4F55\u9605\u8BFB \u24D8"),Zn.type="button",Zn.id="aa-how-to-read-drawer-toggle",Zn.setAttribute("aria-expanded","false"),Zn.setAttribute("aria-controls","aa-how-to-read-drawer"),Zn.addEventListener("click",()=>Rr(b.hidden));let se=De("div","aa-report-header-title-row"),W=De("div","aa-report-header-actions"),le=De("button","aa-secondary-button","\u89C6\u56FE\u8BBE\u7F6E");le.type="button",le.id="aa-view-settings-toggle",le.setAttribute("aria-expanded","false"),le.setAttribute("aria-controls",g.id),le.addEventListener("click",()=>{let Se=u.classList.toggle("is-view-settings-expanded");le.setAttribute("aria-expanded",String(Se))}),W.append(Zn,le),se.append(h,W);let he=[se,x],_e=f.embedded_model_catalog_partition_rejection_warning_text;if(typeof _e=="string"&&_e.trim()){let Se=De("div","aa-report-header-data-quality-warning",`\u26A0 ${_e}`);Se.id="aa-report-header-embedded-model-catalog-partition-rejection-warning",Se.setAttribute("role","alert"),he.push(Se)}E.replaceChildren(...he)}function Iu(){if(!hs)return;let h=te.length,x=te.filter((V,se)=>Ft(se)).length,M=cc(),T=[x===h?`\u663E\u793A ${h} \u4E2A\u6A21\u578B`:`\u663E\u793A ${x}/${h} \u4E2A\u6A21\u578B`,`\u5168\u5C40 Pareto ${Si().length}`,`\u53EF\u89C1 Pareto ${Si().filter(V=>Ft(ht[V.name])).length}`],O=te.filter((V,se)=>!_n(V)&&Ft(se)).length;M&&T.push(`\u5386\u53F2\u53E3\u5F84 ${O===M?M:`${O}/${M}`}`),hs.textContent=T.join(" \xB7 "),zi(document.getElementById("aa-report-header-metadata-row"))}function Op(h){return h.scrollWidth-h.clientWidth>1&&h.scrollLeft+h.clientWidth<h.scrollWidth-1}function zi(h){h&&h.classList.toggle("has-inline-overflow-fade",Op(h))}function Pu(){zi(document.getElementById("aa-report-header-metadata-row")),zi(qt),window.requestAnimationFrame(()=>{zi(document.getElementById("aa-report-header-metadata-row")),zi(qt)})}function Lu(h){!h||h.dataset.horizontalOverflowFadeBound==="true"||(h.dataset.horizontalOverflowFadeBound="true",h.addEventListener("scroll",()=>zi(h),{passive:!0}),zi(h))}function Bp(){b=document.createElement("section"),b.id="aa-how-to-read-drawer",b.className="aa-how-to-read-drawer",b.setAttribute("aria-label","\u5982\u4F55\u9605\u8BFB\u672C\u56FE"),b.tabIndex=-1,b.hidden=!0,p.appendChild(b),document.addEventListener("keydown",h=>{h.key==="Escape"&&!b.hidden&&Rr(!1),h.key==="Escape"&&qn&&zn()})}function Rr(h){if(!b)return Promise.resolve(!1);let x=!!h,M=!b.hidden,T=b.contains(document.activeElement);return x&&Ca(),b.hidden=!x,Zn?.setAttribute("aria-expanded",String(x)),x&&!M?b.focus({preventScroll:!0}):!x&&M&&T&&Zn?.focus({preventScroll:!0}),Promise.resolve(x)}function ki(h,...x){let M=De("section","aa-how-to-read-drawer-section");return M.append(De("h3","aa-how-to-read-drawer-section-title",h),...x),M}function Ca(){if(!b||!ne)return;let h=Au(),x=ne.three_dimensional_axis_configuration||{},M=De("div","aa-how-to-read-drawer-header"),T=De("button","aa-link-button","\u5173\u95ED");T.type="button",T.id="aa-how-to-read-drawer-close-button",T.addEventListener("click",()=>Rr(!1)),M.append(De("h2","aa-section-title","\u5982\u4F55\u9605\u8BFB"),T);let O=De("ul","aa-how-to-read-drawer-list");[[`\u6210\u672C\u8F74 x\uFF1A${x.x_axis?.title_text||h.cost_metric_label||"\u6210\u672C"}\u3002\u8D8A\u4F4E\u8D8A\u597D\uFF08\u8D8A\u4FBF\u5B9C\uFF09\u3002`,h.cost_metric_note?`\u53E3\u5F84\uFF1A${h.cost_metric_note}`:""],[`\u901F\u5EA6\u8F74 y\uFF1A${h.speed_axis_title_text||x.y_axis?.title_text||h.speed_metric_label||"\u901F\u5EA6"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,h.speed_metric_note?`\u53E3\u5F84\uFF1A${h.speed_metric_note}`:""],[`\u667A\u80FD\u8F74 z\uFF1A${x.z_axis?.title_text||"\u667A\u80FD\u6307\u6570"}\u3002\u8D8A\u9AD8\u8D8A\u597D\u3002`,""]].forEach(([$e,ut])=>{let Mt=De("li","",$e);ut&&Mt.append(De("div","aa-how-to-read-drawer-metric-note",ut)),O.appendChild(Mt)});let V=cc(),se=De("p","aa-how-to-read-drawer-paragraph");se.append(De("span","aa-historical-intelligence-index-version-swatch"),document.createTextNode(`\u865A\u7EBF\u5E95\u677F\u3001\u534A\u900F\u660E Logo \u7684\u70B9\u662F\u300C\u5386\u53F2\u53E3\u5F84\u300D\u70B9\uFF1A\u672C\u53E3\u5F84\u7528\u5230\u7684\u6210\u672C\u6216\u5197\u957F\u5EA6\u6765\u81EA\u975E\u5F53\u671F\u667A\u80FD\u6307\u6570\u7248\u672C\uFF08\u5F53\u671F\u4E3A ${hc()}\uFF09\u3002\u5B83\u4EEC\u7167\u5E38\u663E\u793A\uFF0C\u4F46\u4E0D\u53C2\u4E0E Pareto\u3001\u7A81\u51FA\u5EA6\u3001\u5F52\u4E00\u5316\u4E0E\u524D\u6CBF\u51E0\u4F55\u7684\u8BA1\u7B97\u3002\u5F53\u524D\u53E3\u5F84\u5171 ${V} \u4E2A\uFF1B\u52FE\u9009\u5DE5\u5177\u680F\u300C\u4EC5\u5F53\u671F\u53EF\u6BD4\u300D\u53EF\u9690\u85CF\u5B83\u4EEC\u3002`));let W=De("dl","aa-current-view-grid"),le=f.embedded_model_catalog_intelligence_index_version,he=f.embedded_model_catalog_captured_at_utc,_e=f.artificial_analysis_website_page_fetch_paused,Se=f.artificial_analysis_api_tier;[["\u6570\u636E\u63D0\u4F9B\u65B9",Ru("Artificial Analysis")],["API \u6293\u53D6",dc().detailText],["\u667A\u80FD\u6307\u6570",`${uc()}${Se?`\uFF08API ${Se} tier\uFF09`:""}`],["\u5185\u5D4C\u6A21\u578B\u76EE\u5F55",le?`v${le}${he?`\uFF0C\u7F13\u5B58\u4E8E ${he}`:""}`:"\u672A\u8BB0\u5F55"],["\u7F51\u9875\u6293\u53D6",_e===!0?"\u5DF2\u6682\u505C\uFF08\u53EA\u8BFB\u5DF2\u6709\u7F13\u5B58\uFF09":_e===!1?"\u5DF2\u5F00\u542F":"\u672A\u8BB0\u5F55"],["\u526A\u679D\u53C2\u8003\u65E5",f.pruning_reference_date||"\u672A\u8BB0\u5F55"]].forEach(([$e,ut])=>{let Mt=document.createElement("dd");Mt.append(ut),W.append(De("dt","",$e),Mt)}),b.replaceChildren(M,ki("\u4E09\u4E2A\u5750\u6807\u8F74",O,De("p","aa-how-to-read-drawer-paragraph","\u521D\u59CB\u89C6\u89D2\u4ECE\u300C\u4F4E\u6210\u672C\u3001\u9AD8\u901F\u5EA6\u3001\u9AD8\u667A\u80FD\u300D\u4E00\u89D2\u770B\u5411\u5BF9\u89D2\uFF1B\u62D6\u62FD\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u53F3\u952E\u62D6\u52A8\u5E73\u79FB\u3002")),ki("Pareto \u524D\u6CBF",De("p","aa-how-to-read-drawer-paragraph","\u5E26\u6DF1\u8272\u5706\u73AF\u7684\u70B9\u662F\u672C\u53E3\u5F84\u7684 Pareto \u70B9\uFF1A\u6CA1\u6709\u5176\u4ED6\u6A21\u578B\u5728\u6210\u672C\u3001\u901F\u5EA6\u3001\u667A\u80FD\u4E0A\u540C\u65F6\u4E0D\u5DEE\u4E14\u81F3\u5C11\u4E00\u7EF4\u66F4\u597D\u3002\u9ED8\u8BA4\u7684 Delaunay \u90BB\u63A5\u63D2\u503C\u8FDE\u63A5\u8FD9\u4E9B\u70B9\uFF0C\u4EC5\u4F5C\u89C6\u89C9\u53C2\u7167\uFF0C\u4E0D\u662F\u5E15\u7D2F\u6258\u9762\u3002\u52FE\u9009\u300C\u5B9E\u9645\u53EF\u8FBE\u524D\u6CBF\uFF08\u7CBE\u786E\u9636\u68AF\uFF09\u300D\u53EF\u5207\u6362\u4E3A\u5DF2\u5C55\u793A\u5206\u6790\u70B9\u7684\u7CBE\u786E\u9884\u7B97\u53EF\u8FBE\u9762\u3002")),ki("\u5386\u53F2\u53E3\u5F84\u70B9",se),ki("\u53E3\u5F84\u4E0E\u6B63\u4EA4\u5206\u89E3",De("p","aa-how-to-read-drawer-paragraph",[...Object.values(a.cost_metric_definitions||{}).map($e=>$e.description||`${$e.label}\uFF1A${$e.unit||"USD"}`),...Object.values(a.speed_metric_definitions||{}).map($e=>$e.description||`${$e.label}\uFF1A\u751F\u6210\u901F\u5EA6 tok/s`),"\u6B63\u4EA4\u5206\u89E3\u89C6\u89D2\u91C7\u7528\u6DF7\u5408\u5355\u4EF7 \xD7 \u539F\u59CB\u901F\u5EA6\uFF0C\u5206\u522B\u89C2\u5BDF\u5355\u4EF7\u3001\u541E\u5410\u4E0E\u667A\u80FD\u3002\u6709\u6548\u6210\u672C\u4E0E\u6709\u6548\u901F\u5EA6\u90FD\u53D7\u5230\u8F93\u51FA\u957F\u5EA6\u5F71\u54CD\u3002\u5207\u6362\u53E3\u5F84\u4FDD\u7559\u76F8\u673A\uFF0C\u56FA\u5B9A\u8F74\u57DF\u6765\u81EA\u8BE5\u53E3\u5F84\u5B8C\u6574\u663E\u793A\u96C6\u5408\uFF1B\u7B5B\u9009\u548C\u5BBD\u9650\u5F00\u5173\u4E0D\u6539\u53D8\u8F74\u57DF\u3002"].join(" "))),ki("\u56FE\u4F8B",De("p","aa-how-to-read-drawer-paragraph",["\u6DF1\u8272\u73AF\uFF1A\u5E15\u7D2F\u6258\u8EAB\u4EFD\uFF1B\u91D1\u8272\u73AF\uFF1A\u5DF2\u56FA\u5B9A\uFF1B\u84DD\u8272\u5149\u6655\uFF1A\u5F53\u524D\u7A81\u51FA\u5EA6\u7684\u76F8\u5BF9\u5927\u5C0F\uFF0C\u865A\u7EBF\u5149\u6655\u8868\u793A\u7F3A\u5C11\u6570\u503C\u3002","\u7D2B\u8272\u5B9E\u7EBF\uFF1A\u540C\u4EE3\u63A8\u7406\u6863\u4F4D\uFF1B\u7070\u8272\u5B9E\u7EBF\uFF1A\u540C\u6863\u4F4D\u8DE8\u4EE3\u8C31\u7CFB\uFF1B\u7070\u8272\u865A\u7EBF\uFF1A\u540C\u4EE3\u5176\u4ED6\u6863\u4F4D\u53C2\u7167\u3002\u7070\u70B9\uFF1A\u88AB\u526A\u679D\u7684\u8C31\u7CFB\u524D\u8EAB\uFF1B\u8D85\u8303\u56F4\u524D\u8EAB\u5939\u7D27\u5728\u7BB1\u58C1\uFF0C\u8BE6\u60C5\u7528 \u2191\u2193 \u63D0\u793A\u65B9\u5411\u5E76\u4FDD\u7559\u539F\u503C\u3002",w?"\u5F53\u524D\u663E\u793A\u7CBE\u786E\u9884\u7B97\u9636\u68AF\uFF1A\u57FA\u4E8E\u5DF2\u5C55\u793A\u4E14\u53C2\u4E0E\u5206\u6790\u7684\u5E15\u7D2F\u6258\u70B9\u3002":`\u5F53\u524D${at==="hidden"?"\u9690\u85CF":at==="solid"?"\u663E\u793A\u5B9E\u5FC3":"\u663E\u793A\u7EBF\u6846"} Delaunay \u90BB\u63A5\u53C2\u7167\uFF0C\u9762\u5185\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u53EF\u8FBE\u6A21\u578B\u3002`,Oe?"\u56FD\u522B\u5916\u6846\u5DF2\u5F00\u542F\uFF1A\u4E2D\u56FD\u53CC\u5706\u73AF\u3001\u7F8E\u56FD\u5706\u89D2\u65B9\u73AF\u3001\u5176\u4ED6\u83F1\u5F62\u73AF\uFF1B\u56FD\u522B\u53EA\u6807\u8BC6\u5382\u5546\u5F52\u5C5E\u3002":"\u56FD\u522B\u5916\u6846\u5173\u95ED\uFF1B\u5F00\u542F\u65F6\u540C\u6B65\u663E\u793A\u56FD\u522B\u56FE\u4F8B\u3002"].join(" "))),ki("\u672A\u4E0A\u56FE\u6A21\u578B\u4E0E\u5382\u5546",De("p","aa-how-to-read-drawer-paragraph",(()=>{let $e=J.excluded_models_with_drop_reason||[],ut=[...new Set($e.map(Mt=>Mt.creator))].filter(Mt=>!te.some(Pt=>Pt.creator===Mt));return`${$e.length} \u4E2A\u6709\u667A\u80FD\u5206\u7684\u6A21\u578B\u672A\u4E0A\u56FE\u3002\u53EF\u5728\u641C\u7D22\u4E2D\u6309\u6A21\u578B\u6216\u5382\u5546\u67E5\u770B\u5B9E\u9645\u539F\u56E0\u3002${ut.map(Mt=>`${Mt}\uFF1A${[...new Set($e.filter(Pt=>Pt.creator===Mt).map(Pt=>Pt.drop_reason))].join("\u3001")}`).join("\uFF1B")}`})())),ki("\u6570\u636E\u6765\u6E90",W),ki("\u54C1\u724C\u4E0E\u8BB8\u53EF",De("p","aa-how-to-read-drawer-paragraph","\u672C\u62A5\u544A\u4F7F\u7528 Lobe Icons \u7684 MIT \u8BB8\u53EF\u56FE\u6807\u4E0E\u672C\u5730\u54C1\u724C\u8D44\u4EA7\u3002\u54C1\u724C\u540D\u79F0\u548C\u5546\u6807\u5C5E\u4E8E\u5404\u81EA\u6743\u5229\u4EBA\uFF0C\u4EC5\u7528\u4E8E\u6807\u8BC6\u5382\u5546\uFF0C\u4E0D\u8868\u793A\u8BA4\u53EF\u6216\u5408\u4F5C\u3002\u5B8C\u6574\u8BB8\u53EF\u89C1\u672C\u9875\u6E90\u4EE3\u7801\u7684 Lobe Icons MIT \u8BB8\u53EF\u58F0\u660E\u3002")))}function Ra(h){_=!!h,u.classList.toggle("is-side-panel-collapsed",!_);let x=window.matchMedia("(max-width: 1024px)").matches;vt.textContent=_?x?"\u2304":"\u203A":x?"\u2303":"\u2039",vt.setAttribute("aria-label",`${_?"\u6536\u8D77":"\u5C55\u5F00"}\u56FE\u8868\u63A7\u5236\u680F`),vt.setAttribute("aria-controls","aa-side-panel-body"),vt.setAttribute("aria-expanded",String(_)),window.setTimeout(Os,210)}function zp(){Fp(),Bp(),g.replaceChildren(Mp(),Sp(),Ep());let h=document.createElement("div");h.className="aa-side-panel-header";let x=document.createElement("div");x.className="aa-side-panel-label",x.textContent="\u56FE\u8868\u63A7\u5236",vt=document.createElement("button"),vt.type="button",vt.id="aa-side-panel-toggle",vt.className="aa-icon-button",vt.addEventListener("click",()=>Ra(!_)),h.append(x,vt);let M=document.createElement("div");M.className="aa-side-panel-body",M.id="aa-side-panel-body",M.append(Tp(),Rp(),Pp(),Dp(),Np()),v.replaceChildren(h,M),Lp(),lc(),Du()}function Du(){let h=window.matchMedia("(max-width: 640px)").matches,x=document.getElementById("aa-report-header-metadata-row"),M=document.getElementById("aa-report-header-model-count-summary");x&&M&&(h?x.prepend(M):x.append(M)),Pu(),ln&&(window.matchMedia("(max-width: 1024px)").matches?Ee.after(ln):u.append(ln)),Ra(_)}window.addEventListener("resize",Du);function Os(){let h=Math.max(1,d.clientWidth),x=Math.max(1,d.clientHeight),M=Math.min(window.devicePixelRatio||1,2);y.getPixelRatio()!==M&&y.setPixelRatio(M),y.setSize(h,x,!1),y.setViewport(0,0,y.domElement.width/M,y.domElement.height/M);for(let T of[ot,ce,Ne])T?.material.resolution.set(h,x);I.aspect=h/x,I.updateProjectionMatrix();for(let T of[Y,K])T.children.filter(O=>O.isSprite).forEach(O=>Mr(O,O.userData.cssPixelSize));!it.hidden&&Oi&&Ds(Oi),Ut()}new ResizeObserver(Os).observe(d),window.addEventListener("resize",Os);let fc;function pc(){fc?.removeEventListener("change",pc),fc=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`),fc.addEventListener("change",pc),Os()}pc();function Ia(h){let x=h.clone().project(I),M=y.domElement.getBoundingClientRect();return{clientX:M.left+(x.x+1)/2*M.width,clientY:M.top+(1-x.y)/2*M.height,normalizedDeviceDepth:x.z}}function Nu(h){let x=ht[h];return x===void 0?null:Ia(ze[x].logoSprite.position)}function kp(h){let x=ht[h];if(x===void 0)return null;let M=ze[x],T=new N().setFromMatrixColumn(I.matrixWorld,0),O=Ia(M.logoSprite.position);function V(se){if(!se.material.sizeAttenuation)return se.scale.x*d.clientHeight/(4*Math.tan(as.degToRad(I.fov/2)));let W=Ia(se.position.clone().addScaledVector(T,se.scale.x/2));return Math.hypot(W.clientX-O.clientX,W.clientY-O.clientY)}return{logoRadius:V(M.logoSprite),whiteBackplateRadius:V(M.backplateSprite),countryRegionRadius:V(M.countryRegionSprite)}}function Uu(h){let x=de.find(M=>M.userData.prunedLineageAncestorNode.name===h);return x?Ia(x.position):null}function Vp(h){let x=Nu(h);if(!x)return null;let M=Ar(x.clientX,x.clientY);if(M?.interactionTargetKind!=="displayed_model")return null;let T=te[M.modelIndex];return{projectedCanvasPosition:x,frontmostModelName:T.name,frontmostBaseModelName:T.base_model_name,frontmostLineageKey:T.lineage_key}}function Hp(h){let x=Uu(h);if(!x)return null;let M=Ar(x.clientX,x.clientY),T=M?.interactionTargetKind==="displayed_model"?te[M.modelIndex]?.name??null:M?.prunedLineageAncestorNode?.name??null;return{projectedCanvasPosition:x,frontmostInteractionTargetKind:M?.interactionTargetKind??null,frontmostInteractionTargetName:T,frontmostInteractionTargetIsRequestedPrunedLineageAncestor:M?.interactionTargetKind!=="displayed_model"&&T===h}}function Gp(){if(!lt)return{built:!1,visible:!1,vertexCount:0,triangleCount:0,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:!0,allVertexPositionsAreFinite:!0};let h=lt.geometry.attributes.position,x=Array.from(lt.geometry.index.array);return{built:!0,visible:lt.visible,vertexCount:h.count,triangleCount:x.length/3,allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange:x.every(M=>Number.isInteger(M)&&M>=0&&M<h.count),allVertexPositionsAreFinite:Array.from(h.array).every(Number.isFinite)}}function Wp(){let h=te.filter((W,le)=>Ft(le)).length,x=new Set(du().filter(W=>W.userData.interactionTargetKind==="displayed_model").map(W=>W.userData.modelIndex)),M=te.map((W,le)=>[W,le]).filter(([W])=>!_n(W)).map(([,W])=>W),T=new Set(te.map(W=>W.creator)),O=new Set(te.filter((W,le)=>Ft(le)).map(W=>W.creator)).size,V=Pa(ot).length,se=Pa(ce).length;return{interactiveRenderer:"threejs",activeMetricVariantKey:c,costAxisField:oe.cost_axis_field,speedAxisField:oe.speed_axis_field,displayedModelMarkerCount:te.length,organizationLogoMarkerCount:ze.length,cameraFacingOrganizationLogoMarkerCount:re.filter(W=>W.isSprite).length,depthTestedOrganizationLogoMarkerCount:re.filter(W=>W.material.depthTest).length,depthWritingOrganizationLogoBackplateCount:ze.filter(W=>W.backplateSprite.material.depthWrite).length,loadedOrganizationLogoCanvasTextureCount:[...T].filter(W=>Ze[W]==="loaded").length,failedOrganizationLogoCanvasTextureCount:[...T].filter(W=>Ze[W]==="failed").length,countryRegionMarkerVisible:Oe,countryRegionMarkerCount:Oe?h:0,organizationCount:T.size,visibleOrganizationCount:O,pinnedBaseModelNames:[...ge],orbitInteractionActive:Fs,pinnedModelUuids:[...H].filter(W=>!W.startsWith("legacy:")),hoveredModelIndex:k,organizationLogoTextureLoadStateByCreatorName:{...Ze},hoveredLineageKey:G,hoveredReasoningBaseModelName:fe,hoveredPrunedLineageAncestorName:$,pinnedModelMarkerCount:te.filter(W=>Be(W)).length,displayedLineageSegmentEndpointCount:V,displayedReasoningVariantSegmentEndpointCount:se,displayedPrunedLineageAncestorMarkerCount:de.length,availableLineageCount:Object.keys(Qe).length,selectedFrontierStandoutMetricName:D,frontierStandoutAxisWeights:{...me},paretoFrontierModelCount:Si().length,visibleParetoFrontierModelCount:Si().filter(W=>Ft(ht[W.name])).length,frontierStyle:at,achievableFrontierSurfaceVisible:w,paretoFrontierWireframeVisible:Fe?.visible??!1,paretoFrontierSurfaceVisible:lt?.visible??!1,achievableFrontierSurfaceObjectVisible:et?.visible??!1,exactAchievableBoundaryVisible:pt?.visible??!1,achievableFrontierGeometryKind:ne.achievable_frontier_geometry_kind??null,paretoFrontierSurfaceWritesDepth:lt?.material.depthWrite??null,achievableFrontierSurfaceWritesDepth:et?.material.depthWrite??null,paretoFrontierSurfaceTriangleCount:lt?lt.geometry.index.count/3:0,renderedTriangleCountInLatestFrame:y.info.render.triangles,nonFiniteContractCoordinateCount:mt,outOfRangeContractTriangleVertexIndexCount:B,skippedInvalidContractGeometryNames:[...Ot],visibleModelMarkerCount:h,showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod:ct,recentReleaseFrontierDistanceGracePeriodMonths:m,recentReleaseGracePeriodOnlyModelMarkerCount:te.filter(W=>W.displayed_only_because_of_recent_release_grace_period===!0).length,pickableRecentReleaseGracePeriodOnlyModelMarkerCount:te.filter((W,le)=>W.displayed_only_because_of_recent_release_grace_period===!0&&x.has(le)).length,showOnlyCurrentIntelligenceIndexVersionComparableModels:He,historicalIntelligenceIndexVersionModelMarkerCount:M.length,visibleHistoricalIntelligenceIndexVersionModelMarkerCount:M.filter(W=>ze[W]?.logoSprite.visible).length,pickableHistoricalIntelligenceIndexVersionModelMarkerCount:M.filter(W=>x.has(W)).length,historicalIntelligenceIndexVersionStyledModelMarkerCount:ze.filter(W=>W.backplateSprite.material===ql&&W.logoSprite.material.opacity<1).length,currentIntelligenceIndexVersionStyledModelMarkerCount:ze.filter(W=>W.backplateSprite.material===Xl&&W.logoSprite.material.opacity>=1).length,howToReadDrawerOpen:b?!b.hidden:!1,reportArtifactFingerprint:{...R},sidePanelExpanded:_,markerSizeMultiplier:Xn,fixedAxisConfiguration:ne.three_dimensional_axis_configuration,cameraPosition:I.position.toArray()}}function Pa(h){if(!h)return[];if(h.isLineSegments2){let M=h.geometry.attributes.instanceStart,T=h.geometry.attributes.instanceEnd;return Array.from({length:M.count},(O,V)=>[[M.getX(V),M.getY(V),M.getZ(V)],[T.getX(V),T.getY(V),T.getZ(V)]]).flat()}let x=h.geometry.attributes.position;return Array.from({length:x.count},(M,T)=>[x.getX(T),x.getY(T),x.getZ(T)])}function Xp(){return{lineage:Pa(ot),reasoning:Pa(ce)}}function qp(){return ze.map((h,x)=>({name:te[x]?.name,position:h.logoSprite.position.toArray(),visible:Ft(x)}))}function Yp(){return de.map(h=>h.position.toArray())}function $p(){return{selectedFrontierStandoutMetricName:D,frontierStandoutAxisWeights:{...me},ranking:Si().map(h=>({name:h.name,value:ae[h.name]})).sort((h,x)=>{let M=Number.isFinite(h.value)?h.value:-1/0;return(Number.isFinite(x.value)?x.value:-1/0)-M}),completeFrontierHypervolume:ve}}zp(),ic(c,!1),Os(),window.frontierThreeDimensionalVisualizationState=Wp,window.pinFrontierBaseModel=h=>Xe(h,!0),window.unpinFrontierBaseModel=h=>Xe(h,!1),window.togglePinnedFrontierBaseModel=wa,window.showFrontierLineageForModelName=h=>{let x=ht[h];return x===void 0||!Ft(x)?!1:(Tr(x),!0)},window.clearFrontierHoverState=zn,window.matchingFrontierBaseModelNames=Ap,window.setFrontierMetricCombination=Ta,window.setParetoFrontierVisualizationStyle=lu,window.setAchievableFrontierSurfaceVisibility=cu,window.setCountryRegionMarkerVisibility=ou,window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels=ru,window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod=au,window.setFrontierHowToReadDrawerOpen=Rr,window.setFrontierSidePanelExpanded=Ra,window.selectFrontierStandoutMetric=gu,window.setFrontierStandoutAxisWeights=_u,window.setFrontierMarkerSizeMultiplier=nu,window.frontierStandoutRanking=$p,window.frontierThreeDimensionalRendererDiagnostics={verificationGeometryConstructors:{Vector2:We,Vector3:N,Scene:lr,Color:ft,CanvasTexture:Es,Sprite:Ms,SpriteMaterial:bs,PlaneGeometry:ws,Mesh:Jt,PerspectiveCamera:$t,OrthographicCamera:Ts},get axisAnnotationSizeMeasurementCount(){return Le},get surfaceMaterialForVisibilityVerification(){return lt?.material},get surfaceRenderOrder(){return lt?.renderOrder},markerVisualEncodingSummary:()=>ze.map((h,x)=>({isPareto:te[x].panel?.layer===1,paretoRingScale:h.paretoRingSprite.scale.x,backplateScale:h.backplateSprite.scale.x,standoutHaloVisible:h.standoutHaloSprite.visible,standoutHaloScale:h.standoutHaloSprite.scale.x,logoScale:h.logoSprite.scale.x,logoSizeAttenuation:h.logoSprite.material.sizeAttenuation})),camera:I,controls:U,renderer:y,requestRender:Ut,pointerInteractionAtCanvasClientCoordinates:Ar,createRelationshipLineForVerification:jn,projectedCanvasPositionForModelName:Nu,projectedCanvasMarkerRadiiForModelName:kp,projectedCanvasPositionForPrunedLineageAncestorName:Uu,frontmostPointerInteractionAtProjectedModelPosition:Vp,frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition:Hp,paretoFrontierSurfaceGeometrySummary:Gp,transientRelationshipLineEndpointPositions:Xp,displayedModelMarkerPositionsAndVisibility:qp,displayedPrunedLineageAncestorMarkerPositions:Yp},Xh((h,x)=>{let M=[...H].map(V=>{let se=Q.get(V);return se?[V,Object.fromEntries(["model_uuid","name","creator","base_model_name","reasoning_level_label","reasoning_level_sort_order"].map(W=>[W,se[W]]))]:null}).filter(Boolean);a=Yh(h),o=a.metric_variants,f=a.artificial_analysis_data_provenance||{};let T=dc(),O=document.getElementById("aa-report-header-artificial-analysis-api-fetch-date");O.textContent=T.headerText,O.title=T.detailText,document.getElementById("aa-report-header-intelligence-index-version").textContent=`\u667A\u80FD\u6307\u6570 ${uc()}`,window.FRONTIER_3D_VISUALIZATION_DATASET=a,Q.clear(),M.forEach(([V,se])=>Q.set(V,{...se,panel:{},historical_frame_absence_reason:x(se.model_uuid)})),Object.values(o).forEach(V=>{(V.three_dimensional_scene?.displayed_model_markers||[]).forEach(se=>Q.set(pe(se),se))}),ic(c,!0)})})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
