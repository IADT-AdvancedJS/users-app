/* React Example - UserProfileList v3

Fetches data from the RandomUser API and displays it in a grid.

One <select> element is used to filter by gender (male/female as supplied by the
API).
Another <select> element is used to filter by nationality.
A radio button element is used to toggle alphabetical sorting of the users by
name.
A text <input> is used to filter by user name.
A <button> is used to switch between contrast modes.

Styled using Bulma (https://bulma.io).

- AE 12/02/18
*/

import React from 'react';
import UserCard from './Components/UserCard';
import DropDown from './Components/DropDown';
import SortRadioButton from './Components/SortRadioButton';
import LabelledInput from './Components/LabelledInput';
import ToggleButton from './Components/ToggleButton';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      users: [],
      genderSelected: 'all',
      nationalitySelected: 'all',
      nationalityValues: [],
      sort: 'no',
      searchText: '',
      contrastMode: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    //Get a number of users from the API and store their information in state
    fetch('https://randomuser.me/api/?results=60')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {


      const users = data.results.map(user => {
        return {name: user.name.first,
          image: user.picture.large,
          gender: user.gender,
          nationality: user.nat};
      });
      this.setState({users: users});

      // sort and remove duplicate nationalities
      // store the result in state to be used for the dropdown menu options
      const nat = users.map(user => {
        return user.nationality;
      });
      const deduped = [...new Set(nat)];
      deduped.sort();
      this.setState({nationalityValues: deduped});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(event) {
    // handle both of the <select> UI elements
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    // handle the toggle <button>
    const name = event.target.name;
    this.setState(prevState => ({
       [name]: !prevState[name]
    }));
  }

  render() {

    // if results are to be sorted, create a copy of the user data and sort it,
    // otherwise just use the original data from the state
    const data = this.state.sort === 'no' ? this.state.users : [].concat(this.state.users)
    .sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    // Generate unique user cards for each user
    // Each card needs a unique key, for our purposes we're using
    // name + image URL (not guaranteed to be unique, but sufficient for this)
    // Check the state of the inputs and skip cards not matching the
    // required nationality & gender & search text
    let userList = data.map(user => {
      const genderMatch = (this.state.genderSelected === user.gender || this.state.genderSelected === 'all');
      const natMatch = (this.state.nationalitySelected === user.nationality || this.state.nationalitySelected === 'all');
      const nameMatch = user.name.startsWith(this.state.searchText);
      return (genderMatch && natMatch && nameMatch) ? (
        <UserCard name={user.name} image={user.image} nat={user.nationality} key={user.name + user.image}/>
      ) : null;
    });

    return (
      <section className="section">
        <div className={this.state.contrastMode ? "notification is-success" : "notification"}>
          <DropDown options={['all','male','female']} name="genderSelected" handleChange={this.handleChange} label="Filter by gender" selected={this.state.genderSelected} />

          <DropDown options={['all'].concat(this.state.nationalityValues)} name="nationalitySelected" handleChange={this.handleChange} label="Filter by nationality" selected={this.state.nationalitySelected} />

          <SortRadioButton handleChange={this.handleChange} checked={this.state.sort}/>

          <LabelledInput name="searchText" label="Search by name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. alberto"} />

          <ToggleButton name="contrastMode" handleClick={this.handleClick} toggle={this.state.contrastMode} labelOn="Switch to low contrast" labelOff="Switch to high contrast" />

    			<div className="columns is-multiline">
            {userList}
    			</div>
        </div>

      </section>
    );
  }
}

export default App;
