import { Button, Card, Image } from "semantic-ui-react";
import LoadComponent from "../../app/layout/LoadComponent";
import { useStore } from "./../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    setOpenForm,
    setCancelSelectedActivity,
  } = activityStore;

  if (!activity) return <LoadComponent></LoadComponent>;
  return (
    <>
      <Card fluid>
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
              basic
              content="Edit"
              color="blue"
              onClick={() => setOpenForm(activity.id)}
            />
            <Button
              basic
              content="Cancel"
              color="grey"
              onClick={setCancelSelectedActivity}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
}
