import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "./../../app/stores/store";
import { observer } from "mobx-react";

// interface Props {
//   activities: Activity[];
// }
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const {
    deleteActivity,
    loading,
    activitiesByDate: activities,
  } = activityStore;
  const [target, setTarget] = useState("");

  function handleDeleteActivity(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((x) => (
          <Item key={x.id}>
            <Item.Content>
              <Item.Header as="a">{x.title}</Item.Header>
              <Item.Meta>{x.date}</Item.Meta>
              <Item.Description>
                <div>{x.description}</div>
                <div>
                  {x.city},{x.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  color="blue"
                  floated="right"
                  onClick={() => activityStore.setSelectedActivity(x.id)}
                />
                <Button
                  name={x.id}
                  content="Delete"
                  color="red"
                  floated="right"
                  onClick={(e) => handleDeleteActivity(e, x.id)}
                  loading={loading && target === x.id}
                />
                <Label basic content={x.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
