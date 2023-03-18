$(document).ready(() => {

  $("#delete-tipos").on('click',function(e){
    e.preventDefault();   
    if(confirm("Estas seguro que deseas eliminar este tipo de pokemon?")){
        $("#form-delete-tipos").submit();
    }
  });
});
