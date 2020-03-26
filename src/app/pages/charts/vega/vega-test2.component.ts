import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import embed, { Mode, VisualizationSpec } from 'vega-embed';

@Component({
  selector: 'ngx-vega-test2',
  template: `
    <div id="vis1" class="m-1"></div>
    <div id="vis2" class="m-1"></div>
    <div id="vis3" class="m-1"></div>
    <div id="vis4" class="m-1"></div>
    <div id="vis5" class="m-1"></div>
    <div id="vis6" class="m-1"></div>
    <div id="vis7" class="m-1"></div>
    <div id="vis8" class="m-1"></div>
    <div id="vis9" class="m-1"></div>
    <div id="vis10" class="m-1"></div>
    <div id="vis11" class="m-1"></div>
  `,
})
export class VegaTest2Component implements OnInit {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    const spec1: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "transform": [
        {"bin": true, "field": "Miles_per_Gallon", "as": "binned_mpg"},
        {
          "aggregate": [{
             "op": "mean",
             "field": "Acceleration",
             "as": "mean_acc"
          }],
          "groupby": ["binned_mpg"]
        }
      ],
      "mark": "bar",
      "encoding": {
        "x": {"field": "binned_mpg","type": "quantitative"},
        "y": {"field": "mean_acc", "type": "quantitative"}
      }
    }

    const spec2: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "transform": [
        {"calculate": "year(datum.Year)", "as": "yearonly"},
        {
          "aggregate": [{
             "op": "mean",
             "field": "Acceleration",
             "as": "mean_acc"
          }],
          "groupby": ["yearonly"]
        }
      ],
      "mark": "line",
      "encoding": {
        "x": {"field": "yearonly", "type": "ordinal"},
        "y": {"field": "mean_acc", "type": "quantitative"}
      }
    }

    const spec3: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "transform": [
          {"calculate": "year(datum.Year)", "as": "yearonly"}
      ],
      "mark": "point",
      "encoding": {
        "x": {"field": "Miles_per_Gallon", "type": "quantitative"},
        "y": {"field": "Acceleration", "type": "quantitative"},
        "color": {"field": "yearonly", "type": "ordinal"}
      }
    }

    const spec4: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "transform": [
        { "calculate": "year(datum.Year)", "as": "yearonly" }
      ],
      "facet": {"column": {"field": "yearonly", "type": "nominal"}},
      "spec": {
        "mark": "circle",
        "encoding": {
          "x": {"field": "Acceleration", "type": "quantitative"},
          "y": {"field": "Miles_per_Gallon", "type": "quantitative"}
        }
      }
    }
    const spec5: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "title": "Side-by-side plots",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "transform": [
        { "calculate": "year(datum.Year)", "as": "yearonly" }
      ],
      "concat": [
        {
          "mark": "circle",
          "encoding": {
            "x": {"field": "Acceleration", "type": "quantitative"},
            "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
            "color": {"field": "yearonly", "type": "ordinal"}
          }
        },
        {
          "mark": "circle",
          "encoding": {
            "x": {"field": "Horsepower", "type": "quantitative"},
            "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
            "color": {"field": "yearonly", "type": "ordinal"}
          }
        },
        {
          "mark": "circle",
          "encoding": {
            "x": {"field": "Cylinders", "type": "quantitative"},
            "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
            "color": {"field": "yearonly", "type": "ordinal"}
          }
        }
      ]
    }

    const spec6: VisualizationSpec = {
      "title": "Making selections",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "selection": {
        "my_selection": {"type": "single", "empty": "none", "on": "mouseover"},
        "grid": {
          "type": "interval", "bind": "scales"
        }
      },
      "mark": "circle",
      "encoding": {
        "x": {"field": "Acceleration", "type": "quantitative"},
        "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
        "color": {
          "condition": {
            "selection": "my_selection",
            "value": "red"
          },
          "value": "lightgrey"
        },
        "size": {
          "condition": {"selection": "my_selection", "value": 120},
          "value": 20
        },
        "tooltip": [
          {"field": "Miles_per_Gallon", "type": "quantitative"},
          {"field": "Acceleration", "type": "quantitative"}
        ]
      }
    }

    const spec7: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "title": "Brushing and linking",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "concat": [
        {
          "selection": {
            "my_selection": {"type": "interval", "empty": "none"}
          },
          "mark": "circle",
          "encoding": {
            "x": {"field": "Weight_in_lbs", "type": "quantitative"},
            "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
            "color": {
              "condition": {
                "selection": "my_selection2",
                "value": "green"
              },
              "value": "lightgrey"
            }
          }
        },
        {
          "selection": {
            "my_selection2": {"type": "interval", "empty": "none"}
          },
          "mark": "circle",
          "encoding": {
            "x": {"field": "Acceleration", "type": "quantitative"},
            "y": {"field": "Horsepower", "type": "quantitative"},
            "color": {
              "condition": {
                "selection": "my_selection",
                "value": "red"
              },
              "value": "lightgrey"
            }
          }
        }
      ]
    }
    
    const spec8: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "title": "Scatterplot matrix",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "repeat": {
        "column": [ "Weight_in_lbs", "Miles_per_Gallon", "Acceleration" ],
        "row": [ "Weight_in_lbs", "Miles_per_Gallon", "Acceleration" ]
      },
      "spec": {
        "selection": {
          "my_selection": {"type": "interval", "empty": "none"}
        },
        "mark": "circle",
        "encoding": {
          "x": {"field": {"repeat": "column"}, "type": "quantitative"},
          "y": {"field": {"repeat": "row"}, "type": "quantitative"},
          "color": {
            "condition": {
              "selection": "my_selection",
              "value": "red"
            },
            "value": "lightgrey"
          }
        }
      }
    }

    const spec9: VisualizationSpec = {
      "title": "Making selections",
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"
      },
      "selection": {
        "my_selection": {
          "type": "single",
          "fields": ["Origin","Cylinders"],
          "bind": {
            "Origin": {"input": "radio", "options": ["Europe", "Japan", "USA"]},
            "Cylinders": {"input": "range", "min": 3, "max": 8, "step": 1}
          }
        }
      },
      "mark": "circle",
      "encoding": {
        "x": {"field": "Acceleration", "type": "quantitative"},
        "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
        "color": {
          "condition": {
            "selection": "my_selection",
            "value": "red"
          },
          "value": "lightgrey"
        }
      }
    }

    const spec10: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vda-lab/vda-lab.github.io/master/assets/station_366.json"
      },
      "width":1000,
      "transform": [
        {"calculate": "hours(toDate(datum.starttime))", "as": "hour"},
        {"filter": "datum.tripduration < 5000"}
      ],
      "mark": "circle",
      "encoding": {
        "y": {"field": "tripduration","type": "quantitative"},
        "x": {"field": "hour", "type": "quantitative"},
        "color": {"field": "usertype", "type": "nominal"}
      }
    }

    const spec11: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "data": {
        "url": "https://raw.githubusercontent.com/vda-lab/vda-lab.github.io/master/assets/station_366.json"
      },
      "width":1000,
      "height":500,
      "layer": [
        {
          "transform": [
            {"bin": true, "field": "startstation_latitude", "as": "binned_startstation_latitude"},
            {"bin": true, "field": "startstation_longitude", "as": "binned_startstation_longitude"},
          ],
          "mark": "circle",
          "encoding": {
            "y": {"field": "binned_startstation_latitude","type": "nominal",
              "axis": {"title": "Latitude", "format": ".2e"}
            },
            "x": {"field": "binned_startstation_longitude", "type": "nominal",
              "axis": {"title": "Longitude", "format": ".2e"}
            }
          }
        },
        {
          "transform": [
            {"bin": true, "field": "endstation_latitude", "as": "binned_endstation_latitude"},
            {"bin": true, "field": "endstation_longitude", "as": "binned_endstation_longitude"},
          ],
          "mark": "circle",
          "encoding": {
            "y": {"field": "binned_endstation_latitude","type": "nominal",
              "axis": {"title": "Latitude", "format": ".2e"}
            },
            "x": {"field": "binned_endstation_longitude", "type": "nominal",
              "axis": {"title": "Longitude", "format": ".2e"}
            }
          }
        }
      ]
      
    }
    
    
    embed("#vis1", spec1);
    embed("#vis2", spec2);
    embed("#vis3", spec3);
    embed("#vis4", spec4);
    embed("#vis5", spec5);
    embed("#vis6", spec6);
    embed("#vis7", spec7);
    embed("#vis8", spec8);
    embed("#vis9", spec9);
    embed("#vis10", spec10);
    embed("#vis11", spec11);
  }
}
