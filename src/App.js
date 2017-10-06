import React, { Component } from 'react';

import './App.css';
import { officeQuotes } from './quotes';

export default class App extends Component {
    state = {
        show: 'office',
        quoteIndex: 0,
        quotes: officeQuotes
    }

    renderHeader = () => {
        switch (this.state.show) {
            case 'office': {
                return 'The Office';
            }
            default: {
                return 'Pick a show to view some sweet quotes';
            }
        }
    }

    renderQuote = () => {
        const { show, quoteIndex, quotes } = this.state;
        switch (show) {
            case 'office': {
                return quotes[quoteIndex].text;
            }
            default: {
                return null;
            }
        }
    }

    renderAuthor = () => {
        const { show, quoteIndex, quotes } = this.state;
        switch (show) {
            case 'office': {
                return quotes[quoteIndex].author;
            }
            default: {
                return null;
            }
        }
    }

    nextQuote = () => {
        const { quoteIndex, quotes } = this.state;
        const numberOfQuotes = quotes.length - 1;
        const newIndex = Math.round(Math.random() * numberOfQuotes);
        if (newIndex === quoteIndex) {
            return this.nextQuote();
        }
        this.setState({
            quoteIndex: newIndex
        });
    }

    render() {
        return (
            <div className="App">
                <h3 className="tv-shows">
                    {this.renderHeader()}
                </h3>
                <div className="quote-container">
                    <div className="quote">
                        {this.renderQuote()}
                    </div>
                    <div className="author">
                        {this.renderAuthor()}
                    </div>
                </div>
                <div className="next-quote-btn-container">
                    <button 
                        className="next-quote"
                        onClick={this.nextQuote}
                    >
                        Another!
                    </button>
                </div>
            </div>
        );
    }
}
