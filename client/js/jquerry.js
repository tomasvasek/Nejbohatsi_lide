$(function(){
    /* Získá všechny záznamy z bohaci.json prostřednictvím AJAX požadavku */
    function getAll() {
        $.ajax({
            url: 'http://localhost:3000/api/bohaci',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#list').html('');
                data.forEach(function(bohac) {
                    $('#list').append('<tr><td>'+bohac.id
                        +'</td><td><a href="#" data-id="'+bohac.id+'">'+bohac.name
                        +'</a></td><td>'+bohac.majetek+'</td><td>'+bohac.kontinent+'</td><td><button class="btn btn-danger delete" data-id="'+bohac.id+'">Smazat</button></td></tr>');
                });
                $('#list a').on('click', function(){
                    getById($(this).data('id'));
                }); 
                $('.delete').on('click', function(){
                    deleteById($(this).data('id'));
                }); 
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Získá jeden záznam podle id */
    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/bohaci/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#id').val(data.id);
                $('#name').val(data.name);
                $('#majetek').val(data.majetek);
                $('#kontinent').val(data.kontinent);
                $('#modelId').modal('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Smazat záznam podle id */
    function deleteById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/bohaci/' + id,
            type: 'DELETE',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Vytvořit nový záznam */
    function create(data) {
        $.ajax({
            url: 'http://localhost:3000/api/bohaci',
            type: 'POST',
            data: data,
            dataType: 'json',            
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    /* Editovat záznam */
    function update(id, data) {
        $.ajax({
            url: 'http://localhost:3000/api/bohaci/' + id,
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    $('button#submit').on('click', function(){
        var json = {};
        json.name = $('#name').val();
        json.majetek = $('#majetek').val();
        json.kontinent = $('#kontinent').val();
        var data = JSON.stringify(json);
        if ($('#id').val()) {
            update($('#id').val(), data);
        } else {
            create(data);
        }
    });

    $('button#create').on('click', function(){
        $('#id').val('');
        $('#name').val('');
        $('#majetek').val('');
        $('#kontinent').val('');
    });

    getAll();
});
    
