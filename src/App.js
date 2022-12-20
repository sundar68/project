import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { f1 } from './fxns/page';
import './App.css';
import _ from "lodash";





const App = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [values, setValues] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(todayDate);
  const [reqest1, setReqest1] = useState(true);
  const [response1, setResponse1] = useState(true);
  const [impression1, setImpression1] = useState(true);
  const [click1, setClick1] = useState(true);
  const [revenue1, setRevenue1] = useState(true);
  const [fillrate1, setFillrate1] = useState(true);
  const [ctr1, setCtr1] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  const updateRequest = () => {
    setReqest1((prevState) => !prevState);
  };
  const updateResponse = () => {
    setResponse1((prevState) => !prevState);
  };
  const updateImpression = () => {
    setImpression1((prevState) => !prevState);
  };
  const updateClick = () => {
    setClick1((prevState) => !prevState);
  };
  const updateRevenue = () => {
    setRevenue1((prevState) => !prevState);
  };
  const updateFillrate = () => {
    setFillrate1((prevState) => !prevState);
  };
  const updateCTR = () => {
    setCtr1((prevState) => !prevState);
  };
  const displayappname = (id) => {
    switch (id) {
      case "123456":
        return "Panda Draw";

      case "789652":
        return "Number Ninja";

      case "741553":
        return "Word Crush";

      case "986321":
        return "Brain Quiz";

      case "320248":
        return "Age Calculator";

      default:
        return id;
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://go-dev.greedygame.com/v3/dummy/report?startDate=${from}&endDate=${to}`
      )
      .then((res) => setValues(res.data.data))
      .catch((err) => console.log(err));
  }, [from, to]);

  const alldata = f1(values, currentPage, 10);

  return (
    <div>
      <h1>ANALYTICS</h1>
      <label htmlFor="from" class="style">
        From Date:
      </label>
      <input
        type="date"
        name="from"
        value={from}
        id="from"
        onChange={(e) => {
          return setFrom(e.target.value);
        }}
      />
      <label htmlFor="to">To Date:</label>
      <input
        type="date"
        name="to"
        value={to}
        id="to"
        onChange={(e) => setTo(e.target.value)}
      />
      <div className="setting-change">
        <h3 className="filter">Dimensions and Metrics</h3>
        <div className="boxes">
          <div className="box">
            <input
              type="checkbox"
              onChange={updateRequest}
              id="Request"
              name="Request"
              checked={reqest1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Request">Request</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateResponse}
              id="Response"
              name="Response"
              // moveColumnByIndex = (fromIndex: number,toIndex: number) => void;
              checked={response1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Response">Response</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateImpression}
              id="Impression"
              name="Impression"
              checked={impression1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Impression">Impression</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateClick}
              id="Click"
              name="Click"
              checked={click1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Click">Click</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateRevenue}
              id="Revenue"
              name="Revenue"
              checked={revenue1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Revenue">Revenue</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateFillrate}
              id="Fill_Rate"
              name="Fill_Rate"
              checked={fillrate1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="Fill_Rate">Fill_Rate</label>
          </div>
          <div className="box">
            <input
              type="checkbox"
              onChange={updateCTR}
              id="CTR"
              name="CTR"
              checked={ctr1 === true}
            />
            <span className="Date">&nbsp;</span>
            <label htmlFor="CTR">CTR</label>
          </div>
        </div>
      </div>
      {/* ) : null} */}
      {alldata.length > 0 ? (
        <h3>Search Result Count: {values.length}</h3>
      ) : (
        <h3>Please provide start and end date to fetch records.</h3>
      )}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">App Name</th>
            {reqest1 ? <th scope="col">AD_Request</th> : null}
            {response1 ? <th scope="col">AD_Response</th> : null}
            {impression1 ? <th scope="col">Impression</th> : null}
            {click1 ? <th scope="col">Click</th> : null}
            {revenue1 ? <th scope="col">Revenue</th> : null}
            {fillrate1 ? <th scope="col">Fill Rate</th> : null}
            {ctr1 ? <th scope="col">CTR</th> : null}
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{displayappname(item.app_id)}</td>
                {reqest1 ? <td>{item.requests}</td> : null}
                {response1 ? <td>{item.responses}</td> : null}
                {impression1 ? <td>{item.impressions}</td> : null}
                {click1 ? <td>{item.clicks}</td> : null}
                {revenue1 ? <td>{item.revenue.toFixed(2)}</td> : null}
                {fillrate1 ? (
                  <td>{((item.requests / item.responses) * 100).toFixed(2)}</td>
                ) : null}
                {ctr1 ? (
                  <td>{((item.clicks / item.impressions) * 100).toFixed(2)}</td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
