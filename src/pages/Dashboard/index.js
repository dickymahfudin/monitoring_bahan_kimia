import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import arrayMove from "array-move";
import { jsonToTable, dateTime, timestamp } from "../../helper";
import { Box, Grid, makeStyles } from "@material-ui/core";
import PaperBahan from "../../components/PaperBahan";
import ActionButton from "../../components/ActionButton";
import { connect } from "react-redux";
import {
  apiGetDataControl,
  apiSetDataControl,
  apiGetDataPemakai,
  apiAddDataPemakai,
} from "../../helper/redux/action";

const door1 = "#4698DD";
const door2 = "#48EA9C";
const door3 = "#FE6061";
const colorOn = "#C4C4C4";
let tempTm = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    "& > *": {
      width: theme.spacing(37),
      height: theme.spacing(20),
    },
  },
  paper: {
    "& > *": {
      width: theme.spacing(20),
      height: theme.spacing(10),
      marginBottom: 20,
    },
  },
}));

const Dashboard = ({
  getControl,
  setControl,
  dataControl,
  dataSensors,
  dataPemakai,
  addPemakai,
}) => {
  const classes = useStyles();
  const [dataTable, setDataTable] = useState({ data: false, columns: false });
  const [controls, setContorls] = useState([
    { id: "door1", data: 0, color: door1, label: "Box 1" },
    { id: "door2", data: 0, color: door2, label: "Box 2" },
    { id: "door3", data: 0, color: door3, label: "Box 3" },
  ]);
  const [sensors, setSensors] = useState([
    { id: "box1", data: 0, color: door1, label: "Alkohol" },
    { id: "box2", data: 0, color: door2, label: "Spirtus" },
    { id: "box3", data: 0, color: door3, label: "Aquades" },
  ]);
  const [records, setRecords] = useState([
    { id: "box1", data: 0 },
    { id: "box2", data: 0 },
    { id: "box3", data: 0 },
  ]);

  const handleControl = (data) => {
    const id = data.label.replace(/\s/g, "").toLowerCase();
    const valueId = sensors.find((e) => e.id === id);

    if (data.data === 0) {
      localStorage.setItem(id, JSON.stringify(valueId.data));
    } else {
      const userLogin = JSON.parse(localStorage.getItem("user"));
      const nama = userLogin.nama;
      const npm = userLogin.npm;
      const tm = timestamp();
      const waktu = dateTime();
      const tempSensor = JSON.parse(localStorage.getItem(id)) || valueId.data;
      const tempData = tempSensor - valueId.data;
      const newItems = [
        {
          id: id,
          data: tempData,
        },
      ];
      let alkohol, aquades, spirtus;

      const temp = records.map((x) => {
        const item = newItems.find(({ id }) => id === x.id);
        return item ? item : tempTm === tm ? x : { id: x.id, data: 0 };
      });
      setRecords(temp);
      temp.forEach((record) => {
        if (record.id === "box1") alkohol = record.data;
        else if (record.id === "box2") spirtus = record.data;
        else if (record.id === "box3") aquades = record.data;
      });

      addPemakai({ tm, waktu, nama, npm, alkohol, aquades, spirtus });
      localStorage.setItem(id, JSON.stringify(0));
      tempTm = tm;
    }
    setControl({ id: data.id, value: data.data === 1 ? 0 : 1 });
  };

  useEffect(() => {
    getControl();
    sensors.forEach((sensor) => {
      localStorage.setItem(sensor.id, JSON.stringify(0));
    });
  }, []);

  useEffect(() => {
    if (dataControl) {
      let temp = [];
      dataControl.forEach((item) => {
        let tempControl = controls.find((e) => e.id === item.id);
        if (tempControl) {
          temp.push({
            ...tempControl,
            data: item.data,
            color: item.data === 1 ? colorOn : eval(item.id),
          });
        }
        setContorls(temp);
      });
    }

    if (dataSensors) {
      let temp = [];
      dataSensors.forEach((item) => {
        let tempSensor = sensors.find((e) => e.id === item.id);
        // localStorage.setItem(item.id, JSON.stringify(parseInt(item.data)));
        temp.push({
          ...tempSensor,
          data: parseInt(item.data),
        });
        setSensors(temp);
      });
    }
    if (dataPemakai) {
      const table = jsonToTable(dataPemakai);
      const temp = arrayMove(table.columns, 2, 0);
      const temp2 = arrayMove(temp, 3, 1);
      setDataTable({ data: table.data, columns: arrayMove(temp2, 3, 4) });
    }
  }, [dataControl, dataSensors, dataPemakai]);

  return (
    <>
      <div className={classes.root}>
        {sensors.map((sensor) => {
          return (
            <PaperBahan
              key={sensor.label}
              color={sensor.color}
              label={sensor.label}
              value={sensor.data}
            />
          );
        })}
      </div>
      <Box display="flex" justifyContent="flex-start">
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="flex-start"
          sm={3}
        >
          <div className={classes.paper}>
            {controls.map((control) => {
              return (
                <ActionButton
                  key={control.id}
                  color={control.color}
                  handleClick={() => handleControl(control)}
                  label={
                    control.data === 1
                      ? `${control.label} Terbuka`
                      : `${control.label} Terkunci`
                  }
                />
              );
            })}
          </div>
        </Grid>

        {dataTable.data && (
          <div style={{ width: "100%" }}>
            <TableComponent
              data={dataTable.data}
              columns={dataTable.columns}
              title="Data Pemakaian Bahan"
              maxTable={370}
            />
          </div>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataControl: state.dataControl,
    dataSensors: state.dataSensors,
    dataUsers: state.dataUsers,
    dataPemakai: state.dataPemakai,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getControl: () => dispatch(apiGetDataControl()),
    setControl: (data) => dispatch(apiSetDataControl(data)),
    addPemakai: (data) => dispatch(apiAddDataPemakai(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
