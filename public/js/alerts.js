$(document).ready(function () {
    checkForError(window.location.href);
    checkForSuccess(window.location.href);
});

function checkForSuccess(link) {
    if (link.indexOf('success') > -1) {
        const msg = link.slice(link.indexOf('success') + 8);
        $('.alert-success').text(decodeURIComponent(msg));
        $('.alert-success').toggleClass('d-none')
        setTimeout(() => {
            $('.alert-success').toggleClass('d-none')
        }, 4000);
    }
}

function checkForError(link) {
    if (link.indexOf('error') > -1) {
        const msg = link.slice(link.indexOf('error') + 6);
        $('.alert-danger').text(decodeURIComponent(msg));
        $('.alert-danger').toggleClass('d-none');
        // setTimeout(() => { $('.alert-danger').hide() }, 4000);
    }
}