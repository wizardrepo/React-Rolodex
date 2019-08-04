import React, { Component } from 'react';
import logo from './logo.svg';




import './App.css';
import {CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component'
import {BackGround} from './components/background/background.component'


var dbLink = "http://jsonplaceholder.typicode.com/users";


class Board extends Component
{
  constructor() 
  {
    super();
    this.state = 
    {
        squares: Array(9).fill('X')
    };

  }

  render()
  {
    return (
      <div className = "Board">
      {
      this.state.squares.map(squares => <h1> {squares.value} </h1>)
      }
      </div>
    );
  }

}

class App extends Component
{
  constructor() 
  {
    super();
    this.state = 
    {
      monsters: [],
      SearchField: ''
    };
    /* you use the method below to bind a function to the this.state of the App
    by issuing this in the constructor
    
    Alternatively, functions can be re-written like so:
    from traditional: func(e) {} to func = (e) => {} as the latter, react style func
    carries state forward. */

   // this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange = (e) => {
    this.setState({SearchField : e.target.value})
  }
  
  componentDidMount()
  {
    fetch(dbLink)
    .then(resp => resp.json())
    .then(users => this.setState({monsters: users}));
  }
  render()
  {
    const { monsters, SearchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(SearchField.toLowerCase()))
   // const monsters = this.state.monsters;
   // const SearchField = this.state.SearchField;
     return (
    <div className="App">
    <h1 id="title">Monsters Rolodex</h1>
    <SearchBox
    placeholder = "find monsters" 
    handleChange={this.onFileChange}
    />
    <CardList monsters={filteredMonsters}/>
    
  
    


    </div>
  );
  }
}



export default App;
