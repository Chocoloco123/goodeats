import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchForRestaurant } from '../../../store/search';
import { useHistory } from 'react-router';
import goodeatsFlower from '../../../media/goodeats_flower_transparent.png'

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSearch = async(e) => {
    e.preventDefault();
    let data = await dispatch(searchForRestaurant(search));

    if (data) {
      history.push(`/search/${search}`)
    }
  }

  return (
    <form>
      <div className='centerText-Main-Div2'>

     
      <input
        type='text'
        // placeholder='Search for your favorite restaurants'
        // placeholder={`Find the Best Restaurants in Town ${<img src={goodeatsFlower} alt='goodeatsLogo' className='goodeatsLogoMain'></img>}`}
        placeholder='Find the Best Restaurants in Town'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => handleSearch(e)}
        className='centerText-Main-Div2'
        >
      </input>
      <div>
        <button type="submit"><i className="fas fa-search"></i></button>
      </div>
      </div>
    </form>
  )
}

export default SearchBar;
