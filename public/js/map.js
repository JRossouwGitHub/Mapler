const canvas = document.getElementById("chartdiv");

am5.ready(function() {
                
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");
    const responsive = am5themes_Responsive.new(root);

    responsive.addRule({
        relevant: am5themes_Responsive.widthXXL,
        applying: function() {
            series.setAll({
                maxRadius: 12,
                minRadius: 6
            });
        },
        removing: function() {
            series.setAll({
                maxRadius: 50,
                minRadius: 25
            });
        },
    });
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root),
        responsive
    ]);
    
    var data = {
        name: "Root",
        value: 0,
        color: am5.color(0xff0000),
        children: [
        {
            name: "SSQ",
            category: "Hide-Out",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
            color: am5.color(0xff0000),
            children: [
                {
                    name: "Thetford",
                    category: "City",
                    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
                    timer: {
                        enabled: false,
                        time: {
                            h: "(1h",
                            m: "30m)"
                        }
                    },
                    color: am5.color(0x9000ff),
                    children: [],
                },
                {
                    name: "Martlock",
                    category: "City",
                    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
                    timer: {
                        enabled: false,
                        time: {
                            h: "(2h",
                            m: "30m)"
                        }
                    },
                    color: am5.color(0x0400ff),
                    children: [
                        {
                            name: "Bridgewatch",
                            category: "City",
                            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
                            timer: {
                                enabled: false,
                                time: {
                                    h: "(3h",
                                    m: "30m)"
                                }
                            },
                            color: am5.color(0xffd000),
                            children: [],
                        },
                        {
                            name: "Lymhurst",
                            category: "City",
                            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
                            timer: {
                                enabled: false,
                                time: {
                                    h: "(4h",
                                    m: "30m)"
                                }
                            },
                            children: [],
                            color: am5.color(0x00ff00),
                        }
                    ]
                }
            ]
        }
      ]
    };
    
    // Create wrapper container
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    var series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        topDepth: 1,
        maxRadius: 50,
        minRadius: 25,
        valueField: "value",
        categoryField: "category",
        childDataField: "children",
        idField: "name",
        linkWithStrength: 1,
        linkWithField: "linkWith",
        manyBodyStrength: -200,
        centerStrength: 1,
        colorFields: "color"
      })
    );

    series.circles.template.set("forceHidden", true);
    series.outerCircles.template.set("forceHidden", true);

    series.labels.template.setAll({
        fontSize: 20,
        y: -75,
        oversizedBehavior: "none",
        text: "{name} {timer.time.h} {timer.time.m}"
    });
    series.labels.template.adapters.add("y", function(y, target) {
        return target.dataItem.get("depth") == 0 ? 0 : y;
    });

    series.nodes.template.setAll({
        toggleKey: "none",
        cursorOverStyle: "default",
        tooltipText: "",
    });

    series.nodes.template.setup = function(target) {
        target.events.on("dataitemchanged", function(ev) {
            let circle = target.children.push(am5.Circle.new(root, {
                radius: 50,
                centerX: am5.percent(50),
                centerY: am5.percent(50),
                fill: am5.color("#fff")
            }));
            let icon = target.children.push(am5.Picture.new(root, {
                width: 100,
                height: 100,
                centerX: am5.percent(50),
                centerY: am5.percent(50),
                src: ev.target.dataItem.dataContext.image
            }));
        });
    }

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1, 1);
    
}); // end am5.ready()