//import node modules
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  Icon,
  Label,
  Statistic,
  Grid,
  Header,
  Segment,
  Input,
} from 'semantic-ui-react';
import moment from 'moment';

//import styles
import './CTStateReports.component.scss';

function CTStateReports(props) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [filterStateReports, setFilterStateReports] = useState([]);

  useEffect(() => {
    setFilterStateReports(props.reportData);
  }, []);

  const searchStateReports = (evData) => {
    const filterStateReports = props.reportData.filter((stateVal) => {
      if (
        (stateVal.state &&
          stateVal.state
            .toLowerCase()
            .indexOf(evData.value.toLowerCase().trim()) !== -1) ||
        stateVal.state === 'Total'
      ) {
        return stateVal;
      }
    });
    setFilterStateReports(filterStateReports);
  };
  
  const getGridReport = (report) => {
    return (
      <Grid columns={4} divided>
        <Grid.Row>
          <Grid.Column className="ct-report-gc">
            <Statistic size="mini" color="red">
              <Statistic.Value>{report.active}</Statistic.Value>
              <Statistic.Label>Active</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column className="ct-report-gc">
            <Statistic size="mini" color="teal">
              <Statistic.Value>{report.confirmed}</Statistic.Value>
              <Statistic.Label>Confirmed</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column className="ct-report-gc">
            <Statistic size="mini" color="green">
              <Statistic.Value>{report.recovered}</Statistic.Value>
              <Statistic.Label>recovered</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column className="ct-report-gc">
            <Statistic size="mini" color="grey">
              <Statistic.Value>{report.deaths}</Statistic.Value>
              <Statistic.Label>Deceased</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
  const noResultComp = (textValue) => {
    return <p className="ct-state-no-records">{textValue}</p>;
  };
  return (
    <section className="ct-state-reports-wrapper">
      <Input
        fluid
        icon="search"
        onChange={(ev, evData) => {
          searchStateReports(evData);
        }}
        placeholder="Filter state name..."
        disabled={!(props.reportData && props.reportData.length > 0)}
      />
      {filterStateReports && filterStateReports.length > 0
        ? filterStateReports.map((report, reportInd) => {
            if (reportInd !== 0) {
              return (
                <Accordion
                  styled
                  key={report.statecode}
                  className="ct-state-reports-accordion"
                >
                  <Accordion.Title
                    active={activeIndex === reportInd}
                    index={reportInd}
                    onClick={() => {
                      setActiveIndex(reportInd);
                    }}
                  >
                    <Icon name="dropdown" />
                    {report.state}
                    <Label
                      className="ct-state-reports-acc-label"
                      color="teal"
                      tag
                    >
                      {moment(report.lastupdatedtime, "'DD/MM/YYYY h:mm:ss'")
                        .startOf('hour')
                        .fromNow()}{' '}
                    </Label>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === reportInd}>
                    {getGridReport(report)}
                  </Accordion.Content>
                </Accordion>
              );
            }
            return (
              <div
                className="ct-state-reports-container"
                key={report.statecode}
              >
                <Header as="h4" attached="top">
                  STATE WISE
                  <Label
                    className="ct-state-reports-acc-label"
                    color="teal"
                    tag
                  >
                    {moment(report.lastupdatedtime, "'DD/MM/YYYY h:mm:ss'")
                      .startOf('hour')
                      .fromNow()}{' '}
                  </Label>
                </Header>
                <Segment attached>
                  <Header as="h5">TOTAL</Header>
                  {getGridReport(report)}
                </Segment>
                {filterStateReports.length === 1 &&
                  noResultComp('No Search Data Found')}
              </div>
            );
          })
        : noResultComp('No Data Found')}
    </section>
  );
}

export default CTStateReports;
