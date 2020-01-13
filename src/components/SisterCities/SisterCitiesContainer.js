import React from "react";
import { SisterCities } from "./SisterCities";

class SisterCitiesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sisterCititesOutput: {}
    };
  }

  componentDidMount = () => {
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=sister-cities&rows=50&sort=citypopulation"
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        this.setState({
          sisterCititesOutput: responseJson
        });
        this.combineMainCity();
      })
      .catch(error => {
        console.log(error);
      });
  };

  combineMainCity = () => {
    const sisterCititesOutput = this.state.sisterCititesOutput.records;
    let condensedCitites = [];
    let currentCityList = [];

    sisterCititesOutput.forEach(city => {
      let newCityName = city.fields.cityname;
      let newSisterCityName = city.fields.sistername;

      if (currentCityList.indexOf(newCityName) === -1) {
        // NEW CITY
        currentCityList.push(newCityName);
        condensedCitites.push({
          mainCity: newCityName,
          sisterCities: [newSisterCityName]
        });
      } else {
        let pos = currentCityList.indexOf(newCityName);
        condensedCitites[pos].sisterCities.push(newSisterCityName);
      }
    });

    this.setState({
      condensedCitites: condensedCitites
    });
  };

  render = () => {
    if (!this.state.condensedCitites) {
      return null;
    }
    return <SisterCities cities={this.state.condensedCitites} />;
  };
}

export default SisterCitiesContainer;
