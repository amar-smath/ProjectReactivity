import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivitiesDashBoard from "../../features/dashboard/ActivityDashBoard";
import LoadComponent from "./LoadComponent";
import { useStore } from "./../stores/store";
import { observer } from "mobx-react";
import { Container } from "semantic-ui-react";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadComponent content="Loading app.." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashBoard></ActivitiesDashBoard>
      </Container>
    </>
  );
}
export default observer(App);

// const [activities, setActivities] = useState<Activity[]>([]);
// const [submitting, setSubmit] = useState(false);
// useEffect(() => {
//   agent.Activities.list().then((response) => {
//     let activities: Activity[] = [];
//     response.forEach((activity) => {
//       activity.date = activity.date.split("T")[0];
//       activities.push(activity);
//     });
//     setActivities(activities);
//     setLoading(false);
//   });
// }, []);

// useEffect(() => {
//   axios
//     .get<Activity[]>("http://localhost:5000/api/activities")
//     .then((response) => {
//       setActivities(response.data);
//     });
// }, []);

// function handleSelectedActivity(id: string) {
//   setSelectedActivity(activities.find((x) => x.id === id));
// }

// function handleCancelSelectedActivity() {
//   setSelectedActivity(undefined);
// }

// function handleFormOpen(id?: string) {
//   id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
//   setEditMode(true);
// }

// function handleFormClose() {
//   setEditMode(false);
// }

// function handleCreateOrEditActivity(activity: Activity) {
//   setSubmit(true);
//   if (activity.id) {
//     agent.Activities.update(activity).then(() => {
//       setActivities([
//         ...activities.filter((x) => x.id !== activity.id),
//         activity,
//       ]);
//       setEditMode(false);
//       setSelectedActivity(activity);
//       setSubmit(false);
//     });
//   } else {
//     activity.id = uuid();
//     agent.Activities.create(activity).then(() => {
//       setActivities([...activities, { ...activity, id: uuid() }]);
//     });
//     setEditMode(false);
//     setSelectedActivity(activity);
//     setSubmit(false);
//   }
// }

// function handleDeleteActivity(id: string) {
//   setSubmit(true);
//   agent.Activities.delete(id).then(() => {
//     setActivities([...activities.filter((x) => x.id !== id)]);
//     setSubmit(false);
//   });
// }
