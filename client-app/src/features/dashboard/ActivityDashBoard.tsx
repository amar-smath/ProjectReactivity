import { Grid } from "semantic-ui-react";
import ActivityForm from "../form/ActivityForm";
import ActivityDetails from "./ActivityDetails";
import ActivityList from "./ActivityList";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";

export default observer(function ActivitiesDashBoard() {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm></ActivityForm>}
      </Grid.Column>
    </Grid>
  );
});
