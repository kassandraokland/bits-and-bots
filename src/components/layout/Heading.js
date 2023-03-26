import PropTypes from "prop-types";

function Heading({ content }) {
	return <h1 className="heading text-center">{content}</h1>;
}

Heading.propTypes = {
	content: PropTypes.string.isRequired,
};

export default Heading;