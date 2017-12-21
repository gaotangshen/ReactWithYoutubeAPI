import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // library in node_modules
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; // js we wrote need relative path
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDUFg6PshYxAH6jzBEULGQQxKmYQrFULhc';


// Create a new component. this component should produce some HTML
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.videoSearch('cats');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos, // same as this.setState({videos: videos});
        selectedVideo: videos[0],
       }); 
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); // delay 300 ms before search

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));