import React from "react";
import TableComponent from "../../components/TableComponent";
import data from "../../data.json";
import {jsonToTable} from "../../helper";

const DataBahan = () => {
  return (
    <div>
      <TableComponent
        dataTable={jsonToTable(data.data_bahan)}
        title="Data Bahan"
      />
    </div>
  );
};

export default DataBahan;
