import React, { Component } from 'react';
import './quotes.css';
import { favoriteQuotes } from './quotes';

export default class QuoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: favoriteQuotes,
            quoteIndex: 0,
            images: {},
            imageIndex: 0,
            URL: ''

        }
        
    }



    renderQuote = () => {
        const { quoteIndex, quotes } = this.state;
        
        return '"' + quotes[quoteIndex].text + '"';
    }

    renderAuthor = () => {
        const { quoteIndex, quotes } = this.state;
               
        return '- ' + quotes[quoteIndex].author;
    }

    updateURL = () => {
             this.setState(
                    { URL: this.state.images.results[this.state.imageIndex].urls.full }
            ); 
     }
    

    componentDidMount(){

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.unsplash.com/search/photos?page=1&per_page=25&query=mountain,forest,trees,animals&orientation=landscape&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132');

        

        xhr.onload = () => {
            

            this.setState({
                images: JSON.parse(xhr.responseText),
            }, this.updateURL);

            
           
        }

        xhr.send();

    }

   /* componentDidUpdate() {
        

         

        renderBackground = () =>{

            const { imageIndex, images } = this.state;
            const location = images.results[imageIndex].urls.full;
            background = 'backgroundImage: url(' + location + ')';
            console.log(background);
            return background;
        } 

    } */


    nextIndex = () => {
        const { quoteIndex, imageIndex, images, quotes } = this.state;
        const numberOfQuotes = quotes.length - 1;
        const numberOfImages = images.results.length - 1;
        const newIndex = Math.round(Math.random() * numberOfQuotes);
        const newImage = Math.round(Math.random() * numberOfImages);

        if (newIndex === quoteIndex || newImage === imageIndex) {
            return this.nextIndex();
        }
        this.setState({
            quoteIndex: newIndex,
            imageIndex: newImage
        },this.updateURL);
    }




    render() {
     
        
       let styles = {
            background: {
                backgroundImage: 'url(' + this.state.URL + ')',
            }
        };

        console.log(this.state.URL);
           
        return (


            <div className="App" style={styles.background}>
                
                <div className="quote-container">
                    <div className="quote">
                        {this.renderQuote()}
                    </div>

                    <div className="author">
                        {this.renderAuthor()}
                    </div>
                </div>
                

                <div>
                    <button 
                        className="next-index"
                        onClick={this.nextIndex}
                    >
                        Another!
                    </button>
                </div>
            </div>
            
        );

    }
}
