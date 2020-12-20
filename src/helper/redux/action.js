import { database } from "../firebase/config";

export const API_DATA_CONTROL = "API_DATA_CONTROL";
export const API_DATA_USERS = "API_DATA_USERS";
export const USER_LOGIN = "USER_LOGIN";
export const API_GET_DATA_SENSOR = "API_GET_DATA_SENSOR";
export const API_GET_DATA_PEMAKAI = "API_GET_DATA_PEMAKAI";
export const API_GET_DATA_PENAMBAHAN = "API_GET_DATA_PENAMBAHAN";
export const API_ADD_USER = "API_ADD_USER";
export const PEMAKAI_TOTAL = "PEMAKAI_TOTAL";

export const apiGetDataControl = () => (dispatch) => {
  const getControl = database.ref("control/");
  return new Promise((resolve) => {
    getControl.on("value", (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        return data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: API_DATA_CONTROL, payload: data });
      resolve(data);
    });
  });
};

export const apiGetUsers = () => (dispatch) => {
  const getControl = database.ref("users/");
  return new Promise((resolve) => {
    getControl.on("value", (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        return data.push(snapshot.val()[key]);
      });
      dispatch({ type: API_DATA_USERS, payload: data });
      resolve(data);
    });
  });
};

export const apiSetDataControl = (data) => (dispatch) => {
  var setControl = database.ref(`control/${data.id}`);
  return new Promise((resolve, reject) => {
    setControl.set(data.value, (error) => {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const userLogin = () => (dispatch) => {
  var user = JSON.parse(localStorage.getItem("user"));
  dispatch({ type: USER_LOGIN, payload: user });
};

export const apiGetDataSensors = () => (dispatch) => {
  var getDataSensors = database.ref(`sensors/LoadCell`);
  return new Promise((resolve) => {
    getDataSensors.on("value", (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        return data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: API_GET_DATA_SENSOR, payload: data });
      resolve(data);
    });
  });
};

export const apiGetDataPemakai = () => (dispatch) => {
  var getDataPemakai = database.ref(`pemakai/`);
  return new Promise((resolve) => {
    getDataPemakai.on("value", (snapshot) => {
      try {
        const data = [];
        const total = [];
        Object.keys(snapshot.val()).map((key) => {
          const tempData = [];
          Object.keys(snapshot.val()[key]).map((val) => {
            tempData.push(snapshot.val()[key][val]);
            return data.push(snapshot.val()[key][val]);
          });

          total.push({
            id: key,
            data: tempData,
          });
          return data;
        });
        let temp = [];
        total.forEach((e) => {
          let a = e.data.reduce((previousValue, currentValue) => {
            return {
              alkohol: previousValue.alkohol + currentValue.alkohol,
              spirtus: previousValue.spirtus + currentValue.spirtus,
              aquades: previousValue.aquades + currentValue.aquades,
            };
          });
          temp.push({
            ...a,
            id: e.id,
          });
        });
        dispatch({ type: API_GET_DATA_PEMAKAI, payload: data });
        dispatch({ type: PEMAKAI_TOTAL, payload: temp });
        // resolve(data);
      } catch (error) {
        // reject("false")
      }
    });
  });
};

export const apiGetDataPenambahan = () => (dispatch) => {
  var getDataPemakai = database.ref(`penambahan/`);
  return new Promise((resolve) => {
    getDataPemakai.on("value", (snapshot) => {
      try {
        const data = [];
        const total = [];
        Object.keys(snapshot.val()).map((key) => {
          data.push(snapshot.val()[key]);
        });

        dispatch({ type: API_GET_DATA_PENAMBAHAN, payload: data });
      } catch (error) {
        // reject("false")
      }
    });
  });
};

export const apiAddDataPemakai = (data) => (dispatch) => {
  database.ref(`pemakai/${data.npm}/${data.tm}`).set(
    {
      alkohol: data.alkohol,
      aquades: data.aquades,
      nama: data.nama,
      npm: data.npm,
      spirtus: data.spirtus,
      waktu: data.waktu,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        // console.log("masuk")
      }
    }
  );
};

export const apiAddDataPenambahan = (data) => (dispatch) => {
  console.log(data);
  database.ref(`penambahan/${data.tm}`).set(
    {
      alkohol: data.alkohol,
      aquades: data.aquades,
      spirtus: data.spirtus,
      waktu: data.waktu,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("masuk");
      }
    }
  );
};

export const apiAddUser = (data) => (dispatch) => {
  console.log(data);
  database.ref(`users/${data.npm}`).set(
    {
      nama: data.nama,
      npm: data.npm,
      no_hp: data.no_hp,
      password: data.password,
      status: data.status,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("masuk");
      }
    }
  );
};

export const apiRemoveUser = (data) => (dispatch) => {
  database.ref(`users/${data}`).remove();
};
