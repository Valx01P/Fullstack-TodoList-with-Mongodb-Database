//on/off/ switching; yes there are better ways to write this, "W.E.T." I know, 
//but figuring it out will take me longer than copy and pasting my own code lmao
$("#pending").click(function(){
        $("#pending").addClass("clicked");
        $("#pending").removeClass("unclicked");
        $("#all").removeClass("clicked");
        $("#all").addClass("unclicked");
        $("#completed").removeClass("clicked");
        $("#completed").addClass("unclicked");
    });

$("#completed").click(function(){
        $("#completed").addClass("clicked");
        $("#completed").removeClass("unclicked");
        $("#all").removeClass("clicked");
        $("#all").addClass("unclicked");
        $("#pending").removeClass("clicked");
        $("#pending").addClass("unclicked");
    });

$("#all").click(function(){
        $("#all").addClass("clicked");
        $("#all").removeClass("unclicked");
        $("#pending").removeClass("clicked");
        $("#pending").addClass("unclicked");
        $("#completed").removeClass("clicked");
        $("#completed").addClass("unclicked");
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

//check and unchecked list items category buttons
$(".checkboxx").change(function(){
    if($(this).is(":checked")) {
        $(this).addClass("checked");
    } else {
        $(this).removeClass("checked");
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


//misc. code ideas for adding features vvv

// $('#checkboxx').click(function() {
//     if (this.checked) {
//         $(this).addClass('selected');
//     } else {
//         $(this).removeClass('selected');
//     }
// });





// function check() {
//     if(document.getElementsByClassName("checkbox").checked = true) {
//         $(".checkbox").classList.add("checked")
//     }

// }

// function uncheck() {
//     document.getElementsByClassName("checkbox").checked = false;
// }