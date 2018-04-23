/**
 * This simple class works to fix some css issues with displaying long page text
 */

$(function() {
    console.log("edit.js loaded");
    /**
     * This function is a bit of a brute force to manipulate modal data
     */
    $(document).click(function(e){
        var clickElement = e.target;  // get the dom element clicked.
        var elementClassName = e.target.className.toString();  // get the classname of the element clicked
        var clickElement2 = clickElement.parentElement;
        var clickElement2Name = clickElement2.id.toString();
        if(elementClassName == "btn btn-lg btn-primary" && (clickElement2Name == "updateForm" || clickElement2Name == "updateForm2" || clickElement2Name == "updateForm3")){
            if (clickElement2Name == "updateForm"){
                var updated;
                setTimeout(function () {
                    //Get update Status
                    updated = $('#updateStatus').text();
                    //console.log("Status: " + updated);
                    //If updated
                    if (updated == "true") {
                        //Reset the form
                        $("#updateForm")[0].reset();
                        //Hide the modal
                        $('#myModal').modal('hide');
                    }
                    //If not updated
                    else {
                        $("#updateForm")[0].reset();
                        console.log("leave modal alone")
                    }
                }, 100);
            }
            else if(clickElement2Name == "updateForm2") {
                var updated2;
                setTimeout(function () {
                    //Get update Status
                    updated2 = $('#updateStatus2').text();
                    //console.log("Status: " + updated2);
                    //If updated
                    if (updated2 == "true") {
                        //Reset the form
                        $("#updateForm2")[0].reset();
                        //Hide the modal
                        $('#myModal2').modal('hide');
                    }
                    //If not updated
                    else {
                        $("#updateForm2")[0].reset();
                        //console.log("leave modal alone")
                    }
                }, 100);
            }
            else if(clickElement2Name == "updateForm3"){
                var updated3;
                setTimeout(function () {
                    //Get update Status
                    updated3 = $('#updateStatus3').text();
                    //console.log("Status: " + updated3);
                    //If updated
                    if (updated3 == "true") {
                        //Reset the form
                        $("#updateForm3")[0].reset();
                        //Hide the modal
                        $('#myModal3').modal('hide');
                    }
                    //If not updated
                    else {
                        $("#updateForm3")[0].reset();
                        //console.log("leave modal alone")
                    }
                }, 100);
            }
            else{
                //Do nothing
                //console.log("Huh? Something went wrong @ "+whatClicked + " whose parent is " + whatClickedParent)
            }
        }
    });
    $(document).ready(function() {
        $('#leaderBoardTable').DataTable({
            "paging":   false,
            "info":     false,
            "filter": false,
            "empty": false
        });
    } );
});