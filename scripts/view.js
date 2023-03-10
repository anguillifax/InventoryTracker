"use strict"

/**
 * Defines the properties of an Item object
 * @typedef {Object} Item
 * @property {string} name
 * @property {?string} subtitle
 * @property {string} description
 * @property {number} count
 * @property {Object} location Reference to location object describing object location
 * @property {Set} tags set of tags for item (does not include condition)
 * @property {string} imageThumbnail
 * @property {string} imageFull
 * @property {string} condition
 */

/**
 * @param {Item[]} items A list of items to display in the database section of the website
 */
function renderItems(items) {
    const database = $('#database')
    database.find('.item').remove();

	database.masonry({
		itemSelector: '.item',
		columnWidth: '#database-sizer',
        gutter: 10,
        fitWidth: true,
	});

    let itemsHTML = "";
    for (const item of items) {
        itemsHTML += getItemHTML(item);
        // const itemElement = $(getItemHTML(item));
        // database.append(itemElement);
    }

	var element = $(itemsHTML);
    // layout Masonry after each images loaded
    database.append(element).masonry('appended', element);
    database.imagesLoaded().progress( function() {
        database.masonry();
    }); 

    // var database = $("#grid").masonry({
    //     itemSelector: ".item",
    //     columnWidth: "#grid-sizer",
    //     percentPosition: true
    // });
    // // database.find(".item").remove();

    // // Set masonry Layout
    // // database.masonry({
    // //     itemSelector: ".item",
    // //     columnWidth: "#database-sizer",
    // //     percentPosition: true
    // // });

    // let itemsHTML = "";
    // for (const item of items) {
    //     itemsHTML += getItemHTML(item);
    //     // const itemElement = $(getItemHTML(item));
    //     // database.append(itemElement);
    // }

    // var itemElements = $('<div class="grid-item">Added</div><div class="grid-item">Added</div>');
    // database.append(itemElements).masonry('appended', itemElements);

    // database.append(itemElements).masonry('appended', itemElements);
    updateItemCount(items.length);
}

/**
 * @param {string[]} tags A list of already sorted search tags to display in the search bar header
 */
function renderSearchTags(tags) {
    const searchTagsLocation = $(".tag-filter-list");
    searchTagsLocation.empty()
    for (let tag of tags) {
        searchTagsLocation.append(getSearchTagHTML(tag));
    }
}


function renderSearchFilter(selectId, options) {
    const select = $(selectId);
    select.empty();
    select.append(getDefaultOptionHTML());
    for (let option of options) {
        select.append(getOptionHTML(option));
    }
}

/**
 * @param {Item}
 * @return {string} The HTML that displays an item in the database
 */
function getItemHTML(item) {
    const title = item.name;
    const subtitle = item.subtitle;
    const description = item.description;

    const imgPathFull = item.imageFull;
    const imgPathShort = item.imageThumbnail;

    const locName = item.location.displayName;
    const locTooltip = item.location.description;
    const locImg = item.location.photo;
    const locHref = locImg ? `href=\"${locImg}\"` : "";
    
    const count = item.count === "" ? "" : "x" + item.count;
    const tagsList = [item.condition].concat(Array.from(item.tags).sort());

    let tagsHtml = "";
    tagsList.forEach(tagName => { tagsHtml += `<li>${tagName}</li>`; });

    return `
        <div class="item">
            <header class="item-header">
                <h1>${title}</h1>
                <p>${subtitle}</p>
            </header>

            <div class="item-wrap">
                <section class="item-description">
                    <p>${description}</p>
                </section>

                <section class="item-image">
                    <a href="${imgPathFull}" target="_blank">
                        <img src="${imgPathShort}" alt="${title}">
                    </a>
                </section>

                <section class="item-tags">
                    <ul>${tagsHtml}</ul>
                </section>

                <section class="item-location">
                    <a ${locHref} title=\"${locTooltip}\" target="_blank">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${locName}</span>
                    </a>
                </section>

                <section class="item-count">
                    <p>${count}</p>
                </section>

                <div class="clearfix"></div>
            </div>
        </div>`;
}


/**
 * @param {Item}
 * @return {string} The HTML that displays an item in the database for a list view
 */
function getListItemHTML(item) {

}


/**
 * @param {string} tagName The name of the tag to display
 * @return {string} The HTML of the tag to display
 */
function getSearchTagHTML(tagName) {
    const tagId = "tag-" + tagName
    return `
        <div class="tag">
            <input hidden type="checkbox" name="${tagName}" id="${tagId}"/>
            <p>${tagName}</p>
        </div>`;
}


function getOptionHTML(option) {
    return `
        <option value="${option.name}">${option.name}</option>
        `
}

function getDefaultOptionHTML() {
    return "<option selected value='any'>-- Any --</option>";
}


/** 
 * Updates the item count display to the given number
 * @param {int} numItems the number of items that are currently displayed in the database
 */
function updateItemCount(numItems) {
    document.getElementsByClassName("total-count-number")[0].textContent = numItems;
    $(`#content-tooltip p`).text(`${numItems} result${numItems != 1 ? "s" : ""}`);
}


 
