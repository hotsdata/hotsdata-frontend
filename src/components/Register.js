import React from 'react';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react';

class Register extends React.Component {

  render() {
    return (
      <Grid className="container">
        <h2>Register</h2>
        <Grid.Row>
          <Form>
            <Form.Input label="Email" type="text" labelPosition={"left"} />
            <Form.Input label="Passwword" type="password" />
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button primary type='submit'>Register</Button>
          </Form>
        </Grid.Row>
      </Grid>
    );
  }

}

export default Register;
