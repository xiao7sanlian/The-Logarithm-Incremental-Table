addLayer("1layer small", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['x'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("x", {
    name: "x", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "x", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        dt: n(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "x", // Name of prestige currency
    resourceEN: "x", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "points", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        let z = buyableEffect('x', 13)
        let y = z.add(buyableEffect('x', 12))
        player.x.points=y.times(buyableEffect('x', 61).add(1)).add(buyableEffect('x', 11)).add(1)
        player.x.dt=n(1).add(buyableEffect('x', 51))
        player.x.dt=player.x.dt.add(buyableEffect('x', 52))
    },
    upgrades: {
        11: {
            title: "XU1 x",
            description: "解锁变量x可购买",
            cost:function(){return new Decimal("0")},
            unlocked(){return true}
        },
        12: {
            title: "XU2 y",
            description: "解锁变量y可购买",
            cost:function(){return new Decimal("80")},
            unlocked(){return n(getBuyableAmount('x', 11)).gte(100)}
        },
        13: {
            title: "XU3 z",
            description: "解锁变量z可购买",
            cost:function(){return new Decimal("150")},
            unlocked(){return player.x.points.gte(145)}
        },
        51: {
            title: "XU17 dt",
            description: "解锁dt可购买",
            cost:function(){return new Decimal("120")},
            unlocked(){return player.x.points.gte(100)}
        },
        52: {
            title: "XU18 dt<sub>2</sub>",
            description: "解锁第二个dt可购买",
            cost:function(){return new Decimal("140")},
            unlocked(){return player.x.points.gte(120)}
        },
        61: {
            title: "XU21 y乘倍数",
            description: "解锁y乘倍数可购买",
            cost:function(){return new Decimal("170")},
            unlocked(){return player.x.points.gte(160)}
        },
        101: {
            title: "XU37 转生",
            description: "解锁转生功能",
            cost:function(){return new Decimal("1600")},
            unlocked(){return getPointGen().gte(10)}
        },
    },
    buyables: {
        11: {
            numexp() {
                a = n(getBuyableAmount(this.layer, this.id)).div(25)
                if (a.gte(3)) a = n(3)
                    return a
            },
            effect() {return n(2).pow(this.numexp()).times(getBuyableAmount(this.layer, this.id)).times(0.1)},
            title() {return "x=1+"+format(buyableEffect('x', 61).add(1))+"y+2"+quickSUP(format(this.numexp()))+"×"+format(n(getBuyableAmount(this.layer, this.id)).times(0.1))},
            cost(x) { return new Decimal(1) },
            purchaseLimit: n(100),
            display() { return '花费：'+this.cost()+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 11)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            numexp() {
                a = n(getBuyableAmount(this.layer, this.id)).div(25)
                if (a.gte(100)) a = n(100)
                    return a
            },
            effect() {return n(2).pow(this.numexp()).times(getBuyableAmount(this.layer, this.id))},
            title() {return "y=z+2"+quickSUP(format(this.numexp()))+"×"+format(n(getBuyableAmount(this.layer, this.id)))},
            cost(x) { return n(10).times(x).add(10) },
            display() { return '花费：'+this.cost()+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 12)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            numexp() {
                a = n(getBuyableAmount(this.layer, this.id)).div(25)
                if (a.gte(100)) a = n(100)
                    return a
            },
            effect() {return n(2).pow(this.numexp()).times(getBuyableAmount(this.layer, this.id))},
            title() {return "z=s+2"+quickSUP(format(this.numexp()))+"×"+format(n(getBuyableAmount(this.layer, this.id)))},
            cost(x) { return n(25).times(x).add(100) },
            display() { return '花费：'+this.cost()+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 13)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        51: {
            effect() {return n(0.01).times(getBuyableAmount(this.layer, this.id))},
            title() {return "dt↑0.01"},
            cost(x) { return n(10) },
            purchaseLimit: n(100),
            display() { return '花费：'+this.cost()+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 51)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        52: {
            effect() {return n(1).times(getBuyableAmount(this.layer, this.id))},
            title() {return "dt↑1"},
            cost(x) { return n(20).times(x).add(80) },
            display() { return '花费：'+this.cost()+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 52)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        61: {
            effect() {return n(1).times(getBuyableAmount(this.layer, this.id))},
            title() {return "y乘倍数↑1"},
            cost(x) { return n(1.05).pow(x).times(250) },
            display() { return '花费：'+format(this.cost())+"<br>等级："+getBuyableAmount(this.layer, this.id) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return hasUpgrade('x', 61)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //{key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        //"main-display",
        "prestige-button",
        ["display-text", function() { return 'f(t)获取公式：f(t+dt)=f(t)+ln(bxdt)' }],
        "upgrades",
        "buyables",
    ],
})