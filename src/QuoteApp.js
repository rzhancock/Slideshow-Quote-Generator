import React, { Component } from 'react';
import './quotes.css';
import { favoriteQuotes } from './quotes';


export default class QuoteApp extends Component {
    constructor(props) {
        super(props);
        
        const startingIndex = Math.round(Math.random() * 30);

        this.state = {
            quotes: favoriteQuotes,
            quoteIndex: Math.round(Math.random() * (favoriteQuotes.length - 1)),
            quoteIndexes: [],
            authors: [],
            images: [],
            imageIndex: startingIndex,
            imageIndexes:[],
            URL: '',
            opacity: 0,
            apiImagePage: 'page=1',
            isLoading: false,
            hasErrored: false,
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

        setTimeout(() => {
          this.setState(
                    { 
                        URL: images[imageIndex].urls.regular,
                        quoteIndexes: pushQuote,
                        imageIndexes: pushImages,
                        authors: pushAuthors,
                        opacity: 1
                    }
            )
        }, 1100);
     }
    

    componentDidMount(){
        this.fetchData(`https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&
            ${this.state.apiImagePage}
            &per_page=30&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132`);

        
    }


    nextSlide = () => {

        const { quoteIndex, images, quotes, quoteIndexes, imageIndexes } = this.state;
        const numberOfImages = images.length - 1;
        const numberOfQuotes = quotes.length - 1;

        const nextImage = Math.round(Math.random() * numberOfImages);
        const nextQuote = Math.round(Math.random() * numberOfQuotes)

        if (imageIndexes.indexOf(nextImage) !== -1 || quoteIndexes.indexOf(nextQuote) !== -1) {
            return this.nextSlide();
        }

        
        this.setState({
                imageIndex: nextImage,
                opacity: 0
        }, this.updateURL);

        setTimeout(() => {
          this.setState({ quoteIndex: nextQuote });
        }, 1000);
         

        
          

    }

    render() {
         
        const styles = {
            transition: 'opacity 1s linear',
            opacity: this.state.opacity
            
        }

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

                <div className="quote-container" style={{...styles}}>

                    <div id="quote" >
                        {this.renderQuote()}
                    </div>

                    <div id="author" >
                        {this.renderAuthor()}
                    </div>
                    
                    <div className="background" >
                        <img src={this.state.URL} key={this.state.imageIndex} alt="" id="image1" />
                    </div>

                </div>

                <div className="next">
                    <button 
                        className="next-btn"
                        onClick={this.nextSlide}
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
