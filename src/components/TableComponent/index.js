import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

import CircularProgress from "@material-ui/core/CircularProgress";

const TableComponent = ({ data, columns, title, customToolbar, maxTable }) => {
  let options = {
    filter: false,
    sort: true,
    tableBodyMaxHeight: maxTable,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    responsive: "standard",
    draggableColumns: {
      enabled: false,
    },
    download: true,
    print: false,
    viewColumns: false,
  };

  options = {
    ...options,
    customToolbar,
  };
  return (
    <>
      {data && (
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

TableComponent.propTypes = {
  customToolbar: PropTypes.func,
  maxTable: PropTypes.number,
  dataTable: PropTypes.any,
  title: PropTypes.string,
  error: PropTypes.any,
};

TableComponent.defaultProps = {
  maxTable: 450,
};

export default TableComponent;
