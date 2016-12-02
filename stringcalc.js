
stringcalc={decimalsign:',',
 abs:function(a){if(a[0]=='-'){a=a.substr(1)}return a},
	normalize:function(a){var aa=a.trim().split(this.decimalsign);
		var minus='';if(aa[0][0]=='-'){minus='-';aa[0]=aa[0].substr(1)}
		while((aa[0][0]=='0')&&(aa[0].length>0)){aa[0]=aa[0].substr(1);}
		if(aa.length>1){if(aa[1].replace(/0/g,'')==''){aa[1]=''}
		if(aa[1].length>0){aa[1]=this.decimalsign+aa[1];}else{aa[1]=''}}else{aa[1]='';}
		return minus+aa[0]+aa[1];},	
	sum:function(a,b,isdec){a=this.normalize(a);b=this.normalize(b);var minus='';
	 var aa=a.split(this.decimalsign);var bb=b.split(this.decimalsign);
	 if((a[0]=='-')&&(b[0]=='-')){minus='-';}
	 else if(((a[0]=='-')&&(b[0]!='-'))||((a[0]!='-')&&(b[0]=='-'))){
			var g=this.isabsgreater(a,b);if(g=='same'){return '0'}
			if((g=='a')&&(a[0]=='-')){return '-'+this.absorderdiff(a,b)}
			else if((g=='a')&&(b[0]=='-')){return this.absorderdiff(a,b)}
			else if((g=='b')&&(b[0]=='-')){return '-'+this.absorderdiff(b,a)}
			else if((g=='b')&&(a[0]=='-')){return this.absorderdiff(b,a)}
	 }
	 if(bb[0].length>aa[0].length){var dd=bb;bb=aa;aa=dd;}
		var cc=['',''];var u;var r=0;
		aa[0]=this.abs(aa[0]);bb[0]=this.abs(bb[0]);
		if(aa.length>1||bb.length>1){if(!aa[1]){aa[1]='0'}if(!bb[1]){bb[1]='0'}
			while(bb[1].length>aa[1].length){aa[1]=aa[1]+'0'}
			while(bb[1].length<aa[1].length){bb[1]=bb[1]+'0'}
			var decr=this.sum(aa[1],bb[1],true);
			cc[1]=decr[1];if(decr[0]>0){r=1};
		 if(cc[1].replace(/0/g,'')==''){cc[1]=''}
		 if(cc[1].length>0){cc[1]=this.decimalsign+cc[1];}}			
		var bbl=bb[0].length;var aal=aa[0].length;
		for(var aaa=1;aaa<=aal;aaa++){
			if(bbl-aaa>-1){u=parseInt(bb[0][bbl-aaa])+parseInt(aa[0][aal-aaa]);}
			else{u=parseInt(aa[0][aal-aaa]);}
			u=u+r;r=0;if(u>9){r=1;u=u-10;}
			cc[0]=u+''+cc[0];}
		if(isdec){return [r,cc[0]]}
		if(r>0){cc[0]=r+''+cc[0]}r=0;		
	 return minus+cc[0]+cc[1];
	},
	
	isabsgreater:function(a,b){if(a==b){return 'same'}if(!b){return 'a'}if(!a){return 'b'}
		a=this.normalize(a);b=this.normalize(b);a=this.abs(a);b=this.abs(b);
		if(a==b){return 'same'}if(b=='0'){return 'a'}if(a=='0'){return 'b'}
		var aa=a.split(this.decimalsign);var bb=b.split(this.decimalsign);
		var aal=aa[0].length;var bbl=bb[0].length;
		if(aal>bbl){return 'a'}else if(aal<bbl){return 'b'}
		else{var i1;var i2;
			for(var g=0;g<aal;g++){i1=parseInt(aa[0][g]);i2=parseInt(bb[0][g]);if(i1>i2){return 'a'}else if(i1<i2){return 'b'}}
			if(aa.length>1||bb.length>1){if(aa.length==1){return 'b'}if(bb.length==1){return 'a'}
				while(bb[1].length>aa[1].length){aa[1]=aa[1]+'0'}
				while(bb[1].length<aa[1].length){bb[1]=bb[1]+'0'}
				return this.isabsgreater(aa[1],bb[1]);
	}return 'same';}},	
	
	absorderdiff:function(a,b,isdec){a=this.normalize(a);b=this.normalize(b);
		a=this.abs(a);b=this.abs(b);
	 var aa=a.split(this.decimalsign);var bb=b.split(this.decimalsign);
		var cc=['',''];var u;var r=0;
		if(aa.length>1||bb.length>1){if(!aa[1]){aa[1]='0'}if(!bb[1]){bb[1]='0'}
			while(bb[1].length>aa[1].length){aa[1]=aa[1]+'0'}
			while(bb[1].length<aa[1].length){bb[1]=bb[1]+'0'}
			var decr=this.absorderdiff(aa[1],bb[1],true);
			cc[1]=decr[1];if(decr[0]>0){r=1};
		 if(cc[1].replace(/0/g,'')==''){cc[1]=''}
		 if(cc[1].length>0){cc[1]=this.decimalsign+cc[1];}}			
		var bbl=bb[0].length;var aal=aa[0].length;
		for(var aaa=1;aaa<=aal;aaa++){
			if(bbl-aaa>-1){u=parseInt(bb[0][bbl-aaa])-parseInt(aa[0][aal-aaa]);}
			else{u=parseInt(aa[0][aal-aaa]);}
			u=u-r;r=0;if(u<0){r=1;u=Math.abs(u);}
			cc[0]=u+''+cc[0];}
		if(isdec){return [r,cc[0]]}
		if(r>0){'-'+cc[0];}r=0;
	 return cc[0]+cc[1];
	},
	mul:function(a,b){var minus=false;var o='0';var oo='';var r=0;var rr=0;a=this.normalize(a);b=this.normalize(b);var y;var z=0;var commapos=0;
		if(a.indexOf('-')>-1){minus=true;a=a.replace('-','')}if(b.indexOf('-')>-1){minus=!minus;b=b.replace('-','')}
		y=a.indexOf(this.decimalsign);if(y>-1){commapos=a.substring(y+1).length;console.log(commapos);a=a.replace(this.decimalsign,'');if(y==0){commapos=commapos+1;}}
		y=b.indexOf(this.decimalsign);if(y>-1){commapos=commapos+b.substring(y+1).length;b=b.replace(this.decimalsign,'');if(y==0){commapos=commapos+1;}}
		for(var x=b.length-1;x>-1;x--){oo='';for(y=0;y<z;y++){oo=oo+'0'}z++;r=0;for(y=a.length-1;y>-1;y--){r=r+(parseInt(b[x])*parseInt(a[y]));
			rr=(r%10);r=r-rr;oo=rr.toString()+oo;
		}if(r>0){oo=r.toString()+oo;}o=this.sum(o,oo);}
		if(commapos){o=o.substring(0,o.length-commapos)+this.decimalsign+o.substring(o.length-commapos)}
		if(minus){return '-'+o}return o;
	},
};


