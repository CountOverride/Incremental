var events = [
    {
        "condition": function () { return true; },
        "run_event": function () {
            /* Gain 15s of bank raw money production + 10 money for those with few banks*/
            var money_gain = buildings["bank"].amount * buildings["bank"].generation["money"] * 15 + 10;
            resources["money"].amount += money_gain;
            var investment_types = ["gold", "beer", "uranium", "bread", "rugs", "beds", "wool", "toothpicks", "cookies", "toothpaste", "salad"];
            var invested_in = investment_types[Math.floor(Math.random() * investment_types.length)];
            $("#events_content").html("Investing in " + invested_in + " paid off! <br />You gained " + money_gain.toString() + " money from that sweet deal!");
        },
        "name": "Stock Investments Pay Off!",
        "rejection": 0,
    }
];
function handle_event() {
    setTimeout(handle_event, 2 * 6000 + Math.random() * 6000 * 2);
    /* Must have some mana to get events */
    if (buildings["s_manastone"].amount < 1) {
        return;
    }
    /* Only start a new event if the old one finished. */
    if ($("#events").hasClass("hidden")) {
        /* Check which events can even show up */
        var valid_events_1 = [];
        events.forEach(function (e) {
            if (e.condition()) {
                valid_events_1.push(e);
            }
        });
        /* No possible events. How sad. */
        if (!valid_events_1.length) {
            return;
        }
        /* Choose random valid event */
        var chosen_event = valid_events_1[Math.floor(Math.random() * valid_events_1.length)];
        /* Keep choosing until we get an event that rolls true. This lets us make some events more likely than others */
        while (chosen_event.rejection > Math.random()) {
            chosen_event = valid_events_1[Math.floor(Math.random() * valid_events_1.length)];
        }
        /* Set name */
        $("#events_topbar").html(chosen_event.name);
        /* Run event function */
        chosen_event.run_event();
        /* Only show our event box when we're done */
        $("#events").removeClass("hidden");
    }
}
//# sourceMappingURL=events.js.map