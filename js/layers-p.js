addLayer("2layer small", {// Add a * small* to generate a slightly different layer
    name: "sideLayer2",
    position: -1,
    row: 2,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 2 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 2 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['p'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "转生", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "转生", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(1),
        db: n(1),
    }},
    color: "#31bdc4",
    requires() {return new Decimal(1000).div(n(2).pow(1.25))}, // Can be a function that takes requirement increases into account
    resource: "b", // Name of prestige currency
    resourceEN: "b", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "f(x)", // Name of resource prestige is based on
    baseResourceEN: "f(x)", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "转生以获得 ",
    update(diff) {
        if (hasUpgrade('x', 101)) player.p.unlocked = true
        player.p.db=player.points.div(1000).pow(0.8)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //{key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('x', 101)||player.p.unlocked},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
    ],
})