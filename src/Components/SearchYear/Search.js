import './Search.css';

/**
 *  This holds the years and rendering them into select element
 * @param years
 * @param searchedYearValue
 * @param setSearchedYear
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({
    years,
    searchedYearValue,
    setSearchedYear
}) => {
    const onChange = (event) => setSearchedYear && setSearchedYear(event.target.value);

    return (
        <div className='select_comp'>
            <span className='msg_select_year'>Please select a year: </span>
            <select className='search' name="filterYear" value={searchedYearValue} onChange={onChange}>
                <option value='' />
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Search;