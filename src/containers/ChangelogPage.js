import React from 'react';

import './ChangelogPage.scss';

const ChangelogPage = (props) => {
  return (
    <div className="changelog-page">
      <h1>The Changelog</h1>
      <h3 className="orange">What we're working on</h3>
      <ul>
        <li>Player compare tool - compare yourself against your teammates or even pro players</li>
        <li>Friends - players you've played with a lot</li>
        <li>Follows - follow your favorite players</li>
        <li>Track metrics - track the metrics you care about or are working on</li>
      </ul>
      <h3 className="orange">Recently Released</h3>
      <ul>
        <li>User profile page, still very raw</li>
        <li>User heroes page</li>
        <li>Improved uploaders</li>
      </ul>
    </div>
  )
}

export default ChangelogPage;
