$('#login').submit(function(e){
		e.preventDefault();
		autenticar($('#user').val(), $('#pass').val());
	}
);
$('#nvoactivo').click(function(){
	//console.log("estoy funcionando");
	location.href ="../../nvoActivo.html";
});
function autenticar(user, pass) {
	if ($('#user').val() != '' & $('#pass').val() != ''){
		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(user, pass)
		.then(function(result){
			location.href ="../../dashboard.html";
		})
		.catch(e=>{console.log(e.activo);
			alert("Verifique su usuario y contraseña");
		});
	}
	else{
		alert("Favor llenar todos los campos");
	}
}
$('#ver').click(function() {
	var activosRef = db.collection("Activos").doc("v7oiAmKfDnPB4x8IXql9");
		activosRef.get().then(function(doc) {
	    if (doc.exists) {
	        console.log("Document data:", doc.data());
	        var table = $('#listaActivos').DataTable(); 
			var rowNode = table
			    .row.add( ["<input type='checkbox' name='check' value='1'>" , 
			    	doc.data().Estatus,doc.data().id, doc.data().Tipo, doc.data().Marca, doc.data().Serie, doc.data().Usuarios] )
			    .draw()
			    .node();
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});
    
});
$('#salir').click(function() {
	firebase.auth().signOut().then(function() {
		console.log("salir");
  	location.href ="../../index.html";
	}, function(error) {
	  // An error happened.
	});
});
$('#showModal').click(function(){
	$("#formModal").show();
});
$(document).ready(function(){
	$('#formModal').hide();
});