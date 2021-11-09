import React, {useState, useEffect} from 'react';
import './Homepage.css';
import {loadMeteors, CONSTANTS} from '../Utilities/Utils';
import Search from '../SearchYear/Search';
import Meteor from '../Meteor/Meteor';

const Homepage = () => {

    const [searchedYear, setSearchedYear] = useState("");
    const [searchedMass, setSearchedMass] = useState("");
    const [meteors, setMeteors] = useState([]);
    const [displayedMeteors, setDisplayedMeteors] = useState([]);
    const [yearsList, setYearsList] = useState([]);
    const [showErrMsg, setShowErrMsg] = useState(false);


    /**
     * When page loads, call loadMeteors and mock a call to server as async call.
     */
    useEffect(() => {
        loadMeteors().then(meteors => {
            setMeteors(meteors);
            setDisplayedMeteors(meteors);
            getListOfYears(meteors);
        })
    }, []);

    useEffect(() => {

        /**
         *  When the current year doesn't find any meteor greater than the supplied mass, it will reset the year
         * @param searchedMass
         */
        const resetToYearFitsSize = (searchedMass) => {
            const newMeteorToSelect = meteors.find(meteor => meteor.mass && parseInt(meteor.mass) > parseInt(searchedMass));
            const newYearToSelect = newMeteorToSelect && newMeteorToSelect.year ? newMeteorToSelect.year.split('-')[0] : '';
            if(newYearToSelect)
                setSearchedYear(newYearToSelect);
        }

        const tmpMeteors = meteors.filter(meteor =>
            (!searchedYear || (meteor.year && meteor.year.includes(searchedYear))) &&
            (!searchedMass || (meteor.mass && parseInt(meteor.mass) > searchedMass))
        )
        if(searchedMass && tmpMeteors.length === 0) {
            setShowErrMsg(true);
            resetToYearFitsSize(searchedMass);
        }

        setDisplayedMeteors(tmpMeteors);
    }, [searchedMass, searchedYear, meteors])

    /**
     * This responsible to let message disappear after CONSTANTS.ERR_MSG_DURATION ms
     */
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowErrMsg(false);
        }, CONSTANTS.ERR_MSG_DURATION);
        return () => clearTimeout(timeoutId);
    }, [showErrMsg])

    /**
     *  Get the list the years and sort it ascending way
     * @param meteors
     */
    const getListOfYears = (meteors) => {
        const tmpYearsList = meteors.map(meteor =>
            meteor.year && meteor.year.split('-')[0]).sort((a,b) => a - b).reduce((years, year) => {
                if(!years.includes(year))
                    years.push(year);
                return years;
            }, []);
        setYearsList(tmpYearsList);
    }

    /**
     * Return the filterByMass JSx, onChange, I'm updating the the query through setState
     * @returns {JSX.Element}
     */
    const filterByMassJsx = () => {
        return (
            <div align='center' className='filterByMass'>
                <input name='search_term' type='text' value={searchedMass} placeholder='Filter By larger than Mass..'
                       className='form-control mr-sm-0' onChange={event => setSearchedMass(event.target.value)}>
                </input>
            </div>
        );
    }

    return (
        <div className='container'>
            <Search years={yearsList}
                    searchedYearValue={searchedYear}
                    setSearchedYear={setSearchedYear}/>

            {searchedYear && filterByMassJsx()}
            {displayedMeteors.length > 0 &&
                <div align='center' className='meteors'>

                    {showErrMsg && <h2 className='err_msg'>The mass was not found, jumping to first-year where there is a mass that fits the criteria </h2>}
                    <h2 className='total_number'> Total number of meteors is: {displayedMeteors.length}</h2>
                    <span style={{color: 'blue', display:'block', margin:'20px', fontSize: '20px'}}>Here is the list of Meteors names</span>

                    {displayedMeteors.map(meteor => {
                    return <Meteor key={meteor.id} meteor={meteor}/>

                    })}

                </div>
            }

        </div>
    );

}

export default Homepage;