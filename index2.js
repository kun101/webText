var ui = new firebaseui.auth.AuthUI(firebase.auth());
var database = firebase.database();
var user,text,newtext,user_uid;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      user_uid=user.uid;
            firebase.database().ref('text/' + user.uid).on('value', function(snapshot) {
                if(snapshot.val().text == null){
                    firebase.database().ref('text/' + user.uid).set({
                        text: "text",
                    });
                   }else{
                       document.getElementById("text_field").value = snapshot.val().text;
                       newtext = document.getElementById("text_field").value;
                       
                   }
            });
  } else {
    // No user is signed in.
  }
});

function change1(val){
    firebase.database().ref('text/' + user_uid).set({
    text: val,
    });
}

function signout(){
    var r = confirm("Are you sure you want to Sign Out ?");
    if (r == true) {
        firebase.auth().signOut();
    window.location.replace("index.html");
    } else {}
}