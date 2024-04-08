import PropTypes from 'prop-types';
import './style.css';

const InputWithIcon = ({ placeholder, icon: IconComponent,type,onChange,...rest }) => {
  return (
    <div className="input-container  w-[100%]">
      <div className="icon-container">
        {IconComponent && <IconComponent className="icon" style={{ color: 'gray' }} />}
      </div>
      <input
        type={type}
        className="bg-slate-100 h-[40px] placeholder:text-xs md:placeholder:text-lg w-[100%] rounded-lg outline-none with-icon shadow-lg"
        placeholder={placeholder}
        {...rest}
        onChange={onChange}
      />
    </div>
  );
};

InputWithIcon.propTypes = {
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  type:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
};

export default InputWithIcon;
