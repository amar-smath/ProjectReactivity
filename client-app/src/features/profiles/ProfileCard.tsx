import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { Profile } from "../../models/profile";

interface Props {
  profile: Profile;
}
export default function ProfileCard({ profile }: Props) {
  return (
    <>
      <Card as={Link} to={`/profiles/${profile.username}`}>
        <Image src={profile.image || "/assets/user.png"} />
        <Card.Content>
          <Card.Header>{profile.displayName}</Card.Header>
          <Card.Description>{profile.bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          20 followers
        </Card.Content>
      </Card>
    </>
  );
}
