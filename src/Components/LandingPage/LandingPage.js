import React, { useEffect, useState } from "react";
import { BarChart } from "../BarChart/BarChart";
import css from "./LandingPage.module.css";
import { AiOutlineLoading } from "react-icons/ai";
import Navbar from "../NavBar/NavBar";
import axios from "axios";
const LandingPage = (props) => {
  const [chartType, setChartType] = useState("country");
  const [loading, setLoading] = useState(true);
  const [pestles, setPestle] = useState([]);
  const [topics, setTopic] = useState([]);
  const [regions, setRegion] = useState([]);
  const [countries, setCountry] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/records")
      .then((res) => {
        setData(res.data);
        const countriesSet = new Set();
        const topicsSet = new Set();
        const regionsSet = new Set();
        const pestlesSet = new Set();
        res.data.forEach((record) => {
          if (record.country) {
            countriesSet.add(record.country);
          }
          if (record.topic) {
            topicsSet.add(record.topic);
          }
          if (record.region) {
            regionsSet.add(record.region);
          }
          if (record.pestle) {
            pestlesSet.add(record.pestle);
          }
        });

        const uniqueCountries = Array.from(countriesSet);
        const uniqueTopics = Array.from(topicsSet);
        const uniqueRegions = Array.from(regionsSet);
        const uniquePestles = Array.from(pestlesSet);
        setCountry(uniqueCountries);
        setTopic(uniqueTopics);
        setRegion(uniqueRegions);
        setPestle(uniquePestles);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  console.log({ data, chartType });
  let chart = (
    <BarChart
      regions={regions}
      countries={countries}
      pestles={pestles}
      topics={topics}
      chartType={chartType}
      recordsData={data}
    />
  );
  const changeChart = (e) => {
    setChartType(e);
  };

  return (
    <div className={css.container}>
      <Navbar chartType={chartType} changeChart={changeChart} />
      {loading ? (
        <div>
          <AiOutlineLoading className={css.loader} />
        </div>
      ) : (
        <div className={css.chart}>{chart}</div>
      )}
    </div>
  );
};

export default LandingPage;
