//import node modules
import React, { useState, useEffect } from 'react';
import { Header, Radio, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

//import views
import CTStateReports from '../ct-state-reports/CTStateReports.component';
import CTDistrictReports from '../ct-district-reports/CTDistrictReports.component';

//import styles
import './App.component.scss';

function App() {
  const [stateReportResult, setStateReportResult] = useState([]);
  const [districtReportResult, setDistrictReportResult] = useState([]);

  const [isDistrictReports, setIsDistrictReports] = useState(false);

  const [isDataFetched, setDataFetch] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  useEffect(() => {
    if (isDataFetched === false) {
      getReportData();
    }
  }, [isDataFetched]);

  const getReportData = async () => {
    try {
      const [generalResponse, stateDistrictWiseResponse] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/v2/state_district_wise.json'),
      ]);
      const stateReportResult = generalResponse.data.statewise || [];
      const _districtReportResult = stateDistrictWiseResponse.data || [];
      const stateOptions = _districtReportResult.map((districtReport) => {
        const TEMP = {
          key: districtReport.state,
          value: districtReport.state,
          text: districtReport.state,
          districtReport: districtReport.districtData,
        };
        return TEMP;
      });
      setStateReportResult(stateReportResult);
      setStateOptions(stateOptions);
      setDataFetch(true);
    } catch (error) {}
  };

  const filterOptionChange = (evData) => {
    evData &&
      evData.options.forEach((option) => {
        if (option.value === evData.value) {
          setDistrictReportResult(option.districtReport);
        }
      });
  };
  return (
    <section className="ct-wrapper">
      <section className="ct-head-container">
        <Header size="medium" className="ct-head-content">
          COVID19 TRACKER - INDIA
        </Header>
        <Header size="small" dividing color="grey">
          REPORTS
        </Header>

        {isDataFetched ? (
          <section>
            <Radio
              onClick={() => {
                setIsDistrictReports(!isDistrictReports);
              }}
              toggle
              label="District Reports"
              checked={isDistrictReports}
            />
            {isDistrictReports && (
              <Dropdown
                placeholder="Select State"
                fluid
                search
                selection
                options={stateOptions}
                className="ct-district-filter"
                onChange={(ev, evData) => {
                  filterOptionChange(evData);
                }}
              />
            )}

            {isDistrictReports ? (
              <CTDistrictReports reportData={districtReportResult} />
            ) : (
              <CTStateReports reportData={stateReportResult} />
            )}
          </section>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </section>
  );
}

export default App;
