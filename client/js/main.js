$(function () {
    $('#top p').hide();
    $('#top h4').on('click', function () {
        if ($(this).nextUntil('h4').is(':hidden')) {
            $(this).css({ 'background-color': '#0014' });
        } else {
            $(this).css({ 'background-color': '#444' });
        }
        $(this).nextUntil('h4').toggle(500);
    });

    function zmenaTextu(i) {
        $('#zajimavosti h4').text(zajimavosti[i].title);
        $('#zajimavosti p').text(zajimavosti[i].text);
    }

    var a = 0;
    zmenaTextu(a);
    $('#zajimavosti .btn-success').on('click', function () {
        a < zajimavosti.length - 1 ? a++ : a = 0;
        zmenaTextu(a);
    })

    var i = 0;
    window.setInterval(function () {
        $('#cesko img').attr('src', 'img/' + cesko[i].photo);
        $('#cesko figcaption').text(cesko[i].name);
        i < cesko.length - 1 ? i++ : i = 0;
    }, 3000);

    var kviz = $('#kviz div.row');
    bohaci.forEach(function (obj, idx) {
        console.log(obj.photo);
        kviz.append('<div class="col-sm-4"><figure id="' + idx + '"><img src="img/nic.jpg" alt="nic"><figcaption>'
            + obj.name + '</figcaption></figure></div>');
    });

    var photo = $('#kviz img');
    photo.on('click', function () {
        var index = Math.floor(Math.random() * bohaci.length);
        $(this).attr('src', 'img/' + bohaci[index].photo)
            .attr('alt', bohaci[index].name);
    });

    var check = $('#kviz .btn-success').on('click', function () {
        $('#kviz figure').each(function (idx, obj) {
            var figcaption = $(obj).find('figcaption').text();
            var alt = $(obj).find('img').attr('alt');
            if (figcaption == alt) {
                $(obj).find('img').css({ 'border': '2px solid green' });
            } else {
                $(obj).find('img').css({ 'border': '2px solid red' });
            }
        });
    });
})
