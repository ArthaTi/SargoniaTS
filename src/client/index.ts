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

        // TODO: Add push/pop state events

        // Check if the URL is absolute
        let absolute = /^\//.test(url);

        // If it's a relative link
        if (!absolute) {

            // Add the window URL to it
            url = location.pathname + url;

        }

        // Open the URL via API
        $.get("/api" + url, data => {

            console.log(typeof data, data);

        });

    });

});

function displayData(data: Common.Api) {

    

}
