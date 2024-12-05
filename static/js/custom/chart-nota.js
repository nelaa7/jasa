"use strict";
var KTWidgets = {
    init: function () {
        var e, t, a, o, r;

        // Date Range Picker
        if (document.querySelector("#kt_dashboard_daterangepicker")) {
            var e = $("#kt_dashboard_daterangepicker"),
                t = moment(),
                a = moment();

            e.daterangepicker({
                direction: KTUtil.isRTL(),
                startDate: t,
                endDate: a,
                opens: "left",
                applyClass: "btn-primary",
                cancelClass: "btn-light-primary",
                ranges: {
                    Today: [moment(), moment()],
                    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "Last 7 Days": [moment().subtract(6, "days"), moment()],
                    "Last 30 Days": [moment().subtract(29, "days"), moment()],
                    "This Month": [moment().startOf("month"), moment().endOf("month")],
                    "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
                }
            }, o);

            o(t, a, "");
        }

        function o(e, t, a) {
            var o = "",
                r = "";

            if (t - e < 100 || "Today" == a) {
                o = "Today:";
                r = e.format("MMM D");
            } else if ("Yesterday" == a) {
                o = "Yesterday:";
                r = e.format("MMM D");
            } else {
                r = e.format("MMM D") + " - " + t.format("MMM D");
            }

            $("#kt_dashboard_daterangepicker_date").html(r);
            $("#kt_dashboard_daterangepicker_title").html(o);
        }

        // Dark Mode Toggle
        if (e = document.querySelector("#kt_user_menu_dark_mode_toggle")) {
            e.addEventListener("click", function () {
                window.location.href = this.getAttribute("data-kt-url");
            });
        }

        // BBM Chart Initialization
        initBBMChart();
        initnonBBMChart();
        initkendaraan();


    }
};

// BBM Chart Function
function initBBMChart() {
    var e = document.getElementById("kt_charts_widget_1_chart");
    if (e) {
        var t = {
            self: null,
            rendered: false
        };

        var a = function () {
            var a = parseInt(KTUtil.css(e, "height"));
            var o = KTUtil.getCssVariableValue("--kt-gray-500");
            var r = KTUtil.getCssVariableValue("--kt-gray-200");

            var s = {
                series: [{
                    name: "BBM",
                    data: []
                }, {
                    name: "Non-BBM",
                    data: []
                }],
                chart: {
                    fontFamily: "inherit",
                    type: "bar",
                    height: a,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: ["30%"],
                        borderRadius: 4
                    }
                },
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                },
                xaxis: {
                    categories: [],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: {
                            colors: o,
                            fontSize: "12px"
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (e) {
                                return "Rp " + e.toLocaleString('id-ID');
                            },
                        style: {
                            colors: o,
                            fontSize: "12px"
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                states: {
                    normal: {
                        filter: {
                            type: "none",
                            value: 0
                        }
                    },
                    hover: {
                        filter: {
                            type: "none",
                            value: 0
                        }
                    },
                    active: {
                        allowMultipleDataPointsSelection: false,
                        filter: {
                            type: "none",
                            value: 0
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: "12px"
                    },
                    y: {
                        formatter: function (e) {
                            return "Rp " + e.toLocaleString('id-ID');
                        }
                    }
                },
                colors: [KTUtil.getCssVariableValue("--kt-primary"), KTUtil.getCssVariableValue("--kt-gray-300")],
                grid: {
                    borderColor: r,
                    strokeDashArray: 4,
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                }
            };

            t.self = new ApexCharts(e, s);
            t.self.render();
            t.rendered = true;

            // Fetch data and update chart
            function updateChart() {
                fetch('/get-chart-data/') // Replace with your actual endpoint
                    .then(response => response.json())
                    .then(data => {
                        var bbmData = [];
                        var categories = [];

                        data.forEach(item => {
                            categories.push(item.month);
                            bbmData.push(item.BBM);
                        });

                        t.self.updateOptions({
                            xaxis: {
                                categories: categories
                            },
                            series: [{
                                    name: "BBM",
                                    data: bbmData
                                }

                            ]
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Initial update
            updateChart();

            // Update every 1 detik (300000 milliseconds)
            setInterval(updateChart, 1000);
        };

        a();

        KTThemeMode.on("kt.thememode.change", function () {
            if (t.rendered) {
                t.self.destroy();
            }
            a();
        });
    }
}

// function initnonBBMChart() {
//     var e = document.getElementById("kt_charts_non_bmm_chart");
//     if (e) {
//         var t = {
//             self: null,
//             rendered: false
//         };

//         var a = function () {
//             var a = parseInt(KTUtil.css(e, "height"));
//             var o = KTUtil.getCssVariableValue("--kt-gray-500");
//             var r = KTUtil.getCssVariableValue("--kt-gray-200");

//             var s = {
//                 series: [{
//                     name: "BBM",
//                     data: []
//                 }, {
//                     name: "Non-BBM",
//                     data: []
//                 }],
//                 chart: {
//                     fontFamily: "inherit",
//                     type: "bar",
//                     height: a,
//                     toolbar: {
//                         show: false
//                     }
//                 },
//                 plotOptions: {
//                     bar: {
//                         horizontal: false,
//                         columnWidth: ["30%"],
//                         borderRadius: 4
//                     }
//                 },
//                 legend: {
//                     show: false
//                 },
//                 dataLabels: {
//                     enabled: false
//                 },
//                 stroke: {
//                     show: true,
//                     width: 2,
//                     colors: ["transparent"]
//                 },
//                 xaxis: {
//                     categories: [],
//                     axisBorder: {
//                         show: false
//                     },
//                     axisTicks: {
//                         show: false
//                     },
//                     labels: {
//                         style: {
//                             colors: o,
//                             fontSize: "12px"
//                         }
//                     }
//                 },
//                 yaxis: {
//                     labels: {
//                         formatter: function (e) {
//                                 return "Rp " + e.toLocaleString('id-ID');
//                             },
//                         style: {
//                             colors: o,
//                             fontSize: "12px"
//                         }
//                     }
//                 },
//                 fill: {
//                     opacity: 1
//                 },
//                 states: {
//                     normal: {
//                         filter: {
//                             type: "none",
//                             value: 0
//                         }
//                     },
//                     hover: {
//                         filter: {
//                             type: "none",
//                             value: 0
//                         }
//                     },
//                     active: {
//                         allowMultipleDataPointsSelection: false,
//                         filter: {
//                             type: "none",
//                             value: 0
//                         }
//                     }
//                 },
//                 tooltip: {
//                     style: {
//                         fontSize: "12px"
//                     },
//                     y: {
//                         formatter: function (e) {
//                             return "Rp " + e.toLocaleString('id-ID');
//                         }
//                     }
//                 },
//                 colors: [KTUtil.getCssVariableValue("--kt-primary"), KTUtil.getCssVariableValue("--kt-gray-300")],
//                 grid: {
//                     borderColor: r,
//                     strokeDashArray: 4,
//                     yaxis: {
//                         lines: {
//                             show: true
//                         }
//                     }
//                 }
//             };

//             t.self = new ApexCharts(e, s);
//             t.self.render();
//             t.rendered = true;

//             // Fetch data and update chart
//             function updateChart() {
//                 fetch('/get-chart-data-nonbbm/') // Replace with your actual endpoint
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('NonBBM Data:', nonBBMData);

//                         var nonBBMData = [];
//                         var categories = [];

//                         data.forEach(item => {
//                             categories.push(item.month);
//                             nonBBMData.push(item.NonBBM);
//                         });

//                         t.self.updateOptions({
//                             xaxis: {
//                                 categories: categories
//                             },
//                             series: [{
//                                 name: "Non-BBM",
//                                 data: nonBBMData
//                             }]
//                         });
//                     })
//                     .catch(error => console.error('Error:', error));
//                 console.log('NonBBM Data:', nonBBMData);
//             }

//             // Initial update
//             updateChart();

//             // Update every 1 detik (300000 milliseconds)
//             setInterval(updateChart, 10000);
//         };

//         a();

//         KTThemeMode.on("kt.thememode.change", function () {
//             if (t.rendered) {
//                 t.self.destroy();
//             }
//             a();
//         });
//     }
// }







// function initnonBBMChart() {
//     var e = document.getElementById("kt_charts_non_bmm_chart");
//     if (e) {
//         var t = {
//             self: null,
//             rendered: false
//         };

//         var a = function () {
//             var a = parseInt(KTUtil.css(e, "height"));
//             var o = KTUtil.getCssVariableValue("--kt-gray-500");
//             var r = KTUtil.getCssVariableValue("--kt-gray-200");

//             // Definisikan warna untuk setiap jenis nota
//             var notaColors = [
//                 KTUtil.getCssVariableValue("--kt-primary"),
//                 KTUtil.getCssVariableValue("--kt-success"),
//                 KTUtil.getCssVariableValue("--kt-warning"),
//                 KTUtil.getCssVariableValue("--kt-danger"),
//                 KTUtil.getCssVariableValue("--kt-info")
//             ];

//             var s = {
//                 series: [], // Array series akan diisi dinamis
//                 chart: {
//                     fontFamily: "inherit",
//                     type: "bar",
//                     height: a,
//                     stacked: true, // Gunakan stacked bar
//                     toolbar: {
//                         show: false
//                     }
//                 },
//                 plotOptions: {
//                     bar: {
//                         horizontal: false,
//                         columnWidth: ["60%"], // Lebar kolom disesuaikan
//                         borderRadius: 4
//                     }
//                 },
//                 legend: {
//                     show: true, // Tampilkan legend untuk jenis nota
//                     position: 'top'
//                 },
//                 dataLabels: {
//                     enabled: false
//                 },
//                 stroke: {
//                     show: true,
//                     width: 2,
//                     colors: ["transparent"]
//                 },
//                 xaxis: {
//                     categories: [],
//                     axisBorder: {
//                         show: false
//                     },
//                     axisTicks: {
//                         show: false
//                     },
//                     labels: {
//                         style: {
//                             colors: o,
//                             fontSize: "12px"
//                         }
//                     }
//                 },
//                 yaxis: {
//                     labels: {
//                         formatter: function (e) {
//                             return "Rp " + e.toLocaleString('id-ID');
//                         },
//                         style: {
//                             colors: o,
//                             fontSize: "12px"
//                         }
//                     }
//                 },
//                 tooltip: {
//                     y: {
//                         formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
//                             var notaName = w.globals.seriesNames[seriesIndex];
//                             return notaName + ": Rp " + val.toLocaleString('id-ID');
//                         }
//                     }
//                 },
//                 colors: notaColors, // Gunakan warna yang sudah didefinisikan
//                 fill: {
//                     opacity: 1
//                 }
//             };

//             t.self = new ApexCharts(e, s);
//             t.self.render();
//             t.rendered = true;

//             // Fungsi untuk mengambil dan memperbarui data
//             function updateChart() {
//                 fetch('/get-chart-data-nonbbm/')
//                     .then(response => response.json())
//                     .then(data => {
//                         // Ekstrak categories (bulan)
//                         var categories = data.map(item => item.month);
            
//                         // Siapkan series untuk setiap jenis nota
//                         var seriesData = {};
//                         data.forEach(monthData => {
//                             monthData.nota_types.forEach(nota => {
//                                 if (!seriesData[nota.name]) {
//                                     seriesData[nota.name] = [];
//                                 }
//                                 seriesData[nota.name].push(nota.value);
//                             });
//                         });
            
//                         // Konversi series data ke format yang dibutuhkan ApexCharts
//                         var series = Object.keys(seriesData).map((notaName) => ({
//                             name: notaName,
//                             data: seriesData[notaName]
//                         }));
            
//                         // Perbarui chart
//                         t.self.updateOptions({
//                             xaxis: {
//                                 categories: categories
//                             },
//                             series: series
//                         });
//                     })
//                     .catch(error => console.error('Error:', error));
//             }
//         }
//     }
// }            





function initnonBBMChart() {
                    var e = document.getElementById("kt_charts_widget_6_chart");
                    if (e) {
                        var t = {
                                self: null,
                                rendered: !1
                            },
                            a = function () {
                                parseInt(KTUtil.css(e, "height"));
                                var a = KTUtil.getCssVariableValue("--kt-gray-500"),
                                    o = KTUtil.getCssVariableValue("--kt-gray-200"),
                                    r = KTUtil.getCssVariableValue("--kt-primary"),
                                    s = KTUtil.getCssVariableValue("--kt-primary-light"),
                                    l = {
                                        series: [{
                                            name: "Net Profit",
                                            type: "bar",
                                            stacked: !0,
                                            data: [40, 50, 65, 70, 50, 30]
                                        }, {
                                            name: "Revenue",
                                            type: "bar",
                                            stacked: !0,
                                            data: [20, 20, 25, 30, 30, 20]
                                        }, {
                                            name: "Expenses",
                                            type: "area",
                                            data: [50, 80, 60, 90, 50, 70]
                                        }],
                                        chart: {
                                            fontFamily: "inherit",
                                            stacked: !0,
                                            height: 350,
                                            toolbar: {
                                                show: !1
                                            }
                                        },
                                        plotOptions: {
                                            bar: {
                                                stacked: !0,
                                                horizontal: !1,
                                                borderRadius: 4,
                                                columnWidth: ["12%"]
                                            }
                                        },
                                        legend: {
                                            show: !1
                                        },
                                        dataLabels: {
                                            enabled: !1
                                        },
                                        stroke: {
                                            curve: "smooth",
                                            show: !0,
                                            width: 2,
                                            colors: ["transparent"]
                                        },
                                        xaxis: {
                                            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                                            axisBorder: {
                                                show: !1
                                            },
                                            axisTicks: {
                                                show: !1
                                            },
                                            labels: {
                                                style: {
                                                    colors: a,
                                                    fontSize: "12px"
                                                }
                                            }
                                        },
                                        yaxis: {
                                            max: 120,
                                            labels: {
                                                style: {
                                                    colors: a,
                                                    fontSize: "12px"
                                                }
                                            }
                                        },
                                        fill: {
                                            opacity: 1
                                        },
                                        states: {
                                            normal: {
                                                filter: {
                                                    type: "none",
                                                    value: 0
                                                }
                                            },
                                            hover: {
                                                filter: {
                                                    type: "none",
                                                    value: 0
                                                }
                                            },
                                            active: {
                                                allowMultipleDataPointsSelection: !1,
                                                filter: {
                                                    type: "none",
                                                    value: 0
                                                }
                                            }
                                        },
                                        tooltip: {
                                            style: {
                                                fontSize: "12px"
                                            },
                                            y: {
                                                formatter: function (e) {
                                                    return "$" + e + " thousands"
                                                }
                                            }
                                        },
                                        colors: [r, KTUtil.getCssVariableValue("--kt-info"), s],
                                        grid: {
                                            borderColor: o,
                                            strokeDashArray: 4,
                                            yaxis: {
                                                lines: {
                                                    show: !0
                                                }
                                            },
                                            padding: {
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                left: 0
                                            }
                                        }
                                    };
                                t.self = new ApexCharts(e, l), t.self.render(), t.rendered = !0
                            };
                        a(), KTThemeMode.on("kt.thememode.change", (function () {
                            t.rendered && t.self.destroy(), a()
                        }))
                    }
                }
                
            

// function initkendaraan() {
//     var e = document.querySelectorAll(".mixed-widget-17-chart");
//     [].slice.call(e).map((function (e) {
//         var t = parseInt(KTUtil.css(e, "height"));
//         if (e) {
//             var a = e.getAttribute("data-kt-chart-color"),
//                 o = {
//                     labels: ["Total Orders"],
//                     series: [75],
//                     chart: {
//                         fontFamily: "inherit",
//                         height: t,
//                         type: "radialBar",
//                         offsetY: 0
//                     },
//                     plotOptions: {
//                         radialBar: {
//                             startAngle: -90,
//                             endAngle: 90,
//                             hollow: {
//                                 margin: 0,
//                                 size: "55%"
//                             },
//                             dataLabels: {
//                                 showOn: "always",
//                                 name: {
//                                     show: !0,
//                                     fontSize: "12px",
//                                     fontWeight: "700",
//                                     offsetY: -5,
//                                     color: KTUtil.getCssVariableValue("--kt-gray-500")
//                                 },
//                                 value: {
//                                     color: KTUtil.getCssVariableValue("--kt-gray-900"),
//                                     fontSize: "24px",
//                                     fontWeight: "600",
//                                     offsetY: -40,
//                                     show: !0,
//                                     formatter: function (e) {
//                                         return "8,346"
//                                     }
//                                 }
//                             },
//                             track: {
//                                 background: KTUtil.getCssVariableValue("--kt-gray-300"),
//                                 strokeWidth: "100%"
//                             }
//                         }
//                     },
//                     colors: [KTUtil.getCssVariableValue("--kt-" + a)],
//                     stroke: {
//                         lineCap: "round"
//                     }
//                 };
//             new ApexCharts(e, o).render()
//         }
//     }))
// }




// Initialize the widget on DOM load
document.addEventListener('DOMContentLoaded', function () {
    KTWidgets.init();
});
