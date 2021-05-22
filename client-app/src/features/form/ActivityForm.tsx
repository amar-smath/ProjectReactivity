import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import LoadComponent from "../../app/layout/LoadComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const history = useHistory();
  const {
    loading,
    createActivity,
    updateActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  function handleSubmit() {
    if (activity.id.length === 0) {
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
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          type="Date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          content="Submit"
          positive
          type="submit"
          loading={loading}
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          content="Cancel"
          type="button"
        />
      </Form>
    </Segment>
  );
});
