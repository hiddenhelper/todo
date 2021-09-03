import React, { useState } from "react";
import { Button, Form, Grid, Input } from "semantic-ui-react";
import validator from "validator";
import { css } from "glamor";
import { fetchData } from "../services";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (event, { name, value }) => {
    if (name === "email") {
      if (!value) {
        // email = null, then clear error msg.
        setErrorMsg({ ...errorMsg, email: "" });
      } else if (!validator.isEmail(value)) {
        setErrorMsg({ ...errorMsg, email: "Not a valid email" });
      } else if (value.length > 50) {
        setErrorMsg({
          ...errorMsg,
          email: "email address should be no more than 50",
        });
      } else {
        // email = validated, then clear error msg
        setErrorMsg({ ...errorMsg, email: "" });
      }
    } else if (name === "password") {
      if (!value) {
        // password = null, then clear error msg.
        setErrorMsg({ ...errorMsg, password: "" });
      } else if (value.length < 4) {
        setErrorMsg({
          ...errorMsg,
          password: "password should be at least 4 characters",
        });
      } else if (value.length > 16) {
        setErrorMsg({
          ...errorMsg,
          password: "password should be no more than 15 characters",
        });
      } else {
        // password = validated, then clear error msg.
        setErrorMsg({ ...errorMsg, password: "" });
      }
    }

    setValues({ ...values, [name]: value });
  };

  const isValidated = () => {
    if (
      !errorMsg.email &&
      !errorMsg.password &&
      values.email &&
      values.password
    ) {
      return true;
    }
    return false;
  };

  const submit = async () => {
    if (isValidated()) {
      console.log("submit");
      try {
        setIsSubmit(true);

        const formData = new FormData();
        formData.append("email", "test@rapptrlabs.com");
        formData.append("password", "Test123");
        const response = await fetchData(formData);
        console.log(response);

        setIsSubmit(false);
      } catch (error) {
        console.log(error);
        setIsSubmit(false);
      }
    }
  };

  const focusedEvent = (type, value) => {
    setIsFocused({ ...isFocused, [type]: value });
  };

  return (
    <>
      <Grid container>
        <Grid.Column computer={4} tablet={2} mobile={1}></Grid.Column>
        <Grid.Column computer={8} tablet={12} mobile={14} textAlign={"left"}>
          <h1 {...css(styles.textAlignCenter)}>Rapptr Labs</h1>

          <Form onSubmit={submit}>
            <Form.Field>
              <label>Email</label>
              <Input
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="user@rapptrlabs.com"
                type="text"
                required
                onChange={validate}
                onFocus={() => {
                  focusedEvent("email", true);
                }}
                onBlur={() => {
                  focusedEvent("email", false);
                }}
                {...css(
                  isFocused.email && errorMsg.email && styles.borderColorRed
                )}
              />
              <label {...css(styles.colorRed)}>
                {isFocused.email && errorMsg.email}
              </label>
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <Input
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Must be at least 4 characters"
                type="password"
                required
                onChange={validate}
                onFocus={() => {
                  focusedEvent("password", true);
                }}
                onBlur={() => {
                  focusedEvent("password", false);
                }}
                {...css(
                  isFocused.password &&
                    errorMsg.password &&
                    styles.borderColorRed
                )}
              />
               
              <label {...css(styles.colorRed)}>
                {isFocused.password && errorMsg.password}
              </label>
            </Form.Field>

            <Button
              type="submit"
              color="blue"
              disabled={isSubmit}
              {...css(styles.logInBtn, !isValidated() && styles.opacity50)}
            >
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export const styles = {
  textAlignCenter: {
    textAlign: "center",
  },
  colorRed: {
    color: "red !important",
  },
  logInBtn: {
    width: "100% !important",
    border: "solid 1px !important",
    borderColor: "black !important",
    boxShadow: "5px 5px black !important",
  },
  opacity50: {
    opacity: "0.5 !important",
  },
  borderColorRed: {
    border: "solid 1px",
    borderColor: "red",
  },
};

export default LogIn;
