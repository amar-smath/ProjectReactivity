import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import { format } from "date-fns";

interface Props {
  activity: Activity;
}

export function ActivityListItem({ activity }: Props) {
  // const { activityStore } = useStore();
  // const { deleteActivity } = activityStore;
  // const [target, setTarget] = useState("");

  // function handleDeleteActivity(
  //   event: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) {
  //   setTarget(event.currentTarget.name);
  //   deleteActivity(id);
  // }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted By Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendies go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          content="View"
          color="teal"
          floated="right"
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
    // <Item key={activity.id}>
    //   <Item.Content>
    //     <Item.Header as="a">{activity.title}</Item.Header>
    //     <Item.Meta>{activity.date}</Item.Meta>
    //     <Item.Description>
    //       <div>{activity.description}</div>
    //       <div>
    //         {activity.city},{activity.venue}
    //       </div>
    //     </Item.Description>
    //     <Item.Extra>
    //       <Button
    //         content="View"
    //         color="blue"
    //         floated="right"
    //         as={Link}
    //         to={`/activities/${activity.id}`}
    //         // onClick={() => activityStore.setSelectedActivity(activity.id)}
    //       />
    //       <Button
    //         name={activity.id}
    //         content="Delete"
    //         color="red"
    //         floated="right"
    //         onClick={(e) => handleDeleteActivity(e, activity.id)}
    //         loading={loading && target === activity.id}
    //       />
    //       <Label basic content={activity.category} />
    //     </Item.Extra>
    //   </Item.Content>
    // </Item>
  );
}
