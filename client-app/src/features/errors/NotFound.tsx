import { Button, Header, Segment } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops- We have looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button
          as={Link}
          to="/activities"
          primary
          content="Return to activities page"
        ></Button>
      </Segment.Inline>
    </Segment>
  );
}
