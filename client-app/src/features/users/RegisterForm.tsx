import { ErrorMessage, Form, Formik } from "formik";
import * as React from "react";
import { Button, Header } from "semantic-ui-react";
import TextFieldInput from "../../app/common/form/TextFieldInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username  is Required!"),
    displayName: Yup.string().required("DisplayName  is Required!"),
    email: Yup.string().required("Email is Required!"),
    password: Yup.string().required("Password cannot be empty!"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        error: null,
        displayName: "",
        username: "",
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => {
          setErrors({ error });
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header as="h2" content="Signup to Reactivities" textAlign="center" />
          <TextFieldInput name="displayName" placeholder="Display Name" />
          <TextFieldInput name="username" placeholder="Username" />
          <TextFieldInput name="email" placeholder="Email" />
          <TextFieldInput
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            positive
            fluid
            content="Register"
            type="submit"
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
});
