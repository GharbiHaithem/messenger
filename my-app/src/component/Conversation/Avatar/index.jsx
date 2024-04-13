import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Avatar = ({ fullname, userOnline, _users ,infousers}) => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        // Vérifier si l'identifiant _users est présent dans le tableau userOnline
        const foundUser = userOnline.find(user => user.userId === _users);
        setIsOnline(!!foundUser); // Convertir en booléen et mettre à jour l'état
    }, [userOnline, _users]);
console.log(isOnline)
    return (
       <>
       {infousers?.images[0]?.url?.length>0 ?<div className={'relative w-[50px] rounded-full h-[50px] border-1 border-blue-500 flex items-center justify-center'}> <img src={infousers?.images[0]?.url}  alt='img' className=' w-full h-full object-cover rounded-full' />
       {isOnline ? <span className='absolute bottom-0 right-0 w-[10px] rounded-full h-[10px] bg-green-600'> </span> : <span className='rounded-full absolute bottom-0 right-0  w-[10px] h-[10px] bg-red-600'> </span>}
        </div>: <>
       <div className={'w-[50px] rounded-full h-[50px] border-1 border-blue-500 flex items-center justify-center relative'}>
            {fullname}
            {isOnline ? <span className='absolute bottom-0 right-0 w-[10px] rounded-full h-[10px] bg-green-600'> </span> : <span className='rounded-full absolute bottom-0 right-0  w-[10px] h-[10px] bg-red-600'> </span>}
        </div>
       </>} 
       </>
    );
}

Avatar.propTypes = {
    fullname: PropTypes.string.isRequired,
    userOnline: PropTypes.arrayOf(PropTypes.object).isRequired,
    _users: PropTypes.string.isRequired,
    infousers: PropTypes.object.isRequired,
};

export default Avatar;
