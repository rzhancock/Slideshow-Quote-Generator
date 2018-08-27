import React, { Component } from 'react';
import './quotes.css';
import { favoriteQuotes } from './quotes';
import ReactCSSTransitionReplace from 'react-css-transition-replace';


export default class QuoteApp extends Component {
    constructor(props) {
        super(props);

        
        const startingIndex = Math.round(Math.random() * 30);
        

        this.state = {
            quotes: favoriteQuotes,
            quoteIndex: Math.round(Math.random() * (favoriteQuotes.length - 1)),
            quoteIndexes: [],
            authors: [],
            images: {},
            imageIndex: startingIndex,
            imageIndexes:[],
            URL: '',
            apiImagePage: 'page=1',
            isLoading: false,
            hasErrored: false
        }
        
    }


    renderQuote = () => {
        const { quoteIndex, quotes } = this.state;
        
        return quotes[quoteIndex].text;
    };

    renderAuthor = () => {
        const { quoteIndex, quotes } = this.state;
               
        return quotes[quoteIndex].author;
    }

    fetchData(url) {
        this.setState({ isLoading: true });

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                this.setState({ isLoading: false });

                return response;
            })
            .then((response) => response.json())
            .then((images) => this.setState({ images }))
            .catch(() => this.setState({ hasErrored: true }))
            .then(this.updateURL);
    }

    updateURL = () => {
        const { 
            quotes, 
            quoteIndex, 
            quoteIndexes, 
            images, 
            imageIndex,
            imageIndexes, 
            authors } = this.state;

        const pushQuote = [...quoteIndexes, quoteIndex];
        const pushImages = [...imageIndexes, imageIndex];
        const pushAuthors = [...authors, quotes[quoteIndex].author];

             this.setState(
                    { 
                        URL: images[imageIndex].urls.regular,
                        quoteIndexes: pushQuote,
                        imageIndexes: pushImages,
                        authors: pushAuthors
                    }
            ); 
     }
    

    componentDidMount(){
        this.fetchData(`https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&
            ${this.state.apiImagePage}
            &per_page=30&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132`);

        
    }


    nextIndex = () => {

        const { quoteIndex, imageIndex, images, quotes, quoteIndexes, imageIndexes } = this.state;
        const numberOfQuotes = quotes.length - 1;
        const numberOfImages = images.length - 1;
        const newIndex = Math.round(Math.random() * numberOfQuotes);
        const newImage = Math.round(Math.random() * numberOfImages);



        if (quoteIndexes.indexOf(newIndex) !== -1 || imageIndexes.indexOf(newImage) !== -1) {
            return this.nextIndex();
        }


          this.setState({
                quoteIndex: newIndex,
                imageIndex: newImage,
            }, this.updateURL);  

    }

    render() {
         

        return (

            <div className="App" >

                <div className="top-row">
                    <h1> Some quotes to live by: </h1>

                </div>

                <div className="bottom-row">
                    <p><a href="https://unsplash.com">Images courtesy of Unsplash.com</a></p> 
                </div>

                <div className="previous">
                    <button 
                        className="prev-btn"
                        onClick={null}
                    >
                        Prev<br/>
                        Quote<br/>
                    </button>
                </div>

                <div className="bottom-left-corner"></div>

                <div className="quote-container">
                     <div id="quote" >
                        {this.renderQuote()}
                    </div>

                    <div id="author" >
                        {this.renderAuthor()}
                    </div>
                    <div className="background">
                            <img src={this.state.URL} key={this.state.imageIndex} alt="" id="image1" />
                    </div>
                </div>

                <div className="next">
                    <button 
                        className="next-btn"
                        onClick={this.nextIndex}
                    >
                        Next<br/>
                        Quote<br/>
                    </button>
                </div>

                <div className="top-left-corner"></div>
                <div className="bottom-left-corner"></div>
                <div className="top-right-corner"></div>
                <div className="bottom-right-corner"></div>

            </div>

        );

    }
}
