import React from 'react';

import './Home.scss';

const Home = (props) => {
  return (
    <div className="home-page">
      <h1>Welcome to HotsData Beta</h1>
      <h3 className="purple">The Goal</h3>
      <p>
        The goal of our site to help your improve your play through data.  We want to help you figure out where you're strong and where you're weak.  We'll be adding goals so you can track certain stats that you're working to improve.
      </p>

      <h3 className="purple">Will there be ads?</h3>
      <p>
        No! We hate ads too. Eventually we may offer a patreon and/or premium option that gives you some bonus features. Our goal isn't to make money.  We're doing this for the community and because we want to use these tools ourselves.  If we decide to add a way of bringing in money, it'll just be to cover our costs.  If there's anything left over, maybe we'll host some tournaments or something.  This is an area we want to be highly transparent about.  It's a side project for us, not our source of income.
      </p>

      <h3 className="purple">What about MMR?</h3>
      <p>
        While we use MMR from other sites like many others do, that's not the focus of this site.  Firstly, it takes nearly 100% of replays to get an accurate MMR.  We're new and won't have all those replays.  Second, it's not what's important.  We're focused on helping you improve, not giving you a number to brag about.  That being said, it's nice to know where you stand and if you're improving overall.  We're discussing a number of ways to show you this.  If you have your own ideas, leave us some feedback.  We're open to listening to the community as there is a lot of great ideas out there.
      </p>

    </div>
  )
}

export default Home;
