import React from "react";
import { Button, Table } from "semantic-ui-react";

export const ShowItem = ({ item, editItem, removeItem }) => {
  const onEdit = () => {
    editItem({ id: item.id });
  };

  const onRemove = () => {
    removeItem({ id: item.id });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <label>{item.text}</label>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Button icon="pencil" onClick={onEdit} />
        <Button icon="trash" onClick={onRemove} />
      </Table.Cell>
    </Table.Row>
  );
};

export default ShowItem;
