const VideoModal = ({ videoUrl, onClose }) => {
  return (
    <div className="video-modal">
      <iframe
        width="700"
        height="400"
        src={videoUrl}
        title="Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default VideoModal;
