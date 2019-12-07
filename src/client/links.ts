/// <reference path="../../out/Common/ActionResponse.d.ts" />

/**
 * @param $parent The parent item, or if `update` was provided, the item to update.
 * @param link Data about the item received from the API.
 * @param update If true, update the `$parent` with the data instead of adding the link to it.
 */
function makeLink($parent: JQuery, link: Common.ActionLink, update = false) {

    let $item;

    // Given a link
    if (link.url && (!update || $parent.prop("tagName") !== "A")) {

        // Create the link
        $item = $("<a>").attr("href", link.url);

    }

    // Given a text item
    else if (!update || $parent?.prop("tagName") !== "SPAN") {

        // Create as a normal span otherwise
        $item = $("<span>");

    }

    // Item didn't change its type
    else {

        // Just use the previous
        $item = $parent;

        // Clear all classes
        $item.removeAttr("class");

    }

    // Add classes
    $item.toggleClass("inline", !!link.inline);
    $item.toggleClass("header", !!link.header);
    $item.toggleClass("progress-bar", link.progress !== undefined);

    // Add text to the item
    $item.text(link.text);

    // Add progress bar
    if (link.progress !== undefined) {

        let $progress = $item.find(".progress-fill");

        // Didn't find the item
        if (!$progress.length) {

            // Add it
            $progress = $("<span>").addClass("progress-fill").appendTo($item);

        }

        // Set width
        $progress.css("width", link.progress * 100 + "%");

    }

    // Remove the progress bar
    else {

        $item.find(".progress-fill").remove();

    }

    // Used a new item
    if (!update) {

        // Append to parent
        $item.appendTo($parent);

    }

    // Replaced an existing item
    else if ($parent !== $item) {

        // Replace it in DOM
        $parent.replaceWith($item);

    }

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
