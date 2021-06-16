import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  name: string;
  label?: string;
  placeholder: string;
  rows: number;
}

export default function TextAreaInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
