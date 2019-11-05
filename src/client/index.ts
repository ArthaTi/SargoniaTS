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

        success: displayData,
        ...options

    });

}

function displayData(data: Common.Api) {

    // Update the current history state
    history.replaceState(
        {}, "Sargonia" + (data.title ? ` – ${data.title}` : ""),
        data.redirect || location.href
    );

    // Set title
    {

        $("#title").text(data.title || "");

        // Update document.title
        document.title = data.title || "";

    }

    // Set character display
    {

        let $character = $("#character");

        // A character was sent
        if (data.character) {

            // Display if a character is set
            $character.show();

            // Set link
            $character.attr("href", `/character/${data.character.id}`);

            // Set data
            $character.find(".name").text(data.character.name);
            $character.find(".progress-fill").css("width", data.character.levelProgress + "%");
            $character.find(".level").text(`Poziom ${data.character.level}`);
            $character.find(".xp-left").text(`${data.character.xpLeft} XP`)
                .toggle(!data.character.levelUp);
            $character.find(".level-up").toggle(!!data.character.levelUp);

        }

        // Character was unset
        else if (data.character === null) {

            // Hide it
            $character.hide();

        }

    }

    // Set progress display
    $("#nav-progress").css("width", `${data.progress * 100}%`);

    // Change context
    $("#content").fadeOut(500, () => {

        // Set text
        {

            let $text = $("#text").text(data.text || "");
            $("#text").toggle(!!data.text);

            // Add linebreaks to it
            $text.html($text.html().replace("\n", "<br />"));

        }

        // Set error text
        {

            let $error = $("#error").text(data.error || "");
            $("#error").toggle(!!data.error);

            // Add linebreaks to it
            $error.html($error.html().replace("\n", "<br />"));

        }

        // Clear inputs
        {

            let $inputs = $("#inputs").empty();
            $("#inputs").toggle(!!data.inputs && !!data.inputs.length);

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

        }

        // Clear actions
        {

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
            $("#inputs-actions-separator").toggle(!!(
                data.inputs && data.inputs.length &&
                data.actions && data.actions.length
            ));

        }

        $("#content").fadeIn(250);

    });

}
