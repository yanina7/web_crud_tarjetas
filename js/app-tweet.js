$(document).ready(function() {
var btn = document.getElementById('btn'); /*obtener el boton*/
btn.disabled = true; /*carga la pag con el boton deshabiitado*/
btn.setAttribute('class','btn-style');

var db = firebase.database();
var span = document.getElementById('counter');
var textarea = document.getElementById('text'); /*obtenemos el textarea*/
textarea.addEventListener('keydown', autosize);
textarea.addEventListener('keyup', validate);
textarea.addEventListener('keyup', countText);



/*evento que inicializa con una tecla*/
btn.addEventListener('click', sendTweet);



/*funcion que valida que no ingrese campos vacios ni espacios continuos*/
function validate() {
	if (textarea.value === '' || textarea.value==false ) { 
		btnDisabled();
	} else {
		btnEnabled();

	}
}
/**Función de Ajustar el TextArea deacuerdo al contenido */

function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
   el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}


/*funciones que habilitan y deshabilitan el boton*/
function btnDisabled() {
	btn.disabled = true;
	btn.style.backgroundColor = '#b9e1fa';
}

function btnEnabled() {
	btn.disabled = false;
	btn.style.backgroundColor = '#50b6f5';
}

/*función que crea el nuevo tweet y lo agrega al html*/


/*función que limpia el textarea*/
function clear() {
	document.getElementById('text').value = '';
	span.textContent = '';
}

/**Función de contador de caracteres  */
function countText() {
	var count = textarea.value.length;
	var show = 200 - count;
	span.textContent = show;
	var parent = document.getElementById('post');
	parent.appendChild(span);
	if (count > 0 && count < 200) {
		span.style.color = '#50b6f5';
	} else if (show < 0) {
		span.style.color = "red";
	} else {
		btnDisabled();
	}
}

/*Captura de la hora del Tweet*/ 
function time() {
	var date = new Date();
	var time = date.getFullYear();
	return time;
}

function sendTweet(event) {
  var mensaje = textarea.value;
  var asignadotext = localStorage.getItem("asignado");

  
  if (mensaje.length > 200 || mensaje.length == 0) {
	alert("escriba hasta 200 carácteres");  
  } else {
    db.ref('mensajes').push({
		mensaje:mensaje,
		asignado:asignadotext
		
    });

	/*db.ref('mensajes/asignado').push({
		asignado:asignadotext
		
    });*/

    textarea.value = '';	
  }  
}

/** date II */
let currentTimeComplete = new Date().toLocaleString();
console.log(Number(currentTimeComplete.match(/\/(.*)\//)[1]));
let currentTime = new Date().toLocaleTimeString();
console.log(currentTime)
function dateF() {
  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = Number(currentTimeComplete.match(/\/(.*)\//)[1]);
  let year = objectDate.getFullYear();
   if (day < 10) {
	day = `0${day}`;
	}      
   if (month < 10) {
	month = `0${month}`;
   }
  
  let format1 = `${day}/${month}/`;
  let yearactual = `${year}`;
   console.log(format1); // 07/23/2022
  let currentTime = new Date().toLocaleTimeString();
  if (currentTime.length == 7) {
	currentTime = '0' + currentTime;
	} 
 return format1+yearactual.slice(2,4) + " " + currentTime;
}


/** Run II */
/** obtener time and img alarm II YM*/
/*
let checkbox1 = document.getElementById("checkbox_id1");
let checkbox2 = document.getElementById("checkbox_id2");
let checkbox3 = document.getElementById("checkbox_id3");
let checkbox4 = document.getElementById("checkbox_id4");
let checkbox5 = document.getElementById("checkbox_id5");
let checkbox6 = document.getElementById("checkbox_id6");
let checkbox7 = document.getElementById("checkbox_id7");
let checkbox8 = document.getElementById("checkbox_id8");
let checkbox9 = document.getElementById("checkbox_id9");
let checkbox10 = document.getElementById("checkbox_id10");
let checkbox11 = document.getElementById("checkbox_id11");
let checkbox12 = document.getElementById("checkbox_id12");
let checkbox13 = document.getElementById("checkbox_id13");
let checkbox14 = document.getElementById("checkbox_id14");
let checkbox15 = document.getElementById("checkbox_id15");
let checkbox16 = document.getElementById("checkbox_id16");
let checkbox17 = document.getElementById("checkbox_id17");
let checkbox18 = document.getElementById("checkbox_id18");
let checkbox19 = document.getElementById("checkbox_id19");
let checkbox20 = document.getElementById("checkbox_id20");
*/
/*evento que inicializa con una tecla II YM*/
/*
checkbox1.addEventListener( 'change',sendAlarm1);
checkbox2.addEventListener( 'change',sendAlarm2);
checkbox3.addEventListener( 'change',sendAlarm3);
checkbox4.addEventListener( 'change',sendAlarm4);
checkbox5.addEventListener( 'change',sendAlarm5);
checkbox6.addEventListener( 'change',sendAlarm6);
checkbox7.addEventListener( 'change',sendAlarm7);
checkbox8.addEventListener( 'change',sendAlarm8);
checkbox9.addEventListener( 'change',sendAlarm9);
checkbox10.addEventListener( 'change',sendAlarm10);
checkbox11.addEventListener( 'change',sendAlarm11);
checkbox12.addEventListener( 'change',sendAlarm12);
checkbox13.addEventListener( 'change',sendAlarm13);
checkbox14.addEventListener( 'change',sendAlarm14);
checkbox15.addEventListener( 'change',sendAlarm15);
checkbox16.addEventListener( 'change',sendAlarm16);
checkbox17.addEventListener( 'change',sendAlarm17);
checkbox18.addEventListener( 'change',sendAlarm18);
checkbox19.addEventListener( 'change',sendAlarm19);
checkbox20.addEventListener( 'change',sendAlarm20);
*/
//checkbox1.addEventListener( 'change',sendAlarm2);
/** alarm II */

//SENDALARM1
/*
function sendAlarm1(event) {
  let textalarm = document.getElementById("timealarm1");
  let myimg = document.getElementById("imgalarm1");
  let checkvalue = checkbox1.checked;
  let myimgsrc = ""
  let textalarmcontent = ""
	if ( checkvalue == true ) {
		//alert("1 Click or change event occured on ");
		textalarm.style.display = "block";
		textalarmcontent = dateF();
		textalarm.textContent = textalarmcontent;  
		console.log(dateF());
		myimgsrc = "../assets/img/confirmed.png";
		myimg.src = myimgsrc;
		classeffect= 'effectimg';
		datelast = currentTimeComplete;
	} else {
		
		textalarm.style.display = "none";
		classeffect= 'none';
		textalarm.textContent = textalarmcontent;
		myimgsrc = "../assets/img/confirm.png";
		myimg.src = myimgsrc;		
		console.log("0 Click or change event occured off");
		datelast = currentTimeComplete;
	}

	//let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	//console.log(userRef);
	// guardando datos del usuario en la base datos
	//let firebasePostREsfName = userRef.child('checkvalue');
	//firebasePostREsfName.set(myimgsrc);
	db.ref('checksvalue/scaffolder').set({
		checkvalue:checkvalue,
		myimgsrc:myimgsrc,
		textalarmcontent:textalarmcontent,
		classeffect:classeffect,
		datelast:datelast
	});

}
//II
db.ref('checksvalue/scaffolder').on('value', function(data){
	console.log(data.val());
	let textalarm = document.getElementById("timealarm1");
	let myimg = document.getElementById("imgalarm1");
  
	 checkbox1.checked = data.val().checkvalue;
	 myimg.setAttribute('src', data.val().myimgsrc); 
	 myimg.setAttribute('class',data.val().classeffect);
	 textalarm.textContent = data.val().textalarmcontent;
	 textalarm.style.display = "block";


});
*/
//**********SENDALARM 2 SCALA */
/*
function sendAlarm2(event) {
	let textalarm = document.getElementById("timealarm2");
	let myimg = document.getElementById("imgalarm2");
	let checkvalue = checkbox2.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/scala').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/scala').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm2");
	  let myimg = document.getElementById("imgalarm2");
	
	   checkbox2.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox2.checked) {
        checkbox2.disabled = true;
       } 
  });
  */
//**********SENDALARM 3 MALLA*/
/*
function sendAlarm3(event) {
	let textalarm = document.getElementById("timealarm3");
	let myimg = document.getElementById("imgalarm3");
	let checkvalue = checkbox3.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/mallas').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/mallas').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm3");
	  let myimg = document.getElementById("imgalarm3");
	
	  checkbox3.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox3.checked) {
		checkbox3.disabled = true;
	  }
  });
  */
//**********SENDALARM 4 INGESTA*/
/*
function sendAlarm4(event) {
	let textalarm = document.getElementById("timealarm4");
	let myimg = document.getElementById("imgalarm4");
	let checkvalue = checkbox4.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/ingesta').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/ingesta').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm4");
	  let myimg = document.getElementById("imgalarm4");
	
	  checkbox4.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox4.checked) {
		checkbox4.disabled = true;
	  }
  });
  */
//**********SEDALARM 5 REGLAS DE CALIDAD*/
/*
function sendAlarm5(event) {
	let textalarm = document.getElementById("timealarm5");
	let myimg = document.getElementById("imgalarm5");
	let checkvalue = checkbox5.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/reglascalidad').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/reglascalidad').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm5");
	  let myimg = document.getElementById("imgalarm5");
	
	  checkbox5.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	   if (checkbox5.checked) {
		checkbox5.disabled = true;
	  }
  });
  */
//**********SEDALARM 6 OPERATIVIZACIÓN*/
/*
function sendAlarm6(event) {
	let textalarm = document.getElementById("timealarm6");
	let myimg = document.getElementById("imgalarm6");
	let checkvalue = checkbox6.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/operativiza').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/operativiza').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm6");
	  let myimg = document.getElementById("imgalarm6");
	
	  checkbox6.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox6.checked) {
		checkbox6.disabled = true;
	  }
  });
  */
//**********SEDALARM 7 SMART CLEANER*/
/*
function sendAlarm7(event) {
	let textalarm = document.getElementById("timealarm7");
	let myimg = document.getElementById("imgalarm7");
	let checkvalue = checkbox7.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/smartcleaner').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/smartcleaner').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm7");
	  let myimg = document.getElementById("imgalarm7");
	
	  checkbox7.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox7.checked) {
		checkbox7.disabled = true;
	  }
  });
  */
//**********SEDALARM 8 DESPLIEGUE*/
/*
function sendAlarm8(event) {
	let textalarm = document.getElementById("timealarm8");
	let myimg = document.getElementById("imgalarm8");
	let checkvalue = checkbox8.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/despliegue').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/despliegue').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm8");
	  let myimg = document.getElementById("imgalarm8");
	
	  checkbox8.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox8.checked) {
		checkbox8.disabled = true;
	  }
  });
  */
//**********SEDALARM 9 OTROS*/
/*
function sendAlarm9(event) {
	let textalarm = document.getElementById("timealarm9");
	let myimg = document.getElementById("imgalarm9");
	let checkvalue = checkbox9.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/otros').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //II
  db.ref('checksvalue/otros').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm9");
	  let myimg = document.getElementById("imgalarm9");
	
	  checkbox9.checked = data.val().checkvalue;
	  myimg.setAttribute('src', data.val().myimgsrc); 
	  myimg.setAttribute('class',data.val().classeffect);
	  textalarm.textContent = data.val().textalarmcontent;
	  textalarm.style.display = "block";
	  if (checkbox9.checked) {
		checkbox9.disabled = true;
	  }
  });

//SENDALARM10
function sendAlarm10(event) {
	let textalarm = document.getElementById("timealarm10");
	let myimg = document.getElementById("imgalarm10");
	let checkvalue = checkbox10.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest10').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //X
  db.ref('checksvalue/guest10').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm10");
	  let myimg = document.getElementById("imgalarm10");
	
	   checkbox10.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox10.checked) {
        checkbox10.disabled = true;
    } 
  
  });
  
//SENDALARM11
function sendAlarm11(event) {
	let textalarm = document.getElementById("timealarm11");
	let myimg = document.getElementById("imgalarm11");
	let checkvalue = checkbox11.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest11').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XI
db.ref('checksvalue/guest11').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm11");
	  let myimg = document.getElementById("imgalarm11");
	
	   checkbox11.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block"; 
	   if (checkbox11.checked) {
        checkbox11.disabled = true;
    } 
  
  });

//SENDALARM12
function sendAlarm12(event) {
	let textalarm = document.getElementById("timealarm12");
	let myimg = document.getElementById("imgalarm12");
	let checkvalue = checkbox12.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest12').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XII
  db.ref('checksvalue/guest12').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm12");
	  let myimg = document.getElementById("imgalarm12");
	
	   checkbox12.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block"; 
	   if (checkbox12.checked) {
        checkbox12.disabled = true;
    } 
  
  });

//SENDALARM13
  function sendAlarm13(event) {
	let textalarm = document.getElementById("timealarm13");
	let myimg = document.getElementById("imgalarm13");
	let checkvalue = checkbox13.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest13').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XIII
  db.ref('checksvalue/guest13').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm13");
	  let myimg = document.getElementById("imgalarm13");
	
	   checkbox13.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox13.checked) {
        checkbox13.disabled = true;
    } 
  
  });

//SENDALARM14
function sendAlarm14(event) {
	let textalarm = document.getElementById("timealarm14");
	let myimg = document.getElementById("imgalarm14");
	let checkvalue = checkbox14.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest14').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XIV
  db.ref('checksvalue/guest14').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm14");
	  let myimg = document.getElementById("imgalarm14");
	
	   checkbox14.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox14.checked) {
        checkbox14.disabled = true;
    } 
  
  });

//SENDALARM15
function sendAlarm15(event) {
	let textalarm = document.getElementById("timealarm15");
	let myimg = document.getElementById("imgalarm15");
	let checkvalue = checkbox15.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest15').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XV
  db.ref('checksvalue/guest15').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm15");
	  let myimg = document.getElementById("imgalarm15");
	
	   checkbox15.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox15.checked) {
        checkbox15.disabled = true;
    } 
  });

//SENDALARM16
function sendAlarm16(event) {
	let textalarm = document.getElementById("timealarm16");
	let myimg = document.getElementById("imgalarm16");
	let checkvalue = checkbox16.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest16').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XVI
  db.ref('checksvalue/guest16').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm16");
	  let myimg = document.getElementById("imgalarm16");
	
	   checkbox16.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox16.checked) {
        checkbox16.disabled = true;
    }   
  });

//SENDALARM17
function sendAlarm17(event) {
	let textalarm = document.getElementById("timealarm17");
	let myimg = document.getElementById("imgalarm17");
	let checkvalue = checkbox17.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest17').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XVI
  db.ref('checksvalue/guest17').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm17");
	  let myimg = document.getElementById("imgalarm17");
	
	   checkbox17.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox17.checked) {
        checkbox17.disabled = true;
    }  
  });

//SENDALARM18
function sendAlarm18(event) {
	let textalarm = document.getElementById("timealarm18");
	let myimg = document.getElementById("imgalarm18");
	let checkvalue = checkbox18.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest18').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XVIII
  db.ref('checksvalue/guest18').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm18");
	  let myimg = document.getElementById("imgalarm18");
	
	   checkbox18.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox18.checked) {
        checkbox18.disabled = true;
    }  
  });

//SENDALARM19
function sendAlarm19(event) {
	let textalarm = document.getElementById("timealarm19");
	let myimg = document.getElementById("imgalarm19");
	let checkvalue = checkbox19.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest19').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XIX
  db.ref('checksvalue/guest19').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm19");
	  let myimg = document.getElementById("imgalarm19");
	
	   checkbox19.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox19.checked) {
        checkbox19.disabled = true;
    }    
  });

//SENDALARM20
function sendAlarm20(event) {
	let textalarm = document.getElementById("timealarm20");
	let myimg = document.getElementById("imgalarm20");
	let checkvalue = checkbox20.checked;
	let myimgsrc = ""
	let textalarmcontent = ""
	  if ( checkvalue == true ) {
		  //alert("1 Click or change event occured on ");
		  textalarm.style.display = "block";
		  textalarmcontent = dateF();
		  textalarm.textContent = textalarmcontent;  
		  console.log(dateF());
		  myimgsrc = "../assets/img/confirmed.png";
		  myimg.src = myimgsrc;
		  classeffect= 'effectimg';
		  datelast = currentTimeComplete;
	  } else {
		  
		  textalarm.style.display = "none";
		  classeffect= 'none';
		  textalarm.textContent = textalarmcontent;
		  myimgsrc = "../assets/img/confirm.png";
		  myimg.src = myimgsrc;		
		  console.log("0 Click or change event occured off");
		  datelast = currentTimeComplete;
	  }
  
	  //let userRef = firebase.database().ref('checksvalue').child('scaffolder');
	  //console.log(userRef);
	  // guardando datos del usuario en la base datos
	  //let firebasePostREsfName = userRef.child('checkvalue');
	  //firebasePostREsfName.set(myimgsrc);
	  db.ref('checksvalue/guest20').set({
		  checkvalue:checkvalue,
		  myimgsrc:myimgsrc,
		  textalarmcontent:textalarmcontent,
		  classeffect:classeffect,
		  datelast:datelast
	  });
  
  }
  //XIX
  db.ref('checksvalue/guest20').on('value', function(data){
	  console.log(data.val());
	  let textalarm = document.getElementById("timealarm20");
	  let myimg = document.getElementById("imgalarm20");
	
	   checkbox20.checked = data.val().checkvalue;
	   myimg.setAttribute('src', data.val().myimgsrc); 
	   myimg.setAttribute('class',data.val().classeffect);
	   textalarm.textContent = data.val().textalarmcontent;
	   textalarm.style.display = "block";
	   if (checkbox20.checked) {
        checkbox20.disabled = true;
    }   
  });
*/

 //	let scaffolderspan = document.getElementById("scaffolder_id");
 //	let textalarm = document.getElementById("timealarm");
 // let myimg = document.getElementById("imgalarm");
 // var newTweet = document.createElement('div');
 // var imgTweet = document.createElement('img');
 //	myimg.setAttribute('src','../assets/img/manta.png');
 //	imgTweet.setAttribute('class','responsive-img manta');
 //	newTweet.setAttribute('class','tweet-style card col l3 m3 s5 offset-s1 offset-l1 offset-m1');
	
	//spanText.textContent = data.val().mensaje;
	//spanText.setAttribute('class','text-style flow-text');
	//spanHour.textContent = time();
	//spanHour.setAttribute('class','circle hour-style green-text text-darken-2 pull-left');
	//spanIcon.setAttribute('class','material-icons red-text');
	//spanIcon.textContent= 'offline_pin';
	
	//var parent = document.getElementById('container-tweets');
	//newTweet.appendChild(spanIcon);
	//newTweet.appendChild(spanText);
	//newTweet.appendChild(spanHour);
    //newTweet.appendChild(imgTweet);
	//parent.appendChild(newTweet);

	//validate();
//  });

//I
 //var container = $('#container-tweets');

/* db.ref('tipos').on('value', function(snapshot) {
	let itemsArray = Object.values(snapshot.val())
//	console.log(itemsArray.length);
//	console.log(itemsArray[itemsArray.length - 1]['asignado']); 
//	console.log(snapshot.val().asignado)  
	let asg = itemsArray[itemsArray.length - 1]['asignado'];
	console.log(asg)
	console.log(parent);
	console.log(parent);
	let lista = document.getElementById('container-tweets');
	console.log('La cantidad de hijos del nodo div es:' + lista.firstElementChild)
	//spanSelectCity.textContent = asg;
	//var msgDiv = document.createElement("span");
	//msgDiv.textContent = msg.asignado;
	//document.getElementById("container-tweets").appendChild(msgDiv);
}); */

db.ref('mensajes').on('child_added', function(data){
	console.log(data.val().mensaje); 
	console.log(data.val().asignado); 
  	var newTweet = document.createElement('div');
    var imgTweet = document.createElement('img');
	var spanText = document.createElement('p');
	var spanHour = document.createElement('span');
	var spanIcon = document.createElement('span');
	var spanSelectCity = document.createElement('span');

	imgTweet.setAttribute('src','../assets/img/manta.png');
	imgTweet.setAttribute('id','deletemusic');
	imgTweet.setAttribute('class','btn-small responsive-img manta');
	imgTweet.setAttribute('height', '10');
	newTweet.setAttribute('class','tweet-style card col l3 m3 s5 offset-s1 offset-l1 offset-m1');
	newTweet.setAttribute('data-key', data.key);

	spanText.textContent = data.val().mensaje;
	spanText.setAttribute('class','chiplabel');
	//spanHour.textContent = time();
	//spanHour.setAttribute('class','circle hour-style green-text text-darken-2 pull-left');
	spanIcon.setAttribute('class','material-icons red-text');
	spanSelectCity.setAttribute('class','chiplabel');	
	spanSelectCity.textContent = data.val().asignado;
	
	// var strx = $('#selectCity option:selected').text();
	
    
    //https://scrimba.com/learn/firebase/getting-id-of-item-in-database-co85f4fe094863ad4f61ee554#

	/*db.ref('tipos').on('child_added', function(snapshot) {
		let itemsArray = Object.values(snapshot.val())
		console.log(itemsArray.length)    
	//	console.log(snapshot.val().asignado)  
		//var msg = snapshot.val();
		//var msgDiv = document.createElement("span");
		//msgDiv.textContent = msg.asignado;
		//document.getElementById("container-tweets").appendChild(msgDiv);
	});*/


    // Añadir el evento de clic para eliminar el div contenedor
    imgTweet.addEventListener('click', function() {
    var key = newTweet.getAttribute('data-key');
    db.ref('mensajes').child(key).remove()
        .then(function() {
            newTweet.remove();
            console.log("Mensaje eliminado exitosamente.");
        })
        .catch(function(error) {
            console.error("Error al eliminar el mensaje: ", error);
        });
    });


	var parent = document.getElementById('container-tweets');
	newTweet.appendChild(spanIcon);
	newTweet.appendChild(spanText);
	newTweet.appendChild(spanHour);
	newTweet.appendChild(spanSelectCity);
	newTweet.appendChild(imgTweet);
	
	parent.appendChild(newTweet);

	validate();
  });
  

});
  
  