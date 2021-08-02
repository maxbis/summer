const ProgressBar = (props) => {
    const { timer, timerStart } = props;

    let completed=timer*100/timerStart;
  
    const containerStyles = {
      height: 16,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 0,
      margin: 0
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: "#A0A0A0",
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease-in-out'
    }
  
    const labelStyles = {
      paddingRight: 8,
      paddingTop: 0,
      color: "#505050",
      fontSize: '12px',
      position: 'relative',
      top: '-5px',
      right: '5px'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${timer}`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  