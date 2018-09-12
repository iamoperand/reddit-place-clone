import React, { Component } from 'react';
import { CirclePicker } from 'react-color';


class App extends Component {
  state = {
    pixels: [],
    currentPos: null,
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


  colorChangeHandler = (color, e) => {
    // stop bubbling
    e.stopPropagation();

    const { hex } = color;

    const { currentPos: { x, y } } = this.state;

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
        pixels && pixels.map((pixel) => (
          <span
            style={{
              position: 'absolute',
              top: pixel.y,
              left: pixel.x,
              width: '5px',
              height: '5px',
              backgroundColor: pixel.color,
            }}
            key={(pixel.color + pixel.x + pixel.y).toString()}
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
