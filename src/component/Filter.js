
function Filter({ value, onChange }) {

    const handleClick = (key, e) => {
      e.preventDefault();
      onChange(key);
    };
  
    return (
      <div className="panel-tabs">
        <div className="somebox">
        <a
          href="#"
          onClick={handleClick.bind(null, 'ALL')}
          className={value === 'ALL' ?  'is-active' : ''}
        >All</a>
        </div>
        <div className="somebox">
        <a
          href="#"
          onClick={handleClick.bind(null, 'TODO')}
          className={value === 'TODO' ?  'is-active' : ''}
        >To Do</a>
        </div>
        <div className="somebox">
        <a
          href="#"
          onClick={handleClick.bind(null, 'DONE')}
          className={value === 'DONE' ?  'is-active' : ''}
        >Done</a>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
  
  export default Filter