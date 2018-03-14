/* React Example - UserCard used in the UserProfileList Demo

USING PROPTYPES - https://reactjs.org/docs/typechecking-with-proptypes.html

Styled using Bulma (https://bulma.io).

- AE 12/02/18
*/

import React from 'react';
import PropTypes from 'prop-types';

class UserCard extends React.Component {
  render() {
    return (
      <div className="column is-3">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt='Profile' src={this.props.image}></img>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
UserCard.defaultProps = {
  name: 'randomuser',
  image: 'http://via.placeholder.com/400x400',
  nat: ''
};

// Checks that the correct type of props are supplied:
UserCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  nat: PropTypes.string
};

export default UserCard;
