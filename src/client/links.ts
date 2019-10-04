function makeLink(parent: JQuery, link: Common.ActionLink) {

    let $item;

    // Given a link
    if (link.url) {

        // Create the link
        $item = $("<a>").attr("href", link.url);

    } else {

        // Create as a normal span otherwise
        $item = $("<span>");

    }

    // If it's inline
    if (link.inline) {

        // Add the .inline class
        $item.addClass("inline");

    }

    return $item

        // Add text
        .text(link.text)

        // Append to parent
        .appendTo(parent);

}

function getLink(event: JQuery.ClickEvent, target: any = event.currentTarget) {

    // Get the target
    let $target = $(target);

    // Get the link
    let url = $target.attr(
        $target.prop("tagName") === "form" ? "action" : "href"
    ) || "";

    // If this is an external link
    if (/^\w+:/.test(url)) {

        // Ignore it
        return false;

    }

    // Don't open the link otherwise
    event.preventDefault();

    // Check if the URL is absolute
    let absolute = /^\//.test(url);

    // If it's a relative link
    if (!absolute) {

        // Add the window URL to it
        url = location.pathname + url;

    }

    return url;

}
