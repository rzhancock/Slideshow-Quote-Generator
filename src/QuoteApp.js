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
        
        return quotes[quoteIndex].text;
    }

    renderAuthor = () => {
        const { quoteIndex, quotes } = this.state;
               
        return quotes[quoteIndex].author;
    }

    updateURL = () => {
             this.setState(
                    { URL: this.state.images[this.state.imageIndex].urls.regular }
            ); 
     }
    

    componentDidMount(){

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.unsplash.com/collections/2157113/photos?fit=crop&w=900&h=600&page=1&per_page=25&client_id=d78aa27606ff8868b76ac8d0cb6f4ea3c4010b12735789c34ee4bb0f98b4e132');

        

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
            const location = images[imageIndex].urls.full;
            background = 'backgroundImage: url(' + location + ')';
            console.log(background);
            return background;
        } 

    } */


    nextIndex = () => {
        const { quoteIndex, imageIndex, images, quotes } = this.state;
        const numberOfQuotes = quotes.length - 1;
        const numberOfImages = images.length - 1;
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
                background: 'url(' + this.state.URL + ') no-repeat',
            }
        };    
           
        return (


            <div className="App" >
                <div className="quote-container" style={styles.background}>
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
                        Quote

                    </button>
                </div>
            </div>
                

                
            
        );

    }
}
