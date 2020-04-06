//import node modules
import React, { useState, useEffect } from 'react';
import { Header, Table, Input } from 'semantic-ui-react';

//import styles
import './CTDistrictReports.component.scss';

function CTDistrictReports(props) {
  const [filterDistrictReports, setFilterDistrictReports] = useState([]);

  useEffect(() => {
    setFilterDistrictReports(props.reportData);
  }, [props.reportData]);

  const searchDistrictReports = (evData) => {
    const filterDistrictReports = props.reportData.filter((distVal) => {
      if (
        distVal.district &&
        distVal.district
          .toLowerCase()
          .indexOf(evData.value.toLowerCase().trim()) !== -1
      ) {
        return distVal;
      }
    });
    setFilterDistrictReports(filterDistrictReports);
  };

  return (
    <section className="ct-district-reports-wrapper">
      <Input
        fluid
        icon="search"
        onChange={(ev, evData) => {
          searchDistrictReports(evData);
        }}
        placeholder="Filter district name..."
        disabled={!(props.reportData && props.reportData.length > 0)}
      />
      {filterDistrictReports && filterDistrictReports.length > 0 && (
        <Header as="h5">Last updated data:</Header>
      )}
      <Table celled unstackable className="ct-district-reports-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>DISTRICT</Table.HeaderCell>
            <Table.HeaderCell>CONFIRMED</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filterDistrictReports && filterDistrictReports.length > 0 ? (
            filterDistrictReports.map((report) => {
              return (
                <Table.Row key={report.district}>
                  <Table.Cell>{report.district}</Table.Cell>
                  <Table.Cell>{report.confirmed}</Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  );
}

export default CTDistrictReports;
