import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messages as fnmsg } from '../../features/messageSlice';
const TextChat = ({c}) => {

  return (
  <div>
   
   <span className='font-sans text-sm text-slate-400'>
  {c[c?.length - 1]?.text && (
    ((c[c?.length - 1]?.text).length > 111) ? 
      (c[c?.length - 1]?.text).slice(0, 111) + " ..." : 
      (c[c?.length - 1]?.text)
  )}
</span>

  </div>
  )
}
TextChat.propTypes = {
   
    c: PropTypes.string.isRequired,

  };
export default TextChat