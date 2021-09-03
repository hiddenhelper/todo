import React, { useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";

export const EditItem = ({ item, saveItem }) => {
  const [text, setText] = useState(item.text);

  const onChange = (event, { value }) => {
    setText(value);
  };

  const validate = () => {
    if (text.length === 0 || text.length > 25) {
      return false;
    }

    return true;
  };

  const onSave = () => {
    saveItem({ id: item.id, text });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Input defaultValue={text} onChange={onChange} />
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Button color="black" onClick={onSave} disabled={!validate()}>
          Save
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default EditItem;
