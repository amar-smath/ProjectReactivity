import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import LoadComponent from "../../app/layout/LoadComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { ActivityFormValues } from "./../../models/activity";
import * as Yup from "yup";
import TextFieldInput from "../../app/common/form/TextFieldInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import SelectInput from "../../app/common/form/SelectInput";
import { categoryOptions } from "../../app/common/options/categoryOptions";
import CustomDateInput from "./../../app/common/form/CustomDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const history = useHistory();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Activity Title is Required!"),
    description: Yup.string().required("Activity Description is Required!"),
    category: Yup.string().required("Activity Category is Required!"),
    date: Yup.string().required("Activity Date is Required!"),
    city: Yup.string().required("Activity City is Required!"),
    venue: Yup.string().required("Activity Venue is Required!"),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity!))
      );
  }, [id, loadActivity]);

  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }
  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }

    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  if (loadingInitial) return <LoadComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header sub color="teal" content="Activity Details" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">
            <TextFieldInput placeholder="Title" name="title" />
            <TextAreaInput
              placeholder="Description"
              name="description"
              rows={3}
            />
            <SelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            />
            <CustomDateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header sub content="Location Details" color="teal"></Header>
            <TextFieldInput placeholder="City" name="city" />
            <TextFieldInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              floated="right"
              content="Submit"
              positive
              type="submit"
              loading={isSubmitting}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              content="Cancel"
              type="button"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
