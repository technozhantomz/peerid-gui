import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

class LoadBar extends Component {
  state = {

  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Button type="submit" disabled={this.props.disabled}>
          {loading && <i className="fa fa-refresh fa-spin"></i>}
          {loading && <span>{this.props.btnStatus}</span>}
          {!loading && <span>{this.props.btnName}</span>}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.getIn(['profiles', 'loading'])
});

export default connect(
  mapStateToProps,
)(LoadBar);
