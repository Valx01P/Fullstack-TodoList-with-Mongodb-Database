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

//Delete //not working--
// const deleteButton = document.querySelectorAll(".delete")

// deleteButton.forEach((button, i)=>{
//     button.addEventListener("click", ()=>{
//         const endPoint =`/${button.classList[1]}`
//         console.log(endPoint)
//     })
// })



// Delete ListDB data based on user click
if(window.location.pathname == "/"){
    $ondelete = $(".list-container tr a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/ListDB/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

//redirect user after submitting editted data
document.getElementById("edit-button").onclick = () => {
    window.location.href = "/";
}
