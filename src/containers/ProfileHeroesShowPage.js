import React from 'react';

class ProfileHeroesShowPage extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
  }

  render() {
    return (
      <div className="">
        <h1>Coming Soon!</h1>
        <p>
          This page will contain detailed stats about a hero including how you compare to everyone else.
        </p>
      </div>
    )
  }

}

export default ProfileHeroesShowPage;
