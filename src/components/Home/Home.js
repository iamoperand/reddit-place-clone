import React, { Component } from 'react';
import {
  Row,
  Button,
  Icon,
} from 'antd';
import PropTypes from 'prop-types';


import routes from '../../config/routes';


class Home extends Component {
  letsPlay = () => {
    const { history } = this.props;
    history.push(routes.Playground);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '1em 0' }}>
        <Row>
          <h1>Reddit Place Clone</h1>
        </Row>

        <Row style={{ margin: '3em 0' }}>
          <Row>
            <h2>&ldquo;Place your Pixel&rdquo;</h2>
          </Row>
          <Row>
            <h3>Let&apos;s build something beautiful</h3>
          </Row>
        </Row>


        <Row style={{ marginTop: '5em' }}>
          <Row>
            <h3>Are you ready?</h3>
          </Row>
          <Row>
            <Button type="primary" onClick={this.letsPlay}>
              Let&apos;s Play<Icon type="right" />
            </Button>
          </Row>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default Home;
