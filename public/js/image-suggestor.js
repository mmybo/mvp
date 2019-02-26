$(document).ready(function () {

    const IMAGE_CONTAINER_ID = "image-selector";

    $('#product-title').change(function () {
        getImageLinks($(this).val()).then(renderImageSelector);
    });

    function getImageLinks(text) {
        return fetch('/suggestedImages', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        }).then(res => {
            return res.json()
        }).then(json => {
            return json.links;
        });
    }

    function renderImageSelector(links) {
        let template = '<div class="row">';
        links.forEach((link, index) => {
            if ((index + 1) % 4 == 0)
                template += `</div><div class="row">`;
            template += `<div class="col">
                                <img src="${link}" alt="">
                        </div>`;
        });
        template += '</div>';

        $(`#${IMAGE_CONTAINER_ID}`).html(template);
        $(`#${IMAGE_CONTAINER_ID} img`).click(setImageValue);
    }

    function setImageValue() {
        $(`#${IMAGE_CONTAINER_ID} img`).css('outline', 'none');
        $(this).css('outline', '2px solid #f00');
        $('#product-image-input').val($(this).prop('src'));
    }

});

