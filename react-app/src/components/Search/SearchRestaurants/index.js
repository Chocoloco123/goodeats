import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchForRestaurant } from '../../../store/search';
import { useHistory } from 'react-router';
import './SearchRestaurants.css'
// import goodeatsFlower from '../../../media/goodeats_flower_transparent.png'

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleEnter = async(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let data = await dispatch(searchForRestaurant(search));
  
      if (data) {
        history.push(`/search/${search}`)
      }
    }
  }

  const handleSearchClick = async(e) => {
    e.preventDefault();
    let data = await dispatch(searchForRestaurant(search));
  
      if (data) {
        history.push(`/search/${search}`)
      }
  }

  return (
    <form>
      <div className='centerText-Main-Div2 navSearch'>
        <div className='FindSearchBar'>Find</div>
        <input
          type='text'
          // placeholder='Search for your favorite restaurants'
          // placeholder={`Find the Best Restaurants in Town ${<img src={goodeatsFlower} alt='goodeatsLogo' className='goodeatsLogoMain'></img>}`}
          placeholder='the Best Restaurants in Town...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          className='searchBar'
          >
        </input>
      <div>
        <button type="submit" className="searchBtn" onClick={(e) => handleSearchClick(e)}><i className="fas fa-search fa-lg"></i></button>
      </div>
      </div>
    </form>
  )
}

export default SearchBar;
