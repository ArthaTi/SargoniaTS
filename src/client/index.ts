/// <reference path="../../out/common/Api.d.ts" />

$(() => {

    // Listen to link clicks
    $(document).on("click", "a[href]", event => {

        // Get the link
        let url = $(event.target).attr("href")!;

        // If this is an external link
        if (/^\w+:/.test(url)) {

            // Ignore it
            return;

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

        // Open the URL via API
        apiRequest(url);

        // Push state
        history.pushState({}, "Sargonia", url);

    });

    $(window).on("popstate", event => {

        // Request the page
        apiRequest(location.pathname);

    });

});

function apiRequest(url: string) {

    $.get("/api" + url, displayData);

}

function displayData(data: Common.Api) {

    // Set title
    $("#title").text(data.title || "");

    // Update document.title
    document.title = data.title || "";

    // Set text
    let $text = $("#text").text(data.text || "");

    // Add linebreaks to it
    $text.html($text.html().replace("\n", "<br />"));

    let $inputs = $("#inputs").empty();

    // Add each of new inputs
    for (let input of data.inputs || []) {

        // Create the label
        $("<label />")

            //  Set text
            .text(input.label || "")

            // Append field
            .append(

                $("<input />")

                    // Set attributes
                    .attr("name", input.name)
                    .attr("type", input.type || "text")

            )

            // Add to field list
            .appendTo($inputs);

    }

    // Add submit button
    if (data.inputs && data.inputs.length) {

        $("<input>")
            .attr("type", "submit")
            .attr("value", "OK")
            .appendTo($inputs);

    }

    // Clear actions
    let $actions = $("#actions").empty();

    // Add actions – each section
    for (let section of data.actions || []) {

        // Add a div to the action list
        let $div = $("<div />").appendTo($actions);

        // Iterate on the section
        for (let item of section) {

            // Item is an array
            if (item instanceof Array) {

                // Create the row div
                let $row = $("<div />")
                    .addClass("row")
                    .appendTo($div);

                // Map each link and wrap in a div
                for (let link of item) {

                    makeLink($row, link);

                }

            } else {

                // Return the link plain
                makeLink($div, item);

            }

        }

    }

    // Make the separator visible if both the form and actions are visible
    $("#inputs-actions-separator").toggle(
        data.inputs && data.inputs.length &&
        data.actions && data.actions.length
    );

}

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
