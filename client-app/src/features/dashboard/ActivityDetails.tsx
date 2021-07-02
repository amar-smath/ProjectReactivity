import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadComponent from "../../app/layout/LoadComponent";
import ActivityDetailedChat from "../activities/details/ActivityDetailedChat";
import ActivityDetailedHeader from "../activities/details/ActivityDetailedHeader";
import ActivityDetailedInfo from "../activities/details/ActivityDetailedInfo";
import ActivityDetailedSideBar from "../activities/details/ActivityDetailedSideBar";
import { useStore } from "./../../app/stores/store";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadComponent></LoadComponent>;
  return (
    <>
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailedSideBar activity={activity} />
        </GridColumn>
      </Grid>

      {/* <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths="2">
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              basic
              content="Edit"
              color="blue"
            />
            <Button
              as={Link}
              to="/activities"
              basic
              content="Cancel"
              color="grey"
            />
          </Button.Group>
        </Card.Content>
      </Card> */}
    </>
  );
});
