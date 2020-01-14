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
    this.fetchCityData();
  };

  fetchCityData = () => {
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
        this.condenseData(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // geowhatever maincity and sister to get long&lat.
  // Will the sister cities have to go into an array?

  condenseData = sisterCityData => {
    let condensedCitites = [];
    let currentCityList = [];

    sisterCityData.records.forEach(city => {
      let newCityName = city.fields.cityname;
      let newSisterCityName = city.fields.sistername;

      if (currentCityList.indexOf(newCityName) === -1) {
        // NEW CITY
        currentCityList.push(newCityName);
        condensedCitites.push({
          mainCity: [
            {
              name: newCityName,
              lon: this.getLongLat(newCityName),
              lat: this.getLongLat(newCityName)
            }
          ],
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

  getLongLat = location => {
    fetch(
      `https://us1.locationiq.com/v1/search.php?key=1ec213563eb7cb&q=${location}&format=json&limit=1`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    if (!this.state.condensedCitites) {
      return null;
    }
    return (
      <div className="city-cards">
        <SisterCities cities={this.state.condensedCitites} />
      </div>
    );
  };
}

export default SisterCitiesContainer;
