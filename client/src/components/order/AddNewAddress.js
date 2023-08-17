import { useState, useEffect } from "react";

import "../../assets/styles/address.css";
import {
  createAddress,
  addressList,
  removeAddress,
} from "../../api/address-api";

const AddNewAddress = ({ onAddressesAdded }) => {
  const [makeAddress, setMakeAddress] = useState(false);
  const [noOfAddress, setNoOfAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [values, setValues] = useState({
    address: "",
    floor: "",
    error: "",
  });

  const addressDelete = (addressId) => {
    removeAddress(addressId)
      .then((response) =>
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== addressId)
        )
      )
      .catch((reason) => console.log(reason));
    setNoOfAddress(noOfAddress - 1);
  };

  const onChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const updateList = () => {
    addressList()
      .then((data) => setAddresses(data.addresses))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateList();
    onAddressesAdded(addresses.length > 0);
  }, [addresses, onAddressesAdded]);

  const onNewClick = () => {
    setMakeAddress(true);
  };

  const cancel = () => {
    setMakeAddress(false);
    setValues({ address: "", floor: 1 });
  };

  const onAddClick = () => {
    if (values.address === "" || values.floor === "") {
      setValues({ ...values, error: "Enter values in both fields" });
    } else if (!values.floor.toString().match(/^[0-9]*$/)) {
      setValues({ ...values, error: "Floor must be a number" });
      return;
    } else {
      setValues({ ...values, error: "" });

      const address = {
        address: values.address,
        floor: values.floor,
      };

      createAddress(address)
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setNoOfAddress(true);
            setMakeAddress(false);
            setValues({ address: "", floor: 1, error: "" });
            updateList();
          }
        })
        .catch((error) => {
          console.log(error);
          setValues({ ...values, error: "Error while creating address" });
        });
    }
  };

  return (
    <div className="addressWrapper">
      <div className="addresses">
        {addresses &&
          addresses.map((address, i) => (
            <div className="address" key={i}>
              <div
                className="displayFlex"
                style={{ alignItems: "flex-start", paddingBottom: "0px" }}
              >
                <p>Address:</p>
                <p id="address">{address.address}</p>
              </div>
              <div className="displayFlex" style={{ padding: "3px 0px" }}>
                <p>Floor:</p>
                <p style={{ width: "100%", fontWeight: "500" }}>
                  {address.floor}
                </p>
              </div>
              <div className="displayFlex" style={{ padding: "3px 0px" }}>
                <p>Chack:</p>
                <input
                  id="radio"
                  defaultChecked={i === 0 ? true : false}
                  type="radio"
                  style={{ marginLeft: "1px" }}
                  name="address"
                  value={address.address}
                />
              </div>
              <div
                className="delete address"
                onClick={() => addressDelete(address._id)}
              >
                <p>x</p>
              </div>
            </div>
          ))}
        <div className={!makeAddress ? "addressNew" : "addressForm"}>
          {!makeAddress && (
            <div
              onClick={() => onNewClick()}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1>Add new</h1>
              <div className="addresOverlay">
                <h1>+</h1>
              </div>
            </div>
          )}

          {makeAddress && (
            <div style={{ position: "relative", height: "100%" }}>
              <div className="displayFlex">
                <p>Address:</p>
                <input
                  className={values.error ? "error" : ""}
                  type="text"
                  placeholder="Add address"
                  onChange={onChange("address")}
                  value={values.address}
                />
              </div>
              <div className="displayFlex">
                <p>Floor:</p>
                <input
                  type="text"
                  onChange={onChange("floor")}
                  value={values.floor}
                />
              </div>
              <div style={{ float: "right" }}>
                <button
                  id="cancel"
                  style={{ color: "#fff", marginRight: "1em" }}
                  onClick={() => cancel()}
                >
                  Cancel
                </button>
                <button
                  id="add"
                  style={{ color: "#fff", marginRight: "1em" }}
                  onClick={() => onAddClick()}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {values.error && (
        <div className="justify-content-center">
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "20px",
            }}
          >
            {values.error}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddNewAddress;
