import { css } from "glamor";
import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Table } from "semantic-ui-react";
import { useHistory } from "react-router";
import uuid from "react-uuid";

import { EditItem } from "./sub-components/Edit-item";
import { ShowItem } from "./sub-components/Show-item";
import { retrieveList, storeList } from "../local-storage";
import "../assets/styles.css";

export const ToDo = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    const getListFromLocalStorage = () => {
      const result = retrieveList();
      if (result) {
        setList(result);
      } else {
        setList([]);
      }
    }

    getListFromLocalStorage();
  }, []);

  const logOut = () => {
    history.push("/");
  };

  const createItem = () => {
    const unqiueID = uuid();
    setList((list) => [...list, { text: "", edit: true, id: unqiueID }]);
  };

  const saveItem = ({ id, text }) => {
    let clone = [...list];
    const index = list.findIndex((l) => l.id === id); // find index using id
    clone[index] = {
      text,
      edit: false,
      id,
    };
    setList(clone);
    storeList(clone);
  };

  const editItem = ({ id }) => {
    let clone = [...list];
    const index = list.findIndex((l) => l.id === id);
    clone[index] = { ...clone[index], edit: true };
    setList(clone);
    storeList(clone);
  };

  const removeItem = ({ id }) => {
    const result = list.filter((l) => l.id !== id);
    setList(result);
    storeList(result);
  };

  return (
    <>
      <div {...css(styles.logOutBtnParent)}>
        <Button {...css(styles.logOutBtn)} onClick={logOut}>
          Logout
        </Button>
      </div>
      <Grid container centered>
        <Grid.Column computer={8} tablet={12} mobile={14}>
          <h1 className="text-align-center">My To-Do List</h1>
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Input
                    icon="search"
                    placeholder="search"
                    iconPosition="left"
                    onChange={(e) => {
                      setSearchStr(e.target.value);
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <Button
                    color="blue"
                    {...css(styles.newBtn)}
                    onClick={createItem}
                  >
                    New
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {list &&
                list.map((item, index) => {
                  if (
                    item.text.toLowerCase().includes(searchStr.toLowerCase())
                  ) {
                    if (item.edit) {
                      return (
                        <EditItem key={index} item={item} saveItem={saveItem} />
                      );
                    }
                    return (
                      <ShowItem
                        key={index}
                        item={item}
                        editItem={editItem}
                        removeItem={removeItem}
                      />
                    );
                  }
                  return <></>;
                })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </>
  );
};

export const styles = {
  logOutBtn: {
    border: "solid 1px !important",
    borderColor: "black !important",
    boxShadow: "5px 5px black !important",
  },
  logOutBtnParent: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "20px",
  },
  newBtn: {
    border: "solid 1px !important",
    borderColor: "black !important",
    boxShadow: "5px 5px black !important",
  },
};

export default ToDo;
