/// <reference path="../../out/Common/Api.d.ts" />

$(() => {

    // Listen to link clicks
    $(document).on("click", "a[href]", event => {

        let url = getLink(event);
        if (!url) return;

        // Open the URL via API
        apiRequest(url);

        // Push state
        history.pushState({}, "Sargonia", url);

    });

    $(document).on("click", "form button, form input[type=\"submit\"]", event => {

        let $target = $(event.target);
        let $form = $target.closest("form");
        let url = getLink(event, $form);
        if (!url) return;

        // Send request
        apiRequest(url, {

            // A POST request
            method: "post",

            // With the data in the form
            data: $form.serialize(),

        });

        // Push state
        history.pushState({}, "Sargonia", url);

    });

    $(window).on("popstate", event => {

        // Request the page
        apiRequest(location.pathname);

    });

});

function apiRequest(url: string, options: JQueryAjaxSettings = {}) {

    $.ajax("/api" + url, {

        success: loadData,
        ...options

    });

}

function loadData(data: Common.Api) {

    // Update the current history state
    history.replaceState(
        {}, "Sargonia" + (data.title ? ` – ${data.title}` : ""),
        data.redirect || location.href
    );

    // Create the synchronizer
    type Names = "title" | "text" | "error";
    let $compare = $("#title, #text, #error");
    let $queue = $("#inputs");

    $compare.each((item, el) => {

        let $el = $(el);

        // Check if the data changed
        if ($el.text() !== data[<Names>$el.attr("id")!]?.replace("\n", "")) {

            // If so, add to the queue
            $queue = $queue.add($el);

        }

    });

    // Actions were updated
    if (data.updateActions) {

        // For each updated action
        for (let item of data.updateActions) {

            // Fade it out
            $queue = $queue.add(`#${item.id}`);

        }

    }

    // Otherwise, simply add them to the callback
    else $queue = $queue.add("#actions");

    // Fade out everything
    $queue.fadeOut(250)

        // Wait until every animation has completed
        .promise().done(() => displayData(data));

}
