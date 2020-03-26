import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import embed, { Mode, VisualizationSpec } from 'vega-embed';

@Component({
  selector: 'ngx-vega-test',
  template: `
    <div id="vis"></div>
  `,
})
export class VegaTestComponent implements OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  subject: any;

  constructor(private theme: NbThemeService) {
    this.subject = "Movies"
  }

  ngOnInit() {

    const spec: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "description": "A dashboard with cross-highlighting.",
      "data": {"url": "assets/data/movies.json"},
      "hconcat": [
        {
          "layer": [{
            "mark": {"type": "rect", "tooltip": true},
            "encoding": {
              "x": {
                "bin": {"maxbins": 10},
                "field": "IMDB_Rating",
                "type": "quantitative"
              },
              "y": {
                "bin": {"maxbins": 10},
                "field": "Rotten_Tomatoes_Rating",
                "type": "quantitative"
              },
              "color": {
                "aggregate": "count",
                "type": "quantitative",
                "legend": {
                  "title": "All Movies",
                  "direction": "horizontal",
                  "gradientLength": 120
                }
              }
            }
          }, {
            "transform": [{
              "filter": {"selection": "pts"}
            }],
            "mark": {"type": "point", "tooltip": true},
            "encoding": {
              "x": {
                "bin": {"maxbins": 10},
                "field": "IMDB_Rating",
                "type": "quantitative"
              },
              "y": {
                "bin": {"maxbins": 10},
                "field": "Rotten_Tomatoes_Rating",
                "type": "quantitative"
              },
              "size": {
                "aggregate": "count",
                "type": "quantitative",
                "legend": {
                  "title": "In Selected Category"
                }
              },
              "color": {
                "value": "#666"
              }
            }
          }]
        }, {
          "mark": {"type": "bar", "tooltip": true},
          "selection": {
            "pts": {"type": "single", "encodings": ["y"]}
          },
          "encoding": {
            "x": {"aggregate": "count", "type": "quantitative"},
            "y": {"field": "Major_Genre", "type": "nominal"},
            "color": {
              "condition": {
                "selection": "pts",
                "value": "steelblue"
              },
              "value": "grey"
            }
          }
        }
      ],
      "resolve": {
        "legend": {
          "color": "independent",
          "size": "independent"
        }
      }
    }
    
    
    embed("#vis", spec);
  }
}
