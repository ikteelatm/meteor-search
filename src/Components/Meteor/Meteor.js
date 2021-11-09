
import './Meteor.css';

const Meteor = ({meteor}) => {
  return (
    <div className='Meteor'>
        <span>
            {meteor.name}
        </span>
    </div>
  );
};
export default Meteor;