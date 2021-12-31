import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchForRestaurant } from '../../store/search';
import { useHistory } from 'react-router';

const SearchBar = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSearch = async(e) => {
    e.preventDefault();
    let data = await dispatchEvent(searchForRestaurant(search));

    if (data) {
      history.push(`/search/${search}`)
    }
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Search for your favorite restaurants'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => handleSearch(e)}
        >
      </input>
    </form>
  )
}

export default SearchBar;
