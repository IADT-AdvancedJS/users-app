import React from 'react';

class DropDown extends React.Component {
  render() {
    const options = this.props.options.map(item => {
      return <option key={item} value={item}>{item}</option>;
    });
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{this.props.label}</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <div className="select is-fullwidth">
                <select value={this.props.selected} name={this.props.name} onChange={this.props.handleChange}>
                  {options}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;
