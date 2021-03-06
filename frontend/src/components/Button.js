import PropTypes from 'prop-types'



const Button = ({ color, text, onClick }) => {

  return (
    <button onClick={onClick} className="btn" style={{ backgroundColor: color }}>{ text }</button> 
  )
}

Button.defaultProps = {
    text: 'Text Here',
    color: 'red',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}
export default Button