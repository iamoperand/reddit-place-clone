import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { config } from './config/constants';


firebase.initializeApp(config);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});


class App extends Component {
  state = {
    pixels: [],
    currentPos: null,
  }

  componentDidMount = async () => {
    const querySnapshot = await db.collection("pixels").get();

    const initialPixels = [];
    querySnapshot.forEach((doc) => {
      initialPixels.push(doc.data());
    });

    this.setState({
      pixels: initialPixels,
    })
  }

  onClickHandler = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    this.setState({
      currentPos: {
        x,
        y,
      }
    });
  }


  colorChangeHandler = async (color, e) => {
    // stop bubbling
    e.stopPropagation();

    const { hex } = color;

    const { currentPos: { x, y } } = this.state;

    await db.collection("pixels").add({
      x,
      y,
      color: hex,
    });

    this.setState(prevState => ({
      pixels: [
        ...prevState.pixels,
        {
          x,
          y,
          color: hex,
        },
      ],
      currentPos: null,
    }));
  }

  render() {
    const {
      pixels,
      currentPos,
    } = this.state;
    return (
      <div
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
        }}
        onClick={this.onClickHandler}
      >
      {
        pixels && pixels.map((pixel, index) => (
          <span
            style={{
              position: 'absolute',
              top: pixel.y,
              left: pixel.x,
              width: '5px',
              height: '5px',
              backgroundColor: pixel.color,
            }}
            key={(pixel.color + pixel.x + pixel.y + index).toString()}
          />

        ))
      }
        {
          currentPos
            &&  <div
                  style={{
                    position: 'absolute',
                    top: currentPos.y,
                    left: currentPos.x,
                  }}
                >
                  <CirclePicker
                    onChange={this.colorChangeHandler}
                  />
                </div>
        }
      </div>
    );
  }
}

export default App;
