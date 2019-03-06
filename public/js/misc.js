$(document).ready(function () {

    /* Takes dates and formats them to look like '2 days ago' */
    $('.format-timefrom').each(function () {
        const timeCreated = $(this).text()
            , formatted = moment(timeCreated).fromNow();

        $(this).text(formatted);
    });

});