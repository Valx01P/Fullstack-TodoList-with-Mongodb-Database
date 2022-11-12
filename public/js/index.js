//on/off/ switching; yes there are better ways to write this, "W.E.T." I know, 
//but figuring it out will take me longer than copy and pasting my own code lmao
$("#pending").click(function(){
        $("#pending").addClass("clicked");
        $("#pending").removeClass("unclicked");
        $("#all").removeClass("clicked");
        $("#all").addClass("unclicked");
        $("#completed").removeClass("clicked");
        $("#completed").addClass("unclicked");
        $(".checked-list-item").hide();
        $(".unchecked-list-item").show();
    });

$("#completed").click(function(){
        $("#completed").addClass("clicked");
        $("#completed").removeClass("unclicked");
        $("#all").removeClass("clicked");
        $("#all").addClass("unclicked");
        $("#pending").removeClass("clicked");
        $("#pending").addClass("unclicked");
        $(".unchecked-list-item").hide();
        $(".checked-list-item").show();
    });

$("#all").click(function(){
        $("#all").addClass("clicked");
        $("#all").removeClass("unclicked");
        $("#pending").removeClass("clicked");
        $("#pending").addClass("unclicked");
        $("#completed").removeClass("clicked");
        $("#completed").addClass("unclicked");
        $(".checked-list-item").show();
        $(".unchecked-list-item").show();
    });

//on/off code ex.
// $("#pending").click(function(){
//     if($("#pending"&&"#completed").hasClass("unclicked")) {
//         $("#all").addClass("clicked");
//         $("#all").removeClass("unclicked");
//         $("#pending").removeClass("clicked");
//         $("#completed").removeClass("clicked");
//     } else {
//         $("#all").removeClass("clicked");
//         $("#all").addClass("unclicked");
//     }
// });

//checked and unchecked list items category buttons       DYNAMIC CHECK/UNCHECK SYSTEM BASED ON ID
$onclick = $(".checkboxx") //targeting the checkbox       AS TO NOT TARGET EVERY CLASS LIST-CONTAINER &
$onclick.change(function(){ //when changed                INSTEAD JUST INDIVIDUAL CLASS LIST-CONTAINERS
    var listId = $(this).attr("list-item-id") //storing the unique id of that specifically clicked checkbox using (this)
                                              //getting said id from the attribute property added to the checkbox which contains the unique id
    if($(this).is(":checked")) { //again using this to specify that specifically clicked checkbox
        $(`.${listId}`).addClass("checked-list-item"); //adding a class (checked/unchecked) to the container associated with the checkbox
        $(`.${listId}`).removeClass("unchecked-list-item"); //by giving the container the same unique id as a class and then targeting it
                                                            //using said unique id
    } else {
        
        $(`.${listId}`).removeClass("checked-list-item");
        $(`.${listId}`).addClass("unchecked-list-item");
    }

});

//option button on/off  *scrapped idea code
// document.addEventListener('click', function handleClick(event) {
//     event.target.classList.add('bg-yellow');
//   });

// $(".option").addEventListener('click', function handleClick(event) {
//     if($(this).is(":clicked")) {
//         $(this).addClass("checked");
//     } else {
//         $(this).removeClass("checked");
//     }
//   });

// .click(function(){
//     if($(this).is(":clicked")) {
//         $(this).addClass("checked");
//     } else {
//         $(this).removeClass("checked");
//     }
// });

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

//attempt of trying to save checked box data in local storage
// let boxes = document.getElementsByClassName('checkboxx').length;
// function save() {	
//     for(let x = 1; x <= boxes; x++){
// 	var checkbox = document.getElementById(String(x));
//     localStorage.setItem(String(x), checkbox.checked);	
//   }
// }
//for loading
// var checked = JSON.parse(localStorage.getItem(String(x)));
//     document.getElementById(String(x)).checked = checked;


// save checkbox state in local storage; FINALLY WORKING, horrah!! :)

let boxes = document.getElementsByClassName('checkboxx').length;

function save() {	
  for(let x = 1; x <= boxes; x++){
	  var checkbox = document.getElementById(String(x));
    localStorage.setItem(String(x), checkbox.checked);	
  }
}

//for loading
for(let x = 1; x <= boxes; x++){
  if(localStorage.length > 0){
    var checked = JSON.parse(localStorage.getItem(String(x)));
    document.getElementById(String(x)).checked = checked;
  }
}
window.addEventListener('change', save);

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//Revise ListDB data based on user inPUT
$("#update").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value'] //name is for the value name as in name="" in the html as it determines what database value will display
    })


    var request = {
        "url" : `http://localhost:3000/api/ListDB/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

//Delete //prior attempt that was not working--
// const deleteButton = document.querySelectorAll(".delete")

// deleteButton.forEach((button, i)=>{
//     button.addEventListener("click", ()=>{
//         const endPoint =`/${button.classList[1]}`
//         console.log(endPoint)
//     })
// })



// Delete ListDB data based on user click
if(window.location.pathname == "/"){
    $ondelete = $(".delete"); //HERE WE ARE FINDING THE ELEMENT WITH THE CLASS DELETE AND SAVING IT AS $ONDELETE TO USE LATER
    $ondelete.click(function(){ //HERE WE ARE ACCESSING THE ELEMENT W/ CLASS DELETE AND SAVING IT'S ATTR "DATA-ID" AS A VALUE IN THE ID VAR
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/ListDB/${id}`, //passing the request along to our delete method
            "method" : "DELETE"
        }

        // if(confirm("Do you really want to delete this?")){
            $.ajax(request).done(function(response){
                // alert("Data Deleted Successfully!");
                location.reload();
            })

    })
}

// Delete ALL ListDB data based on user click
if(window.location.pathname == "/"){
    $ondeleteall = $(".delete-all-data");
    $ondeleteall.click(function(){

       var request = {                                        //with no specified id, everything will be deleted
            "url" : `http://localhost:3000/api/ListDB`, //passing the request along to our deleteAll method
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete everything?")){
            $.ajax(request).done(function(response){
                alert("All Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

//redirect user after submitting editted data
document.getElementById("edit-button").onclick = () => {
    window.location.href = "/";
}