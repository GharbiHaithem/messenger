import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Avatar = ({ fullname, userOnline, _users }) => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        // Vérifier si l'identifiant _users est présent dans le tableau userOnline
        const foundUser = userOnline.find(user => user.userId === _users);
        setIsOnline(!!foundUser); // Convertir en booléen et mettre à jour l'état
    }, [userOnline, _users]);

    return (
        <div className={'w-[50px] rounded-full h-[50px] border-2 border-black flex items-center justify-center relative'}>
            {fullname}
            {isOnline ? <span className='absolute bottom-0 right-0 w-[10px] rounded-full h-[10px] bg-green-600'> </span> : <span className='rounded-full absolute bottom-0 right-0  w-[10px] h-[10px] bg-red-600'> </span>}
        </div>
    );
}

Avatar.propTypes = {
    fullname: PropTypes.string.isRequired,
    userOnline: PropTypes.arrayOf(PropTypes.object).isRequired,
    _users: PropTypes.string.isRequired,
 
};

export default Avatar;
