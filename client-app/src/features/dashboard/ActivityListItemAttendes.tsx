import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../models/profile";
import ProfileCard from "../profiles/ProfileCard";

interface Props {
  attendees: Profile[];
}

export default observer(function ActivityAttendees({ attendees }: Props) {
  return (
    <List horizontal>
      {attendees.map((x) => (
        <Popup
          hoverable
          key={x.username}
          trigger={
            <List.Item
              key={x.username}
              as={Link}
              to={`/profiles/${x.username}`}
            >
              <Image
                size="mini"
                src={x.image || "/assets/user.png"}
                circular
              ></Image>
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={x} />
          </Popup.Content>
        </Popup>
      ))}

      <List.Item>
        <Image size="mini" src="/assets/user.png" circular></Image>
      </List.Item>
      <List.Item>
        <Image size="mini" src="/assets/user.png" circular></Image>
      </List.Item>
    </List>
  );
});
