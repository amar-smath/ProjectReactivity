import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";
import { useEffect } from "react";
import LoadComponent from "../../app/layout/LoadComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivitiesDashBoard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  // useEffect(() => {
  //   activityStore.loadingActivities();
  // }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadComponent content="Loading activities.." />;

  // const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {/* {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm></ActivityForm>} */}
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
