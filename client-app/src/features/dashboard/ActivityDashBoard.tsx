import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";
import { useEffect } from "react";
import LoadComponent from "../../app/layout/LoadComponent";

export default observer(function ActivitiesDashBoard() {
  const { activityStore } = useStore();
  const { loadingActivities, activityRegistery } = activityStore;

  useEffect(() => {
    if (activityRegistery.size <= 1) loadingActivities();
  }, [activityRegistery.size, loadingActivities]);

  // useEffect(() => {
  //   activityStore.loadingActivities();
  // }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadComponent content="Loading app.." />;

  // const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {/* {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm></ActivityForm>} */}
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
