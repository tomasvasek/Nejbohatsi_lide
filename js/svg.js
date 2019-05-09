$(function(){
    $('h2').text('Mapa světa');
    $('.objekt').attr({'style':'fill:rgba(0,0,0,0.3);'});

    $('.objekt').on('click',function(){
        $('.objekt').attr({'style':'fill:rgba(0,0,0,0.3);'});
        $(this).attr({'style':'fill:rgba(0,0,0,0.5);stroke:black'});
        $('#text h2').text($(this).data('nazev'));
        $('#text img').attr('src',$(this).data('img'));
    })
})