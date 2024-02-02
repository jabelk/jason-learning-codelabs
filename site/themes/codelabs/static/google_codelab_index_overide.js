const cards = document.querySelectorAll('.card');

cards.forEach(cardCategoryIcons);

function cardCategoryIcons(card, index, array) {
    var categories = card.getAttribute('categories').split(",") || [];

    const footer = card.querySelectorAll('.card-footer')[0];
    const footer_a = footer.querySelectorAll('a')[0]

    categories.forEach(function (a) {
        var logo_span = document.createElement("span");
        logo_span.className = a.toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-").trim() + "-icon";
        logo_span.title = a;
        footer.insertBefore(logo_span, footer_a);
    });
}
