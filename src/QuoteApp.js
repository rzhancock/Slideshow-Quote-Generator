import React, { Component } from 'react';
import './quotes.css';
import { favoriteQuotes } from './quotes';


export default class QuoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: favoriteQuotes,
            quoteIndex: Math.round(Math.random() * (favoriteQuotes.length - 1)),
            quoteIndexes: [],
            authors: [],
            images: {},
            imageIndex: Math.round(Math.random() * 30),
            imageIndex2: Math.round(Math.random() * 30 - 1),
            imageIndexes:[],
            URL: '',
            URL2: '',
            apiImagePage: 'page=1'
        }
        
    }


    renderQuote = () => {
        const { quoteIndex, quotes } = this.state;
        
        return quotes[quoteIndex].text;
    }

    renderAuthor = () => {
        const { quoteIndex, quotes } = this.state;
               
        return quotes[quoteIndex].author;
    }

    updateURL = () => {
        const { 
            quotes, 
            quoteIndex, 
            quoteIndexes, 
            images, 
            imageIndex, 
            imageIndex2, 
            imageIndexes, 
            authors } = this.state;

        const pushQuote = [...quoteIndexes, quoteIndex];
        const pushImages = [...imageIndexes, imageIndex, imageIndex2];
        const pushAuthors = [...authors, quotes[quoteIndex].author];

             this.setState(
                    { 
                        URL: images[imageIndex].urls.regular,
                        URL2: images[imageIndex2].urls.regular,
                        quoteIndexes: pushQuote,
                        imageIndexes: pushImages,
                        authors: pushAuthors
                    }
            ); 
     }
    

    componentDidMount(){

        let xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&
            ${this.state.apiImagePage}
            &per_page=30&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132`);

        xhr.onload = () => {
            this.setState({
                images: JSON.parse(xhr.responseText),
            }, this.updateURL);
        }

        xhr.send();
    }

    



    nextIndex = () => {

        const { quoteIndex, imageIndex, images, quotes, quoteIndexes, imageIndexes } = this.state;
        const numberOfQuotes = quotes.length - 1;
        const numberOfImages = images.length - 1;
        const newIndex = Math.round(Math.random() * numberOfQuotes);
        const newImage = Math.round(Math.random() * numberOfImages);
        const newImage2 = newImage - 1;

        if (quoteIndexes.indexOf(newIndex) !== -1 || imageIndexes.indexOf(newImage) !== -1 || imageIndexes.indexOf(newImage2) !== -1) {
            return this.nextIndex();
        }

        this.setState({
            quoteIndex: newIndex,
            imageIndex: newImage,
            imageIndex2: newImage2
        }, this.updateURL);

}




    render() {
     
      /* const styles = {
                transition: 'opacity 1s ease-in'
        };   */ 
         

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
                    <div  className="background">
                        <img src={this.state.URL} alt="background" className="image1"/>
                        <img src={this.state.URL2} alt="background image2" className="image2"/>
                    </div>
                    <div className="quote">
                        {this.renderQuote()}
                    </div>

                    <div className="author">
                        {this.renderAuthor()}
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
