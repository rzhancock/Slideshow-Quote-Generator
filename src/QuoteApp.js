import React, { Component } from "react";
import "./quotes.css";
import { favoriteQuotes } from "./quotes";

export default class QuoteApp extends Component {
  constructor(props) {
    super(props);

    // Fisher-Yates shuffle algorithm - http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array;
    }
    let randomImageIndexes = [];
    for (let i = 0; i < 30; i++) {
      randomImageIndexes[i] = i;
    }
    randomImageIndexes = shuffle(randomImageIndexes);

    let randomQuoteIndexes = [];
    for (let i = 0; i < favoriteQuotes.length; i++) {
      randomQuoteIndexes[i] = i;
    }
    randomQuoteIndexes = shuffle(randomQuoteIndexes);

    const indexesCombined = [];
    for (let i = 0; i < randomImageIndexes.length; i++) {
      indexesCombined.push([randomImageIndexes[i], randomQuoteIndexes[i]]);
    }

    //STATE

    this.state = {
      quotes: favoriteQuotes,
      index: 0,
      indexes: indexesCombined,
      images: [],
      URL: "",
      opacity: 0,
      nextBtnDisabled: false,
      backBtnDisabled: true
    };

    ///////
  }

  resetIndexes = () => {
     // Fisher-Yates shuffle algorithm - http://stackoverflow.com/questions/962802#962890
     function shuffle(array) {
      var tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array;
    }
    let randomImageIndexes = [];
    for (let i = 0; i < 30; i++) {
      randomImageIndexes[i] = i;
    }
    randomImageIndexes = shuffle(randomImageIndexes);

    let randomQuoteIndexes = [];
    for (let i = 0; i < favoriteQuotes.length; i++) {
      randomQuoteIndexes[i] = i;
    }
    randomQuoteIndexes = shuffle(randomQuoteIndexes);

    const indexesCombined = [];
    for (let i = 0; i < randomImageIndexes.length; i++) {
      indexesCombined.push([randomImageIndexes[i], randomQuoteIndexes[i]]);
    }

    this.setState({
      quotes: favoriteQuotes,
      index: 0,
      indexes: indexesCombined,
      images: [],
    });

    this.fetchData(
      `https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&page=2&per_page=30&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132`
    )
  }

  fetchData(url) {
    const { images } = this.state;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(images => this.setState({ images }))
      .then(() => {
        for (let i = 0; i < images.length; i++) {
          const loaded = new Image();
          loaded.src = images[i].urls.regular;
        }
      })
      .then(() => {
        const { images, indexes } = this.state;
        this.setState({
          URL: images[indexes[0][0]].urls.regular,
          opacity: 1,
          backBtnDisabled: true
        });
      })
      .then(() => {
        this.setState({
          index: 0
        });
      });
  }

  componentDidMount() {
    this.fetchData(
      `https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&page=1&per_page=30&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132`
    );
  }

  renderBackground = () => {
    return (
      <img src={this.state.URL} key={this.state.index} alt="" id="image1" />
    );
  };

  renderQuote = index => {
    const { quotes, indexes } = this.state;

    return quotes[indexes[index][1]].text;
  };

  renderAuthor = index => {
    const { quotes, indexes } = this.state;

    return quotes[indexes[index][1]].author;
  };

  handleTransitionEnd = e => {
    const { images, indexes, index, opacity, whichBtn } = this.state;

    switch (true) {
      case opacity === 0 && index === 28 && whichBtn === "next":
        this.setState(
          {
            opacity: 0
          });

        setTimeout(() => {
          this.resetIndexes()
        }, 740);

        break;

      case opacity === 0 && whichBtn === "next":
        this.setState({
          nextBtnDisabled: true,
          URL: images[indexes[index + 1][0]].urls.regular,
          opacity: 1,
          index: index + 1
        });

        break;
      case opacity === 0 && whichBtn === "back":
        if (index === 1) {
          this.setState({
            URL: images[indexes[0][0]].urls.regular,
            opacity: 1,
            index: 0
          });
        } else {
          this.setState({
            URL: images[indexes[index - 1][0]].urls.regular,
            opacity: 1,
            index: index - 1
          });
        }
        break;

      case index === 0:
        this.setState({
          nextBtnDisabled: false,
          backBtnDisabled: true
        });
        break;

      default:
        this.setState({
          nextBtnDisabled: false,
          backBtnDisabled: false
        });
        break;
    }
  };

  nextSlide = () => {
    this.setState({
      nextBtnDisabled: true,
      whichBtn: "next",
      opacity: 0
    });
  };

  prevSlide = () => {
    this.setState({
      backBtnDisabled: true,
      whichBtn: "back",
      opacity: 0
    });
  };

  //RENDER
  render() {
    const styles = {
      transition: "opacity .75s ease-in",
      opacity: this.state.opacity
    };

    return (
      <div className="App" style={{ backgroundColor: "#dbdbdb" }}>
        <div className="buttons">
          <div className="previous">
            <button
              className="prev-btn"
              onClick={this.prevSlide}
              disabled={this.state.backBtnDisabled}
            >
              &#8249;
            </button>
          </div>

          <div className="next">
            <button
              className="next-btn"
              onClick={this.nextSlide}
              disabled={this.state.nextBtnDisabled}
            >
              &#8250;
            </button>
          </div>
        </div>
        <div
          className="quote-container"
          style={{ ...styles }}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div id="quote">{this.renderQuote(this.state.index)}</div>

          <div id="author">{this.renderAuthor(this.state.index)}</div>

          <div className="background">{this.renderBackground()}</div>
        </div>
      </div>
    );
  }
}
