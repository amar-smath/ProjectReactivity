import { ErrorMessage, Form, Formik } from "formik";
import * as React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import TextFieldInput from "../../app/common/form/TextFieldInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) => {
          setErrors({ error: "Invalid Username or Password!" });
        })
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Login to Reactivities" textAlign="center" />
          <TextFieldInput name="email" placeholder="Email" />
          <TextFieldInput
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                content={errors.error}
                style={{ marginBottom: "5%" }}
                basic
                color="red"
              ></Label>
            )}
          />
          <Button
            positive
            fluid
            content="Login"
            type="submit"
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
});
