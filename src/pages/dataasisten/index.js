import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { jsonToTable } from "../../helper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TooltipComponent from "../../components/TooltipComponent";
import OpenDialog from "../../components/OpenDialog";
import FormAsisten from "../../components/FormAsisten";
import { connect } from "react-redux";
import { apiRemoveUser } from "../../helper/redux/action";

const DataAsisten = ({ dataUsers, dataPemakaiTotal, removeUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [dataTable, setDataTable] = useState({ data: false, columns: false });
  const [test, setTest] = useState(false);

  const handleClick = (title, value) => {
    const temp = dataUsers.find((e) => e.npm == value);
    setTitleDialog(title);
    setTest(temp);
    setOpenDialog(true);
  };
  const handleDelete = (value) => {
    removeUser(value);
  };

  const customToolbar = () => {
    return (
      <TooltipComponent
        title="Add User"
        onClick={() => handleClick("ADD USER", null)}
        color="inherit"
      >
        <AddIcon />
      </TooltipComponent>
    );
  };

  useEffect(() => {
    if (dataUsers) {
      const totals = dataPemakaiTotal;
      let tempData = jsonToTable(dataUsers);
      let real = [...tempData.data];
      let columns = [...tempData.columns];
      const newLabel = ["alkohol", "spirtus", "aquades"];
      newLabel.forEach((element) => {
        columns.push({
          name: element,
          label: element.toLocaleUpperCase(),
        });
      });
      const data = real.map((x) => {
        const error = {
          alkohol: 0,
          spirtus: 0,
          aquades: 0,
        };
        const item = totals && totals.find(({ id }) => id === x.npm);
        const temp = item ? item : error;
        return {
          ...x,
          ...temp,
        };
      });
      columns.push({
        name: "npm",
        label: "EDIT",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value) => {
            return (
              <div>
                <TooltipComponent
                  title={`Edit ${value}`}
                  onClick={() => handleClick(`Edit ${value}`, value)}
                  color="inherit"
                >
                  <EditIcon />
                </TooltipComponent>

                <TooltipComponent
                  title={`Delete ${value}`}
                  onClick={() => handleDelete(value)}
                  color="inherit"
                >
                  <DeleteIcon />
                </TooltipComponent>
              </div>
            );
          },
        },
      });
      setDataTable({ data, columns });
    }
  }, [dataUsers]);

  return (
    <>
      {dataTable.data && (
        <TableComponent
          data={dataTable.data}
          columns={dataTable.columns}
          title="Data Asisten"
          customToolbar={customToolbar}
        />
      )}
      <OpenDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={titleDialog}
      >
        <FormAsisten data={test} setOpenDialog={setOpenDialog} />
      </OpenDialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUsers: state.dataUsers,
    userLogin: state.userLogin,
    dataPemakaiTotal: state.dataPemakaiTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (data) => dispatch(apiRemoveUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataAsisten);
