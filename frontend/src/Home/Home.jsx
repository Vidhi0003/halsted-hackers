import React,{ useState } from "react";
import './Home.css'
import BasicButtonExample from '../components/BasicButtonExample';
import Chart from '../components/Chart';
import vegaEmbed from "vega-embed";

function Home() {
  const [selectedRace, setSelectedRace] = useState("All Races");

  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "data": {
      "url": "suid_data.json",
      "format": {"type": "json", "parse": {"Year": "nominal"}},
      "name": "data"
    },
    "title": {
      "text": `Sudden Unexplained Infant Deaths per 100,000 Births by Race`,
      "fontSize": 24,
      "subtitle": "Data from CDC/NCHS, National Vital Statistics System, Period Linked Birth/Infant Death Data",
      "subtitleFontSize": 12,
      "subtitleColor": "#333333"
    },
    "width": 600,
    "height": 400,
    "encoding": {
      "x": {"field": "Year", "type": "Nominal", "title": "Year"},
      "y": {
        "field": "Rate",
        "type": "quantitative",
        "title": "Mortality Rate"
      },
      "color": {
        "field": "Race",
        "type": "nominal",
        "title": "Race"
      }
    },
    "layer": [
      {
        "mark": {"type": "line", "strokeWidth": 2}
      },
      {
        "mark": {"type": "point", "filled": true, "size": 50},
        "encoding": {
          "tooltip": [
            {"field": "Year", "type": "nominal", "title": "Year"},
            {"field": "Race", "type": "nominal", "title": "Race"},
            {"field": "Rate", "type": "quantitative", "title": "Mortality Rate"}
          ]
        }
      }
    ]
  };

  vegaEmbed("#vis2", spec);
  return (
      <div className='scrollable center'>
        <h1 className='gradient-text'> Our Purpose </h1>
        <div className='container'>
            <p className="text">There are many risks associated with the different periods of pregnancy for women. In addition,
            certain marginalized groups face additional obstacles before, during, and after the birth of their child.
            </p>
            <BasicButtonExample onSelect={setSelectedRace}/>
            <Chart param = {selectedRace}/>
            <p className='text'>As seen in the chart above, the Perinatal period of pregnancy has the most risk of any other part of the pregnancy. 
                Additionally, certain racial groups have higher rates of mortality than others, especially Black/African American mothers. The pregnancy
                time frame categories are measured as follows:
            </p>
            <ul>
                <li>Perinatal: 20 weeks gestation to 7 days after birth</li>
                <li>Neonatal: 0 days after birth to 28 days after birth</li>
                <li>Postneonatal: 28 days after birth to 1 year after birth</li>
            </ul>

        </div>
        <div className="container">
            <div id="vis2"></div>
            <p className='text'>
                In this graph displaying sudden unexplained infant deaths (SUIDs) by Race, one important trend to note is that every Demographic
                experienced an increase in SUIDs since 2020, which correlates to the start of the COVID-19 pandemic. Safety Pinpoint aims to encourage
                new mothers to vaccinate their children as well as help them keep track of their child's vaccinations to help counteract this trend.
            </p>
        </div>
      </div>
      
  )
}

export default Home
