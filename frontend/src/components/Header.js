import PropTypes from 'prop-types'
import Button from './Button'

const Header = (props) => {
  return (
    <header className='header noselect'>
        <h1>{props.title}</h1>
        <Button color={!props.addEventOpen ? 'green' : 'red'} text={!props.addEventOpen ? 'Add' : 'Close'} onClick={ props.onAdd } />
    </header>
  )
}

Header.defaultProps = {
    title: 'Event Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Header