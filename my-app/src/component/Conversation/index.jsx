
import PropTypes from 'prop-types';
const Conversation = ({user}) => {
  return (
    <div className='w-full flex items-center gap-[22px] border-b border-slate-400 h-[60px]'>
   <span className='w-[40px] flex items-center justify-center h-[40px]  rounded-full border border-slate-200'>{(user.firstname[0]).toUpperCase()+(user.lastname[0]).toUpperCase()}</span>
   <span>{user?.firstname + " " + user?.lastname}</span>
    </div>
  )
}
Conversation.propTypes = {
    user: PropTypes.object.isRequired,
 
  };
export default Conversation