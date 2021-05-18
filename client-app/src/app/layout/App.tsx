import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "./../../models/activity";
import NavBar from "./NavBar";
import ActivitiesDashBoard from "../../features/dashboard/ActivityDashBoard";
import { v4 as uuid } from "uuid";
import { ReportHandler } from "web-vitals";
import agent from "./../api/agent";
import LoadComponent from "./LoadComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmit] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get<Activity[]>("http://localhost:5000/api/activities")
  //     .then((response) => {
  //       setActivities(response.data);
  //     });
  // }, []);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmit(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmit(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity, id: uuid() }]);
      });
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmit(false);
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmit(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmit(false);
    });
  }

  if (loading) return <LoadComponent content="Loading app.." />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        ></ActivitiesDashBoard>
      </Container>
    </>
  );
}
export default App;
