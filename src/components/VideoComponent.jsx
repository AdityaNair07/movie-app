import PropTypes from "prop-types";

const VideoComponent = ({ id, small }) => {
  return (
    <iframe
      width={small ? "300" : "100%"}
      height={small ? "450" : "600"}
      style={{ border: "1px solid teal", borderRadius: "5px" }}
      src={`https://www.youtube.com/embed/${id}`}
      allowFullScreen
    />
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default VideoComponent;
