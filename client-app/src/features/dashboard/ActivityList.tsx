import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import { SyntheticEvent, useState } from "react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
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
                  onClick={() => selectActivity(x.id)}
                />
                <Button
                  name={x.id}
                  content="Delete"
                  color="red"
                  floated="right"
                  onClick={(e) => handleDeleteActivity(e, x.id)}
                  loading={submitting && target === x.id}
                />
                <Label basic content={x.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
