import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

class SignIn extends React.Component {

  render() {
    return (
      <Grid className="container">
        <h2>Sign In</h2>
        <Grid.Row>
          <Form>
            <Form.Input label="Email" type="text" labelPosition={"left"} />
            <Form.Input label="Passwword" type="password" />
            <Button primary type='submit'>Sign In</Button>
          </Form>
        </Grid.Row>
      </Grid>
    );
  }

}

export default SignIn;
