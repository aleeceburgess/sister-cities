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
    //   fetch(
    //     "https://public.opendatasoft.com/api/records/1.0/search/?dataset=sister-cities&rows=15&sort=citypopulation&facet=cityname&facet=sistername"
    //   )
    //     .then(response => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error("Something went wrong");
    //       }
    //     })
    //     .then(responseJson => {
    //       console.log(responseJson);
    //       this.setState({
    //         sisterCititesOutput: responseJson
    //       });
    this.combineMainCity();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
  };

  // output of data has each city individually. This merges all the sister cities for one city into an object
  combineMainCity = () => {
    const testData = {
      nhits: 5891,
      parameters: {
        dataset: "sister-cities",
        timezone: "UTC",
        rows: 2,
        sort: ["citypopulation"],
        format: "json",
        facet: ["cityname", "sistername"]
      },
      records: [
        {
          datasetid: "sister-cities",
          recordid: "4217369dedb595b09e37e980837114fbad5ba3f6",
          fields: {
            sistername: "Düsseldorf",
            cityname: "Chongqing",
            citycountry: "CN",
            sistercountry: "DE",
            sisterpopulation: 612178,
            citypopulation: 30165500
          },
          record_timestamp: "2017-08-21T12:56:45.957000+00:00"
        },
        {
          datasetid: "sister-cities",
          recordid: "95909f589810d5811964bed855cd1e88e04c6edf",
          fields: {
            sistername:
              "กรุงเทพมหานคร อมรรัตนโกสินทร์ มหินทรายุธยา มหาดิลกภพ นพรัตนราชธานีบูรีรมย์ อุดมราชนิเวศน์มหาสถาน อมรพิมานอวตารสถิต สักกะทัตติยวิษณุกรรมประสิทธิ์",
            cityname: "Chongqing",
            citycountry: "CN",
            sistercountry: "TH",
            sisterpopulation: 5696409,
            citypopulation: 30165500
          },
          record_timestamp: "2017-08-21T12:56:45.957000+00:00"
        }
      ]
    };

    const condensedCitites = [];

    // its not a new entry. Check if the main city is an object.

    for (let i = 0; i < testData.records.length; i++) {
      if (condensedCitites.length === 0) {
        condensedCitites.push({
          mainCity: testData.records[i].fields.cityname,
          sisterCitites: [testData.records[i].fields.sistername]
        });
      } else {
        console.log(Object.values(condensedCitites));
        if (
          Object.values(condensedCitites).indexOf(
            testData.records[i].fields.cityname
          ) > -1
        ) {
          console.log("has test1");
        } else {
          console.log("denied");
        }
      }
    }

    //console.log(condensedCitites)

    // if it is empty then push the first city & sister city
  };

  render = () => {
    return <SisterCities />;
  };
}

export default SisterCitiesContainer;
