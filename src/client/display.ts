function displayData(data: Common.Api) {

    // Update document.title
    document.title = data.title || "";

    // Set title
    $("#title").text(data.title || "").fadeIn(250);

    // Set character display
    {

        let $character = $("#character");

        // A character was sent
        if (data.character) {

            // Set link
            $character.attr("href", `/character/${data.character.id}`);

            // Set data
            $character.find(".name").text(data.character.name);
            $character.find(".progress-fill").css("width", data.character.levelProgress + "%");
            $character.find(".level").text(`Poziom ${data.character.level}`);
            $character.find(".xp-left").text(`${data.character.xpLeft} XP`)
                .toggle(!data.character.levelUp);
            $character.find(".level-up").toggle(!!data.character.levelUp);

            // Display if a character is set
            $character.fadeIn(250);

        }

        // Character was unset
        else if (data.character === null) {

            // Hide it
            $character.fadeOut(250);

        }

    }

    // Set progress display
    $("#nav-progress").css("width", `${data.progress * 100}%`);

    // Hide text
    {

        // Set the text
        let $text = $("#text").text(data.text || "");

        // Add linebreaks to it
        $text.html($text.html().replace(/\n/g, "<br />"));

        // Fade in
        if (data.text) $text.fadeIn(250);

    }

    // Set error text
    {

        let $error = $("#error");

        $error.text(data.error || "");

        // Add linebreaks to it
        $error.html($error.html().replace("\n", "<br />"));

        // Show
        if (data.error) $("#error").fadeIn(250);

    }

    // Inputs
    {

        // Empty the list
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

        // Add the submit button
        if (data.inputs?.length) {

            $("<input>")
                .attr("type", "submit")
                .attr("value", "OK")
                .appendTo($inputs);

        }

        // Fade in
        if (data.inputs?.length) $inputs.fadeIn(250);

    }

    // New action list
    if (!data.updateActions) {

        // Empty the action list
        let $actions = $("#actions").empty();

        // Add actions – each section
        for (let section of data.actions || []) {

            // Add a div to the action list
            let $div = $("<div />").appendTo($actions);

            // Iterate on the section
            for (let item of section) {

                // Item is an array
                if (item instanceof Array) {

                    // Create the column div
                    let $row = $("<div />")
                        .addClass("column")
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

        // Fade in the new list
        $actions.fadeIn(250);

    } else {

        // Update the actions
        for (let itemData of data.updateActions) {

            let $item = $(`#${itemData.id}`);

            // Update it
            makeLink($item, itemData, true);

            // Fade it in
            $item.fadeIn(250);

        }

    }

    function display() {



    }

    // Make the separator visible if both the form and actions are visible
    $("#inputs-actions-separator").toggle(!!(
        data.inputs && data.inputs.length &&
        data.actions && data.actions.length
    ));

}
