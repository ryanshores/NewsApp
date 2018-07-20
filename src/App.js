import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=c5254c3643f74d77a18397fa483f91e7'

    fetch(url)
      .then(results => results.json())
      .then(results => {
        const stories = results.articles.map((article, i) => {
          return {
            source: article.source.name,
            author: article.author,
            title: article.title,
            url: article.url,
            id: i
          }
        })
        this.setState({stories})
      })
      .catch(err => console.log(err))
  }

  render() {
    let views = <div>Loading...</div>
    const {stories} = this.state
    if (stories && stories.length > 0) {
      views = stories.map(story => (
        <p key={story.id}>
          <a href={story.url}>{story.title}</a> from <strong>{story.source}</strong>
        </p>
      ))
    }

    return (
      <div className="App">
        <h2>Top Stories</h2>
        {views}
        <a href="https://newsapi.org">powered by NewsAPI.org</a>
      </div>
    );
  }
}

export default App;
